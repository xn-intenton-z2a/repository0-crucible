# Feature Overview

Allow users to override the built-in ASCII face set by supplying an external YAML configuration file. The CLI will load face definitions (label and art) from the provided file and use them in all modes (random, seed, list). If the config flag is omitted or loading fails, the tool falls back to the built-in collection.

# Usage

Support the following flag:
• --config <path> : path to a YAML file defining an array of faces with 'label' and 'art' fields.

Examples:
node src/lib/main.js --config faces.yaml --list
node src/lib/main.js --config custom-faces.yml --seed 123

# Implementation Details

Import fs/promises and js-yaml. When the config flag is provided:
• Read the file asynchronously.
• Parse YAML into an array of objects with 'label' and 'art'.
• Validate structure: each item must have string label and art.
• If loading or validation fails, log a warning and continue with built-in faces.

In main:
• After parsing CLI args, if opts.config is set, attempt to load and override faces.
• Ensure all existing behaviors (random, seed, list) operate on the loaded faces array.

# Testing

Add unit tests to:
• Mock fs.readFile to return valid YAML and verify faces override.
• Simulate invalid YAML or read error and assert fallback to built-in faces with a warning.
• Test that list, seed, and random modes work with custom definitions.
