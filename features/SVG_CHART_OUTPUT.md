# SVG Chart Output Feature

## Overview

Enable the CLI chart commands and programmatic chart functions to emit vector-based SVG files in addition to PNG. SVG outputs provide scalable, high-fidelity graphics suitable for embedding in documents or web pages.

## Functional Requirements

- Update chart-rendering functions in `src/lib/main.js` (visualizePiDigits, visualizePiConvergence, compareAlgorithms, and any benchmark chart output logic):
  - Accept a new option `format` with allowed values `png` and `svg` (default `png`).
  - Infer format automatically from output file extension: `.svg` implies `svg`, otherwise default to `png` or overridden by `format` option.
  - When `format` is `svg`:
    - Configure QuickChart to render SVG (e.g., use `chart.getSvg()` or `QuickChart.getUrl({format:'svg'})` and fetch the SVG content).
    - Write the SVG string to the specified output file path without binary encoding.
  - When `format` is `png`, retain existing PNG behavior.

## CLI Interface

- Introduce a `--format <png|svg>` flag on all chart-related CLI commands:
  - `--chart-output <file>` (existing) and now optionally `--format svg`.
  - Example: `node src/lib/main.js --digits 1000 --chart-output dist.svg --format svg`.
- CLI parsing should validate the `format` flag, default to `png` if omitted, and ensure the output file extension matches the requested format.
- Print descriptive errors and exit non-zero if format is invalid or mismatched with file extension.

## Dependencies

- No new npm dependencies required. QuickChart-js supports SVG rendering out of the box.

## Testing

- Unit Tests (`tests/unit/main.test.js`):
  - Mock QuickChart to return a simple SVG string when format is `svg` and verify that `visualizePiDigits` and other chart functions write the expected SVG content to disk.
  - Test format inference from `.svg` extension without explicit `format` flag.
  - Confirm invalid `format` values are rejected with descriptive errors.

- CLI E2E Tests (`tests/e2e/cli.test.js`):
  - Invoke the CLI with `--chart-output sample.svg --format svg` and assert:
    - Exit code is zero.
    - `sample.svg` exists and its contents start with `<svg`.
  - Verify that specifying `--format png` with a `.svg` extension produces an error.
  - Confirm PNG outputs remain unchanged when `--format png` or default behavior is used.