import { timingSafeEqual } from "node:crypto";
import { ban, quiet, reported, top } from "@/lib/kittykaos/board";
import { parsePlayer } from "@/lib/kittykaos/rules";
import { guarded, json, readBody } from "../respond";

/**
 * Looking after the board, for `pnpm kittykaos` (tools/kittykaos.ts) only.
 * Needs `Authorization: Bearer <KITTYKAOS_ADMIN_TOKEN>`; without that variable
 * set, every request is turned away. Body: `{ action, player? }` where action
 * is "top", "reported", "quiet" or "ban".
 */
export async function POST(request: Request) {
  if (!authorized(request.headers.get("authorization"))) return json({ error: "no" }, 401);
  const body = (await readBody(request)) as Record<string, unknown> | undefined;

  return guarded(async () => {
    switch (body?.action) {
      case "top":
        return json({ top: await top() });
      case "reported":
        return json({ reported: await reported() });
      case "quiet":
      case "ban": {
        const player = parsePlayer(body.player);
        if (!player) return json({ error: "malformed" }, 400);
        const done = await (body.action === "quiet" ? quiet(player) : ban(player));
        return done ? json({ done: true }) : json({ error: "no such player" }, 404);
      }
      default:
        return json({ error: "malformed" }, 400);
    }
  });
}

function authorized(header: string | null): boolean {
  const token = process.env.KITTYKAOS_ADMIN_TOKEN;
  if (!token || !header?.startsWith("Bearer ")) return false;
  const given = Buffer.from(header.slice("Bearer ".length));
  const wanted = Buffer.from(token);
  return given.length === wanted.length && timingSafeEqual(given, wanted);
}
