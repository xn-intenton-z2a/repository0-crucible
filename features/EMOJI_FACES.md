# Purpose
Allow users to generate random emoji-based facial expressions as an alternative to ASCII art, using a new --emoji flag.

# Implementation Details
1. Define an array emojiFaces in src/lib/main.js with a set of expressive emoji strings such as 😀, 😢, 😲, 😠, 😍.
2. Extend minimist configuration to include a boolean option emoji (alias e).
3. In main(), when flags.emoji is set:
   • Validate that no conflicting flags (config, theme) are used; if conflicts exist print helpMessage and return without error.
   • Override the faces list with emojiFaces.
   • Proceed to apply count, seed, and json options as usual for batch, deterministic, or JSON output.
4. Update helpMessage to describe the --emoji (-e) flag and list its purpose.
5. Do not add any new dependencies or alter existing behavior outside face generation logic.

# CLI Interface Examples
- node src/lib/main.js --face --emoji
  Outputs a single random emoji face.
- node src/lib/main.js --face -e --count 3
  Outputs three emoji faces, one per line.
- node src/lib/main.js --face --emoji --json
  Outputs one emoji in JSON string format.
- node src/lib/main.js --face --emoji --count 2 --json
  Outputs a JSON array of two emoji faces.

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock console.log and run main(["--face","--emoji"]); assert the output is one of emojiFaces.
   • Test alias -e with --count 2 and --json; verify console.log called once with a valid JSON array of two emojiEntries.
   • Simulate invalid combinations (such as --emoji without --face or with --config); assert that helpMessage is printed once.
2. Integration tests in tests/e2e/cli.test.js
   • Execute CLI with --face --emoji and capture stdout; assert it contains a valid emoji from emojiFaces.
   • Test JSON output and count behavior for emoji mode across multiple runs.

# Documentation
- Update README.md under Features to document the --emoji (-e) flag and its purpose.
- Extend docs/USAGE.md with an "Emoji Faces" section that includes CLI usage examples and expected output.