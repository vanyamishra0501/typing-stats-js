export function buildErrorHeatmap(
  entries: Array<{
    key: string;
    correct: boolean;
  }>
): Record<string, number> {
  const heatmap: Record<string, number> = {};

  for (const entry of entries) {
    if (!entry.correct && entry.key !== "Backspace") {
      heatmap[entry.key] = (heatmap[entry.key] ?? 0) + 1;
    }
  }

  return heatmap;
}