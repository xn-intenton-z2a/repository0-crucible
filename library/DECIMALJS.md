# DECIMALJS

## Crawl Summary
Constructor signature: Decimal(value:number|string|Decimal) ⇒ Decimal supports decimal, binary, hex, octal strings with e/E and p/P exponent notation. Configuration via Decimal.set({precision:1–1e9=20, rounding:0–8=4, toExpNeg:-9e15–0=-7, toExpPos:0–9e15=20, minE:-9e15=default, maxE:9e15, modulo:0–9=1, crypto:false}). Clone via Decimal.clone([object]). Static methods (abs, add, sub, mul, div, pow, sqrt, cbrt, round, floor, ceil, clamp, random(dp), log, log2, log10, exp, ln, max, min, atan2, trigonometric, hyperbolic). Instance methods same aliases plus comparison (cmp, eq, gt etc.) and conversion (toString, toNumber, toFixed, toExponential, toDP, toPrecision, toSD, toBinary, toHex, toOctal, toFraction, toNearest, toJSON). Properties and defaults, rounding mode constants.

## Normalised Extract
Table of Contents:
1  Constructor and Value Types
2  Configuration & Cloning
3  Core Arithmetic Methods
4  Random Number Generation
5  Trigonometric & Hyperbolic Functions
6  Logarithm & Exponential Functions
7  Comparison Methods
8  Conversion & Formatting Methods
9  Properties & Rounding Modes

1  Constructor and Value Types
Signature: Decimal(value) ⇒ Decimal
Parameters: value: number|string|Decimal
Supports: decimal, binary (0b/0B), hexadecimal (0x/0X), octal (0o/0O); exponential notation 'e'/'E' for decimal, 'p'/'P' for non-decimal
Throws: DecimalError on invalid value

2  Configuration & Cloning
Decimal.set(object) ⇒ this
object properties:
  precision: integer 1–1e9 (default 20)
  rounding: integer 0–8 (default 4)
  toExpNeg: integer -9e15–0 (default -7)
  toExpPos: integer 0–9e15 (default 20)
  minE: integer -9e15–0 (default -9e15)
  maxE: integer 0–9e15 (default 9e15)
  modulo: integer 0–9 (default 1)
  crypto: boolean (default false)
  defaults: boolean (true resets to defaults)
Decimal.clone([object]) ⇒ new Decimal constructor

3  Core Arithmetic Methods
Static and instance:
  abs(x) / x.abs()
  add(x,y) / x.plus(y)
  sub(x,y) / x.minus(y)
  mul(x,y) / x.times(y)
  div(x,y) / x.dividedBy(y)
  pow(x,y) / x.pow(y)
  sqrt(x) / x.sqrt()
  cbrt(x) / x.cbrt()
  round(x) / x.round()
  floor(x) / x.floor()
  ceil(x) / x.ceil()
  clamp(min,max) / x.clampedTo(min,max)

4  Random Number Generation
Signature: Decimal.random([dp]) ⇒ Decimal
dp: integer 0–1e9 inclusive (default current precision)
crypto: if true and global.crypto available uses crypto.getRandomValues or crypto.randomBytes; else Math.random; throws if crypto=true but no crypto API

5  Trigonometric & Hyperbolic Functions
sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh with x: number|string|Decimal, returns Decimal rounded to precision with rounding mode; domain & range per standard

6  Logarithm & Exponential Functions
log(x[,base]) / x.log(base), default base=10; log2, log10; exp, ln; returns correctly rounded except naturalLogarithm limited to ~1000 digits

7  Comparison Methods
cmp(x)/comparedTo(x) ⇒ -1|0|1|NaN; eq/equals(x) ⇒ boolean; gt,gte,lt,lte,isFinite(),isNaN(),isZero(),isNeg()/isNegative(),isPos()/isPositive(),isInt()/isInteger()

8  Conversion & Formatting Methods
toString(), toNumber(), toFixed(dp), toExponential(dp), toDecimalPlaces(dp, rm), toPrecision(sd, rm), toSignificantDigits(sd, rm), toBinary(), toHexadecimal(), toOctal(), toFraction(maxDenominator), toNearest(step, rm), toJSON()

9  Properties & Rounding Modes
Decimal.precision, rounding, toExpNeg, toExpPos, minE, maxE, modulo, crypto
Rounding mode constants: ROUND_UP(0), ROUND_DOWN(1), ROUND_CEIL(2), ROUND_FLOOR(3), ROUND_HALF_UP(4), ROUND_HALF_DOWN(5), ROUND_HALF_EVEN(6), ROUND_HALF_CEIL(7), ROUND_HALF_FLOOR(8), EUCLID(9)


## Supplementary Details
Configuration defaults and valid ranges
  precision: integer ∈ [1,1e9], default 20
  rounding: integer ∈ [0,8], default 4 (ROUND_HALF_UP)
  toExpNeg: integer ∈ [-9e15,0], default -7
  toExpPos: integer ∈ [0,9e15], default 20
  minE: integer ∈ [-9e15,0], default -9e15
  maxE: integer ∈ [0,9e15], default 9e15
  modulo: integer ∈ [0,9], default 1 (ROUND_DOWN behavior)
  crypto: boolean, default false

Configuring crypto in Node.js:
  global.crypto = require('crypto')
  Decimal.set({ crypto: true })
  Throws DecimalError if crypto API missing when crypto=true

Cloning constructors:
  const D1 = Decimal.clone()
  const D2 = D1.clone({ precision:50 })
  functions shared; separate settings

Error handling:
  Decimal.set({ precision:0 }) throws DecimalError: "Invalid argument: precision: 0"
  new Decimal('invalid') throws DecimalError: "Invalid argument: value"

## Reference Details
API Specifications:

Constructor:
Signature: Decimal(value: number|string|Decimal) ⇒ Decimal
Throws: DecimalError on invalid value

Decimal.set(config: object) ⇒ this
Throws: DecimalError on invalid property or value
Properties of config:
  precision: integer[1,1e9]
  rounding: integer[0,8]
  toExpNeg: integer[-9e15,0]
  toExpPos: integer[0,9e15]
  minE: integer[-9e15,0]
  maxE: integer[0,9e15]
  modulo: integer[0,9]
  crypto: boolean
  defaults: boolean

Decimal.clone(config?: object) ⇒ DecimalConstructor

Static Methods:
abs(x: number|string|Decimal): Decimal
acos(x: number|string|Decimal): Decimal
acosh(x: number|string|Decimal): Decimal
add(x: number|string|Decimal, y: number|string|Decimal): Decimal
asin(x: number|string|Decimal): Decimal
asinh(x: number|string|Decimal): Decimal
atan(x: number|string|Decimal): Decimal
atanh(x: number|string|Decimal): Decimal
atan2(y: number|string|Decimal, x: number|string|Decimal): Decimal
cbrt(x: number|string|Decimal): Decimal
ceil(x: number|string|Decimal): Decimal
clamp(min: number|string|Decimal, max: number|string|Decimal): Decimal
div(x: number|string|Decimal, y: number|string|Decimal): Decimal
exp(x: number|string|Decimal): Decimal
floor(x: number|string|Decimal): Decimal
hypot(...values: Array<number|string|Decimal>): Decimal
ln(x: number|string|Decimal): Decimal
log(x: number|string|Decimal, base?: number|string|Decimal): Decimal
log2(x: number|string|Decimal): Decimal
log10(x: number|string|Decimal): Decimal
max(...values: Array<number|string|Decimal>): Decimal
min(...values: Array<number|string|Decimal>): Decimal
mod(x: number|string|Decimal, y: number|string|Decimal): Decimal
mul(x: number|string|Decimal, y: number|string|Decimal): Decimal
noConflict(): DecimalConstructor
pow(x: number|string|Decimal, y: number|string|Decimal): Decimal
random(dp?: number): Decimal
round(x: number|string|Decimal): Decimal
sign(x: number|string|Decimal): number
sin(x: number|string|Decimal): Decimal
sinh(x: number|string|Decimal): Decimal
sqrt(x: number|string|Decimal): Decimal
sub(x: number|string|Decimal, y: number|string|Decimal): Decimal
sum(...values: Array<number|string|Decimal>): Decimal
tan(x: number|string|Decimal): Decimal
tanh(x: number|string|Decimal): Decimal
trunc(x: number|string|Decimal): Decimal
set(object: object): DecimalConstructor

Instance Methods:
absoluteValue(): Decimal
acos(): Decimal
acosh(): Decimal
add(x: number|string|Decimal): Decimal
asin(): Decimal
asinh(): Decimal
atan(): Decimal
atanh(): Decimal
atan2(x: number|string|Decimal): Decimal
cbrt(): Decimal
ceil(): Decimal
clampedTo(min: number|string|Decimal, max: number|string|Decimal): Decimal
cmp(x: number|string|Decimal): number
dp(): number
div(x: number|string|Decimal): Decimal
divToInt(x: number|string|Decimal): Decimal
eq(x: number|string|Decimal): boolean
floor(): Decimal
gt(x: number|string|Decimal): boolean
gte(x: number|string|Decimal): boolean
hypot(...values: Array<number|string|Decimal>): Decimal
isDecimal(object: any): boolean
isFinite(): boolean
isInt(): boolean
isNaN(): boolean
isNeg(): boolean
isPos(): boolean
isZero(): boolean
log(x?: number|string|Decimal): Decimal
minus(x: number|string|Decimal): Decimal
mod(x: number|string|Decimal): Decimal
neg(): Decimal
plus(x: number|string|Decimal): Decimal
sd(includeZeros?: boolean): number
sin(): Decimal
sinh(): Decimal
sqrt(): Decimal
tan(): Decimal
tanh(): Decimal
toBinary(): string
toDecimalPlaces(dp: number, rm?: number): string
toExponential(dp?: number): string
toFixed(dp?: number): string
toFraction(maxDenominator?: number): [Decimal, Decimal]
toHexadecimal(dp?: number): string
toJSON(): string
toNearest(step: number|string|Decimal, rm?: number): Decimal
toNumber(): number
toOctal(dp?: number): string
toPower(exp: number|string|Decimal): Decimal
toPrecision(sd?: number, rm?: number): string
toSD(sd?: number, rm?: number): string
toString(): string
trunc(): Decimal
valueOf(): string

Configuration Patterns:
  require('decimal.js') ⇒ Decimal
  global.crypto = require('crypto'); Decimal.set({crypto:true}); Decimal.random(10)

Best Practices:
  Always set precision before heavy operations: Decimal.set({precision:50})
  Use separate clones for independent configs
  For cryptographic randomness, enable crypto and load global.crypto

Troubleshooting:
  Error "Invalid argument: precision: 0": use valid precision range 1–1e9
  "crypto undefined" when crypto=true: set global.crypto in Node.js
  Incorrect logarithm rounding beyond 1000 digits: increase LN10 precision in source or reduce required digits

## Information Dense Extract
Decimal(value:number|string|Decimal)->Decimal; supports decimal,binary,hex,octal,exp notation; errors on invalid. Config via set({precision:1–1e9=20,rounding:0–8=4,toExpNeg:-9e15–0=-7, toExpPos:0–9e15=20,minE:-9e15,maxE:9e15,modulo:0–9=1,crypto:false}); clone with clone([config]). Static methods: abs,acos,acosh,add,asin,asinh,atan,atanh,atan2,cbrt,ceil,clamp,div,exp,floor,hypot,ln,log,log2,log10,max,min,mod,mul,noConflict,pow,random,round,sign,sin,sinh,sqrt,sub,sum,tan,tanh,trunc. Instance methods mirror static with short names plus cmp,eq,gt,gte,lt,lte,isFinite,isNaN,isZero,isNeg,isPos,isInt,dp,sd,toString,toNumber,toFixed,toExponential,toDecimalPlaces,toPrecision,toSD,toBinary,toHexadecimal,toOctal,toFraction,toNearest,toJSON,toPower. Properties: Decimal.precision,rounding,toExpNeg,toExpPos,minE,maxE,modulo,crypto. Rounding constants: ROUND_UP(0),ROUND_DOWN(1),ROUND_CEIL(2),ROUND_FLOOR(3),ROUND_HALF_UP(4),ROUND_HALF_DOWN(5),ROUND_HALF_EVEN(6),ROUND_HALF_CEIL(7),ROUND_HALF_FLOOR(8),EUCLID(9).

## Sanitised Extract
Table of Contents:
1  Constructor and Value Types
2  Configuration & Cloning
3  Core Arithmetic Methods
4  Random Number Generation
5  Trigonometric & Hyperbolic Functions
6  Logarithm & Exponential Functions
7  Comparison Methods
8  Conversion & Formatting Methods
9  Properties & Rounding Modes

1  Constructor and Value Types
Signature: Decimal(value)  Decimal
Parameters: value: number|string|Decimal
Supports: decimal, binary (0b/0B), hexadecimal (0x/0X), octal (0o/0O); exponential notation 'e'/'E' for decimal, 'p'/'P' for non-decimal
Throws: DecimalError on invalid value

2  Configuration & Cloning
Decimal.set(object)  this
object properties:
  precision: integer 11e9 (default 20)
  rounding: integer 08 (default 4)
  toExpNeg: integer -9e150 (default -7)
  toExpPos: integer 09e15 (default 20)
  minE: integer -9e150 (default -9e15)
  maxE: integer 09e15 (default 9e15)
  modulo: integer 09 (default 1)
  crypto: boolean (default false)
  defaults: boolean (true resets to defaults)
Decimal.clone([object])  new Decimal constructor

3  Core Arithmetic Methods
Static and instance:
  abs(x) / x.abs()
  add(x,y) / x.plus(y)
  sub(x,y) / x.minus(y)
  mul(x,y) / x.times(y)
  div(x,y) / x.dividedBy(y)
  pow(x,y) / x.pow(y)
  sqrt(x) / x.sqrt()
  cbrt(x) / x.cbrt()
  round(x) / x.round()
  floor(x) / x.floor()
  ceil(x) / x.ceil()
  clamp(min,max) / x.clampedTo(min,max)

4  Random Number Generation
Signature: Decimal.random([dp])  Decimal
dp: integer 01e9 inclusive (default current precision)
crypto: if true and global.crypto available uses crypto.getRandomValues or crypto.randomBytes; else Math.random; throws if crypto=true but no crypto API

5  Trigonometric & Hyperbolic Functions
sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh with x: number|string|Decimal, returns Decimal rounded to precision with rounding mode; domain & range per standard

6  Logarithm & Exponential Functions
log(x[,base]) / x.log(base), default base=10; log2, log10; exp, ln; returns correctly rounded except naturalLogarithm limited to ~1000 digits

7  Comparison Methods
cmp(x)/comparedTo(x)  -1|0|1|NaN; eq/equals(x)  boolean; gt,gte,lt,lte,isFinite(),isNaN(),isZero(),isNeg()/isNegative(),isPos()/isPositive(),isInt()/isInteger()

8  Conversion & Formatting Methods
toString(), toNumber(), toFixed(dp), toExponential(dp), toDecimalPlaces(dp, rm), toPrecision(sd, rm), toSignificantDigits(sd, rm), toBinary(), toHexadecimal(), toOctal(), toFraction(maxDenominator), toNearest(step, rm), toJSON()

9  Properties & Rounding Modes
Decimal.precision, rounding, toExpNeg, toExpPos, minE, maxE, modulo, crypto
Rounding mode constants: ROUND_UP(0), ROUND_DOWN(1), ROUND_CEIL(2), ROUND_FLOOR(3), ROUND_HALF_UP(4), ROUND_HALF_DOWN(5), ROUND_HALF_EVEN(6), ROUND_HALF_CEIL(7), ROUND_HALF_FLOOR(8), EUCLID(9)

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMALJS

# Constructor

Decimal(value) ⇒ Decimal

Parameters:
  value: number | string | Decimal

Description:
  Creates a new immutable Decimal instance. Accepts integer, float (±0), ±Infinity, or NaN. Unlimited digits subject to JavaScript array limits and processing time. Strings may use decimal, binary (0b/0B), hexadecimal (0x/0X), or octal (0o/0O) notation. Exponential notation: 'e'/'E' for decimal, 'p'/'P' for non-decimal.

Examples:
  new Decimal(9)                       // '9'
  new Decimal('0xff.8')                // '255.5'
  new Decimal('-0b101.1')              // '-5.5'

# Configuration & Cloning

Decimal.set(object) ⇒ Decimal constructor

Properties of object:
  precision: integer 1 to 1e+9 (default 20)
  rounding: integer 0 to 8 (default 4)
  toExpNeg: integer -9e15 to 0 (default -7)
  toExpPos: integer 0 to 9e15 (default 20)
  minE: integer -9e15 to 0 (default -9e15)
  maxE: integer 0 to 9e15 (default 9e15)
  modulo: integer 0 to 9 (default 1)
  crypto: boolean (default false)
  defaults: boolean (true resets unspecified props to defaults)

Examples:
  Decimal.set({ precision: 50, rounding: Decimal.ROUND_CEIL })
  Decimal.set({ defaults: true })

Decimal.clone([object]) ⇒ independent Decimal constructor
  object: optional config object as for set or { defaults: true }

Examples:
  const Decimal9 = Decimal.clone({ precision: 9 })
  Decimal9.div(1, 3)                  // '0.333333333'

# Static Methods

abs(x) ⇒ Decimal
add(x, y) ⇒ Decimal
sub(x, y) ⇒ Decimal
mul(x, y) ⇒ Decimal
div(x, y) ⇒ Decimal
pow(x, y) ⇒ Decimal
sqrt(x) ⇒ Decimal
cbrt(x) ⇒ Decimal
round(x) ⇒ Decimal
floor(x) ⇒ Decimal
ceil(x) ⇒ Decimal
clamp(min, max) ⇒ Decimal
random([dp]) ⇒ Decimal (0 ≤ result < 1)
log(x [, base]) ⇒ Decimal
log2(x) ⇒ Decimal
log10(x) ⇒ Decimal
exp(x) ⇒ Decimal
ln(x) ⇒ Decimal
max(x, y, …) ⇒ Decimal
min(x, y, …) ⇒ Decimal
atan2(y, x) ⇒ Decimal
# … plus trigonometric and hyperbolic functions

# Instance Methods

x.abs() ⇒ Decimal   alias of absoluteValue
x.plus(y) ⇒ Decimal   alias of add
x.minus(y) ⇒ Decimal  alias of sub
x.times(y) ⇒ Decimal  alias of mul
x.dividedBy(y) ⇒ Decimal  alias of div
x.pow(y) ⇒ Decimal    alias of toPower
x.sqrt() ⇒ Decimal    alias of squareRoot
x.cbrt() ⇒ Decimal
x.round() ⇒ Decimal
x.floor() ⇒ Decimal
x.ceil() ⇒ Decimal
x.clampedTo(min, max) ⇒ Decimal
x.random([dp]) ⇒ Decimal
x.log(y) ⇒ Decimal
x.log2() ⇒ Decimal
x.log10() ⇒ Decimal
x.exp() ⇒ Decimal
x.ln() ⇒ Decimal
x.max(y, z, …) ⇒ Decimal
x.min(y, z, …) ⇒ Decimal
x.atan2(x) ⇒ Decimal
# … trigonometric, inverse, hyperbolic, comparison, conversion methods

# Properties & Modes

Decimal.precision, Decimal.rounding, Decimal.toExpNeg, Decimal.toExpPos, Decimal.minE, Decimal.maxE, Decimal.modulo, Decimal.crypto

Rounding mode constants:
  ROUND_UP (0), ROUND_DOWN (1), ROUND_CEIL (2), ROUND_FLOOR (3), ROUND_HALF_UP (4), ROUND_HALF_DOWN (5), ROUND_HALF_EVEN (6), ROUND_HALF_CEIL (7), ROUND_HALF_FLOOR (8), EUCLID (9)


## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-10T22:37:43.853Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
