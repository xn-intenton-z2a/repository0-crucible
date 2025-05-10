# DECIMALJS

## Crawl Summary
Constructor Decimal(value:number|string|Decimal): supports arbitrary-length, ±0, ±Infinity, NaN; string prefixes 0x/0b/0o; exponential e/E (decimal), p/P (binary/hex/octal). Configuration via Decimal.set({ precision:1..1e9, rounding:0..8, toExpNeg:-9e15..0, toExpPos:0..9e15, minE:-9e15..0, maxE:0..9e15, modulo:0..9, crypto:true|false, defaults:true|false }). Defaults: precision=20, rounding=4, toExpNeg=-7, toExpPos=20, minE=-9e15, maxE=9e15, modulo=1, crypto=false. Rounding modes enumerated 0–8 as per BigDecimal; EUCLID=9 for modulo. Static methods: abs(x), add(x,y), sub(x,y), mul(x,y), div(x,y), pow(x,y), sqrt(x), log(x[,base]), ln(x), exp(x), random([dp]), atan2(y,x), hypot(...), clamp(min,max), clone([cfg]), set(cfg), noConflict(), isDecimal(obj). Instance methods mirror static: x.abs(), x.plus(y), x.minus(y), x.times(y), x.dividedBy(y), x.dividedToIntegerBy(y), x.modulo(y), x.pow(y), x.sqrt(), x.ln(), x.log(base), x.exp(), x.sin()/cos()/tan()/asin()/acos()/atan(), x.sinh()/cosh()/tanh()/asinh()/acosh()/atanh(), x.round()/ceil()/floor()/trunc(), x.toDecimalPlaces(dp,rm)/toSignificantDigits(sd,rm)/toExponential(dp)/toFixed(dp)/toPrecision(sd)/toNearest(x,rm). Unrounded: abs, ceil, floor, negated, round, toDP, toNearest, trunc. Underflow/overflow: below minE=0, above maxE=Infinity. Signed zero and NaN handling match JavaScript.

## Normalised Extract
Table of Contents
1 Constructor
2 Configuration Settings
3 Rounding Modes
4 Static Methods
5 Instance Methods
6 Random Number Generation

1 Constructor
 Signature: Decimal(value) → Decimal
 value: number | string | Decimal
 Supports integer or float of any length, ±0, ±Infinity, NaN
 String prefixes: 0x/0X (hex), 0b/0B (binary), 0o/0O (octal)
 Exponential notation: e/E (decimal), p/P (binary/hex/octal)
 Throws on invalid input

2 Configuration Settings
 Use: Decimal.set(cfg) → Decimal constructor
 cfg properties:
  precision: integer 1..1e9         default 20
  rounding: integer 0..8           default 4
  toExpNeg: integer -9e15..0       default -7
  toExpPos: integer 0..9e15        default 20
  minE: integer -9e15..0           default -9e15
  maxE: integer 0..9e15            default 9e15
  modulo: integer 0..9             default 1
  crypto: boolean                  default false
  defaults: boolean                resets unspecified to defaults when true
 Throws DecimalError on invalid values

3 Rounding Modes
 0 ROUND_UP        away from zero
 1 ROUND_DOWN      towards zero
 2 ROUND_CEIL      towards +Infinity
 3 ROUND_FLOOR     towards -Infinity
 4 ROUND_HALF_UP   nearest; ties away from zero
 5 ROUND_HALF_DOWN nearest; ties towards zero
 6 ROUND_HALF_EVEN nearest; ties to even
 7 ROUND_HALF_CEIL nearest; ties towards +Infinity
 8 ROUND_HALF_FLOOR nearest; ties towards -Infinity
 9 EUCLID          modulo: always positive remainder

4 Static Methods
 abs(x) → Decimal
 add(x,y) → Decimal
 sub(x,y) → Decimal
 mul(x,y) → Decimal
 div(x,y) → Decimal
 pow(x,y) → Decimal
 sqrt(x) → Decimal
 log(x[,base]) → Decimal (base default 10)
 ln(x) → Decimal
 exp(x) → Decimal
 atan2(y,x) → Decimal
 hypot(x,y,...) → Decimal
 clamp(min,max) → Decimal
 isDecimal(obj) → boolean
 clone([cfg]) → Decimal constructor
 set(cfg) → Decimal constructor
 noConflict() → Decimal constructor (browsers)
 random([dp]) → Decimal (dp 0..1e9)

5 Instance Methods
 x.abs()                     → Decimal
 x.plus(y) / x.add(y)        → Decimal
 x.minus(y) / x.sub(y)       → Decimal
 x.times(y) / x.mul(y)       → Decimal
 x.dividedBy(y) / x.div(y)   → Decimal
 x.dividedToIntegerBy(y) / x.divToInt(y) → Decimal
 x.modulo(y) / x.mod(y)      → Decimal
 x.pow(y) / x.toPower(y)     → Decimal
 x.sqrt() / x.squareRoot()   → Decimal
 x.ln() / x.naturalLogarithm() → Decimal
 x.log([base]) / x.logarithm(base) → Decimal
 x.exp() / x.naturalExponential() → Decimal
 x.sin(), x.cos(), x.tan(), x.asin(), x.acos(), x.atan() → Decimal
 x.sinh(), x.cosh(), x.tanh(), x.asinh(), x.acosh(), x.atanh() → Decimal
 x.round(), x.ceil(), x.floor(), x.trunc() → Decimal (no precision rounding)
 x.toDecimalPlaces(dp,rm), x.toFixed(dp), x.toExponential(dp), x.toPrecision(sd), x.toSignificantDigits(sd,rm), x.toNearest(x,rm)

6 Random Number Generation
 random([dp]) returns pseudo-random Decimal ≥0 <1 with dp decimal places
 If constructor.crypto=true and global crypto.getRandomValues or crypto.randomBytes present, uses cryptographically-secure source; otherwise Math.random
 Throws if crypto=true but no crypto source available
 Default dp = current precision


## Supplementary Details
Installation and Imports
 npm install decimal.js
 CommonJS: const Decimal = require('decimal.js')
 ESM: import Decimal from 'decimal.js'

Creating Independent Constructors
 const D1 = Decimal.clone({ precision:50 })
 // equivalent to:
 const D2 = Decimal.clone()
 D2.set({ precision:50 })

Global crypto in Node.js
 const crypto = require('crypto')
 global.crypto = crypto
 Decimal.set({ crypto:true })

Implementation Steps
 1 import or require Decimal
 2 configure global settings via Decimal.set or direct assignment
 3 create instances via new Decimal(value) or Decimal(value)
 4 perform operations: x = new Decimal(1); y = x.dividedBy(3).plus(0.1)
 5 convert to string or number: x.toString(), x.toNumber()

Configuration Best Practices
 • Always validate values using Decimal.set to catch invalid configurations
 • Use independent constructors for different precision contexts
 • Reset defaults via Decimal.set({ defaults:true }) before custom settings

Precision and Performance
 • Methods that return Decimal round to 'precision' except specific unrounded methods
 • Logarithm and exponential methods degrade exponentially with increased precision
 • Increase LN10 constant precision by +25 digits beyond required for >1000-digit ln calculations


## Reference Details
Constructor
 Decimal(value:number|string|Decimal) ⇒ Decimal
 Throws DecimalError on invalid value

Configuration
 Decimal.set(cfg:object) ⇒ DecimalConstructor
 cfg properties types and ranges:
  precision: integer 1..1e9
  rounding: integer 0..8
  toExpNeg: integer -9e15..0
  toExpPos: integer 0..9e15
  minE: integer -9e15..0
  maxE: integer 0..9e15
  modulo: integer 0..9
  crypto: boolean
  defaults: boolean
 Direct assignment allowed but bypasses validation

Static Methods
 abs(x:number|string|Decimal) ⇒ Decimal
 acos(x:number|string|Decimal) ⇒ Decimal
 acosh(x:number|string|Decimal) ⇒ Decimal
 add(x:number|string|Decimal, y:number|string|Decimal) ⇒ Decimal
 asin(x:number|string|Decimal) ⇒ Decimal
 asinh(x:number|string|Decimal) ⇒ Decimal
 atan(x:number|string|Decimal) ⇒ Decimal
 atanh(x:number|string|Decimal) ⇒ Decimal
 atan2(y:number|string|Decimal, x:number|string|Decimal) ⇒ Decimal
 cbrt(x:number|string|Decimal) ⇒ Decimal
 ceil(x:number|string|Decimal) ⇒ Decimal
 clamp(min:number|string|Decimal, max:number|string|Decimal) ⇒ Decimal
 clone(object?:object) ⇒ DecimalConstructor
 cos(x:number|string|Decimal) ⇒ Decimal
 cosh(x:number|string|Decimal) ⇒ Decimal
 div(x:number|string|Decimal, y:number|string|Decimal) ⇒ Decimal
 exp(x:number|string|Decimal) ⇒ Decimal
 floor(x:number|string|Decimal) ⇒ Decimal
 hypot(...args:(number|string|Decimal)[]) ⇒ Decimal
 ln(x:number|string|Decimal) ⇒ Decimal
 log(x:number|string|Decimal, base?:number|string|Decimal) ⇒ Decimal
 log2(x:number|string|Decimal) ⇒ Decimal
 log10(x:number|string|Decimal) ⇒ Decimal
 max(...args:(number|string|Decimal)[]) ⇒ Decimal
 min(...args:(number|string|Decimal)[]) ⇒ Decimal
 mod(x:number|string|Decimal, y:number|string|Decimal) ⇒ Decimal
 mul(x:number|string|Decimal, y:number|string|Decimal) ⇒ Decimal
 noConflict() ⇒ DecimalConstructor
 pow(x:number|string|Decimal, y:number|string|Decimal) ⇒ Decimal
 random(dp?:number) ⇒ Decimal
 round(x:number|string|Decimal) ⇒ Decimal
 set(object:object) ⇒ DecimalConstructor
 sign(x:number|string|Decimal) ⇒ number
 sin(x:number|string|Decimal) ⇒ Decimal
 sinh(x:number|string|Decimal) ⇒ Decimal
 sqrt(x:number|string|Decimal) ⇒ Decimal
 sub(x:number|string|Decimal, y:number|string|Decimal) ⇒ Decimal
 sum(...args:(number|string|Decimal)[]) ⇒ Decimal
 tan(x:number|string|Decimal) ⇒ Decimal
 tanh(x:number|string|Decimal) ⇒ Decimal
 trunc(x:number|string|Decimal) ⇒ Decimal

Instance Methods
 See Static Methods without the first argument; returns new Decimal or boolean/number

Conversion Methods
 toDecimalPlaces(dp:number, rm?:number) ⇒ Decimal
 toSignificantDigits(sd:number, rm?:number) ⇒ Decimal
 toExponential(dp?:number) ⇒ string
 toFixed(dp?:number) ⇒ string
 toPrecision(sd?:number) ⇒ string
 toNearest(x:Decimal|number|string, rm?:number) ⇒ Decimal
 toBinary() ⇒ string
 toOctal() ⇒ string
 toHexadecimal() ⇒ string
 toFraction(maxDenominator?:number) ⇒ [numerator:Decimal, denominator:Decimal]
 toJSON() ⇒ string
 toString() ⇒ string
 toNumber() ⇒ number
 valueOf() ⇒ number

Configuration Options Effects
 precision sets max significant digits of results
 rounding sets default rounding mode
 toExpNeg/toExpPos control string exponential thresholds
 minE/maxE define underflow/overflow exponent limits
 modulo selects remainder calculation mode
 crypto enables secure random source for random()

Best Practices
 • Use clone() to isolate settings
 • Reset to defaults before batch operations
 • Limit precision to needed digits to reduce computation cost

Troubleshooting Procedures
 • Invalid configuration: run Decimal.set({ precision:0 }) to reproduce error; expected: throws DecimalError: Invalid argument: precision: 0
 • Crypto random failure: set crypto:true without global.crypto; expected: throws Error: crypto.getRandomValues or crypto.randomBytes not available
 • Precision loss: verify use of .round(), .toDP(), .toSD() for final rounding
 • Exponent range errors: new Decimal('1e10000000000000000') → 'Infinity' if >maxE


## Information Dense Extract
Constructor: Decimal(value:number|string|Decimal), supports ±0,±Infinity,NaN,string prefixes 0x/0b/0o,exp e/E (decimal),p/P (binary/hex/octal). Config: Decimal.set({precision:1–1e9,rounding:0–8,toExpNeg:-9e15–0,toExpPos:0–9e15,minE:-9e15–0,maxE:0–9e15,modulo:0–9,crypto:boolean,defaults:boolean}), defaults:precision=20,rounding=4,toExpNeg=-7,toExpPos=20,minE=-9e15,maxE=9e15,modulo=1,crypto=false. Rounding modes:0=UP,1=DOWN,2=CEIL,3=FLOOR,4=HALF_UP,5=HALF_DOWN,6=HALF_EVEN,7=HALF_CEIL,8=HALF_FLOOR,9=EUCLID. Static Methods: abs,acos,acosh,add,asin,asinh,atan,atanh,atan2,cbrt,ceil,clamp,clone,cos,cosh,div,exp,floor,hypot,ln,log,log2,log10,max,min,mod,mul,noConflict,pow,random,round,set,sign,sin,sinh,sqrt,sub,sum,tan,tanh,trunc. Instance Methods: x.methodName(...) alias static without first arg; unrounded:abs,ceil,floor,negated,round,toDecimalPlaces,toNearest,trunc. Random(dp):dp decimal places, uses crypto or Math.random, throws if crypto true but no source. Underflow: exponent<minE returns '0'; overflow: exponent>maxE returns 'Infinity'. Signed zero preserved. Conversion: toFixed, toExponential, toPrecision, toDecimalPlaces, toSignificantDigits, toFraction. Best practices: isolate via clone, reset defaults, limit precision. Troubleshooting: DecimalError on invalid config, crypto errors, overflow/underflow checks.

## Sanitised Extract
Table of Contents
1 Constructor
2 Configuration Settings
3 Rounding Modes
4 Static Methods
5 Instance Methods
6 Random Number Generation

1 Constructor
 Signature: Decimal(value)  Decimal
 value: number | string | Decimal
 Supports integer or float of any length, 0, Infinity, NaN
 String prefixes: 0x/0X (hex), 0b/0B (binary), 0o/0O (octal)
 Exponential notation: e/E (decimal), p/P (binary/hex/octal)
 Throws on invalid input

2 Configuration Settings
 Use: Decimal.set(cfg)  Decimal constructor
 cfg properties:
  precision: integer 1..1e9         default 20
  rounding: integer 0..8           default 4
  toExpNeg: integer -9e15..0       default -7
  toExpPos: integer 0..9e15        default 20
  minE: integer -9e15..0           default -9e15
  maxE: integer 0..9e15            default 9e15
  modulo: integer 0..9             default 1
  crypto: boolean                  default false
  defaults: boolean                resets unspecified to defaults when true
 Throws DecimalError on invalid values

3 Rounding Modes
 0 ROUND_UP        away from zero
 1 ROUND_DOWN      towards zero
 2 ROUND_CEIL      towards +Infinity
 3 ROUND_FLOOR     towards -Infinity
 4 ROUND_HALF_UP   nearest; ties away from zero
 5 ROUND_HALF_DOWN nearest; ties towards zero
 6 ROUND_HALF_EVEN nearest; ties to even
 7 ROUND_HALF_CEIL nearest; ties towards +Infinity
 8 ROUND_HALF_FLOOR nearest; ties towards -Infinity
 9 EUCLID          modulo: always positive remainder

4 Static Methods
 abs(x)  Decimal
 add(x,y)  Decimal
 sub(x,y)  Decimal
 mul(x,y)  Decimal
 div(x,y)  Decimal
 pow(x,y)  Decimal
 sqrt(x)  Decimal
 log(x[,base])  Decimal (base default 10)
 ln(x)  Decimal
 exp(x)  Decimal
 atan2(y,x)  Decimal
 hypot(x,y,...)  Decimal
 clamp(min,max)  Decimal
 isDecimal(obj)  boolean
 clone([cfg])  Decimal constructor
 set(cfg)  Decimal constructor
 noConflict()  Decimal constructor (browsers)
 random([dp])  Decimal (dp 0..1e9)

5 Instance Methods
 x.abs()                      Decimal
 x.plus(y) / x.add(y)         Decimal
 x.minus(y) / x.sub(y)        Decimal
 x.times(y) / x.mul(y)        Decimal
 x.dividedBy(y) / x.div(y)    Decimal
 x.dividedToIntegerBy(y) / x.divToInt(y)  Decimal
 x.modulo(y) / x.mod(y)       Decimal
 x.pow(y) / x.toPower(y)      Decimal
 x.sqrt() / x.squareRoot()    Decimal
 x.ln() / x.naturalLogarithm()  Decimal
 x.log([base]) / x.logarithm(base)  Decimal
 x.exp() / x.naturalExponential()  Decimal
 x.sin(), x.cos(), x.tan(), x.asin(), x.acos(), x.atan()  Decimal
 x.sinh(), x.cosh(), x.tanh(), x.asinh(), x.acosh(), x.atanh()  Decimal
 x.round(), x.ceil(), x.floor(), x.trunc()  Decimal (no precision rounding)
 x.toDecimalPlaces(dp,rm), x.toFixed(dp), x.toExponential(dp), x.toPrecision(sd), x.toSignificantDigits(sd,rm), x.toNearest(x,rm)

6 Random Number Generation
 random([dp]) returns pseudo-random Decimal 0 <1 with dp decimal places
 If constructor.crypto=true and global crypto.getRandomValues or crypto.randomBytes present, uses cryptographically-secure source; otherwise Math.random
 Throws if crypto=true but no crypto source available
 Default dp = current precision

## Original Source
Decimal.js Arbitrary-Precision Arithmetic
https://mikemcl.github.io/decimal.js/

## Digest of DECIMALJS

# Decimal.js Arbitrary-Precision API

# Date: 2024-06-01

Data Size: 13874875 bytes
Links Found: 21129

# Constructor

Decimal(value) → Decimal
value: number|string|Decimal
Supports arbitrary-length integer or float, ±0, ±Infinity, NaN
String input may use prefixes 0x/0X (hex), 0b/0B (binary), 0o/0O (octal)
Exponential notation: e/E for decimal, p/P for binary/hex/octal
Throws on invalid value
Examples:
  new Decimal(9)               // '9'
  new Decimal('4.321e+4')      // '43210'
  new Decimal('-0b10110100.1') // '-180.5'

# Configuration Properties

Decimal.set(object) → Decimal constructor
object may include:
  precision: integer 1..1e+9       Default: 20
  rounding: integer 0..8           Default: 4 (ROUND_HALF_UP)
  toExpNeg: integer -9e+15..0      Default: -7
  toExpPos: integer 0..9e+15       Default: 20
  minE: integer -9e+15..0          Default: -9e+15
  maxE: integer 0..9e+15           Default: 9e+15
  modulo: integer 0..9              Default: 1 (ROUND_DOWN)
  crypto: boolean                  Default: false
  defaults: boolean                If true, reset unspecified to defaults
Throws DecimalError on invalid values

# Rounding Modes (constructor properties)

ROUND_UP        0   Rounds away from zero
ROUND_DOWN      1   Rounds towards zero
ROUND_CEIL      2   Rounds towards Infinity
ROUND_FLOOR     3   Rounds towards -Infinity
ROUND_HALF_UP   4   Nearest; ties away from zero
ROUND_HALF_DOWN 5   Nearest; ties towards zero
ROUND_HALF_EVEN 6   Nearest; ties to even
ROUND_HALF_CEIL 7   Nearest; ties towards Infinity
ROUND_HALF_FLOOR8   Nearest; ties towards -Infinity
EUCLID          9   Not rounding mode; modulo mode: always positive remainder

# Static Methods

abs(x) → Decimal
add(x,y) → Decimal
sub(x,y) → Decimal
mul(x,y) → Decimal
div(x,y) → Decimal
pow(x,y) → Decimal
sqrt(x) → Decimal
log(x[,base]) → Decimal      Base default 10
ln(x) → Decimal             Natural logarithm (base e)
exp(x) → Decimal            Natural exponential
random([dp]) → Decimal      dp: integer 0..1e+9
atan2(y,x) → Decimal        Returns angle in radians between y and x
hypot(x,y,...) → Decimal    Square root of sum of squares
clamp(min,max) → Decimal    Clamps value to [min,max]
noConflict() → DecimalConstructor  Browsers only
clone([object]) → DecimalConstructor  Independent constructor
isDecimal(object) → boolean

# Instance Methods (alias → canonical)

absoluteValue or abs() → Decimal
plus or add(x) → Decimal
minus or sub(x) → Decimal
times or mul(x) → Decimal
dividedBy or div(x) → Decimal
dividedToIntegerBy or divToInt(x) → Decimal
modulo or mod(x) → Decimal
pow or toPower(x) → Decimal
sqrt or squareRoot() → Decimal
ln or naturalLogarithm() → Decimal
log or logarithm(base) → Decimal
exp or naturalExponential() → Decimal
sin,cos,tan,asin,acos,atan each → Decimal
sinh,cosh,tanh,asinh,acosh,atanh each → Decimal
round(), ceil(), floor(), trunc() → Decimal (unaffected by precision setting)
toDecimalPlaces or toDP(dp,rm) → Decimal
toSignificantDigits or toSD(sd,rm) → Decimal
toExponential(dp) → string
toFixed(dp) → string
toPrecision(sd) → string
toNearest(x,rm) → Decimal

# Zero, NaN & Infinity Handling

Underflow below minE → zero
Overflow above maxE → Infinity
Signed zeros retained: distinct +0 and -0
NaN propagated


## Attribution
- Source: Decimal.js Arbitrary-Precision Arithmetic
- URL: https://mikemcl.github.io/decimal.js/
- License: License: MIT
- Crawl Date: 2025-05-10T09:46:25.209Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
