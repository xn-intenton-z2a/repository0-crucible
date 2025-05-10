# ABORTCONTROLLER

## Crawl Summary
Constructor: new AbortController() → AbortController instance. Property: signal (AbortSignal) read-only. Method: abort() → void, dispatches 'abort' event, causes fetch, streams, and response body reads to reject with DOMException named 'AbortError'. fetch(url, { signal }) integration. Catch AbortError to handle cancellations.

## Normalised Extract
Table of Contents
1. Constructor Signature
2. signal Property
3. abort() Method
4. Fetch Integration
5. Error Handling
6. Response Body Abort

1. Constructor Signature
new AbortController() returns an AbortController instance.

2. signal Property
AbortController.signal is an AbortSignal used to register for abort events and to pass into abortable APIs.

3. abort() Method
Calling AbortController.abort() synchronously sets signal.aborted to true, dispatches an "abort" event, and tears down any associated operations.

4. Fetch Integration
Pass controller.signal in fetch init: fetch(url, { signal: controller.signal }) associates the signal. 
Calling controller.abort() rejects the fetch promise with a DOMException named "AbortError".

5. Error Handling
In catch clause, inspect err.name === 'AbortError' to differentiate cancellations from other errors.

6. Response Body Abort
If abort is invoked after fetch resolves but before reading response body, further methods like response.text() or response.json() will reject with AbortError.

## Supplementary Details
Implementation Steps
1. Instantiate controller: const controller = new AbortController();
2. Extract signal: const signal = controller.signal;
3. Initiate fetch: fetch(endpointUrl, { signal });
4. Trigger abort: controller.abort();
5. Handle AbortError: catch(err) if err.name === 'AbortError'

Configuration Options
- fetch init: { signal: AbortSignal }
- Request constructor: new Request(input, { signal })

Parameter Values
- signal.aborted: boolean (initial false, true after abort)
- AbortSignal.reason: any value passed to abort(reason) if supported

Integration Points
- Streams: any ReadableStream tied to signal will error on abort.
- DOM fetch, ReadableStream, Request, Response


## Reference Details
API Specifications

Interface AbortController
- constructor AbortController(): AbortController
- readonly property signal: AbortSignal
- method abort(): void

AbortSignal (for context)
- readonly property aborted: boolean
- readonly property reason: any (DOMException or value)
- method throwIfAborted(): void throws if signal.aborted
- event abort: fired when controller.abort() is called

Method Signatures
```ts
interface AbortController {
  constructor(): void;
  readonly signal: AbortSignal;
  abort(): void;
}

interface AbortSignal extends EventTarget {
  readonly aborted: boolean;
  readonly reason: any;
  throwIfAborted(): void;
  addEventListener(type: 'abort', listener: (this: AbortSignal, ev: Event) => any): void;
  removeEventListener(type: 'abort', listener: (this: AbortSignal, ev: Event) => any): void;
}
```

Code Examples

1. Basic Usage
```js
const controller = new AbortController();
const signal = controller.signal;
fetch('https://example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.warn('Fetch aborted');
    } else {
      console.error('Fetch error', err);
    }
  });

// abort after 5 seconds
setTimeout(() => controller.abort(), 5000);
```

2. Abort after response resolution but before reading body
```js
async function fetchWithLateAbort() {
  const controller = new AbortController();
  const request = new Request('https://example.org/get', { signal: controller.signal });
  const response = await fetch(request);
  controller.abort();
  try {
    const text = await response.text(); // throws AbortError
    console.log(text);
  } catch (err) {
    console.error(err.name); // 'AbortError'
  }
}
```

Best Practices
- Always attach a timeout or user-cancel control to avoid hanging requests.
- Reuse a single controller when aborting multiple related operations.
- Call signal.throwIfAborted() in custom abortable code paths.

Troubleshooting Procedures
1. Fetch never returns: ensure controller.abort() is called or remove signal option.
2. Unexpected errors: in catch, log err.name and err.message.
3. Verify support: check 'AbortController' in global scope before use.
   ```js
   if (typeof AbortController === 'undefined') {
     // polyfill or fallback
   }
   ```
4. Stream errors: listening to signal.addEventListener('abort', () => stream.cancel());
5. Expected output on abort: console.warn('Fetch aborted') or custom log.


## Information Dense Extract
AbortController():AbortController; signal:AbortSignal; abort():void dispatches 'abort'; fetch(url,{signal}) rejects with DOMException name='AbortError'; response methods text(),json() after abort reject; use err.name==='AbortError' to differentiate; create controller, pass signal, call abort, catch cancellations; AbortSignal.aborted boolean; signal.throwIfAborted() throws; addEventListener('abort') for cleanup; support since Mar 2019.

## Sanitised Extract
Table of Contents
1. Constructor Signature
2. signal Property
3. abort() Method
4. Fetch Integration
5. Error Handling
6. Response Body Abort

1. Constructor Signature
new AbortController() returns an AbortController instance.

2. signal Property
AbortController.signal is an AbortSignal used to register for abort events and to pass into abortable APIs.

3. abort() Method
Calling AbortController.abort() synchronously sets signal.aborted to true, dispatches an 'abort' event, and tears down any associated operations.

4. Fetch Integration
Pass controller.signal in fetch init: fetch(url, { signal: controller.signal }) associates the signal. 
Calling controller.abort() rejects the fetch promise with a DOMException named 'AbortError'.

5. Error Handling
In catch clause, inspect err.name === 'AbortError' to differentiate cancellations from other errors.

6. Response Body Abort
If abort is invoked after fetch resolves but before reading response body, further methods like response.text() or response.json() will reject with AbortError.

## Original Source
Node.js AbortController
https://developer.mozilla.org/en-US/docs/Web/API/AbortController

## Digest of ABORTCONTROLLER

# AbortController

## Constructor

### new AbortController()
Creates a new AbortController instance.

Signature
```js
constructor AbortController(): AbortController
```

## Instance Properties

### signal: AbortSignal (read-only)
Returns the associated AbortSignal used to communicate or abort an asynchronous operation.

## Instance Methods

### abort(): void
Aborts all associated operations. Dispatches an "abort" event on the signal. Causes fetch requests, response bodies, streams, and other abortable operations to terminate and reject with a DOMException named "AbortError".

## Usage Examples

### Abort a fetch request midway
```js
let controller = new AbortController();
let signal = controller.signal;

const responsePromise = fetch('video.mp4', { signal: signal });

// Later, when abort is needed
controller.abort(); // triggers AbortError on responsePromise
```

### Handling AbortError
```js
try {
  const response = await fetch(url, { signal: controller.signal });
  // process response
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request was aborted');
  } else {
    throw err;
  }
}
```

## Specifications

- Interface: AbortController
- Defined in: DOM Standard
- Constructor: new AbortController()
- Properties:
  - signal: AbortSignal (read-only)
- Methods:
  - abort(): void

## Browser Compatibility

Feature available since March 2019 across modern browsers and Web Workers.


## Attribution
- Source: Node.js AbortController
- URL: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- License: CC BY-SA 2.5
- Crawl Date: 2025-05-10T16:58:52.359Z
- Data Size: 1458842 bytes
- Links Found: 16102

## Retrieved
2025-05-10
