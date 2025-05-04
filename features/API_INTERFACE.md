# Overview
Merge statistics and category listing into a unified API interface. Provide CLI flags, HTTP endpoints, and programmatic functions to report face pool statistics and list available categories, with support for custom configurations.

# CLI Behavior
• Add flag --stats, -T (boolean) to report face pool statistics.
  • When stats is true:
    • If --json is provided, output JSON mapping each category to its count and a total count.
    • Otherwise print lines “category: count” for each and a final “total: count”.
• Add flag --list-categories, -L (boolean) to list available categories.
  • When list-categories is true:
    • If --json is provided, output a JSON array of category names.
    • Otherwise print each category on its own line.
• Flags can be combined with --config to merge custom face definitions into both reports.

# HTTP API
• GET /stats endpoint
  • Accepts query parameter config for JSON or YAML config path.
  • On success returns HTTP 200 with JSON:
    {
      stats: { <category>: <count>, … },
      total: <count>
    }
  • On invalid config or parse error returns HTTP 400 with { error: message }.
• GET /categories endpoint
  • Accepts query parameter config for JSON or YAML config path.
  • On success returns HTTP 200 with JSON { categories: [<name>, …] }.
  • On invalid config or parse error returns HTTP 400 with { error: message }.

# Programmatic API
• Export getStats(options) returning { stats: Record<string, number>, total: number }.
  • options: { config?: string } to merge custom definitions.
• Export listCategories(options) returning string[] of category names including built-in, custom, and "all".

# Implementation Details
1 Extend OptionsSchema to include:
   • stats: z.boolean().default(false)
   • listCategories: z.boolean().default(false)
2 Update parseOptions to parse --stats/-T and --list-categories/-L and attach to returned options.
3 In main():
   • Check stats flag before generation. If set call getStats and format output based on json flag.
   • Check listCategories flag before generation. If set call listCategories and format output based on json flag.
4 In createApp():
   • Implement /stats route: parse config, call getStats, handle success and error.
   • Implement /categories route: parse config, call listCategories, handle success and error.
5 Update CLI help output, README.md, and docs/USAGE.md to include new flags and usage examples.

# Testing
• Unit tests for getStats and listCategories with default settings, custom config merging, and error cases.
• CLI tests for invoking with --stats and --list-categories in text and JSON modes and exit codes.
• HTTP tests for GET /stats and GET /categories with default, custom config, and invalid config scenarios.

# Documentation
Update README.md and docs/USAGE.md to document:
• --stats/-T and --list-categories/-L flags
• GET /stats and GET /categories endpoints
• getStats and listCategories programmatic APIs