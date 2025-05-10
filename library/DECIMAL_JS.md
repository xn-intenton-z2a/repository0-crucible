# DECIMAL_JS

## Crawl Summary
Constructor: Decimal(value: number|string|Decimal)⇒Decimal; supports ±0, ±Infinity, NaN, decimal/binary/octal/hex with prefixes, exponential notation with e/E or p/P; throws on invalid value or exponent outside [minE,maxE]. Configuration via Decimal.set({precision:1–1e9=20, rounding:0–8=4, minE:–9e15=–9e15, maxE:0–9e15=9e15, toExpNeg:–9e15=–7, toExpPos:0–9e15=20, modulo:0–9=1, crypto:false}); direct assignment bypasses validation. Static methods: abs, acos, acosh, add(x,y), asin, asinh, atan, atanh, atan2(y,x): range [–π,π], cbrt, ceil, clamp, clone(config), cos, cosh, div, exp, floor, hypot, ln, log, log2, log10, max, min, mod, mul, noConflict, pow, random(dp), round, set(config), sign, sin, sinh, sqrt, sub, sum, tan, tanh, trunc. Instance methods: absoluteValue, abs, ceil, cmp, clamp, cos, cosh, div, exp, floor, ln, log, mod, mul, neg, plus, pow, round, sin, sqrt, sub, toFixed, toExponential, toPrecision, toSignificantDigits, toDP, toHex, toOctal, toString, valueOf, etc. Constants: ROUND_UP=0,…,EUCLID=9. Errors: DecimalError. Zero, NaN, ±Infinity follow JS semantics.

## Normalised Extract
Table of Contents
1  Constructor
2  Configuration
3  Static Methods
4  Instance Methods
5  Constants
6  Errors & Special Values

1  Constructor
Signature: Decimal(value: number|string|Decimal)⇒Decimal
Valid value: integer or float including ±0, ±Infinity, NaN; string may be decimal, binary (0b/0B), octal (0o/0O), hexadecimal (0x/0X); exponential notation uses e/E for decimal, p/P for non-decimal; unlimited digits apart from JS array size and processing time; exponent must be between minE and maxE; throws DecimalError on invalid input.

2  Configuration
Method: Decimal.set(object)⇒DecimalConstructor
Properties:
  precision: 1–1e9, default 20
  rounding: 0–8, default 4
  minE: –9e15–0, default –9e15
  maxE: 0–9e15, default 9e15
  toExpNeg: –9e15–0, default –7
  toExpPos: 0–9e15, default 20
  modulo: 0–9, default 1
  crypto: boolean, default false
  defaults: boolean flag to reset unspecified to defaults
Throws DecimalError on invalid property values.
Direct assignment: Decimal.precision=40 (no validation).
Clone: Decimal.clone([object])⇒DecimalConstructor; clone copies or applies object settings; object.defaults=true resets to defaults then applies other properties.

3  Static Methods
abs(x)⇒Decimal | acos(x)⇒Decimal | acosh(x)⇒Decimal | add(x,y)⇒Decimal | asin(x)⇒Decimal | asinh(x)⇒Decimal | atan(x)⇒Decimal | atanh(x)⇒Decimal | atan2(y,x)⇒Decimal (Range –π to π) | cbrt(x)⇒Decimal | ceil(x)⇒Decimal | clamp(min,max)⇒Decimal | clone([object])⇒DecimalConstructor | cos(x)⇒Decimal | cosh(x)⇒Decimal | div(x,y)⇒Decimal | exp(x)⇒Decimal | floor(x)⇒Decimal | hypot([x,y,…])⇒Decimal | ln(x)⇒Decimal | log(x[,base])⇒Decimal | log2(x)⇒Decimal | log10(x)⇒Decimal | max(x[,y,…])⇒Decimal | min(x[,y,…])⇒Decimal | mod(x,y)⇒Decimal | mul(x,y)⇒Decimal | noConflict()⇒DecimalConstructor | pow(base,exp)⇒Decimal | random([dp])⇒Decimal | round(x)⇒Decimal | set(object)⇒DecimalConstructor | sign(x)⇒number (1,–1,0,–0,NaN) | sin(x)⇒Decimal | sinh(x)⇒Decimal | sqrt(x)⇒Decimal | sub(x,y)⇒Decimal | sum(x[,y,…])⇒Decimal | tan(x)⇒Decimal | tanh(x)⇒Decimal | trunc(x)⇒Decimal

4  Instance Methods
absoluteValue()⇒Decimal | abs()⇒Decimal | ceil()⇒Decimal | cmp(x)⇒number | clamp(min,max)⇒Decimal | cos()⇒Decimal | cosh()⇒Decimal | div(x)⇒Decimal | divToInt(x)⇒Decimal | eq(x)⇒boolean | floor()⇒Decimal | gt(x)⇒boolean | gte(x)⇒boolean | sinh()⇒Decimal | sin()⇒Decimal | log(x)⇒Decimal | ln()⇒Decimal | minus(x)⇒Decimal | mod(x)⇒Decimal | exp()⇒Decimal | neg()⇒Decimal | plus(x)⇒Decimal | sd([includeZeros])⇒number | round()⇒Decimal | toDP(dp[,rm])⇒Decimal | toHex()⇒string | toPower(exp)⇒Decimal | toSD(sd[,rm])⇒Decimal | toString()⇒string | toPrecision(sd[,rm])⇒string | toFixed(dp[,rm])⇒string | toExponential(dp[,rm])⇒string | toNearest(step[,rm])⇒Decimal | valueOf()⇒string | etc.

5  Constants
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3, ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6, ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

6  Errors & Special Values
DecimalError: invalid constructor or set arguments; ±0 has sign bit; NaN; ±Infinity

## Supplementary Details
Default configuration object for Decimal constructor:
 precision:20
 rounding:4 (ROUND_HALF_UP)
 toExpNeg:-7
 toExpPos:20
 maxE:9e15
 minE:-9e15
 modulo:1
 crypto:false

Usage patterns:
 • Require via npm: const Decimal=require('decimal.js');
 • Browser: <script src='decimal.min.js'></script>
 • Global crypto in Node.js: global.crypto=require('crypto');
 • For independent settings: const D9=Decimal.clone({precision:9}); D9.div(1,3)=>0.333333333
 • Restore defaults: Decimal.set({defaults:true});
 • Reset one property: Decimal.set({precision:50, defaults:true});

Error handling:
 • Invalid precision: DecimalError: Invalid argument: precision: 0
 • Missing crypto: if crypto=true and no global crypto, Decimal.random() throws Exception

Precision limits:
 • Trigonometric methods limited by Pi constant precision (see source)
 • naturalLogarithm accurate up to 1000 digits; LN10 constant precision 1025 digits; increase LN10 precision in source for >1000 digits

Range behaviors:
 • Underflow to zero when exponent < minE
 • Overflow to Infinity when exponent > maxE

## Reference Details
Class: Decimal
Constructor: new Decimal(value: number|string|Decimal) ⇒ Decimal
 Throws: DecimalError
Properties (static): precision:number, rounding:number, minE:number, maxE:number, toExpNeg:number, toExpPos:number, modulo:number, crypto:boolean
Constants: Decimal.ROUND_UP = 0
           Decimal.ROUND_DOWN = 1
           Decimal.ROUND_CEIL = 2
           Decimal.ROUND_FLOOR = 3
           Decimal.ROUND_HALF_UP = 4
           Decimal.ROUND_HALF_DOWN = 5
           Decimal.ROUND_HALF_EVEN = 6
           Decimal.ROUND_HALF_CEIL = 7
           Decimal.ROUND_HALF_FLOOR = 8
           Decimal.EUCLID = 9

Static Methods:
 abs(x: number|string|Decimal) ⇒ Decimal
 acos(x: number|string|Decimal) ⇒ Decimal
 acosh(x: number|string|Decimal) ⇒ Decimal
 add(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
 atan2(y: number|string|Decimal, x: number|string|Decimal) ⇒ Decimal
 random(dp?: number) ⇒ Decimal throws if crypto=true and no secure source
 set(config: { precision?:number, rounding?:number, toExpNeg?:number, toExpPos?:number, minE?:number, maxE?:number, modulo?:number, crypto?:boolean, defaults?:boolean }) ⇒ DecimalConstructor
 clone(config?:object) ⇒ DecimalConstructor
 noConflict() ⇒ DecimalConstructor (browser only)

Instance Methods:
 plus(x: number|string|Decimal) ⇒ Decimal
 minus(x: number|string|Decimal) ⇒ Decimal
 times(x: number|string|Decimal) ⇒ Decimal
 div(x: number|string|Decimal) ⇒ Decimal
 divToInt(x: number|string|Decimal) ⇒ Decimal
 mod(x: number|string|Decimal) ⇒ Decimal
 pow(exp: number|string|Decimal) ⇒ Decimal
 sqrt() ⇒ Decimal
 cbrt() ⇒ Decimal
 ln() ⇒ Decimal
 log(base?: number|string|Decimal) ⇒ Decimal
 log2() ⇒ Decimal
 log10() ⇒ Decimal
 exp() ⇒ Decimal
 sin() ⇒ Decimal
 cos() ⇒ Decimal
 tan() ⇒ Decimal
 sinh() ⇒ Decimal
 cosh() ⇒ Decimal
 tanh() ⇒ Decimal
 asin() ⇒ Decimal
 acos() ⇒ Decimal
 atan() ⇒ Decimal
 asinh() ⇒ Decimal
 acosh() ⇒ Decimal
 atanh() ⇒ Decimal
 abs() ⇒ Decimal
 neg() ⇒ Decimal
 cmp(x: number|string|Decimal) ⇒ number
 eq(x: number|string|Decimal) ⇒ boolean
 gt(x: number|string|Decimal) ⇒ boolean
 gte(x: number|string|Decimal) ⇒ boolean
 lt(x: number|string|Decimal) ⇒ boolean
 lte(x: number|string|Decimal) ⇒ boolean
 isFinite() ⇒ boolean
 isNaN() ⇒ boolean
 isZero() ⇒ boolean
 isPos() ⇒ boolean
 isNeg() ⇒ boolean
 precision(includeZeros?:boolean) ⇒ number
 toString() ⇒ string
 toNumber() ⇒ number
 toJSON() ⇒ string
 toFixed(dp: number, rm?: number) ⇒ string
 toExponential(dp: number, rm?: number) ⇒ string
 toPrecision(sd: number, rm?: number) ⇒ string
 toSignificantDigits(sd: number, rm?: number) ⇒ Decimal
 toDecimalPlaces(dp: number, rm?: number) ⇒ Decimal
 toHex() ⇒ string
 toOctal() ⇒ string
 toBinary() ⇒ string
 toFraction(maxDenominator?: number) ⇒ [Decimal, Decimal]
 toNearest(step: number|string|Decimal, rm?: number) ⇒ Decimal
 valueOf() ⇒ string

Usage Examples:
 const { Decimal } = require('decimal.js');
 Decimal.set({ precision: 30, rounding: Decimal.ROUND_HALF_EVEN });
 const x = new Decimal('1.23456789e-10');
 const y = x.mul(1e10).toFixed(5); // '1.23457'

Best Practices:
 • Use clone() for different global settings rather than reconfiguring the global constructor.
 • For cryptographic randoms, set crypto=true and provide secure global.crypto in Node.js.
 • Always catch DecimalError when parsing user input.

Troubleshooting:
 Command: node -e "const D=require('decimal.js'); D.set({precision:0});"
 Expected Error: [DecimalError] Invalid argument: precision: 0

 Command: node -e "const D=require('decimal.js'); D.crypto=true; console.log(D.random());"
 If no global.crypto: Error: crypto not available

 Test underflow/overflow:
 node -e "const D=require('decimal.js'); D.set({minE:-3}); console.log(new D(0.0001).valueOf());" // '0'
 node -e "const D=require('decimal.js'); D.set({maxE:4}); console.log(new D(100000).valueOf());" // 'Infinity'

## Information Dense Extract
Decimal(value:number|string|Decimal)⇒Decimal; supports decimal, 0b/0B,0o/0O,0x/0X,exp e/E,p/P; throws DecimalError on invalid or exponent<minE/maxE. Config: Decimal.set({precision:1–1e9=20, rounding:0–8=4, minE:–9e15=–9e15, maxE:0–9e15=9e15, toExpNeg:–9e15=–7, toExpPos:0–9e15=20, modulo:0–9=1, crypto:false, defaults?:boolean}). Constants: ROUND_UP=0…EUCLID=9. Static methods: abs,acos,acosh,add(x,y),asin,asinh,atan,atanh,atan2(y,x),cbrt,ceil,clamp,clone,cos,cosh,div,exp,floor,hypot,ln,log,log2,log10,max,min,mod,mul,noConflict,pow,random(dp),round,set,sign,sin,sinh,sqrt,sub,sum,tan,tanh,trunc. Instance methods: plus,minus,times,div,divToInt,mod,pow,sqrt,cbrt,ln,log,log2,log10,exp,sin,cos,tan,sinh,cosh,tanh,asin,acos,atan,asinh,acosh,atanh,abs,neg,cmp,eq,gt,gte,lt,lte,isFinite,isNaN,isZero,isPos,isNeg,sd,precision,toString,toNumber,toJSON,toFixed,toExponential,toPrecision,toSignificantDigits,toDecimalPlaces,toHex,toOctal,toBinary,toFraction,toNearest,valueOf. Best practices: use clone for per-context config; set crypto with global.crypto for secure random; catch DecimalError. Troubleshoot common errors: invalid precision, missing crypto, underflow, overflow checks via set minE/maxE.

## Sanitised Extract
Table of Contents
1  Constructor
2  Configuration
3  Static Methods
4  Instance Methods
5  Constants
6  Errors & Special Values

1  Constructor
Signature: Decimal(value: number|string|Decimal)Decimal
Valid value: integer or float including 0, Infinity, NaN; string may be decimal, binary (0b/0B), octal (0o/0O), hexadecimal (0x/0X); exponential notation uses e/E for decimal, p/P for non-decimal; unlimited digits apart from JS array size and processing time; exponent must be between minE and maxE; throws DecimalError on invalid input.

2  Configuration
Method: Decimal.set(object)DecimalConstructor
Properties:
  precision: 11e9, default 20
  rounding: 08, default 4
  minE: 9e150, default 9e15
  maxE: 09e15, default 9e15
  toExpNeg: 9e150, default 7
  toExpPos: 09e15, default 20
  modulo: 09, default 1
  crypto: boolean, default false
  defaults: boolean flag to reset unspecified to defaults
Throws DecimalError on invalid property values.
Direct assignment: Decimal.precision=40 (no validation).
Clone: Decimal.clone([object])DecimalConstructor; clone copies or applies object settings; object.defaults=true resets to defaults then applies other properties.

3  Static Methods
abs(x)Decimal | acos(x)Decimal | acosh(x)Decimal | add(x,y)Decimal | asin(x)Decimal | asinh(x)Decimal | atan(x)Decimal | atanh(x)Decimal | atan2(y,x)Decimal (Range  to ) | cbrt(x)Decimal | ceil(x)Decimal | clamp(min,max)Decimal | clone([object])DecimalConstructor | cos(x)Decimal | cosh(x)Decimal | div(x,y)Decimal | exp(x)Decimal | floor(x)Decimal | hypot([x,y,])Decimal | ln(x)Decimal | log(x[,base])Decimal | log2(x)Decimal | log10(x)Decimal | max(x[,y,])Decimal | min(x[,y,])Decimal | mod(x,y)Decimal | mul(x,y)Decimal | noConflict()DecimalConstructor | pow(base,exp)Decimal | random([dp])Decimal | round(x)Decimal | set(object)DecimalConstructor | sign(x)number (1,1,0,0,NaN) | sin(x)Decimal | sinh(x)Decimal | sqrt(x)Decimal | sub(x,y)Decimal | sum(x[,y,])Decimal | tan(x)Decimal | tanh(x)Decimal | trunc(x)Decimal

4  Instance Methods
absoluteValue()Decimal | abs()Decimal | ceil()Decimal | cmp(x)number | clamp(min,max)Decimal | cos()Decimal | cosh()Decimal | div(x)Decimal | divToInt(x)Decimal | eq(x)boolean | floor()Decimal | gt(x)boolean | gte(x)boolean | sinh()Decimal | sin()Decimal | log(x)Decimal | ln()Decimal | minus(x)Decimal | mod(x)Decimal | exp()Decimal | neg()Decimal | plus(x)Decimal | sd([includeZeros])number | round()Decimal | toDP(dp[,rm])Decimal | toHex()string | toPower(exp)Decimal | toSD(sd[,rm])Decimal | toString()string | toPrecision(sd[,rm])string | toFixed(dp[,rm])string | toExponential(dp[,rm])string | toNearest(step[,rm])Decimal | valueOf()string | etc.

5  Constants
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3, ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6, ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

6  Errors & Special Values
DecimalError: invalid constructor or set arguments; 0 has sign bit; NaN; Infinity

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMAL_JS

# Decimal.js Arbitrary-Precision Decimal Type
Date Retrieved: 2024-06-19
Data Size: 13874875 bytes
Links Found: 21129

# Constructor
**Signature:** Decimal(value) ⇒ Decimal
**Parameters:**
  • value: number | string | Decimal
    – ±0, ±Infinity, NaN
    – decimal, binary (0b/0B), octal (0o/0O), hexadecimal (0x/0X)
    – exponential: e/E for base-10, p/P for base-2 (binary/hex/octal)
**Behavior:** Throws DecimalError on invalid value or exponent outside [minE, maxE]

# Configuration Properties
Set via `Decimal.set(object)` or direct assignment (no validation):
  • precision: integer 1–1e9, default 20
  • rounding: integer 0–8, default 4
    – 0: ROUND_UP, 1: ROUND_DOWN, 2: ROUND_CEIL, 3: ROUND_FLOOR,
      4: ROUND_HALF_UP, 5: ROUND_HALF_DOWN, 6: ROUND_HALF_EVEN,
      7: ROUND_HALF_CEIL, 8: ROUND_HALF_FLOOR
  • minE: integer –9e15 to 0, default –9e15
  • maxE: integer 0 to 9e15, default 9e15
  • toExpNeg: integer –9e15 to 0, default –7
  • toExpPos: integer 0 to 9e15, default 20
  • modulo: integer 0–9, default 1 (ROUND_DOWN)
  • crypto: boolean, default false

# Static Methods
• abs(x) ⇒ Decimal
• acos(x) ⇒ Decimal
• acosh(x) ⇒ Decimal
• add(x, y) ⇒ Decimal
• asin(x) ⇒ Decimal
• asinh(x) ⇒ Decimal
• atan(x) ⇒ Decimal
• atanh(x) ⇒ Decimal
• atan2(y, x) ⇒ Decimal  Domain: [–∞, ∞], Range: [–π, π]
• cbrt(x) ⇒ Decimal
… (full list as per API)

# Instance Methods
Inherited from prototype; immutable chaining.
• absoluteValue() ⇒ Decimal
• abs() ⇒ Decimal alias
• ceil() ⇒ Decimal
• cmp(x) ⇒ number 1, –1, 0 or NaN
• clamp(min, max) ⇒ Decimal
• cos() ⇒ Decimal
• cosh() ⇒ Decimal
• div(x) ⇒ Decimal
• exp() ⇒ Decimal
• floor() ⇒ Decimal
… (full list as per API)

# Constants
• ROUND_UP = 0
• ROUND_DOWN = 1
• ROUND_CEIL = 2
• ROUND_FLOOR = 3
• ROUND_HALF_UP = 4
• ROUND_HALF_DOWN = 5
• ROUND_HALF_EVEN = 6
• ROUND_HALF_CEIL = 7
• ROUND_HALF_FLOOR = 8
• EUCLID = 9

# Errors
DecimalError: thrown on invalid constructor value or invalid configuration

# Zero, NaN & Infinity
Consistent with JavaScript: signed zeros, NaN, ±Infinity

## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-10T19:28:47.609Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
