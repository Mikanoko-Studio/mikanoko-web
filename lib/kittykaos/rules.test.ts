import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAX_SCORE,
  NAME_LENGTH,
  catsOf,
  isPlausible,
  parseName,
  parsePlayer,
  parseRun,
  rowScore,
} from "./rules.ts";

const DEVICE = "0123456789abcdef0123456789abcdef";

test("a run needs a device, a whole score and a version", () => {
  assert.deepEqual(parseRun({ device: DEVICE, score: 31, version: "1.0.2" }), {
    device: DEVICE,
    score: 31,
    version: "1.0.2",
  });
  assert.equal(parseRun({ device: DEVICE, score: 31.5, version: "1.0.2" }), null);
  assert.equal(parseRun({ device: DEVICE, score: -1, version: "1.0.2" }), null);
  assert.equal(parseRun({ device: "phone", score: 31, version: "1.0.2" }), null);
  assert.equal(parseRun({ device: DEVICE, score: 31, version: "1.0.2+31" }), null);
  assert.equal(parseRun(null), null);
});

test("no real tower reaches the ceiling", () => {
  assert.ok(isPlausible({ device: DEVICE, score: MAX_SCORE, version: "1.0.2" }));
  assert.ok(!isPlausible({ device: DEVICE, score: MAX_SCORE + 1, version: "1.0.2" }));
});

test("more cats rank higher, and on a tie the earlier run does", () => {
  const monday = new Date("2026-11-16T09:00:00Z");
  const tuesday = new Date("2026-11-17T09:00:00Z");
  assert.ok(rowScore(32, tuesday) > rowScore(31, monday));
  assert.ok(rowScore(31, monday) > rowScore(31, tuesday));
  assert.ok(rowScore(31, monday) > rowScore(31, new Date("2026-11-16T09:00:01Z")));
});

test("a row's number gives back its cats", () => {
  const at = new Date("2026-11-16T09:00:00Z");
  for (const cats of [0, 1, 31, 999, MAX_SCORE]) assert.equal(catsOf(rowScore(cats, at)), cats);
  assert.equal(catsOf(rowScore(31, new Date("2340-01-01T00:00:00Z"))), 31);
  assert.ok(Number.isSafeInteger(rowScore(MAX_SCORE, at)));
});

test("names are tidied and kept short", () => {
  assert.equal(parseName("  Mochi   Mama "), "Mochi Mama");
  assert.equal(parseName("x".repeat(NAME_LENGTH)), "x".repeat(NAME_LENGTH));
  assert.equal(parseName("x".repeat(NAME_LENGTH + 1)), null);
  assert.equal(parseName("   "), null);
  assert.equal(parseName(""), null);
  assert.equal(parseName(42), null);
  assert.equal(parseName("a kitten"), null, "the hidden name is ours");
});

test("only English letters, digits and spaces", () => {
  assert.equal(parseName("Haru2"), "Haru2");
  assert.equal(parseName("ねこ"), null);
  assert.equal(parseName("Zoë"), null);
  assert.equal(parseName("bean!"), null);
  assert.equal(parseName("a_b"), null);
});

test("the filter turns away rude names however they're spelled", () => {
  for (const name of [
    "fuck",
    "FUCK",
    "f u c k",
    "fuuuuck",
    "phuck you",
    "sh1t",
    "5hit",
    "big boobs",
    "ass",
    "a55",
    "my ass",
    "dick",
    "d1ck",
    "kkk",
    "hitler",
    "cum",
    "c u m",
  ]) {
    assert.equal(parseName(name), null, name);
  }
});

test("the filter lets ordinary names through", () => {
  for (const name of [
    "Cassie",
    "Mochi Mama",
    "grandpa joe",
    "Dickens",
    "Hancock",
    "Cassandra",
    "cucumber",
    "Raccoon",
    "Spicy Udon",
    "grape",
    "Torpedo",
    "Peacock",
    "Hello Kitty",
    "Kiki",
    "loaf lord",
    "pickles4ever",
    "Analise",
  ]) {
    assert.equal(parseName(name), name, name);
  }
});

test("player IDs are twelve hex digits", () => {
  assert.equal(parsePlayer("0123456789ab"), "0123456789ab");
  assert.equal(parsePlayer(DEVICE), null);
  assert.equal(parsePlayer("0123456789AB"), null);
});
