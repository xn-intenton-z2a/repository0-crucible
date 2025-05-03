# EMOTICON_SERVICE Feature

# Overview
Unify all interfaces for emoticon output and consumption into a single cohesive feature. Provide consistent behavior and configuration across CLI, HTTP server, interactive REPL, Express middleware, and programmatic library API. Preserve custom configuration loading, diagnostics, version reporting, metrics, and ANSI styling support.

# CLI Interface
- Retain existing flags: --config, --diagnostics, --list, --seed, --json, --interactive (-i), --help (-h), --version (-v)
- Add --count <n> to output multiple emoticons in plain or JSON modes
- Validate inputs and exit with appropriate codes (0 on success, 1 on invalid usage)
- Help output includes usage examples for all combinations of flags

# HTTP API Interface
- Expose built-in server mode via --serve and --port <n>
- Endpoints:
  - GET /           → random emoticon in plain text
  - GET /list       → all emoticons one per line
  - GET /json       → single JSON object or JSON array when count or list parameters present
  - Support query parameters: seed=<n>, count=<n>, list
  - GET /json/list  → alias for full list in JSON array
  - GET /version    → { version }
  - GET /health     → OK
  - GET /metrics    → Prometheus metrics exposition (counters for total, root, list, json, seeded, errors)
- All responses include Access-Control-Allow-Origin: *
- Validate seed and count parameters and respond with 400 on invalid values

# Express Middleware
- Export createEmoticonRouter(options) returning an Express Router
- Mount same handlers as built-in server under a configurable basePath
- Share common counters and configuration logic

# Programmatic API
- Export functions: listFaces(), randomFace(), seededFace(seed), emoticonJson({ mode, seed }), version
- Behavior identical to CLI and HTTP logic, using the same custom-configured emoticon list
- Documentation examples for importing and using each utility in code

# Diagnostics and Configuration
- --diagnostics flag or EMOTICONS_DIAGNOSTICS env var outputs JSON metadata (version, config source, emoticon count, custom flag, supportsColorLevel)
- Load custom emoticon list from JSON or YAML via --config or EMOTICONS_CONFIG
- Validate file presence and format, exit on errors
