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
