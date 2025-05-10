# SERVER_SENT_EVENTS

## Crawl Summary
SSE messages use lines prefixed by data:, id:, event:, retry: and a blank line to dispatch. EventSource API: new EventSource(url, {withCredentials}), properties url, readyState, constants CONNECTING=0, OPEN=1, CLOSED=2, methods close(), addEventListener(), removeEventListener(), event handlers onopen, onmessage, onerror. Server must send headers Content-Type:text/event-stream; Cache-Control:no-cache; Connection:keep-alive. Default retry interval is 3000ms, override via retry field. Examples provided for PHP and JavaScript client.

## Normalised Extract
Table of Contents
1 SSE Protocol Format
2 EventSource Interface
3 Server Headers
4 Reconnection & Error Handling
5 Code Examples

1 SSE Protocol Format
 data: <string> append each line with '\n'; multi-line messages join lines
 id: <string> stored in lastEventId for resume
 event: <string> defines custom event type
 retry: <integer> ms before reconnect override default
 blank line separates and dispatches event

2 EventSource Interface
 Signature: new EventSource(url: string, eventSourceInitDict?: {withCredentials?: boolean})
 Properties:
  url                 string endpoint
  withCredentials     boolean, defaults to false
  readyState          number: 0 CONNECTING, 1 OPEN, 2 CLOSED
 Methods:
  close(): void       terminates connection
  addEventListener(type, listener, options?): void
  removeEventListener(type, listener, options?): void
 Handlers:
  onopen(e: Event)
  onmessage(e: MessageEvent{data:string, lastEventId:string, origin:string})
  onerror(e: Event)

3 Server Headers
 Content-Type: text/event-stream; charset=utf-8
 Cache-Control: no-cache; no-transform
 Connection: keep-alive
 Prevent proxy buffering (e.g., upstream_buffering off)

4 Reconnection & Error Handling
 Default retry = 3000ms
 Override via 'retry: <ms>' in stream
 onerror: if readyState==CLOSED then no reconnect
 Ensure HTTP status 200 and no Content-Length header for streaming

5 Code Examples
 Client JavaScript:
  var es = new EventSource('/events', {withCredentials:true});
  es.addEventListener('message', e => console.log(e.data));
  setTimeout(() => es.close(), 60000);
 Server Node.js (Express):
  app.get('/events', (req,res) => {
    res.writeHead(200, {'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
    const send = () => res.write('data: '+new Date().toISOString()+'\n\n');
    const interval = setInterval(send,1000);
    req.on('close', () => clearInterval(interval));
  });

## Supplementary Details
Server-Side Implementation
- PHP: header('Content-Type: text/event-stream'); header('Cache-Control: no-cache'); header('Connection: keep-alive'); use ob_flush(); flush(); sleep(interval)
- Node.js: res.writeHead(200, headers); res.write('id: '+id+'\n'); res.write('event: '+type+'\n'); res.write('data: '+payload+'\n\n')
- Loop control: clear interval on client disconnect (req.on('close'))
- Ensure no Content-Length header, use Transfer-Encoding: chunked

Client-Side Configuration
- eventSourceInitDict options: withCredentials:boolean
- Use addEventListener for custom event types: es.addEventListener('update', handler)
- Polyfill for Node: import 'eventsource'; new EventSource(url)
- CORS: server must send Access-Control-Allow-Origin and credentials if needed

Performance & Compatibility
- SSE is unidirectional, suitable for low-frequency updates
- Supported in modern browsers and Web Workers
- Fallback to polling or WebSocket in unsupported environments

## Reference Details
API Specification
EventSource(url: string, eventSourceInitDict?: EventSourceInit)
interface EventSourceInit { withCredentials?: boolean; }

Properties
readonly url: string
readonly withCredentials: boolean
readonly readyState: number
static CONNECTING: number = 0
static OPEN: number       = 1
static CLOSED: number     = 2

Methods
addEventListener(type: string, listener: (ev: any) => any, options?: boolean|AddEventListenerOptions): void
removeEventListener(type: string, listener: (ev: any) => any, options?: boolean|EventListenerOptions): void
close(): void

Event Handlers
onopen: (this: EventSource, ev: Event) => any
onmessage: (this: EventSource, ev: MessageEvent) => any
onerror: (this: EventSource, ev: Event) => any

MessageEvent properties
 data: any
 lastEventId: string
 origin: string

Full Client Example
var es = new EventSource('/stream', {withCredentials:true});
es.addEventListener('open', e => console.log('open'), false);
es.addEventListener('message', e => console.log('data', e.data), false);
es.addEventListener('error', e => {
  if (es.readyState === EventSource.CLOSED) console.log('closed');
}, false);

Best Practices
- Always include 'id' field to support resume
- Control retry interval via 'retry' field
- Monitor readyState before sending
- Use HTTP headers to disable caching and buffering

Troubleshooting
1 Confirm headers: curl -i http://host/sse
   Expect: HTTP/1.1 200 OK
           Content-Type: text/event-stream
           Cache-Control: no-cache
           Connection: keep-alive
2 Test no buffering: curl --no-buffer http://host/sse
3 Check console for readyState values
4 Ensure server loop handles client disconnect (req.on('close') or while(true) exit condition)
5 Verify event format: data lines end with '\n\n'

## Information Dense Extract
Protocol: data:,id:,event:,retry:,blank-line dispatch; EventSource API: new EventSource(url,init?); init.withCredentials:boolean; props url:string,withCredentials:boolean,readyState:0|1|2; constants CONNECTING0,OPEN1,CLOSED2; methods addEventListener,removeEventListener,close; handlers onopen, onmessage(MessageEvent.data:string,lastEventId:string), onerror; Server headers: Content-Type:text/event-stream;Cache-Control:no-cache;Connection:keep-alive; no Content-Length; default retry 3000ms, override via retry field; PHP: header, echo 'data:...\n\n', flush; Node: res.writeHead, res.write loop, clear on close; Best: id for resume, custom retry, polyfill; Troubleshoot: curl -i and --no-buffer

## Sanitised Extract
Table of Contents
1 SSE Protocol Format
2 EventSource Interface
3 Server Headers
4 Reconnection & Error Handling
5 Code Examples

1 SSE Protocol Format
 data: <string> append each line with ''n'; multi-line messages join lines
 id: <string> stored in lastEventId for resume
 event: <string> defines custom event type
 retry: <integer> ms before reconnect override default
 blank line separates and dispatches event

2 EventSource Interface
 Signature: new EventSource(url: string, eventSourceInitDict?: {withCredentials?: boolean})
 Properties:
  url                 string endpoint
  withCredentials     boolean, defaults to false
  readyState          number: 0 CONNECTING, 1 OPEN, 2 CLOSED
 Methods:
  close(): void       terminates connection
  addEventListener(type, listener, options?): void
  removeEventListener(type, listener, options?): void
 Handlers:
  onopen(e: Event)
  onmessage(e: MessageEvent{data:string, lastEventId:string, origin:string})
  onerror(e: Event)

3 Server Headers
 Content-Type: text/event-stream; charset=utf-8
 Cache-Control: no-cache; no-transform
 Connection: keep-alive
 Prevent proxy buffering (e.g., upstream_buffering off)

4 Reconnection & Error Handling
 Default retry = 3000ms
 Override via 'retry: <ms>' in stream
 onerror: if readyState==CLOSED then no reconnect
 Ensure HTTP status 200 and no Content-Length header for streaming

5 Code Examples
 Client JavaScript:
  var es = new EventSource('/events', {withCredentials:true});
  es.addEventListener('message', e => console.log(e.data));
  setTimeout(() => es.close(), 60000);
 Server Node.js (Express):
  app.get('/events', (req,res) => {
    res.writeHead(200, {'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
    const send = () => res.write('data: '+new Date().toISOString()+''n'n');
    const interval = setInterval(send,1000);
    req.on('close', () => clearInterval(interval));
  });

## Original Source
Server-Sent Events (SSE)
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## Digest of SERVER_SENT_EVENTS

# Server-Sent Events (SSE)

# Protocol Format
Lines prefixed by a field name and colon
data: <text>         can span multiple lines, concatenated with "\n"
id: <string>         sets lastEventId for reconnection
event: <string>      custom event type dispatched
retry: <integer>     sets reconnection delay in milliseconds
blank line           dispatches the event to the client

# EventSource Interface
Constructor
new EventSource(url: string, eventSourceInitDict?: { withCredentials?: boolean })

Properties
url: string
eventSourceInitDict.withCredentials?: boolean
readyState: number

Static Constants
EventSource.CONNECTING = 0
EventSource.OPEN       = 1
EventSource.CLOSED     = 2

Methods
close(): void
addEventListener(type: string, listener: (ev: any) => any, options?: any): void
removeEventListener(type: string, listener: (ev: any) => any, options?: any): void

Event Handlers
onopen(e: Event): any
onmessage(e: MessageEvent): any
onerror(e: Event): any

# Server Configuration Headers
Content-Type: text/event-stream; charset=utf-8
Cache-Control: no-cache; no-transform
Connection: keep-alive

# Simple Server Example (PHP)
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
while (true) {
  $data = date('H:i:s');
  echo "data: $data\n\n";
  ob_flush();
  flush();
  sleep(1);
}

# Simple Client Example (JavaScript)
var es = new EventSource('/sse');
es.onopen = function(e) {
  console.log('Connection opened');
};
es.onmessage = function(e) {
  console.log('Message:', e.data);
};
es.onerror = function(e) {
  if (es.readyState === EventSource.CLOSED) {
    console.log('Connection closed by server');
  }
};

## Attribution
- Source: Server-Sent Events (SSE)
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- License: CC BY-SA 2.5
- Crawl Date: 2025-05-10T21:25:23.360Z
- Data Size: 2471267 bytes
- Links Found: 28823

## Retrieved
2025-05-10
