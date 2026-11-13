import { Unavailable } from "@/lib/kittykaos/board";

/** Every answer the board gives is JSON and never cached unless it says so. */
export function json(body: unknown, status = 200, cache = "no-store"): Response {
  return Response.json(body, { status, headers: { "Cache-Control": cache } });
}

/** The request's JSON body, or undefined if it isn't JSON. */
export async function readBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

/** Turns a missing database into a 503 the game reads as offline. */
export async function guarded(work: () => Promise<Response>): Promise<Response> {
  try {
    return await work();
  } catch (error) {
    if (!(error instanceof Unavailable)) console.error("kittykaos top kittens", error);
    return json({ error: "unavailable" }, 503);
  }
}
