library/COMMANDER_JS.md
# library/COMMANDER_JS.md
# COMMANDER_JS

## Crawl Summary
Installation npm install commander
Options API: .option(flags,description[,default][,parser]), .requiredOption, .addOption(new Option(flags,desc).choices([...]).default(val).env(var).conflicts(opt).implies(obj).argParser(fn).preset(val).hideHelp().makeOptionMandatory())
Commands API: .command(name[,desc][,config]), .addCommand, .argument(name[,desc][,default][,parser]), .alias, .usage, .description, .summary, .action(handler(args,options,command)), .hook(event,fn)
Parsing: .parse([argv],{from}), .parseAsync, .enablePositionalOptions, .passThroughOptions, .allowUnknownOption, .allowExcessArguments
Help: .helpOption, .helpCommand, .addHelpText, .showHelpAfterError, .showSuggestionAfterError, .help, .outputHelp, .helpInformation
Error Handling: .exitOverride, .error, .version, .name, .createCommand, .storeOptionsAsProperties
Configuration: .configureHelp, .createHelp, .configureOutput
Stand-alone executables: .command(name,args,desc) searches for bin, .executableDir
Hooks: preAction, postAction, preSubcommand

## Normalised Extract
Table of Contents
1 Installation
2 Declaring program
3 Options
4 Commands
5 Parsing
6 Help

1 Installation
npm install commander

2 Declaring program
CommonJS: const { program } = require('commander')
ESM: import { Command } from 'commander'; const program = new Command()

3 Options
.option(flags: string, description: string, defaultValue?: any, parser?: (value:string,prev:any)=>any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value:string,prev:any)=>any)
.addOption(new Option(flags, description)
    .default(val)
    .choices([...])
    .env(envVar)
    .conflicts(opt)
    .implies({optName:optVal})
    .argParser(fn)
    .preset(val)
    .hideHelp()
    .makeOptionMandatory())
Access options: program.opts(), program.getOptionValue(key), program.setOptionValue(key,value)
Option types: boolean (--flag), value (<value>), optional ([value]), variadic (...)

4 Commands
.command(name:string, description?:string, config?:object)
.addCommand(cmd:Command)
.argument(name:string, description?:string, defaultValue?:any, parser?:(value,prev)=>any)
.alias(name:string)
.usage(string)
.description(string)
.summary(string)
.action((...args,options,command)=>{})
.hook('preAction'|'postAction'|'preSubcommand', (thisCmd,actionCmd)=>{})

5 Parsing
.parse(argv?:string[],{from:'node'|'user'|'electron'})
.parseAsync(argv?:string[],{from})
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption([bool])
.allowExcessArguments([bool])

6 Help
.helpOption(flags:string,desc:string)
.helpCommand(name?:string|false,desc?:string)
.addHelpText(position:'beforeAll'|'before'|'after'|'afterAll',textOrFn)
.showHelpAfterError([msg])
.showSuggestionAfterError([bool])
.help()
.outputHelp()
.helpInformation()

## Supplementary Details
.configureHelp({ sortSubcommands?:boolean; sortOptions?:boolean; showGlobalOptions?:boolean }) customize help
.createHelp() returns new Help instance for subclassing
.configureOutput({ writeOut(str):void; writeErr(str):void; outputError(str,write):void }) redirect stdout/stderr and style errors
.exitOverride([callback(error:CommanderError)]) throw CommanderError instead of process.exit
.error(message:string, {exitCode?:number, code?:string}) trigger CommanderError with code and exitCode
.version(version:string, flags?:string, description?:string) set version option flags and behavior
.name(programName:string) set program name for usage and bin lookup
.createCommand(name?:string) factory to instantiate new Command
.storeOptionsAsProperties() enable legacy property storage of options


## Reference Details
.option(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.addOption(option: Option): Command
.command(name: string, description?: string, config?: { executableFile?: string; isDefault?: boolean; hidden?: boolean; }): Command
.addCommand(cmd: Command, config?: { executableFile?: string; isDefault?: boolean; hidden?: boolean }): Command
.argument(name: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.alias(alias: string): Command
.usage(usage: string): Command
.description(description: string): Command
.summary(text: string): Command
.action(handler: (...args: any[], options: object, command: Command) => void | Promise<void>): Command
.hook(event: 'preAction'|'postAction'|'preSubcommand', fn: (thisCommand: Command, actionCommand: Command) => void | Promise<void>): Command
.parse(argv?: string[], options?: { from: 'node'|'user'|'electron' }): Command
.parseAsync(argv?: string[], options?: { from: 'node'|'user'|'electron' }): Promise<Command>
.enablePositionalOptions(): Command
.passThroughOptions(): Command
.allowUnknownOption(allow?: boolean): Command
.allowExcessArguments(allow?: boolean): Command
.helpOption(flags: string, description: string): Command
.helpCommand(name?: string | false, description?: string): Command
.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', text: string | ((context: { error: boolean; command: Command }) => string)): Command
.configureOutput(opts: { writeOut(str: string): void; writeErr(str: string): void; outputError(str: string, write: (s: string) => void): void }): Command
.exitOverride(callback?: (error: CommanderError) => void): Command
.error(message: string, opts?: { exitCode?: number; code?: string }): never
.version(version: string, flags?: string, description?: string): Command
.name(name: string): Command
.createCommand(name?: string): Command
.storeOptionsAsProperties(): Command

// Example Code
```js
const { Command, Option } = require('commander');
const program = new Command();
program
  .name('app')
  .version('1.0.0', '-v, --version', 'output version')
  .option('-p, --port <number>', 'port number', 3000, parseInt)
  .requiredOption('--env <env>', 'environment variable')
  .addOption(new Option('--mode <mode>', 'run mode').choices(['dev','prod']).default('dev'))
  .command('start')
    .description('Launch server')
    .argument('<script>', 'script file to run')
    .option('-d, --debug', 'enable debug')
    .action((script, options) => {
      console.log('Running', script, 'on port', options.port);
    });
program.parse(process.argv);
```

// Troubleshooting
$ app --unknown
error: unknown option '--unknown' (Did you mean --version?)
Use .allowUnknownOption() to accept unknown or .showHelpAfterError() to display full help after errors.

$ app
error: required option '--env <env>' not specified
Use .requiredOption() or provide default in environment.

Debugging stand-alone executables:
- node --inspect childProcessPort = parentPort+1
- VSCode: set autoAttachChildProcesses=true in launch.json


## Information Dense Extract
npm install commander; require or import Command
API: .option(flags,desc,default?,parser?); .requiredOption; .addOption(new Option().choices().default().env().conflicts().implies().argParser().preset().hideHelp().makeOptionMandatory())
Commands: .command(name,desc?,config?); .addCommand; .argument(name,desc?,default?,parser?); .alias; .usage; .description; .summary; .action(handler(args,opts,cmd)); .hook(preAction/postAction/preSubcommand,fn)
Parsing: .parse([argv],{from:'node'|'user'|'electron'}); .parseAsync; .enablePositionalOptions; .passThroughOptions; .allowUnknownOption; .allowExcessArguments
Help: .helpOption(flags,desc); .helpCommand(name?,desc?); .addHelpText(position,textOrFn); .showHelpAfterError; .showSuggestionAfterError; .help; .outputHelp; .helpInformation
Error/Exit: .exitOverride; .error(msg,{exitCode,code}); .version; .name; .createCommand; .storeOptionsAsProperties
Configure: .configureHelp; .createHelp; .configureOutput(writeOut,writeErr,outputError)
Examples: reference code above
Troubleshoot: unknown option -> allowUnknownOption or showHelpAfterError; missing required -> requiredOption; debug executables -> inspector port+1 or VSCode autoAttachChildProcesses

## Sanitised Extract
Table of Contents
1 Installation
2 Declaring program
3 Options
4 Commands
5 Parsing
6 Help

1 Installation
npm install commander

2 Declaring program
CommonJS: const { program } = require('commander')
ESM: import { Command } from 'commander'; const program = new Command()

3 Options
.option(flags: string, description: string, defaultValue?: any, parser?: (value:string,prev:any)=>any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value:string,prev:any)=>any)
.addOption(new Option(flags, description)
    .default(val)
    .choices([...])
    .env(envVar)
    .conflicts(opt)
    .implies({optName:optVal})
    .argParser(fn)
    .preset(val)
    .hideHelp()
    .makeOptionMandatory())
Access options: program.opts(), program.getOptionValue(key), program.setOptionValue(key,value)
Option types: boolean (--flag), value (<value>), optional ([value]), variadic (...)

4 Commands
.command(name:string, description?:string, config?:object)
.addCommand(cmd:Command)
.argument(name:string, description?:string, defaultValue?:any, parser?:(value,prev)=>any)
.alias(name:string)
.usage(string)
.description(string)
.summary(string)
.action((...args,options,command)=>{})
.hook('preAction'|'postAction'|'preSubcommand', (thisCmd,actionCmd)=>{})

5 Parsing
.parse(argv?:string[],{from:'node'|'user'|'electron'})
.parseAsync(argv?:string[],{from})
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption([bool])
.allowExcessArguments([bool])

6 Help
.helpOption(flags:string,desc:string)
.helpCommand(name?:string|false,desc?:string)
.addHelpText(position:'beforeAll'|'before'|'after'|'afterAll',textOrFn)
.showHelpAfterError([msg])
.showSuggestionAfterError([bool])
.help()
.outputHelp()
.helpInformation()

## Original Source
Commander.js
https://github.com/tj/commander.js#readme

## Digest of COMMANDER_JS

# Installation

npm install commander

# Options

.option(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.addOption(new Option(flags: string, description: string)
    .hideHelp()
    .default(value: any, label: string)
    .choices(arrayOfValues)
    .env(envVarName)
    .conflicts(optionName)
    .implies({ key: value })
    .argParser(fn)
    .preset(value)
    .makeOptionMandatory())

Option Types:
- Boolean: --flag
- Value: <value>
- Optional: [value]
- Variadic: <values...> or [values...]

Accessing Options:
- program.opts(): returns object of option key and values
- program.getOptionValue(key)
- program.setOptionValue(key, value)

# Commands

.command(name: string, description?: string, config?: { executableFile?: string; isDefault?: boolean; hidden?: boolean; })
.addCommand(commandInstance: Command)
.argument(name: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.alias(alias: string)
.usage(usage: string)
.description(text: string)
.summary(text: string)
.action((...args: any[], options: object, command: Command) => void)
.hook(event: 'preAction' | 'postAction' | 'preSubcommand', (thisCommand: Command, actionCommand: Command) => void)

# Parsing and Execution

.parse(argv?: string[], options?: { from: 'node' | 'user' | 'electron' })
.parseAsync(argv?: string[], options?: { from: 'node' | 'user' | 'electron' })
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption([allow?: boolean])
.allowExcessArguments([allow?: boolean])

# Help System

.helpOption(flags: string, description: string)
.helpCommand(name?: string | false, description?: string)
.addHelpText(position: 'beforeAll' | 'before' | 'after' | 'afterAll', textOrFn: string | ((context: { error: boolean; command: Command }) => string))
.showHelpAfterError([message: string])
.showSuggestionAfterError([enable: boolean])
.help(): void  // display help and exit
.outputHelp([options: { error: boolean }]): void  // display without exit
.helpInformation(): string  // return help string

# Error and Exit Handling

.exitOverride([callback: (error: CommanderError) => void])
.error(message: string, opts?: { exitCode?: number; code?: string }): never
.version(version: string, flags?: string, description?: string)
.name(programName: string)
.createCommand(name?: string): Command
.storeOptionsAsProperties()

# Additional Configuration

.configureHelp({ sortSubcommands?: boolean; sortOptions?: boolean; showGlobalOptions?: boolean })
.createHelp(): Help
.configureOutput({ writeOut: (str: string) => void; writeErr: (str: string) => void; outputError: (str: string, write: (s: string) => void) => void })

# Stand-alone Executables

.command('name [args...]', 'description')  // stand-alone: directory search for bin files
.executableDir(path: string)

# Life-cycle Hooks

.hook('preAction', fn)
.hook('postAction', fn)
.hook('preSubcommand', fn)

# Examples and Code Patterns

const { Command, Option } = require('commander')
const program = new Command()
program
  .name('app')
  .version('1.0.0', '-v, --version', 'output the current version')
  .option('-p, --port <number>', 'port number', 3000, parseInt)
  .requiredOption('--env <environment>', 'environment name')
  .addOption(new Option('--mode <mode>', 'run mode').choices(['dev', 'prod']).default('dev'))
  .command('start')
    .description('start the server')
    .argument('<file>', 'script file')
    .option('-d, --debug', 'enable debug')
    .action((file, options) => {
      // implementation
    })
program.parse(process.argv)

Data Size: 777171 bytes
Retrieved: 2024-06-20

## Attribution
- Source: Commander.js
- URL: https://github.com/tj/commander.js#readme
- License: MIT License
- Crawl Date: 2025-05-07T03:35:49.535Z
- Data Size: 777171 bytes
- Links Found: 5231

## Retrieved
2025-05-07
library/META_SCHEMAS.md
# library/META_SCHEMAS.md
# META_SCHEMAS

## Crawl Summary
The JSON Schema specification version 2020-12 is split into Core and Validation, published as a single meta-schema at https://json-schema.org/draft/2020-12/schema. A Hyper-Schema meta-schema (with link keywords) is at /hyper-schema. Recommended-output schema and eight single-vocabulary schemas (core, applicator, validation, unevaluated, format-annotation, format-assertion, content, meta-data) live under /meta/. Relative JSON Pointers spec is available but not required by Core/Validation. Migration mappings for older drafts are documented.

## Normalised Extract
Table of Contents:
 1. Meta-Schema URIs
 2. Single-Vocabulary Files
 3. Relative JSON Pointer
 4. Migration Paths

1. Meta-Schema URIs
 - Core/Validation: https://json-schema.org/draft/2020-12/schema
 - Hyper-Schema: https://json-schema.org/draft/2020-12/hyper-schema
 - Recommended Output: https://json-schema.org/draft/2020-12/meta/recommended-output

2. Single-Vocabulary Files
 All under https://json-schema.org/draft/2020-12/meta/: core.json, applicator.json, validation.json, unevaluated.json, format-annotation.json, format-assertion.json, content.json, meta-data.json

3. Relative JSON Pointer
 - URI: https://json-schema.org/draft/2020-12/relative-json-pointer
 - Adds token syntax: '#', '[<n>]', '/path'.

4. Migration Paths
 - 2019-09 → 2020-12: change identifier scheme, add unevaluated and content vocabularies.
 - 07 → 2019-09: add dynamic refs.
 - 06 → 07: add format-assertion.
 - 04 → 06: remove id in favor of $id.

## Supplementary Details
Usage of $schema:
 - In your JSON Schema document, set "$schema": "https://json-schema.org/draft/2020-12/schema" at the root.

Validator CLI Example (ajv):
 ajv compile-schema --strict=true --schemaId=auto --meta=2020-12 schema.json

Node.js: ajv@8
 const Ajv = require('ajv');
 const ajv = new Ajv({strict: true});
 ajv.addMetaSchema(require('./draft2020-12/schema.json'));
 const validate = ajv.compile(yourSchema);

Relative JSON Pointer Usage:
 { "$ref": "#1/definitions/foo" } // one level up, then path /definitions/foo

Handling Single-Vocabulary Schemas:
 ajv.addMetaSchema(require('./meta/validation.json'), 'https://json-schema.org/draft/2020-12/meta/validation')

## Reference Details
1. $schema Declaration:
   - Type: string (URI)
   - Example: "$schema": "https://json-schema.org/draft/2020-12/schema"

2. Ajv API Signatures (v8):
   constructor(options: { strict:boolean; schemaId?: 'auto'|'$id'|'id'; } ) → Ajv
   addMetaSchema(schema: object, key?: string) → void
   compile(schema: object) → ValidateFunction
   validate(schemaKey: string|object, data: any) → boolean

3. CLI Options:
   --strict boolean       default: false  enforce strict mode
   --schemaId string      default: auto   accept $id or id
   --meta version         e.g. 2019-09, 2020-12 loads built-in meta

4. Best Practice:
   Always include "$schema" at top of each schema file.
   Use separate files per vocabulary when building custom meta-schemas.

5. Troubleshooting:
   Command: ajv compile-schema --schemaId=auto bad-schema.json
   Expected: validation error with keyword and path
   If no error: check that "$schema" URI matches loaded meta-schema.

6. File Names and Locations:
   - Save core meta-schema as draft2020-12-schema.json
   - Save vocabularies under meta/ folder matching URI path

7. Migration Script:
   npx json-schema-draft-migrator --from=2019-09 --to=2020-12 path/to/schemas

8. Validator Behavior:
   - $id overrides resolution scope
   - Unevaluated vocabulary applies after validation keywords

9. Environment:
   Node.js >=12, ajv >=8

## Information Dense Extract
2020-12 Core/Validation meta-schema URI=https://json-schema.org/draft/2020-12/schema Hyper-Schema URI=/hyper-schema Recommended-Output URI=/meta/recommended-output Single-vocab URIs=/meta/{core,applicator,validation,unevaluated,format-annotation,format-assertion,content,meta-data}.json Relative JSON Pointer URI=/relative-json-pointer Use "$schema":<URI> root-level. Ajv v8: new Ajv({strict:true,schemaId:'auto'}); addMetaSchema(schema,key?); compile()/validate(). CLI: --strict, --schemaId, --meta. Migration 2019-09→2020-12 adds unevaluated,content; 07→09 adds dynamicRefs; 06→07 adds formatAssertion; 04→06 switches id→$id.

## Sanitised Extract
Table of Contents:
 1. Meta-Schema URIs
 2. Single-Vocabulary Files
 3. Relative JSON Pointer
 4. Migration Paths

1. Meta-Schema URIs
 - Core/Validation: https://json-schema.org/draft/2020-12/schema
 - Hyper-Schema: https://json-schema.org/draft/2020-12/hyper-schema
 - Recommended Output: https://json-schema.org/draft/2020-12/meta/recommended-output

2. Single-Vocabulary Files
 All under https://json-schema.org/draft/2020-12/meta/: core.json, applicator.json, validation.json, unevaluated.json, format-annotation.json, format-assertion.json, content.json, meta-data.json

3. Relative JSON Pointer
 - URI: https://json-schema.org/draft/2020-12/relative-json-pointer
 - Adds token syntax: '#', '[<n>]', '/path'.

4. Migration Paths
 - 2019-09  2020-12: change identifier scheme, add unevaluated and content vocabularies.
 - 07  2019-09: add dynamic refs.
 - 06  07: add format-assertion.
 - 04  06: remove id in favor of $id.

## Original Source
JSON Schema
https://json-schema.org/specification.html

## Digest of META_SCHEMAS

# Current Version and Meta-Schemas (retrieved 2025-05-01)

## 2020-12 Core/Validation Dialect Meta-Schema

URI: https://json-schema.org/draft/2020-12/schema

This JSON document defines the Core foundation and Validation keywords.

## 2020-12 Hyper-Schema Dialect Meta-Schema

URI: https://json-schema.org/draft/2020-12/hyper-schema

Includes Core/Validation and hyperlinking keywords (from 2019-09).

## 2020-12 Recommended Output Meta-Schema

URI: https://json-schema.org/draft/2020-12/meta/recommended-output

Specifies structure of application-generated validation output.

## Single-Vocabulary Meta-Schemas (URIs under https://json-schema.org/draft/2020-12/meta/)

- core
- applicator
- validation
- unevaluated
- format-annotation
- format-assertion
- content
- meta-data

## Relative JSON Pointers

URI: https://json-schema.org/draft/2020-12/relative-json-pointer

Extends JSON Pointer for relative addressing; not used by Core/Validation.

## Migration Paths Between Drafts

- Draft-2019-09 → Draft-2020-12
- Draft-07 → Draft-2019-09
- Draft-06 → Draft-07
- Draft-04 → Draft-06

## Access Note

Download each URI and open locally to avoid GitHub Pages JSON rendering limitations.

## Attribution
- Source: JSON Schema
- URL: https://json-schema.org/specification.html
- License: CC0 1.0 Universal
- Crawl Date: 2025-05-07T06:32:31.611Z
- Data Size: 2325185 bytes
- Links Found: 10204

## Retrieved
2025-05-07
library/JS_YAML.md
# library/JS_YAML.md
# JS_YAML

## Crawl Summary
Installation: npm install js-yaml  CLI: js-yaml [-h] [-v] [-c] [-t] file

Methods:
• load(string, options) -> parsed doc; options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false; throws on multi-doc input
• loadAll(string, iterator?, options) -> array of docs or applies iterator
• dump(object, options) -> YAML string; options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, styles={}, schema=DEFAULT_SCHEMA, sortKeys=false|func, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType="'", forceQuotes=false, replacer=null

Supported schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA
Supported types: null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map
Styles per tag: canonical,lowercase,uppercase,camelcase,empty,binary,octal,decimal,hexadecimal

Caveats: complex keys stringified, implicit block mapping keys unsupported

## Normalised Extract
Table of Contents
1 Installation
2 CLI Usage
3 API Methods
  3.1 load
  3.2 loadAll
  3.3 dump
4 Schema Options
5 Dump Styling
6 Supported Types
7 Caveats

1 Installation
Run npm install js-yaml or npm install -g js-yaml for CLI.

2 CLI Usage
Command: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file
  -h show help
  -v show version
  -c compact error messages
  -t show stack trace

3 API Methods
3.1 load
Signature: yaml.load(string, options) -> Object|string|number|null|undefined
Throws: YAMLException on parse error or multi-doc input
Options:
  filename: string|null default null
  onWarning: function(YAMLException) default null
  schema: one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA default DEFAULT_SCHEMA
  json: boolean default false

3.2 loadAll
Signature: yaml.loadAll(string, iterator?, options) -> Array<any> if no iterator
iterator(doc) called per document
Options: same as load

3.3 dump
Signature: yaml.dump(object, options) -> string
Throws: YAMLException on invalid types unless skipInvalid=true
Options:
  indent: number default 2
  noArrayIndent: boolean default false
  skipInvalid: boolean default false
  flowLevel: number default -1
  styles: object tag->style default {}
  schema: one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA default DEFAULT_SCHEMA
  sortKeys: boolean|function default false
  lineWidth: number default 80
  noRefs: boolean default false
  noCompatMode: boolean default false
  condenseFlow: boolean default false
  quotingType: ' or " default '
  forceQuotes: boolean default false
  replacer: function(key,value) default null

4 Schema Options
FAILSAFE_SCHEMA: strings, arrays, plain objects
JSON_SCHEMA: JSON types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: all YAML types

5 Dump Styling
Available styles per tag:
  !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty("")
  !!int: binary(0b1010), octal(0o52), decimal(42), hexadecimal(0x2A)
  !!bool: lowercase(true), uppercase(TRUE), camelcase(True)
  !!float: lowercase(.inf), uppercase(.INF), camelcase(.Inf)
Use options.styles:{ '!!null':'canonical' }

6 Supported Types
!!null -> null
!!bool -> boolean
!!int -> number
!!float -> number
!!binary -> Buffer
!!timestamp -> Date
!!omap -> Array<[k,v]>
!!pairs -> Array<[k,v]>
!!set -> Array<object with null values>
!!str -> string
!!seq -> Array<any>
!!map -> object

7 Caveats
• Using arrays or objects as keys stringifies via toString()
• Implicit block mapping keys with anchors unsupported


## Supplementary Details
Installation: npm install js-yaml@latest or npm install -g js-yaml@latest for CLI. Ensure Node.js >= v6.

Loading file example:
const fs = require('fs')
const yaml = require('js-yaml')
try {
  const source = fs.readFileSync('config.yml','utf8')
  const config = yaml.load(source, { filename:'config.yml', onWarning:w=>console.warn(w.message), schema:yaml.JSON_SCHEMA, json:true })
} catch(e) {
  if(e instanceof yaml.YAMLException) console.error('YAML parse error:',e.message)
  else throw e
}

Dumping object example:
const obj = { name:'app', items:[1,2,3] }
const yml = yaml.dump(obj, { indent:4, noArrayIndent:true, flowLevel:0, sortKeys:(a,b)=>a.localeCompare(b), lineWidth:-1, quotingType:'"', forceQuotes:true })

Schema definitions:
const {FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA} = require('js-yaml')

Define custom style:
yaml.dump(obj, { styles:{ '!!int':'hexadecimal' } })


## Reference Details
// load method
const yaml = require('js-yaml')
// Signature: load(string: string, options?: {
//   filename?: string|null,
//   onWarning?: (e: YAMLException)=>void,
//   schema?: Schema,
//   json?: boolean
// }) => any
// Throws YAMLException

// loadAll method
// Signature: loadAll(string: string, iterator?: (doc:any)=>void, options?: sameAsLoad) => any[]

// dump method
// Signature: dump(object: any, options?: {
//   indent?: number,
//   noArrayIndent?: boolean,
//   skipInvalid?: boolean,
//   flowLevel?: number,
//   styles?: {[tag:string]:string},
//   schema?: Schema,
//   sortKeys?: boolean|((a:string,b:string)=>number),
//   lineWidth?: number,
//   noRefs?: boolean,
//   noCompatMode?: boolean,
//   condenseFlow?: boolean,
//   quotingType?: '"'|"'",
//   forceQuotes?: boolean,
//   replacer?: (key:any,value:any)=>any
// }) => string

// Best practice: safe loading
function safeLoadFile(path) {
  const src = fs.readFileSync(path,'utf8')
  return yaml.load(src, { schema: yaml.JSON_SCHEMA, json:true })
}

// Troubleshooting:
// Command to run CLI with full trace:
// js-yaml --trace config.yml
// Expected output on invalid YAML:
// Error: unacceptable indentation at line 3, column 5:
//     key: value
//     ^


## Information Dense Extract
yaml.load(string, {filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false}) -> any throws YAMLException
yaml.loadAll(string, iterator?, options) -> any[]
yaml.dump(object, {indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, styles={}, schema=DEFAULT_SCHEMA, sortKeys=false|func, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='\'', forceQuotes=false, replacer=null}) -> string
Schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA
Styles per tag: !!null(canonical,lowercase,uppercase,camelcase,empty), !!int(binary,octal,decimal,hexadecimal), !!bool(lowercase,uppercase,camelcase), !!float(lowercase,uppercase,camelcase)
Supported types: null,bool,int,float,binary(timestamp),Buffer,Date,omap,pairs,set,str,seq,map
CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file


## Sanitised Extract
Table of Contents
1 Installation
2 CLI Usage
3 API Methods
  3.1 load
  3.2 loadAll
  3.3 dump
4 Schema Options
5 Dump Styling
6 Supported Types
7 Caveats

1 Installation
Run npm install js-yaml or npm install -g js-yaml for CLI.

2 CLI Usage
Command: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file
  -h show help
  -v show version
  -c compact error messages
  -t show stack trace

3 API Methods
3.1 load
Signature: yaml.load(string, options) -> Object|string|number|null|undefined
Throws: YAMLException on parse error or multi-doc input
Options:
  filename: string|null default null
  onWarning: function(YAMLException) default null
  schema: one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA default DEFAULT_SCHEMA
  json: boolean default false

3.2 loadAll
Signature: yaml.loadAll(string, iterator?, options) -> Array<any> if no iterator
iterator(doc) called per document
Options: same as load

3.3 dump
Signature: yaml.dump(object, options) -> string
Throws: YAMLException on invalid types unless skipInvalid=true
Options:
  indent: number default 2
  noArrayIndent: boolean default false
  skipInvalid: boolean default false
  flowLevel: number default -1
  styles: object tag->style default {}
  schema: one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA default DEFAULT_SCHEMA
  sortKeys: boolean|function default false
  lineWidth: number default 80
  noRefs: boolean default false
  noCompatMode: boolean default false
  condenseFlow: boolean default false
  quotingType: ' or ' default '
  forceQuotes: boolean default false
  replacer: function(key,value) default null

4 Schema Options
FAILSAFE_SCHEMA: strings, arrays, plain objects
JSON_SCHEMA: JSON types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: all YAML types

5 Dump Styling
Available styles per tag:
  !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty('')
  !!int: binary(0b1010), octal(0o52), decimal(42), hexadecimal(0x2A)
  !!bool: lowercase(true), uppercase(TRUE), camelcase(True)
  !!float: lowercase(.inf), uppercase(.INF), camelcase(.Inf)
Use options.styles:{ '!!null':'canonical' }

6 Supported Types
!!null -> null
!!bool -> boolean
!!int -> number
!!float -> number
!!binary -> Buffer
!!timestamp -> Date
!!omap -> Array<[k,v]>
!!pairs -> Array<[k,v]>
!!set -> Array<object with null values>
!!str -> string
!!seq -> Array<any>
!!map -> object

7 Caveats
 Using arrays or objects as keys stringifies via toString()
 Implicit block mapping keys with anchors unsupported

## Original Source
js-yaml
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# js-yaml API Reference

# load(string, options)
Parses a YAML string as a single document.

Method signature:

  yaml.load(string[, options]) -> Object|string|number|null|undefined throws YAMLException

Options:
  filename            default null               string used in error messages
  onWarning           default null               function(YAMLException)
  schema              default DEFAULT_SCHEMA      one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA
  json                default false              boolean: duplicate mapping keys override when true

Throws YAMLException on parse errors or multi-document input.

# loadAll(string, iterator, options)
Parses multi-document YAML string.

Method signature:

  yaml.loadAll(string[, iterator(doc)][, options]) -> Array<Object|string|number|null|undefined>

Parameters:
  iterator            function(doc) called for each doc
  options             same as load

Returns array of parsed documents if no iterator provided.

# dump(object, options)
Serializes JavaScript object to YAML.

Method signature:

  yaml.dump(object[, options]) -> string throws YAMLException

Options:
  indent              default 2     number of spaces for indentation
  noArrayIndent       default false boolean: do not indent array elements
  skipInvalid         default false boolean: skip invalid types without throwing
  flowLevel           default -1    number: depth to switch to flow style
  styles              default {}    object: tag to style map
  schema              default DEFAULT_SCHEMA one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA
  sortKeys            default false boolean or function(a,b)
  lineWidth           default 80    number: max line width, -1 unlimited
  noRefs              default false boolean: disable duplicate reference anchors
  noCompatMode        default false boolean: disable compat quoting for YAML1.1
  condenseFlow        default false boolean: omit spaces in flow style
  quotingType         default '      string: ''' or '"'
  forceQuotes         default false boolean: quote all non-key strings
  replacer            default null  function(key,value)

# Style options table
Tag      Styles                 Output examples
!!null   canonical,lowercase, uppercase,camelcase,empty
!!int    binary,octal,decimal,hexadecimal
!!bool   lowercase,uppercase,camelcase
!!float  lowercase,uppercase,camelcase

# Supported types
!!null => null
!!bool => boolean
!!int => number
!!float => number
!!binary => Buffer
!!timestamp => Date
!!omap => Array<[key,value]>
!!pairs => Array<[key,value]>
!!set => Array<object null>
!!str => string
!!seq => Array<any>
!!map => object

# Caveats
• Objects or arrays as mapping keys are stringified via toString().
• Implicit block mapping keys cannot be loaded.


## Attribution
- Source: js-yaml
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT License
- Crawl Date: 2025-05-07T12:33:48.905Z
- Data Size: 553062 bytes
- Links Found: 4508

## Retrieved
2025-05-07
library/ZOD_CORE.md
# library/ZOD_CORE.md
# ZOD_CORE

## Crawl Summary
Requirements: TS4.5+, strict mode. Install via npm/yarn/pnpm/bun, canary with @canary. Import z from "zod". Core constructors: z.string(), z.number(), z.bigint(), z.boolean(), z.date(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never(). Schemas: object, array, tuple, union, discriminatedUnion, record, map, set, enum, nativeEnum, lazy, function. Methods: .parse, .safeParse, .parseAsync, .safeParseAsync. Modifiers: optional, nullable, partial, deepPartial, required, array, nonempty, min, max, length, extend, merge, pick, omit, strict, passthrough, strip, catchall, brand, readonly, or, and, pipe. Transforms: .transform, .refine, .superRefine, z.preprocess, .default. Type inference: z.infer, z.input, z.output. Error customization via { message } and constructor params. Troubleshooting: try/catch or safeParse.

## Normalised Extract
Table of Contents:
1 Installation
2 Basic Usage
3 Core Schemas
4 Modifiers
5 Refinements & Transforms
6 Type Utilities
7 Error Handling

1 Installation
TypeScript 4.5+ with strict:true in tsconfig.json. Install zod: npm install zod (or yarn, pnpm, bun). Canary: zod@canary.

2 Basic Usage
import { z } from "zod". Create schemas and use parse/safeParse methods.

3 Core Schemas
z.string() z.number() z.bigint() z.boolean() z.date() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
4 container types
z.object({key:z.type}) z.array(z.type) z.tuple([...]) z.union([...]) z.discriminatedUnion("key", [...]) z.record(keySchema, valueSchema) z.map(k,v) z.set(v) z.enum(["A","B"]) z.nativeEnum(NativeEnum) z.lazy(()=>schema) z.function().args(...).returns(...)

4 Modifiers
.schema.optional() .nullable() .nullish() .array() .nonempty() .min(n) .max(n) .length(n) .partial() .deepPartial() .required() .extend({}) .merge(other) .pick({k:true}) .omit({k:true}) .strict() .passthrough() .strip() .catchall(schema) .brand() .readonly() .or() .and() .pipe()

5 Refinements & Transforms
.schema.transform(fn) .refine(fn,{message,path}) .superRefine((v,ctx)=>{}) z.preprocess(fn, schema) .default(value)

6 Type Utilities
type T = z.infer<typeof schema> type In = z.input<typeof schema> type Out = z.output<typeof schema>

7 Error Handling
schema.parse(data) throws ZodError with .errors array. Use schema.safeParse(data) to get result.success and result.data or result.error.


## Supplementary Details
Exact tsconfig.json snippet: {"compilerOptions":{"strict":true}}. CLI commands: npm install zod; yarn add zod; pnpm add zod; bun add zod. Canary builds: zod@canary. ensure TypeScript version>=4.5. Use import { z } from "zod". Default import path: "zod".
Use z.coerce.string(), z.coerce.number(), z.coerce.boolean(), z.coerce.bigint(), z.coerce.date() to coerce values using JS constructors. Boolean coercion: truthy->true, falsy->false.
Date coercion: new Date(input). validate invalid dates as failure.
String validations: .email(), .url(), .uuid(), .regex(regex), .datetime({offset?:boolean,local?:boolean,precision?:number}), .date(), .time({precision?:number}), .ip({version:"v4"|"v6"}), .cidr({version:"v4"|"v6"}).
Number validations: .gt(n), .gte(n), .lt(n), .lte(n), .int(), .positive(), .nonnegative(), .negative(), .nonpositive(), .multipleOf(n), .finite(), .safe().
BigInt validations similar with n suffix. NaN schema: z.nan().
Enum: z.enum([...]) yields .options array and .enum object. .extract([...]) .exclude([...]).
NativeEnum: z.nativeEnum(MyEnum).
Object unknownKey policy: default strip, use .passthrough(), .strict(), .catchall(schema).
Array sizing: .min(count,{message}), .max(count), .length(count). .nonempty({message}).
Tuple: .rest(schema).
Record: key type must be string or number; runtime keys always string.
Map and Set size constraints: .nonempty(), .min(n), .max(n), .size(n).
Function schemas: .args(...schemas), .returns(schema), .implement(fn).
Preprocess: z.preprocess(fn, schema).fn returns preconverted data.
Custom schemas: z.custom<Type>((val)=>boolean,{message}).



## Reference Details
API: z.string(): ZodString
z.number(): ZodNumber
z.bigint(): ZodBigInt
z.boolean(): ZodBoolean
z.date(): ZodDate
z.undefined(): ZodUndefined
z.null(): ZodNull
z.void(): ZodVoid
z.any(): ZodAny
z.unknown(): ZodUnknown
z.never(): ZodNever
z.object<Shape extends ZodRawShape>(shape: Shape): ZodObject<Shape,UnknownKeys,Catchall>
z.array<T extends ZodTypeAny>(schema: T): ZodArray<T>
z.tuple<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas: T): ZodTuple<T>
z.union<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas: T): ZodUnion<T>
z.discriminatedUnion<Key extends string, Options extends ZodDiscriminatedUnionOption<Key>[]>(discriminator: Key, options: Options): ZodDiscriminatedUnion<Key,Options>
z.record<Key extends ZodTypeAny,Value extends ZodTypeAny>(keySchema: Key, valueSchema: Value): ZodRecord<Key,Value>
z.map<Key extends ZodTypeAny,Value extends ZodTypeAny>(keySchema: Key, valueSchema: Value): ZodMap<Key,Value>
z.set<Elem extends ZodTypeAny>(elementSchema: Elem): ZodSet<Elem>
z.enum<Arr extends [string,...string[]]>(values: Arr): ZodEnum<Arr>
z.nativeEnum<E extends object>(e: E): ZodNativeEnum<E>
z.lazy<T>(getter: ()=>ZodType<T>): ZodLazy<T>
z.function(): ZodFunction<Args,Return>

.parse(data: unknown): T
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: true; data: T } | { success: false; error: ZodError }
.safeParseAsync(data: unknown): Promise<{ success: true; data: T } | { success: false; error: ZodError }>

Modifiers:
.optional(): ZodOptional<...>
.nullable(): ZodNullable<...>
.nullish(): ZodOptional<ZodNullable<...>>
.default(def: T): ZodDefault<...>
.array(): ZodArray<...>
.nonempty(opts?:{message:string}): ZodNonEmptyArray<...>
.min(n:number, opts?:{message:string}): ZodArray<...>
.max(n:number, opts?:{message:string}): ZodArray<...>
.length(n:number, opts?:{message:string}): ZodArray<...>
.partial(props?:{ [K in keyof T]?: boolean }): ZodObject<...>
.deepPartial(): ZodObject<...>
.required(props?:{ [K in keyof T]?: boolean }): ZodObject<...>
.extend(shape: ZodRawShape): ZodObject<...>
.merge(other: ZodObject): ZodObject<...>
.pick(props: { [K in keyof T]?: boolean }): ZodObject<...>
.omit(props: { [K in keyof T]?: boolean }): ZodObject<...>
.strict(): ZodObject<...>
.passthrough(): ZodObject<...>
.strip(): ZodObject<...>
.catchall(schema: ZodTypeAny): ZodObject<...>
.brand<B extends string>(): ZodBranded<...>
.readonly(): ZodObject<...>
.or(other: ZodTypeAny): ZodUnion<[Self,Other]>
.and(other: ZodTypeAny): ZodIntersection<Self,Other>
.pipe(schema: ZodType): ZodPipeline<Self,Schema>

.refine(check: (data:T)=>boolean|Promise<boolean>, params?:{message?:string,path?:(string|number)[], }
.superRefine((data:T,ctx:RefinementCtx)=>void)
.transform<U>(fn:(arg:T)=>U|Promise<U>): ZodEffects<...>
.preprocess(fn:(val:any)=>any, schema:ZodTypeAny): ZodEffects<...>

z.coerce.string(): ZodString converts via String(input)
z.coerce.number(): ZodNumber via Number(input)
z.coerce.boolean(): ZodBoolean via Boolean(input)
z.coerce.bigint(): ZodBigInt via BigInt(input)
z.coerce.date(): ZodDate via new Date(input)

Error customization in constructors: z.string({required_error:string, invalid_type_error:string}); in methods: .min(n,{message}); .email({message}); etc.

Implementation Patterns:
1. Define schema
2. Use schema.parse(data) or safeParse
3. Handle errors
4. Chain refinements and transforms
5. Use z.infer for TS types

Best practices:
- Always enable TS strict mode
- Use safeParse in async contexts to avoid exceptions
- Use discriminatedUnion for tagged union performance

Troubleshooting:
Command: node -e "console.log(require('zod').z.string().parse(123))"
Expected: throws ZodError: Invalid type
Check error.errors for path and message arrays
Use .spa alias for safeParseAsync


## Information Dense Extract
TS4.5+,strict:true. npm install zod|yarn|pnpm|bun; canary via @canary. import {z} from "zod". Constructors: z.string(),z.number(),z.bigint(),z.boolean(),z.date(),z.undefined(),z.null(),z.void(),z.any(),z.unknown(),z.never(),z.object(shape),z.array(elem),z.tuple([...]),z.union([...])|.or(),z.discriminatedUnion(key,opts),z.record(keySchema,valueSchema),z.map(k,v),z.set(v),z.enum(values),z.nativeEnum(Enum),z.lazy(fn),z.function().args(...).returns(schema).modifiers: .optional(),.nullable(),.nullish(),.default(val),.array(),.nonempty({message}),.min(n),.max(n),.length(n),.partial(props),.deepPartial(),.required(props),.extend(shape),.merge(schema),.pick(fields),.omit(fields),.strict(),.passthrough(),.strip(),.catchall(schema),.brand(),.readonly(),.and(),.or(),.pipe(schema).transforms: .transform(fn),.refine(fn,{message,path}),.superRefine((v,ctx)),z.preprocess(fn,schema).coercion: z.coerce.string()|number()|boolean()|bigint()|date().parsing: .parse(data):T throws; .parseAsync(data):Promise<T>; .safeParse(data):result; .safeParseAsync(data):Promise<result>; usage pattern: define schema->parse/safeParse->handle. TS types: z.infer,z.input,z.output. Error customization via {required_error,invalid_type_error} and method {message}. Discriminated union performance: use key. Troubleshooting: inspect ZodError.errors. Use .spa alias.

## Sanitised Extract
Table of Contents:
1 Installation
2 Basic Usage
3 Core Schemas
4 Modifiers
5 Refinements & Transforms
6 Type Utilities
7 Error Handling

1 Installation
TypeScript 4.5+ with strict:true in tsconfig.json. Install zod: npm install zod (or yarn, pnpm, bun). Canary: zod@canary.

2 Basic Usage
import { z } from 'zod'. Create schemas and use parse/safeParse methods.

3 Core Schemas
z.string() z.number() z.bigint() z.boolean() z.date() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
4 container types
z.object({key:z.type}) z.array(z.type) z.tuple([...]) z.union([...]) z.discriminatedUnion('key', [...]) z.record(keySchema, valueSchema) z.map(k,v) z.set(v) z.enum(['A','B']) z.nativeEnum(NativeEnum) z.lazy(()=>schema) z.function().args(...).returns(...)

4 Modifiers
.schema.optional() .nullable() .nullish() .array() .nonempty() .min(n) .max(n) .length(n) .partial() .deepPartial() .required() .extend({}) .merge(other) .pick({k:true}) .omit({k:true}) .strict() .passthrough() .strip() .catchall(schema) .brand() .readonly() .or() .and() .pipe()

5 Refinements & Transforms
.schema.transform(fn) .refine(fn,{message,path}) .superRefine((v,ctx)=>{}) z.preprocess(fn, schema) .default(value)

6 Type Utilities
type T = z.infer<typeof schema> type In = z.input<typeof schema> type Out = z.output<typeof schema>

7 Error Handling
schema.parse(data) throws ZodError with .errors array. Use schema.safeParse(data) to get result.success and result.data or result.error.

## Original Source
Zod Schema Validation
https://github.com/colinhacks/zod#readme

## Digest of ZOD_CORE

# Installation

Requirements
TypeScript 4.5+ with strict mode enabled in tsconfig.json:

{
  "compilerOptions": {
    "strict": true
  }
}

Install from npm:

npm install zod
# or yarn add zod
# or pnpm add zod
# or bun add zod

Install canary builds with @canary suffix.

# Basic Usage

Import the library and define schemas:

import { z } from "zod";

Primitives:
z.string(), z.number(), z.bigint(), z.boolean(), z.date(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

Parsing methods:
.parse(data: unknown): T throws ZodError on failure
.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
.parseAsync(data: unknown): Promise<T>
.safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

# Core Schemas and Methods

Schema creation:
- Objects: z.object({ key: z.type(), ... })
- Arrays: z.array(z.elementType)
- Tuples: z.tuple([z.type1, z.type2, ...])
- Unions: z.union([z.typeA, z.typeB]) or z.typeA.or(z.typeB)
- Discriminated unions: z.discriminatedUnion("discriminatorKey", [ ... ])
- Records: z.record(keySchema, valueSchema)
- Maps: z.map(keySchema, valueSchema)
- Sets: z.set(elementSchema)
- Enums: z.enum(["A","B"]), z.nativeEnum(NativeEnum)
- Recursive types using z.lazy
- Function schemas: z.function().args(...).returns(...).implement(fn)

Modifiers:
- .optional(), .nullable(), .nullish()
- .partial(), .deepPartial(), .required()
- .array(), .element
- .nonempty(), .min(n), .max(n), .length(n)
- .extend({ ... }), .merge(otherSchema)
- .pick({ key:true }), .omit({ key:true })
- .strict(), .passthrough(), .strip(), .catchall(schema)
- .brand(), .readonly(), .or(), .and(), .pipe()

Transformations and refinements:
- .transform(transformFn)
- .refine(predicateFn, { message, path?, params? })
- .superRefine((value, ctx)=>{})
- z.preprocess(preFn, schema)
- .default(value)

Type utilities:
- z.infer<typeof Schema>
- z.input<typeof Schema>
- z.output<typeof Schema>

Error customization:
- Custom messages in constructor: z.string({ required_error, invalid_type_error })
- Custom messages in methods: .min(n, { message })

# Error Handling and Troubleshooting

Catch and inspect errors:

try {
  schema.parse(data)
} catch (e) {
  if (e instanceof ZodError) {
    console.error(e.errors)
  }
}

Use safeParse to avoid exceptions.

# TypeScript Inference

All schemas infer type automatically:

type DataType = z.infer<typeof schema>

## Attribution
- Source: Zod Schema Validation
- URL: https://github.com/colinhacks/zod#readme
- License: MIT License
- Crawl Date: 2025-05-07T15:30:46.452Z
- Data Size: 1032521 bytes
- Links Found: 6618

## Retrieved
2025-05-07
library/HTTP_SERVER.md
# library/HTTP_SERVER.md
# HTTP_SERVER

## Crawl Summary
http.createServer([options], requestListener) returns an HTTP server instance. server.listen supports numeric port, UNIX path, or options object. Default host 127.0.0.1, default socket timeout 120s, maxHeadersCount unlimited. Core events: 'request', 'connection', 'clientError', 'error'. Key config: allowHalfOpen, pauseOnConnect, keepAliveTimeout, headersTimeout. Minimal example provided. Best practices: handle clientError, adjust timeouts. Troubleshooting EADDRINUSE with lsof and kill.

## Normalised Extract
Table of Contents
1. Method Signatures
2. Events
3. Defaults & Config
4. Example
5. Error Handling
6. Troubleshooting

1. Method Signatures
createServer([options], requestListener)
  options.allowHalfOpen:boolean:false
  options.pauseOnConnect:boolean:false
  requestListener(req:IncomingMessage,res:ServerResponse)
  returns http.Server

server.listen(port:number,hostname?:string,backlog?:number,callback?:Function)
  hostname default '127.0.0.1'
  backlog OS default
  returns http.Server

server.close(callback?:Function)

2. Events
'request':req, res
'connection':socket
'clientError':err, socket
'error':err

3. Defaults & Config
host:127.0.0.1
timeout:120000ms
keepAliveTimeout:5000ms
headersTimeout:60000ms
maxHeadersCount:null

4. Example
import {createServer} from 'node:http'
const srv=createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/plain'});res.end('OK')})
srv.listen(3000,'127.0.0.1',()=>console.log('OK'))

5. Error Handling
server.on('clientError',(err,sock)=>sock.end('HTTP/1.1 400 Bad Request\r\n\r\n'))
server.keepAliveTimeout=10000
server.headersTimeout=15000

6. Troubleshooting
EADDRINUSE: lsof -iTCP:port -sTCP:LISTEN; kill -9 pid

## Supplementary Details
Configuration Options:
- allowHalfOpen (boolean): false – if true, socket stays open after response.end
- pauseOnConnect (boolean): false – if true, pauses socket until resumed in requestListener
- timeout (number): 120000 – socket idle timeout in milliseconds
- keepAliveTimeout (number): 5000 – time to keep socket open for additional requests
- headersTimeout (number): 60000 – time to receive complete HTTP headers
- maxHeadersCount (number|null): null – maximum number of headers allowed

Implementation Steps:
1. Import: `import { createServer } from 'node:http'`
2. Instantiate: `const server = createServer(requestListener)`
3. Attach error handlers: `server.on('clientError',...)`
4. Configure timeouts: `server.keepAliveTimeout=...; server.headersTimeout=...`
5. Start: `server.listen(port, host, callback)`
6. On shutdown: `server.close(callback)`

Core Functionality:
- IncomingMessage exposes `method`, `url`, `headers`
- ServerResponse methods: `writeHead(statusCode, headers)`, `write(data)`, `end([data])`


## Reference Details
HTTP.createServer(options?, requestListener)
Parameters:
  options.allowHalfOpen:boolean:false
  options.pauseOnConnect:boolean:false
  requestListener:Function<(req:IncomingMessage,res:ServerResponse)>:
    req.method:string
    req.url:string
    req.headers:IncomingHttpHeaders
    req.setTimeout(msecs:number, callback?:Function)
    res.write(chunk:Buffer|string, encoding?:string):boolean
    res.writeHead(statusCode:number, headers:OutgoingHttpHeaders):void
    res.end([data:Buffer|string], [encoding:string], [callback:Function]):void
Returns: http.Server

Server.listen(port:number, hostname?:string, backlog?:number, callback?:Function):http.Server
Server.listen(path:string, callback?:Function):http.Server
Server.listen(options:{port:number,host?:string,backlog?:number,exclusive?:boolean}, callback?:Function):http.Server

Server.close(callback?:Function):http.Server | undefined

Events:
- 'request'(req:IncomingMessage,res:ServerResponse)
- 'connection'(socket:net.Socket)
- 'clientError'(err:Error,socket:net.Socket)
- 'listening'()
- 'close'()
- 'error'(err:Error)

Full Example with Best Practices:
```js
import { createServer } from 'node:http';

const server = createServer({ allowHalfOpen: false }, (req, res) => {
  // set per-request timeout
  req.setTimeout(20000, () => {
    res.writeHead(408);
    res.end('Request Timeout');
  });

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Allow': 'GET' });
    return res.end('Method Not Allowed');
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.keepAliveTimeout = 10000;
server.headersTimeout = 15000;

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen({ port: 3000, host: '127.0.0.1', backlog: 511 }, () => {
  console.log('Server listening on 127.0.0.1:3000');
});
```

Troubleshooting Procedures:
1. Port in Use:
   - `$ lsof -iTCP:3000 -sTCP:LISTEN`
   - `$ kill -9 <PID>`
2. Unhandled Promise Rejection:
   - Add `process.on('unhandledRejection', console.error)`
3. Debugging Connections:
   - `$ node --inspect server.js`
   - Access `chrome://inspect` to view call stacks


## Information Dense Extract
createServer([allowHalfOpen=false,pauseOnConnect=false],reqListener(req:IncomingMessage,res:ServerResponse))→http.Server; server.listen(port,hostname='127.0.0.1',backlog=?,callback)→http.Server; server.close(callback). Defaults: timeout=120000ms, keepAliveTimeout=5000ms, headersTimeout=60000ms, maxHeadersCount=null. Events: 'request', 'connection', 'clientError', 'error', 'listening', 'close'. Best practices: set timeouts via req.setTimeout and server.keepAliveTimeout, handle clientError to send 400, handle unsupported methods with 405, catch server.on('error'). Troubleshoot EADDRINUSE via lsof/kilL, debug via node --inspect.

## Sanitised Extract
Table of Contents
1. Method Signatures
2. Events
3. Defaults & Config
4. Example
5. Error Handling
6. Troubleshooting

1. Method Signatures
createServer([options], requestListener)
  options.allowHalfOpen:boolean:false
  options.pauseOnConnect:boolean:false
  requestListener(req:IncomingMessage,res:ServerResponse)
  returns http.Server

server.listen(port:number,hostname?:string,backlog?:number,callback?:Function)
  hostname default '127.0.0.1'
  backlog OS default
  returns http.Server

server.close(callback?:Function)

2. Events
'request':req, res
'connection':socket
'clientError':err, socket
'error':err

3. Defaults & Config
host:127.0.0.1
timeout:120000ms
keepAliveTimeout:5000ms
headersTimeout:60000ms
maxHeadersCount:null

4. Example
import {createServer} from 'node:http'
const srv=createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/plain'});res.end('OK')})
srv.listen(3000,'127.0.0.1',()=>console.log('OK'))

5. Error Handling
server.on('clientError',(err,sock)=>sock.end('HTTP/1.1 400 Bad Request'r'n'r'n'))
server.keepAliveTimeout=10000
server.headersTimeout=15000

6. Troubleshooting
EADDRINUSE: lsof -iTCP:port -sTCP:LISTEN; kill -9 pid

## Original Source
Node.js Core API & Modules
https://nodejs.org/api/

## Digest of HTTP_SERVER

# HTTP Module

## HTTP.createServer
Signature: `createServer([options], requestListener)`

Parameters:
- `options` <Object> (optional):
  - `allowHalfOpen` <boolean> Default: `false`  – if true, keeps socket open after response end
  - `pauseOnConnect` <boolean> Default: `false` – if true, pauses sockets on connection
- `requestListener` <Function>  – callback `(req: IncomingMessage, res: ServerResponse)`

Returns: `<http.Server>`

## Server.listen
Signature overloads:
1. `server.listen(port[, hostname][, backlog][, callback])`
2. `server.listen(path[, callback])`
3. `server.listen(options[, callback])`

Parameters (port variant):
- `port` <number> – port to bind
- `hostname` <string> Default: `127.0.0.1` – hostname or IP
- `backlog` <number> Default: OS default – maximum queued connections
- `callback` <Function> – invoked once server starts listening

Returns: `<http.Server>`

## Server.close
Signature: `server.close([callback])`

Parameters:
- `callback` <Function> – invoked when all connections closed

## Events
- `'request'`: `(req: IncomingMessage, res: ServerResponse)`
- `'connection'`: `(socket: net.Socket)`
- `'clientError'`: `(err: Error, socket: net.Socket)`
- `'error'`: `(err: Error)`

## Configuration Defaults
- Default host: `127.0.0.1`
- Default port if unspecified: falls back to environment or OS
- `timeout`: `120000` ms on sockets
- `maxHeadersCount`: `null` (no limit)
- `keepAliveTimeout`: `5000` ms

## Minimal Example
```js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
```

## Best Practices
- Handle client errors:
```js
server.on('clientError', (err, sock) => {
  sock.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
```
- Set timeouts on slow clients:
```js
server.keepAliveTimeout = 10000;
server.headersTimeout = 15000;
```

## Troubleshooting
- EADDRINUSE: port in use
  - `$ lsof -iTCP:3000 -sTCP:LISTEN`
  - `$ kill -9 <pid>`
- Unhandled exceptions: attach `process.on('uncaughtException')`

---
_Data retrieved from https://nodejs.org/api/ on 2024-06-24, Data Size: 3644215 bytes_

## Attribution
- Source: Node.js Core API & Modules
- URL: https://nodejs.org/api/
- License: Node.js Foundation (MIT-like)
- Crawl Date: 2025-05-07T18:32:06.324Z
- Data Size: 3644215 bytes
- Links Found: 3171

## Retrieved
2025-05-07
library/EJS_API.md
# library/EJS_API.md
# EJS_API

## Crawl Summary
EJS v3.1.9 core API methods: render(template,data,options)→String; renderFile(path,data,options,cb)→void; compile(template,options)→Function. Options: cache(Boolean), filename(String), root(String), views(Array), delimiter(String), async(Boolean), compileDebug(Boolean), rmWhitespace(Boolean), strict(Boolean), context(Object), localsName(String). Template syntax: <% %>,<%= %>,<%- %>,<%# %>,<%% %>. Includes via include(name,data). Async by setting async:true. Caching requires filename. Errors throw JS exceptions with line numbers.

## Normalised Extract
Table of Contents:
1 Installation
2 Core API methods
3 Options
4 Template Syntax
5 Includes
6 Caching
7 Asynchronous support
8 Delimiters

1 Installation
  npm install ejs

2 Core API methods
  render(template:String, data:Object, options?:Object) => String
  renderFile(path:String, data:Object, options:Object, callback:(err:Error, str:String)=>void) => void
  compile(template:String, options?:Object) => Function(data:Object): String

3 Options
  cache: true|false (default false)
  filename: absolute or relative file path (required for include and cache key)
  root: string path for absolute include resolution (default process.cwd())
  views: array of paths to search for includes (default [])
  delimiter: single-character string for tag (default '%')
  async: true|false (default false)
  compileDebug: true|false (default true)
  rmWhitespace: true|false (default false)
  strict: true|false (default false)
  context: object to bind `this` in template (default null)
  localsName: string name for data object in template (default 'locals')

4 Template Syntax
  <% code %> no output
  <%= expression %> HTML-escaped output
  <%- expression %> unescaped output
  <%# comment %> no execution
  <%% literal %> outputs `<%`
  %> ends tag

5 Includes
  Syntax: <%- include(filename:String, data?:Object) %>
  Resolves relative to filename option or root/views paths

6 Caching
  Enable by cache:true
  Requires filename for cache key
  Stores compiled function in internal cache

7 Asynchronous support
  Set async:true in options
  Use await inside <% %> tags
  render and compile return Promise when async:true

8 Delimiters
  Change with delimiter option: options.delimiter = '?' yields <? code ?>


## Supplementary Details
Default options object: {
  cache: false,
  filename: undefined,
  root: process.cwd(),
  views: [],
  delimiter: '%',
  async: false,
  compileDebug: true,
  rmWhitespace: false,
  strict: false,
  context: null,
  localsName: 'locals'
}
Implementation steps:
1 Install ejs via npm
2 Require or import ejs
3 Call render or renderFile with correct options
4 For includes set filename or root/views so include paths resolve
5 Enable cache by passing cache:true and specifying filename
6 For async functions set async:true and use await in templates
7 Handle errors by try/catch around render or error-first callback in renderFile


## Reference Details
API Specifications:

render(template:String, data:Object, options?:Object) => String
  -Throws TypeError if template not string
  -Throws errors from JS evaluation

renderFile(path:String, data:Object, options:Object, callback:(err:Error, str:String)=>void) => void
  -path: file system path to .ejs file
  -data: object passed as locals
  -options: same as render options
  -callback: function(err, result)

compile(template:String, options?:Object) => compiledFunction
  -compiledFunction(data:Object, callback?:Function) => String|Promise

Exact method signatures:

function render(template, data, options) {
  options = options || {};
  const fn = compile(template, options);
  if (options.async) return fn(data);
  return fn(data);
}

function renderFile(path, data, options, callback) {
  if (typeof options === 'function') callback = options, options = {};
  fs.readFile(path, 'utf8', function(err, str){
    if(err) return callback(err);
    try {
      const fn = compile(str, Object.assign({}, options, {filename:path}));
      const result = options.async ? fn(data) : fn(data);
      if (options.async) result.then(res=> callback(null,res),cb=>callback(cb));
      else callback(null, result);
    } catch(e) {
      callback(e);
    }
  });
}

function compile(template, options) {
  const opts = Object.assign({}, defaultOptions, options);
  // tokenizer and parser
  const fn = new Function(opts.localsName, opts.context ? 'with(this){' + compiledSource + '}' : compiledSource);
  return opts.async ? async function(locals){ return fn.call(opts.context, locals) } : function(locals){ return fn.call(opts.context, locals) };
}

Configuration Options:
options.cache (Boolean): toggle caching of compiled templates
options.filename (String): used for include resolution and cache key
options.root (String): base path for includes starting with '/'
options.views (Array<String>): search paths for include files
options.delimiter (String): scriptlet delimiter
options.async (Boolean): enable async/await support
options.compileDebug (Boolean): include debug instrumentation
options.rmWhitespace (Boolean): collapse whitespace
options.strict (Boolean): fail on undefined values
options.context (Object): bind this in templates
options.localsName (String): variable name for locals

Best Practices:
- Always set filename when using includes or cache
- Precompile templates via compile and reuse function
- Enable cache in production
- Use rmWhitespace to reduce output size
- Wrap render calls in try/catch or use callback error handling
- Use async option for Promises and async helpers

Troubleshooting:
Command: console.log(ejs.render('<%= a.b %>', {a:{}}));
Expected: throws TypeError: Cannot read property 'b' of undefined
With strict:true: throws ReferenceError: a is not defined
Command: ejs.renderFile('missing.ejs', {}, {}, cb)
Expected cb called with err.code == 'ENOENT'

Exact commands:
node -e "console.log(require('ejs').render('<%- include(\"tpl.ejs\") %>',{}, {filename:'main.ejs',views:['./views']}));"
Output: contents of views/tpl.ejs


## Information Dense Extract
ejs.render(template:String,data:Object,options?:{cache?:Boolean,filename?:String,root?:String,views?:String[],delimiter?:String,async?:Boolean,compileDebug?:Boolean,rmWhitespace?:Boolean,strict?:Boolean,context?:Object,localsName?:String})=>String|Promise;             ejs.renderFile(path:String,data:Object,options:Object,cb:(Error,String)=>void)=>void;             ejs.compile(template:String,options?:Object)=>(data:Object)=>String|Promise; Options defaults: cache:false,filename:undefined,root:process.cwd(),views:[],delimiter:'%',async:false,compileDebug:true,rmWhitespace:false,strict:false,context:null,localsName:'locals'; Template tags: <% code %>,<%=escape %>,<%-unescaped%>,<%#comment%>,<%%literal%>,%>; Include: <%- include(filename,data) %>, resolves via filename or root/views; Async support: options.async=true + await inside tags; Caching: options.cache=true + filename; Errors: JS exceptions with template line numbers; Delimiters change via options.delimiter; Best practices: precompile, cache in production, set filename for includes, rmWhitespace for lean output; Troubleshooting: catch exceptions, handle ENOENT on missing files.

## Sanitised Extract
Table of Contents:
1 Installation
2 Core API methods
3 Options
4 Template Syntax
5 Includes
6 Caching
7 Asynchronous support
8 Delimiters

1 Installation
  npm install ejs

2 Core API methods
  render(template:String, data:Object, options?:Object) => String
  renderFile(path:String, data:Object, options:Object, callback:(err:Error, str:String)=>void) => void
  compile(template:String, options?:Object) => Function(data:Object): String

3 Options
  cache: true|false (default false)
  filename: absolute or relative file path (required for include and cache key)
  root: string path for absolute include resolution (default process.cwd())
  views: array of paths to search for includes (default [])
  delimiter: single-character string for tag (default '%')
  async: true|false (default false)
  compileDebug: true|false (default true)
  rmWhitespace: true|false (default false)
  strict: true|false (default false)
  context: object to bind 'this' in template (default null)
  localsName: string name for data object in template (default 'locals')

4 Template Syntax
  <% code %> no output
  <%= expression %> HTML-escaped output
  <%- expression %> unescaped output
  <%# comment %> no execution
  <%% literal %> outputs '<%'
  %> ends tag

5 Includes
  Syntax: <%- include(filename:String, data?:Object) %>
  Resolves relative to filename option or root/views paths

6 Caching
  Enable by cache:true
  Requires filename for cache key
  Stores compiled function in internal cache

7 Asynchronous support
  Set async:true in options
  Use await inside <% %> tags
  render and compile return Promise when async:true

8 Delimiters
  Change with delimiter option: options.delimiter = '?' yields <? code ?>

## Original Source
EJS Templating Engine
https://ejs.co/#docs

## Digest of EJS_API

# Installation

```bash
npm install ejs
```

# Usage

```javascript
const ejs = require('ejs');

// Synchronous rendering
ejs.render(templateString, dataObject, optionsObject);

// Asynchronous rendering
await ejs.render(templateString, dataObject, {async: true});

// Compile to function
const fn = ejs.compile(templateString, optionsObject);
fn(dataObject);

// Render from file
ejs.renderFile(filenamePath, dataObject, optionsObject, callback);
```

# Primary API Methods

- **render(template, data, options)** → *String*
- **renderFile(path, data, options, callback)** → *void*
- **compile(template, options)** → *Function*

# Options Object

| Name            | Type      | Default     | Description                                                  |
|-----------------|-----------|-------------|--------------------------------------------------------------|
| cache           | Boolean   | false       | Cache intermediate JS functions                              |
| filename        | String    | undefined   | Used by includes and cache keys                              |
| root            | String    | process.cwd | Base directory for absolute includes                         |
| views           | Array     | []          | Directories to search for includes                           |
| delimiter       | String    | '%'         | Character to open and close scriptlet tags                   |
| async           | Boolean   | false       | Enable top-level async filters and functions                 |
| compileDebug    | Boolean   | true        | Include debug instrumentation in compiled function           |
| rmWhitespace    | Boolean   | false       | Remove all safe-to-remove whitespace                        |
| strict          | Boolean   | false       | Treat undefined values as errors                             |
| context         | Object    | null        | `this` context for compiled functions                       |
| localsName      | String    | 'locals'    | Name of data object in template                              |

# Template Tag Syntax

- `<%`  Scriptlet, no output
- `<%=` HTML-escaped output
- `<%-` Unescaped output
- `<%#` Comment, no execution
- `<%%` Outputs literal `<%`
- `%>`  Close tag

# Includes

```ejs
<%- include('header.ejs', {title: 'Home'}) %>
```

# Caching

- Enabled via `options.cache = true`
- `filename` required for proper cache key generation

# Error Handling

- Runtime errors throw JS exceptions with template line numbers
- Stack traces include compiled function locations

# Asynchronous Support

Set `options.async = true`. Use `<% await userAsyncFunction() %>` inside templates.

# Delimiters

Specify `options.delimiter = '?'` to use `<? ... ?>` tags instead of `<% ... %>`.


## Attribution
- Source: EJS Templating Engine
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-05-07T09:30:47.542Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-07
library/VITEST_GUIDE.md
# library/VITEST_GUIDE.md
# VITEST_GUIDE

## Crawl Summary
Install vitest via npm|yarn|pnpm|bun; requires Node>=18.0.0, Vite>=5.0.0. Test files must use .test. or .spec. suffix. Export functions in .js/.ts modules; import expect and test from vitest. Scripts: test: vitest; coverage: vitest run --coverage. Config via vite.config.ts or vitest.config.ts with defineConfig; priority vitest.config.ts>--config>mode. Supported config file extensions: .js,.mjs,.cjs,.ts,.cts,.mts. Test config options: include, exclude, environment, globals, setupFiles, threads, hookTimeout. Workspaces array accepts globs or config objects with name, root, environment, setupFiles. CLI flags: --config, --port <number>, --https, --coverage; use vitest run to disable watch. Disable auto install with VITEST_SKIP_INSTALL_CHECKS=1. Merge configs with mergeConfig. Use official VSCode extension. Install unreleased via pkg.pr.new or pnpm linking. Troubleshoot file naming, Bun command, config path, CLI help.

## Normalised Extract
Table of Contents:
1 Installation
2 Test File Patterns
3 Package Scripts
4 Configuration
5 Workspace Configuration
6 CLI Options
7 Environment Variables
8 IDE Integration
9 Unreleased Installation
10 Troubleshooting

1 Installation
Commands:
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest
Requirements:
  Node >= 18.0.0
  Vite >= 5.0.0
npx vitest runs local binary or installs temporary.

2 Test File Patterns
  File suffix must include .test. or .spec.

3 Package Scripts
Add to package.json:
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
Run with npm run test | yarn test | pnpm test | bun run test.

4 Configuration
Unified via vite.config.ts:
  /// <reference types="vitest/config" />
  import { defineConfig } from 'vite';
  export default defineConfig({
    test: { include:['**/*.test.ts'], environment:'node', globals:true, setupFiles:['./setup.ts'], threads:true, hookTimeout:5000 }
  });
Alternate standalone vitest.config.ts:
  import { defineConfig } from 'vitest/config';
  export default defineConfig({ test:{/* options */} });
Priority: vitest.config.ts > CLI --config <path> > defineConfig mode=test.
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts.

5 Workspace Configuration
In test.workspace array:
  globs: 'packages/*', 'tests/*/vitest.config.{e2e,unit}.ts'
  objects:
    { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] }

6 CLI Options
  vitest [--config <path>] [--port <number>] [--https] [--coverage]
  vitest run disables watch.

7 Environment Variables
  VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency prompts.

8 IDE Integration
  Install Vitest Runner extension in VS Code.

9 Unreleased Installation
  npm i https://pkg.pr.new/vitest@{commit}
  Local link:
    git clone https://github.com/vitest-dev/vitest.git
    pnpm install
    cd packages/vitest && pnpm run build && pnpm link --global
    in project: pnpm link --global vitest

10 Troubleshooting
  Bun conflict: use bun run test.
  Missing tests: check .test./.spec. suffix.
  Config not applied: verify file extension and path; use --config.
  CLI flags: npx vitest --help.

## Supplementary Details
Supported config file extensions: .js, .mjs, .cjs, .ts, .cts, .mts. .json not supported. defineConfig and mergeConfig API from 'vitest/config'.
Config option defaults:
  include: ['**/*.test.{js,ts}']
  exclude: ['node_modules', 'dist']
  globals: false
  environment: 'node'
  threads: true
  hookTimeout: 30000 ms
  testTimeout: 5000 ms
  coverage: false
  reporters: ['default']
  setupFiles: []
TestOptions:
  only: false
  skip: false
  timeout: inherits testTimeout
  retries: 0
Workspace object keys:
  name: string
  root: string
  environment: string
  setupFiles: string[]
CLI flags:
  --config <string>: path to config file
  --port <number>: port for coverage server
  --https: enable HTTPS
  --coverage: enable coverage run
Env vars:
  VITEST_SKIP_INSTALL_CHECKS: '1' disables dependency prompts
Type directive:
  /// <reference types="vitest/config" /> at top of config file
MergeConfig usage:
  mergeConfig(baseConfig, defineConfig({ test:{ /* overrides */ } }));

## Reference Details
Test API:
function test(
  name: string,
  fn: (() => unknown) | Promise<unknown>,
  options?: {
    only?: boolean;
    skip?: boolean;
    timeout?: number;
    retries?: number;
  }
): void;

Expect API:
interface Matchers<T> {
  toBe(expected: T): void;
  toEqual(expected: unknown): void;
  toThrow(error?: string | RegExp | ErrorConstructor): void;
  // ...other matchers
}
function expect<T>(value: T): Matchers<T>;

Config API:
function defineConfig<C>(config: C): C;
function mergeConfig<C1, C2>(config1: C1, config2: C2): C1 & C2;

TestConfig interface:
{
  include?: string[];
  exclude?: string[];
  globals?: boolean;
  environment?: 'node' | 'jsdom' | 'happy-dom';
  threads?: boolean;
  hookTimeout?: number;
  testTimeout?: number;
  coverage?: boolean | {
    reporter?: string[];
    exclude?: string[];
  };
  reporters?: string[];
  setupFiles?: string[];
  workspace?: Array<string | TestConfig>;
}

CLI commands & flags:
npx vitest [--config <path>] [--port <number>] [--https] [--coverage] [--run]

Environment variables:
VITEST_SKIP_INSTALL_CHECKS=1

Best Practices:
- Use unified vite.config.ts with test property.
- Avoid multiple config files; merge if needed.
- Name files with .test. or .spec. suffix.
- Pin Vitest version in package.json as devDependency.

Troubleshooting steps:
1. Bun uses own runner: use `bun run test` and confirm exit code 0.
2. File matching: run `npx vitest --detectLeaks` to verify patterns.
3. Config load: run `npx vitest --config ./vitest.config.ts --show-config`.
4. Missing types: add `/// <reference types="vitest/config" />` or install @types/vitest.
5. View help: `npx vitest --help`.
Expected output for basic test:
✓ sum.test.js (1)  ✓ adds 1 + 2 to equal 3
Test Files 1 passed(1) Tests 1 passed(1)


## Information Dense Extract
install: npm|yarn|pnpm|bun add -D vitest; Node>=18; Vite>=5; files: *.test.*|*.spec.*; sum.js export sum(a,b):number; sum.test.js import {test,expect}; script:test=vitest; coverage=vitest run --coverage; config:vite.config.ts or vitest.config.ts defineConfig({test:{include,exclude,environment,globals,threads,hookTimeout,setupFiles}}); ext:.js,.mjs,.cjs,.ts,.cts,.mts; mergeConfig(base,override); workspace:Array<string|TestConfig> entries; CLI: --config<string>,--port<number>,--https,--coverage,--run; env:VITEST_SKIP_INSTALL_CHECKS=1; API:test(name,fn,options:{only,skip,timeout,retries}); expect<T>(value).toBe|toEqual|toThrow; defineConfig<C>(C):C; mergeConfig<C1,C2>(C1,C2):C1&C2; TestConfig interface keys; troubleshooting: bun run test; npx vitest --help; ensure .test. suffix; use --show-config.

## Sanitised Extract
Table of Contents:
1 Installation
2 Test File Patterns
3 Package Scripts
4 Configuration
5 Workspace Configuration
6 CLI Options
7 Environment Variables
8 IDE Integration
9 Unreleased Installation
10 Troubleshooting

1 Installation
Commands:
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest
Requirements:
  Node >= 18.0.0
  Vite >= 5.0.0
npx vitest runs local binary or installs temporary.

2 Test File Patterns
  File suffix must include .test. or .spec.

3 Package Scripts
Add to package.json:
  'scripts': {
    'test': 'vitest',
    'coverage': 'vitest run --coverage'
  }
Run with npm run test | yarn test | pnpm test | bun run test.

4 Configuration
Unified via vite.config.ts:
  /// <reference types='vitest/config' />
  import { defineConfig } from 'vite';
  export default defineConfig({
    test: { include:['**/*.test.ts'], environment:'node', globals:true, setupFiles:['./setup.ts'], threads:true, hookTimeout:5000 }
  });
Alternate standalone vitest.config.ts:
  import { defineConfig } from 'vitest/config';
  export default defineConfig({ test:{/* options */} });
Priority: vitest.config.ts > CLI --config <path> > defineConfig mode=test.
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts.

5 Workspace Configuration
In test.workspace array:
  globs: 'packages/*', 'tests/*/vitest.config.{e2e,unit}.ts'
  objects:
    { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] }

6 CLI Options
  vitest [--config <path>] [--port <number>] [--https] [--coverage]
  vitest run disables watch.

7 Environment Variables
  VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency prompts.

8 IDE Integration
  Install Vitest Runner extension in VS Code.

9 Unreleased Installation
  npm i https://pkg.pr.new/vitest@{commit}
  Local link:
    git clone https://github.com/vitest-dev/vitest.git
    pnpm install
    cd packages/vitest && pnpm run build && pnpm link --global
    in project: pnpm link --global vitest

10 Troubleshooting
  Bun conflict: use bun run test.
  Missing tests: check .test./.spec. suffix.
  Config not applied: verify file extension and path; use --config.
  CLI flags: npx vitest --help.

## Original Source
Vitest Testing Framework
https://vitest.dev/guide/

## Digest of VITEST_GUIDE

# Installing Vitest

Requirements: Vite >= 5.0.0, Node >= 18.0.0
Install via:
```bash
npm install -D vitest
# or yarn add -D vitest
# or pnpm add -D vitest
# or bun add -D vitest
``` 
Tip: Use `npx vitest` to run local or temporary install.

# Writing Tests

File: sum.js
```js
export function sum(a, b) {
  return a + b;
}
```
File: sum.test.js
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
Filename must include `.test.` or `.spec.` suffix.

# Package.json Scripts

Add under `scripts`:
```json
{
  "test": "vitest",
  "coverage": "vitest run --coverage"
}
```
Run with `npm run test`, `yarn test`, `pnpm test`, or `bun run test` (avoid `bun test`).

# Configuring Vitest

Unified with Vite—place in `vite.config.ts`:
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    environment: 'node',
    globals: true,
    setupFiles: ['./setup.ts'],
    threads: true,
    hookTimeout: 5000
  }
});
```
Priority: `vitest.config.ts` > CLI `--config` > `mode: test` in `defineConfig`.
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts (no .json).

Alternate standalone config in `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { /* options */ }
});
```
Merge Vite and Vitest configs:
```ts
import viteConfig from './vite.config.mjs';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  viteConfig,
  defineConfig({ test: { /* override */ } })
);
```

# Workspaces Support

In config:
```ts
defineConfig({
  test: {
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      {
        test: {
          name: 'happy-dom',
          root: './shared_tests',
          environment: 'happy-dom',
          setupFiles: ['./setup.happy-dom.ts']
        }
      },
      {
        test: {
          name: 'node',
          root: './shared_tests',
          environment: 'node',
          setupFiles: ['./setup.node.ts']
        }
      }
    ]
  }
});
```

# CLI Usage

Default commands:
- `vitest` (watch)
- `vitest run` (single run)
- `--config <path>`
- `--port <number>`
- `--https`
- `--coverage`

Run `npx vitest --help` for full option list.

# Automatic Dependency Installation

Prompted install for missing deps. Disable via:
```bash
export VITEST_SKIP_INSTALL_CHECKS=1
``` 

# IDE Integrations

Install official VS Code extension: Vitest Runner.

# Examples

Provided examples: basic, fastify, in-source-test, lit, vue, marko, preact, react, solid, svelte, sveltekit, profiling, typecheck, workspace.

# Using Unreleased Commits

Install nightly:
```bash
npm i https://pkg.pr.new/vitest@{commit}
```
Local build & link:
```bash
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
cd packages/vitest
pnpm run build
pnpm link --global
# then in project:
pnpm link --global vitest
```

# Troubleshooting

- Bun test runner conflict: use `bun run test`.
- File patterns not matching: ensure `.test.` or `.spec.` in filename.
- Config not applied: verify extension and path, use `--config`.
- View CLI flags: `npx vitest --help`.

_Last updated: 2024-06-01_

## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/guide/
- License: MIT License
- Crawl Date: 2025-05-07T21:27:50.000Z
- Data Size: 27282977 bytes
- Links Found: 22548

## Retrieved
2025-05-07
