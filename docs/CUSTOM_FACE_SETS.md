# Custom Face Sets

Allow users to load and manage custom ASCII face collections via a YAML file.

## CLI Option

--faces <path>    Path to a YAML file defining an array of faces.

Optional flags:
- --seed <number>   Use seed for deterministic selection.
- --count <n>       Number of faces to output (default 1).

## YAML Format

The file should contain a YAML array of non-empty strings:

```yaml
- ":)"
- ":D"
- "<3"
```

## Behavior

- If `--faces` is not provided, the default faces are used.
- On invalid file path or YAML syntax errors, the tool prints an error and exits with code 1.
- If the YAML file does not contain an array, or contains invalid entries (non-string or empty), a warning is logged and the default faces are used.
- Deterministic output occurs when `--seed` is provided.

## Example

```bash
node src/lib/main.js --faces custom_faces.yaml --seed 0 --count 3
# Outputs:
# :)
# :D
# <3
```
