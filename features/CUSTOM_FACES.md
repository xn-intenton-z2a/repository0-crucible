# Purpose
Allow users to supply a custom JSON file of ASCII faces to override or extend the built-in list, enabling tailored emotional feedback.

# Implementation Details
1. Parse faces-file flag
   • Add string option faces-file (alias f) to minimist configuration.  
   • Default value: undefined (use built-in faces if not provided).
2. Load and validate custom file
   • If faces-file is specified, attempt to read the file synchronously using fs.readFileSync.  
   • Parse content as JSON.  
   • Ensure the parsed data is an array of non-empty strings.  
   • On parse error, non-array, or invalid entries, print an error message and exit without exception.
3. Override faces list
   • If validation passes, replace asciiFaces for the current run with the custom array.  
   • Otherwise fall back to built-in asciiFaces.
4. Integrate with existing modes
   • In ascii-face and serve modes, use the effective asciiFaces array (built-in or custom).
5. Help message update
   • Add --faces-file (-f) to the helpMessage with description and usage example.

# CLI Interface Examples
- node src/lib/main.js --ascii-face --faces-file faces.json  
  Uses faces.json to supply faces; prints one face by default.
- node src/lib/main.js --ascii-face -f /path/to/custom.json --count 3  
  Prints three faces from the custom file.

# Testing
1. Unit tests in tests/unit/main.test.js
   • Valid custom file returns only values from the file.  
   • Invalid JSON file path or malformed content triggers error message and no exception.
2. E2E tests in tests/e2e/cli.test.js
   • Simulate CLI with --faces-file and verify override behavior in ascii-face and serve modes.

# Documentation
- Update README.md under Features to describe the --faces-file flag.  
- Update docs/USAGE.md with examples for using a custom faces file.