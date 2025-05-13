# CLI Usage

This tool calculates π using different algorithms and can also start an HTTP API server or serve an interactive dashboard.

## Algorithms

- `leibniz`: Leibniz series method (default)
- `montecarlo`: Monte Carlo sampling method
- `chudnovsky`: Chudnovsky algorithm for rapid convergence
- `ramanujan-sato`: Ramanujan–Sato level-1 series for high-precision

## Options

- `--algorithm <string>`  Algorithm to use (`leibniz`, `montecarlo`, `chudnovsky`, `ramanujan-sato`)
- `--digits <number>`     Number of decimal places for `leibniz`, `chudnovsky`, and `ramanujan-sato` (default: 5)
- `--samples <number>`    Number of samples for `montecarlo` (default: 100000)
- `--level <number>`      Level for `ramanujan-sato` algorithm (default: 1)
- `--max-iterations <number>`  Maximum iterations for high-precision series (default: 50)
- `--error-tolerance <number>` Tolerance threshold for series termination (default: 10^(-digits))
- `--diagnostics`         Outputs a JSON object with execution diagnostics (algorithm, parameters, durationMs, iterations/samplesUsed, and result)
- `--benchmark`           Runs all supported algorithms and outputs a consolidated JSON benchmark report
- `--validate-features`   Validates that all feature specification files reference `MISSION.md`, auto-appends missing references, logs each patch, and exits with status 0
- `--convergence-data <filepath>`  File path where convergence data JSON is saved
- `--chart <filepath>`     File path where convergence chart PNG is saved
- `--serve <port>`         Starts an HTTP API server on the specified port and exposes REST endpoints
- `--dashboard`            Serves an interactive web dashboard at `/dashboard`

## CLI Examples

### Leibniz method

```bash
node src/lib/main.js --digits 10
# Outputs: 3.1415926536
```

### Monte Carlo method

```bash
node src/lib/main.js --algorithm montecarlo --samples 1000000
# Outputs: 3.14xx (approximate)
```

### Chudnovsky method

```bash
node src/lib/main.js --algorithm chudnovsky --digits 3
# Outputs: 3.142
```

### Ramanujan–Sato method

```bash
node src/lib/main.js --algorithm ramanujan-sato --level 1 --digits 3
# Outputs: 3.142
```

### Diagnostics Example

```bash
node src/lib/main.js --digits 5 --diagnostics
# Outputs: { algorithm: 'leibniz', digits: 5, result: 3.14159, durationMs: 12, iterations: 200000 }
```

### Benchmark Example

```bash
node src/lib/main.js --benchmark
# Outputs a JSON array of benchmark results, including high-precision methods
```

### Convergence Data Export

```bash
node src/lib/main.js --digits 5 --convergence-data data.json
# Creates data.json with convergence data
```

### Chart Generation

```bash
node src/lib/main.js --digits 5 --chart chart.png
# Creates chart.png with convergence chart (PNG signature starts with \x89PNG) 
```

### HTTP API Server

```bash
node src/lib/main.js --serve 3000
# Logs: Listening on port 3000
```

#### REST Endpoints

##### GET /pi

```bash
curl http://localhost:3000/pi
# { "result": 3.14159 }
```

##### GET /pi with high-precision algorithms

```bash
curl "http://localhost:3000/pi?algorithm=chudnovsky&digits=2"
# { "result": 3.14 }

curl "http://localhost:3000/pi?algorithm=ramanujan-sato&digits=3&level=1&diagnostics=true"
# { "algorithm": "ramanujan-sato", "digits": 3, "level": 1, "result": 3.142, "durationMs": 10 }
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