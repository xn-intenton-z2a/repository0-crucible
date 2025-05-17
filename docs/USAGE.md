# CLI Usage

The π calculation CLI supports selecting the number of significant digits, choice of algorithm, and output format.

## Options

- `--digits <number>`  
  Total significant digits to display (integer ≥ 1). Default: `10`.

- `--algorithm <string>`  
  Algorithm to use for π approximation. Supported: `leibniz`. Default: `leibniz`.

- `--format <text|png>`  
  Output format. Only `text` is supported in this release. Default: `text`.

- `--help`  
  Display usage information and exit.

## Examples

### Text Output

```bash
node src/lib/main.js --digits 3 --algorithm leibniz --format text
# Output:
3.14
```

```bash
npm run start -- --digits 5 --algorithm leibniz --format text
# Output (approximate):
3.1415
```
