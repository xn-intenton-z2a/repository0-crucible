# VITEST_GUIDE

## Crawl Summary
Installation commands with package managers; minimum Vite and Node versions; npx behavior; test file naming (.test. or .spec.); package.json scripts; CLI invocation differences (bun run test); config file resolution and precedence; supported extensions; merging Vite and Vitest configs; workspaces globs and objects; CLI flags (--coverage, --port, --https); environment variable VITEST_SKIP_INSTALL_CHECKS; IDE extension availability.

## Normalised Extract
Table of Contents
1. Installation Commands
2. NPX Invocation Behavior
3. Test File Structure and Naming
4. Package.json Scripts
5. Configuration Files
6. Config Resolution and Extensions
7. mergeConfig Usage
8. Workspaces Configuration
9. CLI Commands and Flags
10. Environment Variables

1. Installation Commands
  • npm install -D vitest
  • yarn add -D vitest
  • pnpm add -D vitest
  • bun add -D vitest
  Requirements: Vite>=5.0.0, Node>=18.0.0

2. NPX Invocation Behavior
  • npx vitest runs local binary if exists, else global, else installs temporarily

3. Test File Structure and Naming
  • Test files must include .test. or .spec. in filename
  • Example file headers: import { expect, test } from 'vitest'

4. Package.json Scripts
  • "test": "vitest"
  • "coverage": "vitest run --coverage"

5. Configuration Files
  • vite.config.ts with test property
  • vitest.config.[js|ts|mjs|cjs|mts|cts]
  • CLI flag --config ./path/to/vitest.config.ts

6. Config Resolution and Extensions
  • Vitest reads vite.config.ts if present
  • vitest.config.ts has higher priority
  • Supported: .js, .mjs, .cjs, .ts, .cts, .mts; Not supported: .json

7. mergeConfig Usage
  • import { mergeConfig } from 'vitest/config'
  • mergeConfig(viteConfig, defineConfig({ test: {...} }))

8. Workspaces Configuration
  test:
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] },
      { name:'node', root:'./shared_tests', environment:'node', setupFiles:['./setup.node.ts'] }
    ]

9. CLI Commands and Flags
  • vitest run --coverage
  • vitest run --port 5123 --https
  • npx vitest --help

10. Environment Variables
  • VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency prompts

## Supplementary Details
• Default test environment: 'node'
• Default test.include: ['**/*.{test,spec}.{js,mjs,cjs,ts,cts,mts}']
• Default test.exclude: ['node_modules']
• setupFiles: array of module paths executed before tests
• mode property in defineConfig sets process.env.MODE for Vite to 'test'
• process.env.VITEST can override mode detection
• mergeConfig preserves base Vite plugin resolution

Implementation Steps:
1. Install Vitest
2. Create default vitest.config.ts or augment vite.config.ts
3. Add test script to package.json
4. Write tests matching naming pattern
5. Run tests via npm/yarn/pnpm/bun commands
6. Disable prompts via env variable if CI


## Reference Details
1. defineConfig (from 'vitest/config')
   Signature: function defineConfig(config: UserConfig): UserConfig
   UserConfig.test: {
     include?: string[]
     exclude?: string[]
     environment?: 'node' | 'jsdom' | 'happy-dom' | string
     globals?: boolean
     threads?: boolean
     isolate?: boolean
     watch?: boolean
     logHeapUsage?: boolean
     coverage?: {
       enabled: boolean
       reporter: Array<'text' | 'json' | 'lcov' | 'html'>
       include: string[]
       exclude: string[]
     }
     setupFiles?: string[]
     deps?: { inline: string[]; external: string[] }
     alias?: Record<string,string>
     timeout?: number
     testTimeout?: number
     slowTestThreshold?: number
     renderTimeout?: number
     apiTimeout?: number
     reporters?: string[]
     root?: string
     name?: string
     globalSetup?: string
     globalTeardown?: string
     teardownTimeout?: number
     snapshotDir?: string
     snapshotUpdate?: boolean
     snapshotFormat?: object
     passWithNoTests?: boolean
     watchExclude?: string[]
     watchInclude?: string[]
   }

2. CLI Options
   vitest [run|watch] [--coverage] [--port <number>] [--https] [--config <path>] [--threads] [--maxThreads <number>] [--update] [--silent]
   --coverage: boolean (default false)
   --port: number (default 5123)
   --https: boolean (default false)
   --config: string
   --threads: boolean (default true)
   --maxThreads: number (default number of CPU cores)
   --update: boolean (update snapshots)
   --silent: boolean

3. Code Examples
   vitest.config.ts
   import { defineConfig } from 'vitest/config'

   export default defineConfig({
     test: {
       include: ['tests/unit/**/*.spec.ts'],
       environment: 'jsdom',
       globals: true,
       setupFiles: ['src/setupTests.ts'],
       threads: false,
       coverage: {
         enabled: true,
         reporter: ['text','lcov'],
         include: ['src/**/*.{js,ts}'],
         exclude: ['src/**/*.d.ts']
       }
     }
   })

4. Troubleshooting
   • Tests not found: Ensure filenames include .test. or .spec.
   • Vite config not applied: Use mergeConfig or vitest.config.ts
   • Missing dependencies prompt: Set VITEST_SKIP_INSTALL_CHECKS=1
   • Bun test conflict: Use bun run test

Expected Outputs:
   npm run test
   ✓ sum.test.js (1)
     ✓ adds 1 + 2 to equal 3
   Test Files 1 passed (1)
   Tests 1 passed (1)
   Duration: 300ms


## Information Dense Extract
install:-D vitest (req Vite>=5.0.0,Node>=18.0.0); npx vitest resolves local/bin/global; tests *.test.* or *.spec.*; scripts:{test:'vitest',coverage:'vitest run --coverage'}; config precedence: vitest.config > vite.config; supported extensions js,mjs,cjs,ts,cts,mts; mergeConfig(base,defineConfig({test:{}})); test.workspace supports globs+objects{name,root,environment,setupFiles}; CLI: vitest [run|watch] [--coverage] [--port N] [--https] [--config PATH] [--threads] [--maxThreads N] [--update] [--silent]; env VITEST_SKIP_INSTALL_CHECKS=1; defineConfig test options include,exclude,environment,globals,threads,isolate,watch,coverage{enabled,reporter,include,exclude},setupFiles,alias,timeout; troubleshooting: filenames, mergeConfig, env var, bun run

## Sanitised Extract
Table of Contents
1. Installation Commands
2. NPX Invocation Behavior
3. Test File Structure and Naming
4. Package.json Scripts
5. Configuration Files
6. Config Resolution and Extensions
7. mergeConfig Usage
8. Workspaces Configuration
9. CLI Commands and Flags
10. Environment Variables

1. Installation Commands
   npm install -D vitest
   yarn add -D vitest
   pnpm add -D vitest
   bun add -D vitest
  Requirements: Vite>=5.0.0, Node>=18.0.0

2. NPX Invocation Behavior
   npx vitest runs local binary if exists, else global, else installs temporarily

3. Test File Structure and Naming
   Test files must include .test. or .spec. in filename
   Example file headers: import { expect, test } from 'vitest'

4. Package.json Scripts
   'test': 'vitest'
   'coverage': 'vitest run --coverage'

5. Configuration Files
   vite.config.ts with test property
   vitest.config.[js|ts|mjs|cjs|mts|cts]
   CLI flag --config ./path/to/vitest.config.ts

6. Config Resolution and Extensions
   Vitest reads vite.config.ts if present
   vitest.config.ts has higher priority
   Supported: .js, .mjs, .cjs, .ts, .cts, .mts; Not supported: .json

7. mergeConfig Usage
   import { mergeConfig } from 'vitest/config'
   mergeConfig(viteConfig, defineConfig({ test: {...} }))

8. Workspaces Configuration
  test:
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] },
      { name:'node', root:'./shared_tests', environment:'node', setupFiles:['./setup.node.ts'] }
    ]

9. CLI Commands and Flags
   vitest run --coverage
   vitest run --port 5123 --https
   npx vitest --help

10. Environment Variables
   VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency prompts

## Original Source
Vitest Documentation
https://vitest.dev/guide/

## Digest of VITEST_GUIDE

# Vitest Guide Technical Digest (retrieved 2024-06-04)
Data Size: 41607800 bytes

## Adding Vitest to Your Project
Install locally as development dependency:

bash npm install -D vitest
bash yarn add -D vitest
bash pnpm add -D vitest
bash bun add -D vitest

Requirements:
• Vite >= v5.0.0
• Node.js >= v18.0.0

## Running Vitest via NPX
• npx vitest: checks local binaries, falls back to system PATH, or installs temporarily.

## Writing Tests
File: sum.js
export function sum(a, b) {
  return a + b
}

File: sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

Naming convention: filename must include .test. or .spec.

Add to package.json:
{
  "scripts": {
    "test": "vitest"
  }
}

Run via npm run test, yarn test, pnpm test or bun run test (not bun test).

## Configuring Vitest
Unified with Vite. Vitest reads root vite.config.ts if present. Options:
1. Create vitest.config.ts (higher priority).
2. Pass --config CLI flag.
3. Use process.env.VITEST or defineConfig(mode) with mode="test".

Supported config extensions: .js, .mjs, .cjs, .ts, .cts, .mts
Not supported: .json

Standalone config (no Vite):
File: vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: { /* options */ }
})

Integrating into vite.config.ts:
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
export default defineConfig({
  test: { /* specify options here */ }
})

Config override warning: separate Vitest config overrides Vite config; use mergeConfig to merge.

Example merge:
import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from './vite.config.mjs'
export default mergeConfig(baseConfig, defineConfig({
  test: { /* ... */ }
}))

## Workspaces Support
In vitest.config.ts test.workspace accepts:
• glob patterns for directories with config files
• explicit objects with test properties: name, root, environment, setupFiles

Example:
test:
  workspace: [
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
    { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
  ]

## Command Line Interface
Default npm scripts in scaffold:
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

Run once: vitest run [--port <number>] [--https]
Full options: npx vitest --help

## Automatic Dependency Installation
Vitest prompts to install missing dependencies. Disable via:
env VITEST_SKIP_INSTALL_CHECKS=1

## IDE Integrations
Official VS Code extension available from Marketplace.



## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/guide/
- License: MIT License
- Crawl Date: 2025-05-06T03:34:54.832Z
- Data Size: 41607800 bytes
- Links Found: 26285

## Retrieved
2025-05-06
