import { describe, expect, it } from "vitest";
import {
  calculateRawWpm,
  calculateWpm
} from "../src/metrics/wpm";

describe("WPM calculations", () => {
  it("calculates WPM correctly", () => {
    expect(calculateWpm(50, 60_000)).toBe(10);
  });

  it("calculates raw WPM correctly", () => {
    expect(calculateRawWpm(100, 60_000)).toBe(20);
  });

  it("returns 0 for zero characters", () => {
    expect(calculateWpm(0, 60_000)).toBe(0);
  });

  it("returns 0 for zero duration", () => {
    expect(calculateWpm(50, 0)).toBe(0);
  });
});