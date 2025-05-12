# Interactive REPL Mode

Allow users to enter a persistent interactive shell to configure parameters and run π calculations without restarting the CLI for each command. This enhances productivity for exploratory analysis and rapid iteration of π approximations and related exports.

# CLI Option

--repl               Start the tool in interactive REPL mode. All other flags are ignored when --repl is provided.

# REPL Commands

A prompt `pi> ` accepts the following commands:

- `digits <number>`          Set decimal places for algorithms that use digits.
- `algorithm <name>`         Select calculation algorithm (leibniz, montecarlo, chudnovsky, gauss-legendre).
- `samples <number>`         Set sample count for Monte Carlo.
- `diagnostics [on|off]`     Enable or disable diagnostics output.
- `chart <filepath>`         Generate and save convergence chart PNG to filepath using current settings.
- `data <filepath>`          Export convergence data JSON array to filepath using current settings.
- `compute` or `calc`        Run the calculation and display the result or diagnostics.
- `help`                     Show list of available commands and usage.
- `exit` or `quit`           Exit the interactive session.

# Implementation

1. Extend minimist in src/lib/main.js to recognize `repl` as a boolean flag.
2. In `main()`, detect `opts.repl`. If true:
   a. Import `readline` from Node and initialize a REPL loop with a prompt.
   b. Maintain an in-memory `sessionOptions` object seeded from default CLI options.
   c. On each input line, parse the command and update `sessionOptions` or invoke calculation logic:
      - For configuration commands, validate values and assign to `sessionOptions`.
      - For `compute`, call existing calculation paths (single-run, convergence, chart, or data exports) using `sessionOptions`.
   d. For chart and data commands, reuse the code paths for PNG chart rendering and JSON export by passing file paths.
   e. Handle errors in commands by printing user-friendly messages; loop continues until `exit` or `quit`.
   f. On exit, close the readline interface and return from `main()`.
3. Do not modify other CLI modes when `--repl` is used.

# Testing

1. In tests/unit/main.test.js, simulate REPL input via mocking `readline.createInterface` and its `line` event:
   - Test setting each session option and verify internal state updates.
   - Test `compute` command prints correct result using a spy on `console.log`.
   - Test invalid commands produce an error message and do not terminate the REPL.
   - Test `exit` command closes the interface and ends `main()` without error.
2. Verify that with `--repl` flag, no other CLI modes (benchmark, serve, validate-features) execute.

# Documentation

1. Update docs/USAGE.md under a new section **Interactive REPL Mode** to describe how to start and use the REPL, including sample session transcripts.
2. Update README.md under **Features** to add **Interactive REPL Mode** with a brief description and example:
   ```bash
   node src/lib/main.js --repl
   # pi> digits 4
   # pi> algorithm montecarlo
   # pi> compute
   # 3.1416
   # pi> exit
   ```