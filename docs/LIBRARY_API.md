# Library API

## Summary

This library exports three pure functions for programmatic use without side effects:

- **generateFaces(options)**: Returns an array of randomly selected face strings.
- **listFaces(options)**: Returns an array of all face strings in the current library, optionally filtered by category.
- **listCategories(options)**: Returns an array of all unique category names.

## Functions

### listCategories(options)

Parameters:
- `facesFile` (string, optional): Path to a custom faces JSON/YAML file.
- `mergeFaces` (boolean, optional): Whether to merge custom faces with built-in faces.

Returns:
- `string[]`: List of unique category names.

### listFaces(options)

Parameters:
- `category` (string, optional): Filter faces by this category.
- `facesFile` (string, optional): Path to a custom faces JSON/YAML file.
- `mergeFaces` (boolean, optional): Whether to merge custom faces with built-in faces.

Returns:
- `string[]`: List of face strings matching the criteria.

Throws:
- Error if the category is invalid or if file loading/parsing fails.

### generateFaces(options)

Parameters:
- `count` (number, optional, default=1): Number of faces to generate.
- `seed` (number, optional): Seed for reproducible random selection.
- `category` (string, optional): Filter faces by this category.
- `facesFile` (string, optional): Path to a custom faces JSON/YAML file.
- `mergeFaces` (boolean, optional): Whether to merge custom faces with built-in faces.

Returns:
- `string[]`: Array of randomly selected face strings.

Throws:
- Error if count is not a positive integer, if seed is invalid, or if the requested count exceeds available faces.

## Usage Example

```js
import {
  generateFaces,
  listFaces,
  listCategories
} from '@xn-intenton-z2a/repository0-crucible/src/lib/main.js';

// List categories
const categories = listCategories();
console.log(categories);

// List all built-in faces
const faces = listFaces();
console.log(faces);

// Generate 3 random faces with a seed
const randomFaces = generateFaces({ count: 3, seed: 123 });
console.log(randomFaces);

// Use custom face definitions
const customFaces = listFaces({ facesFile: './customFaces.json' });
console.log(customFaces);
```
