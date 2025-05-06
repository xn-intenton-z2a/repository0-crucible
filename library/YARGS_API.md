# YARGS_API

## Crawl Summary
npm install --save yargs
yargs(): Argv instance
yargs.scriptName(name: string)
yargs.usage(usage: string)
yargs.command(name: string, desc: string, builder?: Function, handler?: Function)
yargs.positional(key: string, {type, default, describe})
yargs.option(key, {alias, type, default, describe, demandOption})
yargs.help([level])
yargs.demandCommand(min, max, msg)
yargs.strictCommands()
yargs.parse(argv: string[])
yargs.argv
hideBin(argv: string[]): string[]

## Normalised Extract
Table of Contents
1 Installation
2 Bootstrap
3 Initialization
4 Commands API
5 Options & Positional
6 Helpers
7 Module Formats

1 Installation
Command: npm install --save yargs

2 Bootstrap
Shebang: #!/usr/bin/env node
ESM import: import yargs from 'yargs'
Helper import: import { hideBin } from 'yargs/helpers'

3 Initialization
yargs(): returns Argv instance

4 Commands API
scriptName(name: string): this
usage(usage: string): this
command(name: string, description: string, builder?: (yargs: Argv)=>Argv, handler?: (argv: any)=>void): this
demandCommand(min: number, max?: number, msg?: string): this
strictCommands(): this

5 Options & Positional
positional(key: string, options: {type: 'string'|'number'|'boolean', default?: any, describe: string}): this
option(key: string|Record<string,Options>, opt?: Options): this

6 Helpers
help(level?: number): this
parse(argv: string[]): any
argv: any
hideBin(argv: string[]): string[]

7 Module Formats
CommonJS: const {argv} = require('yargs')
ESM: import yargs from 'yargs'


## Supplementary Details
Implementation Steps:
1. Run npm install --save yargs
2. Create entry script with shebang #!/usr/bin/env node
3. Import yargs and hideBin
4. Create yargs() instance
5. Chain API calls: .scriptName, .usage, .command, .option or .positional
6. Add .help() or .demandCommand() for validation
7. Call .parse(hideBin(process.argv)) or access .argv

Options interface:
{
  alias?: string | string[];
  type?: 'string' | 'number' | 'boolean';
  default?: any;
  describe?: string;
  demandOption?: boolean;
}

Positional options:
{
  type: 'string' | 'number' | 'boolean';
  default?: any;
  describe: string;
}

Builder pattern in .command:
function builder(yargs: Argv): Argv

Handler signature:
function handler(argv: any): void

## Reference Details
API Interface Argv:
interface Argv {
  scriptName(name: string): this;
  usage(usage: string): this;
  command(name: string, description: string, builder?: (yargs: Argv)=>Argv, handler?: (argv: any)=>void): this;
  positional(key: string, options: {type: 'string'|'number'|'boolean', default?: any, describe: string}): this;
  option(key: string|Record<string,Options>, opt?: Options): this;
  demandCommand(min: number, max?: number, msg?: string): this;
  strictCommands(): this;
  help(level?: number): this;
  parse(argv: string[]): any;
  argv: any;
}

hideBin helper:
function hideBin(argv: string[]): string[]

Examples:
// CJS example
const { argv } = require('yargs');
if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}

// ESM example
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, argv => console.info(argv))
  .demandCommand(1)
  .parse();

Best Practices:
- Use hideBin(process.argv) to pass only user args.
- Call .strictCommands() to error on unknown commands.
- Use .demandCommand(1) to enforce at least one command.
- Define both .usage and .help() for consistent CLI UI.

Troubleshooting:
$ node example.js unknown
Expected: Error: Unknown command: unknown
Solution: Add .strictCommands() to Argv chain.

$ node example.js curl
Expected: Error: Not enough non-option arguments: expected at least 1
Solution: Use .demandCommand(1)


## Information Dense Extract
npm install --save yargs
yargs():Argv; hideBin(argv:string[]):string[]; scriptName(name:string):this; usage(pattern:string):this; command(name:string,desc:string,builder?(Argv)=>Argv,handler?(argv:any)=>void):this; positional(key:string,{type:'string'|'number'|'boolean',default?,describe:string}):this; option(key:string|Record<string,Options>,opt?:Options):this; demandCommand(min:number,max?:number,msg?:string):this; strictCommands():this; help(level?:number):this; parse(argv:string[]):any; argv:any; Options:{alias?:string|string[];type?:'string'|'number'|'boolean';default?:any;describe?:string;demandOption?:boolean;}

## Sanitised Extract
Table of Contents
1 Installation
2 Bootstrap
3 Initialization
4 Commands API
5 Options & Positional
6 Helpers
7 Module Formats

1 Installation
Command: npm install --save yargs

2 Bootstrap
Shebang: #!/usr/bin/env node
ESM import: import yargs from 'yargs'
Helper import: import { hideBin } from 'yargs/helpers'

3 Initialization
yargs(): returns Argv instance

4 Commands API
scriptName(name: string): this
usage(usage: string): this
command(name: string, description: string, builder?: (yargs: Argv)=>Argv, handler?: (argv: any)=>void): this
demandCommand(min: number, max?: number, msg?: string): this
strictCommands(): this

5 Options & Positional
positional(key: string, options: {type: 'string'|'number'|'boolean', default?: any, describe: string}): this
option(key: string|Record<string,Options>, opt?: Options): this

6 Helpers
help(level?: number): this
parse(argv: string[]): any
argv: any
hideBin(argv: string[]): string[]

7 Module Formats
CommonJS: const {argv} = require('yargs')
ESM: import yargs from 'yargs'

## Original Source
CLI Argument Parsing Libraries
https://yargs.js.org/docs/

## Digest of YARGS_API

# YARGS DETAILED DIGEST

Date Retrieved: 2024-06-15
Data Size: 348060 bytes

# Installation

Run in terminal:

npm install --save yargs

# Getting Started

#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', builder, handler)
  .help()
  .parse(hideBin(process.argv))

Functions builder and handler defined as below:

function builder(yargs) {
  return yargs.positional('name', {
    type: 'string',
    default: 'Cambi',
    describe: 'the name to say hello to'
  })
}

function handler(argv) {
  console.log('hello', argv.name, 'welcome to yargs!')
}

# API METHOD SIGNATURES

## scriptName(name: string): Argv
Sets the command binary name in help output.

## usage(usage: string): Argv
Defines usage pattern shown in help.

## command(name: string, description: string, builder?: (yargs: Argv) ⇒ Argv, handler?: (argv: any) ⇒ void): Argv
Registers a new command. `name` supports positional syntax (<required>, [optional], ...).

## positional(key: string, options: {type: 'string'|'number'|'boolean', default?: any, describe: string}): Argv
Defines a positional argument under a command.

## option(key: string|Record<string,Options>, opt?: Options): Argv
Adds or extends an option. Options interface: {alias?: string|string[], type?: 'string'|'number'|'boolean', default?: any, describe?: string, demandOption?: boolean}.

## help(level?: number): Argv
Generates help output. `level` toggles display verbosity.

## demandCommand(min?: number, max?: number, msg?: string): Argv
Enforces the number of commands. Throws error if unmet.

## strictCommands(): Argv
Enables error on unknown commands.

## parse(argv: string[]): any
Parses provided arguments array into an object.

## argv: any
Property that holds parsed arguments if parse() not explicitly called.

# HELPERS

import { hideBin } from 'yargs/helpers'

`hideBin(argv: string[]): string[]`
Removes the first two Node.js process arguments.


## Attribution
- Source: CLI Argument Parsing Libraries
- URL: https://yargs.js.org/docs/
- License: MIT License
- Crawl Date: 2025-05-06T15:31:52.976Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-05-06
