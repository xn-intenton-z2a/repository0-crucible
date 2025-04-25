# Overview
This feature enhances the handling of the --agentic flag by enabling JSON parsing of the supplied argument. The CLI tool will now validate the JSON payload to support both single command objects and batch commands (an array under the key commands) as specified in the agentic library guidelines. The output from processing the JSON payload will be logged to the console.

# Implementation
In the src/lib/main.js file, update the block processing the --agentic flag. Rather than only checking for the presence of a next argument, the implementation will now:
  - Attempt to parse the provided argument as JSON.
  - Validate that the JSON contains either a key command (for a single command) or commands (for an array of commands).
  - If the JSON is valid, call the agenticHandler function (as defined in the agentic library) with the parsed object.
  - Log the result returned by agenticHandler to the console. In case of any errors (invalid JSON or missing required keys), print an appropriate error message and display the help instructions.

# Testing
The tests in tests/unit/main.test.js will be updated to include scenarios where:
  - A valid JSON payload containing a single command is supplied to --agentic and the result is verified.
  - A valid JSON payload containing a commands array is processed correctly.
  - An invalid JSON payload or missing required key triggers an error message with help instructions.

# Documentation
The README.md and docs/USAGE.md files will have additional sections describing the enhanced agentic flag usage. These sections will provide examples of how to supply both single and multiple commands in JSON format. For example, running the tool with:

  node src/lib/main.js --agentic {command: doSomething}

or

  node src/lib/main.js --agentic {commands: [cmd1, cmd2]}

will process the JSON input as intended, enhancing the versatility of the CLI tool in line with the repository mission.