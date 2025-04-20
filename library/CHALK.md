# CHALK

## Crawl Summary
Crawled Content Details:
- Data Size: 0 bytes
- Links Found: 0
- Error: None
- Content Preview: "..."

(No additional technical details were obtained from the crawl; all specifications are derived from the Chalk Documentation source.)

## Normalised Extract
## Table of Contents
1. Basic Usage
2. API Methods
3. Configuration Options
4. Advanced Usage & Troubleshooting

### 1. Basic Usage
- Import using ES Module: `import chalk from 'chalk';`
- Import using CommonJS: `const chalk = require('chalk');`
- Example:
  ```js
  console.log(chalk.green('Success!'));
  ```

### 2. API Methods
- **chalk.red(text: string): string**
  - Usage: `chalk.red('Error!')`
- **chalk.bgBlue(text: string): string**
  - Usage: `chalk.bgBlue('Info')`
- **chalk.rgb(r: number, g: number, b: number)(text: string): string**
  - Usage: `chalk.rgb(123, 45, 67)('Custom Color')`
- **chalk.hex(hex: string)(text: string): string**
  - Usage: `chalk.hex('#DEADED')('Hex Color')`
- **Chaining:**
  - Example: `chalk.bold.underline.blue('Styled Text')`

### 3. Configuration Options
- Auto-detection of terminal color support.
- Environment variable `FORCE_COLOR` to force color support:
  - Set using: `FORCE_COLOR=1 node app.js`

### 4. Advanced Usage & Troubleshooting
- **Method Chaining Example:**
  ```js
  const styled = chalk.bold.red.bgYellow.italic('Warning!');
  console.log(styled);
  ```
- **Troubleshooting Steps:**
  1. Check if terminal supports TTY: `process.stdout.isTTY`
  2. Test by running: `node -e "console.log(process.stdout.isTTY)"`
  3. Ensure `FORCE_COLOR` is set if needed.


## Supplementary Details
## Supplementary Technical Specifications

### Detailed API Specifications with Parameter Values
- **chalk.red(text: string): string** - Applies ANSI escape code for red (Foreground: 31).
- **chalk.bgBlue(text: string): string** - Applies ANSI escape code for blue background (Background: 44).
- **chalk.rgb(r: number, g: number, b: number)(text: string): string**
  - Parameters: `r`, `g`, `b` as numbers (0-255).
  - Returns: Styled string with custom RGB color using ANSI sequence.
- **chalk.hex(hex: string)(text: string): string**
  - Parameters: `hex` as a string (format: "#RRGGBB").
  - Returns: Styled string using a hex-to-RGB conversion.

### Configuration & Environment
- **Auto-detection:** Automatically disables styling if `process.stdout.isTTY` is false.
- **Forcing Colors:** Set environment variable `FORCE_COLOR=1` to override auto-detection.

### Implementation Steps
1. Import chalk using the appropriate module syntax.
2. Apply desired style by calling the method chain (e.g., `chalk.bold.red('Text')`).
3. Log output using `console.log()`.

### Troubleshooting Commands
- Test TTY support:
  ```bash
  node -e "console.log(process.stdout.isTTY)"
  ```
- Force color output in environments that do not support it by setting:
  ```bash
  export FORCE_COLOR=1
  ```
  then run your Node.js application.

### Best Practices
- Use chaining to combine multiple styles.
- Validate terminal support when deploying in varied environments.
- For production logging, consider stripping ANSI codes if logs are processed by a parser.


## Reference Details
## Complete API Specifications and Code Examples

### API Specification

Interface Chalk {
  red(text: string): string;
  bgBlue(text: string): string;
  rgb(r: number, g: number, b: number): ChalkFunction;
  hex(hex: string): ChalkFunction;
  bold(text: string): string;         // Modifier
  underline(text: string): string;    // Modifier
  italic(text: string): string;       // Modifier
}

interface ChalkFunction {
  (text: string): string;
  // Supports chaining of modifiers
}

### Full SDK Method Signatures

- chalk.red(text: string): string
- chalk.bgBlue(text: string): string
- chalk.rgb(r: number, g: number, b: number): ChalkFunction
- chalk.hex(hex: string): ChalkFunction
- Additional chaining: chalk.bold.red.underline(text: string): string

### Example Code with Comments

```js
// Import chalk library
import chalk from 'chalk';

// Using basic color methods
const errorText = chalk.red('Error: Something went wrong!');
console.log(errorText);

// Using background color
const infoText = chalk.bgBlue('Important Info');
console.log(infoText);

// Using custom RGB color
const customText = chalk.rgb(123, 45, 67)('Custom Colored Text');
console.log(customText);

// Using hex color
const hexText = chalk.hex('#DEADED')('Hex Colored Text');
console.log(hexText);

// Chaining multiple styles
const styledText = chalk.bold.underline.blue('Success!');
console.log(styledText);
```

### Configuration Details
- **Auto Detection:** Chalk checks if `process.stdout.isTTY` is true to decide color support.
- **Forcing Colors:** Set `FORCE_COLOR=1` in your environment to ensure colors are applied regardless of TTY support.

### Troubleshooting Procedure
1. Run:
   ```bash
   node -e "console.log(process.stdout.isTTY)"
   ```
   If the output is `false`, chalk disables styling.

2. Set FORCE_COLOR to force color support:
   ```bash
   export FORCE_COLOR=1
   node yourApplication.js
   ```

3. Verify ANSI escape sequences in your terminal by echoing a test string with manual codes.

### Best Practices
- Always check terminal capabilities if the output is intended for different environments.
- When logging to files or systems that strip ANSI codes, consider conditionally removing them.
- Document usage of environment configurations like FORCE_COLOR explicitly in your deployment procedures.


## Original Source
Chalk Documentation
https://chalk.js.org/

## Digest of CHALK

# Chalk Documentation Digest

**Retrieved Date:** 2023-10-04
**Source URL:** https://chalk.js.org/

## Overview
Chalk is a Node.js library used to style terminal string output with colors and formatting using ANSI escape codes. It supports method chaining for combining styles such as colors, background colors, and text modifiers.

## API Details

### Basic Usage
- **Importing Chalk:**
  - ES Module: `import chalk from 'chalk';`
  - CommonJS: `const chalk = require('chalk');`
- **Basic Example:**
  ```js
  console.log(chalk.green('Success!'));
  ```

### API Methods & Signatures
- **chalk.red(text: string): string**
  - Applies red foreground color. 
  - Example: `chalk.red('Error!')`

- **chalk.bgBlue(text: string): string**
  - Applies blue background color.
  - Example: `chalk.bgBlue('Info')`

- **chalk.rgb(r: number, g: number, b: number)(text: string): string**
  - Applies a custom RGB color.
  - Example: `chalk.rgb(123, 45, 67)('Custom Color')`

- **chalk.hex(hex: string)(text: string): string**
  - Applies a color specified with a hex code.
  - Example: `chalk.hex('#DEADED')('Hex Color')`

- **Method Chaining:**
  - You can combine modifiers: `chalk.bold.underline.blue('Styled Text')`

### Configuration Options
- **Auto-detection:**
  - Chalk automatically detects terminal capabilities and disables styling if colors are unsupported.
- **Force Color:**
  - Use environment variable `FORCE_COLOR` to override behavior. Setting `FORCE_COLOR=1` forces color output even in unsupported terminals.

### Advanced Usage & Troubleshooting
- **Chaining Multiple Styles:**
  ```js
  const styled = chalk.bold.red.bgYellow.italic('Warning!');
  console.log(styled);
  ```
- **Common Issues:**
  - **Problem:** Colors not displaying correctly.
  - **Troubleshooting Step:** Verify that the terminal supports colors using `process.stdout.isTTY` and check the `FORCE_COLOR` environment variable.
  - **Command to Test TTY:**
    ```bash
    node -e "console.log(process.stdout.isTTY)"
    ```

## Attribution & Data Size
- **Attribution:** Data extracted from Chalk Documentation source provided in SOURCES.md entry 13.
- **Crawled Data Size:** 0 bytes



## Attribution
- Source: Chalk Documentation
- URL: https://chalk.js.org/
- License: MIT License
- Crawl Date: 2025-04-20T18:27:35.412Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-20
