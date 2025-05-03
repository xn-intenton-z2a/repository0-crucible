# EMOTICON_OUTPUT Feature

This feature provides random ASCII emoticon output for the CLI application, offering an emotional feedback mechanism.

## CLI Options

- `--list`      : Print all available emoticons with their zero-based index, one per line (format: `0: :)`).
- `--seed <n>`  : Use a non-negative integer seed to deterministically select an emoticon.

## Usage Examples

```bash
# Print a single random emoticon
node src/lib/main.js

# Print all emoticons in order with indices
node src/lib/main.js --list
# Output:
# 0: :)
# 1: :-(
# 2: :D
# 3: (¬_¬)
# 4: (＾◡＾)
# 5: (ʘ‿ʘ)
# 6: (¬‿¬)
# 7: ಠ_ಠ
# 8: ^_^

# Print the same emoticon every run with seed 5
node src/lib/main.js --seed 5
```

## Error Handling

When an invalid seed is provided (missing, non-integer, negative), the CLI writes an error message to stderr or throws an error with the format:

```
Invalid seed: <input>
```

and exits with a non-zero code.
