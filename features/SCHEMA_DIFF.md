# SCHEMA_DIFF Feature Enhancement

## Overview
This feature unifies and enhances the core JSON schema diff capabilities with comprehensive Markdown reporting and AI-powered explanations. In addition to the existing functionalities—including batch and interactive diffs, diagnostic modes, and plain language summaries—this update introduces a caching mechanism for AI explanations. This caching will store responses from the OpenAI API locally to reduce repeated API calls, lower costs, and improve response times.

## Functionality
- **Core Diff Operations**:
  - Perform diffs between JSON schemas with both human‑readable and machine‑parsable outputs.
  - Support both batch and interactive diff modes.

- **Interactive Mode & Diagnostics**:
  - Enable guided, step‑by‑step analysis with an `--interactive` flag.
  - Support diagnostic flags like `--diagnostics` and `--refresh` to report runtime details and reload internal states.

- **Markdown Report Generation**:
  - Generate well-structured Markdown documents via a `--report` flag.
  - Categorize changes into sections (Additions, Removals, Modifications).

- **AI-Powered Diff Explanation**:
  - Utilize the OpenAI API to provide plain language summaries for schema changes via the `--explain` flag.
  - Produce narratives that detail the impact and context of the differences.

- **AI Explanation Caching**:
  - Implement a local caching mechanism for AI-generated explanations.
  - Cache responses in a JSON file (e.g., `src/lib/explainCache.json`) keyed by a hash of the schema diff inputs.
  - Check the cache before making an API call to reduce latency and cost.
  - Provide a configuration to clear cache or bypass for fresh explanations.

## Implementation
- **Module Updates**:
  - Enhance `src/lib/schemaDiff.js` to include AI explanation caching logic alongside the diff and reporting functionalities.
  - When the `--explain` flag is used, generate a unique key for the diff input and check the cache before invoking the OpenAI API.
  - Cache the API response for future requests.

- **CLI Integration**:
  - Update CLI parsing modules (`src/lib/cliParser.js` and `src/lib/main.js`) to support the caching configuration and the new caching behavior for the `--explain` flag.

- **Testing & Validation**:
  - Add unit tests (e.g., in `tests/unit/schemaDiff.test.js`) to verify interactive scenarios, correct cache reads and writes, diagnostic outputs, and the accurate formatting of both raw and AI-enhanced diff reports.

## Documentation & User Guidance
- Update README.md and CONTRIBUTING.md with examples that illustrate how to use the new `--explain` flag with caching enabled.
- Document configuration options for cache management (e.g., clearing cache, disabling caching).
- Ensure inline code comments and API documentation are updated to reflect the caching mechanism.

## Value Proposition
By integrating a caching mechanism for AI explanations, this updated SCHEMA_DIFF feature reduces latency and API costs while providing enhanced, contextual insights into JSON schema changes. This leads to a more efficient and cost-effective tool for API developers, aligning closely with our mission to simplify API evolution and facilitate developer collaboration.