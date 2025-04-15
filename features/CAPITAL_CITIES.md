# CAPITAL_CITIES Feature Specification

## Overview
This feature implements and enhances the CLI command `--capital-cities` to output an OWL ontology of world capital cities. It supports several optional flags that allow users to filter, format, and sort the output. The key functionalities include:

- **Filtering:** Use `--country=<COUNTRY_NAME>` to display capital cities from a particular country.
- **Formatting:** Use `--format=<FORMAT>` to output in standard OWL JSON or JSON-LD format.
- **Sorting:** Use `--sort=<ORDER>` where `<ORDER>` is either `asc` or `desc` for alphabetical sorting. Additionally, the implementation now validates the sort parameter and gracefully handles invalid options.

This update improves the robustness of the sorting functionality and ensures a seamless user experience when interacting with the CLI tool.

## Implementation Details
- **Source File (src/lib/main.js):**
  - Add a new branch in the command parser for `--capital-cities`.
  - Parse additional CLI arguments: `--country`, `--format`, and `--sort`.
  - Integrate sorting logic using built-in array sorting with localeCompare. Validate the sort parameter; if an invalid value is provided, output an informative error message.

- **Testing (tests/unit/main.test.js):**
  - Add unit tests to cover the new error handling for the sort option:
    - Test for valid sort orders (`asc` and `desc`).
    - Test for an invalid sort parameter to confirm the proper error message is returned.
  - Ensure that previous tests for filtering and formatting remain valid and complete.

- **Documentation (README.md):**
  - Update usage examples to include the proper syntax for the new sorting feature and error handling behavior.
  - Document expected output structure, including error messages when the sort parameter is invalid.

## Value and Alignment with Mission
This refinement builds on the existing functionality by adding robust error handling and input validation. It enhances the reliability of the output and aligns with the mission of providing user-friendly and resilient tools for managing OWL ontologies.

## Future Considerations
- Add more filtering options (e.g., by continent) if data becomes available.
- Enhance output customization based on further user feedback.

