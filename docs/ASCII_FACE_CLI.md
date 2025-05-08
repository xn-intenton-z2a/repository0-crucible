# ASCII Face CLI

## Overview

`ASCII_FACE_CLI` is a CLI tool that outputs random ASCII art facial expressions. It provides options to control the output.

## Usage

```
node src/lib/main.js [--list] [--count <n>] [--seed <num>] [--help]
```

### Options

- `--list`: List all available faces.
- `--count <n>`: Print `n` random faces (default is 1).
- `--seed <num>`: Seed the random number generator for deterministic output.
- `--help`: Show usage instructions.

## Examples

Default (one random face):

```bash
$ node src/lib/main.js
(^_^)
```

List all faces:

```bash
$ node src/lib/main.js --list
(^_^)
(>_<)
(o_o)
(¬_¬)
(^.^)
(-_-)
(T_T)
(^3^)
```

Count:

```bash
$ node src/lib/main.js --count 3
(-_-)
(>_<)
(^.^)
```

Seed:

```bash
$ node src/lib/main.js --seed 42 --count 3
(o_o)
(¬_¬)
(^3^)
```

Exit Codes:

- `0` on success.
- Non-zero on invalid options.
