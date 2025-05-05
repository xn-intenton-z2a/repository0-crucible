# ASCII_FACE Feature

## Description

The CLI application outputs facial expressions using ASCII art in various modes.

## CLI Options

- `--face` (default)
  Print a single random ASCII face.

- `--list-faces`
  List all available faces with zero-based indices.

- `--list-names`, `-l`
  List all available face identifiers sorted alphabetically.

- `--seed <value>`, `-s <value>`
  Select a face deterministically using the provided numeric seed. An empty seed string (`""`) falls back to random selection.

- `--count <number>`, `-c <number>`
  Specify how many faces to print (must be positive integer).

- `--name <face>`, `-n <face>`
  Print the specified ASCII face by its name (case-insensitive).

- `--help`, `-h`
  Show usage information and exit.

- `--diagnostics`, `-d`
  Show runtime and application diagnostics information and exit.

## Usage Examples

### Default / Single Face Mode

```bash
$ repository0-crucible
<random face>
```

Example:
```
$ repository0-crucible
(╯°□°）╯
```

### List Faces Mode

```bash
$ repository0-crucible --list-faces
```

Example:
```
0: (ಠ_ಠ)
1: (╯°□°）╯
2: (¬_¬)
3: (^_^)/
```

### List Names Mode

```bash
$ repository0-crucible --list-names
```

Or with alias:
```
$ repository0-crucible -l
```

Example:
```
frown
smile
surprised
wink
```

### Seed Mode

```bash
$ repository0-crucible --seed 42
```

Or with alias:
```
$ repository0-crucible -s 42
```

Example:
```
(¬_¬)
```

Deterministic with same seed:
```
$ repository0-crucible --seed 1
(ಠ_ಠ)
$ repository0-crucible -s 1
(ಠ_ಠ)
```

Empty seed:
```
$ repository0-crucible --seed ""
<random face>
```

### Batch Mode (Multiple Faces)

```bash
$ repository0-crucible --count 3
```

Example:
```
(¬_¬)
(ಠ_ಠ)
(^_^)/
```

Combining seed and count:
```bash
$ repository0-crucible --seed 2 --count 3
```

Example:
```
(╯°□°）╯
(¬_¬)
(ಠ_ಠ)
```

### Named Mode

```bash
$ repository0-crucible --name frown
```

Or with alias:
```
$ repository0-crucible -n surprised
```

Example:
```
(ಠ_ಠ)
```

### Help Mode

```bash
$ repository0-crucible --help
```

Or with alias:
```
$ repository0-crucible -h
```

Displays:
```
Usage: repository0-crucible [options]

Options:
... (help listing)
```

### Diagnostics Mode

```bash
$ repository0-crucible --diagnostics
```

Or with alias:
```
$ repository0-crucible -d
```

Example:
```
Diagnostics:
Node.js version: v<version>
Application version: <version>
Face count: <number>
Face names: <names>
Dependencies:
- <package>@<version>
...
```
