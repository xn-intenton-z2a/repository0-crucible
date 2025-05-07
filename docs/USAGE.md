# Usage

## ASCII_FACE Feature

The CLI tool can output random ASCII art facial expressions for emotional feedback.

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

### Batch Generation with `--count` / `-c`

Generate multiple faces in one invocation by specifying a positive integer count.

```bash
node src/lib/main.js --face --count 3
# Outputs three random ASCII faces, one per line, e.g.:  
(^_^)  
(T_T)  
(*_*)

# Alias using -c:
node src/lib/main.js --face -c 5
# Outputs five random ASCII faces, one per line
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
