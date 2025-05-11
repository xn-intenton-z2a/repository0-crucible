library/SERVER_SENT_EVENTS.md
# library/SERVER_SENT_EVENTS.md
# SERVER_SENT_EVENTS

## Crawl Summary
HTTP response must use text/event-stream with no-cache and keep-alive. Each SSE frame comprises optional id, optional event, mandatory data, optional retry, ending with a blank line. Preceded comment lines begin with ':' and ignored. Clients instantiate new EventSource(url[, {withCredentials}]), read properties url, withCredentials, readyState (0,1,2), static constants, addEventListener('message', MessageEvent), onopen, onerror, close(). Default reconnect = 3000ms or server-specified retry. Last-Event-ID header preserved across reconnect. Available in Web Workers. Several polyfills exist.

## Normalised Extract
Table of Contents
1  Server-Side: HTTP Headers and SSE Frame Format
2  Client-Side: EventSource Interface
3  Reconnection and Error Handling
4  Polyfill Options

1  Server-Side: HTTP Headers and SSE Frame Format
  • Send HTTP status 200, headers: Content-Type: text/event-stream; Cache-Control: no-cache; Connection: keep-alive
  • Each event frame consists of lines:
      id: <string>
      event: <string>
      data: <text>
      retry: <integer milliseconds>
    Terminate frame with two sequential '\n'.
  • Multiple data lines concatenated with '\n' into one message payload.
  • Comment lines begin with ':' and ignored.

2  Client-Side: EventSource Interface
  • Constructor: new EventSource(input, { withCredentials?: boolean })
  • Properties:
      url            string initial URL
      withCredentials boolean
      readyState     number (0 CONNECTING,1 OPEN,2 CLOSED)
      static CONNECTING=0, OPEN=1, CLOSED=2
  • Methods and Handlers:
      es.addEventListener(type: string, listener: (e: MessageEvent)=>void): void
      es.removeEventListener(type, listener): void
      es.close(): void
      es.onopen(ev: Event): void
      es.onmessage(ev: MessageEvent): void
      es.onerror(ev: Event): void
  • MessageEvent fields:
      data           string payload
      lastEventId    string id value
      origin         string 'protocol://host'

3  Reconnection and Error Handling
  • Default retry interval = 3000 ms
  • Use "retry: <ms>" in server frame to override
  • Automatic reconnects on network error or server close
  • Client sends "Last-Event-ID" header on reconnect if id was set

4  Polyfill Options
  • npm install eventsource for Node.js
  • @microsoft/fetch-event-source for fetch-based polyfill
  • jQuery plugin: jquery.eventsource


## Supplementary Details
Server Implementation in Node.js (Express)
1  app.get('/events', (req, res) => {
2    res.writeHead(200, {
3      'Content-Type': 'text/event-stream',
4      'Cache-Control': 'no-cache',
5      'Connection': 'keep-alive'
6    });
7    let id = 0;
8    setInterval(() => {
9      id++;
10     res.write(`id: ${id}\n`);
11     res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`);
12   }, 1000);
13 });

Server Implementation in PHP
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
$counter = 0;
while (true) {
  echo "id: $counter\n";
  echo "data: The server time is " . date('r') . "\n\n";
  ob_flush(); flush();
  $counter++;
  sleep(1);
}
?>

Web Worker Client Example
const es = new EventSource('/events');
es.onmessage = e => postMessage(e.data);

Configuration Options
• withCredentials (boolean): default false. When true, sends cookies and HTTP credentials.


## Reference Details
1. EventSource API Specification
Constructor:
  new EventSource(input: string|URL, eventSourceInitDict?: {withCredentials?: boolean}) : EventSource
Properties:
  url: string
  withCredentials: boolean
  readyState: number
  static CONNECTING: 0
  static OPEN: 1
  static CLOSED: 2
Methods:
  addEventListener(type: string, listener: (ev: any)=>void, options?: boolean|AddEventListenerOptions): void
  removeEventListener(type: string, listener: (ev: any)=>void, options?: boolean|EventListenerOptions): void
  close(): void
Event Handlers:
  onopen: (ev: Event)=>void
  onmessage: (ev: MessageEvent)=>void
  onerror: (ev: Event)=>void

2. Detailed Usage Patterns
Client: Reconnecting from last event
const es = new EventSource('/events');
es.onmessage = e => {
  console.log('message', e.data);
};
es.onerror = () => {
  if (es.readyState === EventSource.CLOSED) console.error('Connection closed');
};

3. Best Practices
• Send a comment every 15–30 seconds: res.write(': keep-alive\n\n') to prevent network timeouts.
• Use `retry: 10000` to instruct clients to wait 10s before reconnect.
• Guard against memory leaks by checking `req.socket.destroyed` before sending.

4. Troubleshooting Procedures
A. Inspect SSE stream with cURL:
   curl -N -i http://localhost:3000/events
 Expected Response:
   HTTP/1.1 200 OK
   Content-Type: text/event-stream
   Cache-Control: no-cache
   Connection: keep-alive

   id: 1
   data: {"time":1640995200000}

B. Verify reconnection header:
   tcpdump -A host localhost and port 3000 | grep Last-Event-ID
   Expect: "Last-Event-ID: <last id>" on reconnect request


## Information Dense Extract
SSE requires HTTP/1.1 chunked response with headers: text/event-stream,no-cache,keep-alive. Frames: id:<id>\nevent:<name>?\ndata:<text>[\ndata:<text>...]\nretry:<ms>?\n\n. Client: const es=new EventSource(url,{withCredentials:false});es.addEventListener('message',e=>e.data);es.onopen;es.onerror;es.close();es.readyState constants CONNECTING=0,OPEN=1,CLOSED=2. Default retry=3000ms, override via server-sent retry. Last-Event-ID header auto-sent. Server Node.js: res.writeHead(...);setInterval(()=>{res.write(`id:${n}\n`);res.write(`data:${payload}\n\n`);},interval). PHP: header, while(true){echo id, data, flush;sleep}. Best practice: send keep-alive comments. Troubleshoot via curl -N and tcpdump.

## Sanitised Extract
Table of Contents
1  Server-Side: HTTP Headers and SSE Frame Format
2  Client-Side: EventSource Interface
3  Reconnection and Error Handling
4  Polyfill Options

1  Server-Side: HTTP Headers and SSE Frame Format
   Send HTTP status 200, headers: Content-Type: text/event-stream; Cache-Control: no-cache; Connection: keep-alive
   Each event frame consists of lines:
      id: <string>
      event: <string>
      data: <text>
      retry: <integer milliseconds>
    Terminate frame with two sequential ''n'.
   Multiple data lines concatenated with ''n' into one message payload.
   Comment lines begin with ':' and ignored.

2  Client-Side: EventSource Interface
   Constructor: new EventSource(input, { withCredentials?: boolean })
   Properties:
      url            string initial URL
      withCredentials boolean
      readyState     number (0 CONNECTING,1 OPEN,2 CLOSED)
      static CONNECTING=0, OPEN=1, CLOSED=2
   Methods and Handlers:
      es.addEventListener(type: string, listener: (e: MessageEvent)=>void): void
      es.removeEventListener(type, listener): void
      es.close(): void
      es.onopen(ev: Event): void
      es.onmessage(ev: MessageEvent): void
      es.onerror(ev: Event): void
   MessageEvent fields:
      data           string payload
      lastEventId    string id value
      origin         string 'protocol://host'

3  Reconnection and Error Handling
   Default retry interval = 3000 ms
   Use 'retry: <ms>' in server frame to override
   Automatic reconnects on network error or server close
   Client sends 'Last-Event-ID' header on reconnect if id was set

4  Polyfill Options
   npm install eventsource for Node.js
   @microsoft/fetch-event-source for fetch-based polyfill
   jQuery plugin: jquery.eventsource

## Original Source
API Specifications and Protocols
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## Digest of SERVER_SENT_EVENTS

# Server-Sent Events (SSE) API Reference

## Overview
Server-Sent Events (SSE) allow a server to push text-based event streams to clients over HTTP. Clients open a long-lived HTTP connection and receive messages formatted as simple text frames.

## HTTP Server Requirements
1. Response headers:
   • Content-Type: text/event-stream
   • Cache-Control: no-cache
   • Connection: keep-alive
2. Each message must end with two sequential newline characters ("\n\n").
3. Supported fields per event frame:
   • id: <string> (sets `Last-Event-ID` for reconnection)
   • event: <string> (optional custom event name)
   • data: <string> (required; multiple `data:` lines concatenated with "\n")
   • retry: <milliseconds> (optional reconnection delay override)
4. Comment lines start with colon (`:`) and are ignored by the client.

## Client Interface: EventSource
Constructor:
```ts
new EventSource(input: string | URL, eventSourceInitDict?: { withCredentials?: boolean })
```  
Properties:
- url: string
- withCredentials: boolean
- readyState: number (0=CONNECTING, 1=OPEN, 2=CLOSED)
- static CONNECTING: 0
- static OPEN: 1
- static CLOSED: 2

Methods and Event Handlers:
```ts
es.addEventListener(type: string, listener: (e: MessageEvent) => void, options?: boolean | AddEventListenerOptions): void
es.removeEventListener(type: string, listener: (e: MessageEvent) => void, options?: boolean | EventListenerOptions): void
es.close(): void
es.onopen   = (evt: Event) => void
es.onmessage= (evt: MessageEvent) => void
es.onerror  = (evt: Event) => void
```

## Reconnection Behavior
- Default retry interval: 3000 ms
- Server-supplied `retry: <ms>` overrides default.
- Upon network or server error, EventSource attempts automatic reconnection.
- Sends `Last-Event-ID` header on reconnect if `id:` was present in last frame.

## Worker Compatibility
- Supported in Web Workers. Use identical API.

## Polyfills and Tools
- Node.js: eventsource, @microsoft/fetch-event-source
- jQuery plugin: jquery.eventsource
- AdonisJS: transmit
- Mercure: real-time pub-sub over SSE



## Attribution
- Source: API Specifications and Protocols
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- License: CC0 1.0 Universal / Apache-2.0 / MIT License
- Crawl Date: 2025-05-11T12:30:02.220Z
- Data Size: 1739040 bytes
- Links Found: 18742

## Retrieved
2025-05-11
