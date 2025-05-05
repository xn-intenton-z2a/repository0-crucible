# ASCII_FACE

## Description
This feature extends the CLI application to output a random facial expression using ASCII art. On invocation without additional flags, the tool selects one facial expression at random from a predefined library and prints it to the console.

## CLI Options

--face         Output a single random ASCII face (default behavior)
--list-faces   Display all available ASCII expressions as a numbered list
--seed <value> Use the provided numeric seed to produce a deterministic random face for testing or scripting

## Implementation Details

1. Define a constant array of ASCII expressions in src/lib/main.js. Each element is a multi-line string representing one facial expression.
2. Add a random selection function that, given an optional seed, returns a consistent index or true random index when no seed is provided.
3. Update the main function to parse flags and produce the desired output:
   - No flags or --face: select and print one expression.
   - --list-faces: iterate and print every expression with its index.
   - --seed: initialize a deterministic pseudo-random generator before selection.
4. Ensure all outputs are printed to stdout with no trailing spaces. Exit with status code 0 on success.

### Dependencies
No new external dependencies. Use built-in Math.random and a simple shim for seeded randomness if a seed is provided.

## Testing

1. Unit tests in tests/unit/main.test.js to verify:
   - main called without args prints one of the known expressions.
   - --list-faces prints all expressions in correct order.
   - --seed 1 always prints the same expression for the same seed across runs.
2. Mock console.log to capture output and assert content without escaping.
3. Test error conditions for invalid seed values and unknown flags and expect exit code 1.

## Documentation

1. Update README.md under Features to explain ASCII_FACE support and list the new options.
2. Provide usage examples showing default run, listing faces, and seed-based invocation.
3. Add a new section in Incremental Changes Plan describing this feature.