# PI Calculation CLI Usage

This tool calculates π to arbitrary precision using four algorithms and can output as text or PNG images.

## Options

  --digits <n>       Number of decimal places (integer between 1 and 10000). Default: 100
  --method <name>    Calculation method: "chudnovsky" (default), "gauss-legendre", "machin" or "nilakantha". Default: "chudnovsky"
  --format <type>    Output format: "text" or "png". Default: "text"
  --output <path>    Output file path (required when --format=png)
  --benchmark        Run performance benchmarks instead of printing π
  --benchmark-runs <n>  Number of runs per method (integer ≥1). Default: 3
  --benchmark-json   Output raw JSON array of BenchmarkResult objects instead of text
  --help             Show usage information

## Examples

Calculate π to 200 digits using the Nilakantha series:

  node src/lib/main.js --digits 200 --method nilakantha

Calculate π to 150 digits using the Chudnovsky algorithm:

  node src/lib/main.js --digits 150 --method chudnovsky

Calculate π to 500 digits using the Gauss-Legendre algorithm:

  node src/lib/main.js --digits 500 --method gauss-legendre

Generate a 5000-digit π PNG image with default method (Chudnovsky):

  node src/lib/main.js --digits 5000 --format png --output pi.png

Benchmark π calculation for 10 digits, 2 runs, output JSON:

  node src/lib/main.js --digits 10 --benchmark --benchmark-runs 2 --benchmark-json
