# VITEST_API

## Crawl Summary
Type Awaitable<T>=T|PromiseLike<T>; TestFunction=()=>Awaitable<void>; interface TestOptions { timeout?:number; retry?:number=0; repeats?:number=0 }. test(name:string|Function, fn:TestFunction, options?:TestOptions, timeout?:number):void. Aliases: it, test.skip, test.only, test.concurrent, test.runIf, test.skipIf, test.sequential, test.todo, test.fails, test.each, test.for. bench(name:string|Function, fn:BenchFunction, options?:BenchOptions):void; BenchOptions fields: time:number=500; iterations:number=10; now():number; signal:AbortSignal; throws:boolean; warmupTime:number=100; warmupIterations:number=5; setup:Hook; teardown:Hook; TaskResult fields: totalTime,min,max,hz,period,samples,mean,variance,sd,sem,df,critical,moe,rme,mad,p50,p75,p99,p995,p999. describe(name,fn,options?):void; aliases: describe.skip, only, concurrent, sequential, todo, each, for. Hooks: beforeEach,afterEach,beforeAll,afterAll(onTestFinished,onTestFailed).

## Normalised Extract
Table of Contents

1. Type Definitions
2. TestOptions Interface
3. Core Test Function
4. Test Modifiers and Aliases
5. Parameterized Tests
6. Benchmark API
7. Suite API
8. Lifecycle Hooks

1. Type Definitions
  Awaitable<T> = T or PromiseLike<T>
  TestFunction = () => Awaitable<void>

2. TestOptions Interface
  timeout?: number milliseconds before fail
  retry?: number  // retries on failure, default 0
  repeats?: number // repeat count, default 0

3. Core Test Function
  Signature: test(name:string|Function, fn:TestFunction, options?:TestOptions, timeout?:number):void
  name: test title or function reference
  fn: synchronous or async function returning void or promise
  options: object for skip, concurrent, timeout, retry, repeats
  timeout: numeric override if passed last

4. Test Modifiers and Aliases
  test.skip(name, fn, timeout?)
  test.only(name, fn, timeout?)
  test.concurrent(name, fn, timeout?)
  test.runIf(condition)(name, fn, timeout?)
  test.skipIf(condition)(name, fn, timeout?)
  test.sequential(name, fn)
  test.todo(name)
  test.fails(name, fn)
  Aliases: it, it.skip, it.only, it.concurrent, etc.

5. Parameterized Tests
  test.each(cases)(name template, fn)
  test.for(cases)(name template, fn) // array case not spread
  printf tokens: %s %d %i %f %j %o #%$ %%
  Template syntax: backtick table|column definitions

6. Benchmark API
  bench(name:string|Function, fn:BenchFunction, options?:BenchOptions):void
  Options:
    time:number=500
    iterations:number=10
    warmupTime:number=100
    warmupIterations:number=5
    now():number
    signal:AbortSignal
    throws:boolean
    setup:Hook
    teardown:Hook
  Return via on cycle logs and TaskResult structure

7. Suite API
  describe(name:string|Function, fn:TestFunction, options?:number|TestOptions):void
  Modifiers: describe.skip, only, concurrent, sequential, todo, each, for

8. Lifecycle Hooks
  beforeEach(fn, timeout?)
  afterEach(fn, timeout?)
  beforeAll(fn, timeout?)
  afterAll(fn, timeout?)
  onTestFinished(callback)
  onTestFailed(callback)


## Supplementary Details
Default Values and Global Configuration
- Default test timeout: 5000ms, override via TestOptions.timeout or global config testTimeout
- Default retry and repeats: 0
- CLI flags: --sequence.concurrent to enable parallel, --sequence.shuffle true to randomize order, --sequence.seed to fix shuffle seed
- Global config in vitest.config.js:
  export default {
    test: {
      testTimeout: 10000,
      sequence: { concurrent: true, shuffle: false, seed: 12345 }
    },
    chaiConfig: { truncateThreshold: 80 }
  }
Implementation Steps
1. Import desired APIs:
   import { test, describe, bench, beforeEach, afterEach, onTestFinished } from 'vitest'
2. Define fixtures via test.extend({ ... }) to add custom context
3. Write tests with modifiers: .only, .skip, .concurrent
4. For parameterized tests, choose test.each or test.for according to spread behavior
5. Add lifecycle hooks at file or suite scope
6. Run with npx vitest [options]


## Reference Details
Complete API Signatures and Examples

// Core Test
function test(
  name: string | Function,
  optionsOrFn: TestOptions | TestFunction,
  fnOrTimeout?: TestFunction | number,
  timeoutIfProvided?: number
): void

// Options object usage
test('heavy', { timeout: 20000, retry: 2, repeats: 3, skip: false, concurrent: true }, async () => {
  await expect(doWork()).resolves.toBeDefined()
})

// Chained modifiers
test.skip('will skip', () => {})
test.concurrent.skip('skip concurrent', () => {})

test.runIf(process.env.NODE_ENV==='test')('run only in test', () => {})

test.sequential('serial test', async () => {})

test.todo('to implement')

test.fails('expected failure', async ()=>{ await expect(f()).rejects.toThrow() })

// Parameterized tests
const cases = [[1,2,3],[2,3,5]]
test.each(cases)('sum(%i,%i)->%i', (a,b,exp)=>{ expect(a+b).toBe(exp) })
test.for(cases)('sum unspread', ([a,b,exp])=>{ expect(a+b).toBe(exp) })

test.each`
a|b|exp
${1}|${1}|${2}
${2}|${3}|${5}
`('sum $a+$b->$exp', ({a,b,exp})=>{expect(a+b).toBe(exp)})

// Benchmark
function bench(
  name: string | Function,
  fn: BenchFunction,
  options?: BenchOptions
): void

bench('sort', () => { arr.sort() }, { time:1000, iterations:20, warmupTime:200 })

// Suite
function describe(
  name: string | Function,
  fn: TestFunction,
  options?: number | TestOptions
): void

describe.only('focused suite', ()=>{ test('a', ()=>{}) })

// Hooks
beforeEach(async ()=>{ await resetDb() }, 10000)
afterEach(()=>cleanupTemp())
beforeAll(()=>startService())
afterAll(()=>stopService())

// Test-scoped hooks
test('db', ({ onTestFinished, onTestFailed })=>{
  const conn=connect()
  onTestFinished(()=>conn.close())
  onTestFailed(({ task })=>console.error(task.result.errors))
})

Best Practices
- Use async/await tests instead of done callback
- Isolate fixtures with test.extend and teardown via onTestFinished
- Use test.concurrent for I/O-bound independent tests
- Parameterize edge cases via test.each with template tables for clarity

Troubleshooting
1. To rerun only failures:
   npx vitest --run --onlyFailures
2. To increase snapshot threshold:
   export default { chaiConfig:{ truncateThreshold:150 } }
3. For debugging timeouts:
   npx vitest --timeout=20000 --runs=false
4. Clear cache if test context wrong:
   npx vitest --clearCache


## Information Dense Extract
Awaitable<T>=T|PromiseLike<T>; TestFunction=()=>Awaitable<void>; TestOptions{timeout?:number;retry?:number=0;repeats?:number=0}. test(name,fn,options?,timeout?):void. Modifiers: skip,only,concurrent,runIf,skipIf,sequential,todo,fails. test.each|for for parameterized. bench(name,fn,options?):void; BenchOptions{time=500ms,iterations=10,warmupTime=100ms,warmupIterations=5,now(),signal,throws,setup,teardown}. TaskResult fields: totalTime,min,max,hz,period,samples[],mean,variance,sd,sem,df,critical,moe,rme,mad,p50,p75,p99,p995,p999. describe(name,fn,options?):void; same modifiers. Hooks: beforeEach,afterEach,beforeAll,afterAll(onTestFinished,onTestFailed). Global config via vitest.config.js. CLI flags: --sequence.concurrent,--sequence.shuffle,--runs,--clearCache. Focus: async tests, fixtures via test.extend, onTestFinished teardown.

## Sanitised Extract
Table of Contents

1. Type Definitions
2. TestOptions Interface
3. Core Test Function
4. Test Modifiers and Aliases
5. Parameterized Tests
6. Benchmark API
7. Suite API
8. Lifecycle Hooks

1. Type Definitions
  Awaitable<T> = T or PromiseLike<T>
  TestFunction = () => Awaitable<void>

2. TestOptions Interface
  timeout?: number milliseconds before fail
  retry?: number  // retries on failure, default 0
  repeats?: number // repeat count, default 0

3. Core Test Function
  Signature: test(name:string|Function, fn:TestFunction, options?:TestOptions, timeout?:number):void
  name: test title or function reference
  fn: synchronous or async function returning void or promise
  options: object for skip, concurrent, timeout, retry, repeats
  timeout: numeric override if passed last

4. Test Modifiers and Aliases
  test.skip(name, fn, timeout?)
  test.only(name, fn, timeout?)
  test.concurrent(name, fn, timeout?)
  test.runIf(condition)(name, fn, timeout?)
  test.skipIf(condition)(name, fn, timeout?)
  test.sequential(name, fn)
  test.todo(name)
  test.fails(name, fn)
  Aliases: it, it.skip, it.only, it.concurrent, etc.

5. Parameterized Tests
  test.each(cases)(name template, fn)
  test.for(cases)(name template, fn) // array case not spread
  printf tokens: %s %d %i %f %j %o #%$ %%
  Template syntax: backtick table|column definitions

6. Benchmark API
  bench(name:string|Function, fn:BenchFunction, options?:BenchOptions):void
  Options:
    time:number=500
    iterations:number=10
    warmupTime:number=100
    warmupIterations:number=5
    now():number
    signal:AbortSignal
    throws:boolean
    setup:Hook
    teardown:Hook
  Return via on cycle logs and TaskResult structure

7. Suite API
  describe(name:string|Function, fn:TestFunction, options?:number|TestOptions):void
  Modifiers: describe.skip, only, concurrent, sequential, todo, each, for

8. Lifecycle Hooks
  beforeEach(fn, timeout?)
  afterEach(fn, timeout?)
  beforeAll(fn, timeout?)
  afterAll(fn, timeout?)
  onTestFinished(callback)
  onTestFailed(callback)

## Original Source
Vitest Testing Framework
https://vitest.dev/api/

## Digest of VITEST_API

# Vitest API Reference

Retrieved: 2024-06-12  
Data Size: 35151778 bytes

## Types

```ts
// Promise or synchronous return
type Awaitable<T> = T | PromiseLike<T>

// Test function signature
type TestFunction = () => Awaitable<void>
```

## Interface TestOptions

```ts
interface TestOptions {
  /** milliseconds before timing out */
  timeout?: number
  /** retry count, default 0 */
  retry?: number
  /** repeat cycles, default 0 */
  repeats?: number
}
```

## Test API

### test(name, fn, options?, timeout?)
```ts
function test(
  name: string | Function,
  optionsOrFn: TestOptions | TestFunction,
  fnOrTimeout?: TestFunction | number,
  timeoutIfProvided?: number
): void
```
- name: string or Function
- fn: TestFunction
- options: TestOptions
- timeout: number milliseconds

### Aliases
- it, test.skip, it.skip
- test.only, it.only
- test.concurrent, it.concurrent
- test.runIf, test.skipIf
- test.sequential, it.sequential
- test.todo, it.todo
- test.fails, it.fails
- test.each, it.each
- test.for, it.for

## Bench API

### bench(name, fn, options?)
```ts
function bench(
  name: string | Function,
  fn: BenchFunction,
  options?: BenchOptions
): void
```

#### BenchOptions
```ts
interface BenchOptions {
  time?: number       // ms, default 500
  iterations?: number // default 10
  now?: () => number
  signal?: AbortSignal
  throws?: boolean
  warmupTime?: number      // ms, default 100
  warmupIterations?: number// default 5
  setup?: Hook
  teardown?: Hook
}
```

#### TaskResult
```ts
interface TaskResult {
  error?: unknown
  totalTime: number
  min: number
  max: number
  hz: number
  period: number
  samples: number[]
  mean: number
  variance: number
  sd: number
  sem: number
  df: number
  critical: number
  moe: number
  rme: number
  mad: number
  p50: number
  p75: number
  p99: number
  p995: number
  p999: number
}
```

## Suite API

### describe(name, fn, options?)
```ts
function describe(
  name: string | Function,
  fn: TestFunction,
  options?: number | TestOptions
): void
```

Aliases: describe.skip, describe.only, describe.concurrent, describe.sequential, describe.todo, describe.each, describe.for

## Hooks

```ts
beforeEach(fn: () => Awaitable<void>, timeout?: number): void
afterEach(fn: () => Awaitable<void>, timeout?: number): void
beforeAll(fn: () => Awaitable<void>, timeout?: number): void
afterAll(fn: () => Awaitable<void>, timeout?: number): void
```

### Test-scoped hooks
```ts
onTestFinished(callback: () => void): void
onTestFailed(callback: (context: ExtendedContext) => void): void
```

## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/api/
- License: MIT License
- Crawl Date: 2025-05-10T21:30:03.683Z
- Data Size: 35151778 bytes
- Links Found: 25273

## Retrieved
2025-05-10
