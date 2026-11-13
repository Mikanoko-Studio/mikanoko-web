import { connection } from "next/server";
import { top } from "@/lib/kittykaos/board";
import { guarded, json } from "../respond";

/**
 * The Top Kittens: `{ top: [{ player, name, score }] }`, best first, at most
 * 100. `player` is a row's public ID, for reporting its name. Cached at the
 * edge for a few seconds, since every phone opening the board asks for it.
 */
export async function GET() {
  await connection();
  return guarded(async () =>
    json({ top: await top() }, 200, "public, s-maxage=15, stale-while-revalidate=60"),
  );
}
