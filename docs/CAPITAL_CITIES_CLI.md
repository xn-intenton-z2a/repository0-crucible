# Capital Cities CLI

## Overview

The `--capital-cities` flag prints a JSON representation of an OWL-like ontology for a predefined set of world capital cities, then exits.

## Usage

```bash
node src/lib/main.js --capital-cities
node src/lib/main.js --capital-cities --output ./capitals.json
```

## Sample Output

Truncated example:

```json
{
  "ontologyVersion": "1.0.0",
  "individuals": [
    {
      "type": "CapitalCity",
      "name": "Paris",
      "country": "France"
    },
    {
      "type": "CapitalCity",
      "name": "Tokyo",
      "country": "Japan"
    }
    // ... additional entries
  ]
}
```