# DECIMALJS

## Crawl Summary
Constructor supports number|string|Decimal with unlimited digits, binary/octal/hex strings, e/E and p/P exponents. Static config via set({precision,rounding,toExpNeg,toExpPos,minE,maxE,modulo,crypto,defaults}); clone() returns independent constructor. Core static methods: abs, add, sub, mul, div, mod, pow, sqrt, log, ln, exp, random. Instance methods mirror static. Defaults: precision=20, rounding=4, toExpNeg=-7, toExpPos=20, minE=-9e15, maxE=9e15, modulo=1, crypto=false. Rounding mode constants 0–8, EUCLID=9. Under/overflow behavior governed by minE/maxE. Crypto random throws if unavailable.

## Normalised Extract
Table of Contents:
 1  Constructor
 2  Configuration
 3  Static Methods
 4  Instance Methods
 5  Properties & Enums
 6  Error & Range Behavior

1  Constructor
   Signature: Decimal(value: number|string|Decimal) ⇒ Decimal
   Supports: ±0, ±Infinity, NaN
   String prefixes: 0b,0o,0x; exponential: e/E (decimal), p/P (non-decimal)

2  Configuration
   Decimal.set({
     precision: 1–1e9 (default 20),
     rounding: 0–8 (default 4),
     toExpNeg: -9e15–0 (default -7),
     toExpPos: 0–9e15 (default 20),
     minE: -9e15–0 (default -9e15),
     maxE: 0–9e15 (default 9e15),
     modulo: 0–9 (default 1),
     crypto: true|false (default false),
     defaults: true|false
   }) ⇒ Decimal constructor
   Decimal.clone(opts?) ⇒ independent constructor

3  Static Methods
   abs(x) ⇒ Decimal
   add(x,y) ⇒ Decimal
   sub(x,y) ⇒ Decimal
   mul(x,y) ⇒ Decimal
   div(x,y) ⇒ Decimal
   mod(x,y) ⇒ Decimal
   pow(x,y) ⇒ Decimal
   sqrt(x) ⇒ Decimal
   log(x,base?) ⇒ Decimal
   ln(x) ⇒ Decimal
   exp(x) ⇒ Decimal
   random(dp?) ⇒ Decimal
   // Others: acos, asin, atan, acosh, asinh, atanh, atan2, cbrt, ceil, floor, clamp, clone, cos, cosh, exp, hypot, isDecimal, log2, log10, max, min, noConflict, round, sign, sin, sinh, tan, tanh, trunc, sum

4  Instance Methods
   plus(x) ⇒ Decimal
   minus(x) ⇒ Decimal
   times(x) ⇒ Decimal
   dividedBy(x) ⇒ Decimal
   modulo(x) ⇒ Decimal
   toPower(x) ⇒ Decimal
   squareRoot() ⇒ Decimal
   logarithm(x?) ⇒ Decimal
   naturalLogarithm() ⇒ Decimal
   naturalExponential() ⇒ Decimal
   toDecimalPlaces(dp, rm?) ⇒ Decimal
   toFixed(dp, rm?) ⇒ string
   toExponential(dp, rm?) ⇒ string
   toPrecision(sd, rm?) ⇒ string
   toString() ⇒ string
   valueOf() ⇒ string
   // Plus aliases: abs, cmp, dp, eq, gt, gte, lt, lte, neg, sd, etc.

5  Properties & Enums
   Constructor properties:
     precision, rounding, toExpNeg, toExpPos, minE, maxE, modulo, crypto
   Rounding constants:
     ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3,
     ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6,
     ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

6  Error & Range Behavior
   Underflow: exponent < minE ⇒ 0
   Overflow: exponent > maxE ⇒ Infinity
   Invalid config ⇒ throws [DecimalError]
   crypto=true without global.crypto ⇒ throws


## Supplementary Details
Configuration Defaults:
  precision=20  rounding=4  toExpNeg=-7  toExpPos=20  minE=-9e15  maxE=9e15  modulo=1  crypto=false
Clone/Isolation:
  const D2 = Decimal.clone({ precision:50 });
  D2.div(3) uses 50-digit precision
Base conversion & exponents:
  new Decimal('0b1.1p-5') ⇒ '0.046875'
  new Decimal('0xFF.Fp+2') ⇒ '1023.75'
Crypto RNG setup (Node.js):
  global.crypto = require('crypto');
  Decimal.set({ crypto:true });


## Reference Details
Constructor
  new Decimal(value: number|string|Decimal) ⇒ Decimal
  Throws DecimalError on invalid value

Static Methods
  abs(x: number|string|Decimal) ⇒ Decimal
  add(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
  sub(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
  mul(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
  div(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
  mod(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
  pow(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
  sqrt(x: number|string|Decimal) ⇒ Decimal
  log(x: number|string|Decimal, base?: number|string|Decimal) ⇒ Decimal
  ln(x: number|string|Decimal) ⇒ Decimal
  exp(x: number|string|Decimal) ⇒ Decimal
  random(dp?: number) ⇒ Decimal
  // … plus acos, asin, atan, acosh, asinh, atanh, atan2, cbrt, ceil, floor, clamp, clone, cos, cosh, exp, hypot, isDecimal, log2, log10, max, min, noConflict, round, set, sign, sin, sinh, tan, tanh, trunc, sum

Instance Methods
  abs() ⇒ Decimal
  plus(x: number|string|Decimal) ⇒ Decimal
  minus(x: number|string|Decimal) ⇒ Decimal
  times(x: number|string|Decimal) ⇒ Decimal
  dividedBy(x: number|string|Decimal) ⇒ Decimal
  modulo(x: number|string|Decimal) ⇒ Decimal
  pow(x: number|string|Decimal) ⇒ Decimal
  squareRoot() ⇒ Decimal
  logarithm(x?: number|string|Decimal) ⇒ Decimal
  naturalLogarithm() ⇒ Decimal
  naturalExponential() ⇒ Decimal
  toDecimalPlaces(dp: number, rm?: number) ⇒ Decimal
  toFixed(dp: number, rm?: number) ⇒ string
  toExponential(dp: number, rm?: number) ⇒ string
  toPrecision(sd: number, rm?: number) ⇒ string
  toString() ⇒ string
  valueOf() ⇒ string
  // … plus aliases: cmp, dp, eq, gt, gte, lt, lte, neg, sd, etc.

Configuration
  Decimal.set({ ... }) ⇒ Decimal constructor
  Decimal.clone(opts?: Object) ⇒ Decimal constructor
  Constants: ROUND_UP=0; ROUND_DOWN=1; ROUND_CEIL=2; ROUND_FLOOR=3; ROUND_HALF_UP=4; ROUND_HALF_DOWN=5; ROUND_HALF_EVEN=6; ROUND_HALF_CEIL=7; ROUND_HALF_FLOOR=8; EUCLID=9

Best Practices
  Use clone to isolate configuration per module
  Always specify rounding mode explicitly for conversions: x.toFixed(10, Decimal.ROUND_DOWN)

Troubleshooting
  Command: node -e "console.log(new Decimal(1).random())"
  Issue: crypto=true without global.crypto ⇒ throws DecimalError
  Fix: global.crypto=require('crypto')

## Information Dense Extract
Decimal(value:number|string|Decimal)->Decimal; supports ±0,±Inf,NaN,string prefixes 0b/0o/0x,e/E,p/P. Decimal.set({precision:1–1e9,rounding:0–8,toExpNeg:-9e15–0,toExpPos:0–9e15,minE:-9e15–0,maxE:0–9e15,modulo:0–9,crypto:boolean,defaults:true}) isolates via clone({…}) or reset. Static methods abs,add,sub,mul,div,mod,pow,sqrt,log(x,base?),ln,exp,random(dp?). Instance methods plus,minus,times,dividedBy,modulo,pow,squareRoot,logarithm, naturalLogarithm,naturalExponential,toDecimalPlaces(dp,rm?),toFixed(dp,rm?),toExponential(dp,rm?),toPrecision(sd,rm?),toString,valueOf. Properties precision=20,rounding=4(to 0–8),toExpNeg=-7,toExpPos=20,minE=-9e15,maxE=9e15,modulo=1,crypto=false; constants ROUND_UP=0,…,EUCLID=9. Underflow<minE->0 Overflow>maxE->Inf. Common usage: Decimal.set({precision:50,rounding:Decimal.ROUND_HALF_EVEN}); let r=new Decimal('0.1').plus('0.2'); // '0.3'. Node crypto: global.crypto=require('crypto'); Decimal.set({crypto:true}).

## Sanitised Extract
Table of Contents:
 1  Constructor
 2  Configuration
 3  Static Methods
 4  Instance Methods
 5  Properties & Enums
 6  Error & Range Behavior

1  Constructor
   Signature: Decimal(value: number|string|Decimal)  Decimal
   Supports: 0, Infinity, NaN
   String prefixes: 0b,0o,0x; exponential: e/E (decimal), p/P (non-decimal)

2  Configuration
   Decimal.set({
     precision: 11e9 (default 20),
     rounding: 08 (default 4),
     toExpNeg: -9e150 (default -7),
     toExpPos: 09e15 (default 20),
     minE: -9e150 (default -9e15),
     maxE: 09e15 (default 9e15),
     modulo: 09 (default 1),
     crypto: true|false (default false),
     defaults: true|false
   })  Decimal constructor
   Decimal.clone(opts?)  independent constructor

3  Static Methods
   abs(x)  Decimal
   add(x,y)  Decimal
   sub(x,y)  Decimal
   mul(x,y)  Decimal
   div(x,y)  Decimal
   mod(x,y)  Decimal
   pow(x,y)  Decimal
   sqrt(x)  Decimal
   log(x,base?)  Decimal
   ln(x)  Decimal
   exp(x)  Decimal
   random(dp?)  Decimal
   // Others: acos, asin, atan, acosh, asinh, atanh, atan2, cbrt, ceil, floor, clamp, clone, cos, cosh, exp, hypot, isDecimal, log2, log10, max, min, noConflict, round, sign, sin, sinh, tan, tanh, trunc, sum

4  Instance Methods
   plus(x)  Decimal
   minus(x)  Decimal
   times(x)  Decimal
   dividedBy(x)  Decimal
   modulo(x)  Decimal
   toPower(x)  Decimal
   squareRoot()  Decimal
   logarithm(x?)  Decimal
   naturalLogarithm()  Decimal
   naturalExponential()  Decimal
   toDecimalPlaces(dp, rm?)  Decimal
   toFixed(dp, rm?)  string
   toExponential(dp, rm?)  string
   toPrecision(sd, rm?)  string
   toString()  string
   valueOf()  string
   // Plus aliases: abs, cmp, dp, eq, gt, gte, lt, lte, neg, sd, etc.

5  Properties & Enums
   Constructor properties:
     precision, rounding, toExpNeg, toExpPos, minE, maxE, modulo, crypto
   Rounding constants:
     ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3,
     ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6,
     ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

6  Error & Range Behavior
   Underflow: exponent < minE  0
   Overflow: exponent > maxE  Infinity
   Invalid config  throws [DecimalError]
   crypto=true without global.crypto  throws

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMALJS

# Decimal.js API Reference (retrieved 2024-06-25)

## Constructor

Decimal(value: number | string | Decimal) ⇒ Decimal
- Accepts integer, float, ±0, ±Infinity, NaN
- String supports binary (0b…), octal (0o…), hex (0x…) prefixes
- Exponential: e/E for base-10, p/P for base-2 (non-decimal)
- Throws on invalid value

## Static Configuration

### Decimal.set(config: Object) ⇒ Decimal constructor
- precision: integer 1–1e9 (default 20)
- rounding: 0–8 (default 4 = ROUND_HALF_UP)
- toExpNeg: integer -9e15–0 (default -7)
- toExpPos: integer 0–9e15 (default 20)
- minE: integer -9e15–0 (default -9e15)
- maxE: integer 0–9e15 (default 9e15)
- modulo: integer 0–9 (default 1 = ROUND_DOWN)
- crypto: boolean (default false)
- defaults: true resets unspecified to defaults

### Decimal.clone(options?: Object) ⇒ Decimal constructor
- Clone current constructor with its settings or override via options
- If options.defaults=true resets to library defaults

## Static Methods (signatures)

abs(x) ⇒ Decimal         // absolute value
add(x, y) ⇒ Decimal      // plus
sub(x, y) ⇒ Decimal      // minus
mul(x, y) ⇒ Decimal      // times
div(x, y) ⇒ Decimal      // dividedBy
mod(x, y) ⇒ Decimal      // modulo
pow(x, y) ⇒ Decimal      // toPower
sqrt(x) ⇒ Decimal        // squareRoot
log(x, base?) ⇒ Decimal  // logarithm (base 10 default)
ln(x) ⇒ Decimal          // naturalLogarithm
exp(x) ⇒ Decimal         // naturalExponential
random(dp?) ⇒ Decimal    // pseudo-random [0,1)
… (see full API below)

## Instance Methods (signatures)

plus(x) ⇒ Decimal
minus(x) ⇒ Decimal
times(x) ⇒ Decimal
dividedBy(x) ⇒ Decimal
modulo(x) ⇒ Decimal
pow(x) ⇒ Decimal
sqrt() ⇒ Decimal
logarithm(base?) ⇒ Decimal
naturalLogarithm() ⇒ Decimal
naturalExponential() ⇒ Decimal
… (see full API below)

## Properties & Enumerations

precision, rounding, toExpNeg, toExpPos, minE, maxE, modulo, crypto
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3,
ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6,
ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

## Code Examples

// Set precision and rounding
Decimal.set({ precision: 50, rounding: Decimal.ROUND_HALF_EVEN });
// Basic operations
let a = new Decimal('0.1').plus('0.2'); // '0.3'
let r = Decimal.random(10);             // e.g. '0.1234567890'

## Error Handling & Limits

- Underflow to zero at exponent < minE
- Overflow to Infinity at exponent > maxE
- Invalid set properties throw [DecimalError]
- crypto=true without global.crypto ⇒ throws

## Attribution
Source: https://mikemcl.github.io/decimal.js/  (Data size: 13.9 MB, Links: 21129)

## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-10T23:03:32.073Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
