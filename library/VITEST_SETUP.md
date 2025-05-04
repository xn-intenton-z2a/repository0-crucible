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
