# USING_PROMISES

## Crawl Summary
The extracted content details JavaScript promises, including using .then() and .catch() for asynchronous operations, chaining for sequence control, error handling patterns, and async/await equivalents. It explains nesting for error scoping, concurrent composition with Promise.all and sequential promise chaining via reduce, along with advanced topics like cancellation, microtasks vs. tasks, and wrapping legacy callback APIs. The content includes precise code examples and API method signatures as provided by MDN.

## Normalised Extract
## Table of Contents
1. Definition and Basic Usage
2. Promise Chaining and Callback Hell
3. Async/Await Pattern
4. Error Handling
5. Nesting and Composition
6. Advanced Topics (Cancellation, Timing, Global Rejection Events, Wrapping Callbacks)

### 1. Definition and Basic Usage
- Promises represent asynchronous operations.
- Use .then() to attach success and failure callbacks.

**Code Example:**

```js
function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.error(`Error generating audio file: ${error}`);
}

createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

### 2. Promise Chaining and Callback Hell
- Chain asynchronous operations using .then().
- Always return promises from callbacks.

**Chained Example:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
  .catch(failureCallback);
```

### 3. Async/Await Pattern
- Use async functions with await to simplify promise management.

**Example:**

```js
async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}
```

### 4. Error Handling
- Use .catch() at the end of the chain.
- With async/await, utilize try/catch blocks.

**Async/Await Error Handling:**

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

### 5. Nesting and Composition
- Nest promises to restrict the catch scope.
- Use Promise.all for concurrent tasks, and reduce chaining for sequential execution.

**Composition Example:**

```js
Promise.all([func1(), func2(), func3()]).then(([result1, result2, result3]) => {
  // use results
});
```

**Sequential using reduce:**

```js
[func1, func2, func3]
  .reduce((p, f) => p.then(f), Promise.resolve())
  .then((result) => {
    // final result
  });
```

### 6. Advanced Topics

- **Cancellation:** Use AbortController to cancel fetch requests.
- **Timing:** .then() callbacks run as microtasks; setTimeout callbacks run as tasks.

**Microtask Example:**

```js
Promise.resolve().then(() => console.log(2));
console.log(1);
```

- **Global Rejection Handling (Browser):** Listen for "unhandledrejection" events.
- **Global Rejection Handling (Node.js):**

```js
process.on("unhandledRejection", (reason, promise) => {
  // inspect reason and promise
});
```

- **Wrapping Callback APIs:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
```


## Supplementary Details
### Supplementary Technical Specifications

- Promise Constructor: new Promise((resolve, reject) => { ... })
  - Parameters: executor function with resolve(value) and reject(reason).
  - Example: 

```js
function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Did something");
      resolve("https://example.com/");
    }, 200);
  });
}
```

- Chaining: The then() method signature
  - then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): Promise

- Async/Await: Mark function with async; await returns the fulfillment value. 

- Configuration Options:
  - For timeouts, setTimeout(ms) is used (e.g., 10 * 1000 for 10 seconds).
  - AbortController can be used to cancel fetch: new AbortController(), passing controller.signal to fetch().

- Best Practices:
  - Always return a promise in a then() callback.
  - Flatten promise chains to avoid nested error handling.
  - Attach a global unhandledRejection handler in Node.js to log all errors.

- Troubleshooting Procedures:
  - If a promise resolution seems to occur out-of-order, inspect microtask vs. task queue using console logs.
  - Use try/catch in async functions to capture errors.
  - Validate that all asynchronous calls return a promise by checking using Promise.resolve().
  - For Node.js, add:

```bash
node -e "process.on('unhandledRejection', (r, p) => console.error(r)); require('./yourScript');"
```

to capture unhandled promise rejections.


## Reference Details
### Complete API Specifications and Implementation Patterns

#### Promise Constructor

- Syntax: 

  new Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => { ... })

- Example:

```js
function doSomething(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Additional operations here
      console.log("Did something");
      resolve("https://example.com/");
    }, 200);
  });
}
```

#### .then() Method

- Signature: 

  promise.then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): Promise

- Usage Example:

```js
const promise = doSomething();
const promise2 = promise.then(
  (result) => {
    // Process result which is a string representing URL
    return fetch(result); // fetch returns a promise
  },
  (error) => {
    console.error(`Error encountered: ${error}`);
    throw error; // rethrow for further catch
  }
);
```

#### .catch() Method

- Signature:

  promise.catch(onRejected: (reason: any) => any): Promise

- Usage Example:

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .catch((error) => {
    console.error(`Caught error: ${error}`);
  });
```

#### Async/Await

- Function Declaration:

```js
async function foo(): Promise<void> {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

#### Configuration and Cancellation

- Using AbortController with fetch:

```js
const controller = new AbortController();
const signal = controller.signal;

fetch('https://example.com/', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', error);
    }
  });

// To cancel the request:
controller.abort();
```

#### Best Practices and Troubleshooting

- Always ensure .then() callbacks return a promise when chaining asynchronous operations.
- Flatten chains to avoid nested callbacks and ambiguous error handling.
- Global Error Handling in Node.js:

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

- Troubleshooting Commands:

  - Running Node.js with verbose unhandled rejection logging:
    
    ```bash
    node --trace-warnings yourScript.js
    ```

  - Validate promise resolution by inserting logging statements immediately after promise creation and in .then() callbacks.

This complete reference provides developers with concrete SDK method signatures, code examples, configuration options, and detailed implementation and troubleshooting steps to effectively use promises in JavaScript.

## Original Source
MDN Web Docs: Using Promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

## Digest of USING_PROMISES

# Using Promises

Retrieved: 2025-04-03

This document extracts the precise technical details regarding the usage of Promises in JavaScript as described on MDN Web Docs. It includes actual code examples, method signatures, exact implementation patterns, configuration details, and complete API specifications.

## Core Promise Concepts

- A Promise is an object representing the eventual completion or failure of an asynchronous operation.
- Instead of passing callbacks directly to a function, the function returns a promise to which callbacks are attached using .then() and .catch().

**Example using call-back to promise conversion:**

```js
function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.error(`Error generating audio file: ${error}`);
}

// Old callback-based API
ncreateAudioFileAsync(audioSettings, successCallback, failureCallback);

// Promise-based API
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

## Promise Chaining & Callback Hell

- Promise chaining provides a solution to callback hell by returning a new promise from then().

**Example of chaining to avoid callback hell:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

- **Important Rule:** Always return a promise from then callbacks. Failure to do so results in a "floating" promise that cannot be tracked.

**Faulty example:**

```js
doSomething()
  .then((url) => {
    // Missing return causes undefined result
    fetch(url);
  })
  .then((result) => {
    // result will be undefined
  });
```

**Corrected example:**

```js
doSomething()
  .then((url) => {
    return fetch(url);
  })
  .then((result) => {
    // result is a Response object
  });
```

## Async/Await Pattern

- The async/await syntax makes asynchronous code look synchronous. Use the `await` keyword to wait for a promise to settle.

**Example converting promise chain to async/await:**

```js
async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}
```

- **Note:** Omission of the `await` keyword leads to type mismatches and runtime errors.

## Error Handling

- Errors in a promise chain are caught using `.catch()`. This works similarly to a try/catch in synchronous code.

**Standard error handling with promises:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
  .catch(failureCallback);
```

- With async/await:

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

## Nesting and Composition

- **Nesting:** Use nested promises to limit the scope of error handling.

```js
doSomethingCritical()
  .then((result) =>
    doSomethingOptional(result)
      .then((optionalResult) => doSomethingExtraNice(optionalResult))
      .catch((e) => {})
  )
  .then(() => moreCriticalStuff())
  .catch((e) => console.error(`Critical failure: ${e.message}`));
```

- **Composition Tools:**
  - Promise.all(): Runs promises concurrently and returns when all are fulfilled or one rejects.
  - Promise.allSettled(), Promise.any(), and Promise.race() offer different patterns for concurrent execution.

**Concurrent execution example:**

```js
Promise.all([func1(), func2(), func3()]).then(([result1, result2, result3]) => {
  // use the results
});
```

- **Sequential Composition using reduce:**

```js
[func1, func2, func3]
  .reduce((p, f) => p.then(f), Promise.resolve())
  .then((result3) => {
    // use result3
  });
```

- **Reusable compose function:**

```js
const applyAsync = (acc, val) => acc.then(val);

const composeAsync = (...funcs) => (x) => funcs.reduce(applyAsync, Promise.resolve(x));

const transformData = composeAsync(func1, func2, func3);
const result3 = transformData(data);
```

## Advanced Topics

### Cancellation

- While Promise API does not include cancellation, you can cancel underlying asynchronous operations using tools like AbortController.

### Timing and Task Queue vs Microtasks

- .then() callbacks are enqueued to a microtask queue, ensuring they run after the current event loop finishes.

**Example demonstrating microtask scheduling:**

```js
Promise.resolve().then(() => console.log(2));
console.log(1);
// Output: 1 then 2
```

**Microtask example with setTimeout:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(0).then(() => console.log(4));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
console.log(1);
// Expected Output: 1, 2, 3, 4
```

### Promise Rejection Events

- Global events: `unhandledrejection` and `rejectionhandled` are used in browsers, and in Node.js use `process.on("unhandledRejection", ...)`.

**Node.js example:**

```js
process.on("unhandledRejection", (reason, promise) => {
  // Examine promise and reason
});
```

### Wrapping Callback APIs

- Promises can be created by wrapping older callback-based APIs using the Promise constructor.

**Example wrapping setTimeout:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(10 * 1000)
  .then(() => saySomething("10 seconds passed"))
  .catch(failureCallback);
```

The executor function is provided with `resolve` (and optionally `reject`), which are called to settle the promise.


## Attribution
- Source: MDN Web Docs: Using Promises
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
- License: CC BY-SA 2.5
- Crawl Date: 2025-04-17T18:27:12.044Z
- Data Size: 4749435 bytes
- Links Found: 47218

## Retrieved
2025-04-17
