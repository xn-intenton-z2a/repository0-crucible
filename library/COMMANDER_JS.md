# COMMANDER_JS

## Crawl Summary
Installation via npm, quick-start examples, usage of global and local Command instances, and a rich set of option definitions (.option) including boolean, value, negatable, variadic and custom-processed options. Detailed command creation with .command(), argument handling with .argument(), action handlers (sync and async), automated help customization, parsing configurations (enablePositionalOptions, passThroughOptions, storeOptionsAsProperties), error overriding with exitOverride(), and life cycle hooks for preAction and postAction are provided with complete code examples and expected command outputs.

## Normalised Extract
**Table of Contents:**
1. Installation
2. Quick Start
3. Declaring Program Variable
4. Options
   - Defining Options
   - Option Types (boolean, value, negatable, variadic, optional)
   - Custom Option Processing
5. Commands
   - Command Creation
   - Command Arguments
6. Action Handlers
   - Synchronous & Asynchronous
7. Help and Usage Customization
8. Parsing, Legacy Options & Error Handling
9. Life Cycle Hooks & Custom Events
10. Troubleshooting

**1. Installation**
- Command: `npm install commander`

**2. Quick Start**
- Import using CommonJS or ECMAScript Modules:
  ```js
  const { program } = require('commander'); // CommonJS
  // or
  import { Command } from 'commander';
  const program = new Command();
  ```

**3. Declaring Program Variable**
- Use the global object `program` or create new instances with `new Command()` depending on program complexity.

**4. Options**
- Defining Options with `.option(flags, description, [default], [fn])`:
  ```js
  program
    .option('-d, --debug', 'enable debugging')
    .option('-p, --port <number>', 'specify port');
  ```
- Custom processing example:
  ```js
  function myParseInt(value, dummyPrevious) {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) throw new Error('Not a number.');
    return parsed;
  }
  program.option('-i, --integer <number>', 'integer option', myParseInt);
  ```
- Variadic option usage:
  ```js
  program.option('-n, --number <numbers...>', 'list of numbers');
  ```

**5. Commands**
- Creating a command with arguments and action:
  ```js
  program.command('clone <source> [destination]')
    .description('clone a repository')
    .action((source, destination) => {
      console.log('Cloning from', source, 'to', destination);
    });
  ```

**6. Action Handlers**
- Synchronous:
  ```js
  program.command('serve <script>')
    .option('-p, --port <number>', 'port', 80)
    .action(function() {
      console.log(`Serving ${this.args[0]} on port ${this.opts().port}`);
    });
  ```
- Asynchronous:
  ```js
  async function run() { /* async code */ }
  program.command('run').action(run);
  program.parseAsync(process.argv);
  ```

**7. Help and Usage Customization**
- Custom help text:
  ```js
  program.addHelpText('after', '\nExample: $ custom-help --help');
  ```
- Overriding default help option:
  ```js
  program.helpOption('-e, --HELP', 'extended help');
  ```

**8. Parsing and Error Handling**
- Basic parse call:
  ```js
  program.parse(process.argv);
  ```
- Using `.exitOverride()` to handle errors:
  ```js
  program.exitOverride();
  try { program.parse(process.argv); } catch (err) { console.error(err.message); }
  ```

**9. Life Cycle Hooks & Custom Events**
- Pre-action hook example:
  ```js
  program.hook('preAction', (cmd, actionCmd) => {
    if (cmd.opts().trace) console.log(`Running ${actionCmd.name()}`);
  });
  ```
- Event listener for options:
  ```js
  program.on('option:verbose', function() {
    process.env.VERBOSE = this.opts().verbose;
  });
  ```

**10. Troubleshooting**
- Unknown option error:
  ```sh
  $ node split.js -s / --fits a/b/c
  error: unknown option '--fits'
  (Did you mean --first?)
  ```
- Debug subcommands with VSCode by setting "autoAttachChildProcesses": true in launch.json.


## Supplementary Details
**Supplementary Technical Specifications:**

- **Option Method Signature:**
  `.option(flags: string, description: string, defaultValue?: any, fn?: (value: string, previous: any) => any): this`

- **Command Method Signature:**
  `.command(name: string, description?: string, options?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command`

- **Argument Method Signature:**
  `.argument(name: string, description?: string, defaultValue?: any): this`

- **Parsing Methods:**
  - `.parse(argv?: string[], parseOptions?: { from: 'node' | 'electron' | 'user' }): this`
  - `.parseAsync(argv?: string[]): Promise<this>`

- **Error Handling:**
  - `.exitOverride(callback?: (err: CommanderError) => void): this`
  - `.error(message: string, options?: { exitCode?: number, code?: string }): never`

- **Life Cycle Hooks:**
  - Hook events: 'preAction', 'postAction', 'preSubcommand'
  - Example: `.hook('preAction', (command, actionCommand) => { ... });`

- **Configuration Options:**
  - Positional Options: `.enablePositionalOptions()`
  - Pass-through Options: `.passThroughOptions()`
  - Legacy property storage: `.storeOptionsAsProperties()`

- **Best Practices:**
  - Create local Command instances for larger applications to avoid clashes.
  - Always define required options with `.requiredOption()` when mandatory.
  - Use custom option processing for type coercion and validation.
  - Override exit behavior for integrating Commander with custom error-handling frameworks.

- **Implementation Steps:**
  1. Import Commander module and instantiate `program`.
  2. Chain method calls to add options, commands, arguments.
  3. Add custom processing functions where needed.
  4. Hook into life cycle events if debugging or logging is required.
  5. Call `.parse(process.argv)` or `.parseAsync(process.argv)` to start parsing.



## Reference Details
**Complete API Specifications and Developer Reference:**

1. **Program and Command Creation**
   - **Command (Class):**
     - Constructor: `new Command(name?: string)`
     - Methods:
       - `.name(name: string): this`
       - `.description(desc: string): this`
       - `.version(version: string, flags?: string, description?: string): this`
       - `.argument(name: string, description?: string, defaultValue?: any): this`
       - `.arguments(argString: string): this`
       - `.option(flags: string, description: string, defaultValue?: any, fn?: (value: string, previous: any) => any): this`
       - `.requiredOption(flags: string, description: string, defaultValue?: any, fn?: (value: string, previous: any) => any): this`
       - `.addOption(option: Option): this`
       - `.command(name: string, description?: string, options?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command`
       - `.addCommand(cmd: Command): this`
       - `.parse(argv?: string[], parseOptions?: { from: 'node' | 'electron' | 'user' }): this`
       - `.parseAsync(argv?: string[]): Promise<this>`
       - `.exitOverride(callback?: (err: CommanderError) => void): this`
       - `.error(message: string, options?: { exitCode?: number, code?: string }): never`
       - `.hook(name: 'preAction'|'postAction'|'preSubcommand', listener: (thisCommand: Command, actionCommand: Command) => void | Promise<void>): this`

2. **Option Processing and Custom Functions**
   - **Custom Option Parser Example:**
     ```js
     function myParseInt(value, dummyPrevious) {
       const parsed = parseInt(value, 10);
       if (isNaN(parsed)) throw new Error('Not a number.');
       return parsed;
     }
     ```

   - **Usage in Option:**
     ```js
     program.option('-i, --integer <number>', 'an integer argument', myParseInt);
     ```

3. **Code Examples (Full Code)**
   - **String Utility Example:**
     ```js
     const { Command } = require('commander');
     const program = new Command();

     program.name('string-util')
       .description('CLI to some JavaScript string utilities')
       .version('0.8.0');

     program.command('split')
       .description('Split a string into substrings and display as an array')
       .argument('<string>', 'string to split')
       .option('--first', 'display just the first substring')
       .option('-s, --separator <char>', 'separator character', ',')
       .action((str, options) => {
         const limit = options.first ? 1 : undefined;
         console.log(str.split(options.separator, limit));
       });

     program.parse();
     ```

4. **Troubleshooting Procedures**
   - **Unknown Option Error:**
     - Command:
       ```sh
       $ node split.js -s / --fits a/b/c
       ```
     - Expected Output:
       ```
       error: unknown option '--fits'
       (Did you mean --first?)
       ```

   - **Exit Override Example:**
     ```js
     program.exitOverride();
     try {
       program.parse(process.argv);
     } catch (err) {
       console.error('Custom error handling:', err.message);
     }
     ```

5. **Configuration Options with Effects:**
   - **Default Option Values:**
     ```js
     program.option('-c, --cheese <type>', 'add cheese', 'blue');
     // When not provided, program.opts().cheese returns 'blue'
     ```
   - **Negatable Options:**
     ```js
     program.option('--no-sauce', 'removes sauce');
     // When used, opts().sauce returns false
     ```
   - **Variadic Options:**
     ```js
     program.option('-n, --number <numbers...>', 'list of numbers');
     // Provides an array of values
     ```

This detailed API reference provides the exact method signatures, full code samples with inline comments, configuration parameters with default values, and step-by-step troubleshooting commands for developers using Commander.js to build robust node.js command-line interfaces.


## Original Source
Commander.js Documentation
https://github.com/tj/commander.js

## Digest of COMMANDER_JS

# Commander.js Documentation

**Retrieved Date:** 2023-10-30

## Installation

- Install via npm: 
  ```sh
  npm install commander
  ```

## Quick Start

- Import using CommonJS:
  ```js
  const { program } = require('commander');
  ```

- Import using ECMAScript Module:
  ```js
  import { Command } from 'commander';
  const program = new Command();
  ```

## Declaring Program Variable

- Global object usage:
  ```js
  const { program } = require('commander');
  ```

- Local Command instance:
  ```js
  const { Command } = require('commander');
  const program = new Command();
  ```

## Options

### Defining Options

- Using `.option()` method:
  ```js
  program
    .option('-p, --port <number>', 'server port number')
    .option('--trace', 'add extra debugging output')
    .option('--ws, --workspace <name>', 'use a custom workspace');
  ```

### Option Types and Argument Parsing

- Boolean and value options:
  ```js
  program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
  ```

- Optional option with a default value:
  ```js
  program
    .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');
  ```

- Negatable options:
  ```js
  program
    .option('--no-sauce', 'Remove sauce')
    .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese');
  ```

- Boolean or value option:
  ```js
  program
    .option('-c, --cheese [type]', 'Add cheese with optional type');
  ```

- Variadic options:
  ```js
  program
    .option('-n, --number <numbers...>', 'specify numbers')
    .option('-l, --letter [letters...]', 'specify letters');
  ```

### Advanced Option Handling

- Custom processing with a callback function:
  ```js
  function myParseInt(value, dummyPrevious) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new Error('Not a number.');
    }
    return parsedValue;
  }

  function increaseVerbosity(dummyValue, previous) {
    return previous + 1;
  }

  program
    .option('-i, --integer <number>', 'integer argument', myParseInt)
    .option('-v, --verbose', 'increase verbosity', increaseVerbosity, 0);
  ```

## Commands

### Creating Commands

- Defining a subcommand with an action handler:
  ```js
  program.command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
      console.log('clone command called with:', source, destination);
    });
  ```

- Stand-alone executable subcommands:
  ```js
  program
    .command('install [package-names...]', 'install one or more packages')
    .command('search [query]', 'search with optional query');
  ```

### Command Arguments

- Using `.argument()`:
  ```js
  program
    .argument('<username>', 'user to login')
    .argument('[password]', 'password for user, if required', 'no password given')
    .action((username, password) => {
      console.log('username:', username);
      console.log('password:', password);
    });
  ```

- Variadic arguments:
  ```js
  program
    .command('rmdir')
    .argument('<dirs...>')
    .action((dirs) => {
      dirs.forEach(dir => console.log('rmdir:', dir));
    });
  ```

## Action Handlers

- Synchronous action handler:
  ```js
  program
    .command('serve')
    .argument('<script>')
    .option('-p, --port <number>', 'port number', 80)
    .action(function() {
      console.error('Run script', this.args[0], 'on port', this.opts().port);
    });
  ```

- Asynchronous action handler:
  ```js
  async function run() {
    // Async code here...
  }

  program
    .command('run')
    .action(run);

  program.parseAsync(process.argv);
  ```

## Automated Help

- Customising help text:
  ```js
  program.addHelpText('after', '\nExample call:\n  $ custom-help --help\n');
  ```

- Overriding help options:
  ```js
  program.helpOption('-e, --HELP', 'read more information');
  ```

## Parsing and Options Handling

- Basic parsing:
  ```js
  program.parse(process.argv);
  ```

- Positional options and pass-through of unknown options:
  ```js
  program.enablePositionalOptions();
  program.passThroughOptions();
  ```

- Legacy option properties:
  ```js
  program.storeOptionsAsProperties()
    .option('-d, --debug')
    .action((cmdOpts) => {
      if (cmdOpts.debug) console.error('Debug mode enabled');
    });
  ```

## Exit and Error Handling

- Override exit behavior:
  ```js
  program.exitOverride();
  try {
    program.parse(process.argv);
  } catch (err) {
    // Custom error handling logic
    console.error('Error:', err.message);
  }
  ```

- Display error with specific exit code:
  ```js
  program.error('Custom processing has failed', { exitCode: 2, code: 'my.custom.error' });
  ```

## Troubleshooting and Debugging

- Example error message on unknown option:
  ```sh
  $ node split.js -s / --fits a/b/c
  error: unknown option '--fits'
  (Did you mean --first?)
  ```

- Debugging subcommands with VSCode:
  Set "autoAttachChildProcesses": true in launch.json

## Additional Features

- Custom event listeners:
  ```js
  program.on('option:verbose', function () {
    process.env.VERBOSE = this.opts().verbose;
  });
  ```

- Life cycle hooks:
  ```js
  program.hook('preAction', (thisCommand, actionCommand) => {
    if (thisCommand.opts().trace) {
      console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
      console.log('arguments:', actionCommand.args);
      console.log('options:', actionCommand.opts());
    }
  });
  ```


## Attribution
- Source: Commander.js Documentation
- URL: https://github.com/tj/commander.js
- License: License: MIT License
- Crawl Date: 2025-04-21T03:54:29.175Z
- Data Size: 683343 bytes
- Links Found: 4921

## Retrieved
2025-04-21
