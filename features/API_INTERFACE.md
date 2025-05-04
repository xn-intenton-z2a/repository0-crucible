# Overview

Consolidate and standardize all interfaces for generating random face expressions into a single cohesive API surface. This feature unifies the CLI tool, HTTP server, and programmatic library under a shared options schema, introduces a unique selection mode to prevent duplicates, and supports custom face configuration via JSON or YAML files.

# CLI Behavior

- Extend existing flags with:
  • `--config`, `-f` (string): path to JSON or YAML file to override or extend built-in face categories. File must map string keys to arrays of strings. Parsed with js-yaml for YAML or JSON.parse otherwise. Merged into default faces.
  • `--unique`, `-u` (boolean, default: false): ensure returned faces are unique within each request; error if count exceeds pool size.
- Retain flags:
  - `--count`, `-c` (integer ≥1, default: 1)
  - `--category`, `-C` (string, default: all)
  - `--seed`, `-s` (nonnegative integer)
  - `--json`, `-j` (boolean)
  - `--serve`, `-S` (boolean)
  - `--port`, `-p` (integer ≥1, default: 3000)
  - `--help`, `-h`
- Non-serve mode:
  - If `--config` is provided, load and validate custom config, merge into default faces.
  - Apply unique selection logic when `--unique` is true.
  - Output faces to stdout or JSON payload according to flags.

# HTTP API

- GET `/health`: returns JSON `{ status: "OK" }`
- GET `/faces`:
  • Query parameters: `count`, `category`, `seed`, `unique`, `format`, `config`
  • `config` loads custom config before selection; invalid path yields HTTP 400
  • `unique=true` applies unique selection logic; returns HTTP 400 if `count` > pool size
  • `format=text` returns plain text (one face per line); default is JSON
  • Invalid inputs or errors yield HTTP 400 with `{ error: message }`

# Programmatic API

- Export `generateFaces(options)` and `listCategories()`
- Shared `OptionsSchema` validates: `count`, `category`, `seed`, `config`, `unique`
- `generateFaces(options)` returns `{ faces, category, count, seed }` after merging config and applying unique or random selection
- `listCategories()` returns available categories including `all` and any custom categories from config merging

# Implementation Details

1. Extend `OptionsSchema` to include `config: z.string().optional()` and ensure `unique` is nonenumerable in CLI parse.
2. Update `parseOptions` to capture `--config`/`-f` and validate default categories when no config is provided.
3. Implement `loadCustomConfig(configPath)`:
   - Check existence, read file synchronously, parse YAML or JSON, validate record of arrays of strings.
   - Return object mapping categories to face arrays for merging.
4. In `generateFacesCore`:
   - Merge `faces` with custom config overrides or additions.
   - Validate selected `category` against merged keys plus `all`.
   - Initialize RNG with seedrandom when `seed` provided, else Math.random.
   - Build pool of faces (flatten all or specific category).
   - If `unique`, shuffle deterministically and slice; error if `count` > pool length.
   - Else select faces with replacement.
5. In `createApp`:
   - Parse query with `OptionsSchema.pick({ count, category, seed, config, unique, format })`.
   - Load config and pass `config` to `generateFacesCore`.
   - Handle unique logic and errors.
   - Send plain text or JSON based on `format`.
6. Update `main()` to forward `config` and `unique` into `generateFacesCore`.

# Testing

- Unit tests for `parseOptions` to confirm `--config`/`-f` flags populate `config` and handle invalid paths.
- Fixtures for custom JSON and YAML config merging, overriding existing categories and adding new ones.
- Tests for `generateFacesCore` covering custom config merging, unique mode, reproducibility, and error when `count` exceeds pool.
- CLI tests combining `--config`, `--unique`, and other flags, including error exit scenarios.
- HTTP tests for `/faces?config=...`, `/faces?unique=true`, text and JSON formats, and invalid param handling.

# Documentation

- Update `README.md` and `docs/USAGE.md` to include examples of `--config`, custom YAML and JSON, and unique flag usage in CLI, HTTP, and programmatic contexts.
- Document error behavior for invalid config files and unique selection over-requests.