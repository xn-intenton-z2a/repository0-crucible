# YARGS_API

## Crawl Summary
yargs.command(string|Array, string, builder?, handler?) returns Yargs; yargs.option(key, {alias,describe,type,default,demandOption,nargs,choices,coerce,global,hidden,group}) returns Yargs; yargs.positional(key, {describe,type,default,choices,coerce}); yargs.parse(args?,context?,callback?) returns Arguments; yargs.argv returns Arguments; yargs.usage(string), .help([string]), .alias(string,string|Array), .version([string]) add core flags; yargs.middleware(fn,applyBeforeValidation?) invokes before/after validation; parser config via strict, strictCommands, strictOptions, recommendCommands, parserConfiguration({camel-case-expansion,boolean-negation,duplicate-arguments-array,flatten-duplicate-arrays,populate--,combine-arrays,short-option-groups}); yargs.env(prefix|mapping); error handling via yargs.fail(fn). Default help output, unknown command error, exit codes 0/1.

## Normalised Extract
Table of Contents
1. Commands
2. Options
3. Positional Arguments
4. Parsing & argv
5. Help & Version Flags
6. Middleware
7. Parser Configuration
8. Environment Variables
9. Error Handling & Troubleshooting

1. Commands
Signature: yargs.command(command, description, builder, handler) returns Yargs
Parameters:
  command: string or array with positional tokens
  description: string
  builder: function(Yargs)=>Yargs or object defining options/positional
  handler: function(argv: Arguments)

2. Options
Signature: yargs.option(key, options) returns Yargs
Options:
  alias: string or array
  describe: string
  type: 'string'|'number'|'boolean'|'array'
  default: any
  demandOption: boolean or array
  nargs: number
  choices: array
  coerce: function(arg)=>any
  global: boolean
  hidden: boolean
  group: string

3. Positional Arguments
Signature: yargs.positional(key, options)
Options: describe, type, default, choices, coerce

4. Parsing & argv
Signature: yargs.parse(args?, context?, callback?) returns Arguments
Property: yargs.argv (parsed Arguments)

5. Help & Version Flags
Methods: .usage(message), .help(optName='help'), .alias(option, alias), .version(versionString)
Default flags: --help/-h, --version/-V

6. Middleware
Signature: yargs.middleware(fn, applyBeforeValidation=false) returns Yargs
Executes fn(argv) before or after validation

7. Parser Configuration
Methods: .strict(enabled=true), .strictCommands(enabled), .strictOptions(enabled), .recommendCommands(enabled), .parserConfiguration(configObject)
Config keys: camel-case-expansion, boolean-negation, duplicate-arguments-array, flatten-duplicate-arrays, populate--, combine-arrays, short-option-groups

8. Environment Variables
Signature: yargs.env(prefix) or yargs.env({key:envVar}) returns Yargs
Defaults flags from process.env prefixed or mapped

9. Error Handling & Troubleshooting
Method: yargs.fail(fn(msg, err)) returns Yargs
Example CLI outputs:
  Unknown command error
  Help usage display


## Supplementary Details
Default behaviors and configurations
• Default usage template: "$0 <command> [options]"
• Default help option: name="help", alias=["h"] description="Show help" type=boolean
• Default version option: name="version", alias=["V"] description="Show version number" type=boolean
• Default parserConfiguration:
    camel-case-expansion: true
    boolean-negation: true
    duplicate-arguments-array: false
    flatten-duplicate-arrays: true
    populate--: true
    combine-arrays: false
    short-option-groups: true
• Default strict: disabled
• Default recommendCommands: disabled
• Default environment prefix: none
Implementation steps
1. Initialize parser: const y = require('yargs/yargs')(hideBin(process.argv));
2. Apply scriptName: y.scriptName('cli')
3. Define usage: y.usage('$0 <cmd> [opts]')
4. Add commands: y.command(...)
5. Define global options: y.option(...)
6. Add middleware: y.middleware(...) as needed
7. Enable flags: y.help().alias('help','h').version('1.2.3').alias('version','V')
8. Configure parsing: y.strictCommands(true).recommendCommands(true)
9. Parse: y.parse() or access y.argv


## Reference Details
### API Specifications & Method Signatures

**command**
```ts
command(
  command: string | string[],
  description: string,
  builder?: (yargs: Yargs) => Yargs | { [key:string]: Options },
  handler?: (argv: Arguments) => any
): Yargs
```

**option**
```ts
option(
  key: string,
  options: {
    alias?: string | string[];
    describe: string;
    type?: 'string' | 'number' | 'boolean' | 'array';
    default?: any;
    demandOption?: boolean | string[];
    nargs?: number;
    choices?: Array<string | number>;
    coerce?: (arg: any) => any;
    global?: boolean;
    hidden?: boolean;
    group?: string;
  }
): Yargs
```

**positional**
```ts
positional(
  key: string,
  options: {
    describe: string;
    type?: 'string'|'number'|'boolean';
    default?: any;
    choices?: Array<string|number>;
    coerce?: (arg: any) => any;
  }
): void
```

**parse**
```ts
parse(
  args?: string[],
  context?: object,
  callback?: (err: Error, argv: Arguments, output: string) => any
): Arguments
```

**fail**
```ts
fail(
  fn: (msg: string, err: Error) => any
): Yargs
```

**middleware**
```ts
middleware(
  fn: (argv: Arguments) => any,
  applyBeforeValidation?: boolean
): Yargs
```

**help, alias, version, usage**
```ts
yargs.usage(message: string): Yargs
yargs.help(optionName?: string): Yargs
yargs.alias(option: string, alias: string | string[]): Yargs
yargs.version(versionString?: string): Yargs
```

**strict & parser config**
```ts
yargs.strict(enabled?: boolean): Yargs
yargs.strictCommands(enabled?: boolean): Yargs
yargs.strictOptions(enabled?: boolean): Yargs
yargs.recommendCommands(enabled?: boolean): Yargs
yargs.parserConfiguration({
  'camel-case-expansion'?: boolean,
  'boolean-negation'?: boolean,
  'duplicate-arguments-array'?: boolean,
  'flatten-duplicate-arrays'?: boolean,
  'populate--'?: boolean,
  'combine-arrays'?: boolean,
  'short-option-groups'?: boolean
}): Yargs
yargs.env(prefix?: string | { [key: string]: string }): Yargs
```

### Code Examples & Patterns

**Basic CLI**
```js
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const cli = yargs(hideBin(process.argv))
  .scriptName('mycli')
  .usage('$0 <cmd> [opts]')
  .command(
    'start [port]',
    'start server',
    y => y.positional('port', { describe: 'port to bind', type: 'number', default: 3000 }),
    argv => {
      console.log(`Server running on port ${argv.port}`);
    }
  )
  .option('verbose', { alias: 'v', type: 'boolean', describe: 'enable verbose', default: false })
  .middleware(argv => { if (argv.verbose) console.log('Verbose on'); })
  .help().alias('help','h')
  .version('1.0.0').alias('version','V')
  .strictCommands()
  .recommendCommands()
  .parse();
```

**Dynamic Command Loading**
```js
yargs.commandDir('commands', { extensions: ['js'], recurse: true });
```

### Configuration Options

• hideBin: strips node and script name from process.argv
• scriptName: sets $0 in usage
• default help alias: h, version alias: V
• parserConfiguration defaults as listed in supplementaryDetails

### Best Practices

• Use `.strictCommands()` to catch typos
• Use `.recommendCommands()` to suggest similar commands
• Define `.middleware()` for cross-cutting concerns (logging, config)
• Group related options via `group` attribute and `.options()` calls

### Troubleshooting

Unknown command handling:
```js
yargs
  .strictCommands()
  .fail((msg, err) => {
    if (err) throw err;
    console.error(msg);
    yargs.showHelp();
    process.exit(1);
  })
  .parse();
```

**Expected Output**
```
$ node cli.js foo
Unknown command: "foo"
Usage: mycli <cmd> [opts]
Commands:
  start    start server

Options:
  --help     Show help  [boolean]
```

**Debugging**
- Use `--help` to inspect available commands and options
- Use `.parserConfiguration({ 'populate--': true })` to capture unparsed arguments under `argv._`
- Inspect `argv` in `middleware` to validate flag parsing


## Information Dense Extract
command(string|string[],string,(Yargs)=>Yargs|object,(argv)=>any)->Yargs; option(string,{alias?:string|string[],describe:string,type?:'string'|'number'|'boolean'|'array',default?:any,demandOption?:boolean|string[],nargs?:number,choices?:Array<string|number>,coerce?:(arg)=>any,global?:boolean,hidden?:boolean,group?:string})->Yargs; positional(string,{describe:string,type?:'string'|'number'|'boolean',default?:any,choices?:Array<string|number>,coerce?:(arg)=>any}); parse(args?:string[],context?:object,cb?:(err,argv,output)=>any)->Arguments; argv:Arguments; usage(string)->Yargs; help(optName?:string)->Yargs; alias(option:string,alias:string|string[])->Yargs; version(str?:string)->Yargs; middleware(fn:(argv)=>any,applyBeforeVal?:boolean)->Yargs; strict(enabled?:boolean)->Yargs; strictCommands(enabled?:boolean)->Yargs; strictOptions(enabled?:boolean)->Yargs; recommendCommands(enabled?:boolean)->Yargs; parserConfiguration({camel-case-expansion?:boolean,boolean-negation?:boolean,duplicate-arguments-array?:boolean,flatten-duplicate-arrays?:boolean,populate--?:boolean,combine-arrays?:boolean,short-option-groups?:boolean})->Yargs; env(prefix:string|object)->Yargs; fail(fn:(msg,err)=>any)->Yargs; Default help: --help/-h; version: --version/-V; hideBin(process.argv); scriptName; usage; parse(); dynamic commands: .commandDir(dir,{extensions,recurse,visit}); troubleshooting via .fail and .showHelp()

## Sanitised Extract
Table of Contents
1. Commands
2. Options
3. Positional Arguments
4. Parsing & argv
5. Help & Version Flags
6. Middleware
7. Parser Configuration
8. Environment Variables
9. Error Handling & Troubleshooting

1. Commands
Signature: yargs.command(command, description, builder, handler) returns Yargs
Parameters:
  command: string or array with positional tokens
  description: string
  builder: function(Yargs)=>Yargs or object defining options/positional
  handler: function(argv: Arguments)

2. Options
Signature: yargs.option(key, options) returns Yargs
Options:
  alias: string or array
  describe: string
  type: 'string'|'number'|'boolean'|'array'
  default: any
  demandOption: boolean or array
  nargs: number
  choices: array
  coerce: function(arg)=>any
  global: boolean
  hidden: boolean
  group: string

3. Positional Arguments
Signature: yargs.positional(key, options)
Options: describe, type, default, choices, coerce

4. Parsing & argv
Signature: yargs.parse(args?, context?, callback?) returns Arguments
Property: yargs.argv (parsed Arguments)

5. Help & Version Flags
Methods: .usage(message), .help(optName='help'), .alias(option, alias), .version(versionString)
Default flags: --help/-h, --version/-V

6. Middleware
Signature: yargs.middleware(fn, applyBeforeValidation=false) returns Yargs
Executes fn(argv) before or after validation

7. Parser Configuration
Methods: .strict(enabled=true), .strictCommands(enabled), .strictOptions(enabled), .recommendCommands(enabled), .parserConfiguration(configObject)
Config keys: camel-case-expansion, boolean-negation, duplicate-arguments-array, flatten-duplicate-arrays, populate--, combine-arrays, short-option-groups

8. Environment Variables
Signature: yargs.env(prefix) or yargs.env({key:envVar}) returns Yargs
Defaults flags from process.env prefixed or mapped

9. Error Handling & Troubleshooting
Method: yargs.fail(fn(msg, err)) returns Yargs
Example CLI outputs:
  Unknown command error
  Help usage display

## Original Source
Yargs CLI Parser
https://github.com/yargs/yargs/blob/master/docs/api.md

## Digest of YARGS_API

# YARGS CLI API

Date retrieved: 2024-06-10

# Command

Signature
```
yargs.command(command: string | string[], description: string, builder?: (yargs: Yargs) => Yargs | object, handler?: (argv: Arguments) => any): Yargs
```
Description
Defines a subcommand. `command` may include positional tokens. `builder` configures flags. `handler` receives parsed argv.

# Options

Signature
```
yargs.option(key: string, options: {
  alias?: string | string[]
  describe: string
  type?: 'string' | 'number' | 'boolean' | 'array'
  default?: any
  demandOption?: boolean | string[]
  nargs?: number
  choices?: Array<string | number>
  coerce?: (arg: any) => any
  global?: boolean
  hidden?: boolean
  group?: string
}): Yargs
```

# Positional

Signature
```
yargs.positional(key: string, options: { describe: string, type?: 'string'|'number'|'boolean', default?: any, choices?: Array<string|number>, coerce?: (arg: any)=>any }): void
```
Used inside command builders to define positional parameters.

# Parsing & argv

Signature
```
yargs.parse(args?: string[], context?: object, callback?: (err: Error, argv: Arguments, output: string) => any): Arguments
```
Property
```
yargs.argv: Arguments
```
Triggers parsing of `process.argv`.

# Help & Usage

Signatures
```
yargs.usage(message: string): Yargs
yargs.help(optionName?: string): Yargs
yargs.alias(option: string, alias: string | string[]): Yargs
yargs.version(versionString?: string): Yargs
```
Automatically adds `--help` and `--version` flags.

# Middleware

Signature
```
yargs.middleware(fn: (argv: Arguments) => any, applyBeforeValidation?: boolean): Yargs
```
Invokes `fn` on `argv` before or after validation.

# Configuration

Signatures
```
yargs.strict(enabled?: boolean): Yargs
yargs.strictCommands(enabled?: boolean): Yargs
yargs.strictOptions(enabled?: boolean): Yargs
yargs.recommendCommands(enabled?: boolean): Yargs
yargs.parserConfiguration(config: {
  'camel-case-expansion'?: boolean,
  'boolean-negation'?: boolean,
  'duplicate-arguments-array'?: boolean,
  'flatten-duplicate-arrays'?: boolean,
  'populate--'?: boolean,
  'combine-arrays'?: boolean,
  'short-option-groups'?: boolean
}): Yargs
yargs.env(prefix?: string | { [key: string]: string }): Yargs
```
Overrides default parser behaviors and enables env var defaults.

# Troubleshooting

Signature
```
yargs.fail(fn: (msg: string, err: Error) => any): Yargs
```
Use to intercept parsing errors or unknown commands.

Expected CLI outputs
```
$ node cli.js --help
Usage: cli <command> [options]

Options:
  --help     Show help                                             [boolean]
  --version  Show version number                                   [boolean]

$ node cli.js unknown
Unknown command: "unknown"
Run "cli --help" for available commands.
```


## Attribution
- Source: Yargs CLI Parser
- URL: https://github.com/yargs/yargs/blob/master/docs/api.md
- License: License: MIT
- Crawl Date: 2025-05-10T08:38:49.146Z
- Data Size: 534165 bytes
- Links Found: 4344

## Retrieved
2025-05-10
