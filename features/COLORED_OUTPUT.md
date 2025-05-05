# COLORED_OUTPUT

## Description
Add support for colored ASCII faces using the Chalk library. Face output is colorized by default (when terminal supports colors) to match emotional tone (e.g., frown in red, smile in green, surprised in yellow, wink in blue). Users can opt in or out of color, or specify a color support level.

## CLI Options

--color, -C                  Enable colored output even if automatic detection would disable it.
--no-color                   Disable colored output regardless of terminal support.
--color-level <level>        Force Chalk color support level (0 to disable, 1 for basic, 2 for 256, 3 for truecolor).

## Implementation Details

1. Add chalk to dependencies and import new Chalk from Chalk module in src/lib/main.js.
2. Parse --color, --no-color, and --color-level flags before other modes. Validate color-level is integer 0–3, else throw Error: "Error: --color-level requires a number between 0 and 3."
3. Compute chalkInstance = new Chalk({level: forcedLevel}) or rely on Chalk.supportsColor and flags. If --no-color, set level to 0.
4. Define a map from face names to Chalk style functions:
   - frown -> chalkInstance.red
   - surprised -> chalkInstance.yellow
   - wink -> chalkInstance.blue
   - smile -> chalkInstance.green
5. When main returns a face string or array of faces, wrap each output string with the corresponding style function if level > 0. If the output is an array, apply styling to each element before returning.
6. Preserve existing behavior when color level is 0: return plain face strings.

## Testing

1. In tests/unit/main.test.js, add new tests:
   - main(["--color"]) returns a string containing ANSI color codes.
   - main(["--no-color"]) returns plain face without ANSI codes.
   - main(["--color-level","0"]) disables color.
   - main(["--color-level","3","--name","smile"]) uses truecolor sequences with green markup.
2. For array modes (e.g., with --count and --color), ensure each element is wrapped in ANSI codes when level > 0.
3. Assert that invalid --color-level values throw the expected error.

## Documentation

1. Update README.md under Features and Usage:
   - Document new --color, --no-color, and --color-level options with examples.
2. Update docs/ascii_face.md:
   - Add a Color Mode section describing flags, default behavior, and examples of colored output.
