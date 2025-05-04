# Overview
Extend the existing API interface feature to include version reporting across CLI, HTTP, and programmatic APIs.

# CLI Behavior
• Introduce flag --version, alias -v to output the tool version from package.json and exit immediately.
• Version command takes precedence over any other flags and does not generate faces or start the server.

# HTTP API
• Add endpoint GET /version
  • On success respond status 200 with JSON body containing field version with the current version string (read from package.json).

# Programmatic API
• Export function getVersion() returning the current version string from package.json.

# Implementation Details
1. Import version from package.json at the top of src/lib/main.js.
2. In main(), before processing help or other flags, detect --version or -v in args. If present, console.log(version) and return.
3. Update createApp() to add a route handler for GET /version that responds with res.json({ version }).
4. Export getVersion() alongside generateFaces and listCategories, reading the imported version constant.
5. Update README.md, docs/USAGE.md, and docs/README.md to document the new CLI flag, HTTP endpoint, and programmatic function.

# Testing
• Add unit tests for getVersion(): expect it to return the exact version from package.json.
• Add CLI tests invoking main with --version and -v, capturing console output to match version string and ensuring process does not exit with error.
• Add HTTP tests for GET /version: expect status 200 and JSON response { version } matching package.json.version.