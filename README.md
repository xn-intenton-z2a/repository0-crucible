# owl-builder

owl-builder is a robust CLI tool and JavaScript library for constructing OWL ontologies using live, verified public data sources. This tool allows users to build, persist, load, query, and export ontologies, ensuring that models reflect current real-world data.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [For Casual Users](#for-casual-users)
  - [For Developers](#for-developers)
  - [Extended Commands](#extended-commands)
- [CLI Commands](#cli-commands)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

owl-builder leverages live public data to generate ontology models. Its refocused mission is to ensure your ontologies are built with up-to-date and trusted external data from multiple verified endpoints.

## Features

- **Ontology Building:** Construct ontology models from real-time data.
- **Data Persistence:** Save, load, backup, and clear ontology JSON files.
- **Querying and Validation:** Search for ontology concepts and verify model integrity.
- **OWL Export/Import:** Convert ontologies to a simple OWL XML format.
- **Data Crawling:** Retrieve live data from an extended list of public endpoints.
- **Ontology Model Wrappers:** Build basic, advanced, and custom ontology models.
- **Diagnostics & Web Server:** Monitor and diagnose operations via a built-in web server.

## Installation

Ensure Node.js v20 or later is installed. Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

- **Run Demo:**

  Running the tool without arguments executes a demo showcasing building, persisting, querying, and more:

  ```bash
  npm run start
  ```

- **Help Information:**

  ```bash
  node src/lib/main.js --help
  ```

### For Casual Users

- **Build Ontology:**
  ```bash
  node src/lib/main.js --build
  ```

- **Export to OWL (XML):**
  ```bash
  node src/lib/main.js --export
  ```

- **Crawl Data:**
  ```bash
  node src/lib/main.js --crawl
  ```

### For Developers

- **Testing:** Run unit tests with:

  ```bash
  npm run test:unit
  ```

- **Linting and Formatting:**

  ```bash
  npm run linting
  npm run formatting
  ```

Refer to the inline code comments for API documentation.

### Extended Commands

owl-builder supports additional commands for customizations and diagnostics. Some key commands include:

- `--build-custom`: Build a custom ontology with user-defined options.
- `--extend-concepts`: Add extra concepts to an existing ontology.
- `--diagnostics`: Execute live diagnostics via public endpoints.
- `--serve`: Start the built-in web server for monitoring.

## CLI Commands

Key commands:

- `--help`: Show usage instructions.
- `--version`: Display the tool version.
- `--list`: List available commands.
- `--build`: Generate an ontology.
- `--persist`: Save the ontology to a JSON file.
- `--load`: Load a saved ontology.
- `--query "term"`: Search for ontology concepts.
- `--export`: Export ontology in OWL XML format.
- `--import`: Import ontology from an OWL XML string.
- `--backup`: Create a backup of the ontology file.
- `--update "New Title"`: Update the ontology title.
- `--clear`: Delete the ontology file.
- `--crawl`: Crawl public endpoints for live data.
- `--fetch-retry`: Fetch data with retry logic.
- `--build-basic`, `--build-advanced`, `--wrap-model`: Build various ontology models.
- `--build-custom`: Build a customized ontology.
- `--extend-concepts`: Extend the ontology with new concepts.
- `--diagnostics`: Run diagnostics and connectivity tests.
- `--serve`: Launch the web server.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute. We welcome code quality improvements, added test coverage, and documentation updates.

## Changelog

- **Version 0.0.31**
  - README refreshed to align with CONTRIBUTING guidelines.
  - Minor documentation tweaks and cleanup.
  - Refactored messaging to better reflect the mission of building ontologies from live public data sources.

## License

Released under the MIT License.
