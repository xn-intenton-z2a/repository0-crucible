# EMOTICON_OUTPUT Feature

This feature provides random ASCII emoticon output for the CLI application, offering an emotional feedback mechanism.

## CLI Options

- `--list`       : Print all available emoticons with their zero-based index, one per line (format: `0: :)`).
- `--seed <n>`   : Use a non-negative integer seed to deterministically select an emoticon.
- `--json`       : Output results in JSON format.
- `--help`, `-h` : Display help message and exit.

## Usage Examples

```bash
# Print a single random emoticon
node src/lib/main.js

# Print all emoticons in order with indices
node src/lib/main.js --list

# Print the same emoticon every run with seed 5
node src/lib/main.js --seed 5

# Show help information
node src/lib/main.js --help
```

## Error Handling

When an invalid seed is provided (missing, non-integer, negative), the CLI writes an error message to stderr or throws an error with the format:

```
Invalid seed: <input>
```

and exits with a non-zero code.
