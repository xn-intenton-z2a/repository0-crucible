# COMMANDER

## Crawl Summary
Installation: npm install commander. Import via require or ES import createCommand or new Command. Option API: .option(flags:string,description:string,default?:any),.requiredOption(),.addOption(Option). Option types: boolean, value, optional, negatable, variadic, custom Option(flags,desc). Option retrieval: .opts(), .optsWithGlobals(), .getOptionValue(), .getOptionValueSource(). Command API: .command(name,desc?,opts?), .addCommand(cmd), .argument(name,desc,default?), .alias(), .description(), .version(), .name(), .usage(). Action handler signature: (...args, options, command). Parsing: .parse(), .parseAsync(). Help customization: .helpOption(), .addHelpText(), .showHelpAfterError(), .showSuggestionAfterError(). Hooks: .hook(event, cb). Parsing config: .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments(). Error handling: .error(), .exitOverride(), .configureOutput(). Utility: .version(), .help(), .outputHelp(), .helpInformation(), createCommand().

## Normalised Extract
Table of Contents:
1 Option Definition
2 Option Retrieval
3 Command & Subcommand Definition
4 Argument Configuration
5 Action Handler Signature
6 Parsing Methods
7 Help Generation & Customization
8 Lifecycle Hooks
9 Error & Exit Handling
10 Output Configuration
11 Utility Methods

1 Option Definition
.option(flags:string,description:string,defaultValue?:any)
.requiredOption(flags:string,description:string,defaultValue?:any)
.addOption(option:Option)
Option types:
  boolean: flags e.g. '-d, --debug'
  value: '<name>' placeholder
  optional: '[name]'
  negatable: '--no-foo'
  variadic: '<items...>'
  custom: new Option(flags,desc).default(val).env('VAR').choices([...]).preset(val).argParser(fn).conflicts(opt).implies({opt:val}).hideHelp().makeOptionMandatory()

2 Option Retrieval
program.opts(): Record<string,any>
program.optsWithGlobals(): merged options
program.getOptionValue(name:string): any
program.getOptionValueSource(name:string): 'cli'|'default'|'env'
program.setOptionValue(name:string,value:any)
program.setOptionValueWithSource(name:string,value:any,source:string)

3 Command & Subcommand Definition
.command(name:string,desc?:string,config?:{executableFile?:string,isDefault?:boolean}) => Command
.addCommand(cmd:Command)
.alias(alias:string)
.name(name:string)
.description(desc:string,summary?:string)
.usage(str:string)
.version(version:string,flags?:string,description?:string)
.executableDir(path:string)

4 Argument Configuration
.argument(name:string,description?:string,defaultValue?:any)
.addArgument(arg:Argument)
new Argument(name,desc).choices([...]).default(val,desc).argParser(fn)

5 Action Handler Signature
.action(handler:Function)
handler parameters: declared arguments, options (Record), command instance
async handlers require parseAsync

6 Parsing Methods
.parse(argv?:string[],options?:{from:'node'|'electron'|'user'})
.parseAsync(...)
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption(allow?:boolean)
.allowExcessArguments(allow?:boolean)
.storeOptionsAsProperties()

7 Help Generation & Customization
.helpOption(flags:string,description:string)
.helpCommand(name?:string,description?:string)
.addHelpText(position:'before'|'after',textOrFn:string|Function)
.showHelpAfterError(msgOrBool?:string|boolean)
.showSuggestionAfterError(show:boolean)
.help(): void
.outputHelp(): void
.helpInformation(): string
.configureHelp({sortSubcommands?:boolean,sortOptions?:boolean,showGlobalOptions?:boolean,styleMethods?:Record<string,Function>})
.createHelp(): Help

8 Lifecycle Hooks
.hook('preAction'|'postAction',callback:(thisCmd,actionCmd)=>void)
.hook('preSubcommand',callback:(thisCmd,subCmd)=>void)

9 Error & Exit Handling
.error(message:string,{exitCode?:number,code?:string}?)
.exitOverride(handler?:(err:CommanderError)=>void)

10 Output Configuration
.configureOutput({writeOut:(str:string)=>void,writeErr:(str:string)=>void,outputError:(str:string,write:Function)=>void})

11 Utility Methods
.createCommand(): Command
.version(version:string,flags?:string,description?:string)
.name(name:string)
.usage(str:string)


## Supplementary Details
Option defaultValue: can be any type. Option.env(varName:string) reads default from process.env[varName]. Option.choices(array) enforces allowed values, error message: "argument '<option>' invalid. Allowed choices are ...". Option.presets sets initial value. Option.argParser(fn) transforms value or throws InvalidArgumentError. Option.conflicts(name) prevents co-usage. Option.implies({opt:val}) sets implied values. hideHelp(): excludes from help. makeOptionMandatory(): identical to requiredOption.

program.version: default flags '-V, --version', description 'output the version'. Custom flags override default. Exits after printing.

Command config: hidden:true omits from help. isDefault:true runs when no subcommand specified.

Argument defaultValue applies only to optional arguments. Variadic only allowed on last argument; collected into array until dash or new option. Default for optional argument is not greedy: stops on dash. argument.argParser(fn) transforms or throws.

Parsing: .parse auto-detects node vs electron. from:user treats all argv as user args. 

Error handling: Unknown option or missing argument: error printed, process.exit(1). showHelpAfterError alters printed message. showSuggestionAfterError can disable suggestion. 

ExitOverride: default override throws CommanderError with exitCode, code, message. error(): use same display formatting as built-in errors.


## Reference Details
// Full SDK Method Signatures and Types

Type CommanderError = { exitCode: number, code: string, message: string }
interface ParseOptions { from: 'node'|'electron'|'user' }

class Command {
  constructor(name?: string)
  name(name: string): this
  usage(str: string): this
  description(str: string, summary?: string): this
  version(version: string, flags?: string, description?: string): this
  helpOption(flags: string, description: string): this
  helpCommand(name?: string, description?: string): this
  addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|(() => string)): this
  configureHelp(config: { sortCommands?: boolean, sortOptions?: boolean, showGlobalOptions?: boolean, optionTerm?: Function, subcommandTerm?: Function }): this
  createHelp(): Help
  exitOverride(handler?: (err: CommanderError) => any): this
  showHelpAfterError(msgOrBool?: string|boolean): this
  showSuggestionAfterError(show?: boolean): this
  allowUnknownOption(allow?: boolean): this
  allowExcessArguments(allow?: boolean): this
  enablePositionalOptions(): this
  passThroughOptions(): this
  parse(argv?: string[], options?: ParseOptions): this
  parseAsync(argv?: string[], options?: ParseOptions): Promise<this>
  error(message: string, opts?: { exitCode?: number, code?: string }): never
  exit(code?: number): never
  outputHelp(opts?: { error?: boolean }): this
  help(opts?: { error?: boolean }): never
  helpInformation(): string
  configureOutput(config: { writeOut?: (str: string) => void, writeErr?: (str: string) => void, outputError?: (str: string, write: (str: string) => void) => void }): this
  addCommand(cmd: Command, opts?: { isDefault?: boolean, hidden?: boolean }): this
  command(nameAndArgs: string, description?: string, opts?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command
  executableDir(path: string): this
  argument(name: string, description?: string, defaultValue?: any): this
  addArgument(arg: Argument): this
  option(flags: string, description: string, defaultValue?: any): this
  requiredOption(flags: string, description: string, defaultValue?: any): this
  addOption(option: Option): this
  opts(): Record<string, any>
  optsWithGlobals(): Record<string, any>
  getOptionValue(name: string): any
  setOptionValue(name: string, value: any): this
  getOptionValueSource(name: string): 'cli'|'default'|'env'
  setOptionValueWithSource(name: string, value: any, source: string): this
  storeOptionsAsProperties(): this
  hook(event: 'preAction'|'postAction'|'preSubcommand', callback: (thisCommand: Command, actionCommand: Command) => any): this
  args: string[]
  opts(): Record<string, any>
}

class Option {
  constructor(flags: string, description?: string)
  default(value: any, description?: string): this
  env(variable: string): this
  choices(values: Array<string|number>): this
  preset(value: any): this
  argParser(fn: (value: string, previous: any) => any): this
  conflicts(optionName: string): this
  implies(config: Record<string, any>): this
  hideHelp(): this
  makeOptionMandatory(): this
}

class Argument {
  constructor(name: string, description?: string)
  default(value: any, description?: string): this
  choices(values: Array<string|number>): this
  argParser(fn: (value: string, previous: any) => any): this
}

// Full Code Example: string-util.js
const { Command, Option, Argument } = require('commander');
const program = new Command('string-util');
program
  .description('CLI to JavaScript string utilities')
  .version('0.8.0', '-v, --vers', 'output version');
program.command('split <string>')
  .description('split string')
  .option('--first', 'first substring only')
  .addOption(new Option('-s, --separator <char>', 'separator char').default(',', 'comma'))
  .action((str, options, command) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });
program.hook('preAction', (thisCmd, actionCmd) => {
  if (thisCmd.opts().trace) console.log('Calling', actionCmd.name());
});
program.configureOutput({
  writeOut: str => process.stdout.write(str),
  writeErr: str => process.stderr.write(str),
  outputError: (str, write) => write(`ERROR: ${str}`)
});
program.exitOverride();
program.parse(process.argv);

// Troubleshooting Procedures
// Unknown option:
// > node app.js --unknown
// error: unknown option '--unknown'
// (Did you mean --help?)

// Missing required option:
// > node app.js split
// error: required option '-s, --separator <char>' not specified


## Information Dense Extract
npm install commander; import { Command, Option, Argument, createCommand } from 'commander'; const program = createCommand(); program.name(string).version(v,flags,desc).usage(usage).description(desc).helpOption(flags,desc).helpCommand(name,desc); // Options: .option(f,d,df).requiredOption(f,d,df).addOption(new Option(f,d).default(v).env(VAR).choices([...]).preset(v).argParser(fn).conflicts(opt).implies({opt:v}).hideHelp().makeOptionMandatory()); // Args: .argument('<x>',d,def).addArgument(new Argument(name,d).choices([...]).default(v).argParser(fn)); // Commands: .command(nameAndArgs,desc,opts).addCommand(cmd).alias(a).executableDir(path); // Parsing: .parse([argv],{from}).parseAsync(); .enablePositionalOptions().passThroughOptions().allowUnknownOption().allowExcessArguments().storeOptionsAsProperties(); // Retrieval: opts(),optsWithGlobals(),getOptionValue(n),getOptionValueSource(n),setOptionValue(n,v),setOptionValueWithSource(n,v,src),args; // Help: .addHelpText(pos,textOrFn).showHelpAfterError(msg?).showSuggestionAfterError(bool).help();.outputHelp();.helpInformation();.configureHelp(cfg).createHelp(); // Hooks: .hook('preAction'|'postAction'|'preSubcommand',cb); // Errors: .error(msg,{exitCode,code});.exitOverride(cb); // Output: .configureOutput({writeOut,writeErr,outputError}); // Util: createCommand();

## Sanitised Extract
Table of Contents:
1 Option Definition
2 Option Retrieval
3 Command & Subcommand Definition
4 Argument Configuration
5 Action Handler Signature
6 Parsing Methods
7 Help Generation & Customization
8 Lifecycle Hooks
9 Error & Exit Handling
10 Output Configuration
11 Utility Methods

1 Option Definition
.option(flags:string,description:string,defaultValue?:any)
.requiredOption(flags:string,description:string,defaultValue?:any)
.addOption(option:Option)
Option types:
  boolean: flags e.g. '-d, --debug'
  value: '<name>' placeholder
  optional: '[name]'
  negatable: '--no-foo'
  variadic: '<items...>'
  custom: new Option(flags,desc).default(val).env('VAR').choices([...]).preset(val).argParser(fn).conflicts(opt).implies({opt:val}).hideHelp().makeOptionMandatory()

2 Option Retrieval
program.opts(): Record<string,any>
program.optsWithGlobals(): merged options
program.getOptionValue(name:string): any
program.getOptionValueSource(name:string): 'cli'|'default'|'env'
program.setOptionValue(name:string,value:any)
program.setOptionValueWithSource(name:string,value:any,source:string)

3 Command & Subcommand Definition
.command(name:string,desc?:string,config?:{executableFile?:string,isDefault?:boolean}) => Command
.addCommand(cmd:Command)
.alias(alias:string)
.name(name:string)
.description(desc:string,summary?:string)
.usage(str:string)
.version(version:string,flags?:string,description?:string)
.executableDir(path:string)

4 Argument Configuration
.argument(name:string,description?:string,defaultValue?:any)
.addArgument(arg:Argument)
new Argument(name,desc).choices([...]).default(val,desc).argParser(fn)

5 Action Handler Signature
.action(handler:Function)
handler parameters: declared arguments, options (Record), command instance
async handlers require parseAsync

6 Parsing Methods
.parse(argv?:string[],options?:{from:'node'|'electron'|'user'})
.parseAsync(...)
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption(allow?:boolean)
.allowExcessArguments(allow?:boolean)
.storeOptionsAsProperties()

7 Help Generation & Customization
.helpOption(flags:string,description:string)
.helpCommand(name?:string,description?:string)
.addHelpText(position:'before'|'after',textOrFn:string|Function)
.showHelpAfterError(msgOrBool?:string|boolean)
.showSuggestionAfterError(show:boolean)
.help(): void
.outputHelp(): void
.helpInformation(): string
.configureHelp({sortSubcommands?:boolean,sortOptions?:boolean,showGlobalOptions?:boolean,styleMethods?:Record<string,Function>})
.createHelp(): Help

8 Lifecycle Hooks
.hook('preAction'|'postAction',callback:(thisCmd,actionCmd)=>void)
.hook('preSubcommand',callback:(thisCmd,subCmd)=>void)

9 Error & Exit Handling
.error(message:string,{exitCode?:number,code?:string}?)
.exitOverride(handler?:(err:CommanderError)=>void)

10 Output Configuration
.configureOutput({writeOut:(str:string)=>void,writeErr:(str:string)=>void,outputError:(str:string,write:Function)=>void})

11 Utility Methods
.createCommand(): Command
.version(version:string,flags?:string,description?:string)
.name(name:string)
.usage(str:string)

## Original Source
Commander.js
https://github.com/tj/commander.js

## Digest of COMMANDER

# Commander.js Technical Digest (Retrieved on 2024-06-17)

## 1 Installation and Initialization

### Install via npm
```
npm install commander
```

### Require or Import

CommonJS:
```
const { Command, Option, Argument } = require('commander');
const program = new Command();
```

ESM:
```
import { Command, Option, Argument, createCommand } from 'commander';
const program = createCommand();
```

TypeScript:
```
import { Command } from 'commander';
const program = new Command();
```

## 2 Option Definition and Retrieval

### Method Signatures

- `.option(flags: string, description: string, defaultValue?: any): Command`
- `.requiredOption(flags: string, description: string, defaultValue?: any): Command`
- `.addOption(option: Option): Command`

### Common Patterns

Boolean option:
```
program.option('-d, --debug', 'enable debug mode');
```
Value option:
```
program.option('-p, --port <number>', 'server port', 3000);
```
Optional value:
```
program.option('-c, --cheese [type]', 'add cheese optionally');
```
Negatable boolean:
```
program.option('--no-sauce', 'disable sauce');
```
Variadic:
```
program.option('-n, --numbers <nums...>', 'list of numbers');
```
Custom Option:
```
new Option('-t, --timeout <ms>', 'timeout').default(60000).env('TIMEOUT_MS');
```

### Retrieval

- `program.opts()`: returns `{ [camelCasedFlag]: value }
`
- `program.optsWithGlobals()`: merges local and global
- `program.getOptionValue(name: string)`: single value
- `program.getOptionValueSource(name: string)`: returns 'cli'|'default'|'env'

## 3 Command and Argument Configuration

### Subcommand Definition

```
program.command('serve <script> [options]')
  .description('start server script')
  .alias('s')
  .action((script, opts, cmd) => { /* handler */ });
```

Or stand-alone executable:
```
program.command('start <service>', 'start named service', { executableFile: 'bin/start.js' });
program.executableDir('subcommands');
```

### Arguments

- `.argument('<name>', 'description')`
- `.argument('[name]', 'description', defaultValue)`
- `.argument('<items...>', 'list of items')`
- `new Argument('<size>', 'cup size').choices(['small','medium','large']).default('medium')`

### Retrieval

- `cmd.args`: array of leftover args
- handler signature: `(arg1,..., options, command)`
- `program.parse(argv?: string[], options?: ParseOptions)`
- `program.parseAsync(...)` for async handlers

## 4 Automated and Custom Help

### Built-in Help

- Default flags: `-h, --help`
- Shows usage, description, arguments, options

### Custom Help Text

- `.addHelpText(position: 'before'|'after', textOrFn)`
- `.showHelpAfterError([msg])`
- `.showSuggestionAfterError(false)`

### Program Methods

- `.help()`: display and exit
- `.outputHelp()`: display without exit
- `.helpInformation()`: return help as string

## 5 Lifecycle Hooks

- `.hook(event: 'preAction'|'postAction'|'preSubcommand', callback)`
- callback parameters: `(thisCommand, actionCommand)` or `(thisCommand, subcommand)`

## 6 Parsing Configuration

- `.enablePositionalOptions()`: only program options before subcommands
- `.passThroughOptions()`: unknown options become args
- `.allowUnknownOption()`, `.allowExcessArguments()`

## 7 Error and Exit Handling

### Error Handling Methods

- `program.error(message: string, options?: { exitCode?: number, code?: string })`
- `.exitOverride()`: throw rather than process.exit

### Output Configuration

- `.configureOutput({ writeOut: fn, writeErr: fn, outputError: fn })`

## 8 Utilities and Misc

- `.version(version: string, flags?: string, description?: string)`
- `.name(name: string)`
- `.usage(str: string)`
- `.description(str: string, summary?: string)`
- `.helpOption(flags: string, description: string)`
- `.helpCommand([name], [description])`
- `.command(name, [description], [opts])`, `.addCommand(cmd)`
- `.storeOptionsAsProperties()`


## Attribution
- Source: Commander.js
- URL: https://github.com/tj/commander.js
- License: MIT License
- Crawl Date: 2025-05-11T08:59:11.888Z
- Data Size: 684724 bytes
- Links Found: 4902

## Retrieved
2025-05-11
