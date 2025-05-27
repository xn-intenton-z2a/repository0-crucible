# List Sources

The `--list-sources` flag outputs a JSON array of supported public data source URLs.

## Usage

```bash
npm run start -- --list-sources
```

## Sample Output

```json
[
  "https://api.worldbank.org/v2/country",
  "https://restcountries.com/v3.1/all"
]
```

## API

Programmatic access to the list of supported sources:

```js
import { getSupportedDataSources } from '@xn-intenton-z2a/repository0-crucible';

const sources = getSupportedDataSources();
console.log(sources);
```
