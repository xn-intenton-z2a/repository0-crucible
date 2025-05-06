# repository0-crucible

A CLI tool that outputs random ASCII facial expressions as emotional feedback.

## Features

- Generate random ASCII faces (`--face` flag)
- Specify number of faces to output (`--face <count>`)
- Reproducible sequences with `--seed <seed>`
- Filter faces by category (`--category <category>`)
- List all faces in the library (`--list-faces`)
- List available categories (`--list-categories`)
- Interactive REPL mode (`--interactive`)
- Use custom face definitions from a JSON or YAML file (`--faces-file <path>`)
- Merge custom faces with built-in library (`--merge-faces`)

## Installation

Install locally:

```bash
npm install
```

Or install globally:

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Usage

Invoke the CLI with one of the supported commands and options:

```bash
node src/lib/main.js [command] [options]
```

### Basic Face Generation

- Output one random face:
  ```bash
  node src/lib/main.js --face
  ```
- Output three random faces:
  ```bash
  node src/lib/main.js --face 3
  ```
- Reproducible output with a seed:
  ```bash
  node src/lib/main.js --face --seed 123
  ```
- Filter faces by category:
  ```bash
  node src/lib/main.js --face --category playful
  ```
- Combine count, category, and seed:
  ```bash
  node src/lib/main.js --face 2 --category playful --seed 42
  ```

### Listing Faces and Categories

- List all faces in the current library:
  ```bash
  node src/lib/main.js --list-faces
  ```
- List faces filtered by category:
  ```bash
  node src/lib/main.js --list-faces --category happy
  ```
- List available categories:
  ```bash
  node src/lib/main.js --list-categories
  ```

### Interactive Mode

Start an interactive REPL session to explore available commands without restarting the CLI:

```bash
node src/lib/main.js --interactive
```

Inside the REPL, you can run commands such as:

- `face [count] [--seed <seed>] [--category <category>]`
- `list-faces [--category <category>]`
- `list-categories`
- `category <name>`
- `custom <path> [--merge]`
- `help`
- `exit` or `quit`

### Custom Faces

Load custom face definitions from a file or merge them with built-in faces:

```bash
node src/lib/main.js --face --faces-file ./customFaces.json
node src/lib/main.js --face --faces-file ./customFaces.yaml --merge-faces
```

## Repository Template

This repository was initially generated as a template to demonstrate CI/CD workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib).

## Contributing

We welcome contributions! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License. See [LICENSE](./LICENSE) for details.
