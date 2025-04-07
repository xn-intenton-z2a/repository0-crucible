# ENV_CONFIG

This feature introduces a robust, unified configuration module to handle live data integration environment variables. It ensures that numeric environment variables are parsed in a consistent manner, applying fallback values when needed, and logging detailed diagnostic messages only once per unique invalid input. This unifies the handling of inputs such as "NaN" across various whitespace and case variations, and it integrates CLI override values that take precedence over default and fallback settings.

## Overview

- **Unified Parsing:** Consolidates the live data related environment variable parsing logic (for example, for `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY`) into a dedicated module. 
- **Diagnostic Logging:** Provides a standardized one-time warning per unique invalid normalized input to minimize log clutter while still alerting developers to issues with non-numeric values.
- **CLI Overrides & Strict Mode:** Supports CLI options (`--livedata-retry-default` and `--livedata-delay-default`) to override environment values on the fly, and enforces strict mode when specified so that only valid numeric inputs are accepted.
- **Fallback Behavior:** Gracefully handles cases where environment values are undefined, empty, or non-string types without flooding logs with repeated warnings.

## Implementation Details

- **Module Extraction:** Extract the parsing utility (currently encapsulated in _parseEnvNumber and related logic) into a dedicated module (e.g., `src/lib/envConfig.js`).
- **One-Time Warning Cache:** Refine and centralize the caching mechanism to suppress duplicate warnings based on the composite key of variable name and normalized input.
- **CLI Integration:** Update the main CLI dispatcher to leverage the new configuration module for reading live data settings, ensuring that CLI supplied override values are prioritized.
- **Strict Mode Support:** Introduce additional checks such that when strict mode is enabled (via `--strict-env` or `STRICT_ENV=true`), any non-numeric value throws an explanatory error.

## Testing

- **Unit Tests:** Add tests to simulate various invalid inputs (e.g., empty strings, several variants of "NaN" with extra spaces, tabs, and non-breaking spaces) ensuring that only one warning is logged per unique normalized input.
- **Integration Tests:** Ensure behavior remains consistent when environment variables are missing, non-numeric, or overridden via CLI, both in non-strict and strict modes.
- **Fallback Verification:** Validate that the fallback values are correctly applied in case of invalid inputs and that the diagnostic logs include detailed unit information (variable name, raw input, normalized input, and fallback value with unit).
