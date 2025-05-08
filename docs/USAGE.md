# PI Calculation CLI Usage

This tool calculates π to arbitrary precision using two algorithms and can output as text or PNG images.

## Options

  --digits <n>       Number of decimal places (integer between 1 and 10000). Default: 100
  --method <name>    Calculation method: "machin" or "nilakantha". Default: "machin"
  --format <type>    Output format: "text" or "png". Default: "text"
  --output <path>    Output file path (required when --format=png)
  --help             Show usage information

## Examples

Calculate π to 200 digits using the Nilakantha series:

  node src/lib/main.js --digits 200 --method nilakantha

Generate a 5000-digit π PNG image:

  node src/lib/main.js --digits 5000 --format png --output pi.png
