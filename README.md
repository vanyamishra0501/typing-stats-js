\# typing-stats-js



A zero-dependency, framework-agnostic TypeScript/JavaScript library for calculating typing statistics.



It accepts target text and raw typing/keystroke data and returns useful typing metrics such as WPM, accuracy, errors, backspaces, consistency, and an error heatmap.



\## Features



\* WPM

\* Raw WPM

\* Accuracy

\* Correct and incorrect character counts

\* Backspace count

\* Backspace ratio

\* Error heatmap

\* Typing consistency

\* Typing duration

\* Complete keystroke log

\* `recordKeystroke()` API

\* `recordInput()` API

\* Unicode and multilingual text support

\* TypeScript types

\* Framework agnostic

\* Browser and Node.js compatible

\* Zero runtime dependencies



\## Installation



```bash

npm install typing-stats-js

```



\## Basic Usage



```ts

import { TypingSession } from "typing-stats-js";



const session = new TypingSession("hello world");



session.recordKeystroke({

&#x20; key: "h",

&#x20; timestamp: 0

});



session.recordKeystroke({

&#x20; key: "e",

&#x20; timestamp: 100

});



session.recordKeystroke({

&#x20; key: "l",

&#x20; timestamp: 200

});



session.recordKeystroke({

&#x20; key: "l",

&#x20; timestamp: 300

});



session.recordKeystroke({

&#x20; key: "o",

&#x20; timestamp: 400

});



const results = session.getResults();



console.log(results);

```



\## Example Result



A result object contains:



```ts

{

&#x20; wpm: 150,

&#x20; rawWpm: 150,

&#x20; accuracy: 100,

&#x20; totalChars: 5,

&#x20; correctChars: 5,

&#x20; incorrectChars: 0,

&#x20; backspaceCount: 0,

&#x20; backspaceRatio: 0,

&#x20; errorHeatmap: {},

&#x20; consistency: 100,

&#x20; durationMs: 400,

&#x20; keystrokeLog: \[

&#x20;   {

&#x20;     key: "h",

&#x20;     timestamp: 0,

&#x20;     correct: true

&#x20;   }

&#x20; ]

}

```



The exact values depend on the supplied timestamps and keystrokes.



\## `recordKeystroke()`



Record individual keystrokes:



```ts

session.recordKeystroke({

&#x20; key: "h",

&#x20; timestamp: 1000

});

```



The `correct` property can be supplied explicitly:



```ts

session.recordKeystroke({

&#x20; key: "x",

&#x20; timestamp: 1100,

&#x20; correct: false

});

```



If `correct` is omitted, the session compares the typed character with the expected character from the target text.



\### Backspace



Backspaces are recorded using:



```ts

session.recordKeystroke({

&#x20; key: "Backspace",

&#x20; timestamp: 1200

});

```



Every backspace press is counted separately.



\## `recordInput()`



Applications that receive the current input value can use:



```ts

session.recordInput("hello", 1000);

```



For example:



```ts

const session = new TypingSession("hello world");



session.recordInput("hello", 1000);

session.recordInput("hello ", 2000);

session.recordInput("hello world", 3000);



console.log(session.getResults());

```



\## Metrics



\### WPM



Words per minute is calculated using the standard five-character word convention:



```text

WPM = (correct characters / 5) / duration in minutes

```



\### Raw WPM



Raw WPM uses all typed characters:



```text

Raw WPM = (total typed characters / 5) / duration in minutes

```



\### Accuracy



```text

Accuracy = correct characters / total characters × 100

```



Incorrect characters that are later corrected using Backspace are still counted as errors.



\### Error Heatmap



The error heatmap records how frequently individual characters were mistyped.



Example:



```ts

{

&#x20; x: 3,

&#x20; a: 2

}

```



This means `x` was mistyped three times and `a` was mistyped twice.



\### Backspace Ratio



```text

Backspace ratio = backspace count / total keystrokes

```



\### Consistency



Typing consistency is calculated using five-second windows. WPM is calculated for each window and the variation between those windows is used to produce a consistency score.



\## Unicode Support



The library supports Unicode and multilingual text.



For example:



```ts

const session = new TypingSession("नमस्ते दुनिया");



session.recordInput(

&#x20; "नमस्ते दुनिया",

&#x20; 1000

);



console.log(session.getResults());

```



\## Resetting a Session



Reset the current session:



```ts

session.reset();

```



After resetting, the session contains no recorded keystrokes.



\## TypeScript



Types are exported:



```ts

import type {

&#x20; Keystroke,

&#x20; TypingResult

} from "typing-stats-js";

```



\## Framework Agnostic



The core library does not require React, Vue, Angular, or another framework.



It can be used with:



\* Plain JavaScript

\* TypeScript

\* React

\* Vue

\* Angular

\* Node.js

\* Browser applications



The core package does not use DOM or browser-specific APIs.



\## Development



Install dependencies:



```bash

npm install

```



Run tests:



```bash

npm test

```



Run tests with coverage:



```bash

npm run coverage

```



Build the package:



```bash

npm run build

```



\## Test Results



The project includes unit tests covering:



\* WPM

\* Raw WPM

\* Accuracy

\* Error heatmap

\* Consistency

\* Correct typing

\* Incorrect typing

\* Backspaces

\* Corrected errors

\* Unicode/Hindi text

\* Reset functionality

\* Invalid timestamps



Current test suite:



```text

5 test files passed

21 tests passed

```



Coverage:



```text

Overall lines:       94.69%

Overall statements:  94.69%

Overall branches:    94.20%

Overall functions:  100.00%



Metrics lines:       98.01%

Metrics branches:    97.22%

Metrics functions:  100.00%

```



\## License



MIT



