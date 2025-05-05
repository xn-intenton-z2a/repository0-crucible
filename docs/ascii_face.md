# ASCII_FACE Feature

## Description

This CLI application outputs random facial expressions using ASCII art.
It supports three modes:

1. **Random Mode (default)**: Prints one random ASCII face.
2. **List Mode (`--list`)**: Prints all available face names in alphabetical order.
3. **Named Mode (`--name <face>` or `-n <face>`)**: Prints the specified ASCII face.

## Usage

### Random Mode

```bash
node src/lib/main.js
# or
node src/lib/main.js --face
```
Prints one random face, e.g.:
```
(◕‿◕)
```

### List Mode

```bash
node src/lib/main.js --list
```
Prints all face names:
```
frown
smile
surprised
wink
```

### Named Mode

```bash
node src/lib/main.js --name wink
# or
node src/lib/main.js -n smile
```
Prints the specified face:
```
(;^_^)
```

If an invalid name is given, prints an error and exits with code 1:
```
Error: 'foo' is not a valid face name.
```