# AGENTIC_LIB

## Crawl Summary
Agentic-lib provides reusable GitHub Actions workflows and a JavaScript module implementing an agenticHandler function. The handler accepts single commands or a batch (using a commands array), increments a global count (globalThis.callCount), and returns executionTimeMS. It supports input validation (trimming, rejecting 'NaN' inputs) and optional command alias substitution via COMMAND_ALIASES. CLI commands include --agentic, --dry-run, --version, --verbose, --diagnostics, --status, --digest, --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, and --cli-utils. AWS integrations use createSQSEventFromDigest and digestLambdaHandler to simulate and process SQS events with fallback messageId generation. Detailed logging is available through logInfo and logError.

## Normalised Extract
Table of Contents:
1. REUSABLE_WORKFLOWS
   - Location: .github/workflows/
   - Licensing: GPL-3 with attribution requirement
   - Stability: Suitable for CI/CD integration
2. AGENTIC_HANDLER
   - Function: agenticHandler(payload)
   - Accepts either {command: string} or {commands: string[]} payload
   - Increments globalThis.callCount on success
   - Returns executionTimeMS in milliseconds for each command
   - Batch throttling: Environment variable MAX_BATCH_COMMANDS rejects batch if limit exceeded
3. INPUT_VALIDATION_AND_ALIASES
   - Trims whitespace and rejects inputs equivalent to 'NaN' with error message "Input non-actionable: equivalent to NaN"
   - Supports command alias substitution via environment variable COMMAND_ALIASES (e.g., { ls: list, rm: remove })
4. CLI_COMMANDS
   - --agentic: Invoke agenticHandler with JSON payload
   - --dry-run: Simulate command execution
   - --version: Output version info from package.json with timestamp
   - --verbose: Enable detailed logging
   - --diagnostics: Output full diagnostic report (configuration, Node.js version, environment variables)
   - --status: Output runtime health summary (callCount, uptime, configuration)
   - --digest: Trigger sample digest processing
   - --simulate-error: Simulate an error and exit non-zero
   - --simulate-delay <ms>: Delay execution by specified milliseconds
   - --simulate-load <ms>: Execute CPU‑intensive loop for specified milliseconds
   - --apply-fix: Apply automated fixes and log success message
   - --cli-utils: Display complete summary of CLI commands
5. AWS_INTEGRATIONS
   - createSQSEventFromDigest: Constructs mock SQS event from digest
   - digestLambdaHandler: Processes incoming SQS events, handles JSON parse errors, assigns fallback messageId
6. LOGGING
   - Functions logInfo and logError provide detailed operational logs when verbose mode is enabled

## Supplementary Details
AgenticHandler Implementation:
- Input: JSON payload { "command": string } or { "commands": string[] }
- Process: Validate command by trimming whitespace; if command == 'NaN' (any case) or empty, log error and return message "Input non-actionable: equivalent to NaN"
- On valid command:
  1. Process each command sequentially
  2. Increment globalThis.callCount
  3. Measure processing time and include as executionTimeMS in result
- Batch processing can be controlled by setting environment variable MAX_BATCH_COMMANDS. If number of commands exceeds this limit, reject payload with error message.
- Command Aliases: When environment variable COMMAND_ALIASES is set (value as JSON mapping), substitute any matching alias from payload before processing

CLI Flags and Expected Behaviors:
- --agentic: Execute agenticHandler with provided JSON payload
- --dry-run: Do not perform any actions, only simulate
- --version: Parse package.json, output version and current timestamp
- --verbose: Activate detailed logging via logInfo and logError
- --diagnostics: Collect and output current configuration, Node.js version, and select environment variables
- --status: Return JSON summary including globalThis.callCount, uptime, and Node.js version
- --simulate-error: Immediately log simulated error and exit with non-zero status
- --simulate-delay <ms>: Invoke delay loop for specified milliseconds before command processing
- --simulate-load <ms>: Execute a CPU intensive loop for specified milliseconds
- --apply-fix: Log "Applied fix successfully" and exit immediately after
- --cli-utils: Generate a comprehensive summary of CLI commands and their descriptions

Best Practices:
- Validate input strictly (avoid unauthorized commands, trim whitespace, check for 'NaN')
- Use dry-run mode before production deployment
- Enable verbose logging during debugging
- Use proper environment variable configuration for batch limits (MAX_BATCH_COMMANDS) and command aliases (COMMAND_ALIASES)

Troubleshooting Procedures:
1. If batch commands fail, check the value of MAX_BATCH_COMMANDS and ensure the payload does not exceed the limit.
2. For command alias issues, verify the JSON format of COMMAND_ALIASES and that keys match input commands exactly.
3. Use --verbose mode to inspect detailed logs via logError, check configuration details printed by --diagnostics.
4. Confirm that Node.js version is compatible by inspecting output from --diagnostics flag.
5. For SQS integration failures, review error logs in digestLambdaHandler and ensure fallback messageId is generated when missing.

## Reference Details
API Specifications:
- Function: agenticHandler(payload: any) -> { callCount: number, results: Array<{ command: string, executionTimeMS: number }> }
  * Acceptable Payloads:
    - { "command": "doSomething" }
    - { "commands": ["cmd1", "cmd2"] }
  * Behavior:
    - Validates input: trims whitespace, rejects if command equals 'NaN' or empty.
    - Increments globalThis.callCount for each command.
    - Returns an object with each command's executionTimeMS in milliseconds.

CLI Method Signatures & Examples:
- Single command invocation:
  node src/lib/main.js --agentic '{"command": "doSomething"}'
- Batch processing:
  node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
- Dry run:
  node src/lib/main.js --dry-run
- Additional flags:
  --version -> returns { "version": "x.y.z", "timestamp": "<ISO date>" }
  --diagnostics -> returns { "nodeVersion": "vXX.X.X", "config": { ... }, "env": { ... } }
  --status -> returns { "callCount": <number>, "uptime": <ms>, "nodeVersion": "..." }
  --simulate-error -> logs error and exits with non-zero code
  --simulate-delay <ms> -> delays execution for given milliseconds
  --simulate-load <ms> -> executes CPU-intensive loop for given milliseconds
  --apply-fix -> logs "Applied fix successfully" and exits
  --cli-utils -> outputs complete list of available CLI commands and descriptions

AWS Integrations:
- Function: createSQSEventFromDigest(digest: string) -> constructs an AWS SQS formatted event object with typical keys including MessageId (fallback generated if missing) and body as digest
- Function: digestLambdaHandler(event: object) -> processes incoming SQS events, handles JSON parsing errors, accumulates and logs failed records

Configuration Options:
- MAX_BATCH_COMMANDS: (number) limits maximum commands in a batch (default: no limit)
- COMMAND_ALIASES: (string) JSON formatted mapping for command substitution (e.g., '{"ls": "list", "rm": "remove"}')

Concrete Best Practices & Implementation Code Patterns:
- Always validate commands for non-actionable inputs by trimming and comparing to 'NaN'.
- Leverage --dry-run mode to test CLI commands before live deployment.
- Configure environment variables (MAX_BATCH_COMMANDS, COMMAND_ALIASES) correctly to control batch size and command aliasing.
- Use --verbose and --diagnostics flags to retrieve detailed logs and environment configurations during troubleshooting.

Detailed Troubleshooting Commands:
1. Check batch limit: Ensure MAX_BATCH_COMMANDS is set properly. For example, in Unix:
   export MAX_BATCH_COMMANDS=10
2. Validate alias configuration: echo $COMMAND_ALIASES should return a valid JSON string.
3. Test diagnostic report: node src/lib/main.js --diagnostics
4. Inspect status: node src/lib/main.js --status
5. Run in dry-run mode: node src/lib/main.js --dry-run
6. For simulated error: node src/lib/main.js --simulate-error (expect a logged error and exit code != 0)


## Information Dense Extract
AGENTIC_LIB; .github/workflows (GPL-3); main.js implements agenticHandler(payload) accepting {"command": string} or {"commands": [string]}; increments globalThis.callCount; returns executionTimeMS; input trimmed, rejects 'NaN'; env vars: MAX_BATCH_COMMANDS (number), COMMAND_ALIASES (JSON mapping); CLI flags: --agentic, --dry-run, --version, --verbose, --diagnostics, --status, --digest, --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, --cli-utils; AWS functions: createSQSEventFromDigest(digest:string) -> SQS event, digestLambdaHandler(event) with fallback messageId; API: agenticHandler(payload: any) -> { callCount:number, results:[{command:string, executionTimeMS:number}] }; troubleshooting via --verbose, --diagnostics; best practices include input validation and environment configuration.

## Sanitised Extract
Table of Contents:
1. REUSABLE_WORKFLOWS
   - Location: .github/workflows/
   - Licensing: GPL-3 with attribution requirement
   - Stability: Suitable for CI/CD integration
2. AGENTIC_HANDLER
   - Function: agenticHandler(payload)
   - Accepts either {command: string} or {commands: string[]} payload
   - Increments globalThis.callCount on success
   - Returns executionTimeMS in milliseconds for each command
   - Batch throttling: Environment variable MAX_BATCH_COMMANDS rejects batch if limit exceeded
3. INPUT_VALIDATION_AND_ALIASES
   - Trims whitespace and rejects inputs equivalent to 'NaN' with error message 'Input non-actionable: equivalent to NaN'
   - Supports command alias substitution via environment variable COMMAND_ALIASES (e.g., { ls: list, rm: remove })
4. CLI_COMMANDS
   - --agentic: Invoke agenticHandler with JSON payload
   - --dry-run: Simulate command execution
   - --version: Output version info from package.json with timestamp
   - --verbose: Enable detailed logging
   - --diagnostics: Output full diagnostic report (configuration, Node.js version, environment variables)
   - --status: Output runtime health summary (callCount, uptime, configuration)
   - --digest: Trigger sample digest processing
   - --simulate-error: Simulate an error and exit non-zero
   - --simulate-delay <ms>: Delay execution by specified milliseconds
   - --simulate-load <ms>: Execute CPUintensive loop for specified milliseconds
   - --apply-fix: Apply automated fixes and log success message
   - --cli-utils: Display complete summary of CLI commands
5. AWS_INTEGRATIONS
   - createSQSEventFromDigest: Constructs mock SQS event from digest
   - digestLambdaHandler: Processes incoming SQS events, handles JSON parse errors, assigns fallback messageId
6. LOGGING
   - Functions logInfo and logError provide detailed operational logs when verbose mode is enabled

## Original Source
Agentic Library Documentation
https://github.com/xn-intenton-z2a/agentic-lib

## Digest of AGENTIC_LIB

# AGENTIC_LIB

Retrieved on: 2025-04-25

## Overview
The agentic-lib is a collection of reusable GitHub Actions workflows and a JavaScript module (main.js) that provide autonomous workflow invocation. The system uses GitHub’s workflow_call event so workflows can be composed like an SDK to continuously review, fix, update, and evolve code.

## Re‑usable Workflows
- Location: .github/workflows/
- Licensing: GPL-3 with attribution requirement (any derived work must include: "This work is derived from https://github.com/xn-intenton-z2a/agentic-lib")
- Stability: Well‑tested and integrated in CI/CD pipelines

## The Evolving main.js
- Implements core workflows as a JavaScript module.
- Tracks successful commands via global counter (globalThis.callCount).

## Batch Processing in agenticHandler
- Accepts payloads of the form:
  - Single command: { "command": "doSomething" }
  - Batch commands: { "commands": ["cmd1", "cmd2"] }
- For each valid command:
  - Increments globalThis.callCount
  - Returns execution time (executionTimeMS in milliseconds)
- Optional batch throttling through environment variable MAX_BATCH_COMMANDS (rejects payload if limit exceeded)

## Input Validation and Command Aliases
- Commands are trimmed. Inputs equivalent to 'NaN' (in any case variation) or empty strings are rejected with an error message "Input non-actionable: equivalent to NaN".
- Supports command alias substitution via environment variable COMMAND_ALIASES, e.g., { "ls": "list", "rm": "remove" }.

## CLI Commands and Flags
- --agentic: Processes a command payload. E.g.: 
  node src/lib/main.js --agentic '{"command": "doSomething"}'
  or batch: node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
- --dry-run: Simulates command execution without performing actions.
- --version: Displays version info from package.json along with a timestamp.
- --verbose: Activates detailed logging for debugging.
- --diagnostics: Outputs a full diagnostic report (configuration, Node.js version, environment variables).
- --status: Outputs a JSON runtime health summary (callCount, uptime, etc.).
- --digest: Processes a sample digest event.
- --simulate-error: Simulates an error; logs error and exits non-zero.
- --simulate-delay <ms>: Delays execution to simulate latency.
- --simulate-load <ms>: Executes a CPU‑intensive loop for specified milliseconds.
- --apply-fix: Applies automated fixes and logs "Applied fix successfully", then exits.
- --cli-utils: Displays a summary of all available CLI commands and descriptions.

## AWS Integrations
- SQS Event Simulation:
  - createSQSEventFromDigest: Constructs a mock AWS SQS event from a digest.
  - digestLambdaHandler: Processes incoming SQS events with error handling and assigns a fallback messageId if omitted.

## Logging
- Logging functions logInfo and logError provide operation details including configuration and error stacks when verbose mode is active.

## Attribution and Licensing
- Mixed Licensing: Core workflows under GNU General Public License (GPL-3) and example workflows under the MIT License.
- Attribution required as specified in the repository notices.


## Attribution
- Source: Agentic Library Documentation
- URL: https://github.com/xn-intenton-z2a/agentic-lib
- License: License: Varies by file, typically open source (check repository for details)
- Crawl Date: 2025-04-25T04:48:50.729Z
- Data Size: 651806 bytes
- Links Found: 5047

## Retrieved
2025-04-25
