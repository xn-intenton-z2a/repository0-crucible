# EMOTICON_SERVICE Feature

# Overview
Unify the core emoticon service to support both CLI and HTTP server modes, interactive REPL, custom configuration, diagnostics, programmatic API, and Express middleware with monitoring and metrics. Ensure consistent behavior across all interfaces, clear usage documentation, and exported utilities.

# CLI Interface
- Default invocation prints a single random emoticon in plain text.
- Support flags:
  - --config <path>: load custom emoticon list from JSON or YAML, exit 1 on missing or invalid file.
  - --list: list all emoticons with zero-based indices, one per line.
  - --seed <n>: deterministic selection by non-negative integer seed, error and exit 1 on invalid input.
  - --json: output results in JSON; can combine with --seed, --list, or --count.
  - --count <n>: output multiple emoticons; in plain mode print n lines; in JSON mode print array of n strings; error on invalid values.
  - --interactive, -i: launch REPL supporting commands random, seed <n>, list, json, help, exit.
  - --diagnostics: output JSON diagnostics (version, configSource, emoticonCount, isCustomConfig, colorStyle, supportsColorLevel) and exit 0.
  - --version, -v: print version and exit 0.
  - --help, -h: show help message detailing all flags and commands, exit 0.

# HTTP API Endpoints
Use built-in HTTP server when invoked with --serve and optional --port <n>:
- GET /: return a random emoticon as text/plain, CORS header, increment emoticon_requests_root_total and emoticon_requests_total.
- GET /list: return all emoticons one per line, text/plain, CORS header, increment emoticon_requests_list_total and emoticon_requests_total.
- GET /json: without params return {face,mode:"random",seed:null}, application/json, CORS, increment emoticon_requests_json_total and emoticon_requests_total.
- GET /json?seed=<n>: return seeded face JSON mode seeded; on invalid seed respond 400 JSON or text based on Accept header; increment emoticon_requests_seeded_total.
- GET /json?count=<n>[&seed=<s>]: return array of n faces; deterministic if seed is provided; error 400 on invalid inputs; increment metrics accordingly.
- GET /json?list and GET /json/list: return JSON array of all emoticons, increment emoticon_requests_json_total.
- GET /version: return {version}, application/json, CORS header.
- GET /health: return OK, text/plain, CORS header.
- GET /metrics: expose Prometheus metrics counter values, text/plain; version=0.0.4; CORS header.
- All other paths or non-GET methods: respond 404 with plain text or JSON based on Accept header; increment emoticon_requests_errors_total.
- Invalid port values: on --serve --port <value> if non-numeric or negative, log error and exit 1.

# Express Middleware
- Export createEmoticonRouter(options) that mounts the same HTTP API routes on an Express Router instance.
- Reuse the same counters and configuration logic.
- Attach Access-Control-Allow-Origin header on all responses.

# Programmatic API
- Export functions: listFaces(), randomFace(), seededFace(seed), emoticonJson({mode,seed}), version constant.
- Deterministic behavior and input validation consistent with CLI and HTTP interfaces.

# Diagnostics and Configuration
- CLI flag --diagnostics and EMOTICONS_DIAGNOSTICS env var produce JSON diagnostics and exit.
- CLI and server support --config <path> and EMOTICONS_CONFIG for custom emoticon lists.
- Reset to builtin list on each invocation before loading custom config.
