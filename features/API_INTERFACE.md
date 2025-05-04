# Overview
Merge statistics and category listing into a unified API interface. Provide consistent CLI flags, HTTP endpoints, and programmatic functions to report the distribution of faces by category and to list available categories with support for custom face definitions.

# CLI Behavior
• Add flag --stats, alias -T (boolean) to report face pool statistics.
  • When --stats is set:
    • If --json is specified then output a JSON object mapping each category to its count plus a total count property.
    • Otherwise print each line as category: count followed by total: count.
• Add flag --list-categories, alias -L (boolean) to list available categories.
  • When --list-categories is set:
    • If --json is specified then output a JSON array of category names.
    • Otherwise print each category on its own line.
• Flags --stats and --list-categories may be combined. If neither is present fall back to existing face generation behavior. Flags honor --config for merging custom definitions.

# HTTP API
• GET /stats endpoint
  • Accept optional query parameter config for path to JSON or YAML config file.
  • On success respond with HTTP 200 and JSON body { stats: { <category>: <count>, … }, total: <count> }.
  • On invalid config or parse error respond HTTP 400 with { error: <message> }.
• GET /categories endpoint
  • Accept optional query parameter config for custom definitions.
  • On success respond with HTTP 200 and JSON body { categories: [<name>, …] }.
  • On invalid config or parse error respond HTTP 400 with { error: <message> }.

# Programmatic API
• Export function getStats(options) returning { stats: Record<string, number>, total: number }.
  • options: { config?: string } to include custom definitions.
• Export function listCategories(options) returning string[] of category names including built-in, custom, and “all”.

# Implementation Details
1 Extend OptionsSchema to include boolean stats and listCategories, default false.  
2 Update parseOptions to recognize --stats/-T and --list-categories/-L and attach to returned options object.  
3 In main(): check stats flag first; if set call getStats and format based on json; then check listCategories and format. If neither, continue to face generation.  
4 In createApp(): implement routes /stats and /categories as defined above, using shared parsing and error handling pattern from /faces.  
5 Update README.md and docs/USAGE.md to document new flags and endpoints with usage examples and expected output formats.

# Testing
• Unit tests for getStats and listCategories with default, custom config, and error scenarios.  
• CLI tests invoking main with --stats and --list-categories in text and JSON modes, verifying correct output and exit codes.  
• HTTP tests for GET /stats and GET /categories with valid default, custom config, and invalid config requests.