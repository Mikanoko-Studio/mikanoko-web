/**
 * MotoKitty's world board: the rules, with no storage, so they can be checked
 * on their own. The game talks to `/api/motokitty/*`; nothing on the website
 * shows this board.
 *
 * The numbers below mirror the game's `scripts/config.gd`. If the game's speed
 * or scoring changes, these change in the same release, or honest runs get
 * turned away.
 */

/** How many riders each board shows. */
export const BOARD_SIZE = 10;

/** The view's speed in pixels a second (`view_speed_max`). It never ramps. */
const VIEW_SPEED = 1755;
/** World pixels per point (`pixels_per_point`). */
const PIXELS_PER_POINT = 22;
/**
 * How far the bike can be from where the view alone would put it: half the
 * widest screen the game is drawn on, plus room for a ragged last frame. The
 * bike explodes if it leaves the screen, so a real score can't drift further.
 */
const DRIFT_PIXELS = 600 + VIEW_SPEED * 0.5;

/** Longest run we believe, in seconds. Far beyond anything human. */
const MAX_DURATION = 3 * 60 * 60;

export type Run = {
  device: string;
  score: number;
  /** Seconds of ride time, counted by the game's own clock. */
  duration: number;
  /** The road's seed, kept with a best run so it can be looked at later. */
  seed: number;
  /** The game version that rode it, e.g. "1.0.0". */
  version: string;
};

const DEVICE = /^[0-9a-f]{32}$/;
const VERSION = /^\d{1,3}\.\d{1,3}\.\d{1,3}$/;

/** Reads a run from a request body, or returns null if any part is malformed. */
export function parseRun(body: unknown): Run | null {
  if (typeof body !== "object" || body === null) return null;
  const { device, score, duration, seed, version } = body as Record<string, unknown>;
  if (typeof device !== "string" || !DEVICE.test(device)) return null;
  if (typeof version !== "string" || !VERSION.test(version)) return null;
  if (!Number.isSafeInteger(score) || (score as number) < 0) return null;
  if (!Number.isSafeInteger(seed) || (seed as number) < 0 || (seed as number) > 0xffffffff) {
    return null;
  }
  if (typeof duration !== "number" || !Number.isFinite(duration)) return null;
  if (duration < 0 || duration > MAX_DURATION) return null;
  return {
    device,
    score: score as number,
    duration,
    seed: seed as number,
    version,
  };
}

/**
 * Whether a score could come from a run that long. The view moves at a fixed
 * speed and the bike has to stay on screen, so distance is almost exactly
 * time × speed: a score far off that line wasn't ridden.
 */
export function isPlausible(run: Run): boolean {
  const expected = run.duration * VIEW_SPEED;
  return Math.abs(run.score * PIXELS_PER_POINT - expected) <= DRIFT_PIXELS;
}

export function parseDevice(value: unknown): string | null {
  return typeof value === "string" && DEVICE.test(value) ? value : null;
}

/**
 * Three-letter combinations we won't put on a public board. Arcade boards
 * have always had to do this. Matched exactly, A–Z only, so there's no
 * look-alike spelling to slip through.
 */
const BLOCKED = new Set([
  "ASS", "ARS", "AZZ", "CUM", "CUN", "CNT", "COC", "COK", "DIC", "DIK", "DIX",
  "FAG", "FAP", "FCK", "FUC", "FUK", "FUQ", "FUX", "FKU", "JIZ", "KKK", "KYK",
  "NIG", "NGR", "NGA", "NAZ", "PUS", "PIS", "SEX", "SHT", "SLT", "SPK", "SPC",
  "TIT", "TWT", "VAG", "WOP", "XXX", "GOK", "CHK", "HOE", "HOR", "RPE", "SUK",
  "SUC", "PNS", "JEZ", "KUM", "BCH", "BJS", "HHH",
]);

/** Cleans up initials, or returns null if they aren't three allowed letters. */
export function parseInitials(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const initials = value.toUpperCase();
  if (!/^[A-Z]{3}$/.test(initials)) return null;
  return BLOCKED.has(initials) ? null : initials;
}

/**
 * The week a moment falls in, as an ISO week like "2026-W46". Weeks start
 * Monday 00:00 UTC, the same moment for every rider in the world.
 */
export function weekKey(at: Date): string {
  const day = new Date(Date.UTC(at.getUTCFullYear(), at.getUTCMonth(), at.getUTCDate()));
  // The ISO year is the one this week's Thursday falls in.
  const weekday = day.getUTCDay() || 7;
  day.setUTCDate(day.getUTCDate() + 4 - weekday);
  const yearStart = Date.UTC(day.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((day.getTime() - yearStart) / 86_400_000 + 1) / 7);
  return `${day.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
