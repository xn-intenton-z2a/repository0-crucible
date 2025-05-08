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
