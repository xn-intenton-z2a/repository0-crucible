# Fetch Source

## Summary

Provide a programmatic API `fetchSource(url: string): Promise<any>` and a CLI flag `--fetch-source <url>` to retrieve JSON data from supported public data sources.

## API

### fetchSource(url: string): Promise<any>

Fetches JSON data from a supported URL:

- Resolves with parsed JSON data when the URL is supported.
- Rejects with `Error("Unsupported data source: " + url)` when the URL is unsupported.

### getSupportedDataSources(): string[]

Returns the list of supported data source URLs.

## CLI Usage

```bash
npm run start -- --fetch-source <url>
```

- **Valid URL**:

```bash
npm run start -- --fetch-source https://restcountries.com/v3.1/all
# Sample output: JSON data
```

- **Missing URL**:

```bash
npm run start -- --fetch-source
# Error: URL is required for --fetch-source
```

- **Unsupported URL**:

```bash
npm run start -- --fetch-source invalid/url
# Error: Unsupported data source: invalid/url
```

## Supported URLs

```js
import { getSupportedDataSources } from "@xn-intenton-z2a/repository0-crucible";
console.log(getSupportedDataSources());
```