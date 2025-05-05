# ASCII_FACE Feature

## Description

This CLI application outputs facial expressions using ASCII art with the following modes:

1. **Default/Single Face Mode** (`--face` or no flag): Prints one random ASCII face.
2. **List Mode** (`--list-faces`): Prints all available faces in order, each prefixed with its zero-based index.
3. **Seed Mode** (`--seed <value>` or `-s <value>`): Uses a seeded pseudo-random generator for deterministic face selection.

## CLI Options

- `--face`             Print a single random face (default behavior).
- `--list-faces`       List all faces with indices.
- `--seed <value>`, `-s <value>`     Select a face deterministically using the provided numeric seed.

## Usage

### Default/Single Face Mode

```bash
node src/lib/main.js
# or
repository0-crucible
```

### List Mode

```bash
node src/lib/main.js --list-faces
```

### Seed Mode

```bash
node src/lib/main.js --seed 42
# or
node src/lib/main.js -s 42
```

Prints a deterministic face, for example:
```
(╯°□°）╯
```

### Error Conditions

- Non-numeric or missing seed:
```bash
node src/lib/main.js --seed foo
node src/lib/main.js -s 
```
Prints: `Error: seed value must be a number.` and exits with code 1.

- Unknown flag:
```bash
node src/lib/main.js --unknown
```
Prints: `Error: unknown flag '--unknown'` and exits with code 1.
