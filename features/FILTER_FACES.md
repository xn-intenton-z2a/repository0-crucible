# Purpose
Allow users to narrow the pool of ASCII or emoji faces using a regular expression, enabling targeted emotional feedback and custom scripting based on pattern matching.

# Implementation Details
1. Parse filter flag
   • Add a string option filter (alias F) to minimist configuration.
   • Require a valid JavaScript regular expression string. Attempt new RegExp(flags.filter) and on SyntaxError print help message and exit with code 1.
2. Filter faces list
   • After preparing the base faces array (based on asciiFaces, theme override, custom faces, or emojiFaces), apply faces = faces.filter(face => regex.test(face)).
   • If faces array is empty after filtering, print help message indicating no faces match the pattern and exit with code 1.
3. Integrate with generation modes
   • CLI: In main(), after assembling faces and before sampling loop, apply the filter step.
   • HTTP: Extend /face and /faces endpoints to accept filter query parameter. Validate with RegExp, filter the baseFaces or facesList accordingly, return HTTP 400 on invalid regex or empty result.
4. Help and validation
   • Update helpMessage to include --filter (-F) description and note that it accepts a JavaScript regex without enclosing slashes.
   • On invalid regex or no matches, display help message and exit or respond with HTTP 400 and JSON error.

# CLI Interface Examples
- node src/lib/main.js --face --filter "\^.*_.*$"
  Outputs a random face matching the regex ^.*_.*$ from the combined faces list.
- node src/lib/main.js --face -F "\\(_\\)_" --count 3
  Outputs three faces that contain the literal pattern _( )_.

# HTTP API Examples
- curl "localhost:3000/face?filter=%5E.%2A_%2A%24"
  Returns a JSON string of one face matching the pattern ^.*_.*$.
- curl "localhost:3000/faces?filter=\(T_T\)&includeCustom=false"
  Returns a JSON array of all built-in faces matching (T_T).

# Testing
1. Unit Tests
   • Add tests in tests/unit/main.test.js: call main with valid filter and verify console.log outputs only matching faces.
   • Test invalid regex strings cause helpMessage and exit behavior.
   • In HTTP tests, use httpRequest to GET /face?filter=... and /faces?filter=... and assert proper status codes and filtered responses.
2. Integration Tests
   • In tests/e2e/cli.test.js: spawn CLI with --face --filter and verify only matches printed; test --face --filter invalid outputs help.
   • In HTTP E2E tests: request endpoints with filter that yields empty and assert 400 response.

# Documentation
- Update README.md under Features to document the --filter (-F) flag with description and examples.
- Extend docs/USAGE.md with a "Filter Faces" section showing CLI and HTTP usage and behavior.