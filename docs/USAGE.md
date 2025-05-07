# Usage

## ASCII_FACE Feature

The CLI tool can output a random ASCII art facial expression for emotional feedback.

### Commands

- Built-in faces:

  ```bash
  node src/lib/main.js --face
  # Outputs a random ASCII face, e.g. (^_^)
  ```

- Custom faces via config file:

  ```bash
  node src/lib/main.js --face --config path/to/faces.yaml
  # Outputs a random face from built-in and custom list
  ```

- Help:

  ```bash
  node src/lib/main.js --help
  ```

### Example Output

```bash
(T_T)
```

### Script Aliases

- Via npm scripts:

  ```bash
  npm run ascii-face
  ```
