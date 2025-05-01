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
