# Summary
Add a CLI help command that displays usage information, lists supported flags and commands, and provides usage examples.

# Functional Requirements
- In src/lib/main.js:
  - Detect if args includes "--help" or "-h" before processing other flags.
    - Construct and print a help message showing:
      - The tool name and version.
      - A list of available CLI flags and their descriptions, including:
        - --list-sources
        - --fetch-source <url> [--output-file <path>]
        - --transform-to-owl <url> [--base-uri <uri>] [--output-file <path>]
        - --build-ontologies [--base-uri <uri>] [--output-file <path>]
        - --query-owl <filePath> --query <expression>
        - --capital-cities
        - --serve [--port <number>]
        - --refresh-sources <configUrl>
      - Example usage lines demonstrating common scenarios.
    - After printing, exit the process with code 0.
  - Ensure that when help is requested, no other flag logic runs.

# CLI Usage
- Display help:
  ```bash
  node src/lib/main.js --help
  ```
- Short alias:
  ```bash
  node src/lib/main.js -h
  ```

# Testing
- In tests/unit/main.test.js:
  - Simulate process.argv containing ["--help"], capture console.log output, and assert it includes:
    - The names of key flags (list-sources, fetch-source, etc.)
    - At least one example usage line.
  - Assert that the process exits with code 0 when help is invoked.

# Documentation
- Update README.md:
  - Add a **Help** section under **Features**.
  - Under **Usage**, include `--help` and `-h` examples with expected output.
