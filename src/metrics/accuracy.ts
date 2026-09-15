export function calculateAccuracy(
  correctChars: number,
  totalChars: number
): number {
  if (totalChars <= 0) {
    return 0;
  }

  return (correctChars / totalChars) * 100;
}