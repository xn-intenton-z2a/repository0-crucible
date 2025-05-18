# CLI Usage

The π calculation CLI supports precision control, algorithm selection, performance benchmarking, and output formatting.

## Options

- `--digits, -d <number>`  
  Total significant digits to display (integer ≥ 1). Default: `100`.

- `--algorithm, -a <leibniz|spigot|montecarlo>`  
  Algorithm to use for π approximation. Default: `leibniz`.

- `--benchmark, -b`  
  Prefix output with execution time in milliseconds. Default: `false`.

- `--output-format, -f <text|png>`  
  Output format. `text` prints digits to console; `png` writes a PNG image. Default: `text`.

- `--output, -o <file>`  
  Output file path when using PNG format. Default: `pi.png`.

- `--help, -h`  
  Display usage information and exit.

## Examples

### Text Output

```bash
node src/lib/main.js --digits 5 --algorithm leibniz --output-format text
# Output:
3.1415
```

### PNG Output

```bash
node src/lib/main.js --digits 20 --output-format png --output mypi.png
# Writes 'mypi.png' with the π digits rendered on a monospaced canvas
```

### Benchmarking

```bash
node src/lib/main.js --digits 10 --benchmark
# Output example:
[Benchmark] Execution time: 12ms 3.141592653
```

### Help

```bash
node src/lib/main.js --help
```
