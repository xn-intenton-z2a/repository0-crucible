library/OPENAI_API.md
# library/OPENAI_API.md
# OPENAI_API

## Crawl Summary
The crawled content from https://platform.openai.com/docs/api-reference indicated an absence of raw data (Data Size: 0 bytes), therefore this document reconstructs the key API endpoint /v1/completions, including its HTTP method, required and optional parameters, configuration header requirements, and provides full code examples in both cURL and Node.js. It includes explicit parameter details such as model, prompt, max_tokens, temperature, and other optional tuning parameters.

## Normalised Extract
## Table of Contents
1. API Endpoints
   - /v1/completions: POST method with parameters {model (string), prompt (string), suffix (string, optional), max_tokens (int), temperature (float, default 1.0), top_p (float, default 1.0), n (int, default 1), stream (bool, default false), stop (string/array), presence_penalty (float, default 0.0), frequency_penalty (float, default 0.0), logit_bias (object, optional), user (string, optional)}.
2. Code Examples
   - cURL command demonstrating endpoint usage with proper headers.
   - Node.js SDK example using openai.createCompletion with full error handling.
3. Configuration Options
   - Detailed header and authentication configuration.
4. Troubleshooting Procedures
   - Commands and steps to check network connectivity, validate API key, and handle HTTP error codes.

## Detailed Technical Information
- **Endpoint Details:**
  - URL: https://api.openai.com/v1/completions
  - Method: POST
  - Required Payload Keys: model, prompt, max_tokens
  - Optional Payload Keys: suffix, temperature, top_p, n, stream, stop, presence_penalty, frequency_penalty, logit_bias, user
- **cURL Example:**
  See above for the exact command including headers and JSON payload.
- **Node.js SDK Example:**
  Provided is a complete snippet demonstrating configuration, method signature `openai.createCompletion({ ... })`, and error handling.
- **Header Configuration:**
  - Content-Type must be set to application/json
  - Authorization must include the correct Bearer token
- **Troubleshooting:**
  - Use verbose output with curl (`curl -v ...`) for connectivity issues and check for specific HTTP status codes to debug errors.

## Supplementary Details
### Supplementary Technical Specifications
- **/v1/completions Parameters Detailed List:**
  - `model`: string. Example: "text-davinci-003".
  - `prompt`: string. Input text prompt for completion.
  - `suffix`: string (optional).
  - `max_tokens`: integer. Controls the maximum number of tokens to generate.
  - `temperature`: float (default: 1.0). Controls randomness in the output.
  - `top_p`: float (default: 1.0).
  - `n`: integer (default: 1). Specifies number of completions to generate.
  - `stream`: boolean (default: false). If true, streams back partial progress.
  - `stop`: string or array of strings (optional). Up to 4 sequences where the API will stop generating further tokens.
  - `presence_penalty`: float (default: 0.0).
  - `frequency_penalty`: float (default: 0.0).
  - `logit_bias`: object (optional). A mapping from token IDs to bias values.
  - `user`: string (optional). Unique identifier for the end-user.

- **Implementation Steps:**
  1. Set up the request headers with `Content-Type: application/json` and authorization using your API key.
  2. Construct the JSON payload with required and any optional parameters.
  3. Send a POST request to the endpoint.
  4. Handle the JSON response appropriately, checking HTTP status codes for errors.
  5. Log and debug using provided troubleshooting commands if errors appear.

- **Best Practices:**
  - Always check for and gracefully handle API errors.
  - Limit token usage to control costs.
  - Use streaming for long completion requests if progressive results are needed.
  - Securely manage and store your API key.

## Reference Details
### Complete API Specifications and SDK Method Signatures

#### POST /v1/completions
**Endpoint:** https://api.openai.com/v1/completions

**Request Method:** POST

**Request Headers:**
- Content-Type: application/json
- Authorization: Bearer YOUR_API_KEY

**Request Body Parameters:**
```json
{
  "model": "text-davinci-003",           // string, required
  "prompt": "Say this is a test",         // string, required
  "suffix": "optional string",
  "max_tokens": 7,                         // integer, required
  "temperature": 0,                        // float, optional
  "top_p": 1.0,                            // float, optional
  "n": 1,                                  // integer, optional
  "stream": false,                         // boolean, optional
  "stop": "\n",                         // string or array, optional
  "presence_penalty": 0.0,                 // float, optional
  "frequency_penalty": 0.0,                // float, optional
  "logit_bias": {                          // object, optional
    "token_id": -100
  },
  "user": "user-identifier"             // string, optional
}
```

**Response:**
The API returns a JSON object. Example response:
```json
{
  "id": "cmpl-12345",
  "object": "text_completion",
  "created": 1610078136,
  "model": "text-davinci-003",
  "choices": [
    {
      "text": "This is a test.",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}
```

#### Node.js SDK Method Signature
Using the OpenAI Node.js SDK:

```javascript
/**
 * Creates a completion using the OpenAI API.
 * @param {Object} params - The parameters for creating a completion.
 * @param {string} params.model - The model to use, e.g. 'text-davinci-003'.
 * @param {string} params.prompt - The prompt string.
 * @param {number} params.max_tokens - Maximum tokens to generate.
 * @param {number} [params.temperature] - Sampling temperature.
 * @param {number} [params.top_p] - Top-p sampling parameter.
 * @param {number} [params.n] - Number of completions to generate.
 * @param {boolean} [params.stream] - Whether to stream the response.
 * @param {string|string[]} [params.stop] - Stopping sequence(s).
 * @param {number} [params.presence_penalty] - Presence penalty value.
 * @param {number} [params.frequency_penalty] - Frequency penalty value.
 * @param {Object} [params.logit_bias] - Token bias map.
 * @param {string} [params.user] - End-user identifier.
 * @returns {Promise<Object>} - The completion response object.
 */
async function createCompletion(params) {
  // Implementation using OpenAIApi from openai
}
```

#### Troubleshooting Commands
- **cURL Verbose Mode:**
  ```bash
  curl -v https://api.openai.com/v1/completions -H "Authorization: Bearer YOUR_API_KEY"
  ```
- **Node.js Logging:**
  Insert console logs to capture error responses:
  ```javascript
  try {
    const response = await openai.createCompletion({ /* parameters */ });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
  ```

These detailed specifications, method signatures, and code examples provide developers with the exact information needed to implement, configure, and troubleshoot interactions with the OpenAI API.

## Original Source
OpenAI API Documentation
https://platform.openai.com/docs/api-reference

## Digest of OPENAI_API

# OpenAI API Documentation

**Date Retrieved:** 2023-10-05

## 1. API Endpoints

### /v1/completions
- **Method:** POST
- **URL:** https://api.openai.com/v1/completions
- **Parameters:**
  - `model` (string, required)
  - `prompt` (string, required)
  - `suffix` (string, optional)
  - `max_tokens` (integer, required)
  - `temperature` (float, optional, default: 1.0)
  - `top_p` (float, optional, default: 1.0)
  - `n` (integer, optional, default: 1)
  - `stream` (boolean, optional, default: false)
  - `stop` (string or array, optional)
  - `presence_penalty` (float, optional, default: 0.0)
  - `frequency_penalty` (float, optional, default: 0.0)
  - `logit_bias` (object, optional)
  - `user` (string, optional)

## 2. Code Example

**cURL Example:**

```bash
curl https://api.openai.com/v1/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "text-davinci-003",
    "prompt": "Say this is a test",
    "max_tokens": 7,
    "temperature": 0
  }'
```

**Node.js SDK Example:**

```javascript
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getCompletion() {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

getCompletion();
```

## 3. Configuration Options

- **Headers:**
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer YOUR_API_KEY`

## 4. Troubleshooting Procedures

- **Network Issues:**
  - Use `curl -v` to debug HTTP connection issues.
- **Authentication Errors:**
  - Verify that the correct API key is supplied and active.
- **HTTP Status Handling:**
  - Check for status codes (e.g., 400, 401, 429) and implement retry mechanisms if necessary.

*Attribution: Data derived via crawling of https://platform.openai.com/docs/api-reference (Data Size: 0 bytes, Links Found: 0).*

## Attribution
- Source: OpenAI API Documentation
- URL: https://platform.openai.com/docs/api-reference
- License: Apache-2.0
- Crawl Date: 2025-04-19T04:22:27.354Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-19
library/library-2025-04-20/ESLINT_DOC.md
# library/library-2025-04-20/ESLINT_DOC.md
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
library/library-2025-04-20/GPT_BESTPRACTICES.md
# library/library-2025-04-20/GPT_BESTPRACTICES.md
# GPT_BESTPRACTICES

## Crawl Summary
The crawled content from https://platform.openai.com/docs/guides/gpt-best-practices returned 0 bytes and contained no extractable technical details. There are no API endpoints, method signatures, or configuration details available in the crawl result.

## Normalised Extract
TABLE OF CONTENTS:
1. API Endpoints
2. Method Signatures
3. Configuration Details

DETAILS:
1. API Endpoints:
   - No API endpoints available in the crawl result.
2. Method Signatures:
   - No SDK method signatures or function definitions available.
3. Configuration Details:
   - No configuration parameters or settings provided.

## Supplementary Details
No supplementary technical specifications, parameter values, or implementation steps could be extracted due to the absence of technical details in the crawl result.

## Reference Details
No complete API specifications, SDK method signatures with parameters and return types, complete code examples, exact implementation patterns, configuration options with values, concrete best practices, or detailed troubleshooting procedures were available in the provided content.

## Original Source
OpenAI Prompting Best Practices
https://platform.openai.com/docs/guides/gpt-best-practices

## Digest of GPT_BESTPRACTICES

# GPT BEST PRACTICES

**Retrieved at:** 2023-10-26

**Crawled Content Details:**
- Data Size: 0 bytes
- Links Found: 0
- Error: None

**Content:**
No technical details were captured from the provided crawl data. There were no API specifications, SDK method signatures, code examples, configuration options, or troubleshooting procedures available in the crawled result.

**Attribution:**
Data crawled from https://platform.openai.com/docs/guides/gpt-best-practices

**Data Size Obtained:** 0 bytes

## Attribution
- Source: OpenAI Prompting Best Practices
- URL: https://platform.openai.com/docs/guides/gpt-best-practices
- License: N/A
- Crawl Date: 2025-04-17T21:24:38.281Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-17
library/library-2025-04-20/GPT_BEST_PRACTICES.md
# library/library-2025-04-20/GPT_BEST_PRACTICES.md
# GPT_BEST_PRACTICES

## Crawl Summary
The crawl for https://platform.openai.com/docs/guides/gpt-best-practices resulted in 0 bytes of data with no extractable technical content. There were no links found and no error reported.

## Normalised Extract
## Table of Contents
1. Overview
2. Implementation Details
3. Configuration Parameters

## 1. Overview
No technical content was captured from the crawl result. 

## 2. Implementation Details
No method signatures, code examples, or implementation steps are available since the crawled data was empty. 

## 3. Configuration Parameters
No configuration options or details were extracted during the crawl.


## Supplementary Details
No supplementary technical specifications or implementation details were retrieved due to the empty content from the crawl result. Developers should refer directly to the source URL for the most up-to-date and complete technical documentation.

## Reference Details
No API specifications, SDK method signatures, full code examples, exact implementation patterns, specific configuration options, concrete best practices, or detailed troubleshooting procedures are available from the crawl result. The crawled data returned 0 bytes, hence no technical references can be provided.

## Original Source
OpenAI Prompting Best Practices
https://platform.openai.com/docs/guides/gpt-best-practices

## Digest of GPT_BEST_PRACTICES

# GPT BEST PRACTICES

**Retrieved:** 2023-10-11
**Source URL:** https://platform.openai.com/docs/guides/gpt-best-practices
**Data Size:** 0 bytes

This document was generated from the crawl result which did not return any technical content. Accordingly, the following sections indicate the absence of extractable technical details.

## Attribution
- Crawled on: 2023-10-11
- Data Size: 0 bytes
- No links or further content available from the crawl result.


## Attribution
- Source: OpenAI Prompting Best Practices
- URL: https://platform.openai.com/docs/guides/gpt-best-practices
- License: N/A
- Crawl Date: 2025-04-17T20:25:47.758Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-17
library/library-2025-04-20/USING_PROMISES.md
# library/library-2025-04-20/USING_PROMISES.md
# USING_PROMISES

## Crawl Summary
The extracted content details JavaScript promises, including using .then() and .catch() for asynchronous operations, chaining for sequence control, error handling patterns, and async/await equivalents. It explains nesting for error scoping, concurrent composition with Promise.all and sequential promise chaining via reduce, along with advanced topics like cancellation, microtasks vs. tasks, and wrapping legacy callback APIs. The content includes precise code examples and API method signatures as provided by MDN.

## Normalised Extract
## Table of Contents
1. Definition and Basic Usage
2. Promise Chaining and Callback Hell
3. Async/Await Pattern
4. Error Handling
5. Nesting and Composition
6. Advanced Topics (Cancellation, Timing, Global Rejection Events, Wrapping Callbacks)

### 1. Definition and Basic Usage
- Promises represent asynchronous operations.
- Use .then() to attach success and failure callbacks.

**Code Example:**

```js
function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.error(`Error generating audio file: ${error}`);
}

createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

### 2. Promise Chaining and Callback Hell
- Chain asynchronous operations using .then().
- Always return promises from callbacks.

**Chained Example:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
  .catch(failureCallback);
```

### 3. Async/Await Pattern
- Use async functions with await to simplify promise management.

**Example:**

```js
async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}
```

### 4. Error Handling
- Use .catch() at the end of the chain.
- With async/await, utilize try/catch blocks.

**Async/Await Error Handling:**

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

### 5. Nesting and Composition
- Nest promises to restrict the catch scope.
- Use Promise.all for concurrent tasks, and reduce chaining for sequential execution.

**Composition Example:**

```js
Promise.all([func1(), func2(), func3()]).then(([result1, result2, result3]) => {
  // use results
});
```

**Sequential using reduce:**

```js
[func1, func2, func3]
  .reduce((p, f) => p.then(f), Promise.resolve())
  .then((result) => {
    // final result
  });
```

### 6. Advanced Topics

- **Cancellation:** Use AbortController to cancel fetch requests.
- **Timing:** .then() callbacks run as microtasks; setTimeout callbacks run as tasks.

**Microtask Example:**

```js
Promise.resolve().then(() => console.log(2));
console.log(1);
```

- **Global Rejection Handling (Browser):** Listen for "unhandledrejection" events.
- **Global Rejection Handling (Node.js):**

```js
process.on("unhandledRejection", (reason, promise) => {
  // inspect reason and promise
});
```

- **Wrapping Callback APIs:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
```


## Supplementary Details
### Supplementary Technical Specifications

- Promise Constructor: new Promise((resolve, reject) => { ... })
  - Parameters: executor function with resolve(value) and reject(reason).
  - Example: 

```js
function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Did something");
      resolve("https://example.com/");
    }, 200);
  });
}
```

- Chaining: The then() method signature
  - then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): Promise

- Async/Await: Mark function with async; await returns the fulfillment value. 

- Configuration Options:
  - For timeouts, setTimeout(ms) is used (e.g., 10 * 1000 for 10 seconds).
  - AbortController can be used to cancel fetch: new AbortController(), passing controller.signal to fetch().

- Best Practices:
  - Always return a promise in a then() callback.
  - Flatten promise chains to avoid nested error handling.
  - Attach a global unhandledRejection handler in Node.js to log all errors.

- Troubleshooting Procedures:
  - If a promise resolution seems to occur out-of-order, inspect microtask vs. task queue using console logs.
  - Use try/catch in async functions to capture errors.
  - Validate that all asynchronous calls return a promise by checking using Promise.resolve().
  - For Node.js, add:

```bash
node -e "process.on('unhandledRejection', (r, p) => console.error(r)); require('./yourScript');"
```

to capture unhandled promise rejections.


## Reference Details
### Complete API Specifications and Implementation Patterns

#### Promise Constructor

- Syntax: 

  new Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => { ... })

- Example:

```js
function doSomething(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Additional operations here
      console.log("Did something");
      resolve("https://example.com/");
    }, 200);
  });
}
```

#### .then() Method

- Signature: 

  promise.then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): Promise

- Usage Example:

```js
const promise = doSomething();
const promise2 = promise.then(
  (result) => {
    // Process result which is a string representing URL
    return fetch(result); // fetch returns a promise
  },
  (error) => {
    console.error(`Error encountered: ${error}`);
    throw error; // rethrow for further catch
  }
);
```

#### .catch() Method

- Signature:

  promise.catch(onRejected: (reason: any) => any): Promise

- Usage Example:

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .catch((error) => {
    console.error(`Caught error: ${error}`);
  });
```

#### Async/Await

- Function Declaration:

```js
async function foo(): Promise<void> {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

#### Configuration and Cancellation

- Using AbortController with fetch:

```js
const controller = new AbortController();
const signal = controller.signal;

fetch('https://example.com/', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', error);
    }
  });

// To cancel the request:
controller.abort();
```

#### Best Practices and Troubleshooting

- Always ensure .then() callbacks return a promise when chaining asynchronous operations.
- Flatten chains to avoid nested callbacks and ambiguous error handling.
- Global Error Handling in Node.js:

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

- Troubleshooting Commands:

  - Running Node.js with verbose unhandled rejection logging:
    
    ```bash
    node --trace-warnings yourScript.js
    ```

  - Validate promise resolution by inserting logging statements immediately after promise creation and in .then() callbacks.

This complete reference provides developers with concrete SDK method signatures, code examples, configuration options, and detailed implementation and troubleshooting steps to effectively use promises in JavaScript.

## Original Source
MDN Web Docs: Using Promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

## Digest of USING_PROMISES

# Using Promises

Retrieved: 2025-04-03

This document extracts the precise technical details regarding the usage of Promises in JavaScript as described on MDN Web Docs. It includes actual code examples, method signatures, exact implementation patterns, configuration details, and complete API specifications.

## Core Promise Concepts

- A Promise is an object representing the eventual completion or failure of an asynchronous operation.
- Instead of passing callbacks directly to a function, the function returns a promise to which callbacks are attached using .then() and .catch().

**Example using call-back to promise conversion:**

```js
function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.error(`Error generating audio file: ${error}`);
}

// Old callback-based API
ncreateAudioFileAsync(audioSettings, successCallback, failureCallback);

// Promise-based API
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

## Promise Chaining & Callback Hell

- Promise chaining provides a solution to callback hell by returning a new promise from then().

**Example of chaining to avoid callback hell:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

- **Important Rule:** Always return a promise from then callbacks. Failure to do so results in a "floating" promise that cannot be tracked.

**Faulty example:**

```js
doSomething()
  .then((url) => {
    // Missing return causes undefined result
    fetch(url);
  })
  .then((result) => {
    // result will be undefined
  });
```

**Corrected example:**

```js
doSomething()
  .then((url) => {
    return fetch(url);
  })
  .then((result) => {
    // result is a Response object
  });
```

## Async/Await Pattern

- The async/await syntax makes asynchronous code look synchronous. Use the `await` keyword to wait for a promise to settle.

**Example converting promise chain to async/await:**

```js
async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}
```

- **Note:** Omission of the `await` keyword leads to type mismatches and runtime errors.

## Error Handling

- Errors in a promise chain are caught using `.catch()`. This works similarly to a try/catch in synchronous code.

**Standard error handling with promises:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
  .catch(failureCallback);
```

- With async/await:

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

## Nesting and Composition

- **Nesting:** Use nested promises to limit the scope of error handling.

```js
doSomethingCritical()
  .then((result) =>
    doSomethingOptional(result)
      .then((optionalResult) => doSomethingExtraNice(optionalResult))
      .catch((e) => {})
  )
  .then(() => moreCriticalStuff())
  .catch((e) => console.error(`Critical failure: ${e.message}`));
```

- **Composition Tools:**
  - Promise.all(): Runs promises concurrently and returns when all are fulfilled or one rejects.
  - Promise.allSettled(), Promise.any(), and Promise.race() offer different patterns for concurrent execution.

**Concurrent execution example:**

```js
Promise.all([func1(), func2(), func3()]).then(([result1, result2, result3]) => {
  // use the results
});
```

- **Sequential Composition using reduce:**

```js
[func1, func2, func3]
  .reduce((p, f) => p.then(f), Promise.resolve())
  .then((result3) => {
    // use result3
  });
```

- **Reusable compose function:**

```js
const applyAsync = (acc, val) => acc.then(val);

const composeAsync = (...funcs) => (x) => funcs.reduce(applyAsync, Promise.resolve(x));

const transformData = composeAsync(func1, func2, func3);
const result3 = transformData(data);
```

## Advanced Topics

### Cancellation

- While Promise API does not include cancellation, you can cancel underlying asynchronous operations using tools like AbortController.

### Timing and Task Queue vs Microtasks

- .then() callbacks are enqueued to a microtask queue, ensuring they run after the current event loop finishes.

**Example demonstrating microtask scheduling:**

```js
Promise.resolve().then(() => console.log(2));
console.log(1);
// Output: 1 then 2
```

**Microtask example with setTimeout:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(0).then(() => console.log(4));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
console.log(1);
// Expected Output: 1, 2, 3, 4
```

### Promise Rejection Events

- Global events: `unhandledrejection` and `rejectionhandled` are used in browsers, and in Node.js use `process.on("unhandledRejection", ...)`.

**Node.js example:**

```js
process.on("unhandledRejection", (reason, promise) => {
  // Examine promise and reason
});
```

### Wrapping Callback APIs

- Promises can be created by wrapping older callback-based APIs using the Promise constructor.

**Example wrapping setTimeout:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(10 * 1000)
  .then(() => saySomething("10 seconds passed"))
  .catch(failureCallback);
```

The executor function is provided with `resolve` (and optionally `reject`), which are called to settle the promise.


## Attribution
- Source: MDN Web Docs: Using Promises
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
- License: CC BY-SA 2.5
- Crawl Date: 2025-04-17T18:27:12.044Z
- Data Size: 4749435 bytes
- Links Found: 47218

## Retrieved
2025-04-17
library/library-2025-04-20/MARKDOWN_IT.md
# library/library-2025-04-20/MARKDOWN_IT.md
# MARKDOWN_IT

## Crawl Summary
The technical details include explicit markdown syntax operations and configuration options for the markdown-it library. This includes support for HTML output, XHTML compliance, line breaks conversion, automatic link detection, typographic enhancements, and code highlighting through language-specific fences. It demonstrates the usage of various markdown constructs like headings, horizontal rules, emphasis, lists, code blocks, tables, and plugins such as emoji, footnotes, and custom containers.

## Normalised Extract
## Table of Contents
1. Configuration Options
2. Markdown Rendering Functions
3. Plugin System
4. Syntax Examples

---

### 1. Configuration Options
- Available options include:
  - html: boolean (default often true) to enable HTML tags in source.
  - xhtmlOut: boolean to generate self-closing tags.
  - breaks: boolean (default false) to convert newlines to `<br>`.
  - linkify: boolean to auto-detect links.
  - typographer: boolean to enable smart punctuation transformations.
  - highlight: function(code, lang) for syntax highlighting, example provided below.

### 2. Markdown Rendering Functions
- Initialization:

```js
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({
  html: true,          // Enable HTML tags in source
  xhtmlOut: false,     // Use '/' to close single tags in XHTML mode
  breaks: false,       // Convert '\n' in paragraphs into <br>
  linkify: true,       // Autoconvert URL-like text to links
  typographer: true,   // Enable smart quotes and placeholder substitutions
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }
});
```

- Rendering a markdown string:

```js
var result = md.render('# Markdown-It Demo\n\nSome **bold** text and a code block.');
console.log(result);
```

### 3. Plugin System
- Plugins can be integrated to extend markdown features. For instance:

```js
// Emoji plugin
var emoji = require('markdown-it-emoji');
md.use(emoji);

// Footnote plugin
var footnote = require('markdown-it-footnote');
md.use(footnote);
```

- Each plugin may introduce additional syntax such as :wink:, footnote markers ([^1]), and custom containers using ::: syntax.

### 4. Syntax Examples
- **Inline code:** `code` using backticks.
- **Indented code blocks:** Prefixed with four spaces.
- **Fenced code blocks:** Using triple backticks with language hint (e.g. ```js). 
- **Tables:** Defined with pipe separators and optional alignment markers.
- **Links & Images:** Use markdown syntax for hyperlinks and image embedding with footnote references.


## Supplementary Details
### Technical Specifications & Implementation Details

1. Configuration Options:
   - html: true | false (default: true)
   - xhtmlOut: true | false (default: false)
   - breaks: true | false (default: false)
   - linkify: true | false (default: false, enable to auto-convert URLs)
   - typographer: true | false (default: false, when true, converts quotes and symbols)
   - highlight: Function with signature (code: string, lang: string): string

2. Rendering Process:
   - Initialize markdown-it instance with configuration options.
   - Use `md.render(input: string): string` to convert markdown to HTML.
   - For inline rendering, use `md.renderInline(input: string): string`.
   - Plugins are integrated using `md.use(plugin[, options])`.

3. Sample Implementation Steps:
   a. Import markdown-it module.
   b. Create an instance with desired configuration.
   c. Optionally register plugins for emoji, footnotes, substitutions, etc.
   d. Render markdown input using provided methods.

4. Code Example with Comments:
```js
// Import markdown-it
var MarkdownIt = require('markdown-it');

// Initialize with options
var md = new MarkdownIt({
  html: true,          // Allow HTML tags
  xhtmlOut: false,     // Disable XHTML output style
  breaks: false,       // Do not convert\n to <br>
  linkify: true,       // Automatically detect links
  typographer: true,   // Enable typographic enhancements
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // Fallback for non-highlighted code
  }
});

// Use plugins if needed
var emoji = require('markdown-it-emoji');
md.use(emoji);

// Render markdown to HTML
var result = md.render('# Hello World\n\nThis is a **demo** for markdown-it.');
console.log(result);
```


## Reference Details
### Complete API Specifications and Usage Examples

#### markdown-it Constructor

- Signature:
  - new MarkdownIt(options?: {
      html?: boolean,       // Enable/disable HTML tags in source (default: true)
      xhtmlOut?: boolean,   // Whether to close single tags with '/>' in XHTML mode (default: false)
      breaks?: boolean,     // Convert '\n' in paragraphs into <br> (default: false)
      linkify?: boolean,    // Autodetect URL-like texts and convert to links (default: false)
      typographer?: boolean,// Enable smart quotes and other replacements (default: false)
      highlight?: (str: string, lang: string) => string
    })

- Returns: instance of MarkdownIt with methods:

  - render(markdownString: string): string
    - Description: Converts a markdown string into HTML.
    - Example:
    ```js
    var md = new MarkdownIt({html: true});
    var html = md.render('# Title\nSome **bold** text.');
    console.log(html);
    ```

  - renderInline(markdownString: string): string
    - Description: Renders markdown inline without wrapping block tags.

  - use(plugin: Function, ...options): MarkdownIt
    - Description: Registers a plugin to extend functionality.
    - Example:
    ```js
    var md = new MarkdownIt();
    md.use(require('markdown-it-footnote'));
    var output = md.render('Footnote reference[^1]\n\n[^1]: Footnote text.');
    console.log(output);
    ```

#### Plugin Examples

- Emoji Plugin
  - Installation: `npm install markdown-it-emoji`
  - Usage:
    ```js
    var md = new MarkdownIt();
    md.use(require('markdown-it-emoji'));
    var result = md.render('I am happy :smile:');
    console.log(result);
    ```

- Footnote Plugin
  - Installation: `npm install markdown-it-footnote`
  - Usage:
    ```js
    var md = new MarkdownIt();
    md.use(require('markdown-it-footnote'));
    var result = md.render('Footnote reference[^1]\n\n[^1]: This is the footnote.');
    console.log(result);
    ```

#### Best Practices & Troubleshooting

- Always validate your markdown input before rendering to avoid injection issues when html option is enabled.
- For syntax highlighting, ensure the language is supported by the highlighter (e.g., highlight.js) used in the highlight callback function.
- If auto-linking is not working, verify that the linkify option is set to true.
- In case of plugin conflicts, load plugins in the recommended order as specified in the plugin documentation.

#### Detailed Command Examples

- To install markdown-it and plugins:
  ```bash
  npm install markdown-it markdown-it-emoji markdown-it-footnote highlight.js
  ```

- To run a sample script:
  ```bash
  node yourMarkdownDemo.js
  ```

This documentation provides developers with immediate, concrete examples and detailed API specifications to effectively implement markdown-it in their projects.

## Original Source
Markdown-it Documentation
https://markdown-it.github.io/

## Digest of MARKDOWN_IT

# Markdown-It Documentation Extract

**Retrieved:** 2023-10-06

**Data Size:** 29790 bytes

**Content Overview:**

The extracted content covers a live demonstration of the markdown-it library. It includes explicit sections on headings, horizontal rules, typographic replacements, emphasis, blockquotes, lists, code blocks, syntax highlighting, tables, links, images, and plugins for extended markdown syntax support.

## Headings

- H1: `# h1 Heading 8-)`
- H2: `## h2 Heading`
- H3: `### h3 Heading`
- H4: `#### h4 Heading`
- H5: `##### h5 Heading`
- H6: `###### h6 Heading`

## Horizontal Rules

- Use of `___`, `---`, and `***` to create horizontal rules.

## Typographic Replacements

- Replacement symbols: (c), (C), (r), (R), (tm), (TM), (p), (P) and sequences like test.., test... etc.
- Smart quotes conversion: "double quotes" and 'single quotes'.

## Emphasis

- Bold: `**This is bold text**` and `__This is bold text__`
- Italics: `*This is italic text*` and `_This is italic text_`
- Strikethrough: `~~Strikethrough~~`

## Blockquotes

- Standard blockquote usage with `>` characters. Nested blockquotes using multiple `>`.

## Lists

- Unordered lists using `+`, `-`, or `*` with sub-lists indented with two spaces.
- Ordered lists with numbered items and different starting offsets.

## Code Blocks

- Inline code: `` `code` ``
- Indented code blocks:

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

- Fenced code blocks using triple backticks with language specification for syntax highlighting.

### Example:
```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

- Basic table syntax with headers and alignment options.

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | template processing engine (default: Handlebars). |
| ext    | file extension for destination files. |

- Right aligned columns example provided with `| ------: | -----------:|`.

## Links & Images

- Link syntax: `[link text](http://dev.nodeca.com)` and with title.
- Autoconversion of plain URLs when linkify is enabled.
- Image embedding using `![Alt text](URL)` and footnote style references.

## Plugins

Markdown-It supports extended plugins to handle additional markdown syntax:

- **Emoji:** Syntax like `:wink:`, with shortcuts like `:-)`.
- **Subscript/Superscript:** e.g. `19^th^` and `H~2~O`.
- **Ins and Mark:** `++Inserted text++` for ins and `==Marked text==` for mark.
- **Footnotes:** Detailed footnote support with definitions and multiple paragraphs.
- **Definition Lists and Abbreviations:** Support for complex list definitions and abbreviation resolutions.
- **Custom Containers:** For warning blocks and similar containerized content.

---

__Advertisement:__

- [pica](https://nodeca.github.io/pica/demo/) - high quality and fast image resize in browser.
- [babelfish](https://github.com/nodeca/babelfish/) - developer friendly i18n support.


## Attribution
- Source: Markdown-it Documentation
- URL: https://markdown-it.github.io/
- License: MIT License
- Crawl Date: 2025-04-17T16:26:43.337Z
- Data Size: 29790 bytes
- Links Found: 4

## Retrieved
2025-04-17
library/library-2025-04-20/GITHUB_CLI.md
# library/library-2025-04-20/GITHUB_CLI.md
# GITHUB_CLI

## Crawl Summary
The GitHub CLI documentation details commands for installation, configuration, core functions (issues, PRs, repositories), GitHub Enterprise authentication, API interactions, alias management, and attestation procedures. It includes command-line examples with exact flags such as --method, --header, -f/--raw-field, and provides best practices for verbose output and alias clobbering for troubleshooting.

## Normalised Extract
Table of Contents:
1. Installation
   - Command: `brew install gh` for macOS; Download links for Windows and Linux.
2. Configuration
   - Authentication: `gh auth login` or use GITHUB_TOKEN
   - Editor setting: `gh config set editor <editor>`
   - Alias declaration: `gh alias set <alias> <expansion>`
3. GitHub Enterprise
   - Command: `gh auth login --hostname <hostname>`, set GH_HOST and GH_ENTERPRISE_TOKEN
4. Core Commands
   - Issues: `gh issue list`, `gh issue create`
   - Pull Requests: `gh pr status`, `gh pr checkout <id>`, `gh pr create`
   - Releases: `gh release create <tag>`
   - Repository: `gh repo view`, `gh repo clone <repo>`
5. Additional Commands
   - Alias management: `gh alias list`, `gh alias set`, `gh alias delete`, `gh alias import`
   - API command: `gh api <endpoint> [flags]` with detailed flags such as `-f`, `-F`, `--method`, `--paginate`, `--template`
6. Attestation Commands (Preview)
   - Download: `gh attestation download [file-path|oci://...]`
   - Trusted Root: `gh attestation trusted-root [--tuf-url <url> --tuf-root <file-path>] [--verify-only]`
   - Verify: `gh attestation verify [file-path|oci://...] [--owner|--repo]`

Each section includes exact command syntax, flags, environment variable requirements, and example outputs (e.g., branch switching details in `gh pr checkout`).

## Supplementary Details
Technical Specifications:
- Installation: Use system-specific commands (brew, download links) with no additional parameters required.
- Authentication: Requires either `gh auth login` or environment variable GITHUB_TOKEN. For GitHub Enterprise, must use `--hostname` flag and set GH_HOST/ GH_ENTERPRISE_TOKEN.
- Command Flags:
  - For API commands: `--method` (string, default GET) controls the HTTP method. Use `-f/--raw-field` for static string parameters. 
  - For alias commands: `--clobber` to overwrite existing aliases; `--shell` to indicate shell command processing.
  - For attestation commands:
     - `--digest-alg`: string, defaults to "sha256". 
     - `--limit`: integer, default 30.
     - `--hostname` for specifying a custom host.
- Troubleshooting Steps:
  1. Use `--verbose` flag with API commands to get detailed HTTP request/response.
  2. Check environment variables if authentication fails.
  3. Use `--clobber` when re-importing alias definitions.
  4. For pagination issues, combine `--paginate` and `--slurp`.
- Best Practices:
  - Always check the output of `gh alias list` after setting aliases.
  - Validate API responses using the `--jq` flag with a proper jq query.
  - In shell scripts, use the explicit commands (e.g., `gh pr checkout <id>`) to avoid context issues.

## Reference Details
API Specifications & Command Details:

1. gh auth
   - Signature: `gh auth login [flags]`
   - Flags: --hostname <string>
   - Return: Initiates authentication process

2. gh config
   - Set editor: `gh config set editor <editor>`
   - No return value; sets configuration

3. gh alias set
   - Signature: `gh alias set <alias> <expansion> [flags]`
   - Options:
     --clobber : Overwrite existing alias
     --shell (-s): Treat expansion as shell command
   - Example:
     # Set alias for pull request view
     $ gh alias set pv 'pr view'
     $ gh pv -w 123  # Executes 'gh pr view -w 123'

4. gh alias delete
   - Signature: `gh alias delete {<alias>|--all} [flags]`
   - Option: --all deletes all aliases

5. gh api
   - Signature: `gh api <endpoint> [flags]`
   - Parameters:
     - <endpoint>: e.g., repos/{owner}/{repo}/releases
     - Flags:
         --method <string> (Default: GET)
         -f/--raw-field <key=value>: Add static string parameter
         -F/--field <key=value>: Add typed parameter with auto type-conversion
         --header <key:value>: Add HTTP header
         --paginate: Retrieve paginated results
         --input <file>: Body read from file or stdin
         --jq <string>: Filter response using jq
         --template <string>: Format output using Go templates
         --verbose: Include full HTTP request/response details
   - Example:
     # List releases
     $ gh api repos/{owner}/{repo}/releases

6. gh attestation download
   - Signature: `gh attestation download [<file-path> | oci://<image-uri>] [--owner | --repo] [flags]`
   - Options:
         -d, --digest-alg <string> (default "sha256")
         -L, --limit <int> (default 30)
         -o, --owner <string>
         -R, --repo <string> (Format: <owner>/<repo>)
   - Example:
     $ gh attestation download example.bin -R github/example

7. gh attestation trusted-root
   - Signature: `gh attestation trusted-root [--tuf-url <url> --tuf-root <file-path>] [--verify-only] [flags]`
   - Use: Outputs trusted_root.jsonl contents for offline verification
   - Example:
     $ gh attestation trusted-root

8. gh attestation verify
   - Signature: `gh attestation verify [<file-path> | oci://<image-uri>] [--owner | --repo] [flags]`
   - Validates the artifact's attestations against certificate details and workflow identity
   - Example:
     $ gh attestation verify example.bin --owner github

Troubleshooting:
- For authentication errors, confirm that environment variables (GITHUB_TOKEN, GH_HOST) are properly exported.
- In API command failures, run with `--verbose` to inspect header and payload details.
- When aliases do not work as expected, run `gh alias list` to review definitions and use `--clobber` with `gh alias set` to update.
- Use shell redirection and `--input` flag for reading complex JSON payloads when posting data.

Full Code Example for Setting an Alias:
--------------------------------------------------
# On Bash (Linux/Mac):
$ gh alias set pv 'pr view'
# Test the alias:
$ gh pv -w 123  
--------------------------------------------------

These detailed API specifications and command samples provide a complete technical reference for developers using GitHub CLI.

## Original Source
GitHub CLI Documentation
https://cli.github.com/manual/

## Digest of GITHUB_CLI

# GitHub CLI Manual Details (Retrieved: 2023-10-06)

## Installation
- Use Homebrew on Mac: `brew install gh`
- Download executable for Mac or Windows
- Install for Linux via package repository
- Refer to the README for full installation instructions

## Configuration
- Authenticate by running: `gh auth login`
  - Alternatively, set environment variable: `GITHUB_TOKEN`
- Set the preferred editor: `gh config set editor <editor>`
- Declare command aliases: `gh alias set <alias> <expansion>`

## GitHub Enterprise Configuration
- Authenticate with a GitHub Enterprise server:
  - Command: `gh auth login --hostname <hostname>`
- Set default host: `export GH_HOST=<hostname>`
- For scripting/automation, set: `export GH_ENTERPRISE_TOKEN=<access-token>`

## Core Commands
- Examples:
  - List issues: `gh issue list`
  - View repo: `gh repo view`
  - Checkout a pull request: `gh pr checkout <id>`
  - Create a PR: `gh pr create`
  - Check PR status: `gh pr status`
  - Create a release: `gh release create <tag>`
  - Set alias: `gh alias set bugs 'issue list --label="bugs"'`

## GitHub Actions Commands
- Cache command: `gh cache`
- Run command: `gh run`
- Workflow command: `gh workflow`

## Additional Commands
- Aliases, API, Codespace, Gist, and more:
  - For alias management:
    - List: `gh alias list` or `gh alias ls`
    - Delete: `gh alias delete {<alias>|--all}`
    - Import: `gh alias import [<filename>|-] [--clobber]`
    - Set: `gh alias set <alias> <expansion> [--shell] [--clobber]`

## Options & Flags
- Global flag: `--version` displays current version
- In commands like `gh api`, various options include:
  - `--method <string>` (default "GET")
  - `-f/--raw-field <key=value>` for string parameters
  - `-F/--field <key=value>` for typed parameters (converts true, false, null, integers)
  - `--header <key:value>` to add a HTTP header
  - `--paginate` to fetch all pages if paginated results exist
  - `--template <string>` for formatting output
  - `--verbose` to include full HTTP request/response

## Command Examples and Use Cases
### Issue Commands
- Create an issue: `$ gh issue create`

### Repository Commands
- Clone a repository: `$ gh repo clone cli/cli`

### Pull Request Commands
- Checkout PR (e.g., `gh pr checkout 12`):
  - Displays progress output with object counting and branch switching details

### API Commands
- Making a call: `$ gh api repos/{owner}/{repo}/releases`
- Post an comment: `$ gh api repos/{owner}/{repo}/issues/123/comments -f body='Hi from CLI'`
- Use GraphQL endpoint: `$ gh api graphql -F owner='{owner}' -F name='{repo}' -f query='<graphql query>'`

## Aliases Details
- Set alias example: 
  - `$ gh alias set pv 'pr view'` then use with `$ gh pv -w 123`
- Example with shell: 
  - `$ gh alias set --shell igrep 'gh issue list --label="$1" | grep "$2"'`

## Attestation Commands (Preview)
### Download Attestation
- Usage: `gh attestation download [<file-path> | oci://<image-uri>] [--owner|--repo]`
- Options:
  - `-d, --digest-alg <string>` (default "sha256")
  - `-L, --limit <int>` (default 30)

### Trusted Root
- Command: `gh attestation trusted-root [--tuf-url <url> --tuf-root <file-path>] [--verify-only]`

### Verify Attestation
- Command: `gh attestation verify [<file-path> | oci://<image-uri>] [--owner|--repo]`
- Ensures artifact provenance by validating the certificate, subject alternative names, and workflow identity.

## Troubleshooting and Best Practices
- Ensure correct environment variables (`GITHUB_TOKEN`, `GH_HOST`, `GH_ENTERPRISE_TOKEN`) are set.
- Use `--clobber` flag if re-importing or resetting aliases to avoid duplication.
- Use verbose mode (`--verbose`) on API commands to debug HTTP request issues.
- For pagination issues with `gh api`, use `--paginate` together with `--slurp` to collate multiple arrays.
  
## Attribution
- Crawled Data Size: 1227914 bytes
- Retrieved from: https://cli.github.com/manual/
- Links Found: 45187

## Attribution
- Source: GitHub CLI Documentation
- URL: https://cli.github.com/manual/
- License: MIT License
- Crawl Date: 2025-04-17T14:25:50.309Z
- Data Size: 1227914 bytes
- Links Found: 45187

## Retrieved
2025-04-17
library/library-2025-04-20/PRETTIER.md
# library/library-2025-04-20/PRETTIER.md
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
library/library-2025-04-20/VITEST.md
# library/library-2025-04-20/VITEST.md
# VITEST

## Crawl Summary
Vitest documentation details provide the exact installation commands, code examples for writing tests, complete configuration options (in vitest.config.ts and vite.config.ts), CLI commands and flags, environment settings (node, jsdom, happy-dom), dependency resolution options including external and inline handling, and workspaces support. The documentation includes full code samples, configuration parameter defaults, and detailed instructions to merge Vite and Vitest configurations.

## Normalised Extract
## Table of Contents
1. Installation
2. Writing Tests
3. Configuration
4. Command Line Interface
5. Environment & Integration
6. Dependency Optimization & Server Options
7. Workspaces Support
8. Troubleshooting & Best Practices

---

### 1. Installation
- Install using:
  - npm: `npm install -D vitest`
  - yarn: `yarn add -D vitest`
  - pnpm: `pnpm add -D vitest`
  - bun: `bun add -D vitest`

### 2. Writing Tests
- Create a sum.js:
```js
export function sum(a, b) {
  return a + b;
}
```
- Create a test file, sum.test.js:
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
- Add test script in package.json:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### 3. Configuration
- Create a `vitest.config.ts` file:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**']
  },
});
```

- Use triple-slash directives in your config for proper type definitions:
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... options
  },
});
```

- Merge Vite and Vitest configurations:
```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ... test specific options
  },
}));
```

### 4. Command Line Interface
- Run tests: `vitest`
- Run tests once: `vitest run`
- Run coverage: `vitest run --coverage`
- CLI options include `--config`, `--port`, `--https`, `--watch`, and `--update`.

### 5. Environment & Integration
- Set test environment via `environment` (e.g. 'node', 'jsdom', 'happy-dom').
- Use docblock comments for file-specific environments:
```js
/**
 * @vitest-environment jsdom
 */
```

### 6. Dependency Optimization & Server Options
- Configuration parameters:
  - `server.deps.external`: Default: [/\/node_modules\//]
  - `server.deps.inline`: Can be an array or true (for all).
  - `server.deps.fallbackCJS`: Default: false
  - Options for sourcemap: `server.sourcemap` (default: 'inline')

### 7. Workspaces Support
- Define multiple workspace configurations in `vitest.workspace.ts`:
```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
]);
```

### 8. Troubleshooting & Best Practices
- For Bun users, ensure to use `bun run test`.
- Enable `deps.interopDefault` if you encounter issues with CommonJS modules.
- Use merging configuration techniques when using separate Vite and Vitest files.
- Run CLI commands with `--update` to refresh snapshots and `--watch` for continuous testing.


## Supplementary Details
### Supplementary Technical Specifications

1. **Installation Requirements**
   - Vite: >= v5.0.0
   - Node: >= v18.0.0

2. **Configuration Options** (in vitest.config.*):
   - `test.include`: string[]; Default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
   - `test.exclude`: string[]; Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
   - `test.globals`: boolean; Default: false
   - `test.environment`: string; Default: 'node'
   - `server.sourcemap`: 'inline' | boolean; Default: 'inline'
   - `server.deps`: Object containing `external`, `inline`, `fallbackCJS`, `cacheDir` etc.
   - `deps.optimizer`: Configuration for dependency bundling (includes options for ssr and web modes).

3. **CLI Options**
   - `--config <path>`: to specify an alternative config file
   - `--watch`: enable watch mode
   - `--update`: update snapshots
   - `--coverage`: run tests with coverage reporting

4. **Best Practices**
   - Use the same configuration file for both Vite and Vitest when possible to avoid duplication.
   - When using separate configurations, merge them via `mergeConfig` to avoid conflicts.
   - For type safety, always include triple slash type directives in configuration files.
   - Use environment-specific configuration blocks by leveraging `process.env.VITEST` and conditional definitions in `defineConfig`.

5. **Troubleshooting Procedures**
   - If tests fail to run, verify that all required dependencies are installed and that Vitest is correctly linked in the project.
   - For dependency errors with CJS modules, check the `deps.interopDefault` setting.
   - Run `npx vitest --help` for a full list of CLI options and verify command syntax.
   - If configuration conflicts arise between Vitest and Vite, try consolidating options in a single file.


## Reference Details
### Complete API Specifications & Implementation Patterns

#### 1. SDK Method Signatures & Examples

- **defineConfig (from 'vitest/config')**

  Signature:
  ```ts
  function defineConfig<T = UserConfigExport>(config: T | (() => T)): T;
  ```

  **Example:**
  ```ts
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**'],
    },
  });
  ```

- **mergeConfig (from 'vitest/config')**

  Signature:
  ```ts
  function mergeConfig<T>(baseConfig: T, overrideConfig: T): T;
  ```

  **Example:**
  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config';
  import viteConfig from './vite.config.mjs';

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      exclude: ['packages/template/*'],
    },
  }));
  ```

#### 2. CLI Commands & Flags

- **Command Examples:**

  Running tests:
  ```bash
  npx vitest
  ```

  Running tests once:
  ```bash
  npx vitest run
  ```

  Running tests with coverage:
  ```bash
  npx vitest run --coverage
  ```

  Running with custom config:
  ```bash
  npx vitest --config ./path/to/vitest.config.ts
  ```

#### 3. Configuration Options with Types & Defaults

- **test.include**: string[] 
  - Default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']

- **test.exclude**: string[] 
  - Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']

- **test.globals**: boolean 
  - Default: false

- **test.environment**: string 
  - Default: 'node'

- **server.sourcemap**: 'inline' | boolean 
  - Default: 'inline'

- **server.deps.external**: (string | RegExp)[] 
  - Default: [/\/node_modules\//]

- **server.deps.inline**: (string | RegExp)[] | true 
  - Default: []

- **deps.optimizer**: object with properties for both `ssr` and `web` modes, including flags such as `enabled` (boolean) and arrays for `include` and `exclude`.

#### 4. Error Handling & Troubleshooting

- If you receive errors like "Named export not found" from CommonJS modules, enable `deps.interopDefault: true` in your config.

- Use the following troubleshooting command to print available CLI options:
  ```bash
  npx vitest --help
  ```

- For snapshot issues, run with:
  ```bash
  npx vitest --update
  ```

#### 5. Best Practices Implementation Example

Combine configuration for both Vite and Vitest:

```ts
/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.ts'],
    exclude: ['node_modules'],
    reporters: 'default',
    update: false,
    watch: false,
  },
}));
```

This file demonstrates use of type directives, merging of configurations, and explicit CLI behavior overrides.


## Original Source
Vitest Documentation
https://vitest.dev

## Digest of VITEST

# Vitest Documentation Digest - Retrieved on 2023-10-12

## Overview
Vitest is a Vite-native, next generation testing framework that supports ESM, TypeScript, JSX and is fully integrated with Vite’s configuration and plugins. It includes features like smart watch mode, Jest-compatible assertions, snapshot testing, and coverage.

## Installation

- npm: `npm install -D vitest`
- yarn: `yarn add -D vitest`
- pnpm: `pnpm add -D vitest`
- bun: `bun add -D vitest`

*Note:* Vitest requires Vite >= v5.0.0 and Node >= v18.0.0.

## Writing Tests

Example of a simple addition function:

**sum.js**
```js
export function sum(a, b) {
  return a + b;
}
```

**sum.test.js**
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Update your package.json to include:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

## Configuring Vitest

Vitest can be configured via a dedicated `vitest.config.ts` file or within your Vite config using the `test` property. Examples include:

**vitest.config.ts**
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Specify test options here
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**']
  },
});
```

**vite.config.ts**
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... Specify test options here
  },
});
```

There is also support for merging Vite and Vitest configurations using `mergeConfig`:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ... Additional test configuration
  },
}));
```

## Command Line Interface

- Run tests once: `vitest run`
- Watch mode: `vitest` (auto-reruns affected tests like HMR)
- Coverage: `vitest run --coverage`
- CLI options include flags like `--config`, `--port`, `--https`, and more.

Default scripts in package.json:

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

## Environment & Integration

- **Environments:** Configure using the `environment` option (e.g., `node`, `jsdom`, `happy-dom`, `edge-runtime`).
- **Triple-slash directives:** e.g., `/// <reference types="vitest" />` or `/// <reference types="vitest/config" />` for proper type definitions.
- Custom environment can be defined by creating a module that exports an `Environment` object.

## Dependency Optimization & Server Options

Vitest uses Vite's dependency handling:

- **server.deps.external:** Array to externalize modules (default: [/\/node_modules\//]).
- **server.deps.inline:** Specify modules to be inlined (or set to true for all).
- **server.deps.fallbackCJS:** Convert ESM packages to CommonJS if needed.

Additional options include settings for sourcemaps, debugging, cache directories, and asset transformation.

## Workspaces Support

Vitest supports multi-workspace configuration using a `vitest.workspace.ts` file. Example:

```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
]);
```

## Troubleshooting & Best Practices

- When using Bun, use `bun run test` instead of `bun test`.
- For dependencies issues with CommonJS modules, enable `deps.interopDefault` to interpret defaults correctly.
- Verify that configuration in Vitest and Vite align if using separate config files; use `mergeConfig` to combine them.
- Use explicit CLI flags (e.g. `--update`, `--watch`) to control snapshot updates and test watching behavior.


## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev
- License: MIT License
- Crawl Date: 2025-04-17T15:26:06.936Z
- Data Size: 41837296 bytes
- Links Found: 26309

## Retrieved
2025-04-17
