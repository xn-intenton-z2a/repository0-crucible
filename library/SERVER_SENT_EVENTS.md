# SERVER_SENT_EVENTS

## Crawl Summary
EventSource API: constructor(url, init), readyState constants CONNECTING=0, OPEN=1, CLOSED=2; methods addEventListener, removeEventListener, dispatchEvent, close; properties url, readyState, withCredentials, onopen, onmessage, onerror. SSE protocol: response headers text/event-stream, no-cache, keep-alive; message fields id, event, data (multiple), retry; blank line delimiter; client auto-reconnect after retry or default 3000ms.

## Normalised Extract
Table of Contents:
1 EventSource Interface
2 SSE Protocol Format
3 Browser Client Usage
4 Server Implementation Steps

1 EventSource Interface
Constructor: EventSource(url:string, eventSourceInit?:{withCredentials?:boolean}) => EventSource
Properties:
 - url: string
 - readyState: 0|1|2
 - withCredentials: boolean (default false)
 - onopen, onmessage, onerror: event handlers
Methods:
 - addEventListener(type:string, listener, options?)
 - removeEventListener(type:string, listener, options?)
 - dispatchEvent(event:Event)
 - close():void
Constants: CONNECTING=0, OPEN=1, CLOSED=2

2 SSE Protocol Format
Response Headers:
 - Content-Type: text/event-stream; charset=utf-8
 - Cache-Control: no-cache
 - Connection: keep-alive
Message block fields:
 - id: string|number
 - event: string
 - data: string (one or multiple lines)
 - retry: milliseconds
Terminate each block with an empty newline
Use ":" prefix for comment/heartbeat lines

3 Browser Client Usage
```
const es = new EventSource('/stream', { withCredentials: true });
es.onopen = () => console.log('connected');
es.onmessage = e => console.log('msg', e.data);
es.onerror = e => console.error('err', e);
// close when done
es.close();
```

4 Server Implementation Steps (Node.js)
1. Create HTTP server
2. On client request, write headers:
   Content-Type: text/event-stream; charset=utf-8
   Cache-Control: no-cache
   Connection: keep-alive
3. Use setInterval or event hooks to write:
   res.write(`id: ${id}\n`);
   res.write('event: <name>\n');
   res.write('data: <payload>\n\n');
4. flush or ensure corked streams are sent immediately
5. Handle Last-Event-ID header for resume
6. On client close/error, clear intervals


## Supplementary Details
Server Headers and Behavior:
 - Content-Type: text/event-stream; charset=utf-8
 - Cache-Control: no-cache          // disables caching proxies
 - Connection: keep-alive          // keep TCP open
 - Always use LF ("\n") as line terminator; CRLF may break parsing
 - send initial comment ":  connected\n\n" to open stream
 - use comment lines (prefix ":") every 15s as heartbeat to prevent timeouts

EventStream Fields:
 - id: maintains last-event-id; sent as Last-Event-ID on reconnect
 - event: custom event type for client addEventListener
 - data: payload; multi-line data concatenated by client with "\n"
 - retry: reconnection delay override in ms

Client Options:
 - withCredentials: false by default; set true to send cookies/session

Implementation Checklist:
1 Bind HTTP endpoint to serve SSE
2 Set required headers
3 On server-side events, format each event block
4 Flush writes immediately
5 Track and send incremental id
6 Support client-provided Last-Event-ID for replay
7 Manage connection close and cleanup


## Reference Details
Complete API Specifications

EventSource Interface (Web API)
-------------------------------
Constructor:
EventSource(input: string | URL, eventSourceInitDict?: { withCredentials?: boolean }): EventSource
 - input: absolute or relative URL string or URL object; throws TypeError if invalid
 - eventSourceInitDict.withCredentials: boolean; default false; if true, sends cookies/HTTP-Auth
Returns: EventSource instance

Static Constants:
 - EventSource.CONNECTING: 0
 - EventSource.OPEN:       1
 - EventSource.CLOSED:     2

Instance Properties:
 - url: string               // identical to input URL
 - readyState: number        // current state (0,1,2)
 - withCredentials: boolean  // reflects init option or default
 - onopen: ((ev: Event) => any) | null
 - onmessage: ((ev: MessageEvent) => any) | null
 - onerror: ((ev: Event) => any) | null

Instance Methods:
 - addEventListener(type: string, listener: (ev:any) => any, options?: boolean|AddEventListenerOptions): void
 - removeEventListener(type: string, listener: (ev:any) => any, options?: boolean|EventListenerOptions): void
 - dispatchEvent(event: Event): boolean
 - close(): void              // terminate connection and transition to CLOSED

Events:
 - open:    fired when connection is established
 - message: fired on each incoming event with parsed data
 - error:   fired on network error or parse error
 - custom events: type set via "event:" field

Examples
--------
// Browser client
const source = new EventSource('/events', { withCredentials: true });
source.addEventListener('message', function(e) {
  console.log('data:', e.data);
});
source.close();

// Node.js server
import http from 'http';
http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  // send initial heartbeat
  res.write(': ping\n\n');
  let id = 0;
  const interval = setInterval(() => {
    id++;
    res.write(`id: ${id}\n`);
    res.write('event: update\n');
    res.write(`data: { \"time\": \"${new Date().toISOString()}\" }\n\n`);
  }, 10000);
  req.on('close', () => { clearInterval(interval); });
}).listen(3000);

Configuration Options
---------------------
 - withCredentials: boolean (EventSource init) default false
 - SSE headers: Content-Type, Cache-Control, Connection
 - retry field in stream sets ms to wait before reconnect
 - Last-Event-ID header for resumed connections

Best Practices
--------------
 - Send comment lines every 15s to keep proxies alive: res.write(': keep-alive\n\n')
 - Use incremental numeric 'id' to resume lost events
 - Minimize event block size (<64KB) to avoid buffering issues
 - Handle readyState transitions and errors in client
 - Always call source.close() on component unmount or navigation away

Troubleshooting Procedures
--------------------------
1. Verify headers with curl:
   curl -i -N http://localhost:3000/events
   Expected: 200 OK, Content-Type: text/event-stream
2. Inspect stream in browser console: 
   var es=new EventSource('/events'); es.onmessage=e=>console.log(e.data);
3. Check Last-Event-ID: on reconnect, server sees header 'Last-Event-ID: <id>'
4. Debug CORS: if cookies needed, set server header 'Access-Control-Allow-Credentials: true' and init withCredentials
5. Test network errors by killing server; confirm client fires 'error' and reconnects after default ~3000ms


## Information Dense Extract
EventSource(url:string, {withCredentials?:boolean})=>EventSource; readyState:0 CONNECTING|1 OPEN|2 CLOSED; onopen(Event), onmessage(MessageEvent), onerror(Event); addEventListener(type, listener, options?); removeEventListener(type, listener, options?); close():void. SSE headers: Content-Type:text/event-stream; charset=utf-8, Cache-Control:no-cache, Connection:keep-alive. Stream syntax: lines with id:<id>, event:<name>, data:<payload> (multi-line), retry:<ms>, blocks separated by blank line. Use Last-Event-ID header on reconnect. Heartbeat comments prefixed ':' every ~15s. Node.js server: res.writeHead(...), send " : ping\n\n" then setInterval -> res.write(`id:...\n`); res.write('event:...\n'); res.write('data:...\n\n'); handle req.close. Client: new EventSource('/url',{withCredentials:true}), handlers, close() on unload. Default retry 3000ms or override via retry field.

## Sanitised Extract
Table of Contents:
1 EventSource Interface
2 SSE Protocol Format
3 Browser Client Usage
4 Server Implementation Steps

1 EventSource Interface
Constructor: EventSource(url:string, eventSourceInit?:{withCredentials?:boolean}) => EventSource
Properties:
 - url: string
 - readyState: 0|1|2
 - withCredentials: boolean (default false)
 - onopen, onmessage, onerror: event handlers
Methods:
 - addEventListener(type:string, listener, options?)
 - removeEventListener(type:string, listener, options?)
 - dispatchEvent(event:Event)
 - close():void
Constants: CONNECTING=0, OPEN=1, CLOSED=2

2 SSE Protocol Format
Response Headers:
 - Content-Type: text/event-stream; charset=utf-8
 - Cache-Control: no-cache
 - Connection: keep-alive
Message block fields:
 - id: string|number
 - event: string
 - data: string (one or multiple lines)
 - retry: milliseconds
Terminate each block with an empty newline
Use ':' prefix for comment/heartbeat lines

3 Browser Client Usage
'''
const es = new EventSource('/stream', { withCredentials: true });
es.onopen = () => console.log('connected');
es.onmessage = e => console.log('msg', e.data);
es.onerror = e => console.error('err', e);
// close when done
es.close();
'''

4 Server Implementation Steps (Node.js)
1. Create HTTP server
2. On client request, write headers:
   Content-Type: text/event-stream; charset=utf-8
   Cache-Control: no-cache
   Connection: keep-alive
3. Use setInterval or event hooks to write:
   res.write('id: ${id}'n');
   res.write('event: <name>'n');
   res.write('data: <payload>'n'n');
4. flush or ensure corked streams are sent immediately
5. Handle Last-Event-ID header for resume
6. On client close/error, clear intervals

## Original Source
Server-Sent Events (SSE)
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## Digest of SERVER_SENT_EVENTS

# Server-Sent Events (SSE)

## EventSource Interface

Constructor
```
EventSource(url: string, eventSourceInit?: { withCredentials?: boolean })
```

Constants
```
EventSource.CONNECTING = 0
EventSource.OPEN       = 1
EventSource.CLOSED     = 2
```

Properties
```
readonly url: string
readonly readyState: number  // one of CONNECTING, OPEN, CLOSED
withCredentials: boolean    // default false
onopen:    (this: EventSource, ev: Event)        => any
onmessage: (this: EventSource, ev: MessageEvent) => any
onerror:   (this: EventSource, ev: Event)        => any
```

Methods
```
addEventListener(type: string, listener: (ev: any) => any, options?: boolean | AddEventListenerOptions): void
removeEventListener(type: string, listener: (ev: any) => any, options?: boolean | EventListenerOptions): void
dispatchEvent(event: Event): boolean
close(): void
```

## SSE Stream Format

Response Headers
```
Content-Type: text/event-stream; charset=utf-8
Cache-Control: no-cache
Connection: keep-alive
```

Event Fields per message block
```
id: <string|number>
event: <string>
data: <string>    // may appear multiple times; concatenated with "\n"
retry: <milliseconds>  // sets reconnection delay override
```
Each message block is terminated by a blank line.

## PHP Example

```php
// send headers
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

// send one message
echo 'id: 1\n';
echo 'event: message\n';
echo 'data: ping\n\n';

// flush to client
flush();
```

## Attribution
- Source: Server-Sent Events (SSE)
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- License: License: CC BY-SA 2.5
- Crawl Date: 2025-05-14T18:28:34.745Z
- Data Size: 2228806 bytes
- Links Found: 25717

## Retrieved
2025-05-14
