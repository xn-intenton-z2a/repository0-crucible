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

# Output a single random emoticon as JSON
node src/lib/main.js --json

# Output help information
node src/lib/main.js --help
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
[":)",":-(",":D","(¬_¬)","(＾◡＾)","(ʘ‿ʘ)","(¬‿¬)","ಠ_ಠ","^_^"]
```

## Error Handling in JSON Mode

On invalid seed, the CLI prints an error JSON to stderr and exits with code 1:

```bash
node src/lib/main.js --json --seed abc
```
Stderr:
```
{"error":"Invalid seed. Seed must be a non-negative integer."}
```
