# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on the seed CONTRIBUTING files in [./seeds].

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

* See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- CLI tool for building and managing OWL ontologies.
- JSON-based persistence and retrieval of OWL ontologies via integrated persistence functions exported from the main module (located in src/lib/main.js).
- Exports a GraphDB-friendly format from OWL ontology JSON using the new GraphDB Exporter feature (now implemented in src/lib/main.js).
- Merge functionality: merge two ontology JSON files and persist the merged result via the new --merge-persist CLI option.
- **Version Display:** Use the new --version flag to display the current package version as specified in package.json.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

- **Display Package Version:**
  ```bash
  node src/lib/main.js --version
  ```

- **Read Ontology from JSON File:**
  ```bash
  node src/lib/main.js --read path/to/ontology.json
  ```

- **Persist Ontology to JSON File:**
  ```bash
  node src/lib/main.js --persist path/to/output.json
  ```

- **Export Ontology to GraphDB Format:**
  ```bash
  node src/lib/main.js --export-graphdb path/to/ontology.json [path/to/output.json]
  ```
  The --export-graphdb command reads an ontology JSON file, converts it into a GraphDB-friendly format (with nodes and edges), and outputs the result either to stdout or writes it to the provided output file.

- **Merge and Persist Ontologies:**
  ```bash
  node src/lib/main.js --merge-persist ontology1.json ontology2.json mergedOntology.json
  ```
  This command reads two ontology JSON files, merges them (combining unique classes and merging properties where the second ontology takes precedence), and writes the merged ontology to the specified output file.

For direct use of the persistence functionality in your code, import the module from:

```javascript
import { readOntology, persistOntology, exportGraphDB, mergeOntologies } from './src/lib/main.js';
```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
