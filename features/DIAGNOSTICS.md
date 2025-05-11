# Overview
This feature adds a diagnostics mode to the CLI that reports detailed runtime and environment information. Users can invoke diagnostics to inspect Node version, platform details, memory and CPU usage, uptime, current working directory, and key dependency versions. The information is output as JSON for easy consumption.

# CLI Interface
Extend main(args) to accept the following flag:
--diagnostics           Run diagnostics and output a JSON object with:
                        • nodeVersion: string
                        • platform: string
                        • arch: string
                        • uptime: number (seconds)
                        • memoryUsage: object with rss, heapTotal, heapUsed, external (bytes)
                        • cpuUsage: object with user and system (microseconds)
                        • cwd: string
                        • dependencies: object mapping dependency names to versions

When --diagnostics is present, main should bypass other modes and print the JSON to stdout.

# Implementation Details
In src/lib/main.js:
  • Parse args to detect --diagnostics
  • Use process.version, process.platform, process.arch
  • Use process.uptime() for uptime
  • Use process.memoryUsage() and process.cpuUsage() for resource metrics
  • Use process.cwd() for current directory
  • Read package.json at runtime (via import or fs.readFile) to extract dependencies and devDependencies keys and versions
  • Compose an object with all fields and write JSON.stringify(object, null, 2) to stdout
  • Return the diagnostics object from main for ease of testing

Ensure that:
  • Diagnostics mode returns synchronously without error
  • If reading package.json fails, include an empty dependencies object and note the error in a field error

# Testing
Add unit tests in tests/unit/main.test.js:
  • Import main and call main(["--diagnostics"]); verify returned object has correct shape and types
  • Mock process.memoryUsage and process.cpuUsage to fixed values and verify they appear in the returned object

Add e2e tests in tests/e2e/cli.test.js (create tests/e2e directory if needed):
  • Spawn the CLI with node src/lib/main.js --diagnostics
  • Parse stdout as JSON
  • Assert presence and types of all expected keys

# Documentation
Update README.md to describe the --diagnostics flag:
  • Explain each field in the JSON output
  • Provide example command and sample output
  • Note that reading package.json may add overhead and potential error handling