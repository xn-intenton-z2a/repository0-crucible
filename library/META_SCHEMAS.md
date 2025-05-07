# META_SCHEMAS

## Crawl Summary
The JSON Schema specification version 2020-12 is split into Core and Validation, published as a single meta-schema at https://json-schema.org/draft/2020-12/schema. A Hyper-Schema meta-schema (with link keywords) is at /hyper-schema. Recommended-output schema and eight single-vocabulary schemas (core, applicator, validation, unevaluated, format-annotation, format-assertion, content, meta-data) live under /meta/. Relative JSON Pointers spec is available but not required by Core/Validation. Migration mappings for older drafts are documented.

## Normalised Extract
Table of Contents:
 1. Meta-Schema URIs
 2. Single-Vocabulary Files
 3. Relative JSON Pointer
 4. Migration Paths

1. Meta-Schema URIs
 - Core/Validation: https://json-schema.org/draft/2020-12/schema
 - Hyper-Schema: https://json-schema.org/draft/2020-12/hyper-schema
 - Recommended Output: https://json-schema.org/draft/2020-12/meta/recommended-output

2. Single-Vocabulary Files
 All under https://json-schema.org/draft/2020-12/meta/: core.json, applicator.json, validation.json, unevaluated.json, format-annotation.json, format-assertion.json, content.json, meta-data.json

3. Relative JSON Pointer
 - URI: https://json-schema.org/draft/2020-12/relative-json-pointer
 - Adds token syntax: '#', '[<n>]', '/path'.

4. Migration Paths
 - 2019-09 → 2020-12: change identifier scheme, add unevaluated and content vocabularies.
 - 07 → 2019-09: add dynamic refs.
 - 06 → 07: add format-assertion.
 - 04 → 06: remove id in favor of $id.

## Supplementary Details
Usage of $schema:
 - In your JSON Schema document, set "$schema": "https://json-schema.org/draft/2020-12/schema" at the root.

Validator CLI Example (ajv):
 ajv compile-schema --strict=true --schemaId=auto --meta=2020-12 schema.json

Node.js: ajv@8
 const Ajv = require('ajv');
 const ajv = new Ajv({strict: true});
 ajv.addMetaSchema(require('./draft2020-12/schema.json'));
 const validate = ajv.compile(yourSchema);

Relative JSON Pointer Usage:
 { "$ref": "#1/definitions/foo" } // one level up, then path /definitions/foo

Handling Single-Vocabulary Schemas:
 ajv.addMetaSchema(require('./meta/validation.json'), 'https://json-schema.org/draft/2020-12/meta/validation')

## Reference Details
1. $schema Declaration:
   - Type: string (URI)
   - Example: "$schema": "https://json-schema.org/draft/2020-12/schema"

2. Ajv API Signatures (v8):
   constructor(options: { strict:boolean; schemaId?: 'auto'|'$id'|'id'; } ) → Ajv
   addMetaSchema(schema: object, key?: string) → void
   compile(schema: object) → ValidateFunction
   validate(schemaKey: string|object, data: any) → boolean

3. CLI Options:
   --strict boolean       default: false  enforce strict mode
   --schemaId string      default: auto   accept $id or id
   --meta version         e.g. 2019-09, 2020-12 loads built-in meta

4. Best Practice:
   Always include "$schema" at top of each schema file.
   Use separate files per vocabulary when building custom meta-schemas.

5. Troubleshooting:
   Command: ajv compile-schema --schemaId=auto bad-schema.json
   Expected: validation error with keyword and path
   If no error: check that "$schema" URI matches loaded meta-schema.

6. File Names and Locations:
   - Save core meta-schema as draft2020-12-schema.json
   - Save vocabularies under meta/ folder matching URI path

7. Migration Script:
   npx json-schema-draft-migrator --from=2019-09 --to=2020-12 path/to/schemas

8. Validator Behavior:
   - $id overrides resolution scope
   - Unevaluated vocabulary applies after validation keywords

9. Environment:
   Node.js >=12, ajv >=8

## Information Dense Extract
2020-12 Core/Validation meta-schema URI=https://json-schema.org/draft/2020-12/schema Hyper-Schema URI=/hyper-schema Recommended-Output URI=/meta/recommended-output Single-vocab URIs=/meta/{core,applicator,validation,unevaluated,format-annotation,format-assertion,content,meta-data}.json Relative JSON Pointer URI=/relative-json-pointer Use "$schema":<URI> root-level. Ajv v8: new Ajv({strict:true,schemaId:'auto'}); addMetaSchema(schema,key?); compile()/validate(). CLI: --strict, --schemaId, --meta. Migration 2019-09→2020-12 adds unevaluated,content; 07→09 adds dynamicRefs; 06→07 adds formatAssertion; 04→06 switches id→$id.

## Sanitised Extract
Table of Contents:
 1. Meta-Schema URIs
 2. Single-Vocabulary Files
 3. Relative JSON Pointer
 4. Migration Paths

1. Meta-Schema URIs
 - Core/Validation: https://json-schema.org/draft/2020-12/schema
 - Hyper-Schema: https://json-schema.org/draft/2020-12/hyper-schema
 - Recommended Output: https://json-schema.org/draft/2020-12/meta/recommended-output

2. Single-Vocabulary Files
 All under https://json-schema.org/draft/2020-12/meta/: core.json, applicator.json, validation.json, unevaluated.json, format-annotation.json, format-assertion.json, content.json, meta-data.json

3. Relative JSON Pointer
 - URI: https://json-schema.org/draft/2020-12/relative-json-pointer
 - Adds token syntax: '#', '[<n>]', '/path'.

4. Migration Paths
 - 2019-09  2020-12: change identifier scheme, add unevaluated and content vocabularies.
 - 07  2019-09: add dynamic refs.
 - 06  07: add format-assertion.
 - 04  06: remove id in favor of $id.

## Original Source
JSON Schema
https://json-schema.org/specification.html

## Digest of META_SCHEMAS

# Current Version and Meta-Schemas (retrieved 2025-05-01)

## 2020-12 Core/Validation Dialect Meta-Schema

URI: https://json-schema.org/draft/2020-12/schema

This JSON document defines the Core foundation and Validation keywords.

## 2020-12 Hyper-Schema Dialect Meta-Schema

URI: https://json-schema.org/draft/2020-12/hyper-schema

Includes Core/Validation and hyperlinking keywords (from 2019-09).

## 2020-12 Recommended Output Meta-Schema

URI: https://json-schema.org/draft/2020-12/meta/recommended-output

Specifies structure of application-generated validation output.

## Single-Vocabulary Meta-Schemas (URIs under https://json-schema.org/draft/2020-12/meta/)

- core
- applicator
- validation
- unevaluated
- format-annotation
- format-assertion
- content
- meta-data

## Relative JSON Pointers

URI: https://json-schema.org/draft/2020-12/relative-json-pointer

Extends JSON Pointer for relative addressing; not used by Core/Validation.

## Migration Paths Between Drafts

- Draft-2019-09 → Draft-2020-12
- Draft-07 → Draft-2019-09
- Draft-06 → Draft-07
- Draft-04 → Draft-06

## Access Note

Download each URI and open locally to avoid GitHub Pages JSON rendering limitations.

## Attribution
- Source: JSON Schema
- URL: https://json-schema.org/specification.html
- License: CC0 1.0 Universal
- Crawl Date: 2025-05-07T06:32:31.611Z
- Data Size: 2325185 bytes
- Links Found: 10204

## Retrieved
2025-05-07
