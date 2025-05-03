# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic-lib](nhttps://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see https://github.com/xn-intenton-z2a/agentic-lib

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds](./seeds).

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- Plain-text random emoticon output (default)
- `--list` to enumerate all emoticons
- `--seed <n>` for deterministic selection
- `--json` to emit JSON output
- `--interactive, -i` to start the interactive REPL session

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

Start interactive REPL session:

```bash
node src/lib/main.js --interactive
# or
node src/lib/main.js -i
```

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

### HTTP Server

- **Start server on default port:**
  ```bash
  npm run serve
  # Listening on port 3000
  ```

- **Start server on a specific port:**
  ```bash
  npm run serve -- --port 4000
  # Listening on port 4000
  ```

- **Fetch version endpoint:**
  ```bash
  curl http://localhost:3000/version
  # { "version": "<current version>" }
  ```

- **Fetch Prometheus metrics:**
  ```bash
  curl http://localhost:3000/metrics
  ```