# SCHEMA_VOCABULARY

## Crawl Summary
schema.org defines two hierarchies: types and data types. Class IRIs use https://schema.org/{ClassName}. Main classes include Thing, Action, CreativeWork. Data types include Text, URL, Number, Date, DateTime, Boolean. JSON-LD context at https://schema.org/docs/jsonldcontext.jsonld. Serialized vocabularies at /schema.jsonld, /schema.ttl, /schema.rdf. Use HTTP Accept for content negotiation.

## Normalised Extract
Table of Contents:
1. Class IRIs
2. Class Hierarchy
3. Data Types
4. JSON-LD Context and Files
5. Content Negotiation
6. Embedding in HTML

1. Class IRIs
Definition: Each class IRI is https://schema.org/{ClassName}
Examples:
Thing              : https://schema.org/Thing
Action             : https://schema.org/Action
AchieveAction      : https://schema.org/AchieveAction
LoseAction         : https://schema.org/LoseAction
ReviewAction       : https://schema.org/ReviewAction
CreativeWork       : https://schema.org/CreativeWork
Article            : https://schema.org/Article
NewsArticle        : https://schema.org/NewsArticle
TechArticle        : https://schema.org/TechArticle
Product            : https://schema.org/Product
Event              : https://schema.org/Event
Person             : https://schema.org/Person
Organization       : https://schema.org/Organization
Place              : https://schema.org/Place

2. Class Hierarchy
Format: Class : SuperType
Action           : Thing
AchieveAction    : Action
ReviewAction     : Action
CreativeWork     : Thing
Article          : CreativeWork
NewsArticle      : Article
TechArticle      : Article
Product          : Thing
Event            : Thing
Person           : Thing
Organization     : Thing
Place            : Thing

3. Data Types
Text     : https://schema.org/Text
URL      : https://schema.org/URL
Number   : https://schema.org/Number
Date     : https://schema.org/Date
DateTime : https://schema.org/DateTime
Boolean  : https://schema.org/Boolean

4. JSON-LD Context and Files
Context           : https://schema.org/docs/jsonldcontext.jsonld
JSON-LD vocabulary: https://schema.org/version/latest/schema.jsonld
Turtle vocabulary : https://schema.org/version/latest/schema.ttl
RDF/XML vocabulary: https://schema.org/version/latest/schema.rdf

5. Content Negotiation
Endpoint: GET https://schema.org/version/latest/schema
Headers:
  Accept: application/ld+json
  Accept: text/turtle
  Accept: application/rdf+xml

6. Embedding in HTML
Use <script type="application/ld+json"> with JSON-LD object:
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Example Title"
}


## Supplementary Details
Hosted Versions: current development version at https://schema.org
Download mirror: https://schema.org/version/latest
Serializations: application/ld+json, text/turtle, application/rdf+xml
Default JSON-LD MIME: application/ld+json
HTTP Status Codes: 200 OK on success; 406 Not Acceptable if unsupported Accept header
Validation: use https://validator.schema.org/ or CLI via curl

Implementation Steps:
1. Identify required schema classes, note IRIs
2. Fetch context and vocabulary via HTTP GET with appropriate Accept header
3. Embed JSON-LD in HTML, include @context and @type
4. Validate markup

Configuration Options: none for client; choose Accept header; define local cache of vocabulary

## Reference Details
1. HTTP API Endpoints
GET https://schema.org/version/latest/schema.jsonld
  Response: 200 OK; Content-Type: application/ld+json
GET https://schema.org/version/latest/schema.ttl
  Response: 200 OK; Content-Type: text/turtle
GET https://schema.org/version/latest/schema.rdf
  Response: 200 OK; Content-Type: application/rdf+xml

2. Embedding Pattern
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Widget",
  "offers": {
    "@type": "Offer",
    "price": 19.99,
    "priceCurrency": "USD"
  }
}
</script>

3. JSON-LD SDK Example (Node.js)
import {compact, expand} from 'jsonld';

const doc = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Concert",
  "startDate": "2023-01-01T20:00:00"
};

compact(doc, doc['@context']).then(console.log);
expand(doc).then(console.log);

4. Best Practices
- Root JSON-LD object must include @context
- Use full IRIs for custom extensions
- Cache context locally to reduce HTTP overhead
- Validate with official validator after changes

5. Troubleshooting
Command:
  curl -I -H "Accept: text/turtle" https://schema.org/version/latest/schema.ttl
Expected Response Headers:
  HTTP/2 200
  content-type: text/turtle; charset=utf-8
If 406 received, ensure Accept matches supported serializations

## Information Dense Extract
Classes: IRIs at https://schema.org/{ClassName}. Key classes: Thing, Action>Thing, CreativeWork>Thing, Event>Thing, Product>Thing. Data types: Text, URL, Number, Date, DateTime, Boolean. Context: https://schema.org/docs/jsonldcontext.jsonld. Files: /schema.jsonld, /schema.ttl, /schema.rdf. Content negotiation via Accept: application/ld+json, text/turtle, application/rdf+xml. Embed JSON-LD: <script type=application/ld+json>{"@context":"https://schema.org","@type":"Article","headline":"..."}</script>. Validate with validator.schema.org. HTTP endpoints return 200 OK with matching Content-Type.

## Sanitised Extract
Table of Contents:
1. Class IRIs
2. Class Hierarchy
3. Data Types
4. JSON-LD Context and Files
5. Content Negotiation
6. Embedding in HTML

1. Class IRIs
Definition: Each class IRI is https://schema.org/{ClassName}
Examples:
Thing              : https://schema.org/Thing
Action             : https://schema.org/Action
AchieveAction      : https://schema.org/AchieveAction
LoseAction         : https://schema.org/LoseAction
ReviewAction       : https://schema.org/ReviewAction
CreativeWork       : https://schema.org/CreativeWork
Article            : https://schema.org/Article
NewsArticle        : https://schema.org/NewsArticle
TechArticle        : https://schema.org/TechArticle
Product            : https://schema.org/Product
Event              : https://schema.org/Event
Person             : https://schema.org/Person
Organization       : https://schema.org/Organization
Place              : https://schema.org/Place

2. Class Hierarchy
Format: Class : SuperType
Action           : Thing
AchieveAction    : Action
ReviewAction     : Action
CreativeWork     : Thing
Article          : CreativeWork
NewsArticle      : Article
TechArticle      : Article
Product          : Thing
Event            : Thing
Person           : Thing
Organization     : Thing
Place            : Thing

3. Data Types
Text     : https://schema.org/Text
URL      : https://schema.org/URL
Number   : https://schema.org/Number
Date     : https://schema.org/Date
DateTime : https://schema.org/DateTime
Boolean  : https://schema.org/Boolean

4. JSON-LD Context and Files
Context           : https://schema.org/docs/jsonldcontext.jsonld
JSON-LD vocabulary: https://schema.org/version/latest/schema.jsonld
Turtle vocabulary : https://schema.org/version/latest/schema.ttl
RDF/XML vocabulary: https://schema.org/version/latest/schema.rdf

5. Content Negotiation
Endpoint: GET https://schema.org/version/latest/schema
Headers:
  Accept: application/ld+json
  Accept: text/turtle
  Accept: application/rdf+xml

6. Embedding in HTML
Use <script type='application/ld+json'> with JSON-LD object:
{
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Example Title'
}

## Original Source
Schema.org Vocabulary
https://schema.org/docs/full.html

## Digest of SCHEMA_VOCABULARY

# Schema Vocabulary

## Class IRIs

All schema.org classes are identified by IRIs of the form https://schema.org/{ClassName}. Example: https://schema.org/Thing, https://schema.org/Action.

## Parent-Child Hierarchy

The main schema.org hierarchy organizes classes in a tree. Each class includes its direct super-type. Example: Action > Thing, AchieveAction > Action.

## Data Types

The parallel hierarchy for data types defines IRIs: https://schema.org/Text, https://schema.org/URL, https://schema.org/Number, https://schema.org/Date, https://schema.org/DateTime, https://schema.org/Boolean.

## JSON-LD Context and Hosted Files

The JSON-LD context is available at https://schema.org/docs/jsonldcontext.jsonld. Hosted vocabularies in JSON-LD, Turtle, RDF/XML at:

- https://schema.org/version/latest/schema.jsonld
- https://schema.org/version/latest/schema.ttl
- https://schema.org/version/latest/schema.rdf

## Content Negotiation

Clients retrieve definitions by sending HTTP GET with Accept headers:

- Accept: application/ld+json
- Accept: text/turtle
- Accept: application/rdf+xml

## Embedding in HTML

Embed JSON-LD in HTML using <script type="application/ld+json">…</script> with @context and @type at the root.



## Attribution
- Source: Schema.org Vocabulary
- URL: https://schema.org/docs/full.html
- License: License if known
- Crawl Date: 2025-04-28T16:52:16.004Z
- Data Size: 18858359 bytes
- Links Found: 58987

## Retrieved
2025-04-28
