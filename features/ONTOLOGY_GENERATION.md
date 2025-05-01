# Ontology Generation

This feature adds core functionality to transform JSON data into OWL ontologies represented as JSON-LD. It provides library APIs and CLI commands to generate ontology files from arbitrary JSON inputs.

# Specification

## Dependencies

- Add jsonld dependency in package.json to leverage JSON-LD framing and context operations.

## Library API

### src/lib/index.js

- Export an asynchronous function:
  - generateOntology(data, options)
    - data: Object representing JSON input
    - options: {
        ontologyIri: string,  // IRI for the ontology
        baseIri?: string      // optional base IRI for JSON-LD context
      }
    - Returns a promise resolving to a JSON-LD document with:
      - @context including OWL and RDF prefixes
      - @id set to ontologyIri
      - @graph containing converted data nodes

## CLI Enhancements

### src/lib/main.js

- Add support for flags:
  - --to-owl <outputPath>    
    - Reads JSON input from stdin or file argument
    - Calls generateOntology with parsed JSON and options
    - Writes resulting JSON-LD to stdout or outputPath
  - --ontology-base <IRI>    
    - Passes base IRI for context to generateOntology

- Update help text to include new flags under CLI usage.

## Tests

### tests/unit/index.test.js

- Add tests for generateOntology:
  - Verify returned document includes @context with OWL and RDF prefixes
  - Verify @id matches provided ontologyIri
  - Verify @graph contains input data mapped to JSON-LD nodes

### tests/unit/main.test.js

- Extend CLI tests to cover --to-owl and --ontology-base:
  - Simulate stdin JSON input
  - Capture stdout and verify valid JSON-LD output without errors

## Documentation

### README.md

- Update Features section to include Ontology Generation.
- Add CLI usage example:

  cat data.json | node src/lib/main.js --to-owl --ontology-base http://example.org/ontology > ontology.json

- Add library usage example:

  import { generateOntology } from '@xn-intenton-z2a/repository0-crucible';
  
  const owl = await generateOntology({ Person: { name: 'Alice' } }, { ontologyIri: 'http://example.org/ontology' });
