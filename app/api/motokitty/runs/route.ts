import { record, withinLimit } from "@/lib/motokitty/board";
import { isPlausible, parseRun } from "@/lib/motokitty/rules";
import { guarded, json, readBody } from "../respond";

/**
 * A finished MotoKitty run. Body: `{ device, score, duration, seed, version }`.
 * Answers with where it landed on each board: `{ week: { rank, made }, all: { rank, made } }`.
 * `made` means it's the device's new best and in the top ten, so the game asks
 * for initials.
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
