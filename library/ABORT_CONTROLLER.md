# ABORT_CONTROLLER

## Crawl Summary
Constructor: new AbortController():AbortController. Property: signal:AbortSignal (readonly). Method: abort():void sets signal.aborted=true and dispatches 'abort'. AbortSignal: aborted:boolean(false initial), onabort:event handler, addEventListener('abort',listener[,options]). Fetch integration: fetch(input,{signal}) returns Promise<Response> that rejects with DOMException name='AbortError', code=20 when aborted. After response is fulfilled, reading body (text(),json(),blob()) rejects with AbortError if aborted before reading. Compatibility: Chrome66+, Firefox57+, Safari14.1+, Edge16+, Web Workers support.

## Normalised Extract
Table of Contents:
1. AbortController Constructor
2. AbortSignal Properties
3. abort() Method
4. AbortError Exception
5. Event Handling on AbortSignal
6. Integration with Fetch API
7. Browser Compatibility

1. AbortController Constructor
Signature: new AbortController(): AbortController
Creates a controller instance with a read-only signal property.

2. AbortSignal Properties
  - aborted: boolean (readonly, initial false)
  - reason: any (readonly)
  - onabort: ((this:AbortSignal, ev:Event) => any) | null
Inherited methods: addEventListener, removeEventListener, dispatchEvent

3. abort() Method
Signature: AbortController.abort(): void
Sets signal.aborted=true, signal.reason=undefined, and enqueues an 'abort' event. Idempotent.

4. AbortError Exception
Thrown by fetch and body-consumption methods (`text()`, `json()`, `blob()`):
  - name: 'AbortError'
  - message: 'The operation was aborted.'
  - code (legacy): 20

5. Event Handling on AbortSignal
  - Add listener: signal.addEventListener('abort', listener, options?)
  - Remove listener: signal.removeEventListener('abort', listener, options?)
  - Handler property: signal.onabort = (ev:Event) => void

6. Integration with Fetch API
Usage: `fetch(url, { signal: controller.signal })`
Response consumption after abort triggers AbortError when reading body.

7. Browser Compatibility
  - Chrome 66+
  - Firefox 57+
  - Safari 14.1+
  - Edge 16+
  - Web Workers

## Supplementary Details
AbortSignal.reason: Provides optional user-defined cause. Event dispatch occurs as a microtask immediately after abort() call. abort() is synchronous and idempotent. To implement request timeouts: use setTimeout to call controller.abort(), then clearTimeout in finally. Always remove 'abort' listeners to prevent memory leaks: signal.removeEventListener('abort', handler). Check signal.aborted before starting long-running tasks. Default fetch has no timeout; AbortController is the recommended pattern for cancellation. In Node.js, Enable global fetch via --experimental-fetch in v17+ or import from 'node-fetch'.

## Reference Details
Interface AbortController {
  constructor(): AbortController;
  readonly signal: AbortSignal;
  abort(): void;
}

Interface AbortSignal extends EventTarget {
  readonly aborted: boolean;
  readonly reason: any;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
  addEventListener(type: 'abort', listener: (this: AbortSignal, ev: Event) => any, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: 'abort', listener: (this: AbortSignal, ev: Event) => any, options?: boolean | EventListenerOptions): void;
  dispatchEvent(event: Event): boolean;
}

DOMException on abort:
  name: 'AbortError'
  message: 'The operation was aborted.'
  code: 20 (legacy)

Full Code Examples:
```js
// Basic fetch with cancellation
const controller = new AbortController();
const { signal } = controller;
fetch('https://example.com/data', { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.warn('Request aborted');
    } else {
      console.error('Fetch failed:', err);
    }
  });

// Cancel request:
controller.abort();
```
```js
// Fetch with timeout
function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const { signal } = controller;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { signal })
    .finally(() => clearTimeout(timeoutId));
}
```

Best Practices:
- Use a new AbortController per operation.
- Clear any timeouts and remove listeners in cleanup handlers.
- Check `signal.aborted` to handle pre-aborted states.

Troubleshooting:
- If `fetch` doesn’t abort: verify `signal` passed correctly and controller is not garbage-collected.
- In Node.js: enable `--experimental-fetch` or import `node-fetch`.
- Debug abort by logging `signal.aborted` and `err.name`.

Commands:
```bash
# Node REPL test
node
> const ctrl = new AbortController();
> fetch('http://example.com', { signal: ctrl.signal }).catch(e => console.log(e.name));
> ctrl.abort();
```
Expected output: AbortError

## Information Dense Extract
new AbortController():AbortController; signal:AbortSignal(aborted:boolean=false,reason:any,onabort:null); abort():void sets aborted=true, queues 'abort'. fetch(input,{signal})→Promise<Response>, rejects DOMException{name:'AbortError',message:'The operation was aborted.',code:20}. AbortSignal methods: addEventListener('abort',listener,options), removeEventListener, dispatchEvent. Properties: aborted, reason, onabort. Usage patterns: basic fetch cancellation, timeout wrapper with setTimeout and clearTimeout. Best practices: per-request controller, cleanup listeners/timeouts, check signal.aborted. Troubleshooting: confirm signal passed, monitor err.name, Node fetch experimental flag.

## Sanitised Extract
Table of Contents:
1. AbortController Constructor
2. AbortSignal Properties
3. abort() Method
4. AbortError Exception
5. Event Handling on AbortSignal
6. Integration with Fetch API
7. Browser Compatibility

1. AbortController Constructor
Signature: new AbortController(): AbortController
Creates a controller instance with a read-only signal property.

2. AbortSignal Properties
  - aborted: boolean (readonly, initial false)
  - reason: any (readonly)
  - onabort: ((this:AbortSignal, ev:Event) => any) | null
Inherited methods: addEventListener, removeEventListener, dispatchEvent

3. abort() Method
Signature: AbortController.abort(): void
Sets signal.aborted=true, signal.reason=undefined, and enqueues an 'abort' event. Idempotent.

4. AbortError Exception
Thrown by fetch and body-consumption methods ('text()', 'json()', 'blob()'):
  - name: 'AbortError'
  - message: 'The operation was aborted.'
  - code (legacy): 20

5. Event Handling on AbortSignal
  - Add listener: signal.addEventListener('abort', listener, options?)
  - Remove listener: signal.removeEventListener('abort', listener, options?)
  - Handler property: signal.onabort = (ev:Event) => void

6. Integration with Fetch API
Usage: 'fetch(url, { signal: controller.signal })'
Response consumption after abort triggers AbortError when reading body.

7. Browser Compatibility
  - Chrome 66+
  - Firefox 57+
  - Safari 14.1+
  - Edge 16+
  - Web Workers

## Original Source
Asynchronous Data Flow and Streaming Protocols
https://developer.mozilla.org/docs/Web/API/AbortController

## Digest of ABORT_CONTROLLER

# AbortController

## Constructor

**Syntax**: `new AbortController()`

Creates a new AbortController instance.

## Properties

**signal**: AbortSignal (readonly)

Returns an AbortSignal object used to communicate abort notifications to asynchronous operations.

## Methods

**abort()**: void

Immediately sets `signal.aborted` to `true` and dispatches an `'abort'` event on the associated AbortSignal.

## Events

AbortSignal implements EventTarget:
- Event type: `'abort'`
- Handlers via `signal.addEventListener('abort', listener)` or `signal.onabort`

## Usage Examples

Basic fetch abort:
```js
const controller = new AbortController();
const signal = controller.signal;

fetch('https://example.com/video.mp4', { signal })
  .then(response => console.log('Download complete', response))
  .catch(err => {
    if (err.name === 'AbortError') console.log('Download aborted');
    else console.error('Fetch error:', err);
  });

// To cancel:
controller.abort();
```

Timeout wrapper:
```js
function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const { signal } = controller;
  const id = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { signal })
    .finally(() => clearTimeout(id));
}
```

## Exception

Operations using AbortSignal reject with a DOMException:
- `name`: "AbortError"
- `message`: "The operation was aborted."
- `code` (legacy): 20

## Browser Compatibility

- Chrome 66+
- Firefox 57+
- Safari 14.1+
- Edge 16+
- Available in Web Workers

## Specifications

Defined in the WHATWG Fetch Standard and the DOM Standard.

## Date Retrieved
2024-07-29

## Source Attribution
MDN contributors, last modified Jul 26, 2024
Data size: 1386842 bytes, Links found: 16090

## Attribution
- Source: Asynchronous Data Flow and Streaming Protocols
- URL: https://developer.mozilla.org/docs/Web/API/AbortController
- License: License: IETF Trust (RFCs), MIT (Node.js), CC BY-SA 2.5 (MDN)
- Crawl Date: 2025-05-10T10:38:09.088Z
- Data Size: 1386842 bytes
- Links Found: 16090

## Retrieved
2025-05-10
