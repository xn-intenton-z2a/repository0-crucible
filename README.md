# owl-builder

owl-builder is a CLI tool and JavaScript library focused on building and capturing OWL ontologies from verified public data sources. This tool has been refactored to remove simulated functions and redundant framework plumbing, providing a coherent set of commands for crawling public endpoints and generating OWL representations.

## Features

- **Ontology Building:** Create a basic ontology model using verified public data.
- **Data Persistence:** Persist, load, and clear ontology data stored in JSON files.
- **Querying:** Simple querying of ontology concepts.
- **OWL Export/Import:** Convert ontology objects to XML (OWL) format and import from XML.
- **Data Crawling:** Crawl multiple public endpoints to capture data and generate OWL representations.
- **Backup:** Create backups of your ontology files.

## Usage

Display help:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Build Ontology:**
  ```bash
  node src/lib/main.js --build
  ```
- **Persist Ontology:**
  ```bash
  node src/lib/main.js --persist
  ```
- **Load Ontology:**
  ```bash
  node src/lib/main.js --load
  ```
- **Query Ontology:**
  ```bash
  node src/lib/main.js --query "Concept1"
  ```
- **Export Ontology to OWL (XML):**
  ```bash
  node src/lib/main.js --export
  ```
- **Import Ontology from OWL (XML):**
  ```bash
  node src/lib/main.js --import
  ```
- **Backup Ontology:**
  ```bash
  node src/lib/main.js --backup
  ```
- **Update Ontology Title:**
  ```bash
  node src/lib/main.js --update "New Title"
  ```
- **Clear Ontology File:**
  ```bash
  node src/lib/main.js --clear
  ```
- **Crawl Public Endpoints to Capture OWL Data:**
  ```bash
  node src/lib/main.js --crawl
  ```
  To perform real network requests, set the environment variable `FORCE_DUMMY_ENDPOINT` to `false`:
  ```bash
  FORCE_DUMMY_ENDPOINT=false node src/lib/main.js --crawl
  ```
- **Fetch Data with Retry:**
  ```bash
  node src/lib/main.js --fetch-retry
  ```

## Changelog

- **Version 0.0.24**
  - Increased test coverage by adding tests for error conditions in clearOntology and for retry logic in fetchDataWithRetry.
  - Updated CLI version to 0.0.24 across the tool and tests.

## Contributing

Please review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

## License

Released under the MIT License.
