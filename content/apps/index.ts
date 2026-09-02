import type { StudioApp } from "@/types/app";
import { kettleWatch } from "./kettle-watch/app";
import { sockRadar } from "./sock-radar/app";
import { untitledFrogThing } from "./untitled-frog-thing/app";

/**
 * Every app the studio has. Order is the order they appear on the homepage.
 * Add a new one by dropping a folder in here and adding it to this array.
 */
export const apps: StudioApp[] = [sockRadar, kettleWatch, untitledFrogThing];
