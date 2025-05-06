# ASCII Face Generator CLI

This CLI generates and displays random ASCII faces with emotive expressions.

## Flags

- `--random`: Output a random face (default).
- `--seed <number>`: Seed the generator for deterministic face selection.
- `--list`: Display all available faces with their indices and labels in JSON format.

## Examples

- Random face:

```bash
node src/lib/main.js --random
```

- Deterministic face:

```bash
node src/lib/main.js --seed 42
```

- List faces:

```bash
node src/lib/main.js --list
```