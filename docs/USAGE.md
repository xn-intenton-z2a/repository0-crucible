# CLI Usage

This tool calculates π using different algorithms.

## Algorithms

- `leibniz`: Leibniz series method (default)
- `montecarlo`: Monte Carlo sampling method
- `chudnovsky`: Chudnovsky algorithm for rapid convergence

## Options

- `--algorithm <string>`  Algorithm to use (`leibniz`, `montecarlo`, `chudnovsky`)
- `--digits <number>`     Number of decimal places for `leibniz` and `chudnovsky` (default: 5)
- `--samples <number>`    Number of samples for `montecarlo` (default: 100000)
- `--diagnostics`         Outputs a JSON object with execution diagnostics (algorithm, parameters, durationMs, iterations/samplesUsed, and result)
- `--benchmark`           Runs all supported algorithms and outputs a consolidated JSON benchmark report
- `--validate-features`   Validates that all feature specification files reference `MISSION.md`; exits with code 0 on success or 1 with missing file list
- `--convergence-data <filepath>`  File path where convergence data JSON is saved
- `--chart <filepath>`     File path where convergence chart PNG is saved

## Examples

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

### Diagnostics Example

```bash
node src/lib/main.js --digits 5 --diagnostics
# Outputs: { algorithm: 'leibniz', digits: 5, result: 3.14159, durationMs: 12, iterations: 200000 }
```

### Benchmark Example

```bash
node src/lib/main.js --benchmark
# Outputs:
[
  {
    "algorithm": "leibniz",
    "digits": 5,
    "result": 3.14159,
    "durationMs": 10,
    "error": 0.00000
  },
  {
    "algorithm": "montecarlo",
    "samples": 100000,
    "result": 3.14200,
    "durationMs": 50,
    "error": 0.00041
  },
  {
    "algorithm": "chudnovsky",
    "digits": 5,
    "result": 3.14159,
    "durationMs": 5,
    "error": 0.00000
  }
]
```

### Convergence Data Export

```bash
node src/lib/main.js --digits 5 --convergence-data data.json
# Creates data.json with convergence data
```

### Chart Generation

```bash
node src/lib/main.js --digits 5 --chart chart.png
# Creates chart.png with convergence chart
```

### Combined Export

```bash
node src/lib/main.js --digits 5 --convergence-data data.json --chart chart.png
```
