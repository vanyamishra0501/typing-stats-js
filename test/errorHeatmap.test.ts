import { describe, expect, it } from "vitest";
import { buildErrorHeatmap } from "../src/metrics/errorHeatmap";

describe("Error heatmap", () => {
  it("counts repeated typing errors", () => {
    const result = buildErrorHeatmap([
      { key: "a", correct: false },
      { key: "a", correct: false },
      { key: "s", correct: false },
      { key: "h", correct: true }
    ]);

    expect(result).toEqual({
      a: 2,
      s: 1
    });
  });

  it("ignores backspaces", () => {
    const result = buildErrorHeatmap([
      { key: "Backspace", correct: false },
      { key: "x", correct: false }
    ]);

    expect(result).toEqual({
      x: 1
    });
  });
});