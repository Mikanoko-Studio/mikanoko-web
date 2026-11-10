import { isOnABoard, setInitials } from "@/lib/motokitty/board";
import { parseDevice, parseInitials } from "@/lib/motokitty/rules";
import { guarded, json, readBody } from "../respond";

/**
 * Puts a rider's initials on the board. Body: `{ device, initials }`. Only a
 * device that's on one of the top tens may, so initials are never stored for
 * anyone who hasn't made the board.
 */
export async function POST(request: Request) {
  const body = (await readBody(request)) as Record<string, unknown> | undefined;
  const device = parseDevice(body?.device);
  if (!device) return json({ error: "malformed" }, 400);
  const initials = parseInitials(body?.initials);
  if (!initials) return json({ error: "not allowed" }, 422);

  return guarded(async () => {
    if (!(await isOnABoard(device, new Date()))) return json({ error: "not on the board" }, 403);
    await setInitials(device, initials);
    return json({ initials });
  });
}
