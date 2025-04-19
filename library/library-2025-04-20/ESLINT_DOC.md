# ESLINT_DOC

## Crawl Summary
The crawled ESLint documentation details are organized into several key areas: project usage, extension via custom rules and plugins, Node.js API integration, contribution and maintainer guidelines, as well as CLI configuration. Key technical details include JSON configuration formats, CLI command options (e.g., --fix, --format), Node.js API usage with the ESLint class (methods such as lintFiles, loadFormatter, outputFixes), and exact code samples for both custom rule creation and Node.js integration.

## Normalised Extract
## Table of Contents
1. Use ESLint in Your Project
   - Configuration file examples (.eslintrc.json) with exact syntax
   - CLI command options: `--fix`, `--format`, `--config`
2. Extend ESLint
   - Custom rule module example with full meta, create function, and context.report usage
3. Integrate ESLint
   - Node.js API: Creating an instance of ESLint, linting files, auto-fixing, and formatting output
   - Exact code example provided
4. Contribute to ESLint
   - Development environment setup including cloning, npm install, and testing procedures
5. Maintain ESLint
   - Guidelines for release processes and versioning
6. CLI and Configuration
   - Details for command line usage and configuration file formats
7. Node.js API Integration
   - Detailed ESLint class API including method signatures and expected return types

### Detailed Technical Information
- JSON configuration example:
  {
    "env": { "browser": true, "node": true },
    "extends": "eslint:recommended",
    "rules": { "no-unused-vars": "error", "semi": ["error", "always"] }
  }
- Custom Rule Example:
  ```js
  module.exports = {
    meta: {
      type: "problem",
      docs: {
         description: "disallow use of foo",
         category: "Best Practices",
         recommended: true
      },
      schema: []
    },
    create: function(context) {
      return {
         Identifier(node) {
           if (node.name === 'foo') {
             context.report({ node, message: "Usage of 'foo' is not allowed." });
           }
         }
      };
    }
  };
  ```
- Node.js API Integration Code:
  ```js
  const { ESLint } = require('eslint');

  (async function main() {
      const eslint = new ESLint({ fix: true, overrideConfigFile: '.eslintrc.json' });
      const results = await eslint.lintFiles(['src/**/*.js']);
      await ESLint.outputFixes(results);
      const formatter = await eslint.loadFormatter('stylish');
      console.log(formatter.format(results));
  })().catch((error) => {
      process.exitCode = 1;
      console.error(error);
  });
  ```
- CLI Usage:
  `eslint --fix --format stylish src/**/*.js`


## Supplementary Details
### ESLint Configuration Options
- Environments (`env`): e.g., { "browser": true, "node": true }
- Extends: "eslint:recommended"
- Parser Options: e.g., { "ecmaVersion": 2020, "sourceType": "module" }
- Rules Definitions: e.g.,
  ```json
  {
    "no-unused-vars": "error",
    "semi": ["error", "always"]
  }
  ```

### Custom Rule Implementation Steps
1. Create a JavaScript module exporting an object with `meta` and `create`.
2. Define `meta` with `docs`, `schema`, and rule type.
3. Implement `create(context)` returning visitor methods (e.g., for Identifier nodes).
4. Use `context.report()` to report violations.

### Node.js API for ESLint
- **Constructor Options:**
  - `overrideConfigFile`: string (path to ESLint config file, e.g., '.eslintrc.json')
  - `fix`: boolean (default false, set true to auto-fix issues)

### Troubleshooting Procedures
1. Run `eslint --debug file.js` to output detailed debugging logs.
2. Validate configuration file with a JSON linter.
3. For Node.js API errors, wrap asynchronous calls in try-catch and inspect error messages.
4. Check ESLint version compatibility using `eslint -v`.

### Best Practices
- Always back up configuration before making changes.
- Use version control to track configuration changes.
- Incrementally apply fixes using the `--fix` option and review changes before commit.

## Reference Details
## Full API Specifications and Code Examples

### ESLint Node.js API

**Class:** ESLint

**Constructor:**
```js
new ESLint(options: {
  overrideConfigFile?: string,  // Path to config file
  fix?: boolean,                // Apply fixes automatically
  useEslintrc?: boolean,        // Whether to use .eslintrc.* files
  baseConfig?: Object,          // Base configuration overrides
  cwd?: string                  // Current working directory for configuration resolution
}): ESLint
```

**Methods:**

1. lintFiles(patterns: string | string[]): Promise<LintResult[]>
   - **Parameters:**
     - patterns: glob string or an array of glob strings
   - **Returns:** Promise resolving to an array of LintResult objects

2. loadFormatter(format: string): Promise<Formatter>
   - **Parameters:**
     - format: string (e.g., 'stylish', 'json')
   - **Returns:** Promise resolving to a Formatter object with a method `format(results: LintResult[]): string`

3. outputFixes(results: LintResult[]): Promise<void>
   - **Purpose:** Write output files with fixes applied

**LintResult Object Structure:**
```js
{
  filePath: string,
  messages: Array<{
     ruleId: string | null,
     severity: number,       // 1 for warning, 2 for error
     message: string,
     line: number,
     column: number,
     nodeType?: string,
     source?: string
  }>,
  errorCount: number,
  warningCount: number,
  fixableErrorCount: number,
  fixableWarningCount: number,
  usedDeprecatedRules: Array<{ ruleId: string, replacedBy: string[] }>
}
```

### Full Code Example for Using ESLint Programmatically
```js
// Import the ESLint class from the eslint package
const { ESLint } = require('eslint');

(async function main() {
  try {
    // Create an instance with configuration options
    const eslint = new ESLint({
      overrideConfigFile: '.eslintrc.json',
      fix: true,
      useEslintrc: true
    });

    // Run the linter on files matching the provided glob pattern
    const results = await eslint.lintFiles(['src/**/*.js']);

    // Automatically apply fixes to files
    await ESLint.outputFixes(results);

    // Load a formatter to format lint results
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    console.log(resultText);
  } catch (error) {
    // Troubleshooting: Log error details and exit with failure code
    console.error('Error while linting:', error);
    process.exitCode = 1;
  }
})();
```

### CLI Best Practices
- Run with `eslint --fix` to auto-correct fixable issues.
- Use `eslint --init` to generate a basic configuration file interactively.
- Debug using `eslint --debug file.js` and inspect detailed logs.

### Configuration File Example (.eslintrc.json)
```json
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

### Troubleshooting Commands
- Check ESLint version: `eslint -v`
- Validate config file: `eslint --print-config file.js`
- Run ESLint in debug mode: `eslint --debug file.js`

This specification provides developers with the concrete technical details needed to integrate, extend, and troubleshoot ESLint in various environments.

## Original Source
ESLint Documentation
https://eslint.org/docs/latest/

## Digest of ESLINT_DOC

# ESLINT Documentation

**Retrieved Date:** 2025-04-04

## Overview
This document contains the complete technical details from the ESLint documentation found at https://eslint.org/docs/latest/.

## Table of Contents
1. Use ESLint in Your Project
2. Extend ESLint
3. Integrate ESLint
4. Contribute to ESLint
5. Maintain ESLint
6. CLI and Configuration
7. Node.js API Integration

## 1. Use ESLint in Your Project
- **Core Rules:** A set of built-in rules to enforce JavaScript coding standards.
- **Configuration Specification:**
  - File: `.eslintrc.json`, `.eslintrc.js`, or YAML formats
  - Options include `env`, `extends`, `rules`, `parserOptions`.
  - Example:
    ```json
    {
      "env": { "browser": true, "node": true },
      "extends": "eslint:recommended",
      "rules": {
         "no-unused-vars": "error",
         "semi": ["error", "always"]
      }
    }
    ```
- **Command Line Options:**
  - Run ESLint using: `eslint [options] file.js`
  - Options include `--fix`, `--format`, `--config`.

## 2. Extend ESLint
- **Custom Rules:** Create custom rule modules following ESLint's guidelines.
  - Rule signature:
    ```js
    module.exports = {
      meta: {
        type: "problem",
        docs: {
          description: "disallow use of foo",
          category: "Best Practices",
          recommended: true
        },
        schema: []
      },
      create: function(context) {
        return {
          Identifier(node) {
            if (node.name === 'foo') {
              context.report({ node, message: "Usage of 'foo' is not allowed." });
            }
          }
        };
      }
    };
    ```
- **Plugins and Configurations:**
  - Package your rules in a plugin and update configuration with the plugin name.

## 3. Integrate ESLint
- **Node.js API:**
  - ESLint provides a programmatic API.
  - Example using ESLint Class:
    ```js
    const { ESLint } = require('eslint');

    (async function main() {
      // Create an instance with the desired options
      const eslint = new ESLint({
        overrideConfigFile: '.eslintrc.json',
        fix: true
      });

      // Lint files
      const results = await eslint.lintFiles(['src/**/*.js']);

      // Apply fixes if available
      await ESLint.outputFixes(results);

      // Format and output results
      const formatter = await eslint.loadFormatter('stylish');
      const resultText = formatter.format(results);
      console.log(resultText);
    })().catch((error) => {
      process.exitCode = 1;
      console.error(error);
    });
    ```
- **API Options:**
  - Constructor options include:
    - `overrideConfigFile`: string – path to the configuration file
    - `fix`: boolean – whether to automatically apply fixes
    - Additional options as per ESLint’s API

## 4. Contribute to ESLint
- **Development Setup:**
  - Clone the repository and install dependencies with `npm install`
  - Run tests using `npm test`
  - Follow guidelines for commit messages and pull request reviews.

## 5. Maintain ESLint
- **Versioning and Releases:**
  - Follow semantic versioning.
  - Release notes provide details about feature additions and bug fixes.

## 6. CLI and Configuration
- **Command Line Invocation:**
  - Primary CLI command: `eslint [options] [file|dir|glob]*`
  - Options include:
    - `--fix`: Automatically fix problems
    - `--format <name>`: Specify the output format
    - `--config <file>`: Use specific configuration file
- **Configuration Files:**
  - `.eslintrc.js`: JavaScript configuration file
  - `.eslintrc.json`: JSON configuration file
  - Options include setting environments, globals, parser options, and rule severity.

## 7. Node.js API Integration
- **ESLint Class API:**
  - **Constructor:**
    ESLint(options: Object) => ESLint instance
  - **Methods:**
    - `lintFiles(patterns: string | string[]): Promise<LintResult[]>`
    - `loadFormatter(format: string): Promise<Formatter>`
    - `outputFixes(results: LintResult[]): Promise<void>`
  - **LintResult Structure:**
    ```js
    {
      filePath: string,
      messages: Array<{ ruleId: string, severity: number, message: string, line: number, column: number }>,
      errorCount: number,
      warningCount: number,
      fixableErrorCount: number,
      fixableWarningCount: number
    }
    ```

**Attribution:** Content crawled from ESLint official documentation.
**Data Size:** 2555917 bytes


## Attribution
- Source: ESLint Documentation
- URL: https://eslint.org/docs/latest/
- License: MIT License
- Crawl Date: 2025-04-17T17:25:36.582Z
- Data Size: 2555917 bytes
- Links Found: 5593

## Retrieved
2025-04-17
