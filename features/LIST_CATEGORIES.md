# Overview
Add support for listing available face categories via CLI, HTTP endpoint, and programmatic API. This feature enables users to discover built-in and custom categories before generating faces.

# CLI Behavior
• Introduce flag --list-categories, -L (boolean) to list categories instead of generating faces
• When list-categories is true:
  • If --json is provided, output a JSON array of category names
  • Otherwise print each category on its own line
  • Exit process after listing categories

# HTTP API
• Add GET /categories endpoint
• Accept optional query parameter config to merge custom configuration
• On success return HTTP 200 with JSON object:
  { categories: [<category>, ...] }
• On invalid config path or parse error return HTTP 400 with JSON { error: message }

# Programmatic API
• Expose listCategories(options) returning array of categories including built-in, custom, and all
• Accept options: { config?: string } to merge custom definitions

# Implementation Details
1 Extend OptionsSchema and parseOptions to include listCategories flag and alias -L
2 In main(), detect listCategories flag before face generation, call listCategories with config, format output according to json flag, then exit
3 In createApp(), implement /categories route, parse config from query, call listCategories, handle success and error responses
4 Ensure listCategories is exported and documented in README and docs

# Testing
• Unit tests for parseOptions recognizing --list-categories and alias -L
• CLI integration tests for listing categories in text and JSON modes and exit behavior
• HTTP integration tests for GET /categories default, with config, and invalid config error
• Programmatic tests for listCategories default and with custom configuration and error on missing file

# Documentation
Update README.md and docs/USAGE.md to describe the --list-categories flag, examples of CLI usage, HTTP /categories endpoint, and programmatic listCategories API function