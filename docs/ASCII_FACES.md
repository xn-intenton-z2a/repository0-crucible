# ASCII_FACES

## Summary

This feature enables the CLI application to output random ASCII facial expressions as emotional feedback for an AI.

## Specification

The CLI supports a `--face` flag that prints random ASCII faces. An optional numeric argument defines how many unique faces to output, and a `--seed` flag allows for reproducible sequences.

The CLI also supports a `--category <string>` flag to filter faces by emotion category. Valid categories include `happy`, `sad`, `angry`, `surprise`, and `playful`. If an invalid category is specified, the CLI will display an error and exit with a nonzero status.

## CLI Usage

node src/lib/main.js --face  
node src/lib/main.js --face 3  
node src/lib/main.js --face --seed 12345  
node src/lib/main.js --face --category happy  
node src/lib/main.js --face 2 --category playful --seed 42  

## Valid Categories

- happy  
- sad  
- angry  
- surprise  
- playful  
