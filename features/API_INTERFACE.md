# Overview

Consolidate and standardize all interfaces for generating random face expressions into a single cohesive API surface. This feature unifies the command-line tool, HTTP server, and programmatic library under a shared options schema, and introduces a unique selection mode to prevent duplicates when requested.

# CLI Behavior

- Add flag --unique (alias -u): when true, ensure returned faces are unique within each request; error if count exceeds pool size.
- Retain existing flags:
  • --count, -c (integer ≥1, default 1): number of faces to return
  • --category, -C (string, default all): emotion category or all
  • --seed, -s (nonnegative integer): seed for reproducible RNG
  • --json, -j: output JSON payload
  • --serve, -S: start HTTP server
  • --port, -p (integer ≥1, default 3000): server port
  • --config, -f: path to JSON or YAML custom face configuration file
  • --help, -h: display usage information
- Non-serve mode: print faces to stdout or JSON according to flags
- Serve mode: launch HTTP server, forwarding flags to createApp

# HTTP API

- GET /health: returns JSON {status: "OK"}
- GET /faces:
  • Query parameters: count, category, seed, unique, format, config
  • unique=true applies unique selection logic and returns error 400 if count > pool size
  • format=text returns plain text (one face per line); default is JSON
  • Invalid inputs or errors from core yield HTTP 400 with {error: message}

# Programmatic API

- Export generateFaces(options) and listCategories()
- Shared OptionsSchema validates: count, category, seed, unique, config
- generateFaces(options) returns {faces, category, count, seed}
- listCategories() returns available categories including all

# Implementation Details

1. Extend OptionsSchema to include unique: z.boolean().default(false)
2. Update parseOptions to parse --unique/-u into the unique option
3. In generateFacesCore:
   • Merge default faces with custom config if provided
   • Validate category against merged keys
   • Instantiate RNG: seedrandom when seed provided, Math.random otherwise
   • Build pool for all or specific category
   • If unique is true:
     - Clone and shuffle pool via RNG
     - Select the first count items; throw error if count > pool length
   • Else:
     - Select count items with getRandomFaceFromList
4. In createApp:
   • Parse query with OptionsSchema including unique
   • Pass unique to generateFacesCore
   • Determine format and send plain text or JSON response
5. Update main() to forward unique to generateFacesCore in CLI mode

# Testing

- Unit tests for parseOptions with unique flag on and off
- Tests for generateFacesCore unique mode, reproducibility with seed, and error when count exceeds pool
- CLI tests covering --unique/-u in combination with other flags and error scenarios
- HTTP tests for /faces?unique=true in both text and JSON formats and error cases
- Programmatic tests for generateFaces/getFaces with unique option

# Documentation

- Update README.md and docs/USAGE.md to include examples of unique flag in CLI, HTTP, and programmatic contexts
- Document error behavior when requesting more unique faces than available pool size