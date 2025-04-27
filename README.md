# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic-lib](nhttps://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Features

- **List Sources (`--list-sources`)**: Outputs the list of configured public data sources in JSON format. If a `data-sources.json` file is present with a valid array of `{ name, url }`, it will be merged with the default sources. Invalid or missing configs will fall back to defaults with a warning for invalid configs.
- **Help (`--help`, `-h`)**: Display the help message with usage instructions.
- **Diagnostics (`--diagnostics`)**: Outputs diagnostic information (version, node version, platform, architecture, working directory, uptimeSeconds, memoryUsage, and commands) as pretty-printed JSON, including:
  - `publicDataSources`: array of configured data sources (default plus any custom from data-sources.json)
  - `healthChecks`: array with real-time availability and latency metrics for each configured data source
  - `dataFilesCount`: number of JSON files in the `data/` directory (or `0` if missing)
  - `dataFiles`: list of JSON filenames in `data/` (sorted, or empty array)
  - `intermediateFilesCount`: number of JSON files in the `intermediate/` directory (or `0` if missing)
  - `intermediateFiles`: list of JSON filenames in `intermediate/` (sorted, or empty array)
  - `dependencies`: object mapping runtime dependency names to their installed versions from `package.json`
  - `devDependencies`: object mapping development dependency names to their installed versions from `package.json`
- **Build Intermediate (`--build-intermediate`)**: Reads JSON files from `data/`, transforms each into OWL JSON-LD intermediate artifacts in `intermediate/`, logs each write, and prints a summary line.
- **Default Behavior**: Running the CLI without any flags logs the provided arguments.
- **Capital Cities (`--capital-cities`)**: Queries DBpedia for country-capital pairs and outputs an OWL-compatible JSON-LD document with `@context` and `@graph`.

... (other sections unchanged) ...