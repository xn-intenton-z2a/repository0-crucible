# Summary
Add a new CLI flag --capital-cities and programmatic API getCapitalCities() to produce an OWL JSON ontology of capital cities from the Rest Countries data source.

# Functional Requirements

In src/lib/main.js:

1. Export an async function getCapitalCities(): Promise<any[]>:
   - Call fetchSource() with the Rest Countries URL from getSupportedDataSources().
   - Map each country entry to an object `{ id: country.cca3, capital: country.capital?.[0] || null }`.
   - Return the array of mapped objects.

2. Extend the `main(args)` entrypoint to detect the flag `--capital-cities`:
   - When present:
     1. Call `await getCapitalCities()`.
     2. Pass the resulting array to `transformToOwl()` to generate an OWL JSON ontology.
     3. Print `JSON.stringify(ontology, null, 2)` to stdout.
     4. Exit with code 0.
   - On any error, print the error message to stderr and exit with code 1.
   - Preserve existing flags (`--list-sources`, `--fetch-source`, `--transform-to-owl`, `--build-ontologies`, etc.) and default behavior.

# API

- `getCapitalCities(): Promise<{ id: string; capital: string|null }[]>` — retrieves and maps capital data.
- Reuses `fetchSource(url)`, `getSupportedDataSources()`, and `transformToOwl(data)` exports.

# CLI Usage

```bash
npm run start -- --capital-cities
```

# Testing

In tests/unit/main.test.js:

- Unit tests for getCapitalCities(): stub fetchSource to return sample country data; assert the returned array matches the mapped id–capital objects.
- CLI integration test for `--capital-cities`:
  - Stub getCapitalCities() to return sample mappings.
  - Spy on `transformToOwl()`, `console.log`, and `process.exit`.
  - Invoke `await main(["--capital-cities"])`; assert `transformToOwl` was called and `console.log` printed the OWL JSON; verify exit code 0.

# Documentation

- Update README.md:
  - Add **Capital Cities** under **Features** with a brief description.
  - Under **Usage**, include example invocation and sample OWL JSON output.
- Create docs/CAPITAL_CITIES.md mirroring the feature details and examples.
