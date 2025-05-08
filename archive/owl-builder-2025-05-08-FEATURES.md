features/CUSTOM_TEMPLATES.md
# features/CUSTOM_TEMPLATES.md
# Overview

Allow users to manage custom ASCII emotion templates alongside built-in ones. Users can add, remove, list, and export personalized templates through both CLI and HTTP API, enabling more expressive and tailored ASCII outputs.

# CLI Commands

- `--add-template <emotion> <template> [--template-store <file>]`
  Add or overwrite a custom ASCII template for the given emotion. If `--template-store` is omitted, defaults to `templates.json` in the working directory.

- `--remove-template <emotion> [--template-store <file>]`
  Remove the custom template associated with the specified emotion from the store.

- `--list-templates [--template-store <file>]`
  List all emotion keys and their ASCII templates currently stored in the file.

- `--export-templates <file>`
  Write the entire set of custom templates to the given JSON file for sharing or backup.

# HTTP API Endpoints

- `POST /templates`
  Request body: `{ emotion: string, template: string }`
  Adds or updates a custom template. Returns confirmation and the current store.

- `DELETE /templates/:emotion`
  Remove the custom template for the given emotion. Returns the updated store.

- `GET /templates`
  Retrieve a JSON object of all stored custom templates.

# Data Storage

Templates are persisted in a user-specified JSON file. Each record has:

- `emotion`: string key
- `template`: ASCII art string

On first write, the file is created with an empty object. Reads merge built-in templates with user additions, user templates taking precedence.

# Implementation Details

- Extend `src/lib/main.js` to parse new flags and dispatch CRUD logic for templates.
- Use Node’s `fs/promises` module to read and write the JSON store atomically.
- On HTTP server startup, load the template store and merge with built-in mappings.
- Ensure concurrent CLI operations use file locking or rename patterns to prevent corruption.

# Testing

- Unit tests in `tests/unit/main.test.js`:
  • Adding a template creates or updates the file correctly.
  • Removing a template deletes the key and persists.
  • Listing returns the correct merged set.

- E2E tests in `tests/e2e/cli.test.js`:
  • Simulate CLI `--add-template`, `--list-templates`, `--remove-template`, and `--export-templates` against a temporary store file.
  • Validate exit codes and output formats.

# README Updates

- Document each new CLI flag with usage examples and expected JSON or text output.
- Describe the HTTP endpoints with request/response examples.
- Show a walkthrough of creating custom templates, exporting them, and using them in generation commands.features/EMOTION_GENERATION.md
# features/EMOTION_GENERATION.md
# Overview

Provide core functionality to generate ASCII emotion feedback based on a seeded or random input through both CLI and HTTP API interfaces. This feature enables users to produce reproducible or fresh ASCII emoticon art corresponding to named emotions.

# CLI Commands

- `--emotion <emotion>`  Specify an emotion keyword (for example: joy, anger, surprise) to generate the corresponding ASCII art.
- `--seed <number>`      Use a numeric seed to ensure deterministic output for the same emotion.
- `--list-emotions`      Display a list of supported emotion keywords with short descriptions.
- `--format <text|json>` Output the generated ASCII art either as plain text or as a JSON object with metadata.

# HTTP API Endpoints

- `GET /generate?emotion=<emotion>&seed=<number>&format=<text|json>`
  Returns either plain text or JSON containing the ASCII art, seed, and emotion.

- `GET /emotions`
  Returns a JSON array of supported emotion keywords and their descriptions.

# Implementation Details

- Extend `src/lib/main.js` to parse the new flags and route to generation logic.
- Maintain a mapping of emotion keywords to ASCII templates stored in code or in a new JSON resource in `src/lib`.
- Use a simple seeded pseudorandom number generator when a seed is provided, falling back to a non-seeded random when omitted.
- Structure the HTTP server using built-in Node HTTP module or a lightweight framework, reusing `main` entry point for request dispatch.

# Testing

- Add unit tests in `tests/unit/main.test.js` to verify:
  - Supported emotion list is returned correctly.
  - ASCII art output is deterministic given the same seed and emotion.
  - Format switch produces valid JSON structure or plain text.

- Add e2e tests in `tests/e2e/cli.test.js` to simulate:
  - CLI invocation with emotion and seed flags.
  - Listing emotions.
  - Format variations.

# README Updates

- Document new CLI options and HTTP endpoints with example commands and expected output.
- Include a sample of generating a "joy" ASCII art with and without a seed.
features/SEED_TRACEABILITY.md
# features/SEED_TRACEABILITY.md
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
