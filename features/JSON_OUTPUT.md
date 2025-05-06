# Summary

Introduce a JSON output mode for the CLI so consumers can parse results programmatically. When the JSON_OUTPUT flag is provided, the tool will emit structured JSON instead of plain text.

# Specification

- Recognize a new flag --json or --json-output in addition to existing flags.  
- Apply only in non-interactive, non-serve modes. If --interactive or --serve is present, ignore JSON_OUTPUT.  
- When --json is provided:
  • For face generation (--face): collect generated faces into an array and print a single line of valid JSON:  
      {"faces": ["<face1>", "<face2>", ...]}  
  • For listing faces (--list-faces): print {"faces": [ ... ]}  
  • For listing categories (--list-categories): print {"categories": [ ... ]}  
- Exit status remains 0 on success.  
- Error conditions (invalid args, missing file, invalid category) should still use errorExit, print a descriptive error to stderr, and exit with nonzero status.  
- The JSON should be compact (no added whitespace) to ease automated parsing.  

# Testing

- Add tests in tests/unit/main.test.js for:
  • main(["--face","--json"]) returns one JSON line with faces array.  
  • main(["--face","3","--seed","42","--json"]) returns expected JSON array of length 3.  
  • main(["--list-faces","--json"]) returns {"faces":[...]}  
  • main(["--list-categories","--json"]) returns {"categories":[...]}  
  • Invalid use (e.g., --json without any mode flag) prints Run with JSON output: { } or fallback to help.  
  
# Documentation

- Update README.md under Features to document --json or --json-output flag with examples:  
    node src/lib/main.js --face --count 3 --json  
    node src/lib/main.js --list-categories --json  
- Add a section in docs/CLI_JSON_OUTPUT.md describing the JSON format keys, usage examples, and error behavior.

# Implementation Details

- In src/lib/main.js, extend the argument parsing loop to detect --json or --json-output and set jsonOutput=true.  
- After determining mode (face, list-faces, list-categories), if jsonOutput is true:
  1. Build a JavaScript object matching the mode: {faces: [...] } or {categories: [...] }.  
  2. Use console.log(JSON.stringify(obj)) instead of printing lines.  
  3. Skip printing individual lines.  
- Ensure errorExit continues to write errors to stderr and exit with code 1.  
- Add help text for the JSON flag in the usage examples printed when no flags are provided.