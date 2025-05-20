# Compute Pi Feature

This CLI command computes π (pi) to a specified number of decimal places using high-precision arithmetic.

## Synopsis

Compute π with a Machin-like formula and output the result to the console.

## CLI Usage

```bash
node src/lib/main.js --compute-pi <digits>
```

- `<digits>`: Positive integer indicating how many decimal places to calculate.

### Examples

```bash
# Compute π to 5 decimal places
node src/lib/main.js --compute-pi 5
# Output:
3.14159
```

## API

```js
import { computePi } from "@xn-intenton-z2a/repository0-crucible";

const pi5 = computePi(5); // "3.14159"
```

### computePi(digits: number): string

- **digits**: A positive integer for the number of decimal places.
- **returns**: String representation of π to the requested precision.
- **throws**: Error if `digits` is not a positive integer.
