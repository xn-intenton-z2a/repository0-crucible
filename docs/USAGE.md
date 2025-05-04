# Usage

## Installation

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Commands

```bash
node src/lib/main.js [--count N] [--category CATEGORY] [--seed S] [--help]
```

### Options

- `--count`, `-c`: number of faces to display (default: `1`)
- `--category`, `-C`: emotion category (`happy`, `sad`, `angry`, `surprised`, `all`) (default: `all`)
- `--seed`, `-s`: nonnegative integer seed for reproducible output
- `--help`, `-h`: show this help message

### Examples

```bash
# Display a single random face
node src/lib/main.js

# Display three happy faces
node src/lib/main.js --count 3 --category happy

# Display two faces from any category with seed for reproducibility
node src/lib/main.js --count 2 --seed 42

# Display five sad faces with a specific seed
node src/lib/main.js --count 5 --category sad --seed 100
```