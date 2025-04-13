# CAPITAL_CITIES Feature

## Overview
This feature introduces a new CLI command `--capital-cities` that allows users to generate an OWL ontology in JSON format showcasing capital cities across the world. It aligns with our mission to provide examples of transforming public data into OWL ontologies and demonstrates the capabilities of our OWL building tool.

## Implementation Details
- **CLI Integration:** Extend the main CLI parser to accept a `--capital-cities` flag. Upon invocation, the CLI will fetch data, process it, and output the resultant OWL ontology as a JSON file.
- **Data Retrieval:** Retrieve capital city data from a verified open public data source. Ensure error handling and fallback behaviors are implemented.
- **Ontology Transformation:** Utilize the core library functions to convert the raw JSON data into a compliant OWL ontology structure and output it in JSON format.
- **Testing:** Update and add tests in the `tests/unit` folder to cover:
  - Successful invocation of the command without errors.
  - Correct transformation of external data into the expected OWL format.
  - CLI help and usage messages updated to include `--capital-cities`.

## Documentation
- Update the README to include a usage example for the `--capital-cities` flag.
- Provide example output and instructions on how to add or modify data sources.

## Dependencies
- Ensure any new dependencies required for data fetching or processing (if any) are documented and added to `package.json`.
- Leverage existing libraries (like `lodash`, `ejs`, and `zod`) to maintain consistency.

## Future Considerations
- Extend the feature to support additional filters and options for different data sets.
- Enhance error reporting and diagnostics specific to OWL ontology generation.
