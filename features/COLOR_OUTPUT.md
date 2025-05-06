# Summary

Add colored output support to enhance the visual appeal of ASCII faces by wrapping them in ANSI escape sequences when a color flag is provided.

# Specification

- Recognize a new CLI flag --color optionally followed by a color name.
- Supported color names: black, red, green, yellow, blue, magenta, cyan, white.
- If --color appears without a name, default to green.
- Validate the provided name; on unsupported names print a descriptive error and exit with nonzero status.
- Map each supported name to its ANSI CSI code (for example, red → 31, green → 32).
- When color output is enabled, wrap each generated face string with:
  • Start: CSI code for the chosen color (for instance, \u001b[31m for red)
  • Reset: CSI reset sequence \u001b[0m
- Preserve existing face generation thresholds, filtering, and session behaviors when color mode is not used.

# CLI Usage

node src/lib/main.js --face --color
node src/lib/main.js --face 3 --seed 42 --color red
node src/lib/main.js --list-faces --color blue

# Testing

- Add tests in tests/unit/color.test.js to cover:
  • Invoking main with --face and --color yields lines starting with the correct CSI start sequence and ending with reset sequence.
  • Default color green applies when no color name follows --color.
  • Each supported color name produces the matching ANSI code.
  • Color flag does not affect face count, seed reproducibility, or category filtering.
  • Invalid color names cause errorExit with a descriptive message and nonzero exit.

# Documentation

- Update README.md under Features to include the --color flag and example commands.
- Add a section in docs/ASCII_FACES.md or create docs/COLOR_OUTPUT.md describing:
  • Supported color names and default behavior.
  • Example outputs with colored faces.
  • Error handling for invalid names.

# Implementation Details

- In src/lib/main.js extend the argument parsing loop to detect --color and capture an optional color name if the next argument does not begin with --.
- Validate the name against the supported list and derive its ANSI code.
- After generating face strings (in main, interactiveMode, and HTTP API routes), if color mode is active, wrap each string with the selected CSI start and reset sequences before printing or returning.
- Use the Unicode escape \u001b[ to prefix codes.
- On invalid names, invoke errorExit listing supported colors.