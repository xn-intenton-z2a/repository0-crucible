# VITEST_GUIDE

## Crawl Summary
Install vitest via npm|yarn|pnpm|bun; requires Node>=18.0.0, Vite>=5.0.0. Test files must use .test. or .spec. suffix. Export functions in .js/.ts modules; import expect and test from vitest. Scripts: test: vitest; coverage: vitest run --coverage. Config via vite.config.ts or vitest.config.ts with defineConfig; priority vitest.config.ts>--config>mode. Supported config file extensions: .js,.mjs,.cjs,.ts,.cts,.mts. Test config options: include, exclude, environment, globals, setupFiles, threads, hookTimeout. Workspaces array accepts globs or config objects with name, root, environment, setupFiles. CLI flags: --config, --port <number>, --https, --coverage; use vitest run to disable watch. Disable auto install with VITEST_SKIP_INSTALL_CHECKS=1. Merge configs with mergeConfig. Use official VSCode extension. Install unreleased via pkg.pr.new or pnpm linking. Troubleshoot file naming, Bun command, config path, CLI help.

## Normalised Extract
Table of Contents:
1 Installation
2 Test File Patterns
3 Package Scripts
4 Configuration
5 Workspace Configuration
6 CLI Options
7 Environment Variables
8 IDE Integration
9 Unreleased Installation
10 Troubleshooting

1 Installation
Commands:
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest
Requirements:
  Node >= 18.0.0
  Vite >= 5.0.0
npx vitest runs local binary or installs temporary.

2 Test File Patterns
  File suffix must include .test. or .spec.

3 Package Scripts
Add to package.json:
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
Run with npm run test | yarn test | pnpm test | bun run test.

4 Configuration
Unified via vite.config.ts:
  /// <reference types="vitest/config" />
  import { defineConfig } from 'vite';
  export default defineConfig({
    test: { include:['**/*.test.ts'], environment:'node', globals:true, setupFiles:['./setup.ts'], threads:true, hookTimeout:5000 }
  });
Alternate standalone vitest.config.ts:
  import { defineConfig } from 'vitest/config';
  export default defineConfig({ test:{/* options */} });
Priority: vitest.config.ts > CLI --config <path> > defineConfig mode=test.
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts.

5 Workspace Configuration
In test.workspace array:
  globs: 'packages/*', 'tests/*/vitest.config.{e2e,unit}.ts'
  objects:
    { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] }

6 CLI Options
  vitest [--config <path>] [--port <number>] [--https] [--coverage]
  vitest run disables watch.

7 Environment Variables
  VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency prompts.

8 IDE Integration
  Install Vitest Runner extension in VS Code.

9 Unreleased Installation
  npm i https://pkg.pr.new/vitest@{commit}
  Local link:
    git clone https://github.com/vitest-dev/vitest.git
    pnpm install
    cd packages/vitest && pnpm run build && pnpm link --global
    in project: pnpm link --global vitest

10 Troubleshooting
  Bun conflict: use bun run test.
  Missing tests: check .test./.spec. suffix.
  Config not applied: verify file extension and path; use --config.
  CLI flags: npx vitest --help.

## Supplementary Details
Supported config file extensions: .js, .mjs, .cjs, .ts, .cts, .mts. .json not supported. defineConfig and mergeConfig API from 'vitest/config'.
Config option defaults:
  include: ['**/*.test.{js,ts}']
  exclude: ['node_modules', 'dist']
  globals: false
  environment: 'node'
  threads: true
  hookTimeout: 30000 ms
  testTimeout: 5000 ms
  coverage: false
  reporters: ['default']
  setupFiles: []
TestOptions:
  only: false
  skip: false
  timeout: inherits testTimeout
  retries: 0
Workspace object keys:
  name: string
  root: string
  environment: string
  setupFiles: string[]
CLI flags:
  --config <string>: path to config file
  --port <number>: port for coverage server
  --https: enable HTTPS
  --coverage: enable coverage run
Env vars:
  VITEST_SKIP_INSTALL_CHECKS: '1' disables dependency prompts
Type directive:
  /// <reference types="vitest/config" /> at top of config file
MergeConfig usage:
  mergeConfig(baseConfig, defineConfig({ test:{ /* overrides */ } }));

## Reference Details
Test API:
function test(
  name: string,
  fn: (() => unknown) | Promise<unknown>,
  options?: {
    only?: boolean;
    skip?: boolean;
    timeout?: number;
    retries?: number;
  }
): void;

Expect API:
interface Matchers<T> {
  toBe(expected: T): void;
  toEqual(expected: unknown): void;
  toThrow(error?: string | RegExp | ErrorConstructor): void;
  // ...other matchers
}
function expect<T>(value: T): Matchers<T>;

Config API:
function defineConfig<C>(config: C): C;
function mergeConfig<C1, C2>(config1: C1, config2: C2): C1 & C2;

TestConfig interface:
{
  include?: string[];
  exclude?: string[];
  globals?: boolean;
  environment?: 'node' | 'jsdom' | 'happy-dom';
  threads?: boolean;
  hookTimeout?: number;
  testTimeout?: number;
  coverage?: boolean | {
    reporter?: string[];
    exclude?: string[];
  };
  reporters?: string[];
  setupFiles?: string[];
  workspace?: Array<string | TestConfig>;
}

CLI commands & flags:
npx vitest [--config <path>] [--port <number>] [--https] [--coverage] [--run]

Environment variables:
VITEST_SKIP_INSTALL_CHECKS=1

Best Practices:
- Use unified vite.config.ts with test property.
- Avoid multiple config files; merge if needed.
- Name files with .test. or .spec. suffix.
- Pin Vitest version in package.json as devDependency.

Troubleshooting steps:
1. Bun uses own runner: use `bun run test` and confirm exit code 0.
2. File matching: run `npx vitest --detectLeaks` to verify patterns.
3. Config load: run `npx vitest --config ./vitest.config.ts --show-config`.
4. Missing types: add `/// <reference types="vitest/config" />` or install @types/vitest.
5. View help: `npx vitest --help`.
Expected output for basic test:
✓ sum.test.js (1)  ✓ adds 1 + 2 to equal 3
Test Files 1 passed(1) Tests 1 passed(1)


## Information Dense Extract
install: npm|yarn|pnpm|bun add -D vitest; Node>=18; Vite>=5; files: *.test.*|*.spec.*; sum.js export sum(a,b):number; sum.test.js import {test,expect}; script:test=vitest; coverage=vitest run --coverage; config:vite.config.ts or vitest.config.ts defineConfig({test:{include,exclude,environment,globals,threads,hookTimeout,setupFiles}}); ext:.js,.mjs,.cjs,.ts,.cts,.mts; mergeConfig(base,override); workspace:Array<string|TestConfig> entries; CLI: --config<string>,--port<number>,--https,--coverage,--run; env:VITEST_SKIP_INSTALL_CHECKS=1; API:test(name,fn,options:{only,skip,timeout,retries}); expect<T>(value).toBe|toEqual|toThrow; defineConfig<C>(C):C; mergeConfig<C1,C2>(C1,C2):C1&C2; TestConfig interface keys; troubleshooting: bun run test; npx vitest --help; ensure .test. suffix; use --show-config.

## Sanitised Extract
Table of Contents:
1 Installation
2 Test File Patterns
3 Package Scripts
4 Configuration
5 Workspace Configuration
6 CLI Options
7 Environment Variables
8 IDE Integration
9 Unreleased Installation
10 Troubleshooting

1 Installation
Commands:
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest
Requirements:
  Node >= 18.0.0
  Vite >= 5.0.0
npx vitest runs local binary or installs temporary.

2 Test File Patterns
  File suffix must include .test. or .spec.

3 Package Scripts
Add to package.json:
  'scripts': {
    'test': 'vitest',
    'coverage': 'vitest run --coverage'
  }
Run with npm run test | yarn test | pnpm test | bun run test.

4 Configuration
Unified via vite.config.ts:
  /// <reference types='vitest/config' />
  import { defineConfig } from 'vite';
  export default defineConfig({
    test: { include:['**/*.test.ts'], environment:'node', globals:true, setupFiles:['./setup.ts'], threads:true, hookTimeout:5000 }
  });
Alternate standalone vitest.config.ts:
  import { defineConfig } from 'vitest/config';
  export default defineConfig({ test:{/* options */} });
Priority: vitest.config.ts > CLI --config <path> > defineConfig mode=test.
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts.

5 Workspace Configuration
In test.workspace array:
  globs: 'packages/*', 'tests/*/vitest.config.{e2e,unit}.ts'
  objects:
    { name:'happy-dom', root:'./shared_tests', environment:'happy-dom', setupFiles:['./setup.happy-dom.ts'] }

6 CLI Options
  vitest [--config <path>] [--port <number>] [--https] [--coverage]
  vitest run disables watch.

7 Environment Variables
  VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency prompts.

8 IDE Integration
  Install Vitest Runner extension in VS Code.

9 Unreleased Installation
  npm i https://pkg.pr.new/vitest@{commit}
  Local link:
    git clone https://github.com/vitest-dev/vitest.git
    pnpm install
    cd packages/vitest && pnpm run build && pnpm link --global
    in project: pnpm link --global vitest

10 Troubleshooting
  Bun conflict: use bun run test.
  Missing tests: check .test./.spec. suffix.
  Config not applied: verify file extension and path; use --config.
  CLI flags: npx vitest --help.

## Original Source
Vitest Testing Framework
https://vitest.dev/guide/

## Digest of VITEST_GUIDE

# Installing Vitest

Requirements: Vite >= 5.0.0, Node >= 18.0.0
Install via:
```bash
npm install -D vitest
# or yarn add -D vitest
# or pnpm add -D vitest
# or bun add -D vitest
``` 
Tip: Use `npx vitest` to run local or temporary install.

# Writing Tests

File: sum.js
```js
export function sum(a, b) {
  return a + b;
}
```
File: sum.test.js
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
Filename must include `.test.` or `.spec.` suffix.

# Package.json Scripts

Add under `scripts`:
```json
{
  "test": "vitest",
  "coverage": "vitest run --coverage"
}
```
Run with `npm run test`, `yarn test`, `pnpm test`, or `bun run test` (avoid `bun test`).

# Configuring Vitest

Unified with Vite—place in `vite.config.ts`:
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    environment: 'node',
    globals: true,
    setupFiles: ['./setup.ts'],
    threads: true,
    hookTimeout: 5000
  }
});
```
Priority: `vitest.config.ts` > CLI `--config` > `mode: test` in `defineConfig`.
Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts (no .json).

Alternate standalone config in `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { /* options */ }
});
```
Merge Vite and Vitest configs:
```ts
import viteConfig from './vite.config.mjs';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  viteConfig,
  defineConfig({ test: { /* override */ } })
);
```

# Workspaces Support

In config:
```ts
defineConfig({
  test: {
    workspace: [
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
    ]
  }
});
```

# CLI Usage

Default commands:
- `vitest` (watch)
- `vitest run` (single run)
- `--config <path>`
- `--port <number>`
- `--https`
- `--coverage`

Run `npx vitest --help` for full option list.

# Automatic Dependency Installation

Prompted install for missing deps. Disable via:
```bash
export VITEST_SKIP_INSTALL_CHECKS=1
``` 

# IDE Integrations

Install official VS Code extension: Vitest Runner.

# Examples

Provided examples: basic, fastify, in-source-test, lit, vue, marko, preact, react, solid, svelte, sveltekit, profiling, typecheck, workspace.

# Using Unreleased Commits

Install nightly:
```bash
npm i https://pkg.pr.new/vitest@{commit}
```
Local build & link:
```bash
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
cd packages/vitest
pnpm run build
pnpm link --global
# then in project:
pnpm link --global vitest
```

# Troubleshooting

- Bun test runner conflict: use `bun run test`.
- File patterns not matching: ensure `.test.` or `.spec.` in filename.
- Config not applied: verify extension and path, use `--config`.
- View CLI flags: `npx vitest --help`.

_Last updated: 2024-06-01_

## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/guide/
- License: MIT License
- Crawl Date: 2025-05-07T21:27:50.000Z
- Data Size: 27282977 bytes
- Links Found: 22548

## Retrieved
2025-05-07
