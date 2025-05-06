# Summary

Extend the core face generation feature to support ANSI color output when the --color flag is used.

# Specification

Introduce a new flag --color that enables ANSI color codes around each face output. The flag may accept an optional color name as the next argument. If provided without a name, default to green. Supported color names are black, red, green, yellow, blue, magenta, cyan, and white. When the flag is present, for each face output wrap the face string in the ANSI CSI 3Xm escape sequence for the chosen color and append the CSI 0m reset sequence. The color flag works alongside existing flags for count, seed, and category. Other modes are unaffected.

# CLI Usage

node src/lib/main.js --face --color
node src/lib/main.js --face 3 --seed 42 --color red
node src/lib/main.js --face --category happy --color blue

# Testing

Add unit tests in tests/unit/main.test.js to verify that when main is called with --face and --color, the output strings begin with the correct ANSI escape sequence and end with the reset sequence. Test the default color when no name is supplied. Test each supported color name. Test that the color flag does not affect behavior when face count or category filter is applied.

# Documentation

Update README.md under Features to document the --color flag with examples. Update docs/ASCII_FACES.md or add a docs/COLOR_OUTPUT.md file describing the color behavior and supported names. Provide example sequences showing color codes around faces.

# Implementation Details

In src/lib/main.js extend the argument parsing loop to detect --color. If the next argument is not another flag treat it as the color name and validate it. Map color names to ANSI 3Xm codes. In the face output section wrap each face string with the start and reset sequences. Ensure existing tests still pass and add new tests for color. Ensure that when the color flag is not present, behavior is unchanged.