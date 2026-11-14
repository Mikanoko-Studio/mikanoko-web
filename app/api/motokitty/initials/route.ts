import { hasRow, setInitials, withinLimit } from "@/lib/motokitty/board";
import { parseDevice, parseInitials, spaceOf } from "@/lib/motokitty/rules";
import { guarded, json, readBody } from "../respond";

/**
 * Puts initials on a player's row. Body: `{ device, initials }`. The same
 * letters show on every board the player is on, and can be changed any time,
 * from the game's Settings or after a new best. A device with no rides on the
 * board has no row to name: 403. `?board=test` is the test board.
 */
export async function POST(request: Request) {
  const body = (await readBody(request)) as Record<string, unknown> | undefined;
  const device = parseDevice(body?.device);
  if (!device) return json({ error: "malformed" }, 400);
  const initials = parseInitials(body?.initials);
  if (!initials) return json({ error: "not allowed" }, 422);
  const space = spaceOf(request.url);

  return guarded(async () => {
    if (!(await withinLimit(space, "initials", device, new Date()))) {
      return json({ error: "slow down" }, 429);
    }
    if (!(await hasRow(space, device))) return json({ error: "no rides" }, 403);
    await setInitials(space, device, initials);
    return json({ initials });
  });
}
