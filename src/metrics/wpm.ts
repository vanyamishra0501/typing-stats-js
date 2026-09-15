export function calculateWpm(
  correctChars: number,
  durationMs: number
): number {
  if (correctChars <= 0 || durationMs <= 0) {
    return 0;
  }

  const durationMinutes = durationMs / 60_000;

  return (correctChars / 5) / durationMinutes;
}

export function calculateRawWpm(
  totalChars: number,
  durationMs: number
): number {
  if (totalChars <= 0 || durationMs <= 0) {
    return 0;
  }

  const durationMinutes = durationMs / 60_000;

  return (totalChars / 5) / durationMinutes;
}