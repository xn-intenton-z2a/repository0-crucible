# VITEST_CONFIG

## Crawl Summary
Default test file globs: include '**/*.{test,spec}.?(c|m)[jt]s?(x)', exclude node_modules, dist, config files. Config priority: vitest.config.* overrides vite.config.*; CLI --config overrides. defineConfig from 'vitest/config' for TS support. Single file config recommended. Common options: include, exclude, globals, environment, threads/forks pools, alias, coverage, reporters, outputFile, root, dir. Server and deps options identical to Vite's SSR and optimizeDeps options with defaults. Inline environment via docblock. Workspaces via vitest.workspace file with defineWorkspace. CLI commands: vitest, vitest run, vitest --coverage, flags: --update, --watch, --port, --https, --reporter, --outputFile, --pool. Automatic dependency install prompts, disable with VITEST_SKIP_INSTALL_CHECKS. IDE: VSCode extension. Sling usage examples and troubleshooting cases.

## Normalised Extract
Table of Contents
1. Configuration File Loading
2. CLI Commands & Flags
3. Test File Patterns
4. Config Options Reference
5. Workspaces Setup
6. Environment Configuration
7. Pool Strategies
8. Dependency Resolution
9. Coverage Setup

1. Configuration File Loading
• vite.config.(js|mjs|cjs|ts|cts|mts) is read by default.
• vitest.config.(js|ts|mjs|cjs) with defineConfig higher priority.
• CLI: --config <file> overrides both. Mode property/mode env=‘test’ by default.

2. CLI Commands & Flags
• vitest             (watch)
• vitest run         (single-run)
• --coverage         (runs with coverage)
• -u,--update        (update snapshots)
• -w,--watch         (watch mode)
• --port <n>         (dev server port)
• --https            (enable HTTPS)
• --reporter <name>  (default,json,html,junit)
• --outputFile <f>   (path or map of reporter->path)
• --pool <mode>      (threads,forks,vmThreads,vmForks)

3. Test File Patterns
• include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
• exclude: ['**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**','**/...config.*']
• includeSource: []
• name: custom project name

4. Config Options Reference
• globals: boolean=false
• environment: node | jsdom | happy-dom | edge-runtime | <custom>
• environmentOptions: {}
• alias: Record<string,string> or Array<{find,replacement,customResolver?>}
• root: string
• dir: string
• reporters: ['default'] or Reporter[]
• outputFile: string|Record<string,string>

5. Workspaces Setup
• File: vitest.workspace.(js|ts|json) uses defineWorkspace
• Accepts array of glob patterns or config objects

6. Environment Configuration
• Builtins: node, jsdom, happy-dom, edge-runtime
• Override per-file via docblock or comment
• Custom env via package vitest-environment-<name> exporting Environment interface

7. Pool Strategies
• forks: child_process (default)
• threads: worker_threads
• vmForks: forked VM contexts
• vmThreads: sandboxed VM threads (fast, memory leaks)

8. Dependency Resolution
• server.deps.external: [/\/node_modules\//]
• server.deps.inline: [] or true
• server.deps.fallbackCJS: false
• server.deps.cacheDir: 'node_modules/.vite'
• deps.optimizer.ssr/web: include[], exclude[], enabled=false by default
• deps.web.transformAssets/css: true
deps.web.transformGlobPattern: []
• deps.interopDefault: true
• deps.moduleDirectories: ['node_modules']

9. Coverage Setup
• coverage: {exclude:['**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**'], reporter:['lcov','text'], all?: boolean}

All options available at test property within defineConfig.


## Supplementary Details
Installation Steps:
1. Ensure Vite>=5.0.0, Node>=18.0.0 installed.
2. Install Vitest:
   npm install -D vitest
3. Add scripts to package.json:
   "scripts": { "test": "vitest", "coverage": "vitest run --coverage" }
4. (Optional) Disable auto-install prompt: set VITEST_SKIP_INSTALL_CHECKS=1.

Config File Creation:
• Create vitest.config.ts:
  import { defineConfig } from 'vitest/config'
  export default defineConfig({
    test: {
      include: ['tests/**/*.spec.ts'],
      environment: 'jsdom',
      globals: true,
      alias: { '@': '/src' }
    }
  })

Merging Vite Config:
• import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.ts'
  export default mergeConfig(viteConfig, defineConfig({ test: {...} }))

Workspaces:
• Create vitest.workspace.ts with defineWorkspace([...]) to run multiple configs in one process.

Environment Declaration per File:
// @vitest-environment happy-dom

Pools Configuration:
// CLI override
vitest --pool=threads

Alias for CJS Dependencies:
deps: { interopDefault: false }

Debugging:
• Enable dumping modules: test.server.debug.dumpModules=true
• Load dumped for inspection: test.server.debug.loadDumppedModules=true

Performance Tuning:
• Enable deps.optimizer.ssr/web enabled=true to bundle dependencies via esbuild.

Coverage Exclusions via config
• coverage.exclude: ['**/tests/helpers/**']

IDE Integration:
• Add triple slash for types in tsconfig:
  "types": ["vitest/globals","vitest/jsdom"]



## Reference Details
Complete CLI Reference:
vitest [run] [--config <file>] [--coverage] [--reporter <default|json|html|junit>] [--outputFile <path>] [--update] [--watch] [--port <n>] [--https] [--pool <threads|forks|vmThreads|vmForks>]

Full Test API (Node.js API):
import { createVitest, VitestRunnerConstructor } from 'vitest'

// Create runner
const runner: VitestRunnerConstructor = createVitest({
  root: '/project',
  globals: false,
  configFile: '/project/vitest.config.ts',
  watch: true,
  mode: 'test'
})

// Methods:
runner.run(): Promise<Ri.Report>
runner.watch(): void
runner.clearCache(): Promise<void>

Configuration Options Schema (test property):
interface TestConfig {
  include?: string[]               // default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
  exclude?: string[]               // default see exclude glob list
  includeSource?: string[]         // default []
  name?: string                    // project name
  root?: string                    // project root
  dir?: string                     // scan directory
  globals?: boolean                // default false
  environment?: 'node'|'jsdom'|'happy-dom'|'edge-runtime'|string // default 'node'
  environmentOptions?: Record<string,unknown>
  server?: {
    sourcemap?: 'inline'|boolean   // default 'inline'
    deps?: {
      external?: (string|RegExp)[] // default [/\/node_modules\//]
      inline?: (string|RegExp)[]|true // default []
      fallbackCJS?: boolean        // default false
      cacheDir?: string            // default 'node_modules/.vite'
    }
    debug?: {
      dumpModules?: boolean|string // default false
      loadDumppedModules?: boolean // default false
    }
  }
  deps?: {
    optimizer?: {
      ssr?: { include?: string[]; exclude?: string[]; enabled?: boolean }
      web?: { include?: string[]; exclude?: string[]; enabled?: boolean }
    }
    moduleDirectories?: string[]   // default ['node_modules']
    interopDefault?: boolean       // default true
  }
  alias?: Record<string,string>|Array<{find:string|RegExp,replacement:string,customResolver?:any}>
  coverage?: {
    enabled?: boolean
    reporter?: string[]           // default ['default','lcov']
    exclude?: string[]            // default see exclude list
    include?: string[]
    all?: boolean
  }
  reporters?: Array<string|Reporter> // default ['default']
  outputFile?: string|Record<string,string>
  pool?: 'threads'|'forks'|'vmThreads'|'vmForks' // default 'forks'
  watch?: boolean                 // default !process.env.CI
  update?: boolean                // default false
}

Example Code:
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['**/integration/**'],
    globals: true,
    environment: 'jsdom',
    alias: { '@': '/src' },
    deps: { interopDefault: false },
    coverage: { reporter: ['text','html'], exclude: ['**/mocks/**'], all: true },
    pool: 'threads',
    reporters: ['json'],
    outputFile: { json: 'results.json' }
  }
})
```

Best Practices:
• Use single config file for Vite & Vitest.
• Enable globals: false for explicit imports; set true if migrating from Jest.
• Leverage deps.optimizer to bundle heavy UI libs for test performance.
• Use workspaces for monorepos via vitest.workspace.

Troubleshooting:
1. ERR_UNKNOWN_FILE_EXTENSION on CSS imports:
   - Set test.deps.web.transformCss = false in config.
2. Named export errors from CJS:
   - Set test.deps.interopDefault = true or adjust import syntax.
3. Bun conflict:
   - Run tests via `bun run test`, not `bun test`.
4. Snapshot mismatch:
   - `vitest -u` to update, inspect diff, commit updated snapshot.
5. Memory leaks in vmThreads:
   - Lower poolOptions.vmThreads.memoryLimit or switch to forks.
6. Debug transforms:
   - Enable test.server.debug.dumpModules = true; inspect dumped files.

Exact Commands & Expected Output:
$ npm run test
> vitest

  ✓ sum.test.js (1)  adds 1 + 2 to equal 3

  Test Files  1 passed (1)
  Tests       1 passed (1)
  Duration    <500ms

$ vitest run --coverage
  -----------------|--------|--------|--------|--------|----------------|
  File             | % Stmts| % Branch| % Funcs| % Lines| Uncovered Lines|
  -----------------|--------|--------|--------|--------|----------------|
  All files        |   100  |   100   |   100  |   100  |                |
  -----------------|--------|--------|--------|--------|----------------|



## Information Dense Extract
Vitest config: default globs include '**/*.{test,spec}.?(c|m)[jt]s?(x)'; exclude node_modules, dist, .{idea,git,cache,...}/**, *config.* defaults. Config files: vite.config.(js|ts|mjs|cjs,cts,mts) read; vitest.config.(js|ts|mjs|cjs) overrides; --config flag highest. Use defineConfig from 'vitest/config'. Key test options: include[], exclude[], includeSource[], name:string, root:string, dir:string, globals:boolean(false), environment:'node'|'jsdom'|'happy-dom'|'edge-runtime'|custom, environmentOptions:Record<string,unknown>, alias:Record<string,string>|[{find,replacement,customResolver?}], server:{sourcemap:'inline'|boolean, deps:{external:(string|RegExp)[] default [/\/node_modules\//], inline:(string|RegExp)[]|true, fallbackCJS:boolean,false, cacheDir:'node_modules/.vite'}, debug:{dumpModules:boolean|string,loadDumppedModules:boolean}}, deps:{optimizer:{ssr:web both include?:string[];exclude?:string[];enabled?:boolean false}, moduleDirectories:['node_modules'], interopDefault:true}, coverage:{enabled?, reporter?:string[], exclude?:string[], include?:string[], all?:boolean}, reporters:['default'], outputFile:string|Record<string,string>, pool:'forks', 'threads','vmThreads','vmForks'; watch:!CI; update:false. CLI: vitest [run] [--coverage] [-u] [-w] [--reporter <name>] [--outputFile <path>] [--pool <mode>] [--port <n>] [--https]. Workspaces via vitest.workspace defineWorkspace([...]). Inline env override via /**@vitest-environment jsdom*/. Automatic dep prompts disable with VITEST_SKIP_INSTALL_CHECKS=1. Pools: forks(child_process), threads(worker_threads), vmForks, vmThreads. Troubleshoot: transformCss:false; interopDefault; bun run test; dumpModules; update snapshots; adjust vmThreads.memoryLimit. Merge Vite config via mergeConfig. Examples in vitest.config.ts provided. IDE: triple slash types vitest/globals, vitest/jsdom. Coverage output via --coverage, reporters json/html/junit, outputFile map.

## Sanitised Extract
Table of Contents
1. Configuration File Loading
2. CLI Commands & Flags
3. Test File Patterns
4. Config Options Reference
5. Workspaces Setup
6. Environment Configuration
7. Pool Strategies
8. Dependency Resolution
9. Coverage Setup

1. Configuration File Loading
 vite.config.(js|mjs|cjs|ts|cts|mts) is read by default.
 vitest.config.(js|ts|mjs|cjs) with defineConfig higher priority.
 CLI: --config <file> overrides both. Mode property/mode env=test by default.

2. CLI Commands & Flags
 vitest             (watch)
 vitest run         (single-run)
 --coverage         (runs with coverage)
 -u,--update        (update snapshots)
 -w,--watch         (watch mode)
 --port <n>         (dev server port)
 --https            (enable HTTPS)
 --reporter <name>  (default,json,html,junit)
 --outputFile <f>   (path or map of reporter->path)
 --pool <mode>      (threads,forks,vmThreads,vmForks)

3. Test File Patterns
 include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
 exclude: ['**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**','**/...config.*']
 includeSource: []
 name: custom project name

4. Config Options Reference
 globals: boolean=false
 environment: node | jsdom | happy-dom | edge-runtime | <custom>
 environmentOptions: {}
 alias: Record<string,string> or Array<{find,replacement,customResolver?>}
 root: string
 dir: string
 reporters: ['default'] or Reporter[]
 outputFile: string|Record<string,string>

5. Workspaces Setup
 File: vitest.workspace.(js|ts|json) uses defineWorkspace
 Accepts array of glob patterns or config objects

6. Environment Configuration
 Builtins: node, jsdom, happy-dom, edge-runtime
 Override per-file via docblock or comment
 Custom env via package vitest-environment-<name> exporting Environment interface

7. Pool Strategies
 forks: child_process (default)
 threads: worker_threads
 vmForks: forked VM contexts
 vmThreads: sandboxed VM threads (fast, memory leaks)

8. Dependency Resolution
 server.deps.external: [/'/node_modules'//]
 server.deps.inline: [] or true
 server.deps.fallbackCJS: false
 server.deps.cacheDir: 'node_modules/.vite'
 deps.optimizer.ssr/web: include[], exclude[], enabled=false by default
 deps.web.transformAssets/css: true
deps.web.transformGlobPattern: []
 deps.interopDefault: true
 deps.moduleDirectories: ['node_modules']

9. Coverage Setup
 coverage: {exclude:['**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**'], reporter:['lcov','text'], all?: boolean}

All options available at test property within defineConfig.

## Original Source
JavaScript RDF Ecosystem: Node.js v20, RDF/JS, Comunica, SPARQL.js, rdflib.js & Vitest v3
https://vitest.dev/

## Digest of VITEST_CONFIG

# Vitest Configuration

Last Updated: 2024-06-01
Data Size Retrieved: 45468122 bytes

## Configuration File Resolution

- vitest reads Vite root config file (vite.config.js, .mjs, .cjs, .ts, .cts, .mts) if present.
- To override or supply separate config, create a vitest.config.js/ts using defineConfig from 'vitest/config'.
- CLI flag `--config <path>` overrides default config file lookup.
- Mode selection: use `process.env.VITEST` or `mode` property in defineConfig; default mode is 'test'.

## Combined Vite & Vitest Config

- Single-file approach recommended. At top of vite.config.ts add:
  ```ts
  /// <reference types="vitest/config" />
  import { defineConfig } from 'vite'

  export default defineConfig({
    test: { /* options */ },
    resolve: { alias: [...] },
    plugins: [...]
  })
  ```
- To merge existing Vite config:
  ```js
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config'

  export default mergeConfig(viteConfig, defineConfig({ test: { /*...*/ } }))
  ```

## Workspaces Support

- Define vitest.workspace file (js/ts/json). Example:
  ```ts
  import { defineWorkspace } from 'vitest/config'

  export default defineWorkspace([
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    { test: { name: 'happy-dom', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
    { test: { name: 'node', environment: 'node', setupFiles: ['./setup.node.ts'] } }
  ])
  ```

## CLI Usage

- `vitest` (watch mode)
- `vitest run` (single run)
- `vitest --coverage` or npm script `"coverage": "vitest run --coverage"`
- Common flags:
  - `--config <path>`
  - `--port <number>`
  - `--https` (enable HTTPS server)
  - `-u, --update` (update snapshots)
  - `-w, --watch` (watch files)
  - `--reporter <name>` (e.g. json, html, junit)
  - `--outputFile <path>`
  - `--pool <threads|forks|vmThreads|vmForks>`

## Environment Selection

- Default `node`.
- Built-ins: `jsdom`, `happy-dom`, `edge-runtime`.
- Custom: load package `vitest-environment-<name>` exporting Environment interface.
- Inline override via docblock: `/** @vitest-environment jsdom */` or comment `// @vitest-environment happy-dom`.

## Pools

- forks: uses child_process (default).
- threads: uses worker_threads (fast IPC, no process APIs).
- vmForks: forked VM contexts.
- vmThreads: VM contexts in threads (faster, potential memory leaks).

## Key Config Options

- include: glob[] default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
- exclude: glob[] default ['**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**','**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
- includeSource: string[] default []
- name: string
- globals: boolean default false
- environment: string
- environmentOptions: Record<string, unknown>
- alias: Record<string,string> | Array<{find,replacement,customResolver?}>
- server: { sourcemap: boolean|'inline'; deps:{ external: (string|RegExp)[]; inline: (string|RegExp)[]|true; fallbackCJS:boolean; cacheDir:string }; debug:{ dumpModules:string|boolean; loadDumppedModules:boolean } }
- deps.optimizer: { ssr:{include?: string[]; exclude?: string[]; enabled:boolean}; web:{transformAssets:boolean; transformCss:boolean; transformGlobPattern:RegExp|RegExp[]; enabled:boolean} }
- deps.interopDefault: boolean default true
- deps.moduleDirectories: string[]
- coverage: { enabled?; reporter?: string[]; exclude?: string[]; all?: boolean; include?: string[] }
- reporters: Reporter[] default ['default']
- outputFile: string|Record<string,string>
- root: string
- dir: string

## Dependency Installation Check

- Automatic prompts for missing deps. Disable via env `VITEST_SKIP_INSTALL_CHECKS=1`.

## IDE Integration

- Official VSCode extension available in Marketplace.

## Examples

- sum.js and sum.test.js demonstration with expect and test imports.

## Troubleshooting

- ERR_UNKNOWN_FILE_EXTENSION: add transformCss:false or configure loader in deps.web.
- CJS named exports errors: disable interopDefault or adjust deps.external/inline.
- Bun test runner conflict: use `bun run test` instead of `bun test`.


## Attribution
- Source: JavaScript RDF Ecosystem: Node.js v20, RDF/JS, Comunica, SPARQL.js, rdflib.js & Vitest v3
- URL: https://vitest.dev/
- License: License
- Crawl Date: 2025-04-28T03:56:05.117Z
- Data Size: 45468122 bytes
- Links Found: 27290

## Retrieved
2025-04-28
