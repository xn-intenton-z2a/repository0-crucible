# ASCII_FACE

## Purpose
Add the ability for the CLI tool to output a random ASCII art facial expression as emotional feedback. When invoked without flags or with the `--face` option, the tool prints one of several predefined ASCII faces.

## Source Changes
1. In `src/lib/main.js`, implement a `getRandomFace()` function that selects and returns a random ASCII art face from an array.
2. Modify the existing `main(args)` function to detect the presence of `--face` or no arguments and call `getRandomFace()` before printing.
3. Ensure the default behavior (when no flags are provided) outputs a face.

## CLI Interface
- `node src/lib/main.js` outputs a random ASCII face.
- `node src/lib/main.js --face` explicitly requests a face.
- `node src/lib/main.js --help` describes the new `--face` option.

## Testing
1. In `tests/unit/main.test.js`, add tests for `getRandomFace()` to verify:
   - It returns a non-empty string.
   - The output matches one of the known face patterns.
2. Add a CLI integration test to simulate `process.argv = ["node","src/lib/main.js","--face"]` and assert that `main()` prints a valid face without errors.

## Documentation
- Update `README.md`:
  - Add `ASCII_FACE` under the Features section with a brief description.
  - Provide usage examples showing the new face output commands.

## Dependencies
No new dependencies are required; rely on built-in `Math.random` for selection.
