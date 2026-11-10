import { connection } from "next/server";
import { top } from "@/lib/motokitty/board";
import { guarded, json } from "../respond";

/**
 * Both MotoKitty top tens: `{ week: [{ name, score }], all: [...] }`, best first.
 * Cached at the edge for a few seconds, since every phone on the home screen
 * asks for it.
 */
export async function GET() {
  await connection();
  return guarded(async () =>
    json(await top(new Date()), 200, "public, s-maxage=15, stale-while-revalidate=60"),
  );
}
