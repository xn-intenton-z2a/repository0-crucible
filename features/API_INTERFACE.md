# Overview
Introduce statistics functionality to report available face categories and their respective pool sizes and the total number of faces. This feature adds a new CLI flag, HTTP endpoint, and programmatic API to provide users insight into the current face pools, including custom configurations.

# CLI Behavior
• Add flag --stats, -T (boolean) to generate statistics instead of random faces.  
• When stats is true:
  • If --json is provided, output a JSON object: mapping each category to its face count and a total count.  
  • Otherwise, print lines in the format “category: count” for each category and a final “total: count”.

# HTTP API
• GET /stats endpoint.  
• Accepts query parameter config to load a custom JSON or YAML configuration.  
• On success, returns HTTP 200 with JSON:
  {
    stats: { <category>: <count>, ... },
    total: <totalCount>
  }
• Invalid config path or parse error returns HTTP 400 with JSON { error: message }.

# Programmatic API
• Export getStats(options).  
• options: { config?: string } allows merging custom face definitions.  
• Returns { stats: Record<string, number>, total: number } after merging default and custom faces.

# Implementation Details
1. Extend OptionsSchema to include stats: z.boolean().default(false).  
2. In src/lib/main.js implement getStats:
   • Load and merge faces with loadCustomConfig if config provided.  
   • Count entries in each category and sum to total.  
3. Update parseOptions to parse --stats, -T and attach to options.  
4. In main(), check stats flag before generating faces; call getStats and format output.  
5. In createApp(), add /stats route that picks config, calls getStats, and handles success and error responses.

# Testing
• Unit tests for getStats: default stats, custom config merging, invalid config error.  
• CLI tests: invoking with --stats in JSON and text modes, correct output and exit codes.  
• HTTP tests: GET /stats: default and with config, error on invalid config.

# Documentation
Update README.md and docs/USAGE.md to document the --stats flag, GET /stats endpoint, and getStats API function.