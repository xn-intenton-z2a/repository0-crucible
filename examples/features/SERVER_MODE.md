# SERVER_MODE

## Overview
This feature introduces a server mode for the CLI tool by adding a new flag `--serve`. When invoked with `--serve`, the application will start an HTTP server using Node’s built-in modules. The server will listen on a predefined port (e.g., 3000) and provide a simple JSON response that indicates the service is running. This feature enhances the agentic behavior by allowing the tool to operate as a lightweight HTTP server for diagnostics or remote control.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - Add a new conditional branch in the main function to detect the `--serve` flag.
  - When the flag is detected, initialize an HTTP server using Node’s built-in `http` module.
  - The server will listen on port `3000` (or a configurable port) and return a JSON response for requests made to the root endpoint. Example response: `{ "status": "Server running", "timestamp": <current_time> }`.
  - Ensure that if the server mode is active, other CLI processing is bypassed or appropriately deferred.

- **Test File Update (tests/unit/main.test.js):**
  - Add a test case simulating a CLI invocation with the `--serve` flag.
  - Mock or capture `console.log` outputs to ensure that the expected startup message (e.g., "Server started on port 3000") is logged.
  - Optionally, simulate an HTTP request to the server and assert that it returns the correct JSON response.

- **README Update (README.md):**
  - Document the new `--serve` flag under the Usage section with an example command:
    ```bash
    node src/lib/main.js --serve
    ```
  - Explain that server mode starts a lightweight HTTP server that can be used for diagnostics or remote control.

- **Dependencies File Update (package.json):**
  - No additional external dependencies are required because the implementation utilizes Node’s built-in `http` module.

## Testing & Compatibility
- Run `npm test` to verify that the new server mode test case passes.
- Manually test by running `node src/lib/main.js --serve` and accessing `http://localhost:3000/` to see the JSON response.
- Ensure that in non-server mode, the CLI behaves as before.

## Future Considerations
- Make the server port configurable via an environment variable or a command-line parameter.
- Expand the server endpoints to expose additional agentic diagnostics or control functions.
- Integrate security features (e.g., basic authentication) if the server is to be exposed in less secure environments.