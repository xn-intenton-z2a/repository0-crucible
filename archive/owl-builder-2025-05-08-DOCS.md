docs/README.md
# docs/README.md
# repository0-crucible CLI Documentation

This documentation describes the currently implemented functionality of the `repository0-crucible` CLI tool.

## Features

- **Argument echo**: logs provided command-line arguments to the console.
- **HTTP API**: serve endpoints for computing π and benchmarking via HTTP.

## Usage

### CLI Mode

To run the CLI tool and see the argument echo feature in action, invoke it with any arguments:

```bash
node src/lib/main.js hello world
```

You should see the following output:

```bash
Run with: ["hello","world"]
```

### HTTP API Mode

To start the HTTP server:

```bash
npm run serve
```

or specify a custom port:

```bash
node src/lib/main.js --serve --port 4000
```

Once running, the following endpoints are available:

#### Health Check

```bash
curl http://localhost:3000/health
```

Response:

```json
{ "status": "ok" }
```

#### Compute π

```bash
curl "http://localhost:3000/pi?digits=10&algorithm=chudnovsky"
```

Response:

```json
{
  "pi": "3.1415926535",
  "digits": 10,
  "algorithm": "chudnovsky",
  "timeMs": 1
}
```

#### Benchmark π Computation

```bash
curl "http://localhost:3000/benchmark?digits=100&algorithm=gauss-legendre"
```

Response:

```json
{
  "digits": 100,
  "algorithm": "gauss-legendre",
  "timeMs": 1,
  "throughput": 100
}
```
