# repository0-crucible

A CLI tool that outputs random ASCII facial expressions as emotional feedback.

## Features

- Generate random ASCII faces (`--face` flag)
- Specify number of faces to output (`--face <count>`)
- Reproducible sequences with `--seed <seed>`
- Filter faces by category (`--category <category>`)
- Supported categories: `happy`, `sad`, `angry`, `surprise`, `playful`
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

```bash
node src/lib/main.js --face [<count>] [--seed <seed>] [--category <category>] [--faces-file <path>] [--merge-faces]
```

### Examples

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
  node src/lib/main.js --face 5 --seed 123
  ```

- Filter faces by category:
  ```bash
  node src/lib/main.js --face --category playful
  ```

- Use custom faces file:
  ```bash
  node src/lib/main.js --face --faces-file ./customFaces.json
  ```

- Merge custom faces with built-in library:
  ```bash
  node src/lib/main.js --face 5 --faces-file ./customFaces.yaml --merge-faces
  ```

## Repository Template

This repository was initially generated as a template to demonstrate CI/CD workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib).

## Contributing

We welcome contributions! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License. See [LICENSE](./LICENSE) for details.
