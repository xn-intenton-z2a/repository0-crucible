# PRETTIER

## Crawl Summary
Prettier is an opinionated formatter that resets code styling by parsing the AST and reprinting code while enforcing a consistent style across supported languages. It supports JavaScript (and its experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS variants, HTML, Ember/Handlebars, JSON, GraphQL, Markdown (including GFM and MDX v1) and YAML. It includes CLI options such as caching (--cache, --cache-location) and formatting flags (e.g., --write) and has recently introduced new options like objectWrap and experimentalOperatorPosition. Integrated with numerous editors, it minimizes code style debates and is suited for both legacy code style cleanup and new project consistency.

## Normalised Extract
## Table of Contents
1. SUPPORTED_LANGUAGES
2. FORMATTING_BEHAVIOR
3. RELEASE_OPTIONS
4. CLI_INTEGRATION
5. BEST_PRACTICES
6. TROUBLESHOOTING

### 1. SUPPORTED_LANGUAGES
- JavaScript (with experimental features)
- JSX
- Angular
- Vue
- Flow
- TypeScript
- CSS, Less, SCSS
- HTML
- Ember/Handlebars
- JSON
- GraphQL
- Markdown (GFM, MDX v1)
- YAML

### 2. FORMATTING_BEHAVIOR
- Ignores original styling except where practical (e.g., preserving empty lines and multi-line objects).
- Reprints code from scratch using its AST with line length considerations.

**Example:**
Before formatting: `foo(arg1, arg2, arg3, arg4);`
After formatting:
```
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

### 3. RELEASE_OPTIONS
- **objectWrap Option:** Controls how objects are wrapped. New in v3.5.
- **experimentalOperatorPosition Option:** Determines the position of operators; marked experimental.
- **TypeScript Config File Support:** Allows use of a TS configuration file to guide formatting.

### 4. CLI_INTEGRATION
- Runs via the command line with support for options:
  - `--cache` to enable caching,
  - `--cache-location` to specify the cache directory,
  - `--write` to output formatted code to files.

### 5. BEST_PRACTICES
- Use Prettier to handle all formatting needs while relying on linters for code-quality rules.
- Integrate Prettier as a pre-commit hook and within editor plugins to auto-format code on save.
- Run Prettier on the entire codebase to ensure consistent style especially after large merges or style debates.

### 6. TROUBLESHOOTING
- Verify correct parser (e.g., `babel` or `typescript`) is set in the configuration.
- Ensure editor plugins point to the proper version of Prettier installed in the project.
- Check CLI options if changes are not reflected (e.g., using `--write` properly).
- Run Prettier with verbose logging if the behavior is unexpected.


## Supplementary Details
## Supplementary Technical Specifications

### Prettier Options and Configuration
- **objectWrap Option:** 
  - *Usage:* `--object-wrap [option]`
  - *Supports:* Controlling wrap style for object literals.
  - *Default:* Inherited from previous version behavior unless explicitly set.

- **experimentalOperatorPosition Option:** 
  - *Usage:* `--experimental-operator-position`
  - *Effect:* Adjusts the placement of operators in multi-line expressions.
  - *Note:* This option is experimental and feedback is encouraged.

- **TypeScript Configuration File Support:** 
  - *Usage:* Prettier will detect and use `tsconfig.json` if available.
  - *Effect:* Allows alignment of formatting rules with the TypeScript configuration settings.

### CLI Details
- **Cache Options:**
  - `--cache`: Enables caching mechanism to speed up repeated formatting operations.
  - `--cache-location [path]`: Specifies an alternate directory for the cache.
  - *Behavior:* Cache is only used if `--write` flag is active.

### Integration Steps
1. Install Prettier as a dev dependency: `npm install --save-dev prettier`
2. Create a configuration file (`.prettierrc`) with desired options (e.g., `{"trailingComma": "all", "tabWidth": 2}`).
3. Add a script in `package.json` to format files: `"format": "prettier --write '**/*.{js,jsx,ts,tsx,css,scss,md}'"`.
4. Configure editor integration (e.g., VSCode plugin settings) to use the project version of Prettier.

### Release Notes Integration
- New features are introduced in versions 3.0 to 3.5 with enhancements such as ECMAScript Module migration, new Flow features, and experimental formatting changes to ternaries.
- Use the provided migration guides in the release notes to update plugins and configuration when moving to a new version.


## Reference Details
## Prettier API and Detailed Implementation Reference

### API Method Signature

Prettier exposes a formatting function for programmatic use:

```
/**
 * Formats the given source code string based on the provided options.
 * 
 * @param {string} source - The source code to format.
 * @param {Object} options - The configuration options for formatting.
 * @param {string} options.parser - The parser to use (e.g., 'babel', 'typescript').
 * @param {'none'|'es5'|'all'} options.trailingComma - Controls trailing comma usage.
 * @param {number} [options.tabWidth=2] - Number of spaces per indentation level.
 * @param {boolean} [options.useTabs=false] - Indentation with tabs instead of spaces.
 * @returns {string} - The formatted code.
 * @throws {Error} - Throws error if source code cannot be parsed.
 */
function format(source, options) {}
```

### Full Code Example (Node.js Usage)

```javascript
// Import the Prettier module
const prettier = require('prettier');

// Sample unformatted JavaScript code
const unformattedCode = "function hello(name){console.log('Hello, '+ name);}";

// Format the code with specific options
const formattedCode = prettier.format(unformattedCode, {
  parser: 'babel',
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false
});

console.log(formattedCode);
```

### CLI Usage Example

Run Prettier from the terminal to format all JavaScript files:

```
npx prettier --write '**/*.js'
```

### Configuration File Example (.prettierrc)

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "objectWrap": "collapse",
  "experimentalOperatorPosition": true
}
```

### Best Practices
- **Integration:** Configure your editor (VSCode, Sublime, Vim, etc.) to use the local Prettier installation.
- **Pre-commit Hooks:** Use tools like Husky to add Prettier to your Git pre-commit process.
- **Troubleshooting:** 
  - If formatted output does not match expectations, run with increased logging (e.g., `DEBUG=prettier:* npx prettier --write <file>`).
  - Verify that the correct parser is selected if syntax errors occur.

### Troubleshooting Procedures
1. **Command:** `npx prettier --check 'src/**/*.{js,jsx,ts,tsx}'`
   - **Expected Output:** Lists files that do not conform to the style.
2. **Command:** `npx prettier --write 'src/**/*.{js,jsx,ts,tsx}'`
   - **Expected Output:** Files are reformatted in place.
3. **If errors occur:** Check the installed version of Prettier and ensure that configuration files (e.g., .prettierrc) are correctly formatted.
4. **Editor Plugin Issues:** Confirm that the plugin is using the project's Prettier version and that no conflicting settings are in place.


## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER

# Prettier Documentation Digest

**Retrieved Date:** 2023-10-04

## Overview
Prettier is an opinionated code formatter that reprints source code by parsing its AST and formatting based on a fixed set of rules. It supports many languages including JavaScript (and experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS, Less, SCSS, HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM and MDX v1), and YAML.

## Supported Languages
- JavaScript (including experimental features)
- JSX
- Angular
- Vue
- Flow
- TypeScript
- CSS, Less, SCSS
- HTML
- Ember/Handlebars
- JSON
- GraphQL
- Markdown (GFM, MDX v1)
- YAML

## Formatting Behavior
- Removes original styling while preserving some practical elements such as empty lines and multi-line objects.
- Reprints code taking into account the maximum line length. 

### Example
*Before:*  
`foo(arg1, arg2, arg3, arg4);`

*After (when over length limit):*
```
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

## Release Features and Options
- **objectWrap Option:** New in version 3.5 to control wrapping of objects.
- **experimentalOperatorPosition Option:** Experimental flag for operator positioning.
- **TypeScript Config File Support:** Enables user provided TS config to influence formatting.

## CLI and Integration
- Prettier comes with a CLI that supports options like `--cache`, `--cache-location`, and `--write` for formatting files.
- Integrated with most editors through plugins (e.g., VSCode, Sublime, Vim, Emacs) and supports running as part of pre-commit hooks.

## Best Practices
- Use Prettier for formatting and linters (e.g., ESLint) for code-quality rules.
- Incorporate in continuous integration workflows to ensure code consistency.
- Use editor integrations to auto-format on save.

## Troubleshooting
- Ensure that the correct parser is specified in non-standard language cases (e.g., using `babel` for JavaScript or `typescript` for TS).
- Check that editor plugins are configured to use the project version of Prettier.
- For CLI issues, run Prettier with increased verbosity or check cache configurations.

## Attribution and Data Size
- **Data Size from Crawled Content:** 1045001 bytes
- **Links Found:** 2592
- **Source URL:** https://prettier.io/docs/en/index.html


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: MIT License
- Crawl Date: 2025-04-20T19:20:47.055Z
- Data Size: 1045001 bytes
- Links Found: 2592

## Retrieved
2025-04-20
