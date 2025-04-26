# Capital Cities Ontology

## Overview
Introduce a dedicated CLI flag that fetches country data from public sources, converts it into an OWL ontology focused on capital cities, and outputs the result as JSON-LD. This provides a one-step command for users to generate a capital cities ontology without manual flag composition.

## Functionality
- Recognize a --capital-cities flag in src/lib/main.js.
- Internally invoke existing fetch logic with the sourceKey "capitalCities".
- Transform the fetched JSON array into a JSON-LD ontology using the standard OWL, RDF, RDFS, and XSD context:
  - Define a base IRI of http://example.org/resource/ or allow overriding with optional --base <IRI>.
  - Map each country object to an individual with @id = baseIRI + country.code or index.
  - Create data properties for country name, capital name, population, and region with appropriate XSD datatypes.
  - Construct an @graph array and context with OWL and RDF prefixes.
- Support an optional --out <filename> argument to write the JSON-LD to a file; default to stdout.
- On invalid fetch, transformation errors, or invalid flags, print an error message and exit with non-zero code.

## Usage
node src/lib/main.js --capital-cities
node src/lib/main.js --capital-cities --base http://myontology.org/ --out capitals.jsonld

## Testing
- Add unit tests in tests/unit/main.test.js mocking global.fetch and jsonld APIs:
  - Simulate a successful fetch of an array with sample country objects and assert the generated @context and @graph structure matches expected JSON-LD.
  - Test that providing --base overrides the base IRI in generated @id values.
  - Verify that --out writes to the specified file, and default stdout behavior when omitted.
  - Simulate fetch failure or JSON-LD transform errors and ensure main exits with a non-zero status code and prints an error.

## Documentation
- Update README.md under Features to list the --capital-cities flag with description and example commands.
- Extend docs/USAGE.md to include a subsection on generating the capital cities ontology.