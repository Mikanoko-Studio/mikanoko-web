import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import { BOARD_SIZE, NO_NAME, type Run, catsOf, rowScore } from "./rules";

/**
 * Kitty Kaos's Top Kittens board in Redis: one row per phone, holding its best
 * run. A better run moves the row up; anything else leaves it be.
 *
 * Phones are known by a random device ID the game makes. The board never hands
 * that out: each row has a public player ID instead (a hash of the device), so
 * a name can be reported without anyone learning another phone's device ID.
 *
 * Keys, all under `kittykaos:` so nothing touches MotoKitty's:
 * - `kittykaos:board`: sorted set, device → [rowScore] (cats, then earliest).
 * - `kittykaos:names`: hash, device → name.
 * - `kittykaos:players`: hash, player ID → device, for reports and hiding.
 * - `kittykaos:quiet`: set of devices whose names were hidden; they show as
 *   [NO_NAME] and can't name themselves again.
 * - `kittykaos:banned`: set of devices whose runs no longer count.
 * - `kittykaos:reports`: sorted set, player ID → times reported.
 * - `kittykaos:limit:<kind>:<device>:<minute>`: requests this minute.
 */

const BOARD = "kittykaos:board";
const NAMES = "kittykaos:names";
const PLAYERS = "kittykaos:players";
const QUIET = "kittykaos:quiet";
const BANNED = "kittykaos:banned";
const REPORTS = "kittykaos:reports";

/** Rows kept. A rank past this is never shown. */
const KEEP = 100_000;

/** Requests one device can make in a minute, by kind. A run takes a while. */
const PER_MINUTE = { run: 20, name: 10, report: 10 } as const;

export type Kind = keyof typeof PER_MINUTE;

/** A row as the game sees it. */
export type Kitten = { player: string; name: string; score: number };

/** A device's row: its best, its place and its name. All null without one. */
export type Mine = { best: number | null; rank: number | null; name: string | null };

/**
 * Where a run left the device's row. `was` is the rank before this run (null
 * if it had no row), so the game can say how far it climbed. `made` means the
 * row is in the top [BOARD_SIZE]; `improved` that this run was its new best.
 */
export type RunResult = Mine & { was: number | null; made: boolean; improved: boolean };

/** A row's public ID: the first 12 hex digits of the device's SHA-256. */
export function playerId(device: string): string {
  return createHash("sha256").update(`kittykaos:${device}`).digest("hex").slice(0, 12);
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
  if (!db) throw new Unavailable("The Top Kittens database isn't connected.");
  return db;
}

/** Counts a request against the device's limit. False once it's made too many. */
export async function withinLimit(kind: Kind, device: string, at: Date): Promise<boolean> {
  const db = connected();
  const key = `kittykaos:limit:${kind}:${device}:${Math.floor(at.getTime() / 60_000)}`;
  const [count] = await db.pipeline().incr(key).expire(key, 120).exec<[number, number]>();
  return Number(count) <= PER_MINUTE[kind];
}

/** Records a run: moves the device's row if it beat its best. */
export async function record(run: Run, at: Date): Promise<RunResult> {
  const db = connected();
  const [before, banned] = await db
    .pipeline()
    .zrevrank(BOARD, run.device)
    .sismember(BANNED, run.device)
    .exec<[number | null, number]>();
  const was = before === null ? null : Number(before) + 1;
  if (Number(banned) === 1) {
    // Answered as if counted, so a banned phone can't tell.
    return { ...(await mine(run.device)), was, made: false, improved: false };
  }
  const replies = await db
    .pipeline()
    // Counts 1 only when this run beats the row: a tie keeps the earlier run.
    .zadd(BOARD, { gt: true, ch: true }, { score: rowScore(run.score, at), member: run.device })
    .hset(PLAYERS, { [playerId(run.device)]: run.device })
    .zremrangebyrank(BOARD, 0, -(KEEP + 1))
    .exec<unknown[]>();
  const now = await mine(run.device);
  return {
    ...now,
    was,
    made: now.rank !== null && now.rank <= BOARD_SIZE,
    improved: Number(replies[0]) === 1,
  };
}

/** A device's row: best, rank and name, read from the board itself. */
export async function mine(device: string): Promise<Mine> {
  const db = connected();
  const [row, rank, name, quiet] = await db
    .pipeline()
    .zscore(BOARD, device)
    .zrevrank(BOARD, device)
    .hget(NAMES, device)
    .sismember(QUIET, device)
    .exec<[string | null, number | null, string | null, number]>();
  return {
    best: row === null ? null : catsOf(Number(row)),
    rank: rank === null ? null : Number(rank) + 1,
    name: Number(quiet) === 1 ? null : name,
  };
}

/** Why a name can't be put on a device's row, or null if it can. */
export async function cannotName(device: string): Promise<"no row" | "quiet" | null> {
  const db = connected();
  const [row, quiet] = await db
    .pipeline()
    .zscore(BOARD, device)
    .sismember(QUIET, device)
    .exec<[string | null, number]>();
  if (Number(quiet) === 1) return "quiet";
  return row === null ? "no row" : null;
}

export async function setName(device: string, name: string): Promise<void> {
  await connected().hset(NAMES, { [device]: name });
}

/** The top [BOARD_SIZE], best first, each with its name. */
export async function top(): Promise<Kitten[]> {
  const db = connected();
  const flat = await db.zrange<string[]>(BOARD, 0, BOARD_SIZE - 1, { rev: true, withScores: true });
  const rows: { device: string; score: number }[] = [];
  for (let i = 0; i < flat.length; i += 2) {
    rows.push({ device: String(flat[i]), score: catsOf(Number(flat[i + 1])) });
  }
  if (rows.length === 0) return [];
  const devices = rows.map((row) => row.device);
  const pipe = db.pipeline();
  // With raw replies, HMGET answers with a list in the order asked for.
  pipe.hmget(NAMES, ...devices);
  pipe.smismember(QUIET, devices);
  const [names, quiet] = (await pipe.exec()) as unknown as [(string | null)[], number[]];
  return rows.map((row, i) => ({
    player: playerId(row.device),
    name: Number(quiet[i]) === 1 ? NO_NAME : (names[i] ?? NO_NAME),
    score: row.score,
  }));
}

/** Notes a report against a player's name. False if there's no such player. */
export async function report(player: string): Promise<boolean> {
  const db = connected();
  if ((await db.hexists(PLAYERS, player)) !== 1) return false;
  await db.zincrby(REPORTS, 1, player);
  return true;
}

/** The most reported players, worst first: for reading from the command line. */
export async function reported(count = 20): Promise<(Kitten & { reports: number })[]> {
  const db = connected();
  const flat = await db.zrange<string[]>(REPORTS, 0, count - 1, { rev: true, withScores: true });
  const out: (Kitten & { reports: number })[] = [];
  for (let i = 0; i < flat.length; i += 2) {
    const player = String(flat[i]);
    const device = await db.hget<string>(PLAYERS, player);
    if (!device) continue;
    const row = await mine(device);
    out.push({
      player,
      name: row.name ?? NO_NAME,
      score: row.best ?? 0,
      reports: Number(flat[i + 1]),
    });
  }
  return out;
}

/** Hides a player's name for good: it shows as [NO_NAME] and can't be changed. */
export async function quiet(player: string): Promise<boolean> {
  const db = connected();
  const device = await db.hget<string>(PLAYERS, player);
  if (!device) return false;
  await db.pipeline().sadd(QUIET, device).hdel(NAMES, device).zrem(REPORTS, player).exec();
  return true;
}

/** Takes a player off the board for good: their runs stop counting. */
export async function ban(player: string): Promise<boolean> {
  const db = connected();
  const device = await db.hget<string>(PLAYERS, player);
  if (!device) return false;
  await db.pipeline().sadd(BANNED, device).zrem(BOARD, device).zrem(REPORTS, player).exec();
  return true;
}
