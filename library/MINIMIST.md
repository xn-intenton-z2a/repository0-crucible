# MINIMIST

## Crawl Summary
parseArgs signature parseArgs(args: string[], opts?: MinimistOptions): MinimistParsedArgs; opts.string:string|string[]; opts.boolean:boolean|string|string[] or true; opts.alias:Record<string,string|string[]>; opts.default:Record<string,any>; opts.stopEarly:boolean; opts['--']:boolean; opts.unknown:(string)=>boolean; parsed result contains _ array, optional '--' array, and properties typed as number, string or boolean; numeric auto conversion; prototype pollution fixed in >=1.2.6.

## Normalised Extract
Table of Contents
1 Method Signature
2 Parsing Rules
3 Option Definitions
4 Example Usages

1 Method Signature
parseArgs(args, opts)
args: array of strings
opts: object with keys string, boolean, alias, default, stopEarly, '--', unknown
returns object with keys _ (array of non-options), optional '--', and parsed options

2 Parsing Rules
a) Numeric auto conversion: convert 0-9 characters to number unless overridden
b) Strings: any name in opts.string always string
c) Booleans: any name in opts.boolean always boolean; if opts.boolean===true then all double-hyphen no-equals args are true
d) Aliases: map names and populate both primary and alias keys
e) Defaults: missing options take opts.default values
f) stopEarly: when true, on first non-hyphen argument, push rest into _ and stop
g) '--': when true, split arguments at first '--', assign before to _, after to '--'
h) unknown: invoked per unknown option; returning false excludes the option

3 Option Definitions
opts.string: string or array of strings. Always treat specified names as strings
opts.boolean: boolean or string or array. true means treat all double-hyphened no-equals as boolean. Specified names as boolean
opts.alias: map key to string or array of strings for alternate names
table alias mapping: both original and aliases reference same value
opts.default: map key to default value used when omitted
opts.stopEarly: boolean, default false
opts['--']: boolean, default false
opts.unknown: callback, return false to skip unknown

4 Example Usages
node script.js -x 3 --name=alice foo bar
results in x:3 name:'alice' _: ['foo','bar']
with opts.string:['x'], x remains '3'
with opts.boolean:true, any '--flag' yields flag:true
fn = require('minimist'); argv=fn(args, {alias:{v:['version']}, default:{v:1}, '--':true})

## Supplementary Details
Parameter Types
- args: string[] required
- opts.string: string|string[] default []
- opts.boolean: boolean|string|string[] default []
- opts.alias: Record<string,string|string[]> default {}
- opts.default: Record<string,any> default {}
- opts.stopEarly: boolean default false
- opts['--']: boolean default false
- opts.unknown: (optName:string)=>boolean default undefined

Implementation Steps
1 require minimist: const parseArgs = require('minimist')
2 define opts object with the keys above
3 invoke parseArgs(process.argv.slice(2), opts)
4 handle parsed argv fields _ and '--'

Configuration Effects
- Numeric conversion: fastest built-in, no regexp
- Aliases: one-pass assignment, both keys updated
- stopEarly: skip internal parsing, minimal overhead
- unknown: filter unrecognized

Version Constraints
- use version>=1.2.6 to avoid prototype pollution



## Reference Details
Type Definitions
interface MinimistOptions {
  string?: string | string[];
  boolean?: boolean | string | string[];
  alias?: { [key: string]: string | string[] };
  default?: { [key: string]: any };
  stopEarly?: boolean;
  "--"?: boolean;
  unknown?: (optionName: string) => boolean;
}

interface MinimistParsedArgs {
  _: string[];
  "--"?: string[];
  [argName: string]: any;
}

Method Signature
const parseArgs: (args: string[], opts?: MinimistOptions) => MinimistParsedArgs;

Code Example
const parseArgs = require('minimist');
const opts = {
  string: ['id'],
  boolean: ['verbose'],
  alias: { v: ['version'], h: ['help'] },
  default: { timeout: 5000 },
  stopEarly: false,
  '--': true,
  unknown: (opt) => !opt.startsWith('no-')
};
const argv = parseArgs(process.argv.slice(2), opts);
console.log(argv);

Implementation Pattern
1 Validate opts structure: ensure arrays where required
2 Preprocess alias: flatten all keys
3 Call parseArgs with args and opts
4 Destructure argv: const { _, '--': rest, ...flags } = argv;

Configuration Options and Effects
- string: prevents numeric conversion
- boolean:true: treat --foo as true
- stopEarly:true: no further parsing after first non-option
- '--': true: separate pre and post arguments
- unknown callback: selective inclusion

Best Practice Code
const safeParse = (rawArgs) => {
  const defaultOpts = { boolean:true, alias:{}};
  return parseArgs(rawArgs, defaultOpts);
};

Troubleshooting
1 Unexpected numeric conversion
Command: node app.js 012
Expected: '012'
Fix: opts.string:['012']

2 Unknown option filtered
Command: node app.js --foo=bar
Output: foo:'bar'
With unknown: opt=>false, foo omitted

3 Parsing stops too early
Command: node app.js --foo baz --bar
Without stopEarly: bar:true
With stopEarly:true, baz instead of --bar processing


## Information Dense Extract
parseArgs(args:string[],opts?:{string?:string|string[];boolean?:boolean|string|string[];alias?:Record<string,string|string[]>;default?:Record<string,any>;stopEarly?:boolean;'--'?:boolean;unknown?:(opt:string)=>boolean;}):{_:string[];'--'?:string[];[key:string]:any} auto convert numeric strings; opts.string override to string; opts.boolean override to boolean or all flags if true; opts.alias maps names bidirectionally; opts.default fills missing; stopEarly breaks at first non-hyphen; '--' splits at '--'; unknown callback filters; fixed prototype pollution >=1.2.6; example: parseArgs(['-a','1','foo'],{string:['a'],boolean:true}) yields a:'1', foo in _, all flags true.

## Sanitised Extract
Table of Contents
1 Method Signature
2 Parsing Rules
3 Option Definitions
4 Example Usages

1 Method Signature
parseArgs(args, opts)
args: array of strings
opts: object with keys string, boolean, alias, default, stopEarly, '--', unknown
returns object with keys _ (array of non-options), optional '--', and parsed options

2 Parsing Rules
a) Numeric auto conversion: convert 0-9 characters to number unless overridden
b) Strings: any name in opts.string always string
c) Booleans: any name in opts.boolean always boolean; if opts.boolean===true then all double-hyphen no-equals args are true
d) Aliases: map names and populate both primary and alias keys
e) Defaults: missing options take opts.default values
f) stopEarly: when true, on first non-hyphen argument, push rest into _ and stop
g) '--': when true, split arguments at first '--', assign before to _, after to '--'
h) unknown: invoked per unknown option; returning false excludes the option

3 Option Definitions
opts.string: string or array of strings. Always treat specified names as strings
opts.boolean: boolean or string or array. true means treat all double-hyphened no-equals as boolean. Specified names as boolean
opts.alias: map key to string or array of strings for alternate names
table alias mapping: both original and aliases reference same value
opts.default: map key to default value used when omitted
opts.stopEarly: boolean, default false
opts['--']: boolean, default false
opts.unknown: callback, return false to skip unknown

4 Example Usages
node script.js -x 3 --name=alice foo bar
results in x:3 name:'alice' _: ['foo','bar']
with opts.string:['x'], x remains '3'
with opts.boolean:true, any '--flag' yields flag:true
fn = require('minimist'); argv=fn(args, {alias:{v:['version']}, default:{v:1}, '--':true})

## Original Source
Configuration Management & Argument Parsing
https://www.npmjs.com/package/minimist

## Digest of MINIMIST

# minimist 1.2.8 (Retrieved 2024-06-19)

# Installation
With npm do:

npm install minimist

# API
## parseArgs(args, opts)
Signature
parseArgs(args: string[], opts?: MinimistOptions): MinimistParsedArgs

### MinimistOptions
- string: string | string[] (always treat named args as strings)
- boolean: boolean | string | string[] (named args as booleans; if true treat all double hyphens without equal signs as boolean)
- alias: { [key: string]: string | string[] }
- default: { [key: string]: any }
- stopEarly: boolean
- "--": boolean
- unknown: (optionName: string) => boolean

### MinimistParsedArgs
- _: string[] (non-option arguments)
- '--'?: string[] (args after -- if opts['--'] is true)
- other properties: any parsed option values

# Options Details
- opts.string: names to always parse as strings
- opts.boolean: names to always parse as boolean or true to treat all double hyphens without equal signs as boolean
- opts.alias: mapping from name to alias names
- opts.default: mapping from names to default values
- opts.stopEarly: if true, stop parsing on first non-option and include rest in _
- opts['--']: if true, separate args before and after -- into _ and '--'
- opts.unknown: callback invoked for unknown options, return false to skip adding

# Parsing Behavior
- Numeric-looking arguments returned as numbers unless overridden by opts.string or opts.boolean
- After -- parsing stops and remaining args go to _ or '--'

# Security Advisory
Prototype pollution vulnerability fixed in versions >=1.2.6. Use minimist versions 1.2.6 or later.

## Attribution
- Source: Configuration Management & Argument Parsing
- URL: https://www.npmjs.com/package/minimist
- License: License: MIT
- Crawl Date: 2025-05-16T06:28:41.079Z
- Data Size: 230047 bytes
- Links Found: 1785

## Retrieved
2025-05-16
