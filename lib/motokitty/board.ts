import { Redis } from "@upstash/redis";
import { BOARD_SIZE, type Run, weekKey } from "./rules";

/**
 * MotoKitty's world board in Redis. One entry per device per board, holding
 * that device's best score, so one rider can't fill the board alone.
 *
 * Keys:
 * - `motokitty:all` and `motokitty:week:<2026-W46>`: sorted sets, device → best.
 * - `motokitty:initials`: hash, device → three letters.
 * - `motokitty:run:<device>`: the all-time best run's details, for checking by hand.
 * - `motokitty:limit:<device>:<minute>`: runs sent this minute.
 */

const ALL = "motokitty:all";
const INITIALS = "motokitty:initials";
const weekBoard = (at: Date) => `motokitty:week:${weekKey(at)}`;

/** Kept a little past its week, so last week's board can still be looked at. */
const WEEK_KEEP_SECONDS = 21 * 24 * 60 * 60;
/** Runs one device can send in a minute. A run lasts a few seconds at least. */
const RUNS_PER_MINUTE = 20;

/** Shown for a rider on the board who hasn't entered initials yet. */
const NO_INITIALS = "---";

export type Board = "week" | "all";
export type Rider = { name: string; score: number };

/** Where a run landed on one board. */
export type Placing = {
  /** 1 is the top. Counts every other rider's best that beat this run. */
  rank: number;
  /** This run is the device's new best on this board and is in the top ten. */
  made: boolean;
};

export type RunResult = Record<Board, Placing>;

let client: Redis | null = null;

/**
 * The Redis client, or null if the database isn't connected. Reads the
 * variables the Vercel Marketplace's Upstash integration sets.
 */
function redis(): Redis | null {
  if (client) return client;
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  // Replies stay raw strings: a device ID made only of digits mustn't turn
  // into a number on the way back.
  client = new Redis({ url, token, automaticDeserialization: false });
  return client;
}

export class Unavailable extends Error {}

function connected(): Redis {
  const db = redis();
  if (!db) throw new Unavailable("The world board's database isn't connected.");
  return db;
}

/** Counts a run against the device's limit. False once it's sent too many. */
export async function withinLimit(device: string, at: Date): Promise<boolean> {
  const db = connected();
  const key = `motokitty:limit:${device}:${Math.floor(at.getTime() / 60_000)}`;
  const [count] = await db.pipeline().incr(key).expire(key, 120).exec<[number, number]>();
  return Number(count) <= RUNS_PER_MINUTE;
}

/** Records a run on both boards and says where it landed. */
export async function record(run: Run, at: Date): Promise<RunResult> {
  const db = connected();
  const week = weekBoard(at);
  // Read where the device stood and who beat this score, then keep the higher
  // of the old best and this run.
  const [allBestRaw, weekBestRaw, allAbove, weekAbove] = await db
    .pipeline()
    .zscore(ALL, run.device)
    .zscore(week, run.device)
    .zcount(ALL, `(${run.score}`, "+inf")
    .zcount(week, `(${run.score}`, "+inf")
    .zadd(ALL, { gt: true }, { score: run.score, member: run.device })
    .zadd(week, { gt: true }, { score: run.score, member: run.device })
    .expire(week, WEEK_KEEP_SECONDS)
    .exec<[string | null, string | null, number, number, unknown, unknown, unknown]>();
  const allBest = allBestRaw === null ? null : Number(allBestRaw);
  const weekBest = weekBestRaw === null ? null : Number(weekBestRaw);

  const all = placing(run.score, allBest, allAbove);
  if (allBest === null || run.score > allBest) {
    await db.hset(`motokitty:run:${run.device}`, {
      score: run.score,
      duration: run.duration,
      seed: run.seed,
      version: run.version,
      at: at.toISOString(),
    });
  }
  return { all, week: placing(run.score, weekBest, weekAbove) };
}

function placing(score: number, best: number | null, above: number): Placing {
  // The device's own older best doesn't push its new run down.
  const beatenBySelf = best !== null && best > score ? 1 : 0;
  const rank = Number(above) - beatenBySelf + 1;
  const isBest = best === null || score > best;
  return { rank, made: isBest && rank <= BOARD_SIZE };
}

/** Whether the device is on either top ten, so it may put initials there. */
export async function isOnABoard(device: string, at: Date): Promise<boolean> {
  const db = connected();
  const [all, week] = await db
    .pipeline()
    .zrevrank(ALL, device)
    .zrevrank(weekBoard(at), device)
    .exec<[number | null, number | null]>();
  return [all, week].some((rank) => rank !== null && Number(rank) < BOARD_SIZE);
}

export async function setInitials(device: string, initials: string): Promise<void> {
  await connected().hset(INITIALS, { [device]: initials });
}

/** Both top tens, best first. */
export async function top(at: Date): Promise<Record<Board, Rider[]>> {
  const db = connected();
  const [all, week] = await db
    .pipeline()
    .zrange(ALL, 0, BOARD_SIZE - 1, { rev: true, withScores: true })
    .zrange(weekBoard(at), 0, BOARD_SIZE - 1, { rev: true, withScores: true })
    .exec<[string[], string[]]>();

  const entries = (flat: string[]) => {
    const out: { device: string; score: number }[] = [];
    for (let i = 0; i < flat.length; i += 2) {
      out.push({ device: String(flat[i]), score: Number(flat[i + 1]) });
    }
    return out;
  };
  const allEntries = entries(all);
  const weekEntries = entries(week);

  const devices = [...new Set([...allEntries, ...weekEntries].map((e) => e.device))];
  const names: Record<string, string | null> =
    devices.length === 0
      ? {}
      : ((await db.hmget<Record<string, string | null>>(INITIALS, ...devices)) ?? {});
  const named = (list: { device: string; score: number }[]): Rider[] =>
    list.map(({ device, score }) => ({ name: names[device] ?? NO_INITIALS, score }));

  return { all: named(allEntries), week: named(weekEntries) };
}
