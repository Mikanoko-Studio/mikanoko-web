import { canName, setInitials } from "@/lib/motokitty/board";
import { parseDevice, parseInitials, parseRide } from "@/lib/motokitty/rules";
import { guarded, json, readBody } from "../respond";

/**
 * Puts initials on a ride. Body: `{ device, ride, initials }`, where `ride` is
 * the ID the server gave when the ride made a top ten. Only the device that
 * rode it may, and only while it's on a top ten, so initials are never stored
 * for a ride that didn't make the board.
 */
export async function POST(request: Request) {
  const body = (await readBody(request)) as Record<string, unknown> | undefined;
  const device = parseDevice(body?.device);
  const ride = parseRide(body?.ride);
  if (!device || !ride) return json({ error: "malformed" }, 400);
  const initials = parseInitials(body?.initials);
  if (!initials) return json({ error: "not allowed" }, 422);

  return guarded(async () => {
    if (!(await canName(device, ride, new Date()))) {
      return json({ error: "not on the board" }, 403);
    }
    await setInitials(ride, initials);
    return json({ initials });
  });
}
