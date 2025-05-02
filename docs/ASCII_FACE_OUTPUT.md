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
```