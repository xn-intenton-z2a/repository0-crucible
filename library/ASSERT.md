# ASSERT

## Crawl Summary
Stability and import patterns for strict and legacy assertion modes; constructor signature and properties for AssertionError; deprecation and methods for CallTracker; complete list of assertion methods with exact parameter types and behaviors; environment variables for color control.

## Normalised Extract
Table of Contents
1. Strict assertion mode import and environment flags
2. Legacy assertion mode import and loose equality caveats
3. AssertionError class constructor and properties
4. CallTracker class methods and usage pattern
5. Core assertion methods signatures and parameters

1. Strict assertion mode import and environment flags
import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
Set NO_COLOR or NODE_DISABLE_COLORS to disable colorized diffs and REPL colors

2. Legacy assertion mode import and loose equality caveats
import assert from 'node:assert'
const assert = require('node:assert')
assert.deepEqual, equal, notDeepEqual, notEqual use == for comparisons and ignore prototypes

3. AssertionError class constructor and properties
Constructor: new assert.AssertionError({ message:string, actual:any, expected:any, operator:string, stackStartFn:Function })
Properties: name='AssertionError', code='ERR_ASSERTION', actual:any, expected:any, operator:string, generatedMessage:boolean

4. CallTracker class methods and usage pattern
const tracker = new assert.CallTracker()
const callsFn = tracker.calls(fn:Function=()=>{}, exact:number=1)
callsFn(...args)
tracker.verify() throws if wrapperFn not called exact times
Additional methods: tracker.getCalls(wrapperFn), tracker.report(), tracker.reset(wrapperFn?)

5. Core assertion methods signatures and parameters
assert(value:any, message?:string|Error)
assert.deepEqual(actual:any, expected:any, message?:string|Error)
assert.deepStrictEqual(actual:any, expected:any, message?:string|Error)
assert.equal(actual:any, expected:any, message?:string|Error)
assert.strictEqual(actual:any, expected:any, message?:string|Error)
assert.throws(fn:Function, error?:RegExp|Function, message?:string|Error)
assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string|Error)
assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function, message?:string)
assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function, message?:string)
assert.match(string:string, regexp:RegExp, message?:string|Error)
assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error)


## Supplementary Details
Node.js version support:
• Strict mode exposed since v9.9.0
• AssertionError since v0.1.21
• CallTracker added v14.2.0, deprecated v20.1.0

Environment variables:
• NO_COLOR or NODE_DISABLE_COLORS (string) – boolean on existence – disables ANSI colors

Import paths:
• node:assert – stable import prefix
• node:assert/strict – strict mode import path

Error codes and names:
• AssertionError instances have code 'ERR_ASSERTION'

Usage patterns:
• Wrap tracker.verify() inside process.on('exit') for test teardown


## Reference Details
assert(value:any, message?:string|Error):void
Throws ERR_ASSERTION if value is falsy.

assert.deepEqual(actual:any, expected:any, message?:string|Error):void
Compares values using == for primitives and recurses through enumerable own properties; ignores prototypes; compares Error name/message/causes; supports circular refs; non-strict.

assert.deepStrictEqual(actual:any, expected:any, message?:string|Error):void
Compares using Object.is() for primitives, strict type tag matching, prototype using ===, recurses through own properties including Symbols, compares Map/Set unordered, fails on different WeakMap/WeakSet instances.

assert.equal(actual:any, expected:any, message?:string|Error):void  alias of assert.ok(actual==expected)
assert.strictEqual(actual:any, expected:any, message?:string|Error):void  alias of assert.ok(actual===expected)
assert.notEqual, assert.notStrictEqual opposite behaviors.

assert.throws(fn:Function, error?:RegExp|Function, message?:string|Error):void
Invokes fn synchronously, expects it to throw; if error arg provided, checks instance or message match; returns thrown Error.

assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string|Error):void
Invokes fn synchronously, expects no throw; returns result.

assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function, message?:string):Promise<void>
Awaits returned promise, expects rejection; if error arg provided, checks instance or message match; rejects if promise resolves or throws unexpected

assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function, message?:string):Promise<void>
Awaits returned promise, expects resolution; rejects if promise rejects or invalid return.

assert.match(string:string, regexp:RegExp, message?:string|Error):void
assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error):void
Throws ERR_INVALID_ARG_TYPE or ERR_ASSERTION on type mismatch or unexpected match.

Class AssertionError extends Error {
  constructor(options:{ message?:string, actual?:any, expected?:any, operator?:string, stackStartFn?:Function})
  name: 'AssertionError'
  code: 'ERR_ASSERTION'
  actual: any
  expected: any
  operator: string
  generatedMessage: boolean
}

Class CallTracker {
  new CallTracker(): CallTracker
  calls(fn?:Function, exact?:number): Function
  getCalls(wrapper:Function): Array<{ thisArg:any, arguments:Array<any> }>
  report(): Array<{ message:string, actual:number, expected:number, operator:string, stack:Object }>
  reset(fn?:Function): void
  verify(): void
}

Best practices:
• Use strict mode for deep comparisons in production
• Avoid legacy deepEqual for type-sensitive checks
• Use tracker.verify() in exit handler for test coverage

Troubleshooting:
Command: node --enable-source-maps test.js
Expected: colorized diff output on AssertionError
If no colors, set NO_COLOR=1 or export NODE_DISABLE_COLORS=1


## Information Dense Extract
ASSERT module: stable assert + strict import from node:assert or node:assert/strict. Env flags NO_COLOR|NODE_DISABLE_COLORS disable diff colors. AssertionError options:{message,actual,expected,operator,stackStartFn}, properties:name='AssertionError',code='ERR_ASSERTION',generatedMessage. Core methods with signatures:assert(value[,msg]),equal,notEqual,strictEqual,notStrictEqual,deepEqual (== recursion),deepStrictEqual (Object.is recursion),notDeepEqual,notDeepStrictEqual,throws(fn[,err][,msg]),doesNotThrow(fn[,err][,msg]),rejects(asyncFn[,err][,msg])→Promise,doesNotReject(asyncFn[,err][,msg])→Promise,match(string,RegExp[,msg]),doesNotMatch(string,RegExp[,msg]). CallTracker: new→calls(fn=()=>{},exact=1)→wrapper,verify() throws if miscalls, getCalls(wrapper),report(),reset(fn?).

## Sanitised Extract
Table of Contents
1. Strict assertion mode import and environment flags
2. Legacy assertion mode import and loose equality caveats
3. AssertionError class constructor and properties
4. CallTracker class methods and usage pattern
5. Core assertion methods signatures and parameters

1. Strict assertion mode import and environment flags
import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
Set NO_COLOR or NODE_DISABLE_COLORS to disable colorized diffs and REPL colors

2. Legacy assertion mode import and loose equality caveats
import assert from 'node:assert'
const assert = require('node:assert')
assert.deepEqual, equal, notDeepEqual, notEqual use == for comparisons and ignore prototypes

3. AssertionError class constructor and properties
Constructor: new assert.AssertionError({ message:string, actual:any, expected:any, operator:string, stackStartFn:Function })
Properties: name='AssertionError', code='ERR_ASSERTION', actual:any, expected:any, operator:string, generatedMessage:boolean

4. CallTracker class methods and usage pattern
const tracker = new assert.CallTracker()
const callsFn = tracker.calls(fn:Function=()=>{}, exact:number=1)
callsFn(...args)
tracker.verify() throws if wrapperFn not called exact times
Additional methods: tracker.getCalls(wrapperFn), tracker.report(), tracker.reset(wrapperFn?)

5. Core assertion methods signatures and parameters
assert(value:any, message?:string|Error)
assert.deepEqual(actual:any, expected:any, message?:string|Error)
assert.deepStrictEqual(actual:any, expected:any, message?:string|Error)
assert.equal(actual:any, expected:any, message?:string|Error)
assert.strictEqual(actual:any, expected:any, message?:string|Error)
assert.throws(fn:Function, error?:RegExp|Function, message?:string|Error)
assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string|Error)
assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function, message?:string)
assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function, message?:string)
assert.match(string:string, regexp:RegExp, message?:string|Error)
assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error)

## Original Source
Node.js Core API Reference
https://nodejs.org/api/

## Digest of ASSERT

# Assert Module
Retrieved: 2024-06-20

Stability: 2 – Stable
Source Code: lib/assert.js

# Strict assertion mode
In strict mode, non-strict methods behave like their corresponding strict methods and error diffs are emitted for deep comparisons.

Import patterns:
import { strict as assert } from 'node:assert';
const assert = require('node:assert').strict;

Environment configuration:
Set NO_COLOR or NODE_DISABLE_COLORS to deactivate colors in error diffs and REPL output.

# Legacy assertion mode
Uses the == operator for deepEqual, equal, notDeepEqual, notEqual. May produce unexpected results due to loose equality.

Import patterns:
import assert from 'node:assert';
const assert = require('node:assert');

# Class:AssertionError
Constructor signature:
new assert.AssertionError(options)
options:
  message <string>         custom error message
  actual <any>             assigned to error.actual
  expected <any>           assigned to error.expected
  operator <string>        assigned to error.operator
  stackStartFn <Function>  trim stack before this function

Instance properties:
  name = 'AssertionError'
  code = 'ERR_ASSERTION'
  generatedMessage <boolean>

# Class:CallTracker (Deprecated)
new assert.CallTracker()

Methods:
  calls(fn:Function=()=>{}, exact:Number=1):Function
    returns wrapper that must be called exact times before verify()
  getCalls(wrapperFn:Function):Array<{ thisArg:any, arguments:Array }>
  report():Array<{ message:string, actual:number, expected:number, operator:string, stack:object }>
  reset(fn?:Function):void  reset counts for a single or all tracked functions
  verify():void  throws if any wrapper not called expected times

# Core assertion methods
  assert(value:any, message?:string|Error):void    alias of assert.ok()
  assert.ok(value:any, message?:string|Error):void
  assert.equal(actual:any, expected:any, message?:string|Error):void
  assert.notEqual(actual:any, expected:any, message?:string|Error):void
  assert.deepEqual(actual:any, expected:any, message?:string|Error):void
  assert.notDeepEqual(actual:any, expected:any, message?:string|Error):void
  assert.deepStrictEqual(actual:any, expected:any, message?:string|Error):void
  assert.notDeepStrictEqual(actual:any, expected:any, message?:string|Error):void
  assert.strictEqual(actual:any, expected:any, message?:string|Error):void
  assert.notStrictEqual(actual:any, expected:any, message?:string|Error):void
  assert.throws(fn:Function, error?:RegExp|Function, message?:string|Error):void
  assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string|Error):void
  assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function, message?:string):Promise<void>
  assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function, message?:string):Promise<void>
  assert.match(string:string, regexp:RegExp, message?:string|Error):void
  assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error):void



## Attribution
- Source: Node.js Core API Reference
- URL: https://nodejs.org/api/
- License: Node.js License
- Crawl Date: 2025-05-11T00:42:39.248Z
- Data Size: 4144456 bytes
- Links Found: 3302

## Retrieved
2025-05-11
