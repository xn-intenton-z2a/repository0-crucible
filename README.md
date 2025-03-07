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
  - [Running the Web Server](#running-the-web-server)
  - [For the Scientific Community](#for-the-scientific-community)
- [CLI Commands](#cli-commands)
- [SDK Documentation](#sdk-documentation)
- [API Documentation](#api-documentation)
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
- **Data Crawling:** Crawl multiple public endpoints to capture data for generating OWL representations.
- **Ontology Model Wrappers:** Supports both basic and advanced OWL model wrappers; wrap ontology models with additional metadata.
- **Diagnostics:** Use the diagnostics command to output environment settings for troubleshooting.
- **Web Server:** Run a simple web server to monitor ontology status and diagnostics in real-time.

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

### Running the Web Server

owl-builder now includes a simple built-in web server for real-time monitoring and diagnostics. This is particularly useful for developers who wish to integrate a web-based interface for observing ontology statuses or for debugging purposes.

To start the web server, run:

```bash
npm run serve
```

By default, the server listens on port 3000. To use a different port, set the `PORT` environment variable:

```bash
PORT=4000 npm run serve
```

When running, the web server will display a message indicating it is active and provide the URL. You can visit this URL in your browser to confirm that the server is running.

### For the Scientific Community

owl-builder can support AI experiments and ontology-driven research projects:

- **Rich Data Crawling:** Leverage multiple public endpoints to collect data for modeling complex ontologies.
- **Custom Models:** Extend the basic OWL model wrappers or create advanced wrappers tailored to your research needs.
- **Reproducibility:** With built-in diagnostics (`--diagnostics`) and consistent coding practices, your research outputs remain traceable.

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
- `--crawl`: Crawls public endpoints (using dummy or real data based on the FORCE_DUMMY_ENDPOINT setting).
- `--fetch-retry`: Fetches data with retry logic.
- `--build-basic`: Builds a basic OWL model.
- `--build-advanced`: Builds an advanced OWL model.
- `--wrap-model`: Wraps an ontology model with additional metadata.
- `--diagnostics`: Outputs environment diagnostic information.
- `--serve`: Starts the built-in web server for monitoring.

---

## SDK Documentation

When imported as a JavaScript library, owl-builder exports the following functions. Below is a brief description of each:

- **buildOntology()**: Returns a sample ontology object.
- **persistOntology(ontology)**: Persists the given ontology object to a JSON file and returns a status object.
- **loadOntology()**: Loads and parses the persisted ontology JSON file.
- **queryOntology(searchTerm)**: Queries the ontology's concepts for the given search term and returns matching results.
- **validateOntology(ontology)**: Validates if the provided ontology object has a title.
- **exportOntologyToXML(ontology)**: Exports the provided ontology object to a simple OWL XML representation.
- **importOntologyFromXML(xml)**: Imports an ontology from an OWL XML formatted string.
- **backupOntology()**: Creates a backup of the current ontology file.
- **updateOntology(newTitle)**: Updates the ontology's title and returns the updated object.
- **clearOntology()**: Clears the ontology file if it exists.
- **listAvailableEndpoints()**: Returns a list of preset public endpoints for crawling data.
- **fetchDataWithRetry(url, retries)**: Attempts to fetch data from a given URL with a specified number of retries.
- **crawlOntologies()**: Crawls preset endpoints and generates OWL XML representations of the sample ontology.
- **buildBasicOWLModel()**: Returns a basic OWL model wrapper.
- **buildAdvancedOWLModel()**: Returns an advanced OWL model wrapper with extra details.
- **wrapOntologyModel(model)**: Wraps an ontology model by adding additional metadata (such as a timestamp).
- **displayHelp()**: Prints help information regarding CLI usage.
- **getVersion()**: Returns the current version of owl-builder.
- **listCommands()**: Returns a list of supported CLI commands.
- **main(args)**: The main CLI function that dispatches commands based on provided arguments.
- **serveWebServer()**: Starts a simple HTTP web server to provide real-time monitoring and diagnostics.

---

## API Documentation

While owl-builder is primarily a CLI tool, its CLI commands can be considered as API endpoints when executed. Overview of the exposed endpoints:

- **--help**: Displays a help message detailing usage and available options.
- **--version**: Returns the current version of the tool.
- **--list**: Lists all supported CLI commands.
- **--build**: Generates a sample ontology and prints it.
- **--persist**: Builds and persists the sample ontology to a file.
- **--load**: Loads and prints the persisted ontology from the file.
- **--query [searchTerm]**: Searches for ontology concepts matching the provided term.
- **--validate**: Validates the structure of the sample ontology object.
- **--export**: Exports the ontology to an OWL XML format and prints the XML string.
- **--import**: Imports a sample ontology from an OWL XML string and prints the imported object.
- **--backup**: Creates a backup of the current ontology file.
- **--update [New Title]**: Updates the ontology's title and returns the updated object.
- **--clear**: Deletes the ontology file if it exists.
- **--crawl**: Initiates a crawl of public endpoints (using dummy or real data based on settings) and returns the results.
- **--fetch-retry**: Demonstrates data fetching with retry logic for a given URL.
- **--build-basic**: Generates and prints a basic OWL model.
- **--build-advanced**: Generates and prints an advanced OWL model.
- **--wrap-model [JSON]**: Wraps a provided or default ontology model with additional metadata.
- **--diagnostics**: Outputs environment diagnostic information.
- **--serve**: Starts a simple web server for monitoring.

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
  - Updated documentation to include instructions for running the built-in web server.
  - Added new CLI command `--serve` to start a simple web server for monitoring purposes.

---

## License

Released under the MIT License.
