# NAMED_FACE

## Description
Add Named Mode to the CLI, allowing users to specify an ASCII face by name. Users can invoke the tool with --name or -n followed by a face identifier to print that exact face.

## CLI Options

--name <face> or -n <face>    Print the specified ASCII face by its name (case-insensitive).

## Implementation Details

1. In src/lib/main.js, define a constant mapping FACE_MAP where keys are lowercase names (e.g. "smile", "frown", "surprised", "wink") and values are the corresponding entries from ASCII_FACES.
2. Extend argument parsing in main():
   - If args[0] is --name or -n, ensure args[1] exists and is a string.
   - Convert args[1] to lowercase and look up in FACE_MAP.
   - If found, return the mapped face. If not found, throw Error: `Error: '<name>' is not a valid face name.`
   - Ensure no extra arguments follow; throw unknown flag error if present.
3. Keep existing random, list, and seed modes intact and unaltered.

## Testing

1. Add unit tests in tests/unit/main.test.js:
   - Valid named mode: main(["--name","smile"]) returns the correct face.
   - Alias -n: main(["-n","wink"]) returns correct face.
   - Invalid name: main(["--name","foo"]) throws `Error: 'foo' is not a valid face name.`
   - Missing name: main(["--name"]) throws `Error: '<flag>' requires a face name.`
2. Mock console.log for CLI invocation and assert exit codes and messages.

## Documentation

1. Update docs/ascii_face.md: add a section for Named Mode under Usage and CLI Options.
2. Update README.md under Features and Usage to describe Named Mode and examples.
