import { best } from "@/lib/motokitty/board";
import { parseDevice, spaceOf } from "@/lib/motokitty/rules";
import { guarded, json, readBody } from "../respond";

/**
 * A phone's own row on the world board. Body: `{ device }`. Answers
 * `{ best, rank }`: its best score and its place on the all-time board, read
 * from the board itself. Both are null if the server has no ride from it. A
 * POST, so the device ID stays out of URLs and logs. `?board=test` is the test
 * board.
 */
export async function POST(request: Request) {
  const body = (await readBody(request)) as Record<string, unknown> | undefined;
  const device = parseDevice(body?.device);
  if (!device) return json({ error: "malformed" }, 400);
  return guarded(async () => json(await best(spaceOf(request.url), device)));
}
