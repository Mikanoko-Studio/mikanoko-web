import { mine } from "@/lib/kittykaos/board";
import { parseDevice } from "@/lib/kittykaos/rules";
import { guarded, json, readBody } from "../respond";

/**
 * A phone's own row. Body: `{ device }`. Answers `{ best, rank, name }`, all
 * null if the board has no run from it. A POST, so the device ID stays out of
 * URLs and logs.
 */
export async function POST(request: Request) {
  const body = (await readBody(request)) as Record<string, unknown> | undefined;
  const device = parseDevice(body?.device);
  if (!device) return json({ error: "malformed" }, 400);
  return guarded(async () => json(await mine(device)));
}
