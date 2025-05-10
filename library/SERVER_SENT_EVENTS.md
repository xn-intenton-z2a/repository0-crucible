# SERVER_SENT_EVENTS

## Crawl Summary
EventSource(url:string, options?){withCredentials?} readyState values 0 opening 1 open 2 closed. onmessage handler receives MessageEvent with data. addEventListener custom names. onerror receives Event. close terminates. HTTP/1.1 per-domain connection limit 6. HTTP/2 streams negotiated default 100. Server must respond with text/event-stream, no-cache, disable buffering. Messages: blocks of field lines ending with two newlines. Fields: event(string), data(string with concatenated lines), id(string), retry(integer ms). Comments start with colon. UTF-8 encoding.

## Normalised Extract
Table of Contents:
1 Creating EventSource Instance
2 Configuring Cross-Origin Connections
3 Handling Incoming Messages
4 Custom Event Handling
5 Error Events and Reconnection Control
6 Closing Connections
7 Server Response Requirements
8 Event Stream Field Semantics
9 Message Separation and Encoding
10 Transactional PHP Implementation

1 Creating EventSource Instance
Constructor signature: EventSource(url:string, options?:{withCredentials:boolean}). Default withCredentials false.

2 Configuring Cross-Origin Connections
Include options object with withCredentials true to send cookies and HTTP credentials on cross-origin streams.

3 Handling Incoming Messages
evtSource.onmessage = (event:MessageEvent) => { event.data contains text or JSON string from data field }.

4 Custom Event Handling
Use evtSource.addEventListener('eventName', (event:MessageEvent)=>{}). Parse JSON via JSON.parse(event.data).

5 Error Events and Reconnection Control
evtSource.onerror fires on network or access errors. EventSource automatically reconnects using retry field values. Default retry 3000ms if none provided.

6 Closing Connections
Invoke evtSource.close() to stop stream and prevent automatic reconnection.

7 Server Response Requirements
Send headers: Content-Type: text/event-stream; Cache-Control: no-cache; X-Accel-Buffering: no. Ensure no output buffering.

8 Event Stream Field Semantics
Lines: fieldName: value. Messages separated by blank line. Recognized fields: event, data, id, retry. Ignore others. Colon at start indicates comment.

9 Message Separation and Encoding
Use UTF-8. Each message ends with two \n. For multi-line data use multiple data: lines. Trailing newline stripped.

10 Transactional PHP Implementation
Use while(true): echo event and data lines, flush output, check connection_aborted(), sleep(1). Use ob_end_flush and flush to push immediately.


## Supplementary Details
Parameter Defaults and Effects:
withCredentials false means no cookies sent. Set true for credentialed streams.
retry: integer ms controls reconnection delay. If absent defaults to 3000.
readyState: 0 CONNECTING, 1 OPEN, 2 CLOSED.

Implementation Steps:
1 Set server script headers.
2 Generate event blocks: echo 'event: name', 'data: value', blank line.
3 Flush buffers and disable PHP output buffering.
4 On client attach handlers and manage state via readyState or onopen.
5 Use retry field in stream to control reconnection timing.

Core Configuration Options:
Cache-Control no-cache prevents caching intermediaries.
X-Accel-Buffering no disables nginx buffering.

Best Practices:
Send comment lines every 20s to keep HTTP/1.1 connections alive.
Use JSON payloads in data fields for structured messages.
Check evtSource.readyState before appending UI elements.

Troubleshooting Procedures:
Command: curl -v -N http://host/sse-demo.php
Expected: HTTP/1.1 200 OK, Content-Type text/event-stream, then lines starting with colon or data/event. No buffering delays.
Inspect browser devtools Network tab: should show streaming Transfer-Encoding chunked.
Use evtSource.onerror logging to capture parsing or network errors.

## Reference Details
EventSource API:
constructor(url:string, options?:{withCredentials:boolean})
Properties:
 readyState:number 0 CONNECTING 1 OPEN 2 CLOSED
 url:string
 withCredentials:boolean
 lastEventId:string

Methods:
 addEventListener(type:string, listener:(event:MessageEvent)=>void, options?:boolean|AddEventListenerOptions):void
 removeEventListener(type:string, listener:(event:MessageEvent)=>void, options?:boolean|EventListenerOptions):void
 close():void

Event Handlers:
 onopen:(event:Event)=>void
 onmessage:(event:MessageEvent)=>void
 onerror:(event:Event)=>void

Server-Side Stream Format:
Field lines: "fieldName: value"\n. Blank line marks end of message. Supported fields:
 event:string dispatches custom event with that type
 data:string supports multiple lines prefixed by data: concatenated with \n
 id:string sets lastEventId for reconnection headers
 retry:integer sets reconnection delay in ms if connection lost

PHP Example Full Implementation:
 date_default_timezone_set('America/New_York')
 header('X-Accel-Buffering: no')
 header('Content-Type: text/event-stream')
 header('Cache-Control: no-cache')
 $counter=rand(1,10)
 while(true){
   echo 'event: ping\n';
   $time=date(DATE_ISO8601);
   echo 'data: {"time":"'.$time.'"}\n\n';
   if(--$counter==0){ echo 'data: interval message '.$time.'\n\n'; $counter=rand(1,10);} 
   if(ob_get_contents()) ob_end_flush(); flush(); if(connection_aborted()) break; sleep(1);
 }

Best Practices Code Snippets:
// client side
const src=new EventSource('/stream', {withCredentials:true});
src.onopen=e=>console.log('open');
src.onmessage=e=>console.log('msg',e.data);
src.onerror=e=>console.error('err',e);
// server side keep-alive comment
echo ': keep alive\n\n'; flush();

Troubleshooting:
Command: curl -v -N http://localhost/sse-demo.php
Expected sequence: HTTP headers, then colon comment, event/data blocks without delay beyond sleep intervals.
Use browser F12 network tab to verify Transfer-Encoding chunked and streaming behavior.

## Information Dense Extract
EventSource(url:string,options?{withCredentials:boolean}) readyState 0|1|2 onopen(Event), onmessage(MessageEvent.data:string), onerror(Event), close() auto-reconnect retry field ms default 3000. addEventListener(type:string, listener). Stream: UTF-8, lines field:value, blank line ends message. Fields event:string, data:string (multi-line), id:string, retry:int(ms). Comments colon. Server must send headers Content-Type:text/event-stream,Cache-Control:no-cache,X-Accel-Buffering:no. PHP pattern: while(true){echo lines; flush; if(connection_aborted())break; sleep(1)}. HTTP/1.1 per-domain limit6, HTTP/2 streams default100.

## Sanitised Extract
Table of Contents:
1 Creating EventSource Instance
2 Configuring Cross-Origin Connections
3 Handling Incoming Messages
4 Custom Event Handling
5 Error Events and Reconnection Control
6 Closing Connections
7 Server Response Requirements
8 Event Stream Field Semantics
9 Message Separation and Encoding
10 Transactional PHP Implementation

1 Creating EventSource Instance
Constructor signature: EventSource(url:string, options?:{withCredentials:boolean}). Default withCredentials false.

2 Configuring Cross-Origin Connections
Include options object with withCredentials true to send cookies and HTTP credentials on cross-origin streams.

3 Handling Incoming Messages
evtSource.onmessage = (event:MessageEvent) => { event.data contains text or JSON string from data field }.

4 Custom Event Handling
Use evtSource.addEventListener('eventName', (event:MessageEvent)=>{}). Parse JSON via JSON.parse(event.data).

5 Error Events and Reconnection Control
evtSource.onerror fires on network or access errors. EventSource automatically reconnects using retry field values. Default retry 3000ms if none provided.

6 Closing Connections
Invoke evtSource.close() to stop stream and prevent automatic reconnection.

7 Server Response Requirements
Send headers: Content-Type: text/event-stream; Cache-Control: no-cache; X-Accel-Buffering: no. Ensure no output buffering.

8 Event Stream Field Semantics
Lines: fieldName: value. Messages separated by blank line. Recognized fields: event, data, id, retry. Ignore others. Colon at start indicates comment.

9 Message Separation and Encoding
Use UTF-8. Each message ends with two 'n. For multi-line data use multiple data: lines. Trailing newline stripped.

10 Transactional PHP Implementation
Use while(true): echo event and data lines, flush output, check connection_aborted(), sleep(1). Use ob_end_flush and flush to push immediately.

## Original Source
Server-Sent Events (SSE)
https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events

## Digest of SERVER_SENT_EVENTS

# Creating an EventSource Instance

Date Retrieved: 2024-06-01
Data Size: 3,214,461 bytes
Links Found: 32,620

## EventSource Constructor Signature

```js
const evtSource = new EventSource(url: string, options?: { withCredentials: boolean });
readyState: 0 | 1 | 2
url: string
withCredentials: boolean (default false)
lastEventId: string
```

# Listening for Incoming Events

## onmessage Handler

```js
evtSource.onmessage = function(event: MessageEvent) {
  // event.data: string
};
```

## addEventListener Method

```js
evtSource.addEventListener(type: string, listener: (event: MessageEvent) => void, options?: boolean|AddEventListenerOptions): void;
```  
Recognized event types: message (default), custom names (e.g. ping), error.

# Error Handling and Connection Lifecycle

## onerror Handler

```js
evtSource.onerror = function(error: Event): void {
  // handle error
};
```

## close Method

```js
evtSource.close(): void;
```  
Terminates connection and stops reconnection attempts.

# Server Implementation Requirements

## Response Headers

- Content-Type: text/event-stream
- Cache-Control: no-cache
- X-Accel-Buffering: no (nginx only)

## Stream Format

- UTF-8 encoding
- Messages separated by two newline characters
- Lines beginning with colon are comments

## Field Definitions

- event: string
- data: string (concatenated with newline for multiple lines)
- id: string
- retry: integer (reconnection delay in milliseconds)

# PHP Example Implementation

```php
date_default_timezone_set('America/New_York');
header('X-Accel-Buffering: no');
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$counter = rand(1,10);
while (true) {
  echo 'event: ping
';
  $time = date(DATE_ISO8601);
  echo "data: {\"time\": \"{$time}\"}\n\n";

  $counter--;
  if ($counter === 0) {
    echo "data: Simple message at {$time}\n\n";
    $counter = rand(1,10);
  }

  if (ob_get_contents()) ob_end_flush();
  flush();
  if (connection_aborted()) break;
  sleep(1);
}
```


## Attribution
- Source: Server-Sent Events (SSE)
- URL: https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events
- License: License: CC BY-SA 2.5
- Crawl Date: 2025-05-10T11:31:03.972Z
- Data Size: 3214461 bytes
- Links Found: 32620

## Retrieved
2025-05-10
