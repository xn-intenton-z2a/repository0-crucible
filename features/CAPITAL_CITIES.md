# Summary
Add a new CLI flag --capital-cities and programmatic API getCapitalCities() to fetch country data and output an OWL JSON ontology containing only capital city individuals from the Rest Countries data source.

# Functional Requirements
- In src/lib/main.js:
  - Export an async function getCapitalCities(): Promise<any[]> that:
    1. Calls fetchSource() with the REST Countries URL from supportedDataSources.
    2. Maps each country object to { id: country.cca3, capital: country.capital?.[0] || null }.
    3. Returns the mapped array.
  - Extend main(args) to detect the flag --capital-cities:
    1. When provided, await getCapitalCities().
    2. Call transformToOwl() on the returned array to produce OWL JSON.
    3. Print JSON.stringify(ontology, null, 2) to stdout.
    4. Exit process with code 0.
    5. On errors, print error to stderr and exit with code 1.
  - Ensure existing flags (--list-sources, --fetch-source, --transform-to-owl, --query-owl, --serve) remain unchanged.

# API
- getCapitalCities(): Promise<{ id: string; capital: string | null }[]> — Fetches raw country data and returns an array of id–capital objects.
- Reuses fetchSource(url) and transformToOwl(data) functions already exported.

# CLI Usage
```bash
npm run start -- --capital-cities
```

Example output (OWL JSON):
```json
{
  "@context": { "@vocab": "http://example.org/ontology#" },
  "@graph": [
    { "@id": "http://example.org/ontology#USA", "capital": "Washington, D.C." },
    { "@id": "http://example.org/ontology#CAN", "capital": "Ottawa" },
    ...
  ]
}
```

# Testing
- In tests/unit/main.test.js:
  - Unit tests for getCapitalCities():
    1. Stub fetchSource() to return a sample array of country objects with cca3 and capital fields.
    2. Assert getCapitalCities() resolves to the correct array of { id, capital }.
  - CLI integration test for --capital-cities:
    1. Stub getCapitalCities() to return sample id–capital objects.
    2. Spy on transformToOwl(), console.log, and process.exit.
    3. Invoke await main(["--capital-cities"]).
    4. Assert transformToOwl() was called with the sample array, console.log printed the OWL JSON, and process.exit(0) was called.

# Documentation
- Update README.md:
  - Under **Features**, add **Capital Cities** description and CLI flag.
  - Under **Usage**, include an example invocation and brief sample output.
- Create docs/CAPITAL_CITIES.md with full examples, API reference, and sample OWL JSON output.
