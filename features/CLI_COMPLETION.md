# Overview

Add support for generating shell completion scripts for common shells directly from the CLI. This enables users to enable tab completion for flags and options without manual script writing, improving discoverability and efficiency when using the tool interactively.

# CLI Interface

Extend main(args) to accept the following flag:

--generate-completion <bash|zsh|fish>    Output a completion script for the specified shell to stdout and exit.

Behavior:
• When this flag is provided, bypass normal PI calculation or server startup and print a complete shell script that users can source or install in their shell’s completion directory.
• The script should register all CLI options including digits, algorithm, workers, format, output, serve, cors, rate-limit, stream, chunk-size, ws-port, ws-path, analyze, cache, diagnostics, progress, swagger-ui, graphql, etc.

# Implementation Details

• Add a new dependency, tabtab, to package.json to manage completion script generation.
• In src/lib/main.js before parsing other flags, detect --generate-completion. Use tabtab to generate the script:
  • Import tabtab from 'tabtab'.
  • Call tabtab.complete('pi-calculator', { name: 'pi-calculator' }, shell) to get script text.
  • Print the returned script to stdout and exit(0).
• Ensure version and description passed to tabtab match package.json metadata.
• Do not invoke any other logic when this flag is present.

# Testing

• Add unit tests in tests/unit/main.test.js:
  - Mock tabtab.complete to return a known script string. Invoke main(["--generate-completion","bash"]). Assert console.log is called with the script and process.exit(0).
  - Test invalid shell names (e.g., "foo") cause console.error with message "Unsupported shell 'foo'" and process.exit(1).
• E2E tests in tests/e2e/cli.test.js:
  - Run CLI with `node src/lib/main.js --generate-completion bash` and capture stdout. Assert it contains a line defining a completion function for the tool name.
  - Repeat for zsh and fish.

# Documentation

• Update README.md under a new "Shell Completion" section:
  - Describe the --generate-completion flag and supported shells.
  - Provide example:
        node src/lib/main.js --generate-completion bash > pi-completion.sh
        source pi-completion.sh
  - Note that scripts can be installed to /etc/bash_completion.d or ~/.config/fish/completions for permanent use.