# Schema Validator

This feature introduces robust ontology validation using schema definitions powered by the Zod library. The Schema Validator ensures that the live-built ontology adheres to specific structural requirements before further processing, export, or persistence. This provides an additional layer of data quality assurance to complement existing features.

## Overview

- **Purpose:** Validate key components of ontologies (title, concepts, classes, properties, and metadata) using well-defined schemas.
- **Reliability:** Prevent propagation of malformed ontologies by catching errors early in the data pipeline.
- **Integration:** Can be invoked through the CLI via a dedicated flag (e.g., `--validate-schema`) and incorporated into automated testing workflows.

## Implementation Details

- **Schema Definitions:** Use Zod to define structured schemas for each ontology component. Schemas will enforce the types and required fields (e.g., a non-empty string for `title`, an array for `concepts`).
- **Validation Module:** Create a new module (e.g., `src/lib/schemaValidator.js`) exporting a `validateSchema(ontology)` function that returns validation results. Log errors with detailed messages if the ontology fails validation.
- **CLI Integration:** Extend the main CLI command to accept a flag such as `--validate-schema`. When this flag is present, the program will run the schema validation on the current ontology and output the outcome.
- **Fallback and Reporting:** If validation fails, detailed diagnostics will be emitted, including which fields did not meet the criteria. The validation errors can be integrated with existing diagnostic logs to aid troubleshooting.

## Testing

- **Unit Tests:** Write tests to cover various valid and invalid ontology structures, ensuring that the validation function catches errors appropriately and passes valid ontologies.
- **Edge Cases:** Tests will include scenarios with missing fields, wrong types, and extra unexpected properties. Ensure that the error messages are clear and actionable.
- **Integration:** Tie into existing test suites to run validation as part of the live data integration process.

This feature aligns with the mission by enhancing live data quality and ensuring that downstream operations (like export and visualization) operate on accurate and consistent ontology data.