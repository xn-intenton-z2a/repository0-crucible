# PI Worker Threads Feature

This documentation describes the `calculatePiParallel` API and how to use the `--threads` flag in the CLI to perform π computation using Node.js worker threads.

## Programmatic API

Import and invoke the `calculatePiParallel` function:

```js
import { calculatePiParallel } from '@xn-intenton-z2a/repository0-crucible/src/lib/main.js';

(async () => {
  // Calculate π to 100 decimal places using 4 threads and the Chudnovsky algorithm
  const pi = await calculatePiParallel(100, 'chudnovsky', 4);
  console.log(pi.toFixed(100));
})();
```

### Parameters

- `digits` (number): Number of decimal places (integer between 1 and 1e6). Default: 100.
- `algorithm` (string): `'machin'`, `'gauss-legendre'`, or `'chudnovsky'`. Default: `'machin'`.
- `threads` (number): Number of worker threads to spawn (integer ≥ 1 and ≤ CPU cores). Default: 1.

### Returns

A `Promise<Decimal>` instance representing π with the specified precision.

## CLI Usage

Calculate π using multiple threads directly from the command line:

```bash
# Default: single-threaded (1 thread)
node src/lib/main.js --digits 1000 --algorithm machin

# Use 4 threads with the Chudnovsky algorithm
node src/lib/main.js --digits 1000 --algorithm chudnovsky --threads 4
```

### Options

- `--digits <n>`: Number of decimal places (1 to 1000000). Default: 100.
- `--algorithm <machin|gauss-legendre|chudnovsky>`: Algorithm to use. Default: `machin`.
- `--threads <n>`: Number of worker threads (≥1, ≤ number of CPU cores). Default: 1.
- `--help`: Show help message.
