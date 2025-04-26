# Description
Implement a new CLI command capital-cities that queries the DBpedia SPARQL endpoint to retrieve country and capital pairs and transforms the results into an OWL ontology represented as JSON.

# Implementation
Extend main to detect the --capital-cities or -cc flag. When present perform the following steps:

1. Construct a SPARQL query that selects country IRIs and corresponding capital labels.
2. Use the built-in fetch API to send an HTTP GET request to https://dbpedia.org/sparql with the query parameter and an Accept header of application/sparql-results+json.
3. Parse the JSON response and build an ontology object containing:
   - @context set to the OWL namespace
   - Classes for Country and Capital
   - Individuals for each capital with a property linking back to its country
4. Output the ontology object as pretty-printed JSON via console.log.
5. Exit without error.

# CLI Usage
To generate the ontology for capital cities:

node src/lib/main.js --capital-cities
node src/lib/main.js -cc

# Testing
Add unit tests that mock fetch to return a sample SPARQL JSON result. Verify that console.log is called with valid JSON containing the expected context, class definitions, and individual entries matching the sample data. Ensure main returns without throwing an error.

# Documentation Updates
Update docs/FEATURES.md and README.md to include a section for the capital-cities option. Provide example invocations and a sample of the generated ontology JSON.