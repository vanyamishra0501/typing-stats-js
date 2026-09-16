# typing-stats-js

A zero-dependency TypeScript library for calculating typing performance from raw keystroke and input data.

## Features

* WPM and Raw WPM calculation
* Typing accuracy
* Correct and incorrect character count
* Backspace count and ratio
* Error heatmap
* Typing consistency
* Typing duration
* Keystroke history
* Unicode and Hindi text support
* TypeScript support
* Framework independent
* Works with JavaScript, React and Node.js
* No browser or DOM dependency
* Zero runtime dependencies

## Installation

Install the package using npm:

```bash
npm install @vanyamishra05/typing-stats-js
```

## Basic Usage

```ts
import { TypingSession } from "@vanyamishra05/typing-stats-js";

const session = new TypingSession("hello");

session.recordKeystroke({
  key: "h",
  timestamp: 0,
  correct: true
});

session.recordKeystroke({
  key: "e",
  timestamp: 1000,
  correct: true
});

session.recordKeystroke({
  key: "l",
  timestamp: 2000,
  correct: true
});

session.recordKeystroke({
  key: "l",
  timestamp: 3000,
  correct: true
});

session.recordKeystroke({
  key: "o",
  timestamp: 4000,
  correct: true
});

const results = session.getResults();

console.log(results);
```

Example output:

```js
{
  wpm: 15,
  rawWpm: 15,
  accuracy: 100,
  totalChars: 5,
  correctChars: 5,
  incorrectChars: 0,
  backspaceCount: 0,
  backspaceRatio: 0,
  errorHeatmap: {},
  consistency: 100,
  durationMs: 4000,
  keystrokeLog: [
    { key: "h", timestamp: 0, correct: true },
    { key: "e", timestamp: 1000, correct: true },
    { key: "l", timestamp: 2000, correct: true },
    { key: "l", timestamp: 3000, correct: true },
    { key: "o", timestamp: 4000, correct: true }
  ]
}
```

## API

### TypingSession

`TypingSession` is the main class used to record typing activity and calculate the results.

```ts
const session = new TypingSession("hello world");
```

### recordKeystroke()

Records an individual keystroke.

```ts
session.recordKeystroke({
  key: "h",
  timestamp: 0,
  correct: true
});
```

The `correct` property is optional. If it is not provided, the library compares the typed character with the expected character from the target text.

### recordInput()

Records changes to an input value.

```ts
session.recordInput("h", 0);
session.recordInput("he", 1000);
session.recordInput("hel", 2000);
session.recordInput("hell", 3000);
session.recordInput("hello", 4000);
```

The library detects added characters and Backspace operations between input values.

### getResults()

Returns the calculated typing statistics.

```ts
const results = session.getResults();

console.log(results.wpm);
console.log(results.accuracy);
```

### reset()

Clears the current typing session.

```ts
session.reset();
```

## Metrics

### WPM

WPM means Words Per Minute.

The calculation is:

```text
WPM = (correct characters / 5) / duration in minutes
```

### Raw WPM

Raw WPM uses the total number of typed characters, including incorrect characters.

```text
Raw WPM = (total typed characters / 5) / duration in minutes
```

### Accuracy

Accuracy is calculated using:

```text
Accuracy = (correct characters / total characters) × 100
```

Incorrect characters are counted as errors even if they are later corrected with Backspace.

### Correct Characters

`correctChars` is the number of correctly typed characters.

### Incorrect Characters

`incorrectChars` is the number of incorrectly typed characters.

### Total Characters

`totalChars` is the total number of typed characters, excluding Backspace presses.

### Backspace Count

`backspaceCount` records every Backspace press.

```ts
session.recordKeystroke({
  key: "Backspace",
  timestamp: 2000
});
```

Repeated Backspace presses are counted separately.

### Backspace Ratio

The Backspace ratio is:

```text
Backspace ratio = Backspace count / Total keystrokes
```

### Error Heatmap

`errorHeatmap` records incorrectly typed characters and their frequency.

Example:

```js
{
  "a": 2,
  "s": 1,
  "x": 3
}
```

This means:

* `a` was typed incorrectly 2 times
* `s` was typed incorrectly 1 time
* `x` was typed incorrectly 3 times

Backspace is not included in the error heatmap.

### Consistency

Consistency measures how stable the typing speed is during the session.

The calculation uses 5-second typing windows and compares the WPM values of those windows.

The result is between `0` and `100`.

### Duration

`durationMs` represents the time between the first and last recorded keystroke.

Example:

```js
durationMs: 4000
```

### Keystroke Log

`keystrokeLog` contains the recorded typing history.

Example:

```js
[
  {
    key: "h",
    timestamp: 0,
    correct: true
  },
  {
    key: "e",
    timestamp: 1000,
    correct: true
  }
]
```

## Unicode and Hindi Support

The library supports Unicode text, including Hindi.

Example:

```ts
import { TypingSession } from "@vanyamishra05/typing-stats-js";

const session = new TypingSession("नमस्ते");

session.recordInput("नमस्ते", 5000);

console.log(session.getResults());
```

## TypeScript

The package is written in TypeScript and includes type declarations.

Types can be imported using:

```ts
import type {
  Keystroke,
  TypingResult
} from "@vanyamishra05/typing-stats-js";
```

Example:

```ts
const keystroke: Keystroke = {
  key: "a",
  timestamp: 1000,
  correct: true
};
```

## Framework Independent

The core library does not depend on a specific frontend framework.

It can be used with:

* JavaScript
* TypeScript
* React
* Node.js
* Other JavaScript frameworks

The application collects keyboard or input data and passes it to the library.

## Project Structure

```text
typing-stats-js/
│
├── src/
│   ├── metrics/
│   │   ├── accuracy.ts
│   │   ├── consistency.ts
│   │   ├── errorHeatmap.ts
│   │   └── wpm.ts
│   │
│   ├── TypingSession.ts
│   ├── types.ts
│   └── index.ts
│
├── test/
│   ├── TypingSession.test.ts
│   ├── accuracy.test.ts
│   ├── consistency.test.ts
│   ├── errorHeatmap.test.ts
│   └── wpm.test.ts
│
├── EXAMPLES.md
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── vitest.config.ts
```

## Testing

The proj
