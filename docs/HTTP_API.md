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

Query Parameters:

- `digits` (integer, optional): total number of π digits to return (including the integer part), minimum `1`, maximum `1e6`. Default: `101` (1 integer digit + decimal point + 100 fractional digits). For example, `digits=3` returns `"3.14"`; omitting `digits` returns 101 digits (`1` + `.` + `100` decimals).
- `algorithm` (string, optional): `machin`, `gauss-legendre`, or `chudnovsky` (default `machin`).

Response: `200 OK`, JSON:

```json
{ "pi": "<string>" }
```

Error: `400 Bad Request`, JSON `{ "error": "<message>" }`.
