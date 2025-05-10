# DECIMALJS

## Crawl Summary
Decimal.js provides arbitrary-precision decimal arithmetic. Configuration via Decimal.set or Decimal.clone adjusts precision (1–1e9), rounding mode (0–8), exponent limits (minE,maxE), display thresholds (toExpNeg,toExpPos), modulo mode (0–9) and crypto random. Core API: constructor accepts Number,string,Decimal; static methods for arithmetic, logs, trig, hyperbolic, roots, random, formatting; instance methods mirror static but chainable. Default settings: precision=20, rounding=4, minE=–9e15, maxE=9e15, toExpNeg=–7, toExpPos=20, modulo=1, crypto=false. Rounding constants exposed on constructor. clone isolates settings. noConflict restores previous Decimal.

## Normalised Extract
Table of Contents:
1 Constructor
2 Global Configuration
3 Static Methods
4 Instance Methods
5 Configuration Properties
6 Rounding Modes

1 Constructor
Decimal(value: number|string|Decimal) => Decimal
 value: integer|float|±0|±Infinity|NaN|string(decimal|binary|hex|octal with prefixes 0b,0x,0o)
 supports fixed or exponential notation (e/E for decimal, p/P for non-decimal)
Throws DecimalError on invalid value

2 Global Configuration
Decimal.set({
 precision?:1-1e9,
 rounding?:0-8,
 minE?:-9e15-0,
 maxE?:0-9e15,
 toExpNeg?:-9e15-0,
 toExpPos?:0-9e15,
 modulo?:0-9,
 crypto?:boolean,
 defaults?:boolean
}) => DecimalConstructor
Decimal.clone(config?) => new DecimalConstructor
 defaults:true resets all to defaults

3 Static Methods
abs(x) | acos(x) | acosh(x) | add(x,y) | asin(x) | asinh(x) | atan(x) | atanh(x) | atan2(y,x)
cbrt(x) | ceil(x) | clamp(min,max) | clone() | cos(x) | cosh(x)
div(x,y) | exp(x) | floor(x) | hypot(...values)
ln(x) | log(x,base?) | log2(x) | log10(x)
max(...values) | min(...values) | mod(x,y) | mul(x,y) | noConflict()
pow(x,y) | random(dp?) | round(x) | set() | sign(x)
sin(x) | sinh(x) | sqrt(x) | sub(x,y) | sum(...values)
tan(x) | tanh(x) | trunc(x)

4 Instance Methods
plus(x) | minus(x) | times(x) | dividedBy(x) | divToInt(x)
modulo(x) | pow(exp) | sqrt() | logarithm(base?) | naturalLogarithm()
naturalExponential() | sine() | cosine() | tangent() | inverse... | hyperbolic... | abs()
ceil() | floor() | round() | trunc() | clampedTo(min,max)
comparedTo(x) => number | eq(x), lt(x), lte(x), gt(x), gte(x) => boolean
isFinite() | isNaN() | isZero() | isNeg() | isPos() | isInt()
decimalPlaces() => number | precision(includeZeros?) => number
toDP(dp,rm?), toFixed(dp,rm?), toExponential(dp,rm?), toHexadecimal(dp,rm?), toOctal(dp,rm?), toPrecision(sd,rm?), toSD(sd,rm?), toString(), toJSON(), valueOf()

5 Configuration Properties
precision:1-1e9 default20
rounding:0-8 default4
minE:-9e15 default-9e15
maxE:0-9e15 default9e15
toExpNeg:-9e15 default-7
toExpPos:0-9e15 default20
modulo:0-9 default1
crypto:boolean defaultfalse

6 Rounding Modes
0=UP,1=DOWN,2=CEIL,3=FLOOR,4=HALF_UP,5=HALF_DOWN,6=HALF_EVEN,7=HALF_CEIL,8=HALF_FLOOR,9=EUCLID

## Supplementary Details
Configuration Defaults & Validation:
 precision: integer 1–1e9; DecimalError if outside range
 rounding: integer 0–8; enumerated on Decimal constructor
 minE: integer –9e15–0; underflow yields zero
 maxE: integer 0–9e15; overflow yields Infinity
 toExpNeg: integer –9e15–0; threshold for exponential output
 toExpPos: integer 0–9e15; threshold for exponential output
 modulo: integer 0–9; modes: 1 truncate,3 floor,0 up,6 half-even,9 euclid
 crypto: boolean; true uses crypto.getRandomValues or crypto.randomBytes; throws if unavailable

Usage:
 Decimal.set({precision:50, rounding:Decimal.ROUND_HALF_EVEN})
 const D=Decimal.clone({defaults:true, precision:30})
 D.set({minE:-500, maxE:500})
 Decimal.noConflict() restores original Decimal


## Reference Details
Constructor Signature:
 Decimal(value: number|string|Decimal) => Decimal
 Throws DecimalError on invalid input

Static Method Signatures:
 abs(x: number|string|Decimal): Decimal
 add(x: number|string|Decimal, y: number|string|Decimal): Decimal
 sub(x: number|string|Decimal, y: number|string|Decimal): Decimal
 mul(x: number|string|Decimal, y: number|string|Decimal): Decimal
 div(x: number|string|Decimal, y: number|string|Decimal): Decimal
 mod(x: number|string|Decimal, y: number|string|Decimal): Decimal
 pow(base: number|string|Decimal, exponent: number|string|Decimal): Decimal
 sqrt(x: number|string|Decimal): Decimal
 cbrt(x: number|string|Decimal): Decimal
 ln(x: number|string|Decimal): Decimal
 log(x: number|string|Decimal, base?: number|string|Decimal): Decimal
 log2(x: number|string|Decimal): Decimal
 log10(x: number|string|Decimal): Decimal
 exp(x: number|string|Decimal): Decimal
 sin(x: number|string|Decimal), cos(x), tan(x), asin(x), acos(x), atan(x), asinh(x), acosh(x), atanh(x), sinh(x), cosh(x), tanh(x)
 atan2(y: number|string|Decimal, x: number|string|Decimal): Decimal
 hypot(...values: Array<number|string|Decimal>): Decimal
 sum(...values: Array<number|string|Decimal>): Decimal
 max(...values: Array<number|string|Decimal>): Decimal
 min(...values: Array<number|string|Decimal>): Decimal
 random(dp?: number): Decimal
 set(config: object): DecimalConstructor
 clone(config?: object): DecimalConstructor
 noConflict(): DecimalConstructor
 sign(x: number|string|Decimal): number

Instance Method Signatures:
 plus(x: number|string|Decimal): Decimal
 minus(x: number|string|Decimal): Decimal
 times(x: number|string|Decimal): Decimal
 dividedBy(x: number|string|Decimal): Decimal
 divToInt(x: number|string|Decimal): Decimal
 modulo(x: number|string|Decimal): Decimal
 pow(exp: number|string|Decimal): Decimal
 sqrt(): Decimal
 naturalLogarithm(): Decimal
 logarithm(base?: number|string|Decimal): Decimal
 naturalExponential(): Decimal
 sine(), cosine(), tangent(), inverseCosine(), inverseSine(), inverseTangent(), hyperbolicCosine(), hyperbolicSine(), hyperbolicTangent(), inverseHyperbolicCosine(), inverseHyperbolicSine(), inverseHyperbolicTangent()
 absoluteValue(): Decimal
 ceil(): Decimal, floor(): Decimal, round(): Decimal, trunc(): Decimal
 clampedTo(min: number|string|Decimal, max: number|string|Decimal): Decimal
 comparedTo(x: number|string|Decimal): number
 eq(x), lt(x), lte(x), gt(x), gte(x): boolean
 isFinite(), isNaN(), isZero(), isNeg(), isPos(), isInt(): boolean
 decimalPlaces(): number
 precision(includeZeros?: boolean): number
 toDP(dp: number, rm?: number): Decimal
 toFixed(dp: number, rm?: number): string
 toExponential(dp: number, rm?: number): string
 toHexadecimal(dp: number, rm?: number): string
 toOctal(dp: number, rm?: number): string
 toPrecision(sd: number, rm?: number): string
 toSD(sd: number, rm?: number): string
 toString(): string
 toJSON(): string
 valueOf(): string

Code Examples:
 // Configure global settings
 Decimal.set({precision:10, rounding:Decimal.ROUND_HALF_UP})

 // Clone for high-precision
 const HighP = Decimal.clone({precision:50})
 console.log(HighP.div(1,7)) // '0.14285714285714285714285714285714285714285714285714'

 // Cryptographic random
 global.crypto = require('crypto') // Node.js
 Decimal.set({crypto:true})
 console.log(Decimal.random(20))

Best Practices:
 Use clone to isolate custom settings and prevent side effects on global Decimal
 Validate external input before constructing Decimal to avoid DecimalError
 Reset to defaults with clone({defaults:true}) after localized precision changes

Troubleshooting:
 Command: Decimal.set({precision:0})
 Expected Error: [DecimalError] Invalid argument: precision: 0

 Command: Decimal.precision = 0
 Outcome: No error thrown; results unreliable

 Command: Decimal.set({crypto:true}) without global.crypto
 Expected Error: [Error] Crypto not available

 Command: new Decimal('1e10000000000000000')
 Outcome: 'Infinity' due to maxE overflow

 Command: Decimal.set({minE:-2}); new Decimal(0.0001)
 Outcome: '0' due to underflow


## Information Dense Extract
Decimal(value)->Decimal; set({precision1-1e9=20,rounding0-8=4,minE-9e15= -9e15,maxE9e15,toExpNeg-7,toExpPos20,modulo1,cryptofalse}); clone({…}); abs,add,sub,mul,div,mod,pow,sqrt,cbrt,ln,log,log2,log10,exp, trig,hyper,atan2,sum,max,min,random(dp0-1e9),noConflict; instance plus,minus,times,dividedBy,divToInt,modulo,pow,sqrt,ln,log,exp,trig,hyper,abs,ceil,floor,round,trunc,clamp,comparedTo,eq,lt,lte,gt,gte,isFinite,isNaN,isZero,isNeg,isPos,isInt,dp,sd,toDP,toFixed,toExponential,toHexadecimal,toOctal,toPrecision,toSD,toString; modes:0-UP,1-DOWN,2-CEIL,3-FLOOR,4-HALF_UP,5-HALF_DOWN,6-HALF_EVEN,7-HALF_CEIL,8-HALF_FLOOR,9-EUCLID

## Sanitised Extract
Table of Contents:
1 Constructor
2 Global Configuration
3 Static Methods
4 Instance Methods
5 Configuration Properties
6 Rounding Modes

1 Constructor
Decimal(value: number|string|Decimal) => Decimal
 value: integer|float|0|Infinity|NaN|string(decimal|binary|hex|octal with prefixes 0b,0x,0o)
 supports fixed or exponential notation (e/E for decimal, p/P for non-decimal)
Throws DecimalError on invalid value

2 Global Configuration
Decimal.set({
 precision?:1-1e9,
 rounding?:0-8,
 minE?:-9e15-0,
 maxE?:0-9e15,
 toExpNeg?:-9e15-0,
 toExpPos?:0-9e15,
 modulo?:0-9,
 crypto?:boolean,
 defaults?:boolean
}) => DecimalConstructor
Decimal.clone(config?) => new DecimalConstructor
 defaults:true resets all to defaults

3 Static Methods
abs(x) | acos(x) | acosh(x) | add(x,y) | asin(x) | asinh(x) | atan(x) | atanh(x) | atan2(y,x)
cbrt(x) | ceil(x) | clamp(min,max) | clone() | cos(x) | cosh(x)
div(x,y) | exp(x) | floor(x) | hypot(...values)
ln(x) | log(x,base?) | log2(x) | log10(x)
max(...values) | min(...values) | mod(x,y) | mul(x,y) | noConflict()
pow(x,y) | random(dp?) | round(x) | set() | sign(x)
sin(x) | sinh(x) | sqrt(x) | sub(x,y) | sum(...values)
tan(x) | tanh(x) | trunc(x)

4 Instance Methods
plus(x) | minus(x) | times(x) | dividedBy(x) | divToInt(x)
modulo(x) | pow(exp) | sqrt() | logarithm(base?) | naturalLogarithm()
naturalExponential() | sine() | cosine() | tangent() | inverse... | hyperbolic... | abs()
ceil() | floor() | round() | trunc() | clampedTo(min,max)
comparedTo(x) => number | eq(x), lt(x), lte(x), gt(x), gte(x) => boolean
isFinite() | isNaN() | isZero() | isNeg() | isPos() | isInt()
decimalPlaces() => number | precision(includeZeros?) => number
toDP(dp,rm?), toFixed(dp,rm?), toExponential(dp,rm?), toHexadecimal(dp,rm?), toOctal(dp,rm?), toPrecision(sd,rm?), toSD(sd,rm?), toString(), toJSON(), valueOf()

5 Configuration Properties
precision:1-1e9 default20
rounding:0-8 default4
minE:-9e15 default-9e15
maxE:0-9e15 default9e15
toExpNeg:-9e15 default-7
toExpPos:0-9e15 default20
modulo:0-9 default1
crypto:boolean defaultfalse

6 Rounding Modes
0=UP,1=DOWN,2=CEIL,3=FLOOR,4=HALF_UP,5=HALF_DOWN,6=HALF_EVEN,7=HALF_CEIL,8=HALF_FLOOR,9=EUCLID

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMALJS

# DECIMAL.JS API

## Constructor
Decimal(value: number|string|Decimal) => Decimal  
value: integer|float|±0|±Infinity|NaN; string: decimal|binary (prefix 0b|0B)|hexadecimal (0x|0X)|octal (0o|0O); fixed or exponential notation (e|E for decimal, p|P for non-decimal)  
Throws DecimalError on invalid value  
Examples:
new Decimal('0b1.1p-5') => '0.046875'
new Decimal(4.321e+4) => '43210'

## Static Methods
abs(x: number|string|Decimal) => Decimal
acos(x) => Decimal
acosh(x) => Decimal
add(x,y: number|string|Decimal) => Decimal
asin(x) => Decimal
asinh(x) => Decimal
atan(x) => Decimal
atanh(x) => Decimal
atan2(y,x) => Decimal  Range [-pi,pi]
cbrt(x) => Decimal
ceil(x) => Decimal
clamp(min,max) => Decimal
clone(config?) => DecimalConstructor
cos(x) => Decimal
cosh(x) => Decimal
div(x,y) => Decimal
exp(x) => Decimal
floor(x) => Decimal
hypot(...values: number|string|Decimal[]) => Decimal
ln(x) => Decimal
log(x,base?) => Decimal  default base 10
log2(x) => Decimal
log10(x) => Decimal
max(...values) => Decimal
min(...values) => Decimal
mod(x,y) => Decimal
mul(x,y) => Decimal
noConflict() => DecimalConstructor
pow(x,y) => Decimal
random(dp?: number) => Decimal  dp: integer 0 to 1e9
round(x) => Decimal
set(config: object) => DecimalConstructor
sign(x) => number
sin(x) => Decimal
sinh(x) => Decimal
sqrt(x) => Decimal
sub(x,y) => Decimal
sum(...values) => Decimal
tan(x) => Decimal
tanh(x) => Decimal
trunc(x) => Decimal

## Instance Methods
plus(x) => Decimal
minus(x) => Decimal
times(x) => Decimal
dividedBy(x) => Decimal
divToInt(x) => Decimal
modulo(x) => Decimal
pow(exp) => Decimal
sqrt() => Decimal
logarithm(base?) => Decimal  default base 10
naturalLogarithm() => Decimal
naturalExponential() => Decimal
sine(), cosine(), tangent(), inverse..., hyperbolic..., inverseHyperbolic...  all return Decimal
absoluteValue() => Decimal
ceil(), floor(), round(), trunc() => Decimal
clampedTo(min,max) => Decimal
comparedTo(x) => number  returns 1,0,-1 or NaN
eq(x), lt(x), lte(x), gt(x), gte(x) => boolean
isFinite(), isNaN(), isZero(), isNeg(), isPos(), isInt() => boolean
decimalPlaces() => number
precision(includeZeros?) => number
toDP(dp,rm?), toFixed(dp,rm?), toExponential(dp,rm?), toHexadecimal(dp,rm?), toOctal(dp,rm?), toPrecision(sd,rm?), toSD(sd,rm?), toString(), toJSON(), valueOf()

## Configuration Properties
precision: integer, 1 to 1e9 inclusive; default 20
rounding: integer, 0 to 8 inclusive; default 4 (ROUND_HALF_UP)
minE: integer, -9e15 to 0 inclusive; default -9e15
maxE: integer, 0 to 9e15 inclusive; default 9e15
toExpNeg: integer, -9e15 to 0 inclusive; default -7
toExpPos: integer, 0 to 9e15 inclusive; default 20
modulo: integer, 0 to 9 inclusive; default 1
crypto: boolean; default false

Use Decimal.set({precision, rounding, minE, maxE, toExpNeg, toExpPos, modulo, crypto}) to apply validated settings. Direct assignment bypasses validation.
Clone constructor: Decimal.clone(config?) isolates new DecimalConstructor with inherited or overridden settings. Use {defaults:true} to reset defaults.

## Rounding Modes
ROUND_UP = 0       rounds away from zero
ROUND_DOWN = 1     towards zero
ROUND_CEIL = 2     towards +Infinity
ROUND_FLOOR = 3    towards -Infinity
ROUND_HALF_UP = 4  nearest; ties away from zero
ROUND_HALF_DOWN = 5 nearest; ties towards zero
ROUND_HALF_EVEN = 6 nearest; ties to even
ROUND_HALF_CEIL = 7 nearest; ties to +Infinity
ROUND_HALF_FLOOR = 8 nearest; ties to -Infinity
EUCLID = 9         not a rounding mode; modulo mode for positive remainder


## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-10T13:34:24.410Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
