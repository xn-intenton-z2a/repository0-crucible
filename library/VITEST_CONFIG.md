# VITEST_CONFIG

## Crawl Summary
Vitest unified config with Vite: supports defineConfig and mergeConfig APIs, vitest.config file priority, file extensions .js/.ts variants. Core test options: include, exclude, includeSource, name, environment, globals, reporters, outputFile. Dependency resolution: deps.external, deps.inline, deps.fallbackCJS, deps.cacheDir, deps.optimizer.web options. Server options: sourcemap inline. CLI flags: --config, --watch, --update, --port, --root, --environment, --pool. Pools: threads, forks, vmThreads, vmForks. Workspace support via defineWorkspace.

## Normalised Extract
Table of Contents
1 Config File Resolution
2 defineConfig & mergeConfig
3 CLI Options
4 Core Test Patterns (include, exclude, includeSource)
5 Dependency Options (deps.external, deps.inline, deps.fallbackCJS, deps.cacheDir)
6 Server Options (sourcemap)
7 Pools & Runner
8 Environments & Globals
9 Reporters & Output
10 Workspace Support

1 Config File Resolution
- Order: vitest.config.ts/js > CLI --config > mode/env override
- Reads root vite.config.ts if no separate config
- Extensions: .js .mjs .cjs .ts .cts .mts

2 defineConfig & mergeConfig
- defineConfig(testOptions: TestConfig): Config
- mergeConfig(base: Config, override: Config): Config

3 CLI Options
--config <path>
-w, --watch (default: !CI)
-u, --update
--port <num>
--root <path>, --dir <path>
--environment <env>
--pool <pool>

4 Core Test Patterns
include: string[] default ["**/*.{test,spec}.?(c|m)[jt]s?(x)"]
exclude: string[] default [standard excludes]
includeSource: string[] default []

5 Dependency Options
deps.external: (string|RegExp)[] default [/\/node_modules\//]
deps.inline: (string|RegExp)[]|true default []
deps.fallbackCJS: boolean default false
deps.cacheDir: string default 'node_modules/.vite'

6 Server Options
server.sourcemap: 'inline'|boolean default 'inline'

7 Pools & Runner
pool: 'threads'|'forks'|'vmThreads'|'vmForks' default 'forks'
runner: string default internal

8 Environments & Globals
environment: string default 'node'
globals: boolean default false

9 Reporters & Output
reporters: Reporter|string[] default ['default']
outputFile: string|Record<string,string>

10 Workspace Support
defineWorkspace(patterns: string[]|WorkspaceConfig[]): WorkspaceConfig[]

## Supplementary Details
1 Create vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({ test: { include:['tests/**/*.ts'], exclude:['node_modules'], environment:'jsdom' } })

2 Merge Vite & Vitest
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(viteConfig, defineConfig({ test:{ globals:true } }))

3 Triple-Slash Types
/// <reference types="vitest/config" /> at top of vite.config.ts

4 Workspace
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace(['packages/*', { test:{ name:'node', pool:'threads' } }])

5 CLI Usage
npm run test: "vitest --config vitest.config.ts --environment jsdom --pool threads"

## Reference Details
## defineConfig API
```ts
declare function defineConfig(config: { test: TestConfig }): FullConfig;
interface TestConfig {
  include?: string[];
  exclude?: string[];
  includeSource?: string[];
  name?: string;
  environment?: 'node'|'jsdom'|'happy-dom'|'edge-runtime'|string;
  globals?: boolean;
  reporters?: Arrayable<Reporter>;
  outputFile?: string|Record<string,string>;
  deps?: {
    external?: Array<string|RegExp>;
    inline?: Array<string|RegExp>|true;
    fallbackCJS?: boolean;
    cacheDir?: string;
    optimizer?: {
      web?: { transformAssets?: boolean; transformCss?: boolean; transformGlobPattern?: RegExp|RegExp[]; enabled?: boolean; include?: string[]; exclude?: string[]; force?: boolean };
      ssr?: { enabled?: boolean; include?: string[]; exclude?: string[]; force?: boolean };
    };
    moduleDirectories?: string[];
  };
  server?: { sourcemap?: boolean|'inline'; debug?: { dumpModules?: boolean|string; loadDumppedModules?: boolean }; deps?: { external?: Array<string|RegExp>; inline?: Array<string|RegExp>|true; fallbackCJS?: boolean; cacheDir?: string } };
  pool?: 'threads'|'forks'|'vmThreads'|'vmForks';
  runner?: string;
  root?: string;
  dir?: string;
  watch?: boolean;
  update?: boolean;
}
```

## mergeConfig API
```ts
declare function mergeConfig(base: Config, override: Config): Config;
```

## CLI Options
- vitest: runs in watch mode
- vitest run: runs once
- --config <path>
- --watch, --update, --port <num>, --https
- --globals
- --environment <env>
- --pool <pool>
- --reporter <name>
- --outputFile <path>

## Reporter Interface
```ts
declare type Reporter = {
  onInit: (ctx: Context) => void;
  onFinished: (results: Result[]) => void;
};
```

## Environment Customization
Docblock: /** @vitest-environment jsdom */
CLI override: --environment=happy-dom
Custom env:
```ts
import type { Environment } from 'vitest';
export default <Environment>{ name:'custom', transformMode:'ssr', setup(){ return{ teardown(){} } } };
```

## Best Practices
- Use same file for Vite & Vitest
- Use mergeConfig to extend
- Pin vitest version in package.json
- Use include/exclude to narrow test scope

## Troubleshooting
- Disable auto-install: export VITEST_SKIP_INSTALL_CHECKS=1
- Bun: run bun run test
- Debug server loader: set server.debug.dumpModules=true and inspect cacheDir
- Clear cache: delete node_modules/.vite

## Information Dense Extract
VitestConfig: resolution vitest.config.ts>CLI--config>mode; ext .js/.ts variants; defineConfig({test:TestConfig}): include:string[](['**/*.{test,spec}.?(c|m)[jt]s?(x)']),exclude:string[],includeSource:string[],name:string,environment:string,node/jsdom/happy-dom/edge,globals:boolean,false,reporters:Arrayable<Reporter>,outputFile:string|Record;deps.external:(string|RegExp)[]([/\/node_modules\//]),inline:(string|RegExp)[]|true, fallbackCJS:boolean(false),cacheDir:string('node_modules/.vite'),optimizer.web:{enabled?:boolean(false),transformAssets:boolean(true),transformCss:boolean(true),transformGlobPattern:RegExp[]},server:{sourcemap:'inline',debug:{dumpModules:boolean,loadDumppedModules:boolean}},pool:'forks',runner:string,root:string,dir:string,watch:boolean(!CI),update:boolean; CLI flags: --watch,-w;--update,-u;--config;--port;--root;--dir;--environment;--globals;--pool;--reporter;--outputFile;defineWorkspace(patterns|configs):Workspace[]}

## Sanitised Extract
Table of Contents
1 Config File Resolution
2 defineConfig & mergeConfig
3 CLI Options
4 Core Test Patterns (include, exclude, includeSource)
5 Dependency Options (deps.external, deps.inline, deps.fallbackCJS, deps.cacheDir)
6 Server Options (sourcemap)
7 Pools & Runner
8 Environments & Globals
9 Reporters & Output
10 Workspace Support

1 Config File Resolution
- Order: vitest.config.ts/js > CLI --config > mode/env override
- Reads root vite.config.ts if no separate config
- Extensions: .js .mjs .cjs .ts .cts .mts

2 defineConfig & mergeConfig
- defineConfig(testOptions: TestConfig): Config
- mergeConfig(base: Config, override: Config): Config

3 CLI Options
--config <path>
-w, --watch (default: !CI)
-u, --update
--port <num>
--root <path>, --dir <path>
--environment <env>
--pool <pool>

4 Core Test Patterns
include: string[] default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
exclude: string[] default [standard excludes]
includeSource: string[] default []

5 Dependency Options
deps.external: (string|RegExp)[] default [/'/node_modules'//]
deps.inline: (string|RegExp)[]|true default []
deps.fallbackCJS: boolean default false
deps.cacheDir: string default 'node_modules/.vite'

6 Server Options
server.sourcemap: 'inline'|boolean default 'inline'

7 Pools & Runner
pool: 'threads'|'forks'|'vmThreads'|'vmForks' default 'forks'
runner: string default internal

8 Environments & Globals
environment: string default 'node'
globals: boolean default false

9 Reporters & Output
reporters: Reporter|string[] default ['default']
outputFile: string|Record<string,string>

10 Workspace Support
defineWorkspace(patterns: string[]|WorkspaceConfig[]): WorkspaceConfig[]

## Original Source
JavaScript RDF Ecosystem & Node.js Core Modules
https://vitest.dev/

## Digest of VITEST_CONFIG

# Configuring Vitest

## Configuration File Resolution
- Priority: vitest.config.ts/js > CLI --config <path> > process.env.VITEST or mode property
- If no vitest.config present, reads root vite.config.ts under Vite conventions

## Supported Config File Extensions
.js, .mjs, .cjs, .ts, .cts, .mts (no .json)

## defineConfig API Signature
```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    // options
  }
})
```

## mergeConfig API Signature
```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // overrides
    }
  })
)
```

## Workspace Support
```ts
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace([
  'packages/*',
  'tests/**/vitest.config.{e2e,unit}.ts',
  { test: { name: 'node', environment: 'node', setupFiles: ['./setup.node.ts'] } }
])
```

## CLI Options (partial)
- --config <path>       : Specify config file
- -w, --watch           : Enable watch mode (default: !process.env.CI)
- -u, --update          : Update snapshots (default: false)
- --port <number>       : Specify server port
- --root <path>, --dir  : Define project root and scan directory
- --environment <env>   : Set test environment (node|jsdom|happy-dom|edge-runtime)
- --pool <pool>         : Set pool type (threads|forks|vmThreads|vmForks)

## Core Configuration Options
### include
Type: string[]
Default: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"]
CLI: vitest [patterns]

### exclude
Type: string[]
Default: ["**/node_modules/**","**/dist/**","**/cypress/**","**/.{idea,git,cache,output,temp}/**","**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"]
CLI: --exclude "pattern"

### includeSource
Type: string[]
Default: []
Runs files containing import.meta.vitest

### name
Type: string
Default: undefined
Assign custom project name

### environment
Type: string
Default: "node"

### globals
Type: boolean
Default: false
CLI: --globals
Provides global APIs like test, expect

### reporters
Type: Reporter|string[]
Default: ["default"]
CLI: --reporter <name>

### outputFile
Type: string|Record<string,string>
CLI: --outputFile <path>

### deps.external
Type: (string|RegExp)[]
Default: [/\/node_modules\//]

### deps.inline
Type: (string|RegExp)[]|true
Default: []

### deps.fallbackCJS
Type: boolean
Default: false

### deps.cacheDir
Type: string
Default: 'node_modules/.vite'

### deps.optimizer.web
Type: { transformAssets?: boolean, transformCss?: boolean, transformGlobPattern?: RegExp|RegExp[] }
Defaults: transformAssets:true, transformCss:true, transformGlobPattern:[]

### server.sourcemap
Type: boolean|'inline'
Default: 'inline'

### pool
Type: 'threads'|'forks'|'vmThreads'|'vmForks'
Default: 'forks'

### runner
Type: string
Default: builtin runner

### root, dir
Type: string
Defaults: project root

## Code Examples
- Creating vitest.config.ts
- Merging with vite.config
- Defining workspaces

## Troubleshooting
- Use VITEST_SKIP_INSTALL_CHECKS=1 to disable dependency prompts
- For Bun, run `bun run test` instead of `bun test`

## Attribution
- Source: JavaScript RDF Ecosystem & Node.js Core Modules
- URL: https://vitest.dev/
- License: License
- Crawl Date: 2025-04-28T08:00:28.640Z
- Data Size: 32213878 bytes
- Links Found: 24552

## Retrieved
2025-04-28
