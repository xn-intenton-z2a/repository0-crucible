# Purpose
Allow users to narrow the pool of ASCII or emoji faces using a regular expression filter to target specific patterns and integrate with both CLI and HTTP modes.

# Implementation Details
1. Parse filter flag
   • Add string option filter (alias F) to minimist configuration alongside existing options
   • Attempt to construct new RegExp(flags.filter); on SyntaxError, print help message and exit with code 1
2. Apply filter in CLI mode
   • After assembling the faces array (from asciiFaces, theme override, customFaces, or emojiFaces), apply faces = faces.filter(face => regex.test(face))
   • If faces is empty after filtering, print help message indicating no faces match the pattern and exit with code 1
3. Apply filter in HTTP mode
   • Extend GET /face and GET /faces endpoints to accept filter query parameter
   • Validate filter param by constructing new RegExp; on invalid regex respond 400 JSON { error: "Invalid filter" }
   • After building baseFaces or facesList, apply the regex filter
   • If the filtered list is empty, respond 400 JSON { error: "No faces match filter" }

# CLI Interface Examples
- node src/lib/main.js --face --filter "^.*_.*$"
- node src/lib/main.js --face -F "\\(T_T\\)" --count 3

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Call main with valid filter and verify console.log outputs only matching faces
   • Test invalid regex input triggers help message and exit without exception
2. Integration Tests in tests/e2e/cli.test.js
   • Spawn CLI with --face --filter, newline, and exit; verify output only includes matching faces
   • Verify invalid filter yields help message
3. HTTP Tests in tests/unit/http.test.js and tests/e2e/cli.test.js
   • GET /face?filter=... and /faces?filter=...; assert status codes and filtered results

# Documentation
- Update README.md under Features to document the --filter (-F) flag with description and examples
- Extend docs/USAGE.md with a Filter Faces section covering CLI and HTTP usage