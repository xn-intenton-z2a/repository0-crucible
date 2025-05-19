# Usage Guide

This document describes how to interact with the demo CLI and available npm scripts provided in `repository0-crucible`.

## Prerequisites

- Node.js (v20 or later)
- npm

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/xn-intenton-z2a/repository0-crucible.git
cd repository0-crucible
npm install
```

## Demo CLI

The core script is `src/lib/main.js`, which currently logs the arguments passed to it. You can run it directly or via npm scripts.

### Running without Arguments

```bash
npm run start
# Output:
# Run with: []
```

### Passing Arguments

```bash
npm run start -- --foo bar baz
# Output:
# Run with: ["--foo","bar","baz"]
```

Or directly:

```bash
node src/lib/main.js arg1 arg2
# Output:
# Run with: ["arg1","arg2"]
```

## NPM Scripts

A selection of useful scripts is available under the `scripts` section of `package.json`. Key scripts include:

| Script          | Description                                          |
|-----------------|------------------------------------------------------|
| `npm run build` | Placeholder build command (does nothing currently)   |
| `npm run test`  | Run unit tests using Vitest                         |
| `npm run start` | Invoke the demo CLI without additional flags         |
| `npm run serve` | Invoke the demo CLI with a `--serve` flag            |
| `npm run linting`       | Run ESLint to check code style                 |
| `npm run formatting`    | Run Prettier to check code formatting         |

To run any npm script with additional flags, use:

```bash
npm run <script> -- --yourFlag value
```

## Further Development

This template is intended to be extended with real functionality. Future enhancements might include:

- Support for computing π to arbitrary precision.
- HTTP endpoints for serving π data and visualizations.
- Plugin system for adding new algorithms and features.

Contributions to expand these areas are welcome. Please consult [CONTRIBUTING.md](../CONTRIBUTING.md) for details.