import { describe, expect, it } from "vitest";
import { calculateConsistency } from "../src/metrics/consistency";

describe("Consistency", () => {
  it("returns 0 for no typing", () => {
    expect(calculateConsistency([])).toBe(0);
  });

  it("returns 100 for one stable window", () => {
    const entries = Array.from(
      { length: 10 },
      (_, index) => ({
        timestamp: index * 400,
        correct: true,
        key: "a"
      })
    );

    expect(calculateConsistency(entries)).toBe(100);
  });

  it("returns a bounded value for multiple windows", () => {
    const entries = [
      ...Array.from({ length: 10 }, (_, index) => ({
        timestamp: index * 400,
        correct: true,
        key: "a"
      })),
      ...Array.from({ length: 20 }, (_, index) => ({
        timestamp: 5000 + index * 200,
        correct: true,
        key: "b"
      }))
    ];

    const result = calculateConsistency(entries);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });
});