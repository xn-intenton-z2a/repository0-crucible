docs/EXTENSIBLE_FACES.md
# docs/EXTENSIBLE_FACES.md
# Archived Documentation

This feature is not implemented in this version and this documentation has been archived.
docs/ASCII_FACES.md
# docs/ASCII_FACES.md
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

### Listing Faces and Categories

List all faces in the current library:  
```bash
node src/lib/main.js --list-faces
```

List faces filtered by category:  
```bash
node src/lib/main.js --list-faces --category happy
```

List available categories:  
```bash
node src/lib/main.js --list-categories
```

## Color Output

Enable colored output for `--face` results using the `--color` flag. By default, faces will be printed in green if no color name is provided.

Supported colors: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`.

Examples:
```bash
# Default green color
node src/lib/main.js --face --color

# Red colored faces, count of 3
node src/lib/main.js --face 3 --color red
```
Each face is wrapped in ANSI escape sequences: `\x1b[3Xm` to start the color and `\x1b[0m` to reset.

## Valid Categories

- happy  
- sad  
- angry  
- surprise  
- playful  

Note: Categories defined in a custom faces file (`--faces-file`) are also recognized for filtering.docs/INTERACTIVE_MODE.md
# docs/INTERACTIVE_MODE.md
# INTERACTIVE_MODE

## Summary

Introduce a REPL-based interactive mode (`--interactive`) that allows users to generate ASCII faces and manage settings in a live session without restarting the CLI for each action. Session defaults for seed, category, and custom faces persist across commands.

## Commands

- `face [count] [--seed <seed>] [--category <category>]`  
  Generate one or more random faces. Uses last-set session defaults if not provided.

- `list-faces [--category <category>]`  
  List all faces in the current library, optionally filtered by category.

- `list-categories`  
  Print each valid category name on its own line.

- `category <name>`  
  Set a session-wide default category for subsequent commands.

- `seed <number>`  
  Set a session-wide default seed for subsequent commands to produce reproducible faces.

- `custom <path> [--merge]`  
  Load a JSON or YAML faces file. Use `--merge` to append to the built-in library.

- `help`  
  Display the list of supported commands.

- `exit` or `quit`  
  Leave the interactive session and exit with code 0.

**Note:** Defaults for seed, category, and custom apply automatically to subsequent commands.

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
  seed <number>
  custom <path> [--merge]
  help
  exit, quit
Note: Defaults for seed, category, and custom apply automatically to subsequent commands.
> seed 123
Default seed set to 123
> face
( ͡° ͜ʖ ͡°)
> face
( ͡° ͜ʖ ͡°)
> category sad
Default category set to sad
> face 2
( ͡ಥ ͜ʖ ͡ಥ)
( ͡ಥ ͜ʖ ͡ಥ)
> custom ./customFaces.json --merge
Custom faces merged from ./customFaces.json
> list-faces
( ͡° ͜ʖ ͡°)
... (built-in and custom faces)
> exit
Goodbye!
```docs/CUSTOM_FACES.md
# docs/CUSTOM_FACES.md
# CUSTOM_FACES

## Summary

Allow users to supply an external JSON or YAML file containing custom ASCII faces and optional category tags.

## CLI Flags

- `--faces-file <path>`: Path to a JSON or YAML file defining custom faces.
- `--merge-faces`: When used with `--faces-file`, merges custom faces with the built-in library instead of replacing it.

## File Format

The custom file must export an object with a top-level `faces` array. Each entry should be an object with:

- `face` (string, required): The ASCII art.
- `categories` (array of strings, optional): Tags for filtering, e.g., `happy`, `sad`.

Example JSON:

```json
{
  "faces": [
    { "face": "(^_^)" , "categories": ["happy", "playful"] },
    { "face": "(T_T)", "categories": ["sad"] }
  ]
}
```

Example YAML:

```yaml
faces:
  - face: "(^_^)"
    categories:
      - happy
      - playful
  - face: "(T_T)"
    categories:
      - sad
```

## CLI Usage

```bash
node src/lib/main.js --face --faces-file ./customFaces.json
node src/lib/main.js --face 5 --seed 123 --faces-file ./customFaces.yaml --merge-faces
```

## Behavior

- Without `--merge-faces`, the provided file replaces the built-in face library.
- With `--merge-faces`, custom faces are appended to the built-in library.
- Existing flags (`--face`, count, `--seed`, `--category`) apply to the resulting set.
- Custom categories defined in the file become available for use with the `--category` flag.

## Error Handling

- Invalid file path or unreadable file: descriptive error and exit with nonzero status.
- Parse errors or malformed structure: descriptive error and exit with nonzero status.
- Missing or empty `face` strings in entries: error listing offending entries.
docs/LIBRARY_API.md
# docs/LIBRARY_API.md
# Library API

The `@xn-intenton-z2a/repository0-crucible` package exposes programmatic functions for face generation and listing.

## Functions

### generateFaces(options)

Generate one or more random ASCII faces.

**Parameters:**
- `options.count` (number, default `1`): Number of faces to generate.
- `options.seed` (number): Seed for reproducible output.
- `options.category` (string): Filter faces by category.
- `options.facesFile` (string): Path to custom faces JSON/YAML file.
- `options.mergeFaces` (boolean): Append custom faces to built-in list.

**Returns:**  
`string[]` An array of generated face strings.

### listFaces(options)

List all face strings in the library, optionally filtered by category.

**Parameters:**
- `options.category` (string): Category filter.
- `options.facesFile` (string): Path to custom faces file.
- `options.mergeFaces` (boolean): Append custom faces.

**Returns:**  
`string[]` An array of face strings.

### listCategories(options)

List all unique category names available in the face library.

**Parameters:**
- `options.facesFile` (string): Path to custom faces file.
- `options.mergeFaces` (boolean): Append custom faces.

**Returns:**  
`string[]` An array of category names.

## Example

```js
import { generateFaces, listFaces, listCategories } from '@xn-intenton-z2a/repository0-crucible';

// Generate 2 random faces with a seed
const faces = generateFaces({ count: 2, seed: 123 });
console.log(faces);

// List built-in categories
const categories = listCategories();
console.log(categories);

// List all faces including custom faces merged in
const facesAll = listFaces({ facesFile: './customFaces.yaml', mergeFaces: true });
console.log(facesAll);
```

## Error Handling

Functions throw errors on invalid arguments, such as:
- Non-positive `count`
- Unknown `category`
- Invalid or unreadable custom faces file

Be sure to wrap calls in try/catch when using programmatically.
docs/DIAGNOSTICS.md
# docs/DIAGNOSTICS.md
# Archived Documentation

This feature is not implemented in this version and this documentation has been archived.
docs/EXTERNAL_API.md
# docs/EXTERNAL_API.md
# Archived Documentation

This feature is not implemented in this version and this documentation has been archived.
docs/ENV_CONFIG.md
# docs/ENV_CONFIG.md
# Archived Documentation

This feature is not implemented in this version and this documentation has been archived.
docs/HTTP_API.md
# docs/HTTP_API.md
# HTTP API

## Summary

Enable serving ASCII face functionality over HTTP, allowing integration with web services and automated clients.

## CLI Usage

Start the HTTP server on a specific port:

```bash
node src/lib/main.js --serve --port 8080
```

Or use the `PORT` environment variable:

```bash
PORT=5000 node src/lib/main.js --serve
```

## Startup Message

On successful launch, the CLI logs:
```
Listening on http://localhost:<port>
```

## Endpoints

All responses include `Content-Type: application/json` and `Access-Control-Allow-Origin: *`.

### GET /face

Query parameters:
- `count` (integer ≥1, default `1`)
- `seed` (integer ≥0)
- `category` (string)
- `facesFile` (string filepath)
- `mergeFaces` (boolean `true` or `false`)

**Success** (200):
```json
{ "faces": ["( ͡° ͜ʖ ͡°)", "(ᵔ ͜ʖᵔ)"] }
```

**Error** (400):
```json
{ "error": "<descriptive message>" }
```

### GET /list-faces

Query parameters: `category`, `facesFile`, `mergeFaces`.

**Success** (200):
```json
{ "faces": ["( ͡° ͜ʖ ͡°)", "( ಠ ͜ʖ ಠ)"] }
```

### GET /list-categories

Query parameters: `facesFile`, `mergeFaces`.

**Success** (200):
```json
{ "categories": ["happy", "angry", "sad"] }
```

### GET /diagnostics

Query parameters: `facesFile`, `mergeFaces`, `seed`.

**Success** (200): JSON object with:
- `nodeVersion`: Node.js version
- `cliVersion`: CLI version from package.json
- `builtInFacesCount`: number of built-in faces
- `categories`: sorted array of category names
- `customLoaded`: `true` if a custom file was provided
- `customFacesCount`: number of custom faces loaded
- `mergeMode`: one of `none`, `replace`, `merge`
- `seed`: provided seed or `null`
- `timestamp`: ISO timestamp

On file errors (400), the response includes an `error` field:
```json
{ "error": "Cannot read file: ..." }
```

### GET /openapi.json

Returns an OpenAPI 3.0.3 specification for the API.

**Usage Example:**
```bash
curl "http://localhost:3000/openapi.json"
```

**Success** (200): JSON object with keys:
- `openapi`: "3.0.3"
- `info`: contains `title`, `version`, `description`
- `servers`: list of server URLs
- `paths`: definitions for `/face`, `/list-faces`, `/list-categories`, `/diagnostics`, and `/openapi.json`

### All Other Routes

**404 Not Found** (404):
```json
{ "error": "Not Found" }
```
docs/TEMPLATED_OUTPUT.md
# docs/TEMPLATED_OUTPUT.md
# Archived Documentation

This feature is not implemented in this version and this documentation has been archived.
