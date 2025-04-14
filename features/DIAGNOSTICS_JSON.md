# DIAGNOSTICS_JSON Feature Update

## Overview
This update refines the diagnostics command by replacing the generic `--json` flag with a more precise `--diagnostics-json` flag. This change enhances clarity and consistency with other JSON output command flags, ensuring that diagnostic information is output in a dedicated and unambiguous manner.

## Implementation Details
- **Source Code Updates:**
  - In `src/lib/main.js`, modify the `diagnostics` function to check for the presence of the `--diagnostics-json` flag instead of `--json`.
  - When the `--diagnostics-json` flag is detected, output the diagnostics as a structured JSON object containing keys: `nodeVersion`, `platform`, and `memoryUsage`.
  - Maintain the plain-text output when the flag is not provided.

- **Testing Enhancements:**
  - In `tests/unit/main.test.js`, update the diagnostics tests so that they call the diagnostics command using `--diagnostics-json` instead of `--json` when expecting JSON output.
  - Ensure that both the legacy (plain-text) and new JSON output behaviors are covered.

- **Documentation Updates:**
  - In `README.md`, update usage examples in the Diagnostics section to reflect the new flag:
    ```bash
    node src/lib/main.js --diagnostics --diagnostics-json
    ```
  - Update `CONTRIBUTING.md` where relevant to inform contributors of the updated diagnostics flag behavior.

## Future Considerations
- Optionally, consider a transitional period that supports both `--json` and `--diagnostics-json` flags with appropriate warning messages if needed.
- Monitor user feedback and further refine the diagnostics output format as additional diagnostic metrics may be included in the future.
