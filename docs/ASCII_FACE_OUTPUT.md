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

node src/lib/main.js --help
# Displays usage instructions and exits.

node src/lib/main.js --version
# Prints the current version and exits.

node src/lib/main.js -v
# Prints the current version and exits.
```