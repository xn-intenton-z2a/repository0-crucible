# Overview

Add a diagnostics feature to the CLI tool that outputs detailed environment and runtime metrics. This helps users and developers inspect Node.js version, system resources, process usage, and algorithm performance baselines before or after π computations.

# CLI Interface

--diagnostics  
    Print a summary of system and process diagnostics and exit without performing π calculations.

--diagnostics --json  
    Output diagnostic data in structured JSON format instead of human-readable text.

# Implementation

- In src/lib/main.js, detect the --diagnostics flag early in argument parsing.  
- Import Node’s built-in os and process modules.  
- Collect fields:  
  • nodeVersion: process.version  
  • platform: process.platform  
  • arch: process.arch  
  • cpus: os.cpus().length  
  • totalMemory: os.totalmem()  
  • freeMemory: os.freemem()  
  • loadAverage: os.loadavg()  
  • processUptime: process.uptime()  
  • memoryUsage: process.memoryUsage()  
- If --json is provided, serialize an object with these fields to stdout.  
- Otherwise, format into aligned columns or labeled lines.  
- After printing diagnostics, exit with status code zero without invoking other flags.

# Testing

- Add unit tests in tests/unit/main.test.js:  
  • Invoke main with ["--diagnostics"] and capture stdout; verify presence of key labels (Node Version, Platform, Total Memory).  
  • Invoke main with ["--diagnostics","--json"] and parse stdout as JSON; verify it contains all expected properties.  
  • Ensure main exits cleanly without errors or side effects.

# Documentation

- Update README.md under Features to document the --diagnostics option.  
- Provide example commands:  
  node src/lib/main.js --diagnostics  
  node src/lib/main.js --diagnostics --json
