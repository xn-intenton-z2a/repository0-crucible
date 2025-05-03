# EMOTICON_OUTPUT Feature

This feature provides random ASCII emoticon output for the CLI application, offering an emotional feedback mechanism.

## Installation

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## CLI Options

- `--config <path>`    : Load a custom emoticon list from a JSON or YAML file (overrides the default list).
- `--list`           : Print all available emoticons with their zero-based index, one per line (format: `0: :)`).
- `--seed <n>`       : Use a non-negative integer seed to deterministically select an emoticon; invalid seeds produce an error and exit code 1.
- `--json`           : Output results in JSON format. Can be combined with `--seed` or `--list`.
- `--interactive`, `-i` : Launch interactive REPL mode supporting commands `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help`, `-h`     : Display help message and exit with code 0.
- `--version`, `-v`  : Print application version and exit with code 0.

### Environment Variable

- `EMOTICONS_CONFIG` : Path to a JSON or YAML file containing an array of emoticon strings; used when `--config` is not provided.

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
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js

# Start interactive REPL session
node src/lib/main.js --interactive
# or
node src/lib/main.js -i
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

You can import the core utilities directly in your code:

```js
import { listFaces, randomFace, seededFace, emoticonJson } from '@xn-intenton-z2a/repository0-crucible';

console.log(listFaces());
// [":)",":-(",":D",...]

console.log(randomFace());
// e.g. ":D"

console.log(seededFace(3));
// e.g. "(¬_¬)"

console.log(emoticonJson({ mode: 'seeded', seed: 3 }));
// { face: "(¬_¬)", mode: "seeded", seed: 3 }
```