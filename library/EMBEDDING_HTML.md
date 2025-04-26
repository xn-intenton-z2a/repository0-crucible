# EMBEDDING_HTML

## Crawl Summary
Use <script type="application/ld+json"> containing valid RFC8259 JSON. Relative IRIs in embedded JSON-LD must be resolved against the HTML <base> href or document URL. Script content must not include comments or HTML escapes. Locate scripts via CSS selectors or id for processing and merging.

## Normalised Extract
Table of Contents:
1 Inheriting Base IRI from HTML's base element
2 Restrictions for JSON-LD script contents
3 Locating JSON-LD script elements

1 Inheriting Base IRI from HTML's base element
   - Use <base href> or document URL to resolve relative IRIs in script content
   - Example: <base href="https://example.com/resources/"> and "@id":"item1" resolves to "https://example.com/resources/item1"

2 Restrictions for JSON-LD script contents
   - script element attribute: type="application/ld+json"
   - content must be valid JSON per RFC8259: object or array literal
   - no HTML comments or escape sequences
   - strip BOM before parsing
   - ignore leading/trailing whitespace

3 Locating JSON-LD script elements
   - querySelector('script[type="application/ld+json"]') returns first script
   - getElementById('id') for named scripts
   - ignore all other script types


## Supplementary Details
Implementation Steps:
1. In HTML <head>, include <base href="..."> to set base IRI.
2. Add <script type="application/ld+json" id="..."> containing JSON-LD document.
3. Ensure JSON is purified: no comments, valid Unicode, proper double quotes.
4. In JavaScript, use document.querySelector or getElementById to retrieve script content.
5. Strip BOM and whitespace: textContent.replace(/^\uFEFF/, '').trim().
6. Pass JSON string to JSON.parse for processing with JSON-LD API.

Configuration Options:
- `scriptSelector` default: 'script[type="application/ld+json"]'
- `stripBOM` boolean default: true
- `mergeMultipleScripts` boolean default: true

## Reference Details
Code Example:
```html
<head>
  <base href="https://api.example.com/">
  <script type="application/ld+json" id="product-jsonld">
  {
    "@context": {
      "@vocab": "https://schema.org/",
      "price": {"@id": "price", "@type": "xsd:decimal"}
    },
    "@id": "product123",
    "name": "Widget",
    "price": "19.99"
  }
  </script>
</head>
```

JavaScript Implementation Pattern:
```javascript
function loadJsonLd(options) {
  const selector = options.scriptSelector || 'script[type="application/ld+json"]';
  const scripts = document.querySelectorAll(selector);
  const jsonObjects = [];
  scripts.forEach(script => {
    let text = script.textContent;
    if(options.stripBOM) text = text.replace(/^\uFEFF/, '');
    text = text.trim();
    try {
      const obj = JSON.parse(text);
      jsonObjects.push(obj);
    } catch(e) {
      console.error('Invalid JSON-LD:', e);
    }
  });
  return options.mergeMultipleScripts ? mergeJsonLd(jsonObjects) : jsonObjects[0];
}

function mergeJsonLd(docs) {
  // merge @context arrays and @graph arrays according to JSON-LD 1.1 merge rules
  const merged = { '@context': [], '@graph': [] };
  docs.forEach(doc => {
    if(doc['@context']) merged['@context'].push(doc['@context']);
    if(Array.isArray(doc['@graph'])) merged['@graph'] = merged['@graph'].concat(doc['@graph']);
    else merged['@graph'].push(doc);
  });
  return merged;
}
```

Best Practices:
- Place <script> tags in <head> for early indexing.
- Use unique id attributes for targeted retrieval.
- Validate JSON-LD with `jsonld.validate()` before publishing.

Troubleshooting:
Command: `console.log(loadJsonLd({}))`
Expected Output: merged JSON-LD object or single document
Errors:
- "Invalid JSON-LD" if parsing fails
- Missing script: returns undefined or empty array

## Information Dense Extract
<script type=application/ld+json> must contain pure JSON per RFC8259. Use HTML <base href> or document URL as base IRI. Strip BOM and trim whitespace before JSON.parse. Locate scripts via document.querySelector or getElementById. Default selector: script[type="application/ld+json"]. Options: stripBOM=true, mergeMultipleScripts=true. Implementation: loadJsonLd reads scripts, parses JSON, merges contexts and graphs. Merge: context arrays concatenation, graph arrays flattened. Best practices: scripts in head, unique ids, validate with jsonld.validate(). Troubleshoot parse errors via console.error.

## Sanitised Extract
Table of Contents:
1 Inheriting Base IRI from HTML's base element
2 Restrictions for JSON-LD script contents
3 Locating JSON-LD script elements

1 Inheriting Base IRI from HTML's base element
   - Use <base href> or document URL to resolve relative IRIs in script content
   - Example: <base href='https://example.com/resources/'> and '@id':'item1' resolves to 'https://example.com/resources/item1'

2 Restrictions for JSON-LD script contents
   - script element attribute: type='application/ld+json'
   - content must be valid JSON per RFC8259: object or array literal
   - no HTML comments or escape sequences
   - strip BOM before parsing
   - ignore leading/trailing whitespace

3 Locating JSON-LD script elements
   - querySelector('script[type='application/ld+json']') returns first script
   - getElementById('id') for named scripts
   - ignore all other script types

## Original Source
JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of EMBEDDING_HTML

# Embedding JSON-LD in HTML Documents

This section provides the exact markup, processing rules, and constraints for embedding JSON-LD within HTML documents.

## 7.1 Inheriting Base IRI from HTML's base element

HTML documents may include a `<base>` element to establish a base IRI. JSON-LD processors MUST use the HTML document’s base IRI when resolving relative IRI references in embedded JSON-LD script elements. If no `<base>` element is present, the document’s location serves as the base IRI.

Example HTML:

```html
<html>
  <head>
    <base href="https://example.com/resources/">
    <script type="application/ld+json">
    {
      "@context": {"ex": "vocab#"},
      "@id": "item1"
    }
    </script>
  </head>
</html>
```

In this example, the JSON-LD `@id` of `item1` expands to `https://example.com/resources/item1`.

## 7.2 Restrictions for contents of JSON-LD script elements

1. The `<script>` element MUST have `type="application/ld+json"`.
2. The content MUST be valid JSON conforming to RFC8259. No HTML escape sequences or comments are allowed.
3. Leading or trailing white space is permitted but processors MUST ignore it.
4. The script content MUST not include non-JSON-LD tokens. Only JSON objects and arrays are valid.
5. Unicode BOM characters, if present, MUST be stripped before JSON parsing.

Violation of any restrictions MUST cause a processor to treat the script as non-JSON-LD content.

## 7.3 Locating a Specific JSON-LD Script Element

JSON-LD processors or custom scripts can locate embedded JSON-LD by querying for script elements:

```javascript
// Locate the first JSON-LD script in the document
const jsonLdScript = document.querySelector('script[type="application/ld+json"]');

// Locate a JSON-LD script with a specific id attribute
const jsonLdScriptById = document.getElementById('my-jsonld');
```

Scripts without `type="application/ld+json"` must be ignored. If multiple JSON-LD scripts exist, processors MAY merge contexts and graph data according to JSON-LD merge rules.

## Attribution
- Source: JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: CC0 1.0 Universal
- Crawl Date: 2025-04-26T16:50:13.851Z
- Data Size: 19913827 bytes
- Links Found: 140382

## Retrieved
2025-04-26
