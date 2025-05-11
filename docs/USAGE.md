# CLI Usage

This tool calculates π using different algorithms.

## Algorithms

- `leibniz`: Leibniz series method (default)
- `montecarlo`: Monte Carlo sampling method

## Options

- `--algorithm <string>`  Algorithm to use (`leibniz` or `montecarlo`)
- `--digits <number>`     Number of decimal places for `leibniz` (default: 5)
- `--samples <number>`    Number of samples for `montecarlo` (default: 100000)

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