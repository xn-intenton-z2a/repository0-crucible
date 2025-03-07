# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. This version focuses exclusively on public API data.

## Change Log

- **Version 0.0.16**
  - Refocused on public data source integration; legacy endpoints removed.
  - Extended ontology processing functions and wrapper commands added:
    - New functions: `buildOntology`, `buildDetailedOntology`, `serveWebInterface`, `diagnostics`, `integrateOntology`, `crawlData`, `persistOntology`, `loadOntology`, `queryOntology`, `validateOntology`, `exportOntologyToXML`, `importOntologyFromXML`, `syncOntology`, `backupOntology`, `updateOntology`, `clearOntology`, `enhanceOntology`, `wrapOntologyModels`, `wrapOntologyModelsExtended`, `generateOntologyReport`, `listAvailableEndpoints`, `fetchFromExtendedEndpoints`, `advancedOntologyAnalysis`, `wrapAllOntologyModels`, `cleanupOntologyData`, `automatedCommitMessage`, `fetchDataWithRetry`, `getChangeLog`, `extendOntologyDetails`, `wrapOntologyModelsSimple`, `wrapOntologyModelsComprehensive`, `wrapOntologyModelsRandom`, `updateOntologyTracking`, `wrapAdvancedOntologyModels`, `wrapMergedOntologyModels`, as well as extended new functions: `extendOntologyConcepts`, `resetOntology`, `cloneOntology`, `transformOntologyData`, `debugOntologyMetrics`, `reflectOntologyStatus`, `updateOntologyDescription`, `mergeOntologyModels`.
    - **Wrapper Enhancements:** Added new wrappers `wrapOntologyModelsJSON` and `wrapOntologyModelsCustom` with corresponding CLI commands `--wrap-json` and `--wrap-custom`.
  - **Bug Fix:** Fixed the `--list` command by moving the command actions to a global scope, ensuring that `listCommands()` functions correctly.

## Public Data Endpoints

owl-builder retrieves data from several public data sources, including:

- https://api.publicapis.org/entries
- https://dog.ceo/api/breeds/image/random
- https://jsonplaceholder.typicode.com/posts
- https://api.coindesk.com/v1/bpi/currentprice.json (Simulated error in test mode)

**Extended Endpoints:**
- https://api.github.com
- https://jsonplaceholder.typicode.com/comments
- https://dummyjson.com/products
- https://randomuser.me/api/
- https://catfact.ninja/fact
- https://jsonplaceholder.typicode.com/todos

## Usage

Display help instructions:

```bash
node src/lib/main.js --help
```

Example commands:

- **Build Ontology:**
  ```bash
  node src/lib/main.js --build
  ```

- **Build Detailed Ontology:**
  ```bash
  node src/lib/main.js --detailed-build
  ```

- **Serve Web Interface:**
  ```bash
  node src/lib/main.js --serve
  ```

- **Update Ontology Title:**
  ```bash
  node src/lib/main.js --update "New Title"
  ```

- **Clear Persisted Ontology:**
  ```bash
  node src/lib/main.js --clear
  ```

- **Fetch Data from Multiple Endpoints:**
  ```bash
  node src/lib/main.js --list-endpoints
  ```

- **Fetch Data from Extended Endpoints:**
  ```bash
  node src/lib/main.js --fetch-extended
  ```

- **Generate Enhanced Ontology:**
  ```bash
  node src/lib/main.js --enhance
  ```

- **Wrap Ontology Models:**
  ```bash
  node src/lib/main.js --wrap
  ```

- **Additional Wrapper Commands:**
  - **JSON Wrapper:**
    ```bash
    node src/lib/main.js --wrap-json
    ```
  - **Custom Wrapper:**
    ```bash
    node src/lib/main.js --wrap-custom desc
    ```

- **Other Commands:**
  - `--auto-commit`, `--combine-models`, `--refresh-details`, `--extend-concepts`, `--fetch-retry`, `--changelog`, `--extend-details`, `--wrap-simple`, `--wrap-comprehensive`, `--wrap-random`, `--clean-transform`, `--fetch-additional`, `--combine-metrics`, `--update-tracking`, `--wrap-advanced`, `--wrap-merged`

## Testing

Tests use dummy data responses to avoid external network dependencies. Run tests with:

```bash
npm test
```

## Contributing

Contributions are welcome. Please refer to CONTRIBUTING.md for guidelines, ensure complete test coverage and follow our coding standards.

## License

Released under the MIT License.
