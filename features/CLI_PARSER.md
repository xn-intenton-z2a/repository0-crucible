# Overview

Integrate a structured command-line interface using commander.js. This feature establishes the foundational CLI for owl-builder, enabling users to discover data sources and invoke core transformation workflows via named commands rather than raw process.argv parsing.

# Source File Changes (src/lib/main.js)

1. Import and configure commander:
   - Add import of { program } from 'commander'.
   - program.name('owl-builder').description(...) and version aligned with package.json.
2. Define `list-sources` command:
   - Description: List the constants of URL endpoints for free open public data sources.
   - Action: Print each source name and URL as JSON or formatted list.
3. Define `capital-cities` command stub:
   - Description: Fetch or stub-fetch world capital cities in OWL JSON format.
   - Action: Placeholder implementation that logs an empty JSON array and exits.
4. Replace manual process.argv slicing and main(args) console.log with program.parseAsync(...) and separate action handlers.

# Tests (tests/unit/main.test.js)

1. Add a test suite for CLI commands:
   - Simulate `node src/lib/main.js list-sources` and assert that output includes known source keys.
   - Simulate `node src/lib/main.js capital-cities` and assert process exits without error and outputs valid JSON array.
2. Retain existing import and non-null tests.

# Documentation (README.md)

1. Update the Features section with descriptions of `list-sources` and `capital-cities` commands.
2. Add Usage examples:
   - `node src/lib/main.js list-sources`
   - `node src/lib/main.js capital-cities`
3. Note future commands will be added for crawling and OWL transformation.

# Dependencies (package.json)

1. Add `commander` to dependencies (latest semver).
2. No other dependency changes.

# Value Delivered

This feature creates a robust CLI foundation, improves discoverability of data source constants, and sets up the pattern for adding further commands that realize the mission of crawling, transforming, and managing OWL ontologies in JSON form.