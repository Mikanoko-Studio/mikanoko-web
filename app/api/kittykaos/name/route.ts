import { cannotName, setName, withinLimit } from "@/lib/kittykaos/board";
import { parseDevice, parseName } from "@/lib/kittykaos/rules";
import { guarded, json, readBody } from "../respond";

/**
 * Puts a name on the phone's row. Body: `{ device, name }`. Answers `{ name }`
 * with the name as the board shows it (spaces tidied). A name the filter turns
 * away gets 422, so the game can ask for another; a phone with no row yet, or
 * whose name was hidden, gets 403.
 */
export async function POST(request: Request) {
  const body = (await readBody(request)) as Record<string, unknown> | undefined;
  const device = parseDevice(body?.device);
  if (!device) return json({ error: "malformed" }, 400);
  const name = parseName(body?.name);
  if (!name) return json({ error: "not allowed" }, 422);

  return guarded(async () => {
    if (!(await withinLimit("name", device, new Date()))) return json({ error: "slow down" }, 429);
    const reason = await cannotName(device);
    if (reason) return json({ error: reason }, 403);
    await setName(device, name);
    return json({ name });
  });
}
