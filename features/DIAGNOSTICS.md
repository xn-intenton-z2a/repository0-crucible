# DIAGNOSTICS

## Description
Add a diagnostics mode to the CLI application that prints essential environment and dependency information to assist in troubleshooting and confirm installation integrity. This complements the existing face output by providing context about runtime and module versions.

## CLI Options

--diagnostics, -d
    Invoke diagnostics mode. No other flags are permitted alongside.

## Implementation Details

1. In src/lib/main.js detect when args[0] is --diagnostics or -d.
2. If args length is greater than 1, throw Error: unknown flag '<flag>'.
3. Obtain runtime and application data:
   - Node.js version via process.version
   - Application version by reading package.json version field
   - Face count using ASCII_FACES.length
   - Face names sorted alphabetically by Object.keys(FACE_MAP)
   - Dependencies object by reading package.json and extracting the "dependencies" section
4. Format the diagnostics output as an array of strings:
   - "Diagnostics:" header
   - "Node.js version: <version>"
   - "Application version: <version>"
   - "Face count: <number>"
   - "Face names: <name1>, <name2>, ..."
   - "Dependencies:" header
   - One line per dependency in the form "- <package>@<version>"
5. Return the array so that the CLI invocation block logs each line and exits with code 0.

## Testing

1. Add tests in tests/unit/main.test.js:
   - Verify main(["--diagnostics"]) and main(["-d"]) return an array.
   - Assert the first element is "Diagnostics:".
   - Assert presence of a line starting with "Node.js version: " matching process.version.
   - Assert presence of a line starting with "Application version: " matching package.json version.
   - Assert presence of "Face count: <ASCII_FACES.length>".
   - Assert face names line lists all keys from FACE_MAP sorted.
   - Assert the dependencies list contains key packages from package.json.dependencies.
2. Mock file system or import package.json directly to obtain expected values.
