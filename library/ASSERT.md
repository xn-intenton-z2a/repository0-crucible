# ASSERT

## Crawl Summary
Assertion module: require('node:assert') or import 'node:assert/strict'. Strict mode methods enforce Object.is and compare prototypes, symbols, errors, lastIndex. Legacy mode uses == and ignores symbols. AssertionError(options) sets actual, expected, operator, message. CallTracker allows tracking function calls: calls(fn,exact)->wrapper, getCalls, report, reset, verify. Key methods: assert(), equal(), deepEqual(), deepStrictEqual(), throws(), rejects(), match(), doesNotMatch(), ifError(), fail().

## Normalised Extract
Table of Contents
1. Import Patterns
2. Assertion Modes
3. AssertionError Class
4. CallTracker Class
5. Synchronous Assertion Functions
6. Asynchronous Assertion Functions
7. Pattern Matching Assertions
8. Error Handling Utilities

1. Import Patterns
  ESM: import { strict as assert } from 'node:assert';
  CJS: const assert = require('node:assert').strict;

2. Assertion Modes
  Strict: all comparisons use Object.is, prototypes compared, symbol/RegExp lastIndex compared.
  Legacy: comparisons use == for primitives and deepEqual.
  Disable colors: set NO_COLOR or NODE_DISABLE_COLORS.

3. AssertionError Class
  new AssertionError({actual, expected, operator, message, stackStartFn});
  properties: actual, expected, operator, message, name='AssertionError', code='ERR_ASSERTION', generatedMessage.

4. CallTracker Class
  new CallTracker();
  calls(fn=function(){}, exact=1): wrapper -> increments count.
  getCalls(wrapper): returns [{thisArg, arguments[]}].
  report(): returns mismatches [{message, actual, expected, operator, stack}].
  reset(fn?): resets call counts.
  verify(): throws if any wrapper not called exact times.

5. Synchronous Assertion Functions
  assert(value[, message]): throws if !value.
  assert.equal(actual, expected[, message]): uses ==.
  assert.notEqual(actual, expected[, message]).
  assert.deepEqual(actual, expected[, message]): legacy deep eq.
  assert.notDeepEqual(actual, expected[, message]).
  assert.strictEqual(actual, expected[, message]): uses ===.
  assert.notStrictEqual(actual, expected[, message]).
  assert.deepStrictEqual(actual, expected[, message]): strict deep eq.
  assert.notDeepStrictEqual(actual, expected[, message]).
  assert.partialDeepStrictEqual(actual, expected[, message]): partial strict eq.
  assert.ifError(value): throws if value truthy.
  assert.fail([message])

6. Asynchronous Assertion Functions
  assert.throws(fn[, error][, message]): expects fn to throw.
  assert.doesNotThrow(fn[, error][, message]): expects no throw.
  assert.rejects(asyncFn[, error][, message]): expects promise reject.
  assert.doesNotReject(asyncFn[, error][, message]): expects promise resolve.

7. Pattern Matching Assertions
  assert.match(string, regexp[, message]).
  assert.doesNotMatch(string, regexp[, message]).

8. Error Handling Utilities
  Error cause and errors properties compared in deepEqual v22+.
  RegExp lastIndex compared in deepStrictEqual v18+.


## Supplementary Details
Module import: node:assert, node:assert/strict. CLI flags: --no-color disables diffs colors. Colors disabled via NO_COLOR or NODE_DISABLE_COLORS. For async rejects, promises must be returned or awaited. Use process.on('exit',()=>tracker.verify()) pattern for CallTracker. Deep comparisons handle circular refs, NaN, symbol keys, unwrapped objects.

Strict deep equality rules:
  Object.is for primitives, same [[Prototype]], own enumerable props, unwrapped values, unordered Map/Set, compare symbol props. WeakMap/WeakSet require same instance.
Legacy deep equality rules:
  == for primitives, ignore [[Prototype]] differences, unordered props, Map/Set, stop recursion on circular.


## Reference Details
// Import patterns
import assert from 'node:assert/strict';
const assertStrict = require('node:assert').strict;

// AssertionError
const err = new assert.AssertionError({actual:1,expected:2,operator:'strictEqual',message:'msg',stackStartFn:myFn});
// err.code === 'ERR_ASSERTION'

// CallTracker usage
import process from 'node:process';
const tracker = new assert.CallTracker();
function foo(){}
const callsFoo = tracker.calls(foo,2);
callsFoo(arg1);
// At program end:
process.on('exit',()=>tracker.verify());

// Synchronous assertions
assert(value,'message');
assert.equal(1,'1'); // legacy
assert.strictEqual(1,'1','must be identical');
assert.deepStrictEqual({a:1},{a:1});
assert.ifError(err);
assert.fail('explicit failure');

// Asynchronous assertions
await assert.rejects(Promise.reject(new Error('fail')),Error,'should reject');
await assert.doesNotReject(asyncFunc,'should resolve');
assert.throws(()=>{throw new TypeError()},TypeError,'expected type');

// Pattern matching
assert.match('abc',/^a/,'must start with a');
assert.doesNotMatch('abc',/z/,'must not contain z');

// Troubleshooting
$ node --no-warnings test.js  // suppress warnings
$ export NO_COLOR=1         // disable diff colors in assertion errors


## Information Dense Extract
import node:assert or node:assert/strict; NO_COLOR or NODE_DISABLE_COLORS disables colors. AssertionError(options){actual,expected,operator,message,stackStartFn}->name,code='ERR_ASSERTION',generatedMessage. CallTracker():calls(fn?,exact?=1)->wrapper,count++;getCalls(wrapper)->[{thisArg,arguments[]}];report()->[{message,actual,expected,operator,stack}];reset(fn?);verify()->throws if any mismatch. Strict mode=>Object.is, prototypes===, symbol keys, Map/Set unordered, RegExp lastIndex; Legacy=>== for primitives, ignore prototypes. Methods: assert(value[,msg]);equal==;notEqual;deepEqual(legacy);notDeepEqual;strictEqual===;notStrictEqual;deepStrictEqual;notDeepStrictEqual;partialDeepStrictEqual;ifError;fail;throws(fn[,err?][,msg]);doesNotThrow(fn[,err?][,msg]);rejects(asyncFn[,err?][,msg]);doesNotReject(asyncFn[,err?][,msg]);match(string,regexp);doesNotMatch(string,regexp).

## Sanitised Extract
Table of Contents
1. Import Patterns
2. Assertion Modes
3. AssertionError Class
4. CallTracker Class
5. Synchronous Assertion Functions
6. Asynchronous Assertion Functions
7. Pattern Matching Assertions
8. Error Handling Utilities

1. Import Patterns
  ESM: import { strict as assert } from 'node:assert';
  CJS: const assert = require('node:assert').strict;

2. Assertion Modes
  Strict: all comparisons use Object.is, prototypes compared, symbol/RegExp lastIndex compared.
  Legacy: comparisons use == for primitives and deepEqual.
  Disable colors: set NO_COLOR or NODE_DISABLE_COLORS.

3. AssertionError Class
  new AssertionError({actual, expected, operator, message, stackStartFn});
  properties: actual, expected, operator, message, name='AssertionError', code='ERR_ASSERTION', generatedMessage.

4. CallTracker Class
  new CallTracker();
  calls(fn=function(){}, exact=1): wrapper -> increments count.
  getCalls(wrapper): returns [{thisArg, arguments[]}].
  report(): returns mismatches [{message, actual, expected, operator, stack}].
  reset(fn?): resets call counts.
  verify(): throws if any wrapper not called exact times.

5. Synchronous Assertion Functions
  assert(value[, message]): throws if !value.
  assert.equal(actual, expected[, message]): uses ==.
  assert.notEqual(actual, expected[, message]).
  assert.deepEqual(actual, expected[, message]): legacy deep eq.
  assert.notDeepEqual(actual, expected[, message]).
  assert.strictEqual(actual, expected[, message]): uses ===.
  assert.notStrictEqual(actual, expected[, message]).
  assert.deepStrictEqual(actual, expected[, message]): strict deep eq.
  assert.notDeepStrictEqual(actual, expected[, message]).
  assert.partialDeepStrictEqual(actual, expected[, message]): partial strict eq.
  assert.ifError(value): throws if value truthy.
  assert.fail([message])

6. Asynchronous Assertion Functions
  assert.throws(fn[, error][, message]): expects fn to throw.
  assert.doesNotThrow(fn[, error][, message]): expects no throw.
  assert.rejects(asyncFn[, error][, message]): expects promise reject.
  assert.doesNotReject(asyncFn[, error][, message]): expects promise resolve.

7. Pattern Matching Assertions
  assert.match(string, regexp[, message]).
  assert.doesNotMatch(string, regexp[, message]).

8. Error Handling Utilities
  Error cause and errors properties compared in deepEqual v22+.
  RegExp lastIndex compared in deepStrictEqual v18+.

## Original Source
Node.js Platform & Performance
https://nodejs.org/api/

## Digest of ASSERT

# Overview
The node:assert module provides assertion functions for verifying invariants. Stability: 2 (Stable). Source code: lib/assert.js.

# Strict Assertion Mode
Use strict mode to enable strict comparisons and diffs.

ESM:
import { strict as assert } from 'node:assert';
CJS:
const assert = require('node:assert').strict;

# Legacy Assertion Mode
Defaults to non-strict behavior using == and == for deepEqual and equal.

ESM:
import assert from 'node:assert';
CJS:
const assert = require('node:assert');

# Classes

## Class: assert.AssertionError
Signature: new AssertionError(options)
Options:
  actual <any>
  expected <any>
  operator <string>
  message <string>
  stackStartFn <Function>
Properties on instance:
  message:string name:string code:"ERR_ASSERTION"
  actual:any expected:any operator:string generatedMessage:boolean

## Class: assert.CallTracker (Deprecated)
Signature: new CallTracker()
Methods:
  calls(fn?:Function, exact?:number): Function
  getCalls(fn:Function): Array<{ thisArg:any, arguments:any[] }>
  report(): Array<{ message:string, actual:number, expected:number, operator:string, stack:any }>
  reset(fn?:Function): void
  verify(): void

# Functions

assert(value[, message])
assert.ok(value[, message])
assert.equal(actual, expected[, message])
assert.notEqual(actual, expected[, message])
assert.deepEqual(actual, expected[, message])
assert.notDeepEqual(actual, expected[, message])
assert.deepStrictEqual(actual, expected[, message])
assert.notDeepStrictEqual(actual, expected[, message])
assert.strictEqual(actual, expected[, message])
assert.notStrictEqual(actual, expected[, message])
assert.throws(fn[, error][, message])
assert.rejects(asyncFn[, error][, message])
assert.doesNotThrow(fn[, error][, message])
assert.doesNotReject(asyncFn[, error][, message])
assert.match(string, regexp[, message])
assert.doesNotMatch(string, regexp[, message])
assert.fail([message])
assert.ifError(value)
assert.partialDeepStrictEqual(actual, expected[, message])

## Attribution
- Source: Node.js Platform & Performance
- URL: https://nodejs.org/api/
- License: License: MIT-like
- Crawl Date: 2025-05-10T00:37:39.785Z
- Data Size: 3330921 bytes
- Links Found: 1076

## Retrieved
2025-05-10
