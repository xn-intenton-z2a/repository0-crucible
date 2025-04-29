# Description
Provide comprehensive statistics on JSON-LD OWL ontology artifacts to help users understand graph size and structure. This feature computes node counts, class distributions, and property usage frequencies for a given JSON-LD document.

# Programmatic API
Export async function getOntologyStats(filePath: string): Promise<object> that:
1. Reads and parses the JSON-LD file at filePath
2. Validates that the document has an @graph array
3. Computes total node count as the length of @graph
4. Iterates each node in @graph to collect:
   a classCounts mapping each rdf type or @type value to its occurrence count
   propertyCounts mapping each property key to total occurrences across all nodes
5. Returns an object with fields nodeCount, classCounts, propertyCounts

# CLI Support
Add flag --stats <file> in main(args):
1. When invoked with one argument, call getOntologyStats with the provided file path
2. On success output JSON.stringify(stats, null, 2) via console.log
3. On missing argument log error Missing required parameter: file and return without throwing
4. On file read or parse error log error message without throwing

# HTTP Server Endpoints
GET /stats?file=<path>
1. Respond with status 200 and content-type application/json
2. If query parameter file is missing respond 400 with plain-text error Missing required parameter: file
3. Invoke getOntologyStats and on success respond with JSON string of the stats object
4. On error respond 500 with plain-text error message

# Testing
Add unit tests for getOntologyStats:
- Provide a sample JSON-LD document with nodes, types, and properties to verify nodeCount classCounts and propertyCounts
- Test error path when file does not exist or JSON is invalid
Add CLI tests:
- Spy on getOntologyStats and invoke main with --stats and missing parameter to assert error logging
- With valid file path mock getOntologyStats return value and assert console.log printed expected JSON
Add HTTP integration tests:
- Start server and issue GET /stats without file to assert 400 and error message
- Issue GET /stats with valid file write a temporary JSON-LD file, parse response JSON matches expected stats
- Simulate getOntologyStats throwing to assert 500 and error body

# Documentation Updates
Update docs/FEATURES.md under Ontology Management to describe the --stats flag, HTTP /stats endpoint, example invocation, and sample output. Update docs/USAGE.md and README.md to include usage examples and expected JSON output.