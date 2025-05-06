# Summary

Introduce an interactive REPL mode that lets users generate and explore ASCII faces without restarting the CLI for each command. In interactive mode users can run commands such as `face`, `list-faces`, `list-categories`, `category`, `custom`, `merge-custom`, and `exit` in a live session.

# Specification

- New flag `--interactive` starts an interactive prompt using Node’s readline module.
- Prompt on each line for commands. Supported commands:
  - `face [count] [--seed <seed>]` to generate 1 or more faces with optional seed.
  - `list-faces [--category <category>]` to list available faces or filter by category.
  - `list-categories` to show valid categories.
  - `category <name>` to set a default category filter for subsequent commands.
  - `custom <path> [--merge]` to load or merge a custom faces file for the current session.
  - `help` to display available commands and usage.
  - `exit` or `quit` to leave interactive mode.
- Session state retains defaults: last category, custom file path and merge setting, and seed if set.
- Each command runs the same logic as the corresponding CLI flags but prints results inline.
- Invalid commands or parameters print a descriptive error but remain in the session.

# CLI Usage

node src/lib/main.js --interactive

At prompt:
> face 3 --seed 42
( outputs three faces )
> list-categories
happy
sad
angry
playful
surprise
> category playful
Default category set to playful
> face
( outputs one playful face )
> exit

# Testing

- Add tests in tests/unit/main.test.js to simulate interactive sessions by mocking stdin and stdout.
- Verify that entering `face`, `list-faces`, and `list-categories` prints valid output and continues the session.
- Test `category` command sets the default filter and affects subsequent `face` and `list-faces` commands.
- Test invalid commands produce errors but do not exit the REPL.
- Test `custom <path>` and `custom <path> --merge` load and merge custom faces correctly in session.
- Test `exit` or `quit` terminates the session cleanly.

# Documentation

- Update README.md under Features to document `--interactive`, describe commands, and show example sessions.
- Add section in docs/INTERACTIVE_MODE.md explaining REPL usage, command syntax, and session state behavior.

# Implementation Details

- In src/lib/main.js detect `--interactive` before other flags. If present:
  - Use Node’s `readline.createInterface` on process.stdin and process.stdout.
  - Maintain a session object for default options (count, seed, category, custom settings).
  - On each line, parse the command string into arguments and invoke the existing `main` logic or refactored functions without exiting process. Capture output and errors.
  - Handle `help` and `exit` commands specially. On `exit` or `quit`, close the readline interface and return.
  - Ensure errors from parsing or command execution are caught and printed but do not exit the session.
- Refactor `main` to expose lower-level face generation and listing functions to reuse in REPL mode.
- Maintain consistent exit codes and error messages in non-interactive mode.