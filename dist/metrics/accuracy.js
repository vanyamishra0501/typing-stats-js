export function calculateAccuracy(correctChars, totalChars) {
    if (totalChars <= 0) {
        return 0;
    }
    return (correctChars / totalChars) * 100;
}
