# FETCH_API

## Crawl Summary
Unified fetch across web platform. fetch(RequestInfo, RequestInit) returns Promise<Response>. RequestInit options: method, headers, body, mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal. AbortController controls cancellation. Response methods: clone, arrayBuffer, blob, formData, json, text. Headers API methods: append, delete, get, has, set, iteration. CORS safelist rules for methods and headers. Streaming via ReadableStream.

## Normalised Extract
Table of Contents
1 fetch API Signature
2 RequestInit Options
3 AbortController Usage
4 Response Methods and Properties
5 Headers Interface and Rules
6 Body Streaming

1 fetch API Signature
fetch(input: RequestInfo, init?: RequestInit) -> Promise<Response>

2 RequestInit Options
method: string default GET
headers: HeadersInit default empty
body: BodyInit default null
mode: same-origin|no-cors|cors|navigate|websocket default no-cors
credentials: omit|same-origin|include default same-origin
cache: default|no-store|reload|no-cache|force-cache|only-if-cached default default
redirect: follow|error|manual default follow
referrer: no-referrer|client|URL default client
referrerPolicy: no-referrer,no-referrer-when-downgrade,origin,origin-when-cross-origin,same-origin,strict-origin,strict-origin-when-cross-origin,unsafe-url default empty
integrity: string default empty
keepalive: boolean default false
signal: AbortSignal default null

3 AbortController Usage
Create: controller = new AbortController(), signal = controller.signal
Abort: controller.abort() sets state to aborted and rejects fetch with AbortError

4 Response Methods and Properties
clone() -> Response
arrayBuffer() -> Promise<ArrayBuffer>
blob() -> Promise<Blob>
formData() -> Promise<FormData>
json() -> Promise<any>
text() -> Promise<string>
Properties: type, url, redirected, status, ok, statusText, headers, bodyUsed, body

5 Headers Interface and Rules
Constructor: new Headers(entries)
append(name, value)
delete(name)
get(name) -> string|null
has(name) -> boolean
set(name, value)
iterate: entries(), keys(), values(), forEach, Symbol.iterator
Rules: names stored lowercased, duplicates combined, forbidden request headers list, CORS-safelisted methods/headers

6 Body Streaming
reader = response.body.getReader()
read loop: reader.read().then(({done,value}) => ...)
full read: response.text(), response.json(), etc.

## Supplementary Details
Request modes impact redirect and CORS behavior: same-origin enforces origin match; cors triggers preflight if needed; no-cors restricts methods to GET,HEAD,POST and safelisted headers; navigate for document navigation; websocket for ws connection. Cache modes: default inspects HTTP cache, no-store bypasses cache, reload bypass request cache, no-cache conditional, force-cache any cached, only-if-cached same-origin only. Credentials modes: omit removes credentials, same-origin includes only same-origin, include always include. Redirect modes: follow auto-redirect, error rejects on redirect, manual returns opaque-redirect for service workers. ReferrerPolicy mapping defines header value transformation. Integrity checks subresource integrity string of form hash-algorithm-base64. keepalive allows outliving page unload. signal aborts network fetch. CORS-safelisted headers limited to Accept, Accept-Language, Content-Language, Content-Type with specific MIME essences. Forbidden headers include Accept-Encoding, Host, Origin, Referer, Set-Cookie, Transfer-Encoding.

## Reference Details
IDL Definitions:
interface WindowOrWorkerGlobalScope {
  Promise<Response> fetch(RequestInfo input, optional RequestInit init);
};
dictionary RequestInit {
  DOMString method = "GET";
  HeadersInit headers;
  BodyInit body;
  RequestMode mode = "no-cors";
  RequestCredentials credentials = "same-origin";
  RequestCache cache = "default";
  RequestRedirect redirect = "follow";
  USVString referrer = "client";
  ReferrerPolicy referrerPolicy = "";
  DOMString integrity = "";
  boolean keepalive = false;
  AbortSignal signal = null;
};

Example Usage:
```js
const controller = new AbortController();
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' }),
  mode: 'cors',
  credentials: 'include',
  cache: 'no-cache',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  integrity: 'sha256-AbCdEf123=',
  keepalive: true,
  signal: controller.signal
})
.then(response => {
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
})
.then(data => console.log(data))
.catch(err => console.error('Fetch error:', err));

// Abort example
setTimeout(() => controller.abort(), 5000);

Best Practices:
- Use AbortController for cancellable requests.
- Validate response.ok before processing.
- Use appropriate cache and credentials modes to avoid stale data and security issues.
- Use subresource integrity on cross-origin fetches.

Troubleshooting:
// Check CORS errors via preflight
curl -i -X OPTIONS 'https://api.example.com/data' \
  -H 'Origin: https://client.example' \
  -H 'Access-Control-Request-Method: POST'

Expected 204 No Content with Access-Control-Allow-Origin header.

// Inspect network timing
performance.getEntriesByType('resource').filter(e => e.name.includes('api.example'))


## Information Dense Extract
fetch(input,init)->Promise<Response>; init fields method default GET,headers,body,mode(no-cors),credentials(same-origin),cache(default),redirect(follow),referrer(client),referrerPolicy,integrity,keepalive(false),signal; AbortController.abort() triggers AbortError; Response.clone,arrayBuffer,blob,formData,json,text; Headers append,delete,get,has,set,iterate; requestMode effects, cacheMode semantics, credentialsMode behavior, redirectMode semantics; forbidden headers list and CORS safelist rules; use performance entries for timing.

## Sanitised Extract
Table of Contents
1 fetch API Signature
2 RequestInit Options
3 AbortController Usage
4 Response Methods and Properties
5 Headers Interface and Rules
6 Body Streaming

1 fetch API Signature
fetch(input: RequestInfo, init?: RequestInit) -> Promise<Response>

2 RequestInit Options
method: string default GET
headers: HeadersInit default empty
body: BodyInit default null
mode: same-origin|no-cors|cors|navigate|websocket default no-cors
credentials: omit|same-origin|include default same-origin
cache: default|no-store|reload|no-cache|force-cache|only-if-cached default default
redirect: follow|error|manual default follow
referrer: no-referrer|client|URL default client
referrerPolicy: no-referrer,no-referrer-when-downgrade,origin,origin-when-cross-origin,same-origin,strict-origin,strict-origin-when-cross-origin,unsafe-url default empty
integrity: string default empty
keepalive: boolean default false
signal: AbortSignal default null

3 AbortController Usage
Create: controller = new AbortController(), signal = controller.signal
Abort: controller.abort() sets state to aborted and rejects fetch with AbortError

4 Response Methods and Properties
clone() -> Response
arrayBuffer() -> Promise<ArrayBuffer>
blob() -> Promise<Blob>
formData() -> Promise<FormData>
json() -> Promise<any>
text() -> Promise<string>
Properties: type, url, redirected, status, ok, statusText, headers, bodyUsed, body

5 Headers Interface and Rules
Constructor: new Headers(entries)
append(name, value)
delete(name)
get(name) -> string|null
has(name) -> boolean
set(name, value)
iterate: entries(), keys(), values(), forEach, Symbol.iterator
Rules: names stored lowercased, duplicates combined, forbidden request headers list, CORS-safelisted methods/headers

6 Body Streaming
reader = response.body.getReader()
read loop: reader.read().then(({done,value}) => ...)
full read: response.text(), response.json(), etc.

## Original Source
Fetch Standard
https://fetch.spec.whatwg.org/

## Digest of FETCH_API

# Fetch API

## fetch()

Signature:
```webidl
[Exposed=Window]
Promise<Response> fetch(RequestInfo input, optional RequestInit init);
```

Parameters:
- input: Request or USVString URL
- init: RequestInit dictionary

Returns: Promise resolving to Response object or rejecting with TypeError or network error.

## RequestInit Dictionary

Fields and defaults:
- method (string): defaults to GET
- headers (HeadersInit): empty
- body (BodyInit or null): null
- mode ("same-origin", "no-cors", "cors", "navigate", "websocket"): "no-cors"
- credentials ("omit", "same-origin", "include"): "same-origin"
- cache ("default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"): "default"
- redirect ("follow", "error", "manual"): "follow"
- referrer (USVString or "no-referrer" or "client"): "client"
- referrerPolicy ("no-referrer", "no-referrer-when-downgrade", "origin", "origin-when-cross-origin", "same-origin", "strict-origin", "strict-origin-when-cross-origin", "unsafe-url"): ""
- integrity (string): ""
- keepalive (boolean): false
- signal (AbortSignal): null

## AbortController and AbortSignal

Create controller:
```js
const controller = new AbortController();
const signal = controller.signal;
```
Abort fetch:
```js
controller.abort();  // triggers fetch rejection with AbortError
```

## Response Interface

Methods:
- clone(): Response
- arrayBuffer(): Promise<ArrayBuffer>
- blob(): Promise<Blob>
- formData(): Promise<FormData>
- json(): Promise<any>
- text(): Promise<string>

Properties:
- type ("basic","cors","default","error","opaque","opaqueredirect")
- url (USVString)
- redirected (boolean)
- status (unsigned short)
- ok (boolean) // status in 200–299
- statusText (USVString)
- headers (Headers)
- bodyUsed (boolean)
- body (ReadableStream<Uint8Array> or null)

## Headers API

Construct:
```js
new Headers([[name, value], ...]);
```
Methods:
- append(name, value)
- delete(name)
- get(name): string or null
- getAll(name): string[] (nonstandard)
- has(name): boolean
- set(name, value)
- entries(), keys(), values(), forEach(callback)
- [Symbol.iterator]()

Rules:
- header names byte-lowercased for storage; original casing on output
- combine duplicates on get(name)
- forbidden request headers: Accept-Charset, Accept-Encoding, Cookie, Host, Origin, Referer, Set-Cookie, Transfer-Encoding, etc.
- CORS-safelisted methods: GET, HEAD, POST

## Body Streaming

Consume as stream:
```js
response.body.getReader().read().then(function process({ done, value }) { ... });
```

Consume fully:
```js
response.text().then(text => { ... });
```


## Attribution
- Source: Fetch Standard
- URL: https://fetch.spec.whatwg.org/
- License: WHATWG License
- Crawl Date: 2025-05-02T12:58:16.610Z
- Data Size: 10569720 bytes
- Links Found: 149699

## Retrieved
2025-05-02
