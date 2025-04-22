# PRETTIER

## Crawl Summary
Prettier is an opinionated code formatter that parses source code into an AST and reprints it based on configured line lengths and styles. It supports a wide range of languages including JavaScript, JSX, Angular, Vue, Flow, TypeScript, CSS, HTML, JSON, GraphQL, Markdown, and YAML. Key CLI flags and configuration options include --trailing-comma (default: "all"), --objectWrap, --experimental-operatorPosition, and --experimental-ternaries. Release notes detail bug fixes and new features across versions, with significant improvements in Prettier 3.x series.

## Normalised Extract
# Table of Contents
1. Code Formatting Engine
2. Supported Languages
3. CLI Usage and Integration
4. Configuration Options
5. Release Version Highlights
6. Best Practices and Troubleshooting

## 1. Code Formatting Engine
- Prettier builds an AST from the source code and reprints it using its own formatting rules.
- Example transformation:
  - Input: `foo(arg1, arg2, arg3, arg4);`
  - When too long: breaks into multiple lines
    ```js
    foo(
      reallyLongArg(),
      omgSoManyParameters(),
      IShouldRefactorThis(),
      isThereSeriouslyAnotherOne()
    );
    ```

## 2. Supported Languages
- JavaScript (with experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS, Less, SCSS, HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM, MDX v1), YAML.

## 3. CLI Usage and Integration
- Command-line formatting:
  ```bash
  prettier --write "src/**/*.js" --trailing-comma=all
  ```
- Can be integrated with editor plugins (VS Code, Sublime Text, Vim, etc.) and pre-commit hooks.

## 4. Configuration Options
- `--trailing-comma`: Determines comma usage. Default: "all" (introduced in v3.0).
- `--objectWrap`: New option in v3.5 for wrapping object properties.
- `--experimental-operatorPosition`: Experimental flag in v3.5 to adjust operator positions.
- `--experimental-ternaries`: Flag introduced in v3.1 to better format nested ternaries.

## 5. Release Version Highlights
- **Prettier 3.5:** Adds `objectWrap` and `experimentalOperatorPosition`, supports TS config file.
- **Prettier 3.1:** Introduced `--experimental-ternaries` for better nested ternary formatting.
- **Prettier 3.0:** Migration to ECMAScript Modules, change in markdown formatting (no spaces between Latin and CJK characters), default `trailingComma` set to "all".
- Previous releases include numerous bug fixes, JSONC parser addition, Angular ICU expressions support, and CLI performance improvements.

## 6. Best Practices and Troubleshooting
- **Integration:** Use Prettier with editor on-save and pre-commit hooks to enforce a consistent code style automatically.
- **Troubleshooting CLI:** If code formatting fails, run `prettier --debug-check <file>` to identify issues.
- **Configuration Conflicts:** Ensure that linter configurations (e.g., ESLint) do not conflict with Prettier by separating formatting and code-quality rules.


## Supplementary Details
# Supplementary Details

## Configuration Parameters
- `--trailing-comma`:
  - **Type:** String
  - **Values:** "none", "es5", "all"
  - **Default:** "all"
  - **Effect:** Controls whether trailing commas are added in multi-line constructs.

- `--objectWrap` (Prettier 3.5):
  - **Type:** Boolean or specific policy string
  - **Effect:** Dictates wrapping of object properties when line length is exceeded.

- `--experimental-operatorPosition` (Prettier 3.5):
  - **Type:** Boolean
  - **Effect:** Adjusts formatting style for operator positioning, experimental usage.

- `--experimental-ternaries` (Prettier 3.1):
  - **Type:** Boolean
  - **Effect:** Enables a new formatting style for nested ternary expressions.

## Implementation Steps
1. Install Prettier via npm:
   ```bash
   npm install --save-dev prettier
   ```
2. Create a configuration file (.prettierrc):
   ```json
   {
     "trailingComma": "all",
     "printWidth": 80,
     "tabWidth": 2,
     "useTabs": false
   }
   ```
3. Format files via CLI:
   ```bash
   prettier --write "src/**/*.js"
   ```
4. Integrate Prettier with editor plugins (e.g., VS Code extension: Prettier - Code formatter).

## Best Practices
- Use Prettier for automatic code formatting and separate it from linting tools.
- Configure pre-commit hooks to run Prettier automatically to ensure consistency.
- Regularly update Prettier to benefit from performance improvements and new options.

## Troubleshooting Commands
- Check formatting:
   ```bash
   prettier --check "src/**/*.js"
   ```
- Debug potential formatting issues:
   ```bash
   prettier --debug-check "src/file.js"
   ```
- For plugin issues, consult the migration guide if using ECMAScript Modules.


## Reference Details
# Reference Details

## Prettier API

### Method Signature

    prettier.format(source: string, options?: Prettier.Options): string

### Options Interface (Partial)

    interface Options {
      printWidth?: number;        // Maximum line length. Default: 80
      tabWidth?: number;          // Number of spaces per tab. Default: 2
      useTabs?: boolean;          // Indent with tabs instead of spaces. Default: false
      semi?: boolean;             // Print semicolons at the ends of statements. Default: true
      singleQuote?: boolean;      // Use single quotes instead of double quotes. Default: false
      trailingComma?: "none" | "es5" | "all";  // Trailing commas option. Default: "all"
      bracketSpacing?: boolean;   // Print spaces between brackets in object literals. Default: true
      arrowParens?: "avoid" | "always"; // Include parentheses around a sole arrow function parameter. Default: "always"
      // Experimental Options
      objectWrap?: boolean | string;  // Option for wrapping object properties (introduced in v3.5)
      experimentalOperatorPosition?: boolean; // Experimental option for operator positioning (v3.5)
      experimentalTernaries?: boolean; // Experimental formatting of nested ternaries (v3.1)
      parser?: string;            // Parser to use (e.g., "babel", "typescript", "flow")
    }

### Example Code Usage

```js
// Import Prettier
const prettier = require('prettier');

// Source code to format
const code = "foo(arg1, arg2, arg3, arg4);";

// Formatting options
const options = {
  parser: 'babel',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  // Experimental options
  objectWrap: true,
  experimentalOperatorPosition: true,
  experimentalTernaries: true
};

// Format the code
const formattedCode = prettier.format(code, options);

console.log(formattedCode);
```

## CLI Commands

- Format files recursively:

    prettier --write "src/**/*.js" --trailing-comma=all

- Check file formatting without writing changes:

    prettier --check "src/**/*.js"

- Debug formatting issues:

    prettier --debug-check "src/file.js"

## Implementation Pattern

1. Install Prettier via npm.
2. Configure via a .prettierrc file or CLI arguments.
3. Use IDE or editor integrations for on-save formatting.
4. Integrate with version control systems using pre-commit hooks.

## Troubleshooting Procedures

- If Prettier fails to format a file, run `prettier --debug-check <file>` to see parsing errors.
- Ensure that the configuration file (.prettierrc) syntax is valid JSON.
- Update to the latest version if experimental options do not work as expected.
- Verify that there are no conflicts with other formatting tools (e.g., ESLint) by disabling formatting-related linting rules.


## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER

# Prettier Documentation Digest

**Retrieved Date:** October 5, 2023

## Overview
Prettier is an opinionated code formatter that reprints code by building an AST from the source and then printing it back out according to its own formatting rules. It takes into account maximum line lengths and formatting options to produce consistent output.

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
- Markdown (including GFM and MDX v1)
- YAML

## Code Formatting Behavior
Prettier strips away original styling (with minor exceptions such as preservation of empty lines and multi-line object syntax) and reinstates formatting based on set rules. For example, when a function call is too long:

**Input Example:**

    foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());

**Output Example:**

    foo(
      reallyLongArg(),
      omgSoManyParameters(),
      IShouldRefactorThis(),
      isThereSeriouslyAnotherOne()
    );

## CLI and Integration
Prettier is designed to work seamlessly with various editors and can be integrated in pre-commit hooks or through on-save formatting. It offers a fast CLI execution and supports both CommonJS and ECMAScript Module interfaces.

## Options and Configuration
Key configuration options include:
- `--trailing-comma`: Default changed to "all" in version 3.0.
- `--objectWrap`: Introduced in version 3.5 to manage wrapping of object properties.
- `--experimental-operatorPosition`: An experimental flag in version 3.5.
- `--experimental-ternaries`: Added in version 3.1 to help format nested ternaries.

## Release Notes Highlights
- **Prettier 3.5:** New options like `objectWrap` and `experimentalOperatorPosition`, plus TypeScript configuration file support.
- **Prettier 3.4 - 2.8:** Numerous bug fixes, additional features (e.g., JSONC parser, Angular ICU expressions), and performance improvements in the CLI.

## Attribution and Data Size
- **Data Size:** 925145 bytes
- **Links Found:** 2364
- **Source URL:** https://prettier.io/docs/en/index.html


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: MIT License
- Crawl Date: 2025-04-17T19:22:39.741Z
- Data Size: 925145 bytes
- Links Found: 2364

## Retrieved
2025-04-17
