features/ASCII_FACE.md
# features/ASCII_FACE.md
# ASCII_FACE

## Description
Extend the CLI application to support colored ASCII face output and machine readable JSON output for integration. JSON mode formats any output as an object with keys face, faces, names, indexedFaces or diagnostics.

## CLI Options
- --color or -C                enable colored output
- --no-color                   disable colored output
- --color-level <level>        force a color level from 0 to 3
- --json or -j                 output results as JSON instead of plain text
(Other existing flags remain unchanged: --count/-c, --face, --list-faces, --list-names/-l, --seed/-s, --name/-n, --diagnostics/-d, --help/-h, --serve/-S, --port/-p)

## Implementation Details
1. Detect the json flag before other options and remove it from the argument list. If json is used with serve mode, throw an error.
2. After computing results in main, if json mode is active wrap results into an appropriate JS object:
   - face mode: object with key face mapping to the face string
   - batch mode: if count is set, wrap into key faces mapping to an array of face strings
   - list names mode: wrap sorted face identifiers under key names
   - list faces mode: wrap indexed face strings under key indexedFaces
   - diagnostics mode: wrap the existing diagnostics object under key diagnostics
3. In CLI invocation, if result is an object, use JSON stringify to output on a single line to stdout
4. Ensure colored output may be retained inside the JSON values when color level is greater than zero

## Testing
Add tests in tests/unit/main.test.js for JSON mode:
- main with face and json flag returns an object with key face and valid face string
- main with count and json returns object with key faces and array of correct length
- main with list names and json returns object with key names and correct sorted identifiers
- main with list faces and json returns object with key indexedFaces and correct entries
- invalid combinations such as serve with json produce an error
Ensure existing tests for plain output and HTTP API continue to pass unchanged

## Documentation
1. Update README.md under Features to include the new json flag description and examples for each mode
2. Update docs/ascii_face.md with a JSON Output section explaining usage examples, object structure, and behaviorfeatures/HTTP_API.md
# features/HTTP_API.md
# HTTP_API

## Description
Add a new HTTP server mode that exposes ASCII faces and related metadata via REST endpoints. This feature enables integration with web clients, automation workflows, and monitoring tools by providing a simple HTTP API alongside the existing CLI.

## CLI Options

--serve, -S
    Start the HTTP server (default port 3000).
--port <number>, -p <number>
    Specify a custom listening port for the server.

## Implementation Details

1. In src/lib/main.js detect the --serve or -S flag and optional --port / -p argument.  
2. Use Node.js built-in http module to create an HTTP server instance.  
3. Define these endpoints:
   - GET /face
     Return a single random face as plain text.
   - GET /faces
     Return an array of "index: face" strings in JSON format.
   - GET /names
     Return the sorted array of face identifiers (keys of FACE_MAP) in JSON.
   - GET /seed/:value
     Use seedrandom with the provided value to select a deterministic face and return it as plain text.  
   - GET /name/:face
     Lookup the face name case-insensitively in FACE_MAP and return it. Respond with 404 if invalid.  
   - GET /diagnostics
     Return a JSON object containing node version, application version, face count, face names array, and dependencies map.  
   - Any other route
     Respond with 404 status and a JSON error message.
4. Listen on the specified port and log a startup message. Handle SIGINT to close the server gracefully.

## Testing

1. Add tests in tests/unit/api.test.js using built-in http or a tool like supertest.  
2. Verify each endpoint returns correct HTTP status, content type, and payload structure.  
3. Confirm deterministic behavior of /seed/:value.  
4. Test error conditions: invalid face name on /name, invalid seed format on /seed (return 400), and unknown routes.  

## Documentation

1. Update README.md under Features and Usage to include the new serve mode, port option, and example curl commands.  
2. Add docs/http_api.md describing each endpoint with request and response examples.