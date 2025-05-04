# Description
Unify command line interface with HTTP API to serve random ASCII face expressions for both local scripting and remote consumption.

# CLI Behavior
- Retain existing flags: --count/-c, --category/-C, --seed/-s, --json/-j, --help/-h.
- Add --serve/-S flag to start an HTTP server instead of printing to stdout.
  - When --serve is present, ignore other output flags and launch HTTP endpoint on a default port or user-provided port via --port/-p.

# HTTP API
- GET /faces
  - Query parameters: count (integer ≥1, default 1), category (happy, sad, angry, surprised, all; default all), seed (nonnegative integer), format (text or json; default json).
  - Response: JSON object with fields faces (array of strings), category, count, seed.
- GET /health
  - Returns 200 OK with a simple status message.

# Implementation
1. Extend OptionsSchema in src/lib/main.js to include serve (boolean) and port (integer ≥1, default 3000).
2. Detect --serve/-S in parseOptions and handle server mode in main.
3. When serve mode is active:
   - Initialize HTTP server (e.g., use Node's built-in http module).
   - Route GET /faces and /health according to specification.
   - Use existing getRandomFaceFromList and faces pool logic.
4. Ensure CLI non-serve paths remain unchanged.

# Testing
- Add unit tests for parseOptions to cover --serve and --port flags.
- Add server tests using a lightweight HTTP client (e.g., node http or fetch) to verify responses:
  - /health endpoint returns expected status message.
  - /faces with default parameters returns one face in JSON.
  - /faces with custom count, category, seed, and format returns consistent payloads.
- Ensure existing CLI tests for JSON and text output continue to pass.

# Documentation
- Update README.md Features section to describe HTTP mode and endpoints.
- Update docs/USAGE.md to include examples for starting server and querying endpoints.
