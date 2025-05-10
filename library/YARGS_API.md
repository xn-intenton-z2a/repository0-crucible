# YARGS_API

## Crawl Summary
yargs returns an Argv instance configured via method chaining. Key methods: option(defines type, alias, default, demand, choices, coerce, conflicts, implies), command(adds subcommands with builder and handler), parse(process args or invoke callback), middleware(registers functions pre/post validation), config(loads file-based config), env(import ENV vars), demandOption(required flags), choices(restrict allowed values), coerce(transform values), group(organize help), strict(strict parsing), parserConfiguration(tune parser flags), completion(enable shell completions), recommendCommands(suggest similar commands), fail(custom error handling), help/version(set help/version flags).

## Normalised Extract
Table of Contents
1 CLI Initialization
2 Defining Options
3 Subcommands
4 Parsing Flow
5 Configuration & Environment
6 Validation & Coercion
7 Grouping & Help Output
8 Strict Mode & Recommendations
9 Shell Completion
10 Parser Configuration
11 Error Handling

1 CLI Initialization
yargs(args?: string[]): Argv    Creates parser instance; default args=process.argv.slice(2).

2 Defining Options
.option(key, opt) -> Argv
  key: string|array
  opt.alias: string|array
  opt.type: 'string'|'number'|'boolean'|'array'
  opt.describe: string
  opt.default: any
  opt.demandOption: boolean|string
  opt.choices: array
  opt.coerce: fn(arg)->any
  opt.nargs: number
  opt.normalization: boolean
  opt.implies: string|array
  opt.conflicts: string|array
  opt.hidden: boolean
  opt.global: boolean

3 Subcommands
.command(cmd, description, builder?, handler?) -> Argv
  cmd: commandName or array of aliases
  builder: yargs -> Argv or option map
  handler: argv -> void
Pattern:
  yargs.command('serve <file>', 'start server', y=>y.option('port',{default:80}), argv=>{ ... })

4 Parsing Flow
.parse(args, context?, parseCallback?) -> argv
  parseCallback(err, argv, output)
.middleware(fns, applyBeforeValidation?) -> Argv    Register pre/post validation hooks

5 Configuration & Environment
.config(key, desc?, global?, parseFn?) -> Argv    Load config file path from key
.env(prefix) -> Argv    Map ENV_PREFIX_OPT to argv.opt

6 Validation & Coercion
.demandOption(keys, msg?, boolean?) -> Argv
.choices(key, values) -> Argv
.coerce(key, fn) -> Argv

7 Grouping & Help Output
.group(opts, groupName) -> Argv
.help(opt?, msg?, fn?) -> Argv
.version(opt?, ver?, fn?) -> Argv
.showHelpOnFail(enabled, msg?) -> Argv
.wrap(cols) -> Argv

8 Strict Mode & Recommendations
.strict(), .strictCommands(), .strictOptions() -> Argv
yargs.recommendCommands() -> Argv

9 Shell Completion
.completion(cmd?, fn?) -> Argv

10 Parser Configuration
.parserConfiguration({
  'boolean-negation': boolean,
  'camel-case-expansion': boolean,
  'duplicate-arguments-array': boolean,
  'flatten-duplicate-arrays': boolean,
  'populate--': boolean,
  'short-option-groups': boolean,
  'parse-numbers': boolean,
  'parse-positional-numbers': boolean,
  'greedy-arrays': boolean
}) -> Argv

11 Error Handling
.fail(fn(msg, err)) -> Argv
.check(fn(argv, aliases) => boolean|string) -> Argv

## Supplementary Details
- Default behavior: exitProcess enabled, strictParse false, boolean-negation true, camel-case-expansion true.
- ENV mapping: prefix converts dots and dashes to underscores; case-insensitive.
- Config file loader: JSON.parse by default; supply parseFn for YAML.
- Middleware order: applyBeforeValidation=true runs before validation checks, else after.
- Help formatting: wrap width = terminal columns or provided value.
- Unknown options: in strict mode, error code EUNKNOWN; .recommendCommands attaches suggestions based on Levenshtein distance.
- Completion: default command is '_' if no name provided; provides suggestions for commands, options, and positional.
- Group: groups appear under heading in help sorted by group insertion order.


## Reference Details
Functions & Signatures:
yargs(args?: string[]): Argv    Returns parser instance.

Argv.option(key: string|string[], opt: OptionConfig): Argv
  OptionConfig:
    alias?: string|string[]; type?: 'string'|'number'|'boolean'|'array'; describe?: string;
    default?: any; demandOption?: boolean|string; choices?: any[]; coerce?: (arg:any)=>any;
    nargs?: number; normalization?: boolean; implies?: string|string[];
    conflicts?: string|string[]; hidden?: boolean; global?: boolean;

Argv.command(cmd: string|string[], description: string,
             builder?: ((yargs:Argv)=>Argv)|Record<string,OptionConfig>,
             handler?: (argv:Arguments)=>void): Argv

Argv.parse(args: string|string[], context?:object,
            parseCallback?: (err:Error|null, argv:Arguments, output:string)=>void): Arguments

Argv.middleware(fns:Function|Function[], applyBeforeValidation?:boolean): Argv

Argv.config(key:string, description?:string, global?:boolean, parseFn?:(path:string)=>object): Argv

Argv.env(prefix:string): Argv

Argv.demandOption(keys:string|string[], msg?:string, boolean?:boolean): Argv

Argv.default(key:string|string[], value:any, description?:string): Argv

Argv.choices(key:string, values:ReadonlyArray<any>): Argv

Argv.coerce(key:string|string[], fn:(arg:any)=>any): Argv

Argv.group(opts:string|string[], groupName:string): Argv

Argv.strict(): Argv    Exits on unknown options and commands
Argv.strictCommands(): Argv   Exits on unknown commands only
Argv.strictOptions(): Argv    Exits on unknown options only

Argv.parserConfiguration(config:Record<string,boolean>): Argv
  Default parserConfiguration:
    boolean-negation: true; camel-case-expansion: true;
    duplicate-arguments-array: true; flatten-duplicate-arrays: true;
    populate--: false; short-option-groups: true;
    parse-numbers: true; parse-positional-numbers: true; greedy-arrays: false;

Argv.completion(cmd?:string, fn?:(current:string,argv:Arguments,done:(completions:string[])=>void)=>void): Argv

Argv.recommendCommands(): Argv

Argv.fail(fn:(msg:string, err:Error|undefined)=>void): Argv

Argv.check(fn:(argv:Arguments, aliases:Record<string,string[]>)=>boolean|string): Argv

Argv.help(opt?:string, msg?:string, fn?:()=>void): Argv
Argv.version(opt?:string, version?:string, fn?:()=>void): Argv

Argv.showHelpOnFail(enabled:boolean, message?:string): Argv
Argv.wrap(cols:number): Argv
Argv.detectLocale(enabled:boolean): Argv
Argv.locale(locale:string): Argv
Argv.updateLocale(obj:Record<string,string>): Argv
Argv.scriptName(name:string): Argv
Argv.exitProcess(enabled:boolean): Argv
Argv.pkgConf(name:string): Argv
Argv.example(cmd:string, description:string, opts?:{hide:boolean}): Argv

Usage Example:
const argv = yargs(process.argv.slice(2))
  .scriptName('myapp')
  .usage('Usage: $0 <command> [options]')
  .option('p', {alias:'port', type:'number', describe:'port to bind on', default:8080, demandOption:true})
  .command('start <file>', 'start server', y=>y.option('verbose',{type:'boolean'}), argv=>{ console.log('port',argv.port) })
  .middleware(arg=>{ if(arg.verbose) console.log('verbose on') }, true)
  .config('config', 'path to config file', true, path=>require(path))
  .env('MYAPP')
  .strict()
  .completion()  
  .help('h')
  .version('v','1.2.3')
  .argv;

Best Practices:
- Use .strictCommands() to catch typos in subcommands.
- Group related options with .group([...],'GroupName') for clearer help.
- Provide .demandOption for required flags instead of manual checks.
- Leverage .coerce for type transformations (e.g. parse JSON strings).
- Use .recommendCommands() to improve UX on mistyped commands.

Troubleshooting:
1. Unknown option error:
  Command: node myapp.js --unknown
  Output: Unknown argument: unknown
           Did you mean port?
  Fix: add .recommendCommands() and/or .strictOptions(false)

2. JSON parse error in config:
  Error: Unexpected token o in JSON at position 1
  Command: node myapp.js --config wrong.json
  Fix: supply parseFn in .config to handle YAML or custom formats.


## Information Dense Extract
yargs(args?:string[]):Argv|Argv.option(key:string|string[],{alias?,type?,describe?,default?,demandOption?,choices?,coerce?,nargs?,normalization?,implies?,conflicts?,hidden?,global?}):Argv.command(cmd:string|string[],desc:string,builder?:((Argv)=>Argv)|Record<string,OptionConfig>,handler?:(Arguments)=>void):Argv.parse(args:string|string[],context?:object,cb?:(Error|null,Arguments,string)=>void):Arguments.middleware(fns:Function|Function[],before?:boolean):Argv.config(key:string,desc?:string,global?:boolean,parseFn?:(string)=>object):Argv.env(prefix:string):Argv.demandOption(keys:string|string[],msg?:string,boolean?:boolean):Argv.default(key:string|string[],value:any,desc?:string):Argv.choices(key:string,values:any[]):Argv.coerce(key:string|string[],fn:(any)=>any):Argv.group(opts:string|string[],group:string):Argv.strict():Argv.strictCommands():Argv.strictOptions():Argv.parserConfiguration({boolean-negation:boolean,camel-case-expansion:boolean,duplicate-arguments-array:boolean,flatten-duplicate-arrays:boolean,populate--:boolean,short-option-groups:boolean,parse-numbers:boolean,parse-positional-numbers:boolean,greedy-arrays:boolean}):Argv.completion(cmd?:string,fn?:(string,Arguments,(string[])=>void)=>void):Argv.recommendCommands():Argv.fail(fn:(string,Error|undefined)=>void):Argv.check(fn:(Arguments,Record<string,string[]>)=>boolean|string):Argv.help(opt?:string,msg?:string,fn?:()=>void):Argv.version(opt?:string,version?:string,fn?:()=>void):Argv.showHelpOnFail(boolean,msg?:string):Argv.wrap(cols:number):Argv.detectLocale(boolean):Argv.locale(string):Argv.updateLocale(Record<string,string>):Argv.scriptName(string):Argv.exitProcess(boolean):Argv.pkgConf(string):Argv.example(string,string,{hide?:boolean}):Argv.getUsageInstance():Usage


## Sanitised Extract
Table of Contents
1 CLI Initialization
2 Defining Options
3 Subcommands
4 Parsing Flow
5 Configuration & Environment
6 Validation & Coercion
7 Grouping & Help Output
8 Strict Mode & Recommendations
9 Shell Completion
10 Parser Configuration
11 Error Handling

1 CLI Initialization
yargs(args?: string[]): Argv    Creates parser instance; default args=process.argv.slice(2).

2 Defining Options
.option(key, opt) -> Argv
  key: string|array
  opt.alias: string|array
  opt.type: 'string'|'number'|'boolean'|'array'
  opt.describe: string
  opt.default: any
  opt.demandOption: boolean|string
  opt.choices: array
  opt.coerce: fn(arg)->any
  opt.nargs: number
  opt.normalization: boolean
  opt.implies: string|array
  opt.conflicts: string|array
  opt.hidden: boolean
  opt.global: boolean

3 Subcommands
.command(cmd, description, builder?, handler?) -> Argv
  cmd: commandName or array of aliases
  builder: yargs -> Argv or option map
  handler: argv -> void
Pattern:
  yargs.command('serve <file>', 'start server', y=>y.option('port',{default:80}), argv=>{ ... })

4 Parsing Flow
.parse(args, context?, parseCallback?) -> argv
  parseCallback(err, argv, output)
.middleware(fns, applyBeforeValidation?) -> Argv    Register pre/post validation hooks

5 Configuration & Environment
.config(key, desc?, global?, parseFn?) -> Argv    Load config file path from key
.env(prefix) -> Argv    Map ENV_PREFIX_OPT to argv.opt

6 Validation & Coercion
.demandOption(keys, msg?, boolean?) -> Argv
.choices(key, values) -> Argv
.coerce(key, fn) -> Argv

7 Grouping & Help Output
.group(opts, groupName) -> Argv
.help(opt?, msg?, fn?) -> Argv
.version(opt?, ver?, fn?) -> Argv
.showHelpOnFail(enabled, msg?) -> Argv
.wrap(cols) -> Argv

8 Strict Mode & Recommendations
.strict(), .strictCommands(), .strictOptions() -> Argv
yargs.recommendCommands() -> Argv

9 Shell Completion
.completion(cmd?, fn?) -> Argv

10 Parser Configuration
.parserConfiguration({
  'boolean-negation': boolean,
  'camel-case-expansion': boolean,
  'duplicate-arguments-array': boolean,
  'flatten-duplicate-arrays': boolean,
  'populate--': boolean,
  'short-option-groups': boolean,
  'parse-numbers': boolean,
  'parse-positional-numbers': boolean,
  'greedy-arrays': boolean
}) -> Argv

11 Error Handling
.fail(fn(msg, err)) -> Argv
.check(fn(argv, aliases) => boolean|string) -> Argv

## Original Source
Yargs CLI Parser
https://github.com/yargs/yargs/blob/master/docs/api.md

## Digest of YARGS_API

# Yargs API Documentation (retrieved on 2024-06-20)

## yargs([args])
Signature: function yargs(args?: string[]): Argv
Returns a new Argv parser instance based on provided args or process.argv.

## .option(key, opt)
Signature: Argv.option(key: string | string[], opt: {
  alias?: string | string[];
  type?: 'string' | 'number' | 'boolean' | 'array';
  describe?: string;
  default?: any;
  demandOption?: boolean | string;
  choices?: ReadonlyArray<any>;
  coerce?: (arg: any) => any;
  nargs?: number;
  normalization?: boolean;
  implies?: string | string[];
  conflicts?: string | string[];
  hidden?: boolean;
  global?: boolean;
}): Argv
Defines an option with full configuration.

## .command(cmd, description, builder?, handler?)
Signature: Argv.command(
  cmd: string | string[],
  description: string,
  builder?: (yargs: Argv) => Argv | Record<string, object>,
  handler?: (argv: Arguments) => void
): Argv
Adds a subcommand. Builder can be a function or options map.

## .parse(args, context?, parseCallback?)
Signature: Argv.parse(
  args: string | string[],
  context?: object,
  parseCallback?: (err: Error | null, argv: Arguments, output: string) => void
): Arguments
Parses args into argv or invokes callback.

## .middleware(fns, applyBeforeValidation?)
Signature: Argv.middleware(
  fns: Function | Function[],
  applyBeforeValidation?: boolean
): Argv
Registers middleware functions executed before or after validation.

## .config(key, [description], [global], [parseFn])
Signature: Argv.config(
  key: string,
  description?: string,
  global?: boolean,
  parseFn?: (configPath: string) => object
): Argv
Loads JSON/YAML config from a file path provided via key or ENV.

## .env(prefix)
Signature: Argv.env(prefix: string): Argv
Populates argv from process.env variables with given prefix.

## .demandOption(keys, [msg], [boolean])
Signature: Argv.demandOption(
  keys: string | string[],
  msg?: string,
  boolean?: boolean
): Argv
Requires specific options.

## .choices(key, values)
Signature: Argv.choices(key: string, values: ReadonlyArray<any>): Argv
Restricts option values to provided set.

## .coerce(key, fn)
Signature: Argv.coerce(key: string | string[], fn: (arg: any) => any): Argv
Transforms argument value before validation.

## .group(opts, groupName)
Signature: Argv.group(opts: string | string[], groupName: string): Argv
Groups options under a named heading in help.

## .strict(), .strictCommands(), .strictOptions()
Signature: Argv.strict(): Argv
      Argv.strictCommands(): Argv
      Argv.strictOptions(): Argv
Enables strict parsing, unknown options or commands cause errors.

## .parserConfiguration(config)
Signature: Argv.parserConfiguration(config: {
  'boolean-negation'?: boolean;
  'camel-case-expansion'?: boolean;
  'duplicate-arguments-array'?: boolean;
  'flatten-duplicate-arrays'?: boolean;
  'populate--'?: boolean;
  'short-option-groups'?: boolean;
  'parse-numbers'?: boolean;
  'parse-positional-numbers'?: boolean;
  'greedy-arrays'?: boolean;
  'duplicate-arguments-array'?: boolean;
}): Argv
Configures underlying parser behavior.

## .completion(cmd?, fn?)
Signature: Argv.completion(
  cmd?: string,
  fn?: (current: string, argv: Arguments, done: (completions: string[]) => void) => void
): Argv
Enables shell auto-completion.

## .recommendCommands()
Signature: Argv.recommendCommands(): Argv
Suggests similar commands on unknown command error.

## .fail(fn)
Signature: Argv.fail(fn: (msg: string, err: Error | undefined) => void): Argv
Customizes exit behavior on failure.

## .help([opt], [msg], [fn]) and .version([opt], [ver], [fn])
Signature: Argv.help(opt?: string, msg?: string, fn?: () => void): Argv
      Argv.version(opt?: string, version?: string, fn?: () => void): Argv
Adds help/version options with custom triggers.


## Attribution
- Source: Yargs CLI Parser
- URL: https://github.com/yargs/yargs/blob/master/docs/api.md
- License: License: MIT
- Crawl Date: 2025-05-10T06:40:22.251Z
- Data Size: 579514 bytes
- Links Found: 4461

## Retrieved
2025-05-10
