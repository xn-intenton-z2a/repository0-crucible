# AGENTIC_LIB

## Crawl Summary
Component Breakdown: Re-usable Workflows (in .github/workflows/, GPL-3), Example Workflows (in examples/, MIT), Evolving main.js (in src/lib/main.js). Key function agenticHandler processes JSON payload with either command or commands array, increments global callCount, returns executionTimeMS. CLI supports flags: --agentic, --dry-run, --version, --verbose, --diagnostics, --status, --digest, --simulate-error, --simulate-delay, --simulate-load, --apply-fix, --cli-utils. AWS integrations include createSQSEventFromDigest and digestLambdaHandler. Detailed logging via logInfo and logError. Licensing under GPL-3 and MIT with required attribution.

## Normalised Extract
Table of Contents:
1. Component Breakdown
   - Re-usable Workflows: Location: .github/workflows/, stable, GPL-3, used in CI/CD pipeline.
   - Example Workflows: Location: examples/, demonstrative, MIT licensing.
   - Evolving main.js: Location: src/lib/main.js, implements agentic workflows in JavaScript, tracks agentic command invocations via globalThis.callCount.
2. Agentic Library Functions
   - agenticHandler:
     * Parameters: JSON payload { command: string } or { commands: string[] }
     * Returns: Object with individual results containing executionTimeMS.
     * Behavior: Validates input (trims whitespace, rejects non-actionable 'NaN' values), increments invocation counter per valid command.
     * Batch Processing: Optional throttling if environment variable MAX_BATCH_COMMANDS is set; rejects batch if command count exceeds limit.
3. CLI Configuration
   - Flags and usage:
     * --agentic: Processes agentic commands. Example: node src/lib/main.js --agentic '{"command": "doSomething"}' or '{"commands": ["cmd1", "cmd2"]}'.
     * --dry-run: Simulates command execution without action.
     * --version: Shows version info with timestamp from package.json.
     * --verbose: Enables detailed logging.
     * --diagnostics: Provides configuration, Node.js version, environment variables.
     * --status: Provides health summary including callCount and uptime.
     * Additional flags: --digest, --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, --cli-utils.
4. AWS Integrations
   - SQS Integration:
     * createSQSEventFromDigest: Formats digest into mock SQS event.
     * digestLambdaHandler: Processes SQS events, handles JSON parsing errors, uses fallback for missing messageId.
5. Logging
   - Functions: logInfo and logError for detailed logs when verbose mode is on.
6. Licensing
   - GPL-3 for core workflows with attribution, MIT for examples.
Exact details:
- Environment variable COMMAND_ALIASES accepts JSON mapping { "ls": "list", "rm": "remove" } to substitute commands.
- Execution timing: Each processed command returns executionTimeMS (in milliseconds).
- CLI dry-run flag and simulation flags for error, delay, and load conditions are implemented.
- Internal counter: globalThis.callCount increments per successful command execution.


## Supplementary Details
Evolving main.js Implementation:
- Function: agenticHandler(payload)
    if payload.command exists then process single command
    else if payload.commands exists then iterate commands sequentially
    For each command:
      * Trim whitespace
      * Check if command equals 'NaN' (case insensitive) then reject with error
      * Validate and process command
      * Increment globalThis.callCount
      * Measure processing time and return executionTimeMS
- Batch throttling: if process.env.MAX_BATCH_COMMANDS is set and payload.commands length exceeds value, then return error message.

CLI Implementation:
- Supported flags:
   --agentic, --dry-run, --version, --verbose, --diagnostics, --status, --digest, --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, --cli-utils.
- Version command uses package.json version and outputs JSON with timestamp.
- Diagnostics collects process.env, Node.js version, current configuration.

AWS Integration Implementation:
- createSQSEventFromDigest(digest): Formats digest into SQS event structure with properties similar to AWS SQS message format.
- digestLambdaHandler(event): Processes event. Uses try { JSON.parse(message.body) } catch error { log error, accumulate failed records }.

Logging Functions:
- logInfo(message): Outputs info log along with current configuration if verbose flag is set.
- logError(error): Outputs error message and error stack if verbose mode is active.

Environment Variables:
- MAX_BATCH_COMMANDS: (Numeric) Maximum allowed commands in batch.
- COMMAND_ALIASES: (JSON string) Mapping of aliases to actual commands.

Error Handling:
- Commands with non-actionable value ('NaN', empty strings) are strictly rejected with error message: "Input is non-actionable because it is equivalent to 'NaN'".

Attribution Requirement:
- Every derived work must include: "This work is derived from https://github.com/xn-intenton-z2a/agentic-lib".


## Reference Details
API Specifications:

Function: agenticHandler(payload: { command?: string, commands?: string[] }) -> { results: Array<{ executionTimeMS: number, command: string, status: string }> }
- Parameters:
    command: string (optional) - Single command to process.
    commands: string[] (optional) - Array of commands for batch processing.
- Return Type: Object with property 'results' containing an array. Each result has executionTimeMS (number), command (string), and status (string, e.g., 'success').
- Exceptions: Throws error if payload is missing or if non-actionable input is detected (e.g., trimmed value equals 'NaN').

CLI Usage Examples:
1. Single command: node src/lib/main.js --agentic '{"command": "doSomething"}'
2. Batch processing: node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
3. Dry run: node src/lib/main.js --dry-run
4. Version: node src/lib/main.js --version
5. Diagnostics: node src/lib/main.js --diagnostics
6. Simulate delay: node src/lib/main.js --simulate-delay 500

SDK Method Signatures (in JavaScript):

function agenticHandler(payload: { command?: string, commands?: string[] }): { results: Array<{ executionTimeMS: number, command: string, status: string }> } {
  // Validate payload
  // If payload.command exists, process single command
  // Else if payload.commands exists, iterate and validate each command
  // Trim commands and check for non-actionable 'NaN'
  // Increment globalThis.callCount for each valid command
  // For each command, measure startTime and compute executionTimeMS
  // Return aggregated result array
}

Environment Variables:
- MAX_BATCH_COMMANDS: numeric value determining maximum commands allowed; if exceeded, command batch is rejected.
- COMMAND_ALIASES: JSON mapping for alias substitution (e.g., {"ls": "list", "rm": "remove"}).

Troubleshooting Procedures:
1. If command batch is rejected, verify that the number of commands does not exceed process.env.MAX_BATCH_COMMANDS.
2. For JSON parsing errors in AWS Lambda integration, check proper formatting of SQS message body and use try-catch blocks in digestLambdaHandler.
3. For non-actionable inputs, ensure commands are trimmed and not equal to variations of 'NaN'.
4. Use --verbose flag to see detailed logging via logInfo and logError.

Best Practices Implementation:
- Always validate input payload with strict trimming.
- Use environment variables for dynamic configuration (e.g., MAX_BATCH_COMMANDS, COMMAND_ALIASES).
- Add error logging and diagnostic reporting (--diagnostics, --status) for production troubleshooting.
- Include attribution string in all derived projects.

Complete Code Example:

// Example usage of agenticHandler
const payload = { commands: ['build', 'test', 'deploy'] };
try {
  const result = agenticHandler(payload);
  console.log('Execution Results:', result);
} catch (error) {
  console.error('Error:', error);
}

// CLI invocation example
// node src/lib/main.js --agentic '{"command": "doSomething"}'

// AWS integration example
// const sqsEvent = createSQSEventFromDigest(digest);
// digestLambdaHandler(sqsEvent);


## Information Dense Extract
AGENTIC_LIB: Workflows in .github/workflows/ (GPL-3), Examples in examples/ (MIT), main.js in src/lib/main.js implements agenticHandler with payload {command?:string, commands?:string[]} that validates inputs (trims, rejects 'NaN'), increments globalThis.callCount, returns array of {executionTimeMS:number, command:string, status:string}. CLI flags: --agentic, --dry-run, --version, --verbose, --diagnostics, --status, --digest, --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, --cli-utils. AWS: createSQSEventFromDigest formats digest to SQS event; digestLambdaHandler processes event with fallback for missing messageId. Environment variables: MAX_BATCH_COMMANDS (limit number of commands), COMMAND_ALIASES (JSON mapping for alias substitution). API: agenticHandler(payload) returns {results:[{executionTimeMS, command, status}]}. Code example provided. Troubleshooting: Check batch limits, JSON parsing, and input trimming. Attribution: Must include derived attribution string.

## Sanitised Extract
Table of Contents:
1. Component Breakdown
   - Re-usable Workflows: Location: .github/workflows/, stable, GPL-3, used in CI/CD pipeline.
   - Example Workflows: Location: examples/, demonstrative, MIT licensing.
   - Evolving main.js: Location: src/lib/main.js, implements agentic workflows in JavaScript, tracks agentic command invocations via globalThis.callCount.
2. Agentic Library Functions
   - agenticHandler:
     * Parameters: JSON payload { command: string } or { commands: string[] }
     * Returns: Object with individual results containing executionTimeMS.
     * Behavior: Validates input (trims whitespace, rejects non-actionable 'NaN' values), increments invocation counter per valid command.
     * Batch Processing: Optional throttling if environment variable MAX_BATCH_COMMANDS is set; rejects batch if command count exceeds limit.
3. CLI Configuration
   - Flags and usage:
     * --agentic: Processes agentic commands. Example: node src/lib/main.js --agentic '{'command': 'doSomething'}' or '{'commands': ['cmd1', 'cmd2']}'.
     * --dry-run: Simulates command execution without action.
     * --version: Shows version info with timestamp from package.json.
     * --verbose: Enables detailed logging.
     * --diagnostics: Provides configuration, Node.js version, environment variables.
     * --status: Provides health summary including callCount and uptime.
     * Additional flags: --digest, --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, --cli-utils.
4. AWS Integrations
   - SQS Integration:
     * createSQSEventFromDigest: Formats digest into mock SQS event.
     * digestLambdaHandler: Processes SQS events, handles JSON parsing errors, uses fallback for missing messageId.
5. Logging
   - Functions: logInfo and logError for detailed logs when verbose mode is on.
6. Licensing
   - GPL-3 for core workflows with attribution, MIT for examples.
Exact details:
- Environment variable COMMAND_ALIASES accepts JSON mapping { 'ls': 'list', 'rm': 'remove' } to substitute commands.
- Execution timing: Each processed command returns executionTimeMS (in milliseconds).
- CLI dry-run flag and simulation flags for error, delay, and load conditions are implemented.
- Internal counter: globalThis.callCount increments per successful command execution.

## Original Source
Agentic Library Documentation
https://github.com/xn-intenton-z2a/agentic-lib

## Digest of AGENTIC_LIB

# AGENTIC_LIB DOCUMENTATION

Retrieved on: 2023-11-28

## Component Breakdown

1. Re‑usable Workflows (Core Functionality)
   - Location: .github/workflows/
   - Purpose: Automated testing, publishing, and issue management using GitHub Actions.
   - Licensing: GPL-3 with attribution requirement.

2. Example Workflows (Demonstrative Content)
   - Location: examples/
   - Purpose: Practical examples for learning and reference.
   - Licensing: MIT License.

3. The Evolving main.js
   - Location: src/lib/main.js
   - Purpose: JavaScript re‑implementation of re‑usable workflows with programmatic access.
   - Key Features:
     a. Internal invocation counter (globalThis.callCount)
     b. Batch processing support using agenticHandler
     c. Optional batch throttling via environment variable MAX_BATCH_COMMANDS
     d. Execution timing: returns executionTimeMS for each command
     e. Command alias substitution using COMMAND_ALIASES

## Agentic Library Functions

- Function: agenticHandler
  - Accepts: JSON payload with either a single property "command" (string) or a property "commands" (array of strings).
  - Behavior: Validates commands, processes each sequentially, increments invocation counter, returns aggregated results with individual executionTimeMS.
  - Error Handling: Logs and rejects non-actionable inputs (e.g. 'NaN', empty strings) after trimming whitespace.

Usage examples:
  Single command:
    node src/lib/main.js --agentic '{"command": "doSomething"}'
  Batch processing:
    node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'

Additional CLI flag for dry-run:
  node src/lib/main.js --dry-run

## CLI Commands

Supported CLI flags with their functionality:
  --help            : Display usage instructions and available flags.
  --agentic         : Process a single or batch agentic command.
  --version         : Display version info from package.json with timestamp.
  --verbose         : Enable detailed logging for debugging.
  --diagnostics     : Output in‑depth diagnostic report (configuration, Node.js version, environment variables).
  --status          : Output runtime health summary in JSON (configuration, callCount, uptime, selected env vars).
  --digest          : Initiate processing of a sample digest event. 
  --simulate-error  : Simulate an error scenario; logs error and exits non-zero.
  --simulate-delay  : Delay execution by a specified number of milliseconds (usage: --simulate-delay <ms>).
  --simulate-load   : Execute a CPU-intensive loop for a specified duration in milliseconds.
  --apply-fix       : Apply automated fixes (logs "Applied fix successfully" and exits immediately).
  --cli-utils       : Display a comprehensive summary of all CLI commands available with brief descriptions.

## AWS Integrations

- SQS Integration:
  a. createSQSEventFromDigest
     - Constructs a mock AWS SQS event from a given digest, formatting payload similar to a typical SQS message.
  b. digestLambdaHandler
     - Processes incoming SQS events handling JSON parsing errors, accumulates failed records and generates a fallback messageId if omitted.

## Logging Mechanism

- Functions: logInfo and logError
  - Provide detailed logging including configurations and error stacks when verbose mode is enabled.

## Licensing and Attribution

- Core workflows are under GPL-3 with attribution requirement. Example workflows are under MIT License.
- Attribution must include text: "This work is derived from https://github.com/xn-intenton-z2a/agentic-lib".

## Attribution and Data Size

- Crawled data size: 657965 bytes
- Links Found: 5126


## Attribution
- Source: Agentic Library Documentation
- URL: https://github.com/xn-intenton-z2a/agentic-lib
- License: License: Varies by file, typically open source (check repository for details)
- Crawl Date: 2025-04-25T03:56:40.449Z
- Data Size: 657965 bytes
- Links Found: 5126

## Retrieved
2025-04-25
