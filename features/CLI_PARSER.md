# Overview

Integrate a structured CLI parser based on yargs to replace the placeholder main function. This forms the foundation for all subsequent π commands, options, and HTTP endpoints by dispatching to dedicated handlers.

# CLI Interface

Commands:
  calculate-pi <digits>      Compute π to the specified digit count. Supports --output <path>, --verify-digits, --no-verify, --threads, --no-threads, --show-progress, --no-progress, --cache-dir, --no-cache.
  extract-digit <position>   Extract a single π digit at the given index. Supports --base <decimal|hex>, --output <path>.
  extract-range <start>-<end> Extract a contiguous digit range. Supports --base <decimal|hex>, --output <path>.
  benchmark-pi <digits>     Benchmark one or more algorithms. Supports --algorithms <list>, --output-dir <path>, --chart-file <path>, --report-file <path>.
  list-algorithms           List all supported algorithms. Supports --json.
  diagnostics               Print system and runtime diagnostics. Supports --json.
  serve                     Start the HTTP API server. Supports --port <number>.
  help                      Display usage information and exit.
  version                   Print package version and exit.

Global options:
  --cache-dir <path>        Directory for cache files (default ~/.pi_cache).
  --no-cache                Disable cache.
  --verify-digits <count>   Number of random digits to verify (default 10).
  --no-verify               Disable verification.
  --threads <number>        Number of worker threads (default 1).
  --no-threads              Force single-threaded execution.
  --show-progress           Enable progress bar.
  --no-progress             Disable progress bar.

# Implementation

1. Add a dependency on yargs in package.json.  
2. Import yargs and the version field from package.json in src/lib/main.js.  
3. Replace the placeholder console.log in main(args) with yargs.parse to handle process.argv.slice(2).  
4. Define each command with yargs.command(name, description, builder, handler):
   • calculate-pi → calls the existing chudnovskyPi handler with parsed options.
   • extract-digit, extract-range, benchmark-pi, list-algorithms, diagnostics, serve → dispatch to respective implementations.
5. Configure global options via yargs.options so they are available to all commands.  
6. Ensure --help and --version behave correctly and exit without error.  
7. Preserve existing algorithm and HTTP logic by invoking the appropriate feature modules from within handlers.  
8. Maintain ESM imports and the shebang line at the top of main.js.

# Testing

- Update tests/unit/main.test.js:
  • Test that main invoked with ["--help"] prints usage containing each command name and exits 0.  
  • Test that main invoked with ["--version"] prints the version matching package.json and exits 0.  
  • Mock handler functions and verify that yargs dispatches to the correct handler with parsed arguments for each command.  
  • Test unknown command yields nonzero exit code and error message.  
  • Verify that global options appear in parsed arguments passed to handlers (e.g., --cache-dir with calculate-pi).

# Documentation

- Update README.md under Features:
  • List each command with its description and options.  
  • Provide example invocations for common workflows: compute π, extract digits, start server, run benchmarks, diagnostics.  
  • Note the dependency on yargs and instructions for contributing new commands.