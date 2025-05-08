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
- Show a walkthrough of creating custom templates, exporting them, and using them in generation commands.