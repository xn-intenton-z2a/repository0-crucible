# EMOTICON_OUTPUT Feature

# Overview
Provide a unified CLI mode for outputting ASCII emoticons in plain text, JSON formats, and an interactive REPL session. This feature realizes the mission of offering emotional feedback through a robust command-line interface that supports on-demand exploration and scripted workflows alike.

# Behavior
When invoked without flags:
- Select one emoticon at random and print it as plain text.

With the `--seed <n>` flag:
- Validate that n is a non-negative integer.
- Compute index as n modulo the number of emoticons and print the selected emoticon as plain text.
- On invalid seed, print an error message and exit with a nonzero status code.

With the `--list` flag:
- Print all available emoticons, one per line in their defined order.

With the `--json` flag (can be combined with `--seed` or `--list`):
- If alone, pick a random emoticon and emit a single-line JSON object: { face, mode, seed } where mode is random and seed is null.
- If combined with `--seed <n>`, emit mode seeded and include the seed value.
- If combined with `--list`, emit a JSON array of all emoticon strings.
- On invalid seed, emit an error JSON or text and exit with a nonzero status code.

# Interactive Mode
With the `--interactive` (or `-i`) flag:
- Launch an interactive REPL using Node’s readline interface.
- Present a prompt `> ` where users can enter commands:
  - `random` or empty input: show a new random emoticon.
  - `seed <n>`: show the deterministically selected emoticon for seed n.
  - `list`: print all emoticons with indices.
  - `json`: output the last result or list in JSON format.
  - `help`: display available commands.
  - `exit` or `Ctrl+C`: quit the REPL.
- Maintain history and support up/down arrow navigation.

# CLI Options
--list           List all available ASCII emoticons in order.
--seed <n>       Provide a non-negative integer seed for deterministic selection.
--json           Output results in JSON format.
--interactive, -i  Start an interactive REPL shell for on-demand emoticon exploration.
--help, -h       Show help message and exit.

# Implementation Details
In src/lib/main.js:
- Detect `--interactive` or `-i` early in main(args).
- If present, initialize a readline.Interface with process.stdin and process.stdout.
- On each `line` event, parse the input and invoke existing selection and listing logic, then output accordingly.
- Support command history and handle `SIGINT` to exit cleanly.
- Refactor selection logic into reusable functions that return an emoticon or JSON object so CLI, HTTP, and REPL can share implementations.

# Tests
In tests/unit/main.test.js:
- Mock readline.createInterface to simulate user commands and verify console.log outputs for each REPL command.
- Test that `--interactive` mode starts the REPL and responds correctly to `random`, `seed`, `list`, `json`, and `help` commands.
- Ensure invalid seed commands produce an error message without crashing the session.

# Documentation
Update README.md to describe interactive mode and provide usage examples:
- Starting REPL: `node src/lib/main.js --interactive`
- Sample session:
  > random
  :-)
  > seed 5
  (＾◡＾)
  > json
  {"face":"(＾◡＾)","mode":"seeded","seed":5}
  > list
  0: :)
  1: :-(
  …
  > exit
