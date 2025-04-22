# ESLINT_DOC

## Crawl Summary
ESLint documentation provides detailed technical guidelines including CLI commands, configuration file structure, and integration methods. Key technical points include core rule configuration, automatic fix commands (`eslint --fix`), custom rule plugin development with specified folder and export structures, Node.js API usage with method `ESLint.lintFiles()`, and a clearly outlined table of topics covering project usage, extension, integration, contribution, and maintenance.

## Normalised Extract
## Table of Contents

1. Use ESLint in Your Project
   - Core Rules
   - CLI Command Options
   - Formatter Integration
   - Migration Guidelines

2. Extend ESLint
   - Custom Rule Development
   - Plugin and Formatter Creation
   - Export Signature: `module.exports = { create: function(context) { ... } }`

3. Integrate ESLint
   - Node.js API: `ESLint.lintFiles(files: string[]): Promise<LintResult[]>`
   - SDK Example with asynchronous method calls

4. Contribute to ESLint
   - Repository Structure (directory layout, test suites)
   - Environment Setup Commands: `git clone`, `npm install`, `npm test`

5. Maintain ESLint
   - Versioning, Release Note Procedures
   - Bug Fix and Patch Management

6. CLI and Configuration (Detailed)
   - Exact CLI options: `--init`, `--fix`, `--config <path>`, `--format <name>`
   - Configuration file content with JSON structure and key-value pairs (e.g., `env`, `extends`, `rules`)

**Detailed Implementation for Node.js API Integration Example:**

```javascript
const { ESLint } = require('eslint');

(async function main() {
  // Instantiate ESLint with options
  const eslint = new ESLint({
    overrideConfigFile: '.eslintrc.json',
    fix: true
  });

  // Lint matching files
  const results = await eslint.lintFiles(['src/**/*.js']);

  // Load a formatter
  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);
  console.log(resultText);
})();
```


## Supplementary Details
### CLI Usage
- Execute `eslint --fix file.js` to auto-correct errors.
- Use `eslint --init` to generate a configuration.
- Specify custom config files with `eslint --config ./.eslintrc.json`.

### Configuration File Details (.eslintrc.json)
- env: { "browser": true, "node": true } defines runtime environments.
- extends: "eslint:recommended" includes recommended rules.
- rules: specify rule severity and parameters (e.g., "semi": ["error", "always"]).

### Node.js API Details
- Class: ESLint
- Method Signature: lintFiles(files: string[]): Promise<LintResult[]>
- Example options: { fix: true, overrideConfigFile: 'path/to/config' }.

### Development and Contribution
- Clone repository: `git clone https://github.com/eslint/eslint.git`
- Dependency installation: `npm install`
- Run tests: `npm test`

### Best Practices
- Always use the latest recommended configuration to catch potential syntax issues.
- Integrate ESLint in CI pipelines for continuous monitoring.
- Customize rules per project needs using configuration overrides.

### Troubleshooting Procedures
- To debug configuration issues, run: `eslint --print-config file.js` and verify output.
- Use verbose output: `eslint -v` for version details and diagnostics.


## Reference Details
### Complete API and SDK Specifications

#### Node.js API (ESLint Class)

- **Class**: ESLint

- **Constructor Options** (object):
  - fix: boolean (default: false) – Automatically fix problems when set to true.
  - overrideConfigFile: string – Path to a custom ESLint configuration file.
  - extensions: string[] – Array of file extensions to lint (default includes .js, .jsx).

- **Methods**:

1. lintFiles(files: string[]): Promise<LintResult[]>
   - **Parameters**:
     - files (string[]): Array of file paths or glob patterns to lint.
   - **Returns**: Promise resolving to an array of LintResult objects.
   - **Exceptions**: Throws error if file parsing fails.

2. loadFormatter(format: string): Promise<Formatter>
   - **Parameters**:
     - format (string): Formatter identifier (e.g., 'stylish').
   - **Returns**: Promise resolving to a Formatter object with a method `format(results: LintResult[]): string`.

#### Sample Code Example with Full Comments

```javascript
// Import ESLint from the ESLint package
const { ESLint } = require('eslint');

(async function main() {
  try {
    // Initialize ESLint with custom configuration and auto-fix enabled
    const eslint = new ESLint({
      fix: true,
      overrideConfigFile: '.eslintrc.json'
    });

    // Lint all JavaScript files under 'src' directory
    const results = await eslint.lintFiles(['src/**/*.js']);

    // Load the 'stylish' formatter to format the lint results
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);

    // Output the formatted lint results
    console.log(resultText);
  } catch (error) {
    // Output error details if linting fails
    console.error('Error occurred during linting:', error);
  }
})();
```

#### Configuration Options (CLI and JSON file)

- **--init**: Launches an interactive process to generate a configuration file.
- **--fix**: Enables auto-fixing of issues. Only fixes when safe to do so.
- **--config**: Specifies the config file path for ESLint.

#### Troubleshooting Steps

1. Run configuration print:
   Command: `eslint --print-config file.js`
   Expected Output: Complete effective configuration in JSON format.

2. Verbose Mode:
   Command: `eslint file.js -v`
   Expected Output: Detailed diagnostic logs including version and rule debugging info.

3. Check ESLint version:
   Command: `eslint -v`
   Expected Output: Current ESLint version (e.g., v9.25.1).

#### Best Practices

- Regularly update ESLint to incorporate new rules and fixes.
- Use configuration overrides for project-specific rule adjustments.
- Include linting in your CI workflow to prevent code quality regressions.
- Document custom rule development with inline comments and consistent export patterns.


## Original Source
Code Quality Tools Documentation
https://eslint.org/docs/latest/

## Digest of ESLINT_DOC

# ESLINT DOC

**Date Retrieved:** 2025-04-21

## Table of Contents

1. Use ESLint in Your Project
2. Extend ESLint
3. Integrate ESLint
4. Contribute to ESLint
5. Maintain ESLint
6. CLI and Configuration

## 1. Use ESLint in Your Project

- **Core Rules & Configuration**: Detailed documentation covers ESLint's built-in rules, configuration file (e.g., .eslintrc.json) settings, and ways to set up the environment for JavaScript/JSX projects.
- **Command Line Options**: Commands such as `eslint --fix <file>` are provided to automatically correct issues. Other options include `--init` for generating configuration, `--config <filepath>`, and `--format <name>`.
- **Formatters and Integrations**: Guides include details on available formatters (like stylish, json) and integrating ESLint into IDEs and CI pipelines.
- **Migration Guides**: Step-by-step instructions are provided to migrate from earlier ESLint versions.

## 2. Extend ESLint

- **Custom Rules and Plugins**: Instructions to develop custom rules with exact configuration and plugin development patterns. Includes file structure guidelines and expected export signatures for rule definitions.
- **Configuration Extensions**: How to extend base configurations using `extends` property, e.g., `"eslint:recommended"`.

## 3. Integrate ESLint

- **Node.js API**: Provides integration instructions with the Node.js API, including method signatures and usage examples.
- **SDK Example**:

  ```javascript
  const { ESLint } = require('eslint');
  (async function main() {
    const eslint = new ESLint({
      overrideConfigFile: '.eslintrc.json',
      fix: true
    });
    const results = await eslint.lintFiles(['src/**/*.js']);
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    console.log(resultText);
  })().catch((error) => console.error(error));
  ```

## 4. Contribute to ESLint

- **Project Structure**: Details development repository layout, coding guidelines, and testing strategies.
- **Development Environment Setup**: Full instructions on cloning the repository, installing dependencies, and running tests. Commands include:

  - `git clone https://github.com/eslint/eslint.git`
  - `npm install`
  - `npm test`

## 5. Maintain ESLint

- **Maintenance Procedures**: Guidelines on bug tracking, release note generation, and version support policies.

## 6. CLI and Configuration

- **CLI Options and Flags**:
  - `--init`: Generate a sample configuration file.
  - `--fix`: Automatically fix problems.
  - `--config <path>`: Specify custom configuration file.
  - `--format <format>`: Specify output format (e.g., stylish, json).

- **Configuration File Example (.eslintrc.json):**

  ```json
  {
    "env": {
      "browser": true,
      "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
      "semi": ["error", "always"],
      "quotes": ["error", "double"]
    }
  }
  ```


## Attribution
- Source: Code Quality Tools Documentation
- URL: https://eslint.org/docs/latest/
- License: License: MIT License
- Crawl Date: 2025-04-22T00:52:51.787Z
- Data Size: 2706981 bytes
- Links Found: 5926

## Retrieved
2025-04-22
