import type { Keystroke, TypingResult } from "./types.js";
export declare class TypingSession {
    private readonly target;
    private readonly log;
    private cursor;
    private inputValue;
    constructor(targetText: string);
    recordKeystroke(entry: Keystroke): void;
    recordInput(value: string, timestamp: number): void;
    getResults(): TypingResult;
    reset(): void;
}
