# Usage

## ASCII_FACE Feature

The CLI tool can output a random ASCII art facial expression for emotional feedback.

### Commands

- Default (no flags):

  ```bash
  node src/lib/main.js
  # Outputs a random ASCII face, e.g. (^_^)
  ```

- Explicit: 

  ```bash
  node src/lib/main.js --ascii-face
  # Outputs a random ASCII face, e.g. (^3^)
  ```

- Script alias:

  ```bash
  npm run ascii-face
  ```

### Example Output

```bash
(^_^)
```

### Help

```bash
node src/lib/main.js --help
```