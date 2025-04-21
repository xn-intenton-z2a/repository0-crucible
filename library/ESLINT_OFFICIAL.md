# ESLINT_OFFICIAL

## Crawl Summary
ESLint documentation provides technical specifications covering usage, extension, integration, contribution, and maintenance. It details CLI commands (e.g., `eslint --fix`), configuration file setup (.eslintrc.json), custom rule creation with full meta and create method signatures, and Node.js API integration using the ESLint class with methods like lintFiles().

## Normalised Extract
## Table of Contents
1. Use ESLint in Your Project
   - CLI Options: `eslint --fix`, `eslint --init`
   - Configuration File Example:
     {
       "env": { "browser": true, "node": true },
       "extends": "eslint:recommended",
       "rules": { "semi": ["error", "always"], "quotes": ["error", "double"] }
     }
   - Formatter configuration

2. Extend ESLint
   - Custom Rule Structure:
     - Export an object with `meta` (type, docs, schema) and `create(context)` function.
     - **Code Example:**
       module.exports = {
         meta: {
           type: 'problem',
           docs: { description: 'disallow use of foo', recommended: true },
           schema: []
         },
         create(context) {
           return {
             Identifier(node) {
               if (node.name === 'foo') {
                 context.report({ node, message: 'Avoid using foo.' });
               }
             }
           };
         }
       };

3. Integrate ESLint
   - Node.js API Usage:
     - Import the ESLint class: `const { ESLint } = require('eslint');`
     - Instantiate ESLint with custom overrideConfig
     - **Code Example:**
       const eslint = new ESLint({
         overrideConfig: { rules: { semi: ['error', 'always'] } }
       });
       eslint.lintFiles(['**/*.js']).then(results => console.log(results));

4. Contribute to ESLint
   - Standard development setup: clone repository, `npm install`, and run `npm test`.

5. Maintain ESLint
   - Maintenance practices include adherence to code style, correct commit formats, and use of debugging commands such as `eslint --debug`.


## Supplementary Details
### Configuration File (.eslintrc.json) Example:
{
  "env": { "browser": true, "node": true },
  "extends": "eslint:recommended",
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}

### CLI Commands and Options:
- Lint with auto-fix: `eslint --fix file.js`
- Initiate configuration: `eslint --init`
- Debug mode: `eslint --debug file.js`
- Print effective configuration: `eslint --print-config file.js`

### Custom Rule Development Steps:
1. Create a rule file (e.g., no-foo.js)
2. Export an object with:
   - meta: { type, docs (description, recommended), schema }
   - create(context): function that returns an object mapping AST node types to handler functions
3. Example Handler:
   Identifier(node) {
     if (node.name === 'foo') {
       context.report({ node, message: "'foo' is not allowed" });
     }
   }

### Node.js API Integration:
- Import the ESLint class:
  `const { ESLint } = require('eslint');`
- Instantiate with options:
  const eslint = new ESLint({
    overrideConfig: {
      env: { browser: true, node: true },
      rules: { "no-foo": "error" }
    },
    fix: true
  });
- Lint files and process results:
  async function runLint() {
    const results = await eslint.lintFiles(['src/**/*.js']);
    for (const result of results) {
      console.log(`File: ${result.filePath}`);
      result.messages.forEach(msg => console.log(`Line ${msg.line}: ${msg.message}`));
    }
  }
  runLint();


## Reference Details
### ESLint Node.js API Specifications

**Class:** ESLint

**Constructor:** new ESLint(options: {
  overrideConfig?: object,
  fix?: boolean,
  // additional options as per documentation
})

**Methods:**
1. lintFiles(patterns: string[]): Promise<ESLint.LintResult[]>
   - Parameters: patterns: string[] (glob patterns for file selection)
   - Returns: Promise resolving to an array of LintResult objects

2. loadFormatter(format: string): Promise<ESLint.Formatter>
   - Parameters: format: string ('stylish', 'json', etc.)
   - Returns: Promise resolving to a Formatter object

3. outputFixes(results: ESLint.LintResult[]): Promise<void>
   - Description: Writes fixes to source files if automatic fix is enabled

**Example of Full SDK Integration:**
```js
// Import ESLint from the package
const { ESLint } = require('eslint');

(async function main() {
  // Create an instance with custom configuration; 'fix' option enables auto-fixing
  const eslint = new ESLint({
    overrideConfig: {
      env: { browser: true, node: true },
      rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"]
      }
    },
    fix: true
  });

  // Execute linting on JavaScript files
  const results = await eslint.lintFiles(["src/**/*.js"]);

  // Load a formatter and display the lint results
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);
  console.log(resultText);

  // Apply fixes to source files
  await ESLint.outputFixes(results);
})();
```

### Configuration Options Details
- **`env`**: Specifies the environments the code is designed to run in. Example: `{ browser: true, node: true }`
- **`extends`**: Inherits configurations from predefined ESLint configurations. Example: `"eslint:recommended"`
- **`rules`**: Object specifying rule names and their configurations. Example: 
  - `"semi"`: enforces semicolon usage, set as `["error", "always"]`
  - `"quotes"`: enforces usage of double quotes, set as `["error", "double"]`
- **`fix`**: Boolean flag (default `false`) to automatically fix problems when possible.

### Best Practices with Implementation Code
- Integrate ESLint in CI by running: `eslint . --max-warnings=0`
- Modularize custom rules for maintainability and reuse.
- Use `eslint --print-config <file>` to debug the applied configuration for a particular file.

### Troubleshooting Procedures
1. Run ESLint in debug mode:
   Command: `eslint --debug file.js`
   Expected output: Detailed logs of ESLint scanning and rule application steps.
2. Validate configuration file syntax using a JSON validator.
3. Use `eslint --print-config file.js` to verify the effective configuration for a file.
4. Ensure your Node.js version is compatible (>= 10.0.0) with the ESLint version in use.


## Original Source
ESLint Official Documentation
https://eslint.org/docs/latest/

## Digest of ESLINT_OFFICIAL

# ESLINT OFFICIAL DOCUMENTATION
Retrieved on: 2025-04-20

## Table of Contents
1. Use ESLint in Your Project
2. Extend ESLint
3. Integrate ESLint
4. Contribute to ESLint
5. Maintain ESLint

## 1. Use ESLint in Your Project
- **CLI Options**: Use commands like `eslint --fix`, `eslint --init` for automatic fixes and initial configuration.
- **Configuration Example (.eslintrc.json)**:
  {
    "env": { "browser": true, "node": true },
    "extends": "eslint:recommended",
    "rules": { "semi": ["error", "always"], "quotes": ["error", "double"] }
  }
- **Formatters & Integrations**: Detailed formatter options available in the CLI. Specify formatter such as "stylish" using the Node.js API.

## 2. Extend ESLint
- **Custom Rule Development**: Create custom rules by exporting an object with a `meta` property and a `create` function.

  **Code Example:**
  ```js
  module.exports = {
    meta: {
      type: "problem",
      docs: { description: "disallow use of foo", recommended: true },
      schema: []
    },
    create(context) {
      return {
        Identifier(node) {
          if (node.name === 'foo') {
            context.report({ node, message: "Avoid using foo." });
          }
        }
      };
    }
  };
  ```

## 3. Integrate ESLint
- **Node.js API Usage**: Import ESLint and instantiate with custom configuration.

  **Code Example:**
  ```js
  const { ESLint } = require('eslint');
  const eslint = new ESLint({
    overrideConfig: {
      rules: { semi: ['error', 'always'] }
    }
  });

  async function runLint() {
    const results = await eslint.lintFiles(['**/*.js']);
    console.log(results);
  }
  runLint();
  ```

## 4. Contribute to ESLint
- **Contribution Guidelines**: Detailed instructions on setting up the development environment including cloning the repository, running `npm install` to fetch dependencies, and executing `npm test` to run the test suite. Follow project structure and commit message conventions.

## 5. Maintain ESLint
- **Maintenance Best Practices**: Codebase maintenance guidelines include enforcing consistent coding style, following documented commit conventions, and adhering to branch management policies. Use debug tools like `eslint --debug` for troubleshooting.


## Attribution
- Source: ESLint Official Documentation
- URL: https://eslint.org/docs/latest/
- License: License: MIT License
- Crawl Date: 2025-04-21T10:49:41.699Z
- Data Size: 2732095 bytes
- Links Found: 5977

## Retrieved
2025-04-21
