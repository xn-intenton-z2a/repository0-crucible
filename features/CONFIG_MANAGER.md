# CONFIG_MANAGER

## Overview
This feature provides a centralized module for managing environment configuration and validating runtime parameters. It standardizes how configuration values are normalized, parsed, and overridden via CLI options, while aggregating diagnostic telemetry for invalid inputs. By consolidating these capabilities into a single module, the feature improves maintainability and observability across the repository.

## Features
- **Centralized Parsing:** Implements robust value normalization (trimming and collapsing whitespace, including non-breaking spaces) and numeric parsing for environment variables.
- **CLI Overrides:** Ensures CLI-provided defaults (e.g. `--livedata-retry-default`, `--livedata-delay-default`) always take precedence over environment and fallback values.
- **Telemetry Aggregation:** Batches and aggregates warnings for non-numeric or malformed input, logging a single diagnostic event per unique invalid value even under high concurrency. This telemetry data is accessible via a dedicated CLI flag (`--diagnostic-summary-naN`).
- **Consistency:** Provides a unified API for retrieving configuration values, reducing inconsistencies across ontology and live data operations.
- **Error Handling:** In strict mode, immediately throws errors for invalid configuration, ensuring only valid inputs are used during runtime.

## Implementation Details
- Developed as a self-contained module (ideally in a single source file) that can be imported and used by other components.
- Exposes key functions such as `normalizeEnvValue`, `parseEnvNumber`, and `resetEnvWarningCache` along with telemetry retrieval.
- Integrates promise-based batching for asynchronous logging, ensuring atomic aggregation of diagnostic events.
- Offers utility methods that align with the repository’s current configuration logic, while enhancing error reporting and observability.

## Benefits
- **Improved Maintainability:** Consolidates diverse configuration-handling logic into one module.
- **Enhanced Diagnostics:** Aggregated telemetry helps in quickly identifying and addressing misconfigurations.
- **Aligned with Mission:** Ensures robust live data integration by verifying all configuration inputs, thereby supporting reliable ontology building.
