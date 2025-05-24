# MINIMIST

## Crawl Summary
minimist parses CLI arguments into an object with `_` array for positional args. Supports alias mapping, boolean and string coercion, default values, unknown handler, stopEarly flag, and '--' to treat rest as positionals. Exposes a single function minimist(args, opts) returning ParsedArgs.

## Normalised Extract
Table of Contents:
1 Installation
2 parse signature
3 Options
  3.1 alias
  3.2 boolean
  3.3 string
  3.4 default
  3.5 unknown
  3.6 stopEarly
  3.7 '--'
4 ParsedArgs structure

1 Installation
Install via npm: npm install minimist

2 parse signature
minimist(args: string[], opts?: MinimistOptions): ParsedArgs

3 Options
3.1 alias
Map each flag name to one or more alias strings. Type: { [key: string]: string | string[] }

3.2 boolean
List flags always as booleans. Type: boolean | string[]; if true, all flags without string definitions are booleans.

3.3 string
List flags always as strings. Type: string | string[]

3.4 default
Specify default values for flags. Type: { [key: string]: any }

3.5 unknown
Function invoked for each unknown arg: (name: string, value: any) => boolean. Return false to omit from output.

3.6 stopEarly
If true, stop parsing when first non-option argument is reached.

3.7 '--'
If true, everything after '--' goes into ParsedArgs._ without parsing.

4 ParsedArgs structure
ParsedArgs is an object mapping each flag to its value, with all positionals in ParsedArgs._ array.


## Supplementary Details
MinimistOptions parameter details:
- alias: default undefined; maps keys to alias(es); merging keys populates both.
- boolean: default false; if array, flags in it coerced to boolean; if true, all non-string flags are boolean.
- string: default undefined; flags in it coerced to string.
- default: default {}; defines fallback values if flag absent.
- unknown: default undefined; handles custom validation; returning false drops flag.
- stopEarly: default false; when true, stops at first non-flag.
- '--': default false; preserves all args after separator.

Parsing steps:
1 Slice process.argv
2 Iterate each token
3 If token starts '--' or '-', apply parsing rules
4 Populate result object and _ array

Integration steps:
- require minimist
- define opts as MinimistOptions
- call minimist with args and opts
- destructure returned object


## Reference Details
API Signature:
function minimist(
  args: string[],
  opts?: {
    alias?: { [key: string]: string | string[] },
    boolean?: boolean | string[],
    string?: string | string[],
    default?: { [key: string]: any },
    unknown?: (argName: string, argValue: any) => boolean,
    stopEarly?: boolean,
    '--'?: boolean
  }
): { [key: string]: any; _?: string[] }

ParsedArgs:
- _ : string[]      # positional args
- [flag: string]: string | number | boolean | any[]

Example Full Implementation:

const minimist = require('minimist')

const opts = {
  alias: { v: 'version', h: 'help' },
  boolean: ['v', 'h'],
  string: ['config'],
  default: { config: 'default.json' },
  unknown: (name, val) => { if(name.startsWith('-X')) return true; return false },
  stopEarly: false,
  '--': true
}

function main() {
  const argv = minimist(process.argv.slice(2), opts)
  if(argv.help) {
    console.log('Usage: app [options]')
    process.exit(0)
  }
  console.log('Flags:', argv)
}

// CLI invocation
// node app.js -v --config=prod.json --unknownFlag foo -- -bar baz

Best Practices:
- Always slice process.argv
- Define alias to group flags
- Use boolean array to enforce flag types
- Provide default values to avoid undefined
- Handle unknown to validate input

Troubleshooting:
Command: node script.js --foo
Expected: unknown handler invoked or foo stored in _
Verify process.argv.slice(2) output:
  console.log(process.argv.slice(2))
If options missing, check spelling and opts object types.


## Information Dense Extract
minimist(args:string[],opts?:MinimistOptions):ParsedArgs. MinimistOptions: alias:{[k:string]:string|string[]},boolean:boolean|string[],string:string|string[],default:{[k:string]:any},unknown:(name:string,val:any)=>boolean,stopEarly:boolean,'--':boolean. ParsedArgs: flag->value, _->string[]. Install: npm install minimist. Usage: const argv=minimist(process.argv.slice(2),opts). Core: slice argv, iterate tokens, coerce types, apply defaults and aliases, handle unknown, stopEarly, '--'. Best practices: slice argv, define alias, enforce flag types, set defaults, validate unknown. Troubleshoot: log slice, verify opts types.

## Sanitised Extract
Table of Contents:
1 Installation
2 parse signature
3 Options
  3.1 alias
  3.2 boolean
  3.3 string
  3.4 default
  3.5 unknown
  3.6 stopEarly
  3.7 '--'
4 ParsedArgs structure

1 Installation
Install via npm: npm install minimist

2 parse signature
minimist(args: string[], opts?: MinimistOptions): ParsedArgs

3 Options
3.1 alias
Map each flag name to one or more alias strings. Type: { [key: string]: string | string[] }

3.2 boolean
List flags always as booleans. Type: boolean | string[]; if true, all flags without string definitions are booleans.

3.3 string
List flags always as strings. Type: string | string[]

3.4 default
Specify default values for flags. Type: { [key: string]: any }

3.5 unknown
Function invoked for each unknown arg: (name: string, value: any) => boolean. Return false to omit from output.

3.6 stopEarly
If true, stop parsing when first non-option argument is reached.

3.7 '--'
If true, everything after '--' goes into ParsedArgs._ without parsing.

4 ParsedArgs structure
ParsedArgs is an object mapping each flag to its value, with all positionals in ParsedArgs._ array.

## Original Source
minimist Argument Parser README
https://github.com/substack/minimist#readme

## Digest of MINIMIST

# minimist Argument Parser

Retrieved: 2024-06-05
Data Size: 0 bytes | Links Found: 0 | Error: None

# Installation

Install via npm:

    npm install minimist

# Basic Usage

Import and parse CLI arguments:

    const minimist = require('minimist')
    const argv = minimist(process.argv.slice(2), opts)

# API

## minimist(args: string[], opts?: MinimistOptions): ParsedArgs

- args: array of strings to parse (e.g., process.argv.slice(2)).
- opts: configuration object (see Options).
- returns: ParsedArgs object containing parsed flags and positional arguments under `_`.

# Options (MinimistOptions)

- alias:     { [key: string]: string | string[] }  # Map of flag to alias(es).
- boolean:   boolean | string[]                    # Flags to always treat as booleans.
- string:    string | string[]                    # Flags to always treat as strings.
- default:   { [key: string]: any }               # Default values for flags.
- unknown:   (argName: string, argValue: any) => boolean   # Function to handle unknown flags; return false to omit.
- stopEarly: boolean                              # Stop parsing on first unknown flag.
- '--':      boolean                              # Populate all subsequent args into `_` array.

# Examples

Parsing flags with defaults and aliases:

    const argv = minimist(
      ['-x', '1', '--no-debug', 'file.txt'],
      {
        alias: { x: 'execute', d: 'debug' },
        boolean: ['d'],
        default: { debug: true }
      }
    )
    // argv => { x: 1, execute: 1, debug: false, d: false, _: ['file.txt'] }


## Attribution
- Source: minimist Argument Parser README
- URL: https://github.com/substack/minimist#readme
- License: License: MIT
- Crawl Date: 2025-05-24T03:32:05.964Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-24
