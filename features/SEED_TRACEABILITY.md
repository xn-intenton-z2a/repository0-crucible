# Overview

Enable robust tracking of seed origins from discussion-based inputs through CLI and HTTP API, providing users with the ability to trace when and how a particular ASCII emotion output was generated.

# CLI Commands

- `--trace-log <file>`: Specify a local JSON file to store seed trace records.
- `--show-trace <seedId>`: Display the trace information for a given seed identifier in the console.
- `--list-traces`: List all recorded seed trace entries with timestamp, user prompt, and seedId.

# HTTP API Endpoints

- `GET /trace/:seedId`  
  Retrieve JSON with trace details for the specified seedId.

- `GET /traces`  
  Return an array of all seed trace records.

# Data Storage

- Store trace records in a JSON file. Each record includes:
  - `seedId` (UUID)
  - `timestamp` (ISO string)
  - `prompt` (string)
  - `source` ("CLI" or HTTP client)
  - `sessionId` (optional discussion session identifier)

- Provide helper functions in `src/lib/main.js` to read, append, and write trace data.

# Testing

- Add unit tests in `tests/unit/main.test.js` to cover:  
  - Initialization of trace file when missing.  
  - Appending a new trace record.  
  - Retrieving trace records via CLI `--show-trace`.  

- Add e2e tests in `tests/e2e/cli.test.js` to simulate CLI invocations with trace flags and validate JSON output.

# README Updates

- Document new CLI options and HTTP endpoints in the Usage section.
- Include example commands showing how to generate an ASCII emotion, record its seed trace, and retrieve it.
