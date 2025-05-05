# ASCII_FACE Feature

## Description

This CLI application outputs facial expressions using ASCII art with the following modes:

1. **Default/Single Face Mode** (`--face` or no flag): Prints one random ASCII face.
2. **List Mode** (`--list-faces`): Prints all available faces in order, each prefixed with its zero-based index.
3. **Seed Mode** (`--seed <value>` or `-s <value>`): Uses a seeded pseudo-random generator for deterministic face selection.
4. **Named Mode** (`--name <face>` or `-n <face>`): Prints the specified ASCII face by name (case-insensitive).
5. **List Names Mode** (`--list-names` or `-l`): Prints all available face identifiers sorted alphabetically.
6. **Help Mode** (`--help` or `-h`): Displays this help message and exits.

## CLI Options

- `--face`             Print a single random face (default behavior).
- `--list-faces`       List all faces with indices.
- `--seed <value>`, `-s <value>`     Select a face deterministically using the provided numeric seed.
- `--name <face>`, `-n <face>`       Print the specified ASCII face by its name (case-insensitive).
- `--list-names`, `-l`               List all face identifiers sorted alphabetically.
- `--help`, `-h`                      Show this help message and exit.

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

### Named Mode

```bash
node src/lib/main.js --name frown
# or
node src/lib/main.js -n smile
```

Prints the specified face, for example:
```
(ಠ_ಠ)
```

### List Names Mode

```bash
node src/lib/main.js --list-names
# or
node src/lib/main.js -l
```

Prints all face identifiers alphabetically, for example:
```
frown
smile
surprised
wink
```

### Help Mode

```bash
node src/lib/main.js --help
# or
node src/lib/main.js -h
```

Displays usage information, for example:
```
Usage: repository0-crucible [options]

Options:
--face                 Print a single random ASCII face (default behavior)
--list-faces           List all available ASCII faces with indices
--list-names, -l       List all available face identifiers sorted alphabetically
--seed <value>, -s <value>     Select a face deterministically using the provided numeric seed
--name <face>, -n <face>       Print the specified ASCII face by its name (case-insensitive)
--help, -h            Show this help message and exit
```

## Error Conditions

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

- Missing face name in named mode:
```bash
node src/lib/main.js --name
```
Prints: `Error: '--name' requires a face name.` and exits with code 1.

- Invalid face name in named mode:
```bash
node src/lib/main.js --name foo
```
Prints: `Error: 'foo' is not a valid face name.` and exits with code 1.
