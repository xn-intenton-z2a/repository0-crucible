# JSONLD_CLI

## Crawl Summary
jsonld-cli is a Node.js command-line interface for JSON-LD manipulation. Install via npm globally or use npx. Core commands: lint, compact, expand, flatten, canonize, fromRdfa. Syntax: jsonld [COMMAND] [OPTIONS] <INPUT> [OUTPUT]. Global options: -h/--help, -V/--version. Command-specific options: -c/--context for compact, --base for base IRI, -q/--quads for N-Quads output. Supports stdin, file paths, and HTTP(S) URLs. Outputs to stdout or file. Security: be cautious of remote document loading and recursive file access.

## Normalised Extract
Table of Contents:
1. Installation
2. CLI Syntax
3. Commands Overview
4. Detailed Command Specifications
5. Input & Output Handling
6. Usage Examples

1. Installation
   Command: npm install -g jsonld-cli
   Alternative: npx jsonld-cli <command>

2. CLI Syntax
   Format: jsonld [COMMAND] [OPTIONS] <INPUT> [OUTPUT]
   INPUT: '-', URL (http:// or https://), or filepath
   OUTPUT: stdout (default) or redirect to file

3. Commands Overview
   lint       Validate JSON-LD
   compact    Compact JSON-LD with a context
   expand     Expand JSON-LD fully
   flatten    Flatten JSON-LD graph
   canonize   Canonicalize to N-Quads
   fromRdfa   Convert RDFa to JSON-LD

4. Detailed Command Specifications
   lint:
     Usage: jsonld lint <INPUT>
     Exit Codes: 0=valid, non-zero=errors

   compact:
     Usage: jsonld compact -c CONTEXT [--base BASEIRI] <INPUT> [OUTPUT]
     Options:
       -c, --context string (required)
       --base string (optional)
     Behavior: applies JSON-LD Compaction algorithm as per JSON-LD 1.1

   expand:
     Usage: jsonld expand [--base BASEIRI] <INPUT> [OUTPUT]
     Options: --base string
     Behavior: applies JSON-LD Expansion algorithm

   flatten:
     Usage: jsonld flatten [--base BASEIRI] <INPUT> [CONTEXT] [OUTPUT]
     Options: --base string
     Behavior: applies JSON-LD Flattening algorithm, then optional compaction

   canonize:
     Usage: jsonld canonize -q <INPUT> [OUTPUT]
     Options:
       -q, --quads boolean
     Behavior: applies RDF Dataset Canonicalization (URDNA2015)

   fromRdfa:
     Usage: jsonld fromRdfa <INPUT> [OUTPUT]
     Behavior: extracts JSON-LD from RDFa 1.0 annotations

5. Input & Output Handling
   Use '-' or omit INPUT for stdin
   Redirect output: jsonld expand in.json > out.json

6. Usage Examples
   jsonld lint https://example.com/data.json
   jsonld compact -c https://w3id.org/payswarm/v1 http://recipes.payswarm.com/?p=10554
   jsonld canonize -q http://recipes.payswarm.com/?p=10554


## Supplementary Details
Environment Requirements:
  Node.js >=10.x
  npm >=6.x

Dependencies:
  jsonld.js >=5.0.0
  jsonld-request >=3.0.0

Installation Effects:
  Adds 'jsonld' executable to PATH
  Bin entry: bin/jsonld.js

Default Behavior:
  documentLoader: Node.js http/https fetch
  Output format defaults to JSON-LD for compaction, expansion, flattening
  Canonization defaults to URDNA2015 algorithm

Error Handling:
  Non-zero exit code on exceptions or validation failures

File Redirection:
  `jsonld expand input.json > expanded.json`

Deterministic Hash Workflow:
  jsonld canonize -q dataset.html | sha256sum


## Reference Details
Complete Command Specifications:

jsonld lint <INPUT>
  INPUT: string (filepath | URL | '-')
  Exit Codes: 0 = no issues, 1 = errors

jsonld compact -c <CONTEXT> [--base <BASEIRI>] <INPUT> [OUTPUT]
  --context, -c: string (required)
  --base: string (optional)
  Example:
    jsonld compact -c context.json input.json > out.json

jsonld expand [--base <BASEIRI>] <INPUT> [OUTPUT]
  --base: string (optional)
  Example:
    jsonld expand input.json > expanded.json

jsonld flatten [--base <BASEIRI>] <INPUT> [CONTEXT] [OUTPUT]
  --base: string (optional)
  Example:
    jsonld flatten input.json context.json > flat.json

jsonld canonize -q <INPUT> [OUTPUT]
  --quads, -q: boolean flag
  Example:
    jsonld canonize -q input.html > quads.nq

jsonld fromRdfa <INPUT> [OUTPUT]
  Example:
    jsonld fromRdfa page.html > extracted.json

Global Options:
  -h, --help: display help text
  -V, --version: output version number

Best Practices:
  Always specify absolute context URLs or local file paths
  Use --base when relative terms present in data
  For hashing, pipe canonize quads into a digest tool
  Monitor exit code in scripts to detect failures

Step-by-step Troubleshooting:
1. Invalid JSON-LD syntax:
   Command: jsonld lint file.json
   Expected: exit 0 and no stderr
2. Missing context file:
   Error: ENOENT context not found
   Fix: verify file path or URL
3. Network fetch failure:
   Command: jsonld compact -c http://example.com/ctx input.json
   Error: FetchError ECONNREFUSED
   Fix: check network or use local context
4. Unexpected output format:
   Ensure correct flags (-q for N-Quads)



## Information Dense Extract
jsonld-cli: Node.js CLI for JSON-LD. Install: npm i -g jsonld-cli or npx. Usage: jsonld [CMD] [OPTIONS] <IN> [OUT]. CMDs: lint(IN)->exit 0/1; compact -c CONTEXT [--base BASE] IN->compacted JSON-LD; expand [--base BASE] IN->expanded JSON-LD; flatten [--base BASE] IN [CONTEXT]->flattened JSON-LD; canonize -q IN->canonical N-Quads; fromRdfa IN->expanded JSON-LD from RDFa. Global opts: -h, --help; -V, --version. Command opts: -c/--context string; --base string; -q/--quads flag. Input: filepath|URL|stdin. Output: stdout or redirect. Examples: jsonld compact -c ctx.json in.html > out.json; jsonld canonize -q in.html | sha256sum. Exit codes: 0 success, non-zero error. Use local contexts to avoid remote fetches.

## Sanitised Extract
Table of Contents:
1. Installation
2. CLI Syntax
3. Commands Overview
4. Detailed Command Specifications
5. Input & Output Handling
6. Usage Examples

1. Installation
   Command: npm install -g jsonld-cli
   Alternative: npx jsonld-cli <command>

2. CLI Syntax
   Format: jsonld [COMMAND] [OPTIONS] <INPUT> [OUTPUT]
   INPUT: '-', URL (http:// or https://), or filepath
   OUTPUT: stdout (default) or redirect to file

3. Commands Overview
   lint       Validate JSON-LD
   compact    Compact JSON-LD with a context
   expand     Expand JSON-LD fully
   flatten    Flatten JSON-LD graph
   canonize   Canonicalize to N-Quads
   fromRdfa   Convert RDFa to JSON-LD

4. Detailed Command Specifications
   lint:
     Usage: jsonld lint <INPUT>
     Exit Codes: 0=valid, non-zero=errors

   compact:
     Usage: jsonld compact -c CONTEXT [--base BASEIRI] <INPUT> [OUTPUT]
     Options:
       -c, --context string (required)
       --base string (optional)
     Behavior: applies JSON-LD Compaction algorithm as per JSON-LD 1.1

   expand:
     Usage: jsonld expand [--base BASEIRI] <INPUT> [OUTPUT]
     Options: --base string
     Behavior: applies JSON-LD Expansion algorithm

   flatten:
     Usage: jsonld flatten [--base BASEIRI] <INPUT> [CONTEXT] [OUTPUT]
     Options: --base string
     Behavior: applies JSON-LD Flattening algorithm, then optional compaction

   canonize:
     Usage: jsonld canonize -q <INPUT> [OUTPUT]
     Options:
       -q, --quads boolean
     Behavior: applies RDF Dataset Canonicalization (URDNA2015)

   fromRdfa:
     Usage: jsonld fromRdfa <INPUT> [OUTPUT]
     Behavior: extracts JSON-LD from RDFa 1.0 annotations

5. Input & Output Handling
   Use '-' or omit INPUT for stdin
   Redirect output: jsonld expand in.json > out.json

6. Usage Examples
   jsonld lint https://example.com/data.json
   jsonld compact -c https://w3id.org/payswarm/v1 http://recipes.payswarm.com/?p=10554
   jsonld canonize -q http://recipes.payswarm.com/?p=10554

## Original Source
jsonld-cli (JSON-LD Command-Line Interface)
https://github.com/digitalbazaar/jsonld-cli

## Digest of JSONLD_CLI

# Installation

Install globally via npm:

    npm install -g jsonld-cli

Or invoke directly with npx:

    npx jsonld-cli <command> [options] <input> [output]

# Usage

Syntax:

    jsonld [COMMAND] [OPTIONS] <INPUT> [OUTPUT]

Inputs:
  - stdin (omit INPUT or use '-')
  - local file path
  - HTTP(S) URL

Outputs:
  - stdout (default)
  - redirected to file

# Commands and Options

## lint

Usage:

    jsonld lint <INPUT>

Behavior:
  - Validates JSON-LD syntax and common issues
  - Exit code 0 on success, non-zero on error

## compact

Usage:

    jsonld compact -c <CONTEXTPATH|URL> [--base <BASEIRI>] <INPUT> [OUTPUT]

Options:
  -c, --context <string>    Context document (filepath or URL)   [required]
      --base <string>       Base IRI for term expansion         [optional]

Output:
  - Compacted JSON-LD document

## expand

Usage:

    jsonld expand [--base <BASEIRI>] <INPUT> [OUTPUT]

Options:
      --base <string>       Base IRI for term expansion         [optional]

Output:
  - Expanded JSON-LD document

## flatten

Usage:

    jsonld flatten [--base <BASEIRI>] <INPUT> [CONTEXT] [OUTPUT]

Options:
      --base <string>       Base IRI for term expansion         [optional]

Behavior:
  - Flattens tree structure
  - Optional CONTEXT to compact after flattening

## canonize

Usage:

    jsonld canonize -q <INPUT> [OUTPUT]

Options:
  -q, --quads              Output canonical N-Quads dataset    [optional]

Behavior:
  - Applies RDF Dataset canonicalization
  - Outputs N-Quads for deterministic hashing

## fromRdfa

Usage:

    jsonld fromRdfa <INPUT> [OUTPUT]

Behavior:
  - Parses RDFa 1.0 in HTML to expanded JSON-LD

# Security Considerations

- Remote resource loading can expose URLs and data contexts.
- Input may recursively fetch remote or local files.
- Restrict untrusted contexts to prevent data exfiltration.


## Attribution
- Source: jsonld-cli (JSON-LD Command-Line Interface)
- URL: https://github.com/digitalbazaar/jsonld-cli
- License: MIT License
- Crawl Date: 2025-05-02T10:48:19.443Z
- Data Size: 634838 bytes
- Links Found: 4874

## Retrieved
2025-05-02
