# Overview

Add a --refresh flag to the CLI that fetches data from all configured public sources and transforms the results into a unified OWL ontology in JSON-LD format.

# Functionality

- Recognize a --refresh option in src/lib/main.js with optional --base <filename> and --out <filename> arguments.
- Load the SOURCES constant mapping sourceKey identifiers to HTTP URLs from the existing configuration or a new src/lib/SOURCES.js file.
- For each sourceKey in SOURCES:
  - Perform a fetch request to the associated URL.
  - Expect the JSON response to be an array of data records.
  - For each record in the array, generate a JSON-LD individual:
    - @id: constructed as baseIRI/sourceKey/index (e.g. http://example.org/base#sourceKey_0)
    - @type: ex:DataSourceItem
    - ex:sourceKey: literal string of the sourceKey
    - ex:data: literal string containing JSON.stringify(record) with datatype xsd:string
- Define a standard @context that includes prefixes for OWL, RDF, RDFS, XSD, and the custom ex prefix for example schema IRIs.
- Use jsonld APIs to flatten and merge generated fragments. If --base is provided, merge into the existing ontology before output.
- Write the final JSON-LD document to stdout or to the file specified by --out.
- Emit descriptive errors and exit with a non-zero status for network failures, invalid JSON responses, or merge conflicts.

# Usage

node src/lib/main.js --refresh --out all-sources.jsonld
cat existing.jsonld | node src/lib/main.js --refresh --base existing.jsonld

# Testing

- Add unit tests in tests/unit/main.test.js mocking global.fetch to return sample arrays for multiple sourceKeys and assert the generated @graph contains individuals with correct @id, @type, and ex properties.
- Simulate behavior with and without --base and --out options, including writing to a file and merging into an existing document.
- Test error handling for HTTP failures and invalid JSON responses.

# Documentation

- Update README.md under Features to document the --refresh flag, describe required and optional arguments, and show example commands and sample output.
- Extend docs/USAGE.md with a new section on Refreshing Data Sources, detailing the flag, parameters, and expected JSON-LD output.