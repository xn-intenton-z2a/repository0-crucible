# Overview

Allow users to save calculated π values to a file instead of only printing to the console. This feature enhances usability for large digit counts by writing results directly to disk.

# CLI Interface

- Add flag --output-file or -o followed by a file path for the π output.  
- If provided, write the computed π string to the specified file.  
- If not provided, default to printing the π string to console.

# Implementation Details

- Extend argument parsing in src/lib/main.js to detect --output-file or -o and capture the output path.  
- After calculatePi(digits) is invoked:  
  - If an output path is set, import fs and call fs.writeFileSync(path, resultString).  
  - Otherwise, console.log the π string as before.  
- Throw a descriptive error if writing to the file fails (e.g., invalid path or permissions).
- No new dependencies are required, as fs is built-in.

# Testing

- In tests/unit/main.test.js:  
  - Simulate main(["--digits","5","--output-file","test.txt"]) and assert that test.txt exists and contains π to 5 decimal places.  
  - Simulate main(["--digits","3"]) without --output-file and capture console output, asserting it matches π to 3 decimal places.  
  - Test error handling when providing an invalid or unwritable file path, expecting a thrown error.
  
- Clean up any test files created during testing.