import type { StudioApp } from "@/types/app";
import { kittyKaos } from "./kitty-kaos/app";
import { shiftKitty } from "./shift-kitty/app";
import { sockRadar } from "./sock-radar/app";

/**
 * Every app the studio has. Order is the order they appear on the homepage.
 * Add a new one by dropping a folder in here and adding it to this array.
 */
export const apps: StudioApp[] = [kittyKaos, shiftKitty, sockRadar];
