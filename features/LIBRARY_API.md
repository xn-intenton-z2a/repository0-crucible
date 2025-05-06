# Summary

Allow consumers to import and use the core face generation library programmatically in Node.js applications without invoking the CLI.

# Specification

- Export functions from src/lib/main.js:
  • generateFaces(options): Takes an object with count (positive integer), seed (optional number), category (optional string), facesFile (optional string), mergeFaces (optional boolean) and returns an array of face strings.
  • listCategories(options): Takes optional options for facesFile and mergeFaces and returns an array of available category names.
  • listFaces(options): Takes optional options for category, facesFile, and mergeFaces and returns an array of face strings without random sampling.
- Functions throw descriptive errors for invalid parameters (noninteger count, invalid category, missing file path, parsing errors).
- CLI main function delegates sampling logic to generateFaces and listing logic to listCategories / listFaces.

# Testing

- Add unit tests in tests/unit/main.api.test.js importing generateFaces, listCategories, and listFaces.
- Test that generateFaces returns correct number of faces and reproducible sequences for seed.
- Test filtering by a built-in category and custom categories loaded from a temporary faces file.
- Test that listCategories returns the full set of categories based on builtInFaces and custom files.
- Test invalid count, invalid category, invalid facesFile path and parsing errors cause exceptions with descriptive messages.

# Documentation

- Update README.md to add a Library API section showing how to import functions:
    import { generateFaces, listCategories } from '@xn-intenton-z2a/repository0-crucible'
- Provide code examples for generateFaces with options and handling errors.

# Implementation Details

- Refactor core flow in src/lib/main.js to separate face loading, filtering, and sampling into standalone functions that are exported.
- Keep existing CLI behavior by having main(args) call generateFaces or listCategories accordingly and print results.
- Ensure exports use ESM syntax and are documented in code comments.
