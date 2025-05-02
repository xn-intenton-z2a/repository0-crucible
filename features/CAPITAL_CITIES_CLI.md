# Overview
Add a new CLI option --capital-cities to output a simple OWL ontology in JSON format for a set of world capital cities.

# Behavior
When the user runs node src/lib/main.js --capital-cities, the tool builds an ontology object representing each capital city as an individual of type CapitalCity with name and country properties.  
Optionally the user may supply --output <path> to write the JSON ontology to a file instead of stdout.  
No other processing occurs when this flag is present.

# Implementation
Modify src/lib/main.js to define a static array of capital city records with name and country fields.  
Extend argument parsing to detect --capital-cities and an optional --output flag with its path.  
When --capital-cities is present, construct a JSON object with a root field ontologyVersion and an array of individuals.  
Write JSON to stdout or to the file path provided by --output.  
Skip the default run logic when --capital-cities is handled.

# Tests
Update tests/unit/main.test.js to add tests that set process.argv to include --capital-cities and capture console output.  
Parse the captured output as JSON and verify that it contains an individuals array with at least one object having name and country matching an entry from the static array.  
Also test providing --output with a temporary file path, read and parse the file, and verify the contents.

# Documentation
In README.md update the Features section to include --capital-cities.  
Add usage examples showing invocation with and without --output and sample output excerpts.