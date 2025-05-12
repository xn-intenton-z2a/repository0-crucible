# Config File Support

Allow users to define and reuse default CLI options via a configuration file, reducing repetitive flag usage and enabling consistent project-level settings.

# Configuration Sources

• .pirc           JSON or YAML file in the working directory
• pi.config.json  JSON file in the working directory
• package.json    Under the "piCalculator" property

# Implementation

1. Add a new dependency:
   • cosmiconfig: npm install cosmiconfig@^8.0.0
2. In src/lib/main.js before parsing arguments:
   a. Import the synchronus explorer:
      import { cosmiconfigSync } from 'cosmiconfig';
   b. Create an explorer:
      const explorer = cosmiconfigSync('piCalculator', {rc: '.pirc'});
   c. Search for config:
      const searchResult = explorer.search();
      const config = searchResult ? searchResult.config : {};
3. Merge configuration and CLI arguments:
   a. Call minimist with default values from config:
      const defaults = {...config};
      const options = minimist(args, {boolean: [...], string: [...], default: defaults});
   b. Ensure CLI flags override config values.
4. Preserve existing behavior for modes (validate-features, serve, benchmark, convergence-data, chart).

# Testing

1. Create temporary config files in tests/unit/main.test.js:
   - Mock cosmiconfigSync to return a config object for sample flags.
   - Spy on minimist to verify defaults passed include config values.
2. Validate merging precedence:
   - Provide config digits=3, then run main([]) and expect π printed with 3 decimals.
   - Provide CLI --digits=4 and config digits=3 and expect four-decimal output.
3. Test failure when config file has unsupported options; ensure extra keys are ignored.

# Documentation

1. Update docs/USAGE.md:
   - Document search order of configuration sources.
   - Show example .pirc file and package.json snippet.
2. Update README.md under Features:
   - Describe Config File Support.
   - Provide example commands and config file content.
