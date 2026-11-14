import { Redis } from "@upstash/redis";
import { BOARD_SIZE, type Run, type Space, rowScore, scoreOf, weekKey } from "./rules";

/**
 * MotoKitty's world board in Redis: one row per player, holding that phone's
 * best ride. A ride that beats it moves the row up; any other ride changes
 * nothing. The week board is the same, counting only this week's rides.
 *
 * Players are known by the random device ID the game makes. It never leaves
 * the server: the top ten handed out has initials and scores only.
 *
 * Keys, under `motokitty:` for the real board and `motokitty:test:` for the
 * test board development builds ride on:
 * - `board:all` and `board:week:<2026-W46>`: sorted sets, device → [rowScore]
 *   (score, then earliest), trimmed to the best [KEEP] rows.
 * - `initials`: hash, device → three letters.
 * - `best:<device>`: the details of a device's all-time best ride, for checking
 *   by hand.
 * - `limit:<kind>:<device>:<minute>`: requests this minute.
 */

/** Kept a little past its week, so last week's board can still be looked at. */
const WEEK_KEEP_SECONDS = 21 * 24 * 60 * 60;
/** Requests one device can make in a minute, by kind. A ride lasts a few seconds at least. */
const PER_MINUTE = { run: 20, initials: 5 } as const;
/** Rows kept on each board. A rank past this is never shown. */
const KEEP = 100_000;

/** Shown for a row that hasn't had initials put on it yet. */
const NO_INITIALS = "---";

export type Kind = keyof typeof PER_MINUTE;
export type Board = "week" | "all";
export type Rider = { name: string; score: number };

function keys(space: Space, at: Date) {
  const prefix = space === "test" ? "motokitty:test:" : "motokitty:";
  return {
    all: `${prefix}board:all`,
    week: `${prefix}board:week:${weekKey(at)}`,
    initials: `${prefix}initials`,
    best: (device: string) => `${prefix}best:${device}`,
    limit: (kind: Kind, device: string) =>
      `${prefix}limit:${kind}:${device}:${Math.floor(at.getTime() / 60_000)}`,
  };
}

/** Where the player's row sits on one board after a ride. */
export type Placing = {
  /** 1 is the top; null if the row has fallen past the [KEEP] rows kept. */
  rank: number | null;
  /** The row is in the top ten. */
  made: boolean;
  /** This ride was the player's new best on that board, so the row moved. */
  improved: boolean;
};

/**
 * Where a ride left the player's rows. When it improved the all-time row and
 * that row is in the top ten, `board` is that top ten with the player's row
 * marked `you`, so the game can show it waiting for initials.
 */
export type RunResult = Record<Board, Placing> & { board?: (Rider & { you: boolean })[] };

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

/** Counts a request against the device's limit. False once it's made too many. */
export async function withinLimit(
  space: Space,
  kind: Kind,
  device: string,
  at: Date,
): Promise<boolean> {
  const key = keys(space, at).limit(kind, device);
  const [count] = await connected().pipeline().incr(key).expire(key, 120).exec<[number, number]>();
  return Number(count) <= PER_MINUTE[kind];
}

/** Records a ride: moves the player's rows on boards where it's a new best. */
export async function record(space: Space, run: Run, at: Date): Promise<RunResult> {
  const db = connected();
  const k = keys(space, at);
  const row = rowScore(run.score, at);
  const replies = await db
    .pipeline()
    // Each counts 1 only when this ride beats the row: a tie keeps the
    // earlier ride, which also sits above it.
    .zadd(k.all, { gt: true, ch: true }, { score: row, member: run.device })
    .zadd(k.week, { gt: true, ch: true }, { score: row, member: run.device })
    .expire(k.week, WEEK_KEEP_SECONDS)
    .zremrangebyrank(k.all, 0, -(KEEP + 1))
    .zremrangebyrank(k.week, 0, -(KEEP + 1))
    .zrevrank(k.all, run.device)
    .zrevrank(k.week, run.device)
    .exec<unknown[]>();
  const all = placing(replies[5], replies[0]);
  const result: RunResult = { all, week: placing(replies[6], replies[1]) };
  if (all.improved) {
    await db.hset(k.best(run.device), {
      score: run.score,
      duration: run.duration,
      seed: run.seed,
      version: run.version,
      at: at.toISOString(),
    });
  }
  if (all.improved && all.made) {
    const [board] = await boards(space, at, [k.all]);
    result.board = board.map((entry) => ({
      ...publicRider(entry),
      you: entry.device === run.device,
    }));
  }
  return result;
}

function placing(rank: unknown, changed: unknown): Placing {
  const place = rank === null ? null : Number(rank) + 1;
  return {
    rank: place,
    made: place !== null && place <= BOARD_SIZE,
    improved: Number(changed) === 1,
  };
}

/** A device's best ride: its score and its place on the all-time board. */
export type Best = { best: number | null; rank: number | null };

/** The device's row on the all-time board. Both null if it has none. */
export async function best(space: Space, device: string): Promise<Best> {
  const all = keys(space, new Date()).all;
  const [row, rank] = await connected()
    .pipeline()
    .zscore(all, device)
    .zrevrank(all, device)
    .exec<[string | null, number | null]>();
  return {
    best: row === null ? null : scoreOf(Number(row)),
    rank: rank === null ? null : Number(rank) + 1,
  };
}

/**
 * Whether [device] has a row on the all-time board, so its initials have
 * somewhere to go. A phone that's never ridden online has nothing to name.
 */
export async function hasRow(space: Space, device: string): Promise<boolean> {
  return (await connected().zscore(keys(space, new Date()).all, device)) !== null;
}

/** Puts initials on the device's rows, on every board at once. */
export async function setInitials(space: Space, device: string, initials: string): Promise<void> {
  await connected().hset(keys(space, new Date()).initials, { [device]: initials });
}

/** Both top tens, best first. */
export async function top(space: Space, at: Date): Promise<Record<Board, Rider[]>> {
  const k = keys(space, at);
  const [all, week] = await boards(space, at, [k.all, k.week]);
  return { all: all.map(publicRider), week: week.map(publicRider) };
}

type Entry = { device: string; name: string; score: number };

const publicRider = ({ name, score }: Entry): Rider => ({ name, score });

/** Top tens for each sorted set in [sets], with each player's initials. */
async function boards(space: Space, at: Date, sets: string[]): Promise<Entry[][]> {
  const db = connected();
  const pipe = db.pipeline();
  for (const set of sets) pipe.zrange(set, 0, BOARD_SIZE - 1, { rev: true, withScores: true });
  const flats = await pipe.exec<string[][]>();

  const lists = flats.map((flat) => {
    const out: { device: string; score: number }[] = [];
    for (let i = 0; i < flat.length; i += 2) {
      out.push({ device: String(flat[i]), score: scoreOf(Number(flat[i + 1])) });
    }
    return out;
  });

  const devices = [...new Set(lists.flat().map((e) => e.device))];
  // With raw replies, HMGET answers with a list in the order the devices were
  // asked for, not an object keyed by device.
  const found =
    devices.length === 0
      ? []
      : ((await db.hmget(keys(space, at).initials, ...devices)) as unknown as (string | null)[]);
  const names = new Map(devices.map((device, i) => [device, found[i] ?? null]));
  return lists.map((list) =>
    list.map(({ device, score }) => ({ device, name: names.get(device) ?? NO_INITIALS, score })),
  );
}
