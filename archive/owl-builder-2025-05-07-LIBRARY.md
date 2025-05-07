library/YARGS_API.md
# library/YARGS_API.md
# YARGS_API

## Crawl Summary
npm install --save yargs
yargs(): Argv instance
yargs.scriptName(name: string)
yargs.usage(usage: string)
yargs.command(name: string, desc: string, builder?: Function, handler?: Function)
yargs.positional(key: string, {type, default, describe})
yargs.option(key, {alias, type, default, describe, demandOption})
yargs.help([level])
yargs.demandCommand(min, max, msg)
yargs.strictCommands()
yargs.parse(argv: string[])
yargs.argv
hideBin(argv: string[]): string[]

## Normalised Extract
Table of Contents
1 Installation
2 Bootstrap
3 Initialization
4 Commands API
5 Options & Positional
6 Helpers
7 Module Formats

1 Installation
Command: npm install --save yargs

2 Bootstrap
Shebang: #!/usr/bin/env node
ESM import: import yargs from 'yargs'
Helper import: import { hideBin } from 'yargs/helpers'

3 Initialization
yargs(): returns Argv instance

4 Commands API
scriptName(name: string): this
usage(usage: string): this
command(name: string, description: string, builder?: (yargs: Argv)=>Argv, handler?: (argv: any)=>void): this
demandCommand(min: number, max?: number, msg?: string): this
strictCommands(): this

5 Options & Positional
positional(key: string, options: {type: 'string'|'number'|'boolean', default?: any, describe: string}): this
option(key: string|Record<string,Options>, opt?: Options): this

6 Helpers
help(level?: number): this
parse(argv: string[]): any
argv: any
hideBin(argv: string[]): string[]

7 Module Formats
CommonJS: const {argv} = require('yargs')
ESM: import yargs from 'yargs'


## Supplementary Details
Implementation Steps:
1. Run npm install --save yargs
2. Create entry script with shebang #!/usr/bin/env node
3. Import yargs and hideBin
4. Create yargs() instance
5. Chain API calls: .scriptName, .usage, .command, .option or .positional
6. Add .help() or .demandCommand() for validation
7. Call .parse(hideBin(process.argv)) or access .argv

Options interface:
{
  alias?: string | string[];
  type?: 'string' | 'number' | 'boolean';
  default?: any;
  describe?: string;
  demandOption?: boolean;
}

Positional options:
{
  type: 'string' | 'number' | 'boolean';
  default?: any;
  describe: string;
}

Builder pattern in .command:
function builder(yargs: Argv): Argv

Handler signature:
function handler(argv: any): void

## Reference Details
API Interface Argv:
interface Argv {
  scriptName(name: string): this;
  usage(usage: string): this;
  command(name: string, description: string, builder?: (yargs: Argv)=>Argv, handler?: (argv: any)=>void): this;
  positional(key: string, options: {type: 'string'|'number'|'boolean', default?: any, describe: string}): this;
  option(key: string|Record<string,Options>, opt?: Options): this;
  demandCommand(min: number, max?: number, msg?: string): this;
  strictCommands(): this;
  help(level?: number): this;
  parse(argv: string[]): any;
  argv: any;
}

hideBin helper:
function hideBin(argv: string[]): string[]

Examples:
// CJS example
const { argv } = require('yargs');
if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}

// ESM example
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, argv => console.info(argv))
  .demandCommand(1)
  .parse();

Best Practices:
- Use hideBin(process.argv) to pass only user args.
- Call .strictCommands() to error on unknown commands.
- Use .demandCommand(1) to enforce at least one command.
- Define both .usage and .help() for consistent CLI UI.

Troubleshooting:
$ node example.js unknown
Expected: Error: Unknown command: unknown
Solution: Add .strictCommands() to Argv chain.

$ node example.js curl
Expected: Error: Not enough non-option arguments: expected at least 1
Solution: Use .demandCommand(1)


## Information Dense Extract
npm install --save yargs
yargs():Argv; hideBin(argv:string[]):string[]; scriptName(name:string):this; usage(pattern:string):this; command(name:string,desc:string,builder?(Argv)=>Argv,handler?(argv:any)=>void):this; positional(key:string,{type:'string'|'number'|'boolean',default?,describe:string}):this; option(key:string|Record<string,Options>,opt?:Options):this; demandCommand(min:number,max?:number,msg?:string):this; strictCommands():this; help(level?:number):this; parse(argv:string[]):any; argv:any; Options:{alias?:string|string[];type?:'string'|'number'|'boolean';default?:any;describe?:string;demandOption?:boolean;}

## Sanitised Extract
Table of Contents
1 Installation
2 Bootstrap
3 Initialization
4 Commands API
5 Options & Positional
6 Helpers
7 Module Formats

1 Installation
Command: npm install --save yargs

2 Bootstrap
Shebang: #!/usr/bin/env node
ESM import: import yargs from 'yargs'
Helper import: import { hideBin } from 'yargs/helpers'

3 Initialization
yargs(): returns Argv instance

4 Commands API
scriptName(name: string): this
usage(usage: string): this
command(name: string, description: string, builder?: (yargs: Argv)=>Argv, handler?: (argv: any)=>void): this
demandCommand(min: number, max?: number, msg?: string): this
strictCommands(): this

5 Options & Positional
positional(key: string, options: {type: 'string'|'number'|'boolean', default?: any, describe: string}): this
option(key: string|Record<string,Options>, opt?: Options): this

6 Helpers
help(level?: number): this
parse(argv: string[]): any
argv: any
hideBin(argv: string[]): string[]

7 Module Formats
CommonJS: const {argv} = require('yargs')
ESM: import yargs from 'yargs'

## Original Source
CLI Argument Parsing Libraries
https://yargs.js.org/docs/

## Digest of YARGS_API

# YARGS DETAILED DIGEST

Date Retrieved: 2024-06-15
Data Size: 348060 bytes

# Installation

Run in terminal:

npm install --save yargs

# Getting Started

#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', builder, handler)
  .help()
  .parse(hideBin(process.argv))

Functions builder and handler defined as below:

function builder(yargs) {
  return yargs.positional('name', {
    type: 'string',
    default: 'Cambi',
    describe: 'the name to say hello to'
  })
}

function handler(argv) {
  console.log('hello', argv.name, 'welcome to yargs!')
}

# API METHOD SIGNATURES

## scriptName(name: string): Argv
Sets the command binary name in help output.

## usage(usage: string): Argv
Defines usage pattern shown in help.

## command(name: string, description: string, builder?: (yargs: Argv) ⇒ Argv, handler?: (argv: any) ⇒ void): Argv
Registers a new command. `name` supports positional syntax (<required>, [optional], ...).

## positional(key: string, options: {type: 'string'|'number'|'boolean', default?: any, describe: string}): Argv
Defines a positional argument under a command.

## option(key: string|Record<string,Options>, opt?: Options): Argv
Adds or extends an option. Options interface: {alias?: string|string[], type?: 'string'|'number'|'boolean', default?: any, describe?: string, demandOption?: boolean}.

## help(level?: number): Argv
Generates help output. `level` toggles display verbosity.

## demandCommand(min?: number, max?: number, msg?: string): Argv
Enforces the number of commands. Throws error if unmet.

## strictCommands(): Argv
Enables error on unknown commands.

## parse(argv: string[]): any
Parses provided arguments array into an object.

## argv: any
Property that holds parsed arguments if parse() not explicitly called.

# HELPERS

import { hideBin } from 'yargs/helpers'

`hideBin(argv: string[]): string[]`
Removes the first two Node.js process arguments.


## Attribution
- Source: CLI Argument Parsing Libraries
- URL: https://yargs.js.org/docs/
- License: MIT License
- Crawl Date: 2025-05-06T15:31:52.976Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-05-06
library/FIGLET_JS.md
# library/FIGLET_JS.md
# FIGLET_JS

## Crawl Summary
Installation via npm; import figlet; asynchronous method figlet(text, options, callback) returns Promise<string>; synchronous method figlet.textSync(text, options); global defaults() for fontPath; preloadFonts() for browser sync; parseFont(name,data) to add fonts; metadata(name) returns Promise<[options,header]>; fonts() and fontsSync() list fonts; FigletOptions: font:string('Standard'), horizontalLayout:string('default'|'full'|'fitted'|'controlled smushing'|'universal smushing'), verticalLayout:same, width:number, whitespaceBreak:boolean; kerning modes explained; browser usage requires fetch shim; CLI via figlet-cli.

## Normalised Extract
Table of Contents
1 Installation
2 API Methods
3 Options Interface
4 Kerning Modes
5 Browser Integration
6 Command Line Usage
7 Release History

1 Installation
npm install figlet

2 API Methods
2.1 figlet(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
2.2 figlet.text(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
2.3 figlet.textSync(text: string, options?: string|FigletOptions): string
2.4 figlet.defaults(settings: {fontPath?: string}): void
2.5 figlet.preloadFonts(fonts: string[], callback: () => void): void
2.6 figlet.parseFont(name: string, data: string): void
2.7 figlet.metadata(name: string, callback: (err: Error|null, options: FigletOptions, headerComment: string) => void): Promise<[FigletOptions, string]>
2.8 figlet.fonts(callback: (err: Error|null, fonts: string[]) => void): void
2.9 figlet.fontsSync(): string[]

3 Options Interface
font: String, default 'Standard'
horizontalLayout: 'default'|'full'|'fitted'|'controlled smushing'|'universal smushing', default 'default'
verticalLayout: same as horizontalLayout, default 'default'
width: Number, default unlimited
whitespaceBreak: Boolean, default false

4 Kerning Modes
default, full, fitted, controlled smushing, universal smushing

5 Browser Integration
Requires fetch API
Use figlet.defaults({fontPath}) and figlet.preloadFonts([...], callback)
Call figlet or figlet.textSync

6 Command Line Usage
Install figlet-cli globally
Usage: figlet -f <font> <text>

7 Release History
List of versions and dates

## Supplementary Details
Require and import patterns:
- Node.js: var figlet=require('figlet')
- ES Modules: import figlet from 'figlet'
- Webpack/React: import standard from 'figlet/importable-fonts/Standard.js'; figlet.parseFont('Standard',standard)

Implementation Steps:
1 Install npm package
2 Import figlet
3 Call figlet methods with appropriate options
4 For custom fonts, read .flf file and pass content to parseFont
5 In browser, set fontPath and preload fonts before sync calls

Error Handling:
- All async methods accept callback(err,data). err is instance of Error
- Promise rejections return Error

Loading Custom Font:
const data=fs.readFileSync(path,'utf8');
figlet.parseFont('myfont', data)

Metadata Retrieval:
await figlet.metadata('Standard') returns [options,headerComment]

Fonts List:
figlet.fonts(callback) -> fonts:string[]
figlet.fontsSync() -> string[]

## Reference Details
figlet(text: string, options?: string|FigletOptions, callback?: (err:Error|null, data:string)=>void): Promise<string>
- text: input string
- options: string|FigletOptions
- callback: optional

figlet.text(text: string, options?: string|FigletOptions, callback?: (err:Error|null, data:string)=>void): Promise<string>
- identical to above

figlet.textSync(text: string, options?: string|FigletOptions): string

figlet.defaults(settings: { fontPath?: string }): void
- fontPath: directory for font files in browser

figlet.preloadFonts(fonts: string[], callback: () => void): void
- fonts: list of font names
- callback: invoked when loaded

figlet.parseFont(name: string, data: string): void
- name: font identifier
- data: FLF font file content as string

figlet.metadata(name: string, callback: (err:Error|null, options:FigletOptions, headerComment:string)=>void): Promise<[FigletOptions,string]>

figlet.fonts(callback: (err:Error|null, fonts:string[])=>void): void
figlet.fontsSync(): string[]

Options:
{
 font: 'Standard',
 horizontalLayout: 'default',
 verticalLayout: 'default',
 width: undefined,
 whitespaceBreak: false
}

Best Practices:
Use Promise API for async calls; handle rejections. Preload fonts in browser for synchronous rendering. Use parseFont to bundle custom fonts.

Troubleshooting:
Command: npm ls figlet
Expected: figlet@>=1.0.0
Error: ENOENT means missing installation

Browser: missing fetch polyfill triggers ReferenceError: fetch is not defined
Solution: include fetch.min.js before figlet.js

## Information Dense Extract
install:npm install figlet; import:require('figlet')|import figlet; API:figlet(text,options?,cb?):Promise<string>;figlet.text(text,options?,cb?):Promise<string>;figlet.textSync(text,options?):string;figlet.defaults({fontPath});figlet.preloadFonts(fonts[],cb);figlet.parseFont(name,data);figlet.metadata(name,cb):Promise<[options,header]>;figlet.fonts(cb):string[];figlet.fontsSync():string[];Options:{font:'Standard';horizontalLayout:'default'|'full'|'fitted'|'controlled smushing'|'universal smushing';verticalLayout:same;width?:number;whitespaceBreak?:boolean};Kerning:modes;Browser:requires fetch; use defaults+preloadFonts;CLI:npm install -g figlet-cli;figlet -f <font> <text>;Errors:async methods reject Error; sync methods throw;custom fonts:parseFont;metadata returns [options,header]

## Sanitised Extract
Table of Contents
1 Installation
2 API Methods
3 Options Interface
4 Kerning Modes
5 Browser Integration
6 Command Line Usage
7 Release History

1 Installation
npm install figlet

2 API Methods
2.1 figlet(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
2.2 figlet.text(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
2.3 figlet.textSync(text: string, options?: string|FigletOptions): string
2.4 figlet.defaults(settings: {fontPath?: string}): void
2.5 figlet.preloadFonts(fonts: string[], callback: () => void): void
2.6 figlet.parseFont(name: string, data: string): void
2.7 figlet.metadata(name: string, callback: (err: Error|null, options: FigletOptions, headerComment: string) => void): Promise<[FigletOptions, string]>
2.8 figlet.fonts(callback: (err: Error|null, fonts: string[]) => void): void
2.9 figlet.fontsSync(): string[]

3 Options Interface
font: String, default 'Standard'
horizontalLayout: 'default'|'full'|'fitted'|'controlled smushing'|'universal smushing', default 'default'
verticalLayout: same as horizontalLayout, default 'default'
width: Number, default unlimited
whitespaceBreak: Boolean, default false

4 Kerning Modes
default, full, fitted, controlled smushing, universal smushing

5 Browser Integration
Requires fetch API
Use figlet.defaults({fontPath}) and figlet.preloadFonts([...], callback)
Call figlet or figlet.textSync

6 Command Line Usage
Install figlet-cli globally
Usage: figlet -f <font> <text>

7 Release History
List of versions and dates

## Original Source
figlet.js
https://github.com/patorjk/figlet.js

## Digest of FIGLET_JS

# FIGLET.JS

## Quick Start - Node.js

### Installation
```bash
npm install figlet
```

### Simple Usage
```js
var figlet = require("figlet");
figlet("Hello World!!", function(err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
```

## Core API Methods

### figlet(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
Shorthand for figlet.text.

### figlet.text(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
Generate ASCII art from text.

### figlet.textSync(text: string, options?: string|FigletOptions): string
Synchronous version.

### figlet.defaults(settings: {
  fontPath?: string;
}): void
Set global default fontPath.

### figlet.preloadFonts(fonts: string[], callback: () => void): void
Preload fonts in browser for synchronous textSync.

### figlet.parseFont(name: string, data: string): void
Load custom FLF font data under given name.

### figlet.metadata(name: string, callback: (err: Error|null, options: FigletOptions, headerComment: string) => void): Promise<[FigletOptions, string]>
Retrieve font default options and header comment.

### figlet.fonts(callback: (err: Error|null, fonts: string[]) => void): void
List available fonts (Node.js only).

### figlet.fontsSync(): string[]
Synchronous version of fonts.

## Options Interface
```ts
interface FigletOptions {
  font?: string // default: 'Standard'
  horizontalLayout?: 'default'|'full'|'fitted'|'controlled smushing'|'universal smushing' // default: 'default'
  verticalLayout?: 'default'|'full'|'fitted'|'controlled smushing'|'universal smushing' // default: 'default'
  width?: number // default: no limit
  whitespaceBreak?: boolean // default: false
}
```

## Understanding Kerning
Five layout modes:
- "default": font designer kerning
- "full": full spacing
- "fitted": letters nearly touch
- "controlled smushing": common smushing
- "universal smushing": aggressive smushing

## Browser Usage
Include fetch shim and figlet.js, then: 
```html
<script src="fetch.min.js"></script>
<script src="figlet.js"></script>
<script>
  figlet("text","Standard",function(err,text){ ... });
</script>
```
Preload & defaults for sync:
```js
figlet.defaults({ fontPath: "assets/fonts" });
figlet.preloadFonts(["Standard","Ghost"], ready);
```

## Command Line
Install globally:
```bash
npm install -g figlet-cli
```
Usage:
```bash
figlet -f "Dancing Font" "Hi"
```

## Release History
- v1.8.1 (2025.04.11): Added miniwi font
- v1.8.0 (2024.10.08): Promises support for loadFont, preloadedFonts, metadata; added 5 fonts
- v1.7.0 (2023.10.01): Promises support for text
- ...

## Attribution
- Source: figlet.js
- URL: https://github.com/patorjk/figlet.js
- License: MIT License
- Crawl Date: 2025-05-06T06:32:17.918Z
- Data Size: 561695 bytes
- Links Found: 4536

## Retrieved
2025-05-06
library/DOTENV_LIBRARY.md
# library/DOTENV_LIBRARY.md
# DOTENV_LIBRARY

## Crawl Summary
Installation command; .env file format rules (single/multiline, comments); API method signatures for config, parse, populate, decrypt with all options and defaults; preload via node -r; CLI config var mappings; ES module import; order-of-loading and override semantics.

## Normalised Extract
Table of Contents
1 Installation
2 .env File Syntax
3 API Methods
  3.1 config
  3.2 parse
  3.3 populate
  3.4 decrypt
4 Preload Mode
5 Configuration Variables
6 Examples

1 Installation
  Run: npm install dotenv --save

2 .env File Syntax
  • KEY=VALUE pairs
  • Multiline: wrap value in double quotes and include line breaks
  • Comments: start with #; wrap values containing # in quotes

3 API Methods
  3.1 config(options?: {path?:string|string[],encoding?:string,debug?:boolean,override?:boolean,processEnv?:object}): {parsed?:object,error?:Error}
    - path: custom .env file or list of files
    - encoding: utf8|latin1|...
    - debug: boolean
    - override: boolean
    - processEnv: target object
    - Returns parsed key or error

  3.2 parse(src:string|Buffer,options?:{debug?:boolean}): object
    - Returns key/value mapping

  3.3 populate(target:object,source:object,options?:{override?:boolean,debug?:boolean}): void

  3.4 decrypt(input:string|Buffer,options?): object

4 Preload Mode
  • CLI: node -r dotenv/config your_script.js

5 Configuration Variables
  • DOTENV_CONFIG_PATH, DOTENV_CONFIG_ENCODING, DOTENV_CONFIG_DEBUG, DOTENV_CONFIG_OVERRIDE
  • CLI args precedence > env vars

6 Examples
  • ESM: import 'dotenv/config'
  • Multiple files: path: ['.env.local','.env']
  • Custom target: processEnv=myEnv

## Supplementary Details
Implementation Steps
1 Create a .env in project root
2 Add key=values; use double quotes for special chars or multiline
3 At application entry, call require('dotenv').config(options) or import 'dotenv/config'
4 Inspect result.parsed or catch result.error
5 For Buffer sources, use dotenv.parse(buffer, {debug:true})
6 For populating custom object, use dotenv.populate(customTarget, parsed, {override:true,debug:true})
7 For encrypted files or multi-env, integrate dotenvx per its docs
Exact Defaults
path: process.cwd() + '/.env'
encoding: 'utf8'
debug: false
override: false
processEnv: process.env
Population override: false
decrypt: requires dotenvx

## Reference Details
API Specifications

config(options)
- parameters:
    options.path?: string | string[]      Default: [cwd + '/.env']
    options.encoding?: string             Default: 'utf8'
    options.debug?: boolean               Default: false
    options.override?: boolean            Default: false
    options.processEnv?: Record<string,string> Default: process.env
- returns: { parsed?: Record<string,string>; error?: Error }

parse(src, options)
- parameters:
    src: string | Buffer
    options.debug?: boolean               Default: false
- returns: Record<string,string>

populate(target, source, options)
- parameters:
    target: object
    source: object
    options.override?: boolean            Default: false
    options.debug?: boolean               Default: false
- returns: void

decrypt(input, options)
- parameters: input: string|Buffer, options: {}  // See dotenvx documentation
- returns: Record<string,string>

Full Code Examples

// Basic load
const result = require('dotenv').config({path:['.env.local','.env'],override:true,debug:true});
if (result.error) throw result.error;
console.log(result.parsed);

// Preload mode
// $ node -r dotenv/config -d your_script.js

// Parse example
const buf = Buffer.from('KEY=VALUE');
const parsed = require('dotenv').parse(buf, {debug:true});

// Populate custom
const target = {};
const src = {HELLO:'world'};
require('dotenv').populate(target, src, {override:true,debug:true});

// Webpack polyfill for front-end
require('dotenv').config();
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// webpack.config.js plugin section
// new NodePolyfillPlugin(), new webpack.DefinePlugin({'process.env':{HELLO:JSON.stringify(process.env.HELLO)}})

// React environment: prefix with REACT_APP_

Best Practices
• Keep .env out of source control
• One file per environment: .env, .env.production, etc.
• Use override cautiously

Troubleshooting
$ require('dotenv').config({debug:true}) // to enable diagnostics
React variables not present: prefix with REACT_APP_
Webpack front-end errors: add node-polyfill-webpack-plugin or use dotenv-webpack

## Information Dense Extract
install: npm install dotenv ; .env syntax: KEY=VALUE, multiline quotes, # comments; API: config({path:string|[],encoding:string,debug:boolean,override:boolean,processEnv:object})→{parsed?,error?}, parse(src, {debug?})→obj, populate(target,source,{override?,debug?}), decrypt via dotenvx; defaults: path='./.env',encoding='utf8',debug=false,override=false,processEnv=process.env; preload: node -r dotenv/config; env vars: DOTENV_CONFIG_PATH,ENCODING,DEBUG,OVERRIDE; examples: path array override, custom processEnv; webpack polyfill plugin; prefix REACT_APP_ for front-end

## Sanitised Extract
Table of Contents
1 Installation
2 .env File Syntax
3 API Methods
  3.1 config
  3.2 parse
  3.3 populate
  3.4 decrypt
4 Preload Mode
5 Configuration Variables
6 Examples

1 Installation
  Run: npm install dotenv --save

2 .env File Syntax
   KEY=VALUE pairs
   Multiline: wrap value in double quotes and include line breaks
   Comments: start with #; wrap values containing # in quotes

3 API Methods
  3.1 config(options?: {path?:string|string[],encoding?:string,debug?:boolean,override?:boolean,processEnv?:object}): {parsed?:object,error?:Error}
    - path: custom .env file or list of files
    - encoding: utf8|latin1|...
    - debug: boolean
    - override: boolean
    - processEnv: target object
    - Returns parsed key or error

  3.2 parse(src:string|Buffer,options?:{debug?:boolean}): object
    - Returns key/value mapping

  3.3 populate(target:object,source:object,options?:{override?:boolean,debug?:boolean}): void

  3.4 decrypt(input:string|Buffer,options?): object

4 Preload Mode
   CLI: node -r dotenv/config your_script.js

5 Configuration Variables
   DOTENV_CONFIG_PATH, DOTENV_CONFIG_ENCODING, DOTENV_CONFIG_DEBUG, DOTENV_CONFIG_OVERRIDE
   CLI args precedence > env vars

6 Examples
   ESM: import 'dotenv/config'
   Multiple files: path: ['.env.local','.env']
   Custom target: processEnv=myEnv

## Original Source
Dotenv Configuration Library
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV_LIBRARY

# Installation

Run the following in your project root to install:

npm install dotenv --save

# .env File Syntax

- Key-value pairs in plain text, one per line:
  S3_BUCKET="YOURS3BUCKET"
  SECRET_KEY="YOURSECRETKEYGOESHERE"
- Multiline values supported (>= v15.0.0):
  PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
  ...
  -----END RSA PRIVATE KEY-----"
- Inline comments after #: SECRET_KEY=VALUE # comment
  Quotes required if value contains #.

# API Reference

## config(options?)
Signature:
```js
config(options?: {
  path?: string | string[]            // Default: process.cwd() + '/.env'
  encoding?: string                  // Default: 'utf8'
  debug?: boolean                    // Default: false
  override?: boolean                 // Default: false
  processEnv?: Record<string,string> // Default: process.env
}): { parsed?: Record<string,string>; error?: Error }
```
Options:
- path: single path or array of paths parsed in order; first wins unless override=true
- encoding: file encoding
- debug: prints parse and load diagnostics to console
- override: replace existing processEnv values
- processEnv: target object for assignment

## parse(input, options?)
Signature:
```js
parse(src: string | Buffer, options?: {
  debug?: boolean // Default: false
}): Record<string,string>
```
Returns an object of KEY→VALUE without assigning to process.env.

## populate(target, source, options?)
Signature:
```js
populate(target: object, source: object, options?: {
  override?: boolean // Default: false
  debug?: boolean    // Default: false
}): void
```
Writes key/value from source into target following override rule.

## decrypt(file, options?)
Signature:
```js
decrypt(input: string | Buffer, options?: {
  // decrypt options for encrypted .env files (requires dotenvx)
}): Record<string,string>
```

# Preload Mode

Preload without code modification:

node -r dotenv/config your_script.js

Supported CLI environment config vars:
- DOTENV_CONFIG_PATH
- DOTENV_CONFIG_ENCODING
- DOTENV_CONFIG_DEBUG
- DOTENV_CONFIG_OVERRIDE
- DOTENV_CONFIG_ENCODING
- DOTENV_CONFIG_PATH

# Examples

ESM:
```js
import 'dotenv/config'
```

Multiple files:
```js
require('dotenv').config({ path: ['.env.local', '.env'], override: true })
```

Custom processEnv target:
```js
const myEnv = {}
require('dotenv').config({ processEnv: myEnv })
```


## Attribution
- Source: Dotenv Configuration Library
- URL: https://github.com/motdotla/dotenv#readme
- License: MIT License
- Crawl Date: 2025-05-06T21:28:08.769Z
- Data Size: 649569 bytes
- Links Found: 5170

## Retrieved
2025-05-06
library/JS_YAML.md
# library/JS_YAML.md
# JS_YAML

## Crawl Summary
Installation via npm. CLI flags: --help, --version, --compact, --trace. API methods: load(string, options), loadAll(string, iterator, options), dump(object, options). Each method signature, return types, thrown YAMLException. Default schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA. Dump options: indent (2), noArrayIndent (false), skipInvalid (false), flowLevel (-1), styles, sortKeys (false), lineWidth (80), noRefs (false), noCompatMode (false), condenseFlow (false), quotingType (' by default), forceQuotes (false), replacer. Tag style presets per tag: !!null, !!int, !!bool, !!float. Supported YAML tags mapping to JS types. Key caveats: array/object keys conversion, implicit mapping lookup limitation.

## Normalised Extract
Table of Contents
1. Installation
2. CLI Usage
3. load()
4. loadAll()
5. dump()
6. Schemas
7. Styles
8. Types
9. Caveats

1. Installation
npm install js-yaml
npm install -g js-yaml

2. CLI Usage
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

3. load(string, options)
Signature: load(string, options)
Parameters:
  string: YAML document text
  options.filename: string|null (default null)
  options.onWarning: function(YAMLException)|null (default null)
  options.schema: Schema constant (DEFAULT_SCHEMA by default)
  options.json: boolean (default false)
Returns: parsed JS value
Throws: YAMLException on error or multi-doc input

4. loadAll(string, iterator?, options?)
Signature: loadAll(string, iterator?, options?)
Parameters:
  string: multi-document YAML text
  iterator: function(doc) to handle each document
  options: same as load()
Returns: array of parsed values (if no iterator) or undefined
Throws: YAMLException on parse error

5. dump(object, options)
Signature: dump(object, options)
Parameters:
  object: JS value to serialize
  options.indent: number (default 2)
  options.noArrayIndent: boolean (default false)
  options.skipInvalid: boolean (default false)
  options.flowLevel: number (default -1)
  options.styles: map tag=>style
  options.schema: Schema constant (DEFAULT_SCHEMA)
  options.sortKeys: boolean|function (default false)
  options.lineWidth: number (default 80)
  options.noRefs: boolean (default false)
  options.noCompatMode: boolean (default false)
  options.condenseFlow: boolean (default false)
  options.quotingType: ' or " (default ')
  options.forceQuotes: boolean (default false)
  options.replacer: function(key, value)
Returns: YAML-formatted string
Throws: YAMLException if invalid types and skipInvalid=false

6. Schemas
FAILSAFE_SCHEMA: only string, array, object
JSON_SCHEMA: JSON-compatible types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: full YAML 1.2 support

7. Styles
!!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty("")
!!int: binary(0b...), octal(0o...), decimal(...), hexadecimal(0x...)
!!bool: lowercase(true/false), uppercase(TRUE/FALSE), camelcase(True/False)
!!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

8. Types
!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

9. Caveats
JS objects/arrays as keys are stringified
Implicit block mapping key lookups unsupported

## Supplementary Details
Ensure safe dumping by using skipInvalid=true to omit functions and regexps. Example: dump(obj, { skipInvalid: true }). Use json option on load to accept duplicate keys override: load(str, { json: true }). To preserve references, set noRefs=false (default) else noRefs=true disables aliases. For key sorting in output: dump(obj, { sortKeys: true }) or custom sort function. To increase nesting block style to flow style at level 2: dump(obj, { flowLevel: 2 }). Adjust line width: dump(obj, { lineWidth: 120 }). Disable YAML1.1 compatibility: dump(obj, { noCompatMode: true }). Combine quoting: dump(obj, {  quotingType: '"', forceQuotes: true }).

## Reference Details
// Load single document
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const doc = yaml.load(fs.readFileSync('example.yml','utf8'),{
    filename:'example.yml',
    onWarning: warn=>console.warn(warn.message),
    schema: yaml.CORE_SCHEMA,
    json: true
  });
  console.log(doc);
} catch(e) {
  console.error(e.name, e.message);
}

// Load multiple documents
const docs = yaml.loadAll(fs.readFileSync('multi.yml','utf8'), null, { schema: yaml.DEFAULT_SCHEMA });
// Or with iterator
yaml.loadAll(data, d=>console.log(d), { onWarning: ()=>{} });

// Dump object to YAML
const out = yaml.dump({a:1,b:2}, {
  indent:4,
  noArrayIndent:true,
  skipInvalid:false,
  flowLevel:0,
  styles:{'!!int':'hexadecimal'},
  schema: yaml.JSON_SCHEMA,
  sortKeys:(a,b)=>a.localeCompare(b),
  lineWidth:120,
  noRefs:true,
  noCompatMode:true,
  condenseFlow:true,
  quotingType:'"',
  forceQuotes:true,
  replacer:(key,value)=>key==='secret'?undefined:value
});
fs.writeFileSync('out.yaml',out,'utf8');

// CLI version
// Check version
js-yaml --version
// Compact errors
js-yaml -c bad.yml
// Trace errors
js-yaml -t bad.yml

// Troubleshooting
// Command: js-yaml bad.yml
// Expected: YAMLException: unacceptable character at line X



## Information Dense Extract
load(string, {filename:null,onWarning:null, schema:DEFAULT_SCHEMA, json:false})=>any|throws YAMLException; loadAll(string, iterator?, options)=>any[]|undefined; dump(object,{indent:2,noArrayIndent:false,skipInvalid:false,flowLevel:-1,styles:{},schema:DEFAULT_SCHEMA,sortKeys:false,lineWidth:80,noRefs:false,noCompatMode:false,condenseFlow:false,quotingType:"'",forceQuotes:false,replacer})=>string.
Schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA.
Tag styles per tag: !!null[cano:~,lower,null,NULL, Null, ""], !!int[binary,octal,decimal,hex], !!bool[lower,upper,camel], !!float[lower,upper,camel].
Types: !!null,!!bool,!!int,!!float,!!binary,!!timestamp,!!omap,!!pairs,!!set,!!str,!!seq,!!map.
CLI flags:-h,-v,-c,-t.
Caveats: object/array keys stringify, implicit block mapping unsupported.

## Sanitised Extract
Table of Contents
1. Installation
2. CLI Usage
3. load()
4. loadAll()
5. dump()
6. Schemas
7. Styles
8. Types
9. Caveats

1. Installation
npm install js-yaml
npm install -g js-yaml

2. CLI Usage
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

3. load(string, options)
Signature: load(string, options)
Parameters:
  string: YAML document text
  options.filename: string|null (default null)
  options.onWarning: function(YAMLException)|null (default null)
  options.schema: Schema constant (DEFAULT_SCHEMA by default)
  options.json: boolean (default false)
Returns: parsed JS value
Throws: YAMLException on error or multi-doc input

4. loadAll(string, iterator?, options?)
Signature: loadAll(string, iterator?, options?)
Parameters:
  string: multi-document YAML text
  iterator: function(doc) to handle each document
  options: same as load()
Returns: array of parsed values (if no iterator) or undefined
Throws: YAMLException on parse error

5. dump(object, options)
Signature: dump(object, options)
Parameters:
  object: JS value to serialize
  options.indent: number (default 2)
  options.noArrayIndent: boolean (default false)
  options.skipInvalid: boolean (default false)
  options.flowLevel: number (default -1)
  options.styles: map tag=>style
  options.schema: Schema constant (DEFAULT_SCHEMA)
  options.sortKeys: boolean|function (default false)
  options.lineWidth: number (default 80)
  options.noRefs: boolean (default false)
  options.noCompatMode: boolean (default false)
  options.condenseFlow: boolean (default false)
  options.quotingType: ' or ' (default ')
  options.forceQuotes: boolean (default false)
  options.replacer: function(key, value)
Returns: YAML-formatted string
Throws: YAMLException if invalid types and skipInvalid=false

6. Schemas
FAILSAFE_SCHEMA: only string, array, object
JSON_SCHEMA: JSON-compatible types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: full YAML 1.2 support

7. Styles
!!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty('')
!!int: binary(0b...), octal(0o...), decimal(...), hexadecimal(0x...)
!!bool: lowercase(true/false), uppercase(TRUE/FALSE), camelcase(True/False)
!!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

8. Types
!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

9. Caveats
JS objects/arrays as keys are stringified
Implicit block mapping key lookups unsupported

## Original Source
js-yaml
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML API Reference (Retrieved 2024-06-12)

# Installation

npm install js-yaml
npm install -g js-yaml  // for CLI executable

# CLI Usage

js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

# load(string, options)

Parses a single YAML document string.

Signature:

  load(string, options)

Parameters:

  string: UTF-8 encoded YAML text
  options: {
    filename: string | null = null,
    onWarning: (YAMLException) => void | null = null,
    schema: Schema = DEFAULT_SCHEMA,
    json: boolean = false
  }

Returns: any (object|string|number|null|undefined)
Throws: YAMLException on parse error or multi-document input.

# loadAll(string, iterator, options)

Parses multi-document sources.

Signature:

  loadAll(string, iterator?, options?)

Parameters:

  string: UTF-8 YAML text with one or more documents
  iterator: (doc) => void (called per document)
  options: same as load()

Returns: any[] if iterator omitted, undefined if iterator provided.
Throws: YAMLException on parse error.

# dump(object, options)

Serializes JavaScript value to YAML.

Signature:

  dump(object, options)

Parameters:

  object: any JS value to serialize
  options: {
    indent: number = 2,
    noArrayIndent: boolean = false,
    skipInvalid: boolean = false,
    flowLevel: number = -1,
    styles: Record<string,string> = {},
    schema: Schema = DEFAULT_SCHEMA,
    sortKeys: boolean | ((a,b)=>number) = false,
    lineWidth: number = 80,
    noRefs: boolean = false,
    noCompatMode: boolean = false,
    condenseFlow: boolean = false,
    quotingType: "'" | '"' = "'",
    forceQuotes: boolean = false,
    replacer: (key,value) => any
  }

Returns: string (YAML document)
Throws: YAMLException on invalid types when skipInvalid=false.

# Schemas

  FAILSAFE_SCHEMA: strings, arrays, plain objects
  JSON_SCHEMA: JSON types
  CORE_SCHEMA: same as JSON_SCHEMA
  DEFAULT_SCHEMA: full YAML 1.2 spec types

# Supported Tag Styles

Tag          Style Names (effect)
!!null       canonical (~), lowercase (null), uppercase (NULL), camelcase (Null), empty ("")
!!int        binary (0b...), octal (0o...), decimal (...), hexadecimal (0x...)
!!bool       lowercase (true/false), uppercase (TRUE/FALSE), camelcase (True/False)
!!float      lowercase (.nan/.inf), uppercase (.NAN/.INF), camelcase (.NaN/.Inf)

# Supported Types

!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

# Caves & Limitations

- Objects/arrays as keys are stringified via toString().
- Implicit block mapping key lookups unsupported.



## Attribution
- Source: js-yaml
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT License
- Crawl Date: 2025-05-06T18:33:07.026Z
- Data Size: 564474 bytes
- Links Found: 4607

## Retrieved
2025-05-06
library/YARGS.md
# library/YARGS.md
# YARGS

## Crawl Summary
Installation: npm install --save yargs
Getting Started: import yargs and hideBin; call yargs().scriptName(name).usage(template).command(signature, description, builder, handler).help().parse(hideBin(process.argv))
CommonJS: const {argv}=require('yargs'); use argv.ships, argv.distance
ESM: import yargs, hideBin; call yargs(hideBin(process.argv)).command().demandCommand(1).argv
Deno: import from deno.land/x/yargs; use .strictCommands(), .demandCommand(1), .parse(Deno.args)
Breaking Changes: Conditional exports remove deep-file imports; rebase removed; Node 8 dropped.

## Normalised Extract
Table of Contents:
1 Installation
2 Getting Started
3 Defining Commands
4 Options and Positional Arguments
5 Help and Version
6 CJS and ESM Support
7 Deno Support
8 Breaking Changes

1 Installation:
Run npm install --save yargs

2 Getting Started:
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')

3 Defining Commands:
Syntax: .command(cmdSignature:string, description:string, builder?: (yargs:Yargs)=>Yargs, handler?: (argv:object)=>void)
builder example: builder.positional('name',{type:'string',default:'Cambi',describe:'the name to say hello to'})
handler example: (argv)=>console.log('hello', argv.name, 'welcome to yargs!')

4 Options and Positional Arguments:
.positional(key:string, opts:{type:'string'|'number'|'boolean',default?:any,describe:string,choices?:(string|number)[]})
.option(key:string, opts:{alias?:string|string[],type:'string'|'number'|'boolean',describe:string,default?:any,choices?:(string|number)[],demandOption?:boolean})

5 Help and Version:
.help([optionName:string])
.version([optionName:string],[description:string])
.alias(aliasOrKeys:string|string[],alias:string|string[])

6 CJS and ESM Support:
CommonJS: const {argv}=require('yargs')
ESM: import yargs from 'yargs'; import { hideBin } from 'yargs/helpers'

7 Deno Support:
import yargs from 'https://deno.land/x/yargs/deno.ts'
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts'

8 Breaking Changes:
- Conditional exports enforce explicit entry points
- 'rebase' helper removed
- Node 8 support dropped

## Supplementary Details
Core methods and options:
scriptName(name:string):Yargs — set binary name in help output
usage(template:string):Yargs — define usage banner with $0 placeholder
command(signature:string, description:string, builder?:BuilderCallback, handler?:HandlerCallback):Yargs — define commands
positional(key:string, opts:PositionalOptions):Yargs — configure positional arguments
option(key:string, opts:OptionDefinition):Yargs — configure named options
help(optionName?:string):Yargs — enable --help output
version(optionName?:string, description?:string):Yargs — enable --version output
alias(keys:string|string[], alias:string|string[]):Yargs — add alternative flags
demandCommand(min:number, max?:number, msg?:string):Yargs — require commands
strict(strict?:boolean):Yargs — fail on unknown options
strictCommands(strict?:boolean):Yargs — fail on unknown commands
strictOption(strict?:boolean):Yargs — fail on unknown options
showHelpOnFail(show:boolean|string):Yargs — show help and exit on failure
recommendCommands(threshold:number):Yargs — suggest closest commands
parse(argv?:string[], context?:object, callback?:ParseCallback):ParsedArguments — parse arguments synchronously or via callback

hideBin(argv:string[]):string[] — strip node and script path from argv

## Reference Details
- scriptName(name:string):YargsInstance — sets parser.bin to name
- usage(cmd:string):YargsInstance — defines usage banner, supports $0 substitution
- command(cmd: string, description:string, builder?: (yargs:Yargs)=>YargsInstance, handler?: (argv:object)=>void):YargsInstance
- positional(name:string, opts:{ type:'string'|'number'|'boolean', default?:any, describe:string, choices?:(string|number)[] }):YargsInstance
- option(name:string, opts:{ alias?:string|string[], type:'string'|'number'|'boolean', describe:string, default?:any, choices?:(string|number)[], demandOption?:boolean, requiresArg?:boolean, group?:string|string[], coerce?:(arg:any)=>any }):YargsInstance
- help(optionName?:string):YargsInstance — adds --help flag
- version(optionName?:string,description?:string):YargsInstance — adds --version flag
- alias(aliases:string|string[], key:string|string[]):YargsInstance — define alias mappings
- demandCommand(min:number, max?:number, msg?:string):YargsInstance — enforce command count
- strict(strict?:boolean):YargsInstance — fail on unknown options
- strictCommands(strict?:boolean):YargsInstance — fail on unknown commands
- strictOption(strict?:boolean):YargsInstance — fail on unknown options
- showHelpOnFail(show:boolean|string):YargsInstance — show help when validation fails
- recommendCommands(threshold:number):YargsInstance — suggest similar commands
- parse(argv?:string[], context?:object, callback?:(err:Error, argv:ParsedArguments, output:string)=>void):ParsedArguments

hideBin:
- hideBin(argv:string[]):string[] — returns argv.slice(2)

Implementation Pattern:
npm install --save yargs
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .scriptName('app')
  .usage('$0 <cmd> [opts]')
  .option('port',{ alias:'p', type:'number', default:3000, describe:'port to bind' })
  .command('start','start server',() => {}, argv => { console.log('listening on', argv.port) })
  .demandCommand(1)
  .strictCommands()
  .help()
  .parse()

Troubleshooting:
$ node app.js unknown
Error: Unknown argument: unknown
Use .strictCommands() to enforce commands and fail on unknown commands
$ node app.js start --unknownOption
Error: Unknown argument: unknownOption
Enable .strictOption() to enforce known options
$ node app.js --help
Displays usage, commands, options list

## Information Dense Extract
scriptName(name:string):Yargs; usage(cmd:string):Yargs; command(cmd:string,desc:string,builder?:BuilderCb,handler?:HandlerCb):Yargs; positional(key:string,opts:PosOpts):Yargs; option(key:string,opts:OptDef):Yargs; help(opt?:string):Yargs; version(opt?:string,desc?:string):Yargs; alias(keys:string|string[],alias:string|string[]):Yargs; demandCommand(min:number,max?:number,msg?:string):Yargs; strict(strict?:boolean):Yargs; strictCommands(strict?:boolean):Yargs; strictOption(strict?:boolean):Yargs; showHelpOnFail(show:boolean|string):Yargs; recommendCommands(threshold:number):Yargs; parse(argv?:string[],ctx?:object,cb?:ParseCb):ParsedArgs; hideBin(argv:string[]):string[]

## Sanitised Extract
Table of Contents:
1 Installation
2 Getting Started
3 Defining Commands
4 Options and Positional Arguments
5 Help and Version
6 CJS and ESM Support
7 Deno Support
8 Breaking Changes

1 Installation:
Run npm install --save yargs

2 Getting Started:
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')

3 Defining Commands:
Syntax: .command(cmdSignature:string, description:string, builder?: (yargs:Yargs)=>Yargs, handler?: (argv:object)=>void)
builder example: builder.positional('name',{type:'string',default:'Cambi',describe:'the name to say hello to'})
handler example: (argv)=>console.log('hello', argv.name, 'welcome to yargs!')

4 Options and Positional Arguments:
.positional(key:string, opts:{type:'string'|'number'|'boolean',default?:any,describe:string,choices?:(string|number)[]})
.option(key:string, opts:{alias?:string|string[],type:'string'|'number'|'boolean',describe:string,default?:any,choices?:(string|number)[],demandOption?:boolean})

5 Help and Version:
.help([optionName:string])
.version([optionName:string],[description:string])
.alias(aliasOrKeys:string|string[],alias:string|string[])

6 CJS and ESM Support:
CommonJS: const {argv}=require('yargs')
ESM: import yargs from 'yargs'; import { hideBin } from 'yargs/helpers'

7 Deno Support:
import yargs from 'https://deno.land/x/yargs/deno.ts'
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts'

8 Breaking Changes:
- Conditional exports enforce explicit entry points
- 'rebase' helper removed
- Node 8 support dropped

## Original Source
CLI Argument Parsing Libraries
https://yargs.js.org/docs/

## Digest of YARGS

# Installation

Run 'npm install --save yargs'

# Getting Started

#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (builder) => {
    builder.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    })
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .parse(hideBin(process.argv))

# CJS and ESM Usage

## CommonJS
const { argv } = require('yargs')

## ESM
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .argv

# Deno Support

import yargs from 'https://deno.land/x/yargs/deno.ts'
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts'

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', { describe: 'a list of files' })
  }, (argv: Arguments) => {
    console.info(argv)
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args)

# Breaking Changes

- Conditional exports: deep imports disabled
- Removed helper method 'rebase'
- Dropped Node 8 support

Date retrieved: 2024-06-14
Data Size: 348060 bytes
Links Found: 34
Error: None

## Attribution
- Source: CLI Argument Parsing Libraries
- URL: https://yargs.js.org/docs/
- License: MIT License
- Crawl Date: 2025-05-06T09:30:51.881Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-05-06
library/VITEST_GUIDE.md
# library/VITEST_GUIDE.md
# VITEST_GUIDE

## Crawl Summary
Install via npm/yarn/pnpm/bun; requires Vite>=5.0.0, Node>=18.0.0. Tests named *.test.* or *.spec.*; import { test, expect } from 'vitest'. Scripts: "test": "vitest", "coverage": "vitest run --coverage". Run: vitest / vitest run [--port][--https]; use bun run test for Bun. Vitest reads `test` property in vite.config.ts or higher‐priority vitest.config.ts (js/mjs/cjs/ts/cts/mts). CLI: --config override. Merge with mergeConfig. Workspaces: `test.workspace` as glob patterns or objects with name, root, environment, setupFiles. Env: VITEST_SKIP_INSTALL_CHECKS=1 disables prompts. Official VS Code extension. Build/link unreleased commits via pnpm link.

## Normalised Extract
Table of Contents
1. Installation and Requirements
2. Writing and Executing Tests
3. Unified Configuration (Vite + Vitest)
4. Vitest-Only Configuration
5. Merging Configs
6. Workspace Projects Support
7. CLI Flags and Scripts
8. Environment Variables
9. IDE Integration
10. Unreleased Dev Workflow

1. Installation and Requirements
• npm install --save-dev vitest
• yarn add --dev vitest
• pnpm add -D vitest
• bun add -D vitest
• Ensure Vite >=5.0.0, Node >=18.0.0

2. Writing and Executing Tests
• File name patterns: **/*.test.{js,ts} or **/*.spec.{js,ts}
• Core API imports: import { test, expect, beforeEach, afterEach } from 'vitest'
• Sample:
  test('description', () => { expect(fn()).toBe(value) })
• package.json:
  "scripts": { "test":"vitest", "coverage":"vitest run --coverage" }
• Commands:
  - Watch: npm run test
  - Single run: vitest run [--port 5123] [--https]
  - Bun: bun run test

3. Unified Configuration (Vite + Vitest)
• vite.config.ts or .js, defineConfig({ test: { include, exclude, globals, environment, coverage, setupFiles, root, alias } })
• Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
• Triple-slash for types: /// <reference types="vitest/config" />
• Example include: ['**/*.{test,spec}.{js,ts}']
• environment: 'node'|'jsdom'|'happy-dom'|'edge'
• coverage.provider: 'c8'|'istanbul'; reporter: ['text','html']; include/exclude patterns; all:true/false

4. Vitest-Only Configuration
• vitest.config.ts export default defineConfig({ test:{ root, environment, setupFiles, globals, timeout } })
• CLI override: --config <path>
• process.env.VITEST or mode parameter can conditionally switch settings

5. Merging Configs
• import { mergeConfig } from 'vitest/config'
• mergeConfig(baseViteConfig, defineConfig({ test:{ ... } }))

6. Workspace Projects Support
• test.workspace: Array<string|{ test: Partial<TestOptions> }>
• Globs to projects or config file paths
• Object entries accept name:string, root:string, environment:string, setupFiles:Array<string>

7. CLI Flags and Scripts
• vitest [--config <file>] [--run] [--watch] [--port <num>] [--https]
• Exit code indicates test pass/fail

8. Environment Variables
• VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency prompts

9. IDE Integration
• VS Code extension: installs vitest runner, inline results, code lenses

10. Unreleased Dev Workflow
• Install from pkg.pr.new: npm i https://pkg.pr.new/vitest@{commit}
• Local build and link via pnpm link


## Supplementary Details
• Default test include pattern: ['**/*.{test,spec}.{js,mjs,cjs,ts,cts,mts}']
• Default test exclude: ['node_modules']
• Default globals: false
• Default environment: 'node'
• Default coverage.provider: 'c8'
• Coverage default reporter: ['text']
• Default root directory: project root
• Default timeout: 5000ms
• mergeConfig behavior: deep merge of Vite and Vitest options
• Workspace default name: derived from project folder
• CLI default port: 5123
• CLI default https: disabled
• VS Code extension ID: vitest.vitest


## Reference Details
## Core API Signatures

import { describe, it, test, expect, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'

- test(name: string, fn: () => any | Promise<any>): void
- it(name: string, fn: () => any | Promise<any>): void
- describe(name: string, fn: () => void): void
- beforeEach(fn: () => any | Promise<any>): void
- afterEach(fn: () => any | Promise<any>): void
- beforeAll(fn: () => any | Promise<any>): void
- afterAll(fn: () => any | Promise<any>): void

### Expect Matchers

function expect<T>(value: T): Matchers<T>

interface Matchers<T> {
  toBe(expected: T): void
  toEqual(expected: any): void
  toMatch(predicate: (value: T) => boolean): void
  toThrow(expected?: string | RegExp | Error): void
  toContain(item: any): void
  toHaveLength(len: number): void
  toMatchSnapshot(name?: string): void
  // ...additional built-in and custom matchers
}

## Vitest Config Options (TestOptions)

test: {
  include?: string[]            // default ['**/*.{test,spec}.{js,ts}']
  exclude?: string[]            // default ['node_modules']
  globals?: boolean             // default false
  environment?: string          // default 'node'
  root?: string                 // default project root
  cache?: boolean               // default true
  clearMocks?: boolean          // default false
  coverage?: {
    provider?: 'c8'|'istanbul'
    reporter?: string[]         // e.g. ['text','html']
    include?: string[]
    exclude?: string[]
    all?: boolean               // default false
  }
  setupFiles?: string[]         // absolute or relative paths
  timeout?: number              // default 5000
  reporters?: Array<'default'|'json'|'junit'>
  alias?: Record<string,string> // Vite alias entries
}

## Example Implementation Pattern

1. Install Vitest
2. Create `vite.config.ts` with test section
3. Add scripts in package.json
4. Write test files with `.test.ts` suffix
5. Run `vitest run --coverage`
6. Inspect output in console and generated coverage HTML

## Troubleshooting Procedures

- Failing import resolution:
  ```bash
  # Add alias or ensure file extension is included
  vite.config.ts: { resolve:{ alias:{ '@': '/src' } } }
  ```
- Auto-install prompt stuck:
  ```bash
  export VITEST_SKIP_INSTALL_CHECKS=1
  ```
- Permission errors with Bun:
  ```bash
  bun run test   # avoid bun test
  ```
- Clearing cache:
  ```bash
  vitest run --clear-cache
  ```


## Information Dense Extract
Install: npm/yarn/pnpm/bun add --dev vitest; Requires Vite>=5.0.0, Node>=18.0.0. Patterns: **/*.{test,spec}.{js,mjs,cjs,ts,cts,mts}. API: test(name,fn), describe, beforeAll/Each, afterAll/Each; expect<T>(value).toBe/equal/matchSnapshot. Scripts: "test":"vitest", "coverage":"vitest run --coverage". CLI: vitest [--config file] [--run] [--port 5123] [--https]. Config via vite.config.ts or vitest.config.ts (extensions: .js,.mjs,.cjs,.ts,.cts,.mts); defineConfig({ test:{ include,exclude,globals,environment,node|jsdom|happy-dom|edge,coverage:{provider:c8|istanbul,reporter:['text','html'],include,exclude,all},setupFiles,timeout:5000,root,alias } }). Merge with mergeConfig(base, defineConfig(...)). Workspaces: test.workspace: globs or { name,root,environment,setupFiles }. Env: VITEST_SKIP_INSTALL_CHECKS=1. VS Code extension: vitest.vitest. Local dev: npm i https://pkg.pr.new/vitest@{commit} or build/link via pnpm link.

## Sanitised Extract
Table of Contents
1. Installation and Requirements
2. Writing and Executing Tests
3. Unified Configuration (Vite + Vitest)
4. Vitest-Only Configuration
5. Merging Configs
6. Workspace Projects Support
7. CLI Flags and Scripts
8. Environment Variables
9. IDE Integration
10. Unreleased Dev Workflow

1. Installation and Requirements
 npm install --save-dev vitest
 yarn add --dev vitest
 pnpm add -D vitest
 bun add -D vitest
 Ensure Vite >=5.0.0, Node >=18.0.0

2. Writing and Executing Tests
 File name patterns: **/*.test.{js,ts} or **/*.spec.{js,ts}
 Core API imports: import { test, expect, beforeEach, afterEach } from 'vitest'
 Sample:
  test('description', () => { expect(fn()).toBe(value) })
 package.json:
  'scripts': { 'test':'vitest', 'coverage':'vitest run --coverage' }
 Commands:
  - Watch: npm run test
  - Single run: vitest run [--port 5123] [--https]
  - Bun: bun run test

3. Unified Configuration (Vite + Vitest)
 vite.config.ts or .js, defineConfig({ test: { include, exclude, globals, environment, coverage, setupFiles, root, alias } })
 Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
 Triple-slash for types: /// <reference types='vitest/config' />
 Example include: ['**/*.{test,spec}.{js,ts}']
 environment: 'node'|'jsdom'|'happy-dom'|'edge'
 coverage.provider: 'c8'|'istanbul'; reporter: ['text','html']; include/exclude patterns; all:true/false

4. Vitest-Only Configuration
 vitest.config.ts export default defineConfig({ test:{ root, environment, setupFiles, globals, timeout } })
 CLI override: --config <path>
 process.env.VITEST or mode parameter can conditionally switch settings

5. Merging Configs
 import { mergeConfig } from 'vitest/config'
 mergeConfig(baseViteConfig, defineConfig({ test:{ ... } }))

6. Workspace Projects Support
 test.workspace: Array<string|{ test: Partial<TestOptions> }>
 Globs to projects or config file paths
 Object entries accept name:string, root:string, environment:string, setupFiles:Array<string>

7. CLI Flags and Scripts
 vitest [--config <file>] [--run] [--watch] [--port <num>] [--https]
 Exit code indicates test pass/fail

8. Environment Variables
 VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency prompts

9. IDE Integration
 VS Code extension: installs vitest runner, inline results, code lenses

10. Unreleased Dev Workflow
 Install from pkg.pr.new: npm i https://pkg.pr.new/vitest@{commit}
 Local build and link via pnpm link

## Original Source
Testing Node.js APIs
https://vitest.dev/guide/

## Digest of VITEST_GUIDE

# Vitest Guide

Retrieved: 2024-07-17

## 1. Installation and Requirements

- Supported package managers and install commands:
  - npm: `npm install --save-dev vitest`
  - yarn: `yarn add --dev vitest`
  - pnpm: `pnpm add -D vitest`
  - bun: `bun add -D vitest`
- Requirements:
  - Vite >= 5.0.0
  - Node.js >= 18.0.0

## 2. Writing and Running Tests

- Test file naming:
  - Must include `.test.` or `.spec.` in the filename.
- Example test:
  ```js
  // sum.js
  export function sum(a, b) {
    return a + b
  }

  // sum.test.js
  import { expect, test } from 'vitest'
  import { sum } from './sum.js'

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
  ```
- Add script to `package.json`:
  ```json
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
  ```
- Run commands:
  - Watch mode: `npm run test` / `yarn test` / `pnpm test`
  - Single run: `vitest run [--port <num>] [--https]`
  - For Bun: `bun run test`

## 3. Configuration

### 3.1 Unified Vite + Vitest Config

- If `vite.config.ts` exists at project root, Vitest will read its `test` property.
- Triple-slash directive for types (Vitest >=2.1):
  ```ts
  /// <reference types="vitest/config" />
  import { defineConfig } from 'vite'

  export default defineConfig({
    test: {
      include: ['**/*.{test,spec}.{js,ts}'],
      exclude: ['node_modules'],
      globals: true,
      environment: 'node',
      coverage: {
        provider: 'c8',
        reporter: ['text', 'html'],
        exclude: ['**/node_modules/**'],
        include: ['src/**/*']
      },
      setupFiles: ['./test/setup.ts']
    }
  })
  ```
- Supported config file extensions: `.js`, `.mjs`, `.cjs`, `.ts`, `.cts`, `.mts` (no `.json`).

### 3.2 Separate Vitest Config

- Create `vitest.config.ts` with higher priority:
  ```ts
  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      root: './tests',
      environment: 'happy-dom',
      setupFiles: ['./tests/setup.happy-dom.ts']
    }
  })
  ```
- CLI override: `vitest --config ./path/to/vitest.config.ts`
- Conditional mode in `vite.config.ts`:
  ```ts
  import { defineConfig } from 'vite'

  export default defineConfig(({ mode }) => ({
    test: {
      environment: mode === 'test' ? 'node' : 'jsdom'
    }
  }))
  ```

### 3.3 Merging Configs

- Use `mergeConfig` from `vitest/config`:
  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config'
  import baseConfig from './vite.config.mjs'

  export default mergeConfig(
    baseConfig,
    defineConfig({
      test: { globals: false }
    })
  )
  ```

## 4. Workspaces Support

- In `vitest.config.ts`:
  ```ts
  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      workspace: [
        'packages/*',
        'tests/*/vitest.config.{e2e,unit}.ts',
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
  })
  ```

## 5. Environment Variables

- Disable auto-install checks: `export VITEST_SKIP_INSTALL_CHECKS=1`

## 6. IDE Integrations

- Official VS Code extension: install from Marketplace.

## 7. Examples and Playgrounds

- Available presets in online playground for frameworks: React, Vue, Svelte, Preact, Solid, Lit, Fastify, etc.

## 8. Unreleased and Local Development

- Install unreleased commit: `npm i https://pkg.pr.new/vitest@{commit}`
- Build and link locally:
  ```bash
  git clone https://github.com/vitest-dev/vitest.git
  cd vitest
  pnpm install
  pnpm run build
  pnpm link --global
  # In your project:
  pnpm link --global vitest
  ```

## Attribution
- Source: Testing Node.js APIs
- URL: https://vitest.dev/guide/
- License: MIT License
- Crawl Date: 2025-05-06T12:34:07.361Z
- Data Size: 31526650 bytes
- Links Found: 24322

## Retrieved
2025-05-06
