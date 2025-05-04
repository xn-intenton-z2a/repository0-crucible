# Overview
Provide unified reporting of face distribution statistics and available categories across CLI, HTTP, and Programmatic APIs. This feature enables users to understand the makeup of the face pool and discover custom categories defined via configuration files.

# CLI Behavior
• Introduce flag --stats, alias -T to output face pool statistics by category.  
  • When --stats is set and --json is not set, print each line as category: count and a final line total: count  
  • When --stats and --json are both set, output a JSON object mapping category names to counts plus a total property  
• Introduce flag --list-categories, alias -L to list available categories.  
  • When --list-categories is set and --json is not set, print each category on its own line  
  • When --list-categories and --json are both set, output a JSON array of category names  
• Allow combining --stats and --list-categories in a single command; if neither is present fall back to face generation
• Flags honor existing --config for merging custom definitions

# HTTP API
• GET /stats endpoint  
  • Accept optional parameter config for path to JSON or YAML config file  
  • On success respond status 200 with JSON body containing field stats mapping category to count and field total for overall count  
  • On invalid config or parse error respond status 400 with JSON body error and descriptive message
• GET /categories endpoint  
  • Accept optional parameter config  
  • On success respond status 200 with JSON body containing field categories as an array of names  
  • On invalid config or parse error respond status 400 with JSON body error and descriptive message

# Programmatic API
• Export function getStats(options) returning object with stats record and total number  
  • options may include config path to merge custom definitions  
• Maintain existing function listCategories(options) that returns array of category names including built ins custom and all

# Implementation Details
1 Extend OptionsSchema to include boolean stats and boolean listCategories with defaults false  
2 Update parseOptions to recognize flags --stats, -T and --list-categories, -L and attach them to the returned options object  
3 In main entry point detect stats flag first and call getStats then format output based on json option; then detect listCategories and output accordingly  
4 In createApp add endpoints /stats and /categories using shared validation and error handling patterns from /faces; parse query parameters count only for stats scenario and config for both  
5 Implement getStats by loading merged faces via generateFacesCore logic applied to each category and counting items in pool  

# Testing
• Unit tests for getStats with default definitions custom config and error scenarios  
• CLI tests invoking main with --stats and --list-categories in both text and JSON modes verifying correct output and exit codes  
• HTTP tests for GET /stats and GET /categories with default custom and invalid config scenarios