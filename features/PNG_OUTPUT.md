# PNG Output Generation

Introduce support for rendering π digits as a PNG image for visual inspection and sharing. When users specify the `--format png` flag, the CLI will generate a PNG file displaying the computed digits in a monospaced font on a simple background.

# CLI Flag and Options

Add a new CLI option:
- `--format png`  renders output as a PNG image rather than text.
- `--output <file>` (optional)  specifies the output file path. If omitted, defaults to `pi.png` in the current working directory.

# Implementation Details

1. Add `canvas` as a runtime dependency.
2. In `src/lib/main.js`, detect when `format` is `png`. Create a Canvas instance sized appropriately based on the number of digits:
   - Use a monospaced font (e.g., Courier) with a fixed font size.
   - Calculate canvas width as `digitCount * (fontSize * 0.6)` and height as `fontSize * 1.5`.
   - Render the π string onto the canvas at a fixed margin.
3. Convert the canvas to a PNG buffer and write it to the specified output file path using Node.js `fs` APIs.
4. Maintain existing behavior when `--format text` is used.

# Tests

- Add tests in `tests/unit/main.test.js` to cover:
  - Invoking `main(["--digits","3","--format","png","--output","test.png"])` writes a valid PNG file at `test.png`.
  - Verify that the generated buffer starts with the PNG signature bytes (`\x89PNG`).
  - Clean up test files after assertions.

# Documentation Updates

- Update `docs/USAGE.md` to document the new `--format png` and `--output` flags with examples.
- Update `README.md` under Features and Usage to mention PNG output support.

# Dependencies

- Add `canvas` to `dependencies` in `package.json` to support server-side canvas rendering.
