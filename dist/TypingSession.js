import { calculateAccuracy } from "./metrics/accuracy";
import { calculateConsistency } from "./metrics/consistency";
import { buildErrorHeatmap } from "./metrics/errorHeatmap";
import { calculateRawWpm, calculateWpm } from "./metrics/wpm";
const segment = (value) => Array.from(value);
const isBackspace = (key) => key === "Backspace" || key === "\b";
export class TypingSession {
    constructor(targetText) {
        this.log = [];
        this.cursor = 0;
        this.inputValue = "";
        this.target = segment(targetText);
    }
    recordKeystroke(entry) {
        if (!Number.isFinite(entry.timestamp)) {
            throw new TypeError("timestamp must be a finite number");
        }
        if (typeof entry.key !== "string") {
            throw new TypeError("key must be a string");
        }
        const key = entry.key;
        if (isBackspace(key)) {
            this.log.push({
                key: "Backspace",
                timestamp: entry.timestamp,
                correct: false
            });
            if (this.cursor > 0) {
                this.cursor -= 1;
            }
            return;
        }
        const expected = this.target[this.cursor];
        const correct = entry.correct ??
            (expected !== undefined &&
                key === expected);
        this.log.push({
            key,
            timestamp: entry.timestamp,
            correct
        });
        this.cursor += 1;
    }
    recordInput(value, timestamp) {
        if (!Number.isFinite(timestamp)) {
            throw new TypeError("timestamp must be a finite number");
        }
        const previous = segment(this.inputValue);
        const next = segment(value);
        let common = 0;
        while (common < previous.length &&
            common < next.length &&
            previous[common] === next[common]) {
            common++;
        }
        const removed = previous.length - common;
        for (let i = 0; i < removed; i++) {
            this.recordKeystroke({
                key: "Backspace",
                timestamp
            });
        }
        this.cursor = common;
        for (let i = common; i < next.length; i++) {
            this.recordKeystroke({
                key: next[i],
                timestamp,
                correct: this.target[this.cursor] === next[i]
            });
        }
        this.inputValue = value;
    }
    getResults() {
        const typingEntries = this.log.filter((entry) => entry.key !== "Backspace");
        const correctChars = typingEntries.filter((entry) => entry.correct === true).length;
        const incorrectChars = typingEntries.length -
            correctChars;
        const totalChars = typingEntries.length;
        const backspaceCount = this.log.filter((entry) => entry.key === "Backspace").length;
        const durationMs = this.log.length >= 2
            ? Math.max(0, this.log[this.log.length - 1].timestamp -
                this.log[0].timestamp)
            : 0;
        return {
            wpm: calculateWpm(correctChars, durationMs),
            rawWpm: calculateRawWpm(totalChars, durationMs),
            accuracy: calculateAccuracy(correctChars, totalChars),
            totalChars,
            correctChars,
            incorrectChars,
            backspaceCount,
            backspaceRatio: this.log.length === 0
                ? 0
                : backspaceCount /
                    this.log.length,
            errorHeatmap: buildErrorHeatmap(typingEntries.map((entry) => ({
                key: entry.key,
                correct: entry.correct === true
            }))),
            consistency: calculateConsistency(this.log.map((entry) => ({
                timestamp: entry.timestamp,
                correct: entry.correct === true,
                key: entry.key
            }))),
            durationMs,
            keystrokeLog: this.log.map((entry) => ({
                ...entry
            }))
        };
    }
    reset() {
        this.log.length = 0;
        this.cursor = 0;
        this.inputValue = "";
    }
}
