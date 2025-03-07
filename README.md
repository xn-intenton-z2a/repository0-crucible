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

owl-builder is a CLI tool and library focused on building OWL ontologies by leveraging verified public data sources. It provides features to generate, persist, query, and export ontologies in various formats, including a simple OWL XML representation. This release refocuses the tool on integrating real public data sources, ensuring that ontology building is rooted in verified and live data.

---

## Features

- **Ontology Building:** Create ontology models using data from verified public endpoints.
- **Data Persistence:** Persist, load, backup, and clear ontology data stored in JSON files.
- **Querying:** Perform queries against ontology concepts.
- **OWL Export/Import:** Convert ontology objects to a simple OWL XML format and import from XML strings.
- **Data Crawling:** Crawl multiple public endpoints to collect data and generate OWL representations.
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

- **Data Crawling:**
  ```bash
  node src/lib/main.js --crawl
  ```

- **List Available Commands:**
  ```bash
  node src/lib/main.js --list
  ```

### Using Real Endpoints for Meaningful OWL Output

The data crawling feature fetches live data from verified public endpoints to generate meaningful OWL XML output. Simply run:

```bash
node src/lib/main.js --crawl
```

**Expected output:**

A JSON array with objects for each endpoint containing:

- `endpoint`: The URL of the public API endpoint.
- `data`: The live response data as a string.
- `owlContent`: A generated OWL XML representation, e.g., `<ontology><title>Public Data Ontology</title></ontology>`

### For Developers

owl-builder is built for testability and extendability. Its modular source code adheres to high-quality standards:

- **Build and Persist:** Use the provided commands to build and save ontology data derived from real public data sources.
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

Two new functions extend the ontology building capabilities:

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

### Diagnostics Mode

Diagnostics mode performs real HTTP calls to remote endpoints and returns consolidated OWL JSON output:

```bash
npm run diagnostics
```

### Extended Endpoints Testing

A new test has been added to fetch data from an extended list of endpoints including:

- https://api.chucknorris.io/jokes/random
- https://api.agify.io?name=michael

This test logs a snippet of the response from each endpoint to help verify connectivity and data integrity.

### For the Scientific Community

owl-builder supports scientific and AI experiments by:

- **Leveraging Public Data:** Integrating data from verified public endpoints to enrich ontology models.
- **Custom Models:** Extending or modifying basic, advanced, and custom ontology wrappers to meet research needs.
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
- `--import`: Imports a sample ontology from an OWL XML string and prints it.
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
- **listAvailableEndpoints()**: Returns an extended list of public endpoints for crawling data.
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

Please review the [CONTRIBUTING.md](CONTRIBUTING.md) file before contributing. We welcome enhancements that improve code quality, test coverage, and documentation. Follow the described workflows and guidelines.

In this release, the tool has been refocused on integrating real public data sources for ontology building, and the list of endpoints has been extended.

---

## Changelog

- **Version 0.0.30**
  - Extended the list of public endpoints with additional URLs: https://api.chucknorris.io/jokes/random and https://api.agify.io?name=michael.
  - Added a new test to iterate over all endpoints and log a snippet of their responses.
  - Refocused the library on building ontologies from public data sources.

---

## License

Released under the MIT License.
