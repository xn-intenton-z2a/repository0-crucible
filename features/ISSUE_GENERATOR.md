# Issue Generator Enhancement

This update refines the existing ISSUE_GENERATOR feature to further empower maintainers with a context-aware, configurable issue generation workflow. The enhanced module will interact with the Chat Completions API with added parameters, enriched context injection, and robust error handling.

# Overview

- **Context-Aware Generation:** Enrich user prompts with repository context such as recent commit messages, diagnostic logs, and function documentation when generating issues.
- **Configurable Parameters:** Introduce CLI options for selecting the model (e.g., GPT-4), temperature setting, and output formatting. Users can override defaults via environment variables or CLI flags.
- **Structured Issue Format:** The generated issues will be parsed and formatted with clear titles, detailed descriptions, implementation steps, testing recommendations, and diagnostic links.
- **Robust Error Handling:** Graceful degradation in case of API failures or unexpected responses, with thorough diagnostic logging.

# Implementation Details

- **API Integration Module:** Update the existing module (e.g., `src/lib/issueGenerator.js`) to accept new CLI flags such as `--issue-model`, `--issue-temp`, and `--generate-issues`. Validate inputs before sending the request to the Chat Completions API.
- **Prompt Enrichment:** Append additional context (such as recent diagnostic logs or commit summaries) to the user prompt to improve issue relevance.
- **Output Parsing & Formatting:** Ensure that the transformed output adheres to the repository issue template, including sections for Implementation, Testing, and Diagnostics.
- **Fallback Mechanism:** If the API fails, provide informative error messages and fallback to a simplified issue generation mode.
- **Documentation:** Update README and CONTRIBUTING to include instructions on using the enhanced options. Provide examples of CLI invocation and configuration via environment variables.

# Testing & Validation

- **Unit Tests:** Extend tests to simulate varied API responses using mocks, validating that the generated issues include all required sections.
- **Integration Tests:** Use headless testing to demonstrate the CLI command behavior, ensuring that new flags are correctly processed.
- **Edge Cases:** Test with empty or malformed prompts, verify that enhanced context is appended correctly, and ensure that error handling is triggered appropriately.

This enhancement aligns with the repository mission by streamlining development workflows and transforming high-level ideas into actionable tasks with enriched context and configurability.