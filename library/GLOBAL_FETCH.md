# GLOBAL_FETCH

## Crawl Summary
fetch(input: string|Request, init?: RequestInit): Promise<Response>  Supports streaming bodies (duplex: "half"), JSON/text/blob/formData parsing, and cancellation via AbortController. RequestInit properties: method, headers, body, signal, duplex. Response properties: status, statusText, headers, ok, redirected, type, body. Body mixin methods: arrayBuffer, blob, formData, json, text. Headers API: construct, append, delete, get, has, set, forEach.

## Normalised Extract
Table of Contents:
1. fetch function
2. Request class
3. Response class
4. Headers class
5. Body mixin APIs
6. AbortSignal cancellation

1. fetch function
Signature: fetch(input: string|URL|Request, init?: { method: string; headers: HeadersInit; body: BodyInit|null; signal: AbortSignal; duplex?: "half" }): Promise<Response>

2. Request class
Constructor: new Request(input: string|URL|Request, init?: RequestInit)
Properties: method, headers, body, signal, duplex; Methods: clone(): Request

3. Response class
Constructor: new Response(body?: BodyInit|null, init?: ResponseInit)
Properties: status:number, statusText:string, headers:Headers, ok:boolean, redirected:boolean, type:string; Methods: clone(), arrayBuffer(), blob(), formData(), json(), text()

4. Headers class
Constructor: new Headers(init?: HeadersInit)
Methods: append(name:string,value:string), delete(name:string), get(name:string):string|null, has(name:string):boolean, set(name:string,value:string), forEach(callback)

5. Body mixin APIs
bodyUsed:boolean; body: ReadableStream; arrayBuffer():Promise<ArrayBuffer>; blob():Promise<Blob>; formData():Promise<FormData>; json():Promise<any>; text():Promise<string>

6. AbortSignal cancellation
Use AbortController: const c=new AbortController(); pass c.signal in fetch; c.abort(reason); check signal.aborted and signal.reason.


## Supplementary Details
Supported Node.js versions: v18.0.0+ (no flags required). Legacy support: v17+, behind --experimental-fetch. RequestInit.duplex must be "half" for streaming request bodies. Default redirect: 'follow'. Default mode: 'cors'. Default credentials: 'same-origin'. Default cache: 'default'. Default referrer: 'client'. Error handling: network failures throw TypeError, HTTP errors do not throw. Keep-alive: automatic. Max redirects: 20.

## Reference Details
fetch API:
  fetch(input: string|URL|Request, init?: RequestInit): Promise<Response>
  type RequestInit = {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit|null;
    signal?: AbortSignal;
    duplex?: "half";
  }
  type ResponseInit = {
    status?: number;
    statusText?: string;
    headers?: HeadersInit;
  }

Request class:
  constructor(input: string|URL|Request, init?: RequestInit)
  properties: method:string; headers:Headers; body:ReadableStream|null; signal:AbortSignal; duplex?:"half"; clone():Request

Response class:
  constructor(body?:BodyInit|null, init?:ResponseInit)
  static error():Response
  static redirect(url:string,status?: number):Response
  properties: status:number; statusText:string; headers:Headers; ok:boolean; redirected:boolean; type:"basic"|"cors"|"default"|"error"|"opaque"|"opaqueredirect"; body:ReadableStream|null; clone():Response
  methods: arrayBuffer():Promise<ArrayBuffer>; blob():Promise<Blob>; formData():Promise<FormData>; json():Promise<any>; text():Promise<string>

Headers API:
  constructor(init?: HeadersInit)
  append(name:string,value:string):void
  delete(name:string):void
  get(name:string):string|null
  has(name:string):boolean
  set(name:string,value:string):void
  forEach(callback:(value:string,name:string,headers:Headers)=>void):void

Implementation example:
  import {AbortController} from 'node:abort_controller';
  const controller=new AbortController();
  try {
    const res=await fetch('https://api.example.com/data',{
      method:'POST',
      headers:new Headers({'Content-Type':'application/json'}),
      body:JSON.stringify({key:'value'}),
      signal:controller.signal,
      duplex:'half'
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data=await res.json();
  } catch(e) {
    if (controller.signal.aborted) console.error('Request aborted', controller.signal.reason);
    else console.error('Fetch error', e);
  }

Troubleshooting:
  Command: node --trace-warnings yourScript.js  to trace experimental fetch warnings.
  Network error: TypeError: network request failed. Use dns.lookup to verify DNS resolution.
  To enable streaming uploads, set duplex:'half' or omit for non-streaming.


## Information Dense Extract
fetch(input:string|URL|Request,init?:{method?:string;headers?:HeadersInit;body?:BodyInit|null;signal?:AbortSignal;duplex?:"half";}):Promise<Response>; RequestInit.defaults: method='GET',headers={},body=null,redirect='follow',credentials='same-origin',cache='default',mode='cors',referrer='client'; Request: constructor(input,init), props(method,headers,body,signal,duplex), clone(); Response: constructor(body,init), static error(),static redirect(), props(status,statusText,headers,ok,redirected,type,body), methods(clone,arrayBuffer,blob,formData,json,text); Headers: constructor(init), append,delete,get,has,set,forEach; Body mixin: bodyUsed:boolean, methods(arrayBuffer,blob,formData,json,text); AbortController: signal for cancellation; Node.js v18+ no flags; v17 behind --experimental-fetch; streaming: duplex='half'; errors: network->TypeError, HTTP->no throw.

## Sanitised Extract
Table of Contents:
1. fetch function
2. Request class
3. Response class
4. Headers class
5. Body mixin APIs
6. AbortSignal cancellation

1. fetch function
Signature: fetch(input: string|URL|Request, init?: { method: string; headers: HeadersInit; body: BodyInit|null; signal: AbortSignal; duplex?: 'half' }): Promise<Response>

2. Request class
Constructor: new Request(input: string|URL|Request, init?: RequestInit)
Properties: method, headers, body, signal, duplex; Methods: clone(): Request

3. Response class
Constructor: new Response(body?: BodyInit|null, init?: ResponseInit)
Properties: status:number, statusText:string, headers:Headers, ok:boolean, redirected:boolean, type:string; Methods: clone(), arrayBuffer(), blob(), formData(), json(), text()

4. Headers class
Constructor: new Headers(init?: HeadersInit)
Methods: append(name:string,value:string), delete(name:string), get(name:string):string|null, has(name:string):boolean, set(name:string,value:string), forEach(callback)

5. Body mixin APIs
bodyUsed:boolean; body: ReadableStream; arrayBuffer():Promise<ArrayBuffer>; blob():Promise<Blob>; formData():Promise<FormData>; json():Promise<any>; text():Promise<string>

6. AbortSignal cancellation
Use AbortController: const c=new AbortController(); pass c.signal in fetch; c.abort(reason); check signal.aborted and signal.reason.

## Original Source
Node.js Global Fetch API
https://nodejs.org/api/globals.html#fetch

## Digest of GLOBAL_FETCH

# Global Fetch API

## fetch(input, init)

Signature:

    fetch(input: string | Request, init?: RequestInit): Promise<Response>

Parameters:

    input       string | URL | Request  Resource URL or Request object
    init        RequestInit (optional)    { method, headers, body, signal, duplex }

Returns:

    Promise<Response>

Description:

    Performs HTTP(S) requests, following the WHATWG Fetch standard. Supports streaming bodies and cancellation via AbortSignal.

## Request

### constructor Request(input, init)

    new Request(input: string | URL | Request, init?: RequestInit)

Properties:

    Request.method      string    HTTP method
    Request.headers     Headers   Request header list
    Request.body        ReadableStream<Uint8Array> | null
    Request.signal      AbortSignal
    Request.duplex      "half" | undefined  Required for streaming uploads
    Request.clone(): Request

## Response

### constructor Response(body?, init)

    new Response(body?: BodyInit | null, init?: ResponseInit)

Properties:

    Response.status          number
    Response.statusText      string
    Response.headers         Headers
    Response.ok              boolean (status in 200–299)
    Response.redirected      boolean
    Response.type            "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect"

Methods:

    Response.clone(): Response
    Response.arrayBuffer(): Promise<ArrayBuffer>
    Response.blob(): Promise<Blob>
    Response.json(): Promise<any>
    Response.text(): Promise<string>
    Response.formData(): Promise<FormData>
    Response.body: ReadableStream<Uint8Array> | null

## Headers

### constructor Headers(init?)

    new Headers(): empty header list
    new Headers(record: Record<string,string>): header list
    new Headers(headers: Headers): copy

Methods:

    headers.append(name: string, value: string): void
    headers.delete(name: string): void
    headers.get(name: string): string | null
    headers.has(name: string): boolean
    headers.set(name: string, value: string): void
    headers.forEach(callback): void

## Body mixin

Properties:

    bodyUsed: boolean
    body: ReadableStream<Uint8Array> | null

Methods:

    arrayBuffer(): Promise<ArrayBuffer>
    blob(): Promise<Blob>
    formData(): Promise<FormData>
    json(): Promise<any>
    text(): Promise<string>

## AbortSignal cancellation

Properties:

    signal.aborted: boolean
    signal.reason: any

Usage:

    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
    controller.abort(reason)


## Attribution
- Source: Node.js Global Fetch API
- URL: https://nodejs.org/api/globals.html#fetch
- License: License
- Crawl Date: 2025-05-02T05:47:15.799Z
- Data Size: 3636206 bytes
- Links Found: 3047

## Retrieved
2025-05-02
