# CLI Usage

This tool supports the following command-line options:

## --trace-seeds

Print a report of all JavaScript seed files in the `seeds/` directory to the console. This helps with provenance and confirms which seed artifacts were applied to bootstrap or drive code generation.

### Usage

```bash
node src/lib/main.js --trace-seeds
```

### Example Output

```
Seed files traceability report:
zero-main.js
zero-tests.js
zero-package.json
```
