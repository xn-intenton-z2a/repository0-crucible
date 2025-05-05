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