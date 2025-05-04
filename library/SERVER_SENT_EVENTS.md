# SERVER_SENT_EVENTS

## Crawl Summary
EventSource(url:USVString,{withCredentials?:boolean=false})
Properties: url:string readonly, withCredentials:boolean readonly, readyState:0|1|2
Constants: CONNECTING=0, OPEN=1, CLOSED=2
Methods: close():void, addEventListener(type,listener,options), removeEventListener(...), dispatchEvent(event)
Event Handlers: onopen(evt), onmessage(evt.data:string,evt.lastEventId:string), onerror(evt)
Protocol: text/event-stream; charset=UTF-8; fields: id:, event:, data:, retry:, comments start with ':'; blank line ends message; retry sets reconnect delay

## Normalised Extract
Table of Contents
1. Constructor
2. EventSourceInit
3. Properties
4. Methods
5. Constants
6. Event Handlers
7. Protocol Format

1. Constructor
Signature: EventSource(url: USVString, eventSourceInitDict?: {withCredentials?: boolean})
Parameters:
 url: absolute or relative URL of SSE endpoint
 eventSourceInitDict.withCredentials: true|false (default false)
Behavior: Initiates HTTP GET with Accept: text/event-stream; reconnects automatically on failure.

2. EventSourceInit
Dictionary:
 withCredentials boolean optional default false; controls sending of credentials.

3. Properties
 url: USVString readonly; endpoint URL
 withCredentials: boolean readonly; from init dict
 readyState: 0|1|2 readonly; connection state codes

4. Methods
 close(): void; stops stream and reconnection
 addEventListener(type: string, listener: MessageEventListener, options?: boolean | AddEventListenerOptions): void
 removeEventListener(type: string, listener: MessageEventListener, options?: boolean | EventListenerOptions): void
 dispatchEvent(event: Event): boolean

5. Constants
 static CONNECTING = 0
 static OPEN = 1
 static CLOSED = 2

6. Event Handlers
 onopen(evt: Event): called on open
 onmessage(evt: MessageEvent): evt.data:string, evt.lastEventId:string
 onerror(evt: Event): called on error; readyState may transition

7. Protocol Format
 Headers: Content-Type: text/event-stream; charset=UTF-8; Cache-Control: no-cache
 Fields per line: id:, event:, data:, retry:
 Comments with ":"
 Blank line terminates message block
 data: lines accumulate with newline separators
 retry: sets next reconnect interval (ms)

## Supplementary Details
Server Setup (Node.js Express):
 app.get('/sse', (req, res) => {
   res.writeHead(200, {
     'Content-Type': 'text/event-stream',
     'Cache-Control': 'no-cache',
     Connection: 'keep-alive'
   });
   let id = 0;
   const send = (data, eventType = 'message') => {
     res.write(`id: ${id}\n`);
     if(eventType !== 'message') res.write(`event: ${eventType}\n`);
     data.split('\n').forEach(line => res.write(`data: ${line}\n`));
     res.write('\n');
     id++;
   };
   send('Connection established');
   const interval = setInterval(() => send(`Server time: ${Date.now()}`), 3000);
   req.on('close', () => clearInterval(interval));
 });

Client Code (JavaScript):
 const source = new EventSource('/sse', {withCredentials: true});
 source.onopen = () => console.log('SSE connection opened');
 source.onmessage = event => console.log('Message:', event.data, 'Last ID:', event.lastEventId);
 source.onerror = () => console.error('SSE error, state:', source.readyState);

Configuration Options:
 withCredentials: false | true (default false)
 Reconnection: default 3000ms or as set by retry field

## Reference Details
API Specifications
EventSource
 Constructor(url: USVString, eventSourceInitDict?: EventSourceInit)
 EventSourceInit {
   withCredentials?: boolean // default false
 }
 Properties:
 url: USVString (readonly)
 withCredentials: boolean (readonly)
 readyState: number (readonly; 0=CONNECTING,1=OPEN,2=CLOSED)
 Constants:
 static CONNECTING: 0
 static OPEN: 1
 static CLOSED: 2
 Event Handlers:
 onopen: (evt: Event) => void
 onmessage: (evt: MessageEvent) => void // evt.data: string; evt.lastEventId: string
 onerror: (evt: Event) => void
 Methods:
 close(): void
 addEventListener(type: string, listener: (evt: MessageEvent) => any, options?: boolean|AddEventListenerOptions): void
 removeEventListener(type: string, listener: (evt: MessageEvent) => any, options?: boolean|EventListenerOptions): void
 dispatchEvent(event: Event): boolean

PHP Server Example:
 <?php
 header('Content-Type: text/event-stream');
 header('Cache-Control: no-cache');
 $id = 0;
 while (true) {
   echo "id: {$id}\n";
   echo "data: Server time: " . date('r') . "\n\n";
   ob_flush(); flush();
   $id++;
   sleep(1);
 }
 ?>

Implementation Pattern:
 1. Set appropriate headers
 2. Stream messages using id:, event:, data:, blank line
 3. Flush after each message
 4. Handle client disconnects
 5. Use retry field for dynamic reconnection intervals

Best Practices:
 - Include id in each message for reconnection continuity
 - Use custom event types via event: <type>
 - Handle readyState CLOSED to fallback

Troubleshooting:
 - Inspect raw stream: curl -N http://server/sse
 - Expect lines starting with data:, id:, blank line separation
 - If nothing appears: verify Content-Type and disable buffering at server/proxy

## Information Dense Extract
EventSource(url:USVString,{withCredentials?:boolean=false}); Properties: url,withCredentials,readyState(0|1|2); Constants: CONNECTING=0,OPEN=1,CLOSED=2; Methods: close(), addEventListener(type,listener,options), removeEventListener(...), dispatchEvent(event); Handlers: onopen, onmessage(data:string,lastEventId:string), onerror; Protocol: text/event-stream; charset=UTF-8; fields: id:,event:,data:,retry:; comments with ':'; blank line ends event; retry sets reconnect ms

## Sanitised Extract
Table of Contents
1. Constructor
2. EventSourceInit
3. Properties
4. Methods
5. Constants
6. Event Handlers
7. Protocol Format

1. Constructor
Signature: EventSource(url: USVString, eventSourceInitDict?: {withCredentials?: boolean})
Parameters:
 url: absolute or relative URL of SSE endpoint
 eventSourceInitDict.withCredentials: true|false (default false)
Behavior: Initiates HTTP GET with Accept: text/event-stream; reconnects automatically on failure.

2. EventSourceInit
Dictionary:
 withCredentials boolean optional default false; controls sending of credentials.

3. Properties
 url: USVString readonly; endpoint URL
 withCredentials: boolean readonly; from init dict
 readyState: 0|1|2 readonly; connection state codes

4. Methods
 close(): void; stops stream and reconnection
 addEventListener(type: string, listener: MessageEventListener, options?: boolean | AddEventListenerOptions): void
 removeEventListener(type: string, listener: MessageEventListener, options?: boolean | EventListenerOptions): void
 dispatchEvent(event: Event): boolean

5. Constants
 static CONNECTING = 0
 static OPEN = 1
 static CLOSED = 2

6. Event Handlers
 onopen(evt: Event): called on open
 onmessage(evt: MessageEvent): evt.data:string, evt.lastEventId:string
 onerror(evt: Event): called on error; readyState may transition

7. Protocol Format
 Headers: Content-Type: text/event-stream; charset=UTF-8; Cache-Control: no-cache
 Fields per line: id:, event:, data:, retry:
 Comments with ':'
 Blank line terminates message block
 data: lines accumulate with newline separators
 retry: sets next reconnect interval (ms)

## Original Source
MDN Server-Sent Events (SSE)
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## Digest of SERVER_SENT_EVENTS

# Server-Sent Events (SSE)
Date Retrieved: 2024-06-01
Source: MDN Web Docs, Server-Sent Events (last modified Mar 20, 2025)
Data Size: 1860366 bytes

# EventSource Interface

## Constructor

EventSource(url: USVString, eventSourceInitDict?: EventSourceInit)
Initializes a persistent SSE connection to the given URL, automatically reconnecting on network failures.

## EventSourceInit Dictionary

withCredentials: boolean
Default: false
Controls whether cookies and HTTP authentication are sent with requests.

## Properties

url: USVString (readonly)
withCredentials: boolean (readonly)
readyState: number (readonly; 0=CONNECTING, 1=OPEN, 2=CLOSED)

## Methods

close(): void
Terminates the connection and stops reconnection.

addEventListener(type: string, listener: (evt: MessageEvent) => any, options?: boolean | AddEventListenerOptions): void
removeEventListener(type: string, listener: (evt: MessageEvent) => any, options?: boolean | EventListenerOptions): void
dispatchEvent(event: Event): boolean

## Constants

static CONNECTING: 0
static OPEN: 1
static CLOSED: 2

## Event Handlers

onopen: (evt: Event) => any
onmessage: (evt: MessageEvent) => any
onerror: (evt: Event) => any

# Protocol Format

Streams must use Content-Type: text/event-stream; charset=UTF-8 and disable buffering.
Each message block ends with a blank line. Supported fields per line:

id: <string>    sets lastEventId for reconnection
event: <type>   sets custom event type beyond default "message"
data: <content> payload; multiple lines concatenate with "\n"
retry: <ms>     updates reconnection delay (in milliseconds)
: <comment>     ignored by client


## Attribution
- Source: MDN Server-Sent Events (SSE)
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- License: CC BY-SA 2.5
- Crawl Date: 2025-05-04T12:59:45.417Z
- Data Size: 1860366 bytes
- Links Found: 21397

## Retrieved
2025-05-04
