# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic-lib](nhttps://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds](./seeds).

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

* See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- **List Sources (`--list-sources`)**: Outputs the list of configured public data sources in JSON format. If a `data-sources.json` file is present with a valid array of `{ name, url }`, it will be merged with the default sources. Invalid or missing configs will fall back to defaults with a warning for invalid configs.
- **Help (`--help`, `-h`)**: Display the help message with usage instructions.
- **Diagnostics (`--diagnostics`)**: Outputs diagnostic information (version, node version, platform, architecture, working directory, public data sources, and commands) as pretty-printed JSON.
- **Default Behavior**: Running the CLI without any flags logs the provided arguments.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

### Listing Available Data Sources

```bash
node src/lib/main.js --list-sources
```

### Diagnostics

Use the `--diagnostics` flag to display environment and configuration diagnostics:

```bash
node src/lib/main.js --diagnostics
```

Sample output:

```json
{
  "version": "1.2.0-0",
  "nodeVersion": "v20.0.0",
  "platform": "linux",
  "arch": "x64",
  "cwd": "/path/to/your/project",
  "publicDataSources": [
    {
      "name": "DBpedia SPARQL",
      "url": "https://dbpedia.org/sparql"
    }
  ],
  "commands": [
    "--help",
    "-h",
    "--list-sources",
    "--diagnostics",
    "--serve",
    "--build-intermediate",
    "--build-enhanced",
    "--refresh",
    "--merge-persist"
  ]
}
```

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```
