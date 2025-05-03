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
[":)",":-",":D","(¬_¬)","(＾◡＾)","(ʘ‿ʘ)","(¬‿¬)","ಠ_ಠ","^_^"]
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

## Interactive Mode

Launch an interactive REPL to explore emoticon commands:

```bash
node src/lib/main.js --interactive
```

The REPL supports navigation through previous commands using the up and down arrow keys.

Available commands:
- `random` or empty input: Show a random emoticon.
- `seed <n>`: Show the emoticon for seed `n` deterministically.
- `list`: List all emoticons with indices.
- `json`: Output the last result (single emoticon or list) as JSON.
- `help`: Display this help message.
- `exit` or `Ctrl+C`: Exit the REPL session.

### Sample Interactive Session

```
> random
:-)
> seed 2
:D
> json
{"face":":D","mode":"seeded","seed":2}
> list
0: :)
1: :-(
...
> help
Available commands:
  random        Show a random emoticon
  seed <n>      Show emoticon for seed n
  list          List all emoticons with indices
  json          Output last result as JSON
  help          Show this help message
  exit          Exit the REPL
> exit
```