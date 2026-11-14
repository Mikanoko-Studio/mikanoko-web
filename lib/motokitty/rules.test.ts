import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAX_SCORE,
  isPlausible,
  parseInitials,
  parseRun,
  rowScore,
  scoreOf,
  spaceOf,
  weekKey,
} from "./rules.ts";

const DEVICE = "0123456789abcdef0123456789abcdef";
const run = (score: number, duration: number) => ({
  device: DEVICE,
  score,
  duration,
  seed: 7,
  version: "1.0.0",
});

test("a run needs a device, a whole score, a duration, a seed and a version", () => {
  assert.deepEqual(parseRun(run(605, 7.6)), run(605, 7.6));
  assert.equal(parseRun({ ...run(605, 7.6), score: 60.5 }), null);
  assert.equal(parseRun({ ...run(605, 7.6), score: -1 }), null);
  assert.equal(parseRun({ ...run(605, 7.6), device: "phone" }), null);
  assert.equal(parseRun({ ...run(605, 7.6), version: "1.0.0+47" }), null);
  assert.equal(parseRun(null), null);
});

test("no score past what the board can hold", () => {
  assert.notEqual(parseRun(run(MAX_SCORE, 1)), null);
  assert.equal(parseRun(run(MAX_SCORE + 1, 1)), null);
});

test("a score has to match the time it took", () => {
  // 1,755 pixels a second at 22 pixels a point: about 80 points a second.
  assert.ok(isPlausible(run(798, 10)));
  assert.ok(!isPlausible(run(2000, 10)));
  assert.ok(!isPlausible(run(100, 10)));
});

test("rows sort by score, then whoever got there first", () => {
  const early = new Date("2026-11-14T10:00:00Z");
  const late = new Date("2026-11-14T10:00:01Z");
  assert.ok(rowScore(606, late) > rowScore(605, early));
  assert.ok(rowScore(605, early) > rowScore(605, late));
  assert.equal(scoreOf(rowScore(605, late)), 605);
});

test("the biggest score stays exact, far in the future", () => {
  const row = rowScore(MAX_SCORE, new Date("2290-01-01T00:00:00Z"));
  assert.ok(Number.isSafeInteger(row));
  assert.equal(scoreOf(row), MAX_SCORE);
  assert.equal(scoreOf(rowScore(0, new Date("2026-01-01T00:00:00Z"))), 0);
});

test("initials are three letters, not on the blocked list", () => {
  assert.equal(parseInitials("dan"), "DAN");
  assert.equal(parseInitials("DA"), null);
  assert.equal(parseInitials("D4N"), null);
  assert.equal(parseInitials("ASS"), null);
});

test("?board=test is the test board; anything else is the real one", () => {
  assert.equal(spaceOf("https://mikanoko.studio/api/motokitty/top?board=test"), "test");
  assert.equal(spaceOf("https://mikanoko.studio/api/motokitty/top"), "live");
  assert.equal(spaceOf("https://mikanoko.studio/api/motokitty/top?board=all"), "live");
});

test("weeks start Monday in UTC", () => {
  assert.equal(weekKey(new Date("2026-11-14T12:00:00Z")), "2026-W46");
  assert.equal(weekKey(new Date("2026-11-16T00:00:00Z")), "2026-W47");
});
