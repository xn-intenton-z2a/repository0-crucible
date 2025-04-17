# VITEST

## Crawl Summary
Vitest documentation details provide the exact installation commands, code examples for writing tests, complete configuration options (in vitest.config.ts and vite.config.ts), CLI commands and flags, environment settings (node, jsdom, happy-dom), dependency resolution options including external and inline handling, and workspaces support. The documentation includes full code samples, configuration parameter defaults, and detailed instructions to merge Vite and Vitest configurations.

## Normalised Extract
## Table of Contents
1. Installation
2. Writing Tests
3. Configuration
4. Command Line Interface
5. Environment & Integration
6. Dependency Optimization & Server Options
7. Workspaces Support
8. Troubleshooting & Best Practices

---

### 1. Installation
- Install using:
  - npm: `npm install -D vitest`
  - yarn: `yarn add -D vitest`
  - pnpm: `pnpm add -D vitest`
  - bun: `bun add -D vitest`

### 2. Writing Tests
- Create a sum.js:
```js
export function sum(a, b) {
  return a + b;
}
```
- Create a test file, sum.test.js:
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
- Add test script in package.json:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### 3. Configuration
- Create a `vitest.config.ts` file:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**']
  },
});
```

- Use triple-slash directives in your config for proper type definitions:
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... options
  },
});
```

- Merge Vite and Vitest configurations:
```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ... test specific options
  },
}));
```

### 4. Command Line Interface
- Run tests: `vitest`
- Run tests once: `vitest run`
- Run coverage: `vitest run --coverage`
- CLI options include `--config`, `--port`, `--https`, `--watch`, and `--update`.

### 5. Environment & Integration
- Set test environment via `environment` (e.g. 'node', 'jsdom', 'happy-dom').
- Use docblock comments for file-specific environments:
```js
/**
 * @vitest-environment jsdom
 */
```

### 6. Dependency Optimization & Server Options
- Configuration parameters:
  - `server.deps.external`: Default: [/\/node_modules\//]
  - `server.deps.inline`: Can be an array or true (for all).
  - `server.deps.fallbackCJS`: Default: false
  - Options for sourcemap: `server.sourcemap` (default: 'inline')

### 7. Workspaces Support
- Define multiple workspace configurations in `vitest.workspace.ts`:
```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
]);
```

### 8. Troubleshooting & Best Practices
- For Bun users, ensure to use `bun run test`.
- Enable `deps.interopDefault` if you encounter issues with CommonJS modules.
- Use merging configuration techniques when using separate Vite and Vitest files.
- Run CLI commands with `--update` to refresh snapshots and `--watch` for continuous testing.


## Supplementary Details
### Supplementary Technical Specifications

1. **Installation Requirements**
   - Vite: >= v5.0.0
   - Node: >= v18.0.0

2. **Configuration Options** (in vitest.config.*):
   - `test.include`: string[]; Default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
   - `test.exclude`: string[]; Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
   - `test.globals`: boolean; Default: false
   - `test.environment`: string; Default: 'node'
   - `server.sourcemap`: 'inline' | boolean; Default: 'inline'
   - `server.deps`: Object containing `external`, `inline`, `fallbackCJS`, `cacheDir` etc.
   - `deps.optimizer`: Configuration for dependency bundling (includes options for ssr and web modes).

3. **CLI Options**
   - `--config <path>`: to specify an alternative config file
   - `--watch`: enable watch mode
   - `--update`: update snapshots
   - `--coverage`: run tests with coverage reporting

4. **Best Practices**
   - Use the same configuration file for both Vite and Vitest when possible to avoid duplication.
   - When using separate configurations, merge them via `mergeConfig` to avoid conflicts.
   - For type safety, always include triple slash type directives in configuration files.
   - Use environment-specific configuration blocks by leveraging `process.env.VITEST` and conditional definitions in `defineConfig`.

5. **Troubleshooting Procedures**
   - If tests fail to run, verify that all required dependencies are installed and that Vitest is correctly linked in the project.
   - For dependency errors with CJS modules, check the `deps.interopDefault` setting.
   - Run `npx vitest --help` for a full list of CLI options and verify command syntax.
   - If configuration conflicts arise between Vitest and Vite, try consolidating options in a single file.


## Reference Details
### Complete API Specifications & Implementation Patterns

#### 1. SDK Method Signatures & Examples

- **defineConfig (from 'vitest/config')**

  Signature:
  ```ts
  function defineConfig<T = UserConfigExport>(config: T | (() => T)): T;
  ```

  **Example:**
  ```ts
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**'],
    },
  });
  ```

- **mergeConfig (from 'vitest/config')**

  Signature:
  ```ts
  function mergeConfig<T>(baseConfig: T, overrideConfig: T): T;
  ```

  **Example:**
  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config';
  import viteConfig from './vite.config.mjs';

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      exclude: ['packages/template/*'],
    },
  }));
  ```

#### 2. CLI Commands & Flags

- **Command Examples:**

  Running tests:
  ```bash
  npx vitest
  ```

  Running tests once:
  ```bash
  npx vitest run
  ```

  Running tests with coverage:
  ```bash
  npx vitest run --coverage
  ```

  Running with custom config:
  ```bash
  npx vitest --config ./path/to/vitest.config.ts
  ```

#### 3. Configuration Options with Types & Defaults

- **test.include**: string[] 
  - Default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']

- **test.exclude**: string[] 
  - Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']

- **test.globals**: boolean 
  - Default: false

- **test.environment**: string 
  - Default: 'node'

- **server.sourcemap**: 'inline' | boolean 
  - Default: 'inline'

- **server.deps.external**: (string | RegExp)[] 
  - Default: [/\/node_modules\//]

- **server.deps.inline**: (string | RegExp)[] | true 
  - Default: []

- **deps.optimizer**: object with properties for both `ssr` and `web` modes, including flags such as `enabled` (boolean) and arrays for `include` and `exclude`.

#### 4. Error Handling & Troubleshooting

- If you receive errors like "Named export not found" from CommonJS modules, enable `deps.interopDefault: true` in your config.

- Use the following troubleshooting command to print available CLI options:
  ```bash
  npx vitest --help
  ```

- For snapshot issues, run with:
  ```bash
  npx vitest --update
  ```

#### 5. Best Practices Implementation Example

Combine configuration for both Vite and Vitest:

```ts
/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.ts'],
    exclude: ['node_modules'],
    reporters: 'default',
    update: false,
    watch: false,
  },
}));
```

This file demonstrates use of type directives, merging of configurations, and explicit CLI behavior overrides.


## Original Source
Vitest Documentation
https://vitest.dev

## Digest of VITEST

# Vitest Documentation Digest - Retrieved on 2023-10-12

## Overview
Vitest is a Vite-native, next generation testing framework that supports ESM, TypeScript, JSX and is fully integrated with Vite’s configuration and plugins. It includes features like smart watch mode, Jest-compatible assertions, snapshot testing, and coverage.

## Installation

- npm: `npm install -D vitest`
- yarn: `yarn add -D vitest`
- pnpm: `pnpm add -D vitest`
- bun: `bun add -D vitest`

*Note:* Vitest requires Vite >= v5.0.0 and Node >= v18.0.0.

## Writing Tests

Example of a simple addition function:

**sum.js**
```js
export function sum(a, b) {
  return a + b;
}
```

**sum.test.js**
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Update your package.json to include:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

## Configuring Vitest

Vitest can be configured via a dedicated `vitest.config.ts` file or within your Vite config using the `test` property. Examples include:

**vitest.config.ts**
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Specify test options here
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**']
  },
});
```

**vite.config.ts**
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... Specify test options here
  },
});
```

There is also support for merging Vite and Vitest configurations using `mergeConfig`:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ... Additional test configuration
  },
}));
```

## Command Line Interface

- Run tests once: `vitest run`
- Watch mode: `vitest` (auto-reruns affected tests like HMR)
- Coverage: `vitest run --coverage`
- CLI options include flags like `--config`, `--port`, `--https`, and more.

Default scripts in package.json:

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

## Environment & Integration

- **Environments:** Configure using the `environment` option (e.g., `node`, `jsdom`, `happy-dom`, `edge-runtime`).
- **Triple-slash directives:** e.g., `/// <reference types="vitest" />` or `/// <reference types="vitest/config" />` for proper type definitions.
- Custom environment can be defined by creating a module that exports an `Environment` object.

## Dependency Optimization & Server Options

Vitest uses Vite's dependency handling:

- **server.deps.external:** Array to externalize modules (default: [/\/node_modules\//]).
- **server.deps.inline:** Specify modules to be inlined (or set to true for all).
- **server.deps.fallbackCJS:** Convert ESM packages to CommonJS if needed.

Additional options include settings for sourcemaps, debugging, cache directories, and asset transformation.

## Workspaces Support

Vitest supports multi-workspace configuration using a `vitest.workspace.ts` file. Example:

```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
]);
```

## Troubleshooting & Best Practices

- When using Bun, use `bun run test` instead of `bun test`.
- For dependencies issues with CommonJS modules, enable `deps.interopDefault` to interpret defaults correctly.
- Verify that configuration in Vitest and Vite align if using separate config files; use `mergeConfig` to combine them.
- Use explicit CLI flags (e.g. `--update`, `--watch`) to control snapshot updates and test watching behavior.


## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev
- License: MIT License
- Crawl Date: 2025-04-17T15:26:06.936Z
- Data Size: 41837296 bytes
- Links Found: 26309

## Retrieved
2025-04-17
