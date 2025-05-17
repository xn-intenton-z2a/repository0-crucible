# Command Line Interface

This section documents flags and commands for the CLI tool.

## Running the CLI

You can invoke the tool directly:

```bash
node src/lib/main.js [options] [args...]
```

Or via npm script:

```bash
npm run start -- [options] [args...]
```

## Options

- `--mission`, shorthand `-m`
  Display the repository's mission statement.
  
  Usage:

  ```bash
  node src/lib/main.js --mission
  npm run start -- --mission
  ```

  Sample Output:

  ```markdown
  # xn-intenton-z2a/repository0-crucible
  Explore novel algorithms for calculating π to varying digit lengths using different techniques, benchmark their performance, and generate results as PNG visualizations or text-based formats.
  ```

- (Default)
  When no flags are provided, the tool echoes all provided arguments.

  Usage:

  ```bash
  node src/lib/main.js foo bar
  npm run start -- foo bar
  ```

  Output:

  ```text
  Run with: ["foo","bar"]
  ```

## Future Enhancements

- Additional flags for diagnostics, serving, and other workflows (see package.json scripts).
- More advanced calculation features to be added.