# VITEST_SETUP

## Crawl Summary
Installation commands: npm/yarn/pnpm/bun add -D vitest; requires Vite>=5.0.0, Node>=18.0.0. Default test file globs: **/*.test.* and **/*.spec.*. package.json scripts: "test": "vitest", "coverage": "vitest run --coverage". Config priority: vitest.config.ts over vite.config.ts; CLI --config; use defineConfig({ test:{...} }); support .js/.mjs/.cjs/.ts/.cts/.mts; no .json. Workspaces array with string globs or per-workspace objects with name, root, environment, setupFiles. CLI flags: run/watch, run with --coverage, --port, --https, --config, help. Env var VITEST_SKIP_INSTALL_CHECKS=1. VSCode extension.

## Normalised Extract
Table of Contents
1 Installation
2 Test File Naming
3 Package Scripts
4 Configuration Files
5 Workspaces Support
6 CLI Options
7 Environment Variables
8 IDE Integration

1 Installation
npm add -D vitest
yarn add -D vitest
pnpm add -D vitest
bun add -D vitest
Requirements: Vite>=5.0.0, Node>=18.0.0

2 Test File Naming
Glob patterns matched by default:
**/*.test.[jt]s(x)
**/*.spec.[jt]s(x)

3 Package Scripts
Add to package.json:
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

4 Configuration Files
- vite.config.ts: 
  - import defineConfig from 'vite'
  - add triple-slash directive: /// <reference types="vitest/config" />
  - defineConfig({ test:{ /* options */ } })
- vitest.config.ts (priority):
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test:{ /* options */ } })
- CLI override: vitest --config <path>
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
Unsupported: .json

5 Workspaces Support
In vitest.config.ts:
workspace: Array<string | { name:string; root:string; environment:string; setupFiles:string[] }>
Example:
['packages/*','tests/*/vitest.config.{unit,e2e}.ts', { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] }, ...]

6 CLI Options
vitest              watch mode
vitest run          single run
--coverage          enable coverage
--config <path>     config file override
--port <number>     custom port
--https             enable HTTPS
--help              print options

7 Environment Variables
VITEST_SKIP_INSTALL_CHECKS=1  disable dependency prompts

8 IDE Integration
VS Code extension: "Vitest" on Marketplace

## Supplementary Details
- mergeConfig example:
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'
  export default mergeConfig(viteConfig, defineConfig({ test:{ /* options */ } }))
- Conditional in vite.config.ts:
  if (process.env.VITEST === 'true') { /* test-only plugins */ }
- Vite plugin reuse:
  any Vite option under defineConfig({ test:{ ... } }) is applied by Vitest's transformer.
- Setup Files:
  test.setupFiles: string[]   files to run before tests
- Test environment default: 'node'; options: 'node', 'jsdom', 'happy-dom'
- Coverage options:
  coverage: boolean | { provider:string; reporter: string[]; include: string[]; exclude: string[] }
- Global Setup/Teardown:
  globalSetup: string; globalTeardown: string
- Threads:
  threads: boolean; maxThreads: number; minThreads: number


## Reference Details
API: defineConfig(options: TestConfig): VitestUserConfig
interface TestConfig {
  include?: string[]
  exclude?: string[]
  dir?: string
  testTimeout?: number
  hookTimeout?: number
  threads?: boolean
  maxThreads?: number
  minThreads?: number
  environment?: 'node' | 'jsdom' | 'happy-dom'
  root?: string
  name?: string
  setupFiles?: string[]
  globalSetup?: string
  globalTeardown?: string
  coverage?: boolean | {
    provider?: 'c8' | 'istanbul'
    reporter?: string[]
    include?: string[]
    exclude?: string[]
    all?: boolean
  }
  reporters?: ('default' | 'verbose' | string)[]
}

CLI: vitest [run] [--watch] [--coverage] [--config <path>] [--port <number>] [--https] [--reporter <name>]

Example Code:
// vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    threads: false,
    setupFiles: ['test/setup.ts'],
    coverage: { provider: 'c8', reporter: ['text', 'html'], include: ['src/**'], exclude: ['src/**.d.ts'] }
  }
})

Best Practices:
- Use one config file for Vite and Vitest
- Name test files with .test or .spec suffix
- Disable threads when debugging

Troubleshooting:
- Bun default runner conflict: use bun run test
- Config not applied: verify extension, priority of vitest.config.ts
- Dependency prompt: set VITEST_SKIP_INSTALL_CHECKS=1

Expected Output Example:
$ npm run test
> vitest
 PASS  sum.test.js
  ✓ adds 1 + 2 to equal 3 (5ms)

Test Files 1 passed (1)
Tests 1 passed (1)
Duration 200ms


## Information Dense Extract
install: npm|yarn|pnpm|bun add -D vitest; require: Vite>=5.0.0, Node>=18.0.0; file patterns: **/*.test.*|**/*.spec.*; scripts: test=vitest, coverage=vitest run --coverage; config: vite.config.ts defineConfig({test:{}}) with ///<reference types="vitest/config"/>, vitest.config.ts override, CLI --config; config ext: .js,.mjs,.cjs,.ts,.cts,.mts; workspaces: test.workspace:string|object[]{name,root,environment,setupFiles}; CLI opts: run, --coverage, --config, --port, --https, --reporter; env: VITEST_SKIP_INSTALL_CHECKS=1; defineConfig(TestConfig) interface; coverage config; threads; globalSetup/Teardown; VSCode extension; bun run test; mergeConfig usage; expected output format.

## Sanitised Extract
Table of Contents
1 Installation
2 Test File Naming
3 Package Scripts
4 Configuration Files
5 Workspaces Support
6 CLI Options
7 Environment Variables
8 IDE Integration

1 Installation
npm add -D vitest
yarn add -D vitest
pnpm add -D vitest
bun add -D vitest
Requirements: Vite>=5.0.0, Node>=18.0.0

2 Test File Naming
Glob patterns matched by default:
**/*.test.[jt]s(x)
**/*.spec.[jt]s(x)

3 Package Scripts
Add to package.json:
{
  'scripts': {
    'test': 'vitest',
    'coverage': 'vitest run --coverage'
  }
}

4 Configuration Files
- vite.config.ts: 
  - import defineConfig from 'vite'
  - add triple-slash directive: /// <reference types='vitest/config' />
  - defineConfig({ test:{ /* options */ } })
- vitest.config.ts (priority):
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test:{ /* options */ } })
- CLI override: vitest --config <path>
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
Unsupported: .json

5 Workspaces Support
In vitest.config.ts:
workspace: Array<string | { name:string; root:string; environment:string; setupFiles:string[] }>
Example:
['packages/*','tests/*/vitest.config.{unit,e2e}.ts', { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] }, ...]

6 CLI Options
vitest              watch mode
vitest run          single run
--coverage          enable coverage
--config <path>     config file override
--port <number>     custom port
--https             enable HTTPS
--help              print options

7 Environment Variables
VITEST_SKIP_INSTALL_CHECKS=1  disable dependency prompts

8 IDE Integration
VS Code extension: 'Vitest' on Marketplace

## Original Source
Vitest Testing Framework
https://vitest.dev/guide/

## Digest of VITEST_SETUP

# Vitest Setup and Configuration

## Installation

-  npm add -D vitest  
-  yarn add -D vitest  
-  pnpm add -D vitest  
-  bun add -D vitest  

Requirements:
-  Vite >= 5.0.0
-  Node.js >= 18.0.0

## Test File Naming

Default file name patterns:
-  **/*.test.[jt]s(x)
-  **/*.spec.[jt]s(x)

## package.json Scripts

{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

## Configuration Files

1.  vite.config.ts
    - add `test` property under `defineConfig`
    - triple-slash directive at top: `/// <reference types="vitest/config" />`
2.  vitest.config.ts (higher priority)
3.  CLI override: `vitest --config ./path/to/vitest.config.ts`
4.  Conditional mode: `process.env.VITEST === 'true'` or defineConfig({ mode: 'test' })

Supported extensions for config: .js, .mjs, .cjs, .ts, .cts, .mts
Unsupported: .json

## Workspaces Support

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{unit,e2e}.ts',
      {
        name: 'happy-dom',
        root: './shared_tests',
        environment: 'happy-dom',
        setupFiles: ['./setup.happy-dom.ts']
      },
      {
        name: 'node',
        root: './shared_tests',
        environment: 'node',
        setupFiles: ['./setup.node.ts']
      }
    ]
  }
})
```

## Command Line Interface

-  Run in watch mode: `vitest`
-  Run once: `vitest run`
-  Coverage report: `vitest run --coverage`
-  Override config: `--config <path>`
-  Ports: `--port <number>`
-  HTTPS: `--https`
-  Help: `npx vitest --help`

## Environment Variables

-  VITEST_SKIP_INSTALL_CHECKS=1  Disable automatic dependency prompts

## IDE Integration

-  Official VS Code extension: install from Marketplace “Vitest”

---

*Data Size: 28561615 bytes*  
*Retrieved: 2024-06-20*

## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/guide/
- License: License: MIT
- Crawl Date: 2025-05-10T04:58:33.433Z
- Data Size: 28561615 bytes
- Links Found: 23130

## Retrieved
2025-05-10
