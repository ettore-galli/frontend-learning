import { expect, test } from "vitest";
import { sum } from "../src/index.js";

test("sum works", () => {
  expect(sum(1, 2)).toBe(3);
}); 