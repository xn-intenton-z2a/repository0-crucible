# Overview
Enhance the existing pi calculation feature by rendering the exact digit characters into the output PNG rather than producing a blank image. When the CLI is invoked with `--format=png`, the tool will produce a monochrome image where each digit of π (including the leading "3" and decimal point) is drawn as text in a consistent, monospaced font.

# CLI Usage
Existing flags remain unchanged. When `--format=png` is selected, the output file will now contain a rendered image of the π digits:

--digits <n>       Number of decimal places (1 to 10000), default 100
--method <name>    Calculation method: chudnovsky, gauss-legendre, machin, nilakantha; default chudnovsky
--format png       Output format png (text mode unchanged)
--output <path>    File path for generated PNG (required)

# Implementation Details

## Font and Layout
- Use pureimage to draw text. Register or decode a bundled monospaced TTF font (e.g., SourceCodePro) loaded from node_modules/pureimage/fonts.  
- Set font size so that each character occupies a fixed width (charWidth) and fixed height (charHeight).
- Compute image width = charWidth * (number of characters in piStr), height = charHeight + padding.
- Initialize a white background canvas, set fill style to black for text.

## Rendering Pipeline
- In `src/lib/main.js`, replace the blank-image branch with:
  1. Call a new helper `renderPiAsPng(piStr: string, outputPath: string)`.
  2. In the helper:
     - Load and register the monospaced font.
     - Measure text metrics for single characters to determine dimensions.
     - Create an image with computed width/height.
     - Draw each character of `piStr` at offset = index * charWidth, y baseline = charHeight.
     - Encode PNG to disk via pureimage.

## Tests
- In `tests/unit/main.test.js` or a new `tests/unit/pngRender.test.js`, stub or use pureimage to decode a small generated PNG for `piStr = "3.14"` and assert that specific pixel coordinates are not all white (e.g., pixel at coordinate of the digit "3" has non-white RGBA).
- Verify the file exists and the rendered image width and height match expected dimensions for small digit counts.

# Documentation
- Update README.md under Features to show example:
  node src/lib/main.js --digits 50 --format png --output pi_digits.png
- In docs/USAGE.md, add a PNG Rendering section that describes the embedded font, image dimensions, and shows sample output description.
