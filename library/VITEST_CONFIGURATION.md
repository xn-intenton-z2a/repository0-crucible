# VITEST_CONFIGURATION

## Crawl Summary
Node>=18, Vite>=5 required; install via npm/yarn/pnpm/bun or npx; test files named *.test.* or *.spec.*; package.json scripts: "test": "vitest", "coverage": "vitest run --coverage"; CLI: vitest/run, flags for watch, config path, reporters, output file, port, https, skip install checks; unified config: vitest.config or vite.config with `test` property; config file extensions (.js,.mjs,.cjs,.ts,.cts,.mts); highest priority to vitest.config; mergeConfig method for override; key config options: include, exclude, includeSource, globals, environment, threads/forks/pool, alias, setupFiles, coverage options; workspaces via vitest.workspace; env docblocks; troubleshooting: skip checks, bun command, debug server, pool memory, asset transforms, extend defaults.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Test File Naming and Scripts
 3 CLI Commands and Flags
 4 Configuration File Usage
 5 Core Configuration Options
 6 Workspaces Setup
 7 Environment Overrides
 8 Troubleshooting Patterns

1 Installation
 - Node>=18.0.0, Vite>=5.0.0
 - Install: npm install -D vitest | yarn add -D vitest | pnpm add -D vitest | bun add -D vitest
 - or run: npx vitest

2 Test File Naming and Scripts
 - Filename pattern: **/*.{test,spec}.?(c|m)[jt]s?(x)
 - package.json scripts:
   "test": "vitest"
   "coverage": "vitest run --coverage"

3 CLI Commands and Flags
 - vitest [files/globs] [--watch] [--config <path>] [--dir <path>] [--reporter <name>] [--outputFile <path>] [--port <number>] [--https] [--skip-install-checks] [--environment <env>] [--pool <type>]
 - vitest run = single run

4 Configuration File Usage
 - File names: vitest.config.js|ts|mjs|cjs|cts|mts or add `test` to vite.config same extensions
 - Priority: vitest.config > vite.config test property > CLI --config
 - Export default defineConfig({ test: { ... } })
 - mergeConfig(viteConfig, defineConfig({ test: { ... } }))

5 Core Configuration Options
 include: string[] = ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
 exclude: string[] = ['**/node_modules/**','**/dist/**', ...]
 includeSource: string[] = []
 name: string
 globals: boolean = false
 environment: 'node'|'jsdom'|'happy-dom'|'edge-runtime' = 'node'
 setupFiles: string[]
 alias: Record<string,string> or [{find, replacement, customResolver}]
 coverage.provider: 'c8'|'istanbul' = 'istanbul'
 coverage.reporter: string[] = ['text']
 coverage.exclude: string[] default coverage excludes
 threads: boolean = false
 forks: boolean (implicit via pool)
 pool: 'threads'|'forks'|'vmThreads'|'vmForks' = 'forks'
 deps.external: (string|RegExp)[] = [/\/node_modules\//]
 deps.inline: (string|RegExp)[] | true = []
 deps.fallbackCJS: boolean = false
 deps.cacheDir: string = 'node_modules/.vite'
 deps.optimizer.ssr.include, deps.optimizer.web.include, deps.optimizer.{mode}.enabled
 deps.web.transformAssets: boolean = true
 deps.web.transformCss: boolean = true
 deps.web.transformGlobPattern: RegExp[] = []
 deps.interopDefault: boolean = true
 deps.moduleDirectories: string[] = ['node_modules']
 server.sourcemap: 'inline'|boolean = 'inline'
 server.debug.dumpModules: boolean|string
 server.debug.loadDumppedModules: boolean
 server.deps.external, server.deps.inline, server.deps.fallbackCJS, server.deps.cacheDir
 benchmark.include: string[] = ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)']
 benchmark.exclude: string[] = ['node_modules','dist','.idea','.git','.cache']
 benchmark.includeSource: string[] = []
 benchmark.reporters: string|string[] = 'default'
 benchmark.outputJson: string|
 benchmark.compare: string|
 alias: same as resolve.alias in Vite
 globals flag CLI --globals

6 Workspaces Setup
 - vitest.workspace.ts/js/json exporting defineWorkspace([...patterns, { test:{ name, root, environment, setupFiles } }])

7 Environment Overrides
 - File header:
   // @vitest-environment <name>
   /** @vitest-environment <name> */
   // @jest-environment <env>
 - Supported builtins: node, jsdom, happy-dom, edge-runtime
 - Custom: package vitest-environment-<name> exporting Environment object: { name, transformMode, setup(){ teardown(){} } }

8 Troubleshooting Patterns
 - Skip install: VITEST_SKIP_INSTALL_CHECKS=1
 - Bun: use bun run test
 - Merge configs: mergeConfig(viteConfig, defineConfig)
 - Debug server modules: server.debug.dumpModules & loadDumppedModules
 - Prevent vmThreads leaks: poolOptions.vmThreads.memoryLimit
 - Asset/CSS transforms: deps.web.transformAssets/transformCss
 - Extend defaults: configDefaults.exclude


## Supplementary Details
Installation:
• Node.js>=18.0.0, Vite>=5.0.0
• Install devDependency with package manager or run via npx/vitest

Naming and Discovery:
• Default include pattern: **/*.{test,spec}.?(c|m)[jt]s?(x)
• Default exclude pattern: **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*
• in-source tests: includeSource globs for import.meta.vitest detection

Configuration Files:
• Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
• vitest.config has higher priority than vite.config
• use defineConfig from 'vitest/config' or from 'vite' with triple slash reference
• merge Vite and Vitest configs with mergeConfig

Workspaces:
• vitest.workspace.ts/js/json lists glob patterns or config blocks

CLI Options:
• --watch/-w default true unless CI
• --config <path> override config file
• --dir <path> scan base directory
• --reporter name|path array
• --outputFile path or record for multi reporters
• --pool threads|forks|vmThreads|vmForks
• --environment <env>
• --globals enable global APIs
• --skip-install-checks disables prompts

Debug and Server:
• server.sourcemap: inline|boolean (inline by default)
• server.debug.dumpModules: string|boolean
• server.debug.loadDumppedModules: boolean
• Dependencies resolution: server.deps.external, inline, fallbackCJS, cacheDir

Benchmarking:
• bench files: **/*.{bench,benchmark}.?(c|m)[jt]s?(x)
• bench.exclude: ['node_modules','dist','.idea','.git','.cache']
• bench.reporters: default|custom
• bench.outputJson and bench.compare flags

Module Handling:
• deps.optimizer.{web,ssr}.include, .enabled, .force
• deps.interopDefault toggles CJS default named export handling
• deps.moduleDirectories override


## Reference Details
### API: defineConfig({ test })
Signature:
  defineConfig(config: TestConfig & Record<string,unknown>) => TestConfig

### CLI Options
--config <path> string: config file path
--dir <path> string: root directory
--watch boolean: watch mode
--reporter <string|path>[]: ['default','verbose','json','html','junit']
--outputFile <path|Record<string,string>>: write output file per reporter
--pool <threads|forks|vmThreads|vmForks>: worker pool
--environment <env>: 'node'|'jsdom'|'happy-dom'|'edge-runtime'|<custom>
--globals boolean: enable global APIs
--skip-install-checks: disable automatic prompts
--coverage: alias for run --coverage
--port <number>: HTTP port for browser mode
--https: enable HTTPS for browser mode

### Configuration Options
TestConfig.test include: string[] default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
TestConfig.test exclude: string[] default ['**/node_modules/**','**/dist/**','**/cypress/**',...]
TestConfig.test includeSource: string[] default []
TestConfig.test name: string
test.globals: boolean default false
test.environment: string default 'node'
test.setupFiles: string[] default []
test.alias: Record<string,string>|AliasEntry[] default {}
test.coverage.provider: 'c8'|'istanbul' default 'istanbul'
test.coverage.reporter: string[] default ['text']
test.coverage.exclude: string[] default coverage excludes
test.threads: boolean default false
test.forks: boolean default true if pool=forks
test.pool: 'threads'|'forks'|'vmThreads'|'vmForks' default 'forks'
test.deps.external: (string|RegExp)[] default [/\/node_modules\//]
test.deps.inline: (string|RegExp)[]|true default []
test.deps.fallbackCJS: boolean default false
test.deps.cacheDir: string default 'node_modules/.vite'
test.deps.optimizer.ssr.include: string[]
test.deps.optimizer.web.include: string[]
test.deps.optimizer.{mode}.enabled: boolean default false
test.deps.web.transformAssets: boolean default true
test.deps.web.transformCss: boolean default true
test.deps.web.transformGlobPattern: RegExp[] default []
test.deps.interopDefault: boolean default true
test.deps.moduleDirectories: string[] default ['node_modules']
test.server.sourcemap: 'inline'|boolean default 'inline'
test.server.debug.dumpModules: boolean|string default false
test.server.debug.loadDumppedModules: boolean default false
test.server.deps.external/inline/fallbackCJS/cacheDir

### Workspaces API
defineWorkspace(entries: Array<string|WorkspaceConfig>) => WorkspaceConfig[]
WorkspaceConfig: { test?: Partial<TestConfig> }

### Example Configuration Patterns
```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(viteConfig, defineConfig({ test: {
  include: ['tests/unit/**/*.test.ts'],
  alias: { '@src': '/src' },
  environment: 'happy-dom',
  setupFiles: ['./tests/setup.ts'],
  coverage: { provider: 'c8', reporter: ['html'], exclude: ['**/*.spec.ts'] },
  deps: { optimizer: { web: { include: ['vue'] }, ssr: { enabled: true } } },
  server: { debug: { dumpModules: './.vitest/dump', loadDumppedModules: true } },
  pool: 'threads', threads: true
}}))
```

### Troubleshooting Commands
- Disable install checks: `export VITEST_SKIP_INSTALL_CHECKS=1`
- Bun command: `bun run test`
- Rebuild & link local fork:
  ```bash
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
pnpm run build
pnpm link --global
cd ../your-project
pnpm link --global vitest
```

## Information Dense Extract
Vitest: Node>=18, Vite>=5. Install with npm/yarn/pnpm/bun or npx. Test files **/*.{test,spec}.?(c|m)[jt]s?(x). Scripts: "test": "vitest", "coverage": "vitest run --coverage". CLI: vitest/run, flags --watch, --config, --dir, --reporter, --outputFile, --port, --https, --pool, --environment, --globals, --skip-install-checks. Config: vitest.config.(js|ts|mjs|cjs|cts|mts) or vite.config with test property; priority: vitest.config > vite.config > CLI; merge via mergeConfig. Core options under test: include(string[]), exclude(string[]), includeSource(string[]), globals(boolean), environment(string), setupFiles(string[]), alias(map or array), coverage.provider(c8|istanbul), coverage.reporter(string[]), coverage.exclude(string[]), threads(boolean), pool(type), deps.{external,inline,fallbackCJS,cacheDir,optimizer.{web,ssr}.include,interopDefault,moduleDirectories}, server.{sourcemap,debug.{dumpModules,loadDumppedModules}}, benchmark.{include,exclude,reporters,outputJson,compare}. Workspaces: vitest.workspace.{js,ts,json} defineWorkspace([patterns, configBlocks]). Env docblocks: @vitest-environment <env>, @jest-environment <env>. Troubleshooting: VITEST_SKIP_INSTALL_CHECKS=1, bun run test, debug dumpModules, poolOptions.vmThreads.memoryLimit, deps.web.transformAssets/transformCss, extend defaults via configDefaults.exclude.

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Test File Naming and Scripts
 3 CLI Commands and Flags
 4 Configuration File Usage
 5 Core Configuration Options
 6 Workspaces Setup
 7 Environment Overrides
 8 Troubleshooting Patterns

1 Installation
 - Node>=18.0.0, Vite>=5.0.0
 - Install: npm install -D vitest | yarn add -D vitest | pnpm add -D vitest | bun add -D vitest
 - or run: npx vitest

2 Test File Naming and Scripts
 - Filename pattern: **/*.{test,spec}.?(c|m)[jt]s?(x)
 - package.json scripts:
   'test': 'vitest'
   'coverage': 'vitest run --coverage'

3 CLI Commands and Flags
 - vitest [files/globs] [--watch] [--config <path>] [--dir <path>] [--reporter <name>] [--outputFile <path>] [--port <number>] [--https] [--skip-install-checks] [--environment <env>] [--pool <type>]
 - vitest run = single run

4 Configuration File Usage
 - File names: vitest.config.js|ts|mjs|cjs|cts|mts or add 'test' to vite.config same extensions
 - Priority: vitest.config > vite.config test property > CLI --config
 - Export default defineConfig({ test: { ... } })
 - mergeConfig(viteConfig, defineConfig({ test: { ... } }))

5 Core Configuration Options
 include: string[] = ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
 exclude: string[] = ['**/node_modules/**','**/dist/**', ...]
 includeSource: string[] = []
 name: string
 globals: boolean = false
 environment: 'node'|'jsdom'|'happy-dom'|'edge-runtime' = 'node'
 setupFiles: string[]
 alias: Record<string,string> or [{find, replacement, customResolver}]
 coverage.provider: 'c8'|'istanbul' = 'istanbul'
 coverage.reporter: string[] = ['text']
 coverage.exclude: string[] default coverage excludes
 threads: boolean = false
 forks: boolean (implicit via pool)
 pool: 'threads'|'forks'|'vmThreads'|'vmForks' = 'forks'
 deps.external: (string|RegExp)[] = [/'/node_modules'//]
 deps.inline: (string|RegExp)[] | true = []
 deps.fallbackCJS: boolean = false
 deps.cacheDir: string = 'node_modules/.vite'
 deps.optimizer.ssr.include, deps.optimizer.web.include, deps.optimizer.{mode}.enabled
 deps.web.transformAssets: boolean = true
 deps.web.transformCss: boolean = true
 deps.web.transformGlobPattern: RegExp[] = []
 deps.interopDefault: boolean = true
 deps.moduleDirectories: string[] = ['node_modules']
 server.sourcemap: 'inline'|boolean = 'inline'
 server.debug.dumpModules: boolean|string
 server.debug.loadDumppedModules: boolean
 server.deps.external, server.deps.inline, server.deps.fallbackCJS, server.deps.cacheDir
 benchmark.include: string[] = ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)']
 benchmark.exclude: string[] = ['node_modules','dist','.idea','.git','.cache']
 benchmark.includeSource: string[] = []
 benchmark.reporters: string|string[] = 'default'
 benchmark.outputJson: string|
 benchmark.compare: string|
 alias: same as resolve.alias in Vite
 globals flag CLI --globals

6 Workspaces Setup
 - vitest.workspace.ts/js/json exporting defineWorkspace([...patterns, { test:{ name, root, environment, setupFiles } }])

7 Environment Overrides
 - File header:
   // @vitest-environment <name>
   /** @vitest-environment <name> */
   // @jest-environment <env>
 - Supported builtins: node, jsdom, happy-dom, edge-runtime
 - Custom: package vitest-environment-<name> exporting Environment object: { name, transformMode, setup(){ teardown(){} } }

8 Troubleshooting Patterns
 - Skip install: VITEST_SKIP_INSTALL_CHECKS=1
 - Bun: use bun run test
 - Merge configs: mergeConfig(viteConfig, defineConfig)
 - Debug server modules: server.debug.dumpModules & loadDumppedModules
 - Prevent vmThreads leaks: poolOptions.vmThreads.memoryLimit
 - Asset/CSS transforms: deps.web.transformAssets/transformCss
 - Extend defaults: configDefaults.exclude

## Original Source
Node.js Core Modules, Fetch API & Vitest Testing Framework
https://vitest.dev/

## Digest of VITEST_CONFIGURATION

# Installation Requirements and Commands

- Node.js >= 18.0.0
- Vite >= 5.0.0
- Install locally in package.json:
  ```bash
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest
  ```
- Or run without install via:
  ```bash
  npx vitest
  ```

# Writing Tests

File naming: include `.test.` or `.spec.` in filenames.

Example:
```js
// sum.js
export function sum(a, b) { return a + b }

// sum.test.js
import { test, expect } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```
Add to package.json:
```json
{
  "scripts": { "test": "vitest" }
}
```
Run tests:
```bash
npm run test
# or yarn test, pnpm test, bun run test
```

# CLI Usage

```text
vitest [options] [files/globs]
vitest run [options]
```  
Common flags:
- `-w, --watch`           Enable watch mode (default: true unless CI)
- `--config <path>`       Path to vitest.config file
- `--dir <path>`          Base directory to scan for tests (default: project root)
- `--reporter <name>`     Built-in: default, verbose, json, html, junit
- `--outputFile <path>`   When using json/html/junit reporter, write results to file
- `--port <number>`       Override HTTP port for browser mode
- `--https`               Enable HTTPS for browser mode
- `--coverage`            Run with coverage collection (alias: vitest run --coverage)
- `--skip-install-checks` Disable automatic dependency install prompts (`VITEST_SKIP_INSTALL_CHECKS=1`)

# Configuration File Priority and Extensions

Vitest reads configuration from:
1. `vitest.config.ts|js|mjs|cjs|cts|mts` (highest)
2. `vite.config.ts|js|mjs|cjs|cts|mts` with top-level `test` property
3. `--config` CLI override

Vitest config file example:
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    include: ['**/*.test.{js,ts}'],
    exclude: ['node_modules', 'dist'],
    globals: true,
    environment: 'jsdom',
    coverage: { provider: 'istanbul', reporter: ['text', 'lcov'] },
    alias: { '@': '/src' },
    setupFiles: ['./test-setup.ts'],
    threads: true
  }
})
```

# Core Configuration Options Reference

| Option               | Type                              | Default                                                          | CLI Flag                | Description                                                         |
|----------------------|-----------------------------------|------------------------------------------------------------------|-------------------------|---------------------------------------------------------------------|
| include              | string[]                          | ['**/*.{test,spec}.?(c|m)[jt]s?(x)']                             | vitest [include]        | Glob patterns for test files                                        |
| exclude              | string[]                          | ['**/node_modules/**', '**/dist/**', ...]                        | --exclude <glob>        | Glob patterns to exclude from test discovery                        |
| includeSource        | string[]                          | []                                                               |                         | In-source tests containing import.meta.vitest                        |
| name                 | string                            | undefined                                                        |                         | Custom project/process name                                         |
| globals              | boolean                           | false                                                            | --globals               | Enable Jest-style global APIs                                        |
| environment          | 'node'|'jsdom'|'happy-dom'|...   | 'node'                                                           | --environment=<env>     | Test environment                                                    |
| setupFiles           | string[]                          | []                                                               |                         | Files to run before tests                                            |
| coverage.provider    | 'c8'|'istanbul'                   | 'istanbul'                                                       | --coverage              | Coverage instrumentation provider                                   |
| coverage.reporter    | string[]                          | ['text']                                                        |                         | Coverage reporters                                                   |
| coverage.exclude     | string[]                          | default coverage exclude patterns                                |                         | Exclude globs from coverage report                                   |
| alias                | Record<string,string>|AliasEntry[]|      | {}                                                               |                         | Resolve.alias mappings for tests                                      |
| threads              | boolean                           | false                                                            | --pool=threads          | Use threads pool                                                     |
| forks                | boolean                           | true (default pool)                                              | --pool=forks            | Use forks pool                                                       |
| pool                 | 'threads'|'forks'|'vmThreads'|... | 'forks'                                                          | --pool=<type>           | Pool type for running tests                                          |

# Workspaces Support

Create a `vitest.workspace.ts|js|json` file:
```ts
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{unit,e2e}.ts',
  { test: { name: 'node', environment: 'node' } },
  { test: { name: 'happy-dom', environment: 'happy-dom' } }
])
```

# Environment Docblocks and Comments

At top of test files:
```js
// @vitest-environment jsdom
/** @vitest-environment happy-dom */
// @jest-environment jsdom  (compatible)
```

# Troubleshooting and Best Practices

- Automatic dependency prompts: set `VITEST_SKIP_INSTALL_CHECKS=1`
- Bun users: use `bun run test` not `bun test`
- Merge Vite and Vitest configs with:
  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config'
  export default mergeConfig(viteConfig, defineConfig({ test: { /* overrides */ } }))
  ```
- Debugging server modules:
  ```ts
  test: {
    server: {
      debug: { dumpModules: '/tmp/vitest-dump', loadDumppedModules: true }
    }
  }
  ```
- Clear pool memory leaks in vmThreads by setting `poolOptions.vmThreads.memoryLimit`
- Enable asset transforms in web mode:
  ```ts
  test: { deps: { web: { transformAssets: true, transformCss: true } } }
  ```
- Use `configDefaults` to extend defaults:
  ```ts
  import { configDefaults, defineConfig } from 'vitest/config'
  export default defineConfig({
    test: { exclude: [...configDefaults.exclude, 'custom/**'] }
  })
  ```

## Attribution
- Source: Node.js Core Modules, Fetch API & Vitest Testing Framework
- URL: https://vitest.dev/
- License: License
- Crawl Date: 2025-04-27T13:48:08.877Z
- Data Size: 44129862 bytes
- Links Found: 26774

## Retrieved
2025-04-27
