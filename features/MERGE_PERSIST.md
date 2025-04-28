# Description
Implement a CLI command, HTTP endpoint, and programmatic API to merge JSON data files in the data directory into a single persisted snapshot. This consolidation supports downstream ontology workflows that require a unified dataset.

# Implementation
1. Programmatic API:
   - Export mergePersist({ dataDir = 'data', outFile = 'persisted.json' } = {}) in src/lib/main.js.
   - If dataDir does not exist, log error via console.error and return { count: 0, outFile: null }.
   - Read all files ending with .json in dataDir. For each file:
     • Parse JSON; on parse error log a warning and skip.
     • If content is an array, concatenate elements into a master array.
     • If content is an object, deep merge keys: for arrays under the same key concatenate, for primitive values last one wins, for objects merge recursively.
     • Log each file merge via console.log("merged <filename>").
   - After processing, write the merged result to outFile at project root using fs.writeFileSync with two-space indentation.
   - Log a summary line console.log(`Merged ${count} files into ${outFile}`).
   - Return { count, outFile }.

# CLI Support
- In main(args), detect --merge-persist or -m flag with optional [dataDir] [outFile].
- Call mergePersist with provided parameters or defaults.
- Do not throw on missing or invalid dirs; errors are logged and main returns.

# HTTP Server Endpoint
- Under --serve mode, handle GET /merge-persist:
  • Respond with status 200 and Content-Type text/plain.
  • Override console.log to stream each log line to the response with a newline.
  • Call mergePersist() and after completion restore console.log and end the response.

# Testing
- Unit tests for mergePersist:
  • Mock fs.existsSync, readdirSync, readFileSync, writeFileSync, and console.log/error.
  • Verify behavior when dataDir is missing, empty, contains valid arrays and objects, and on parse errors.
  • Assert correct deep merging and returned summary object.
- CLI tests:
  • Spy on mergePersist to confirm invocation for --merge-persist and -m flags with zero, one, or two args.
- HTTP integration tests:
  • Start server via main(["--serve"]).
  • Issue GET /merge-persist and verify status 200, header text/plain, and streamed log lines including summary.

# Documentation Updates
- Update docs/FEATURES.md to include Merge Persist under the Features list.
- Update docs/USAGE.md and README.md to document --merge-persist usage, examples, and sample output.