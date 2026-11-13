import { record, withinLimit } from "@/lib/kittykaos/board";
import { isPlausible, parseRun } from "@/lib/kittykaos/rules";
import { guarded, json, readBody } from "../respond";

/**
 * A finished Kitty Kaos run. Body: `{ device, score, version }`. Answers with
 * the phone's row after it: `{ best, rank, name, was, made, improved }`.
 * `was` is the rank before this run (null if it had none), `made` means the
 * row is in the top 100, `improved` that this run was a new best.
 */
export async function POST(request: Request) {
  const run = parseRun(await readBody(request));
  if (!run) return json({ error: "malformed" }, 400);
  if (!isPlausible(run)) return json({ error: "implausible" }, 422);

  return guarded(async () => {
    const now = new Date();
    if (!(await withinLimit("run", run.device, now))) return json({ error: "slow down" }, 429);
    return json(await record(run, now));
  });
}
