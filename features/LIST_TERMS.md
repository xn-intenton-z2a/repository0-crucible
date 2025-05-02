# Overview
Add a list-terms subcommand to the CLI entrypoint in src/lib/main.js to list all term identifiers from a JSON-LD ontology file

# Implementation
1. Extend main() in src/lib/main.js to detect the "list-terms" subcommand before other logic
2. Parse flags using zod: require an --input option as a nonempty string
3. Use fs.promises.readFile to load the file at the given input path and JSON.parse its contents
4. Validate that the parsed object has an "@graph" property that is an array
5. Iterate over each node in the @graph array and console.log the value of its "@id" property, one per line
6. Return exit code 0 on success; on any read, parse, or validation error, console.error a descriptive message and return exit code 1

# Testing
1. Create tests/unit/cli-listterms.test.js covering:
  • Successful list to stdout by mocking fs.readFile to return a sample JSON-LD with @graph and spying on console.log
  • Missing --input flag triggers exit code 1 and logs an error via console.error
  • Invalid JSON or missing @graph triggers exit code 1 and logs an error
2. Assert correct exit codes, error messages, and console output

# Documentation
1. Update README.md under CLI Usage to document the list-terms command:
   • --input (string, required): Path to a JSON-LD ontology file
   • Provide example invocation: node src/lib/main.js list-terms --input path/onto.json
   • Show sample output: each term @id on its own line
2. Update docs/USAGE.md under CLI Usage with a new section for list-terms including flags, usage examples, and output format