# SERVER_SENT_EVENTS

## Crawl Summary
Client API: EventSource(url, options). Properties: url, withCredentials, readyState(0,1,2). Methods: close(), add/removeEventListener(). Handlers: onopen, onmessage, onerror. Server protocol: HTTP headers Content-Type:text/event-stream, Cache-Control:no-cache, Connection:keep-alive. Message fields: data, id, event, retry. Lines prefixed by field name, terminated by empty line. Keep-alive via comment `: text`. Automatic reconnection with 3000ms default or server-specified retry. CORS support requires Access-Control-Allow-Origin.

## Normalised Extract
Table of Contents
1 EventSource Interface
2 Message Format
3 Server Implementation
4 Error Handling & Reconnect
5 Troubleshooting

1 EventSource Interface
Constructor: new EventSource(url: string, options?: {withCredentials?: boolean})
Properties:
 readyState: number (0 CONNECTING,1 OPEN,2 CLOSED)
 url: string
 withCredentials: boolean(default false)
 CONNECTING=0, OPEN=1, CLOSED=2
Methods:
 close(): void
 addEventListener(type: string, listener: (evt: MessageEvent)⇒void): void
 removeEventListener(type: string, listener: (evt: MessageEvent)⇒void): void
Event Handlers:
 onopen(Event), onmessage(MessageEvent), onerror(Event)

2 Message Format
Server must send UTF-8 text with headers:
 Content-Type: text/event-stream
 Cache-Control: no-cache
 Connection: keep-alive
Fields per event:
 data: <text>
 id: <text>
 event: <type>
 retry: <milliseconds>
Multiple data lines concatenated with "\n"; blank line ends event.
Keep-alive: lines beginning with ":"

3 Server Implementation
Node.js Express pattern:
 res.setHeader('Content-Type','text/event-stream');
 res.setHeader('Cache-Control','no-cache');
 res.setHeader('Connection','keep-alive');
 res.flushHeaders();
 function sendEvent(data,id,event,retry){…}
 setInterval(()=> sendEvent(...), interval)
 req.on('close',()=> res.end())

PHP pattern:
 header('Content-Type: text/event-stream');
 header('Cache-Control: no-cache');
 while(true){ echo "data: ...\n\n"; ob_flush();flush(); sleep(1); }

4 Error Handling & Reconnect
Client auto-reconnect Delay: default 3000ms or server retry value. Abort with close().
onerror checks readyState===CLOSED.

5 Troubleshooting
Use curl -i to verify headers. Check for proper SSE headers. For CORS add Access-Control-Allow-Origin.

## Supplementary Details
HTTP headers required by server:
 Content-Type: text/event-stream; charset=utf-8
 Cache-Control: no-cache
 Connection: keep-alive
Optional:
 Access-Control-Allow-Origin: *

Server-side steps:
 1. Set headers.
 2. Flush headers.
 3. Emit events: write 'field: value\n' lines, end with '\n'.
 4. Keep connection alive: interval, comment lines, ping.
 5. Clean up on client disconnect.

Client options:
 withCredentials: false by default. Set to true to send cookies.

reconnection:
 Default retry: 3000ms. Overridden by server 'retry' field in ms.

Event types:
 'message' (default), or custom via event field.

Event ID handling:
 Browser stores lastEventId, sends Last-Event-ID header on reconnect.

Buffering:
 Ensure res.flushHeaders() or res.flush() to send data immediately.


## Reference Details
EventSource API
Constructor:
 new EventSource(input: string | URL, options?: {
   withCredentials?: boolean
 }): EventSource

Properties:
 EventSource.CONNECTING: 0
 EventSource.OPEN: 1
 EventSource.CLOSED: 2
 url: string
 withCredentials: boolean
 readyState: number

Methods:
 close(): void
 addEventListener(type: string, listener: (evt: MessageEvent) => void, options?: boolean | AddEventListenerOptions): void
 removeEventListener(type: string, listener: (evt: MessageEvent) => void, options?: boolean | EventListenerOptions): void

Event Handlers:
 onopen: (evt: Event) => void
 onmessage: (evt: MessageEvent) => void
 onerror: (evt: Event) => void

MessageEvent properties:
 data: string
 origin: string
 lastEventId: string

Server-Side Example Node.js (Express):
```js
const express = require('express');
const app = express();
app.get('/events', (req, res) => {
  res.setHeader('Content-Type','text/event-stream');
  res.setHeader('Cache-Control','no-cache');
  res.setHeader('Connection','keep-alive');
  res.flushHeaders();
  let id = 0;
  const timer = setInterval(() => {
    id++;
    res.write(`id: ${id}\n`);
    res.write(`event: update\n`);
    res.write(`data: ${new Date().toISOString()}\n\n`);
  }, 1000);
  req.on('close', () => { clearInterval(timer); res.end(); });
});
app.listen(3000);
```

PHP Example:
```php
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
$counter = 0;
while (true) {
  $counter++;
  echo "id: {$counter}\n";
  echo "data: Hello {$counter}\n\n";
  ob_flush(); flush();
  sleep(1);
}
```

Client Usage:
```js
const src = new EventSource('https://example.com/events', { withCredentials: true });
src.onopen = () => console.log('Connected');
src.onmessage = e => console.log('Message:', e.data);
src.onerror = e => {
  if (src.readyState === EventSource.CLOSED) console.log('Connection closed');
  else console.log('Error occurred');
};
// Custom event
src.addEventListener('update', e => console.log('Update:', e.data));
// To close
src.close();
```

Best Practices:
• Send keep-alive comments to prevent proxy timeouts: `res.write(': ping\n\n');`
• Include retry field periodically: `retry: 5000`.
• Use id field to resume streams.
• Avoid large idle time; send heartbeat every 15s.

Troubleshooting:
1. Verify headers: `curl -i https://host/events` expects headers above.
2. No data arriving: check flush; call res.flush() or obj_flush().
3. CORS errors: add `Access-Control-Allow-Origin: *` and `Access-Control-Allow-Credentials: true` if withCredentials.
4. HTTP 204 responses close connection; ensure 200.
5. Proxy buffering: disable buffering with `X-Accel-Buffering: no` for Nginx.


## Information Dense Extract
EventSource(url, {withCredentials?}) ⇒ CONNECTING(0)/OPEN(1)/CLOSED(2), properties: url, withCredentials, readyState, methods: close(), add/removeEventListener(), events: onopen, onmessage, onerror. Server: set headers Content-Type:text/event-stream;Cache-Control:no-cache;Connection:keep-alive; flush. Format: 'id:', 'event:', 'retry:', 'data:' lines; blank line terminates. retry in ms overrides default 3000ms. data lines concatenated with newline. Keep-alive with ': comment'. Client auto-reconnect on error. Last-Event-ID header sent on reconnect. Enable CORS via Access-Control-Allow-Origin/Credentials. Proxy: disable buffering (X-Accel-Buffering:no).

## Sanitised Extract
Table of Contents
1 EventSource Interface
2 Message Format
3 Server Implementation
4 Error Handling & Reconnect
5 Troubleshooting

1 EventSource Interface
Constructor: new EventSource(url: string, options?: {withCredentials?: boolean})
Properties:
 readyState: number (0 CONNECTING,1 OPEN,2 CLOSED)
 url: string
 withCredentials: boolean(default false)
 CONNECTING=0, OPEN=1, CLOSED=2
Methods:
 close(): void
 addEventListener(type: string, listener: (evt: MessageEvent)void): void
 removeEventListener(type: string, listener: (evt: MessageEvent)void): void
Event Handlers:
 onopen(Event), onmessage(MessageEvent), onerror(Event)

2 Message Format
Server must send UTF-8 text with headers:
 Content-Type: text/event-stream
 Cache-Control: no-cache
 Connection: keep-alive
Fields per event:
 data: <text>
 id: <text>
 event: <type>
 retry: <milliseconds>
Multiple data lines concatenated with ''n'; blank line ends event.
Keep-alive: lines beginning with ':'

3 Server Implementation
Node.js Express pattern:
 res.setHeader('Content-Type','text/event-stream');
 res.setHeader('Cache-Control','no-cache');
 res.setHeader('Connection','keep-alive');
 res.flushHeaders();
 function sendEvent(data,id,event,retry){}
 setInterval(()=> sendEvent(...), interval)
 req.on('close',()=> res.end())

PHP pattern:
 header('Content-Type: text/event-stream');
 header('Cache-Control: no-cache');
 while(true){ echo 'data: ...'n'n'; ob_flush();flush(); sleep(1); }

4 Error Handling & Reconnect
Client auto-reconnect Delay: default 3000ms or server retry value. Abort with close().
onerror checks readyState===CLOSED.

5 Troubleshooting
Use curl -i to verify headers. Check for proper SSE headers. For CORS add Access-Control-Allow-Origin.

## Original Source
Server-Sent Events (SSE)
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## Digest of SERVER_SENT_EVENTS

# EventSource Interface

Defines client-side API for receiving server-sent events.

Constructor:
```js
new EventSource(url: string, options?: { withCredentials?: boolean })
```

Properties:
- url: string (readonly)
- withCredentials: boolean (default: false)
- readyState: number (0=CONNECTING, 1=OPEN, 2=CLOSED)
- CONNECTING: 0
- OPEN: 1
- CLOSED: 2

Methods:
- close(): void — closes the connection
- addEventListener(type: string, listener: (evt: MessageEvent) ⇒ void): void
- removeEventListener(type: string, listener: (evt: MessageEvent) ⇒ void): void

Event handlers:
- onopen: Event ⇒ void — when connection opens
- onmessage: MessageEvent ⇒ void — when message arrives
- onerror: Event ⇒ void — on network error or parsing error


# Message Format

Server must send UTF-8 encoded text with Content-Type: text/event-stream. Messages separated by \n\n. Fields:
- data: <text>  (can appear multiple times; data lines concatenated with "\n")
- id: <text>    (sets lastEventId)
- event: <type> (dispatches event of this name)
- retry: <ms>   (suggests reconnection interval)

Empty lines terminate event.

Keep-alive comment lines begin with colon: `: keep-alive`.


# Server Implementation (Node.js Express)

```js
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type','text/event-stream');
  res.setHeader('Cache-Control','no-cache');
  res.setHeader('Connection','keep-alive');
  res.flushHeaders();

  const sendEvent = (data, id, event, retry) => {
    if (retry != null) res.write(`retry: ${retry}\n`);
    if (id != null)    res.write(`id: ${id}\n`);
    if (event != null) res.write(`event: ${event}\n`);
    data.split('\n').forEach(line => res.write(`data: ${line}\n`));
    res.write('\n');
  };

  const interval = setInterval(() => {
    sendEvent(Date.now().toString(), null, null, null);
  }, 1000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});
```

Simple PHP demo:
```php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$counter = 0;
while (true) {
  echo "data: {\"time\": " . time() . "}\n\n";
  ob_flush(); flush();
  sleep(1);
  $counter++;
  if ($counter > 100) exit;
}
```


# Error Handling & Reconnect

Client reconnects automatically after network error or non-200 status. Default reconnect delay is 3,000ms or last retry value from server. Use `evtSource.close()` to stop.

Listen for errors:
```js
evtSource.onerror = (err) => {
  if (evtSource.readyState === EventSource.CLOSED) {
    // connection closed permanently
  }
};
```


# Troubleshooting

Use `curl -i http://host/sse` to check headers:
```
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

Check browser console for CORS errors and add `res.setHeader('Access-Control-Allow-Origin','*')` if needed.


## Attribution
- Source: Server-Sent Events (SSE)
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- License: CC BY-SA 2.5
- Crawl Date: 2025-05-10T15:58:14.560Z
- Data Size: 2134043 bytes
- Links Found: 24339

## Retrieved
2025-05-10
