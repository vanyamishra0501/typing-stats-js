import { calculateWpm } from "./wpm.js";

export function calculateConsistency(
  entries: Array<{
    timestamp: number;
    correct: boolean;
    key: string;
  }>
): number {
  const typingEntries = entries.filter(
    (entry) => entry.key !== "Backspace"
  );

  if (typingEntries.length === 0) {
    return 0;
  }

  const firstTimestamp = typingEntries[0].timestamp;

  const windows = new Map<number, number>();

  for (const entry of typingEntries) {
    const windowIndex = Math.floor(
      Math.max(0, entry.timestamp - firstTimestamp) / 5000
    );

    const current = windows.get(windowIndex) ?? 0;

    windows.set(
      windowIndex,
      current + (entry.correct ? 1 : 0)
    );
  }

  const wpms = Array.from(windows.entries()).map(
    ([windowIndex, correctChars]) => {
      const windowStart =
        firstTimestamp + windowIndex * 5000;

      const windowEnd = Math.min(
        firstTimestamp + (windowIndex + 1) * 5000,
        typingEntries[typingEntries.length - 1].timestamp
      );

      const duration = Math.max(
        5000,
        windowEnd - windowStart
      );

      return calculateWpm(correctChars, duration);
    }
  );

  if (wpms.length <= 1) {
    return wpms[0] > 0 ? 100 : 0;
  }

  const average =
    wpms.reduce((sum, value) => sum + value, 0) /
    wpms.length;

  if (average === 0) {
    return 0;
  }

  const variance =
    wpms.reduce(
      (sum, value) =>
        sum + (value - average) ** 2,
      0
    ) / wpms.length;

  const standardDeviation = Math.sqrt(variance);

  const consistency =
    100 -
    (standardDeviation / average) * 100;

  return Math.max(
    0,
    Math.min(100, consistency)
  );
}