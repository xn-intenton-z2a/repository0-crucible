# ALGORITHM_SELECTION Feature

This feature adds support for selecting the π calculation algorithm and number of worker threads via CLI flags.

## CLI Flags

- `--algorithm <machin|chudnovsky|ramanujan>`: Choose the algorithm to compute π (default: `machin`).
- `--workers <n>`: Number of worker threads for parallel computation (default: `1`). Only affects the `chudnovsky` algorithm; ignored for others.

### Error Handling

- Invalid algorithm names print `Error: Invalid algorithm '<value>'` and exit with code `1`.
- Invalid or out-of-range worker counts print
  `Error: --workers requires a positive integer ≤ <cpuCount>` and exit with code `1`.

## Usage

```bash
# Default algorithm (Machin)
node src/lib/main.js --digits 10

# Ramanujan algorithm
node src/lib/main.js --digits 200 --algorithm ramanujan

# Chudnovsky algorithm with parallel workers
node src/lib/main.js --digits 500 --algorithm chudnovsky --workers 4
```
