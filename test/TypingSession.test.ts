import {
  describe,
  expect,
  it
} from "vitest";

import { TypingSession } from "../src/TypingSession";

describe("TypingSession", () => {
  it("records correct characters", () => {
    const session =
      new TypingSession("hello");

    session.recordKeystroke({
      key: "h",
      timestamp: 0
    });

    session.recordKeystroke({
      key: "e",
      timestamp: 1000
    });

    const result =
      session.getResults();

    expect(result.totalChars).toBe(2);
    expect(result.correctChars).toBe(2);
    expect(result.incorrectChars).toBe(0);
    expect(result.accuracy).toBe(100);
  });

  it("records incorrect characters", () => {
    const session =
      new TypingSession("hello");

    session.recordKeystroke({
      key: "x",
      timestamp: 0
    });

    const result =
      session.getResults();

    expect(result.totalChars).toBe(1);
    expect(result.correctChars).toBe(0);
    expect(result.incorrectChars).toBe(1);
    expect(result.accuracy).toBe(0);
    expect(result.errorHeatmap).toEqual({
      x: 1
    });
  });

  it("counts corrected errors as errors", () => {
    const session =
      new TypingSession("hi");

    session.recordKeystroke({
      key: "x",
      timestamp: 0
    });

    session.recordKeystroke({
      key: "Backspace",
      timestamp: 500
    });

    session.recordKeystroke({
      key: "h",
      timestamp: 1000
    });

    const result =
      session.getResults();

    expect(result.incorrectChars).toBe(1);
    expect(result.backspaceCount).toBe(1);
  });

  it("counts repeated backspaces separately", () => {
    const session =
      new TypingSession("hello");

    session.recordKeystroke({
      key: "Backspace",
      timestamp: 0
    });

    session.recordKeystroke({
      key: "Backspace",
      timestamp: 100
    });

    const result =
      session.getResults();

    expect(result.backspaceCount).toBe(2);
    expect(result.backspaceRatio).toBe(1);
  });

  it("supports recordInput", () => {
    const session =
      new TypingSession("hello");

    session.recordInput("he", 0);

    session.recordInput("hello", 1000);

    const result =
      session.getResults();

    expect(result.totalChars).toBe(5);
    expect(result.correctChars).toBe(5);
    expect(result.accuracy).toBe(100);
  });

  it("supports Hindi and Unicode text", () => {
    const session =
      new TypingSession("नमस्ते");

    session.recordInput(
      "नमस्ते",
      1000
    );

    const result =
      session.getResults();

    expect(result.totalChars).toBeGreaterThan(0);
    expect(result.correctChars).toBe(
      result.totalChars
    );
    expect(result.accuracy).toBe(100);
  });

  it("handles a single keystroke safely", () => {
    const session =
      new TypingSession("a");

    session.recordKeystroke({
      key: "a",
      timestamp: 1000
    });

    const result =
      session.getResults();

    expect(Number.isFinite(result.wpm)).toBe(true);
    expect(Number.isFinite(result.rawWpm)).toBe(true);
    expect(Number.isFinite(result.consistency)).toBe(true);
  });

  it("resets the session", () => {
    const session =
      new TypingSession("hello");

    session.recordInput(
      "hello",
      1000
    );

    session.reset();

    const result =
      session.getResults();

    expect(result.totalChars).toBe(0);
    expect(result.correctChars).toBe(0);
    expect(result.backspaceCount).toBe(0);
  });

  it("rejects invalid timestamps", () => {
    const session =
      new TypingSession("hello");

    expect(() => {
      session.recordKeystroke({
        key: "h",
        timestamp: Number.NaN
      });
    }).toThrow();
  });
});