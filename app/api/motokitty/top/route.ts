import { connection } from "next/server";
import { top } from "@/lib/motokitty/board";
import { spaceOf } from "@/lib/motokitty/rules";
import { guarded, json } from "../respond";

/**
 * Both MotoKitty top tens: `{ week: [{ name, score }], all: [...] }`, best
 * first, one row per player. Cached at the edge for a few seconds, since every
 * phone on the home screen asks for it. `?board=test` is the test board.
 */
export async function GET(request: Request) {
  await connection();
  return guarded(async () =>
    json(
      await top(spaceOf(request.url), new Date()),
      200,
      "public, s-maxage=15, stale-while-revalidate=60",
    ),
  );
}
