# COLOR_OUTPUT Feature

# Overview
Add optional ANSI color styling to emoticon output using chalk. Users can enable colored emoticon display in CLI mode and HTTP server text responses by specifying a color style via command-line flag or environment variable. Supported styles include red, green, yellow, blue, magenta, cyan, and random.

# CLI Options
--color <style>    Enable colored output with the given style. Supported styles: red, green, yellow, blue, magenta, cyan, random. If style is random, a new color is chosen for each emoticon.
Environment variable EMOTICONS_COLOR can be used if --color is not provided.  CLI flag takes precedence over environment variable.

# HTTP Behavior
When HTTP server is started with --color or EMOTICONS_COLOR, endpoints returning plain text (/ and /list) emit emoticons wrapped in ANSI color codes. JSON endpoints remain unchanged to preserve parsable output.

# Implementation Details
In src/lib/main.js:
- Import chalk.
- Detect color style at startup by checking --color flag in args or EMOTICONS_COLOR in process.env.
- Validate style is one of the supported values; on invalid style, print error and exit with code 1.
- Store selected style in a variable.
- Create function applyColor(face) that wraps face in chalk style or selects a random supported color when style is random.
- In CLI output paths, apply applyColor to emoticons before console.log.
- In HTTP server mode, apply applyColor only to plain text responses at / and /list when style is set.

# Tests
In tests/unit/main.test.js:
- Add tests for main(['--color','red']) prints emoticon wrapped in red ANSI codes.
- Test that --color random picks a supported color and wraps output.
- Test that invalid --color value causes error message and process.exit(1).
- Test environment variable EMOTICONS_COLOR honored when --color absent.

In tests/unit/server.test.js:
- Start server with --serve and --color blue; verify GET / returns ANSI-wrapped emoticon and GET /list returns colored lines.
- Confirm JSON endpoints remain uncolored.

# Documentation
Update README.md and docs/EMOTICON_OUTPUT.md and docs/HTTP_API.md:
- Document --color option and EMOTICONS_COLOR environment variable.
- List supported styles and describe effect on CLI and HTTP plain text responses.
- Provide usage examples for CLI and curl with colored output.