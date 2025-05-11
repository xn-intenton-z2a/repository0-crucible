# repository0-crucible

A CLI tool and JavaScript library for calculating π (pi) to a specified number of decimal places.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## CLI Usage

Use the `main` script to calculate π:

```bash
node src/lib/main.js [options]
```

Options:

- `--digits <n>`: Number of decimal places to calculate (integer, default: 10, max: 1000)
- `--help`, `-h`: Show help information

Examples:

```bash
# Default: 10 decimal places
node src/lib/main.js
# -> 3.1415926536

# Specify digits
node src/lib/main.js --digits 5
# -> 3.14159

# Rounding behavior
node src/lib/main.js --digits 3
# -> 3.142
```

## Features

- Calculate π to up to 1000 decimal places using a Machin-like formula with BigInt precision and correct rounding.
- Validates input and provides errors for invalid or out-of-range values.

## Contributing

Contributions are welcome! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

Released under the Apache-2.0 License. See [LICENSE](./LICENSE) for details.
