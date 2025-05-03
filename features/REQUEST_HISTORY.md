# REQUEST_HISTORY Feature

# Overview
Capture and expose a history of emoticon requests served by the CLI and HTTP interfaces. Store the last N requests in memory with timestamp, mode, seed, and returned emoticon.

# History Storage
Maintain an in-memory FIFO queue of request entries. Each entry includes:
- timestamp: ISO 8601 string of when the emoticon was served
- mode: "random" or "seeded"
- seed: integer or null
- face: the emoticon string

Support a configurable maximum history length via a CLI flag or environment variable.

# CLI Interface
Add a new flag --history <n>:
- When provided without --json, print the last n entries, one per line in the format:
  timestamp  mode  seed  face
- When combined with --json, output a JSON array of the last n entries.
- Default history length is 10 if <n> is omitted.

# HTTP API Endpoint
Expose GET /history:
- Query parameter limit=<n> to control how many entries are returned (default 10).
- Respond with application/json and a JSON array of entries.
- Validate limit; on invalid produce 400 error in JSON with { error }.
- Increment a new counter emoticon_requests_history_total on each /history request.

# Programmatic API
Export two new functions:
- getHistory(limit?): returns an array of history entries up to limit or default max
- clearHistory(): empties the history queue

# Configuration
- CLI flag --history-max <n> or env var EMOTICONS_HISTORY_MAX to set default and maximum allowed history size.
- Validate configuration values; invalid values exit with error.
