# ASSERT_MODULE

## Crawl Summary
Imported patterns, strict vs legacy modes, AssertionError options and properties, CallTracker methods and defaults, core assertion function signatures and deprecation status.

## Normalised Extract
Table of Contents:
1. Import Patterns
2. Assertion Modes
3. Error Classes
4. Call Tracking
5. Core Assertions

1. Import Patterns:
import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
import assert from 'node:assert/strict'
const assert = require('node:assert/strict')

2. Assertion Modes:
- Strict: non-strict behave as strict, diff output
- Legacy: == comparisons in deepEqual, equal, notDeepEqual, notEqual; import assert from 'node:assert'

3. Error Classes:
AssertionError: new AssertionError({ message?:string, actual?:any, expected?:any, operator?:string, stackStartFn?:Function })
Properties: message, actual, expected, operator, code='ERR_ASSERTION', generatedMessage, name='AssertionError'

4. Call Tracking:
CallTracker: new CallTracker()
calls(fn?=>void, exact?=1): function wrapper tracking calls
getCalls(wrapper): returns array of { thisArg, arguments }
report(): returns array of pending call info
reset(wrapper?): resets calls
verify(): throws if calls != expected

5. Core Assertions:
assert(value:boolean, message?:string): void
assert.strictEqual(actual:any, expected:any, message?:string): void
assert.deepStrictEqual(actual:any, expected:any, message?:string): void
assert.throws(fn:Function, error?:RegExp|Function, message?:string): void
assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string): void
assert.rejects(asyncFn:Promise|Function, error?:RegExp|Function, message?:string): Promise<void>
assert.doesNotReject(asyncFn:Promise|Function, error?:RegExp|Function, message?:string): Promise<void>
assert.match(string:string, regexp:RegExp, message?:string): void
assert.doesNotMatch(string:string, regexp:RegExp, message?:string): void
assert.fail(message?:string): never
assert.ifError(value:any): void


## Supplementary Details
Color Control: set NO_COLOR=1 or NODE_DISABLE_COLORS=1 to disable diff colors
Legacy warnings emitted when using legacy mode; no flag needed but may log warnings
CallTracker default exact=1, default fn=no-op
assert.rejects returns a Promise
assert.doesNotReject rejects if non-Promise returned or sync throw
Use process.on('exit') for verify() hook

## Reference Details
assert(value, message?) -> void throws ERR_ASSERTION if !value
assert.strictEqual(actual, expected, message?) -> void checks actual===expected, sets err.actual, err.expected, err.operator='strictEqual'
assert.deepStrictEqual(actual, expected, message?) -> void deep strict compare; Object.is for primitives; compares prototypes and symbols; WeakMap/WeakSet require same instance
assert.throws(fn, error?, message?) -> void invokes fn, catches thrown Error; error match: constructor, RegExp, or validation fn
assert.doesNotThrow(fn, error?, message?) -> void asserts fn does not throw
assert.rejects(asyncFn, error?, message?) -> Promise<void> awaits promise; same matching rules as throws
assert.doesNotReject(asyncFn, error?, message?) -> Promise<void> rejects on thrown or non-promise return
assert.match(string, regexp, message?) -> void asserts regexp.test(string)
assert.doesNotMatch(string, regexp, message?) -> void asserts !regexp.test(string)
assert.ifError(value) -> void throws value if truthy
assert.fail(message?) -> never throws new AssertionError({ message })
Example call tracking implementation:
import assert from 'node:assert';
const tracker=new assert.CallTracker();
const callsfunc=tracker.calls(MyFunc,2);
MyFunc();
process.on('exit',()=>{tracker.verify();});


## Information Dense Extract
importPatterns:strict->import{strict as assert}from'node:assert'|require('node:assert').strict;legacy->import assert from'node:assert'.AssertionErrorOpts:{message?,actual?,expected?,operator?,stackStartFn?}Properties:message,actual,expected,operator,code='ERR_ASSERTION',generatedMessage,name.Operators:strictEqual,deepStrictEqual,throws,doesNotThrow,rejects,doesNotReject,match,doesNotMatch,ifError,fail.CallTracker:calls(fn?,exact?=1):wrapper,getCalls(wrapper):[{thisArg,arguments}],report()->pending,reset(wrapper?),verify()->throw.Config:NO_COLOR,NODE_DISABLE_COLORS disable colors

## Sanitised Extract
Table of Contents:
1. Import Patterns
2. Assertion Modes
3. Error Classes
4. Call Tracking
5. Core Assertions

1. Import Patterns:
import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
import assert from 'node:assert/strict'
const assert = require('node:assert/strict')

2. Assertion Modes:
- Strict: non-strict behave as strict, diff output
- Legacy: == comparisons in deepEqual, equal, notDeepEqual, notEqual; import assert from 'node:assert'

3. Error Classes:
AssertionError: new AssertionError({ message?:string, actual?:any, expected?:any, operator?:string, stackStartFn?:Function })
Properties: message, actual, expected, operator, code='ERR_ASSERTION', generatedMessage, name='AssertionError'

4. Call Tracking:
CallTracker: new CallTracker()
calls(fn?=>void, exact?=1): function wrapper tracking calls
getCalls(wrapper): returns array of { thisArg, arguments }
report(): returns array of pending call info
reset(wrapper?): resets calls
verify(): throws if calls != expected

5. Core Assertions:
assert(value:boolean, message?:string): void
assert.strictEqual(actual:any, expected:any, message?:string): void
assert.deepStrictEqual(actual:any, expected:any, message?:string): void
assert.throws(fn:Function, error?:RegExp|Function, message?:string): void
assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string): void
assert.rejects(asyncFn:Promise|Function, error?:RegExp|Function, message?:string): Promise<void>
assert.doesNotReject(asyncFn:Promise|Function, error?:RegExp|Function, message?:string): Promise<void>
assert.match(string:string, regexp:RegExp, message?:string): void
assert.doesNotMatch(string:string, regexp:RegExp, message?:string): void
assert.fail(message?:string): never
assert.ifError(value:any): void

## Original Source
Web Platform, Protocol & Date-Time Standards
https://nodejs.org/api/

## Digest of ASSERT_MODULE

# Assert Module

## Stability: 2 - Stable

## Import Patterns

import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
import assert from 'node:assert/strict'
const assert = require('node:assert/strict')

## Strict Assertion Mode

In strict mode non-strict methods behave as strict. Error diffs enabled.

## Legacy Assertion Mode

Legacy uses == for deepEqual, equal, notDeepEqual, notEqual.
Import with:
import assert from 'node:assert'
const assert = require('node:assert')

## Class: assert.AssertionError

Signature: new assert.AssertionError(options)

options: { message?: string, actual?: any, expected?: any, operator?: string, stackStartFn?: Function }

Properties:
- message: string
- actual: any
- expected: any
- operator: string
- code: 'ERR_ASSERTION'
- generatedMessage: boolean
- name: 'AssertionError'

## Class: assert.CallTracker

Signature: new assert.CallTracker()

Methods:
- calls(fn?: Function, exact?: number): Function
- getCalls(fnWrapper: Function): Array<{ thisArg: object, arguments: any[] }>
- report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: any }>
- reset(fnWrapper?: Function): void
- verify(): void

Deprecated in v20.1.0

## Assertion Functions

assert(value[, message])
assert.strictEqual(actual, expected[, message])
assert.deepStrictEqual(actual, expected[, message])
assert.throws(fn[, error][, message])
assert.doesNotThrow(fn[, error][, message])
assert.rejects(asyncFn[, error][, message])
assert.doesNotReject(asyncFn[, error][, message])
assert.match(string, regexp[, message])
assert.doesNotMatch(string, regexp[, message])
assert.fail([message])
assert.ifError(value)


## Attribution
- Source: Web Platform, Protocol & Date-Time Standards
- URL: https://nodejs.org/api/
- License: License if known
- Crawl Date: 2025-04-29T15:50:11.499Z
- Data Size: 4131244 bytes
- Links Found: 3262

## Retrieved
2025-04-29
