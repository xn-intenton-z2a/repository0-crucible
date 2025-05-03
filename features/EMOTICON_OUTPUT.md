# Overview

Implement a new CLI feature that outputs random facial expressions using ASCII art. This feature realizes the mission of providing emotional feedback in the form of ASCII emoticons.

# Behavior

When the user runs the CLI without arguments, the tool selects one ASCII face at random from an internal library and prints it to standard output.

# CLI Options

--list       Print all available ASCII faces with an index and exit successfully
--seed <n>   Use a numeric seed to deterministically select a face
--help       Display usage information

# Implementation Details

- In src/lib/main.js, define an array of ASCII face strings.
- Use a random number generator (Math.random or a seeded variant when --seed is provided) to pick an index.
- Handle --list by iterating over faces and printing each with its index.
- Validate the seed argument is a non-negative integer; on invalid seed, show error and exit with code >0.
- Ensure main(args) returns nothing and only writes to console.

# Tests

- Add tests in tests/unit/main.test.js to verify:
  - Running with no args prints one of the known faces without error
  - --list prints all faces in order
  - --seed N produces a consistent face across runs
  - Invalid seed argument exits with an error

# Documentation

- Update README.md to describe the new CLI options and show example usage.
- Add a section in Usage with examples for random, list, and seed modes.