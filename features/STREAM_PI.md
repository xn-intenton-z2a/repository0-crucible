# Overview
Enable incremental streaming of π digits as they are calculated, allowing consumers to receive and process digits in real time rather than waiting for the full computation to complete.

# CLI Interface
Extend main(args) to accept the following flags:
--stream                 Stream π digits to stdout in chunks as they are computed (default: off)
--chunk-size <n>         Number of digits per chunk when streaming (integer, default: 100)

When --stream is present, main should bypass buffering the full π string and instead write successive chunks of digits to stdout as soon as they are generated, then exit when complete.

# HTTP API
Add a new endpoint:
GET /pi/stream
  Query parameters:
    digits: integer number of decimal places (default 10)
    chunkSize: integer chunk size (default 100)
  Response:
    - Uses HTTP chunked transfer encoding
    - Writes successive chunks of π digits as plain text
    - Closes the response when all digits are sent

# Implementation Details
• Refactor calculatePi to expose an async generator getPiStream(digits, chunkSize) that:
  - Internally computes π digits in blocks (e.g. slicing the decimal portion) and yields string chunks of length up to chunkSize
• In CLI mode, detect --stream and --chunk-size, then:
  - Call getPiStream with the requested digits and chunk size
  - Use for await on the generator and write each chunk to process.stdout.write
  - Ensure process.exit(0) after streaming completes
• In HTTP server mode, under /pi/stream:
  - Parse and validate query parameters using existing zod schemas
  - Set response headers for text/plain and transfer-encoding: chunked
  - For each chunk from getPiStream, call res.write(chunk)
  - On completion, call res.end()
  - Handle client abort events by stopping the generator
• Ensure streaming works up to the maximum supported digits and endorses backpressure in HTTP mode

# Testing
• Unit tests in tests/unit/main.test.js:
  - Mock getPiStream to yield known chunks; verify main writes chunks to stdout in correct order and exits with code 0
  - Test invalid --chunk-size values trigger error and exit code 1
• E2E tests in tests/e2e/cli.test.js:
  - Run CLI with --digits 50 --stream --chunk-size 10; capture stdout and assert chunks of 10 characters until full π string received
  - Run CLI without --stream to verify existing behavior remains unchanged
• HTTP API tests in tests/unit/main.test.js:
  - Use supertest to GET /pi/stream?digits=20&chunkSize=5; buffer response chunks and assert chunk sizes and combined result matches calculatePi(20)
  - Test invalid query parameters result in 400 status and error JSON

# Documentation
Update README.md to:
• Document the --stream and --chunk-size flags under Features
• Provide CLI example:
    node src/lib/main.js --digits 200 --stream --chunk-size 50
• Document HTTP streaming example:
    curl http://localhost:3000/pi/stream?digits=100&chunkSize=25

Explain that streaming reduces initial latency and enables real-time consumption of large π calculations.