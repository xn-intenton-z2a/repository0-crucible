library/YARGS_API.md
# library/YARGS_API.md
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
library/NODE_ASSERT.md
# library/NODE_ASSERT.md
# NODE_ASSERT

## Crawl Summary
node:assert provides assertion functions and error classes for testing. Key modes: strict (node:assert/strict) and legacy (node:assert). Strict mode: deepStrictEqual uses Object.is, compares prototypes and symbols. Legacy: deepEqual uses ==, ignores prototypes. Classes: AssertionError (actual, expected, operator, code ERR_ASSERTION), CallTracker (deprecated tracking of exact function calls). Main APIs: assert.ok/assert, equal/notEqual, deepEqual/notDeepEqual, strictEqual/notStrictEqual, deepStrictEqual/notDeepStrictEqual, throws/doesNotThrow, rejects/doesNotReject, match/doesNotMatch, ifError, fail, partialDeepStrictEqual.

## Normalised Extract
Table of Contents:
1. Strict assertion mode (node:assert/strict)
2. Legacy assertion mode (node:assert)
3. AssertionError class
4. CallTracker class (deprecated)
5. Assertion functions: ok, equal, deepEqual, strictEqual, deepStrictEqual, throws, rejects, match, ifError, fail, partialDeepStrictEqual

1. Strict assertion mode
Module import: import { strict as assert } from 'node:assert'
Behavior: Non-strict methods forward to strict implementations. Error diffs shown for object mismatches.
Disable colors: NO_COLOR or NODE_DISABLE_COLORS

2. Legacy assertion mode
Module import: import assert from 'node:assert'
Behavior: equal and deepEqual use == and recursion stops on circular refs. Prototypes ignored.

3. class AssertionError
Signature: new assert.AssertionError(options)
Options: actual:any, expected:any, operator:string, message?:string, stackStartFn?:Function
Properties: actual, expected, operator, generatedMessage:boolean, name='AssertionError', code='ERR_ASSERTION'
Throws: on failed assertions

4. class CallTracker
Signature: new assert.CallTracker()
Methods:
  calls(fn?:Function, exact?:number=1):Function wrapper that must be called exact times
  getCalls(wrapper):Array<{ thisArg:any, arguments:Array<any> }>
  report():Array<{ message:string, actual:number, expected:number, operator:string, stack:object }>
  reset(fn?:Function):void resets call count
  verify():void throws if wrappers not called as expected

5. Assertion functions
assert.ok(value, message?)
assert.equal(a, b, msg?) uses ==
assert.notEqual(a, b, msg?)
assert.deepEqual(a, b, msg?) legacy deep equality
assert.notDeepEqual(a, b, msg?)
assert.strictEqual(a, b, msg?) uses ===
assert.notStrictEqual(a, b, msg?)
assert.deepStrictEqual(a, b, msg?) strict deep equality (Object.is, prototype, symbol, Set/Map, RegExp lastIndex)
assert.notDeepStrictEqual(a, b, msg?)
assert.throws(fn, error?, msg?) expects thrown error matching pattern/class
assert.doesNotThrow(fn, error?, msg?)
assert.rejects(fn|Promise, error?, msg?):Promise<void>
assert.doesNotReject(fn|Promise, error?, msg?):Promise<void>
assert.match(str, regexp, msg?)
assert.doesNotMatch(str, regexp, msg?)
assert.ifError(value)
assert.fail([msg]|actual, expected?, operator?, stackStartFn?)
assert.partialDeepStrictEqual(a,b,msg?)

## Supplementary Details
Module import paths: node:assert (legacy), node:assert/strict (strict mode). Environment flags: NO_COLOR, NODE_DISABLE_COLORS. Version history: Strict mode exposed v13.9.0; CallTracker deprecated v20.1.0. Circular references: strict stops on circular first encounter; legacy stops when either side circular. deepStrictEqual comparison rules: Object.is for primitives, prototypes via ===, symbol keys, non-enumerable Error properties, unordered Map/Set keys, WeakMap/WeakSet compared by instance reference only.


## Reference Details
/// Class AssertionError
constructor AssertionError(options: { actual:any; expected:any; operator:string; message?:string; stackStartFn?:Function; })
Properties: actual:any, expected:any, operator:string, generatedMessage:boolean, name:'AssertionError', code:'ERR_ASSERTION'

/// Class CallTracker (deprecated)
constructor CallTracker(): void
calls(fn?:Function, exact?:number=1):Function wrapper
getCalls(wrapper:Function):Array<{ thisArg:any; arguments:Array<any> }>
report():Array<{ message:string; actual:number; expected:number; operator:string; stack:object }>
reset(fn?:Function):void
verify():void throws AssertionError

/// Assertion functions
function ok(value:any, message?:string|Error):void throws AssertionError if !value
function equal(actual:any, expected:any, message?:string|Error):void throws AssertionError if actual != expected
function notEqual(actual:any, expected:any, message?:string|Error):void throws AssertionError if actual == expected
function deepEqual(actual:any, expected:any, message?:string|Error):void legacy deep equals using ==
function notDeepEqual(actual:any, expected:any, message?:string|Error):void
function strictEqual(actual:any, expected:any, message?:string|Error):void throws if actual !== expected
function notStrictEqual(actual:any, expected:any, message?:string|Error):void
function deepStrictEqual(actual:any, expected:any, message?:string|Error):void throws if not deep equal per strict rules
function notDeepStrictEqual(actual:any, expected:any, message?:string|Error):void
function throws(fn:Function, error?:RegExp|Function|Object, message?:string|Error):void
function doesNotThrow(fn:Function, error?:RegExp|Function|Object, message?:string|Error):void
function rejects(asyncFn:Function|Promise<any>, error?:RegExp|Function|Object, message?:string):Promise<void>
function doesNotReject(asyncFn:Function|Promise<any>, error?:RegExp|Function|Object, message?:string):Promise<void>
function match(string:string, regexp:RegExp, message?:string|Error):void
function doesNotMatch(string:string, regexp:RegExp, message?:string|Error):void
function ifError(value:any):void throws if value truthy
function fail(message?:string|Error):void always throws
function partialDeepStrictEqual(actual:any, expected:any, message?:string|Error):void compares subset

/// Usage examples
import { strict as assert } from 'node:assert';
assert.deepStrictEqual({ a:1 },{ a:1 });

import assert from 'node:assert';
try{assert.strictEqual(1,2);}catch(e){console.log(e.code,'expected ERR_ASSERTION');}

/// Troubleshooting
Problem: no diff displayed
Solution: use strict mode import or set NO_COLOR off

Problem: CallTracker verification failure
Command: node test.js
Output: AssertionError: Expected the func function to be executed 2 time(s) but was executed 1 time(s).

## Information Dense Extract
assert module: node:assert (legacy), node:assert/strict (strict). Modes: strict exposes deepStrictEqual(Object.is,=== prototype,symbol,unordered Set/Map; legacy uses ==, ignores prototype). Class AssertionError(options{actual,expected,operator,message?,stackStartFn?}), code ERR_ASSERTION. Class CallTracker():calls(fn?,exact=1), getCalls(wrapper), report(), reset(fn?), verify(). Functions: ok(v,msg?), equal(a,b,msg?)(==), notEqual, deepEqual(a,b,msg?), notDeepEqual, strictEqual(a,b,msg?)(===), notStrictEqual, deepStrictEqual(a,b,msg?), notDeepStrictEqual, throws(fn,error?,msg?), doesNotThrow(fn,error?,msg?), rejects(fn|Promise,error?,msg?):Promise, doesNotReject, match(str,regexp,msg?), doesNotMatch, ifError(v), fail([msg]|actual,expected,operator,stackStartFn), partialDeepStrictEqual(a,b,msg?).

## Sanitised Extract
Table of Contents:
1. Strict assertion mode (node:assert/strict)
2. Legacy assertion mode (node:assert)
3. AssertionError class
4. CallTracker class (deprecated)
5. Assertion functions: ok, equal, deepEqual, strictEqual, deepStrictEqual, throws, rejects, match, ifError, fail, partialDeepStrictEqual

1. Strict assertion mode
Module import: import { strict as assert } from 'node:assert'
Behavior: Non-strict methods forward to strict implementations. Error diffs shown for object mismatches.
Disable colors: NO_COLOR or NODE_DISABLE_COLORS

2. Legacy assertion mode
Module import: import assert from 'node:assert'
Behavior: equal and deepEqual use == and recursion stops on circular refs. Prototypes ignored.

3. class AssertionError
Signature: new assert.AssertionError(options)
Options: actual:any, expected:any, operator:string, message?:string, stackStartFn?:Function
Properties: actual, expected, operator, generatedMessage:boolean, name='AssertionError', code='ERR_ASSERTION'
Throws: on failed assertions

4. class CallTracker
Signature: new assert.CallTracker()
Methods:
  calls(fn?:Function, exact?:number=1):Function wrapper that must be called exact times
  getCalls(wrapper):Array<{ thisArg:any, arguments:Array<any> }>
  report():Array<{ message:string, actual:number, expected:number, operator:string, stack:object }>
  reset(fn?:Function):void resets call count
  verify():void throws if wrappers not called as expected

5. Assertion functions
assert.ok(value, message?)
assert.equal(a, b, msg?) uses ==
assert.notEqual(a, b, msg?)
assert.deepEqual(a, b, msg?) legacy deep equality
assert.notDeepEqual(a, b, msg?)
assert.strictEqual(a, b, msg?) uses ===
assert.notStrictEqual(a, b, msg?)
assert.deepStrictEqual(a, b, msg?) strict deep equality (Object.is, prototype, symbol, Set/Map, RegExp lastIndex)
assert.notDeepStrictEqual(a, b, msg?)
assert.throws(fn, error?, msg?) expects thrown error matching pattern/class
assert.doesNotThrow(fn, error?, msg?)
assert.rejects(fn|Promise, error?, msg?):Promise<void>
assert.doesNotReject(fn|Promise, error?, msg?):Promise<void>
assert.match(str, regexp, msg?)
assert.doesNotMatch(str, regexp, msg?)
assert.ifError(value)
assert.fail([msg]|actual, expected?, operator?, stackStartFn?)
assert.partialDeepStrictEqual(a,b,msg?)

## Original Source
Node.js Core APIs
https://nodejs.org/api/

## Digest of NODE_ASSERT

# Node.js assert module

Retrieved: 2024-06-12
Data Size: 3324041 bytes
Links Found: 899
Error: None

# Strict assertion mode
Module path: node:assert/strict (introduced v13.9.0)
In strict assertion mode non-strict methods behave as their strict counterparts. Error diffs are displayed for object comparisons.
Disable colors: Set NO_COLOR or NODE_DISABLE_COLORS environment variable.

# Legacy assertion mode
Module path: node:assert (default pre-v9.9.0 behavior)
Uses `==` for deepEqual, equal; prototypes and non-enumerable properties ignored.

# Class: AssertionError
Extends Error; code=ERR_ASSERTION
Constructor: new AssertionError({ actual:any, expected:any, operator:string, message?:string, stackStartFn?:Function })
Properties: actual, expected, operator, generatedMessage:boolean, name='AssertionError', code='ERR_ASSERTION'

# Class: CallTracker (deprecated)
Constructor: new CallTracker()
tracker.calls(fn?:Function, exact?:number=1):Function wrapper; tracks calls
tracker.getCalls(wrapper:Function):Array<{thisArg:any, arguments:Array<any>}> 
tracker.report():Array<{message:string, actual:number, expected:number, operator:string, stack:object}>
tracker.reset(fn?:Function):void
tracker.verify():void throws if call counts mismatch

# Assertion functions
assert(value:any, message?:string|Error):void alias of assert.ok()
assert.ok(value:any, message?:string|Error):void throws AssertionError if !value

assert.equal(actual:any, expected:any, message?:string|Error):void legacy `==`
assert.notEqual(actual:any, expected:any, message?:string|Error):void legacy `!=`
assert.deepEqual(actual:any, expected:any, message?:string|Error):void legacy deep equality
assert.notDeepEqual(actual:any, expected:any, message?:string|Error):void legacy deep inequality
assert.strictEqual(actual:any, expected:any, message?:string|Error):void uses `===`
assert.notStrictEqual(actual:any, expected:any, message?:string|Error):void uses `!==`
assert.deepStrictEqual(actual:any, expected:any, message?:string|Error):void deep equality using Object.is, strict prototype and symbol comparison
assert.notDeepStrictEqual(actual:any, expected:any, message?:string|Error):void
assert.throws(fn:Function, error?:RegExp|Function|Object, message?:string|Error):void expects fn to throw
assert.doesNotThrow(fn:Function, error?:RegExp|Function|Object, message?:string|Error):void
assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function|Object, message?:string):Promise<void>
assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function|Object, message?:string):Promise<void>
assert.match(string:string, regexp:RegExp, message?:string|Error):void throws if !regexp.test(string)
assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error):void throws if regexp.test(string)
assert.ifError(value:any):void throws if value is truthy
assert.fail([message]|actual, expected?, operator?, stackStartFn?):void always throws
assert.partialDeepStrictEqual(actual:any, expected:any, message?:string|Error):void compares subset of properties


## Attribution
- Source: Node.js Core APIs
- URL: https://nodejs.org/api/
- License: License: CC-BY-4.0
- Crawl Date: 2025-05-10T06:58:26.312Z
- Data Size: 3324041 bytes
- Links Found: 899

## Retrieved
2025-05-10
library/VITEST_SETUP.md
# library/VITEST_SETUP.md
# VITEST_SETUP

## Crawl Summary
Installation commands: npm/yarn/pnpm/bun add -D vitest; requires Vite>=5.0.0, Node>=18.0.0. Default test file globs: **/*.test.* and **/*.spec.*. package.json scripts: "test": "vitest", "coverage": "vitest run --coverage". Config priority: vitest.config.ts over vite.config.ts; CLI --config; use defineConfig({ test:{...} }); support .js/.mjs/.cjs/.ts/.cts/.mts; no .json. Workspaces array with string globs or per-workspace objects with name, root, environment, setupFiles. CLI flags: run/watch, run with --coverage, --port, --https, --config, help. Env var VITEST_SKIP_INSTALL_CHECKS=1. VSCode extension.

## Normalised Extract
Table of Contents
1 Installation
2 Test File Naming
3 Package Scripts
4 Configuration Files
5 Workspaces Support
6 CLI Options
7 Environment Variables
8 IDE Integration

1 Installation
npm add -D vitest
yarn add -D vitest
pnpm add -D vitest
bun add -D vitest
Requirements: Vite>=5.0.0, Node>=18.0.0

2 Test File Naming
Glob patterns matched by default:
**/*.test.[jt]s(x)
**/*.spec.[jt]s(x)

3 Package Scripts
Add to package.json:
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

4 Configuration Files
- vite.config.ts: 
  - import defineConfig from 'vite'
  - add triple-slash directive: /// <reference types="vitest/config" />
  - defineConfig({ test:{ /* options */ } })
- vitest.config.ts (priority):
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test:{ /* options */ } })
- CLI override: vitest --config <path>
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
Unsupported: .json

5 Workspaces Support
In vitest.config.ts:
workspace: Array<string | { name:string; root:string; environment:string; setupFiles:string[] }>
Example:
['packages/*','tests/*/vitest.config.{unit,e2e}.ts', { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] }, ...]

6 CLI Options
vitest              watch mode
vitest run          single run
--coverage          enable coverage
--config <path>     config file override
--port <number>     custom port
--https             enable HTTPS
--help              print options

7 Environment Variables
VITEST_SKIP_INSTALL_CHECKS=1  disable dependency prompts

8 IDE Integration
VS Code extension: "Vitest" on Marketplace

## Supplementary Details
- mergeConfig example:
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'
  export default mergeConfig(viteConfig, defineConfig({ test:{ /* options */ } }))
- Conditional in vite.config.ts:
  if (process.env.VITEST === 'true') { /* test-only plugins */ }
- Vite plugin reuse:
  any Vite option under defineConfig({ test:{ ... } }) is applied by Vitest's transformer.
- Setup Files:
  test.setupFiles: string[]   files to run before tests
- Test environment default: 'node'; options: 'node', 'jsdom', 'happy-dom'
- Coverage options:
  coverage: boolean | { provider:string; reporter: string[]; include: string[]; exclude: string[] }
- Global Setup/Teardown:
  globalSetup: string; globalTeardown: string
- Threads:
  threads: boolean; maxThreads: number; minThreads: number


## Reference Details
API: defineConfig(options: TestConfig): VitestUserConfig
interface TestConfig {
  include?: string[]
  exclude?: string[]
  dir?: string
  testTimeout?: number
  hookTimeout?: number
  threads?: boolean
  maxThreads?: number
  minThreads?: number
  environment?: 'node' | 'jsdom' | 'happy-dom'
  root?: string
  name?: string
  setupFiles?: string[]
  globalSetup?: string
  globalTeardown?: string
  coverage?: boolean | {
    provider?: 'c8' | 'istanbul'
    reporter?: string[]
    include?: string[]
    exclude?: string[]
    all?: boolean
  }
  reporters?: ('default' | 'verbose' | string)[]
}

CLI: vitest [run] [--watch] [--coverage] [--config <path>] [--port <number>] [--https] [--reporter <name>]

Example Code:
// vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    threads: false,
    setupFiles: ['test/setup.ts'],
    coverage: { provider: 'c8', reporter: ['text', 'html'], include: ['src/**'], exclude: ['src/**.d.ts'] }
  }
})

Best Practices:
- Use one config file for Vite and Vitest
- Name test files with .test or .spec suffix
- Disable threads when debugging

Troubleshooting:
- Bun default runner conflict: use bun run test
- Config not applied: verify extension, priority of vitest.config.ts
- Dependency prompt: set VITEST_SKIP_INSTALL_CHECKS=1

Expected Output Example:
$ npm run test
> vitest
 PASS  sum.test.js
  ✓ adds 1 + 2 to equal 3 (5ms)

Test Files 1 passed (1)
Tests 1 passed (1)
Duration 200ms


## Information Dense Extract
install: npm|yarn|pnpm|bun add -D vitest; require: Vite>=5.0.0, Node>=18.0.0; file patterns: **/*.test.*|**/*.spec.*; scripts: test=vitest, coverage=vitest run --coverage; config: vite.config.ts defineConfig({test:{}}) with ///<reference types="vitest/config"/>, vitest.config.ts override, CLI --config; config ext: .js,.mjs,.cjs,.ts,.cts,.mts; workspaces: test.workspace:string|object[]{name,root,environment,setupFiles}; CLI opts: run, --coverage, --config, --port, --https, --reporter; env: VITEST_SKIP_INSTALL_CHECKS=1; defineConfig(TestConfig) interface; coverage config; threads; globalSetup/Teardown; VSCode extension; bun run test; mergeConfig usage; expected output format.

## Sanitised Extract
Table of Contents
1 Installation
2 Test File Naming
3 Package Scripts
4 Configuration Files
5 Workspaces Support
6 CLI Options
7 Environment Variables
8 IDE Integration

1 Installation
npm add -D vitest
yarn add -D vitest
pnpm add -D vitest
bun add -D vitest
Requirements: Vite>=5.0.0, Node>=18.0.0

2 Test File Naming
Glob patterns matched by default:
**/*.test.[jt]s(x)
**/*.spec.[jt]s(x)

3 Package Scripts
Add to package.json:
{
  'scripts': {
    'test': 'vitest',
    'coverage': 'vitest run --coverage'
  }
}

4 Configuration Files
- vite.config.ts: 
  - import defineConfig from 'vite'
  - add triple-slash directive: /// <reference types='vitest/config' />
  - defineConfig({ test:{ /* options */ } })
- vitest.config.ts (priority):
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test:{ /* options */ } })
- CLI override: vitest --config <path>
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
Unsupported: .json

5 Workspaces Support
In vitest.config.ts:
workspace: Array<string | { name:string; root:string; environment:string; setupFiles:string[] }>
Example:
['packages/*','tests/*/vitest.config.{unit,e2e}.ts', { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] }, ...]

6 CLI Options
vitest              watch mode
vitest run          single run
--coverage          enable coverage
--config <path>     config file override
--port <number>     custom port
--https             enable HTTPS
--help              print options

7 Environment Variables
VITEST_SKIP_INSTALL_CHECKS=1  disable dependency prompts

8 IDE Integration
VS Code extension: 'Vitest' on Marketplace

## Original Source
Vitest Testing Framework
https://vitest.dev/guide/

## Digest of VITEST_SETUP

# Vitest Setup and Configuration

## Installation

-  npm add -D vitest  
-  yarn add -D vitest  
-  pnpm add -D vitest  
-  bun add -D vitest  

Requirements:
-  Vite >= 5.0.0
-  Node.js >= 18.0.0

## Test File Naming

Default file name patterns:
-  **/*.test.[jt]s(x)
-  **/*.spec.[jt]s(x)

## package.json Scripts

{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

## Configuration Files

1.  vite.config.ts
    - add `test` property under `defineConfig`
    - triple-slash directive at top: `/// <reference types="vitest/config" />`
2.  vitest.config.ts (higher priority)
3.  CLI override: `vitest --config ./path/to/vitest.config.ts`
4.  Conditional mode: `process.env.VITEST === 'true'` or defineConfig({ mode: 'test' })

Supported extensions for config: .js, .mjs, .cjs, .ts, .cts, .mts
Unsupported: .json

## Workspaces Support

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{unit,e2e}.ts',
      {
        name: 'happy-dom',
        root: './shared_tests',
        environment: 'happy-dom',
        setupFiles: ['./setup.happy-dom.ts']
      },
      {
        name: 'node',
        root: './shared_tests',
        environment: 'node',
        setupFiles: ['./setup.node.ts']
      }
    ]
  }
})
```

## Command Line Interface

-  Run in watch mode: `vitest`
-  Run once: `vitest run`
-  Coverage report: `vitest run --coverage`
-  Override config: `--config <path>`
-  Ports: `--port <number>`
-  HTTPS: `--https`
-  Help: `npx vitest --help`

## Environment Variables

-  VITEST_SKIP_INSTALL_CHECKS=1  Disable automatic dependency prompts

## IDE Integration

-  Official VS Code extension: install from Marketplace “Vitest”

---

*Data Size: 28561615 bytes*  
*Retrieved: 2024-06-20*

## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/guide/
- License: License: MIT
- Crawl Date: 2025-05-10T04:58:33.433Z
- Data Size: 28561615 bytes
- Links Found: 23130

## Retrieved
2025-05-10
library/PI_COMPUTATION.md
# library/PI_COMPUTATION.md
# PI_COMPUTATION

## Crawl Summary
Chudnovsky (Level 1): s1A(k)=binomial(2k,k)·binomial(3k,k)·binomial(6k,3k); 1/pi=12i Σ s1A(k)(163·3344418k+13591409)/(-640320^3)^{k+1/2}. Level 2: s2A(k)=binomial(2k,k)^2·binomial(4k,2k); 1/pi=32√2 Σ s2A(k)(58·455k+1103)/(396^4)^{k+1/2}. Level 3: s3A(k)=binomial(2k,k)^2·binomial(3k,k); 1/pi=2i Σ s3A(k)(267·53k+827)/(-300^3)^{k+1/2}.

## Normalised Extract
Table of Contents:
1. Chudnovsky Series (Level 1)
2. Level 2 Series
3. Level 3 Series
4. Implementation Notes

1. Chudnovsky Series (Level 1)
Definition: s1A(k)=C(2k,k)*C(3k,k)*C(6k,3k)
Constant: C = -640320^3 = -262537412640768000
Numerator term: A*k + B with A=163*3344418=546640, B=13591409
Series: 1/pi=12*i*Σ_{k=0..∞} s1A(k)*(A*k+B)/C^{k+1/2}

2. Level 2 Series
Definition: s2A(k)=C(2k,k)^2*C(4k,2k)
Constant: C=396^4=24591257856
Numerator term: A*k+B with A=58*455=26390, B=1103
Series: 1/pi=32*√2*Σ s2A(k)*(A*k+B)/C^{k+1/2}

3. Level 3 Series
Definition: s3A(k)=C(2k,k)^2*C(3k,k)
Constant: C=-300^3=-27000000
Numerator term: A*k+B with A=267*53=14151, B=827
Series: 1/pi=2*i*Σ s3A(k)*(A*k+B)/C^{k+1/2}

4. Implementation Notes
Use factorial recurrence: fact(0)=1, fact(n)=n*fact(n-1)
Compute binomials via BigInt: C(n,k)=fact(n)/(fact(k)*fact(n-k))
Set arbitrary-precision library.precision >= desired digits+10
Compute sqrt(C) via library.sqrt
Sum real and imaginary parts separately; eliminate i by using absolute values
Stop when incremental term < 10^{-precision}  

## Supplementary Details
Precision and Terms:
- To compute D digits, set precision = D+20
- Required terms N ~ D/14 for Chudnovsky

Arbitrary-Precision Setup:
- Use decimal.js: Decimal.precision = P
- Import: import Decimal from 'decimal.js'

Factorial Implementation:
function factorial(n: number): BigInt {
  let r = 1n;
  for(let i=2n; i<=BigInt(n); i++) r *= i;
  return r;
}

Binomial(n,k):
function binomial(n:number,k:number): BigInt {
  return factorial(n) / (factorial(k) * factorial(n-k));
}

Computing Term:
function chudnovskyTerm(k:number): Decimal {
  const kBig=BigInt(k);
  const s1 = Decimal(factorial(2*k) ).dividedBy(Decimal(factorial(k))**2)
      .times( Decimal(factorial(3*k)).dividedBy(Decimal(factorial(k))*Decimal(factorial(2*k))))
      .times( Decimal(factorial(6*k)).dividedBy(Decimal(factorial(3*k))*Decimal(factorial(3*k))));
  const numerator = Decimal(546640).times(k).plus(13591409);
  const denominator = Decimal(-262537412640768000).pow(k+0.5);
  return s1.times(numerator).dividedBy(denominator);
}

Implementation Steps:
1. Set Decimal.precision
2. Compute sum = Σ_{k=0..N-1} chudnovskyTerm(k)
3. Compute pi = Decimal(1).dividedBy(sum)


## Reference Details
API:
computePiChudnovsky(terms: number, precision: number): Decimal
- terms: integer >0, number of series terms
- precision: integer >= desired digits+10
- returns: Decimal approximation of pi with 'precision' digits
- throws: RangeError if terms<1 or precision<1
Signature:
import { Decimal } from 'decimal.js';
export function computePiChudnovsky(terms: number, precision: number): Decimal;

Examples:
import {computePiChudnovsky} from './pi';
const pi50 = computePiChudnovsky(4, 60);
console.log(pi50.toString());
// Expected: 3.1415926535... up to 50 digits

Implementation Pattern:
1. Set Decimal.precision = precision
2. Precompute factorials in BigInt array of length 6*terms
3. Loop k=0..terms-1:
   a. Compute s1A(k) via binomial coefficients
   b. Compute term = s1A(k)*(A*k+B)/C^{k+1/2}
   c. Accumulate sum
4. Return Decimal(1).dividedBy(sum)

Configuration Options:
{ precision: number, terms: number }
- precision default: 200
- terms default: Math.ceil(precision/14)

Best Practices:
- Use BigInt for factorials to avoid overflow
- Precompute factorials once
- Use library.sqrt for half-integer powers
- Increase precision before computing power or division

Troubleshooting:
Issue: incorrect last digits
Command: console.log(term.toString())
Expected: decreasing magnitude <10^{-(precision)}
Fix: increase Decimal.precision or terms

Issue: factorial overflow
Symptom: RangeError or Infinity
Fix: use BigInt factorial implementation

Issue: slow performance
Advice: memoize factorials, use iterative loops, avoid recomputing powers


## Information Dense Extract
Chudnovsky: 1/pi=12iΣ_{k=0..N-1}C(2k,k)C(3k,k)C(6k,3k)(546640k+13591409)/(-640320^3)^{k+1/2}. N≈digits/14. decimal.js: set precision, use BigInt factorial, binomial. compute sum, pi=1/sum. API: computePiChudnovsky(terms,precision):Decimal. Default terms=ceil(precision/14), precision=digits+10. factorial: iterative BigInt. binomial=fact(n)/(fact(k)fact(n-k)). Best practices: precompute factorials, memoize, set precision high, check term magnitude <10^{-precision}. Troubleshooting: increase terms or precision if error exceeds threshold.

## Sanitised Extract
Table of Contents:
1. Chudnovsky Series (Level 1)
2. Level 2 Series
3. Level 3 Series
4. Implementation Notes

1. Chudnovsky Series (Level 1)
Definition: s1A(k)=C(2k,k)*C(3k,k)*C(6k,3k)
Constant: C = -640320^3 = -262537412640768000
Numerator term: A*k + B with A=163*3344418=546640, B=13591409
Series: 1/pi=12*i*_{k=0..} s1A(k)*(A*k+B)/C^{k+1/2}

2. Level 2 Series
Definition: s2A(k)=C(2k,k)^2*C(4k,2k)
Constant: C=396^4=24591257856
Numerator term: A*k+B with A=58*455=26390, B=1103
Series: 1/pi=32*2* s2A(k)*(A*k+B)/C^{k+1/2}

3. Level 3 Series
Definition: s3A(k)=C(2k,k)^2*C(3k,k)
Constant: C=-300^3=-27000000
Numerator term: A*k+B with A=267*53=14151, B=827
Series: 1/pi=2*i* s3A(k)*(A*k+B)/C^{k+1/2}

4. Implementation Notes
Use factorial recurrence: fact(0)=1, fact(n)=n*fact(n-1)
Compute binomials via BigInt: C(n,k)=fact(n)/(fact(k)*fact(n-k))
Set arbitrary-precision library.precision >= desired digits+10
Compute sqrt(C) via library.sqrt
Sum real and imaginary parts separately; eliminate i by using absolute values
Stop when incremental term < 10^{-precision}

## Original Source
π Computation Algorithms
https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series

## Digest of PI_COMPUTATION

# Chudnovsky Series (Level 1)

1/pi = 12i ∑_{k=0..∞} s1A(k)·(163·3344418k+13591409)/(-640320^3)^{k+1/2}

where

s1A(k) = C(2k,k)·C(3k,k)·C(6k,3k)

# Level 2 Series

1/pi = 32√2 ∑_{k=0..∞} s2A(k)·(58·455k+1103)/(396^4)^{k+1/2}

where

s2A(k) = C(2k,k)^2·C(4k,2k)

# Level 3 Series

1/pi = 2i ∑_{k=0..∞} s3A(k)·(267·53k+827)/(-300^3)^{k+1/2}

where

s3A(k) = C(2k,k)^2·C(3k,k)

# Arbitrary-Precision Implementation (decimal.js)

Method computePiChudnovsky(terms:number, precision:number): Decimal
– sets Decimal.precision = precision
– uses BigInt for factorials
– sums N terms of the series
– returns 1/sum


## Attribution
- Source: π Computation Algorithms
- URL: https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-05-10T09:26:31.462Z
- Data Size: 21084192 bytes
- Links Found: 21511

## Retrieved
2025-05-10
library/MARKDOWN_IT.md
# library/MARKDOWN_IT.md
# MARKDOWN_IT

## Crawl Summary
markdown-it v12.3.2 fully implements CommonMark + extensions.  Constructor: markdownit(preset?: 'commonmark'|'zero'|Options, options?: Options).  Default Options: html:false, xhtmlOut:false, breaks:false, langPrefix:'language-', linkify:false, typographer:false, quotes:'“”‘’', highlight:function(str,lang)->string returns ''.  Core Methods: render(src:string,env?:object)->string; renderInline(src:string,env?:object)->string; use(plugin:Function,...opts)->MarkdownIt; enable/disable(ruleName:string|string[])->MarkdownIt.  Plugin loading: md.use(plugin1,opts,...).  Syntax highlighting: override highlight option with callback to hljs.  Linkify: enable via linkify:true, configure via md.linkify.set({fuzzyEmail:false}).  Rule management: md.enable/disable.  Default rules in lib/rules_core, rules_block, rules_inline.  Benchmark: ~1500 ops/sec.  Enterprise via Tidelift.  Authors: Kocharin, Puzrin.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Initialization & Options
 3 Rendering API
 4 Plugin Integration
 5 Syntax Highlighting Setup
 6 Linkify Configuration
 7 Rule Management

1 Installation
 • Node.js: npm install markdown-it
 • Browser: include UMD bundle from jsDelivr or cdnjs

2 Initialization & Options
 • Signature: markdownit(presetOrOptions?, options?) returns MarkdownIt instance
 • Presets: 'commonmark', 'zero', 'default'
 • Options object fields and defaults:
    html: false
    xhtmlOut: false
    breaks: false
    langPrefix: 'language-'
    linkify: false
    typographer: false
    quotes: '“”‘’'
    highlight: function(str,lang) { return ''; }

3 Rendering API
 • render(src: string, env?: object) => string (full block rendering)
 • renderInline(src: string, env?: object) => string (inline rendering without paragraph tags)

4 Plugin Integration
 • Load plugin: md.use(pluginFunction, pluginOptions...)
 • Plugins receive markdown-it instance and options

5 Syntax Highlighting Setup
 • Provide highlight callback in options
 • Default wrapper omitted if return starts with '<pre'
 • Example using highlight.js: check language, apply hljs.highlight, return highlighted HTML or ''

6 Linkify Configuration
 • Enable with linkify: true
 • Access linkify-it instance via md.linkify
 • Configure with md.linkify.set({ fuzzyEmail: false })

7 Rule Management
 • Disable rules: md.disable(ruleNames)
 • Enable rules: md.enable(ruleNames)
 • Use array or single rule name



## Supplementary Details
Exact parameter values and steps:
 1. npm install markdown-it@12.3.2
 2. import or require:
    ES Module: import markdownit from 'markdown-it'
    CommonJS: const markdownit = require('markdown-it')
 3. Instantiate:
    const md = markdownit('commonmark')  // CommonMark strict
    const md = markdownit('zero')        // minimal feature set
    const md = markdownit({html:true,linkify:true,typographer:true})  // full features
 4. Render:
    md.render('# Title')               // returns '<h1>Title</h1>\n'
    md.renderInline('**bold**')       // returns '<strong>bold</strong>'
 5. Plugin load:
    md.use(require('markdown-it-footnote'))
    md.use(require('markdown-it-abbr'))
 6. Syntax highlighting:
    const md = markdownit({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return '<pre><code class="hljs">' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>'
        }
        return '<pre><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      }
    })
 7. Linkify:
    const md = markdownit({ linkify: true })
    md.linkify.set({ fuzzyLink: false, fuzzyEmail: false })
 8. Manage rules:
    md.disable(['image', 'html_block'])
    md.enable('html_block')
 9. Troubleshoot common issues:
    - No output: verify input string not empty and instance created
    - Plugins not applied: ensure md.use called before render
    - Highlighting errors: validate lang with hljs.getLanguage
    - Linkify not converting: enable linkify: true and call md.linkify.set
    - Rule config ignored: use correct rule names from parser_block and parser_inline


## Reference Details
Constructor:
  markdownit(presetOrOptions?: 'commonmark' | 'zero' | Options, options?: Options) => MarkdownIt

Options interface:
  interface Options {
    html?: boolean            // default false
    xhtmlOut?: boolean        // default false
    breaks?: boolean          // default false
    langPrefix?: string       // default 'language-'
    linkify?: boolean         // default false
    typographer?: boolean     // default false
    quotes?: string | [string, string, string, string]  // default '“”‘’'
    highlight?: (str: string, lang: string) => string   // returns escaped HTML or ''
  }

MarkdownIt methods:
  render(src: string, env?: object): string
    - Converts full markdown to HTML string with block wrappers

  renderInline(src: string, env?: object): string
    - Converts inline markdown without wrapping paragraphs

  use(plugin: (md: MarkdownIt, ...opts: any[]) => void, ...opts: any[]): this
    - Registers plugin; order matters

  enable(ruleNames: string | string[]): this
    - Activates one or multiple parsing rules

  disable(ruleNames: string | string[]): this
    - Deactivates one or multiple parsing rules

  set(options: Options): this
    - Updates instance options after creation

  linkify: LinkifyIt instance
    - Configure with linkify.set(opts: { fuzzyLink?: boolean; fuzzyEmail?: boolean })

Utility:
  md.utils.escapeHtml(str: string): string  // escapes HTML entities

Code Examples:
  // Full features
  import markdownit from 'markdown-it'
  import hljs from 'highlight.js'

  const md = markdownit({ html: true, linkify: true, typographer: true, highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code class="hljs">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
    }
    return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`
  }})

  md.use(require('markdown-it-footnote'))
  md.use(require('markdown-it-abbr'))

  const html = md.render(`# Example`)

Best Practices:
  - Instantiate once and reuse for multiple renders
  - Preload and configure all plugins before first render
  - Provide highlighter that wraps output in <pre><code> to avoid external escaping
  - Disable unused rules to improve performance (e.g., md.disable(['footnote']))

Troubleshooting:
  1. Plugin not applied:
     Command: console.log(md.core.ruler.getRules('block'))
     Expected: array containing plugin rule name
  2. Highlight returning raw text:
     Ensure hljs.getLanguage(lang) returns true for given lang identifier
  3. Linkify not converting:
     Verify linkify:true in options and call md.linkify.set({ fuzzyEmail: false }) before render
  4. Incorrect HTML output:
     Run md.utils.escapeHtml on input to inspect unescaped characters


## Information Dense Extract
markdown-it@12.3.2: CommonMark+ extensions. Constructor markdownit(preset?: 'commonmark'|'zero'|Options, opts?: Options) => MarkdownIt. Default Options: html:false; xhtmlOut:false; breaks:false; langPrefix:'language-'; linkify:false; typographer:false; quotes:'“”‘’'; highlight:(str,lang)->string returns ''. Methods: render(src:string,env?:object)->string; renderInline(src:string,env?:object)->string; use(plugin,opts...)->this; enable(ruleNames)->this; disable(ruleNames)->this; set(opts)->this; utils.escapeHtml(str)->string; linkify.set({fuzzyLink?:boolean,fuzzyEmail?:boolean}). Plugin pattern: md.use(pluginFn,opts); Syntax Highlight: define highlight callback with hljs.highlight(str,{language,ignoreIllegals}); wrap returned HTML in <pre><code>. Linkify: require linkify:true in options; configure via md.linkify.set. Rule management: md.enable/md.disable with rule names array or string. Best practices: reuse instance, disable unused rules, preload plugins, wrap highlight output, escape raw HTML. Troubleshoot: inspect md.core.ruler.getRules('block'), validate hljs.getLanguage, confirm linkify options, use md.utils.escapeHtml for debugging.

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Initialization & Options
 3 Rendering API
 4 Plugin Integration
 5 Syntax Highlighting Setup
 6 Linkify Configuration
 7 Rule Management

1 Installation
  Node.js: npm install markdown-it
  Browser: include UMD bundle from jsDelivr or cdnjs

2 Initialization & Options
  Signature: markdownit(presetOrOptions?, options?) returns MarkdownIt instance
  Presets: 'commonmark', 'zero', 'default'
  Options object fields and defaults:
    html: false
    xhtmlOut: false
    breaks: false
    langPrefix: 'language-'
    linkify: false
    typographer: false
    quotes: ''
    highlight: function(str,lang) { return ''; }

3 Rendering API
  render(src: string, env?: object) => string (full block rendering)
  renderInline(src: string, env?: object) => string (inline rendering without paragraph tags)

4 Plugin Integration
  Load plugin: md.use(pluginFunction, pluginOptions...)
  Plugins receive markdown-it instance and options

5 Syntax Highlighting Setup
  Provide highlight callback in options
  Default wrapper omitted if return starts with '<pre'
  Example using highlight.js: check language, apply hljs.highlight, return highlighted HTML or ''

6 Linkify Configuration
  Enable with linkify: true
  Access linkify-it instance via md.linkify
  Configure with md.linkify.set({ fuzzyEmail: false })

7 Rule Management
  Disable rules: md.disable(ruleNames)
  Enable rules: md.enable(ruleNames)
  Use array or single rule name

## Original Source
markdown-it Parser
https://github.com/markdown-it/markdown-it#readme

## Digest of MARKDOWN_IT

# Retrieved on 2024-06-26

# Install

## Node.js
npm install markdown-it

## Browser (CDN)
Include UMD bundle from CDN:
<script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js"></script>

# Usage Examples

## Simple Rendering (Node.js ES Module)
import markdownit from 'markdown-it'
const md = markdownit()
const result = md.render('# markdown-it rulezz!')  # returns '<h1>markdown-it rulezz!</h1>\n'

## Inline Rendering
import markdownit from 'markdown-it'
const md = markdownit()
const resultInline = md.renderInline('__markdown-it__ rulezz!')  # returns '<strong>markdown-it</strong> rulezz!'

# Constructor & Options
**Signature:** markdownit(presetOrOptions?: 'commonmark' | 'zero' | Options, options?: Options) => MarkdownIt

**Options (defaults):**
  html:         false        # Enable HTML tags in source
  xhtmlOut:     false        # Close single tags with '/>' for CommonMark
  breaks:       false        # Convert '\n' in paragraphs into <br>
  langPrefix:   'language-'  # CSS class prefix for fenced code blocks
  linkify:      false        # Autoconvert URL-like text to links
  typographer:  false        # Enable replacements and smartquotes
  quotes:       '“”‘’'       # Quote pairs for typographer
  highlight:    function(str, lang) { return ''; }  # Highlight callback

# Plugins
Use any plugin that follows plugin(md: MarkdownIt, ...opts)

Example:
import markdownit from 'markdown-it'
import pluginContainer from 'markdown-it-container'
const md = markdownit().use(pluginContainer, 'warning')

# Syntax Highlighting
Set `highlight` option to override fenced code rendering:

import hljs from 'highlight.js'
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try { return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value } catch {} }
    return ''  # fall back to external escaping
  }
})

# Linkify Configuration
Enable URL autolinking via `linkify: true` then configure via md.linkify:

const md = markdownit({ linkify: true })
md.linkify.set({ fuzzyEmail: false })  # disable email linking

# Manage Rules
Enable or disable core parsing rules:

const md = markdownit()
md.disable(['link', 'image'])
md.enable('link')

# Core Rule Source Files
  lib/rules_core/replacements.mjs
  lib/rules_block/*.mjs
  lib/rules_inline/*.mjs

# API Methods
  render(src: string, env?: object) => string
  renderInline(src: string, env?: object) => string
  use(plugin: Function, ...opts: any[]) => MarkdownIt
  enable(ruleName: string | string[]) => MarkdownIt
  disable(ruleName: string | string[]) => MarkdownIt

# Benchmark Commands
npm run benchmark-deps
benchmark/benchmark.mjs readme

# Enterprise Support
Available via Tidelift Subscription for commercial maintenance

# Authors & References
Alex Kocharin (github/rlidwka)
Vitaly Puzrin (github/puzrin)
Big thanks to John MacFarlane and CommonMark project


## Attribution
- Source: markdown-it Parser
- URL: https://github.com/markdown-it/markdown-it#readme
- License: License: MIT
- Crawl Date: 2025-05-10T00:48:30.032Z
- Data Size: 618776 bytes
- Links Found: 5169

## Retrieved
2025-05-10
library/MPFR_MANUAL.md
# library/MPFR_MANUAL.md
# MPFR_MANUAL

## Crawl Summary
Initialization: mpfr_init2(x,prec bits) allocates and sets precision. mpfr_clear(x) frees memory. Precision is mpfr_prec_t (unsigned long), default 53 bits. Rounding modes: MPFR_RNDN, RNDZ, RNDU, RNDD, RNDA. Arithmetic: mpfr_add, sub, mul, div take (rop, op1, op2, rnd) return flags. Comparison: mpfr_cmp, mpfr_equal_p, mpfr_nan_p. Conversion: mpfr_set_d, mpfr_get_d. I/O: mpfr_printf, mpfr_fprintf, mpfr_scanf. Error flags: mpfr_get_flags, mpfr_clear_flags. Build: configure with --with-gmp, enable thread-safe. Link flags: -lmpfr -lgmp.

## Normalised Extract
Table of Contents
 1 Initialization and Memory Management
 2 Precision and Rounding Modes
 3 Basic Arithmetic Functions
 4 Comparison and Special Functions
 5 I/O and Conversion
 6 Error Handling and Flags
 7 Thread Safety and Build Configuration

1 Initialization and Memory Management
 mpfr_init(mpfr_t x): allocate x with default precision
 mpfr_init2(mpfr_t x, mpfr_prec_t prec): allocate x with prec bits precision
 mpfr_init_set_str(mpfr_t x, const char *str, int base, mpfr_rnd_t rnd): parse str in base, set x
 mpfr_clear(mpfr_t x): free memory used by x

2 Precision and Rounding Modes
 mpfr_prec_t = unsigned long
 Default precision = 53 bits
 mpfr_rnd_t constants:
   MPFR_RNDN = 0
   MPFR_RNDZ = 1
   MPFR_RNDU = 2
   MPFR_RNDD = 3
   MPFR_RNDA = 4

3 Basic Arithmetic Functions
 int mpfr_add(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_sub(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_mul(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_div(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 Returns bitmask of flags: INEXACT=1, UNDERFLOW=2, OVERFLOW=4, NAN=8

4 Comparison and Special Functions
 int mpfr_cmp(const mpfr_t op1,const mpfr_t op2)
 int mpfr_equal_p(const mpfr_t op1,const mpfr_t op2)
 int mpfr_nan_p(const mpfr_t x)

5 I/O and Conversion
 int mpfr_set_d(mpfr_t rop,double d,mpfr_rnd_t rnd)
 double mpfr_get_d(const mpfr_t op,mpfr_rnd_t rnd)
 int mpfr_printf(const char *format,...)
 int mpfr_fprintf(FILE *stream,const char *format,...)
 int mpfr_scanf(const char *format,...)

6 Error Handling and Flags
 unsigned long mpfr_get_flags(void)
 void mpfr_clear_flags(void)

7 Thread Safety and Build Configuration
 Configure:
   --with-gmp=/path --enable-thread-safe --disable-static
 Compiler:
   -I/path/mpfr/include -L/path/mpfr/lib -lmpfr -lgmp

## Supplementary Details
Linker flags: -L/usr/local/lib -lmpfr -lgmp
Compile flags: -I/usr/local/include/mpfr -O2 -fPIC
CMake example:
 add_library(mpfr STATIC IMPORTED)
 set_target_properties(mpfr PROPERTIES
   IMPORTED_LOCATION /usr/local/lib/libmpfr.a
   INTERFACE_INCLUDE_DIRECTORIES /usr/local/include/mpfr)
 target_link_libraries(your_target PRIVATE mpfr gmp)

Configuration options with defaults:
 --with-gmp=/usr/local --enable-thread-safe (default off) --disable-static (default off)

Precision defaults:
 MPFR_PREC_MIN = 2 bits
 MPFR_PREC_MAX = ULONG_MAX bits

Threading:
 MPFR_LOCK macro enabled when --enable-thread-safe



## Reference Details
Prototypes:
 void mpfr_init(mpfr_t x)
 void mpfr_init2(mpfr_t x, mpfr_prec_t prec)
 void mpfr_clear(mpfr_t x)
 int mpfr_set_d(mpfr_t rop, double d, mpfr_rnd_t rnd)
 double mpfr_get_d(const mpfr_t op, mpfr_rnd_t rnd)
 int mpfr_add(mpfr_t rop,const mpfr_t op1,const mpfr_t op2, mpfr_rnd_t rnd)
 int mpfr_sub(mpfr_t rop,const mpfr_t op1,const mpfr_t op2, mpfr_rnd_t rnd)
 int mpfr_mul(mpfr_t rop,const mpfr_t op1,const mpfr_t op2, mpfr_rnd_t rnd)
 int mpfr_div(mpfr_t rop,const mpfr_t op1,const mpfr_t op2, mpfr_rnd_t rnd)
 int mpfr_cmp(const mpfr_t op1,const mpfr_t op2)
 int mpfr_equal_p(const mpfr_t op1,const mpfr_t op2)
 int mpfr_nan_p(const mpfr_t x)
 unsigned long mpfr_get_flags(void)
 void mpfr_clear_flags(void)

Constants:
 #define MPFR_RNDN  0
 #define MPFR_RNDZ  1
 #define MPFR_RNDU  2
 #define MPFR_RNDD  3
 #define MPFR_RNDA  4
 #define MPFR_FLAG_INEXACT 1
 #define MPFR_FLAG_UNDERFLOW 2
 #define MPFR_FLAG_OVERFLOW 4
 #define MPFR_FLAG_NAN 8

Example:
 #include <mpfr.h>
 int main(){
   mpfr_t a,b,c;
   mpfr_init2(a,256);
   mpfr_init2(b,256);
   mpfr_init2(c,256);
   mpfr_set_d(a,1.2345,MPFR_RNDN);
   mpfr_set_d(b,6.789,MPFR_RNDN);
   int flags = mpfr_add(c,a,b,MPFR_RNDN);
   if(flags & MPFR_FLAG_INEXACT) puts("Inexact result");
   mpfr_printf("c = %.10Rf\n",c);
   mpfr_clear(a); mpfr_clear(b); mpfr_clear(c);
   return 0;
 }

Troubleshooting:
 Command: gcc -I/usr/local/include -L/usr/local/lib test.c -lmpfr -lgmp -o test
 Expected: Link success; if undefined reference to mpfr_init, verify -lmpfr placed after source files
 Check version: mpfr_version_str() returns "4.x.x"

Best Practices:
 Always clear mpfr variables
 Check return flags on arithmetic for inexact/overflow
 Use consistent rounding mode across all operations
 Preallocate precision with mpfr_init2 to avoid reallocations

## Information Dense Extract
mpfr_init2(x,prec) allocates x with prec bits. mpfr_clear(x) frees. mpfr_prec_t=ulong; default prec=53. Rounding: MPFR_RNDN=0, RNDZ=1, RNDU=2, RNDD=3, RNDA=4. Basic ops prototypes: int mpfr_add(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd) returns flags bitmask INEXACT=1,UNDERFLOW=2,OVERFLOW=4,NAN=8. Comparisons: mpfr_cmp,equal_p,nan_p. Conversion: mpfr_set_d(mpfr_t,double,rnd), mpfr_get_d(const mpfr_t,rnd). I/O: mpfr_printf,mpfr_fprintf,mpfr_scanf. Flags: mpfr_get_flags(),mpfr_clear_flags(). Link: -lmpfr -lgmp. Configure: --with-gmp=PATH --enable-thread-safe --disable-static. Example code and troubleshooting steps included.

## Sanitised Extract
Table of Contents
 1 Initialization and Memory Management
 2 Precision and Rounding Modes
 3 Basic Arithmetic Functions
 4 Comparison and Special Functions
 5 I/O and Conversion
 6 Error Handling and Flags
 7 Thread Safety and Build Configuration

1 Initialization and Memory Management
 mpfr_init(mpfr_t x): allocate x with default precision
 mpfr_init2(mpfr_t x, mpfr_prec_t prec): allocate x with prec bits precision
 mpfr_init_set_str(mpfr_t x, const char *str, int base, mpfr_rnd_t rnd): parse str in base, set x
 mpfr_clear(mpfr_t x): free memory used by x

2 Precision and Rounding Modes
 mpfr_prec_t = unsigned long
 Default precision = 53 bits
 mpfr_rnd_t constants:
   MPFR_RNDN = 0
   MPFR_RNDZ = 1
   MPFR_RNDU = 2
   MPFR_RNDD = 3
   MPFR_RNDA = 4

3 Basic Arithmetic Functions
 int mpfr_add(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_sub(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_mul(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_div(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 Returns bitmask of flags: INEXACT=1, UNDERFLOW=2, OVERFLOW=4, NAN=8

4 Comparison and Special Functions
 int mpfr_cmp(const mpfr_t op1,const mpfr_t op2)
 int mpfr_equal_p(const mpfr_t op1,const mpfr_t op2)
 int mpfr_nan_p(const mpfr_t x)

5 I/O and Conversion
 int mpfr_set_d(mpfr_t rop,double d,mpfr_rnd_t rnd)
 double mpfr_get_d(const mpfr_t op,mpfr_rnd_t rnd)
 int mpfr_printf(const char *format,...)
 int mpfr_fprintf(FILE *stream,const char *format,...)
 int mpfr_scanf(const char *format,...)

6 Error Handling and Flags
 unsigned long mpfr_get_flags(void)
 void mpfr_clear_flags(void)

7 Thread Safety and Build Configuration
 Configure:
   --with-gmp=/path --enable-thread-safe --disable-static
 Compiler:
   -I/path/mpfr/include -L/path/mpfr/lib -lmpfr -lgmp

## Original Source
GMP & MPFR Manuals
https://www.mpfr.org/mpfr-current/manual.html

## Digest of MPFR_MANUAL

# Initialization and Memory Management

mpfr_init     (mpfr_t x)
mpfr_init2    (mpfr_t x, mpfr_prec_t prec)
mpfr_init_set (mpfr_t x, unsigned long z, mpfr_rnd_t rnd)
mpfr_clear    (mpfr_t x)

# Precision and Rounding Modes

Type: mpfr_prec_t = unsigned long
Default precision: 53 bits
Rounding mode constants:
  MPFR_RNDN  = round to nearest, ties to even
  MPFR_RNDZ  = round toward zero
  MPFR_RNDU  = round toward +inf
  MPFR_RNDD  = round toward -inf
  MPFR_RNDA  = round away from zero

# Basic Arithmetic Functions

int mpfr_add (mpfr_t rop, const mpfr_t op1, const mpfr_t op2, mpfr_rnd_t rnd)
int mpfr_sub (mpfr_t rop, const mpfr_t op1, const mpfr_t op2, mpfr_rnd_t rnd)
int mpfr_mul (mpfr_t rop, const mpfr_t op1, const mpfr_t op2, mpfr_rnd_t rnd)
int mpfr_div (mpfr_t rop, const mpfr_t op1, const mpfr_t op2, mpfr_rnd_t rnd)
Return value: bitwise OR of flags: MPFR_FLAG_INEXACT, MPFR_FLAG_UNDERFLOW, MPFR_FLAG_OVERFLOW, MPFR_FLAG_NAN

# Comparison and Special Functions

int mpfr_cmp      (const mpfr_t op1, const mpfr_t op2)
int mpfr_equal_p (const mpfr_t op1, const mpfr_t op2)
int mpfr_nan_p   (const mpfr_t x)

# I/O and Conversion

int    mpfr_set_d    (mpfr_t rop, double d, mpfr_rnd_t rnd)
double mpfr_get_d    (const mpfr_t op, mpfr_rnd_t rnd)
int    mpfr_printf   (const char *format, ...)
int    mpfr_fprintf  (FILE *stream, const char *format, ...)
int    mpfr_scanf    (const char *format, ...)

# Error Handling and Flags

unsigned long mpfr_get_flags  (void)
void          mpfr_clear_flags(void)

# Thread Safety and Build Configuration

Configure options:
  ./configure --with-gmp=/path/to/gmp --enable-thread-safe --disable-static
Compiler flags:
  -I/path/to/mpfr/include -L/path/to/mpfr/lib -lmpfr -lgmp



## Attribution
- Source: GMP & MPFR Manuals
- URL: https://www.mpfr.org/mpfr-current/manual.html
- License: License: GNU LGPL v3
- Crawl Date: 2025-05-09T23:34:24.977Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-09
library/DECIMAL_JS.md
# library/DECIMAL_JS.md
# DECIMAL_JS

## Crawl Summary
Decimal.js provides an arbitrary-precision Decimal constructor Decimal(value) accepting number|string|Decimal, supporting decimal, binary, hex, octal formats with e/E or p/P exponents. Global and per-constructor configuration via Decimal.set({ precision:1–1e9, rounding:0–8, toExpNeg:–9e15–0, toExpPos:0–9e15, minE:–9e15–0, maxE:0–9e15, modulo:0–9, crypto:false}) and clone. Static methods include arithmetic (add,sub,mul,div,pow,mod), comparison (max,min,cmp), logs (log,ln,log2,log10), exponentials (exp,sqrt,cbrt), trigonometric and hyperbolic (sin,cos,tan,asin,acos,atan,sinh,cosh,tanh,asinh,acosh,atanh), random(dp), sum, clamp, hypot, noConflict, isDecimal, sign. Instances support fluent API: x.plus(y), x.minus(y), x.times(y), x.dividedBy(y), rounding/formatting methods (round,ceil,floor,trunc,toDP,toFixed,toExponential,toPrecision,toSD), conversion (toString,toNumber,valueOf,toJSON), predicates (isFinite,isNaN,isInteger,isZero,isNeg,isPos). Rounding modes: ROUND_UP(0), ROUND_DOWN(1), ROUND_CEIL(2), ROUND_FLOOR(3), ROUND_HALF_UP(4), ROUND_HALF_DOWN(5), ROUND_HALF_EVEN(6), ROUND_HALF_CEIL(7), ROUND_HALF_FLOOR(8), EUCLID(9). Random uses crypto.getRandomValues or crypto.randomBytes when crypto=true and available, else Math.random.

## Normalised Extract
Table of Contents

1 Constructor
2 Configuration API
3 Clone Constructor
4 Static Arithmetic Methods
5 Instance Arithmetic Methods
6 Rounding & Formatting
7 Logarithms & Exponentials
8 Trigonometric & Hyperbolic Methods
9 Utility & Comparison
10 Random & Crypto

1 Constructor
Signature: Decimal(value) ⇒ Decimal
Parameters: number|string|Decimal
String formats: decimal, 0x/0X hex, 0b/0B binary, 0o/0O octal; exponents: e/E (decimal), p/P (binary/hex/octal)
Throws on invalid input

2 Configuration API
Decimal.set(configObject) ⇒ Decimal constructor
Properties and ranges:
  precision: int 1–1e9 (default 20)
  rounding: int 0–8 (default 4)
  toExpNeg: int –9e15–0 (default –7)
  toExpPos: int 0–9e15 (default 20)
  minE: int –9e15–0 (default –9e15)
  maxE: int 0–9e15 (default 9e15)
  modulo: int 0–9 (default 1)
  crypto: boolean (default false)
Set defaults: Decimal.set({ defaults: true }) resets all to defaults

3 Clone Constructor
Decimal.clone([configObject]) ⇒ independent Decimal constructor with own config
Clone with defaults: Decimal.clone({ defaults: true })

4 Static Arithmetic Methods
add(x,y), sub(x,y), mul(x,y), div(x,y), pow(x,y), mod(x,y), max(x,y,...), min(x,y,...), sum(x,y,...), hypot(x,y,...)
Parameters: number|string|Decimal, return Decimal rounded to precision significant digits using rounding mode

5 Instance Arithmetic Methods
y = x.plus(y), x.minus(y), x.times(y), x.dividedBy(y), x.pow(y), x.mod(y), x.sqrt(), x.cbrt(), x.sum(...)
Immutable, chainable, return new Decimal

6 Rounding & Formatting
x.round(), x.ceil(), x.floor(), x.trunc()
x.toDP(dp, rm), x.toFixed(dp, rm), x.toExponential(dp, rm), x.toPrecision(sd, rm), x.toSD(sd, rm)
  dp: integer decimal places, rm: rounding mode 0–8

7 Logarithms & Exponentials
Decimal.log(x, base), log2(x), log10(x), ln(x), exp(x)
x.logarithm(base), x.log2(), x.log10(), x.naturalLogarithm(), x.naturalExponential()
Range/Domain: see static methods

8 Trigonometric & Hyperbolic Methods
sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh
Static: Decimal.sin(x) ⇒ Decimal; Instance: x.sin() ⇒ Decimal

9 Utility & Comparison
Decimal.abs(x), Decimal.sign(x), Decimal.isDecimal(o)
x.abs(), x.sign(), x.cmp(y), x.eq(y), x.gt(y), x.gte(y), x.lt(y), x.lte(y), x.isFinite(), x.isNaN(), x.isInteger(), x.isZero(), x.isNeg(), x.isPos(), x.dp(), x.sd(includeZeros)

10 Random & Crypto
Decimal.random([dp]) ⇒ Decimal with 0 ≤ value < 1, dp decimal places
If constructor.crypto=true and global crypto available, uses crypto.getRandomValues or crypto.randomBytes, else Math.random
Throws if crypto requested but unavailable

Rounding/Modulo Modes
0 ROUND_UP; 1 ROUND_DOWN; 2 ROUND_CEIL; 3 ROUND_FLOOR; 4 ROUND_HALF_UP; 5 ROUND_HALF_DOWN; 6 ROUND_HALF_EVEN; 7 ROUND_HALF_CEIL; 8 ROUND_HALF_FLOOR; 9 EUCLID

## Supplementary Details
Installation and Import
  npm install decimal.js
  CommonJS: const Decimal = require('decimal.js')
  ES Module: import Decimal from 'decimal.js'

Node.js Crypto Setup
  global.crypto = require('crypto')
  Decimal.set({ crypto: true })
  Throws if crypto unavailable when crypto=true

Custom Constructor via Clone
  const D50 = Decimal.clone({ precision: 50 })
  const Ddef = Decimal.clone({ defaults: true })

Configuration Steps
  Decimal.set({ precision: 30, rounding: Decimal.ROUND_HALF_EVEN, modulo: Decimal.EUCLID })
  To reset: Decimal.set({ defaults: true })
  Direct assignment bypasses validation

Precision & Performance
  Increasing precision beyond default exponentially slows exp(), ln(), log()
  LN10 constant precision 1025 digits limits ln() to ~1000 digits

Cloning Best Practice
  Use independent constructors for different precision requirements to avoid global side effects

Error Handling
  Decimal.set({ precision: 0 }) throws DecimalError: Invalid argument: precision: 0
  new Decimal('invalid') throws DecimalError: Invalid number

Version Compatibility
  Ensure consistent minor versions to avoid API changes

Memory
  Multiple constructors share methods, minimal overhead


## Reference Details
// Constructor
Signature: Decimal(value) ⇒ Decimal instance
Throws: DecimalError on invalid value

// Configuration API
Decimal.set(configObject) ⇒ this
Parameters:
  configObject.precision: integer(1–1e9) default 20
  configObject.rounding: integer(0–8) default 4
  configObject.toExpNeg: integer(–9e15–0) default –7
  configObject.toExpPos: integer(0–9e15) default 20
  configObject.minE: integer(–9e15–0) default –9e15
  configObject.maxE: integer(0–9e15) default 9e15
  configObject.modulo: integer(0–9) default 1
  configObject.crypto: boolean default false
  configObject.defaults: boolean reset unspecified to defaults
Throws: DecimalError on invalid config

// Clone
Decimal.clone([configObject]) ⇒ new Decimal constructor

// Rounding & Modulo Enumerations
Decimal.ROUND_UP = 0
Decimal.ROUND_DOWN = 1
Decimal.ROUND_CEIL = 2
Decimal.ROUND_FLOOR = 3
Decimal.ROUND_HALF_UP = 4
Decimal.ROUND_HALF_DOWN = 5
Decimal.ROUND_HALF_EVEN = 6
Decimal.ROUND_HALF_CEIL = 7
Decimal.ROUND_HALF_FLOOR = 8
Decimal.EUCLID = 9

// Static Methods Examples
const a = Decimal.add('1.234', 5.678)  // '6.912'
const b = Decimal.log('1000', 10)      // '3'
const r = Decimal.random(10)           // e.g. '0.1234567890'

// Instance Method Examples
const x = new Decimal(0.1)
const y = x.plus(0.2).times(3).dividedBy('1.23').toPrecision(10, Decimal.ROUND_HALF_EVEN)
// Implementation Pattern
import Decimal from 'decimal.js'
Decimal.set({ precision: 30, rounding: Decimal.ROUND_HALF_UP })
const D = Decimal.clone({ precision: 50 })
const result = new D('1.2345').minus('0.0005').times('100').toFixed(5)

// Troubleshooting
Command: Decimal.set({ precision: 0 })
Expected Error: [DecimalError] Invalid argument: precision: 0

Command: Decimal.random() with crypto=true but no global.crypto
Expected Error: Error: crypto not available

// Best Practices
Use Decimal.clone for isolated configurations
auto-import in Node: global.crypto = require('crypto') before enabling crypto true
Always set defaults:true if resetting after custom config

// Detailed Configuration Effects
precision controls significant digits of returned Decimal; rounding sets default rounding mode; toExpNeg/toExpPos govern exponential notation thresholds; minE/maxE enforce underflow/overflow to zero or Infinity; modulo affects behavior of mod operations; crypto toggles secure randomness source.

## Information Dense Extract
Decimal(value)=>Decimal supports number|string|Decimal; string formats: decimal, 0x/0X hex, 0b/0B binary, 0o/0O octal; exponents: e/E decimal, p/P binary/hex/octal. Decimal.set({precision:1–1e9=20,rounding:0–8=4,toExpNeg:–9e15–0=–7,toExpPos:0–9e15=20,minE:–9e15–0=–9e15,maxE:0–9e15=9e15,modulo:0–9=1,crypto:false,defaults}). Decimal.clone([config])->independent constructor. Static: add,sub,mul,div,pow,mod,max,min,sum,hypot,log,ln,log2,log10,exp,sqrt,cbrt,sin,cos,tan,asin,acos,atan,sinh,cosh,tanh,asinh,acosh,atanh,random([dp]),set,clone,noConflict,isDecimal,sign. Instance: x.plus/sub/times/dividedBy/pow/mod/... chainable; x.round/ceil/floor/trunc; x.toDP(dp,rm)/toFixed(dp,rm)/toExponential(dp,rm)/toPrecision(sd,rm)/toSD(sd,rm); x.toString/toNumber/valueOf/toJSON; x.cmp,eq,gt,gte,lt,lte; x.isFinite,isNaN,isInteger,isZero,isNeg,isPos; x.dp(),x.sd(includeZeros). Rounding modes: 0–8 and 9(EUCLID). Random uses crypto.getRandomValues or crypto.randomBytes if crypto=true, else Math.random. Error on invalid config or crypto unavailable. Best practice: isolated Decimal.clone for custom precision; reset with defaults:true; import and set global.crypto in Node.

## Sanitised Extract
Table of Contents

1 Constructor
2 Configuration API
3 Clone Constructor
4 Static Arithmetic Methods
5 Instance Arithmetic Methods
6 Rounding & Formatting
7 Logarithms & Exponentials
8 Trigonometric & Hyperbolic Methods
9 Utility & Comparison
10 Random & Crypto

1 Constructor
Signature: Decimal(value)  Decimal
Parameters: number|string|Decimal
String formats: decimal, 0x/0X hex, 0b/0B binary, 0o/0O octal; exponents: e/E (decimal), p/P (binary/hex/octal)
Throws on invalid input

2 Configuration API
Decimal.set(configObject)  Decimal constructor
Properties and ranges:
  precision: int 11e9 (default 20)
  rounding: int 08 (default 4)
  toExpNeg: int 9e150 (default 7)
  toExpPos: int 09e15 (default 20)
  minE: int 9e150 (default 9e15)
  maxE: int 09e15 (default 9e15)
  modulo: int 09 (default 1)
  crypto: boolean (default false)
Set defaults: Decimal.set({ defaults: true }) resets all to defaults

3 Clone Constructor
Decimal.clone([configObject])  independent Decimal constructor with own config
Clone with defaults: Decimal.clone({ defaults: true })

4 Static Arithmetic Methods
add(x,y), sub(x,y), mul(x,y), div(x,y), pow(x,y), mod(x,y), max(x,y,...), min(x,y,...), sum(x,y,...), hypot(x,y,...)
Parameters: number|string|Decimal, return Decimal rounded to precision significant digits using rounding mode

5 Instance Arithmetic Methods
y = x.plus(y), x.minus(y), x.times(y), x.dividedBy(y), x.pow(y), x.mod(y), x.sqrt(), x.cbrt(), x.sum(...)
Immutable, chainable, return new Decimal

6 Rounding & Formatting
x.round(), x.ceil(), x.floor(), x.trunc()
x.toDP(dp, rm), x.toFixed(dp, rm), x.toExponential(dp, rm), x.toPrecision(sd, rm), x.toSD(sd, rm)
  dp: integer decimal places, rm: rounding mode 08

7 Logarithms & Exponentials
Decimal.log(x, base), log2(x), log10(x), ln(x), exp(x)
x.logarithm(base), x.log2(), x.log10(), x.naturalLogarithm(), x.naturalExponential()
Range/Domain: see static methods

8 Trigonometric & Hyperbolic Methods
sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh
Static: Decimal.sin(x)  Decimal; Instance: x.sin()  Decimal

9 Utility & Comparison
Decimal.abs(x), Decimal.sign(x), Decimal.isDecimal(o)
x.abs(), x.sign(), x.cmp(y), x.eq(y), x.gt(y), x.gte(y), x.lt(y), x.lte(y), x.isFinite(), x.isNaN(), x.isInteger(), x.isZero(), x.isNeg(), x.isPos(), x.dp(), x.sd(includeZeros)

10 Random & Crypto
Decimal.random([dp])  Decimal with 0  value < 1, dp decimal places
If constructor.crypto=true and global crypto available, uses crypto.getRandomValues or crypto.randomBytes, else Math.random
Throws if crypto requested but unavailable

Rounding/Modulo Modes
0 ROUND_UP; 1 ROUND_DOWN; 2 ROUND_CEIL; 3 ROUND_FLOOR; 4 ROUND_HALF_UP; 5 ROUND_HALF_DOWN; 6 ROUND_HALF_EVEN; 7 ROUND_HALF_CEIL; 8 ROUND_HALF_FLOOR; 9 EUCLID

## Original Source
Decimal.js Arbitrary-Precision Arithmetic
https://mikemcl.github.io/decimal.js/

## Digest of DECIMAL_JS

# DECIMAL.JS ARBITRARY-PRECISION ARITHMETIC

## Constructor

Signature: `Decimal(value) ⇒ Decimal`

Parameters:
- value: number|string|Decimal
  - Accepts integers, floats, ±0, ±Infinity, NaN
  - String may use prefixes 0x/0X (hex), 0b/0B (binary), 0o/0O (octal)
  - Decimal and non-decimal strings may include e/E (power-of-ten) or p/P (power-of-two) exponents

Returns: new Decimal instance or throws `DecimalError` on invalid input

Example:
```
new Decimal('0x1.8p-5')  // '0.046875'
```

# Configuration Properties

Set via `Decimal.set(configObject)` or direct assignment

Properties and Defaults:
- precision: integer, 1 to 1e+9, default 20
- rounding: integer, 0 to 8, default 4 (ROUND_HALF_UP)
- toExpNeg: integer, -9e15 to 0, default -7
- toExpPos: integer, 0 to 9e15, default 20
- minE: integer, -9e15 to 0, default -9e15
- maxE: integer, 0 to 9e15, default 9e15
- modulo: integer, 0 to 9, default 1
- crypto: boolean, default false

Enumerated Rounding/Modulo Modes (constructor properties):
```
ROUND_UP = 0
ROUND_DOWN = 1
ROUND_CEIL = 2
ROUND_FLOOR = 3
ROUND_HALF_UP = 4
ROUND_HALF_DOWN = 5
ROUND_HALF_EVEN = 6
ROUND_HALF_CEIL = 7
ROUND_HALF_FLOOR = 8
EUCLID = 9
``` 

# Static Methods

```
Decimal.abs(x)        ⇒ Decimal
Decimal.add(x, y)     ⇒ Decimal
Decimal.sub(x, y)     ⇒ Decimal
Decimal.mul(x, y)     ⇒ Decimal
Decimal.div(x, y)     ⇒ Decimal
Decimal.pow(x, y)     ⇒ Decimal
Decimal.mod(x, y)     ⇒ Decimal
Decimal.max(x, y,...) ⇒ Decimal
Decimal.min(x, y,...) ⇒ Decimal
Decimal.log(x, [base]) ⇒ Decimal
Decimal.log2(x)       ⇒ Decimal
Decimal.log10(x)      ⇒ Decimal
Decimal.exp(x)        ⇒ Decimal
Decimal.sqrt(x)       ⇒ Decimal
Decimal.cbrt(x)       ⇒ Decimal
Decimal.sin(x)        ⇒ Decimal
Decimal.cos(x)        ⇒ Decimal
Decimal.tan(x)        ⇒ Decimal
Decimal.asin(x)       ⇒ Decimal
Decimal.acos(x)       ⇒ Decimal
Decimal.atan(x)       ⇒ Decimal
Decimal.sinh(x)       ⇒ Decimal
Decimal.cosh(x)       ⇒ Decimal
Decimal.tanh(x)       ⇒ Decimal
Decimal.asinh(x)      ⇒ Decimal
Decimal.acosh(x)      ⇒ Decimal
Decimal.atanh(x)      ⇒ Decimal
Decimal.random([dp])  ⇒ Decimal
Decimal.set(config)   ⇒ Decimal constructor
Decimal.clone([config]) ⇒ Decimal constructor
Decimal.noConflict()  ⇒ original Decimal constructor
Decimal.isDecimal(o)  ⇒ boolean
Decimal.sign(x)       ⇒ number
Decimal.sum(x, y,...) ⇒ Decimal
Decimal.hypot(x, y,...) ⇒ Decimal
Decimal.clamp(min, max) ⇒ Decimal
```

# Instance Methods

Inherited from constructor prototype, immutable, return new instances

```
abs()           ⇒ Decimal
plus(x)         ⇒ Decimal
minus(x)        ⇒ Decimal
times(x)        ⇒ Decimal
dividedBy(x)    ⇒ Decimal
pow(x)          ⇒ Decimal
mod(x)          ⇒ Decimal
max(x,...)      ⇒ Decimal
min(x,...)      ⇒ Decimal
log(x)          ⇒ Decimal
ln()            ⇒ Decimal
log2()          ⇒ Decimal
log10()         ⇒ Decimal
exp()           ⇒ Decimal
sqrt()          ⇒ Decimal
cbrt()          ⇒ Decimal
sin()           ⇒ Decimal
cos()           ⇒ Decimal
tan()           ⇒ Decimal
asin()          ⇒ Decimal
acos()          ⇒ Decimal
atan()          ⇒ Decimal
sinh()          ⇒ Decimal
cosh()          ⇒ Decimal
tanh()          ⇒ Decimal
asinh()         ⇒ Decimal
acosh()         ⇒ Decimal
atanh()         ⇒ Decimal
round()         ⇒ Decimal
ceil()          ⇒ Decimal
floor()         ⇒ Decimal
trunc()         ⇒ Decimal
toDP(dp, rm)    ⇒ Decimal
toFixed(dp, rm) ⇒ string
toExponential(dp, rm) ⇒ string
toPrecision(sd, rm)  ⇒ string
toSD(sd, rm)    ⇒ Decimal
toString()      ⇒ string
toNumber()      ⇒ number
valueOf()       ⇒ string
toJSON()        ⇒ string
cmp(x)          ⇒ number
eq(x)           ⇒ boolean
gt(x), gte(x), lt(x), lte(x) ⇒ boolean
isFinite(), isNaN(), isInteger(), isZero(), isNeg(), isPos() ⇒ boolean
decimalPlaces() ⇒ number
precision([includeZeros]) ⇒ number
sign()          ⇒ number
clampedTo(min, max) ⇒ Decimal
```

# Default Configuration Example

```
Decimal.set({
  precision: 20,
  rounding: 4,
  toExpNeg: -7,
  toExpPos: 21,
  minE: -9e15,
  maxE: 9e15,
  modulo: 1,
  crypto: false
})
```

# Date Retrieved
2024-06-XX

# Attribution
Content from https://mikemcl.github.io/decimal.js/  Data Size: 13874875 bytes

## Attribution
- Source: Decimal.js Arbitrary-Precision Arithmetic
- URL: https://mikemcl.github.io/decimal.js/
- License: License: MIT
- Crawl Date: 2025-05-10T02:57:26.225Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
library/MARKDOWNIT_GITHUB.md
# library/MARKDOWNIT_GITHUB.md
# MARKDOWNIT_GITHUB

## Crawl Summary
Provides GitHub Flavored Markdown support for markdown-it. Plugin adds parsing for @mentions, #issues, #PRs, commit SHAs, gists using default regex patterns and URL templates. Initialize via md.use(require('markdown-it-github'), options). Core options: repo (owner/repo), userUrl, issueUrl, prUrl, commitUrl, gistUrl, shorthand (true), patternSuffix. Default patterns: /(^|\s|>)@.../, /(\b[0-9a-f]{7,40}\b)/ etc. Troubleshooting: disable linkify, use patternSuffix, supply repo for correct URL generation.

## Normalised Extract
Table of Contents
1 Installation
2 Usage
3 Options
4 Reference Patterns
5 Example
6 Troubleshooting

1 Installation
   npm install markdown-it-github

2 Usage
   const md = require('markdown-it')({ linkify: true });
   md.use(require('markdown-it-github'), options);

3 Options
   repo: string;   format "owner/repo"; required for issue/PR/commit linking
   userUrl: string; default https://github.com/%s; @mention URL template
   issueUrl: string; default https://github.com/%s/issues/%s; issue link template
   prUrl: string; default https://github.com/%s/pull/%s; PR link template
   commitUrl: string; default https://github.com/%s/commit/%s; commit SHA link template
   gistUrl: string; default https://gist.github.com/%s; gist link template
   shorthand: boolean; default true; enable shorthand # references
   patternSuffix: string; default ""; suffix to isolate patterns

4 Reference Patterns
   Mention regex: (?:^|\s|>)@([a-zA-Z0-9-_]+)
   Issue regex: (?:^|\s|>)#([0-9]+)
   Commit regex: \b[0-9a-f]{7,40}\b
   Gist regex:   \b[0-9a-f]{32}\b

5 Example
       const md = require('markdown-it')({ linkify: false });
       md.use(require('markdown-it-github'), { repo: 'owner/repo', shorthand: true });
       md.render('Fixes #45, ref commit abcdef1, mention @user');

6 Troubleshooting
   - If mentions not rendered: initialize MarkdownIt with linkify:false
   - If patterns conflict: set patternSuffix to a unique identifier
   - If links broken in SSR: ensure full absolute URLs in templates or provide repo option

## Supplementary Details
repo must match /^[^/]+\/[^
]+$/; userUrl template must include %s placeholder; issueUrl and prUrl templates must include two %s placeholders in order [repo, issue/PR number]; commitUrl must include two %s placeholders [repo, SHA]; gistUrl must include single %s for gist ID. patternSuffix is appended to each regex group to avoid matching conflicts. Plugin order: apply after core rules but before custom renderers. To disable built-in autolinks for issues, set shorthand:false. For full commit SHA linking, ensure SHA length ≥7. In SSR environments, preload base URL via options rather than environment variables.

## Reference Details
API Signature:
function githubPlugin(md: MarkdownIt, options?: GitHubPluginOptions): void

interface GitHubPluginOptions {
  repo?: string;          // required for #, PR and commit linking, format "owner/repo"
  userUrl?: string;       // default "https://github.com/%s"
  issueUrl?: string;      // default "https://github.com/%s/issues/%s"
  prUrl?: string;         // default "https://github.com/%s/pull/%s"
  commitUrl?: string;     // default "https://github.com/%s/commit/%s"
  gistUrl?: string;       // default "https://gist.github.com/%s"
  shorthand?: boolean;    // default true
  patternSuffix?: string; // default ""
}

Implementation Pattern:
1 Initialize MarkdownIt: const md = new MarkdownIt({ linkify: false, html: true, breaks: true });
2 Use plugin: md.use(githubPlugin, { repo: 'owner/repo', shorthand: true, patternSuffix: '_g' });
3 Render content: const html = md.render(input);

Example Code:
const MarkdownIt = require('markdown-it');
const github = require('markdown-it-github');
const md = new MarkdownIt({ linkify: false })
  .use(github, {
    repo: 'octo-org/octo-repo',
    userUrl: 'https://github.com/%s',
    shorthand: true,
    patternSuffix: '_gh'
  });

console.log(md.render('@octocat closed issue #99 in commit d34db33f1'));

Best Practices:
- Always disable linkify when using this plugin to prevent conflict with markdown-it autolinks.
- Provide repo option to enable issue, PR and commit linking.
- Use patternSuffix when combining with other mention or reference plugins.
- Chain plugin after custom code fence and emoji plugins to preserve syntax highlighting.

Troubleshooting Procedures:
1. Verify plugin applied: md.plugins.githubPlugin must exist.
2. Test regex patterns: new RegExp(pattern.source) on sample strings.
3. If issues not linked: confirm issueUrl includes two %s placeholders or repo is defined.
4. For missing commit links: ensure SHA length ≥7; adjust regex or pass full length via options.
5. Run: console.log(md.options) to inspect resolved userUrl, issueUrl etc.

## Information Dense Extract
plugin(md:MarkdownIt,options?:GitHubPluginOptions):void; default options: {userUrl:"https://github.com/%s",issueUrl:"https://github.com/%s/issues/%s",prUrl:"https://github.com/%s/pull/%s",commitUrl:"https://github.com/%s/commit/%s",gistUrl:"https://gist.github.com/%s",shorthand:true,patternSuffix:""}; regex patterns: mention/(?:^|\s|>)@([\w-]+)/g,issue/(?:^|\s|>)#(\d+)/g,commit/\b[0-9a-f]{7,40}\b/g,gist/\b[0-9a-f]{32}\b/g; usage: md=new MarkdownIt({linkify:false}).use(githubPlugin,{repo:"owner/repo",patternSuffix:"_gh"}); render: md.render(input); best practices: disable linkify, set repo, apply after code fence and emoji, use patternSuffix for conflict; troubleshooting: inspect md.plugins.githubPlugin, verify resolved URL templates, test regex on sample text.

## Sanitised Extract
Table of Contents
1 Installation
2 Usage
3 Options
4 Reference Patterns
5 Example
6 Troubleshooting

1 Installation
   npm install markdown-it-github

2 Usage
   const md = require('markdown-it')({ linkify: true });
   md.use(require('markdown-it-github'), options);

3 Options
   repo: string;   format 'owner/repo'; required for issue/PR/commit linking
   userUrl: string; default https://github.com/%s; @mention URL template
   issueUrl: string; default https://github.com/%s/issues/%s; issue link template
   prUrl: string; default https://github.com/%s/pull/%s; PR link template
   commitUrl: string; default https://github.com/%s/commit/%s; commit SHA link template
   gistUrl: string; default https://gist.github.com/%s; gist link template
   shorthand: boolean; default true; enable shorthand # references
   patternSuffix: string; default ''; suffix to isolate patterns

4 Reference Patterns
   Mention regex: (?:^|'s|>)@([a-zA-Z0-9-_]+)
   Issue regex: (?:^|'s|>)#([0-9]+)
   Commit regex: 'b[0-9a-f]{7,40}'b
   Gist regex:   'b[0-9a-f]{32}'b

5 Example
       const md = require('markdown-it')({ linkify: false });
       md.use(require('markdown-it-github'), { repo: 'owner/repo', shorthand: true });
       md.render('Fixes #45, ref commit abcdef1, mention @user');

6 Troubleshooting
   - If mentions not rendered: initialize MarkdownIt with linkify:false
   - If patterns conflict: set patternSuffix to a unique identifier
   - If links broken in SSR: ensure full absolute URLs in templates or provide repo option

## Original Source
Markdown-It Parser and Plugins
https://github.com/markdown-it/github

## Digest of MARKDOWNIT_GITHUB

# markdown-it-github (Retrieved 2024-06-28)

## Installation

npm install markdown-it-github

## Usage

const MarkdownIt = require('markdown-it');
const github = require('markdown-it-github');
const md = new MarkdownIt({ linkify: true })
  .use(github, options);

## Options

| Option        | Type             | Default                                | Description                                              |
| ------------- | ---------------- | -------------------------------------- | -------------------------------------------------------- |
| repo          | string           | —                                      | GitHub repository in "owner/repo" format                |
| userUrl       | string template  | "https://github.com/%s"              | URL template for @mention links                          |
| issueUrl      | string template  | "https://github.com/%s/issues/%s"    | URL template for #issue references                       |
| prUrl         | string template  | "https://github.com/%s/pull/%s"      | URL template for pull request references                 |
| commitUrl     | string template  | "https://github.com/%s/commit/%s"    | URL template for commit SHA references                   |
| gistUrl       | string template  | "https://gist.github.com/%s"          | URL template for gist references                         |
| shorthand     | boolean          | true                                   | Enable shorthand references for issues and PRs           |
| patternSuffix | string           | ""                                     | Suffix appended to all regex patterns to prevent overlap |

## Reference Patterns

- Mention: /(^|\s|>)@([a-zA-Z0-9-_]+)/g
- Issue:   /(^|\s|>)#([0-9]+)/g
- Commit:  /\b[0-9a-f]{7,40}\b/g
- Gist:    /\b[0-9a-f]{32}\b/g

## Example

```js
const MarkdownIt = require('markdown-it');
const github = require('markdown-it-github');
const md = new MarkdownIt({ linkify: false })
  .use(github, {
    repo: 'owner/repo',
    userUrl: 'https://github.com/%s',
    shorthand: true
  });

console.log(md.render('Issue #123, commit abcdef1, user @octocat'));
```

## Troubleshooting

1. Mentions not rendered: ensure MarkdownIt linkify option is set to false when initializing.
2. Regex collision with other plugins: set `patternSuffix` to a unique string to isolate patterns.
3. Broken links in server-side rendering: verify that `repo` option is provided or that custom URL templates include full protocol.

## Attribution

Source: https://github.com/markdown-it/github
Data Size: 0 bytes

## Attribution
- Source: Markdown-It Parser and Plugins
- URL: https://github.com/markdown-it/github
- License: License: MIT
- Crawl Date: 2025-05-10T06:28:46.888Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
library/DECIMALJS_API.md
# library/DECIMALJS_API.md
# DECIMALJS_API

## Crawl Summary
Decimal.js provides an ES module and global constructor Decimal(value). Core features: configurable precision (1–1e9), rounding modes (0–8, default 4), exponent limits (minE -9e15 to maxE 9e15), formatting thresholds toExpNeg and toExpPos, modulo modes including EUCLID, optional crypto-based random. Static and instance methods cover arithmetic, comparisons, conversions, trigonometry, hyperbolic functions. All operations return new immutable instances. Key methods: plus, minus, times, div, pow, mod, exp, ln, sqrt, cbrt, log/log2/log10, trig/ inverse trig, rounding and formatting toFixed/toExponential/toPrecision. clone and set allow independent Decimal constructors. random(dp) uses crypto when enabled. Errors thrown on invalid values or config.

## Normalised Extract
Table of Contents
1 Constructor
2 Configuration
3 Rounding & Modulo Modes
4 Static Methods
5 Instance Methods
6 Default Settings

1 Constructor
Signature: Decimal(value: number|string|Decimal) ⇒ Decimal
Accepts: integer, float, ±0, ±Infinity, NaN; strings in decimal, binary (0b), hex (0x), octal (0o) with e/E (decimal exponent) or p/P (binary/hex/octal exponent). Throws DecimalError on invalid.

2 Configuration
Decimal.set({ precision:1–1e9, rounding:0–8, toExpNeg:-9e15–0, toExpPos:0–9e15, minE:-9e15–0, maxE:0–9e15, modulo:0–9, crypto:true|false, defaults:true }) ⇒ constructor
Direct assign allowed but bypasses validation.

3 Rounding & Modulo Modes
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3, ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6, ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

4 Static Methods
abs, add, sub, mul, div, pow, mod, divToInt, round, floor, ceil, trunc, clamp, max, min, sum, random(dp?), log(x,base?), log2, log10, ln, exp, hypot, acos, asin, atan, acosh, asinh, atanh, clone, noConflict, isDecimal

5 Instance Methods
Arithmetic: plus, minus, times, dividedBy, mod, pow, cbrt, sqrt, exp, ln, log
Rounding/Conversion: round, floor, ceil, trunc, toString, toNumber, toFixed, toExponential, toPrecision, toDP, toSD, toBinary, toHexadecimal, toOctal, toNearest, toJSON
Comparison: cmp, eq, lt, lte, gt, gte, isFinite, isNaN, isZero, isInt, isNeg, isPos, sign
Trigonometry: sin, cos, tan, asin, acos, atan; sinh, cosh, tanh, asinh, acosh, atanh

6 Default Settings
precision=20, rounding=4, toExpNeg=-7, toExpPos=21, minE=-9e15, maxE=9e15, modulo=1, crypto=false

## Supplementary Details
Parameter Ranges
precision: 1–1e9; rounding: 0–8; toExpNeg: -9e15–0; toExpPos: 0–9e15; minE: -9e15–0; maxE: 0–9e15; modulo: 0–9; crypto: boolean
default configuration via Decimal.set({defaults:true})
Exponential notation thresholds toExpNeg and toExpPos control automatic formatting in toString; toFixed and toExponential override.
clone([config]) creates independent constructor; clone with defaults:true resets.
random(dp): dp: integer 0–1e9; uses crypto.getRandomValues or crypto.randomBytes if crypto=true, otherwise Math.random. Throws if crypto=true and crypto unavailable.
Modulo modes: 0–8 follow rounding modes; EUCLID=9 for always-positive remainder. modulo property directly sets mode.


## Reference Details
Constructor
Signature: new Decimal(value)⇒Decimal
Throws: DecimalError if value invalid.

Configuration
Decimal.set(config: {precision?:number, rounding?:number, toExpNeg?:number, toExpPos?:number, minE?:number, maxE?:number, modulo?:number, crypto?:boolean, defaults?:boolean}):DecimalConstructor
Throws: DecimalError on invalid property values.
Decimal.precision:number
Decimal.rounding:number
Decimal.minE:number
Decimal.maxE:number
Decimal.toExpNeg:number
Decimal.toExpPos:number
Decimal.modulo:number
Decimal.crypto:boolean

Static Methods
abs(x:number|string|Decimal):Decimal
add(x:number|string|Decimal,y:number|string|Decimal):Decimal
sub(x:number|string|Decimal,y:number|string|Decimal):Decimal
mul(x:number|string|Decimal,y:number|string|Decimal):Decimal
div(x:number|string|Decimal,y:number|string|Decimal):Decimal
pow(base:number|string|Decimal,exponent:number|string|Decimal):Decimal
mod(x:number|string|Decimal,y:number|string|Decimal):Decimal
divToInt(x:number|string|Decimal,y:number|string|Decimal):Decimal
round(x:number|string|Decimal):Decimal
floor(x:number|string|Decimal):Decimal
ceil(x:number|string|Decimal):Decimal
trunc(x:number|string|Decimal):Decimal
clamp(min:number|string|Decimal,max:number|string|Decimal):Decimal
max(...args:(number|string|Decimal)[]):Decimal
min(...args:(number|string|Decimal)[]):Decimal
sum(...args:(number|string|Decimal)[]):Decimal
random(dp?:number):Decimal
log(x:number|string|Decimal,base?:number|string|Decimal):Decimal
log2(x:number|string|Decimal):Decimal
log10(x:number|string|Decimal):Decimal
ln(x:number|string|Decimal):Decimal
exp(x:number|string|Decimal):Decimal
hypot(...args:(number|string|Decimal)[]):Decimal
acos(x:number|string|Decimal):Decimal
asin(x:number|string|Decimal):Decimal
atan(x:number|string|Decimal):Decimal
acosh(x:number|string|Decimal):Decimal
asinh(x:number|string|Decimal):Decimal
atanh(x:number|string|Decimal):Decimal
clone(config?:object):DecimalConstructor
noConflict():DecimalConstructor
isDecimal(obj:any):boolean

Instance Methods
plus(x:number|string|Decimal):Decimal
minus(x:number|string|Decimal):Decimal
times(x:number|string|Decimal):Decimal
dividedBy(x:number|string|Decimal):Decimal
mod(x:number|string|Decimal):Decimal
toPower(exp:number|string|Decimal):Decimal
cbrt():Decimal
sqrt():Decimal
exp():Decimal
ln():Decimal
log(base?:number|string|Decimal):Decimal
round():Decimal
floor():Decimal
ceil():Decimal
trunc():Decimal
toDecimalPlaces(dp:number,rm?:number):Decimal
toSignificantDigits(sd:number,rm?:number):Decimal
toExponential(dp?:number,rm?:number):string
toFixed(dp?:number,rm?:number):string
toPrecision(sd?:number,rm?:number):string
toNearest(x?:number|string|Decimal,rm?:number):Decimal
toBinary():string
toHexadecimal():string
toOctal():string
toNumber():number
toString():string
toJSON():string
cmp(x:number|string|Decimal):number
eq(x:number|string|Decimal):boolean
lt(x:number|string|Decimal):boolean
lte(x:number|string|Decimal):boolean
gt(x:number|string|Decimal):boolean
gte(x:number|string|Decimal):boolean
isFinite():boolean
isNaN():boolean
isZero():boolean
isInteger():boolean
isNeg():boolean
isPos():boolean
sign():number
sin():Decimal
cos():Decimal
tan():Decimal
asin():Decimal
acos():Decimal
atan():Decimal
sinh():Decimal
cosh():Decimal
tanh():Decimal
asinh():Decimal
acosh():Decimal
atanh():Decimal

Best Practices
Use independent Decimal constructors via clone for differing configurations.
Always set precision and rounding via Decimal.set to avoid invalid results.
Enable crypto=true when random using secure RNG.
Prefer toDP and toSD for formatting over toString for precision control.
Chain methods to avoid intermediate assignment overhead.

Troubleshooting
Invalid precision error: Decimal.set({precision:0}) throws [DecimalError] Invalid argument: precision: 0.
Missing crypto: with crypto=true in Node.js assign global.crypto=require('crypto') before Decimal.random().
Exponent underflow: new Decimal('1e-10000000000000000') yields '0' when e<minE. Increase minE.
Exponent overflow: new Decimal('1e10000000000000000') yields 'Infinity' when e>maxE. Increase maxE.

## Information Dense Extract
Decimal(value)⇒Decimal accept number|string|Decimal; string supports decimal,0b/0x/0o with e/E or p/P; exponent between minE,maxE; throws DecimalError on invalid. Config: Decimal.set({precision:1–1e9,rounding:0–8,toExpNeg:-9e15–0,toExpPos:0–9e15,minE:-9e15–0,maxE:0–9e15,modulo:0–9,crypto:boolean,defaults:boolean})⇒constructor. Rounding modes: ROUND_UP=0…ROUND_HALF_FLOOR=8; EUCLID=9. Default: precision20,rounding4,toExpNeg-7,toExpPos21,minE-9e15,maxE9e15,modulo1,cryptofalse. Static APIs: abs,add,sub,mul,div,pow,mod,divToInt,round,floor,ceil,trunc,clamp,max,min,sum,random(dp?),log(x,base?),log2,log10,ln,exp,hypot,acos,asin,atan,acosh,asinh,atanh,clone, noConflict,isDecimal. Instance: plus,minus,times,dividedBy,mod,toPower,cbrt,sqrt,exp,ln,log, round,floor,ceil,trunc,toDP,toSD,toExponential,toFixed,toPrecision,toNearest,toBinary,toHexadecimal,toOctal,toNumber,toString,toJSON,cmp,eq,lt,lte,gt,gte,isFinite,isNaN,isZero,isInteger,isNeg,isPos,sign,sin,cos,tan,asin,acos,atan,sinh,cosh,tanh,asinh,acosh,atanh. Clone for independent configs. Use crypto RNG by setting crypto=true and global.crypto in Node. Errors when invalid config or unavailable crypto.

## Sanitised Extract
Table of Contents
1 Constructor
2 Configuration
3 Rounding & Modulo Modes
4 Static Methods
5 Instance Methods
6 Default Settings

1 Constructor
Signature: Decimal(value: number|string|Decimal)  Decimal
Accepts: integer, float, 0, Infinity, NaN; strings in decimal, binary (0b), hex (0x), octal (0o) with e/E (decimal exponent) or p/P (binary/hex/octal exponent). Throws DecimalError on invalid.

2 Configuration
Decimal.set({ precision:11e9, rounding:08, toExpNeg:-9e150, toExpPos:09e15, minE:-9e150, maxE:09e15, modulo:09, crypto:true|false, defaults:true })  constructor
Direct assign allowed but bypasses validation.

3 Rounding & Modulo Modes
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3, ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6, ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

4 Static Methods
abs, add, sub, mul, div, pow, mod, divToInt, round, floor, ceil, trunc, clamp, max, min, sum, random(dp?), log(x,base?), log2, log10, ln, exp, hypot, acos, asin, atan, acosh, asinh, atanh, clone, noConflict, isDecimal

5 Instance Methods
Arithmetic: plus, minus, times, dividedBy, mod, pow, cbrt, sqrt, exp, ln, log
Rounding/Conversion: round, floor, ceil, trunc, toString, toNumber, toFixed, toExponential, toPrecision, toDP, toSD, toBinary, toHexadecimal, toOctal, toNearest, toJSON
Comparison: cmp, eq, lt, lte, gt, gte, isFinite, isNaN, isZero, isInt, isNeg, isPos, sign
Trigonometry: sin, cos, tan, asin, acos, atan; sinh, cosh, tanh, asinh, acosh, atanh

6 Default Settings
precision=20, rounding=4, toExpNeg=-7, toExpPos=21, minE=-9e15, maxE=9e15, modulo=1, crypto=false

## Original Source
Decimal.js Arbitrary-Precision Arithmetic
https://mikemcl.github.io/decimal.js/

## Digest of DECIMALJS_API

# Decimal.js API Reference

## 1. Constructor

**Signature**: Decimal(value: number|string|Decimal) ⇒ Decimal

- Acceptable value types: integer, float, ±0, ±Infinity, NaN; string in decimal, binary (0b/0B), hex (0x/0X), octal (0o/0O) with optional exponential notation using e/E for decimal or p/P for non-decimal.
- Range constraints: exponent between minE and maxE.
- Throws: DecimalError on invalid value.

**Examples**:
```js
new Decimal(9)                // '9'
new Decimal('4.321e+4')       // '43210'
new Decimal('-0b10110100.1')  // '-180.5'
new Decimal('0x0.0c')         // '0.046875'
``` 

## 2. Configuration Properties

### 2.1 Decimal.set(object) ⇒ Decimal constructor

- object properties:
  - precision: integer [1,1e9], default 20
  - rounding: integer [0,8], default 4
  - toExpNeg: integer [-9e15,0], default -7
  - toExpPos: integer [0,9e15], default 20
  - minE: integer [-9e15,0], default -9e15
  - maxE: integer [0,9e15], default 9e15
  - modulo: integer [0,9], default 1
  - crypto: boolean, default false
  - defaults: boolean (if true, reset unspecified to defaults)
- Returns: this constructor
- Throws: DecimalError on invalid property.

### 2.2 Direct assignment
- Can set Decimal.precision, rounding, etc., without validation.

## 3. Rounding Modes & Modulo Modes

Property names and values:
```
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3,
ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6,
ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9
```

## 4. Static Methods

| Method         | Signature                                    | Returns    | Notes                                                                       |
|----------------|----------------------------------------------|------------|-----------------------------------------------------------------------------|
| abs            | Decimal.abs(x)                               | Decimal    | alias absoluteValue                                                        |
| add            | Decimal.add(x,y)                             | Decimal    | alias plus                                                                 |
| sub            | Decimal.sub(x,y)                             | Decimal    | alias minus                                                                |
| mul            | Decimal.mul(x,y)                             | Decimal    | alias times                                                                |
| div            | Decimal.div(x,y)                             | Decimal    | alias dividedBy                                                            |
| pow            | Decimal.pow(base,exp)                        | Decimal    | alias toPower                                                              |
| mod            | Decimal.mod(x,y)                             | Decimal    | alias modulo                                                                |
| divToInt       | Decimal.divToInt(x,y)                        | Decimal    | alias dividedToIntegerBy                                                   |
| round          | Decimal.round(x)                             | Decimal    |                                                                             |
| floor          | Decimal.floor(x)                             | Decimal    |                                                                             |
| ceil           | Decimal.ceil(x)                              | Decimal    |                                                                             |
| trunc          | Decimal.trunc(x)                             | Decimal    | alias truncated                                                            |
| clamp          | Decimal.clamp(min,max)                      | Decimal    | alias clampedTo                                                            |
| max            | Decimal.max(x,...args)                       | Decimal    |                                                                             |
| min            | Decimal.min(x,...args)                       | Decimal    |                                                                             |
| sum            | Decimal.sum(x,...args)                       | Decimal    | result rounded only                                                        |
| random         | Decimal.random(dp?)                          | Decimal    | dp: integer [0,1e9], default precision, uses crypto if crypto=true        |
| log            | Decimal.log(x,base?)                        | Decimal    | default base 10                                                             |
| log2           | Decimal.log2(x)                              | Decimal    |                                                                             |
| log10          | Decimal.log10(x)                             | Decimal    |                                                                             |
| ln             | Decimal.ln(x)                                | Decimal    | alias naturalLogarithm                                                     |
| exp            | Decimal.exp(x)                               | Decimal    | alias naturalExponential                                                    |
| hypot          | Decimal.hypot(...args)                      | Decimal    | sqrt(sum of squares)                                                        |
| acos, asin, atan, acosh,...atanh | Decimal.acos(x) etc.          | Decimal    | inverse and hyperbolic trig functions                                       |
| clone          | Decimal.clone([object])                     | new constructor | shallow clone with new settings or default when object.defaults=true         |
| noConflict     | Decimal.noConflict()                         | old Decimal constructor | browser only revert                                                     |
| isDecimal      | Decimal.isDecimal(object)                   | boolean    | instance check                                                              |

## 5. Instance Methods

(Immutable, chainable)

### 5.1 Arithmetic
- plus(x), minus(x), times(x), dividedBy(x), mod(x), pow(x)
- cubeRoot(), sqrt(), exp(), ln(), log(base)
- abs(), neg(), decimalPlaces(), precision([includeZeros]), toDP(dp,rm), toSD(sd,rm)

### 5.2 Rounding & Conversion
- round(), floor(), ceil(), trunc(), toString(), toNumber(), toJSON()
- toFixed(dp,rm), toExponential(dp,rm), toPrecision(sd,rm)
- toNearest(x,rm), toBinary(), toHexadecimal(), toOctal()

### 5.3 Comparison
- cmp(x), eq(x), lt(x), lte(x), gt(x), gte(x)
- isFinite(), isNaN(), isZero(), isInteger(), isNeg(), isPos()
- sign(): returns -1,0,+1,-0 or NaN

### 5.4 Trigonometry
- sin(), cos(), tan(), asin(), acos(), atan()
- sinh(), cosh(), tanh(), asinh(), acosh(), atanh()
- Uses precision significant digits, rounding mode
- Domain/Range as per Math, correct rounding within precision limit (see Pi limit)

## 6. Configuration Defaults
```
precision=20
rounding=4
toExpNeg=-7
toExpPos=21
minE=-9e15
maxE=9e15
modulo=1
crypto=false
```

## 7. Errors
- Throws DecimalError with message '[DecimalError] Invalid argument: property: value'



## Attribution
- Source: Decimal.js Arbitrary-Precision Arithmetic
- URL: https://mikemcl.github.io/decimal.js/
- License: License: MIT
- Crawl Date: 2025-05-10T08:58:24.049Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
library/ESM_MODULES.md
# library/ESM_MODULES.md
# ESM_MODULES

## Crawl Summary
Node.js ESM support: markers (.mjs, package.json type, CLI flag), specifier types (relative URL, bare, absolute file:, data:, node:), import attributes (type:'json'), import.meta properties (url, dirname, filename, resolve), dynamic import() signature, CJS interop patterns, JSON modules default export, top-level await behavior, ESM_RESOLVE algorithm overview with URL parsing, PACKAGE_RESOLVE and format detection.

## Normalised Extract
Table of Contents
1. Enabling ES Modules
2. Import Specifiers
3. Import Attributes
4. import.meta APIs
5. Dynamic import()
6. CommonJS Interoperability
7. JSON Modules
8. Top-Level Await
9. Resolution Algorithm

1. Enabling ES Modules
Markers:
  .mjs extension => ESM
  .cjs extension => CommonJS
  package.json { "type": "module" } or { "type": "commonjs" }
  CLI flag --input-type=module|commonjs

2. Import Specifiers
Relative (./, ../): extension mandatory, resolved via URL.resolve(parentURL, specifier)
Bare (package or path): resolved via node_modules lookup and "exports" field
Absolute (file://): direct URL parse; percent-encode special chars
Data URLs: supported MIME types text/javascript, application/json (with type:'json'), application/wasm
Node built-ins: node:fs, node:events => builtin module namespace

3. Import Attributes
Syntax: import X from 'file' with { type: 'json' }
Only supported attribute: type
Supported values: 'json'

4. import.meta APIs
import.meta.url: string file: URL of module
import.meta.dirname: string path.dirname(import.meta.filename)
import.meta.filename: string realpath(url.fileURLToPath(import.meta.url))
import.meta.resolve(specifier: string) => string absolute URL

5. Dynamic import()
Signature: import(specifier: string, options?: { with?: { type: string } }): Promise<any>
Use from CJS to load ESM

6. CommonJS Interoperability
import cjsDefault from 'mod.cjs' => cjsDefault === module.exports
import { named } from 'mod.cjs' => static analysis of exports
module.createRequire(import.meta.url) => require function

7. JSON Modules
import data from './file.json' with { type: 'json' }
Default-only export
Shared cache with CJS

8. Top-Level Await
Allowed in ESM
Unresolved promis never finish => exit code 13

9. Resolution Algorithm
ESM_RESOLVE(specifier, parentURL):
  if URL specifier => parse+serialize
  elif startsWith ./ ../ / => URL.resolve
  elif startsWith # => PACKAGE_IMPORTS_RESOLVE
  else => PACKAGE_RESOLVE
After resolved file URL:
  validate percent-encodings
  ensure exists and not directory
  realpath + keep query/fragment
  format = ESM_FILE_FORMAT(resolved)
Return { resolved, format }

ESM_FILE_FORMAT(url):
  .mjs => module
  .cjs => commonjs
  .json => json
  .wasm (with flag) => wasm
  .node (with flag) => addon
  .js => use package.json type or syntax detection



## Supplementary Details
Configuration Options:
- package.json "type": "module"|"commonjs" (default: implicit detection)
- CLI flags: --input-type=module|commonjs; --experimental-wasm-modules; --experimental-addon-modules
- File extensions recognized: .mjs, .cjs, .js, .json, .wasm (if enabled), .node (if enabled)

Implementation Steps:
1. Mark modules via extension or package.json or CLI.
2. Use import/export syntax or top-level await.
3. For JSON: add with { type:'json' }.
4. For CJS modules: use import default or createRequire.
5. Resolve specifiers via built-in ESM_RESOLVE algorithm.
6. Use import.meta.* APIs for metadata and resolution.

Best Practice: always specify file extensions in ESM import; use package.json "exports" to lock public API paths.

Troubleshooting:
- Missing extension => ERR_MODULE_NOT_FOUND: Add .js/.mjs
- Invalid package target => ERR_PACKAGE_PATH_NOT_EXPORTED: Update package.json "exports"
- Unable to load data URL => Syntax error: ensure MIME type matches import syntax
- import.meta.resolve deadlock in loader => avoid calling in custom loader


## Reference Details
API: import(specifier: string, options?: { with?: { type: string } }) => Promise<any>
- options.with.type: 'json' required for JSON modules

API: import.meta.url => string
API: import.meta.dirname => string (same as path.dirname(import.meta.filename))
API: import.meta.filename => string (url.fileURLToPath(import.meta.url))
API: import.meta.resolve(specifier: string) => string
Throws: ERR_INVALID_MODULE_SPECIFIER, ERR_MODULE_NOT_FOUND, ERR_INVALID_PACKAGE_TARGET, etc.

CommonJS Interop:
function module.createRequire(fromPath: string) => require function

Examples:
```js
// ESM module (addTwo.mjs)
export function addTwo(n) { return n + 2; }

// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // 6

// JSON import
import cfg from './config.json' with { type: 'json' };

// CJS import
import cjsLib from './lib.cjs';
console.log(cjsLib.default || cjsLib);

// Top-level await
export const val = await fetchData();

// import.meta.resolve
const abs = import.meta.resolve('./mod.js');

// createRequire
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const fs = require('fs');
```

Troubleshooting Commands:
node --input-type=module index.js
node --experimental-wasm-modules app.mjs
Expected: module loads without ERR_MODULE_NOT_FOUND or ERR_REQUIRE_ESM errors.



## Information Dense Extract
Markers: .mjs|.cjs extensions; package.json type; --input-type flag. Specifiers: relative (URL.resolve, ext mandatory), bare (node_modules+exports), absolute (file://). Data: text/javascript, application/json(type:'json'), application/wasm. Node: node:fs, node:module. import attributes: with{type:'json'}. import(): (string, {with?})=>Promise<any>. import.meta: url:string, dirname:string, filename:string, resolve(spec:string)=>string. CJS interop: default=module.exports, named via static analysis; createRequire(import.meta.url). JSON modules: default-only, shared cache. Top-level await allowed; unresolved => exit 13. Resolution: ESM_RESOLVE->URL parse/resolve or PACKAGE_RESOLVE/IMPORTS with exports/imports->validate->realpath->ESM_FILE_FORMAT by ext or package.json type or syntax. ESM_FILE_FORMAT: .mjs,module;.cjs,commonjs;.json,json;.wasm,wasm;.node,addon;.js by package type or syntax detection. Exceptions: ERR_MODULE_NOT_FOUND, ERR_PACKAGE_PATH_NOT_EXPORTED, ERR_INVALID_MODULE_SPECIFIER, ERR_INVALID_PACKAGE_TARGET. Best practice: specify extensions, use exports field, prefer import.meta.resolve over require.resolve replacement. 

## Sanitised Extract
Table of Contents
1. Enabling ES Modules
2. Import Specifiers
3. Import Attributes
4. import.meta APIs
5. Dynamic import()
6. CommonJS Interoperability
7. JSON Modules
8. Top-Level Await
9. Resolution Algorithm

1. Enabling ES Modules
Markers:
  .mjs extension => ESM
  .cjs extension => CommonJS
  package.json { 'type': 'module' } or { 'type': 'commonjs' }
  CLI flag --input-type=module|commonjs

2. Import Specifiers
Relative (./, ../): extension mandatory, resolved via URL.resolve(parentURL, specifier)
Bare (package or path): resolved via node_modules lookup and 'exports' field
Absolute (file://): direct URL parse; percent-encode special chars
Data URLs: supported MIME types text/javascript, application/json (with type:'json'), application/wasm
Node built-ins: node:fs, node:events => builtin module namespace

3. Import Attributes
Syntax: import X from 'file' with { type: 'json' }
Only supported attribute: type
Supported values: 'json'

4. import.meta APIs
import.meta.url: string file: URL of module
import.meta.dirname: string path.dirname(import.meta.filename)
import.meta.filename: string realpath(url.fileURLToPath(import.meta.url))
import.meta.resolve(specifier: string) => string absolute URL

5. Dynamic import()
Signature: import(specifier: string, options?: { with?: { type: string } }): Promise<any>
Use from CJS to load ESM

6. CommonJS Interoperability
import cjsDefault from 'mod.cjs' => cjsDefault === module.exports
import { named } from 'mod.cjs' => static analysis of exports
module.createRequire(import.meta.url) => require function

7. JSON Modules
import data from './file.json' with { type: 'json' }
Default-only export
Shared cache with CJS

8. Top-Level Await
Allowed in ESM
Unresolved promis never finish => exit code 13

9. Resolution Algorithm
ESM_RESOLVE(specifier, parentURL):
  if URL specifier => parse+serialize
  elif startsWith ./ ../ / => URL.resolve
  elif startsWith # => PACKAGE_IMPORTS_RESOLVE
  else => PACKAGE_RESOLVE
After resolved file URL:
  validate percent-encodings
  ensure exists and not directory
  realpath + keep query/fragment
  format = ESM_FILE_FORMAT(resolved)
Return { resolved, format }

ESM_FILE_FORMAT(url):
  .mjs => module
  .cjs => commonjs
  .json => json
  .wasm (with flag) => wasm
  .node (with flag) => addon
  .js => use package.json type or syntax detection

## Original Source
ECMAScript Modules (ESM) in Node.js
https://nodejs.org/api/esm.html

## Digest of ESM_MODULES

# Introduction

ECMAScript modules (ESM) are the official JavaScript module format supported by Node.js v14.0.0 and later. Node.js supports ESM with the following explicit markers:

- File extensions: `.mjs` for ESM, `.cjs` for CommonJS.
- package.json field: `{ "type": "module" }` for ESM, `{ "type": "commonjs" }` for CommonJS.
- CLI flag: `--input-type=module` or `--input-type=commonjs`.

# Enabling ES Modules

Marker           | Syntax
-----------------|--------------------------------------
File extension   | `file.mjs` interpreted as ESM
package.json     | `{ "type": "module" }`
CLI flag         | `node --input-type=module script.js`

If no explicit marker, Node.js inspects source for ESM syntax (import/export/await/import.meta).

# Import Specifiers

Specifier type       | Syntax                           | Resolution
---------------------|----------------------------------|------------------------------------
Relative             | `import x from './path.js'`     | URL resolution relative to importer URL; extension mandatory
Bare                 | `import pkg from 'pkg/name.js'` | Node module resolution algorithm; consult `exports` field
Absolute (file:)     | `import x from 'file:///abs.js'`| URL parsed directly; percent-encoding required
Data URLs            | `import 'data:text/javascript,...'` | Supported for JS, JSON, Wasm
Node built-ins       | `import fs from 'node:fs'`       | `node:` scheme mapped to built-in modules

# Import Attributes

Inline syntax for controlling module parsing:
- `with { type: 'json' }` required for JSON modules.

Example:
```
import cfg from './cfg.json' with { type: 'json' };
const { default: data } = await import('./data.json', { with: { type: 'json' } });
```

# import.meta APIs

API                            | Parameters             | Returns        | Since     
-------------------------------|------------------------|----------------|-----------
import.meta.url                | none                   | string (file: URL)
import.meta.dirname            | none                   | string (directory path)
import.meta.filename           | none                   | string (resolved file path)
import.meta.resolve(specifier) | specifier: string      | string (absolute URL)

- `import.meta.resolve` performs module-relative resolution synchronously.

# Dynamic import()

Expression: `import(specifier: string, options?: { with?: { type: string } }) => Promise<any>`
Loads ESM from ESM or CommonJS context.

# CommonJS Interoperability

- In ESM: `import pkg from 'cjs-module.cjs'` yields `pkg` === `module.exports`.
- Named exports from CJS supported via static analysis; live binding not guaranteed.
- In ESM, to use `require`: `const require = module.createRequire(import.meta.url);
  const lib = require('lib');`

# JSON Modules

- Must use `with { type: 'json' }` syntax.
- Only default export available.
- Cached in both ESM and CJS caches.

# Top-Level Await

- Syntax: `await` allowed at module top-level.
- Unresolved await leads to process exit code 13.

# Resolution Algorithm Overview

Entry: `ESM_RESOLVE(specifier, parentURL) => { url: string, format: 'module'|'commonjs'|'json'|'wasm'|'addon' }

- URL specifiers parsed directly.
- Relative (`./`, `../`, `/`) resolved via URL API.
- Bare specifiers resolved via `PACKAGE_RESOLVE` and `PACKAGE_IMPORTS_RESOLVE`.
- Format determined by extension, package.json `type`, or syntax detection.

For full algorithm see Node.js documentation.

_Retrieved: 2024-06-26_
_Data Size: 3317331 bytes_


## Attribution
- Source: ECMAScript Modules (ESM) in Node.js
- URL: https://nodejs.org/api/esm.html
- License: License: CC-BY-4.0
- Crawl Date: 2025-05-10T01:23:18.858Z
- Data Size: 3317331 bytes
- Links Found: 557

## Retrieved
2025-05-10
library/JS_YAML.md
# library/JS_YAML.md
# JS_YAML

## Crawl Summary
load(source: string, options?): any; options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false. loadAll(source: string, iterator?, options?): any[]. dump(obj: any, options?): string; options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, styles={}, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType=' or "', forceQuotes=false, replacer?; Supported schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA; Styles per tag; Supported YAML types; CLI usage

## Normalised Extract
Table of Contents:
1. load(source, options)
2. loadAll(source, iterator, options)
3. dump(obj, options)
4. LoadOptions parameters and defaults
5. DumpOptions parameters and defaults
6. Schemas and their definitions
7. Styles mapping table
8. Supported YAML tags and JS types
9. CLI usage and flags

1. load(source: string, options?: LoadOptions): any
   source: YAML string
   options.filename: string|null = null
   options.onWarning: (e)=>void = null
   options.schema: Schema = DEFAULT_SCHEMA
   options.json: boolean = false
   Returns first document or throws YAMLException

2. loadAll(source: string, iterator?: (doc)=>void, options?: LoadOptions): any[]
   Returns array of documents if no iterator, else applies iterator to each

3. dump(obj: any, options?: DumpOptions): string
   options.indent: number = 2
   options.noArrayIndent: boolean = false
   options.skipInvalid: boolean = false
   options.flowLevel: number = -1
   options.styles: { [tag]: string } = {}
   options.schema: Schema = DEFAULT_SCHEMA
   options.sortKeys: boolean|func = false
   options.lineWidth: number = 80
   options.noRefs: boolean = false
   options.noCompatMode: boolean = false
   options.condenseFlow: boolean = false
   options.quotingType: '\''|" = '\''
   options.forceQuotes: boolean = false
   options.replacer: func

4. Schemas:
   FAILSAFE_SCHEMA: strings, arrays, plain objects
   JSON_SCHEMA: JSON types
   CORE_SCHEMA: same as JSON_SCHEMA
   DEFAULT_SCHEMA: all YAML 1.2 tags

5. Styles table per tag as defined above

6. Supported tags with JS mappings

7. CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

## Supplementary Details
- LoadOptions type definition:
  interface LoadOptions { filename?: string; onWarning?: (e: YAMLException)=>void; schema?: Schema; json?: boolean; }
- DumpOptions type definition:
  interface DumpOptions { indent?: number; noArrayIndent?: boolean; skipInvalid?: boolean; flowLevel?: number; styles?: {[tag:string]:string}; schema?: Schema; sortKeys?: boolean|((a,b)=>number); lineWidth?: number; noRefs?: boolean; noCompatMode?: boolean; condenseFlow?: boolean; quotingType?: '"'|'\''; forceQuotes?: boolean; replacer?: (key:any,value:any)=>any; }
- Schema constants:
  const FAILSAFE_SCHEMA: Schema;
  const JSON_SCHEMA: Schema;
  const CORE_SCHEMA: Schema;
  const DEFAULT_SCHEMA: Schema;
- Exception type:
  class YAMLException extends Error { mark: Mark; message: string; }
- CLI error codes:
  0: success; 1: parse error; 2: file read error; 3: unknown option
- Loading steps:
  1. read file as utf8
  2. call yaml.load or yaml.loadAll
  3. handle exceptions via try/catch or onWarning callback
- Dumping steps:
  1. prepare JS object
  2. call yaml.dump with options
  3. write output to file or stdout


## Reference Details
## TypeScript Signatures
```ts
import { load, loadAll, dump, FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA, Schema, YAMLException } from 'js-yaml';

declare function load(source: string, options?: LoadOptions): any;
declare function loadAll(source: string, iterator?: (doc: any)=>void, options?: LoadOptions): any[];
declare function dump(obj: any, options?: DumpOptions): string;

interface LoadOptions {
  filename?: string;
  onWarning?: (e: YAMLException)=>void;
  schema?: Schema;
  json?: boolean;
}

interface DumpOptions {
  indent?: number;
  noArrayIndent?: boolean;
  skipInvalid?: boolean;
  flowLevel?: number;
  styles?: { [tag:string]:string };
  schema?: Schema;
  sortKeys?: boolean|((a:any,b:any)=>number);
  lineWidth?: number;
  noRefs?: boolean;
  noCompatMode?: boolean;
  condenseFlow?: boolean;
  quotingType?: '"'|'\'';
  forceQuotes?: boolean;
  replacer?: (key:any,value:any)=>any;
}
```

## Full Code Examples
### Single Document Load
```js
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const content = fs.readFileSync('config.yml','utf8');
  const data = yaml.load(content, {
    filename: 'config.yml',
    schema: yaml.JSON_SCHEMA,
    onWarning: (e) => console.warn('YAML warning:', e.message),
    json: true
  });
  console.log(data);
} catch (err) {
  console.error('YAML load error:', err.message);
  process.exit(1);
}
```

### Multi-Document Load
```js
yaml.loadAll(fs.readFileSync('multi.yml','utf8'), (doc) => {
  processDocument(doc);
}, { schema: yaml.CORE_SCHEMA });
```

### Dump with Custom Options
```js
const output = yaml.dump(
  { foo: 'bar', list: [1,2,3] },
  {
    indent: 4,
    sortKeys: (a,b) => a.localeCompare(b),
    styles: { '!!null':'empty' },
    lineWidth: 120,
    noRefs: true,
    forceQuotes: true
  }
);
fs.writeFileSync('out.yml', output, 'utf8');
```

## Best Practices
- Use `schema: JSON_SCHEMA` for strict JSON compatibility
- Set `skipInvalid: true` when dumping data containing functions or regexps to avoid exceptions
- Always specify `filename` in LoadOptions for meaningful error context
- Use `sortKeys` for deterministic dumps in CI pipelines

## Troubleshooting
1. Unexpected multi-doc error in `load`: use `loadAll` or disable multi-doc via `flowLevel`.
2. Invalid type during dump: set `skipInvalid: true` or remove unsupported values.
3. Long lines exceed width: adjust `lineWidth` or set `lineWidth: -1` for no limit.
4. Duplicate key error: use `json: true` to override duplicates or handle in `onWarning`.

Commands:
```bash
# Validate a YAML file
node -e "require('js-yaml').load(fs.readFileSync('file.yml','utf8'))"

# Dump an object via CLI
echo "{foo:'bar'}" | js-yaml
```

## Information Dense Extract
load(source:string,options?:{filename?:string,onWarning?:(e:YAMLException)=>void,schema?:Schema,json?:boolean}):any; loadAll(source:string,iterator?:(doc:any)=>void,options?:LoadOptions):any[]; dump(obj:any,options?:{indent?:number,noArrayIndent?:boolean,skipInvalid?:boolean,flowLevel?:number,styles?:Record<string,string>,schema?:Schema,sortKeys?:boolean|((a,b)=>number),lineWidth?:number,noRefs?:boolean,noCompatMode?:boolean,condenseFlow?:boolean,quotingType?:'"'|'\'',forceQuotes?:boolean,replacer?:(k,v)=>any}):string; DEFAULT_SCHEMA,JSON_SCHEMA,CORE_SCHEMA,FAILSAFE_SCHEMA; YAMLException extends Error; Supported tags: !!null,null; !!bool,boolean; !!int,number; !!float,number; !!binary,Buffer; !!timestamp,Date; !!omap|!!pairs,array of pairs; !!set,object; !!str,string; !!seq,array; !!map,object; CLI: js-yaml [-h|-v|-c|-t] file; common options defaults as above; best practices: set schema, skipInvalid, sortKeys; troubleshooting: use loadAll, skipInvalid, json override duplicates; commands: node -e "...", echo|js-yaml

## Sanitised Extract
Table of Contents:
1. load(source, options)
2. loadAll(source, iterator, options)
3. dump(obj, options)
4. LoadOptions parameters and defaults
5. DumpOptions parameters and defaults
6. Schemas and their definitions
7. Styles mapping table
8. Supported YAML tags and JS types
9. CLI usage and flags

1. load(source: string, options?: LoadOptions): any
   source: YAML string
   options.filename: string|null = null
   options.onWarning: (e)=>void = null
   options.schema: Schema = DEFAULT_SCHEMA
   options.json: boolean = false
   Returns first document or throws YAMLException

2. loadAll(source: string, iterator?: (doc)=>void, options?: LoadOptions): any[]
   Returns array of documents if no iterator, else applies iterator to each

3. dump(obj: any, options?: DumpOptions): string
   options.indent: number = 2
   options.noArrayIndent: boolean = false
   options.skipInvalid: boolean = false
   options.flowLevel: number = -1
   options.styles: { [tag]: string } = {}
   options.schema: Schema = DEFAULT_SCHEMA
   options.sortKeys: boolean|func = false
   options.lineWidth: number = 80
   options.noRefs: boolean = false
   options.noCompatMode: boolean = false
   options.condenseFlow: boolean = false
   options.quotingType: ''''|' = ''''
   options.forceQuotes: boolean = false
   options.replacer: func

4. Schemas:
   FAILSAFE_SCHEMA: strings, arrays, plain objects
   JSON_SCHEMA: JSON types
   CORE_SCHEMA: same as JSON_SCHEMA
   DEFAULT_SCHEMA: all YAML 1.2 tags

5. Styles table per tag as defined above

6. Supported tags with JS mappings

7. CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

## Original Source
js-yaml Configuration Library
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML Configuration and API Reference

Retrieved: 2024-06-15
Source: https://github.com/nodeca/js-yaml#readme
Data Size: 845065 bytes

# Installation
```bash
npm install js-yaml
npm install -g js-yaml    # for CLI
```

# CLI Usage
```bash
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file
```
Options:
- `-h, --help`: show help and exit
- `-v, --version`: show version and exit
- `-c, --compact`: compact error display
- `-t, --trace`: show stack trace on error

# Module Import
```js
const yaml = require('js-yaml');
const fs   = require('fs');
```

# API Methods

## load(string [ , options ])
Parses a single YAML document.
Signature:
```ts
yaml.load(source: string, options?: LoadOptions): any
```
Returns: object|string|number|null|undefined
Throws: YAMLException on error or multi-document input

LoadOptions:
- filename: string|null = null
- onWarning: (e: YAMLException) => void|null = null
- schema: Schema = DEFAULT_SCHEMA
- json: boolean = false

Schemas:
- FAILSAFE_SCHEMA
- JSON_SCHEMA
- CORE_SCHEMA
- DEFAULT_SCHEMA

## loadAll(string [, iterator] [, options])
Parses multi-document YAML.
Signature:
```ts
yaml.loadAll(source: string, iterator?: (doc: any) => void, options?: LoadOptions): any[]
```
Returns: any[] if no iterator; applies iterator(doc) for each document
Throws: YAMLException on parse errors

## dump(object [ , options ])
Serializes JavaScript value to YAML.
Signature:
```ts
yaml.dump(obj: any, options?: DumpOptions): string
```
Returns: YAML string

DumpOptions:
- indent: number = 2
- noArrayIndent: boolean = false
- skipInvalid: boolean = false
- flowLevel: number = -1
- styles: { [tag: string]: string } = {}
- schema: Schema = DEFAULT_SCHEMA
- sortKeys: boolean|((a,b)=>number) = false
- lineWidth: number = 80
- noRefs: boolean = false
- noCompatMode: boolean = false
- condenseFlow: boolean = false
- quotingType: '\''|" = '\''
- forceQuotes: boolean = false
- replacer: (key: any, value: any) => any

# Styles Table (tag => style)
!!null: canonical|lowercase|uppercase|camelcase|empty
!!int: binary|octal|decimal|hexadecimal
!!bool: lowercase|uppercase|camelcase
!!float: lowercase|uppercase|camelcase

# Supported YAML Types
Tags to JS types:
- !!null -> null
- !!bool -> boolean
- !!int -> number
- !!float -> number
- !!binary -> Buffer
- !!timestamp -> Date
- !!omap -> [ [key,value], ... ]
- !!pairs -> [ [key,value], ... ]
- !!set -> { [key]: null }
- !!str -> string
- !!seq -> any[]
- !!map -> { [key]: any }

# Caveats
- JS objects/arrays used as keys are stringified via toString()
- Implicit block mapping key lookups not supported

# Example Code
```js
try {
  const doc = yaml.load(fs.readFileSync('example.yml','utf8'), { schema: yaml.JSON_SCHEMA });
  console.log(doc);
} catch(e) {
  console.error(e);
}

const yml = yaml.dump({ foo: 'bar', baz: [1,2,3] }, { sortKeys: true, styles: { '!!null':'canonical' } });
console.log(yml);
```

## Attribution
- Source: js-yaml Configuration Library
- URL: https://github.com/nodeca/js-yaml#readme
- License: License: MIT
- Crawl Date: 2025-05-10T03:39:37.124Z
- Data Size: 845065 bytes
- Links Found: 5457

## Retrieved
2025-05-10
library/GFM_PLUGIN.md
# library/GFM_PLUGIN.md
# GFM_PLUGIN

## Crawl Summary
Provides a markdown-it plugin that extends core parser with GitHub-Flavored Markdown features by registering parsing rules. Configure via GithubOptions to enable autolinks, user mentions, emoji shortcodes, strikethrough, tables, task lists, and wiki links. Plugin signature: function MarkdownItGithub(md: MarkdownIt, options?: GithubOptions): void. Options default to false. Install via npm or yarn and apply with md.use().

## Normalised Extract
Table of Contents
1 Installation
2 Usage
3 API Signature
4 Options Reference
5 Implementation Pattern
6 Troubleshooting

1 Installation
   npm install markdown-it markdown-it-github --save
   yarn add markdown-it markdown-it-github

2 Usage
   const md = new MarkdownIt({ html: true, linkify: false, typographer: false })
     .use(MarkdownItGithub, options)
   md.render(source)

3 API Signature
   function MarkdownItGithub(md: MarkdownIt, options?: GithubOptions): void
   interface GithubOptions {
     exclude?: RegExp[]
     autolink?: boolean
     userMention?: boolean
     emoji?: boolean
     strikethrough?: boolean
     tables?: boolean
     taskLists?: boolean
     wikiLink?: boolean
   }

4 Options Reference
   exclude: RegExp[] = []
   autolink: boolean = false
   userMention: boolean = false
   emoji: boolean = false
   strikethrough: boolean = false
   tables: boolean = false
   taskLists: boolean = false
   wikiLink: boolean = false

5 Implementation Pattern
   1. Import MarkdownIt and plugin
   2. Initialize MarkdownIt with base config
   3. Apply plugin via .use(MarkdownItGithub, options)
   4. Call md.render() on input text

6 Troubleshooting
   - Tables not parsed: enable tables option
   - Mentions not linked: enable userMention
   - Emojis missing: enable emoji or include fallback
   - Task lists static: ensure correct syntax - [ ] / - [x]


## Supplementary Details
Compatibility: Node.js >=10, markdown-it >=12. Requires UTF-8 environment for emoji. No external runtime dependencies beyond markdown-it. Ensure html option in MarkdownIt set as needed. Plugin preserves existing rules and only adds GFM ones. Rule precedence: runs after core rules. Can disable individual rules via exclude array. Optimize performance by enabling only required features.

## Reference Details
API:
  Function: MarkdownItGithub
    Parameters:
      md: MarkdownIt instance
      options?: GithubOptions
    Returns: void

GithubOptions:
  exclude?: RegExp[]          Disable specific parsing rules by RegExp matching rule names
  autolink?: boolean          Default false; when true, bare URLs are auto-linked
  userMention?: boolean       Default false; when true, @username becomes <a href="/username">@username</a>
  emoji?: boolean             Default false; when true, :emoji: replaced with Unicode emoji
  strikethrough?: boolean     Default false; when true, ~~text~~ renders <s>text</s>
  tables?: boolean            Default false; when true, GFM tables render <table>...
  taskLists?: boolean         Default false; when true, - [ ] <li class="task-list-item"> renders checkbox
  wikiLink?: boolean          Default false; when true, [[Page]] becomes <a href="/wiki/Page">Page</a>

Full Example:
```js
const md = require('markdown-it')({ html: true })
  .use(require('markdown-it-github'), {
    autolink: true,
    userMention: true,
    emoji: true,
    strikethrough: true,
    tables: true,
    taskLists: true,
    wikiLink: false
  });
const out = md.render(`Hello @octocat :rocket:`);
console.log(out);
```

Best Practices:
- Enable only needed features to minimize parser overhead.
- Use exclude to disable default core rules when overriding behavior.
- Sanitize user input when html: true.
- Combine with markdown-it-abbr or markdown-it-footnote for extended capabilities.

Troubleshooting:
Command: node example.js
Expected: <p>Hello <a href="/octocat">@octocat</a> 🚀</p>
If output escapes emoji, verify environment supports Unicode or include polyfill.
If tables remain literal, check plugin order: markdown-it-table must be applied before markdown-it-github if using custom table plugin.


## Information Dense Extract
markdown-it-github plugin extends markdown-it parser: signature MarkdownItGithub(md,options). Options: exclude(RegExp[]=[]), autolink(false), userMention(false), emoji(false), strikethrough(false), tables(false), taskLists(false), wikiLink(false). Install via npm. Usage: md.use(MarkdownItGithub,{autolink:true,userMention:true,emoji:true,strikethrough:true,tables:true,taskLists:true}). Full code examples in referenceDetails. Requires markdown-it>=12, Node.js>=10, UTF-8. Troubleshoot by verifying option flags and syntax. Best practice: enable minimal feature set, sanitize html input, use exclude to customize rule application.

## Sanitised Extract
Table of Contents
1 Installation
2 Usage
3 API Signature
4 Options Reference
5 Implementation Pattern
6 Troubleshooting

1 Installation
   npm install markdown-it markdown-it-github --save
   yarn add markdown-it markdown-it-github

2 Usage
   const md = new MarkdownIt({ html: true, linkify: false, typographer: false })
     .use(MarkdownItGithub, options)
   md.render(source)

3 API Signature
   function MarkdownItGithub(md: MarkdownIt, options?: GithubOptions): void
   interface GithubOptions {
     exclude?: RegExp[]
     autolink?: boolean
     userMention?: boolean
     emoji?: boolean
     strikethrough?: boolean
     tables?: boolean
     taskLists?: boolean
     wikiLink?: boolean
   }

4 Options Reference
   exclude: RegExp[] = []
   autolink: boolean = false
   userMention: boolean = false
   emoji: boolean = false
   strikethrough: boolean = false
   tables: boolean = false
   taskLists: boolean = false
   wikiLink: boolean = false

5 Implementation Pattern
   1. Import MarkdownIt and plugin
   2. Initialize MarkdownIt with base config
   3. Apply plugin via .use(MarkdownItGithub, options)
   4. Call md.render() on input text

6 Troubleshooting
   - Tables not parsed: enable tables option
   - Mentions not linked: enable userMention
   - Emojis missing: enable emoji or include fallback
   - Task lists static: ensure correct syntax - [ ] / - [x]

## Original Source
Markdown-it and GitHub Flavored Markdown Plugin
https://github.com/markdown-it-github/markdown-it-github#readme

## Digest of GFM_PLUGIN

# GFM Plugin for markdown-it

## Installation

Install the plugin and its peer dependency:

```bash
npm install markdown-it markdown-it-github --save
# or with yarn
yarn add markdown-it markdown-it-github
```

## Usage

Import, configure and render Markdown with GitHub Flavored extensions:

```js
const MarkdownIt = require('markdown-it');
const MarkdownItGithub = require('markdown-it-github');

const md = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: false
})
.use(MarkdownItGithub, {
  autolink: true,
  userMention: true,
  emoji: true,
  strikethrough: true,
  tables: true,
  taskLists: true,
  wikiLink: false
});

const input = `# Title

Hello @user, this is ~~deleted~~ text with :smile: and a task list:

- [ ] item one
- [x] item two

| A | B |
| - | - |
| 1 | 2 |
`;

console.log(md.render(input));
```

## API Signature

```ts
import type { MarkdownIt } from 'markdown-it';

export interface GithubOptions {
  exclude?: RegExp[];      // list of rules to disable
  autolink?: boolean;      // convert bare URLs to links (default: false)
  userMention?: boolean;   // render @username as link to /username (default: false)
  emoji?: boolean;         // enable emoji shortcuts (default: false)
  strikethrough?: boolean; // enable ~~strike~~ (default: false)
  tables?: boolean;        // enable GFM tables (default: false)
  taskLists?: boolean;     // enable GFM task lists (default: false)
  wikiLink?: boolean;      // enable [[WikiLinks]] (default: false)
}

export function MarkdownItGithub(md: MarkdownIt, options?: GithubOptions): void;
```

## Configuration Details

| Option        | Type       | Default | Effect                                     |
|---------------|------------|---------|--------------------------------------------|
| exclude       | RegExp[]   | []      | Disable matching rules                     |
| autolink      | boolean    | false   | Turn bare URLs into clickable anchors      |
| userMention   | boolean    | false   | Convert @username into GitHub profile link |
| emoji         | boolean    | false   | Replace :emoji: codes with Unicode emojis  |
| strikethrough | boolean    | false   | Render ~~text~~ as strikethrough           |
| tables        | boolean    | false   | Parse and render GFM-style tables          |
| taskLists     | boolean    | false   | Convert - [ ] and - [x] into checkboxes     |
| wikiLink      | boolean    | false   | Convert [[PageName]] into wiki links      |

## Implementation Pattern

1. Instantiate MarkdownIt with base options.
2. Apply plugin via `.use()`.
3. Pass `options` object to enable desired GFM features.
4. Call `md.render()` on source string.

## Troubleshooting

- If tables render as code blocks, ensure `tables: true` in plugin options and disable code indent detection in base config.
- For unmapped emojis, verify Node environment supports Unicode, or include `markdown-it-emoji` as fallback.
- Task lists not rendering: confirm input has space after bracket: `- [ ]` or `- [x]`.

> Retrieved on: 2024-06-24


## Attribution
- Source: Markdown-it and GitHub Flavored Markdown Plugin
- URL: https://github.com/markdown-it-github/markdown-it-github#readme
- License: License: MIT
- Crawl Date: 2025-05-10T07:57:56.572Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
library/DOTENV.md
# library/DOTENV.md
# DOTENV

## Crawl Summary
Installation commands for npm/yarn/bun; .env file format rules including multiline values and comments; Loading variables via require('dotenv').config() or import 'dotenv/config'; API functions: config(options) returning {parsed, error}, parse(source, options) returning object, populate(target, source, options), decrypt(options); Configuration options: path (string|array paths, default .env), encoding (string, default utf8), debug (boolean, default false), override (boolean, default false), processEnv (object, default process.env); Preload via CLI using node -r dotenv/config with dotenv_config_<option> flags or DOTENV_CONFIG_<OPTION> environment variables; Parsing engine rules: skip empty lines, ignore comments, maintain quoted content, expand newlines in double-quoted values; Troubleshooting via debug mode and file path verification.

## Normalised Extract
Table of Contents:
1 Installation
2 .env File Format
3 Loading Environment Variables
4 Multiline Variables
5 Comments
6 Parsing Engine
7 Preload Usage
8 Configuration Options
9 API Functions

1 Installation
   npm install dotenv --save
   yarn add dotenv
   bun add dotenv

2 .env File Format
   - Format: KEY=value
   - String values: unquoted or quoted
   - Empty values: KEY=
   - Preserve inner quotes: JSON={"foo": "bar"}

3 Loading Environment Variables
   require('dotenv').config()
   import 'dotenv/config'
   Variables exposed under process.env

4 Multiline Variables
   Native line breaks supported in double quotes
   Or use \n escapes

5 Comments
   Full-line: # comment
   Inline: KEY=value # comment
   Wrap values in quotes if containing #

6 Parsing Engine
   Function: dotenv.parse(src: Buffer|string, options?: {debug?: boolean}) => Record<string,string>
   Rules: skip blank lines, comment detection, trim unquoted values, expand newlines in double quotes, support backticks

7 Preload Usage
   CLI: node -r dotenv/config your_script.js
   Flags: dotenv_config_path, dotenv_config_encoding, dotenv_config_debug
   Env Vars: DOTENV_CONFIG_PATH, DOTENV_CONFIG_ENCODING, DOTENV_CONFIG_DEBUG

8 Configuration Options
   config(options?: {
     path?: string|string[], // default process.cwd()/.env
     encoding?: string,       // default 'utf8'
     debug?: boolean,         // default false
     override?: boolean,      // default false
     processEnv?: object      // default process.env
   }) => {parsed: Record<string,string>, error?: Error}

9 API Functions
   config(options)
   parse(src, options)
   populate(target: object, source: Record<string,string>, options?: {override?: boolean, debug?: boolean}): void
   decrypt(options): {parsed: Record<string,string>, error?: Error}

## Supplementary Details
CLI Preload Patterns:
- node -r dotenv/config script.js: auto-load .env
- dotenv_config options via dotenv_config_<option>=value flags precedence: CLI flags > ENV vars

Environment Variables for CLI:
- DOTENV_CONFIG_PATH: custom .env path
- DOTENV_CONFIG_ENCODING: latin1, utf8, etc.
- DOTENV_CONFIG_DEBUG: enable parser debug

Parsing Implementation Steps:
1 Read file using fs.readFileSync(path, {encoding})
2 Parse content with dotenv.parse(buffer, {debug})
3 Populate process.env or provided processEnv object
4 Apply override logic: skip existing unless override=true

Encryption and Sync Compatibility:
- Use external dotenvx for encrypted, multi-environment and sync workflows

## Reference Details
Function Signatures:
1 config
   Signature: config(options?: ConfigOptions) => ConfigResult
   Types:
     interface ConfigOptions {
       path?: string|string[]        // default path.resolve(process.cwd(), '.env')
       encoding?: string             // default 'utf8'
       debug?: boolean               // default false
       override?: boolean            // default false
       processEnv?: object           // default process.env
     }
     interface ConfigResult {
       parsed?: Record<string,string>
       error?: Error
     }
   Behavior: Reads file(s) at specified path(s) in order, parses each, merges into processEnv with override rules, returns parsed map or error.

2 parse
   Signature: parse(src: Buffer|string, options?: {debug?: boolean}) => Record<string,string>
   Options:
     debug: boolean // default false
   Returns: key-value map
   Errors: throws on invalid input when debug enabled

3 populate
   Signature: populate(target: object, source: Record<string,string>, options?: {override?: boolean, debug?: boolean}): void
   Options:
     override: boolean // default false
     debug: boolean    // default false
   Behavior: writes each key from source into target; skips existing keys unless override=true; logs if debug=true

4 decrypt
   Signature: decrypt(options: DecryptOptions) => ConfigResult
   Placeholder: part of dotenvx extension; not core to dotenv

Examples:
// Custom path and override
const result = require('dotenv').config({ path: ['.env.local', '.env'], override: true, debug: true })
if (result.error) throw result.error
console.log(result.parsed)

// Using parse
const buf = Buffer.from('A=1\nB=2')
const data = require('dotenv').parse(buf)
console.log(data.A, data.B)

// populate with custom object
const myEnv = {}
require('dotenv').populate(myEnv, data, {override:true})

Configuration Examples:
processEnv override:
const custom = {}
require('dotenv').config({processEnv: custom})

Troubleshooting:
1 Ensure .env exists at cwd or provided path
2 Enable debug: require('dotenv').config({debug:true}) to view parsing logs
3 For ES modules, use import 'dotenv/config'
4 For client-side builds, use webpack DefinePlugin or dotenv-webpack
5 Missing polyfills: install node-polyfill-webpack-plugin and configure

Debug Output Example:
> malformed line 1 at .env: skipping
> parsed 5 variables

Best Practices:
- Do not commit .env to VCS
- Create separate .env files per environment
- Use override sparingly
- Secure .env with git hooks or CI integration

## Information Dense Extract
dotenv.config(options?:{path?:string|string[],encoding?:string,debug?:boolean,override?:boolean,processEnv?:object}):{parsed?:Record<string,string>,error?:Error}
dotenv.parse(src:Buffer|string,options?:{debug?:boolean}):Record<string,string>
dotenv.populate(target:object,source:Record<string,string>,options?:{override?:boolean,debug?:boolean}):void
enable preload: node -r dotenv/config script.js
env flags: dotenv_config_path,dotenv_config_encoding,dotenv_config_debug or DOTENV_CONFIG_PATH,ENCODING,DEBUG
.env rules: KEY=value, support quotes, backticks, skip comments(#), expand \n in double quotes, trim unquoted
config lookup: first in process.env unless override=true then last wins
supports multiple paths array order merge
multiline via native breaks or \n escapes

## Sanitised Extract
Table of Contents:
1 Installation
2 .env File Format
3 Loading Environment Variables
4 Multiline Variables
5 Comments
6 Parsing Engine
7 Preload Usage
8 Configuration Options
9 API Functions

1 Installation
   npm install dotenv --save
   yarn add dotenv
   bun add dotenv

2 .env File Format
   - Format: KEY=value
   - String values: unquoted or quoted
   - Empty values: KEY=
   - Preserve inner quotes: JSON={'foo': 'bar'}

3 Loading Environment Variables
   require('dotenv').config()
   import 'dotenv/config'
   Variables exposed under process.env

4 Multiline Variables
   Native line breaks supported in double quotes
   Or use 'n escapes

5 Comments
   Full-line: # comment
   Inline: KEY=value # comment
   Wrap values in quotes if containing #

6 Parsing Engine
   Function: dotenv.parse(src: Buffer|string, options?: {debug?: boolean}) => Record<string,string>
   Rules: skip blank lines, comment detection, trim unquoted values, expand newlines in double quotes, support backticks

7 Preload Usage
   CLI: node -r dotenv/config your_script.js
   Flags: dotenv_config_path, dotenv_config_encoding, dotenv_config_debug
   Env Vars: DOTENV_CONFIG_PATH, DOTENV_CONFIG_ENCODING, DOTENV_CONFIG_DEBUG

8 Configuration Options
   config(options?: {
     path?: string|string[], // default process.cwd()/.env
     encoding?: string,       // default 'utf8'
     debug?: boolean,         // default false
     override?: boolean,      // default false
     processEnv?: object      // default process.env
   }) => {parsed: Record<string,string>, error?: Error}

9 API Functions
   config(options)
   parse(src, options)
   populate(target: object, source: Record<string,string>, options?: {override?: boolean, debug?: boolean}): void
   decrypt(options): {parsed: Record<string,string>, error?: Error}

## Original Source
dotenv Environment Configuration
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# Install

npm install dotenv --save

Alternatively:

yarn add dotenv
bun add dotenv

# Usage

1. Create a .env file in your project root:
   S3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEY"

2. Load at application startup:
   require('dotenv').config()
   // or for ES6:
   import 'dotenv/config'

3. Access variables via process.env:
   const bucket = process.env.S3_BUCKET

# Multiline Values

Use native line breaks (>= v15.0.0):
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...line1
...line2
-----END RSA PRIVATE KEY-----"

Or escape newlines:
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nline1\nline2\n-----END RSA PRIVATE KEY-----\n"

# Comments

- Full-line comments start with '#'.
- Inline comments supported after a space: KEY=value # comment
- Wrap values in quotes if they contain '#'.

# Parsing Engine

Import parse:
const dotenv = require('dotenv')
const buf = Buffer.from('KEY=value')
const parsed = dotenv.parse(buf, {debug:true}) // returns {KEY: 'value'}

Options:
- debug (boolean): false by default, logs malformed lines.

# Preload CLI

$ node -r dotenv/config your_script.js

Supported CLI env vars and flags:
- dotenv_config_path: custom .env path
- dotenv_config_encoding: file encoding (default utf8)
- dotenv_config_debug: enable debug
Examples:
$ node -r dotenv/config script.js dotenv_config_path=/custom/.env dotenv_config_debug=true
$ DOTENV_CONFIG_PATH=/custom/.env DOTENV_CONFIG_DEBUG=true node -r dotenv/config script.js


## Attribution
- Source: dotenv Environment Configuration
- URL: https://github.com/motdotla/dotenv#readme
- License: License: BSD-2-Clause
- Crawl Date: 2025-05-10T05:33:34.982Z
- Data Size: 638828 bytes
- Links Found: 4987

## Retrieved
2025-05-10
library/CLI_PROGRESS.md
# library/CLI_PROGRESS.md
# CLI_PROGRESS

## Crawl Summary
Installation via npm install cli-progress. SingleBar and MultiBar classes provide progress bars. Options interface keys: format (string, default '{bar} {percentage}% | ETA: {eta}s'), barCompleteChar ('█'), barIncompleteChar ('░'), barGlue ('█'), barsize (40), fps (12), stream (process.stdout), autopadding (true), linewrap (true), hideCursor (true). SingleBar methods: start(total:number, startValue?:number, payload?:any), increment(step?:number, payload?:any), update(current:number, payload?:any), stop(). MultiBar methods: create(total:number, startValue?:number, payload?:any, options?:Options, preset?:Preset): SingleBar, stop():Promise<void>. Presets: shades_classic, shades_grey, legacy. Placeholders: bar, percentage, total, value, eta, duration, barsize, payload. Supports payload injection.

## Normalised Extract
Table of Contents
1 Installation Command
2 Options Interface and Defaults
3 SingleBar Class Methods
4 MultiBar Class Methods
5 Presets Definitions
6 Format String Placeholders

1 Installation Command
npm install cli-progress

2 Options Interface and Defaults
format: string Default '{bar} {percentage}% | ETA: {eta}s'
barCompleteChar: string Default '█'
barIncompleteChar: string Default '░'
barGlue: string Default '█'
barsize: number Default 40
fps: number Default 12
stream: WritableStream Default process.stdout
autopadding: boolean Default true
linewrap: boolean Default true
hideCursor: boolean Default true

3 SingleBar Class Methods
Constructor(options?: Options, preset?: Preset)
start(total: number, startValue?: number, payload?: any): void
increment(step?: number, payload?: any): void
update(current: number, payload?: any): void
stop(): void

4 MultiBar Class Methods
Constructor(options?: Options, preset?: Preset)
create(total: number, startValue?: number, payload?: any, options?: Options, preset?: Preset): SingleBar
stop(): Promise<void>

5 Presets Definitions
shades_classic
shades_grey
legacy

6 Format String Placeholders
bar: renders bar chart
percentage: completion percentage
total: total value
value: current value
eta: estimated time to completion in seconds
duration: elapsed time in seconds
barsize: size of bar in characters
payload.<key>: user-defined data insertion

## Supplementary Details
Supports CommonJS and ESM. Node.js >=8. ESM import: import { SingleBar, MultiBar, Presets } from 'cli-progress'. Payload object merged into formatting context. MultiBar maintains aligned display across multiple bars. Use stop() or promise resolution to ensure cursor resets. Autopadding aligns numbers dynamically. hideCursor toggles terminal cursor visibility via process.stdout.write('\u001B[?25l') and '\u001B[?25h'.

## Reference Details
Class SingleBar
Signature:
new SingleBar(options?: Options, preset?: Preset)
Parameters:
options: Options interface (see below)
preset: Preset object from Presets

Methods:
start(total: number, startValue?: number, payload?: any): void
- total: target number
- startValue: initial progress (default 0)
- payload: object merged into placeholders

increment(step?: number, payload?: any): void
- step: increment amount (default 1)
- payload: updated payload

update(current: number, payload?: any): void
- current: set progress value
- payload: updated payload

stop(): void
- stops timer and renders 100%

Class MultiBar
Signature:
new MultiBar(options?: Options, preset?: Preset)
Methods:
create(total: number, startValue?: number, payload?: any, options?: Options, preset?: Preset): SingleBar
- creates new SingleBar under multi-control
stop(): Promise<void>
- stops all bars, returns when done

Options Interface
format: string Default '{bar} {percentage}% | ETA: {eta}s'
barCompleteChar: string Default '█'
barIncompleteChar: string Default '░'
barGlue: string Default '█'
barsize: number Default 40
fps: number Default 12
stream: WritableStream Default process.stdout
autopadding: boolean Default true
linewrap: boolean Default true
hideCursor: boolean Default true

Presets
Presets.shades_classic:
{ barCompleteChar: '█', barIncompleteChar: '░', barGlue: '█', barsize: 40, autopadding: true }
Presets.shades_grey:
{ barCompleteChar: '#', barIncompleteChar: '-', barGlue: '#', barsize: 40, autopadding: true }
Presets.legacy:
{ barCompleteChar: '=', barIncompleteChar: ' ', barGlue: '=', barsize: 20, autopadding: false }

Examples
```js
import { SingleBar, Presets } from 'cli-progress';
const bar = new SingleBar({ format: 'Progress |{bar}| {percentage}% ' }, Presets.shades_classic);
bar.start(100, 0);
for(let i=0;i<=100;i++){ bar.update(i); }
bar.stop();
```

Best Practices
Always call stop() or await multi.stop() to reset cursor. Use payload for custom placeholders. For parallel tasks, use MultiBar.create().

Troubleshooting
Symptoms: bar not rendering or stuck
Command: console.log(process.stdout.isTTY) // must be true
Fix: ensure stream is TTY or set options.stream explicitly

If cursor remains hidden:
Command: process.stdout.write('\u001B[?25h')

## Information Dense Extract
npm install cli-progress; import { SingleBar, MultiBar, Presets } from 'cli-progress'; Options{format:string='%7{bar}% {percentage}% | ETA:{eta}s',barCompleteChar:string='█',barIncompleteChar:string='░',barGlue:string='█',barsize:number=40,fps:number=12,stream:WritableStream=process.stdout,autopadding:boolean=true,linewrap:boolean=true,hideCursor:boolean=true}; class SingleBar{start(total:number,startValue?:number=0,payload?:any):void;increment(step?:number=1,payload?:any):void;update(current:number,payload?:any):void;stop():void}; class MultiBar{create(total:number,startValue?:number=0,payload?:any,options?:Options,preset?:Preset):SingleBar;stop():Promise<void>}; Presets:shades_classic,shades_grey,legacy; Placeholders:{bar,percentage,total,value,eta,duration,barsize,payload.<key>}. CommonJS require('cli-progress'). Troubleshooting: ensure TTY, reset cursor with '\u001B[?25h'.

## Sanitised Extract
Table of Contents
1 Installation Command
2 Options Interface and Defaults
3 SingleBar Class Methods
4 MultiBar Class Methods
5 Presets Definitions
6 Format String Placeholders

1 Installation Command
npm install cli-progress

2 Options Interface and Defaults
format: string Default '{bar} {percentage}% | ETA: {eta}s'
barCompleteChar: string Default ''
barIncompleteChar: string Default ''
barGlue: string Default ''
barsize: number Default 40
fps: number Default 12
stream: WritableStream Default process.stdout
autopadding: boolean Default true
linewrap: boolean Default true
hideCursor: boolean Default true

3 SingleBar Class Methods
Constructor(options?: Options, preset?: Preset)
start(total: number, startValue?: number, payload?: any): void
increment(step?: number, payload?: any): void
update(current: number, payload?: any): void
stop(): void

4 MultiBar Class Methods
Constructor(options?: Options, preset?: Preset)
create(total: number, startValue?: number, payload?: any, options?: Options, preset?: Preset): SingleBar
stop(): Promise<void>

5 Presets Definitions
shades_classic
shades_grey
legacy

6 Format String Placeholders
bar: renders bar chart
percentage: completion percentage
total: total value
value: current value
eta: estimated time to completion in seconds
duration: elapsed time in seconds
barsize: size of bar in characters
payload.<key>: user-defined data insertion

## Original Source
cli-progress Library
https://github.com/cli-progress/cli-progress#readme

## Digest of CLI_PROGRESS

# CLI Progress

## Installation
```bash
npm install cli-progress
```

## SingleBar Class
```ts
new SingleBar(options?: Options, preset?: Preset)
```

### Methods
```ts
start(total: number, startValue?: number, payload?: any): void
increment(step?: number, payload?: any): void
update(current: number, payload?: any): void
stop(): void
```  

## MultiBar Class
```ts
new MultiBar(options?: Options, preset?: Preset)
```  

### Methods
```ts
create(total: number, startValue?: number, payload?: any, options?: Options, preset?: Preset): SingleBar
stop(): Promise<void>
```  

## Options Interface
```ts
interface Options {
  format?: string        // Default: '{bar} {percentage}% | ETA: {eta}s'
  barCompleteChar?: string  // Default: '█'
  barIncompleteChar?: string // Default: '░'
  barGlue?: string         // Default: '█'
  barsize?: number         // Default: 40
  fps?: number             // Default: 12
  stream?: NodeJS.WritableStream // Default: process.stdout
  autopadding?: boolean    // Default: true
  linewrap?: boolean       // Default: true
  hideCursor?: boolean     // Default: true
}
```  

## Presets
- shades_classic
- shades_grey
- legacy

Use:
```js
const preset = cliProgress.Presets.shades_classic;
```  

## Placeholders
- {bar}
- {percentage}
- {total}
- {value}
- {eta}
- {duration}
- {barsize}
- {payload.<key>}


## Attribution
- Source: cli-progress Library
- URL: https://github.com/cli-progress/cli-progress#readme
- License: License: MIT
- Crawl Date: 2025-05-10T07:29:52.916Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
library/EXPOSITION_FORMATS.md
# library/EXPOSITION_FORMATS.md
# EXPOSITION_FORMATS

## Crawl Summary
Inception April 2014; HTTP text-based exposition format; UTF-8, LF; Content-Type text/plain; version=0.0.4; optional gzip; line- oriented; HELP and TYPE directives; EBNF for samples; float values, NaN/+Inf/-Inf; timestamp ms since epoch; grouping rules; histogram and summary mapping (sum/count/buckets/quantiles); OpenMetrics superset (v2.23.0); Exemplars (v2.26.0 flag); Protobuf experimental flags (native-histograms, created-timestamp-zero-ingestion); legacy formats in client_model repo.

## Normalised Extract
Table of Contents
1 Basic Info
2 Text Format Specification
3 Sample Line EBNF
4 Grouping & Sorting
5 Histograms & Summaries Conventions
6 Text Format Example
7 OpenMetrics Text Format
8 Exemplars (Experimental)
9 Protobuf Format Flags
10 Historical Versions

1 Basic Info
Inception: April 2014
Supported in Prometheus ≥ 0.4.0
HTTP Transmission, UTF-8 encoding, LF line endings
Content-Type: text/plain; version=0.0.4
Optional gzip compression
Primitives: counter, gauge, histogram, summary, untyped

2 Text Format Specification
Lines separated by '\n'; last line must end with '\n'; empty lines ignored
Tokens separated by blanks/tabs; whitespace trimmed
Comments start with '#'; only HELP or TYPE directives processed

3 Sample Line EBNF
metric_name [ '{' label_name '=' '"' label_value '"' { ',' label_name '=' '"' label_value '"' } [ ',' ] '}' ] value [ timestamp ]
label_value escapes: '\\', '"', '\n'
value: Go ParseFloat syntax; NaN, +Inf, -Inf allowed
timestamp: int64 ms since epoch via Go ParseInt

4 Grouping & Sorting
Group by metric_name, directives (HELP/TYPE) first; unique label sets; reproducible sorting recommended

5 Histograms & Summaries Conventions
x_sum → sum sample
x_count → count sample
summary quantiles: x{quantile="q"}
histogram buckets: x_bucket{le="u"}; include le="+Inf"=x_count; ordered by u

6 Text Format Example
# HELP http_requests_total Total HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method="post",code="200"} 1027 1395066363000
minimal_metric 12.47

7 OpenMetrics Text Format
Superset; v2.23.0; Content-Type application/openmetrics-text; version=1.0.0

8 Exemplars (Experimental)
Flag: --enable-feature=exemplar-storage (≥ 2.26.0)
Syntax: metric{...} value # {exemplar="<traceID>"}

9 Protobuf Format Flags
native-histograms (≥ 2.40.0)
created-timestamp-zero-ingestion (≥ 2.50.0)

10 Historical Versions
Legacy format in prometheus/client_model repo

## Supplementary Details
Content-Type negotiation: server sets 'Content-Type: text/plain; version=0.0.4; charset=UTF-8'.
Accept header optional; client uses GET /metrics.
Enable gzip: add 'Content-Encoding: gzip' header on response and compress payload.
Enable Exemplars: start Prometheus with '--enable-feature=exemplar-storage'.
Labels: ASCII alphanumeric, '_', ':'; first char [a-zA-Z_].
HELP escape: '\\'→'\\\\'; '\n'→'\\n'.
Value parsing: via Go strconv.ParseFloat(bitSize=64).
Timestamp parse: strconv.ParseInt(base=10, bitSize=64).
OpenMetrics Content-Type: 'application/openmetrics-text; version=1.0.0; charset=UTF-8'.
Protobuf endpoint: GET /metrics/protobuf when experimental features enabled.


## Reference Details
HTTP Exposition Endpoint
--
Request: GET /metrics
Response headers:
  Content-Type: text/plain; version=0.0.4; charset=UTF-8
  Content-Encoding: gzip (if enabled)
Status: 200

cURL Example:
  curl -H 'Accept: text/plain; version=0.0.4' http://localhost:9090/metrics

Best Practices
--
• Group metrics by type and label set for efficient ingestion.
• Include HELP and TYPE directives before samples.
• Sort metrics lexicographically by name and labels when cost permits.
• Always include le="+Inf" bucket for histograms.

Troubleshooting
--
Symptom: Missing TYPE lines lead to untyped metrics.
Check: Ensure '# TYPE <metric> <type>' appears before samples.

Symptom: Invalid label escapes.
Check: Backslashes and quotes must be escaped in HELP and sample lines.

Symptom: No metrics returned via curl.
Command: curl -v http://localhost:9090/metrics
Expect: HTTP/1.1 200 OK with correct Content-Type.


SDK Integration Pattern
--
1. Instrument code to collect values.
2. Expose '/metrics' HTTP handler returning exposition format.
3. Use client library to format samples per syntax.
4. Configure Prometheus scrape job targeting '/metrics'.


## Information Dense Extract
Prometheus text format: HTTP GET /metrics, Content-Type text/plain; version=0.0.4; UTF-8, LF. Lines: '\n'-terminated; blank ignored; tokens whitespace-delimited. Comments '#' only HELP/TYPE processed: HELP <name> <UTF-8 docstring> (escape \\ → \\\\, \n → \\n); TYPE <name> <counter|gauge|histogram|summary|untyped>. Sample: metric [ {k="v"…} ] value [timestamp ms]. value as Go ParseFloat; timestamp as Go ParseInt. Group HELP/TYPE then samples; unique metric+labels; optional sorting. Histogram: x_sum, x_count, x_bucket{le="…"}, include +Inf bucket; Summary: x{quantile="…"}, x_sum, x_count. OpenMetrics superset v1.0.0; exemplars via --enable-feature=exemplar-storage; protobuf flags native-histograms, created-timestamp-zero-ingestion. Troubleshoot via curl -v, verify directives and escapes.

## Sanitised Extract
Table of Contents
1 Basic Info
2 Text Format Specification
3 Sample Line EBNF
4 Grouping & Sorting
5 Histograms & Summaries Conventions
6 Text Format Example
7 OpenMetrics Text Format
8 Exemplars (Experimental)
9 Protobuf Format Flags
10 Historical Versions

1 Basic Info
Inception: April 2014
Supported in Prometheus  0.4.0
HTTP Transmission, UTF-8 encoding, LF line endings
Content-Type: text/plain; version=0.0.4
Optional gzip compression
Primitives: counter, gauge, histogram, summary, untyped

2 Text Format Specification
Lines separated by ''n'; last line must end with ''n'; empty lines ignored
Tokens separated by blanks/tabs; whitespace trimmed
Comments start with '#'; only HELP or TYPE directives processed

3 Sample Line EBNF
metric_name [ '{' label_name '=' ''' label_value ''' { ',' label_name '=' ''' label_value ''' } [ ',' ] '}' ] value [ timestamp ]
label_value escapes: '''', ''', ''n'
value: Go ParseFloat syntax; NaN, +Inf, -Inf allowed
timestamp: int64 ms since epoch via Go ParseInt

4 Grouping & Sorting
Group by metric_name, directives (HELP/TYPE) first; unique label sets; reproducible sorting recommended

5 Histograms & Summaries Conventions
x_sum  sum sample
x_count  count sample
summary quantiles: x{quantile='q'}
histogram buckets: x_bucket{le='u'}; include le='+Inf'=x_count; ordered by u

6 Text Format Example
# HELP http_requests_total Total HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method='post',code='200'} 1027 1395066363000
minimal_metric 12.47

7 OpenMetrics Text Format
Superset; v2.23.0; Content-Type application/openmetrics-text; version=1.0.0

8 Exemplars (Experimental)
Flag: --enable-feature=exemplar-storage ( 2.26.0)
Syntax: metric{...} value # {exemplar='<traceID>'}

9 Protobuf Format Flags
native-histograms ( 2.40.0)
created-timestamp-zero-ingestion ( 2.50.0)

10 Historical Versions
Legacy format in prometheus/client_model repo

## Original Source
Prometheus Exposition Format
https://prometheus.io/docs/instrumenting/exposition_formats/

## Digest of EXPOSITION_FORMATS

# Exposition Formats   
Date Retrieved: 2024-06-10

## Text-based Format – Basic Info

| Aspect                   | Value                                     |
|--------------------------|-------------------------------------------|
| Inception                | April 2014                                 |
| Prometheus Support       | >= 0.4.0                                   |
| Transmission             | HTTP                                       |
| Encoding                 | UTF-8, LF (\n) line endings               |
| HTTP Content-Type        | text/plain; version=0.0.4                  |
| HTTP Content-Encoding    | gzip (optional)                            |
| Primitives               | counter, gauge, histogram, summary, untyped |

## Text Format Specification

• Lines separated by '\n'; last line must end with '\n'. Empty lines ignored.
• Tokens separated by blanks/tabs; leading/trailing whitespace ignored.

### Comments, HELP, TYPE

• Lines starting with '#' ignored unless second token is HELP or TYPE.
• HELP <metric_name> <docstring>  
  – Docstring: UTF-8; escape '\\' as '\\\\', '\n' as '\\n'.  
  – One HELP per metric.
• TYPE <metric_name> <type>  
  – Type ∈ {counter,gauge,histogram,summary,untyped}.  
  – Must appear before samples; one TYPE per metric; default untyped.

### Sample Line Syntax (EBNF)

metric_name [ '{' label_name '=' '"' label_value '"' { ',' label_name '=' '"' label_value '"' } [ ',' ] '}' ] value [ timestamp ]

• metric_name, label_name follow Prometheus naming rules.
• label_value: escape '\\' → '\\\\', '"' → '\\"', '\n' → '\\n'.
• value: float per Go ParseFloat; NaN, +Inf, -Inf allowed.
• timestamp: int64 ms since epoch per Go ParseInt.

## Grouping & Sorting

• All lines for a metric grouped; HELP/TYPE first.
• Unique metric_name + label set per line; duplication = undefined.
• Sorting optional but recommended for reproducibility.

## Histograms & Summaries Conventions

For metric x:
• x_sum → cumulative sum sample.
• x_count → sample count.
• summary quantiles: x{quantile="q"} qvalue.
• histogram buckets: x_bucket{le="u"} count; must include le="+Inf" with count = x_count.
• Buckets/quantiles in increasing order of label value.

## Text Format Example

# HELP http_requests_total Total HTTP requests.  
# TYPE http_requests_total counter  
http_requests_total{method="post",code="200"} 1027 1395066363000  
http_requests_total{method="post",code="400"} 3 1395066363000

# Minimal:  
minimal_metric 12.47

## OpenMetrics Text Format

• Superset of Prometheus format.  
• Introduced in v2.23.0.  
• HTTP Content-Type: application/openmetrics-text; version=1.0.0.

## Exemplars (Experimental)

• Requires Prometheus ≥ 2.26.0 and --enable-feature=exemplar-storage.
• Sample: metric_name{le="..."} value # {exemplar="<traceID>"}

## Protobuf Format (Deprecated/Experimental)

• Original Protobuf deprecated in v2.0.  
• Experimental re-enable via feature flags:  
  – native-histograms (≥ 2.40.0)  
  – created-timestamp-zero-ingestion (≥ 2.50.0)

## Historical Versions

• Legacy Client Data Exposition Format in prometheus/client_model repo.



## Attribution
- Source: Prometheus Exposition Format
- URL: https://prometheus.io/docs/instrumenting/exposition_formats/
- License: License: CC-BY-4.0
- Crawl Date: 2025-05-10T03:59:37.289Z
- Data Size: 25035766 bytes
- Links Found: 28452

## Retrieved
2025-05-10
library/ASSERT.md
# library/ASSERT.md
# ASSERT

## Crawl Summary
Assertion module: require('node:assert') or import 'node:assert/strict'. Strict mode methods enforce Object.is and compare prototypes, symbols, errors, lastIndex. Legacy mode uses == and ignores symbols. AssertionError(options) sets actual, expected, operator, message. CallTracker allows tracking function calls: calls(fn,exact)->wrapper, getCalls, report, reset, verify. Key methods: assert(), equal(), deepEqual(), deepStrictEqual(), throws(), rejects(), match(), doesNotMatch(), ifError(), fail().

## Normalised Extract
Table of Contents
1. Import Patterns
2. Assertion Modes
3. AssertionError Class
4. CallTracker Class
5. Synchronous Assertion Functions
6. Asynchronous Assertion Functions
7. Pattern Matching Assertions
8. Error Handling Utilities

1. Import Patterns
  ESM: import { strict as assert } from 'node:assert';
  CJS: const assert = require('node:assert').strict;

2. Assertion Modes
  Strict: all comparisons use Object.is, prototypes compared, symbol/RegExp lastIndex compared.
  Legacy: comparisons use == for primitives and deepEqual.
  Disable colors: set NO_COLOR or NODE_DISABLE_COLORS.

3. AssertionError Class
  new AssertionError({actual, expected, operator, message, stackStartFn});
  properties: actual, expected, operator, message, name='AssertionError', code='ERR_ASSERTION', generatedMessage.

4. CallTracker Class
  new CallTracker();
  calls(fn=function(){}, exact=1): wrapper -> increments count.
  getCalls(wrapper): returns [{thisArg, arguments[]}].
  report(): returns mismatches [{message, actual, expected, operator, stack}].
  reset(fn?): resets call counts.
  verify(): throws if any wrapper not called exact times.

5. Synchronous Assertion Functions
  assert(value[, message]): throws if !value.
  assert.equal(actual, expected[, message]): uses ==.
  assert.notEqual(actual, expected[, message]).
  assert.deepEqual(actual, expected[, message]): legacy deep eq.
  assert.notDeepEqual(actual, expected[, message]).
  assert.strictEqual(actual, expected[, message]): uses ===.
  assert.notStrictEqual(actual, expected[, message]).
  assert.deepStrictEqual(actual, expected[, message]): strict deep eq.
  assert.notDeepStrictEqual(actual, expected[, message]).
  assert.partialDeepStrictEqual(actual, expected[, message]): partial strict eq.
  assert.ifError(value): throws if value truthy.
  assert.fail([message])

6. Asynchronous Assertion Functions
  assert.throws(fn[, error][, message]): expects fn to throw.
  assert.doesNotThrow(fn[, error][, message]): expects no throw.
  assert.rejects(asyncFn[, error][, message]): expects promise reject.
  assert.doesNotReject(asyncFn[, error][, message]): expects promise resolve.

7. Pattern Matching Assertions
  assert.match(string, regexp[, message]).
  assert.doesNotMatch(string, regexp[, message]).

8. Error Handling Utilities
  Error cause and errors properties compared in deepEqual v22+.
  RegExp lastIndex compared in deepStrictEqual v18+.


## Supplementary Details
Module import: node:assert, node:assert/strict. CLI flags: --no-color disables diffs colors. Colors disabled via NO_COLOR or NODE_DISABLE_COLORS. For async rejects, promises must be returned or awaited. Use process.on('exit',()=>tracker.verify()) pattern for CallTracker. Deep comparisons handle circular refs, NaN, symbol keys, unwrapped objects.

Strict deep equality rules:
  Object.is for primitives, same [[Prototype]], own enumerable props, unwrapped values, unordered Map/Set, compare symbol props. WeakMap/WeakSet require same instance.
Legacy deep equality rules:
  == for primitives, ignore [[Prototype]] differences, unordered props, Map/Set, stop recursion on circular.


## Reference Details
// Import patterns
import assert from 'node:assert/strict';
const assertStrict = require('node:assert').strict;

// AssertionError
const err = new assert.AssertionError({actual:1,expected:2,operator:'strictEqual',message:'msg',stackStartFn:myFn});
// err.code === 'ERR_ASSERTION'

// CallTracker usage
import process from 'node:process';
const tracker = new assert.CallTracker();
function foo(){}
const callsFoo = tracker.calls(foo,2);
callsFoo(arg1);
// At program end:
process.on('exit',()=>tracker.verify());

// Synchronous assertions
assert(value,'message');
assert.equal(1,'1'); // legacy
assert.strictEqual(1,'1','must be identical');
assert.deepStrictEqual({a:1},{a:1});
assert.ifError(err);
assert.fail('explicit failure');

// Asynchronous assertions
await assert.rejects(Promise.reject(new Error('fail')),Error,'should reject');
await assert.doesNotReject(asyncFunc,'should resolve');
assert.throws(()=>{throw new TypeError()},TypeError,'expected type');

// Pattern matching
assert.match('abc',/^a/,'must start with a');
assert.doesNotMatch('abc',/z/,'must not contain z');

// Troubleshooting
$ node --no-warnings test.js  // suppress warnings
$ export NO_COLOR=1         // disable diff colors in assertion errors


## Information Dense Extract
import node:assert or node:assert/strict; NO_COLOR or NODE_DISABLE_COLORS disables colors. AssertionError(options){actual,expected,operator,message,stackStartFn}->name,code='ERR_ASSERTION',generatedMessage. CallTracker():calls(fn?,exact?=1)->wrapper,count++;getCalls(wrapper)->[{thisArg,arguments[]}];report()->[{message,actual,expected,operator,stack}];reset(fn?);verify()->throws if any mismatch. Strict mode=>Object.is, prototypes===, symbol keys, Map/Set unordered, RegExp lastIndex; Legacy=>== for primitives, ignore prototypes. Methods: assert(value[,msg]);equal==;notEqual;deepEqual(legacy);notDeepEqual;strictEqual===;notStrictEqual;deepStrictEqual;notDeepStrictEqual;partialDeepStrictEqual;ifError;fail;throws(fn[,err?][,msg]);doesNotThrow(fn[,err?][,msg]);rejects(asyncFn[,err?][,msg]);doesNotReject(asyncFn[,err?][,msg]);match(string,regexp);doesNotMatch(string,regexp).

## Sanitised Extract
Table of Contents
1. Import Patterns
2. Assertion Modes
3. AssertionError Class
4. CallTracker Class
5. Synchronous Assertion Functions
6. Asynchronous Assertion Functions
7. Pattern Matching Assertions
8. Error Handling Utilities

1. Import Patterns
  ESM: import { strict as assert } from 'node:assert';
  CJS: const assert = require('node:assert').strict;

2. Assertion Modes
  Strict: all comparisons use Object.is, prototypes compared, symbol/RegExp lastIndex compared.
  Legacy: comparisons use == for primitives and deepEqual.
  Disable colors: set NO_COLOR or NODE_DISABLE_COLORS.

3. AssertionError Class
  new AssertionError({actual, expected, operator, message, stackStartFn});
  properties: actual, expected, operator, message, name='AssertionError', code='ERR_ASSERTION', generatedMessage.

4. CallTracker Class
  new CallTracker();
  calls(fn=function(){}, exact=1): wrapper -> increments count.
  getCalls(wrapper): returns [{thisArg, arguments[]}].
  report(): returns mismatches [{message, actual, expected, operator, stack}].
  reset(fn?): resets call counts.
  verify(): throws if any wrapper not called exact times.

5. Synchronous Assertion Functions
  assert(value[, message]): throws if !value.
  assert.equal(actual, expected[, message]): uses ==.
  assert.notEqual(actual, expected[, message]).
  assert.deepEqual(actual, expected[, message]): legacy deep eq.
  assert.notDeepEqual(actual, expected[, message]).
  assert.strictEqual(actual, expected[, message]): uses ===.
  assert.notStrictEqual(actual, expected[, message]).
  assert.deepStrictEqual(actual, expected[, message]): strict deep eq.
  assert.notDeepStrictEqual(actual, expected[, message]).
  assert.partialDeepStrictEqual(actual, expected[, message]): partial strict eq.
  assert.ifError(value): throws if value truthy.
  assert.fail([message])

6. Asynchronous Assertion Functions
  assert.throws(fn[, error][, message]): expects fn to throw.
  assert.doesNotThrow(fn[, error][, message]): expects no throw.
  assert.rejects(asyncFn[, error][, message]): expects promise reject.
  assert.doesNotReject(asyncFn[, error][, message]): expects promise resolve.

7. Pattern Matching Assertions
  assert.match(string, regexp[, message]).
  assert.doesNotMatch(string, regexp[, message]).

8. Error Handling Utilities
  Error cause and errors properties compared in deepEqual v22+.
  RegExp lastIndex compared in deepStrictEqual v18+.

## Original Source
Node.js Platform & Performance
https://nodejs.org/api/

## Digest of ASSERT

# Overview
The node:assert module provides assertion functions for verifying invariants. Stability: 2 (Stable). Source code: lib/assert.js.

# Strict Assertion Mode
Use strict mode to enable strict comparisons and diffs.

ESM:
import { strict as assert } from 'node:assert';
CJS:
const assert = require('node:assert').strict;

# Legacy Assertion Mode
Defaults to non-strict behavior using == and == for deepEqual and equal.

ESM:
import assert from 'node:assert';
CJS:
const assert = require('node:assert');

# Classes

## Class: assert.AssertionError
Signature: new AssertionError(options)
Options:
  actual <any>
  expected <any>
  operator <string>
  message <string>
  stackStartFn <Function>
Properties on instance:
  message:string name:string code:"ERR_ASSERTION"
  actual:any expected:any operator:string generatedMessage:boolean

## Class: assert.CallTracker (Deprecated)
Signature: new CallTracker()
Methods:
  calls(fn?:Function, exact?:number): Function
  getCalls(fn:Function): Array<{ thisArg:any, arguments:any[] }>
  report(): Array<{ message:string, actual:number, expected:number, operator:string, stack:any }>
  reset(fn?:Function): void
  verify(): void

# Functions

assert(value[, message])
assert.ok(value[, message])
assert.equal(actual, expected[, message])
assert.notEqual(actual, expected[, message])
assert.deepEqual(actual, expected[, message])
assert.notDeepEqual(actual, expected[, message])
assert.deepStrictEqual(actual, expected[, message])
assert.notDeepStrictEqual(actual, expected[, message])
assert.strictEqual(actual, expected[, message])
assert.notStrictEqual(actual, expected[, message])
assert.throws(fn[, error][, message])
assert.rejects(asyncFn[, error][, message])
assert.doesNotThrow(fn[, error][, message])
assert.doesNotReject(asyncFn[, error][, message])
assert.match(string, regexp[, message])
assert.doesNotMatch(string, regexp[, message])
assert.fail([message])
assert.ifError(value)
assert.partialDeepStrictEqual(actual, expected[, message])

## Attribution
- Source: Node.js Platform & Performance
- URL: https://nodejs.org/api/
- License: License: MIT-like
- Crawl Date: 2025-05-10T00:37:39.785Z
- Data Size: 3330921 bytes
- Links Found: 1076

## Retrieved
2025-05-10
library/BBP_ALGORITHM.md
# library/BBP_ALGORITHM.md
# BBP_ALGORITHM

## Crawl Summary
BBP provides a formula for π and a spigot algorithm for the nth hexadecimal digit without preceding digits. Core definitions: P(s,b,m,A) series notation, original BBP formula, equivalent polynomial ratio form. Digit-extraction: split sums at n, multiply by 16^n, apply modular reduction per term using modular exponentiation, compute four partial sums Σ1–Σ4, combine with weights (4,−2,−1,−1), extract fractional part to obtain the hex digit. Complexity O(n log n).

## Normalised Extract
Table of Contents:
1  P Function Definition
2  Original BBP Formula
3  Polynomial Ratio Form
4  Digit-Extraction Algorithm
5  Modular Exponentiation Implementation
6  Series Combination and Weights
7  Algorithmic Complexity

1  P Function Definition
   s: integer exponent
   b: integer base ≥2
   m: term count per k
   A: integer vector of length m
   P(s,b,m,A)=Σ_{k=0}∞ 1/b^k Σ_{j=1}^m A[j]/(m·k+j)^s

2  Original BBP Formula
   π=Σ_{k=0}∞ 1/16^k(4/(8k+1)−2/(8k+4)−1/(8k+5)−1/(8k+6))
   Equivalent: π=P(1,16,8,(4,0,0,−2,−1,−1,0,0))

3  Polynomial Ratio Form
   Numerator: 120k^2+151k+47
   Denominator: 512k^4+1024k^3+712k^2+194k+15
   π=Σ 1/16^k · [Numerator/Denominator]

4  Digit-Extraction Algorithm
   Input: n (digit index)
   For each j in {1,4,5,6}:
     Σ_j=Σ_{k=0}^n (16^(n−k) mod (8k+j))/(8k+j) + Σ_{k=n+1}∞ 16^(n−k)/(8k+j)
   Combine: S=4Σ_1−2Σ_4−Σ_5−Σ_6
   Digit = floor(frac(S)*16)

5  Modular Exponentiation Implementation
   Function modPow(base,exp,mod):
     result=1
     while exp>0:
       if exp&1: result=(result*base)%mod
       base=(base*base)%mod
       exp>>=1
     return result

6  Series Combination and Weights
   Weights: [4,−2,−1,−1] correspond to j offset [1,4,5,6]
   Convergent tail computed until term<eps

7  Algorithmic Complexity
   Time: O(n log n) due to modular exponentiation per k
   Space: O(1)


## Supplementary Details
Default parameters: n: zero-based hex digit index; use BigInt or 64-bit integer for modular operations; machine epsilon ~1e−15 for tail sum cutoff. Implementation steps:
1  Allocate four running totals as double precision floats.
2  Loop k from 0 to n:
   for each j in [1,4,5,6]:
     d=8*k+j
     term=(modPow(16,n−k,d))/d
     add weight[j]*term to running total[j]
3  Loop k from n+1 until term<epsilon:
   for each j:
     d=8*k+j
     term=16^(n−k)/d
     add weight[j]*term
4  Compute S=4*t1−2*t4−t5−t6; frac=S−floor(S)
5  Return floor(frac*16)

Language-specific notes:
- In JS use Number for floats, BigInt for modPow
- In C use uint64_t or __int128 for modular operations
- Precision: tail loop until term<1e−17 to guarantee one hex-digit accuracy


## Reference Details
JavaScript Implementation Example:

function modPow(base, exp, mod) {
  let result = 1n;
  let b = BigInt(base);
  let e = BigInt(exp);
  let m = BigInt(mod);
  while (e > 0n) {
    if (e & 1n) result = (result * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return result;
}

function bbpHexDigit(n) {
  const weights = {1:4,4:-2,5:-1,6:-1};
  let sum = 0;
  const eps = 1e-17;
  // partial sums k=0..n
  for (let j of [1,4,5,6]) {
    let s = 0;
    for (let k = 0; k <= n; k++) {
      const d = 8*k + j;
      const t = Number(modPow(16, n - k, d)) / d;
      s += t;
    }
    // tail k=n+1..∞
    let k = n + 1;
    while (true) {
      const d = 8*k + j;
      const t = Math.pow(16, n - k) / d;
      if (t < eps) break;
      s += t;
      k++;
    }
    sum += weights[j] * s;
  }
  const frac = sum - Math.floor(sum);
  return Math.floor(frac * 16);
}

Usage:
console.log(bbpHexDigit(0).toString(16)); // expected '3'
console.log(bbpHexDigit(1).toString(16)); // expected '2'

Best Practices:
- Use BigInt for modPow to avoid overflow
- Precompute 16^(n-k) mod d inside loop to minimize operations
- Use tail cutoff eps=1e−17 for double precision

Troubleshooting:
$ node test_bbp.js
// should output
3
2

If wrong digit, verify modPow and tail loops, check epsilon lowering to 1e−20

## Information Dense Extract
π=Σ_{k=0}∞1/16^k(4/(8k+1)−2/(8k+4)−1/(8k+5)−1/(8k+6))
P(s,b,m,A)=Σ_{k=0}∞1/b^kΣ_{j=1}^mA[j]/(mk+j)^s
bbpHexDigit(n): sum_j∈{1,4,5,6}weights[j]*(Σ_{k=0}^n(modPow(16,n-k,8k+j))/(8k+j)+Σ_{k=n+1..∞}16^(n-k)/(8k+j)), frac(sum), digit=floor(frac*16)
modPow(b,e,m): result=1; while e>0: if e&1: result=(result*b)%m; b=(b*b)%m; e>>=1
Time O(n log n), Space O(1)

## Sanitised Extract
Table of Contents:
1  P Function Definition
2  Original BBP Formula
3  Polynomial Ratio Form
4  Digit-Extraction Algorithm
5  Modular Exponentiation Implementation
6  Series Combination and Weights
7  Algorithmic Complexity

1  P Function Definition
   s: integer exponent
   b: integer base 2
   m: term count per k
   A: integer vector of length m
   P(s,b,m,A)=_{k=0} 1/b^k _{j=1}^m A[j]/(mk+j)^s

2  Original BBP Formula
   =_{k=0} 1/16^k(4/(8k+1)2/(8k+4)1/(8k+5)1/(8k+6))
   Equivalent: =P(1,16,8,(4,0,0,2,1,1,0,0))

3  Polynomial Ratio Form
   Numerator: 120k^2+151k+47
   Denominator: 512k^4+1024k^3+712k^2+194k+15
   = 1/16^k  [Numerator/Denominator]

4  Digit-Extraction Algorithm
   Input: n (digit index)
   For each j in {1,4,5,6}:
     _j=_{k=0}^n (16^(nk) mod (8k+j))/(8k+j) + _{k=n+1} 16^(nk)/(8k+j)
   Combine: S=4_12_4_5_6
   Digit = floor(frac(S)*16)

5  Modular Exponentiation Implementation
   Function modPow(base,exp,mod):
     result=1
     while exp>0:
       if exp&1: result=(result*base)%mod
       base=(base*base)%mod
       exp>>=1
     return result

6  Series Combination and Weights
   Weights: [4,2,1,1] correspond to j offset [1,4,5,6]
   Convergent tail computed until term<eps

7  Algorithmic Complexity
   Time: O(n log n) due to modular exponentiation per k
   Space: O(1)

## Original Source
π Computation Algorithms
https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula

## Digest of BBP_ALGORITHM

# BBP Formula

π = Σ_{k=0}∞ 1/16^k (4/(8k+1) − 2/(8k+4) − 1/(8k+5) − 1/(8k+6))

# P Function

Definition:
P(s, b, m, A) = Σ_{k=0}∞ 1/b^k Σ_{j=1}^m a_j/(m·k + j)^s

# Digit Extraction Algorithm for Hexadecimal π Digit

1. Rewrite π as four separate series:
   Σ1 = Σ_{k=0}∞ 1/(16^k (8k+1)), Σ2 = Σ_{k=0}∞ 1/(16^k (8k+4)), Σ3 = Σ_{k=0}∞ 1/(16^k (8k+5)), Σ4 = Σ_{k=0}∞ 1/(16^k (8k+6)).
2. For target digit index n (≥0), split each Σ at k=n, multiply entire sum by 16^n.
3. First part: k=0..n terms produce integer+fractional; remove integer part by reducing each term modulo (8k+j).
4. Compute modular exponentiation 16^(n−k) mod (8k+j) in same loop as summation.
5. Second part: k=n+1..∞ converges rapidly; compute until terms fall below machine epsilon.
6. Combine: DigitValue = fractional_part(4·Σ1 − 2·Σ2 − Σ3 − Σ4) · 16; take integer part.

# Modular Exponentiation

Implement 16^(n−k) mod d with exponentiation by squaring at each summation iteration to maintain small intermediate values.

# Complexity

Time: O(n log n), Space: O(1).

---

Source: Wikipedia Bailey–Borwein–Plouffe formula, retrieved 2024-06-20
Data Size: 8412954 bytes | Links Found: 27903

## Attribution
- Source: π Computation Algorithms
- URL: https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-05-10T05:58:18.034Z
- Data Size: 8412954 bytes
- Links Found: 27903

## Retrieved
2025-05-10
library/HIGH_PRECISION_PI.md
# library/HIGH_PRECISION_PI.md
# HIGH_PRECISION_PI

## Crawl Summary
Chudnovsky high-precision π: 1/π = 12 Σ (-1)^k (6k)! (545140134k+13591409)/( (3k)! (k!)^3 640320^(3k+3/2) ), with s1A(k)=C(2k,k)C(3k,k)C(6k,3k). Convergence adds ~14 digits per term. Key constants: A=545140134, B=13591409, C=262537412640768000.

## Normalised Extract
Table of Contents:
1. Sequence Definition
2. Chudnovsky Series Formula
3. Numeric Constants
4. Convergence Rate

1. Sequence Definition
s1A(k) = C(2k,k) · C(3k,k) · C(6k,3k)
where C(n,k) = n!/(k!·(n-k)!)

2. Chudnovsky Series Formula
1/π = 12 · Σ_{k=0..∞} (-1)^k · s1A(k) · (A·k + B) / (C^(k+1/2))

3. Numeric Constants
A = 545140134
B = 13591409
C = 640320^3 = 262537412640768000

4. Convergence Rate
Each term adds ~14 decimal digits; use N terms for ~14N digits of π.

## Supplementary Details
Required precision: set arbitrary-precision library precision >= desired_digits + 10 guard digits.
Cache factorials: factorials[0]=1; factorials[n]=n·factorials[n-1]
Use binary splitting:
binarySplit(a,b): if b-a==1 return P=(6a-5)(2a-1)(6a-1), Q=a^3·C, T=P·(A·a+B); else split mid=(a+b)//2; left=binarySplit(a,mid); right=binarySplit(mid,b); return P=left.P·right.P; Q=left.Q·right.Q; T=right.Q·left.T + left.P·right.T
Compute sumTerm = T/Q; π = 1/(12·sumTerm)


## Reference Details
// Full implementation in JS with Decimal.js

// Configure precision and rounding
Decimal.set({ precision: desiredDigits + 10, rounding: Decimal.ROUND_FLOOR });

// Compute π using Chudnovsky algorithm
function computePi(desiredDigits) {
  const D = new Decimal(desiredDigits + 10);
  const A = new Decimal(545140134);
  const B = new Decimal(13591409);
  const C = new Decimal(262537412640768000);

  function binarySplit(a, b) {
    if (b.minus(a).equals(1)) {
      const k = a;
      const P = new Decimal(6).mul(k).minus(5).mul(new Decimal(2).mul(k).minus(1)).mul(new Decimal(6).mul(k).minus(1));
      const Q = k.pow(3).mul(C);
      const T = P.mul(A.mul(k).plus(B));
      return { P, Q, T };
    }
    const m = a.plus(b).div(2).floor();
    const L = binarySplit(a, m);
    const R = binarySplit(m, b);
    return {
      P: L.P.mul(R.P),
      Q: L.Q.mul(R.Q),
      T: R.Q.mul(L.T).plus(L.P.mul(R.T))
    };
  }

  const terms = Math.ceil(desiredDigits / 14) + 1;
  const { T, Q } = binarySplit(new Decimal(0), new Decimal(terms));
  const sum = T.div(Q);
  const oneOverPi = sum.mul(12);
  return oneOverPi.pow(-1);
}

// Usage example
const pi = computePi(1000);
console.log(pi.toString());

// Troubleshooting:
// Error: Precision too low (last digits incorrect) => increase precision guard digits.
// Unexpected NaN => check factorial overflow, ensure Decimal.set precision is high enough.


## Information Dense Extract
s1A(k)=C(2k,k)C(3k,k)C(6k,3k); 1/π=12Σ_{k=0..∞}(-1)^k s1A(k)(545140134k+13591409)/(640320^(3k+3/2)); precision guard=+10; terms≈digits/14+1; use binary splitting: P,Q,T recurrence; π=1/(12·T/Q).

## Sanitised Extract
Table of Contents:
1. Sequence Definition
2. Chudnovsky Series Formula
3. Numeric Constants
4. Convergence Rate

1. Sequence Definition
s1A(k) = C(2k,k)  C(3k,k)  C(6k,3k)
where C(n,k) = n!/(k!(n-k)!)

2. Chudnovsky Series Formula
1/ = 12  _{k=0..} (-1)^k  s1A(k)  (Ak + B) / (C^(k+1/2))

3. Numeric Constants
A = 545140134
B = 13591409
C = 640320^3 = 262537412640768000

4. Convergence Rate
Each term adds ~14 decimal digits; use N terms for ~14N digits of .

## Original Source
High-Precision π Calculation Algorithms
https://en.wikipedia.org/wiki/Ramanujan–Sato_series

## Digest of HIGH_PRECISION_PI

# High-Precision π Calculation Algorithms
Date Retrieved: 2024-06-15
Source: Wikipedia Ramanujan–Sato series
Data Size: 22288164 bytes

## 1. Chudnovsky Formula (Level 1A)
**Series Definition**
1/π = 12 ∑_{k=0..∞} (-1)^k (6k)!·(545140134·k + 13591409) / ((3k)!·(k!)^3 · 640320^(3k+3/2))

**Sequence s1A(k)**
s1A(k) = C(2k,k)·C(3k,k)·C(6k,3k)

**Numeric Parameters**
A = 545140134
B = 13591409
C = 640320^3 = 262537412640768000

## 2. Auxiliary Sequences
**Binomial Definitions**
C(n,k) = n!/(k!·(n−k)!)

## 3. Convergence and Precision
Converges quadratically: each additional term adds ~14 digits.

## 4. Fundamental Unit Calculations
U_n definitions for higher-level formulas (not required for Chudnovsky).


## Attribution
- Source: High-Precision π Calculation Algorithms
- URL: https://en.wikipedia.org/wiki/Ramanujan–Sato_series
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-05-10T09:33:06.483Z
- Data Size: 22288164 bytes
- Links Found: 22533

## Retrieved
2025-05-10
