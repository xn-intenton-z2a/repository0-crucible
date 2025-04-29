# GOOD_URIS

## Crawl Summary
Publish HTTP URIs with opaque stable segments, serve machine-readable formats via content negotiation (text/turtle, application/ld+json), avoid volatile URI components, document persistence strategy, implement 301 redirections or PURL service for admin control

## Normalised Extract
Table of Contents
1 URI Structure
2 Content Negotiation
3 Persistence Strategy
4 Implementation Steps

1 URI Structure
Resources MUST use HTTP scheme, host, stable path. Avoid file extensions, session parameters, query strings that change. Example path patterns: /resource/{id}

2 Content Negotiation
Accept header mapping:
  text/html => HTML landing page
  text/turtle => RDF/Turtle serialization
  application/ld+json => JSON-LD serialization
Set response Content-Type accordingly. Return 406 if unsupported.

3 Persistence Strategy
Host a policy document at /uri-policy.html. List redirect rules as mapping table. Use HTTP 301 for moved resources.
Use PURL service or custom redirect middleware allowing live updates without code redeploy.

4 Implementation Steps
1. Define URI pattern: /data/{entity}/{id}
2. Configure HTTP server for content negotiation
3. Create /uri-policy.html describing persistence commitments
4. Implement redirect middleware reading mapping from URI table


## Supplementary Details
Apache Configuration (httpd.conf or .htaccess):
<IfModule mod_negotiation.c>
  Options +MultiViews
  AddType text/turtle ttl
  AddType application/ld+json jsonld
  DefaultType text/html
</IfModule>
<IfModule mod_rewrite.c>
  RewriteEngine On
  # Content negotiation for JSON-LD
  RewriteCond %{HTTP_ACCEPT} application/ld+json
  RewriteRule ^/resource/(.*)$ /data/jsonld/$1.jsonld [R=200,L]
  # Redirect legacy URIs
  RewriteRule ^/old-resource/(.*)$ /resource/$1 [R=301,L]
</IfModule>

Nginx Configuration:
server {
  listen 80;
  server_name example.org;
  location /resource/ {
    types {
      application/ld+json  jsonld;
      text/turtle         ttl;
      text/html           html;
    }
    default_type text/html;
    try_files $uri.turtle $uri.jsonld $uri.html =406;
  }
  location = /uri-policy.html {
    root /var/www/html;
  }
}

## Reference Details
Apache .htaccess Example:
# Enable negotiation and type mapping
Options +MultiViews
AddType text/turtle ttl
AddType application/ld+json jsonld

# JSON-LD negotiation
<If "%{HTTP:Accept} =~ /application\/ld\+json/">
  ForceType application/ld+json
  RewriteRule ^resource/(.*)$ /data/jsonld/$1.jsonld [L]
</If>

# Turtle negotiation
<If "%{HTTP:Accept} =~ /text\/turtle/">
  ForceType text/turtle
  RewriteRule ^resource/(.*)$ /data/ttl/$1.ttl [L]
</If>

# HTML fallback
RewriteRule ^resource/(.*)$ /data/html/$1.html [L]

# Persistence: legacy redirect
RewriteRule ^old/(.*)$ /resource/$1 [R=301,L]

Nginx Server Block Example:
server {
  listen 80;
  server_name data.example.org;

  # Content negotiation
  location /resource/ {
    default_type text/html;
    add_header Vary Accept;
    if ($http_accept ~* application/ld\+json) {
      default_type application/ld+json;
      rewrite ^/resource/(.*)$ /data/jsonld/$1.jsonld break;
    }
    if ($http_accept ~* text/turtle) {
      default_type text/turtle;
      rewrite ^/resource/(.*)$ /data/ttl/$1.ttl break;
    }
    try_files $uri.html =406;
  }

  # URI policy document
  location = /uri-policy.html {
    alias /var/www/html/uri-policy.html;
  }

  # Redirect rules file
  location /redirects/ {
    internal;
    alias /etc/nginx/redirects.conf;
  }
}

Troubleshooting Commands:
# Verify HTML default
curl -I http://example.org/resource/123
> HTTP/1.1 200 OK
> Content-Type: text/html

# Verify Turtle negotiation
curl -I -H 'Accept: text/turtle' http://example.org/resource/123
> HTTP/1.1 200 OK
> Content-Type: text/turtle

# Verify JSON-LD negotiation
curl -I -H 'Accept: application/ld+json' http://example.org/resource/123
> HTTP/1.1 200 OK
> Content-Type: application/ld+json

# Check redirect
curl -I http://example.org/old-resource/123
> HTTP/1.1 301 Moved Permanently
> Location: http://example.org/resource/123

## Information Dense Extract
HTTP URIs with stable opaque paths. Content negotiation for text/html, text/turtle, application/ld+json. Use Vary header. Server config examples for Apache and Nginx. Implement 301 redirects for legacy URIs via mod_rewrite or redirect tables. Host /uri-policy.html documenting persistence commitments. Test via curl -I with Accept header or without. PURL or custom middleware for real-time redirect updates.

## Sanitised Extract
Table of Contents
1 URI Structure
2 Content Negotiation
3 Persistence Strategy
4 Implementation Steps

1 URI Structure
Resources MUST use HTTP scheme, host, stable path. Avoid file extensions, session parameters, query strings that change. Example path patterns: /resource/{id}

2 Content Negotiation
Accept header mapping:
  text/html => HTML landing page
  text/turtle => RDF/Turtle serialization
  application/ld+json => JSON-LD serialization
Set response Content-Type accordingly. Return 406 if unsupported.

3 Persistence Strategy
Host a policy document at /uri-policy.html. List redirect rules as mapping table. Use HTTP 301 for moved resources.
Use PURL service or custom redirect middleware allowing live updates without code redeploy.

4 Implementation Steps
1. Define URI pattern: /data/{entity}/{id}
2. Configure HTTP server for content negotiation
3. Create /uri-policy.html describing persistence commitments
4. Implement redirect middleware reading mapping from URI table

## Original Source
Linked Data Best Practices
https://www.w3.org/TR/ld-bp/

## Digest of GOOD_URIS

# URI Design Principles
Use HTTP URIs as global identifiers for Linked Data resources
Provide at least one machine-readable representation via content negotiation
Design URIs to be opaque and avoid volatile components
Publish and enforce a URI persistence policy with HTTP redirection

# Use HTTP URIs
Resources SHALL be identified by HTTP URIs. Example: http://example.org/resource/123
Implement HTTP GET handlers that respond to Accept headers for HTML, Turtle, JSON-LD

# Machine-Readable Representation
Server MUST support content negotiation for at minimum:
  Accept: text/turtle  => response Content-Type: text/turtle
  Accept: application/ld+json => response Content-Type: application/ld+json

# URI Opacity
URIs MUST NOT embed session tokens, timestamps, file extensions, or other volatile data
Keep path segments stable; use opaque identifiers (e.g., numeric or UUID segments)

# URI Persistence Policy
Define a policy document at /uri-policy.html listing persistence guarantees
Implement 301 Moved Permanently for legacy URIs mapping to current ones
Use PURL or custom redirect table for real-time administration of redirections


## Attribution
- Source: Linked Data Best Practices
- URL: https://www.w3.org/TR/ld-bp/
- License: License if known
- Crawl Date: 2025-04-29T03:08:07.231Z
- Data Size: 6272854 bytes
- Links Found: 22833

## Retrieved
2025-04-29
