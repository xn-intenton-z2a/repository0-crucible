# owl-builder

owl-builder is a CLI tool and JavaScript library focused on building and capturing OWL ontologies from verified public data sources. This tool has been refactored to remove simulated functions and redundant framework plumbing, providing a coherent set of commands for crawling public endpoints and generating OWL representations.

## Features

- **Ontology Building:** Create a basic ontology model using verified public data.
- **Data Persistence:** Persist, load, and clear ontology data stored in JSON files.
- **Querying:** Simple querying of ontology concepts.
- **OWL Export/Import:** Convert ontology objects to XML (OWL) format and import from XML.
- **Data Crawling:** Crawl multiple public endpoints to capture data and generate OWL representations.
- **Backup:** Create backups of your ontology files.
- **Ontology Model Wrappers:** New wrappers for creating basic and advanced OWL ontology models, and a function to wrap/enrich any ontology model with additional metadata.

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
- **Build Basic OWL Model:**
  ```bash
  node src/lib/main.js --build-basic
  ```
- **Build Advanced OWL Model:**
  ```bash
  node src/lib/main.js --build-advanced
  ```
- **Wrap an Ontology Model:**
  Provide a JSON model as argument or it will default to the basic model
  ```bash
  node src/lib/main.js --wrap-model '{"title":"Custom Model"}'
  ```

## Changelog

- **Version 0.0.25**
  - Added wrappers for OWL ontology models including basic and advanced models.
  - Introduced CLI commands: --build-basic, --build-advanced, and --wrap-model to facilitate ontology model creation and enrichment.
  - Updated test coverage with new tests for the ontology model wrappers.
  - Updated documentation to reflect these changes.

## Contributing

Please review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

## License

Released under the MIT License.
