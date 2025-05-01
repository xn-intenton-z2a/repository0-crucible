features/ONTOLOGY_QUERY.md
# features/ONTOLOGY_QUERY.md
# Overview

This feature enables users to query OWL ontologies in JSON-LD format from the command line or library API. It provides a simple filtering mechanism using a JavaScript predicate expression evaluated against each node in the ontology graph.

# Library API

Export function queryOntology(document, expression)

- document: JSON object representing an OWL ontology in JSON-LD
- expression: string, a JavaScript expression returning a boolean when applied to a term object

Returns: Promise resolving to an array of nodes for which the expression evaluates to true

Throws an error when expression is missing or invalid

# CLI Interface

Support flags

--query <expression>     Read JSON-LD from stdin, apply predicate expression against each @graph node, and output matching nodes

--help                   Show usage information (includes --query)

# Behavior

When invoked with --query
1. Read JSON from stdin and parse, or report parse errors
2. Compile the expression string into a predicate function
3. Apply the function to each node in the @graph array
4. Collect all nodes for which the predicate returns true
5. Output the resulting array as pretty-printed JSON to stdout
6. Report errors for missing expression or compilation failures

# Examples

Query all terms with name Alice:
cat ontology.json | node src/lib/main.js --query "node.name==='Alice'"

List all term identifiers:
cat ontology.json | node src/lib/main.js --query "true" | jq -r '.[].@id'
features/ONTOLOGY_GENERATION.md
# features/ONTOLOGY_GENERATION.md
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