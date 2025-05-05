# ASCII_FACE

## Description
Extend the CLI application to support all ASCII face modes—random, list, seeded, and named—under a single cohesive feature. Users can request a random face, list all faces with indices, provide a numeric seed for deterministic selection, or specify a face by name.

## CLI Options

--face                 Print a single random ASCII face (default behavior)
--list-faces           Display all available ASCII faces as a numbered list
--seed <value>, -s <value>   Use the provided numeric seed for deterministic selection
--name <face>, -n <face>     Print the specified ASCII face by its name (case-insensitive)

## Implementation Details

1. In src/lib/main.js maintain the constant array ASCII_FACES and mapping FACE_MAP.
2. Argument parsing logic:
   - No flags or --face: select and return one random face.
   - --list-faces: return an array of "index: face" strings.
   - --seed or -s: validate numeric seed, initialize seedrandom, then select one face.
   - --name or -n: validate presence of face name, normalize to lowercase, lookup in FACE_MAP, return mapped face or throw error on invalid name.
   - For any unknown flag or unexpected extra argument, throw an Error with message "Error: unknown flag '<flag>'" and exit code 1.
3. Ensure the CLI invocation block prints strings or array lines to stdout and sets process.exitCode appropriately.

## Testing

1. Update tests in tests/unit/main.test.js to cover:
   - Default, --face, --list-faces, --seed, -s, --name, -n modes
   - Error conditions: missing seed, non-numeric seed, missing name, invalid name, extra flags
2. Mock console.log to capture output and assert messages and exit codes.

## Documentation

1. Merge features/ascii_face.md and features/named_face.md into features/ASCII_FACE.md, describing all modes.
2. Update README.md under Features and Usage to reflect unified CLI options and examples.
3. Ensure docs/ascii_face.md covers the four modes with usage examples and error conditions.