import { Redis } from "@upstash/redis";
import { BOARD_SIZE, type Run, weekKey } from "./rules";

/**
 * MotoKitty's world board in Redis, classic arcade style: every ride is its own
 * entry, so a ride good enough for the top ten gets its own row and its own
 * initials, even when the same player already has rows there.
 *
 * Each ride has an ID: `<inverted time>:<device>`. The inverted time makes an
 * earlier ride sort above a later one with the same score, as on a cabinet;
 * the device part lets the server check that initials come from the phone
 * that rode it. Ride IDs never appear in the top ten the server hands out.
 *
 * Keys:
 * - `motokitty:rides:all` and `motokitty:rides:week:<2026-W46>`: sorted sets,
 *   ride → score, trimmed to the best [KEEP] rides.
 * - `motokitty:rides:initials`: hash, ride → three letters, for top-ten rides.
 * - `motokitty:ride:<ride>`: a top-ten ride's details, for checking by hand.
 * - `motokitty:rides:bests`: sorted set, device → its best score, and
 *   `motokitty:rides:best`: hash, device → that best ride, so a phone can ask
 *   for its best ride's place on the board.
 * - `motokitty:limit:<device>:<minute>`: rides sent this minute.
 */

const ALL = "motokitty:rides:all";
const INITIALS = "motokitty:rides:initials";
const BESTS = "motokitty:rides:bests";
const BEST_RIDE = "motokitty:rides:best";
const weekBoard = (at: Date) => `motokitty:rides:week:${weekKey(at)}`;

/** Kept a little past its week, so last week's board can still be looked at. */
const WEEK_KEEP_SECONDS = 21 * 24 * 60 * 60;
/** Rides one device can send in a minute. A ride lasts a few seconds at least. */
const RUNS_PER_MINUTE = 20;
/** Rides kept on each board. A rank past this is never shown. */
const KEEP = 100_000;
/** Inverted times count down from here: base 36, nine digits until 5138. */
const TIME_CEILING = 36 ** 9 - 1;

/** Shown for a ride on the board that hasn't had initials put on it yet. */
const NO_INITIALS = "---";

export type Board = "week" | "all";
export type Rider = { name: string; score: number };

/** Where a ride landed on one board. */
export type Placing = {
  /** 1 is the top. A ride that ties an earlier one goes below it. */
  rank: number;
  /** In the top ten, so it gets initials. */
  made: boolean;
};

/**
 * Where a ride landed. When it made a top ten, `ride` is its ID, for putting
 * initials on it; when it made the all-time one, `board` is that top ten with
 * this ride's row marked `you`, so the game can show it waiting for initials.
 */
export type RunResult = Record<Board, Placing> & {
  ride?: string;
  board?: (Rider & { you: boolean })[];
};

export function rideId(device: string, at: Date): string {
  const inverted = (TIME_CEILING - at.getTime()).toString(36).padStart(9, "0");
  return `${inverted}:${device}`;
}

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

/** Records a ride on both boards and says where it landed. */
export async function record(run: Run, at: Date): Promise<RunResult> {
  const db = connected();
  const week = weekBoard(at);
  const ride = rideId(run.device, at);
  // Every ride already there with this score or more stays above this one.
  const replies = await db
    .pipeline()
    .zcount(ALL, run.score, "+inf")
    .zcount(week, run.score, "+inf")
    .zadd(ALL, { score: run.score, member: ride })
    .zadd(week, { score: run.score, member: ride })
    .expire(week, WEEK_KEEP_SECONDS)
    .zremrangebyrank(ALL, 0, -(KEEP + 1))
    .zremrangebyrank(week, 0, -(KEEP + 1))
    // Counts 1 only when this ride beats the device's best: a tie keeps the
    // earlier ride, which also sits above it on the board.
    .zadd(BESTS, { gt: true, ch: true }, { score: run.score, member: run.device })
    .exec<unknown[]>();
  const [allAhead, weekAhead] = replies as [number, number];
  if (Number(replies[7]) === 1) await db.hset(BEST_RIDE, { [run.device]: ride });

  const all = placing(allAhead);
  const result: RunResult = { all, week: placing(weekAhead) };
  if (all.made || result.week.made) {
    result.ride = ride;
    await db.hset(`motokitty:ride:${ride}`, {
      score: run.score,
      duration: run.duration,
      seed: run.seed,
      version: run.version,
      at: at.toISOString(),
    });
  }
  if (all.made) {
    const [board] = await boards([ALL]);
    result.board = board.map((entry) => ({ ...publicRider(entry), you: entry.ride === ride }));
  }
  return result;
}

/** A device's best ride: its score and its place on the all-time board. */
export type Best = { best: number | null; rank: number | null };

/**
 * The device's best ride and where it sits on the all-time board, read from
 * the same ordered list as the top ten, so the two always agree. The rank is
 * null when the ride has fallen past the [KEEP] rides the board holds.
 */
export async function best(device: string): Promise<Best> {
  const db = connected();
  const [score, ride] = await db
    .pipeline()
    .zscore(BESTS, device)
    .hget(BEST_RIDE, device)
    .exec<[string | null, string | null]>();
  if (score === null || ride === null) return { best: null, rank: null };
  const rank = await db.zrevrank(ALL, ride);
  return { best: Number(score), rank: rank === null ? null : Number(rank) + 1 };
}

function placing(ahead: number): Placing {
  const rank = Number(ahead) + 1;
  return { rank, made: rank <= BOARD_SIZE };
}

/**
 * Whether [ride] was ridden on [device] and is on either top ten, so that
 * device may put initials on it.
 */
export async function canName(device: string, ride: string, at: Date): Promise<boolean> {
  if (!ride.endsWith(`:${device}`)) return false;
  const db = connected();
  const [all, week] = await db
    .pipeline()
    .zrevrank(ALL, ride)
    .zrevrank(weekBoard(at), ride)
    .exec<[number | null, number | null]>();
  return [all, week].some((rank) => rank !== null && Number(rank) < BOARD_SIZE);
}

export async function setInitials(ride: string, initials: string): Promise<void> {
  await connected().hset(INITIALS, { [ride]: initials });
}

/** Both top tens, best first. */
export async function top(at: Date): Promise<Record<Board, Rider[]>> {
  const [all, week] = await boards([ALL, weekBoard(at)]);
  return { all: all.map(publicRider), week: week.map(publicRider) };
}

type Entry = { ride: string; name: string; score: number };

const publicRider = ({ name, score }: Entry): Rider => ({ name, score });

/** Top tens for each sorted set in [keys], with each rider's initials. */
async function boards(keys: string[]): Promise<Entry[][]> {
  const db = connected();
  const pipe = db.pipeline();
  for (const key of keys) pipe.zrange(key, 0, BOARD_SIZE - 1, { rev: true, withScores: true });
  const flats = await pipe.exec<string[][]>();

  const lists = flats.map((flat) => {
    const out: { ride: string; score: number }[] = [];
    for (let i = 0; i < flat.length; i += 2) {
      out.push({ ride: String(flat[i]), score: Number(flat[i + 1]) });
    }
    return out;
  });

  const rides = [...new Set(lists.flat().map((e) => e.ride))];
  // With raw replies, HMGET answers with a list in the order the rides were
  // asked for, not an object keyed by ride.
  const found =
    rides.length === 0
      ? []
      : ((await db.hmget(INITIALS, ...rides)) as unknown as (string | null)[]);
  const names = new Map(rides.map((ride, i) => [ride, found[i] ?? null]));
  return lists.map((list) =>
    list.map(({ ride, score }) => ({ ride, name: names.get(ride) ?? NO_INITIALS, score })),
  );
}
