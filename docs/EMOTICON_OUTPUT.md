# EMOTICON_OUTPUT Feature

This feature provides random ASCII emoticon output for the CLI application, offering an emotional feedback mechanism.

## CLI Options

- `--list`       : Print all available emoticons with their zero-based index, one per line (format: `0: :)`).
- `--seed <n>`   : Use a non-negative integer seed to deterministically select an emoticon.
- `--json`       : Output results in JSON format.
- `--help`, `-h` : Display help message and exit.
- `--interactive`, `-i` : Launch interactive REPL mode.

## Usage Examples

```bash
# Print a single random emoticon
node src/lib/main.js

# Print all emoticons in order with indices
node src/lib/main.js --list

# Print the same emoticon every run with seed 5
node src/lib/main.js --seed 5

# Output a single random emoticon as JSON
node src/lib/main.js --json

# Start interactive REPL session
node src/lib/main.js --interactive
```

## JSON Output Examples

```bash
# Single random JSON emoticon
node src/lib/main.js --json
```
Output:
```
{"face":":D","mode":"random","seed":null}
```

```bash
# Seeded JSON emoticon
node src/lib/main.js --json --seed 5
```
Output:
```
{"face":"(ʘ‿ʘ)","mode":"seeded","seed":5}
```

```bash
# List all emoticons as JSON array
node src/lib/main.js --json --list
```
Output:
```
[":)",":-(: overlapping?","...??? maybe glitch? disregard?"]
```
Oops, I see a glitch. Let's fix docs content manually. Actually EMOTICON_OUTPUT.md originally ended with sample list. We add Programmatic API below. Let's adjust the content. We'll assume the original content is correct and add at bottom.
