# Summary
Implement core functionality to output random ASCII facial expressions via the CLI. This feature will fulfill the mission of providing emotional feedback for an AI by selecting and printing a random face from a built-in set.

# Behavior
The main entrypoint will generate and display one or more ASCII faces based on optional CLI parameters. The faces will be drawn from an array of at least ten distinct patterns defined in the source.

# CLI Interface
- No arguments: display a single random face.
- seed <number>: use the provided integer seed to select a deterministic face.
- count <n>: display n faces in sequence, one per invocation line.
- help: show usage instructions and parameter descriptions.

# Source Changes
- In src/lib/main.js, replace the placeholder console log with a face generator module.
- Define an array of ASCII art faces in the same file or a submodule.
- Parse process.argv for seed, count, and help options.
- Use a simple pseudo-random function seeded when seed is provided, otherwise use Math.random.
- Loop count times to print faces.

# Tests
- In tests/unit/main.test.js, add tests to verify that:
  - The default invocation outputs exactly one face line oriented with parentheses or characters typical of a face.
  - Using seed produces consistent output across calls.
  - count 3 produces three lines of output.
  - help prints the usage block without error.

# Documentation
- Update README.md under Features to describe ASCII_FACE_OUTPUT.
- In Usage, include examples of invoking the CLI with no arguments, with seed 42, and with count 5.
- Add a brief description of the face set maintained by the library.

# Dependencies and Files
- No new dependencies required. All logic lives in src/lib/main.js.
- Ensure package.json scripts start, serve, and diagnostics still function and reflect the new CLI behavior.
