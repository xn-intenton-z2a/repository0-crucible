# AUTO_UPDATE

## Overview
This feature adds an auto-update check to the CLI tool. When the user runs the tool with the `--update` flag, the CLI will query the npm registry to determine if a newer version of the tool is available. This capability ensures that users are informed about available updates, helping keep the tool secure and up-to-date with the latest improvements.

## Implementation Details

### Source File Update (src/lib/main.js)
- At the start of the `main` function, check if the arguments contain `--update`.
- When `--update` is detected, use Node's built-in `https` module to perform a GET request to the npm registry endpoint (e.g., `https://registry.npmjs.org/@xn-intenton-z2a/repository0-crucible`) to fetch package metadata.
- Extract the latest version from the fetched data and compare it to the current version (read from the local `package.json`).
- Log a message indicating whether the tool is up-to-date or if a newer version is available.
- Exit after performing the update check so that no further commands are executed during the update process.

### Test File Update (tests/unit/main.test.js)
- Add a new test case simulating the CLI invocation with the `--update` flag.
- Mock the network request (using a library like `vi` mocking capabilities) to return a predetermined version (either greater than or equal to the current version).
- Capture `console.log` output and assert that it includes a message such as "Tool is up-to-date" or "Update available: version X.X.X".

### README Update (README.md)
- Update the usage instructions to document the new `--update` flag.
- Provide an example command:
  ```bash
  node src/lib/main.js --update
  ```
- Explain that this command checks the online npm registry for any available updates and notifies the user of the status.

### Dependencies File Update (package.json)
- No new external dependencies are required since the feature leverages Node’s built-in modules.

## Testing & Compatibility
- Run the tool with the `--update` flag and observe that an appropriate update check message is logged.
- Verify that normal CLI operations remain unaffected when the flag is not provided.

## Long-Term Considerations
- This feature lays the groundwork for future enhancements such as automated downloading and installation of updates.
- In later iterations, the tool may inform the user with a prompt to update or even trigger a self-update mechanism if desired.
