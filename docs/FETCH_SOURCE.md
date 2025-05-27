# Fetch Source

The `--fetch-source <url>` flag fetches and outputs JSON data from a supported public data source URL.

## Usage

```bash
npm run start -- --fetch-source <url>
```

## Example

```bash
npm run start -- --fetch-source https://restcountries.com/v3.1/all
```

## Sample Output

```json
[
  { "foo": "bar" }
]
```

## API

```js
import { fetchSource } from '@xn-intenton-z2a/repository0-crucible';

(async () => {
  try {
    const data = await fetchSource('https://restcountries.com/v3.1/all');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
})();
```