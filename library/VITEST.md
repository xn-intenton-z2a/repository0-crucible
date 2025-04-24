# VITEST

## Crawl Summary
Vitest framework technical details include installation commands (npm, yarn, pnpm, bun), test file naming conventions (.test. or .spec.), configuration via vite.config.ts and vitest.config.ts, CLI usage (vitest, vitest run --coverage), dependency optimization options (deps.external, deps.inline, deps.cacheDir), workspaces with defineWorkspace, and troubleshooting through command line flags and merging configurations. Detailed configuration options with types, defaults and behavior are provided.

## Normalised Extract
Table of Contents:
1. Getting Started
2. Installation
3. Writing Tests
4. Configuring Vitest
5. CLI Options
6. Dependency Optimization
7. Workspaces
8. Troubleshooting

1. Getting Started:
- Framework: Vitest integrates with Vite, supports ESM, TypeScript, JSX.
- Requirements: Vite >= v5.0.0, Node >= v18.0.0.

2. Installation:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest

3. Writing Tests:
- Sample function in sum.js:
  export function sum(a, b) { return a + b }
- Test file sum.test.js:
  import { expect, test } from 'vitest'
  import { sum } from './sum.js'

  test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })
- Package.json script:
  "scripts": { "test": "vitest" }

4. Configuring Vitest:
- Use vite.config.ts for unified configuration. For separate testing configuration, create vitest.config.ts:
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test: { // custom options } })
- Merge with Vite config using mergeConfig if needed.

5. CLI Options:
- Default commands: vitest, vitest run --coverage
- Flags: --config, --port, --https, -w/--watch, -u/--update

6. Dependency Optimization:
- Options under test.deps:
  external (default: [/\/node_modules\//]), inline (default: [] or true for full inlining), cacheDir (default: 'node_modules/.vite')
- Optimizer options: deps.optimizer { ssr, web } with enabled flag false by default.

7. Workspaces:
- Define multiple configurations in vitest.workspace.ts using defineWorkspace. Example includes glob patterns and inline config objects with 'test' property parameters like environment, setupFiles.

8. Troubleshooting:
- For snapshot updates use -u
- Bun users must run 'bun run test'
- To debug merging issues, verify that separate config files are merged with mergeConfig.


## Supplementary Details
Installation requires Node >= v18.0.0 and Vite >= v5.0.0. Configuration examples:

vitest.config.ts:
  import { defineConfig } from 'vitest/config'
  export default defineConfig({
    test: {
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**'],
      globals: false,
      environment: 'node',
      runner: 'node',
      pool: 'forks',
      deps: {
        external: [/\/node_modules\//],
        inline: [],
        cacheDir: 'node_modules/.vite',
        optimizer: { ssr: { enabled: false }, web: { enabled: false } }
      }
    }
  })

For merging Vite config with Vitest:
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'
  export default mergeConfig(viteConfig, defineConfig({ test: { exclude: ['packages/template/*'] } }))

Workspaces file example (vitest.workspace.ts):
  import { defineWorkspace } from 'vitest/config'
  export default defineWorkspace([
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
    { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
  ])

Command Line usage:
- Run tests: npm run test
- Update snapshots: vitest --update
- Run without watch: vitest run
- CLI help: npx vitest --help

Troubleshooting:
- For dependency issues, check deps.optimizer settings and cacheDir for stale modules.
- Use VITEST_SKIP_INSTALL_CHECKS=1 to disable auto dependency prompts.


## Reference Details
API Specifications and Code Examples:

1. Function Signature for Test Example:
---------------------------
File: sum.js
Signature: export function sum(a: number, b: number): number
Example:
  export function sum(a, b) {
    return a + b
  }
---------------------------
File: sum.test.js
Import: import { expect, test } from 'vitest'
Usage:
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

2. Configuration API (vitest.config.ts):
---------------------------
Import:
  import { defineConfig } from 'vitest/config'
Configuration Object:
  {
    test: {
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**'],
      globals: false,
      environment: 'node',
      runner: 'node',
      pool: 'forks',
      deps: {
        external: [/\/node_modules\//],
        inline: [],
        cacheDir: 'node_modules/.vite',
        optimizer: {
          ssr: { enabled: false },
          web: { enabled: false }
        }
      }
    }
  }

3. Merging Configurations using mergeConfig:
---------------------------
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      exclude: ['packages/template/*']
    }
  }))

4. Workspaces Setup:
---------------------------
File: vitest.workspace.ts
Example:
  import { defineWorkspace } from 'vitest/config'

  export default defineWorkspace([
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    {
      test: {
        name: 'happy-dom',
        root: './shared_tests',
        environment: 'happy-dom',
        setupFiles: ['./setup.happy-dom.ts']
      }
    },
    {
      test: {
        name: 'node',
        root: './shared_tests',
        environment: 'node',
        setupFiles: ['./setup.node.ts']
      }
    }
  ])

5. CLI Usage and Options:
---------------------------
Scripts in package.json:
  {
    "scripts": {
      "test": "vitest",
      "coverage": "vitest run --coverage"
    }
  }
CLI Options:
  --config <path>: Specify custom config file
  --update or -u: Update snapshot files
  --watch or -w: Enable watch mode
  --port: Specify server port
  --https: Enable HTTPS

6. Best Practices & Troubleshooting:
---------------------------
- Always include .test. or .spec. in file names for automatic discovery.
- Use the same configuration for Vite and Vitest when possible.
- For Bun users, run tests with 'bun run test'.
- If merging config files, ensure that Vite options are not overridden unexpectedly.
- To debug module transformation issues, inspect the cache directory and adjust deps.optimizer.force if needed.
- For automatic dependency installation issues, set the VITEST_SKIP_INSTALL_CHECKS=1 environment variable.

Return Types, Exceptions: Vitest API does not throw specific exceptions in configuration, errors are reported during runtime test execution.


## Information Dense Extract
Vitest framework; Requirements: Vite>=5.0.0, Node>=18.0.0; Installation: npm, yarn, pnpm, bun; Test file naming: *.test.*, *.spec.*; Sample function: export function sum(a, b): number { return a + b }; Test example using import { expect, test } from 'vitest'; Config via vitest.config.ts using defineConfig; Merge Vite and Vitest configs with mergeConfig; CLI: vitest, vitest run, flags --config, --update, --watch; Dependency options: deps.external [/\/node_modules\//], deps.inline, cacheDir 'node_modules/.vite', optimizer options for ssr/web; Workspaces defined via defineWorkspace with glob patterns; Best practices: single config file, proper test naming, use CLI help npx vitest --help; Troubleshooting: check cacheDir, set VITEST_SKIP_INSTALL_CHECKS=1; Detailed API specs include method signatures, configuration object structure, CLI commands.

## Sanitised Extract
Table of Contents:
1. Getting Started
2. Installation
3. Writing Tests
4. Configuring Vitest
5. CLI Options
6. Dependency Optimization
7. Workspaces
8. Troubleshooting

1. Getting Started:
- Framework: Vitest integrates with Vite, supports ESM, TypeScript, JSX.
- Requirements: Vite >= v5.0.0, Node >= v18.0.0.

2. Installation:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest

3. Writing Tests:
- Sample function in sum.js:
  export function sum(a, b) { return a + b }
- Test file sum.test.js:
  import { expect, test } from 'vitest'
  import { sum } from './sum.js'

  test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })
- Package.json script:
  'scripts': { 'test': 'vitest' }

4. Configuring Vitest:
- Use vite.config.ts for unified configuration. For separate testing configuration, create vitest.config.ts:
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test: { // custom options } })
- Merge with Vite config using mergeConfig if needed.

5. CLI Options:
- Default commands: vitest, vitest run --coverage
- Flags: --config, --port, --https, -w/--watch, -u/--update

6. Dependency Optimization:
- Options under test.deps:
  external (default: [/'/node_modules'//]), inline (default: [] or true for full inlining), cacheDir (default: 'node_modules/.vite')
- Optimizer options: deps.optimizer { ssr, web } with enabled flag false by default.

7. Workspaces:
- Define multiple configurations in vitest.workspace.ts using defineWorkspace. Example includes glob patterns and inline config objects with 'test' property parameters like environment, setupFiles.

8. Troubleshooting:
- For snapshot updates use -u
- Bun users must run 'bun run test'
- To debug merging issues, verify that separate config files are merged with mergeConfig.

## Original Source
Vitest Testing Framework
https://vitest.dev/

## Digest of VITEST

# Vitest Testing Framework

Retrieved Date: 2023-11-24

## Overview
Vitest is a Vite-native testing framework that supports ESM, TypeScript, and JSX. It reuses Vite configuration and plugins and is compatible with Jest (expect, snapshot, coverage, etc.).

## Installation

Install Vitest using one of the following methods:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest

Note: Vitest requires Vite >= v5.0.0 and Node >= v18.0.0.

## Writing Tests

Create a file sum.js:

  export function sum(a, b) {
    return a + b
  }

Create a test file sum.test.js:

  import { expect, test } from 'vitest'
  import { sum } from './sum.js'

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

Ensure test files include .test. or .spec. in their filename and add script in package.json:

  {
    "scripts": {
      "test": "vitest"
    }
  }

## Configuring Vitest

Vitest supports unified configuration with Vite. In Vite projects, Vitest reads vite.config.ts. To override, create vitest.config.ts with higher priority:

Example (vitest.config.ts):

  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      // Test configuration here
    }
  })

You can also use CLI option --config to specify a custom configuration file.

For non-Vite projects, use the test property in your config file:

  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      // ...
    }
  })

### Merging Vite and Vitest Configuration

When using separate files, use mergeConfig:

  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      // ...
    }
  }))

## Workspaces Support

Define workspaces using a vitest.workspace.ts file. Example:

  import { defineWorkspace } from 'vitest/config'

  export default defineWorkspace([
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    {
      test: {
        name: 'happy-dom',
        root: './shared_tests',
        environment: 'happy-dom',
        setupFiles: ['./setup.happy-dom.ts']
      }
    },
    {
      test: {
        name: 'node',
        root: './shared_tests',
        environment: 'node',
        setupFiles: ['./setup.node.ts']
      }
    }
  ])

## Command Line Interface (CLI)

Default npm scripts:

  {
    "scripts": {
      "test": "vitest",
      "coverage": "vitest run --coverage"
    }
  }

Use "vitest run" to run tests once. Additional CLI options such as --port, --https can be specified. Run npx vitest --help for full options.

## Automatic Dependency Installation

Vitest automatically prompts installation for missing dependencies. Disable with environment variable VITEST_SKIP_INSTALL_CHECKS=1.

## IDE Integrations

An official Visual Studio Code extension is available to enhance the Vitest testing experience.

## Configuration Options Summary

- include: Glob patterns for test files (default: '**/*.{test,spec}.?(c|m)[jt]s?(x)')
- exclude: Glob patterns to ignore (default: ['**/node_modules/**', '**/dist/**', ...])
- globals: Boolean flag to enable global APIs (default: false)
- environment: Test environment ('node', 'jsdom', 'happy-dom', etc.)
- runner: Specify custom test runner (default: node)
- pool: Specify pool type ('threads', 'forks', 'vmThreads', etc., default: 'forks')

## Dependency Optimization and Transformation

Vitest supports dependency optimization using esbuild. Key options include:

- deps.external: Externalize node_modules dependencies
- deps.inline: Process modules for ESM compatibility
- deps.cacheDir: Default is 'node_modules/.vite'
- deps.optimizer: Options for SSR and Web bundling (enabled: false by default)

## Troubleshooting and Best Practices

- Updating snapshots: Use CLI flag -u
- For Bun users: run tests with 'bun run test'
- Ensure consistency if using separate config files by merging using mergeConfig.
- To debug dependency issues, check cache directories and disable optimizer force options if needed.

Attribution: Crawled from Vitest website
Data Size: 32006146 bytes

## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/
- License: License: MIT
- Crawl Date: 2025-04-24T04:48:23.217Z
- Data Size: 32006146 bytes
- Links Found: 24493

## Retrieved
2025-04-24
