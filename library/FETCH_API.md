# FETCH_API

## Crawl Summary
Signature: fetch(input: RequestInfo, init?: RequestInit): Promise<Response> returns header-ready Response including errors. RequestInit options: method(string, default GET), headers(HeadersInit), body(BodyInit|null), mode(cors/no-cors/same-origin/navigate default cors), credentials(omit/same-origin/include default same-origin), cache(default/no-store/reload/no-cache/force-cache/only-if-cached default default), redirect(follow/error/manual default follow), referrer(string default about:client), referrerPolicy(no-referrer/no-referrer-when-downgrade/origin/origin-when-cross-origin/unsafe-url default no-referrer-when-downgrade), integrity(string), keepalive(boolean default false), signal(AbortSignal). Request, Response, Headers, Body mixin full method lists. Service worker respondWith(fetch(request)).

## Normalised Extract
Table of Contents
1. fetch() signature and behavior
2. RequestInit options
3. Request constructor
4. Response constructor and Body methods
5. Headers interface
6. Service Worker usage

1. fetch() signature and behavior
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
  - Returns Promise resolving to Response when headers arrive
  - Does not reject on HTTP error status; use response.ok to detect success

2. RequestInit options
  method: string (default GET)
  headers: HeadersInit (Records, arrays, or Headers)
  body: BodyInit|null (string, Blob, BufferSource, FormData, URLSearchParams, ReadableStream)
  mode: cors|no-cors|same-origin|navigate (default cors)
  credentials: omit|same-origin|include (default same-origin)
  cache: default|no-store|reload|no-cache|force-cache|only-if-cached (default default)
  redirect: follow|error|manual (default follow)
  referrer: string (default about:client)
  referrerPolicy: no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|unsafe-url (default no-referrer-when-downgrade)
  integrity: string
  keepalive: boolean (default false)
  signal: AbortSignal

3. Request constructor
  new Request(input: RequestInfo, init?: RequestInit)
  Properties: method, headers, url, mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal
  Clone: request.clone()

4. Response constructor and Body methods
  new Response(body?: BodyInit|null, init?: ResponseInit)
  ResponseInit: status:number(default200), statusText:string(default "OK"), headers:HeadersInit
  Properties: status, statusText, ok, redirected, type, url, bodyUsed
  Body methods: arrayBuffer(), blob(), formData(), json(), text()
  Body property: body: ReadableStream|null

5. Headers interface
  new Headers(init?: HeadersInit)
  HeadersInit: Headers|string[][]|Record<string,string>
  Methods: append(name,value), delete(name), get(name), getAll(name), has(name), set(name,value), forEach(callback)

6. Service Worker usage
  In service worker file:
    self.addEventListener('fetch', event => {
      event.respondWith(fetch(event.request));
    });

## Supplementary Details
AbortController integration: const controller=new AbortController(); fetch(url,{signal:controller.signal}); controller.abort() cancels request.  CORS effect: mode:'cors' sends Origin header; no-cors restricts methods to GET, POST, HEAD and opaque response.  Credentials effect: include sends cookies, omit never sends, same-origin for same-site.  Cache modes: reload bypasses cache, force-cache uses cache even if stale, only-if-cached returns cached or error.  Redirect behavior: manual preserves redirect in response.type 'opaqueredirect'; error rejects if unsafe.  Keepalive true allows request outside unload.  Integrity enforces SRI checks; mismatch rejects the request.  Default referrer 'about:client' uses document URL, override to empty string for no-referrer.  Body manual stream consumption: assign response.body to ReadableStream and pipe to other streams.

## Reference Details
// Simple GET
fetch('https://api.example.com/data',{
  method:'GET',
  headers:{'Accept':'application/json'},
  credentials:'include',
  cache:'no-cache'
})
.then(response=>{
  if(!response.ok) throw new Error('HTTP '+response.status);
  return response.json();
})
.then(data=>console.log(data))
.catch(err=>console.error('Fetch error:',err));

// POST with JSON
const payload={name:'Alice', age:30};
fetch('/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
.then(r=>r.text())
.then(text=>console.log(text));

// Abort example
const ctrl=new AbortController();
fetch('/long', {signal:ctrl.signal})
.catch(err=>{ if(err.name==='AbortError') console.log('Aborted'); });
// later
ctrl.abort();

// Service Worker fetch event
self.addEventListener('fetch', event=>{
  event.respondWith(
    fetch(event.request, {mode:'no-cors'})
      .then(res=>res)
      .catch(()=>new Response('Offline', {status:503, statusText:'Service Unavailable'}))
  );
});

// Best practice: set timeout
function fetchWithTimeout(url,options,timeout=5000){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeout);
  return fetch(url,{...options,signal:controller.signal})
    .finally(()=>clearTimeout(timer));
}

// Troubleshoot
// Inspect headers via curl equivalent
// curl -i 'https://api.example.com/data'
// Expected: HTTP/1.1 200 OK\nContent-Type: application/json\n...

## Information Dense Extract
fetch(input: RequestInfo, init?: RequestInit): Promise<Response> | RequestInit{method:string=GET,headers:HeadersInit,body:BodyInit|null,mode:'cors'=cors,credentials:'same-origin'=same-origin,cache:'default'=default,redirect:'follow'=follow,referrer:'about:client'=about:client,referrerPolicy:'no-referrer-when-downgrade'=no-referrer-when-downgrade,integrity:string,keepalive:boolean=false,signal:AbortSignal} | Request: new Request(input,init) {method,headers,url,mode,credentials,cache,redirect,referrer,referrerPolicy,integrity,keepalive,signal,clone()} | Response: new Response(body?,{status:number=200,statusText:'OK',headers:HeadersInit}) {status,statusText,ok,redirected,type,url,bodyUsed,arrayBuffer(),blob(),formData(),json(),text(),body} | Headers: new Headers(init?:HeadersInit) {append(name,value),delete(name),get(name),getAll(name),has(name),set(name,value),forEach()} | Usage patterns: GET, POST JSON, AbortController, timeout wrapper, Service Worker fetch; handle response.ok; configure CORS, credentials, cache, redirect, integrity and keepalive.

## Sanitised Extract
Table of Contents
1. fetch() signature and behavior
2. RequestInit options
3. Request constructor
4. Response constructor and Body methods
5. Headers interface
6. Service Worker usage

1. fetch() signature and behavior
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
  - Returns Promise resolving to Response when headers arrive
  - Does not reject on HTTP error status; use response.ok to detect success

2. RequestInit options
  method: string (default GET)
  headers: HeadersInit (Records, arrays, or Headers)
  body: BodyInit|null (string, Blob, BufferSource, FormData, URLSearchParams, ReadableStream)
  mode: cors|no-cors|same-origin|navigate (default cors)
  credentials: omit|same-origin|include (default same-origin)
  cache: default|no-store|reload|no-cache|force-cache|only-if-cached (default default)
  redirect: follow|error|manual (default follow)
  referrer: string (default about:client)
  referrerPolicy: no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|unsafe-url (default no-referrer-when-downgrade)
  integrity: string
  keepalive: boolean (default false)
  signal: AbortSignal

3. Request constructor
  new Request(input: RequestInfo, init?: RequestInit)
  Properties: method, headers, url, mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal
  Clone: request.clone()

4. Response constructor and Body methods
  new Response(body?: BodyInit|null, init?: ResponseInit)
  ResponseInit: status:number(default200), statusText:string(default 'OK'), headers:HeadersInit
  Properties: status, statusText, ok, redirected, type, url, bodyUsed
  Body methods: arrayBuffer(), blob(), formData(), json(), text()
  Body property: body: ReadableStream|null

5. Headers interface
  new Headers(init?: HeadersInit)
  HeadersInit: Headers|string[][]|Record<string,string>
  Methods: append(name,value), delete(name), get(name), getAll(name), has(name), set(name,value), forEach(callback)

6. Service Worker usage
  In service worker file:
    self.addEventListener('fetch', event => {
      event.respondWith(fetch(event.request));
    });

## Original Source
Node.js & Web Platform APIs
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## Digest of FETCH_API

# Fetch API

Data Size: 2261980 bytes  
Retrieved: 2024-06-15  
Source: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

# fetch()
Signature: fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
Returns a Promise resolving to a Response once headers are received, regardless of HTTP status code.

# RequestInit
Interface RequestInit {
  method?: string            // HTTP method, default: "GET"
  headers?: HeadersInit      // Headers object, array or record
  body?: BodyInit | null     // Request payload: string, Blob, BufferSource, FormData, URLSearchParams, ReadableStream
  mode?: "cors"|"no-cors"|"same-origin"|"navigate"  // default: "cors"
  credentials?: "omit"|"same-origin"|"include"      // default: "same-origin"
  cache?: "default"|"no-store"|"reload"|"no-cache"|"force-cache"|"only-if-cached"  // default: "default"
  redirect?: "follow"|"error"|"manual"               // default: "follow"
  referrer?: string          // default: "about:client"
  referrerPolicy?: "no-referrer"|"no-referrer-when-downgrade"|"origin"|"origin-when-cross-origin"|"unsafe-url"  // default: "no-referrer-when-downgrade"
  integrity?: string         // subresource integrity value
  keepalive?: boolean        // default: false
  signal?: AbortSignal       // abort controller signal
}

# Request
Signature: new Request(input: RequestInfo, init?: RequestInit)
Properties:
  method      // as in RequestInit
  headers     // Headers instance
  url         // normalized URL string
  mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal
Methods:
  clone(): Request      // deep clone usable for multiple consumers

# Response
Signature: new Response(body?: BodyInit|null, init?: ResponseInit)
Interface ResponseInit {
  status?: number           // HTTP status code, default: 200
  statusText?: string       // default: "OK"
  headers?: HeadersInit     // response headers
}
Properties:
  status, statusText, ok (boolean status>=200&&status<300), redirected, type, url, bodyUsed
Methods from Body mixin:
  arrayBuffer(): Promise<ArrayBuffer>
  blob(): Promise<Blob>
  formData(): Promise<FormData>
  json(): Promise<any>
  text(): Promise<string>
  readonly body: ReadableStream|null

# Headers
Signature: new Headers(init?: HeadersInit)
Type HeadersInit = Headers | string[][] | Record<string,string>
Methods:
  append(name: string, value: string): void
  delete(name: string): void
  get(name: string): string|null
  getAll(name: string): string[]
  has(name: string): boolean
  set(name: string, value: string): void
  forEach(callback: (value:string,name:string,headers:Headers)=>void): void

# Body
Mixin on Request and Response
Properties:
  bodyUsed: boolean
Methods:
  arrayBuffer(): Promise<ArrayBuffer>
  blob(): Promise<Blob>
  formData(): Promise<FormData>
  json(): Promise<any>
  text(): Promise<string>

# Service Worker Integration
In FetchEvent handler:
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});

## Attribution
- Source: Node.js & Web Platform APIs
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- License: License if known
- Crawl Date: 2025-04-28T18:52:56.581Z
- Data Size: 2261980 bytes
- Links Found: 23802

## Retrieved
2025-04-28
