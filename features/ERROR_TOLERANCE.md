# Error Tolerance Calculation

Provide the ability to calculate π to meet a user-specified absolute error threshold rather than a fixed digit or sample count. This feature adapts computation automatically until |approximation – Math.PI| ≤ threshold or a configurable maximum limit is reached.

# CLI Options

Add the following options to the CLI:

--error <number>              Absolute error threshold (e.g., 0.001). When provided, the tool runs iteratively until the approximation error falls below or equals this value.

--error-algorithm <string>    Algorithm to use in error mode. Supported values: leibniz, montecarlo, chudnovsky. Defaults to the value of --algorithm if not set.

--max-iterations <number>     For leibniz: maximum total iterations. Defaults to 1e7. For montecarlo: maximum total samples. Defaults to 1e6. For chudnovsky: maximum digits. Defaults to 1000.

--batch-size <number>         For montecarlo error mode: number of new samples per loop. Defaults to 1000.

# Implementation

1. In src/lib/main.js, detect when options.error is provided and bypass the single-run path.
2. Determine the algorithm to use: options["error-algorithm"] or options.algorithm.
3. Start a timer. For each algorithm:
   - leibniz: maintain a running sum and iteration counter. Increase iterations in chunks (e.g., batchSize or fixed increment) and recalculate partial π until |approx - Math.PI| ≤ threshold or iterations ≥ maxIterations.
   - montecarlo: accumulate inside count and sample count in batches of batchSize. After each batch, compute current approximation and check error. Stop when error ≤ threshold or samples ≥ maxIterations.
   - chudnovsky: start with digits = 1 and increase by 1 up to maxIterations (interpreted as digits), invoking calculatePiChudnovsky at each step until error ≤ threshold.
4. Record the final usedIterations, usedSamples, or usedDigits, the resulting approximation, error, and durationMs.
5. Output the result:
   - If diagnostics is true or error mode, output a JSON object: { algorithm, errorThreshold, usedIterations|usedSamples|usedDigits, result, error, durationMs } via console.log.
   - Otherwise, print the approximation number.
6. Exit the process after printing.

# Testing

1. In tests/unit/main.test.js add tests for error mode:
   - Mock Math.PI and the calculation loops to force early exit. For leibniz, provide a small threshold that current calculatePiLeibniz meets immediately and verify usedIterations = batch increment and output structure.
   - For montecarlo, stub Math.random to simulate half-inside points, set threshold so one batch suffices, and verify usedSamples = batchSize and JSON output fields.
   - For chudnovsky, mock calculatePiChudnovsky to return a known approximation and test that digits increment until returning a value with error ≤ threshold, checking usedDigits matches the stopping point.
   - Verify console.log is called once with the expected JSON object when --error is used.

# Documentation

1. Update docs/USAGE.md to document --error, --error-algorithm, --max-iterations, and --batch-size options with example commands.
2. Update README.md under Features to describe error tolerance mode and show example CLI usage:
   node src/lib/main.js --error 0.001 --algorithm montecarlo --batch-size 5000
   # Outputs: { algorithm: 'montecarlo', errorThreshold: 0.001, usedSamples: 15000, result: 3.141..., error: 0.0009, durationMs: 20 }