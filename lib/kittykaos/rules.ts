/**
 * Kitty Kaos's Top Kittens board: the rules, with no storage, so they can be
 * checked on their own (`pnpm test`). The game talks to `/api/kittykaos/*`;
 * nothing on the website shows this board.
 *
 * One row per phone: a better run moves the row, it never adds one. The score
 * is the number of cats the game already shows; the server doesn't second-guess
 * it beyond a ceiling no real tower reaches.
 */

/** How many players the board shows. */
export const BOARD_SIZE = 100;

/** Most cats we believe in one run. Far beyond any real tower. */
export const MAX_SCORE = 2_000;

/** Longest name on the board. */
export const NAME_LENGTH = 12;

/** What the board shows for a player who hasn't named themselves, or was hidden. */
export const NO_NAME = "A Kitten";

export type Run = {
  device: string;
  score: number;
  /** The game version that played it, e.g. "1.0.2". */
  version: string;
};

const DEVICE = /^[0-9a-f]{32}$/;
const VERSION = /^\d{1,3}\.\d{1,3}\.\d{1,3}$/;
/** A row's public ID: what the board hands out instead of a device. */
const PLAYER = /^[0-9a-f]{12}$/;

/** Reads a run from a request body, or returns null if any part is malformed. */
export function parseRun(body: unknown): Run | null {
  if (typeof body !== "object" || body === null) return null;
  const { device, score, version } = body as Record<string, unknown>;
  if (typeof device !== "string" || !DEVICE.test(device)) return null;
  if (typeof version !== "string" || !VERSION.test(version)) return null;
  if (!Number.isSafeInteger(score) || (score as number) < 0) return null;
  return { device, score: score as number, version };
}

/** Whether a score is one a real tower could reach. */
export function isPlausible(run: Run): boolean {
  return run.score <= MAX_SCORE;
}

export function parseDevice(value: unknown): string | null {
  return typeof value === "string" && DEVICE.test(value) ? value : null;
}

export function parsePlayer(value: unknown): string | null {
  return typeof value === "string" && PLAYER.test(value) ? value : null;
}

/**
 * Orders the board. Redis sorts by one number, so a row's number holds both
 * the cats and when they were stacked: more cats first, and on a tie, whoever
 * got there first. Exact as a double while cats stay under [MAX_SCORE].
 */
const TIME_SLOTS = 10_000_000_000;
/** Seconds are counted from here, so they fit in [TIME_SLOTS] until 2342. */
const EPOCH = Date.UTC(2026, 0, 1);

export function rowScore(cats: number, at: Date): number {
  const seconds = Math.floor((at.getTime() - EPOCH) / 1000);
  return cats * TIME_SLOTS + (TIME_SLOTS - 1 - seconds);
}

/** The cats in a row's number. */
export function catsOf(row: number): number {
  return Math.floor(row / TIME_SLOTS);
}

/**
 * Tidies a name for the board, or returns null if it can't go on one: 1 to
 * [NAME_LENGTH] English letters, digits and single spaces, with at least one
 * letter or digit, and nothing the filter turns away.
 */
export function parseName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const name = value.trim().replace(/\s+/g, " ");
  if (name.length === 0 || name.length > NAME_LENGTH) return null;
  if (!/^[A-Za-z0-9 ]+$/.test(name)) return null;
  if (name.toLowerCase() === NO_NAME.toLowerCase()) return null;
  return isClean(name) ? name : null;
}

/** Digits and symbols people use in place of letters. */
const LOOK_ALIKES: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "8": "b",
  "9": "g",
};

/**
 * Words turned away wherever they appear, even inside a longer name, with
 * spaces and look-alike digits taken out first. Only words no innocent name
 * contains: anything that hides in ordinary words ("ass" in "Cassie") goes in
 * [WHOLE_WORDS] instead.
 */
const ANYWHERE = [
  "fuck", "fck", "phuck", "shit", "cunt", "nigg", "niga", "nigr", "bitch", "biatch", "whore",
  "slut", "rapist", "nazi", "hitler", "porn", "penis", "vagina", "pussy", "dildo", "jizz", "boob",
  "titty", "faggot", "retard", "wank", "bollock", "twat", "molest", "paedo", "incest", "kkk",
  "blowjob", "handjob", "orgasm", "horny", "killyourself", "suicide", "terrorist", "wetback",
  "tranny", "kike", "chink", "gook",
];

/**
 * Words turned away only as a whole word of the name (or the whole name with
 * the spaces taken out), because they hide inside ordinary ones.
 */
const WHOLE_WORDS = [
  "ass", "arse", "asshole", "dick", "dik", "bum", "butt", "crap", "damn", "hell", "piss", "poop",
  "sex", "sexy", "nude", "naked", "hoe", "hore", "tit", "tits", "kill", "die", "dead", "gay",
  "nig", "jap", "paki", "negro", "homo", "milf", "thot", "simp", "nsfw", "xxx", "slave", "fuk",
  "fag", "cum", "anal", "anus", "coon", "spic", "cock", "rape", "pedo", "semen", "heil", "isis",
  "kys", "dyke", "sht",
];

/** Lowercase, look-alikes swapped back, spaces gone. */
function squash(name: string): string {
  return [...name.toLowerCase()]
    .map((ch) => LOOK_ALIKES[ch] ?? ch)
    .join("")
    .replace(/[^a-z]/g, "");
}

/** Runs of one letter cut to one: "fuuuck" → "fuck". */
function single(text: string): string {
  return text.replace(/(.)\1+/g, "$1");
}

/**
 * Each word as written and with its doubled letters cut, so "fuuuck" and
 * "bolock" are caught; a cut form shorter than three letters ("kkk" → "k")
 * would catch far too much, so it's left out.
 */
function forms(words: string[]): string[] {
  return [...new Set(words.flatMap((word) => [word, single(word)]))].filter((w) => w.length >= 3);
}

const ANYWHERE_FORMS = forms(ANYWHERE);
const WHOLE_FORMS = new Set(forms(WHOLE_WORDS));

/** Whether a name is free of the words above, however it's spelled. */
export function isClean(name: string): boolean {
  const whole = squash(name);
  const spellings = [whole, single(whole)];
  if (spellings.some((form) => ANYWHERE_FORMS.some((word) => form.includes(word)))) return false;
  const words = name.split(" ").map(squash);
  const candidates = [...words, ...words.map(single), ...spellings];
  return !candidates.some((word) => WHOLE_FORMS.has(word));
}
