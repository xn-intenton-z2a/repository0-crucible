# ASCII_FACES

## Summary

This feature enables the CLI application to output random ASCII facial expressions as emotional feedback for an AI.

## Specification

The CLI supports a `--face` flag that prints random ASCII faces. An optional numeric argument defines how many unique faces to output, and a `--seed` flag allows for reproducible sequences.

## CLI Usage

node src/lib/main.js --face
node src/lib/main.js --face 3
node src/lib/main.js --face --seed 12345
