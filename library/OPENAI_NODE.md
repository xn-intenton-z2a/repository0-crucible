# OPENAI_NODE

## Crawl Summary
Installation via npm or deno; Usage includes Responses API, Chat Completions, Streaming SSE, File uploads with multiple methods; Error handling via APIError with specific error codes; Retries configurable with maxRetries; Timeouts configurable per-request or client-wide; Request IDs accessible via _request_id and .withResponse(); Supports auto-pagination with for-await-of and manual methods; Realtime API via WebSocket; AzureOpenAI for Microsoft Azure integration; Advanced usage includes accessing raw responses, custom undocumented requests, fetch client customization, and HTTP(S) Agent configuration; follows semantic versioning and strict runtime requirements.

## Normalised Extract
Table of Contents:
1. Installation
   - npm install openai
   - deno add jsr:@openai/openai
   - npx jsr add @openai/openai
   - Import from 'jsr:@openai/openai'
2. Basic Usage
   - Initialize client: new OpenAI({ apiKey?: string, maxRetries?: number, timeout?: number, fetch?: function, httpAgent?: any })
   - responses.create({ model: string, instructions?: string, input: string, stream?: boolean }) returns Promise<{ output_text: string, _request_id: string }>
3. Chat Completions
   - chat.completions.create({ model: string, messages: Array<{ role: string, content: string }> }) returns Promise<{ choices: Array<{ message: { content: string } }> }>
4. Streaming Responses
   - responses.create({ stream: true }) returns async iterable of events
5. File Uploads
   - files.create({ file: File | fs.ReadStream | Response | toFile(Buffer or Uint8Array, filename), purpose: string })
6. Error Handling
   - APIError subclasses with properties: request_id, status (number), name, headers
   - Error codes: 400, 401, 403, 404, 422, 429, >=500, APIConnectionError
7. Retries
   - Global maxRetries option; per-request override
8. Timeouts
   - Default 10 minutes; configurable global and per-request
9. Request IDs
   - _request_id property and .withResponse() method returning { data, response }
10. Auto-pagination
    - list({ limit: number }): returns paginated object with data, hasNextPage(), getNextPage()
11. Realtime API Beta
    - OpenAIRealtimeWebSocket({ model: string }) with event 'response.text.delta'
12. Microsoft Azure OpenAI
    - AzureOpenAI({ azureADTokenProvider, apiVersion: string }) with similar methods as core
13. Advanced Usage
    - .asResponse() and .withResponse() methods for raw HTTP response
    - client.get, client.post for undocumented endpoints
    - Custom fetch customization
    - HTTP agent configuration via httpAgent option

Detailed Topics:
Installation: Use exact commands as provided.
Basic Usage: Use the API methods with exact parameter names and types as in responses.create and chat.completions.create.
Streaming: Set stream:true for SSE support.
File Uploads: Accepts fs.ReadStream, File, Response, or toFile result.
Error Handling: APIError with request_id, status, name, headers; retry on connection errors and 408, 409, 429, >=500.
Retries/Timeouts: Options maxRetries and timeout adjustable globally or per request.
Auto-pagination: list() returns pages that include data, method hasNextPage(), and getNextPage().
Realtime API: Use OpenAIRealtimeWebSocket with event listeners.
Azure Integration: Use AzureOpenAI with azureADTokenProvider and apiVersion.
Advanced: Use .asResponse() and .withResponse() to retrieve raw HTTP response; customize fetch function; set httpAgent for proxies.

## Supplementary Details
Parameters and Configuration:
- apiKey: string (optional, default read from process.env['OPENAI_API_KEY'])
- maxRetries: number (default 2)
- timeout: number in ms (default 600000 ms = 10 minutes)
- fetch: Custom fetch function (signature: (url: RequestInfo, init?: RequestInit) => Promise<Response>)
- httpAgent: Allows configuration of HTTP(S) proxy agents

Method Signatures:
1. responses.create(params: { model: string, instructions?: string, input: string, stream?: boolean }): Promise<{ output_text: string, _request_id: string }>
2. chat.completions.create(params: { model: string, messages: Array<{ role: string, content: string }> }): Promise<{ choices: Array<{ message: { content: string } }> }>
3. files.create(params: { file: File | fs.ReadStream | Response | ReturnType<typeof toFile>, purpose: string }): Promise<any>
4. fineTuning.jobs.create(params: { model: string, training_file: string }): Promise<any>
5. fineTuning.jobs.list(params: { limit: number }): PaginatedResponse where PaginatedResponse has data: any[], hasNextPage(): boolean, getNextPage(): Promise<PaginatedResponse>
6. OpenAIRealtimeWebSocket(options: { model: string }): Instance with event emitter supporting on(event: string, callback: (data: any) => void)
7. AzureOpenAI(options: { azureADTokenProvider: any, apiVersion: string }): Similar API as OpenAI

Implementation Steps:
- Initialize client with configuration options
- Invoke method (e.g., responses.create) with required parameters
- Handle streaming using async iteration if stream:true
- For file uploads, ensure correct file object type is passed
- Catch errors using try/catch or .catch with instanceof OpenAI.APIError
- For raw HTTP inspection, use .asResponse() or .withResponse()

Troubleshooting:
- Check APIError details: log err.request_id, err.status, err.name, err.headers
- Use DEBUG=true for extensive logging
- Validate network connectivity for APIConnectionError
- If timeouts occur, verify timeout configuration and network latency
- For proxy issues, configure httpAgent with HttpsProxyAgent instance and test with a simple models.list() request.

## Reference Details
API Specifications:
1. OpenAI({ apiKey?: string, maxRetries?: number, timeout?: number, fetch?: (url: RequestInfo, init?: RequestInit) => Promise<Response>, httpAgent?: any }): Client
2. responses.create({ model: string, instructions?: string, input: string, stream?: boolean }): Promise<{ output_text: string, _request_id: string }>
3. chat.completions.create({ model: string, messages: { role: string, content: string }[] }): Promise<{ choices: { message: { content: string } }[] }>
4. files.create({ file: File | fs.ReadStream | Response | ReturnType<typeof toFile>, purpose: string }): Promise<any>
5. fineTuning.jobs.create({ model: string, training_file: string }): Promise<any>
6. fineTuning.jobs.list({ limit: number }): PaginatedResponse with methods hasNextPage(): boolean and getNextPage(): Promise<PaginatedResponse>
7. OpenAIRealtimeWebSocket({ model: string }): Instance with on(event: string, callback: (data: any) => void)
8. AzureOpenAI({ azureADTokenProvider: any, apiVersion: string }): Client

SDK Method Examples (Detailed):

// Basic response generation
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] });
client.responses.create({ model: 'gpt-4o', instructions: 'You are a coding assistant that talks like a pirate', input: 'Are semicolons optional in JavaScript?' })
  .then(response => { console.log(response.output_text); });

// Chat completions
client.chat.completions.create({ model: 'gpt-4o', messages: [ { role: 'developer', content: 'Talk like a pirate.' }, { role: 'user', content: 'Are semicolons optional in JavaScript?' } ] })
  .then(completion => { console.log(completion.choices[0].message.content); });

// Streaming response with async iteration
(async () => {
  const stream = await client.responses.create({ model: 'gpt-4o', input: 'Say "Sheep sleep deep" ten times fast!', stream: true });
  for await (const event of stream) {
    console.log(event);
  }
})();

// File upload using fs.ReadStream
import fs from 'fs';
await client.files.create({ file: fs.createReadStream('input.jsonl'), purpose: 'fine-tune' });

// Error handling sample
try {
  const job = await client.fineTuning.jobs.create({ model: 'gpt-4o', training_file: 'file-abc123' });
} catch (err) {
  if (err instanceof OpenAI.APIError) {
    console.log(err.request_id);
    console.log(err.status);
    console.log(err.name);
    console.log(err.headers);
  } else {
    throw err;
  }
}

// Custom fetch override
import { fetch } from 'undici';
const customClient = new OpenAI({
  fetch: async (url, init) => {
    console.log('Request:', url, init);
    const response = await fetch(url, init);
    console.log('Response:', response);
    return response;
  }
});

// HTTP Agent configuration
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';
const agentClient = new OpenAI({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL)
});

// Troubleshooting: Use DEBUG=true environment variable to log all requests and responses.
// Verify network connectivity and proxy settings if APIConnectionError occurs.

Configuration Options:
- apiKey: string (default from process.env['OPENAI_API_KEY'])
- maxRetries: number (default 2; disables retries when set to 0)
- timeout: number (default 600000 ms)
- fetch: custom fetch function override
- httpAgent: agent for HTTP(S) requests

Best Practices:
- Always catch APIError to log error details.
- Configure maxRetries and timeout based on network conditions.
- Use .withResponse() to debug raw HTTP responses.
- For file uploads use the recommended toFile helper if other methods are not feasible.
- When using in a browser environment, set dangerouslyAllowBrowser explicitly to avoid exposing secrets.


## Information Dense Extract
npm install openai; deno add jsr:@openai/openai; Import OpenAI from 'openai'; Client:init({ apiKey?:string, maxRetries?:number, timeout?:number, fetch?:function, httpAgent?:any }); responses.create({ model:string, instructions?:string, input:string, stream?:boolean }):Promise<{ output_text:string, _request_id:string }>; chat.completions.create({ model:string, messages:Array<{role:string, content:string}> }):Promise<{ choices:Array<{message:{content:string}}> }>; files.create({ file:(File|fs.ReadStream|Response|toFileResult), purpose:string }); fineTuning.jobs.create({ model:string, training_file:string }):Promise; fineTuning.jobs.list({ limit:number }):PaginatedResponse with hasNextPage(), getNextPage(); OpenAIRealtimeWebSocket({ model:string }) with on(event,callback); AzureOpenAI({ azureADTokenProvider:any, apiVersion:string }); Custom fetch override example; HTTP agent configuration with HttpsProxyAgent; APIError with request_id, status, name, headers; Retry defaults:2, timeout:600000 ms; DEBUG=true for logging.

## Sanitised Extract
Table of Contents:
1. Installation
   - npm install openai
   - deno add jsr:@openai/openai
   - npx jsr add @openai/openai
   - Import from 'jsr:@openai/openai'
2. Basic Usage
   - Initialize client: new OpenAI({ apiKey?: string, maxRetries?: number, timeout?: number, fetch?: function, httpAgent?: any })
   - responses.create({ model: string, instructions?: string, input: string, stream?: boolean }) returns Promise<{ output_text: string, _request_id: string }>
3. Chat Completions
   - chat.completions.create({ model: string, messages: Array<{ role: string, content: string }> }) returns Promise<{ choices: Array<{ message: { content: string } }> }>
4. Streaming Responses
   - responses.create({ stream: true }) returns async iterable of events
5. File Uploads
   - files.create({ file: File | fs.ReadStream | Response | toFile(Buffer or Uint8Array, filename), purpose: string })
6. Error Handling
   - APIError subclasses with properties: request_id, status (number), name, headers
   - Error codes: 400, 401, 403, 404, 422, 429, >=500, APIConnectionError
7. Retries
   - Global maxRetries option; per-request override
8. Timeouts
   - Default 10 minutes; configurable global and per-request
9. Request IDs
   - _request_id property and .withResponse() method returning { data, response }
10. Auto-pagination
    - list({ limit: number }): returns paginated object with data, hasNextPage(), getNextPage()
11. Realtime API Beta
    - OpenAIRealtimeWebSocket({ model: string }) with event 'response.text.delta'
12. Microsoft Azure OpenAI
    - AzureOpenAI({ azureADTokenProvider, apiVersion: string }) with similar methods as core
13. Advanced Usage
    - .asResponse() and .withResponse() methods for raw HTTP response
    - client.get, client.post for undocumented endpoints
    - Custom fetch customization
    - HTTP agent configuration via httpAgent option

Detailed Topics:
Installation: Use exact commands as provided.
Basic Usage: Use the API methods with exact parameter names and types as in responses.create and chat.completions.create.
Streaming: Set stream:true for SSE support.
File Uploads: Accepts fs.ReadStream, File, Response, or toFile result.
Error Handling: APIError with request_id, status, name, headers; retry on connection errors and 408, 409, 429, >=500.
Retries/Timeouts: Options maxRetries and timeout adjustable globally or per request.
Auto-pagination: list() returns pages that include data, method hasNextPage(), and getNextPage().
Realtime API: Use OpenAIRealtimeWebSocket with event listeners.
Azure Integration: Use AzureOpenAI with azureADTokenProvider and apiVersion.
Advanced: Use .asResponse() and .withResponse() to retrieve raw HTTP response; customize fetch function; set httpAgent for proxies.

## Original Source
OpenAI Node.js API Documentation
https://github.com/openai/openai-node

## Digest of OPENAI_NODE

# OpenAI Node.js API Library

Retrieved: 2023-10-06

## Installation

- npm: npm install openai
- Deno: deno add jsr:@openai/openai or npx jsr add @openai/openai
- Import Directly in Deno: import OpenAI from 'jsr:@openai/openai';

## Usage

### Basic Usage

Initialize the client with an optional apiKey.

Example:

  import OpenAI from 'openai';

  const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  });

  // Using the Responses API
  const response = await client.responses.create({
    model: 'gpt-4o',
    instructions: 'You are a coding assistant that talks like a pirate',
    input: 'Are semicolons optional in JavaScript?'
  });

  console.log(response.output_text);

### Chat Completions API

Example:

  import OpenAI from 'openai';

  const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  });

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'developer', content: 'Talk like a pirate.' },
      { role: 'user', content: 'Are semicolons optional in JavaScript?' }
    ]
  });

  console.log(completion.choices[0].message.content);

### Streaming Responses

Supports Server Sent Events (SSE) for streaming responses:

  import OpenAI from 'openai';

  const client = new OpenAI();

  const stream = await client.responses.create({
    model: 'gpt-4o',
    input: 'Say "Sheep sleep deep" ten times fast!',
    stream: true
  });

  for await (const event of stream) {
    console.log(event);
  }

### File Uploads

File uploads accept several forms:

- fs.ReadStream
- Fetch Response object
- Web File API
- toFile helper

Examples:

  import fs from 'fs';
  import fetch from 'node-fetch';
  import OpenAI, { toFile } from 'openai';

  const client = new OpenAI();

  // Using fs.ReadStream
  await client.files.create({ file: fs.createReadStream('input.jsonl'), purpose: 'fine-tune' });

  // Using Web File API
  await client.files.create({ file: new File(['my bytes'], 'input.jsonl'), purpose: 'fine-tune' });

  // Using fetch Response
  await client.files.create({ file: await fetch('https://somesite/input.jsonl'), purpose: 'fine-tune' });

  // Using toFile helper
  await client.files.create({
    file: await toFile(Buffer.from('my bytes'), 'input.jsonl'),
    purpose: 'fine-tune'
  });

### Error Handling

Errors throw a subclass of APIError. Access error details like request_id, status, name, and headers.

Example:

  async function main() {
    const job = await client.fineTuning.jobs.create({ model: 'gpt-4o', training_file: 'file-abc123' })
      .catch(async (err) => {
        if (err instanceof OpenAI.APIError) {
          console.log(err.request_id);
          console.log(err.status);
          console.log(err.name);
          console.log(err.headers);
        } else {
          throw err;
        }
      });
  }

  main();

#### Error Codes

| Status Code | Error Type              |
| ----------- | ----------------------- |
| 400         | BadRequestError         |
| 401         | AuthenticationError     |
| 403         | PermissionDeniedError   |
| 404         | NotFoundError           |
| 422         | UnprocessableEntityError|
| 429         | RateLimitError          |
| >=500       | InternalServerError     |
| N/A         | APIConnectionError      |

### Retries

Default retries: 2 with exponential backoff. Configure with maxRetries.

Global configuration:

  const client = new OpenAI({
    maxRetries: 0
  });

Per-request configuration:

  await client.chat.completions.create({ ... }, { maxRetries: 5 });

### Timeouts

Default timeout is 10 minutes. Can be configured with the timeout option.

Global configuration:

  const client = new OpenAI({
    timeout: 20000 // 20 seconds
  });

Per-request override:

  await client.chat.completions.create({ ... }, { timeout: 5000 });

A timeout throws APIConnectionTimeoutError.

### Request IDs

Each response includes a _request_id. Access via:

  const response = await client.responses.create({ model: 'gpt-4o', input: 'testing 123' });
  console.log(response._request_id);

Or use .withResponse():

  const { data, response } = await client.responses.create({ model: 'gpt-4o', input: 'Say this is a test', stream: true }).withResponse();

### Auto-pagination

Iterate over paginated responses using for-await-of or manual pagination.

Example using for-await-of:

  async function fetchAllFineTuningJobs() {
    const allJobs = [];
    for await (const job of client.fineTuning.jobs.list({ limit: 20 })) {
      allJobs.push(job);
    }
    return allJobs;
  }

Manual pagination:

  let page = await client.fineTuning.jobs.list({ limit: 20 });
  for (const job of page.data) {
    console.log(job);
  }

  while (page.hasNextPage()) {
    page = await page.getNextPage();
  }

### Realtime API Beta

Supports low-latency multi-modal conversational experiences via WebSocket.

Example:

  import { OpenAIRealtimeWebSocket } from 'openai/beta/realtime/websocket';

  const rt = new OpenAIRealtimeWebSocket({ model: 'gpt-4o-realtime-preview-2024-12-17' });
  rt.on('response.text.delta', (event) => process.stdout.write(event.delta));

### Microsoft Azure OpenAI

For Azure, use AzureOpenAI class.

Example:

  import { AzureOpenAI } from 'openai';
  import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';

  const credential = new DefaultAzureCredential();
  const scope = 'https://cognitiveservices.azure.com/.default';
  const azureADTokenProvider = getBearerTokenProvider(credential, scope);

  const openai = new AzureOpenAI({
    azureADTokenProvider,
    apiVersion: "<The API version, e.g. 2024-10-01-preview>"
  });

  const result = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Say hello!' }]
  });

  console.log(result.choices[0].message?.content);

### Advanced Usage

#### Accessing Raw Response Data

Use .asResponse() or .withResponse() to access HTTP headers and response details.

Example:

  const httpResponse = await client.responses.create({ model: 'gpt-4o', input: 'say this is a test.' }).asResponse();
  console.log(httpResponse.headers.get('X-My-Header'));
  console.log(httpResponse.statusText);

  const { data: modelResponse, response: raw } = await client.responses.create({ model: 'gpt-4o', input: 'say this is a test.' }).withResponse();
  console.log(raw.headers.get('X-My-Header'));
  console.log(modelResponse);

#### Custom/Undocumented Requests

For undocumented endpoints use HTTP verbs directly:

  await client.post('/some/path', {
    body: { some_prop: 'foo' },
    query: { some_query_arg: 'bar' }
  });

You can add undocumented parameters and use TypeScript comments // @ts-expect-error to bypass type checks.

#### Customizing the fetch Client

Override the fetch function during initialization:

  import { fetch } from 'undici';
  import OpenAI from 'openai';

  const client = new OpenAI({
    fetch: async (url, init) => {
      console.log('About to make a request', url, init);
      const response = await fetch(url, init);
      console.log('Got response', response);
      return response;
    }
  });

#### Configuring HTTP(S) Agent

Customize HTTP agent for proxies:

  import http from 'http';
  import { HttpsProxyAgent } from 'https-proxy-agent';

  const client = new OpenAI({
    httpAgent: new HttpsProxyAgent(process.env.PROXY_URL)
  });

Or override per-request:

  await client.models.list({
    httpAgent: new http.Agent({ keepAlive: false })
  });

## Semantic Versioning & Requirements

- Follows SemVer with special exceptions for static type changes.
- Requires TypeScript >=4.5.
- Supported runtimes: Node.js 18 LTS+, Deno v1.28.0+, Bun 1.0+, Cloudflare Workers, Vercel Edge, Jest 28+ (node), Nitro v2.6+.
- Web browsers: disabled by default (enable with dangerouslyAllowBrowser: true in options).


## Attribution
- Source: OpenAI Node.js API Documentation
- URL: https://github.com/openai/openai-node
- License: License: MIT
- Crawl Date: 2025-04-25T19:43:00.358Z
- Data Size: 658432 bytes
- Links Found: 5228

## Retrieved
2025-04-25
