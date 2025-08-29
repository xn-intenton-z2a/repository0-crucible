# Summary
Provide a new CLI flag --validate-source and a programmatic API validateSourceData(url) to verify live JSON data fetched from a supported URL meets expected schema rules before consumption. This ensures that data sources conform to basic structural expectations and surfaces errors early.

# Functional Requirements

- In src/lib/main.js:
  - Export an async function validateSourceData(url: string): Promise<{ valid: boolean; errors: string[] }> that:
    1. Uses fetchSource(url) to retrieve JSON data.
    2. Verifies the data is an array or object; if object, wrap in an array for consistency.
    3. Checks that each item has at least one key property (e.g., an "id" or known field); otherwise records an error message.
    4. Returns an object with valid = errors.length === 0 and errors array.
  - Extend main(args) to detect:
      --validate-source <url>
    1. Ensure <url> follows the flag and is in supportedDataSources; if missing or unsupported, print an error to stderr and exit code 1.
    2. Call validateSourceData(url).
    3. If valid, print "Source data validation passed" and exit code 0.
    4. If invalid, print JSON.stringify(errors, null, 2) to stderr and exit code 1.
    5. Preserve existing flags and behavior.

# CLI Usage

```bash
npm run start -- --validate-source https://restcountries.com/v3.1/all
```

# API

```js
import { validateSourceData } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  const result = await validateSourceData('https://restcountries.com/v3.1/all');
  if (!result.valid) console.error(result.errors);
  else console.log('Source data validation passed');
})();
```

# Testing

- **Unit tests** in tests/unit/main.test.js:
  - Stub fetchSource(url) to return sample arrays or objects:
    - Valid scenario: items have an "id" key; expect valid = true and empty errors.
    - Invalid scenario: items missing key; expect valid = false and errors list.
  - Assert fetchSource is called correctly.

- **CLI integration tests**:
  - Valid URL: spy on console.log and process.exit; run main(["--validate-source", validUrl]); assert success output and exit 0.
  - Invalid URL: missing or not supported: assert stderr error and exit 1.
  - Data schema errors: stub fetchSource returning bad items; assert errors printed and exit 1.
