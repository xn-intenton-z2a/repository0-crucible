# ASCII_FACE

## Description
Extend the CLI application to deliver rich ASCII face output with optional colorization and batch mode. Users can retrieve one or more faces in random, seeded, or named modes and adjust color output to match emotional tone or disable it entirely.

## CLI Options
--count <number>, -c           Specify how many faces to print (must be positive integer)
--face                        Print a single random face (default)
--list-faces                  Display all available faces with indices
--list, --list-names, -l      List all face identifiers sorted alphabetically
--seed <value>, -s            Use provided numeric seed for deterministic selection
--name <face>, -n             Print the specified face by name (case-insensitive)
--color, -C                   Enable colored output even if terminal auto-detect would disable
--no-color                    Disable colored output regardless of support
--color-level <level>         Force color support level (0 to disable, 1 basic, 2 256, 3 truecolor)
--help, -h                    Show help message and exit
--diagnostics, -d             Show diagnostics information and exit

## Implementation Details
1. Add chalk dependency and import in src/lib/main.js
2. Parse --color, --no-color, --color-level flags before other options. Validate color-level is integer between 0 and 3 else throw Error: "Error: --color-level requires a number between 0 and 3"
3. Determine final color level by combining forced level with Chalk.supportsColor; if --no-color set level to zero
4. Create a Chalk instance and define a style map from face names to color functions:
   - frown -> red
   - surprised -> yellow
   - wink -> blue
   - smile -> green
5. Extend argument parsing to recognize --count/-c. Validate count is positive integer else throw Error: "Error: --count requires a positive integer"
6. When count present, build an array of faces by looping and selecting via Math.floor(rng() * ASCII_FACES.length)
7. Apply color styles to each face string or each element in result array when level > 0
8. Maintain existing behaviors for random, list, name, seed, diagnostics, and help modes

## Testing
1. Add tests for colored output:
   - main(["--color"]) returns ANSI codes around faces
   - main(["--no-color"]) returns plain ASCII without codes
   - main(["--color-level","0"]) disables all color
   - invalid --color-level values throw expected error
2. Test --count combinations with and without color and with seeded sequences
3. Ensure existing tests for single face, list, seed, name, help, diagnostics continue to pass

## Documentation
1. Update README.md under Features to include color flags and batch examples
2. Update docs/ascii_face.md to add a Color Mode section with flag descriptions, default behavior, style mapping, and usage examples for single and multiple faces