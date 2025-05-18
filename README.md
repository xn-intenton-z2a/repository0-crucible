# repository0-crucible

A CLI tool and JavaScript library for calculating π to configurable precision using different algorithms, with optional performance benchmarking and PNG visualization.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Usage

You can invoke the CLI directly with Node.js:

```bash
node src/lib/main.js [options]
```

### Options

- `--digits, -d <number>`  
  Total significant digits to display (integer ≥ 1). Default: `100`.

- `--algorithm, -a <leibniz|spigot|montecarlo>`  
  Algorithm to use for π approximation. Default: `leibniz`.

- `--benchmark, -b`  
  Enable performance benchmarking; prefixes output with execution time. Default: `false`.

- `--output-format, -f <text|png>`  
  Output format. `text` prints digits to console; `png` writes a PNG image. Default: `text`.

- `--output, -o <file>`  
  Output file path when using PNG format. Default: `pi.png`.

- `--help, -h`  
  Display usage information and exit.

### Examples

#### Text Output

```bash
node src/lib/main.js --digits 5 --algorithm spigot --output-format text
# Output:
3.1415
```

#### PNG Output

```bash
node src/lib/main.js --digits 20 --output-format png --output mypi.png
# Writes 'mypi.png' with the π digits rendered on a monospaced canvas
```

#### Benchmarking

```bash
node src/lib/main.js --digits 10 --benchmark
# Output example:
[Benchmark] Execution time: 12ms 3.141592653
```

#### Help

```bash
node src/lib/main.js --help
```

## Features

- Customizable precision (`--digits`, `-d`)
- Algorithm selection (`--algorithm`, `-a`: leibniz, spigot, montecarlo)
- Performance benchmarking (`--benchmark`, `-b`)
- Text and PNG output formats (`--output-format`, `-f` and `--output`, `-o`)

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the Apache-2.0 License. See [LICENSE](./LICENSE) for details.
