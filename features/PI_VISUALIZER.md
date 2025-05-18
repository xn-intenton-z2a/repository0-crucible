# Pi Visualizer Feature

## Feature Overview
Render computed π digits as a PNG visualization image, mapping each digit to a color gradient. Users can specify output path, image width, and color scheme to analyze digit distributions visually.

## Requirements

1. Support a `--visualize <path>` flag to output a PNG file (default `pi.png`).
2. Support optional `--width <n>` flag to specify number of digits per row (default 100).
3. Use the `canvas` library to draw a grid where each block represents one digit, colored according to the selected scheme.
4. Provide at least two color schemes: grayscale and heatmap.
5. Validate that `width` is a positive integer and that the output path is writable. Report clear error messages on validation failure.

## Behavior

- When invoked with `--digits 1000 --visualize output.png`, compute π to 1000 digits and render a PNG at `output.png`.
- The image width in digits defaults to 100 if not provided, wrapping rows accordingly.
- Exit code 0 on success. On invalid flags or drawing errors, exit code 1 and print a descriptive error.

## Testing

- Unit tests for `renderPiImage(digits, width, scheme)` mapping a small sequence to pixel data and verifying color values.
- Integration tests invoking the CLI with flags and asserting that a valid PNG file is created with expected dimensions.

## Documentation Updates

- Update README to include "Visualize π as a PNG image" under the Features section.
- Add CLI usage examples and a sample output image placeholder.