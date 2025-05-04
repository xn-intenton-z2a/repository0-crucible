library/YARGS_CORE.md
# library/YARGS_CORE.md
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
library/VITEST_SETUP.md
# library/VITEST_SETUP.md
# VITEST_SETUP

## Crawl Summary
Install: npm install -D vitest, requires Vite>=5.0.0 & Node>=18.0.0. Tests: files must end in .test. or .spec., import {test, expect}, add scripts. Config: use Vite config or standalone vitest.config.ts with defineConfig({test: {}}); CLI: vitest run, vitest --config, options --port, --https; Workspaces: workspace array. Env var VITEST_SKIP_INSTALL_CHECKS. IDE: VSCode extension.

## Normalised Extract
Table of Contents:
1. Installation
2. Writing Tests
3. Scripts
4. Configuration
   4.1 Unified Vite
   4.2 Standalone
   4.3 CLI Override
   4.4 Merging Configs
5. Workspaces
6. CLI Usage
7. Environment Variables
8. IDE Integration

1. Installation
- npm install -D vitest
- yarn add -D vitest
- pnpm add -D vitest
- bun add -D vitest

2. Writing Tests
sum.js
 export function sum(a: number, b: number): number { return a + b }

sum.test.js
 import { test, expect } from 'vitest'
 import { sum } from './sum.js'
 test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })

3. Scripts
package.json
  "scripts": { "test": "vitest", "coverage": "vitest run --coverage" }

4. Configuration
4.1 Unified Vite
 vite.config.ts
  import { defineConfig } from 'vite'
  export default defineConfig({ resolve: {...}, plugins: [...], test: { include: ['**/*.test.ts'], environment: 'node', globals: true } })

4.2 Standalone
 vitest.config.ts
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test: { include: ['tests/**/*.spec.ts'], environment: 'happy-dom', setupFiles: ['./setup.ts'], coverage: { reporter: ['text', 'lcov'], include: ['src/**/*.ts'], exclude: ['**/*.d.ts'] } } })

4.3 CLI Override
 vitest --config ./path/to/vitest.config.ts --port 5123 --https

4.4 Merging Configs
 mergeConfig(viteConfig, defineConfig({ test: { threads: false, reporters: ['dot', 'json'], threads: true } }))

5. Workspaces
vitest.config.ts
 test.workspace: [ 'packages/*', 'tests/*/vitest.config.{e2e,unit}.ts', { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } } ]

6. CLI Usage
 - vitest            # watch
 - vitest run        # one-time
 - vitest run --coverage
 - vitest --help     # list options (e.g. --dir, --maxThreads, --duration)

7. Environment Variables
 VITEST_SKIP_INSTALL_CHECKS=1
 VITEST_THREAD_COUNT=4

8. IDE Integration
 Visual Studio Code extension: 'Vitest Runner'


## Supplementary Details
Parameter List:
- test.include: string[] default ['**/*.{test,spec}.{js,mjs,cjs,ts,jsx,tsx}']
- test.exclude: string[] default ['node_modules']
- test.environment: 'node'|'jsdom'|'happy-dom' default 'node'
- test.globals: boolean default false
- test.setupFiles: string[] default []
- test.coverage.reporter: string[] default ['text']
- test.coverage.exclude: string[] default []
- test.threads: boolean|number default true (auto)

Implementation Steps:
1. Ensure Vite >=5 & Node >=18
2. Install vitest
3. Create config (optional)
4. Write tests matching include
5. Run vitest
6. View coverage reports

Best Practices:
- Use globals:true to avoid imports of expect/test
- Use .spec.ts for integration tests
- Keep unit and e2e configs separate
- Use coverage thresholds in config under test.threshold


## Reference Details
API: test(name: string, fn: () => void | Promise<void> | AsyncFunction, timeout?: number) => void
 global functions: describe(name: string, fn: () => void)
 expect(value: any).toBe(expected: any): void
 expect(value).toEqual(expected: any): void
 expect(value).toMatchInlineSnapshot(snapshot?: string): void
 expect(value).toThrow(error?: string|RegExp|Function): void

Vitest CLI Options:
--config: string path
--run: boolean
--watch: boolean
--port: number default 5113
--https: boolean
--dir: string test root default cwd
--exclude: string[] default ['node_modules']

Configuration Options (test property):
- include: string[] (glob)
- exclude: string[] (glob)
- dir: string
- threads: boolean|number
- pool: boolean default false
- environment: 'node'|'jsdom'|'happy-dom'
- globals: boolean
- reporters: string[] default ['default']
- logHeapUsage: boolean default false
- watch: boolean default true
- coverage: { enabled: boolean, reporter: string[], reportsDirectory: string }

Implementation Pattern:
1. defineConfig from 'vitest/config'
2. export default defineConfig({ test: { ... } })
3. (optional) mergeConfig

Troubleshooting:
Command: vitest run --coverage
Output: Error: Cannot find module 'happy-dom'
Fix: npm install happy-dom

Command: test files not found
Check: test.include globs, file extensions

Coverage missing
Set coverage.enabled true and include patterns



## Information Dense Extract
install|-D vitest;npm,yarn,pnpm,bun;require Vite>=5,Node>=18;tests: .test/.spec;import{test,expect};script:test=vitest;config:test.include=['**/*.{test,spec}.{js,ts}'],test.environment=node|jsdom|happy-dom,test.globals,setupFiles,coverage.reporter,threads;use defineConfig in vitest/config;CLI:--config,run,watch,port,https,dir;workspaces: array of glob or config objects;env VITEST_SKIP_INSTALL_CHECKS;API:test(name,fn,timeout?),describe,expect.toBe,toEqual,toThrow;reconfigure via mergeConfig;troubleshoot missing deps or globs

## Sanitised Extract
Table of Contents:
1. Installation
2. Writing Tests
3. Scripts
4. Configuration
   4.1 Unified Vite
   4.2 Standalone
   4.3 CLI Override
   4.4 Merging Configs
5. Workspaces
6. CLI Usage
7. Environment Variables
8. IDE Integration

1. Installation
- npm install -D vitest
- yarn add -D vitest
- pnpm add -D vitest
- bun add -D vitest

2. Writing Tests
sum.js
 export function sum(a: number, b: number): number { return a + b }

sum.test.js
 import { test, expect } from 'vitest'
 import { sum } from './sum.js'
 test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })

3. Scripts
package.json
  'scripts': { 'test': 'vitest', 'coverage': 'vitest run --coverage' }

4. Configuration
4.1 Unified Vite
 vite.config.ts
  import { defineConfig } from 'vite'
  export default defineConfig({ resolve: {...}, plugins: [...], test: { include: ['**/*.test.ts'], environment: 'node', globals: true } })

4.2 Standalone
 vitest.config.ts
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test: { include: ['tests/**/*.spec.ts'], environment: 'happy-dom', setupFiles: ['./setup.ts'], coverage: { reporter: ['text', 'lcov'], include: ['src/**/*.ts'], exclude: ['**/*.d.ts'] } } })

4.3 CLI Override
 vitest --config ./path/to/vitest.config.ts --port 5123 --https

4.4 Merging Configs
 mergeConfig(viteConfig, defineConfig({ test: { threads: false, reporters: ['dot', 'json'], threads: true } }))

5. Workspaces
vitest.config.ts
 test.workspace: [ 'packages/*', 'tests/*/vitest.config.{e2e,unit}.ts', { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } } ]

6. CLI Usage
 - vitest            # watch
 - vitest run        # one-time
 - vitest run --coverage
 - vitest --help     # list options (e.g. --dir, --maxThreads, --duration)

7. Environment Variables
 VITEST_SKIP_INSTALL_CHECKS=1
 VITEST_THREAD_COUNT=4

8. IDE Integration
 Visual Studio Code extension: 'Vitest Runner'

## Original Source
Vitest Documentation
https://vitest.dev/guide/

## Digest of VITEST_SETUP

# Vitest Setup and Configuration

## Adding Vitest to Your Project

Install as dev dependency:

- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest

Requirements:
- Vite >=5.0.0
- Node >=18.0.0

## Writing Tests

Create sum.js:
```js
export function sum(a, b) {
  return a + b
}
```
Create sum.test.js:
```js
import { test, expect } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

Add script to package.json:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run tests:
- npm run test
- yarn test
- pnpm test
- bun run test (for bun)

## Configuration

Unified with Vite:
- vitest reads root vite.config.ts
- Use resolve.alias, plugins directly

Override testing config:
1. Create vitest.config.ts with defineConfig({ test: {} })
2. Pass --config to CLI: vitest --config ./vitest.config.ts
3. Use process.env.VITEST or defineConfig(mode)

Supported config file extensions: .js .mjs .cjs .ts .cts .mts (no .json)

Standalone config (no Vite):
vitest.config.ts:
```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: { /* options */ }
})
```

Vite config integration:
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
export default defineConfig({
  test: { /* options */ }
})
```

Merge with existing Vite config:
```js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'
export default mergeConfig(viteConfig, defineConfig({ test: { /* options */ } }))
```

## Workspaces Support

vitest.config.ts:
```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
      { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
    ]
  }
})
```

## Command Line Interface

Default npm scripts:
```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

Run once without watch: vitest run
Options: --port, --https, etc.

## Environment Variables

- VITEST_SKIP_INSTALL_CHECKS=1: disable automatic dependency prompts

## IDE Integration

VS Code extension: install from Marketplace

Last Updated: 2023-10-03

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/guide/
- License: MIT License
- Crawl Date: 2025-05-04T01:09:09.545Z
- Data Size: 25819763 bytes
- Links Found: 21879

## Retrieved
2025-05-04
library/OPENAI_NODE_SDK.md
# library/OPENAI_NODE_SDK.md
# OPENAI_NODE_SDK

## Crawl Summary
Installation commands; client constructor options with defaults (apiKey, maxRetries, timeout, fetch, httpAgent, dangerouslyAllowBrowser, azureADTokenProvider, apiVersion); primary APIs: responses.create, chat.completions.create, files.create with exact params and return types; SSE streaming usage; file upload input types; error classes mapping HTTP codes; retry defaults on connection, 408,409,429,>=500; timeout default 600000ms; access request_id via property or withResponse; auto-pagination methods; WebSocket realtime API; AzureOpenAI usage; advanced usage asResponse, withResponse; custom HTTP verbs; fetch shims; logging middleware via fetch override or DEBUG; HTTP agent config; semantic versioning notes; supported runtimes.

## Normalised Extract
Table of Contents
1 Installation
2 Client Configuration
3 Responses API
4 Chat Completions API
5 Streaming
6 File Uploads
7 Error Handling
8 Retries
9 Timeouts
10 Request IDs
11 Auto-pagination
12 Realtime API Beta
13 Azure OpenAI
14 Advanced Usage
15 Custom Requests
16 Fetch Client Shim
17 Logging and Middleware
18 HTTP(S) Agent
19 Semantic Versioning
20 Requirements

1 Installation
npm install openai
deno add jsr:@openai/openai
npx jsr add @openai/openai

2 Client Configuration
Constructor: new OpenAI(options)
options.apiKey?: string (default from env OPENAI_API_KEY)
options.maxRetries?: number (default 2)
options.timeout?: number ms (default 600000)
options.fetch?: function(url, init) => Promise<Response)
options.httpAgent?: Agent
options.dangerouslyAllowBrowser?: boolean (default false)
options.azureADTokenProvider?: BearerTokenProvider
options.apiVersion?: string

3 Responses API
client.responses.create(
  {model: string; instructions?: string; input?: string; stream?: boolean},
  {maxRetries?: number; timeout?: number; httpAgent?: Agent}
)
Returns Promise<{output_text: string; _request_id: string}> or AsyncIterable<ServerSentEvent>

4 Chat Completions API
client.chat.completions.create(
  {model: string; messages: {role: 'developer'|'user'|'assistant'; content: string}[]; stream?: boolean; temperature?: number; max_tokens?: number},
  RequestOptions
)
Returns Promise<ChatCompletionResponse> or AsyncIterable<ServerSentEvent>

5 Streaming
Use stream: true. Example: const stream = await client.responses.create({model, input, stream:true}); for await (const ev of stream) console.log(ev);

6 File Uploads
client.files.create({file: fs.ReadStream|File|Response|toFile(buffer,filename); purpose: 'fine-tune'});
Supports fs.createReadStream, File, fetch Response, toFile helper

7 Error Handling
Throws OpenAI.APIError subclasses
Properties: request_id, status, name, headers
Mapping: 400 BadRequestError, 401 AuthenticationError, 403 PermissionDeniedError, 404 NotFoundError, 422 UnprocessableEntityError, 429 RateLimitError, >=500 InternalServerError, network APIConnectionError

8 Retries
Default 2 retries for network errors, 408, 409, 429, >=500
Override via maxRetries in client or per request

9 Timeouts
Default 600000 ms
Throws APIConnectionTimeoutError
Retries twice by default
Override via timeout in client or per request

10 Request IDs
Access via response._request_id
Or withResponse(): const {data, request_id} = await client.responses.create(params).withResponse();

11 Auto-pagination
List methods return Page<T>
Use for await of client.fineTuning.jobs.list({limit}) or manual page.hasNextPage() and page.getNextPage()

12 Realtime API Beta
Use WebSocket:
const rt = new OpenAIRealtimeWebSocket({model})
rt.on('response.text.delta',(event)=>...)

13 Azure OpenAI
Use AzureOpenAI class:
new AzureOpenAI({azureADTokenProvider, apiVersion})
openai.chat.completions.create({model, messages})

14 Advanced Usage
.asResponse() returns raw Response
.withResponse() returns {data, response}

15 Custom Requests
client.post('/path',{body,query});
Allow undocumented params with @ts-expect-error

16 Fetch Client Shim
import 'openai/shims/web' for global fetch
import 'openai/shims/node' for node-fetch polyfill

17 Logging and Middleware
Pass fetch override in client options to intercept
Set DEBUG=true to auto log requests/responses

18 HTTP(S) Agent
Default connection pooling
Override via httpAgent in client or per request

19 Semantic Versioning
Follows SemVer; minor may include static-type breaking changes

20 Requirements
TypeScript>=4.5; Node.js>=18; Deno>=1.28.0; Bun>=1.0; Cloudflare Workers; Vercel Edge; Jest>=28+node; Nitro>=2.6; Browser support via dangerouslyAllowBrowser

## Supplementary Details
ClientOptions defaults: maxRetries=2; timeout=600000ms; dangerouslyAllowBrowser=false. SSE Streaming: uses EventSource protocol under the hood; each chunk decoded to ServerSentEvent objects with fields data:string, event?:string, id?:string. File uploads: toFile(buffer,filename) returns {path: string; name: string; data: Buffer} accepted by files.create. RequestOptions fields: maxRetries, timeout (ms), httpAgent. ChatCompletionResponse: { id:string; object:'chat.completion'; created:number; model:string; choices:Array<{index:number; message:{role:string; content:string}; finish_reason:string}>; usage:{prompt_tokens:number; completion_tokens:number; total_tokens:number}}. Page<T>: { data:T[]; hasNextPage():boolean; getNextPage():Promise<Page<T>> }. OpenAIRealtimeWebSocket: methods: constructor(options:{ model:string; url?: string }); on(event:'response.text.delta', callback:(event:{delta:string})=>void); on(event:'response.audio.delta', callback:(event:{delta:ArrayBuffer})=>void); close():void. AzureOpenAI differences: endpoints prefix with /openai/deployments/{model}/...; param names same. Raw response access: .asResponse(): Promise<Response>; .withResponse(): Promise<{data:any; response:Response}>. Custom HTTP verbs: client.get<T>(path:string, options:{query?:any; headers?:any}): Promise<T>.

## Reference Details
// Client class
interface OpenAIOptions {
  apiKey?: string;
  maxRetries?: number;
  timeout?: number;
  fetch?: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
  httpAgent?: Agent;
  dangerouslyAllowBrowser?: boolean;
  azureADTokenProvider?: BearerTokenProvider;
  apiVersion?: string;
}
class OpenAI {
  constructor(options?: OpenAIOptions);
  responses: {
    create(
      params: {
        model: string;
        instructions?: string;
        input?: string;
        stream?: boolean;
      },
      options?: { maxRetries?: number; timeout?: number; httpAgent?: Agent }
    ): Promise<{ output_text: string; _request_id: string }> | AsyncIterable<ServerSentEvent>;
  }
  chat: {
    completions: {
      create(
        params: {
          model: string;
          messages: { role: 'developer'|'user'|'assistant'; content: string }[];
          stream?: boolean;
          temperature?: number;
          max_tokens?: number;
        },
        options?: { maxRetries?: number; timeout?: number; httpAgent?: Agent }
      ): Promise<ChatCompletionResponse> | AsyncIterable<ServerSentEvent>;
    }
  }
  files: {
    create(
      params: {
        file: File|fs.ReadStream|Response|{ toFile: Function }|Buffer|Uint8Array;
        purpose: 'fine-tune'|'search'|'answers';
      },
      options?: { maxRetries?: number; timeout?: number; httpAgent?: Agent }
    ): Promise<{ id: string; object: string; bytes: number; created_at: number; filename: string; purpose: string; _request_id: string }>;
  }
  post<T>(path: string, options: { body?: any; query?: any; headers?: any }): Promise<T>;
}

// Error classes
namespace OpenAI {
  class APIError extends Error {
    request_id: string;
    status: number;
    name: string;
    headers: Record<string,string>;
  }
  class BadRequestError extends APIError {}
  class AuthenticationError extends APIError {}
  class PermissionDeniedError extends APIError {}
  class NotFoundError extends APIError {}
  class UnprocessableEntityError extends APIError {}
  class RateLimitError extends APIError {}
  class InternalServerError extends APIError {}
  class APIConnectionError extends Error {}
  class APIConnectionTimeoutError extends APIConnectionError {}
}

// Usage examples
toFile(buffer: Buffer|Uint8Array, filename: string): Promise<{blob: Blob; name: string}>;

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, maxRetries: 5, timeout: 20000, httpAgent: new HttpsProxyAgent(URL) });

// Text generation
const response = await client.responses.create({ model: 'gpt-4o', instructions: 'Pirate', input: 'Semicolons?' });
console.log(response.output_text);

// Chat completion
const completion = await client.chat.completions.create({ model: 'gpt-4o', messages: [{role:'user',content:'Hello'}], temperature:0.7, max_tokens:100 });
console.log(completion.choices[0].message.content);

// Streaming
for await (const ev of await client.chat.completions.create({ model: 'gpt-4o', messages, stream: true })) { console.log(ev.data); }

// File upload
await client.files.create({ file: fs.createReadStream('file.jsonl'), purpose: 'fine-tune' });

// Error handling
try { await client.chat.completions.create({ model:'invalid', messages }); } catch (err) { if (err instanceof OpenAI.AuthenticationError) handleAuth(); }

// WebSocket realtime
const rt = new OpenAIRealtimeWebSocket({ model: 'gpt-4o-realtime-preview' });
rt.on('response.text.delta', e => process.stdout.write(e.delta));

// Troubleshooting
# Enable debug logs
DEBUG=true node script.js
# Inspect request ID
console.log(response._request_id);
# Capture raw response
const raw = await client.responses.create({ model, input }).asResponse();
console.log(raw.status, raw.headers.get('content-type'));

## Information Dense Extract
apiKey=env;maxRetries=2;timeout=600000;fetchOverride;httpAgent;dangerouslyAllowBrowser=false;azureADToken;apiVersion. responses.create(params{model:string;instructions?;input?;stream?},opts{maxRetries?;timeout?;httpAgent?})->Promise<{output_text;_request_id}>|AsyncIterable<SSE>. chat.completions.create(params{model;messages[];stream?;temperature?;max_tokens?},opts?)->Promise<ChatResp>|AsyncIterable<SSE>. files.create(params{file:fs.ReadStream|File|Response|toFile;purpose},opts?)->Promise<FileObj>. stream: for await ev of create({stream:true}). Error classes map HTTP codes. Retries on network,408,409,429,>=500;override maxRetries. Timeout default600000ms;throws APIConnectionTimeoutError;retry2. RequestID: resp._request_id or .withResponse(). Pagination: for await page of client.jobs.list or manual page.getNextPage(). Realtime: new OpenAIRealtimeWebSocket({model}).on('response.text.delta',cb). AzureOpenAI: new AzureOpenAI({azureADTokenProvider,apiVersion}). Advanced: .asResponse(), .withResponse(). Custom: client.get/post(path,{body,query}). Shim: import openai/shims/web/node. Logging: fetch override or DEBUG env. HTTP Agent: default pooled; override via httpAgent.

## Sanitised Extract
Table of Contents
1 Installation
2 Client Configuration
3 Responses API
4 Chat Completions API
5 Streaming
6 File Uploads
7 Error Handling
8 Retries
9 Timeouts
10 Request IDs
11 Auto-pagination
12 Realtime API Beta
13 Azure OpenAI
14 Advanced Usage
15 Custom Requests
16 Fetch Client Shim
17 Logging and Middleware
18 HTTP(S) Agent
19 Semantic Versioning
20 Requirements

1 Installation
npm install openai
deno add jsr:@openai/openai
npx jsr add @openai/openai

2 Client Configuration
Constructor: new OpenAI(options)
options.apiKey?: string (default from env OPENAI_API_KEY)
options.maxRetries?: number (default 2)
options.timeout?: number ms (default 600000)
options.fetch?: function(url, init) => Promise<Response)
options.httpAgent?: Agent
options.dangerouslyAllowBrowser?: boolean (default false)
options.azureADTokenProvider?: BearerTokenProvider
options.apiVersion?: string

3 Responses API
client.responses.create(
  {model: string; instructions?: string; input?: string; stream?: boolean},
  {maxRetries?: number; timeout?: number; httpAgent?: Agent}
)
Returns Promise<{output_text: string; _request_id: string}> or AsyncIterable<ServerSentEvent>

4 Chat Completions API
client.chat.completions.create(
  {model: string; messages: {role: 'developer'|'user'|'assistant'; content: string}[]; stream?: boolean; temperature?: number; max_tokens?: number},
  RequestOptions
)
Returns Promise<ChatCompletionResponse> or AsyncIterable<ServerSentEvent>

5 Streaming
Use stream: true. Example: const stream = await client.responses.create({model, input, stream:true}); for await (const ev of stream) console.log(ev);

6 File Uploads
client.files.create({file: fs.ReadStream|File|Response|toFile(buffer,filename); purpose: 'fine-tune'});
Supports fs.createReadStream, File, fetch Response, toFile helper

7 Error Handling
Throws OpenAI.APIError subclasses
Properties: request_id, status, name, headers
Mapping: 400 BadRequestError, 401 AuthenticationError, 403 PermissionDeniedError, 404 NotFoundError, 422 UnprocessableEntityError, 429 RateLimitError, >=500 InternalServerError, network APIConnectionError

8 Retries
Default 2 retries for network errors, 408, 409, 429, >=500
Override via maxRetries in client or per request

9 Timeouts
Default 600000 ms
Throws APIConnectionTimeoutError
Retries twice by default
Override via timeout in client or per request

10 Request IDs
Access via response._request_id
Or withResponse(): const {data, request_id} = await client.responses.create(params).withResponse();

11 Auto-pagination
List methods return Page<T>
Use for await of client.fineTuning.jobs.list({limit}) or manual page.hasNextPage() and page.getNextPage()

12 Realtime API Beta
Use WebSocket:
const rt = new OpenAIRealtimeWebSocket({model})
rt.on('response.text.delta',(event)=>...)

13 Azure OpenAI
Use AzureOpenAI class:
new AzureOpenAI({azureADTokenProvider, apiVersion})
openai.chat.completions.create({model, messages})

14 Advanced Usage
.asResponse() returns raw Response
.withResponse() returns {data, response}

15 Custom Requests
client.post('/path',{body,query});
Allow undocumented params with @ts-expect-error

16 Fetch Client Shim
import 'openai/shims/web' for global fetch
import 'openai/shims/node' for node-fetch polyfill

17 Logging and Middleware
Pass fetch override in client options to intercept
Set DEBUG=true to auto log requests/responses

18 HTTP(S) Agent
Default connection pooling
Override via httpAgent in client or per request

19 Semantic Versioning
Follows SemVer; minor may include static-type breaking changes

20 Requirements
TypeScript>=4.5; Node.js>=18; Deno>=1.28.0; Bun>=1.0; Cloudflare Workers; Vercel Edge; Jest>=28+node; Nitro>=2.6; Browser support via dangerouslyAllowBrowser

## Original Source
OpenAI Node.js SDK
https://github.com/openai/openai-node#readme

## Digest of OPENAI_NODE_SDK

# OPENAI NODE.JS SDK (Retrieved 2024-06-30)

## Installation

```bash
npm install openai
# Deno / JSR
deno add jsr:@openai/openai
npx jsr add @openai/openai
``` 

## Client Configuration

Constructor: `new OpenAI(options?: OpenAIOptions)`

Options:
- `apiKey?: string`  (default from OPENAI_API_KEY env)
- `maxRetries?: number`  (default 2)
- `timeout?: number`  (ms, default 600000)
- `fetch?: (url: RequestInfo, init?: RequestInit) => Promise<Response>`
- `httpAgent?: http.Agent | https.Agent`
- `dangerouslyAllowBrowser?: boolean`  (default false)
- `azureADTokenProvider?: BearerTokenProvider`
- `apiVersion?: string`

## Responses API

```ts
client.responses.create(
  params: { model: string; instructions?: string; input?: string; stream?: boolean },
  options?: { maxRetries?: number; timeout?: number; httpAgent?: Agent }
): Promise<{ output_text: string; _request_id: string } | AsyncIterable<ServerSentEvent> >
```

## Chat Completions API

```ts
client.chat.completions.create(
  params: { model: string; messages: Array<{ role: 'developer'|'user'|'assistant'; content: string }>; stream?: boolean; temperature?: number; max_tokens?: number },
  options?: RequestOptions
): Promise<ChatCompletionResponse | AsyncIterable<ServerSentEvent>>
```

## Streaming

Use `stream: true` and for-await:

```ts
const stream = await client.responses.create({ model, input, stream: true });
for await (const event of stream) { console.log(event); }
```

## File Uploads

```ts
client.files.create({ file: fs.ReadStream | File | Response | toFile(buffer, filename); purpose: 'fine-tune' });
```

## Error Handling

Throws subclasses of `OpenAI.APIError` with:
- `request_id: string`
- `status: number`
- `name: string`
- `headers: Record<string,string>`

Error mapping:
- 400: BadRequestError
- 401: AuthenticationError
- 403: PermissionDeniedError
- 404: NotFoundError
- 422: UnprocessableEntityError
- 429: RateLimitError
- >=500: InternalServerError
- network: APIConnectionError

## Retries

Defaults: 2 attempts on connection errors, 408, 409, 429, >=500.
Override via `maxRetries` in client or per request.

## Timeouts

Default: 600000 ms.  Throws `APIConnectionTimeoutError`.  Retry twice.
Override via `timeout` in client or per request.

## Request IDs

Access via `_request_id` on responses or `.withResponse()`:

```ts
const { data, request_id } = await client.responses.create(params).withResponse();
```

## Auto-pagination

List methods return `Page<T>` with `.data: T[]`, `.hasNextPage()`, `.getNextPage()`; or use `for await` on `client.fineTuning.jobs.list()`.

## Realtime API Beta

```ts
const rt = new OpenAIRealtimeWebSocket({ model: string });
rt.on('response.text.delta', (event: { delta: string }) => process.stdout.write(event.delta));
```

## Azure OpenAI

```ts
const openai = new AzureOpenAI({ azureADTokenProvider, apiVersion });
openai.chat.completions.create({ model, messages });
```

## Advanced Usage

- `.asResponse()` returns raw `Response`
- `.withResponse()` returns `{ data, response }`

## Custom Requests

```ts
await client.post('/endpoint', { body, query });
// allow undocumented params with @ts-expect-error
```

## Fetch Client Shim

- `import 'openai/shims/web'` to use global fetch
- `import 'openai/shims/node'` to use node-fetch polyfills

## Logging and Middleware

Pass `fetch` option to intercept requests/responses. Set DEBUG=true for automatic logs.

## HTTP(S) Agent

Default: pooled agent. Override via `httpAgent` in client or per request.

## Semantic Versioning

Follows SemVer. Minor releases may contain breaking static-type changes.

## Requirements

- TS >=4.5, Node.js >=18, Deno >=1.28.0, Bun >=1.0, Cloudflare Workers, Vercel Edge, Jest28+, Nitro>=2.6.



## Attribution
- Source: OpenAI Node.js SDK
- URL: https://github.com/openai/openai-node#readme
- License: MIT License
- Crawl Date: 2025-05-04T08:50:20.297Z
- Data Size: 702054 bytes
- Links Found: 5432

## Retrieved
2025-05-04
library/SERVER_SENT_EVENTS.md
# library/SERVER_SENT_EVENTS.md
# SERVER_SENT_EVENTS

## Crawl Summary
EventSource(url:USVString,{withCredentials?:boolean=false})
Properties: url:string readonly, withCredentials:boolean readonly, readyState:0|1|2
Constants: CONNECTING=0, OPEN=1, CLOSED=2
Methods: close():void, addEventListener(type,listener,options), removeEventListener(...), dispatchEvent(event)
Event Handlers: onopen(evt), onmessage(evt.data:string,evt.lastEventId:string), onerror(evt)
Protocol: text/event-stream; charset=UTF-8; fields: id:, event:, data:, retry:, comments start with ':'; blank line ends message; retry sets reconnect delay

## Normalised Extract
Table of Contents
1. Constructor
2. EventSourceInit
3. Properties
4. Methods
5. Constants
6. Event Handlers
7. Protocol Format

1. Constructor
Signature: EventSource(url: USVString, eventSourceInitDict?: {withCredentials?: boolean})
Parameters:
 url: absolute or relative URL of SSE endpoint
 eventSourceInitDict.withCredentials: true|false (default false)
Behavior: Initiates HTTP GET with Accept: text/event-stream; reconnects automatically on failure.

2. EventSourceInit
Dictionary:
 withCredentials boolean optional default false; controls sending of credentials.

3. Properties
 url: USVString readonly; endpoint URL
 withCredentials: boolean readonly; from init dict
 readyState: 0|1|2 readonly; connection state codes

4. Methods
 close(): void; stops stream and reconnection
 addEventListener(type: string, listener: MessageEventListener, options?: boolean | AddEventListenerOptions): void
 removeEventListener(type: string, listener: MessageEventListener, options?: boolean | EventListenerOptions): void
 dispatchEvent(event: Event): boolean

5. Constants
 static CONNECTING = 0
 static OPEN = 1
 static CLOSED = 2

6. Event Handlers
 onopen(evt: Event): called on open
 onmessage(evt: MessageEvent): evt.data:string, evt.lastEventId:string
 onerror(evt: Event): called on error; readyState may transition

7. Protocol Format
 Headers: Content-Type: text/event-stream; charset=UTF-8; Cache-Control: no-cache
 Fields per line: id:, event:, data:, retry:
 Comments with ":"
 Blank line terminates message block
 data: lines accumulate with newline separators
 retry: sets next reconnect interval (ms)

## Supplementary Details
Server Setup (Node.js Express):
 app.get('/sse', (req, res) => {
   res.writeHead(200, {
     'Content-Type': 'text/event-stream',
     'Cache-Control': 'no-cache',
     Connection: 'keep-alive'
   });
   let id = 0;
   const send = (data, eventType = 'message') => {
     res.write(`id: ${id}\n`);
     if(eventType !== 'message') res.write(`event: ${eventType}\n`);
     data.split('\n').forEach(line => res.write(`data: ${line}\n`));
     res.write('\n');
     id++;
   };
   send('Connection established');
   const interval = setInterval(() => send(`Server time: ${Date.now()}`), 3000);
   req.on('close', () => clearInterval(interval));
 });

Client Code (JavaScript):
 const source = new EventSource('/sse', {withCredentials: true});
 source.onopen = () => console.log('SSE connection opened');
 source.onmessage = event => console.log('Message:', event.data, 'Last ID:', event.lastEventId);
 source.onerror = () => console.error('SSE error, state:', source.readyState);

Configuration Options:
 withCredentials: false | true (default false)
 Reconnection: default 3000ms or as set by retry field

## Reference Details
API Specifications
EventSource
 Constructor(url: USVString, eventSourceInitDict?: EventSourceInit)
 EventSourceInit {
   withCredentials?: boolean // default false
 }
 Properties:
 url: USVString (readonly)
 withCredentials: boolean (readonly)
 readyState: number (readonly; 0=CONNECTING,1=OPEN,2=CLOSED)
 Constants:
 static CONNECTING: 0
 static OPEN: 1
 static CLOSED: 2
 Event Handlers:
 onopen: (evt: Event) => void
 onmessage: (evt: MessageEvent) => void // evt.data: string; evt.lastEventId: string
 onerror: (evt: Event) => void
 Methods:
 close(): void
 addEventListener(type: string, listener: (evt: MessageEvent) => any, options?: boolean|AddEventListenerOptions): void
 removeEventListener(type: string, listener: (evt: MessageEvent) => any, options?: boolean|EventListenerOptions): void
 dispatchEvent(event: Event): boolean

PHP Server Example:
 <?php
 header('Content-Type: text/event-stream');
 header('Cache-Control: no-cache');
 $id = 0;
 while (true) {
   echo "id: {$id}\n";
   echo "data: Server time: " . date('r') . "\n\n";
   ob_flush(); flush();
   $id++;
   sleep(1);
 }
 ?>

Implementation Pattern:
 1. Set appropriate headers
 2. Stream messages using id:, event:, data:, blank line
 3. Flush after each message
 4. Handle client disconnects
 5. Use retry field for dynamic reconnection intervals

Best Practices:
 - Include id in each message for reconnection continuity
 - Use custom event types via event: <type>
 - Handle readyState CLOSED to fallback

Troubleshooting:
 - Inspect raw stream: curl -N http://server/sse
 - Expect lines starting with data:, id:, blank line separation
 - If nothing appears: verify Content-Type and disable buffering at server/proxy

## Information Dense Extract
EventSource(url:USVString,{withCredentials?:boolean=false}); Properties: url,withCredentials,readyState(0|1|2); Constants: CONNECTING=0,OPEN=1,CLOSED=2; Methods: close(), addEventListener(type,listener,options), removeEventListener(...), dispatchEvent(event); Handlers: onopen, onmessage(data:string,lastEventId:string), onerror; Protocol: text/event-stream; charset=UTF-8; fields: id:,event:,data:,retry:; comments with ':'; blank line ends event; retry sets reconnect ms

## Sanitised Extract
Table of Contents
1. Constructor
2. EventSourceInit
3. Properties
4. Methods
5. Constants
6. Event Handlers
7. Protocol Format

1. Constructor
Signature: EventSource(url: USVString, eventSourceInitDict?: {withCredentials?: boolean})
Parameters:
 url: absolute or relative URL of SSE endpoint
 eventSourceInitDict.withCredentials: true|false (default false)
Behavior: Initiates HTTP GET with Accept: text/event-stream; reconnects automatically on failure.

2. EventSourceInit
Dictionary:
 withCredentials boolean optional default false; controls sending of credentials.

3. Properties
 url: USVString readonly; endpoint URL
 withCredentials: boolean readonly; from init dict
 readyState: 0|1|2 readonly; connection state codes

4. Methods
 close(): void; stops stream and reconnection
 addEventListener(type: string, listener: MessageEventListener, options?: boolean | AddEventListenerOptions): void
 removeEventListener(type: string, listener: MessageEventListener, options?: boolean | EventListenerOptions): void
 dispatchEvent(event: Event): boolean

5. Constants
 static CONNECTING = 0
 static OPEN = 1
 static CLOSED = 2

6. Event Handlers
 onopen(evt: Event): called on open
 onmessage(evt: MessageEvent): evt.data:string, evt.lastEventId:string
 onerror(evt: Event): called on error; readyState may transition

7. Protocol Format
 Headers: Content-Type: text/event-stream; charset=UTF-8; Cache-Control: no-cache
 Fields per line: id:, event:, data:, retry:
 Comments with ':'
 Blank line terminates message block
 data: lines accumulate with newline separators
 retry: sets next reconnect interval (ms)

## Original Source
MDN Server-Sent Events (SSE)
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## Digest of SERVER_SENT_EVENTS

# Server-Sent Events (SSE)
Date Retrieved: 2024-06-01
Source: MDN Web Docs, Server-Sent Events (last modified Mar 20, 2025)
Data Size: 1860366 bytes

# EventSource Interface

## Constructor

EventSource(url: USVString, eventSourceInitDict?: EventSourceInit)
Initializes a persistent SSE connection to the given URL, automatically reconnecting on network failures.

## EventSourceInit Dictionary

withCredentials: boolean
Default: false
Controls whether cookies and HTTP authentication are sent with requests.

## Properties

url: USVString (readonly)
withCredentials: boolean (readonly)
readyState: number (readonly; 0=CONNECTING, 1=OPEN, 2=CLOSED)

## Methods

close(): void
Terminates the connection and stops reconnection.

addEventListener(type: string, listener: (evt: MessageEvent) => any, options?: boolean | AddEventListenerOptions): void
removeEventListener(type: string, listener: (evt: MessageEvent) => any, options?: boolean | EventListenerOptions): void
dispatchEvent(event: Event): boolean

## Constants

static CONNECTING: 0
static OPEN: 1
static CLOSED: 2

## Event Handlers

onopen: (evt: Event) => any
onmessage: (evt: MessageEvent) => any
onerror: (evt: Event) => any

# Protocol Format

Streams must use Content-Type: text/event-stream; charset=UTF-8 and disable buffering.
Each message block ends with a blank line. Supported fields per line:

id: <string>    sets lastEventId for reconnection
event: <type>   sets custom event type beyond default "message"
data: <content> payload; multiple lines concatenate with "\n"
retry: <ms>     updates reconnection delay (in milliseconds)
: <comment>     ignored by client


## Attribution
- Source: MDN Server-Sent Events (SSE)
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- License: CC BY-SA 2.5
- Crawl Date: 2025-05-04T12:59:45.417Z
- Data Size: 1860366 bytes
- Links Found: 21397

## Retrieved
2025-05-04
