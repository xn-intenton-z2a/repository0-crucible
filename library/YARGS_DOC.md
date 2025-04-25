# YARGS_DOC

## Crawl Summary
Yargs is a command line argument parsing library that enables developers to define commands, positional arguments, and options with defaults and types. It supports both ESM and CommonJS through conditional exports. The library includes dual mode examples, a code snippet demonstrating command definition and help generation, and experimental support for Deno runtime. Notable features include dynamic help menu generation, bash-completion shortcuts, and strict command parsing. Breaking changes include removal of deep file requires and the rebase helper, along with dropping Node 8.

## Normalised Extract
Table of Contents:
1. Overview and Installation
   - Install via npm using: npm install --save yargs
2. Basic Usage Example
   - Code snippet starting with #!/usr/bin/env node
   - Import statements for yargs and hideBin
   - Use of scriptName to set the CLI name
   - Usage definition: .usage('$0 <cmd> [args]')
   - Command definition using .command() with parameters: name ('hello [name]'), description ('welcome ter yargs!'), builder function that uses yargs.positional with type 'string', default value 'Cambi', and description 'the name to say hello to', and a handler function receiving argv
   - Invoking .help() and .parse(hideBin(process.argv))
3. Command API Details
   - Method: command(name: string, description: string, builder: function, handler: function)
   - Positional options definition: yargs.positional(name, { type: 'string', default: 'Cambi', describe: 'the name to say hello to' })
4. Environment Support: ESM & CommonJS
   - CommonJS usage: require('yargs') and destructuring argv
   - ESM usage: using import statement from 'yargs' and import { hideBin } from 'yargs/helpers'
5. Deno Support (Experimental)
   - Import example using URL: import yargs from 'https://deno.land/x/yargs/deno.ts'
   - Use yargs().command() and parse(Deno.args)
6. Breaking Changes & Troubleshooting
   - Removal of deep file requires due to conditional exports
   - Removal of rebase helper (previously wrapping path.relative)
   - Node 8 support dropped
   - Use CHANGELOG for further troubleshooting

Each section includes direct implementation details including code structure, method signature details, and configuration parameters for immediate developer usage.

## Supplementary Details
Installation: npm install --save yargs

Basic Usage: 
- Shebang: #!/usr/bin/env node
- Importing modules: import yargs from 'yargs'; import { hideBin } from 'yargs/helpers';
- Setting CLI name with .scriptName("pirate-parser")
- Defining usage: .usage('$0 <cmd> [args]')
- Defining a command using .command('hello [name]', 'welcome ter yargs!', builder, handler)
   - Builder: function(yargs) { yargs.positional('name', { type: 'string', default: 'Cambi', describe: 'the name to say hello to' }) }
   - Handler: function(argv) { console.log('hello', argv.name, 'welcome to yargs!') }
- Final parsing using .parse(hideBin(process.argv))

Configuration Options: 
- ESM/CJS dual export using conditional exports in package.json
- Deno support using URL imports

Best Practices: 
- Define commands with explicit positional arguments and types
- Use .help() to auto-generate user friendly help menus
- Validate command usage with .demandCommand to require at least one command
- Check for breaking changes by reviewing CHANGELOG

Troubleshooting Procedures: 
- Verify installation: run npm ls yargs
- For command issues, run: node example.js --help to inspect command and option definitions
- In case of import errors, ensure conditional exports and correct import syntax (require vs import)

## Reference Details
API Specifications:
- yargs(): Returns a yargs instance that offers chainable methods.
- yargs.scriptName(name: string): Sets the CLI name used in help output.
- yargs.usage(usage: string): Defines command usage format.
- yargs.command(command: string, description: string, builder: (yargs: any) => any, handler: (argv: any) => void): Registers a command with the following signature:
   Parameters:
     command: string - command name with positional options (e.g., 'hello [name]')
     description: string - command description for help menus
     builder: function - a function that configures command arguments (e.g., uses yargs.positional with parameters { type: 'string', default: 'Cambi', describe: 'the name to say hello to' })
     handler: function - a function that is invoked with parsed argv
- yargs.positional(name: string, options: { type: string, default: any, describe: string }): Defines a positional argument with type, default value and description.
- yargs.help(): Attaches a help command to output available commands and options.
- yargs.parse(args: string[]): Parses the supplied arguments.

SDK Method Signatures:
function command(command: string, description: string, builder: (yargs: any) => any, handler: (argv: any) => void): yargsInstance

Code Example (ESM):
#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const cli = yargs(hideBin(process.argv))
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    return yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help();

cli.parse();

Configuration Options:
- Conditional Exports: Ensures dual support for ESM and CommonJS. 
- Deno Import URL: 'https://deno.land/x/yargs/deno.ts' for Deno environments.

Best Practices:
- Use explicit command definitions and positional parameter settings
- Always include .help() for user guidance
- Validate your node version and review CHANGELOG for any breaking changes

Troubleshooting Commands:
- npm ls yargs (checks installation)
- node example.js --help (displays usage and command definitions)
- For Deno testing: deno run --allow-read example.js (if using Deno, check for experimental support output)

Exceptions:
- Misconfiguration in positional parameters or missing builder functions may cause undefined behavior. Ensure all parameters have explicit types and defaults.

## Information Dense Extract
Yargs; npm install --save yargs; Shebang: #!/usr/bin/env node; Import: yargs, { hideBin } from 'yargs/helpers'; Methods: scriptName(string), usage(string), command('hello [name]', 'welcome ter yargs!', builder, handler), positional(name, { type: 'string', default: 'Cambi', describe: 'the name to say hello to' }), help(), parse(hideBin(process.argv)); Dual export using conditional exports; CommonJS: require('yargs'); ESM import; Deno import from 'https://deno.land/x/yargs/deno.ts'; Breaking: deep file requires removed, rebase helper removed, drop Node 8; Best practices: explicit argument definitions, demandCommand usage; Troubleshooting: npm ls yargs, node example.js --help; API: command(command: string, description: string, builder: function, handler: function); Code patterns: chaining methods; Configuration: conditional exports for ESM/CJS, Deno experimental support.

## Sanitised Extract
Table of Contents:
1. Overview and Installation
   - Install via npm using: npm install --save yargs
2. Basic Usage Example
   - Code snippet starting with #!/usr/bin/env node
   - Import statements for yargs and hideBin
   - Use of scriptName to set the CLI name
   - Usage definition: .usage('$0 <cmd> [args]')
   - Command definition using .command() with parameters: name ('hello [name]'), description ('welcome ter yargs!'), builder function that uses yargs.positional with type 'string', default value 'Cambi', and description 'the name to say hello to', and a handler function receiving argv
   - Invoking .help() and .parse(hideBin(process.argv))
3. Command API Details
   - Method: command(name: string, description: string, builder: function, handler: function)
   - Positional options definition: yargs.positional(name, { type: 'string', default: 'Cambi', describe: 'the name to say hello to' })
4. Environment Support: ESM & CommonJS
   - CommonJS usage: require('yargs') and destructuring argv
   - ESM usage: using import statement from 'yargs' and import { hideBin } from 'yargs/helpers'
5. Deno Support (Experimental)
   - Import example using URL: import yargs from 'https://deno.land/x/yargs/deno.ts'
   - Use yargs().command() and parse(Deno.args)
6. Breaking Changes & Troubleshooting
   - Removal of deep file requires due to conditional exports
   - Removal of rebase helper (previously wrapping path.relative)
   - Node 8 support dropped
   - Use CHANGELOG for further troubleshooting

Each section includes direct implementation details including code structure, method signature details, and configuration parameters for immediate developer usage.

## Original Source
CLI Toolkit Documentation
https://yargs.js.org/docs/

## Digest of YARGS_DOC

# Yargs Documentation

Retrieved on: 2023-10-12

## Overview
Yargs is a Node.js library for building interactive command line tools by parsing command line arguments. It provides capabilities for defining commands, options, generating help menus, bash-completion, and dual support for both ESM and CommonJS environments. It also offers experimental support for Deno.

## Installation
Install via npm:
  npm install --save yargs

## Basic Usage
Create a file (e.g., example.js) and include the following code:

#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));

## Command API
- Method: command(name, description, builder, handler)
  - name: string (command and positional definitions)
  - description: string (command help description)
  - builder: function receiving a yargs instance to define positional arguments, with parameters:
      - positional(name: string, { type: string, default: string, describe: string })
  - handler: function receiving argv (parsed arguments) for execution

## Environment Support

### ESM and CommonJS
Yargs now supports both ESM and CommonJS. 
Example (CommonJS):
  const { argv } = require('yargs');
Example (ESM):
  import yargs from 'yargs';  
  import { hideBin } from 'yargs/helpers';

### Deno Support (Experimental)
Import using URL from deno.land:
  import yargs from 'https://deno.land/x/yargs/deno.ts';
  import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

Then, define commands and use yargs.parse(Deno.args) accordingly.

## Breaking Changes & Troubleshooting
- Conditional exports make exported files explicit; deep file requires (eg. lib/utils/obj-filter.js) are no longer supported.
- The rebase helper (wrapping path.relative) has been removed.
- Node 8 support dropped.

Refer to the CHANGELOG for additional breaking changes.

## Attribution & Data Size
- Crawled from: https://yargs.js.org/docs/
- Data Size: 348060 bytes
- Links Found: 34
- No crawl errors.

## Attribution
- Source: CLI Toolkit Documentation
- URL: https://yargs.js.org/docs/
- License: License: MIT
- Crawl Date: 2025-04-25T22:08:31.897Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-04-25
