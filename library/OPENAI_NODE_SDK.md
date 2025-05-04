# OPENAI_NODE_SDK

## Crawl Summary
Installation commands; client constructor options with defaults (apiKey, maxRetries, timeout, fetch, httpAgent, dangerouslyAllowBrowser, azureADTokenProvider, apiVersion); primary APIs: responses.create, chat.completions.create, files.create with exact params and return types; SSE streaming usage; file upload input types; error classes mapping HTTP codes; retry defaults on connection, 408,409,429,>=500; timeout default 600000ms; access request_id via property or withResponse; auto-pagination methods; WebSocket realtime API; AzureOpenAI usage; advanced usage asResponse, withResponse; custom HTTP verbs; fetch shims; logging middleware via fetch override or DEBUG; HTTP agent config; semantic versioning notes; supported runtimes.

## Normalised Extract
Table of Contents
1 Installation
2 Client Configuration
3 Responses API
4 Chat Completions API
5 Streaming
6 File Uploads
7 Error Handling
8 Retries
9 Timeouts
10 Request IDs
11 Auto-pagination
12 Realtime API Beta
13 Azure OpenAI
14 Advanced Usage
15 Custom Requests
16 Fetch Client Shim
17 Logging and Middleware
18 HTTP(S) Agent
19 Semantic Versioning
20 Requirements

1 Installation
npm install openai
deno add jsr:@openai/openai
npx jsr add @openai/openai

2 Client Configuration
Constructor: new OpenAI(options)
options.apiKey?: string (default from env OPENAI_API_KEY)
options.maxRetries?: number (default 2)
options.timeout?: number ms (default 600000)
options.fetch?: function(url, init) => Promise<Response)
options.httpAgent?: Agent
options.dangerouslyAllowBrowser?: boolean (default false)
options.azureADTokenProvider?: BearerTokenProvider
options.apiVersion?: string

3 Responses API
client.responses.create(
  {model: string; instructions?: string; input?: string; stream?: boolean},
  {maxRetries?: number; timeout?: number; httpAgent?: Agent}
)
Returns Promise<{output_text: string; _request_id: string}> or AsyncIterable<ServerSentEvent>

4 Chat Completions API
client.chat.completions.create(
  {model: string; messages: {role: 'developer'|'user'|'assistant'; content: string}[]; stream?: boolean; temperature?: number; max_tokens?: number},
  RequestOptions
)
Returns Promise<ChatCompletionResponse> or AsyncIterable<ServerSentEvent>

5 Streaming
Use stream: true. Example: const stream = await client.responses.create({model, input, stream:true}); for await (const ev of stream) console.log(ev);

6 File Uploads
client.files.create({file: fs.ReadStream|File|Response|toFile(buffer,filename); purpose: 'fine-tune'});
Supports fs.createReadStream, File, fetch Response, toFile helper

7 Error Handling
Throws OpenAI.APIError subclasses
Properties: request_id, status, name, headers
Mapping: 400 BadRequestError, 401 AuthenticationError, 403 PermissionDeniedError, 404 NotFoundError, 422 UnprocessableEntityError, 429 RateLimitError, >=500 InternalServerError, network APIConnectionError

8 Retries
Default 2 retries for network errors, 408, 409, 429, >=500
Override via maxRetries in client or per request

9 Timeouts
Default 600000 ms
Throws APIConnectionTimeoutError
Retries twice by default
Override via timeout in client or per request

10 Request IDs
Access via response._request_id
Or withResponse(): const {data, request_id} = await client.responses.create(params).withResponse();

11 Auto-pagination
List methods return Page<T>
Use for await of client.fineTuning.jobs.list({limit}) or manual page.hasNextPage() and page.getNextPage()

12 Realtime API Beta
Use WebSocket:
const rt = new OpenAIRealtimeWebSocket({model})
rt.on('response.text.delta',(event)=>...)

13 Azure OpenAI
Use AzureOpenAI class:
new AzureOpenAI({azureADTokenProvider, apiVersion})
openai.chat.completions.create({model, messages})

14 Advanced Usage
.asResponse() returns raw Response
.withResponse() returns {data, response}

15 Custom Requests
client.post('/path',{body,query});
Allow undocumented params with @ts-expect-error

16 Fetch Client Shim
import 'openai/shims/web' for global fetch
import 'openai/shims/node' for node-fetch polyfill

17 Logging and Middleware
Pass fetch override in client options to intercept
Set DEBUG=true to auto log requests/responses

18 HTTP(S) Agent
Default connection pooling
Override via httpAgent in client or per request

19 Semantic Versioning
Follows SemVer; minor may include static-type breaking changes

20 Requirements
TypeScript>=4.5; Node.js>=18; Deno>=1.28.0; Bun>=1.0; Cloudflare Workers; Vercel Edge; Jest>=28+node; Nitro>=2.6; Browser support via dangerouslyAllowBrowser

## Supplementary Details
ClientOptions defaults: maxRetries=2; timeout=600000ms; dangerouslyAllowBrowser=false. SSE Streaming: uses EventSource protocol under the hood; each chunk decoded to ServerSentEvent objects with fields data:string, event?:string, id?:string. File uploads: toFile(buffer,filename) returns {path: string; name: string; data: Buffer} accepted by files.create. RequestOptions fields: maxRetries, timeout (ms), httpAgent. ChatCompletionResponse: { id:string; object:'chat.completion'; created:number; model:string; choices:Array<{index:number; message:{role:string; content:string}; finish_reason:string}>; usage:{prompt_tokens:number; completion_tokens:number; total_tokens:number}}. Page<T>: { data:T[]; hasNextPage():boolean; getNextPage():Promise<Page<T>> }. OpenAIRealtimeWebSocket: methods: constructor(options:{ model:string; url?: string }); on(event:'response.text.delta', callback:(event:{delta:string})=>void); on(event:'response.audio.delta', callback:(event:{delta:ArrayBuffer})=>void); close():void. AzureOpenAI differences: endpoints prefix with /openai/deployments/{model}/...; param names same. Raw response access: .asResponse(): Promise<Response>; .withResponse(): Promise<{data:any; response:Response}>. Custom HTTP verbs: client.get<T>(path:string, options:{query?:any; headers?:any}): Promise<T>.

## Reference Details
// Client class
interface OpenAIOptions {
  apiKey?: string;
  maxRetries?: number;
  timeout?: number;
  fetch?: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
  httpAgent?: Agent;
  dangerouslyAllowBrowser?: boolean;
  azureADTokenProvider?: BearerTokenProvider;
  apiVersion?: string;
}
class OpenAI {
  constructor(options?: OpenAIOptions);
  responses: {
    create(
      params: {
        model: string;
        instructions?: string;
        input?: string;
        stream?: boolean;
      },
      options?: { maxRetries?: number; timeout?: number; httpAgent?: Agent }
    ): Promise<{ output_text: string; _request_id: string }> | AsyncIterable<ServerSentEvent>;
  }
  chat: {
    completions: {
      create(
        params: {
          model: string;
          messages: { role: 'developer'|'user'|'assistant'; content: string }[];
          stream?: boolean;
          temperature?: number;
          max_tokens?: number;
        },
        options?: { maxRetries?: number; timeout?: number; httpAgent?: Agent }
      ): Promise<ChatCompletionResponse> | AsyncIterable<ServerSentEvent>;
    }
  }
  files: {
    create(
      params: {
        file: File|fs.ReadStream|Response|{ toFile: Function }|Buffer|Uint8Array;
        purpose: 'fine-tune'|'search'|'answers';
      },
      options?: { maxRetries?: number; timeout?: number; httpAgent?: Agent }
    ): Promise<{ id: string; object: string; bytes: number; created_at: number; filename: string; purpose: string; _request_id: string }>;
  }
  post<T>(path: string, options: { body?: any; query?: any; headers?: any }): Promise<T>;
}

// Error classes
namespace OpenAI {
  class APIError extends Error {
    request_id: string;
    status: number;
    name: string;
    headers: Record<string,string>;
  }
  class BadRequestError extends APIError {}
  class AuthenticationError extends APIError {}
  class PermissionDeniedError extends APIError {}
  class NotFoundError extends APIError {}
  class UnprocessableEntityError extends APIError {}
  class RateLimitError extends APIError {}
  class InternalServerError extends APIError {}
  class APIConnectionError extends Error {}
  class APIConnectionTimeoutError extends APIConnectionError {}
}

// Usage examples
toFile(buffer: Buffer|Uint8Array, filename: string): Promise<{blob: Blob; name: string}>;

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, maxRetries: 5, timeout: 20000, httpAgent: new HttpsProxyAgent(URL) });

// Text generation
const response = await client.responses.create({ model: 'gpt-4o', instructions: 'Pirate', input: 'Semicolons?' });
console.log(response.output_text);

// Chat completion
const completion = await client.chat.completions.create({ model: 'gpt-4o', messages: [{role:'user',content:'Hello'}], temperature:0.7, max_tokens:100 });
console.log(completion.choices[0].message.content);

// Streaming
for await (const ev of await client.chat.completions.create({ model: 'gpt-4o', messages, stream: true })) { console.log(ev.data); }

// File upload
await client.files.create({ file: fs.createReadStream('file.jsonl'), purpose: 'fine-tune' });

// Error handling
try { await client.chat.completions.create({ model:'invalid', messages }); } catch (err) { if (err instanceof OpenAI.AuthenticationError) handleAuth(); }

// WebSocket realtime
const rt = new OpenAIRealtimeWebSocket({ model: 'gpt-4o-realtime-preview' });
rt.on('response.text.delta', e => process.stdout.write(e.delta));

// Troubleshooting
# Enable debug logs
DEBUG=true node script.js
# Inspect request ID
console.log(response._request_id);
# Capture raw response
const raw = await client.responses.create({ model, input }).asResponse();
console.log(raw.status, raw.headers.get('content-type'));

## Information Dense Extract
apiKey=env;maxRetries=2;timeout=600000;fetchOverride;httpAgent;dangerouslyAllowBrowser=false;azureADToken;apiVersion. responses.create(params{model:string;instructions?;input?;stream?},opts{maxRetries?;timeout?;httpAgent?})->Promise<{output_text;_request_id}>|AsyncIterable<SSE>. chat.completions.create(params{model;messages[];stream?;temperature?;max_tokens?},opts?)->Promise<ChatResp>|AsyncIterable<SSE>. files.create(params{file:fs.ReadStream|File|Response|toFile;purpose},opts?)->Promise<FileObj>. stream: for await ev of create({stream:true}). Error classes map HTTP codes. Retries on network,408,409,429,>=500;override maxRetries. Timeout default600000ms;throws APIConnectionTimeoutError;retry2. RequestID: resp._request_id or .withResponse(). Pagination: for await page of client.jobs.list or manual page.getNextPage(). Realtime: new OpenAIRealtimeWebSocket({model}).on('response.text.delta',cb). AzureOpenAI: new AzureOpenAI({azureADTokenProvider,apiVersion}). Advanced: .asResponse(), .withResponse(). Custom: client.get/post(path,{body,query}). Shim: import openai/shims/web/node. Logging: fetch override or DEBUG env. HTTP Agent: default pooled; override via httpAgent.

## Sanitised Extract
Table of Contents
1 Installation
2 Client Configuration
3 Responses API
4 Chat Completions API
5 Streaming
6 File Uploads
7 Error Handling
8 Retries
9 Timeouts
10 Request IDs
11 Auto-pagination
12 Realtime API Beta
13 Azure OpenAI
14 Advanced Usage
15 Custom Requests
16 Fetch Client Shim
17 Logging and Middleware
18 HTTP(S) Agent
19 Semantic Versioning
20 Requirements

1 Installation
npm install openai
deno add jsr:@openai/openai
npx jsr add @openai/openai

2 Client Configuration
Constructor: new OpenAI(options)
options.apiKey?: string (default from env OPENAI_API_KEY)
options.maxRetries?: number (default 2)
options.timeout?: number ms (default 600000)
options.fetch?: function(url, init) => Promise<Response)
options.httpAgent?: Agent
options.dangerouslyAllowBrowser?: boolean (default false)
options.azureADTokenProvider?: BearerTokenProvider
options.apiVersion?: string

3 Responses API
client.responses.create(
  {model: string; instructions?: string; input?: string; stream?: boolean},
  {maxRetries?: number; timeout?: number; httpAgent?: Agent}
)
Returns Promise<{output_text: string; _request_id: string}> or AsyncIterable<ServerSentEvent>

4 Chat Completions API
client.chat.completions.create(
  {model: string; messages: {role: 'developer'|'user'|'assistant'; content: string}[]; stream?: boolean; temperature?: number; max_tokens?: number},
  RequestOptions
)
Returns Promise<ChatCompletionResponse> or AsyncIterable<ServerSentEvent>

5 Streaming
Use stream: true. Example: const stream = await client.responses.create({model, input, stream:true}); for await (const ev of stream) console.log(ev);

6 File Uploads
client.files.create({file: fs.ReadStream|File|Response|toFile(buffer,filename); purpose: 'fine-tune'});
Supports fs.createReadStream, File, fetch Response, toFile helper

7 Error Handling
Throws OpenAI.APIError subclasses
Properties: request_id, status, name, headers
Mapping: 400 BadRequestError, 401 AuthenticationError, 403 PermissionDeniedError, 404 NotFoundError, 422 UnprocessableEntityError, 429 RateLimitError, >=500 InternalServerError, network APIConnectionError

8 Retries
Default 2 retries for network errors, 408, 409, 429, >=500
Override via maxRetries in client or per request

9 Timeouts
Default 600000 ms
Throws APIConnectionTimeoutError
Retries twice by default
Override via timeout in client or per request

10 Request IDs
Access via response._request_id
Or withResponse(): const {data, request_id} = await client.responses.create(params).withResponse();

11 Auto-pagination
List methods return Page<T>
Use for await of client.fineTuning.jobs.list({limit}) or manual page.hasNextPage() and page.getNextPage()

12 Realtime API Beta
Use WebSocket:
const rt = new OpenAIRealtimeWebSocket({model})
rt.on('response.text.delta',(event)=>...)

13 Azure OpenAI
Use AzureOpenAI class:
new AzureOpenAI({azureADTokenProvider, apiVersion})
openai.chat.completions.create({model, messages})

14 Advanced Usage
.asResponse() returns raw Response
.withResponse() returns {data, response}

15 Custom Requests
client.post('/path',{body,query});
Allow undocumented params with @ts-expect-error

16 Fetch Client Shim
import 'openai/shims/web' for global fetch
import 'openai/shims/node' for node-fetch polyfill

17 Logging and Middleware
Pass fetch override in client options to intercept
Set DEBUG=true to auto log requests/responses

18 HTTP(S) Agent
Default connection pooling
Override via httpAgent in client or per request

19 Semantic Versioning
Follows SemVer; minor may include static-type breaking changes

20 Requirements
TypeScript>=4.5; Node.js>=18; Deno>=1.28.0; Bun>=1.0; Cloudflare Workers; Vercel Edge; Jest>=28+node; Nitro>=2.6; Browser support via dangerouslyAllowBrowser

## Original Source
OpenAI Node.js SDK
https://github.com/openai/openai-node#readme

## Digest of OPENAI_NODE_SDK

# OPENAI NODE.JS SDK (Retrieved 2024-06-30)

## Installation

```bash
npm install openai
# Deno / JSR
deno add jsr:@openai/openai
npx jsr add @openai/openai
``` 

## Client Configuration

Constructor: `new OpenAI(options?: OpenAIOptions)`

Options:
- `apiKey?: string`  (default from OPENAI_API_KEY env)
- `maxRetries?: number`  (default 2)
- `timeout?: number`  (ms, default 600000)
- `fetch?: (url: RequestInfo, init?: RequestInit) => Promise<Response>`
- `httpAgent?: http.Agent | https.Agent`
- `dangerouslyAllowBrowser?: boolean`  (default false)
- `azureADTokenProvider?: BearerTokenProvider`
- `apiVersion?: string`

## Responses API

```ts
client.responses.create(
  params: { model: string; instructions?: string; input?: string; stream?: boolean },
  options?: { maxRetries?: number; timeout?: number; httpAgent?: Agent }
): Promise<{ output_text: string; _request_id: string } | AsyncIterable<ServerSentEvent> >
```

## Chat Completions API

```ts
client.chat.completions.create(
  params: { model: string; messages: Array<{ role: 'developer'|'user'|'assistant'; content: string }>; stream?: boolean; temperature?: number; max_tokens?: number },
  options?: RequestOptions
): Promise<ChatCompletionResponse | AsyncIterable<ServerSentEvent>>
```

## Streaming

Use `stream: true` and for-await:

```ts
const stream = await client.responses.create({ model, input, stream: true });
for await (const event of stream) { console.log(event); }
```

## File Uploads

```ts
client.files.create({ file: fs.ReadStream | File | Response | toFile(buffer, filename); purpose: 'fine-tune' });
```

## Error Handling

Throws subclasses of `OpenAI.APIError` with:
- `request_id: string`
- `status: number`
- `name: string`
- `headers: Record<string,string>`

Error mapping:
- 400: BadRequestError
- 401: AuthenticationError
- 403: PermissionDeniedError
- 404: NotFoundError
- 422: UnprocessableEntityError
- 429: RateLimitError
- >=500: InternalServerError
- network: APIConnectionError

## Retries

Defaults: 2 attempts on connection errors, 408, 409, 429, >=500.
Override via `maxRetries` in client or per request.

## Timeouts

Default: 600000 ms.  Throws `APIConnectionTimeoutError`.  Retry twice.
Override via `timeout` in client or per request.

## Request IDs

Access via `_request_id` on responses or `.withResponse()`:

```ts
const { data, request_id } = await client.responses.create(params).withResponse();
```

## Auto-pagination

List methods return `Page<T>` with `.data: T[]`, `.hasNextPage()`, `.getNextPage()`; or use `for await` on `client.fineTuning.jobs.list()`.

## Realtime API Beta

```ts
const rt = new OpenAIRealtimeWebSocket({ model: string });
rt.on('response.text.delta', (event: { delta: string }) => process.stdout.write(event.delta));
```

## Azure OpenAI

```ts
const openai = new AzureOpenAI({ azureADTokenProvider, apiVersion });
openai.chat.completions.create({ model, messages });
```

## Advanced Usage

- `.asResponse()` returns raw `Response`
- `.withResponse()` returns `{ data, response }`

## Custom Requests

```ts
await client.post('/endpoint', { body, query });
// allow undocumented params with @ts-expect-error
```

## Fetch Client Shim

- `import 'openai/shims/web'` to use global fetch
- `import 'openai/shims/node'` to use node-fetch polyfills

## Logging and Middleware

Pass `fetch` option to intercept requests/responses. Set DEBUG=true for automatic logs.

## HTTP(S) Agent

Default: pooled agent. Override via `httpAgent` in client or per request.

## Semantic Versioning

Follows SemVer. Minor releases may contain breaking static-type changes.

## Requirements

- TS >=4.5, Node.js >=18, Deno >=1.28.0, Bun >=1.0, Cloudflare Workers, Vercel Edge, Jest28+, Nitro>=2.6.



## Attribution
- Source: OpenAI Node.js SDK
- URL: https://github.com/openai/openai-node#readme
- License: MIT License
- Crawl Date: 2025-05-04T08:50:20.297Z
- Data Size: 702054 bytes
- Links Found: 5432

## Retrieved
2025-05-04
