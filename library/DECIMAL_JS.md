# DECIMAL_JS

## Crawl Summary
Constructor Decimal(value) ⇒ Decimal instance; Static methods: abs, add, sub, mul, div, pow, sqrt, random, set, clone, noConflict; Instance methods: abs, plus, minus, times, div, pow, sqrt, round, trunc, toDP, toSD, toNumber; Configuration props: precision (1–1e9, default 20), rounding (0–8, default 4), minE (-9e15–0, default -9e15), maxE (0–9e15, default 9e15), toExpNeg (-9e15–0, default -7), toExpPos (0–9e15, default 21), modulo (0–9, default 1), crypto (boolean, default false); Rounding modes codes 0–8, 9 for EUCLID; Errors: DecimalError thrown on invalid input.

## Normalised Extract
Table of Contents:
1 Constructor
2 Static Methods
3 Instance Methods
4 Configuration Properties
5 Rounding Modes
6 Error Handling

1 Constructor
Decimal(value) ⇒ Decimal
value: number|string|Decimal
Returns new Decimal instance or throws DecimalError
Binary: 0b or 0B, Hex: 0x or 0X, Octal: 0o or 0O, Exponential: e/E (decimal), p/P (non-decimal)

2 Static Methods
abs(x) ⇒ Decimal
add(x,y) ⇒ Decimal
sub(x,y) ⇒ Decimal
mul(x,y) ⇒ Decimal
div(x,y) ⇒ Decimal
pow(x,y) ⇒ Decimal
sqrt(x) ⇒ Decimal
random([dp]) ⇒ Decimal  dp: integer 0–1e9
to generate pseudo-random 0 ≤ value < 1
set(config) ⇒ Decimal constructor
clone([config]) ⇒ new Decimal constructor
noConflict() ⇒ original Decimal constructor

3 Instance Methods
x.abs() ⇒ Decimal
x.plus(y) ⇒ Decimal
x.minus(y) ⇒ Decimal
x.times(y) ⇒ Decimal
x.div(y) ⇒ Decimal
x.pow(y) ⇒ Decimal
x.sqrt() ⇒ Decimal
x.round() ⇒ Decimal
x.trunc() ⇒ Decimal
x.toDP(dp[,rm]) ⇒ Decimal  rm: rounding mode
x.toSD(sd[,rm]) ⇒ Decimal
x.toNumber() ⇒ number
x.valueOf() ⇒ string
x.toString() ⇒ string
Equality & Comparison
eq, cmp, lt, lte, gt, gte, isZero, isNaN, isFinite, isInteger, isNeg, isPos

4 Configuration Properties (via Decimal.set or direct assignment)
precision: integer 1–1e9, default=20
rounding: integer 0–8, default=4
toExpNeg: integer -9e15–0, default=-7
toExpPos: integer 0–9e15, default=21
maxE: integer 0–9e15, default=9e15
minE: integer -9e15–0, default=-9e15
modulo: integer 0–9, default=1 (ROUND_DOWN)
crypto: boolean, default=false

5 Rounding Modes
0: ROUND_UP; 1: ROUND_DOWN; 2: ROUND_CEIL; 3: ROUND_FLOOR; 4: ROUND_HALF_UP; 5: ROUND_HALF_DOWN; 6: ROUND_HALF_EVEN; 7: ROUND_HALF_CEIL; 8: ROUND_HALF_FLOOR; 9: EUCLID (modulo only)

6 Error Handling
DecimalError thrown on invalid constructor input or invalid set config parameters.

## Supplementary Details
Configuration steps:
Decimal.set({ precision:50, rounding:2, toExpNeg:-5, toExpPos:10, maxE:500, minE:-500, modulo:3, crypto:true })
Decimal.precision = 50  // bypasses validation
Decimal.crypto = true
Clone separate config:
MyDecimal = Decimal.clone({ precision:30, defaults:true })
MyDecimal.set({ rounding:0 })
Random with crypto:
global.crypto = require('crypto')
Decimal.set({ crypto:true })
Decimal.random(10) 

Type conversions:
x.toNumber() ⇒ JS number
x.toString() ⇒ string representation obeying toExpNeg/toExpPos
x.toDP(dp, rm) ⇒ fixed dp places
x.toExponential(dp, rm) ⇒ exponential notation
x.toFixed(dp, rm) ⇒ fixed-point
x.toPrecision(sd, rm) ⇒ significant digits

Modulus modes (modulo property):
0: remainder positive if dividend negative; 1: truncating; 3: floor; 6: IEEE754; 9: Euclid

Instance property access:
x.digits ⇒ significant digits count
x.e ⇒ exponent
x.s ⇒ sign (+1 or -1)


## Reference Details
Constructor:
new Decimal(value: number|string|Decimal) ⇒ Decimal
Throws: DecimalError

Static Methods:
Decimal.abs(x: number|string|Decimal) ⇒ Decimal
Decimal.add(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
Decimal.sub(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
Decimal.mul(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
Decimal.div(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
Decimal.pow(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
Decimal.sqrt(x: number|string|Decimal) ⇒ Decimal
Decimal.random(dp?: number) ⇒ Decimal
Decimal.set(config: { precision?: number; rounding?: number; toExpNeg?: number; toExpPos?: number; maxE?: number; minE?: number; modulo?: number; crypto?: boolean; defaults?: boolean }) ⇒ this
Decimal.clone(config?: object) ⇒ DecimalConstructor
Decimal.noConflict() ⇒ DecimalConstructor

Instance Methods:
abs(): Decimal
plus(y: number|string|Decimal): Decimal
minus(y: number|string|Decimal): Decimal
times(y: number|string|Decimal): Decimal
div(y: number|string|Decimal): Decimal
pow(y: number|string|Decimal): Decimal
sqrt(): Decimal
round(): Decimal
trunc(): Decimal
toDP(dp: number, rm?: number): Decimal
toSD(sd: number, rm?: number): Decimal
toNumber(): number
toString(): string
eq(y: number|string|Decimal): boolean
cmp(y: number|string|Decimal): number
lt(y): boolean; lte; gt; gte; isZero(): boolean; isNaN(): boolean; isFinite(): boolean; isInteger(): boolean; isNeg(): boolean; isPos(): boolean

Code Examples:
// Set up
Decimal.set({ precision: 10, rounding: Decimal.ROUND_HALF_EVEN })
// Arithmetic
let a = new Decimal(0.1).plus(0.2)   // '0.3'
let b = Decimal.mul('1.234', 3)       // '3.702'
// Trigonometry
let pi = new Decimal('3.14159265358979323846')
let c = pi.div(2).sin()               // '1'
// Rounding
let d = new Decimal('1.23456789').toDP(4)  // '1.2346'
// Random
Decimal.set({ crypto:true })
Decimal.random(16)                   // cryptographically secure 16 dp random

Best Practices:
Always call Decimal.set once at startup for global config.  
For thread safety in Node.js, create clones for independent configs.  
Use toDP or toSD instead of round for explicit control over decimal places or significant digits.  
Prefer Decimal.add(x,y) over new Decimal(x).plus(y) for one-off operations.

Troubleshooting:
Command: Decimal.set({ precision:0 })
Expected: throws DecimalError: Invalid argument: precision: 0
If silent failure: verify use of Decimal.set vs direct assignment.
Node.js crypto error:
if Decimal.random with crypto:true and no global.crypto: throws Error: crypto unavailable
Fix: global.crypto = require('crypto')



## Information Dense Extract
Decimal.js: arbitrary-precision Decimal type. Constructor: new Decimal(value:number|string|Decimal). Static: abs(x), add(x,y), sub(x,y), mul(x,y), div(x,y), pow(x,y), sqrt(x), random(dp?), set(config), clone(cfg), noConflict(). Config keys: precision(1–1e9,d=20), rounding(0–8,d=4), toExpNeg(-9e15–0,d=-7), toExpPos(0–9e15,d=21), maxE(0–9e15,d=9e15), minE(-9e15–0,d=-9e15), modulo(0–9,d=1), crypto(bool,d=false). Rounding modes: 0–8,9=EUCLID. Instance: x.abs(), plus(), minus(), times(), div(), pow(), sqrt(), round(), trunc(), toDP(dp,rm), toSD(sd,rm), toNumber(), toString(), eq(), cmp(), lt/lte/gt/gte, isZero(), isNaN(), isFinite(), isInteger(), isNeg(), isPos(). Errors: DecimalError on invalid inputs. Examples: Decimal.set({precision:10}); a=new Decimal(0.1).plus(0.2);//'0.3'. global.crypto=require('crypto'); Decimal.set({crypto:true}); Decimal.random(16).

## Sanitised Extract
Table of Contents:
1 Constructor
2 Static Methods
3 Instance Methods
4 Configuration Properties
5 Rounding Modes
6 Error Handling

1 Constructor
Decimal(value)  Decimal
value: number|string|Decimal
Returns new Decimal instance or throws DecimalError
Binary: 0b or 0B, Hex: 0x or 0X, Octal: 0o or 0O, Exponential: e/E (decimal), p/P (non-decimal)

2 Static Methods
abs(x)  Decimal
add(x,y)  Decimal
sub(x,y)  Decimal
mul(x,y)  Decimal
div(x,y)  Decimal
pow(x,y)  Decimal
sqrt(x)  Decimal
random([dp])  Decimal  dp: integer 01e9
to generate pseudo-random 0  value < 1
set(config)  Decimal constructor
clone([config])  new Decimal constructor
noConflict()  original Decimal constructor

3 Instance Methods
x.abs()  Decimal
x.plus(y)  Decimal
x.minus(y)  Decimal
x.times(y)  Decimal
x.div(y)  Decimal
x.pow(y)  Decimal
x.sqrt()  Decimal
x.round()  Decimal
x.trunc()  Decimal
x.toDP(dp[,rm])  Decimal  rm: rounding mode
x.toSD(sd[,rm])  Decimal
x.toNumber()  number
x.valueOf()  string
x.toString()  string
Equality & Comparison
eq, cmp, lt, lte, gt, gte, isZero, isNaN, isFinite, isInteger, isNeg, isPos

4 Configuration Properties (via Decimal.set or direct assignment)
precision: integer 11e9, default=20
rounding: integer 08, default=4
toExpNeg: integer -9e150, default=-7
toExpPos: integer 09e15, default=21
maxE: integer 09e15, default=9e15
minE: integer -9e150, default=-9e15
modulo: integer 09, default=1 (ROUND_DOWN)
crypto: boolean, default=false

5 Rounding Modes
0: ROUND_UP; 1: ROUND_DOWN; 2: ROUND_CEIL; 3: ROUND_FLOOR; 4: ROUND_HALF_UP; 5: ROUND_HALF_DOWN; 6: ROUND_HALF_EVEN; 7: ROUND_HALF_CEIL; 8: ROUND_HALF_FLOOR; 9: EUCLID (modulo only)

6 Error Handling
DecimalError thrown on invalid constructor input or invalid set config parameters.

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMAL_JS

# Decimal.js API   
Retrieved: 2024-06-20   
Data Size: 13874875 bytes   
Source: https://mikemcl.github.io/decimal.js/   

# Constructor

Decimal(value) ⇒ Decimal instance
Parameters:
  • value: number | string | Decimal. Accepts integer, float, ±0, ±Infinity, NaN. Strings may be decimal, binary (0b), hexadecimal (0x), octal (0o), with optional exponential notation (e/E for decimal, p/P for non-decimal).
Throws on invalid value.

Examples:
  x = new Decimal(9)        // '9'
  x = new Decimal('4.321e+4') // '43210'
  x = new Decimal('-0b10110100.1') // '-180.5'

# Static Methods & Aliases

abs(x) ⇒ Decimal               // alias of Decimal.prototype.abs
add(x,y) ⇒ Decimal             // alias of plus
sub(x,y) ⇒ Decimal             // alias of minus
mul(x,y) ⇒ Decimal             // alias of times
div(x,y) ⇒ Decimal             // alias of dividedBy
pow(x,y) ⇒ Decimal             // alias of toPower
sqrt(x) ⇒ Decimal             // alias of squareRoot
random([dp]) ⇒ Decimal         // dp: integer 0–1e9 (decimal places)
set(config) ⇒ Decimal constructor   
clone([config]) ⇒ new Decimal constructor
noConflict() ⇒ original Decimal constructor (browsers)

# Instance Methods & Aliases

x.abs() ⇒ Decimal               // absoluteValue
x.plus(y) ⇒ Decimal             // plus
x.minus(y) ⇒ Decimal            // minus
x.times(y) ⇒ Decimal            // times
x.div(y) ⇒ Decimal              // dividedBy
x.pow(y) ⇒ Decimal              // toPower
x.sqrt() ⇒ Decimal              // squareRoot
x.round() ⇒ Decimal             // round
x.trunc() ⇒ Decimal             // truncated
x.toDP(dp[, rm]) ⇒ Decimal      // toDecimalPlaces
x.toSD(sd[, rm]) ⇒ Decimal      // toSignificantDigits
x.toNumber() ⇒ number           

# Configuration Properties & Defaults

precision: integer 1–1e9, default=20
rounding: integer 0–8, default=4 (ROUND_HALF_UP)
minE: integer -9e15–0, default=-9e15
toExpNeg: integer -9e15–0, default=-7
toExpPos: integer 0–9e15, default=21
maxE: integer 0–9e15, default=9e15
modulo: integer 0–9, default=1 (ROUND_DOWN)
crypto: boolean, default=false

# Rounding Modes

0: ROUND_UP        
1: ROUND_DOWN      
2: ROUND_CEIL      
3: ROUND_FLOOR     
4: ROUND_HALF_UP   
5: ROUND_HALF_DOWN 
6: ROUND_HALF_EVEN 
7: ROUND_HALF_CEIL
8: ROUND_HALF_FLOOR
9: EUCLID (modulo only)

# Properties

ddp      // number of significant digits (instance)
eexponent // exponent value (instance)
ssign     // sign (instance)

# Errors

DecimalError on invalid constructor input or set config


## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-10T15:33:28.366Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
