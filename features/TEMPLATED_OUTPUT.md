# Summary

Enable rendering generated ASCII faces into custom structured formats using EJS templates. Users can supply a template file and an output path to produce HTML, Markdown, or any text-based format incorporating the face output and parameters.

# Specification

- Introduce a --template <path> flag to specify a file path to an EJS template
- Introduce a --output <path> flag to specify a file path to write rendered output; if omitted, render to stdout
- Load the template before face generation and compile it with data context including:
  • faces array containing the generated face strings
  • parameters object with count, seed, category, and timestamp
- On template file missing or parse errors, print a descriptive error and exit with nonzero status
- Ensure output directory exists or report error
- Maintain existing behavior when no template flag is provided: default to plain face lines

# CLI Usage

node src/lib/main.js --face 3 --seed 42 --template ./templates/faces.ejs --output faces.html
node src/lib/main.js --face --category happy --template report.ejs

# Testing

- Add tests in tests/unit/main.test.js to verify rendering with a simple inline template string by mocking fs reads
- Verify that context passed to ejs.render contains correct faces, count, seed, and category
- Verify that --output writes the rendered content to the given file path
- Test missing or invalid template path produces a descriptive error and throws

# Documentation

- Update README.md under Features to document --template and --output flags with usage examples
- Add docs/TEMPLATED_OUTPUT.md describing template context structure and example template files

# Implementation Details

- In src/lib/main.js extend argument parsing to detect --template and --output flags
- Use fs.readFileSync to load the template text, and ejs.render to produce output
- After generating the faces array, pass data context to the template renderer
- Write the rendered string to the specified output path with writeFileSync, ensuring directories exist
- Catch and handle errors from file system and template compilation consistently with errorExit