# ASCII_FACE

## Description
Extend the CLI application to support colored ASCII face output. Users can enable or disable color and choose a color depth level, applying expressive hues that match each face’s emotional tone.

## CLI Options
--color, -C                Enable colored output even if auto-detection would disable
--no-color                 Disable colored output regardless of terminal support
--color-level <level>      Force color support level (0 to disable, 1 basic, 2 256, 3 truecolor)
(Other existing flags remain unchanged: --count/-c, --face, --list-faces, --list/-l, --seed/-s, --name/-n, --diagnostics/-d, --help/-h)

## Implementation Details
1. Add chalk dependency in package.json and import new Chalk from chalk in src/lib/main.js.
2. Parse --color, --no-color, --color-level flags before other options. Validate color-level is integer between 0 and 3, else throw Error: "Error: --color-level requires a number between 0 and 3".
3. Determine effective level by combining forced level flag with chalk.supportsColor. If --no-color set, level is zero.
4. Instantiate a Chalk instance with the computed level.
5. Define a style map:
   - frown -> chalk.red
   - surprised -> chalk.yellow
   - wink -> chalk.blue
   - smile -> chalk.green
6. After selecting a single face or batch, apply the style corresponding to each face’s name when level > 0; otherwise return plain ASCII.
7. Ensure existing behavior for random, list, name, seed, diagnostics, help, and count works unchanged.

## Testing
1. Add tests in tests/unit/main.test.js for colored output:
   - main(["--color"]) returns ANSI codes around face
   - main(["--no-color"]) returns plain face without ANSI codes
   - main(["--color-level","0"]) disables coloring
   - Invalid --color-level values throw expected error
2. Combine --count with color flags and seeded sequences for deterministic colored batches.
3. Verify that existing tests for single face, list, seed, name, help, diagnostics continue to pass unchanged.

## Documentation
1. Update README.md under Features: list new color flags and show usage examples for single and multiple faces.
2. Update docs/ascii_face.md: add Color Mode section with descriptions of flags, default behavior, style mapping, and examples.