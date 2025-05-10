# HTTP API Feature

This feature exposes core π operations via a RESTful HTTP API using Express.

## Starting the Server

Start the HTTP API server:

```bash
node src/lib/main.js --serve --port 3000
```

- `--serve`: start the HTTP server.
- `--port <n>`: port number to listen on (default `3000`). Use `0` to assign an ephemeral available port.

## Endpoints

### GET /pi

Compute π.

**Query Parameters:**

- `digits` (integer, required): total number of π digits to return (including the integer part), minimum `1`, maximum `1e6`. For example, `digits=3` returns `"3.14"`.
- `algorithm` (string, optional): `machin`, `gauss-legendre`, or `chudnovsky` (default `machin`).

**Response:** `200 OK`, JSON:

```json
{ "pi": "<string>" }
```

Error: `400 Bad Request`, JSON `{ "error": "<message>" }`.

### GET /benchmark

Measure computation time for π over a digit range.

**Query Parameters:**

- `minDigits` (integer, required, ≥1)
- `maxDigits` (integer, required, ≥ `minDigits`)
- `step` (integer, optional, default=`minDigits`)
- `algorithm` (string, optional): `machin` or `gauss-legendre` (default `machin`).

**Response:** `200 OK`, JSON array:

```json
[
  { "digits": <number>, "timeMs": <number> },
  ...
]
```

Error: `400 Bad Request` for invalid parameters.

### GET /convergence

Return a PNG showing convergence error (dummy PNG signature).

**Query Parameters:**

- `digits` (integer, required, ≥10)
- `algorithm` (string, optional): `machin`, `gauss-legendre`, `chudnovsky` (default `machin`).
- `iterations` (integer, required, ≥2).

**Response:** `200 OK`, `Content-Type: image/png`, body begins with PNG signature bytes `89 50 4E 47 0D 0A 1A 0A`.

Error: `400 Bad Request` for invalid parameters.

### GET /distribution

Return a PNG showing digit distribution (dummy PNG signature).

**Query Parameters:**

- `digits` (integer, required, ≥1)
- `algorithm` (string, optional): `machin`, `gauss-legendre`, `chudnovsky` (default `machin`).

**Response:** `200 OK`, `Content-Type: image/png`, body begins with PNG signature.

Error: `400 Bad Request` for invalid parameters.

### GET /search

Search for a numeric substring in π digits.

**Query Parameters:**

- `pattern` (string of digits, required)
- `digits` (integer, optional, default=1000)
- `algorithm` (string, optional, default=`machin`)
- `all` (boolean, optional, default=`false`)

**Response:** `200 OK`, JSON:

- If `all=false`:

```json
{ "position": <number|null> }
```

- If `all=true`:

```json
{ "positions": [<numbers>] }
```

Error: `400 Bad Request` for invalid pattern or parameters.

### GET /decimal

Extract decimal digits from π at a given position.

**Query Parameters:**

- `position` (integer, required, ≥0)
- `count` (integer, required, ≥1)
- `algorithm` (string, optional): `machin`, `gauss-legendre`, `chudnovsky` (default `machin`).

**Response:** `200 OK`, `Content-Type: text/plain`, body is the substring of digits.

Error: `400 Bad Request` for invalid parameters.

### GET /export

Export π to text or JSON.

**Query Parameters:**

- `digits` (integer, optional, default=100)
- `algorithm` (string, optional, default=`machin`)
- `format` (string, `txt` or `json`, default=`txt`)
- `base` (integer, currently only `10` supported)

**Response:**

- `format=txt`: `200 OK`, `Content-Type: text/plain`, body is the π string.
- `format=json`: `200 OK`, JSON `{ "pi": "<string>" }`.

Error: `400 Bad Request` for invalid parameters.

### GET /pi/stream

Stream π digits via Server-Sent Events (SSE).

**Query Parameters:**

- `digits` (integer, optional, default=100)
- `algorithm` (string, optional, default=`machin`)

**Response:** `200 OK`, headers:

```
Content-Type: text/event-stream; charset=UTF-8
Cache-Control: no-cache
Connection: keep-alive
```

Sends:
```
data: <pi_string>\n\n
```
```
event: end\n\n
```

Error: `400 Bad Request` for invalid parameters.

### Fallback and Error Handling

- **404 Not Found** for unknown routes: JSON `{ "error": "Not Found" }`.
- **500 Internal Server Error** for uncaught exceptions: JSON `{ "error": "<message>" }`.
