# xn-intenton-z2a/repository0-crucible
Explore novel algorithms for calculating π to varying digit lengths using different techniques, benchmark their performance, and generate results as PNG visualizations or text-based formats.
# Activity Log

## Discussions activity at 2025-05-19T15:10:06.981Z

Hi @Antony-at-Polycode,

Understood! I’m seeding the repository now with the current mission intact and no additional mission detail. Let me know if there’s anything else you’d like to adjust or explore next.

[Posted on "https://github.com/xn-intenton-z2a/repository0-crucible/discussions/2538#discussioncomment-13195179" by the repository bot which took the action "seed-repository" with the detail "".]

LLM API Usage:

```json
{"prompt_tokens":20479,"completion_tokens":849,"total_tokens":21328,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":768,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}```

---

2025-05-19T15:11:46Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-crucible/tree/intention-2025-05-19T15-11Z

## Feature to Issue at 2025-05-19T15:13:17.346Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-crucible/issues/2705 with title:

Add PI_CALCULATION API and CLI support with text and PNG output

And description:

Overview:
Implement the PI_CALCULATION feature as defined in features/PI_CALCULATION.md. Provide a programmatic API (`calculatePi`) and a CLI interface to compute π to a requested number of decimal places using two algorithms (Gauss–Legendre and Spigot), and render results either as text or as a PNG image.

Scope of work (modify only src/lib/main.js, tests/unit/main.test.js, README.md, package.json):

1. Dependencies (package.json):
   • Add `minimist` for CLI argument parsing.
   • Add `pureimage` (or a similar pure-JS canvas library) to generate PNG output.

2. Core implementation (src/lib/main.js):
   • Export a new async function `calculatePi(options)` with signature:
     ```js
     async function calculatePi({ digits, algorithm, format, outputFile })
     ```
   • `digits`: integer 1–10000; `algorithm`: "gauss-legendre" or "spigot"; `format`: "text" or "png"; `outputFile` (optional file path).
   • Implement the Gauss–Legendre algorithm with BigInt/rational arithmetic for high-precision π.
   • Implement a fallback Spigot algorithm for moderate precision.
   • For PNG output, render the computed string onto a monospaced canvas (via pureimage), serialize to PNG, and write to `outputFile` or stdout.
   • For text output, write the π string and trailing newline to stdout or `outputFile`.
   • Validate inputs: enforce digit range and supported algorithm/format; on invalid input, throw an error or exit with nonzero code.

3. CLI entrypoint (src/lib/main.js):
   • Use `minimist` to parse `--digits`, `--algorithm`, `--output-format`, and `--output-file` flags (with defaults: 10, "gauss-legendre", "text").
   • Construct the options object, call `calculatePi()`, and handle writing output and error codes.

4. Unit tests (tests/unit/main.test.js):
   • Add tests for `calculatePi()`:
     – Verify the first 20 digits of π match the known reference.
     – Parameterize both algorithms and both output formats (for text, snapshot the string; for PNG, verify a valid PNG header in the result Buffer).
   • Test CLI flag parsing by mocking `process.argv`, capturing stdout or temporary files, and asserting correct invocation and exit codes.
   • Test error cases: digits outside of range, unsupported algorithm, unsupported format.

5. Documentation (README.md):
   • Under “Features”, document the PI_CALCULATION feature.
   • Add a Usage section showing example CLI invocations:
     ```bash
     node src/lib/main.js --digits 100 --algorithm spigot --output-format png --output-file pi100.png
     ```
   • Document the `calculatePi(options)` API with an inline code example.

Verification:
- Run `npm install` to pull in new dependencies.
- `npm test` should pass all new and existing tests (coverage for calculatePi, CLI behavior, error handling).
- Manual smoke tests:
  • `node src/lib/main.js --digits 15` should print π to 15 decimal places.
  • `node src/lib/main.js --digits 50 --output-format png --output-file pi50.png` should produce a valid PNG file.

All changes should be confined to the four specified files to keep the PR focused and reviewable.

LLM API Usage:

```json
{"prompt_tokens":4702,"completion_tokens":1844,"total_tokens":6546,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1024,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---

