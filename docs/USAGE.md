# Usage

This CLI tool outputs random ASCII art facial expressions.

## Commands

- **Show help**

  ```bash
  node src/lib/main.js --help
  # Displays usage information and flag descriptions
  ```

- **Display a random face**

  ```bash
  node src/lib/main.js --face
  # Outputs one random ASCII face, e.g. (^_^)
  ```

- **Load custom faces via config file**

  ```bash
  node src/lib/main.js --face --config path/to/faces.yaml
  # Outputs a random face selected from built-in and custom list
  ```

## Example Output

```bash
> node src/lib/main.js --face
(^_~)
```

## Via NPM script

If installed locally, you can also invoke:

```bash
npm run start
```
