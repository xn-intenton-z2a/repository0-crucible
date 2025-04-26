# Usage Guide

This document covers both CLI and programmatic usage for `repository0-crucible`.

## CLI Usage

The tool logs any arguments you pass and prints them as a JSON array.

### Commands

- `npm run start` or `node src/lib/main.js`
  - Runs with no arguments: logs `Run with: []`.
- `npm run start -- [args...]` or `node src/lib/main.js [args...]`
  - Pass any arguments after `--` (npm) or directly (node) to see them logged.

#### Examples

```bash
# No arguments
npm run start
# => Run with: []

# Passing arguments
npm run start -- alpha beta gamma
# => Run with: ["alpha","beta","gamma"]
```

## Programmatic API

You can import and invoke the main function in your own code:

```js
import { main } from '@xn-intenton-z2a/repository0-crucible';

// Pass an array of strings; output will be logged to console
main(['foo', 'bar']);
```

### Parameters

- `args: string[]` — Array of command-line arguments to log.

### Behavior

The `main` function logs: `Run with: ${JSON.stringify(args)}`.

## Next Steps

Refer to the [Incremental Changes Plan](./README.md#incremental-changes-plan) for upcoming enhancements and features in this library.