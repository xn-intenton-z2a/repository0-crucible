# PI_SERVER

# Description
Adds a CLI option to start an HTTP server that exposes a REST API for computing π values using the supported algorithms. The server listens on a configurable port and responds to GET /pi requests with JSON containing the computed π value, optional digit frequency histogram, and computation time.

# CLI Usage
node src/lib/main.js --serve [--port <port>] --pi <digits> [--algorithm <algorithmName>] [--samples <count>] [--seed <number>] [--benchmark] [--digit-frequency]

# API Endpoints
GET /pi?digits=<number>&algorithm=<name>&samples=<count>&seed=<number>&benchmark=<boolean>&digitFrequency=<boolean>

# Implementation
- Extend main.js argument parser to detect --serve and --port.
- When --serve is provided, use the built-in http module to create an HTTP server bound to the specified port (default 3000).
- Parse and validate query parameters using zod for digits, algorithm, samples, seed, benchmark, and digitFrequency.
- Reuse existing π computation functions for Gauss-Legendre, Chudnovsky, and Monte Carlo algorithms.
- Compute π and gather optional benchmark time and digit frequency.
- Respond with a JSON object { pi: string, digits: number, algorithm: string, benchmarkMs?: number, digitFrequency?: Record<string, number> }.
- Set Content-Type to application/json and handle invalid requests with a 400 status code and error message.

# Testing
- Mock http.createServer in unit tests to simulate GET requests and capture responses.
- Verify GET /pi returns correct JSON structure and values for known digit inputs.
- Test error responses for missing or invalid query parameters.
- Ensure the server cleans up and shuts down properly after tests complete.