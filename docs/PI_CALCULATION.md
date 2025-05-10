# PI Calculation Feature

This documentation describes how to calculate π to arbitrary precision using this library's CLI or programmatic API.

## Programmatic API

Import and invoke the `calculatePi` function:

```js
import { calculatePi } from '@xn-intenton-z2a/repository0-crucible/src/lib/main.js';

(async () => {
  // Calculate π to 50 decimal places using Machin algorithm
  const pi = await calculatePi(50, 'machin');
  console.log(pi.toFixed(50));
})();
```

### Parameters

- `digits` (number): Number of decimal places (integer between 1 and 1e6). Default: 100.
- `algorithm` (string): `'machin'` or `'gauss-legendre'`. Default: `'machin'`.

### Returns

A Decimal.js instance representing π with the specified precision.

## CLI Usage

Calculate π directly from the command line:

```bash
# Default: 100 decimal places, machin algorithm
node src/lib/main.js

# Specify digits and algorithm
node src/lib/main.js --digits 20 --algorithm gauss-legendre
```

### Options

- `--digits <n>`: Number of decimal places (1 to 1000000). Default: 100.
- `--algorithm <machin|gauss-legendre>`: Algorithm to use. Default: `machin`.
- `--help`: Show help message.

## Examples

```bash
# 5 decimal places
node src/lib/main.js --digits 5
# Output: 3.14159

# 10 decimal places, Gauss-Legendre algorithm
node src/lib/main.js --digits 10 --algorithm gauss-legendre
# Output: 3.1415926535
```

## Error Handling

Invalid inputs result in descriptive error messages printed to stderr and a non-zero exit code. For example:

```bash
node src/lib/main.js --digits 0
# stderr: Invalid digits '0'. Must be integer between 1 and 1000000.
```