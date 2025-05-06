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
