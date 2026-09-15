export function calculateWpm(correctChars, durationMs) {
    if (correctChars <= 0 || durationMs <= 0) {
        return 0;
    }
    const durationMinutes = durationMs / 60000;
    return (correctChars / 5) / durationMinutes;
}
export function calculateRawWpm(totalChars, durationMs) {
    if (totalChars <= 0 || durationMs <= 0) {
        return 0;
    }
    const durationMinutes = durationMs / 60000;
    return (totalChars / 5) / durationMinutes;
}
