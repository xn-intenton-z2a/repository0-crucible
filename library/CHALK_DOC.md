# CHALK_DOC

## Crawl Summary
Expressive, composable API for terminal string styling. Supports chaining of styles, multiple arguments, and nesting of styles. Configurable color levels via chalk.level (0: disabled, 1: basic, 2: 256, 3: Truecolor). Provides separate stderr instance via chalkStderr. Includes full arrays for supported modifiers and color names for validation. Offers direct methods for RGB, HEX, and ANSI256 color specifications. Troubleshooting and configuration via environment variables and CLI flags are included.

## Normalised Extract
## Table of Contents
1. Installation
2. Usage
3. API Specifications
4. Chalk Level & Configuration
5. Supported Styles & Colors
6. Extended Color Models
7. Implementation Best Practices
8. Troubleshooting Procedures

### 1. Installation
- npm install chalk
- For ESM environments, use Chalk 5; for TypeScript or CommonJS, use Chalk 4.

### 2. Usage
- Import using: `import chalk from 'chalk';`
- Use as: `console.log(chalk.blue('Hello world!'));`
- Chain and nest styles: `chalk.red.bold.underline('Hello', 'world');`

### 3. API Specifications
- Core method: `chalk.<style>[.<style>...](string, [string...])`
- Example: `chalk.red.bold.underline('Hello', 'world')` returns a styled string.

### 4. Chalk Level & Configuration
- Property: `chalk.level`
  - Values: 0 (disabled), 1 (16 colors), 2 (256 colors), 3 (Truecolor)
  - Custom instance: `new Chalk({level: number})`

### 5. Supported Styles & Colors
- Modifiers: reset, bold, dim, italic, underline, overline, inverse, hidden, strikethrough, visible
- Foreground Colors: black, red, green, yellow, blue, magenta, cyan, white, blackBright, redBright, etc.
- Background Colors: bgBlack, bgRed, bgGreen, ..., bgWhiteBright

### 6. Extended Color Models
- Methods for true color:
   - `chalk.rgb(r, g, b)`, e.g., `chalk.rgb(123, 45, 67).underline('text')`
   - `chalk.hex('#DEADED')`, e.g., `chalk.hex('#DEADED').bold('text')`
   - Background: `chalk.bgRgb(...)`, `chalk.bgHex(...)`
   - ANSI256: `chalk.bgAnsi256(number)`

### 7. Implementation Best Practices
- Use chaining for composability
- Use new Chalk instance in modules to prevent global state changes
- Code Example:

      import { Chalk } from 'chalk';
      const customChalk = new Chalk({level: 3});
      console.log(customChalk.hex('#FF8800').bold('Orange!'));

### 8. Troubleshooting Procedures
- Check the current color level via `chalk.level`
- Use environment variables (e.g., FORCE_COLOR=1) if auto-detection fails
- Forcing styles via CLI: `node app.js --color=256`
- Use chalkStderr for error logging


## Supplementary Details
### Detailed Technical Specifications

1. Chalk Level Property:
   - Default auto-detected.
   - Values:
     - 0: Colors disabled
     - 1: 16 color support
     - 2: 256 color support
     - 3: Truecolor (16 million colors)
   - Example override:
         chalk.level = 2;
   - New instance creation: `new Chalk({ level: <number> })`

2. Constructor and Options
   - Import using: `import { Chalk } from 'chalk';`
   - Constructor parameter: { level: number }
   - Effect: Overrides global color detection for that instance

3. API Methods
   - Chainable methods: e.g., `chalk.red.bold('text')`
   - Accepts multiple string arguments which are space-joined
   - Underlying implementation produces ANSI escape sequences

4. Configuration Options and Overrides
   - Environment Variables: FORCE_COLOR (0,1,2,3)
   - CLI Flags: --color, --no-color, --color=256, --color=16m

5. Best Practices
   - Avoid modifying String.prototype
   - Use dedicated chalkStderr for logs on stderr stream
   - Validate style names using provided arrays: modifierNames, foregroundColorNames

6. Troubleshooting
   - Command: `echo $FORCE_COLOR` to check environment override
   - Validate configuration by printing `chalk.level`
   - If styles not applied, confirm terminal supports ANSI codes (e.g. use Windows Terminal on Windows)


## Reference Details
### Full API Specifications and Code Examples

1. Core API Usage:
   - Method Signature:
         chalk.<style>[.<style>...](...strings: string[]): string
   - Example:
         const styled = chalk.red.bold.underline('Hello', 'world');
         // Returns a string with corresponding ANSI escape sequences

2. Custom Chalk Instance:
   - Constructor Signature:
         new Chalk(options: { level: number }): Chalk
   - Example:
         import { Chalk } from 'chalk';
         const customChalk = new Chalk({ level: 3 });
         console.log(customChalk.hex('#FF8800').bold('Orange!'));

3. Configuration Methods:
   - Global Level Override:
         chalk.level = 2;
   - Environment Variable Overrides:
         // In terminal, run:
         FORCE_COLOR=3 node app.js
         // or use CLI flag:
         node app.js --color=256

4. RGB and HEX Methods:
   - Method Signatures:
         chalk.rgb(r: number, g: number, b: number): Chalk
         chalk.hex(color: string): Chalk
         chalk.bgRgb(r: number, g: number, b: number): Chalk
         chalk.bgHex(color: string): Chalk
   - Code Example:
         console.log(chalk.rgb(15, 100, 204).inverse('Hello!'));
         console.log(chalk.hex('#DEADED').bold('Bold gray!'));
         console.log(chalk.bgHex('#DEADED').underline('Hello, world!'));

5. ANSI256 Support:
   - Method Signature:
         chalk.bgAnsi256(code: number): Chalk
   - Example:
         console.log(chalk.bgAnsi256(194)('Honeydew, more or less'));

6. Style Validation Arrays:
   - Available arrays:
         chalk.modifierNames: string[]
         chalk.foregroundColorNames: string[]
         chalk.backgroundColorNames: string[]
         chalk.colorNames: string[] // combination of foreground and background
   - Example:
         import { modifierNames, foregroundColorNames } from 'chalk';
         console.log(modifierNames.includes('bold')); // true
         console.log(foregroundColorNames.includes('pink')); // false

7. Best Practice Example with Comments:

      // Import chalk and create a customized instance
      import { Chalk } from 'chalk';
      const myChalk = new Chalk({ level: 3 });

      // Log message with multiple chained styles
      console.log(myChalk.blue.bgRed.bold('This is a warning message'));

      // Use RGB and hex for precise styling
      console.log(myChalk.rgb(123, 45, 67).underline('Underlined reddish color'));
      console.log(myChalk.hex('#DEADED').bold('Bold gray!'));

8. Troubleshooting Steps:
   - Verify your terminal supports ANSI escape codes (use Windows Terminal on Windows).
   - Check the current chalk level by logging `chalk.level`.
   - If colors are not showing, try forcing color output by setting the environment variable:
         export FORCE_COLOR=3
     Then run your node application.
   - For command-line overrides, use:
         node app.js --color=16m
     to enable Truecolor support directly.

All of the above API methods, parameters, configurations, and examples are directly available from the Chalk module at https://github.com/chalk/chalk#readme


## Original Source
Chalk Documentation
https://github.com/chalk/chalk#readme

## Digest of CHALK_DOC

# Chalk Documentation Digest

**Retrieved Date:** 2024-12-23
**Data Size:** 636378 bytes
**Attribution:** Sindre Sorhus, maintained and contributed by 43+ contributors

## Installation

- Install via npm:

  npm install chalk

- Note: Chalk 5 is ESM-only. For common usage with TypeScript or non-ESM build tools, use Chalk 4.

## Usage & API Overview

Import chalk:

    import chalk from 'chalk';

Basic usage examples:

    console.log(chalk.blue('Hello world!'));

Chain multiple styles:

    console.log(chalk.blue.bgRed.bold('Hello world!'));

Combine styled and normal strings:

    const log = console.log;
    log(chalk.blue('Hello') + ' World' + chalk.red('!'));

Pass multiple arguments, which are space separated:

    log(chalk.blue('Hello', 'World!', 'Foo', 'bar'));

Nesting styles:

    log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

ES2015 template literal usage:

    log(`
    CPU: ${chalk.red('90%')}
    RAM: ${chalk.green('40%')}
    DISK: ${chalk.yellow('70%')}
    `);

## API Specifications

### Core Method Signature

- Method: `chalk.<style>[.<style>...](string, [string...])`
  - Example: `chalk.red.bold.underline('Hello', 'world')`
  - Description: Chain style functions where order is non-dependent; later styles override earlier styling conflicts.
  - Parameters: One or more strings
  - Returns: A single string with ANSI escape codes

### Chalk Level Configuration

- Property: `chalk.level`
  - Description: Specifies the level of color support. Supported levels are:
    - 0: All colors disabled
    - 1: Basic color support (16 colors)
    - 2: 256 color support
    - 3: Truecolor support (16 million colors)
  - Usage Example:

        chalk.level = 2;

- Creating a new instance with custom configuration:

      import { Chalk } from 'chalk';
      const customChalk = new Chalk({ level: 0 });

### Additional API Features

- **supportsColor**: Determines if terminal supports color. Can be overridden using CLI flags `--color` / `--no-color` or environment variables (e.g., `FORCE_COLOR=1,2,3,0`).
- **chalkStderr**: Separate instance configured for stderr stream behavior.
- Array properties:
  - `modifierNames`, `foregroundColorNames`, `backgroundColorNames`, and `colorNames` for validation and introspection of supported styles.

## Style & Color Options

### Modifiers

- `reset`: Reset style
- `bold`: Bold text
- `dim`: Lower opacity
- `italic`: Italic text (limited support)
- `underline`: Underline text
- `overline`: Overline text
- `inverse`: Invert colors
- `hidden`: Make text invisible
- `strikethrough`: Strike through text
- `visible`: Display only when color is enabled

### Colors

Foreground colors include: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `blackBright` (alias: `gray`, `grey`), `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`.

Background colors use the prefix `bg` e.g., `bgRed`, `bgBlueBright`, etc.

### Extended Color Support

- **256 Colors & Truecolor**:
  - Use methods: `chalk.rgb(r, g, b)`, `chalk.hex('#RRGGBB')`, and their background versions: `chalk.bgRgb(...)`, `chalk.bgHex(...)`
  - Downsampling examples: RGB to ANSI escape codes when lower color levels are active.
  - Additional method: `chalk.bgAnsi256(number)` for 256 color palette.

## Best Practices & Troubleshooting

### Implementation Best Practices

- Chain method calls for composability. Example:

      console.log(chalk.red.bold('Error:'), 'Something failed!');

- Use new Chalk instance for modules to avoid global side-effects:

      import { Chalk } from 'chalk';
      const myChalk = new Chalk({ level: 3 });
      console.log(myChalk.hex('#DEADED')('Themed text'));

### Configuration Options & Overrides

- Override terminal color detection using environment variables:

  For example:

      FORCE_COLOR=3 node app.js

- CLI flags to force color support:

      node app.js --color=256

### Troubleshooting Steps

1. Verify Terminal Support: Use `console.log(chalk.level)` to ensure correct color support level.
2. Ensure Environment Variables are set if terminal auto-detection fails.
3. For CommonJS, if module errors occur with Chalk 5, fallback to Chalk 4.
4. Use `chalkStderr` for logging errors to stderr with proper coloring.

## Additional Code Examples with Inline Comments

// Basic themed logging example:
import chalk from 'chalk';

// Log a standard message in blue
console.log(chalk.blue('Hello world!'));

// Combine multiple styles and arguments
console.log(chalk.green('Success') + ': Operation completed successfully');

// Customize theme with variables
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange
console.log(error('Error!'));
console.log(warning('Warning!'));

// Using template literals with styled variables
const cpu = chalk.red('90%');
const ram = chalk.green('40%');
const disk = chalk.yellow('70%');
console.log(`CPU: ${cpu} | RAM: ${ram} | DISK: ${disk}`);

# Attribution

Data extracted from https://github.com/chalk/chalk#readme


## Attribution
- Source: Chalk Documentation
- URL: https://github.com/chalk/chalk#readme
- License: License: MIT License
- Crawl Date: 2025-04-21T01:06:44.868Z
- Data Size: 636378 bytes
- Links Found: 5249

## Retrieved
2025-04-21
