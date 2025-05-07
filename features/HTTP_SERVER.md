# Purpose
Serve ASCII faces over HTTP with support for theme-based face generation and a dedicated /themes endpoint for discovering available themes.

# Implementation Details
1. HTTP Flags and Startup
   • Parse boolean option serve (alias s) and numeric port (alias p) via minimist, default port 3000.
   • Validate port is a positive integer; on invalid value print help and return.
   • Load custom faces via config if flags.config is present.
   • Start http.createServer listening on the specified port and log a startup message with the port number.

2. GET /face Endpoint
   • Query parameters: count (default 1), seed (optional), theme (optional), includeCustom (optional, default true).
   • Validate count as integer ≥1; on invalid count respond 400 JSON error.
   • Validate seed as non-negative integer; on invalid seed respond 400 JSON error.
   • If theme is provided, ensure faceThemes[theme] exists; else respond 400 JSON error.
   • Build baseFaces:
     – Start from faceThemes[theme] if theme provided, else asciiFaces.
     – If includeCustom is true, append customFaces loaded from flags.config.
   • Use seeded LCG random if seed given, else Math.random. Generate count faces via getRandomFace(baseFaces, rand).
   • If Accept header includes text/plain, respond with plain text (one face or newline-separated list); otherwise respond with JSON (string or array).

3. GET /faces Endpoint
   • Query parameter includeCustom (true|false), default true.
   • Validate includeCustom; on invalid value respond 400 JSON error.
   • Build facesList by concatenating asciiFaces and customFaces if includeCustom.
   • Respect Accept header for text/plain vs application/json as above.

4. GET /themes Endpoint
   • No query parameters.
   • Build an object mapping each theme name to its full array of faces from faceThemes.
   • If Accept header includes text/plain, respond with lines: themeName: face1,face2,...
   • Otherwise respond with application/json and JSON.stringify of the theme map.

5. Error Handling and Logging
   • For unknown paths, respond 404 with JSON { error: "Not Found" }.
   • For each request, log method, path, query object, and response status.

# Testing
1. Unit Tests
   • Expose request handler for HTTP to allow direct invocation.
   • Test GET /face with theme query returns only faces from that theme.
   • Test invalid theme returns 400 and JSON error.
   • Test GET /themes returns correct JSON object and plain text for Accept: text/plain.
   • Validate seed and count behavior in /face.

2. End-to-End Tests
   • Start server with --serve and --port 0; issue HTTP requests via http client or curl.
   • Test themed face generation: /face?theme=sad&count=2; expect two sad faces.
   • Test GET /themes and verify response formats.
