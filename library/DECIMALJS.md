# DECIMALJS

## Crawl Summary
Constructor: Decimal(value:string|number|Decimal)->Decimal; supports decimal, binary(0b), octal(0o), hex(0x) formats with e/E and p/P exponents; throws DecimalError on invalid. Configuration: Decimal.set({precision:int1-1e9, rounding:0-8, toExpNeg:-9e15-0, toExpPos:0-9e15, minE:-9e15-0, maxE:0-9e15, modulo:0-9, crypto:bool}); Decimal.clone([object])->new constructor. Methods: add, sub, mul, div, mod, pow with aliases plus, minus, times, dividedBy, modulo, toPower. Rounding: ceil, floor, round, trunc, toDecimalPlaces, toSignificantDigits. Comparison: cmp, eq, lt, lte, gt, gte. Conversion: toString, toNumber, toJSON, toFixed, toExponential, toPrecision. Random: Decimal.random([dp])->Decimal using crypto or Math.random. Default settings: precision=20, rounding=4, toExpNeg=-7, toExpPos=20, minE=-9e15, maxE=9e15, modulo=1, crypto=false.

## Normalised Extract
Table of Contents:
1 Constructor
2 Configuration Options
3 Arithmetic Operations
4 Rounding and Truncation
5 Comparison
6 Conversion
7 Random Number Generation

1 Constructor
Signature: Decimal(value) -> Decimal
Parameters:
  value: number | string | Decimal
Supported string literals:
  - Decimal: '123.456', '4.321e+4', '-735.0918e-430'
  - Binary (0b): '0b1011.01', '0b1.1p-5'
  - Octal (0o): '0o7.4', '0o1.4p-5'
  - Hexadecimal (0x): '0xff.8', '0x1.8p-5'
Behaviour:
  - Throws DecimalError on invalid value
  - Exponent range enforced by minE and maxE

2 Configuration Options
Method: Decimal.set(object) -> Decimal constructor
object properties:
  precision: integer 1–1e9 default 20
  rounding: integer 0–8 default 4
  toExpNeg: integer –9e15–0 default –7
  toExpPos: integer 0–9e15 default 20
  minE: integer –9e15–0 default –9e15
  maxE: integer 0–9e15 default 9e15
  modulo: integer 0–9 default 1
  crypto: boolean default false
Direct assignment bypasses validation. Use set for safety.
Clone: Decimal.clone([object]) -> new Decimal constructor with independent settings

3 Arithmetic Operations
add(x,y) / plus(y) -> Decimal
sub(x,y) / minus(y) -> Decimal
mul(x,y) / times(y) -> Decimal
div(x,y) / dividedBy(y) -> Decimal
mod(x,y) / modulo(y) -> Decimal
pow(base,exp) / toPower(exp) -> Decimal
All operations return new Decimal rounded to precision significant digits using rounding mode.

4 Rounding and Truncation
ceil(x)/ceil() -> Decimal rounded toward +Infinity
floor(x)/floor() -> Decimal toward –Infinity
round(x)/round() -> Decimal nearest
trunc(x)/trunc() -> Decimal toward zero
toDecimalPlaces(dp)/toDP(dp) -> Decimal with dp decimals
toSignificantDigits(sd)/toSD(sd) -> Decimal with sd significant digits

5 Comparison
cmp(x) / comparedTo(x) -> number {–1,0,1,NaN}
eq(x)/equals(x) -> boolean
lt(x), lte(x), gt(x), gte(x) -> boolean

6 Conversion
toString(), toNumber(), toJSON() -> string|number
toFixed(dp) -> string with dp decimals
toExponential(dp) -> string in exponential form
toPrecision(sd) -> string with sd significant digits

7 Random Number Generation
random([dp]) -> Decimal
  dp: integer 0–1e9 default precision
  if crypto=true and global crypto available uses secure PRNG, else Math.random
  throws if crypto=true but no crypto object

## Supplementary Details
Exponent Limits:
  - minE: lowest exponent before underflow to zero, default –9e15
  - maxE: highest exponent before overflow to Infinity, default 9e15
Modulo Modes:
  - ROUND_UP (0), ROUND_DOWN (1), ROUND_CEIL (2), ROUND_FLOOR (3), ROUND_HALF_UP (4), ROUND_HALF_DOWN (5), ROUND_HALF_EVEN (6), ROUND_HALF_CEIL (7), ROUND_HALF_FLOOR (8), EUCLID (9)
  - modulo property sets division remainder mode
Crypto Integration:
  - global.crypto = require('crypto') in Node.js
  - Decimal.set({ crypto: true }) to enable secure random
Clone Patterns:
  - Decimal9 = Decimal.clone({ precision: 9 })
  - D2 = Decimal.clone({ defaults: true, precision: 50 })
Best Practice:
  - Use clone to isolate configuration per module
  - Always use set with defaults:true to reset config

NoConflict (Browser):
  - Decimal.noConflict() -> original constructor
Errors:
  - Decimal.set({ precision: 0 }) throws DecimalError: Invalid argument: precision: 0
  - new Decimal('invalid') throws DecimalError: Invalid argument: value: invalid

## Reference Details
API Signatures:
Constructor:
  new Decimal(value: number|string|Decimal) -> Decimal
Configuration:
  Decimal.set(object: {
    precision?: number, rounding?: number, toExpNeg?: number, toExpPos?: number,
    minE?: number, maxE?: number, modulo?: number, crypto?: boolean, defaults?: boolean
  }) -> this Decimal constructor
  Decimal.clone(object?: as above) -> new Decimal constructor
Arithmetic Methods:
  static add(x: number|string|Decimal, y: number|string|Decimal) -> Decimal
  instance plus(y: number|string|Decimal) -> Decimal
  static sub(x, y) / instance minus(y) -> Decimal
  static mul(x, y) / instance times(y) -> Decimal
  static div(x, y) / instance dividedBy(y) -> Decimal
  static mod(x, y) / instance modulo(y) -> Decimal
  static pow(base: any, exponent: any) / instance toPower(exponent) -> Decimal
Rounding and Truncation:
  static ceil(x) / instance ceil() -> Decimal
  static floor(x) / instance floor() -> Decimal
  static round(x) / instance round() -> Decimal
  static trunc(x) / instance trunc() -> Decimal
  instance toDP(dp: number, rm?: number) -> Decimal
  instance toSD(sd: number, rm?: number) -> Decimal
Comparison:
  instance cmp(x) -> number
  instance eq(x) -> boolean
  instance lt(x), lte(x), gt(x), gte(x) -> boolean
Conversion:
  instance toString() -> string
  instance toNumber() -> number
  instance toJSON() -> string
  instance toFixed(dp: number, rm?: number) -> string
  instance toExponential(dp?: number, rm?: number) -> string
  instance toPrecision(sd?: number, rm?: number) -> string
Random:
  static random(dp?: number) -> Decimal

Code Examples:
// Constructor
let x = new Decimal('1.234e+2')    // '123.4'
// Configuration
Decimal.set({ precision: 10, rounding: Decimal.ROUND_HALF_EVEN })
// Clone
const D50 = Decimal.clone({ precision: 50 })
// Arithmetic
let sum = Decimal.add('0.1', '0.2')
let prod = new Decimal(5).times('3')
// Rounding
let r = new Decimal('1.005').toDP(2, Decimal.ROUND_HALF_UP) // '1.01'
// Conversion
let s = new Decimal(0.000123).toExponential(3) // '1.230e-4'
// Random
global.crypto = require('crypto')
Decimal.set({ crypto: true })
let rnd = Decimal.random(16)

Troubleshooting:
// Invalid precision
try {
  Decimal.set({ precision: 0 })
} catch (e) {
  console.error(e.message) // Invalid argument: precision: 0
}
// Missing crypto
try {
  Decimal.set({ crypto: true })
  Decimal.random()
} catch (e) {
  console.error(e.message) // Exception: crypto object not available
}

## Information Dense Extract
Decimal(value)->Decimal; value:number|string|Decimal; string supports decimal,0b,0o,0x prefixes and e/E, p/P exponents; Decimal.set({precision:1–1e9 default20, rounding:0–8 default4, toExpNeg:-9e15–0 default-7, toExpPos:0–9e15 default20, minE:-9e15–0 default-9e15, maxE:0–9e15 default9e15, modulo:0–9 default1, crypto:false}); Decimal.clone([cfg])->new Decimal; Arithmetic: add, sub, mul, div, mod, pow with aliases; Rounding: ceil, floor, round, trunc, toDP, toSD; Comparison: cmp, eq, lt, lte, gt, gte; Conversion: toString, toNumber, toJSON, toFixed, toExponential, toPrecision; Random(dp)->Decimal uses crypto or Math.random; Rounding modes: 0:UP,1:DOWN,2:CEIL,3:FLOOR,4:HALF_UP,5:HALF_DOWN,6:HALF_EVEN,7:HALF_CEIL,8:HALF_FLOOR,9:EUCLID; Errors: DecimalError on invalid args; Exponent limits: underflow below minE->0, overflow above maxE->Infinity.

## Sanitised Extract
Table of Contents:
1 Constructor
2 Configuration Options
3 Arithmetic Operations
4 Rounding and Truncation
5 Comparison
6 Conversion
7 Random Number Generation

1 Constructor
Signature: Decimal(value) -> Decimal
Parameters:
  value: number | string | Decimal
Supported string literals:
  - Decimal: '123.456', '4.321e+4', '-735.0918e-430'
  - Binary (0b): '0b1011.01', '0b1.1p-5'
  - Octal (0o): '0o7.4', '0o1.4p-5'
  - Hexadecimal (0x): '0xff.8', '0x1.8p-5'
Behaviour:
  - Throws DecimalError on invalid value
  - Exponent range enforced by minE and maxE

2 Configuration Options
Method: Decimal.set(object) -> Decimal constructor
object properties:
  precision: integer 11e9 default 20
  rounding: integer 08 default 4
  toExpNeg: integer 9e150 default 7
  toExpPos: integer 09e15 default 20
  minE: integer 9e150 default 9e15
  maxE: integer 09e15 default 9e15
  modulo: integer 09 default 1
  crypto: boolean default false
Direct assignment bypasses validation. Use set for safety.
Clone: Decimal.clone([object]) -> new Decimal constructor with independent settings

3 Arithmetic Operations
add(x,y) / plus(y) -> Decimal
sub(x,y) / minus(y) -> Decimal
mul(x,y) / times(y) -> Decimal
div(x,y) / dividedBy(y) -> Decimal
mod(x,y) / modulo(y) -> Decimal
pow(base,exp) / toPower(exp) -> Decimal
All operations return new Decimal rounded to precision significant digits using rounding mode.

4 Rounding and Truncation
ceil(x)/ceil() -> Decimal rounded toward +Infinity
floor(x)/floor() -> Decimal toward Infinity
round(x)/round() -> Decimal nearest
trunc(x)/trunc() -> Decimal toward zero
toDecimalPlaces(dp)/toDP(dp) -> Decimal with dp decimals
toSignificantDigits(sd)/toSD(sd) -> Decimal with sd significant digits

5 Comparison
cmp(x) / comparedTo(x) -> number {1,0,1,NaN}
eq(x)/equals(x) -> boolean
lt(x), lte(x), gt(x), gte(x) -> boolean

6 Conversion
toString(), toNumber(), toJSON() -> string|number
toFixed(dp) -> string with dp decimals
toExponential(dp) -> string in exponential form
toPrecision(sd) -> string with sd significant digits

7 Random Number Generation
random([dp]) -> Decimal
  dp: integer 01e9 default precision
  if crypto=true and global crypto available uses secure PRNG, else Math.random
  throws if crypto=true but no crypto object

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMALJS

# Decimal.js Detailed Digest (Retrieved 2024-06-13)

# Constructor
- Signature: Decimal(value) -> Decimal
- value types: number, string, Decimal
- string formats: decimal, binary (0b/0B), octal (0o/0O), hexadecimal (0x/0X)
- exponential notation: decimal uses e/E; non-decimal uses p/P
- allowable exponent range bounded by minE and maxE
- throws DecimalError on invalid value

# Configuration
- Decimal.set(object) -> this Decimal constructor
- object properties:
  - precision: integer 1 to 1e9 inclusive, default 20
  - rounding: integer 0 to 8 inclusive, default 4 (ROUND_HALF_UP)
  - toExpNeg: integer -9e15 to 0 inclusive, default -7
  - toExpPos: integer 0 to 9e15 inclusive, default 20
  - minE: integer -9e15 to 0 inclusive, default -9e15
  - maxE: integer 0 to 9e15 inclusive, default 9e15
  - modulo: integer 0 to 9 inclusive, default 1 (ROUND_DOWN)
  - crypto: boolean, default false
- Decimal.clone([object]) -> new independent Decimal constructor with same or specified settings

# Core Methods
- Arithmetic:
  - add(x,y) / plus(y)        -> Decimal
  - sub(x,y) / minus(y)       -> Decimal
  - mul(x,y) / times(y)       -> Decimal
  - div(x,y) / dividedBy(y)   -> Decimal
  - mod(x,y) / modulo(y)      -> Decimal
  - pow(base,exp) / toPower(exp) -> Decimal
- Rounding and truncation:
  - ceil(x) / ceil()         -> Decimal
  - floor(x) / floor()       -> Decimal
  - round(x) / round()       -> Decimal
  - trunc(x) / trunc()       -> Decimal
  - toDecimalPlaces(dp)/toDP(dp)     -> Decimal
  - toSignificantDigits(sd)/toSD(sd) -> Decimal
- Comparison:
  - cmp(x) / comparedTo(x)   -> number (-1,0,1,NaN)
  - eq(x) / equals(x)        -> boolean
  - lt(x), lte(x), gt(x), gte(x) -> boolean
- Conversion:
  - toString(), toNumber(), toJSON() -> string | number
  - toFixed(dp), toExponential(dp), toPrecision(sd) -> string

# Random Number Generation
- Decimal.random([dp]) -> Decimal
  - dp: integer 0 to 1e9 inclusive, default current precision
  - if crypto=true and global crypto available uses crypto.getRandomValues or crypto.randomBytes, else Math.random
  - throws if crypto=true but no crypto object

# Errors
- DecimalError thrown by constructor or set on invalid argument or configuration

# Attribution
Source: https://mikemcl.github.io/decimal.js/  Data Size: 13874875 bytes

## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-11T00:44:40.798Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-11
