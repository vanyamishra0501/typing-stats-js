import { describe, expect, it } from "vitest";
import { calculateAccuracy } from "../src/metrics/accuracy";

describe("Accuracy", () => {
  it("returns 100 for all correct characters", () => {
    expect(calculateAccuracy(100, 100)).toBe(100);
  });

  it("calculates partial accuracy", () => {
    expect(calculateAccuracy(95, 100)).toBe(95);
  });

  it("returns 0 for empty input", () => {
    expect(calculateAccuracy(0, 0)).toBe(0);
  });
});