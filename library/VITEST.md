# VITEST

## Crawl Summary
Vitest is a testing framework integrated with Vite and supports ESM, TypeScript, and JSX with esbuild. It provides unified configuration via vite.config and vitest.config files, supports workspace setups for monorepos, and offers comprehensive CLI options for running tests, updating snapshots, and generating coverage reports. Detailed configuration options include test file globs, exclusion patterns, dependency management (deps), environment settings, and pool/thread management. Code examples include test file structure (e.g., sum.js and sum.test.js), configuration merging between Vite and Vitest (using mergeConfig), and custom environment definitions, which include precise parameter values and defaults.

## Normalised Extract
## Table of Contents

1. Overview & Installation
2. Writing Tests
3. Configuration Options
4. CLI Commands
5. Dependency Management
6. Environment & Runner Settings
7. Workspace Support
8. Troubleshooting & Best Practices

---

### 1. Overview & Installation

- Framework: Vitest (Vite-native testing framework)
- Requirements: Vite >= v5.0.0, Node >= v18.0.0
- Installation Commands:
  - npm: `npm install -D vitest`
  - yarn: `yarn add -D vitest`
  - pnpm: `pnpm add -D vitest`
  - bun: `bun add -D vitest`

### 2. Writing Tests

- Test file naming: Must include `.test.` or `.spec.` in the filename.
- Example:

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

- Package JSON integration:

  ```json
  {
    "scripts": {
      "test": "vitest"
    }
  }
  ```

### 3. Configuration Options

- Use `vitest.config.ts` or integrate within Vite config under the `test` property.

  **Example:**
  ```ts
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
      ]
    }
  });
  ```

- Merging Configs:
  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config';
  import viteConfig from './vite.config.mjs';

  export default mergeConfig(viteConfig, defineConfig({
    test: { exclude: ['packages/template/*'] }
  }));
  ```

### 4. CLI Commands

- Running tests: `vitest` or `npx vitest`
- Run once: `vitest run`
- Enable coverage: `vitest run --coverage`
- Update snapshots: `vitest --update`
- Help: `npx vitest --help`

### 5. Dependency Management

- Automatic Dependency Installation with prompt if missing.
- Disable check by setting `VITEST_SKIP_INSTALL_CHECKS=1`.

### 6. Environment & Runner Settings

- Default environment: `node`
- Specify alternative environments using docblock or config:

  ```js
  /** @vitest-environment jsdom */
  ```

- Custom environment example:
  ```ts
  import type { Environment } from 'vitest';

  const customEnv: Environment = {
    name: 'custom',
    transformMode: 'ssr',
    setup() {
      return { teardown() { } };
    }
  };

  export default customEnv;
  ```

### 7. Workspace Support

- Define multi-project configurations via a `vitest.workspace` file:

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
      }
    },
    {
      test: {
        name: 'node',
        root: './shared_tests',
        environment: 'node',
        setupFiles: ['./setup.node.ts'],
      }
    }
  ]);
  ```

### 8. Troubleshooting & Best Practices

- For Bun users, run tests with `bun run test`.
- Debug configuration using `server.debug` options in Vite config:

  ```ts
  server: {
    debug: { dumpModules: true, loadDumppedModules: true }
  }
  ```

- Use `--update` to update snapshots.
- Check CLI help for additional options: `npx vitest --help`.


## Supplementary Details
### Detailed Technical Specifications & Implementation Steps

1. Installation & Setup:
   - Ensure correct versions: Vite >= v5.0.0, Node >= v18.0.0
   - Install using your package manager. Verify installation using `npx vitest`.

2. Test Writing & Execution:
   - File naming: *.test.js or *.spec.js
   - Sample Code: Export functions in modules and import them in test files. Use Vitest's `expect`, `test` APIs.
   - Package.json script example: `{ "test": "vitest" }`

3. Configuration Parameters (in vitest.config.ts):
   - `globals`: boolean (default: false). Enable global test APIs.
   - `environment`: string (default: 'node'). Options: 'node', 'jsdom', 'happy-dom', etc.
   - `include`: string[] with default pattern `['**/*.{test,spec}.?(c|m)[jt]s?(x)']`
   - `exclude`: string[] with default patterns for node_modules, dist, etc.
   - `reporters`: can be 'default' or custom reporter instances.
   - Debug Options under `server.debug`: `dumpModules` (boolean|string), `loadDumppedModules` (boolean).

4. CLI and Command Options:
   - `vitest run --coverage`: Runs tests with coverage report generation.
   - `vitest --config <path>`: Specify a custom config file.
   - `vitest --update`: Update snapshot tests.

5. Dependency Management:
   - `VITEST_SKIP_INSTALL_CHECKS`: Environment variable to disable automatic dependency checks.
   - `deps.optimizer`: Options to bundle dependencies using esbuild, with options for `include`, `exclude`, `enabled` flags.

6. Environment Configuration:
   - Use docblock comments (`@vitest-environment`) for per-file environment selection.
   - Custom environments are defined by exporting an object with `name`, `transformMode`, `setup()` that returns teardown methods.

7. Workspaces:
   - Define workspace configurations in a file `vitest.workspace.ts` using `defineWorkspace` from 'vitest/config'.
   - Workspaces let you run tests with different configurations in a monorepo setting.

8. Troubleshooting:
   - Common Error Fixes: Ensure file naming conventions, update Node and Vite versions if errors occur.
   - Debug server options: Enable inline sourcemaps with `server.sourcemap: 'inline'`.
   - Use `npx vitest --help` for a comprehensive list of CLI options and refer to merged config examples if custom settings override defaults.


## Reference Details
## Complete API Specifications & Code Examples

### 1. API Methods and Configurations

#### Vitest Test API

- Method: `test(name: string, fn: () => void | Promise<void>): void`
  - Parameters:
    - `name`: The test case name.
    - `fn`: Function that contains the test assertions.
  - Return: void

- Method: `expect(actual: any): Matchers`
  - Returns an object with matcher functions such as `toBe(expected: any): void`.

#### Example Code:

```js
// sum.js
export function sum(a, b) {
  return a + b;
}
```

```js
// sum.test.js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

// Test: verifies that 1 + 2 equals 3
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 2. Configuration via vitest.config.ts

#### Basic Config:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,            // Enable global APIs
    environment: 'node',      // Test environment
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
    ],
    reporters: 'default',    // Default reporter
    // Additional options: update, watch, root, etc.
  }
});
```

#### Merging Vitest and Vite Config:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: false,
    exclude: ['packages/template/*'],
    // Extend with custom CLI options if needed
  }
}));
```

### 3. CLI Options and Commands

- Run tests in watch mode:
  ```bash
  vitest
  ```
- Run tests once without watching:
  ```bash
  vitest run
  ```
- Run with coverage:
  ```bash
  vitest run --coverage
  ```
- Update snapshots:
  ```bash
  vitest --update
  ```
- Specify custom config:
  ```bash
  vitest --config ./path/to/vitest.config.ts
  ```

### 4. Detailed Dependency and Server Configurations

#### Server Options Example:

```ts
// In vite.config.ts
export default defineConfig({
  server: {
    sourcemap: 'inline',
    debug: {
      dumpModules: true,           // Dump transformed modules
      loadDumppedModules: true
    },
    deps: {
      external: [/\/node_modules\//],
      inline: [],
      fallbackCJS: false,
      cacheDir: 'node_modules/.vite'
    }
  }
});
```

#### Dependency Optimizer Example:

```ts
export default defineConfig({
  test: {
    deps: {
      optimizer: {
        ssr: { enabled: false },
        web: { enabled: true, transformAssets: true, transformCss: true }
      }
    }
  }
});
```

### 5. Best Practices & Troubleshooting

- File Naming: Ensure test files include `.test.` or `.spec.`.
- For Bun users: Use `bun run test` instead of `bun test`.
- To debug, enable server debug options and use inline sourcemaps.
- If encountering dependency related issues, configure `deps.inline` or `deps.optimizer` as necessary.
- Use `npx vitest --help` to list all options and verify correct usage.

### 6. Custom Environment Setup Example

```ts
// custom-environment.ts
import type { Environment } from 'vitest';

const customEnv: Environment = {
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    // Custom setup code goes here
    return {
      teardown() {
        // Cleanup code after tests
      }
    };
  }
};

export default customEnv;
```

### 7. Troubleshooting Commands

- To view help: `npx vitest --help`
- To run tests with verbose output and debugging:
  ```bash
  vitest run --reporter verbose
  ```
- To update snapshots:
  ```bash
  vitest --update
  ```
- Check the configuration merging if tests do not run as expected; verify that the Vite config and Vitest config are correctly merged using `mergeConfig`.

This documentation provides the exact commands, configuration options, and code examples needed for using Vitest in your projects. It can be directly inserted into your development build process for both configuration and troubleshooting purposes.


## Original Source
Vitest Documentation
https://vitest.dev

## Digest of VITEST

# VITEST DOCUMENTATION

Retrieved on: 2023-10-14

## Overview & Installation

Vitest is a Vite-native, next generation testing framework. It supports ESM, TypeScript, and JSX out-of-the-box via esbuild. It is designed to share configuration and plugin ecosystems with a Vite app, although using Vitest does not mandate using Vite.

**Installation Commands:**

```bash
# Using npm
npm install -D vitest

# Using yarn
yarn add -D vitest

# Using pnpm
pnpm add -D vitest

# Using bun
bun add -D vitest
```

**Requirements:**
- Vite version: >= v5.0.0
- Node version: >= v18.0.0

## Writing Tests

A typical test file is named with a `.test.` or `.spec.` suffix. For example, consider the following code:

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

// Basic test verifying that 1 + 2 equals 3
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Additionally, update your `package.json` to include:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run tests with:
```
npm run test
# or
yarn test
# or
pnpm test
```

## Configuration Options

Vitest configuration can be provided via a separate `vitest.config.*` file or within your Vite configuration under a `test` property.

**Example using vitest.config.ts:**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Specify test options
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
    ],
    // Other options like reporters, coverage, and debugging
  }
});
```

**Merging Vite and Vitest Configurations:**

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // Custom Vitest options
    exclude: ['packages/template/*']
  }
}));
```

## Command Line Interface (CLI)

- Run tests normally with: `vitest`
- Run tests once (non-watch mode): `vitest run`
- Run with coverage: `vitest run --coverage`
- Additional CLI options include `--port`, `--https`, and use of `--config` to specify configuration file paths.

Example:
```
npx vitest --help
```

## Dependency Management & Automatic Installation

Vitest automatically prompts for installation of missing dependencies. To disable this check, set the environment variable:

```bash
export VITEST_SKIP_INSTALL_CHECKS=1
```

## Environment & Runner Configuration

Vitest supports different test environments. Common examples:

- **Node Environment (default):**
  ```ts
  test: {
    environment: 'node'
  }
  ```

- **jsdom Environment:** Use a docblock at the top of your file:

  ```js
  /**
   * @vitest-environment jsdom
   */
  test('DOM test example', () => {
    const div = document.createElement('div');
    expect(div).not.toBeNull();
  });
  ```

- **Custom Environments:**

Define a custom environment:

```ts
// environment.ts
import type { Environment } from 'vitest';

const customEnv: Environment = {
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    // custom setup code
    return {
      teardown() {
        // teardown steps
      }
    };
  }
};

export default customEnv;
```

## Workspaces Support

Vitest enables running tests across multiple project workspaces by specifying a `vitest.workspace` file. Example:

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
    }
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    }
  }
]);
```

## Troubleshooting & Best Practices

- Ensure that your test file names include `.test.` or `.spec.`.
- If using Bun, run tests with: `bun run test` to avoid conflicts with Bun's own test runner.
- When debugging transformed modules, consider using options in `server.debug`:

```ts
// Example in vite.config.ts
server: {
  debug: {
    dumpModules: true,
    loadDumppedModules: true
  }
}
```

- Use `--update` flag to update snapshot files: `vitest --update`.
- For dependency optimization, configure `deps.optimizer` as shown in the advanced configuration options.

## Attribution & Crawl Data

- Data Size: 30186504 bytes
- Links Found: 23894
- No errors reported during crawl.

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev
- License: MIT License
- Crawl Date: 2025-04-21T08:50:36.392Z
- Data Size: 30186504 bytes
- Links Found: 23894

## Retrieved
2025-04-21
