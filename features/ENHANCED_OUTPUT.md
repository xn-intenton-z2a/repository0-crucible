# ENHANCED_OUTPUT Feature

# Overview
Extend the existing emoticon output pipeline with a diagnostics mode that emits internal application state and configuration details in JSON for observability and automated integration. Retain current capabilities: random and seeded selection, full list output, JSON modes, interactive REPL, custom config, and ANSI color styling.

# Diagnostics Mode
Provide a new CLI flag --diagnostics to output a JSON object containing:

- version: application version string
- configSource: "builtin" or resolved file path
- emoticonCount: number of emoticons loaded
- isCustomConfig: boolean flag
- colorStyle: current ANSI style or null if none
- supportsColorLevel: chalk.supportsColor.level

Also support environment variable EMOTICONS_DIAGNOSTICS when --diagnostics is not provided.

# CLI Options
--diagnostics       Output application diagnostics as JSON and exit
--config <path>     Load custom emoticon list from JSON or YAML
--color <style>     Apply ANSI color styling to output
--list              List emoticons with zero-based indices and styling if enabled
--seed <n>          Select deterministically; non-negative integer
--json              Output results in JSON format
--interactive, -i   Launch interactive REPL with commands random, seed, list, json, help, exit
--help, -h          Display help message and exit
--version, -v       Display application version and exit
--serve             Start HTTP server mode
--port <n>          Set HTTP server port (default 3000)

# Implementation Details
1. Detect --diagnostics flag or EMOTICONS_DIAGNOSTICS env var after loading config and color selection.
2. Gather state: import version from package.json, track isCustomConfig, EMOTICONS length, resolved config path or "builtin", current chalk style or null, chalk.supportsColor.level.
3. Output JSON.stringify of diagnostics object to stdout and exit with code 0.
4. Ensure diagnostics mode bypasses other behaviors (no emoticon output, no server start, no REPL).
5. On invalid config or style, diagnostic output should include error field and exit code 1.

# Tests
- Verify --diagnostics prints proper JSON keys and values for default builtin config.
- Verify EMOTICONS_DIAGNOSTICS env var triggers diagnostics when flag is absent.
- Confirm emoticonCount matches BUILTIN_EMOTICONS length and matches custom list count.
- Confirm configSource reflects file path when loading custom config.
- Confirm colorStyle shows selected style or null when none specified.
- Confirm supportsColorLevel matches chalk.supportsColor().level.
- Ensure exit code 0 on success and 1 on config/style errors.

# Documentation
Update README.md and docs/EMOTICON_OUTPUT.md to:

- Document --diagnostics flag and EMOTICONS_DIAGNOSTICS environment variable
- Show example of running diagnostics with default and custom config
- Describe JSON schema of diagnostics output