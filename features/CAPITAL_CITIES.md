# Capital Cities Ontology

## Overview
Add a --capital-cities flag to the CLI that fetches a curated list of world capital cities from a public API, transforms it into an OWL ontology in JSON-LD format, and outputs or writes the result.

## Functionality
- Recognize a --capital-cities option in src/lib/main.js with optional --base <filename> and --out <filename> arguments.
- Retrieve capital city data from a configured public source such as the REST Countries API or a maintained SOURCES entry.
- Transform each city record into a JSON-LD individual of type ex:CapitalCity under a configurable base IRI.
- Define a standard @context including OWL, RDF, RDFS, XSD, and a custom ex prefix for resource IRIs.
- Map properties:
  - name as ex:cityName with xsd:string
  - country as ex:countryName with xsd:string
  - population as ex:population with xsd:integer
  - coordinates as ex:latitude and ex:longitude with xsd:decimal
- Use jsonld APIs to flatten and merge generated fragments, remove duplicate individuals by @id.
- Support merging into an existing ontology with --base and writing to a file or stdout with --out.
- Emit descriptive errors for network failures, JSON parse errors, or merge conflicts and exit with non-zero codes.

## Usage
node src/lib/main.js --capital-cities --out capitals.jsonld
cat existing.jsonld | node src/lib/main.js --capital-cities --base existing.jsonld

## Testing
- Add unit tests in tests/unit/main.test.js mocking global.fetch to return sample capital city arrays and assert the generated @context and @graph structure.
- Simulate duplicate entries and verify deduplication of individuals.
- Test behavior with and without --base and --out options and error handling for network or JSON failures.

## Documentation
- Update README.md under Features and Usage to document the --capital-cities flag, describe parameters, show example commands, and provide sample output.