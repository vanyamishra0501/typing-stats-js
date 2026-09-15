\# typing-stats-js Examples



\## 1. Plain JavaScript



```js

import { TypingSession } from "typing-stats-js";



const session = new TypingSession("hello");



session.recordKeystroke({ key: "h", timestamp: 0 });

session.recordKeystroke({ key: "e", timestamp: 200 });

session.recordKeystroke({ key: "l", timestamp: 400 });

session.recordKeystroke({ key: "l", timestamp: 600 });

session.recordKeystroke({ key: "o", timestamp: 800 });



const results = session.getResults();



console.log("WPM:", results.wpm);

console.log("Accuracy:", results.accuracy);

console.log("Errors:", results.incorrectChars);

console.log("Backspaces:", results.backspaceCount);

```



\## 2. Using `recordInput()`



```js

import { TypingSession } from "typing-stats-js";



const session = new TypingSession("hello world");



session.recordInput("hello", 1000);

session.recordInput("hello ", 2000);

session.recordInput("hello world", 3000);



console.log(session.getResults());

```



\## 3. React Example



```tsx

import { useRef, useState } from "react";

import { TypingSession } from "typing-stats-js";



const target = "hello world";



export default function TypingTest() {

&#x20; const session = useRef(

&#x20;   new TypingSession(target)

&#x20; );



&#x20; const \[value, setValue] = useState("");

&#x20; const \[results, setResults] = useState(

&#x20;   session.current.getResults()

&#x20; );



&#x20; function handleChange(

&#x20;   event: React.ChangeEvent<HTMLInputElement>

&#x20; ) {

&#x20;   const nextValue = event.target.value;



&#x20;   setValue(nextValue);



&#x20;   session.current.recordInput(

&#x20;     nextValue,

&#x20;     performance.now()

&#x20;   );



&#x20;   setResults(

&#x20;     session.current.getResults()

&#x20;   );

&#x20; }



&#x20; return (

&#x20;   <div>

&#x20;     <h1>Typing Test</h1>



&#x20;     <p>{target}</p>



&#x20;     <input

&#x20;       value={value}

&#x20;       onChange={handleChange}

&#x20;       placeholder="Start typing..."

&#x20;     />



&#x20;     <div>

&#x20;       <p>WPM: {results.wpm.toFixed(2)}</p>

&#x20;       <p>

&#x20;         Raw WPM: {results.rawWpm.toFixed(2)}

&#x20;       </p>

&#x20;       <p>

&#x20;         Accuracy: {results.accuracy.toFixed(2)}%

&#x20;       </p>

&#x20;       <p>

&#x20;         Errors: {results.incorrectChars}

&#x20;       </p>

&#x20;       <p>

&#x20;         Backspaces: {results.backspaceCount}

&#x20;       </p>

&#x20;       <p>

&#x20;         Consistency:{" "}

&#x20;         {results.consistency.toFixed(2)}%

&#x20;       </p>

&#x20;     </div>

&#x20;   </div>

&#x20; );

}

```



\## 4. Hindi / Unicode



```js

import { TypingSession } from "typing-stats-js";



const session =

&#x20; new TypingSession("नमस्ते");



session.recordInput(

&#x20; "नमस्ते",

&#x20; 1000

);



console.log(session.getResults());

```



\## 5. Error Heatmap



```js

import { TypingSession } from "typing-stats-js";



const session =

&#x20; new TypingSession("hello");



session.recordKeystroke({

&#x20; key: "x",

&#x20; timestamp: 0

});



session.recordKeystroke({

&#x20; key: "h",

&#x20; timestamp: 1000

});



console.log(

&#x20; session.getResults().errorHeatmap

);

```



Expected:



```js

{

&#x20; x: 1

}

```



\## 6. Backspace



```js

import { TypingSession } from "typing-stats-js";



const session =

&#x20; new TypingSession("hello");



session.recordKeystroke({

&#x20; key: "x",

&#x20; timestamp: 0

});



session.recordKeystroke({

&#x20; key: "Backspace",

&#x20; timestamp: 500

});



session.recordKeystroke({

&#x20; key: "h",

&#x20; timestamp: 1000

});



const results =

&#x20; session.getResults();



console.log(

&#x20; "Backspaces:",

&#x20; results.

```



