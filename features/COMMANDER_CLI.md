# Overview

Integrate Commander.js for robust and declarative CLI argument parsing, validation, and help generation, replacing ad-hoc argument handling in main.js.

# CLI Interface

Leverage Commander to define options and commands consistently:

• --digits <n>          Integer number of decimal places (default 10, max 1000)
• --cache <on|off>       Enable or disable result caching (default on)
• --cache-file <file>    Path to persistent cache JSON (default .pi_cache.json)
• --clear-cache          Clear cache before computing
• --benchmark            Run performance benchmarks
• --format <text|json>   Output format for pi calculation (default text)
• --output <file>        File path for CLI output (default stdout)
• --algorithm <name>     Choose computation algorithm (machin or chudnovsky)
• --workers <n>          Number of worker threads for parallel computation
• --progress             Display a progress bar during computation
• --diagnostics          Output runtime diagnostics as JSON
• --serve <port>         Launch HTTP API server on given port
• --cors                 Enable CORS in server mode
• -h, --help             Show help and exit

# Implementation Details

In src/lib/main.js:
• Install commander as a dependency and import { Command } from 'commander'.
• Instantiate a Command, set name, version, and description from package.json.
• Use .option() calls to declare each CLI flag with its type, default, and description.
• Replace manual argv parsing: call program.parse(argv) and read program.opts().
• Branch logic based on opts: compute pi, run cache logic, benchmarks, diagnostics, HTTP server, or show help.
• Ensure validation rules (e.g. integer ranges, allowed choices) are enforced through commander’s built-in mechanisms or custom option processing.
• Retain existing functionality for caching, benchmarking, progress, algorithm selection, diagnostics, and HTTP API under new structured parsing.
• Remove manual process.argv loops and help printing logic.

# Testing

Update tests/unit/main.test.js and add new tests in tests/unit/cli-commander.test.js:
• Mock commander’s parse to simulate various arg combinations and verify opts on program.
• Validate error handling: supplying invalid values triggers commander error and process.exit override.
• Ensure existing calculatePi and main behavior remains correct when invoked via commander-managed opts.

Update tests/e2e/cli.test.js:
• Run CLI commands prefixed with node src/lib/main.js using new commander-based interface.
• Assert output and exit codes are consistent with prior tests under all flags.

# Documentation

In README.md:
• Replace manual flags section with Commander-driven usage examples and auto-generated help output.
• Document each CLI option with descriptions, defaults, and examples.
• Show sample commands for pi calculation, caching, benchmarking, diagnostics, and server mode.

In package.json:
• Add commander@latest to dependencies.

Ensure backward compatibility: users invoking legacy flags still see the same behavior but under the new parser.