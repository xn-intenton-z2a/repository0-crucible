# Capital Cities Ontology Generation

This feature enables fetching capital city data from the REST Countries API and generating an OWL ontology in JSON-LD format using the existing library API.

# CLI Interface

- Support flags
  --capital-cities <ontologyIri>  Fetch capital cities and generate OWL ontology JSON-LD
  --ontology-base <IRI>          Optional base IRI for the @context @base field

# Behavior

When invoked with --capital-cities:
1. Perform an HTTP GET to https://restcountries.com/v3.1/all
2. Parse the JSON response and extract each country's capital and name
3. Build a data object mapping each capital to { country: countryName }
4. Call generateOntology(data, { ontologyIri, baseIri })
5. Output the resulting JSON-LD document to stdout with two-space indentation
6. On missing ontology IRI, print an error to stderr
7. On fetch or parse error, print a descriptive error to stderr

# Tests

- Unit tests mocking fetch:
  - Verify correct data mapping and generateOntology invocation
  - Simulate network failures and invalid JSON errors
- CLI tests:
  - Running with --capital-cities and valid IRI outputs expected JSON-LD
  - Missing ontology IRI errors gracefully
  - Base IRI flag is applied correctly

# Documentation

- Update README with --capital-cities description and examples
- Add usage example in docs/ontology-generation.md without code fences