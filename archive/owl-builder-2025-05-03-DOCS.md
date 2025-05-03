docs/CUSTOM_FACE_SETS.md
# docs/CUSTOM_FACE_SETS.md
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
docs/ASCII_FACE_OUTPUT.md
# docs/ASCII_FACE_OUTPUT.md
# ASCII Face Output

## Summary

A CLI tool to output random ASCII facial expressions with various options.

## Usage

```bash
node src/lib/main.js [options]
```

## Options

- -h, --help  
  Show this help message and exit.

- -v, --version  
  Print the current version and exit.

- --faces <path>  
  Path to a YAML file defining custom faces.

- --seed <number>  
  Seed for deterministic face selection.

- --count <n>  
  Number of faces to output (default 1).

## Examples

```bash
node src/lib/main.js
# Outputs a random face.

node src/lib/main.js --faces custom_faces.yaml --count 3
# Outputs three faces from the custom set.

node src/lib/main.js --seed 10 --count 2
# Outputs two faces deterministically based on the seed.

node src/lib/main.js --help
# Displays usage instructions and exits.

node src/lib/main.js --version
# Prints the current version and exits.

node src/lib/main.js -v
# Prints the current version and exits.
```