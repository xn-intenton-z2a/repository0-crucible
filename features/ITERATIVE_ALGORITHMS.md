# Overview
Combine two fundamental iterative π calculation methods into a single feature: the Leibniz series and Monte Carlo sampling. This unifies convergence behavior and output handling for both methods under one cohesive implementation.

# Implementation
1. In src/lib/main.js ensure both calculatePiLeibniz and calculatePiMonteCarlo are exported and documented.
2. For the Leibniz series method accept a digits parameter, iterate alternating terms up to a calculated iteration limit, and return a numeric result formatted to the specified decimal places.
3. For the Monte Carlo method accept a samples parameter, perform random sampling in the unit square, count points inside the unit circle, and return four times the inside ratio as the π approximation.
4. In CLI main detect algorithm values leibniz or montecarlo and call the corresponding function. Preserve existing flags for diagnostics, convergence-data, chart and serve modes.
5. In convergence-data and chart modes share dataPoints generation logic: for each iteration or batch, compute index, approximation, and error to build a uniform data series for JSON export or chart rendering.
6. In createApp define REST handlers for /pi, /pi/data, and /pi/chart that parse algorithm query parameter, support both methods, and return JSON or PNG output accordingly.

# Testing
1. Unit tests for calculatePiLeibniz across various digit values, asserting precision against Math.PI.
2. Unit tests for calculatePiMonteCarlo with moderate sample counts, asserting approximations fall within an expected range.
3. CLI tests that main prints correct numeric output and diagnostics object for both leibniz and montecarlo algorithms.
4. HTTP tests for GET /pi, GET /pi/data and GET /pi/chart endpoints using both algorithms, verifying JSON structures and PNG response headers and content.

# Documentation
1. Update docs/USAGE.md under the Algorithms section to describe both leibniz and montecarlo methods with example invocations and expected output.
2. Update README.md under Features to list Iterative Algorithms as a combined entry, summarizing both methods and illustrating CLI and HTTP usage.