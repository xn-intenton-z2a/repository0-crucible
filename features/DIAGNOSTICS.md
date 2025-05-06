# Summary

Add a diagnostics mode to report runtime environment and internal configuration in a machine-readable form to aid debugging and integration.

# Specification

- Introduce a --diagnostics flag recognized before any face generation or other modes.
- When --diagnostics is provided:
  • Suppress normal face output and exit before sampling.
  • Collect diagnostic information into a JSON object with fields:
    – nodeVersion: the version of Node from process.version
    – cliVersion: version field from package.json
    – builtInFacesCount: number of entries in builtInFaces
    – categories: sorted array of all valid categories from the built-in library
    – customLoaded: boolean indicating if a custom faces file was provided
    – customFacesCount: number of faces loaded from the custom file (0 if none)
    – mergeMode: one of none, replace, or merge depending on flags
    – seed: seed value if provided or null
    – timestamp: ISO timestamp when diagnostics were run
- Print the JSON object to stdout and exit with status 0.
- If there is an error reading the custom file during diagnostics, include an error field in the JSON and exit with status 1.

# CLI Usage

node src/lib/main.js --diagnostics

# Testing

- Add tests that invoke main(["--diagnostics"]) and capture console.log to parse JSON
- Verify the JSON object contains all required keys with correct types
- Test that custom file flags (--faces-file, --merge-faces) are reflected in customLoaded, customFacesCount, and mergeMode
- Test that providing an invalid faces file path yields a JSON error field and throws

# Documentation

- Update README.md under Features to document --diagnostics mode with example output
- Create docs/DIAGNOSTICS.md to describe structure of the JSON report and usage scenarios

# Implementation Details

- In src/lib/main.js detect --diagnostics before parsing other flags
- Import version from package.json via readFileSync and JSON.parse or via import
- Build the diagnostic object by inspecting process.version, builtInFaces array, parsed command line flags, and file loading logic
- Use console.log to print JSON.stringify with two-space indentation
- Wrap file reads in try/catch and include error.message in diagnostics under key error