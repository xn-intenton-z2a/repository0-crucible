# CLI Usage

This tool calculates π using different algorithms and can also start an HTTP API server that provides REST endpoints and an interactive dashboard.

## Algorithms

- `leibniz`: Leibniz series method (default)
- `montecarlo`: Monte Carlo sampling method
- `chudnovsky`: Chudnovsky algorithm for rapid convergence
- `ramanujan-sato`: Ramanujan–Sato level-1 series for high-precision
- `gauss-legendre`: Gauss–Legendre algorithm for rapid convergence

## Options

- `--algorithm <string>`  Algorithm to use (`leibniz`, `montecarlo`, `chudnovsky`, `ramanujan-sato`, `gauss-legendre`)
- `--digits <number>`     Number of decimal places for digit-based algorithms (default: 5)
- `--samples <number>`    Number of samples for `montecarlo` (default: 100000)
- `--level <number>`      Level for `ramanujan-sato` algorithm (default: 1)
- `--max-iterations <number>`  Maximum iterations for high-precision series (default: 50)
- `--error-tolerance <number>` Tolerance threshold for series termination (default: 10^(-digits))
- `--diagnostics`         Outputs a JSON object with execution diagnostics (algorithm, parameters, durationMs, iterations/samplesUsed, and result)
- `--benchmark`           Runs all supported algorithms and outputs a consolidated JSON benchmark report
- `--validate-features`   Validates that all feature specification files reference `MISSION.md`, auto-appends missing references, logs each patch, and exits with status 0
- `--convergence-data <filepath>`  File path where convergence data JSON is saved
- `--chart <filepath>`     File path where convergence chart PNG is saved
- `--serve <port>`         Starts an HTTP API server on the specified port and exposes REST endpoints (including `/dashboard`)

## CLI Examples

### Leibniz method

```bash
node src/lib/main.js --digits 10
```

### Monte Carlo method

```bash
node src/lib/main.js --algorithm montecarlo --samples 100000
```

### Chudnovsky method

```bash
node src/lib/main.js --algorithm chudnovsky --digits 3
```

### Ramanujan–Sato method

```bash
node src/lib/main.js --algorithm ramanujan-sato --level 1 --digits 3
```

### Gauss–Legendre method

```bash
node src/lib/main.js --algorithm gauss-legendre --digits 3
```

### Diagnostics Example

```bash
node src/lib/main.js --digits 5 --diagnostics
``` 

### Benchmark Example

```bash
node src/lib/main.js --benchmark
```

### Convergence Data Export

```bash
node src/lib/main.js --digits 5 --convergence-data data.json
```

### Chart Generation

```bash
node src/lib/main.js --digits 5 --chart chart.png
```

### HTTP API Server

Start the server on port 3000:

```bash
node src/lib/main.js --serve 3000
```

#### REST Endpoints

##### GET /pi

```bash
curl http://localhost:3000/pi
```

##### GET /pi with high-precision algorithms

```bash
curl "http://localhost:3000/pi?algorithm=chudnovsky&digits=2"
curl "http://localhost:3000/pi?algorithm=ramanujan-sato&digits=3&level=1&diagnostics=true"
curl "http://localhost:3000/pi?algorithm=gauss-legendre&digits=2"
```

##### GET /pi/data

```bash
curl "http://localhost:3000/pi/data?digits=2&algorithm=leibniz"
```

##### GET /pi/chart

```bash
curl "http://localhost:3000/pi/chart?digits=2&algorithm=leibniz" --output chart.png
```

##### GET /dashboard

Returns an interactive HTML dashboard page allowing users to input π calculation parameters and view live results and an error chart.

```bash
curl http://localhost:3000/dashboard
```