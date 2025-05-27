# Summary
Add a new CLI flag --capital-cities and programmatic API getCapitalCities() to fetch country data and output an OWL JSON ontology containing only capital city individuals from the Rest Countries data source.

# Functional Requirements

- In src/lib/main.js:
  - Export an async function getCapitalCities(): Promise<any[]> that:
    1. Calls fetchSource() with the Rest Countries URL from supportedDataSources.
    2. Maps each returned country object to an object of the form { id: country.cca3, capital: country.capital?.[0] || null }.
    3. Returns the mapped array.
  - Extend the main(args) entrypoint to detect the --capital-cities flag:
    1. When provided, call await getCapitalCities().
    2. Pass the result array to transformToOwl() to produce an OWL JSON ontology.
    3. Print JSON.stringify(ontology, null, 2) to stdout.
    4. Exit with code 0; on errors, print to stderr and exit code 1.
  - Ensure existing flags (--list-sources, --fetch-source, --transform-to-owl, --query-owl) remain unchanged.

# API

- getCapitalCities(): Promise<{ id: string; capital: string | null }[]> — Fetch country data and return id–capital mappings.
- Reuses fetchSource(url) and transformToOwl(data) from main.js.

# CLI Usage

```bash
npm run start -- --capital-cities
```

# Testing

- In tests/unit/main.test.js:
  - Unit tests for getCapitalCities(): stub fetchSource() to return sample country objects; assert the mapped id–capital array.
  - CLI integration test for --capital-cities: stub getCapitalCities() and transformToOwl(); spy on console.log and process.exit; call await main(["--capital-cities"]); assert printed OWL JSON and exit code 0.

# Documentation

- Update README.md: under **Features** add **Capital Cities** and example.
- Create docs/CAPITAL_CITIES.md with full details, API reference, CLI example, and sample output.