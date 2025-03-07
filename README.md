# owl-builder

owl-builder is a powerful CLI tool and JavaScript library designed to help you build, manage, and query OWL ontologies from verified public data sources. This tool provides an intuitive interface for both developers and casual users, and serves as a platform for scientific and AI experiments in ontology building with real public data.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [For Casual Users](#for-casual-users)
  - [Using Real Endpoints for Meaningful OWL Output](#using-real-endpoints-for-meaningful-owl-output)
  - [For Developers](#for-developers)
  - [Extended Custom Ontology Functions](#extended-custom-ontology-functions)
  - [Running the Web Server](#running-the-web-server)
  - [Diagnostics Mode](#diagnostics-mode)
  - [For the Scientific Community](#for-the-scientific-community)
- [CLI Commands](#cli-commands)
- [SDK Documentation](#sdk-documentation)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

owl-builder is a CLI tool and library refocused on building OWL ontologies by leveraging verified public data sources. It assists in generating, persisting, querying, and exporting ontologies in various formats, including a simple OWL XML representation. The tool is optimized for integrating real public endpoints to enrich your ontology models.

---

## Features

- **Ontology Building:** Create ontology models using real data from public endpoints.
- **Data Persistence:** Persist, load, backup, and clear ontology data stored in JSON files.
- **Querying:** Perform queries against ontology concepts.
- **OWL Export/Import:** Convert ontology objects to a simple OWL XML format and import from XML strings.
- **Data Crawling:** Crawl multiple public endpoints to collect data and generate OWL representations. (By default, dummy data is used; disable dummy mode for real data.)
- **Ontology Model Wrappers:** Offers basic, advanced, and custom ontology builders with extended functionality.
- **Custom Ontology Functions:** Build custom ontologies and extend existing ones with additional concepts.
- **Diagnostics:** Fetch and output aggregated ontology data from real remote API endpoints as JSON. 
- **Web Server:** Built-in web server for real-time monitoring and diagnostics.

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

- **Run Data Crawling with Dummy Data (default):**
  ```bash
  node src/lib/main.js --crawl
  ```

- **List Available Commands:**
  ```bash
  node src/lib/main.js --list
  ```

### Using Real Endpoints for Meaningful OWL Output

To retrieve real data from public endpoints and generate meaningful OWL XML output, disable the dummy data mode by setting the environment variable `FORCE_DUMMY_ENDPOINT` to `false`. For example:

```bash
FORCE_DUMMY_ENDPOINT=false node src/lib/main.js --crawl
```

**Expected output:**

```json
[
  {
    "endpoint": "https://api.publicapis.org/entries",
    "data": "{...actual response data...}",
    "owlContent": "<ontology><title>Public Data Ontology</title></ontology>"
  }
  // ... additional endpoints
]
```

### For Developers

owl-builder is built for testability and extendability. Its modular source code adheres to high-quality standards:

- **Build and Persist:** Use the provided commands to build and save ontology data derived from public sources.
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

### Extended Custom Ontology Functions

Two new functions have been added to extend the ontology building capabilities:

- **Build Custom Ontology:**
  ```bash
  node src/lib/main.js --build-custom '{"concepts": ["CustomConcept"], "extraInfo": "value"}'
  ```
  This command builds an ontology with user-provided customizations.

- **Extend Ontology Concepts:**
  ```bash
  node src/lib/main.js --extend-concepts "NewConcept1,NewConcept2"
  ```
  This command extends an existing ontology by adding the specified concepts.

### Running the Web Server

owl-builder includes a simple web server for real-time monitoring and diagnostics. To start the web server, run:

```bash
npm run serve
```

By default, the server listens on port 3000. To use a different port, set the `PORT` environment variable:

```bash
PORT=4000 npm run serve
```

When running, the web server will display a message indicating it is active along with the URL, which you can visit in your browser.

### Diagnostics Mode

The diagnostics mode now performs real HTTP calls to remote endpoints and returns the consolidated OWL data as JSON. To execute diagnostics:

```bash
npm run diagnostics
```

This command fetches data from configured public API endpoints (with dummy mode disabled) and outputs the results in JSON format.

### For the Scientific Community

owl-builder supports AI experiments and ontology-driven research projects by:

- **Leveraging Public Data:** Crawl real public endpoints to enrich ontology models.
- **Custom Models:** Extend or modify the basic, advanced, and custom ontology wrappers to meet your research needs.
- **Reproducibility:** Built-in diagnostics and consistent coding practices ensure traceable research outputs.

---

## CLI Commands

Key CLI commands include:

- `--help`: Displays usage instructions.
- `--version`: Shows the tool version.
- `--list`: Lists all supported CLI commands.
- `--build`: Generates an ontology using public data and prints it.
- `--persist`: Persists the ontology to a file.
- `--load`: Loads and prints the saved ontology.
- `--query "searchTerm"`: Searches ontology concepts by the given term.
- `--export`: Exports the ontology to an OWL XML format and prints it.
- `--import`: Imports an ontology from an OWL XML string and prints it.
- `--backup`: Creates a backup of the current ontology file.
- `--update "New Title"`: Updates the ontology's title.
- `--clear`: Deletes the ontology file if it exists.
- `--crawl`: Initiates crawling of public endpoints and returns the results.
- `--fetch-retry`: Demonstrates data fetching with retry logic.
- `--build-basic`: Creates and prints a basic OWL model.
- `--build-advanced`: Creates and prints an advanced OWL model.
- `--wrap-model [JSON]`: Wraps the provided or default ontology model with additional metadata.
- `--build-custom`: Builds a custom ontology with user-defined options.
- `--extend-concepts`: Extends an existing ontology with additional concepts.
- `--diagnostics`: Fetches remote API data and outputs consolidated OWL JSON.
- `--serve`: Starts the web server for monitoring.

---

## SDK Documentation

When used as a library, owl-builder exports the following functions:

- **buildOntology()**: Returns a public data-driven ontology object.
- **persistOntology(ontology)**: Persists the ontology to a JSON file and returns a status object.
- **loadOntology()**: Loads and parses the persisted ontology JSON file.
- **queryOntology(searchTerm)**: Searches ontology concepts by the provided term.
- **validateOntology(ontology)**: Checks if the ontology has a title.
- **exportOntologyToXML(ontology)**: Exports the ontology to a simple OWL XML format.
- **importOntologyFromXML(xml)**: Imports an ontology from an OWL XML string.
- **backupOntology()**: Creates a backup of the ontology file.
- **updateOntology(newTitle)**: Updates the ontology's title and returns the updated object.
- **clearOntology()**: Deletes the ontology file if it exists.
- **listAvailableEndpoints()**: Returns a list of preset public endpoints for crawling data.
- **fetchDataWithRetry(url, retries)**: Fetches data from a URL with a specified number of retries.
- **crawlOntologies()**: Crawls public endpoints and produces OWL XML representations.
- **buildBasicOWLModel()**: Returns a basic OWL model wrapper.
- **buildAdvancedOWLModel()**: Returns an advanced OWL model wrapper.
- **wrapOntologyModel(model)**: Wraps a provided ontology model with additional metadata (e.g., a timestamp).
- **buildCustomOntology(customizations)**: Builds an ontology with custom parameters.
- **extendOntologyConcepts(ontology, additionalConcepts)**: Extends an ontology by adding new concepts.
- **displayHelp()**: Prints CLI usage instructions.
- **getVersion()**: Returns the current version of owl-builder.
- **listCommands()**: Lists all supported CLI commands.
- **main(args)**: Dispatches CLI commands based on provided arguments.
- **serveWebServer()**: Starts a simple HTTP server for real-time monitoring.

---

## API Documentation

While primarily a CLI tool, owl-builder's commands can serve as API endpoints. Overview of key endpoints:

- **--help**: Displays detailed usage information.
- **--version**: Returns the current tool version.
- **--list**: Returns a list of all available CLI commands.
- **--build**: Generates an ontology using public data and prints it.
- **--persist**: Builds and saves the ontology.
- **--load**: Loads and prints the saved ontology.
- **--query [searchTerm]**: Searches ontology concepts by the given term.
- **--validate**: Validates the ontology object's structure.
- **--export**: Exports the ontology to an OWL XML format and prints it.
- **--import**: Imports a sample ontology from an OWL XML string and prints it.
- **--backup**: Creates a backup of the current ontology file.
- **--update [New Title]**: Updates the ontology's title.
- **--clear**: Deletes the ontology file if it exists.
- **--crawl**: Initiates crawling of public endpoints and returns the results.
- **--fetch-retry**: Demonstrates data fetching with retry logic.
- **--build-basic**: Creates and prints a basic OWL model.
- **--build-advanced**: Creates and prints an advanced OWL model.
- **--wrap-model [JSON]**: Wraps the provided or default ontology model with additional metadata.
- **--build-custom**: Builds a custom ontology with user-defined options.
- **--extend-concepts**: Extends an existing ontology with additional concepts.
- **--diagnostics**: Fetches remote API data and outputs consolidated OWL JSON.
- **--serve**: Starts the web server for monitoring.

---

## Contributing

Please review the [CONTRIBUTING.md](CONTRIBUTING.md) file before contributing. We welcome enhancements that improve code quality, test coverage, and documentation. Follow the described workflows and guidelines. In this release, the diagnostics command was updated to perform real remote API calls to output real OWL JSON, reinforcing our commitment to building ontologies from verified public data sources.

---

## Changelog

- **Version 0.0.28**
  - Extended library functions by adding buildCustomOntology and extendOntologyConcepts.
  - Added new CLI commands: --build-custom, --extend-concepts, and --list.
  - Updated diagnostics command to perform real HTTP calls and log OWL JSON output.
  - Updated documentation to reflect extended functionality for custom ontology building, concept extension, and diagnostics enhancements.
- **Version 0.0.27**
  - Refocused the library on building ontologies from verified public data sources.
  - Updated mission statement and documentation to reflect the new focus.
  - Updated sample ontology title to "Public Data Ontology" in core functions and tests.
  - Extended OWL model wrappers.

---

## License

Released under the MIT License.
