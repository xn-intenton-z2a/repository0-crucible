# Summary

Introduce ANSI color support for face output to enhance visual feedback. When the color flag is provided, generated faces are wrapped in ANSI escape sequences corresponding to the specified color.

# Specification

- Recognize a new flag `--color` in addition to existing CLI options.  
- Optional positional argument after `--color` specifies a color name; if omitted, default to green.  
- Supported colors and ANSI codes:
  • black   (30)
  • red     (31)
  • green   (32)
  • yellow  (33)
  • blue    (34)
  • magenta (35)
  • cyan    (36)
  • white   (37)
- Behavior when `--color` is present with `--face`:
  1. Generate faces as usual.
  2. For each face string, wrap with `\x1b[{code}m` before and `\x1b[0m` after, where `{code}` is the ANSI code for the chosen color.
- `--color` has no effect on list commands (`--list-faces`, `--list-categories`) or other modes (`--interactive`, `--serve`, `--json`, `--diagnostics`).
- Error handling:
  • If an unsupported color name is provided, call `errorExit` with a message listing valid colors and exit with nonzero status.

# Testing

- Add tests in `tests/unit/color.test.js` to verify:
  • Default behavior (`--face --color`) wraps output in green codes.  
  • Named color (`--face --color red`) wraps output in red codes for each line.  
  • Invalid color name (`--color invalid`) triggers `errorExit` with descriptive error and nonzero exit.

# Documentation

- Update `README.md` under Features to document the `--color` flag, supported colors, default behavior, and examples:

  node src/lib/main.js --face --color
  node src/lib/main.js --face 3 --color yellow

- Add a section in `docs/CLI_COLOR_OUTPUT.md` describing flag syntax, supported colors, examples, and error cases.

# Implementation Details

- In `src/lib/main.js`, extend the CLI parsing loop:
  1. Detect `--color` and optional next argument as `colorName`.  
  2. Validate `colorName` against the `supportedColors` map. If missing, set to "green".  
  3. When outputting each face in the `--face` block, if `colorFlag` is true, look up the ANSI code and wrap printed face accordingly.
  4. Use `console.log(`\x1b[${code}m${face}\x1b[0m`)` for colored output.  
  5. On invalid color, call `errorExit` with message: `Unsupported color '<name>'. Supported colors: ${list}.`