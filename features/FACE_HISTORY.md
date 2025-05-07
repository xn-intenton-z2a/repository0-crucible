# Purpose
Allow users to persist generated ASCII faces to a history file for auditing or record-keeping.

# Implementation Details
1. Parse persist flag
   • Add string option persist (alias P) to minimist configuration.  
   • Default value: undefined (no persistence if not provided).
2. Determine history file path
   • If persist flag is provided without a value, default to "face_history.log" in the current directory.  
   • If a file path is supplied, use that path.
3. Append faces to file
   • After generating each face in ascii-face mode (including batch via count), call fs.appendFileSync(path, face + "\n").  
   • On append error, log a warning message but continue normal output.
4. Integrate with existing modes
   • Apply persistence only in CLI ascii-face mode (flags ascii-face and count).  
   • Do not alter HTTP server behavior or custom faces handling.
5. Help message update
   • Include --persist (-P) in helpMessage with description and usage example.

# CLI Interface Examples
- node src/lib/main.js --ascii-face --persist
  Appends the generated face to face_history.log and prints it to console.
- node src/lib/main.js --ascii-face -c 3 -P history.txt
  Generates three faces, prints each line, and appends them to history.txt.

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock fs.appendFileSync and stub console.log.  
   • Verify appendFileSync is called with correct file path and content for default and custom paths.
   • On append error, ensure warning is logged but face output still occurs.
2. E2E tests in tests/e2e/cli.test.js
   • Simulate CLI with --ascii-face --persist --count 2 --persist history.log.  
   • After run, read history.log and assert it contains exactly two lines matching asciiFaces.

# Documentation
- Update README.md under Features to describe the --persist flag and default behavior.  
- Update docs/USAGE.md with examples for persisting face history.