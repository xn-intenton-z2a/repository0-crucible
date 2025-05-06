# Summary

Enhance the core face generation feature to support colored output in terminals. When the --color flag is provided, each ASCII face will be wrapped in ANSI escape sequences for the selected color, improving readability and visual appeal.

# Specification

- Recognize a new flag --color in the argument parsing logic.
- If --color appears without a following argument or with a value that matches a supported color name, use that color; if no name follows, default to green.
- Supported color names: black, red, green, yellow, blue, magenta, cyan, white.
- Map each supported color to its ANSI CSI code (e.g. red maps to 31, green to 32).
- When color mode is active, wrap each generated face string with:
  • Start sequence: CSI 3Xm where X is the color code.
  • Reset sequence: CSI 0m.
- Preserve existing default behavior when --color is not present: output plain face strings respecting --face, count, --seed, and --category flags.
- Validate the color name; on unsupported names, print descriptive error via errorExit and exit with nonzero status.

# CLI Usage

node src/lib/main.js --face --color
node src/lib/main.js --face 3 --seed 42 --color red
node src/lib/main.js --face --category happy --color blue

# Testing

- Add unit tests in tests/unit/main.test.js or in a new tests/unit/color.test.js:
  • Verify that calling main with --face and --color outputs lines that begin with the correct CSI start sequence and end with the CSI reset sequence.
  • Test default color applies when no color name is supplied.
  • Test each supported color name produces the matching ANSI code.
  • Test that --color does not alter face count, seeding, or category filtering behavior.
  • Test invalid color names cause errorExit with descriptive message and nonzero exit.

# Documentation

- Update README.md under Features to include --color flag with examples.
- Update docs/ASCII_FACES.md to document color flag behavior and list supported names.
- Optionally add docs/COLOR_OUTPUT.md describing ANSI codes and usage scenarios.

# Implementation Details

- In src/lib/main.js extend the argument parsing loop:
  • Detect --color and capture the optional next argument as color name if it does not start with --.
  • Validate the name against the supported list and derive its ANSI code.
- In the face output section inside main and interactiveMode, when printing faces:
  • If color mode is enabled, wrap each face string with the CSI start and reset sequences.
  • Ensure console.log prints the wrapped string.
- Use \u001b[ or \x1b[ prefix for escape sequences, e.g. `\u001b[31m` for red and `\u001b[0m` to reset.
- On invalid color name, invoke errorExit with message listing supported colors.
- Maintain backward compatibility of existing tests and add new tests for color output.