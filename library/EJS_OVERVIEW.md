# EJS_OVERVIEW

## Crawl Summary
EJS templates embed plain JavaScript in <% %> scriptlet tags, support escaped (<%=) and unescaped (<%-) output, compile templates to JS functions cached in memory, and throw errors as JS exceptions including file and line info.

## Normalised Extract
Table of Contents
1 Template Syntax
2 Output Modes
3 Caching Mechanism
4 Debugging Options

1 Template Syntax
- Scriptlet: <% code %> for control flow and logic.

2 Output Modes
- Escaped: <%= expression %> escapes HTML.
- Raw: <%- expression %> outputs unescaped HTML.

3 Caching Mechanism
- Option cache: boolean (default false).
- When true, compiled functions stored in memory keyed by template filename.

4 Debugging Options
- Option debug: boolean (default false).
- When true, stack traces include template source context and line numbers.

## Supplementary Details
Tag Delimiters
- Scriptlet: <% code %>
- Escaped Output: <%= value %>
- Unescaped Output: <%- value %>

Options
- cache: boolean = false. Enables in-memory cache of compiled templates.
- debug: boolean = false. Includes template context in error stack traces.

Implementation Steps
1. Install: npm install ejs
2. Use render: const output = ejs.render(templateString, data, {cache:true, debug:true});
3. Use compile: const fn = ejs.compile(templateString, {cache:true}); fn(data);



## Reference Details
API: ejs.render(template: string, data: object, options?: {cache?: boolean, debug?: boolean}) => string | throws Error
API: ejs.compile(template: string, options?: {cache?: boolean, debug?: boolean}) => (data: object) => string
Options:
- cache: boolean. Default false. Enables per-filename caching of compiled functions.
- debug: boolean. Default false. Includes template file and line numbers in exception stack.
Usage Example:
const ejs = require('ejs');
const tpl = '<h1><%= title %></h1>';
// Immediate render
const html = ejs.render(tpl, {title:'Test'}, {cache:true, debug:false});
// Precompile and render
const fn = ejs.compile(tpl, {cache:true});
const html2 = fn({title:'Demo'});

Best Practice:
- Enable cache in production: {cache:true, debug:false}
- Enable debug in development: {cache:false, debug:true}

Troubleshooting:
Command: node -e "console.log(ejs.render('<div><%= x %>', {}))"
Expected Error: ReferenceError: x is not defined at eval (eval at compile (path/to/template), <template>:1:6)
Check template for undefined variables or missing data keys.

## Information Dense Extract
EJS: <% code %>, <%= escaped %>, <%- raw %>. Options: cache=false|true, debug=false|true. render(str,data,opts)->string|Error. compile(str,opts)->(data)->string. Errors include file:line. Cache keyed by filename.

## Sanitised Extract
Table of Contents
1 Template Syntax
2 Output Modes
3 Caching Mechanism
4 Debugging Options

1 Template Syntax
- Scriptlet: <% code %> for control flow and logic.

2 Output Modes
- Escaped: <%= expression %> escapes HTML.
- Raw: <%- expression %> outputs unescaped HTML.

3 Caching Mechanism
- Option cache: boolean (default false).
- When true, compiled functions stored in memory keyed by template filename.

4 Debugging Options
- Option debug: boolean (default false).
- When true, stack traces include template source context and line numbers.

## Original Source
EJS Templating Engine
https://ejs.co/#docs

## Digest of EJS_OVERVIEW

# EJS Template Engine Overview

Retrieved: 2024-06-12

## Key Features

- Uses plain JavaScript in templates via scriptlet tags.
- Template syntax: scriptlet tags for logic, escaped and unescaped output.
- Caches compiled template functions for fast execution.
- Runtime errors thrown as JavaScript exceptions with template file and line numbers.

## Template Syntax

- Scriptlet tags: <% JavaScript code %>
- Escaped output: <%= expression %>
- Unescaped output: <%- expression %>

## Performance and Caching

- Templates compiled to JavaScript functions.
- Option cache: boolean flag to enable in-memory caching per filename.

## Debugging

- Option debug: boolean flag to include original template context in stack traces.
- Errors include file path and line number referencing the template source.

## Active Development

- Maintained under active development with community support.

## Attribution
- Source: EJS Templating Engine
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-05-11T09:31:31.867Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-11
