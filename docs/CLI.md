# Command Line Interface

This section documents available flags and commands for the CLI tool.

## Options

- `--mission`, shorthand `-m`
  - Description: Display the repository's mission statement in the console.
  - Usage:
    ```bash
    node src/lib/main.js --mission
    ```
  - Example Output:
    ```markdown
    # xn-intenton-z2a/repository0-crucible
    Explore novel algorithms for calculating π to varying digit lengths using different techniques, benchmark their performance, and generate results as PNG visualizations or text-based formats.
    ```

- (Default)
  - When no flags are provided, the tool will echo the provided arguments.
    ```bash
    node src/lib/main.js arg1 arg2
    ```
    Output:
    ```text
    Run with: ["arg1","arg2"]
    ```
