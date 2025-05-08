# repository0-crucible CLI Documentation

This documentation describes the currently implemented functionality of the `repository0-crucible` CLI tool.

## Features

- **CLI π Computation**: Compute π digits directly from the CLI.
- **Algorithms**: chudnovsky (default), gauss-legendre, leibniz.
- **Benchmarking**: measure execution time and throughput.
- **Output**: text output to stdout or file.
- **HTTP API**: serve endpoints for computing π and benchmarking via HTTP.

## Usage

### CLI Mode

Compute π to a specified number of digits:

```bash
node src/lib/main.js --algorithm gauss-legendre --digits 10
```

Output:

```
3.1415926535
```

Include benchmark metrics:

```bash
node src/lib/main.js --algorithm chudnovsky --digits 100 --benchmark
```

Output:

```
3.14159265358979323846264338327950288419716939937510
Execution time: 1.23 ms
Throughput: 81.30 digits/ms
```

Write output to a file:

```bash
node src/lib/main.js --algorithm leibniz --digits 50 --output pi.txt
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