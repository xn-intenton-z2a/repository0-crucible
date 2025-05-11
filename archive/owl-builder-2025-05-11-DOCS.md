docs/PI_CALCULATOR.md
# docs/PI_CALCULATOR.md
# π Calculator CLI

Compute the value of π (pi) to a specified number of decimal places using selectable algorithms.

## Usage

```bash
node src/lib/main.js [--digits <n>] [--algorithm <name>]
```

Options:

- **--digits**, **-d** `<n>`  : Number of decimal places (integer ≥ 1). Default: `10`.
- **--algorithm**, **-a** `<name>` : Algorithm to use. Options: `leibniz`, `nilakantha`, `machin`. Default: `leibniz`.

## Examples

Compute π with 15 decimal places using the default (Leibniz) algorithm:

```bash
node src/lib/main.js --digits 15
# -> 3.141592653589793
```

Compute π with 20 decimal places using Machin's formula:

```bash
node src/lib/main.js --algorithm machin --digits 20
# -> 3.14159265358979323846
```

Default behavior (no flags) outputs 10 decimal places using Leibniz:

```bash
node src/lib/main.js
# -> 3.1415926536
```

## Invalid Input Handling

- If `--digits` is non-integer or less than 1, a warning is emitted to stderr and the default of 10 is used.
- If `--algorithm` is not recognized, a warning is emitted to stderr and the default `leibniz` is used.
