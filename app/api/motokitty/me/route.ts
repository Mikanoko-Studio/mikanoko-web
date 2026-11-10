import { best } from "@/lib/motokitty/board";
import { parseDevice } from "@/lib/motokitty/rules";
import { guarded, json, readBody } from "../respond";

/**
 * A phone's own best ride on the world board. Body: `{ device }`. Answers
 * `{ best, rank }`: the best score the server has from this device and its
 * place on the all-time board, ranked by the same rules as the top ten. Both
 * are null if the server has no ride from it. A POST, so the device ID stays
 * out of URLs and logs.
 */
export async function POST(request: Request) {
  const body = (await readBody(request)) as Record<string, unknown> | undefined;
  const device = parseDevice(body?.device);
  if (!device) return json({ error: "malformed" }, 400);
  return guarded(async () => json(await best(device)));
}
