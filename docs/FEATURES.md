# Features

- **List Sources (`--list-sources`)**: Outputs the list of configured public data sources in JSON format. If a `data-sources.json` file is present with a valid array of `{ name, url }`, it will be merged with the default sources. Invalid or missing configs will fall back to defaults with a warning for invalid configs.
- **Help (`--help`, `-h`)**: Display the help message with usage instructions.
- **Diagnostics (`--diagnostics`)**: Outputs diagnostic information (version, node version, platform, architecture, working directory, public data sources, and commands) as pretty-printed JSON.
- **Serve (`--serve`)**: Starts a local HTTP server on port `3000` (or `process.env.PORT`). Available endpoints:
  - **GET `/help`**: Returns the CLI help text as plain text.
  - **GET `/sources`**: Returns the list of public (and custom) data sources as pretty-printed JSON.
  - **GET `/diagnostics`**: Returns diagnostic information (version, node version, platform, architecture, working directory, public data sources, and commands) as pretty-printed JSON.
  - **GET `/capital-cities`**: Queries DBpedia SPARQL for countries and capitals and returns a simple OWL-compatible JSON-LD document (`@context` + `@graph`).
  - Any other path responds with `404 Not Found`.
- **Capital Cities (`--capital-cities`)**: Queries DBpedia SPARQL for countries and capitals and outputs a simple OWL-compatible JSON-LD document (`@context` + `@graph`).
- **Default Behavior**: Running the CLI without the `--list-sources` flag logs the provided arguments.
