# VITEST

## Crawl Summary
Installation npm install -D vitest yarn add -D vitest pnpm add -D vitest bun add -D vitest; Requires Vite >=5.0.0 Node >=18.0.0; File naming .test. .spec.; Test API import { test expect } from vitest; Default globs include **/*.{test,spec}.?(c|m)[jt]s?(x) exclude node_modules/** dist/**; Config file reuse vite.config.ts or create vitest.config.ts (supported extensions js mjs cjs ts cts mts); defineConfig({ test {...}}) CLI options include include exclude update watch environment globals pool threads forks reporters outputFile; Dependency install prompt skip with VITEST_SKIP_INSTALL_CHECKS=1; Workspaces via defineWorkspace with glob patterns or project objects

## Normalised Extract
Table of Contents

1 Installation Commands
2 Writing Tests
3 Configuration
4 Workspaces Support
5 CLI Options

1 Installation Commands
Install Vitest as dev dependency
Commands npm install -D vitest yarn add -D vitest pnpm add -D vitest bun add -D vitest
Prerequisites Vite >= 5.0.0 Node >= 18.0.0
Alternative using npx vitest

2 Writing Tests
Filename patterns *.test.* *.spec.*
Sum example function and test files
Test API import { test expect } from vitest
test signature test(name string fn()=>void|Promise)
Expect API methods toBe toEqual toContain toThrow
Package json scripts add "test": "vitest"
Run commands npm run test yarn test pnpm test bun run test

3 Configuration
By default Vitest reads vite.config.* to merge plugins aliases resolve
Override create vitest.config.ts or use CLI --config
Supported config file extensions js mjs cjs ts cts mts
Configuration entry defineConfig({ test options })
Key test options include
include string[] default ["**/*.{test,spec}.?(c|m)[jt]s?(x)"]
exclude string[] default ["**/node_modules/**" "**/dist/**" "**/.{idea,git,cache,temp}/**"]
includeSource string[] default []
globals boolean default false
environment string default node
pool string default forks
threads boolean default false
forks boolean default true
vmThreads boolean default false
vmForks boolean default false
update boolean default false
watch boolean default not CI
root string default project root
dir string default same as root
reporters builtin|string[] default ["default"]
outputFile string|Record default undefined
alias Record<string string>|Array patterns
deps.external (string|RegExp)[] default [/node_modules/]
deps.inline (string|RegExp)[] default []
deps.fallbackCJS boolean default false
deps.cacheDir string default node_modules/.vite
deps.optimizer.enabled boolean default false
deps.optimizer.include string[] default []
deps.optimizer.exclude string[] default []

Using mergeConfig(viteConfig defineConfig) to extend

4 Workspaces Support
File vitest.workspace.js ts json export defineWorkspace([...globs { test project config }])
Allows running multiple test projects in one process

5 CLI Options
--config path
--include pattern append to include
--exclude pattern append to exclude
-u --update update snapshots
-w --watch watch mode
--environment node jsdom happy-dom edge-runtime
--globals true|false
--port number
--https boolean or config file
--reporter default json html junit custom path
--outputFile path or map
--pool threads forks vmThreads vmForks

Disable auto install checks VITEST_SKIP_INSTALL_CHECKS=1

## Supplementary Details
Prerequisites Vite >=5.0.0 Node >=18.0.0
npx vitest execution fallback installs temp
Test file name matching rules default include glob array
CLI precedence flags override config for include exclude update watch
Configuration file load order vite.config.* -> vitest.config.* -> CLI --config
defineConfig from vitest/config returns normalized config object
mergeConfig merges Vite config and Vitest config preserving Vite settings
Workspaces define multiple test projects use defineWorkspace from vitest/config file
Environment override docblock or comment @vitest-environment <env> at top of test file
Automatic dependency install prompt disabled by environment variable
IDE integration VS Code extension adds run and debug code lenses


## Reference Details
API Signatures

import { test expect describe it beforeAll afterAll beforeEach afterEach vi } from vitest

test(name string callback Function) => void
describe(name string callback Function) => void
it alias for test
beforeAll callback Function => void
afterAll callback Function => void
beforeEach callback Function => void
afterEach callback Function => void
vi.mock(moduleId string factory? Function options? { virtual boolean }) => void
vi.spyOn(object any methodName string) =>SpyInstance

Expect API
import { expect } from vitest
expect<T>(value T) returns Matchers<T>
Matchers<T> methods
toBe(expected T) => void
toEqual(expected any) => void
toContain(item any) => void
toThrow(error? Error|string|RegExp) => void
... additional matchers from Jest compatibility

Configuration API
import { defineConfig mergeConfig configDefaults } from vitest/config

defineConfig(config VitestConfig) => VitestConfig
mergeConfig(baseConfig VitestConfig extendedConfig VitestConfig) => VitestConfig
configDefaults exclude patterns default array

VitestConfig.test options detailed in normalisedExtract

CLI Commands
vitest [options]
vitest run [options]
Options full list obtained via vitest --help includes above flags

Best Practices
Use single config file for Vite and Vitest declare test property inside defineConfig
Use include exclude patterns explicit to speed up discovery
Use threads pool for CPU bound tests fork pool for native modules
Use vmThreads for faster execution in sandbox with memoryLimit config
Use update and watch flags in CI and local workflows accordingly

Troubleshooting
Error matching test files no matches ensure patterns correct include glob includes path
Error require vs import enable interop by deps.interopDefault true
Snapshot mismatches run vitest -u update snapshots
Missing dependencies run vitest skip install checks variable VITEST_SKIP_INSTALL_CHECKS=1
Custom environment not found ensure package vitest-environment-custom installed and named vitest-environment-custom

Exact commands
npm run test
npm test
vitest --config ./vitest.config.ts --environment jsdom --watch



## Information Dense Extract
Install Vitest devDependency npm install -D vitest yarn add -D vitest pnpm add -D vitest bun add -D vitest Requires Vite>=5.0.0 Node>=18.0.0 ; Tests filenames match **/*.{test,spec}.?(c|m)[jt]s?(x) ; test(name,fn) expect API with toBe toEqual toContain toThrow ; Default include glob [**/*.{test,spec}.?(c|m)[jt]s?(x)] exclude [node_modules dist .{idea,git,cache,temp}] ; Config file hierarchy vite.config.* -> vitest.config.* -> CLI --config ; defineConfig({ test: { include exclude globals environment pool threads forks vmThreads vmForks watch update root dir reporters outputFile alias deps { external inline fallbackCJS cacheDir optimizer { enabled include exclude } } } }) ; mergeConfig(viteConfig, defineConfig({ test: {}})) ; Workspaces defineWorkspace([...globs|project]) ; CLI options flags --config --include --exclude -u -w --environment --globals --port --https --reporter --outputFile --pool ; Disable install checks VITEST_SKIP_INSTALL_CHECKS=1 ; API signatures test(name,fn) describe it beforeAll afterAll beforeEach afterEach vi.mock vi.spyOn ; Expect<T>(value).toBe().toEqual().toContain().toThrow() ; defineConfig, mergeConfig, configDefaults from vitest/config ; Pools threads forks vmThreads vmForks tradeoffs ; Troubleshooting patterns fix globs update snapshots --update skip install checks env var ensure custom env package

## Sanitised Extract
Table of Contents

1 Installation Commands
2 Writing Tests
3 Configuration
4 Workspaces Support
5 CLI Options

1 Installation Commands
Install Vitest as dev dependency
Commands npm install -D vitest yarn add -D vitest pnpm add -D vitest bun add -D vitest
Prerequisites Vite >= 5.0.0 Node >= 18.0.0
Alternative using npx vitest

2 Writing Tests
Filename patterns *.test.* *.spec.*
Sum example function and test files
Test API import { test expect } from vitest
test signature test(name string fn()=>void|Promise)
Expect API methods toBe toEqual toContain toThrow
Package json scripts add 'test': 'vitest'
Run commands npm run test yarn test pnpm test bun run test

3 Configuration
By default Vitest reads vite.config.* to merge plugins aliases resolve
Override create vitest.config.ts or use CLI --config
Supported config file extensions js mjs cjs ts cts mts
Configuration entry defineConfig({ test options })
Key test options include
include string[] default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
exclude string[] default ['**/node_modules/**' '**/dist/**' '**/.{idea,git,cache,temp}/**']
includeSource string[] default []
globals boolean default false
environment string default node
pool string default forks
threads boolean default false
forks boolean default true
vmThreads boolean default false
vmForks boolean default false
update boolean default false
watch boolean default not CI
root string default project root
dir string default same as root
reporters builtin|string[] default ['default']
outputFile string|Record default undefined
alias Record<string string>|Array patterns
deps.external (string|RegExp)[] default [/node_modules/]
deps.inline (string|RegExp)[] default []
deps.fallbackCJS boolean default false
deps.cacheDir string default node_modules/.vite
deps.optimizer.enabled boolean default false
deps.optimizer.include string[] default []
deps.optimizer.exclude string[] default []

Using mergeConfig(viteConfig defineConfig) to extend

4 Workspaces Support
File vitest.workspace.js ts json export defineWorkspace([...globs { test project config }])
Allows running multiple test projects in one process

5 CLI Options
--config path
--include pattern append to include
--exclude pattern append to exclude
-u --update update snapshots
-w --watch watch mode
--environment node jsdom happy-dom edge-runtime
--globals true|false
--port number
--https boolean or config file
--reporter default json html junit custom path
--outputFile path or map
--pool threads forks vmThreads vmForks

Disable auto install checks VITEST_SKIP_INSTALL_CHECKS=1

## Original Source
Node.js Core Modules, Fetch API & Vitest Testing Framework
https://vitest.dev/

## Digest of VITEST

# Getting Started

## Installation

Install Vitest as a dev dependency using npm yarn pnpm or bun

npm install -D vitest

yarn add -D vitest

pnpm add -D vitest

bun add -D vitest

Requirements Vite version >=5.0.0 Node version >=18.0.0

You can also run using npx vitest without installation

## Writing Tests

Filename conventions Tests must include .test. or .spec. in file name

Example sum.js

export function sum(a b) {
  return a + b
}

Example sum.test.js

import { test expect } from vitest
import { sum } from ./sum.js

test adds one plus two to equal three () => {
  expect(sum(1 2)).toBe(3)
}

Add to package json scripts section

"scripts": {
  "test": "vitest"
}

Run tests npm run test yarn test pnpm test bun run test

## Configuring Vitest

Vitest reads vite.config file by default to reuse Vite plugins resolve aliases and settings

To override create vitest.config.ts or pass --config CLI flag

Supported extensions .js .mjs .cjs .ts .cts .mts not .json

Use environment variable VITEST or defineConfig mode property to conditionally switch config based on mode test

### Using vitest/config

/// reference types vitest/config
import defineConfig from vitest config

export default defineConfig({
  test: {
    include ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude ["node_modules/**" "dist/**"],
    globals false,
    environment node,
    pool forks,
    threads true,
    watch false,
    update false,
    root ., dir ., reporters default,
    alias { react preact },
    deps {
      external [/node_modules/],
      inline [],
      fallbackCJS false,
      cacheDir node_modules/.vite,
      optimizer { enabled false include [] exclude [] }
    }
  }
})

### Merging Configs

import viteConfig from ./vite.config.mjs
import { mergeConfig defineConfig } from vitest/config

export default mergeConfig(viteConfig defineConfig({
  test { /* overrides */ }
}))

## Workspaces Support

Create vitest.workspace.js ts json file using defineWorkspace from vitest config

Export array of glob patterns config files or objects with test project properties name root environment setupFiles

## Command Line Interface

Default npm scripts test vitest coverage vitest run --coverage

Run once without watch vitest run

Common CLI options
--config <path>
--include <glob>
--exclude <glob> appended as exclude patterns
--environment <node jsdom happy-dom edge-runtime>
--globals true false
--update or -u
--watch or -w
--port number
--https boolean or https config
--reporter default json html junit
--outputFile path
--pool threads forks vmThreads vmForks

## Automatic Dependency Installation

Vitest prompts to install missing dependencies disable by setting VITEST_SKIP_INSTALL_CHECKS=1

## IDE Integrations

Official VS Code extension install from marketplace adds code lens test run debug

# Reference

Source Node.js Core Modules Fetch API & Vitest Testing Framework retrieved 2024-06-17
Data Size 27987677 bytes


## Attribution
- Source: Node.js Core Modules, Fetch API & Vitest Testing Framework
- URL: https://vitest.dev/
- License: License
- Crawl Date: 2025-04-27T17:48:27.112Z
- Data Size: 27987677 bytes
- Links Found: 22887

## Retrieved
2025-04-27
