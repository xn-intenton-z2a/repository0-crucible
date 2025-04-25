# AGENTIC_LIB

## Crawl Summary
Agentic-lib provides reusable workflows invoked via GitHub Actions, a JavaScript agenticHandler function for processing JSON command payloads (single or batch), comprehensive CLI commands (including --agentic, --version, --verbose, --diagnostics, --status, --dry-run, --simulate-error, --simulate-delay, --simulate-load, --apply-fix, --cli-utils), AWS integrations (createSQSEventFromDigest, digestLambdaHandler), detailed logging via logInfo/logError, and a configuration file (.github/agentic-lib.yml) with explicit paths, scripts, and limits.

## Normalised Extract
Table of Contents:
1. Reusable Workflows
   - Location: .github/workflows/
   - Invocation via GitHub's workflow_call event
2. AgenticHandler Function
   - File: src/lib/main.js
   - Signature: agenticHandler(payload: { command?: string, commands?: string[] })
   - Increments globalThis.callCount; returns executionTimeMS per command
   - Batch throttling controlled by MAX_BATCH_COMMANDS
3. CLI Commands
   - --agentic: Processes commands with JSON payload
   - --dry-run, --version, --verbose, --diagnostics, --status
   - --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, --cli-utils
4. AWS Integrations
   - Function: createSQSEventFromDigest(digest: string)
   - Function: digestLambdaHandler(event: object) with JSON error handling and fallback messageId
5. Logging Functions
   - logInfo(message: string) and logError(error: Error)
6. Configuration (.github/agentic-lib.yml)
   - schedule: schedule-2
   - readOnlyFilepaths: mission (MISSION.md), contributing (CONTRIBUTING.md), formattingFile (.prettierrc), lintingFile (eslint.config.js)
   - writeableFilepaths: docs, features, library, src/lib, tests/unit, package.json, README.md, SOURCES*.md
   - Scripts: buildScript (npm run build), testScript (npm test), mainScript (npm run start)
   - Limits: sourcesLimit=8, documentsLimit=128, featuresWipLimit=6, featureDevelopmentIssuesWipLimit=6, maintenanceIssuesWipLimit=2, attemptsPerBranch=2, attemptsPerIssue=2

## Supplementary Details
Configuration Options from .github/agentic-lib.yml:
- schedule: 'schedule-2' (determines the workflow schedule)
- readOnlyFilepaths:
    mission: 'MISSION.md'
    contributing: 'CONTRIBUTING.md'
    formattingFile: '.prettierrc'
    lintingFile: 'eslint.config.js'
- writeableFilepaths:
    docs: 'docs/'
    features: 'features/'
    library: 'library/'
    src: 'src/lib/'
    tests: 'tests/unit/'
    dependencies: 'package.json'
    readme: 'README.md'
    sources: 'SOURCES*.md'
- Execution commands:
    buildScript: 'npm run build'
    testScript: 'npm test'
    mainScript: 'npm run start'
- Limits:
    sourcesLimit: 8
    documentsLimit: 128
    featuresWipLimit: 6
    featureDevelopmentIssuesWipLimit: 6
    maintenanceIssuesWipLimit: 2
    attemptsPerBranch: 2
    attemptsPerIssue: 2

Implementation Steps for agenticHandler:
1. Receive JSON payload with 'command' or 'commands' array
2. Trim whitespace and validate actionable input (rejects 'NaN' or empty strings)
3. For each valid command, process sequentially, increment globalThis.callCount and attach executionTimeMS
4. Return aggregated response with individual results

Environment Variables:
- MAX_BATCH_COMMANDS: Optional limit for number of commands per batch
- COMMAND_ALIASES: JSON map for alias substitution (e.g., { "ls": "list", "rm": "remove" })

## Reference Details
API Specifications:
- agenticHandler(payload: { command?: string, commands?: string[] }) -> { executionTimeMS: number, results: Array<{ command: string, status: string }>, callCount: number }
  • Throws error if payload contains non-actionable input (e.g. 'NaN', empty)

CLI Usage Examples:
• Single command: node src/lib/main.js --agentic '{"command": "doSomething"}'
• Batch processing: node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
• Dry run: node src/lib/main.js --dry-run
• Display version: node src/lib/main.js --version
• Enable verbose logging: node src/lib/main.js --verbose
• Diagnostics: node src/lib/main.js --diagnostics
• Runtime status: node src/lib/main.js --status
• Simulate error: node src/lib/main.js --simulate-error
• Simulate delay: node src/lib/main.js --simulate-delay 500
• Simulate load: node src/lib/main.js --simulate-load 1000
• Apply fix: node src/lib/main.js --apply-fix
• CLI utilities summary: node src/lib/main.js --cli-utils

AWS Integrations:
- createSQSEventFromDigest(digest: string) -> Returns an SQS event object formatted with digest payload
- digestLambdaHandler(event: object) -> Processes event, handles JSON parsing errors, aggregates failures, generates fallback messageId if omitted

Logging Functions:
- logInfo(message: string): void
- logError(error: Error): void

Environment Variables:
- MAX_BATCH_COMMANDS: (e.g., 10) sets max number of commands allowed in a batch
- COMMAND_ALIASES: JSON string mapping for command alias substitution

Best Practices & Troubleshooting:
- Always validate JSON payloads and trim whitespace in commands
- Use --dry-run for testing command inputs without side effects
- For batch over-limit issues, ensure number of commands <= MAX_BATCH_COMMANDS
- Check verbose logs (via --verbose) for detailed error stacks and configuration diagnostics
- If AWS SQS integration fails, inspect the digestLambdaHandler logs for JSON parsing errors and fallback identifier generation
- Run CLI with --diagnostics to get complete configuration state and Node.js version

Full Code Example Comment:
// Example usage in CLI:
// node src/lib/main.js --agentic '{"command": "updateCode"}'
// This triggers agenticHandler, increments callCount, and returns an object with executionTimeMS and result details


## Information Dense Extract
agenticHandler(payload:{command?:string,commands?:string[]}) -> {executionTimeMS:number, results:Array<{command:string, status:string}>, callCount:number}; CLI flags: --agentic, --dry-run, --version, --verbose, --diagnostics, --status, --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, --cli-utils; AWS functions: createSQSEventFromDigest(digest:string) -> SQS event, digestLambdaHandler(event:object) -> processes event with error handling; Config (.github/agentic-lib.yml): schedule='schedule-2', readOnlyFilepaths: {mission:'MISSION.md', contributing:'CONTRIBUTING.md', formattingFile:'.prettierrc', lintingFile:'eslint.config.js'}, writeableFilepaths: {docs:'docs/', features:'features/', library:'library/', src:'src/lib/', tests:'tests/unit/', dependencies:'package.json', readme:'README.md', sources:'SOURCES*.md'}, scripts: {build:'npm run build', test:'npm test', main:'npm run start'}, Limits: {sourcesLimit:8, documentsLimit:128, featuresWipLimit:6, featureDevelopmentIssuesWipLimit:6, maintenanceIssuesWipLimit:2, attemptsPerBranch:2, attemptsPerIssue:2}; Env vars: MAX_BATCH_COMMANDS, COMMAND_ALIASES

## Sanitised Extract
Table of Contents:
1. Reusable Workflows
   - Location: .github/workflows/
   - Invocation via GitHub's workflow_call event
2. AgenticHandler Function
   - File: src/lib/main.js
   - Signature: agenticHandler(payload: { command?: string, commands?: string[] })
   - Increments globalThis.callCount; returns executionTimeMS per command
   - Batch throttling controlled by MAX_BATCH_COMMANDS
3. CLI Commands
   - --agentic: Processes commands with JSON payload
   - --dry-run, --version, --verbose, --diagnostics, --status
   - --simulate-error, --simulate-delay <ms>, --simulate-load <ms>, --apply-fix, --cli-utils
4. AWS Integrations
   - Function: createSQSEventFromDigest(digest: string)
   - Function: digestLambdaHandler(event: object) with JSON error handling and fallback messageId
5. Logging Functions
   - logInfo(message: string) and logError(error: Error)
6. Configuration (.github/agentic-lib.yml)
   - schedule: schedule-2
   - readOnlyFilepaths: mission (MISSION.md), contributing (CONTRIBUTING.md), formattingFile (.prettierrc), lintingFile (eslint.config.js)
   - writeableFilepaths: docs, features, library, src/lib, tests/unit, package.json, README.md, SOURCES*.md
   - Scripts: buildScript (npm run build), testScript (npm test), mainScript (npm run start)
   - Limits: sourcesLimit=8, documentsLimit=128, featuresWipLimit=6, featureDevelopmentIssuesWipLimit=6, maintenanceIssuesWipLimit=2, attemptsPerBranch=2, attemptsPerIssue=2

## Original Source
Agentic Library Documentation
https://github.com/xn-intenton-z2a/agentic-lib

## Digest of AGENTIC_LIB

# AGENTIC LIB WORKFLOWS

Retrieved: 2023-10-26

This document provides complete technical details for the agentic-lib project. The key components include reusable GitHub Actions workflows, the JavaScript agenticHandler function for autonomous command processing, extensive CLI commands, AWS SQS integrations, and a detailed configuration file.

# Reusable Workflows
- Location: .github/workflows/
- Purpose: Automated coding processes (testing, publishing, issue management) via GitHub’s workflow_call event
- Stability: Stable, GPL-3 licensed with attribution requirements

# AgenticHandler Function (src/lib/main.js)
- Signature: agenticHandler(payload: { command?: string, commands?: string[] }) -> { executionTimeMS: number, results: Array<{ command: string, status: string }>, callCount: number }
- Details:
  - Processes a JSON payload with a single command or a batch of commands
  - For batch processing, validates and processes each command sequentially
  - Increments global invocation counter (globalThis.callCount) on successful processing
  - Returns an aggregated response including executionTimeMS per command
  - Optional Batch Throttling: Limit defined by environment variable MAX_BATCH_COMMANDS

# CLI Commands and Flags
- --agentic: Invoke agenticHandler with a JSON payload
  - Example: node src/lib/main.js --agentic '{"command": "doSomething"}'
  - Batch: node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
- --dry-run: Simulate command execution without actual changes
- --version: Outputs version info from package.json and a timestamp
- --verbose: Activates detailed logging for debugging
- --diagnostics: Outputs a detailed diagnostic report (configuration, Node.js version, environment variables)
- --status: Provides a JSON runtime health summary (configuration, Node.js version, callCount, uptime)
- --simulate-error: Simulates an error, logs a simulated error message, exits non-zero
- --simulate-delay <ms>: Delays execution by the specified milliseconds
- --simulate-load <ms>: Runs a CPU intensive loop for the given duration
- --apply-fix: Executes automated fix procedure and logs "Applied fix successfully"
- --cli-utils: Displays a comprehensive summary of all CLI commands with descriptions

# AWS Integrations
- SQS Functions:
  - createSQSEventFromDigest(digest: string): Constructs a mock AWS SQS event that formats the digest payload like a standard SQS message
  - digestLambdaHandler(event: object): Processes incoming SQS messages with JSON parsing error handling and fallback mechanism for missing messageId

# Logging Functions
- logInfo(message: string): Logs detailed operational messages
- logError(error: Error): Logs error information including stack trace when verbose mode is active

# Configuration File (.github/agentic-lib.yml)
- schedule: schedule-2
- readOnlyFilepaths:
  - mission: "MISSION.md"
  - contributing: "CONTRIBUTING.md"
  - formattingFile: ".prettierrc"
  - lintingFile: "eslint.config.js"
- writeableFilepaths:
  - docs: "docs/"
  - features: "features/"
  - library: "library/"
  - src: "src/lib/"
  - tests: "tests/unit/"
  - dependencies: "package.json"
  - readme: "README.md"
  - sources: "SOURCES*.md"
- Execution Commands:
  - buildScript: "npm run build"
  - testScript: "npm test"
  - mainScript: "npm run start"
- Limits:
  - sourcesLimit: 8
  - documentsLimit: 128
  - featuresWipLimit: 6
  - featureDevelopmentIssuesWipLimit: 6
  - maintenanceIssuesWipLimit: 2
  - attemptsPerBranch: 2
  - attemptsPerIssue: 2

# Licensing
- Core workflows: GPL-3 with attribution clause
- Example workflows: MIT licensed

# Attribution
- This work is derived from https://github.com/xn-intenton-z2a/agentic-lib
- Data Size: 656584 bytes, Links Found: 5095

## Attribution
- Source: Agentic Library Documentation
- URL: https://github.com/xn-intenton-z2a/agentic-lib
- License: License: Varies by file, typically open source (check repository for details)
- Crawl Date: 2025-04-25T20:28:17.046Z
- Data Size: 656584 bytes
- Links Found: 5095

## Retrieved
2025-04-25
