# JSON-LD Processing

This feature adds core functionality to process JSON-LD data using the jsonld library. It enables both library APIs and CLI commands for compacting and expanding JSON-LD documents.

# Specification

## Dependencies
- Add `jsonld` dependency in package.json

## Library API

### src/lib/index.js
- Export two functions:
  - `compact(document, context)` returns a promise resolving to the compacted JSON-LD document.
  - `expand(document)` returns a promise resolving to the expanded JSON-LD document.

## CLI Enhancements

### src/lib/main.js
- Add support for `--compact`, `--expand`, and `--context <path>` flags.
- When invoked with `--compact` and `--context`, read JSON-LD input from stdin or file argument and output the compacted result to stdout.
- When invoked with `--expand`, read JSON-LD input and output the expanded result.
- Include help text for new flags in the `--help` output.

## Tests

### tests/unit/main.test.js
- Add tests to verify CLI flags parse correctly and invoke compact and expand APIs without error.

### tests/unit/index.test.js
- Add tests in a new file or extend existing to validate `compact` and `expand` functions using a simple example from JSON_LD_SYNTAX.md.

## Documentation

### README.md
- Update Features section to include JSON-LD Processing.
- Add Usage examples showing how to run CLI commands:
  - `cat input.json | node src/lib/main.js --compact --context context.json`
  - `cat input.json | node src/lib/main.js --expand`
