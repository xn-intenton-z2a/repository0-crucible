# Features

- Random ASCII face generation (`--face`)
- Batch output (`--count`, `-c`)
- Custom faces configuration (`--config <path>`)
- Theme selection (`--theme`, `-t`)

# Usage

Use the CLI commands to generate ASCII faces:

```bash
# Single random face
device/node src/lib/main.js --face

# Batch output of 3 faces
node src/lib/main.js --face --count 3

# Custom faces from a YAML/JSON config file
node src/lib/main.js --face --config faces.yaml

# Shortcut via npm script
npm run ascii-face
```

## Additional Options

### Help

Show help instructions:

```bash
node src/lib/main.js --help
```

### Theme Selection with `--theme` / `-t`

Select faces from a predefined theme (`happy`, `sad`, `surprised`):

```bash
node src/lib/main.js --face --theme happy
node src/lib/main.js --face -t surprised -c 2
```

### Batch Generation with `--count` / `-c`

Generate multiple faces in one invocation:

```bash
node src/lib/main.js --face --count 5
node src/lib/main.js --face -c 4
```

### Custom Faces with `--config`

Load additional faces from a YAML or JSON file:

```bash
node src/lib/main.js --face --config path/to/faces.yaml
```