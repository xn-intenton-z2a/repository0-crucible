# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. It leverages multiple endpoints with robust error handling to construct ontologies accurately and efficiently. In this release, the tool has been enhanced to generate an advanced ontology model that integrates additional OWL schema details, wraps multiple model versions for deeper analysis, and now provides new extended functions for generating comprehensive ontology reports, listing an extended set of public data endpoints, and wrapping extended ontology models.

Contributions are welcome – please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Change Log
- Pruned drift from the source file to align with the Mission Statement.
- Updated the Mission Statement to focus on building robust ontologies from public data sources with enhanced integration and querying capabilities.
- Retained and enhanced CLI commands including "--update" for modifying the ontology title and "--clear" for removing a persisted ontology.
- Added command "--fetch-endpoints" to retrieve data from five public endpoints.
- **New Feature:** Added "--enhance" command to generate an enhanced ontology with additional OWL model details.
- **New Feature:** Added "--wrap" command to aggregate basic, enhanced, and integrated ontology models.
- **New Feature:** Added "--wrap-extended" command to aggregate extended ontology models including report, synced and rebuilt versions along with basic, enhanced and integrated models.
- **New Feature:** Added "--report" command to generate a comprehensive ontology report including summary and analysis.
- **New Feature:** Added "--list-endpoints" command to list an extended set of public endpoints.
- **Fix:** Standardized CLI option quotes to double quotes in source files and updated ESLint configuration to exclude archived files from linting.
- Ensured comprehensive test coverage for file system and network error scenarios.

## Installation

Install via npm:

```bash
npm install owl-builder
```

## Features

- **CLI Commands:**
  - --help: Display help instructions.
  - --version: Show tool version.
  - --list: List supported commands.
  - --build: Build a sample ontology.
  - --serve: Start the web interface.
  - --diagnostics: Show system diagnostics.
  - --integrate: Integrate supplemental ontologies.
  - --crawl: Crawl public data sources.
  - --persist: Save the ontology to a file.
  - --load: Load a persisted ontology.
  - --query: Query the ontology.
  - --validate: Validate the ontology structure.
  - --export: Export the ontology to XML.
  - --import: Import an ontology from XML.
  - --sync: Synchronize the ontology.
  - --backup: Backup the ontology file.
  - --summary: Summarize the ontology.
  - --refresh: Refresh the ontology timestamp.
  - --analyze: Analyze ontology metrics.
  - --monitor: Monitor system metrics.
  - --rebuild: Rebuild the ontology.
  - --demo: Display demo output.
  - --fetch-schemas: Retrieve detailed OWL schemas.
  - --fetch-public: Fetch public data.
  - --update [newTitle]: Update the ontology title.
  - --clear: Clear the persisted ontology file.
  - --fetch-endpoints: Retrieve data from multiple public endpoints.
  - --enhance: Generate an enhanced ontology with additional OWL model details.
  - --wrap: Wrap basic, enhanced, and integrated ontology models.
  - --wrap-extended: Wrap extended ontology models including report, synced and rebuilt versions.
  - --report: Generate a comprehensive ontology report.
  - --list-endpoints: List an extended set of public endpoints.

## Public Data Endpoints

owl-builder fetches data from the following endpoints:

- https://api.publicapis.org/entries
- https://dog.ceo/api/breeds/image/random
- https://jsonplaceholder.typicode.com/posts
- https://api.spacexdata.com/v4/launches/latest
- https://api.coindesk.com/v1/bpi/currentprice.json *(Simulated network error in test mode)*
- **Extended Endpoints:**
  - https://api.github.com
  - https://jsonplaceholder.typicode.com/comments

## Usage

Display help instructions:

```bash
node src/lib/main.js --help
```

Example commands:

- Build Ontology:
  ```bash
  node src/lib/main.js --build
  ```
- Serve Web Interface:
  ```bash
  node src/lib/main.js --serve
  ```
- Update Ontology Title:
  ```bash
  node src/lib/main.js --update "New Title"
  ```
- Clear Persisted Ontology:
  ```bash
  node src/lib/main.js --clear
  ```
- Fetch Data from Multiple Endpoints:
  ```bash
  node src/lib/main.js --fetch-endpoints
  ```
- Generate Enhanced Ontology:
  ```bash
  node src/lib/main.js --enhance
  ```
- Wrap Ontology Models:
  ```bash
  node src/lib/main.js --wrap
  ```
- Wrap Extended Ontology Models:
  ```bash
  node src/lib/main.js --wrap-extended
  ```
- Generate Ontology Report:
  ```bash
  node src/lib/main.js --report
  ```
- List Extended Public Endpoints:
  ```bash
  node src/lib/main.js --list-endpoints
  ```

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines. Ensure that tests pass and documentation is updated to maintain clarity around functionality.

## License

Released under the MIT License.
