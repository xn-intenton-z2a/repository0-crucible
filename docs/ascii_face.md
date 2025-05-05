# ASCII_FACE Feature

## Description

This CLI application outputs facial expressions using ASCII art with the following modes:

1. **Default/Single Face Mode** (`--face` or no flag): Prints one random ASCII face.
2. **List Mode** (`--list-faces`): Prints all available faces in order, each prefixed with its zero-based index.
3. **Seed Mode** (`--seed <value>`): Uses a seeded pseudo-random generator for deterministic face selection.

## CLI Options

- `--face`             Print a single random face (default behavior).
- `--list-faces`       List all faces with indices.
- `--seed <value>`     Select a face deterministically using the provided numeric seed.

## Usage

### Default/Single Face Mode

```bash
node src/lib/main.js
# or
repository0-crucible
```
Prints one random face, e.g.:
```
(¬_-_¬)
``` (one of the faces)

### Explicit Face Mode

```bash
node src/lib/main.js --face
```

### List Mode

```bash
node src/lib/main.js --list-faces
```

Prints all face entries:
```
0: (ಠ_ಠ)
1: (╯°□°）╯
2: (¬_¬)
3: (^_^)/
```

### Seed Mode

```bash
node src/lib/main.js --seed 1
```

Prints a deterministic face for the given seed, e.g.:
```
(╯°□°）╯
```

### Error Conditions

- Non-numeric or missing seed:
  ```bash
  node src/lib/main.js --seed foo
  ```
  Prints: `Error: seed value must be a number.` and exits with code 1.

- Unknown flag:
  ```bash
  node src/lib/main.js --unknown
  ```
  Prints: `Error: unknown flag '--unknown'` and exits with code 1.
