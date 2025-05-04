# YARGS_CORE

## Crawl Summary
Installed via npm install --save yargs. Use import yargs from 'yargs' or require('yargs'), plus hideBin helper. Initialize parser with yargs(hideBin(process.argv)), scriptName(), usage(), help(), parse(). Define commands via .command(name, desc, builder(yargs), handler(argv)), enforce via .demandCommand(). Define options via .option(key, {...}) and .positional(). Global modes: strict(), strictCommands(), strictOptions(), exitProcess(), showHelpOnFail(). Add help/version via .help(), .alias(), .version(). Dual distribution: ESM build + Rollup CJS bundle + package.json conditional exports. Experimental Deno support via URL import. v16 breaking: no deep imports, removed rebase(), Node 8 dropped.

## Normalised Extract
Table of Contents
1 Initialization and Parsing
2 Command Definition
3 Option Definition
4 Global Configuration
5 Helpers
6 Distribution Patterns

1 Initialization and Parsing
Import ESM: import yargs from 'yargs'; import { hideBin } from 'yargs/helpers'
Usage: yargs(hideBin(process.argv)).scriptName(scriptName).usage(usagePattern).help().parse()

2 Command Definition
.command(name:string, description:string, builder:(yargs)->yargs, handler:(argv)->void)
.demandCommand(min:number, max?:number)

3 Option Definition
.option(key:string, {
  alias?:string|string[]
  type:'string'|'number'|'boolean'
  default?:string|number|boolean
  describe:string
  requiresArg?:boolean
  choices?:Array<string|number>
  coerce?:(value)->any
})
.positional(name:string, {
  type:'string'|'number'|'boolean'
  default?:string|number|boolean
  describe:string
})

4 Global Configuration
.strict()
.strictCommands()
.strictOptions()
.exitProcess(enabled:boolean)
.showHelpOnFail(enabled:boolean, formatter?)

5 Helpers
hideBin(argv:string[]):string[]  removes node exec and script path

6 Distribution Patterns
ESM build from TypeScript
Rollup for CommonJS bundle
package.json exports:
  import: './esm/index.js'
  require: './cjs/index.js'

Deno Import:
import yargs from 'https://deno.land/x/yargs/deno.ts'
import {Arguments,YargsType} from 'https://deno.land/x/yargs/types.ts'

yargs().command('download <files...>', 'download', (yargs:YargsType)=>yargs.positional('files',{describe:'files'}),(argv:Arguments)=>console.info(argv)).strictCommands().demandCommand(1).parse(Deno.args)


## Supplementary Details
Installation:
  npm install --save yargs
Helpers:
  hideBin(process.argv) strips default args
Command:
  .command(name,desc,builder,handler) supports nested builder chaining
Options:
  .option(key,{alias,type,default,describe,requiresArg,choices,coerce})
  .positional(name,{type,default,describe})
Configuration:
  .strict(): throw on unknown commands/options
  .strictCommands(): throw on unknown commands
  .strictOptions(): throw on unknown options
  .demandCommand(1): require at least 1 command
  .exitProcess(false): return errors instead of process.exit
  .showHelpOnFail(true): display help on parsing errors


## Reference Details
API Method Signatures:
function yargs(argv?:string[]): yargs.Argv<{}>
interface Argv<T> {
  scriptName(name:string): this
  usage(command:string): this
  command(cmd:string|string[], description:string, builder?: (args:Argv<any>)=>Argv<any>, handler?: (args:T)=>void): this
  demandCommand(min:number, max?:number): this
  option(key:string, opts:OptionDefinition): this
  positional(name:string, opts:PositionalDefinition): this
  help(key?:string): this
  alias(key:string, alias:string|string[]): this
  version(version?:string, key?:string): this
  parse(argv?:string[]): T
  strict(): this
  strictCommands(): this
  strictOptions(): this
  exitProcess(enabled:boolean): this
  showHelpOnFail(enabled:boolean, formatter?:(msg:string,dash:string)=>string): this
}
interface OptionDefinition {
  alias?:string|string[];
  type:'string'|'number'|'boolean';
  default?:string|number|boolean;
  describe:string;
  requiresArg?:boolean;
  choices?:Array<string|number>;
  coerce?:(arg:any)=>any;
}
interface PositionalDefinition {
  type:'string'|'number'|'boolean';
  default?:string|number|boolean;
  describe:string;
}
helper hideBin(argv:string[]): string[]

Code Example:
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const parser = yargs(hideBin(process.argv))
  .scriptName('app')
  .usage('$0 <cmd> [options]')
  .option('verbose', { alias:'v', type:'boolean', default:false, describe:'enable verbose logging'})
  .command('start <port>', 'start server', yargs=>yargs.positional('port',{type:'number',describe:'port to listen on'}), argv=>{
    if(argv.verbose) console.log('Starting on port',argv.port)
  })
  .strict()
  .help()
  .alias('help','h')
  .version('1.0.0','version')
  .alias('version','V')
  .parse()

package.json exports:
"exports":{
  "import":"./esm/index.js",
  "require":"./cjs/index.js"
}

Best Practices:
  - Use hideBin to clean argv
  - Validate unknown via strict
  - Chain commands/options before parse
  - Group related options

Troubleshooting:
Command: node app.js --unk
Expected: Error 'Unknown argument: unk'
With showHelpOnFail: shows help usage and error


## Information Dense Extract
install npm install --save yargs; import yargs from 'yargs'; import {hideBin} from 'yargs/helpers'; yargs(hideBin(process.argv)).scriptName(name).usage(pattern).option(key,{alias,type,default,describe,requiresArg,choices,coerce}).positional(name,{type,default,describe}).command(cmd,desc,builder,handler).demandCommand(n).strict().strictCommands().strictOptions().exitProcess(false).showHelpOnFail(true).help().alias(key,alias).version(version,key).parse(); API Argv: scriptName(string)->this; usage(string)->this; command(string|string[],string,(Argv)->Argv,(T)->void)->this; option(string,OptionDef)->this; positional(string,PositionalDef)->this; demandCommand(number,number?)->this; strict()->this; strictCommands()->this; strictOptions()->this; exitProcess(boolean)->this; showHelpOnFail(boolean,function?)->this; help(string?)->this; alias(string,string|string[])->this; version(string,string?)->this; parse(string[]?)->T; helper hideBin(argv:string[]):string[]; OptionDef: alias?:string|string[]; type:'string'|'number'|'boolean'; default?:string|number|boolean; describe:string; requiresArg?:boolean; choices?:Array<string|number>; coerce?:(any)->any; PositionalDef: type:'string'|'number'|'boolean'; default?:string|number|boolean; describe:string; distribution: TS->ESM compile, Rollup->CJS, conditional exports in package.json; Deno import from deno.land; v16: removed deep requires, removed rebase(), dropped Node 8 support.

## Sanitised Extract
Table of Contents
1 Initialization and Parsing
2 Command Definition
3 Option Definition
4 Global Configuration
5 Helpers
6 Distribution Patterns

1 Initialization and Parsing
Import ESM: import yargs from 'yargs'; import { hideBin } from 'yargs/helpers'
Usage: yargs(hideBin(process.argv)).scriptName(scriptName).usage(usagePattern).help().parse()

2 Command Definition
.command(name:string, description:string, builder:(yargs)->yargs, handler:(argv)->void)
.demandCommand(min:number, max?:number)

3 Option Definition
.option(key:string, {
  alias?:string|string[]
  type:'string'|'number'|'boolean'
  default?:string|number|boolean
  describe:string
  requiresArg?:boolean
  choices?:Array<string|number>
  coerce?:(value)->any
})
.positional(name:string, {
  type:'string'|'number'|'boolean'
  default?:string|number|boolean
  describe:string
})

4 Global Configuration
.strict()
.strictCommands()
.strictOptions()
.exitProcess(enabled:boolean)
.showHelpOnFail(enabled:boolean, formatter?)

5 Helpers
hideBin(argv:string[]):string[]  removes node exec and script path

6 Distribution Patterns
ESM build from TypeScript
Rollup for CommonJS bundle
package.json exports:
  import: './esm/index.js'
  require: './cjs/index.js'

Deno Import:
import yargs from 'https://deno.land/x/yargs/deno.ts'
import {Arguments,YargsType} from 'https://deno.land/x/yargs/types.ts'

yargs().command('download <files...>', 'download', (yargs:YargsType)=>yargs.positional('files',{describe:'files'}),(argv:Arguments)=>console.info(argv)).strictCommands().demandCommand(1).parse(Deno.args)

## Original Source
Yargs
https://yargs.js.org/docs/

## Digest of YARGS_CORE

# Yargs Core API Specifications and Implementation Patterns

## 1. Installation

### npm

  Command: npm install --save yargs
  Data Size Impact: +348 KB

## 2. Initialization and Parsing

### Import Patterns

  ESM:
    import yargs from 'yargs'
    import { hideBin } from 'yargs/helpers'

  CommonJS:
    const yargs = require('yargs')
    const { hideBin } = require('yargs/helpers')

### Basic Usage

  yargs(hideBin(process.argv))
    .scriptName(string scriptName)
    .usage(string usagePattern)
    .help() -> returns yargs instance
    .parse([string[] argv]) -> returns Arguments

## 3. Command Definition

### .command(name, description, builder, handler)

  Parameters:
    name: string | string[] (e.g. 'hello [name]')
    description: string
    builder: function(yargs) -> yargs
    handler: function(argv: Arguments) -> void

### .demandCommand(min: number, max?: number) -> yargs instance

  Ensures at least min commands provided; errors otherwise

## 4. Option Definitions

### .option(key, {
    alias?: string | string[]
    type: 'string' | 'number' | 'boolean'
    default?: string | number | boolean
    describe: string
    requiresArg?: boolean
    choices?: Array<string | number>
    coerce?: function(value) -> any
  }) -> yargs instance

### .positional(name, {
    type: 'string' | 'number' | 'boolean'
    default?: string | number | boolean
    describe: string
  }) -> yargs instance

## 5. Helpers Namespace

### hideBin(argv: string[]) -> string[]
  Strips Node executable and script path

## 6. Global Configuration Options

### .strict() -> yargs instance
  Validates unknown commands and options

### .strictCommands() -> yargs instance
  Validates unknown commands

### .strictOptions() -> yargs instance
  Validates unknown options

### .exitProcess([enabled: boolean]) -> yargs instance
  Controls process.exit behavior

### .showHelpOnFail([enabled: boolean], [messageFormatter]) -> yargs instance
  Displays help on failure

## 7. Help and Version

### .help([key]: string)
  Adds --help alias

### .alias(key: string, alias: string | string[])
  Creates aliases

### .version([version], [key])
  Adds --version alias

## 8. Examples

### Example: Basic Command

#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command(
    'hello [name]',
    'welcome ter yargs!',
    yargs => yargs.positional('name', {type:'string', default:'Cambi', describe:'the name to say hello to'}),
    argv => console.log('hello', argv.name, 'welcome to yargs!')
  )
  .help()
  .parse()

## 9. Implementation Patterns

### Dual Mode Distribution

  - TypeScript compile targeting ESM
  - Rollup bundle for CommonJS
  - Conditional exports field in package.json:
    {
      "exports": {
        "import": "./esm/index.js",
        "require": "./cjs/index.js"
      }
    }

### Deno Experimental Support

  import yargs from 'https://deno.land/x/yargs/deno.ts'
  import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts'

  yargs()
    .command('download <files...>', 'download a list of files', (yargs: YargsType) => yargs.positional('files', {describe:'a list of files'}), (argv: Arguments) => console.info(argv))
    .strictCommands()
    .demandCommand(1)
    .parse(Deno.args)

## 10. Breaking Changes in v16

  - Removed deep requires; only exposed helpers
  - Removed rebase() helper
  - Dropped Node.js 8 support

---

Date Retrieved: 2023-09-14
Attribution: yargs.js.org/docs/ (Data Size: 348060 bytes)

## Attribution
- Source: Yargs
- URL: https://yargs.js.org/docs/
- License: MIT License
- Crawl Date: 2025-05-04T04:50:19.976Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-05-04
