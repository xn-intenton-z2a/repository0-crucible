# Summary
Enable a new default behavior switch for the CLI to route unknown flags to a subcommand, improving extensibility and handling of custom commands.

# Functional Requirements

1. In `src/lib/main.js`:
   - Export a function `isKnownFlag(flag: string): boolean` that returns true for any supported flags (e.g., --list-sources, --fetch-source, etc.).
   - Modify `main(args: string[])`:
     - Before default stub behavior, detect if the first argument is not a known flag:
       - If so, treat it as a subcommand name and delegate to a new handler:
         ```js
         handleSubcommand(command: string, subArgs: string[]): void
         ```
     - Provide a stub `handleSubcommand` that:
       - Logs `[subcommand] invoked with [args]`
       - Exits with code 0.
     - If the first argument is a known flag, retain existing behavior.

2. CLI Usage:
   - `node src/lib/main.js unknownArg foo bar` logs:
     ```
     Subcommand 'unknownArg' invoked with ['foo','bar']
     ```
   - Existing flags continue to behave unchanged.

3. API:
   - `export function isKnownFlag(flag: string): boolean`
   - `export function handleSubcommand(command: string, subArgs: string[]): void`
   - `main(args: string[]): void` — delegates to subcommand or flag handling.

4. Testing:
   - In `tests/unit/main.test.js`:
     - Unit tests for `isKnownFlag` covering known and unknown flags.
     - CLI integration test:
       - Simulate `main(["foo","a","b"])`; spy on `console.log` and `process.exit`; assert logging of subcommand and exit code 0.
     - Confirm existing `--list-sources` behavior remains unchanged.
   
5. Documentation:
   - Update `README.md`:
     - Under **Features**, add **Subcommand Routing**: description and example.
     - Under **Usage**, show example with unknown command.

# Rationale
This feature provides a clear extension point for future subcommands without altering the default stub logic or existing flag handlers.