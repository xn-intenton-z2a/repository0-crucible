# EMOTICON_OUTPUT Feature

This feature provides random ASCII emoticon output for the CLI application, offering an emotional feedback mechanism.

## CLI Options

- `--list`      : Print all available emoticons, one per line.
- `--seed <n>`  : Use a non-negative integer seed to deterministically select an emoticon.

## Usage Examples

```bash
# Print a single random emoticon
node src/lib/main.js

# Print all emoticons in order
node src/lib/main.js --list

# Print the same emoticon every run with seed 5
node src/lib/main.js --seed 5
```