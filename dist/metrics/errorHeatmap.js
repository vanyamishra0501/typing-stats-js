export function buildErrorHeatmap(entries) {
    const heatmap = {};
    for (const entry of entries) {
        if (!entry.correct && entry.key !== "Backspace") {
            heatmap[entry.key] = (heatmap[entry.key] ?? 0) + 1;
        }
    }
    return heatmap;
}
