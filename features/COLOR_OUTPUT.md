# Purpose
Enable ANSI color customization for ASCII facial expressions in CLI mode, enhancing emotional feedback with user-specified colors.

# Implementation Details
1. Parse color flag
   • Add string option color (alias C) to minimist configuration.
   • Accept standard color names supported by chalk (red, green, blue, yellow, magenta, cyan, white, gray).
   • Validate that the provided color matches a chalk method; on invalid color, print help message and exit with code 1.
2. Add chalk dependency
   • Install chalk and add it to package.json dependencies.
   • Import chalk in src/lib/main.js.
3. Apply coloring
   • In main(), when face mode is active and flags.color is set, wrap each generated face string in chalk[flags.color](face).
   • For batch mode, apply coloring to each line individually.
   • Do not alter HTTP server behavior; ignore or return error for color in serve mode.
4. Help and validation
   • Update helpMessage to include --color (-C) description and supported color list.
   • On invalid usage of --color, display help and exit without errors.

# CLI Interface Examples
- node src/lib/main.js --face --color green
  outputs a green colored face.
- node src/lib/main.js --face -c 3 -C blue
  outputs three blue colored faces, one per line.
- node src/lib/main.js --face --color invalid
  prints help message and exits.

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock console.log and chalk methods; run CLI with --face --color red; verify output contains ANSI codes from chalk.red.
   • Verify invalid color prints help message exactly once.
2. Integration tests in tests/e2e/cli.test.js
   • Execute CLI binary with --face --color magenta; capture stdout; assert presence of magenta ANSI escape codes in output.

# Documentation
- Update README.md under Features to describe the --color (alias -C) flag and supported colors.
- Extend docs/USAGE.md to include a Color Output section with usage examples and list of supported colors.