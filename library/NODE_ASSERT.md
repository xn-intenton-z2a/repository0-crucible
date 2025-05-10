# NODE_ASSERT

## Crawl Summary
node:assert provides assertion functions and error classes for testing. Key modes: strict (node:assert/strict) and legacy (node:assert). Strict mode: deepStrictEqual uses Object.is, compares prototypes and symbols. Legacy: deepEqual uses ==, ignores prototypes. Classes: AssertionError (actual, expected, operator, code ERR_ASSERTION), CallTracker (deprecated tracking of exact function calls). Main APIs: assert.ok/assert, equal/notEqual, deepEqual/notDeepEqual, strictEqual/notStrictEqual, deepStrictEqual/notDeepStrictEqual, throws/doesNotThrow, rejects/doesNotReject, match/doesNotMatch, ifError, fail, partialDeepStrictEqual.

## Normalised Extract
Table of Contents:
1. Strict assertion mode (node:assert/strict)
2. Legacy assertion mode (node:assert)
3. AssertionError class
4. CallTracker class (deprecated)
5. Assertion functions: ok, equal, deepEqual, strictEqual, deepStrictEqual, throws, rejects, match, ifError, fail, partialDeepStrictEqual

1. Strict assertion mode
Module import: import { strict as assert } from 'node:assert'
Behavior: Non-strict methods forward to strict implementations. Error diffs shown for object mismatches.
Disable colors: NO_COLOR or NODE_DISABLE_COLORS

2. Legacy assertion mode
Module import: import assert from 'node:assert'
Behavior: equal and deepEqual use == and recursion stops on circular refs. Prototypes ignored.

3. class AssertionError
Signature: new assert.AssertionError(options)
Options: actual:any, expected:any, operator:string, message?:string, stackStartFn?:Function
Properties: actual, expected, operator, generatedMessage:boolean, name='AssertionError', code='ERR_ASSERTION'
Throws: on failed assertions

4. class CallTracker
Signature: new assert.CallTracker()
Methods:
  calls(fn?:Function, exact?:number=1):Function wrapper that must be called exact times
  getCalls(wrapper):Array<{ thisArg:any, arguments:Array<any> }>
  report():Array<{ message:string, actual:number, expected:number, operator:string, stack:object }>
  reset(fn?:Function):void resets call count
  verify():void throws if wrappers not called as expected

5. Assertion functions
assert.ok(value, message?)
assert.equal(a, b, msg?) uses ==
assert.notEqual(a, b, msg?)
assert.deepEqual(a, b, msg?) legacy deep equality
assert.notDeepEqual(a, b, msg?)
assert.strictEqual(a, b, msg?) uses ===
assert.notStrictEqual(a, b, msg?)
assert.deepStrictEqual(a, b, msg?) strict deep equality (Object.is, prototype, symbol, Set/Map, RegExp lastIndex)
assert.notDeepStrictEqual(a, b, msg?)
assert.throws(fn, error?, msg?) expects thrown error matching pattern/class
assert.doesNotThrow(fn, error?, msg?)
assert.rejects(fn|Promise, error?, msg?):Promise<void>
assert.doesNotReject(fn|Promise, error?, msg?):Promise<void>
assert.match(str, regexp, msg?)
assert.doesNotMatch(str, regexp, msg?)
assert.ifError(value)
assert.fail([msg]|actual, expected?, operator?, stackStartFn?)
assert.partialDeepStrictEqual(a,b,msg?)

## Supplementary Details
Module import paths: node:assert (legacy), node:assert/strict (strict mode). Environment flags: NO_COLOR, NODE_DISABLE_COLORS. Version history: Strict mode exposed v13.9.0; CallTracker deprecated v20.1.0. Circular references: strict stops on circular first encounter; legacy stops when either side circular. deepStrictEqual comparison rules: Object.is for primitives, prototypes via ===, symbol keys, non-enumerable Error properties, unordered Map/Set keys, WeakMap/WeakSet compared by instance reference only.


## Reference Details
/// Class AssertionError
constructor AssertionError(options: { actual:any; expected:any; operator:string; message?:string; stackStartFn?:Function; })
Properties: actual:any, expected:any, operator:string, generatedMessage:boolean, name:'AssertionError', code:'ERR_ASSERTION'

/// Class CallTracker (deprecated)
constructor CallTracker(): void
calls(fn?:Function, exact?:number=1):Function wrapper
getCalls(wrapper:Function):Array<{ thisArg:any; arguments:Array<any> }>
report():Array<{ message:string; actual:number; expected:number; operator:string; stack:object }>
reset(fn?:Function):void
verify():void throws AssertionError

/// Assertion functions
function ok(value:any, message?:string|Error):void throws AssertionError if !value
function equal(actual:any, expected:any, message?:string|Error):void throws AssertionError if actual != expected
function notEqual(actual:any, expected:any, message?:string|Error):void throws AssertionError if actual == expected
function deepEqual(actual:any, expected:any, message?:string|Error):void legacy deep equals using ==
function notDeepEqual(actual:any, expected:any, message?:string|Error):void
function strictEqual(actual:any, expected:any, message?:string|Error):void throws if actual !== expected
function notStrictEqual(actual:any, expected:any, message?:string|Error):void
function deepStrictEqual(actual:any, expected:any, message?:string|Error):void throws if not deep equal per strict rules
function notDeepStrictEqual(actual:any, expected:any, message?:string|Error):void
function throws(fn:Function, error?:RegExp|Function|Object, message?:string|Error):void
function doesNotThrow(fn:Function, error?:RegExp|Function|Object, message?:string|Error):void
function rejects(asyncFn:Function|Promise<any>, error?:RegExp|Function|Object, message?:string):Promise<void>
function doesNotReject(asyncFn:Function|Promise<any>, error?:RegExp|Function|Object, message?:string):Promise<void>
function match(string:string, regexp:RegExp, message?:string|Error):void
function doesNotMatch(string:string, regexp:RegExp, message?:string|Error):void
function ifError(value:any):void throws if value truthy
function fail(message?:string|Error):void always throws
function partialDeepStrictEqual(actual:any, expected:any, message?:string|Error):void compares subset

/// Usage examples
import { strict as assert } from 'node:assert';
assert.deepStrictEqual({ a:1 },{ a:1 });

import assert from 'node:assert';
try{assert.strictEqual(1,2);}catch(e){console.log(e.code,'expected ERR_ASSERTION');}

/// Troubleshooting
Problem: no diff displayed
Solution: use strict mode import or set NO_COLOR off

Problem: CallTracker verification failure
Command: node test.js
Output: AssertionError: Expected the func function to be executed 2 time(s) but was executed 1 time(s).

## Information Dense Extract
assert module: node:assert (legacy), node:assert/strict (strict). Modes: strict exposes deepStrictEqual(Object.is,=== prototype,symbol,unordered Set/Map; legacy uses ==, ignores prototype). Class AssertionError(options{actual,expected,operator,message?,stackStartFn?}), code ERR_ASSERTION. Class CallTracker():calls(fn?,exact=1), getCalls(wrapper), report(), reset(fn?), verify(). Functions: ok(v,msg?), equal(a,b,msg?)(==), notEqual, deepEqual(a,b,msg?), notDeepEqual, strictEqual(a,b,msg?)(===), notStrictEqual, deepStrictEqual(a,b,msg?), notDeepStrictEqual, throws(fn,error?,msg?), doesNotThrow(fn,error?,msg?), rejects(fn|Promise,error?,msg?):Promise, doesNotReject, match(str,regexp,msg?), doesNotMatch, ifError(v), fail([msg]|actual,expected,operator,stackStartFn), partialDeepStrictEqual(a,b,msg?).

## Sanitised Extract
Table of Contents:
1. Strict assertion mode (node:assert/strict)
2. Legacy assertion mode (node:assert)
3. AssertionError class
4. CallTracker class (deprecated)
5. Assertion functions: ok, equal, deepEqual, strictEqual, deepStrictEqual, throws, rejects, match, ifError, fail, partialDeepStrictEqual

1. Strict assertion mode
Module import: import { strict as assert } from 'node:assert'
Behavior: Non-strict methods forward to strict implementations. Error diffs shown for object mismatches.
Disable colors: NO_COLOR or NODE_DISABLE_COLORS

2. Legacy assertion mode
Module import: import assert from 'node:assert'
Behavior: equal and deepEqual use == and recursion stops on circular refs. Prototypes ignored.

3. class AssertionError
Signature: new assert.AssertionError(options)
Options: actual:any, expected:any, operator:string, message?:string, stackStartFn?:Function
Properties: actual, expected, operator, generatedMessage:boolean, name='AssertionError', code='ERR_ASSERTION'
Throws: on failed assertions

4. class CallTracker
Signature: new assert.CallTracker()
Methods:
  calls(fn?:Function, exact?:number=1):Function wrapper that must be called exact times
  getCalls(wrapper):Array<{ thisArg:any, arguments:Array<any> }>
  report():Array<{ message:string, actual:number, expected:number, operator:string, stack:object }>
  reset(fn?:Function):void resets call count
  verify():void throws if wrappers not called as expected

5. Assertion functions
assert.ok(value, message?)
assert.equal(a, b, msg?) uses ==
assert.notEqual(a, b, msg?)
assert.deepEqual(a, b, msg?) legacy deep equality
assert.notDeepEqual(a, b, msg?)
assert.strictEqual(a, b, msg?) uses ===
assert.notStrictEqual(a, b, msg?)
assert.deepStrictEqual(a, b, msg?) strict deep equality (Object.is, prototype, symbol, Set/Map, RegExp lastIndex)
assert.notDeepStrictEqual(a, b, msg?)
assert.throws(fn, error?, msg?) expects thrown error matching pattern/class
assert.doesNotThrow(fn, error?, msg?)
assert.rejects(fn|Promise, error?, msg?):Promise<void>
assert.doesNotReject(fn|Promise, error?, msg?):Promise<void>
assert.match(str, regexp, msg?)
assert.doesNotMatch(str, regexp, msg?)
assert.ifError(value)
assert.fail([msg]|actual, expected?, operator?, stackStartFn?)
assert.partialDeepStrictEqual(a,b,msg?)

## Original Source
Node.js Core APIs
https://nodejs.org/api/

## Digest of NODE_ASSERT

# Node.js assert module

Retrieved: 2024-06-12
Data Size: 3324041 bytes
Links Found: 899
Error: None

# Strict assertion mode
Module path: node:assert/strict (introduced v13.9.0)
In strict assertion mode non-strict methods behave as their strict counterparts. Error diffs are displayed for object comparisons.
Disable colors: Set NO_COLOR or NODE_DISABLE_COLORS environment variable.

# Legacy assertion mode
Module path: node:assert (default pre-v9.9.0 behavior)
Uses `==` for deepEqual, equal; prototypes and non-enumerable properties ignored.

# Class: AssertionError
Extends Error; code=ERR_ASSERTION
Constructor: new AssertionError({ actual:any, expected:any, operator:string, message?:string, stackStartFn?:Function })
Properties: actual, expected, operator, generatedMessage:boolean, name='AssertionError', code='ERR_ASSERTION'

# Class: CallTracker (deprecated)
Constructor: new CallTracker()
tracker.calls(fn?:Function, exact?:number=1):Function wrapper; tracks calls
tracker.getCalls(wrapper:Function):Array<{thisArg:any, arguments:Array<any>}> 
tracker.report():Array<{message:string, actual:number, expected:number, operator:string, stack:object}>
tracker.reset(fn?:Function):void
tracker.verify():void throws if call counts mismatch

# Assertion functions
assert(value:any, message?:string|Error):void alias of assert.ok()
assert.ok(value:any, message?:string|Error):void throws AssertionError if !value

assert.equal(actual:any, expected:any, message?:string|Error):void legacy `==`
assert.notEqual(actual:any, expected:any, message?:string|Error):void legacy `!=`
assert.deepEqual(actual:any, expected:any, message?:string|Error):void legacy deep equality
assert.notDeepEqual(actual:any, expected:any, message?:string|Error):void legacy deep inequality
assert.strictEqual(actual:any, expected:any, message?:string|Error):void uses `===`
assert.notStrictEqual(actual:any, expected:any, message?:string|Error):void uses `!==`
assert.deepStrictEqual(actual:any, expected:any, message?:string|Error):void deep equality using Object.is, strict prototype and symbol comparison
assert.notDeepStrictEqual(actual:any, expected:any, message?:string|Error):void
assert.throws(fn:Function, error?:RegExp|Function|Object, message?:string|Error):void expects fn to throw
assert.doesNotThrow(fn:Function, error?:RegExp|Function|Object, message?:string|Error):void
assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function|Object, message?:string):Promise<void>
assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function|Object, message?:string):Promise<void>
assert.match(string:string, regexp:RegExp, message?:string|Error):void throws if !regexp.test(string)
assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error):void throws if regexp.test(string)
assert.ifError(value:any):void throws if value is truthy
assert.fail([message]|actual, expected?, operator?, stackStartFn?):void always throws
assert.partialDeepStrictEqual(actual:any, expected:any, message?:string|Error):void compares subset of properties


## Attribution
- Source: Node.js Core APIs
- URL: https://nodejs.org/api/
- License: License: CC-BY-4.0
- Crawl Date: 2025-05-10T06:58:26.312Z
- Data Size: 3324041 bytes
- Links Found: 899

## Retrieved
2025-05-10
