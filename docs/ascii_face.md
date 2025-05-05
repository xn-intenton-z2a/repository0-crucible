# ASCII_FACE Feature

## Description

This CLI application outputs facial expressions using ASCII art with the following modes:

1. **Default/Single Face Mode** (`--face` or no flag): Prints one random ASCII face.
2. **List Faces Mode** (`--list-faces`): Prints all available faces in order, each prefixed with its zero-based index.
3. **List Names Mode** (`--list-names` or `-l`): Prints all available face identifiers sorted alphabetically.
4. **Seed Mode** (`--seed <value>` or `-s <value>`): Uses a seeded pseudo-random generator for deterministic face selection.
5. **Named Mode** (`--name <face>` or `-n <face>`): Prints the specified ASCII face by its name (case-insensitive).
6. **Help Mode** (`--help` or `-h`): Displays this help message and exits.
7. **Diagnostics Mode** (`--diagnostics` or `-d`): Prints runtime and application diagnostics information and exits.

## CLI Options

- `--face`             Print a single random face (default behavior).
- `--list-faces`       List all faces with indices.
- `--list-names`, `-l` List all face identifiers sorted alphabetically.
- `--seed <value>`, `-s <value>`  Select a face deterministically using the provided numeric seed.
- `--name <face>`, `-n <face>`    Print the specified ASCII face by its name (case-insensitive).
- `--help`, `-h`       Show this help message and exit.
- `--diagnostics`, `-d` Show diagnostics information and exit.

## Usage

### Default/Single Face Mode

```bash
repository0-crucible
# or
node src/lib/main.js
```

Prints one random face, for example:
```
(╯°□°）╯
```

### List Faces Mode

```bash
repository0-crucible --list-faces
# or
node src/lib/main.js --list-faces
```

Prints all faces with indices:
```
0: (ಠ_ಠ)
1: (╯°□°）╯
2: (¬_¬)
3: (^_^)/
```

### List Names Mode

```bash
repository0-crucible --list-names
# or
repository0-crucible -l
# or
node src/lib/main.js --list-names
```

Prints all face identifiers alphabetically, for example:
```
frown
smile
surprised
wink
```

### Seed Mode

```bash
repository0-crucible --seed 42
# or
repository0-crucible -s 42
```

Prints a deterministic face, for example:
```
(╯°□°）╯
```

### Named Mode

```bash
repository0-crucible --name frown
# or
repository0-crucible -n smile
```

Prints the specified face, for example:
```
(ಠ_ಠ)
```

### Help Mode

```bash
repository0-crucible --help
# or
repository0-crucible -h
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
--diagnostics, -d      Show diagnostics information and exit
--help, -h             Show this help message and exit
```

### Diagnostics Mode

```bash
repository0-crucible --diagnostics
# or
node src/lib/main.js --diagnostics
```

Prints diagnostic information, for example:
```
Diagnostics:
Node.js version: v20.5.0
Application version: 1.4.0
Face count: 4
Face names: frown, smile, surprised, wink
Dependencies:
- dotenv@16.5.0
- ejs@3.1.10
- js-yaml@4.1.0
- minimatch@9.0.5
- openai@4.96.2
- seedrandom@3.0.5
- zod@3.24.4
```
