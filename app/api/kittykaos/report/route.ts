import { report, withinLimit } from "@/lib/kittykaos/board";
import { parseDevice, parsePlayer } from "@/lib/kittykaos/rules";
import { guarded, json, readBody } from "../respond";

/**
 * Reports a name on the board. Body: `{ device, player }`, where `device` is
 * the phone reporting and `player` the row's public ID from `/top`. Answers
 * `{ reported: true }`; the reports are read and acted on by hand.
 */
export async function POST(request: Request) {
  const body = (await readBody(request)) as Record<string, unknown> | undefined;
  const device = parseDevice(body?.device);
  const player = parsePlayer(body?.player);
  if (!device || !player) return json({ error: "malformed" }, 400);

  return guarded(async () => {
    if (!(await withinLimit("report", device, new Date()))) {
      return json({ error: "slow down" }, 429);
    }
    if (!(await report(player))) return json({ error: "no such player" }, 404);
    return json({ reported: true });
  });
}
