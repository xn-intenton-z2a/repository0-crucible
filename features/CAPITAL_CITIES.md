# Summary
Add a new CLI flag `--capital-cities` and programmatic API `getCapitalCities()` to fetch and output an OWL JSON ontology containing only capital city individuals from the Rest Countries data source. This provides an example CLI variation that combines data fetching and ontology transformation.

# Functional Requirements

In `src/lib/main.js`:

- Export an async function `getCapitalCities(): Promise<any[]>` that:
  - Calls `fetchSource()` with the Rest Countries URL (`https://restcountries.com/v3.1/all`).
  - Maps the returned JSON array to a list of objects where each object has:
    - `id`: the country `cca3` code or other unique identifier.
    - `capital`: the first element of the `capital` array.
  - Returns the mapped array.

- Extend the `main(args)` entrypoint to detect the `--capital-cities` flag:
  - If present:
    1. Call `getCapitalCities()` and await its result.
    2. Pass the result array to `transformToOwl()` to produce an OWL JSON structure.
    3. Print `JSON.stringify(ontology, null, 2)` to stdout.
    4. Exit the process with code `0`.
  - Ensure existing flags (`--list-sources`, `--fetch-source`, `--transform-to-owl`) and default behavior remain unchanged.

# API

- `getCapitalCities(): Promise<any[]>` — Fetches raw country data, maps to `{ id, capital }` objects.
- Reuses `fetchSource(url)`, `transformToOwl(data)`, and `getSupportedDataSources()` exports.

# CLI Usage

```bash
npm run start -- --capital-cities
```

# Testing

In `tests/unit/main.test.js`:

- Unit tests for `getCapitalCities()`:
  - Stub `fetchSource` to return sample country data with known `cca3` codes and `capital` arrays.
  - Assert that calling `getCapitalCities()` resolves to the array of `{ id, capital }` objects in the correct order.

- CLI integration test for `--capital-cities`:
  - Stub `fetchSource` to return sample data.
  - Spy on `console.log` and `process.exit`.
  - Call `await main(["--capital-cities"])`.
  - Assert that `console.log` is called with the OWL JSON produced by `transformToOwl(sample)`, and `process.exit` is called with `0`.

# Documentation

- Update `README.md`:
  - Under **Features**, add a **Capital Cities** section describing the `--capital-cities` flag and `getCapitalCities()` API.
  - Under **Usage**, include example invocation and sample OWL JSON output.

- Create `docs/CAPITAL_CITIES.md` with the same details and examples.
