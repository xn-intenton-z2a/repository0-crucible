# ENHANCED_OUTPUT Feature

# Overview
Extend emoticon output with a count option in both CLI and HTTP modes. Retain existing behaviors: diagnostics, custom config loading, JSON modes, interactive REPL, ANSI styling, list, seed, version, health, metrics, and Express middleware.

# CLI Count Option
Introduce a new CLI flag --count <n> where n is a non-negative integer. When provided:
- In plain mode: output n emoticons, one per line, selected at random by default.
- In JSON mode (--json): output a JSON array of n emoticon strings.
- When combined with --seed: generate count emoticons using seed, seed+1, ..., seed+count-1 via seededFace.
- If n is invalid or missing, display an error and exit code 1.

# HTTP API Count Query
Add support for a count query parameter on /json endpoint:
- GET /json?count=<n> returns n emoticons in JSON array mode.
- GET /json?seed=<n>&count=<m> returns m seeded emoticons starting from seed n.
- HTTP response: 200 with JSON array of strings.
- On invalid count or seed values, respond with 400 and error in JSON or plain text based on Accept header.

# CLI Options
--count <n>        Output n emoticons instead of a single one  
Existing options unchanged: --list, --seed, --json, --diagnostics, --config, --interactive, --serve, --port, --color, --help, --version.

# HTTP API Update
- On /json endpoint, detect count query parameter and emit array of emoticons instead of single object.
- Maintain same counter metrics: emoticon_requests_json_total, emoticon_requests_seeded_total, emoticon_requests_errors_total.

# Implementation Details
1. In main, detect --count before default logic and parse integer.  
2. Validate non-negative integer or exit 1.  
3. For HTTP, extend URL searchParams parsing to check params.has('count').  
4. Build array of faces via randomFace or seededFace over offset seeds.  
5. Output according to mode: CLI plain, CLI JSON, HTTP JSON or plain on error.
6. Update shared utility to generate multiple emoticons for reuse.

# Tests
- CLI: main(["--count","3"]) prints three emoticons one per line.  
- CLI JSON: main(["--json","--count","2"]) outputs JSON array of length 2.  
- CLI seeded count: main(["--seed","5","--count","4"]) yields four deterministic emoticons.  
- CLI invalid count: --count -1 or non-numeric -> error and exit 1.  
- HTTP: GET /json?count=3 returns 3 random emoticons in JSON array.  
- HTTP: GET /json?seed=2&count=2 returns two seeded emoticons seeds 2 and 3.  
- HTTP invalid count or seed yields 400 and appropriate error format.

# Documentation
Update README.md, docs/EMOTICON_OUTPUT.md, docs/HTTP_API.md to document --count flag and count query parameter in usage examples and option lists.