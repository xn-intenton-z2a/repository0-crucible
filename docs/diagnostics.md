# Diagnostics Feature

## Description

The diagnostics mode provides essential information about the runtime, application version, configured faces, and project dependencies for troubleshooting and verification purposes.

## CLI Options

- `--diagnostics`, `-d`
  Invoke diagnostics mode. No other flags are permitted alongside.

## Output

When invoked, the CLI prints the following lines:

```
Diagnostics:
Node.js version: <version>
Application version: <version>
Face count: <number>
Face names: <name1>, <name2>, ...
Dependencies:
- <package1>@<version>
- <package2>@<version>
...
```

### Example

```bash
repository0-crucible --diagnostics
```

```
Diagnostics:
Node.js version: v20.5.0
Application version: 1.4.0
Face count: 4
Face names: frown, smile, surprised, wink
Dependencies:
- dotenv@16.5.0
- ejs@3.1.10
- js-yaml@4.1.0
- minimatch@9.0.5
- openai@4.96.2
- seedrandom@3.0.5
- zod@3.24.4
```

## Error Conditions

- Extra arguments or flags after `--diagnostics` / `-d`

  ```bash
  repository0-crucible --diagnostics extra
  ```

  Prints: `Error: unknown flag 'extra'` and exits with code 1.
