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
  Use a numeric seed for deterministic face selection.  
  An empty seed string (`""`) falls back to random selection.

- `--name <face>`, `-n <face>`  
  Print the specified ASCII face by its name (case-insensitive).

- `--help`, `-h`  
  Show usage information and exit.

- `--diagnostics`, `-d`  
  Show runtime and application diagnostics and exit.

## Usage Examples

### Default / Single Face Mode

```
$ repository0-crucible
<face>
```

Example:
```
$ repository0-crucible
(╯°□°）╯
```

### List Faces Mode

```
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

```
$ repository0-crucible --list-names
```

Or with alias `-l`:
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

```
$ repository0-crucible --seed 42
```

Or with alias `-s`:
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

### Named Mode

```
$ repository0-crucible --name frown
```

Or with alias `-n`:
```
$ repository0-crucible -n surprised
```

Example:
```
(¬_¬)
```

### Help Mode

```
$ repository0-crucible --help
```

Or with alias `-h`:
```
$ repository0-crucible -h
```

Displays:
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

```
$ repository0-crucible --diagnostics
```

Or with alias `-d`:
```
$ repository0-crucible -d
```

Example:
```
Diagnostics:
Node.js version: v20.5.0
Application version: 1.4.0
Face count: 4
Face names: frown, smile, surprised, wink
Dependencies:
- seedrandom@3.0.5
- dotenv@16.5.0
- ejs@3.1.10
- js-yaml@4.1.0
- minimatch@9.0.5
- openai@4.96.2
- zod@3.24.4
```

## Error Conditions

- Missing or non-numeric seed:

```
$ repository0-crucible --seed
Error: seed value must be a number.

$ repository0-crucible -s foo
Error: seed value must be a number.
```

- Invalid face name:

```
$ repository0-crucible --name foo
Error: 'foo' is not a valid face name.
```

- Unknown flags:

```
$ repository0-crucible --unknown
Error: unknown flag '--unknown'.
```