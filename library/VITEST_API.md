# VITEST_API

## Crawl Summary
Extracted core API: TestFunction, TestOptions, all test methods (test, skip, only, concurrent, sequential, todo, fails, each, for), bench definitions, describe/suite functions, lifecycle hooks, TestContext hooks. Included precise method signatures, parameters, and defaults.

## Normalised Extract
Table of Contents:
1. Type Aliases
2. Test API
3. Benchmark API
4. Suite API
5. Lifecycle Hooks
6. TestContext Hooks

1. Type Aliases
Awaitable<T> = T | PromiseLike<T>
TestFunction = () => Awaitable<void>

2. Test API
test(name: string, fn: TestFunction, timeout?: number)
test(name: string, options: TestOptions, fn: TestFunction)
skip/skipIf/runIf/only variants as function overloads
concurrent, sequential, todo, fails
Parameterized: each(cases, namePattern, fn), for(cases, namePattern, fn)

3. Benchmark API
bench(name: string, fn: () => void, options?: BenchOptions)
bench.skip/only/todo
BenchOptions: time (ms), iterations, warmupTime, warmupIterations, now, signal, throws, setup, teardown

4. Suite API
describe(name: string, fn: () => void)
describe.skip/skipIf/runIf/only
concurrent, sequential, shuffle, todo, each, for

5. Lifecycle Hooks
beforeEach(fn, timeout)
afterEach(fn, timeout)
beforeAll(fn, timeout)
afterAll(fn, timeout)

6. TestContext Hooks
onTestFinished(callback)
onTestFailed(callback)

## Supplementary Details
TestOptions defaults: retry=0, repeats=0, timeout default=5000ms (global override via testTimeout config). BenchOptions defaults: time=500ms, iterations=10, warmupTime=100ms, warmupIterations=5. Concurrency: test.concurrent runs distinct promise-based tests in parallel, snapshots via context.expect. describe.concurrent runs nested suites/tests in parallel. Sequence: test.sequential within concurrent to enforce order. describe.shuffle uses sequence.shuffle or CLI --sequence.shuffle with seed. Hooks: beforeEach/afterEach optional teardown via returned function. onTestFinished hooks reverse order, skip on dynamic skip; onTestFailed only on failure.

## Reference Details
// Test Definitions
import { test, expect } from 'vitest'
// Basic
test('sum', () => { expect(1+1).toBe(2) })
// Timeout override
test('heavy', { timeout: 10000 }, async () => { await doHeavy() })
// Retry and repeats
test('flaky', { retry: 2, repeats: 3 }, async () => { await unstableOp() })
// Skipped
test.skip('skip', () => {})
test.skipIf(process.env.NODE_ENV!=='prod')('prod-only', () => {})
// Only
test.only('focus', () => {})
// Concurrent
test.concurrent('parallel1', async ({ expect }) => { expect(await api()).toBe(1) })
// Sequential in concurrent
test.sequential('seq1', async () => {})
// Fails
test.fails('should fail', async () => { await expect(Promise.reject('err')).rejects.toBe('err') })
// TODO
test.todo('implement me')
// Parameterized
test.each([ [1,2,3], [2,3,5] ])('add %i+%i', (a,b,expected) => { expect(a+b).toBe(expected) })
// Benchmarks
import { bench } from 'vitest'
bench('sort 1000', { time:1000, iterations:20 }, () => { array.sort() })
bench.skip('skipped bench', () => {})
bench.only('only bench', () => {})
bench.todo('bench me')
// Suites
import { describe } from 'vitest'
describe('math', () => { test('sum', () => {}) })
describe.skip('skip suite', () => { })
// Hooks
beforeAll(async () => { await initDb() })
afterAll(async () => { await closeDb() })
beforeEach(async () => { await resetData() })
afterEach(async () => { await clearMocks() })
// TestContext Hooks
test('db', ({ onTestFinished, onTestFailed }) => { const c=db.connect(); onTestFinished(() => c.close()); onTestFailed(() => log(c.errors)); c.query() })


## Information Dense Extract
Awaitable<T>=T|PromiseLike<T>;TestFunction=()=>Awaitable<void>;TestOptions={timeout?:number,retry?:number=0,repeats?:number=0};test(name:string,fn:TestFunction,timeout?:number)|test(name:string,options:TestOptions,fn:TestFunction);test.skip/runIf/skipIf/only/concurrent/sequential/todo/fails overloads;test.each<T>(cases:T[],pattern:string,fn:(...args:T)=>void);test.for<T>(cases:T[],pattern:string,fn:(args:T)=>void);BenchOptions={time?:number=500,iterations?:number=10,warmupTime?:100,warmupIterations?:5,now?:()=>number,signal?:AbortSignal,throws?:boolean,setup?:Hook,teardown?:Hook};bench(name:string,fn:()=>void,options?:BenchOptions);bench.skip/only/todo;describe(name:string,fn:()=>void);describe.skip/skipIf/runIf/only/concurrent/sequential/shuffle/todo/each/for;beforeEach(fn,timeout?:number);afterEach(fn,timeout?:number);beforeAll(fn,timeout?:number);afterAll(fn,timeout?:number);onTestFinished(cb);onTestFailed(cb)

## Sanitised Extract
Table of Contents:
1. Type Aliases
2. Test API
3. Benchmark API
4. Suite API
5. Lifecycle Hooks
6. TestContext Hooks

1. Type Aliases
Awaitable<T> = T | PromiseLike<T>
TestFunction = () => Awaitable<void>

2. Test API
test(name: string, fn: TestFunction, timeout?: number)
test(name: string, options: TestOptions, fn: TestFunction)
skip/skipIf/runIf/only variants as function overloads
concurrent, sequential, todo, fails
Parameterized: each(cases, namePattern, fn), for(cases, namePattern, fn)

3. Benchmark API
bench(name: string, fn: () => void, options?: BenchOptions)
bench.skip/only/todo
BenchOptions: time (ms), iterations, warmupTime, warmupIterations, now, signal, throws, setup, teardown

4. Suite API
describe(name: string, fn: () => void)
describe.skip/skipIf/runIf/only
concurrent, sequential, shuffle, todo, each, for

5. Lifecycle Hooks
beforeEach(fn, timeout)
afterEach(fn, timeout)
beforeAll(fn, timeout)
afterAll(fn, timeout)

6. TestContext Hooks
onTestFinished(callback)
onTestFailed(callback)

## Original Source
Vitest Testing Framework
https://vitest.dev/api/

## Digest of VITEST_API

# Vitest API Reference
Date Retrieved: 2023-11-27

## Type Aliases

```ts
// Return value for async operations
type Awaitable<T> = T | PromiseLike<T>

// Test function signature
//   - no args, returns Awaitable<void>
//   - for done callback style use async function instead
// Example:
//   function testName(done: DoneCallback): void
//   async function testName(): Promise<void>
type TestFunction = () => Awaitable<void>
```

## Test Options Interface

```ts
interface TestOptions {
  timeout?: number            // fail if test exceeds this ms
  retry?: number              // number of retry attempts, default 0
  repeats?: number            // repeat execution cycles, default 0
}
```

## Core Test Functions

```ts
// Primary test definition. Alias: it
function test(name: string, fn: TestFunction, timeout?: number): void;
function test(name: string, options: TestOptions, fn: TestFunction): void;

// Skip tests
test.skip(name: string, fn: TestFunction): void;
test.skip(name: string, options: TestOptions, fn: TestFunction): void;
// Conditional skip
test.skipIf(condition: boolean): (name: string, fn: TestFunction) => void;
test.skipIf(condition: boolean)(name: string, options: TestOptions, fn: TestFunction);
// Run if condition
test.runIf(condition: boolean): (name: string, fn: TestFunction) => void;

// Only run marked tests
test.only(name: string, fn: TestFunction, timeout?: number): void;

// Parallel execution
test.concurrent(name: string, fn: TestFunction, timeout?: number): void;

// Sequential in concurrent suite
test.sequential(name: string, fn: TestFunction, timeout?: number): void;

// Stub placeholder tests
test.todo(name: string): void;

// Expect failure
test.fails(name: string, fn: TestFunction): void;

// Parameterized tests
test.each<T extends any[]>(cases: T[], name: string, fn: (...args: T) => void): void;
test.each<T>(cases: T[], namePattern: string, fn: (item: T) => void): void;

// Table tests via template literal
test.each<T>(table: TemplateStringArray, ...values: T[]): void;

// Alternative for TestContext
test.for<T extends any[]>(cases: T[], name: string, fn: (args: T) => void): void;
```

## Benchmarks

```ts
// Define benchmarks
function bench(name: string, fn: () => void, options?: BenchOptions): void;

interface BenchOptions {
  time?: number            // ms, default 500
  iterations?: number      // default 10
  warmupTime?: number      // ms, default 100
  warmupIterations?: number// default 5
  now?: () => number
  signal?: AbortSignal
  throws?: boolean
  setup?: HookFunction
  teardown?: HookFunction
}

// Skip, only, todo variants
bench.skip(name: string, fn: () => void): void;
bench.only(name: string, fn: () => void): void;
bench.todo(name: string): void;
```

## Suites

```ts
// Define suite
function describe(name: string, fn: () => void): void;

// Skip, only, todo
describe.skip(name: string, fn: () => void): void;
describe.skipIf(cond: boolean)(name: string, fn: () => void): void;
describe.runIf(cond: boolean)(name: string, fn: () => void): void;
describe.only(name: string, fn: () => void, options?: number|TestOptions): void;

describe.concurrent(name: string, fn: () => void): void;
describe.sequential(name: string, fn: () => void): void;
describe.shuffle(name: string, fn: () => void): void;
describe.todo(name: string): void;
describe.each(cases, namePattern, fn): void;
describe.for(cases, name, fn): void;
```

## Hooks

```ts
// beforeEach, afterEach, beforeAll, afterAll
function beforeEach(fn: () => Awaitable<void>, timeout?: number): void;
function afterEach(fn: () => Awaitable<void>, timeout?: number): void;
function beforeAll(fn: () => Awaitable<void>, timeout?: number): void;
function afterAll(fn: () => Awaitable<void>, timeout?: number): void;

// Test-scoped hooks (must be used inside test body)
function onTestFinished(callback: () => void): void;
function onTestFailed(callback: (ctx: ExtendedContext) => void): void;
```


## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/api/
- License: License if known
- Crawl Date: 2025-04-28T22:48:47.991Z
- Data Size: 37459126 bytes
- Links Found: 25877

## Retrieved
2025-04-28
