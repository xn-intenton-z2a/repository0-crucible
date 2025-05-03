# ENHANCED_OUTPUT Feature

# Overview
Merge the core emoticon output functionality with optional ANSI color styling into a single cohesive CLI feature. Provide random and seeded selection, full list output, JSON output modes, interactive REPL, and custom emoticon configuration, all supporting optional color themes.

# ANSI Color Styling
Allow users to specify a color style for all plain text emoticon output via:

CLI flag --color <style>
Environment variable EMOTICONS_COLOR if flag is absent

Supported styles include red, green, yellow, blue, magenta, cyan, and random. When style is random, pick a new color per emoticon. Use chalk to apply styling.

# Extended Configuration
Support loading custom emoticon lists from JSON or YAML files specified by:

CLI option --config <path>
Environment variable EMOTICONS_CONFIG when flag is absent

Validate that the path exists and content is an array of strings. On failure, print an error and exit with status 1. Override the built-in list on success.

# CLI Options
--config <path>     Load custom emoticon list from JSON or YAML
--color <style>     Apply ANSI color styling to output
--list              List emoticons with zero-based indices and styling if enabled
--seed <n>          Select an emoticon deterministically; input must be a non-negative integer
--json              Output results in JSON format for single or list modes
--interactive, -i   Launch an interactive REPL supporting commands random, seed, list, json, help, exit; apply styling when enabled
--help, -h          Display help message and exit
--version, -v       Display application version and exit

# Implementation Details
In src/lib/main.js, extend the emoticon pipeline to:
1. Detect and load custom config before any selection logic
2. Detect color style via flag or environment and validate against supported values
3. Import and configure chalk for ANSI styling
4. Wrap emoticon output in the chosen style for all plain text modes, including REPL
5. Maintain existing JSON output unstyled for parsable output
6. On invalid config or style, print an error and exit with code 1

# Tests
In tests/unit/main.test.js, add or update tests to verify:
- --color with each supported style wraps output correctly
- --color random selects from supported styles per emoticon
- EMOTICONS_COLOR environment variable is honored when --color is absent
- --config loads custom lists and overrides built-in emoticons
- Invalid paths or formats for config or color produce errors and exit code 1
- Combined behaviors of list, seed, json, and interactive modes under color and config scenarios

# Documentation
Update README.md and docs/EMOTICON_OUTPUT.md to:
- Document the --color flag and EMOTICONS_COLOR environment variable
- List supported color styles and behavior when random style is used
- Show examples of CLI commands with and without color styling
- Illustrate loading custom lists and styled output in plain text and JSON modes