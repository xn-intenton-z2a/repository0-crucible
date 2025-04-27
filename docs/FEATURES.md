# Features

- **List Sources (`--list-sources`)**: Outputs the list of configured public data sources in JSON format. If a `data-sources.json` file is present with a valid array of `{ name, url }`, it will be merged with the default sources. Invalid or missing configs will fall back to defaults with a warning for invalid configs.
- **Help (`--help`, `-h`)**: Display the help message with usage instructions.
- **Diagnostics (`--diagnostics`)**: Outputs diagnostic information (version, node version, platform, architecture, working directory, uptimeSeconds, memoryUsage, and commands) as pretty-printed JSON, including:
  - **publicDataSources**: Array of configured data sources (merged default and custom from data-sources.json).
  - **healthChecks**: Array of objects with real-time availability and latency metrics for each configured data source:
    - `name` (string): Data source name.
    - `url` (string): Data source URL.
    - `statusCode` (number|null): HTTP status code from a HEAD request, or `null` if unreachable.
    - `latencyMs` (number|null): Round-trip time in milliseconds, or `null` if unreachable.
    - `reachable` (boolean): `true` if statusCode is between 200 and 299.
  - **dataFilesCount**: Number of JSON files in the project `data/` directory (or `0` if directory is missing).
  - **dataFiles**: Sorted list of JSON filenames present in `data/` (or an empty array if none).
  - **intermediateFilesCount**: Number of JSON files in the project `intermediate/` directory (or `0` if directory is missing).
  - **intermediateFiles**: Sorted list of JSON filenames present in `intermediate/` (or an empty array if none).

Example output:
```json
{
  "version": "1.2.0-0",
  "nodeVersion": "v20.0.0",
  "platform": "linux",
  "arch": "x64",
  "cwd": "/path/to/project",
  "uptimeSeconds": 123.45,
  "memoryUsage": { /* ... */ },
  "publicDataSources": [ /* ... */ ],
  "commands": [ /* ... */ ],
  "healthChecks": [ /* ... */ ],
  "dataFilesCount": 2,
  "dataFiles": ["a.json","b.json"],
  "intermediateFilesCount": 1,
  "intermediateFiles": ["x.json"]
}
```