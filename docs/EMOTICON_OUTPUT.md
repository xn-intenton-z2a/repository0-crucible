# EMOTICON_OUTPUT Feature

This feature provides random ASCII emoticon output for the CLI application, offering an emotional feedback mechanism.

## Installation

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## CLI Options

- `--config <path>`    : Load a custom emoticon list from a JSON or YAML file (overrides the default list).
- `--diagnostics`      : Output application diagnostics as JSON and exit.
- `--list`           : Print the last result or list all available emoticons with their zero-based index, one per line (format: `0: :)`).
- `--seed <n>`       : Use a non-negative integer seed to deterministically select an emoticon; invalid seeds produce an error and exit code 1.
- `--json`           : Output results in JSON format. Can be combined with `--seed`, `--list`, or `--count`.
- `--count <n>`      : Output multiple emoticons. In plain mode, prints n emoticons, one per line; in JSON mode, outputs a JSON array of n emoticon strings. Can be combined with `--seed` to produce sequential seeded emoticons.
- `--interactive`, `-i` : Launch interactive REPL mode supporting commands `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help`, `-h`     : Display help message and exit with code 0.
- `--version`, `-v`  : Print application version and exit with code 0.

### Environment Variables

- `EMOTICONS_CONFIG` : Path to a JSON or YAML file containing an array of emoticon strings; used when `--config` is not provided.
- `EMOTICONS_DIAGNOSTICS` : When set, triggers diagnostics JSON output when `--diagnostics` is not provided.

## Usage Examples

```bash
# Print a single random emoticon
node src/lib/main.js

# Print all emoticons in order with indices
node src/lib/main.js --list

# Print the same emoticon every run with seed 5
node src/lib/main.js --seed 5

# Error on invalid seed
node src/lib/main.js --seed abc
# Error: Invalid seed: abc

# Output a single random emoticon as JSON
node src/lib/main.js --json

# Seeded JSON emoticon
node src/lib/main.js --json --seed 5

# List all emoticons as JSON array
node src/lib/main.js --json --list

# Load custom emoticon list from JSON
node src/lib/main.js --config fixtures/custom.json

# Load custom emoticon list from YAML via env var
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js --list

# Print multiple random emoticons in plain text
node src/lib/main.js --count 3

# Print multiple random emoticons as JSON
node src/lib/main.js --json --count 2

# Print multiple seeded emoticons starting from seed 5
node src/lib/main.js --seed 5 --count 4
```

## Diagnostics Mode Examples

```bash
# Output diagnostics as JSON
node src/lib/main.js --diagnostics

# Using environment variable
EMOTICONS_DIAGNISTICS=1 node src/lib/main.js
```

### Diagnostics JSON Schema

```json
{
  "version": "string",
  "configSource": "string",
  "emoticonCount": number,
  "isCustomConfig": boolean,
  "colorStyle": null,
  "supportsColorLevel": number
}
```

## Custom Configuration Examples

```bash
# Load custom emoticon list from JSON and display random emoticon
node src/lib/main.js --config fixtures/custom.json

# Load custom emoticon list from JSON and output seeded JSON emoticon
node src/lib/main.js --config fixtures/custom.json --json --seed 2

# Load custom emoticon list from YAML via env var and list emoticons
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js --list
```

## Interactive Mode

Inside the REPL, use:

```text
> random        # Show a random emoticon
> seed 3        # Show emoticon for seed 3
> list          # List all emoticons with indices
> json          # Output last result or list as JSON
> help          # Show help message
> exit          # Exit the session
```

## Programmatic API

You can import the core utilities directly in your code, including the new configuration functions:

```js
import { listFaces, randomFace, seededFace, emoticonJson, configureEmoticons, getEmoticonDiagnostics } from '@xn-intenton-z2a/repository0-crucible';

// List, random, seeded usage
console.log(listFaces());
console.log(randomFace());
console.log(seededFace(3));
console.log(emoticonJson({ mode: 'seeded', seed: 3 }));

// Load custom emoticon list and get diagnostics
const diagnostics = configureEmoticons({ configPath: 'path/to/custom.json' });
console.log(diagnostics);

// Retrieve current diagnostics without side-effects
console.log(getEmoticonDiagnostics());
```