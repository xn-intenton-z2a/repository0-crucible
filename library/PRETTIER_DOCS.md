# PRETTIER_DOCS

## Crawl Summary
Prettier is an opinionated code formatter that supports various languages including JavaScript, JSX, Angular, Vue, and more. It works by parsing code to an AST and reprinting it with a uniform style that respects a maximum line length, reformatting function calls and objects as needed. It supports configuration options like --trailing-comma (default: all), new options in v3.5 such as --objectWrap and --experimental-operator-position, and includes CLI flags for caching (--cache, --cache-location). It integrates easily with editors and pre-commit hooks, and its updates are documented in detailed release notes.

## Normalised Extract
TABLE OF CONTENTS:
1. Features and Supported Languages
2. Formatting Engine and Code Reprinting Logic
3. Configuration Options and Flags
4. Editor & Plugin Integration
5. Performance and CLI Details
6. Release Notes

DETAILS:
1. Features and Supported Languages:
   - Supported Languages: JavaScript (including experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS (Less/SCSS), HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM, MDX v1), YAML.

2. Formatting Engine and Code Reprinting Logic:
   - Converts source code into an AST.
   - Discards consistent styling from source and reprints code using its own rules including maximum line length handling.
   - Example: 
     • Single-line remains unchanged (e.g. `foo(arg1, arg2, arg3, arg4);`), while long argument lists are split into multiple lines with proper indentation.

3. Configuration Options and Flags:
   - --trailing-comma: Controls trailing commas (values: none, es5, all; default: all).
   - --objectWrap: New option in v3.5 to wrap objects based on parameter count.
   - --experimental-operator-position: Experimental flag (v3.5) for operator positioning.
   - --cache and --cache-location: Enable caching and specify the cache directory.

4. Editor & Plugin Integration:
   - Integrates with VSCode (`prettier-vscode`), Sublime Text (`JsPrettier`), Vim (`vim-prettier`), Emacs (`prettier-js`), etc.
   - Can be executed automatically on file save or via pre-commit hooks with tools like Husky.

5. Performance and CLI Details:
   - Optimized command line interface capable of formatting large codebases in under 13 seconds.
   - Key CLI commands include formatting on save (`--write`) and checking files (`--check`).

6. Release Notes:
   - Detailed chronological release notes from versions 2.8 up to 3.5, specifying bug fixes, performance improvements, and new feature integrations like ECMAScript Modules migration and experimental formatting options.


## Supplementary Details
Technical Specifications and Implementation Details:
- Maximum line length can be configured; Prettier automatically reflows code based on this parameter.
- Detailed configuration options:
   • --trailing-comma: Accepts values 'none', 'es5', or 'all'; default is 'all' for new projects.
   • --objectWrap (v3.5): When enabled, wraps object literals across multiple lines if they exceed a certain threshold.
   • --experimental-operator-position (v3.5): Adjusts binary operator positioning; still experimental.
   • --cache: Enables caching to speed up repeated formatting; used with --cache-location to define the cache directory.
- Editor integrations include specific plugins for VSCode, Sublime Text, Vim, and Emacs, ensuring automatic formatting on save.
- Pre-commit hook implementation example using Husky provided for CI/CD pipelines.
- Sample command usage for formatting files:
   > prettier --write "src/**/*.{js,jsx,ts,tsx}"


## Reference Details
API Specifications, SDK Method Signatures, and Code Examples:

1. CLI API and Options:
   • Command Syntax: `prettier [options] [file/glob ...]`
   • Options:
       --write               : Writes formatted output back to the file.
       --check               : Checks if files are already formatted.
       --config <path>       : Specifies a path to the configuration file (.prettierrc).
       --cache               : Enables caching of formatted files.
       --cache-location <path>: Specifies the cache directory.
       --trailing-comma <none|es5|all> : Sets trailing comma policy. Default: all.
       --objectWrap          : Enables object wrapping (introduced in v3.5).
       --experimental-operator-position : Enables experimental operator positioning (v3.5).

2. Programmatic Usage Example (Node.js):
   ```js
   const prettier = require('prettier');

   const options = {
     parser: 'babel',                    // Choose the correct parser for your language
     trailingComma: 'all',               // Apply trailing commas where valid
     printWidth: 80,                     // Maximum line width
     objectWrap: true,                   // Enable object wrapping (v3.5)
     experimentalOperatorPosition: true, // Enable experimental operator positioning (v3.5)
   };

   const sourceCode = "function test(){console.log('Hello, World!');}";
   const formattedCode = prettier.format(sourceCode, options);
   console.log(formattedCode);
   ```

3. Pre-commit Hook Implementation (Using Husky):
   - Install Husky and add the following to your package.json:
     ```json
     {
       "husky": {
         "hooks": {
           "pre-commit": "prettier --write ."
         }
       }
     }
     ```

4. Configuration File Example (.prettierrc):
   ```json
   {
     "printWidth": 80,
     "tabWidth": 2,
     "useTabs": false,
     "semi": true,
     "singleQuote": true,
     "trailingComma": "all",
     "bracketSpacing": true,
     "jsxBracketSameLine": false,
     "objectWrap": true,
     "experimentalOperatorPosition": true
   }
   ```

5. Troubleshooting Procedures:
   - To locate your configuration file:
     Command: `prettier --find-config-path <file>`
     Expected Output: Path to the configuration file or null if not found.
   - To debug formatting issues, run with increased logging:
     Command: `prettier --loglevel debug [file]`
   - Verify editor plugin versions match the installed Prettier version if formatting on save fails.

6. Best Practices:
   - Always format code on save to maintain consistency.
   - Integrate Prettier into CI pipelines using the `--check` option to enforce code style.
   - Regularly update your .prettierrc configuration to reflect new options introduced in releases.


## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER_DOCS

## Prettier Documentation

**Retrieved Date:** 2023-10-07

### Overview
Prettier is an opinionated code formatter that supports multiple programming languages including JavaScript (and experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS (Less/SCSS), HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM, MDX v1), and YAML. It reformats code by parsing it into its Abstract Syntax Tree (AST), removing original styling (with practical exceptions like empty lines and multi-line objects), and reprinting the code according to its own rules, such as maximum line length and proper wrapping.

### Code Formatting Examples

- **Single-line Code:**

  ```js
  foo(arg1, arg2, arg3, arg4);
  ```

- **Multi-line Code (when arguments exceed the line length):**

  ```js
  foo(
    reallyLongArg(),
    omgSoManyParameters(),
    IShouldRefactorThis(),
    isThereSeriouslyAnotherOne(),
  );
  ```

### Prettier Behavior

- Parses source code to an AST, discards unneeded original formatting, and reprints the code in a consistent style.
- Adjusts formatting dynamically based on maximum line length and available configuration options.

### Release & Change Log Highlights

- **Prettier 3.5:**
  - New `objectWrap` option.
  - New experimental `experimentalOperatorPosition` option.
  - Support for TypeScript configuration file.

- **Prettier 3.1:**
  - Introduction of an experimental ternary formatting mode (`--experimental-ternaries`).
  - Added support for Angular control flow syntax.

- **Prettier 3.0:**
  - Migration to ECMAScript Modules for source code.
  - Change in markdown formatting: no spaces inserted between Latin characters and CJK characters.
  - Updated default value of `trailingComma` to "all".

### Attribution
Crawled from: https://prettier.io/docs/en/index.html
Data Size: 1931056 bytes, Links Found: 3373


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: Unknown
- Crawl Date: 2025-04-20T20:47:23.467Z
- Data Size: 1931056 bytes
- Links Found: 3373

## Retrieved
2025-04-20
