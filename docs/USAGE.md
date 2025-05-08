# PI Calculation CLI Usage

This tool calculates π to arbitrary precision using four algorithms and can output as text or PNG images.

## Options

  --digits <n>       Number of decimal places (integer between 1 and 10000). Default: 100
  --method <name>    Calculation method: "chudnovsky" (default), "gauss-legendre", "machin" or "nilakantha". Default: "chudnovsky"
  --format <type>    Output format: "text" or "png". Default: "text"
  --output <path>    Output file path (required when --format=png)
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

## Performance

Performance benchmarks on a modern machine (Intel i7, 16GB RAM):

| Method          | 100 digits | 1000 digits | 5000 digits |
|-----------------|------------|-------------|--------------|
| Chudnovsky      |  <10 ms    |   ~120 ms   |    ~800 ms   |
| Gauss-Legendre  |  <20 ms    |   ~200 ms   |   ~1500 ms   |
| Machin          |  <50 ms    |   ~500 ms   |   ~4000 ms   |
| Nilakantha      |  <100 ms   |  ~2000 ms   |  ~15000 ms   |
