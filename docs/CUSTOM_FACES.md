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

## Error Handling

- Invalid file path or unreadable file: descriptive error and exit with nonzero status.
- Parse errors or malformed structure: descriptive error and exit with nonzero status.
- Missing or empty `face` strings in entries: error listing offending entries.
