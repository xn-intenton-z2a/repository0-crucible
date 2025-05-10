# SERVER_SENT_EVENTS

## Crawl Summary
EventSource API: constructor(url, {withCredentials}), properties (readyState, url, withCredentials), handlers (onopen, onmessage, onerror). Server must stream text/event-stream with fields event, data, id, retry; blank line dispatches event. Default retry 3000ms; override via retry field. SSE supported in Web Workers.

## Normalised Extract
Table of Contents:
1. EventSource API
2. Server HTTP Requirements
3. SSE Stream Fields
4. Reconnection Strategy
5. Web Worker Usage
6. PHP Server Example

1. EventSource API
Constructor: url: string, options.withCredentials: boolean (default false)
Properties: readyState: 0|1|2, url: string, withCredentials: boolean
Events: onopen(event), onmessage(event.data: string, event.lastEventId: string), onerror(event)

2. Server HTTP Requirements
Headers: Content-Type=text/event-stream; charset=UTF-8, Cache-Control=no-cache, Connection=keep-alive

3. SSE Stream Fields
Lines prefixed by event, data, id, retry, or ":" for comments
Multiple data lines concatenate with "\n"
Blank line emitted to client signals complete message dispatch

4. Reconnection Strategy
Default reconnect: 3000ms
Client reconnects on network drop; closed when readyState=2 (CLOSED) or server sends 204
Server override: send "retry: <ms>"

5. Web Worker Usage
Instantiate EventSource inside worker global scope; identical API to window

6. PHP Server Example
Set headers as above; loop: echo id, event, data (JSON), retry, blank line; flush buffers; sleep

## Supplementary Details
Server-side implementation steps:
1. Set HTTP/1.1 headers:
   Content-Type: text/event-stream; charset=UTF-8
   Cache-Control: no-cache
   Connection: keep-alive
2. Optionally include Access-Control-Allow-Origin for CORS
3. Stream events in following format per packet:
   id: <string or integer>\n
   event: <eventName>\n
   data: <payload>\n (one or more data lines)\n
   retry: <ms>\n (only if customizing retry)
   \n (blank line)
4. Flush output each iteration to push to client
5. Manage long-running loop and resource cleanup on client disconnect

Configuration options:
- withCredentials: send cookies and HTTP credentials if true
- retry field: sets client reconnect delay

Implementation patterns:
- Heartbeat comment: send ":heartbeat\n\n" every N seconds to keep proxy connections alive
- Incremental data: batch multiple data fields into one event for complex payloads



## Reference Details
EventSource API Reference

Constructor:
EventSource(url: string, eventSourceInit?: { withCredentials?: boolean }): EventSource
Throws SyntaxError if URL is invalid; SecurityError if mixed content

Properties:
readyState: number (0 CONNECTING, 1 OPEN, 2 CLOSED)
url: string (absolute URL)
withCredentials: boolean

Constants:
EventSource.CONNECTING = 0
EventSource.OPEN = 1
EventSource.CLOSED = 2

Methods:
close(): void  // closes connection and sets readyState=2
addEventListener(type: string, listener: function, options?: boolean|{capture?: boolean}): void
removeEventListener(type: string, listener: function, options?: boolean|{capture?: boolean}): void

Event handlers:
onopen: (event: Event) => void
onmessage: (event: MessageEvent) => void  // event.data: string, event.lastEventId: string
onerror: (event: Event) => void

Example usage:
const es = new EventSource('https://example.com/stream', { withCredentials: true });
es.onopen = () => console.log('Connection opened');
es.onmessage = e => console.log('Received', e.data); 
es.onerror = e => console.error('Error', e);
// Close after 60s
timeout = setTimeout(() => { es.close(); clearTimeout(timeout); }, 60000);

Server Response Format:
HTTP/1.1 200 OK
Content-Type: text/event-stream; charset=UTF-8
Cache-Control: no-cache
Connection: keep-alive

:ping
retry: 5000
id: 1
event: update
data: {"status":"ok"}



HTTP 204 No Content => client readyState -> CLOSED, no reconnect

Best Practices:
- Send heartbeat comment every 15s to maintain proxy timeouts
- Batch small events into single dispatch to reduce overhead
- Use custom event types to separate message streams

Troubleshooting:
Command: curl -i https://example.com/stream
Expected headers: Content-Type: text/event-stream; charset=UTF-8
Response body: lines starting with data:, id:, event:, blank line separators
If no data, verify server flush() and network keep-alive
If readyState stuck at CONNECTING, check CORS and mixed-content issues


## Information Dense Extract
EventSource(url:string,{withCredentials?:boolean}) readyState0|1|2 url:string withCredentials:boolean onopen(e),onmessage(e.data:string,e.lastEventId:string),onerror(e) close() add/removeEventListener(type,listener,options) Server headers: Content-Type:text/event-stream; charset=UTF-8,Cache-Control:no-cache,Connection:keep-alive Fields:event,data,id,retry,:comment blank line=dispatch Default retry=3000ms override via retry field HTTP204=>closed, no reconnect Web Workers: identical API Implementation: heartbeat comment, flush(), CORS header, resource cleanup Troubleshoot: curl -i expect headers and stream lines

## Sanitised Extract
Table of Contents:
1. EventSource API
2. Server HTTP Requirements
3. SSE Stream Fields
4. Reconnection Strategy
5. Web Worker Usage
6. PHP Server Example

1. EventSource API
Constructor: url: string, options.withCredentials: boolean (default false)
Properties: readyState: 0|1|2, url: string, withCredentials: boolean
Events: onopen(event), onmessage(event.data: string, event.lastEventId: string), onerror(event)

2. Server HTTP Requirements
Headers: Content-Type=text/event-stream; charset=UTF-8, Cache-Control=no-cache, Connection=keep-alive

3. SSE Stream Fields
Lines prefixed by event, data, id, retry, or ':' for comments
Multiple data lines concatenate with ''n'
Blank line emitted to client signals complete message dispatch

4. Reconnection Strategy
Default reconnect: 3000ms
Client reconnects on network drop; closed when readyState=2 (CLOSED) or server sends 204
Server override: send 'retry: <ms>'

5. Web Worker Usage
Instantiate EventSource inside worker global scope; identical API to window

6. PHP Server Example
Set headers as above; loop: echo id, event, data (JSON), retry, blank line; flush buffers; sleep

## Original Source
Server-Sent Events (SSE)
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## Digest of SERVER_SENT_EVENTS

# Server-Sent Events (SSE)

## EventSource interface
- Constructor: EventSource(url: string, eventSourceInit?: { withCredentials?: boolean })
- Properties:
  - readyState: number (0=CONNECTING, 1=OPEN, 2=CLOSED)
  - url: string
  - withCredentials: boolean
- Event handlers:
  - onopen: (event: Event) => void
  - onmessage: (event: MessageEvent) => void  // event.data: string, event.lastEventId: string
  - onerror: (event: Event) => void

## Server Response Format
- Required HTTP headers:
  - Content-Type: text/event-stream; charset=UTF-8
  - Cache-Control: no-cache
  - Connection: keep-alive
- Data stream fields (each line ends with "\n"):
  - event: <event-name>       // optional, defines custom event type
  - data: <text>              // one or more data lines concatenated with "\n"
  - id: <last-event-id>       // optional, sets event.lastEventId
  - retry: <milliseconds>     // optional, overrides default reconnection delay
  - :<comment>                // optional, comment line ignored by client
- Message dispatch: blank line denotes dispatch of accumulated fields as one event

## Reconnection and Error Handling
- Default retry interval: 3000 ms
- Browser reconnects automatically on network interruption
- To override interval: send "retry: <ms>\n\n"
- On HTTP 204 or explicit close: readyState becomes CLOSED, no reconnection

## Using SSE in Web Workers
- Feature available in dedicated and shared workers
- Worker global scope has EventSource support identical to window

## Example: PHP SSE Server
```php
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
while (true) {
  echo "id: " . date('U') . "\n";
  echo "event: time\n";
  echo "data: {\"time\": \"" . date('c') . "\"}\n";
  echo "retry: 5000\n\n";
  ob_flush(); flush();
  sleep(1);
}
```

## Attribution
- Source: Server-Sent Events (SSE)
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- License: CC BY-SA 2.5
- Crawl Date: 2025-05-10T17:31:23.243Z
- Data Size: 1718391 bytes
- Links Found: 18391

## Retrieved
2025-05-10
