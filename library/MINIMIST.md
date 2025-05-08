# MINIMIST

## Crawl Summary
minimist(args:Array<string>, opts?:{boolean:Array<string>|boolean,string:Array<string>,alias:Object,default:Object,unknown:(arg:string)=>boolean,stopEarly:boolean,'--':boolean}) => ParsedArgs:{_:string[],[flag]:boolean|string|number|Array<string|number>,'--'?:string[]}  opts.boolean default:false opts.string default:[] opts.alias default:{} opts.default default:{} opts.unknown default:undefined opts.stopEarly default:false opts['--'] default:false

## Normalised Extract
Table of Contents:
1 Function Signature
2 Configuration Options
3 ParsedArgs Object

1 Function Signature
   minimist  (args: Array<string>, opts?: {
     boolean: Array<string> | boolean,
     string: Array<string>,
     alias: { [key: string]: string | Array<string> },
     default: { [key: string]: any },
     unknown: (arg: string) => boolean,
     stopEarly: boolean,
     "--": boolean
   }) => ParsedArgs

2 Configuration Options
   boolean: flags to coerce to booleans or true for all non-numeric
   string: flags to coerce to strings
   alias: map short names to long names mutually
   default: values assigned when flag absent
   unknown: callback for flags not in alias or default; return false to skip storing
   stopEarly: halt parsing on first non-option and push rest to _
   "--": when true, arguments after "--" go into ParsedArgs['--']

3 ParsedArgs Object
   _: Array<string> positional
   [flag]: boolean | string | number | Array<string|number>
   "--"?: Array<string> only if opts["--"] true

## Supplementary Details
Parameter Types and Defaults:
  args: Array<string> required
  opts.boolean: Array<string> | boolean default false
  opts.string: Array<string> default []
  opts.alias: Object default {}
  opts.default: Object default {}
  opts.unknown: Function default undefined
  opts.stopEarly: boolean default false
  opts['--']: boolean default false
Implementation Steps:
 1 Import minimist
 2 Prepare args array (slice process.argv)
 3 Define opts object per requirements
 4 Call minimist(args, opts)
 5 Access flags and positionals from returned object
Type Coercion:
 - Numeric strings are converted to Number unless listed in opts.string or opts.boolean
 - Boolean flags appear as true or false
 - String flags respect opts.string
Alias Resolution:
 - Multiple aliases map to same key and mirror values
Unknown Flags:
 - unknown callback allows validation or rejection
Stop Early:
 - when true, parsing stops at first non-flag
"--" Handling:
 - arguments after "--" bypass parsing into flags and appended to ['--'] array

## Reference Details
API:
  function minimist(
    args: string[],
    opts?: {
      boolean?: string[] | boolean,
      string?: string[],
      alias?: Record<string,string | string[]>,
      default?: Record<string, any>,
      unknown?(arg: string): boolean,
      stopEarly?: boolean,
      "--"?: boolean
    }
  ): {
    _: string[],
    "--"?: string[],
    [key: string]: any
  }

Code Examples:
  // Basic
  const argv = require('minimist')(process.argv.slice(2))

  // With defaults and aliases
  const opts = {
    boolean: ['debug'],
    string: ['name'],
    alias: { d: 'debug', n: 'name' },
    default: { debug: false, name: 'guest' }
  }
  const argv2 = require('minimist')(process.argv.slice(2), opts)

Best Practices:
  • Explicitly list boolean and string flags to avoid unintended coercion.
  • Provide default values for critical flags.
  • Use alias to support short and long forms consistently.
  • Use unknown callback to enforce allowed options.

Troubleshooting:
  Command: node app.js --debug --name=alice extra
  Expected ParsedArgs: { _: ['extra'], debug: true, d: true, name: 'alice', n: 'alice' }
  If numeric values remain strings, ensure the flag is not in opts.string.
  To capture arguments after "--": set opts['--']=true and verify argv['--'] contains those items.

Step-by-Step:
 1 Verify process.argv slicing
 2 Log opts to confirm arrays and mappings
 3 Log returned object to inspect coercions
 4 Use unknown callback to catch unexpected flags
 5 Validate presence of ['--'] when needed

## Information Dense Extract
minimist(args:Array<string>,opts?:{boolean:Array<string>|boolean= false,string:Array<string>= [],alias:Object= {},default:Object= {},unknown:(arg)=>boolean,stopEarly:boolean= false,'--':boolean= false})=>ParsedArgs:{_:string[], '--'?:string[],[flag]:boolean|string|number|Array<string|number>}. opts.boolean coerces flags or all non-numerics, opts.string preserves strings, opts.alias maps keys bi-directionally, opts.default supplies missing, unknown filters flags, stopEarly halts on first non-option, '--' captures trailing args.

## Sanitised Extract
Table of Contents:
1 Function Signature
2 Configuration Options
3 ParsedArgs Object

1 Function Signature
   minimist  (args: Array<string>, opts?: {
     boolean: Array<string> | boolean,
     string: Array<string>,
     alias: { [key: string]: string | Array<string> },
     default: { [key: string]: any },
     unknown: (arg: string) => boolean,
     stopEarly: boolean,
     '--': boolean
   }) => ParsedArgs

2 Configuration Options
   boolean: flags to coerce to booleans or true for all non-numeric
   string: flags to coerce to strings
   alias: map short names to long names mutually
   default: values assigned when flag absent
   unknown: callback for flags not in alias or default; return false to skip storing
   stopEarly: halt parsing on first non-option and push rest to _
   '--': when true, arguments after '--' go into ParsedArgs['--']

3 ParsedArgs Object
   _: Array<string> positional
   [flag]: boolean | string | number | Array<string|number>
   '--'?: Array<string> only if opts['--'] true

## Original Source
minimist
https://github.com/substack/minimist

## Digest of MINIMIST

# Overview
Minimist is a lightweight Node.js argument parser that converts command-line arguments into an object with keys for flags and values.

# Installation
```bash
npm install minimist --save
```

# Usage
```js
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2), opts)
```

# API

## minimist(args, opts)
- args  (Array<string>): list of command-line tokens (usually process.argv.slice(2)).
- opts  (Object, optional): configuration object with fields:
  • boolean   (Array<string> | boolean) – flags to always treat as booleans or true to treat all non-numeric as booleans. Default: false.
  • string    (Array<string>) – flags to always treat as strings. Default: [].
  • alias     (Object) – mapping of flag names to aliases, e.g. { h: 'help' }.
  • default   (Object) – default values for flags, e.g. { verbose: false }.
  • unknown   (Function): (arg: string) => boolean – called for unrecognized flags; return false to skip setting.
  • stopEarly (boolean) – stop parsing on first non-option. Default: false.
  • "--"     (boolean) – populate args after "--" into argv['--']. Default: false.

# Return Value
ParsedArgs (Object):
  • _ (Array<string>) – positional arguments.
  • [flag: string]: boolean | string | number | Array<string | number>
  • "--" (Array<string>) when opts["--"] is true.

# Examples
```js
const argv = minimist(['-x', '3', '--verbose'], {
  boolean: 'verbose',
  default: { x: 0 },
  alias: { v: 'verbose' }
})
// argv = { _: [], x: 3, verbose: true, v: true }
```

# Content retrieved on 2024-06-15 from https://github.com/substack/minimist

## Attribution
- Source: minimist
- URL: https://github.com/substack/minimist
- License: MIT License
- Crawl Date: 2025-05-08T03:35:44.150Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-08
