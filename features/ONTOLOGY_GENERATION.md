# Overview

This feature provides unified OWL ontology generation functionality, combining the core library API with built-in data source integration for common public datasets.

# Library API

Export function generateOntology(data, options)

- data: object whose keys are term names and values are term property objects
- options:
  ontologyIri: string (required)  IRI for the ontology document
  baseIri: string (optional)      Base IRI for the @base field in @context
- Returns a promise resolving to a JSON-LD document with
  - @context containing owl and rdf prefixes and optional @base when baseIri is provided
  - @id set to the ontologyIri
  - @graph as an array of nodes, one per term, each with an @id constructed as ontologyIri#term and all supplied properties
- Throws an error when options.ontologyIri is missing

# CLI Interface

Support flags

--help                 Show usage information
--to-owl <ontologyIri> Generate OWL ontology JSON-LD from JSON data read from stdin
--ontology-base <IRI>  Include base IRI in @context
--capital-cities <ontologyIri>  Fetch capital city data and generate an OWL ontology JSON-LD document using the REST Countries public API

Behavior

When invoked with --to-owl
1. Read input from stdin
2. Parse JSON input or report parse errors
3. Invoke generateOntology with parsed data
4. Output pretty-printed JSON-LD to stdout

When invoked with --capital-cities
1. Perform HTTP GET to https://restcountries.com/v3.1/all
2. Extract each country name and capital
3. Build data mapping capitals to country property
4. Invoke generateOntology with this data and provided IRI and optional base
5. Output resulting JSON-LD to stdout
6. Report errors for missing options, fetch failures, or parse errors

# Built-in Data Sources

This feature can be extended to include additional public data sources by adding new CLI flags and data fetch logic. Currently includes the capital cities dataset from REST Countries API for demonstration and quick ontology creation.