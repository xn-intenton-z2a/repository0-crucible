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

The core script is `src/lib/main.js`, which now supports generating π digit distributions as well as echoing arguments. You can run it directly or via npm scripts.

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

### Digit Distribution

Compute the frequency distribution of the first N π digits (pseudo-π for illustration):

```bash
npm run start -- --digits 1000 --distribution
# Output:
# {"0":100,"1":100,...,"9":100}
```

Or directly:

```bash
node src/lib/main.js --digits 1000 --distribution
# Output:
# {"0":100,"1":100,...,"9":100}
```

## HTTP Server

Start the HTTP server to serve endpoints for distribution analysis:

```bash
npm run serve -- --port 8080
# Output:
# Server listening on port 8080
```

### Distribution Endpoint

Fetch the digit distribution over HTTP:

```bash
curl "http://localhost:8080/distribution?digits=500"
# Response:
# {"digits":500,"distribution":{...}}
```

## NPM Scripts

A selection of useful scripts is available under the `scripts` section of `package.json`. Key scripts include:

| Script          | Description                                                     |
|-----------------|-----------------------------------------------------------------|
| `npm run build` | Placeholder build command (does nothing currently)             |
| `npm run test`  | Run unit tests using Vitest                                   |
| `npm run start` | Invoke the demo CLI without additional flags                   |
| `npm run serve` | Invoke the demo CLI in server mode (`--serve`)                 |
| `npm run linting`       | Run ESLint to check code style                       |
| `npm run formatting`    | Run Prettier to check code formatting                 |

To run any npm script with additional flags, use:

```bash
npm run <script> -- --yourFlag value
```
