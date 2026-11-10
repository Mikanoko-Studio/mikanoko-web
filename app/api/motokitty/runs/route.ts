import { record, withinLimit } from "@/lib/motokitty/board";
import { isPlausible, parseRun } from "@/lib/motokitty/rules";
import { guarded, json, readBody } from "../respond";

/**
 * A finished MotoKitty ride. Body: `{ device, score, duration, seed, version }`.
 * Answers with where it landed on each board: `{ week: { rank, made }, all: { rank, made } }`.
 * `made` means it's in that top ten. Then `ride` is its ID, for putting initials
 * on it, and if it made the all-time top ten, `board` is that top ten with this
 * ride's row marked `you`.
 */
export async function POST(request: Request) {
  const run = parseRun(await readBody(request));
  if (!run) return json({ error: "malformed" }, 400);
  if (!isPlausible(run)) return json({ error: "implausible" }, 422);

  return guarded(async () => {
    const now = new Date();
    if (!(await withinLimit(run.device, now))) return json({ error: "slow down" }, 429);
    return json(await record(run, now));
  });
}
