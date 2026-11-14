import { record, withinLimit } from "@/lib/motokitty/board";
import { isPlausible, parseRun, spaceOf } from "@/lib/motokitty/rules";
import { guarded, json, readBody } from "../respond";

/**
 * A finished MotoKitty ride. Body: `{ device, score, duration, seed, version }`.
 * Each player has one row per board, holding their best. Answers with where
 * the player's row is now on each board:
 * `{ week: { rank, made, improved }, all: { rank, made, improved } }`.
 * `made` means the row is in that top ten; `improved` that this ride was a new
 * best there. When it improved the all-time row and that row is in the top ten,
 * `board` is that top ten with the player's row marked `you`, for initials.
 * `?board=test` is the test board.
 */
export async function POST(request: Request) {
  const run = parseRun(await readBody(request));
  if (!run) return json({ error: "malformed" }, 400);
  if (!isPlausible(run)) return json({ error: "implausible" }, 422);
  const space = spaceOf(request.url);

  return guarded(async () => {
    const now = new Date();
    if (!(await withinLimit(space, "run", run.device, now))) {
      return json({ error: "slow down" }, 429);
    }
    return json(await record(space, run, now));
  });
}
