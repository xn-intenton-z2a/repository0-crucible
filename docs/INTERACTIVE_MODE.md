# INTERACTIVE_MODE

## Summary

Introduce a REPL-based interactive mode (`--interactive`) that allows users to generate ASCII faces and manage settings in a live session without restarting the CLI for each action.

## Commands

- `face [count] [--seed <seed>] [--category <category>]`  
  Generate one or more random faces. Uses last-set session defaults if not provided.

- `list-faces [--category <category>]`  
  List all faces in the current library, optionally filtered by category.

- `list-categories`  
  Print each valid category name on its own line.

- `category <name>`  
  Set a session-wide default category for subsequent commands.

- `custom <path> [--merge]`  
  Load a JSON or YAML faces file. Use `--merge` to append to the built-in library.

- `help`  
  Display the list of supported commands.

- `exit` or `quit`  
  Leave the interactive session and exit with code 0.

## Usage

```bash
node src/lib/main.js --interactive
```

Example session:

```text
$ node src/lib/main.js --interactive
Available commands:
  face [count] [--seed <seed>] [--category <category>]
  list-faces [--category <category>]
  list-categories
  category <name>
  custom <path> [--merge]
  help
  exit, quit
> face
( ͡° ͜ʖ ͡°)
> category sad
Default category set to sad
> face 2
( ͡ಥ ͜ʖ ͡ಥ)
( ͡ಥ ͜ʖ ͡ಥ)
> list-categories
happy
angry
playful
surprise
sad
> list-faces
( ͡ಥ ͜ʖ ͡ಥ)
> exit
Goodbye!
```
