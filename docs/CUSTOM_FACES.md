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
    { "face": "( ^_^ )", "categories": ["happy", "playful"] },
    { "face": "( T_T )", "categories": ["sad"] }
  ]
}
```

## Behavior

- Without `--merge-faces`, the provided file replaces the built-in faces.  
- With `--merge-faces`, custom faces are appended to the built-in library.  
- Existing flags (`--face`, count, `--seed`, `--category`) apply to the resulting set.

## Errors

- Invalid file path or unreadable file.  
- Parse errors or malformed structure.  
- Descriptive error messages are printed, and the CLI exits with a nonzero status.
