# owl-builder

owl-builder is a robust CLI tool and JavaScript library built to construct OWL ontologies using live, verified public data sources. Leveraging real-time data, it offers an intuitive interface to build, manage, and query rich ontology models.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [For Casual Users](#for-casual-users)
  - [Using Real Endpoints](#using-real-endpoints)
  - [For Developers](#for-developers)
  - [Extended Ontology Functions](#extended-ontology-functions)
  - [Running the Web Server](#running-the-web-server)
  - [Diagnostics](#diagnostics)
- [CLI Commands](#cli-commands)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

owl-builder is focused on leveraging live public data to generate OWL ontologies. It integrates data from multiple verified endpoints, ensuring that your ontological models reflect real-world information.

## Features

- **Ontology Building:** Create ontology models derived from live public data.
- **Data Persistence:** Easily persist, load, backup, and clear ontology data stored in JSON files.
- **Querying:** Search and validate ontology concepts.
- **OWL Export/Import:** Convert ontology objects to a simple OWL XML format and import from XML strings.
- **Data Crawling:** Crawl an extended list of public endpoints to gather real data and generate OWL representations.
- **Ontology Model Wrappers:** Build basic, advanced, and custom ontology models with extended capabilities.
- **Diagnostics:** Execute remote API calls to verify connectivity and data integrity.
- **Web Server:** A built-in web server for monitoring and diagnostics.

## Installation

Ensure you have Node.js v20 or later installed. Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

By default, running the tool without any command line arguments runs a comprehensive demo that exercises most of the ontology functionalities. This demo builds, persists, loads, queries, exports, imports, backs up, updates, and extends an ontology, as well as crawling a set of public endpoints and demonstrating ontology model wrappers. You can run the demo with:

```bash
npm run start
```

Display the help information at any time with:

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

### Using Real Endpoints

owl-builder crawls multiple verified public endpoints to generate meaningful OWL XML output. Simply run:

```bash
node src/lib/main.js --crawl
```

The output will be a JSON array with objects for each endpoint containing:

- `endpoint`: The API URL.
- `data`: The live response as a string.
- `owlContent`: The generated OWL XML, e.g., `<ontology><title>Public Data Ontology</title></ontology>`

### For Developers

- **Build and Persist:** Use CLI commands to build and save ontologies directly from public data.
- **Testing:** Run unit tests with:

```bash
npm run test:unit
```

- **Linting and Formatting:**

```bash
npm run linting
npm run formatting
```

Refer to inline comments in `src/lib/main.js` and [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

### Extended Ontology Functions

- **Build Custom Ontology:**
  ```bash
  node src/lib/main.js --build-custom '{"concepts": ["CustomConcept"], "extraInfo": "value"}'
  ```

- **Extend Ontology Concepts:**
  ```bash
  node src/lib/main.js --extend-concepts "NewConcept1,NewConcept2"
  ```

### Running the Web Server

Start the diagnostic web server:

```bash
npm run serve
```

Server listens on port 3000 by default. To change the port:

```bash
PORT=4000 npm run serve
```

### Diagnostics

Diagnostics mode performs real API calls and returns consolidated OWL JSON output:

```bash
npm run diagnostics
```

### For the Scientific Community

owl-builder supports experiments by:

- **Leveraging Real Data:** Integrate data from verified public endpoints to enrich ontology models.
- **Custom Models:** Extend basic, advanced, and custom ontology wrappers to meet research needs.
- **Reproducibility:** Consistent coding and diagnostics ensure traceable research outputs.

## CLI Commands

Key commands include:

- `--help`: Displays usage instructions.
- `--version`: Shows the tool version.
- `--list`: Lists all supported CLI commands.
- `--build`: Generates an ontology using live data.
- `--persist`: Persists the generated ontology to a file.
- `--load`: Loads the saved ontology from file.
- `--query "searchTerm"`: Searches ontology concepts by the provided term.
- `--export`: Exports the ontology to OWL XML.
- `--import`: Imports an ontology from an OWL XML string.
- `--backup`: Creates a backup of the current ontology file.
- `--update "New Title"`: Updates the ontology's title.
- `--clear`: Deletes the ontology file if it exists.
- `--crawl`: Crawls public endpoints and returns the results.
- `--fetch-retry`: Demonstrates secure data fetching with retry logic.
- `--build-basic`: Creates a basic OWL model.
- `--build-advanced`: Creates an advanced OWL model.
- `--wrap-model [JSON]`: Wraps an ontology model with additional metadata.
- `--build-custom`: Builds a custom ontology with user-defined options.
- `--extend-concepts`: Extends an ontology by adding extra concepts.
- `--diagnostics`: Fetches remote API data and outputs consolidated OWL JSON.
- `--serve`: Starts the built-in web server.

## API Documentation

When used as a library, owl-builder exports functions to build, persist, load, query, and manipulate ontologies. Refer to inline comments in `src/lib/main.js` for detailed API documentation.

## Contributing

Please review [CONTRIBUTING.md](CONTRIBUTING.md) before contributing. We welcome improvements that enhance code quality, test coverage, and documentation.

## Changelog

- **Version 0.0.30**
  - Integrated real public data sources for ontology building.
  - Extended list of public endpoints.
  - Added a default User-Agent header for API requests to improve compatibility with services like GitHub.
  - Added a comprehensive demo mode as the default main execution to showcase all ontology functions.
  - README refreshed per CONTRIBUTING guidelines.

## License

Released under the MIT License.
