# Issue Generator Enhancement

This update refines the existing ISSUE_GENERATOR feature to provide a more context-aware and enriched issue-generation workflow. In addition to the previously described improvements such as configurable parameters, robust error handling, and structured issue formats, this update integrates aggregated telemetry data derived from diagnostic logs.

## Overview

- **Context-Aware Generation:** Enrich issue prompts with repository context including recent commit summaries, diagnostic logs, function documentation, and now, aggregated telemetry data (such as NaN fallback warnings and diagnostic error counts).
- **Configurable Parameters:** Introduce new CLI options and environment variable overrides for model selection (e.g., GPT-4), temperature settings, and output formatting. Users can adjust these to modify the level of context injection as well as the detail of the issues generated.
- **Structured Issue Format:** The generated issues follow a clear template including a concise title, a detailed description, implementation steps, testing recommendations, and embedded diagnostic telemetry data to facilitate targeted resolutions.
- **Robust Error Handling:** The module is designed to handle API failures gracefully and falls back to a simplified mode while logging comprehensive diagnostic information for maintainers.

## Implementation Details

- **API Integration:** The module (located in `src/lib/issueGenerator.js`) now reads additional telemetry data via functions like `getAggregatedNaNSummary()` and `enhancedDiagnosticSummary()` to include error frequency, warning counts, and diagnostic timestamps in the context sent to the Chat Completions API.
- **Prompt Enrichment:** Before sending a prompt to the Chat Completions API, the module aggregates context from various sources including recent diagnostic logs, repository performance data, and the new telemetry snapshot. This additional context provides higher relevance and targeted insights in the generated issues.
- **Output Parsing & Formatting:** Once an issue is generated, the module parses the output to align with our issue template (which includes sections for Implementation, Testing, and Diagnostics). The added telemetry section lists key aggregated metrics and actionable recommendations based on observed diagnostic events.
- **CLI and Environment Variables:** Users can trigger the enhanced issue generation using CLI flags such as `--generate-issues` along with new parameters (e.g., `--issue-telemetry`) to explicitly include telemetry data if desired.
- **Documentation & Testing:** README and CONTRIBUTING files are updated with examples demonstrating the enriched issue-generation process. Additional unit and integration tests ensure that telemetry data is correctly appended to the issue context without compromising system performance.

## Benefits

- **Enhanced Diagnostic Feedback:** By integrating aggregated telemetry data, issues generated contain actionable insights directly related to recent diagnostic events, thereby streamlining troubleshooting and resolution.
- **Increased Contextual Accuracy:** With enriched prompts, the issues generated more closely reflect the state of the repository and the environment. This leads to more precise recommendations and improved maintainability.
- **Seamless Integration:** The feature builds on existing functionality and is implemented in a single source file in a coherent manner, maintaining the high cohesion and ease of maintenance in the repository.
