/**
 * Looks after Kitty Kaos's Top Kittens board from the command line, through
 * the site's admin route (Vercel won't hand out the database's own password).
 * Reads the admin token from ~/.config/mikanoko/kittykaos-admin.token, the
 * same value as the site's KITTYKAOS_ADMIN_TOKEN. Never commit it.
 *
 *   pnpm kittykaos top                # the board as the game shows it
 *   pnpm kittykaos reported           # the most reported names
 *   pnpm kittykaos quiet <player>     # hide a name for good ("A Kitten")
 *   pnpm kittykaos ban <player>       # take a player off the board for good
 *
 * <player> is the 12-digit ID shown by `top` and `reported`. KITTYKAOS_SITE
 * (and KITTYKAOS_ADMIN_TOKEN) point it somewhere other than
 * https://mikanoko.studio, e.g. a local server.
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { parsePlayer } from "../lib/kittykaos/rules.ts";

type Row = { player: string; name: string; score: number; reports?: number };

const SITE = process.env.KITTYKAOS_SITE ?? "https://mikanoko.studio";
const TOKEN_PATH = join(homedir(), ".config", "mikanoko", "kittykaos-admin.token");

async function admin(body: Record<string, string>): Promise<Record<string, unknown>> {
  const token = process.env.KITTYKAOS_ADMIN_TOKEN ?? readFileSync(TOKEN_PATH, "utf8").trim();
  const res = await fetch(`${SITE}/api/kittykaos/admin`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const answer = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new Error(`${res.status} ${String(answer.error ?? "")}`.trim());
  return answer;
}

async function main(command: string | undefined, arg: string | undefined): Promise<number> {
  switch (command) {
    case "top": {
      const rows = (await admin({ action: "top" })).top as Row[];
      rows.forEach((row, i) =>
        console.log(`${String(i + 1).padStart(3)}  ${row.player}  ${String(row.score).padStart(4)}  ${row.name}`),
      );
      if (rows.length === 0) console.log("The board is empty.");
      return 0;
    }
    case "reported": {
      const rows = (await admin({ action: "reported" })).reported as Row[];
      for (const row of rows) {
        console.log(`${String(row.reports).padStart(3)}×  ${row.player}  ${row.name}  (best ${row.score})`);
      }
      if (rows.length === 0) console.log("No reports.");
      return 0;
    }
    case "quiet":
    case "ban": {
      const player = parsePlayer(arg);
      if (!player) {
        console.error(`Give a 12-digit player ID: pnpm kittykaos ${command} <player>`);
        return 2;
      }
      await admin({ action: command, player });
      console.log(`${command === "quiet" ? "Hid the name of" : "Banned"} ${player}.`);
      return 0;
    }
    default:
      console.error("Use one of: top, reported, quiet <player>, ban <player>");
      return 2;
  }
}

try {
  process.exitCode = await main(process.argv[2], process.argv[3]);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
