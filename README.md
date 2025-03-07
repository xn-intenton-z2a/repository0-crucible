# owl-builder

owl-builder is a powerful CLI tool and JavaScript library designed to help you build, manage, and query OWL ontologies from verified public data sources. This tool provides an intuitive interface for both developers and casual users, and even serves as a platform for scientific and AI experiments in ontology building.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [For Casual Users](#for-casual-users)
  - [For Developers](#for-developers)
  - [For the Scientific Community](#for-the-scientific-community)
- [CLI Commands](#cli-commands)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

owl-builder is a CLI tool and library focused on building OWL ontologies. It helps you generate, persist, query, and export ontologies in a variety of formats, including a simple OWL XML representation. The tool has been designed from the ground up to leverage data from public endpoints and support evolving requirements in ontology integrations.

---

## Features

- **Ontology Building:** Create a basic ontology model with predefined concepts.
- **Data Persistence:** Easily persist, load, backup, and clear ontology data stored in JSON files.
- **Querying:** Perform simple queries against ontology concepts.
- **OWL Export/Import:** Convert ontology objects to an OWL XML format and import from XML strings.
- **Data Crawling:** Crawl multiple public endpoints to capture data and generate OWL representations.
- **Ontology Model Wrappers:** Supports both basic and advanced OWL model wrappers; wrap ontology models with additional metadata.
- **Diagnostics:** Use the diagnostics command to output environment settings for troubleshooting.

---

## Installation

Ensure you have Node.js version 20 or later installed.

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

---

## Usage

Display the help information:

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

- **Run Data Crawling (with dummy data by default):**
  ```bash
  node src/lib/main.js --crawl
  ```

Set `FORCE_DUMMY_ENDPOINT` to `false` to make real network requests:

```bash
FORCE_DUMMY_ENDPOINT=false node src/lib/main.js --crawl
```

### For Developers

owl-builder was built with testability and extendability in mind. The source code is modular and adheres to high code-quality standards:

- **Build and Persist:** Use the provided commands to build and save ontology data.
- **Testing:** Run unit tests with:

```bash
npm run test:unit
```

- **Linting and Formatting:** Keep the code style consistent with:

```bash
npm run linting
npm run formatting
```

For more detailed information, refer to the inline comments in `src/lib/main.js` and the [CONTRIBUTING.md](CONTRIBUTING.md) file.

### For the Scientific Community

owl-builder can support AI experiments and ontology-driven research projects:

- **Rich Data Crawling:** Leverage multiple public endpoints to collect data for modeling complex ontologies.
- **Custom Models:** Extend the basic OWL model wrappers or create advanced wrappers to match your experimental needs.
- **Reproducibility:** With built-in diagnostics (`--diagnostics`) and consistent code practices, your research outputs are traceable and reliable.

---

## CLI Commands

Here are some key CLI commands:

- `--help`: Displays usage instructions.
- `--version`: Shows the tool version.
- `--build`: Builds a sample ontology.
- `--persist`: Persists the ontology to a file.
- `--load`: Loads the persisted ontology.
- `--query "searchTerm"`: Queries ontology concepts for the given term.
- `--export`: Exports the ontology to an OWL XML representation.
- `--import`: Imports an ontology from an OWL XML string.
- `--backup`: Creates a backup of the ontology file.
- `--update "New Title"`: Updates the ontology title.
- `--clear`: Clears the ontology file.
- `--crawl`: Crawls public endpoints (dummy or real based on the FORCE_DUMMY_ENDPOINT setting).
- `--fetch-retry`: Fetches data with retry logic.
- `--build-basic`: Builds a basic OWL model.
- `--build-advanced`: Builds an advanced OWL model.
- `--wrap-model`: Wraps an ontology model with additional metadata.
- `--diagnostics`: Outputs environment diagnostic information.

---

## Contributing

Please review the [CONTRIBUTING.md](CONTRIBUTING.md) file before submitting contributions. We welcome all enhancements that improve code quality, expand functionality, and update documentation.

Workflow:
1. Create an issue with your proposed changes.
2. The Issue Worker will trigger code updates and tests.
3. Automated PR creation and merge upon passing tests.

Guidelines focus on code quality, testing, documentation, and collaboration. Follow these standards and ensure your changes are well-tested and documented.

---

## Changelog

- **Version 0.0.26**
  - Added new CLI command `--diagnostics` for environment diagnostics.
  - Extended test coverage and refactored ontology model wrappers.
  - Regenerated documentation and project README to align with contributing guidelines.

---

## License

Released under the MIT License.
