# Server-Sent Events (SSE)

## Overview

This feature enables streaming π digits in real time over an SSE (Server-Sent Events) endpoint when the HTTP server mode is active.

## CLI Flags

- `--serve <port>`: Start the HTTP server on the specified port.
- `--sse`: Enable the SSE endpoint.
- `--sse-path <path>`: Set the URL path for the SSE stream (default: `/pi/sse`).
- `--sse-chunk-size <n>`: Number of characters per SSE message (default: `100`).

## Usage

Start the server with SSE streaming enabled:

```bash
node src/lib/main.js --serve 3000 --sse --sse-path /pi/sse --sse-chunk-size 50
```

The endpoint will stream events at the specified path:

```bash
curl http://localhost:3000/pi/sse?digits=100&chunkSize=20
```

## Client Example

```js
const es = new EventSource('http://localhost:3000/pi/sse?digits=100&chunkSize=20');
es.onmessage = (e) => console.log('chunk', e.data);
es.addEventListener('done', () => console.log('stream complete'));
```
