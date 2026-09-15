export interface Keystroke {
  key: string;
  timestamp: number;
  correct?: boolean;
}

export interface TypingResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;

  totalChars: number;
  correctChars: number;
  incorrectChars: number;

  backspaceCount: number;
  backspaceRatio: number;

  errorHeatmap: Record<string, number>;

  consistency: number;

  durationMs: number;

  keystrokeLog: Keystroke[];
}