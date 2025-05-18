# YARGS_CLI

## Crawl Summary
Installation: npm install --save yargs

Main API:
- yargs([options]) => YargsInstance
- .scriptName(name:string) => YargsInstance
- .usage(usage:string) => YargsInstance
- .command(cmd:string, desc:string, builder:function, handler:function) => YargsInstance
- .positional(key:string, opts:{type,default,describe}) => YargsInstance
- .help() => YargsInstance
- .parse(args:string[]) => object

Helpers:
- hideBin(process.argv): string[]

Configuration:
scriptName: string, usage: string, help: boolean


## Normalised Extract
Table of Contents
1. Installation
2. Yargs Instance Creation
3. Command Definition
4. Positional Arguments
5. Parsing Input
6. Helpers Module

1. Installation
Run npm install --save yargs to add yargs to project dependencies.

2. Yargs Instance Creation
yargs([options]) returns a YargsInstance. Use import yargs from 'yargs' and import { hideBin } from 'yargs/helpers'. No options object is required for basic setup.

3. Command Definition
.command(cmd, desc, builder, handler)
- cmd: 'hello [name]' pattern including required and optional parameters.
- desc: 'welcome ter yargs!'
- builder: function receives YargsInstance to configure positional and options.
- handler: function(argv) receives parsed arguments.
Returns YargsInstance to chain further calls.

4. Positional Arguments
.positional(key, opts)
- key: argument name as string.
- opts: object with:
  - type: 'string'|'number'|'boolean'|'array'
  - default: default value for argument.
  - describe: description for help.
Called within builder function for a command.

5. Parsing Input
.parse(argsArray)
- argsArray: array of strings, usually hideBin(process.argv).
- Returns object with parsed key-value pairs.

6. Helpers Module
hideBin(process.argv) strips node executable and script path, returning only user-provided args.


## Supplementary Details
Parameter Values and Defaults:
- type options: string, number, boolean, array
- default: any literal matching type

Implementation Steps:
1. import yargs and hideBin
2. instantiate yargs()
3. chain .scriptName, .usage, .command, .help, .parse

Configuration Options:
- scriptName: custom binary name in help output
- usage: usage pattern displayed in help
- help: flag to generate help text

Building Commands:
- Use builder callback to define positional and options
- Define multiple commands by chaining .command calls
- Use .demandCommand(n) to require at least n commands


## Reference Details
API Specifications:
1. yargs(options?: object): YargsInstance
2. YargsInstance.scriptName(name: string): YargsInstance
3. YargsInstance.usage(usage: string): YargsInstance
4. YargsInstance.command(cmd: string, description: string, builder: (yargs: YargsInstance) => YargsInstance, handler: (argv: Record<string, any>) => void): YargsInstance
5. YargsInstance.positional(key: string, opts: {type: 'string'|'number'|'boolean'|'array'; default?: any; describe: string;}): YargsInstance
6. YargsInstance.help(): YargsInstance
7. YargsInstance.parse(args: string[]): Record<string, any>

Detailed Code Example:
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command(
    'hello [name]',
    'welcome ter yargs!',
    (yargs) => yargs.positional('name', { type: 'string', default: 'Cambi', describe: 'the name to say hello to' }),
    (argv) => { console.log('hello', argv.name, 'welcome to yargs!') }
  )
  .command(
    'bye <town>',
    'say goodbye to a town',
    (yargs) => yargs.positional('town', { type: 'string', describe: 'town name' }),
    (argv) => { console.log('bye from', argv.town) }
  )
  .demandCommand(1, 'You need to specify at least one command')
  .option('verbose', { alias: 'v', type: 'boolean', default: false, describe: 'enable verbose logging' })
  .help()
  .parse(hideBin(process.argv))

Configuration Options Table:
Option    Alias Type     Default Description
verbose   v     boolean  false   enable verbose logging

Best Practices:
- Always call .demandCommand for mandatory commands
- Group options by functional area by naming patterns
- Use aliases for frequently used flags
- Provide detailed describe texts

Troubleshooting:
Command not recognized error:
$ node example.js
> pirate-parser <cmd> [args]
> Commands:
>   pirate-parser hello [name]
> Options:
>   --help  Show help [boolean]

Ensure .demandCommand is configured.

Missing positional argument town:
$ node example.js bye
Error: Missing required argument: town


## Information Dense Extract
install: npm install --save yargs
import yargs from 'yargs'; import { hideBin } from 'yargs/helpers';
API: yargs(opts?):Yargs; .scriptName(s):Yargs; .usage(u):Yargs; .command(cmd,desc,builder(fn:Yargs=>Yargs),handler(fn:argv=>void)):Yargs; .positional(key, {type:string|number|boolean|array, default?, describe}):Yargs; .option(name,{alias?,type,default,describe}):Yargs; .demandCommand(n,message?):Yargs; .help():Yargs; .parse(args:string[]):Record<string,any>;
Example: yargs().scriptName('cli').usage('$0 <cmd>').command('run <file>','run file',y=>y.positional('file',{type:'string',describe:'file path'}),(argv)=>console.log(argv)).option('verbose',{alias:'v',type:'boolean',default:false,describe:'verbose'}).demandCommand(1).help().parse(hideBin(process.argv));

## Sanitised Extract
Table of Contents
1. Installation
2. Yargs Instance Creation
3. Command Definition
4. Positional Arguments
5. Parsing Input
6. Helpers Module

1. Installation
Run npm install --save yargs to add yargs to project dependencies.

2. Yargs Instance Creation
yargs([options]) returns a YargsInstance. Use import yargs from 'yargs' and import { hideBin } from 'yargs/helpers'. No options object is required for basic setup.

3. Command Definition
.command(cmd, desc, builder, handler)
- cmd: 'hello [name]' pattern including required and optional parameters.
- desc: 'welcome ter yargs!'
- builder: function receives YargsInstance to configure positional and options.
- handler: function(argv) receives parsed arguments.
Returns YargsInstance to chain further calls.

4. Positional Arguments
.positional(key, opts)
- key: argument name as string.
- opts: object with:
  - type: 'string'|'number'|'boolean'|'array'
  - default: default value for argument.
  - describe: description for help.
Called within builder function for a command.

5. Parsing Input
.parse(argsArray)
- argsArray: array of strings, usually hideBin(process.argv).
- Returns object with parsed key-value pairs.

6. Helpers Module
hideBin(process.argv) strips node executable and script path, returning only user-provided args.

## Original Source
Zod Schema Validation, OpenAPI Generation & CLI Configuration
https://yargs.js.org/docs/

## Digest of YARGS_CLI

# Yargs CLI Documentation

## 1. Installation

```bash
npm install --save yargs
```

## 2. Basic Usage

```javascript
#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command(
    'hello [name]',
    'welcome ter yargs!',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        default: 'Cambi',
        describe: 'the name to say hello to'
      })
    },
    (argv) => {
      console.log('hello', argv.name, 'welcome to yargs!')
    }
  )
  .help()
  .parse(hideBin(process.argv))
```

## 3. API Specifications

### yargs(options?)
- **Parameters:**
  - options: object (optional)
- **Returns:** YargsInstance

### .scriptName(name)
- **Parameters:**
  - name: string
- **Returns:** YargsInstance

### .usage(usage)
- **Parameters:**
  - usage: string
- **Returns:** YargsInstance

### .command(cmd, description, builder, handler)
- **Parameters:**
  - cmd: string
  - description: string
  - builder: function(YargsInstance) => YargsInstance
  - handler: function(argv: object)
- **Returns:** YargsInstance

### .positional(key, opts)
- **Parameters:**
  - key: string
  - opts: { type: 'string'|'number'|'boolean'|'array', default?: any, describe: string }
- **Returns:** YargsInstance

### .help()
- **Returns:** YargsInstance

### .parse(args)
- **Parameters:**
  - args: string[]
- **Returns:** object

## 4. Configuration Options

| Option       | Type     | Default          | Description                             |
|--------------|----------|------------------|-----------------------------------------|
| scriptName   | string   | undefined        | Custom script name shown in help        |
| usage        | string   | $0 <cmd> [args]  | Usage instructions                      |
| help         | boolean  | false            | Show help menu                         |

## 5. Examples

- Show help:
  ```bash
  node example.js --help
  ```
- Run command:
  ```bash
  node example.js hello --name Parrot
  # Output: hello Parrot welcome to yargs!
  ```


## Attribution
- Source: Zod Schema Validation, OpenAPI Generation & CLI Configuration
- URL: https://yargs.js.org/docs/
- License: License: MIT
- Crawl Date: 2025-05-18T06:28:10.826Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-05-18
