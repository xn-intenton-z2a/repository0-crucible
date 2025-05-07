# Purpose
Provide pre-defined themed sets of ASCII faces selectable via a --theme flag to quickly switch between emotional palettes without requiring custom config files.

# Implementation Details
1. Define default themes
   • In src/lib/main.js, add a constant THEMES mapping theme names (e.g. happy, sad, surprised, angry) to arrays of ASCII face strings.
2. Parse theme flag
   • Extend minimist configuration to include a string option theme (alias T).
   • Validate that the specified theme exists in THEMES. On invalid theme, print help message and exit with code 1.
3. Integrate with face generation
   • In main(), after loading built-in faces and any custom faces, if flags.theme is set, override faces list with THEMES[flags.theme].
   • Ignore custom config when theme is used; only apply theme set.
4. Help and validation
   • Update helpMessage to include --theme (-T) description and list available theme names.
   • Include valid theme names in error messages on invalid flag input.

# CLI Interface Examples
- node src/lib/main.js --face --theme happy
  Outputs a randomly selected face from the happy theme set.
- node src/lib/main.js --face -T sad --count 2
  Outputs two faces chosen from the sad theme list.
- node src/lib/main.js --face --theme invalid
  Prints help message listing available themes and exits with code 1.

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Mock console.log and run main with --face --theme happy; verify output is one of THEMES.happy.
   • Test alias -T with multiple counts.
   • Provide invalid theme name; assert help message printed once and exit code behavior.
2. Integration Tests in tests/e2e/cli.test.js
   • Execute CLI binary with --face --theme surprised; capture stdout; assert face belongs to THEMES.surprised.

# Documentation
- Update README.md under Features to document the --theme flag, its purpose, and list available themes.
- Extend docs/USAGE.md with a new Themes section showing examples for happy, sad, surprised themes and flag usage.