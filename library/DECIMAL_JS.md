# DECIMAL_JS

## Crawl Summary
Decimal.js provides an arbitrary-precision Decimal constructor Decimal(value) accepting number|string|Decimal, supporting decimal, binary, hex, octal formats with e/E or p/P exponents. Global and per-constructor configuration via Decimal.set({ precision:1–1e9, rounding:0–8, toExpNeg:–9e15–0, toExpPos:0–9e15, minE:–9e15–0, maxE:0–9e15, modulo:0–9, crypto:false}) and clone. Static methods include arithmetic (add,sub,mul,div,pow,mod), comparison (max,min,cmp), logs (log,ln,log2,log10), exponentials (exp,sqrt,cbrt), trigonometric and hyperbolic (sin,cos,tan,asin,acos,atan,sinh,cosh,tanh,asinh,acosh,atanh), random(dp), sum, clamp, hypot, noConflict, isDecimal, sign. Instances support fluent API: x.plus(y), x.minus(y), x.times(y), x.dividedBy(y), rounding/formatting methods (round,ceil,floor,trunc,toDP,toFixed,toExponential,toPrecision,toSD), conversion (toString,toNumber,valueOf,toJSON), predicates (isFinite,isNaN,isInteger,isZero,isNeg,isPos). Rounding modes: ROUND_UP(0), ROUND_DOWN(1), ROUND_CEIL(2), ROUND_FLOOR(3), ROUND_HALF_UP(4), ROUND_HALF_DOWN(5), ROUND_HALF_EVEN(6), ROUND_HALF_CEIL(7), ROUND_HALF_FLOOR(8), EUCLID(9). Random uses crypto.getRandomValues or crypto.randomBytes when crypto=true and available, else Math.random.

## Normalised Extract
Table of Contents

1 Constructor
2 Configuration API
3 Clone Constructor
4 Static Arithmetic Methods
5 Instance Arithmetic Methods
6 Rounding & Formatting
7 Logarithms & Exponentials
8 Trigonometric & Hyperbolic Methods
9 Utility & Comparison
10 Random & Crypto

1 Constructor
Signature: Decimal(value) ⇒ Decimal
Parameters: number|string|Decimal
String formats: decimal, 0x/0X hex, 0b/0B binary, 0o/0O octal; exponents: e/E (decimal), p/P (binary/hex/octal)
Throws on invalid input

2 Configuration API
Decimal.set(configObject) ⇒ Decimal constructor
Properties and ranges:
  precision: int 1–1e9 (default 20)
  rounding: int 0–8 (default 4)
  toExpNeg: int –9e15–0 (default –7)
  toExpPos: int 0–9e15 (default 20)
  minE: int –9e15–0 (default –9e15)
  maxE: int 0–9e15 (default 9e15)
  modulo: int 0–9 (default 1)
  crypto: boolean (default false)
Set defaults: Decimal.set({ defaults: true }) resets all to defaults

3 Clone Constructor
Decimal.clone([configObject]) ⇒ independent Decimal constructor with own config
Clone with defaults: Decimal.clone({ defaults: true })

4 Static Arithmetic Methods
add(x,y), sub(x,y), mul(x,y), div(x,y), pow(x,y), mod(x,y), max(x,y,...), min(x,y,...), sum(x,y,...), hypot(x,y,...)
Parameters: number|string|Decimal, return Decimal rounded to precision significant digits using rounding mode

5 Instance Arithmetic Methods
y = x.plus(y), x.minus(y), x.times(y), x.dividedBy(y), x.pow(y), x.mod(y), x.sqrt(), x.cbrt(), x.sum(...)
Immutable, chainable, return new Decimal

6 Rounding & Formatting
x.round(), x.ceil(), x.floor(), x.trunc()
x.toDP(dp, rm), x.toFixed(dp, rm), x.toExponential(dp, rm), x.toPrecision(sd, rm), x.toSD(sd, rm)
  dp: integer decimal places, rm: rounding mode 0–8

7 Logarithms & Exponentials
Decimal.log(x, base), log2(x), log10(x), ln(x), exp(x)
x.logarithm(base), x.log2(), x.log10(), x.naturalLogarithm(), x.naturalExponential()
Range/Domain: see static methods

8 Trigonometric & Hyperbolic Methods
sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh
Static: Decimal.sin(x) ⇒ Decimal; Instance: x.sin() ⇒ Decimal

9 Utility & Comparison
Decimal.abs(x), Decimal.sign(x), Decimal.isDecimal(o)
x.abs(), x.sign(), x.cmp(y), x.eq(y), x.gt(y), x.gte(y), x.lt(y), x.lte(y), x.isFinite(), x.isNaN(), x.isInteger(), x.isZero(), x.isNeg(), x.isPos(), x.dp(), x.sd(includeZeros)

10 Random & Crypto
Decimal.random([dp]) ⇒ Decimal with 0 ≤ value < 1, dp decimal places
If constructor.crypto=true and global crypto available, uses crypto.getRandomValues or crypto.randomBytes, else Math.random
Throws if crypto requested but unavailable

Rounding/Modulo Modes
0 ROUND_UP; 1 ROUND_DOWN; 2 ROUND_CEIL; 3 ROUND_FLOOR; 4 ROUND_HALF_UP; 5 ROUND_HALF_DOWN; 6 ROUND_HALF_EVEN; 7 ROUND_HALF_CEIL; 8 ROUND_HALF_FLOOR; 9 EUCLID

## Supplementary Details
Installation and Import
  npm install decimal.js
  CommonJS: const Decimal = require('decimal.js')
  ES Module: import Decimal from 'decimal.js'

Node.js Crypto Setup
  global.crypto = require('crypto')
  Decimal.set({ crypto: true })
  Throws if crypto unavailable when crypto=true

Custom Constructor via Clone
  const D50 = Decimal.clone({ precision: 50 })
  const Ddef = Decimal.clone({ defaults: true })

Configuration Steps
  Decimal.set({ precision: 30, rounding: Decimal.ROUND_HALF_EVEN, modulo: Decimal.EUCLID })
  To reset: Decimal.set({ defaults: true })
  Direct assignment bypasses validation

Precision & Performance
  Increasing precision beyond default exponentially slows exp(), ln(), log()
  LN10 constant precision 1025 digits limits ln() to ~1000 digits

Cloning Best Practice
  Use independent constructors for different precision requirements to avoid global side effects

Error Handling
  Decimal.set({ precision: 0 }) throws DecimalError: Invalid argument: precision: 0
  new Decimal('invalid') throws DecimalError: Invalid number

Version Compatibility
  Ensure consistent minor versions to avoid API changes

Memory
  Multiple constructors share methods, minimal overhead


## Reference Details
// Constructor
Signature: Decimal(value) ⇒ Decimal instance
Throws: DecimalError on invalid value

// Configuration API
Decimal.set(configObject) ⇒ this
Parameters:
  configObject.precision: integer(1–1e9) default 20
  configObject.rounding: integer(0–8) default 4
  configObject.toExpNeg: integer(–9e15–0) default –7
  configObject.toExpPos: integer(0–9e15) default 20
  configObject.minE: integer(–9e15–0) default –9e15
  configObject.maxE: integer(0–9e15) default 9e15
  configObject.modulo: integer(0–9) default 1
  configObject.crypto: boolean default false
  configObject.defaults: boolean reset unspecified to defaults
Throws: DecimalError on invalid config

// Clone
Decimal.clone([configObject]) ⇒ new Decimal constructor

// Rounding & Modulo Enumerations
Decimal.ROUND_UP = 0
Decimal.ROUND_DOWN = 1
Decimal.ROUND_CEIL = 2
Decimal.ROUND_FLOOR = 3
Decimal.ROUND_HALF_UP = 4
Decimal.ROUND_HALF_DOWN = 5
Decimal.ROUND_HALF_EVEN = 6
Decimal.ROUND_HALF_CEIL = 7
Decimal.ROUND_HALF_FLOOR = 8
Decimal.EUCLID = 9

// Static Methods Examples
const a = Decimal.add('1.234', 5.678)  // '6.912'
const b = Decimal.log('1000', 10)      // '3'
const r = Decimal.random(10)           // e.g. '0.1234567890'

// Instance Method Examples
const x = new Decimal(0.1)
const y = x.plus(0.2).times(3).dividedBy('1.23').toPrecision(10, Decimal.ROUND_HALF_EVEN)
// Implementation Pattern
import Decimal from 'decimal.js'
Decimal.set({ precision: 30, rounding: Decimal.ROUND_HALF_UP })
const D = Decimal.clone({ precision: 50 })
const result = new D('1.2345').minus('0.0005').times('100').toFixed(5)

// Troubleshooting
Command: Decimal.set({ precision: 0 })
Expected Error: [DecimalError] Invalid argument: precision: 0

Command: Decimal.random() with crypto=true but no global.crypto
Expected Error: Error: crypto not available

// Best Practices
Use Decimal.clone for isolated configurations
auto-import in Node: global.crypto = require('crypto') before enabling crypto true
Always set defaults:true if resetting after custom config

// Detailed Configuration Effects
precision controls significant digits of returned Decimal; rounding sets default rounding mode; toExpNeg/toExpPos govern exponential notation thresholds; minE/maxE enforce underflow/overflow to zero or Infinity; modulo affects behavior of mod operations; crypto toggles secure randomness source.

## Information Dense Extract
Decimal(value)=>Decimal supports number|string|Decimal; string formats: decimal, 0x/0X hex, 0b/0B binary, 0o/0O octal; exponents: e/E decimal, p/P binary/hex/octal. Decimal.set({precision:1–1e9=20,rounding:0–8=4,toExpNeg:–9e15–0=–7,toExpPos:0–9e15=20,minE:–9e15–0=–9e15,maxE:0–9e15=9e15,modulo:0–9=1,crypto:false,defaults}). Decimal.clone([config])->independent constructor. Static: add,sub,mul,div,pow,mod,max,min,sum,hypot,log,ln,log2,log10,exp,sqrt,cbrt,sin,cos,tan,asin,acos,atan,sinh,cosh,tanh,asinh,acosh,atanh,random([dp]),set,clone,noConflict,isDecimal,sign. Instance: x.plus/sub/times/dividedBy/pow/mod/... chainable; x.round/ceil/floor/trunc; x.toDP(dp,rm)/toFixed(dp,rm)/toExponential(dp,rm)/toPrecision(sd,rm)/toSD(sd,rm); x.toString/toNumber/valueOf/toJSON; x.cmp,eq,gt,gte,lt,lte; x.isFinite,isNaN,isInteger,isZero,isNeg,isPos; x.dp(),x.sd(includeZeros). Rounding modes: 0–8 and 9(EUCLID). Random uses crypto.getRandomValues or crypto.randomBytes if crypto=true, else Math.random. Error on invalid config or crypto unavailable. Best practice: isolated Decimal.clone for custom precision; reset with defaults:true; import and set global.crypto in Node.

## Sanitised Extract
Table of Contents

1 Constructor
2 Configuration API
3 Clone Constructor
4 Static Arithmetic Methods
5 Instance Arithmetic Methods
6 Rounding & Formatting
7 Logarithms & Exponentials
8 Trigonometric & Hyperbolic Methods
9 Utility & Comparison
10 Random & Crypto

1 Constructor
Signature: Decimal(value)  Decimal
Parameters: number|string|Decimal
String formats: decimal, 0x/0X hex, 0b/0B binary, 0o/0O octal; exponents: e/E (decimal), p/P (binary/hex/octal)
Throws on invalid input

2 Configuration API
Decimal.set(configObject)  Decimal constructor
Properties and ranges:
  precision: int 11e9 (default 20)
  rounding: int 08 (default 4)
  toExpNeg: int 9e150 (default 7)
  toExpPos: int 09e15 (default 20)
  minE: int 9e150 (default 9e15)
  maxE: int 09e15 (default 9e15)
  modulo: int 09 (default 1)
  crypto: boolean (default false)
Set defaults: Decimal.set({ defaults: true }) resets all to defaults

3 Clone Constructor
Decimal.clone([configObject])  independent Decimal constructor with own config
Clone with defaults: Decimal.clone({ defaults: true })

4 Static Arithmetic Methods
add(x,y), sub(x,y), mul(x,y), div(x,y), pow(x,y), mod(x,y), max(x,y,...), min(x,y,...), sum(x,y,...), hypot(x,y,...)
Parameters: number|string|Decimal, return Decimal rounded to precision significant digits using rounding mode

5 Instance Arithmetic Methods
y = x.plus(y), x.minus(y), x.times(y), x.dividedBy(y), x.pow(y), x.mod(y), x.sqrt(), x.cbrt(), x.sum(...)
Immutable, chainable, return new Decimal

6 Rounding & Formatting
x.round(), x.ceil(), x.floor(), x.trunc()
x.toDP(dp, rm), x.toFixed(dp, rm), x.toExponential(dp, rm), x.toPrecision(sd, rm), x.toSD(sd, rm)
  dp: integer decimal places, rm: rounding mode 08

7 Logarithms & Exponentials
Decimal.log(x, base), log2(x), log10(x), ln(x), exp(x)
x.logarithm(base), x.log2(), x.log10(), x.naturalLogarithm(), x.naturalExponential()
Range/Domain: see static methods

8 Trigonometric & Hyperbolic Methods
sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh
Static: Decimal.sin(x)  Decimal; Instance: x.sin()  Decimal

9 Utility & Comparison
Decimal.abs(x), Decimal.sign(x), Decimal.isDecimal(o)
x.abs(), x.sign(), x.cmp(y), x.eq(y), x.gt(y), x.gte(y), x.lt(y), x.lte(y), x.isFinite(), x.isNaN(), x.isInteger(), x.isZero(), x.isNeg(), x.isPos(), x.dp(), x.sd(includeZeros)

10 Random & Crypto
Decimal.random([dp])  Decimal with 0  value < 1, dp decimal places
If constructor.crypto=true and global crypto available, uses crypto.getRandomValues or crypto.randomBytes, else Math.random
Throws if crypto requested but unavailable

Rounding/Modulo Modes
0 ROUND_UP; 1 ROUND_DOWN; 2 ROUND_CEIL; 3 ROUND_FLOOR; 4 ROUND_HALF_UP; 5 ROUND_HALF_DOWN; 6 ROUND_HALF_EVEN; 7 ROUND_HALF_CEIL; 8 ROUND_HALF_FLOOR; 9 EUCLID

## Original Source
Decimal.js Arbitrary-Precision Arithmetic
https://mikemcl.github.io/decimal.js/

## Digest of DECIMAL_JS

# DECIMAL.JS ARBITRARY-PRECISION ARITHMETIC

## Constructor

Signature: `Decimal(value) ⇒ Decimal`

Parameters:
- value: number|string|Decimal
  - Accepts integers, floats, ±0, ±Infinity, NaN
  - String may use prefixes 0x/0X (hex), 0b/0B (binary), 0o/0O (octal)
  - Decimal and non-decimal strings may include e/E (power-of-ten) or p/P (power-of-two) exponents

Returns: new Decimal instance or throws `DecimalError` on invalid input

Example:
```
new Decimal('0x1.8p-5')  // '0.046875'
```

# Configuration Properties

Set via `Decimal.set(configObject)` or direct assignment

Properties and Defaults:
- precision: integer, 1 to 1e+9, default 20
- rounding: integer, 0 to 8, default 4 (ROUND_HALF_UP)
- toExpNeg: integer, -9e15 to 0, default -7
- toExpPos: integer, 0 to 9e15, default 20
- minE: integer, -9e15 to 0, default -9e15
- maxE: integer, 0 to 9e15, default 9e15
- modulo: integer, 0 to 9, default 1
- crypto: boolean, default false

Enumerated Rounding/Modulo Modes (constructor properties):
```
ROUND_UP = 0
ROUND_DOWN = 1
ROUND_CEIL = 2
ROUND_FLOOR = 3
ROUND_HALF_UP = 4
ROUND_HALF_DOWN = 5
ROUND_HALF_EVEN = 6
ROUND_HALF_CEIL = 7
ROUND_HALF_FLOOR = 8
EUCLID = 9
``` 

# Static Methods

```
Decimal.abs(x)        ⇒ Decimal
Decimal.add(x, y)     ⇒ Decimal
Decimal.sub(x, y)     ⇒ Decimal
Decimal.mul(x, y)     ⇒ Decimal
Decimal.div(x, y)     ⇒ Decimal
Decimal.pow(x, y)     ⇒ Decimal
Decimal.mod(x, y)     ⇒ Decimal
Decimal.max(x, y,...) ⇒ Decimal
Decimal.min(x, y,...) ⇒ Decimal
Decimal.log(x, [base]) ⇒ Decimal
Decimal.log2(x)       ⇒ Decimal
Decimal.log10(x)      ⇒ Decimal
Decimal.exp(x)        ⇒ Decimal
Decimal.sqrt(x)       ⇒ Decimal
Decimal.cbrt(x)       ⇒ Decimal
Decimal.sin(x)        ⇒ Decimal
Decimal.cos(x)        ⇒ Decimal
Decimal.tan(x)        ⇒ Decimal
Decimal.asin(x)       ⇒ Decimal
Decimal.acos(x)       ⇒ Decimal
Decimal.atan(x)       ⇒ Decimal
Decimal.sinh(x)       ⇒ Decimal
Decimal.cosh(x)       ⇒ Decimal
Decimal.tanh(x)       ⇒ Decimal
Decimal.asinh(x)      ⇒ Decimal
Decimal.acosh(x)      ⇒ Decimal
Decimal.atanh(x)      ⇒ Decimal
Decimal.random([dp])  ⇒ Decimal
Decimal.set(config)   ⇒ Decimal constructor
Decimal.clone([config]) ⇒ Decimal constructor
Decimal.noConflict()  ⇒ original Decimal constructor
Decimal.isDecimal(o)  ⇒ boolean
Decimal.sign(x)       ⇒ number
Decimal.sum(x, y,...) ⇒ Decimal
Decimal.hypot(x, y,...) ⇒ Decimal
Decimal.clamp(min, max) ⇒ Decimal
```

# Instance Methods

Inherited from constructor prototype, immutable, return new instances

```
abs()           ⇒ Decimal
plus(x)         ⇒ Decimal
minus(x)        ⇒ Decimal
times(x)        ⇒ Decimal
dividedBy(x)    ⇒ Decimal
pow(x)          ⇒ Decimal
mod(x)          ⇒ Decimal
max(x,...)      ⇒ Decimal
min(x,...)      ⇒ Decimal
log(x)          ⇒ Decimal
ln()            ⇒ Decimal
log2()          ⇒ Decimal
log10()         ⇒ Decimal
exp()           ⇒ Decimal
sqrt()          ⇒ Decimal
cbrt()          ⇒ Decimal
sin()           ⇒ Decimal
cos()           ⇒ Decimal
tan()           ⇒ Decimal
asin()          ⇒ Decimal
acos()          ⇒ Decimal
atan()          ⇒ Decimal
sinh()          ⇒ Decimal
cosh()          ⇒ Decimal
tanh()          ⇒ Decimal
asinh()         ⇒ Decimal
acosh()         ⇒ Decimal
atanh()         ⇒ Decimal
round()         ⇒ Decimal
ceil()          ⇒ Decimal
floor()         ⇒ Decimal
trunc()         ⇒ Decimal
toDP(dp, rm)    ⇒ Decimal
toFixed(dp, rm) ⇒ string
toExponential(dp, rm) ⇒ string
toPrecision(sd, rm)  ⇒ string
toSD(sd, rm)    ⇒ Decimal
toString()      ⇒ string
toNumber()      ⇒ number
valueOf()       ⇒ string
toJSON()        ⇒ string
cmp(x)          ⇒ number
eq(x)           ⇒ boolean
gt(x), gte(x), lt(x), lte(x) ⇒ boolean
isFinite(), isNaN(), isInteger(), isZero(), isNeg(), isPos() ⇒ boolean
decimalPlaces() ⇒ number
precision([includeZeros]) ⇒ number
sign()          ⇒ number
clampedTo(min, max) ⇒ Decimal
```

# Default Configuration Example

```
Decimal.set({
  precision: 20,
  rounding: 4,
  toExpNeg: -7,
  toExpPos: 21,
  minE: -9e15,
  maxE: 9e15,
  modulo: 1,
  crypto: false
})
```

# Date Retrieved
2024-06-XX

# Attribution
Content from https://mikemcl.github.io/decimal.js/  Data Size: 13874875 bytes

## Attribution
- Source: Decimal.js Arbitrary-Precision Arithmetic
- URL: https://mikemcl.github.io/decimal.js/
- License: License: MIT
- Crawl Date: 2025-05-10T02:57:26.225Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
