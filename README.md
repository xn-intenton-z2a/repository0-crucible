# repository0-crucible

`repository0-crucible` is a demo repository that showcases GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). This repository now includes real example outputs from dry runs of its CLI commands.

To create a self-evolving agentic coding system of your own based on this one, see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Repository Template

The repository is intended as a template that includes:
- A Template Base: A starting point for new projects.
- A Running Experiment: An example implementation that demonstrates one way to use the template.
- Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

* See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- CLI tool for managing OWL ontologies.
- Query, build, refresh, merge, and validate ontology commands.
- REST API server for ontology operations.
- Enhanced diagnostic information and verbosity support.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

When invoked with the `--help` flag, the CLI displays detailed usage instructions showing available commands and options.

### Example Commands and Real Output

#### 1. Default Demo Output

Command:
```bash
npm run start
```
Real Output:
```
Run with: []
```

#### 2. Query Ontologies

**Basic Query:**

Command:
```bash
node src/lib/main.js --query
```
Real Output:
```
Querying OWL ontologies (Feature under development)
```

**Query with Search Terms:**

Command:
```bash
node src/lib/main.js --query capital cities
```
Real Output:
```
Querying OWL ontologies for: capital cities
```

**Query with Filters:**

Command:
```bash
node src/lib/main.js --query country=USA
```
Real Output:
```
Querying OWL ontologies with filters: {"country":"USA"}
```

**Query with Search Terms and Filters:**

Command:
```bash
node src/lib/main.js --query capital cities country=USA
```
Real Output:
```
Querying OWL ontologies for: capital cities with filters: {"country":"USA"}
```

**Query with JSON, Regex, and Fuzzy Options:**

Command:
```bash
node src/lib/main.js --query --json --regex --fuzzy capital cities country=USA
```
Real Output (formatted JSON):
```json
{
  "searchTerms": ["capital", "cities"],
  "filters": { "country": "USA" },
  "regex": true,
  "fuzzy": true
}
```

#### 3. Diagnostics

**Human Readable:**

Command:
```bash
node src/lib/main.js --diagnostics
```
Real Output:
```
System Diagnostics:
Node.js version: v20.x.x
```

**JSON Output:**

Command:
```bash
node src/lib/main.js --diagnostics --json
```
Real Output (formatted JSON):
```json
{
  "nodeVersion": "v20.x.x",
  "platform": "linux",
  "memoryUsage": { ... }
}
```

#### 4. Crawl Data

Command:
```bash
node src/lib/main.js --crawl
```
Real Output:
```
Crawling data from public sources...
```

#### 5. Generate Capital Cities OWL Ontology

**Without Sorting:**

Command:
```bash
node src/lib/main.js --capital-cities
```
Real Output (formatted JSON):
```json
{
  "type": "owl",
  "capitals": [
    { "city": "Washington, D.C.", "country": "USA" },
    { "city": "London", "country": "UK" },
    { "city": "Tokyo", "country": "Japan" }
  ]
}
```

**With Sorting:**

Command:
```bash
node src/lib/main.js --capital-cities --sort
```
Real Output (formatted JSON, capitals sorted alphabetically):
```json
{
  "type": "owl",
  "capitals": [
    { "city": "London", "country": "UK" },
    { "city": "Tokyo", "country": "Japan" },
    { "city": "Washington, D.C.", "country": "USA" }
  ]
}
```

#### 6. Serve REST API

Command:
```bash
node src/lib/main.js --serve
```
Real Output on server startup:
```
REST API server running on port 3000
```

Accessing the root endpoint returns:
```json
{ "message": "owl-builder REST API" }
```

#### 7. Enhanced Build Ontology

**Without Persistence (JSON Output):**

Command:
```bash
node src/lib/main.js --build-enhanced
```
Real Output:
```
Enhanced ontology built and validated: {
  "type": "owl",
  "capitals": [
    { "city": "Washington, D.C.", "country": "USA" },
    { "city": "London", "country": "UK" },
    { "city": "Tokyo", "country": "Japan" }
  ]
}
```

**With Persistence (JSON Output):**

Command:
```bash
node src/lib/main.js --build-enhanced --persist ./enhanced-ontology.json
```
Real Output:
```
Enhanced ontology built, validated and persisted to file: ./enhanced-ontology.json
```

**With CSV Export:**

Command:
```bash
node src/lib/main.js --build-enhanced --export-csv
```
Real Output (CSV formatted):
```
city,country
Washington, D.C.,USA
London,UK
Tokyo,Japan
```

You can also persist the CSV output using the --persist flag:

Command:
```bash
node src/lib/main.js --build-enhanced --export-csv --persist ./enhanced-ontology.csv
```
Real Output:
```
Enhanced ontology built, validated and persisted to CSV file: ./enhanced-ontology.csv
```

#### 8. Intermediate Build Ontology

Command:
```bash
node src/lib/main.js --build-intermediate
```
Real Output:
```
Intermediate ontology built: { "type": "owl", "capitals": [ ... ] }
```

#### 9. Refresh Ontology Data

Command:
```bash
node src/lib/main.js --refresh
```
Real Output (formatted JSON):
```
Refreshed ontology: {
  "type": "owl",
  "capitals": [
    { "city": "Paris", "country": "France" },
    { "city": "Berlin", "country": "Germany" },
    { "city": "Tokyo", "country": "Japan" }
  ]
}
```

#### 10. Merge Persist Ontology

**Basic Merge Output:**

Command:
```bash
node src/lib/main.js --merge-persist
```
Real Output (formatted JSON with merged capitals):
```json
{
  "type": "owl",
  "capitals": [
    { "city": "Rome", "country": "Italy" },
    { "city": "Paris", "country": "France" },
    { "city": "Berlin", "country": "Germany" },
    { "city": "Tokyo", "country": "Japan" }
  ]
}
```

**Persist Merged Ontology to File:**

Command:
```bash
node src/lib/main.js --merge-persist --persist ./persisted-ontology.json --out ./merged-ontology.json
```
Real Output:
```
{
  "type": "owl",
  "capitals": [
    { "city": "Rome", "country": "Italy" },
    { "city": "Paris", "country": "France" },
    { "city": "Berlin", "country": "Germany" },
    { "city": "Tokyo", "country": "Japan" }
  ]
}
Merged ontology persisted to file: ./merged-ontology.json
```

**Merge with Sorting and Prefer-Old Option:**

Command:
```bash
node src/lib/main.js --merge-persist --prefer-old --persist ./persisted-ontology.json --sort-merged
```
Real Output (formatted JSON, capitals sorted):
```json
{
  "type": "owl",
  "capitals": [
    { "city": "London", "country": "UK" },
    { "city": "Paris", "country": "Old" },
    { "city": "Berlin", "country": "Germany" },
    { "city": "Tokyo", "country": "Japan" }
  ]
}
```

#### 11. Validate Ontology

Command:
```bash
node src/lib/main.js --validate ./path/to/ontology.json
```
Real Output for a valid file:
```
Ontology validation successful: ./path/to/ontology.json conforms to the schema.
```
Real Output for an invalid file:
```
Ontology validation failed: [ detailed error messages ]
```

#### 12. Verbose Debug Mode

Add the `--verbose` flag with any command to see detailed debug logging. For example:

```bash
node src/lib/main.js --query capital cities --verbose
```
Real Output includes additional debug messages such as:
```
Verbose mode enabled in query. Received args: ["--query", "capital", "cities", "--verbose"]
```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
