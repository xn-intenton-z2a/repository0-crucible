# Overview

This feature consolidates and standardizes all interfaces for generating random face expressions into a single cohesive API surface. It unifies the command-line behavior, HTTP server endpoints, and programmatic library exports under a consistent options schema and shared logic.

# CLI and HTTP API

- Retain existing CLI flags: --count/-c, --category/-C, --seed/-s, --json/-j, --help/-h, --serve/-S, --port/-p
- In non-serve mode, CLI prints faces to stdout or JSON payloads according to flags
- In serve mode, launch HTTP server exposing:
  - GET /health: returns JSON {status: "OK"}
  - GET /faces: accepts query parameters count, category, seed, format
    - count: integer ≥1 (default 1)
    - category: valid category or all (default all)
    - seed: nonnegative integer for reproducible output
    - format: text or json (default json)
  - Responses mirror CLI behavior: text/plain for format=text, JSON object for format=json

# Programmatic API

- Export generateFaces(options) and listCategories() functions from src/lib/main.js
- generateFaces(options) accepts count, category, seed and returns {faces, category, count, seed}
- listCategories() returns array of valid categories including all
- Both functions reuse the shared OptionsSchema (zod) for validation and defaulting

# Implementation Details

1. Consolidate parseOptions, createApp, getFaces, generateFaces logic to share pool selection and RNG logic
2. Ensure OptionsSchema covers all flags and programmatic options
3. Refactor createApp to use the same getRandomFaceFromList and faces pool logic as CLI and generateFaces
4. Remove any redundant code paths and avoid divergence between interfaces

# Testing

- Extend unit tests for parseOptions, getRandomFaceFromList, generateFaces, and listCategories
- Validate CLI behavior via existing main tests for help, JSON, count, category, seed
- Validate HTTP server endpoints using supertest for /health and /faces (json and text)
- Ensure programmatic API tests verify reproducibility and validation errors

# Documentation

- Update README.md Features section to describe unified API surface under a single heading
- Update docs/USAGE.md to include examples for CLI, HTTP endpoints, and programmatic usage
- Include code usage samples without backticks, demonstrating how to call generateFaces and listCategories