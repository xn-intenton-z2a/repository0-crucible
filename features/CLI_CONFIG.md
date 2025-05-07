# Purpose
Allow users to define default CLI options in a configuration file so they do not need to supply flags on each invocation.

# Implementation Details
1. Parse rc-file flag
   • Add string option rc-file (alias R) to minimist configuration. Default lookup order: a path provided by --rc-file, then a file named .facercrc in the current directory, then ~/.facercrc in the user home directory.
2. Load and parse config file
   • Read the file synchronously. Parse as YAML if extension matches .y[a]ml or as JSON otherwise. On read or parse failure, print help message and exit with code 1.
3. Validate and merge
   • Ensure loaded keys correspond to known flags and types. Discard unknown entries. Merge config values into defaults before parsing CLI args, then reapply CLI args to override config.
4. Apply to execution
   • Proceed with existing main logic using merged flags. Remove the rc-file flag from flags before further processing.

# CLI Interface Examples
- node src/lib/main.js --rc-file customrc.yaml --face
  Reads defaults from customrc.yaml and applies them before executing the face generation.
- node src/lib/main.js --face --count 5
  Uses default count from config file if rc-file is present and count not supplied on the command line.

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Create temporary config files with valid and invalid content. Verify that main merges config and CLI flags correctly, errors on invalid format, and that unknown keys are ignored.
2. Integration Tests in tests/e2e/cli.test.js
   • Invoke CLI with --rc-file and no other flags; assert that config values drive output. Test override behavior when a flag is supplied alongside rc-file.

# Documentation
- Update helpMessage to document --rc-file (alias -R), lookup order, and behavior.
- Add a Config File section in README.md and docs/USAGE.md with examples and default file discovery order.