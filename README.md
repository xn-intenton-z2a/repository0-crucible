# repository0-crucible

CLI tool that outputs random ASCII/emoticon faces as emotional feedback.

## Installation

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Features

- Outputs random ASCII face expressions for emotional feedback.
- Configurable flags for count, category, and reproducible output via seed.

## Flags and Defaults

- `--count`, `-c` (integer ≥1, default: `1`): number of faces to display.
- `--category`, `-C` (`happy`, `sad`, `angry`, `surprised`, `all`; default: `all`): emotion category.
- `--seed`, `-s` (nonnegative integer): seed for reproducible output.
- `--help`, `-h`: display usage information.

## Available Categories

happy, sad, angry, surprised, all

## Examples

1. Display a single random face (default):

   ```bash
   node src/lib/main.js
   # e.g. 😊
   ```

2. Display three happy faces:

   ```bash
   node src/lib/main.js --count 3 --category happy
   # e.g. 😄 😊 😀
   ```

3. Display two faces reproducibly with a seed:

   ```bash
   node src/lib/main.js -c 2 -s 42
   # e.g. 😢 😮  (will be the same each run)
   ```

4. Show help:

   ```bash
   node src/lib/main.js --help
   ```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

Released under the MIT License.
