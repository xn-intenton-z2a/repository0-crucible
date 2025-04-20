# PRETTIER

## Crawl Summary
Prettier is an opinionated code formatter that reprints source code by parsing the code into an AST and then printing it according to a consistent style. It supports languages such as JavaScript, JSX, Angular, Vue, Flow, and TypeScript, among others. Critical technical points include its handling of long lines by wrapping code, new configuration options (objectWrap, experimentalOperatorPosition, TS config file), and its integration with various editors and toolchains. The release notes highlight changes across versions (3.5, 3.4, 3.1, 3.0, etc.) and detail improvements such as performance enhancements and CLI optimizations.

## Normalised Extract
## Table of Contents
1. Overview
2. Code Formatting Example
3. Configuration Options
4. Release Notes
5. Technical Implementation

### 1. Overview
- Prettier reformats code by ignoring original styling and reprinting based on maximum line length.
- Supports multiple languages including JavaScript, TypeScript, CSS, HTML, and Markdown.

### 2. Code Formatting Example
- **Before Formatting:**
  foo(arg1, arg2, arg3, arg4);
- **Non-Wrapped Long Call:**
  foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());
- **After Formatting (Wrapped):**
  foo(
    reallyLongArg(),
    omgSoManyParameters(),
    IShouldRefactorThis(),
    isThereSeriouslyAnotherOne(),
  );

### 3. Configuration Options
- **trailingComma:** "all" (default). Ensures commas are placed after the last element in multi-line structures.
- **printWidth:** Defines maximum characters per line before wrapping occurs.
- **tabWidth:** Number (e.g., 2 or 4) for spaces in indentation.
- **useTabs:** Boolean to toggle between using tabs or spaces.
- **objectWrap:** (New) Controls object wrapping behavior.
- **experimentalOperatorPosition:** (New) Adjusts operator positioning in formatted output.
- **TS Config File Support:** Enables Prettier to use custom TypeScript configuration files.

### 4. Release Notes
- **3.5:** Added new options for objectWrap and experimentalOperatorPosition; TS configuration file support introduced.
- **3.4 & 3.3:** Numerous bug fixes and enhancements.
- **3.1:** Introduced experimental ternary formatting with `--experimental-ternaries` flag.
- **3.0:** Transitioned to ECMAScript Modules; altered markdown spacing and plugin interfaces.
- **2.8:** Improved cache handling with `--cache-location` and support for TypeScript 4.9 satisfies operator.

### 5. Technical Implementation
- **Parsing:** Removes original styling (except practical cases, e.g., empty lines) and rebuilds code through AST.
- **CLI Integration:** Use Prettier as a command line tool and integrate with editor plugins for on-save formatting. Example command: `prettier --write "src/**/*.js"`.
- **Usage in Code:** Often integrated into pre-commit hooks or Continuous Integration to enforce style consistency.


## Supplementary Details
### Detailed Supplementary Specifications

1. **Configuration Options and Defaults**:
   - trailingComma: Default: "all". Inserts a trailing comma in multi-line constructs if set to "all".
   - printWidth: Default value is typically 80, but configurable to any integer.
   - tabWidth: Default is 2. Common alternatives: 4.
   - useTabs: Default is false. If set true, indentation is done with tabs.
   - objectWrap: New option in version 3.5. Accepts values that determine object property wrapping behavior.
   - experimentalOperatorPosition: New option in version 3.5. Boolean flag for enabling experimental formatting of operators.
   - TS Config File Support: Allows a TypeScript config file to dictate parsing behavior for TypeScript projects.

2. **Implementation Steps**:
   - Parse source code to generate AST, ignoring original whitespace and formatting details (with exceptions for empty lines, multi-line objects).
   - Reprint source code according to formatting rules defined by configuration options.
   - Optionally wrap code segments when they exceed the defined printWidth.
   - Integrate with build tools by using CLI commands or editor plugins for automated formatting.

3. **CLI Example**:
   - Check formatting: `prettier --check "src/**/*.js"`
   - Write changes: `prettier --write "src/**/*.js"`
   - Custom cache location: `prettier --cache --cache-location .cache/prettier`


## Reference Details
### Complete API Specifications and Code Examples

#### Prettier API Method Signature

For JavaScript usage, Prettier exports a format function:

    /**
     * Formats the given source code string using the specified options.
     * @param {string} source - The source code to format.
     * @param {Prettier.Options} options - Formatting options including parser, trailingComma, printWidth, etc.
     * @returns {string} - The formatted code.
     */
    function format(source: string, options: Prettier.Options): string;

#### Prettier.Options Interface

    interface Options {
      parser: string;                 // e.g., 'babel', 'flow', 'typescript', etc.
      trailingComma?: 'none' | 'es5' | 'all'; // Default is 'all'.
      printWidth?: number;            // e.g., 80, 100
      tabWidth?: number;              // Number of spaces, e.g., 2 or 4
      useTabs?: boolean;              // false by default
      objectWrap?: 'preserve' | 'force' | 'auto'; // New in 3.5
      experimentalOperatorPosition?: boolean;     // New experimental flag
      // Additional options may include: semi, singleQuote, bracketSpacing, etc.
    }

#### Full Code Example

    // Importing Prettier in a Node.js project
    const prettier = require('prettier');

    // Source code to be formatted
    const code = "foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());";

    // Formatting options
    const options = {
      parser: 'babel',
      trailingComma: 'all',
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      objectWrap: 'auto',
      experimentalOperatorPosition: true
    };

    // Format the code
    const formatted = prettier.format(code, options);

    console.log(formatted);

#### Best Practices

- Integrate Prettier into your editor (VS Code, Sublime, Vim) for on-save formatting to maintain consistent style.
- Use Prettier in combination with linters (ESLint, TSLint) to separate formatting from code quality issues.
- For large codebases, run Prettier as a pre-commit hook to avoid formatting debates during code reviews.

#### Troubleshooting Procedures

1. **Check Formatting:**
   Run: `prettier --check "src/**/*.js"`
   - Expected output: Lists files that are not formatted or a success message if all files are formatted.

2. **Apply Formatting:**
   Run: `prettier --write "src/**/*.js"`
   - Expected output: Files are overwritten with formatted code.

3. **Cache Issues:**
   If encountering caching problems, use: `prettier --cache --cache-location .cache/prettier`
   and verify that the cache directory is writable.

4. **Configuration Debugging:**
   Run Prettier with increased logging (if available) or manually inspect the options object passed into the API.

These detailed API method signatures, option definitions, and full usage examples provide developers with the exact implementation guidelines required to integrate and troubleshoot Prettier in their projects.

## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER

# Prettier Documentation Digest

**Retrieved Date:** 2023-10-06
**Data Size:** 3018811 bytes

## Overview
Prettier is an opinionated code formatter that reprints your code based on a set of rules that enforce consistency. It supports numerous languages including JavaScript (with experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS variants, HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM and MDX v1), and YAML.

## Code Formatting Example

**Original Code:**

    foo(arg1, arg2, arg3, arg4);

**When Line Length Exceeds Limit:**

    foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());

**Formatted Output:**

    foo(
      reallyLongArg(),
      omgSoManyParameters(),
      IShouldRefactorThis(),
      isThereSeriouslyAnotherOne(),
    );

## Key Configuration Options

- **trailingComma:** Default is "all". Adjusts comma usage in multi-line constructs.
- **printWidth:** Maximum line length used to decide when to wrap code.
- **tabWidth:** Number of spaces per indentation level.
- **useTabs:** Boolean flag to use tabs instead of spaces.
- **objectWrap option (New in 3.5):** Controls the wrapping behavior for objects.
- **experimentalOperatorPosition option (New in 3.5):** Enables experimental formatting for operator positions.
- **TS configuration file support:** Allows using a TypeScript configuration file for custom formatting rules.

## Release Notes & Versioning

- **Prettier 3.5:** Adds support for objectWrap, experimentalOperatorPosition, and TS config file support. (Feb 9, 2025)
- **Prettier 3.4 & 3.3:** Various bug fixes and feature enhancements.
- **Prettier 3.1:** Introduced the `--experimental-ternaries` flag with a novel formatting style for nested ternaries.
- **Prettier 3.0:** Migrated to ECMAScript Modules with significant changes such as altered markdown formatting rules and a plugin interface overhaul.
- **Prettier 2.8:** Improved cache options and added support for TypeScript 4.9's satisfies operator.

## Technical Implementation

- **Parsing and Reprinting:** Prettier parses code by removing original styling (preserving empty lines and multi-line objects) and reprints based on its AST, respecting the maximum line length.
- **Integration:** Works seamlessly with many editors through CLI, plugins, and IDE integrations.
- **Usage Pattern:** It is typically run as part of a pre-commit hook or on file save to enforce uniform code style across projects.

## Attribution
Extracted from https://prettier.io/docs/en/index.html with a data size of 3018811 bytes and 3980 links found in the crawl.


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: Unknown
- Crawl Date: 2025-04-20T21:38:44.902Z
- Data Size: 3018811 bytes
- Links Found: 3980

## Retrieved
2025-04-20
