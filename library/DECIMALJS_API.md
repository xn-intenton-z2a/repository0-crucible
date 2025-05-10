# DECIMALJS_API

## Crawl Summary
Decimal.js provides an ES module and global constructor Decimal(value). Core features: configurable precision (1–1e9), rounding modes (0–8, default 4), exponent limits (minE -9e15 to maxE 9e15), formatting thresholds toExpNeg and toExpPos, modulo modes including EUCLID, optional crypto-based random. Static and instance methods cover arithmetic, comparisons, conversions, trigonometry, hyperbolic functions. All operations return new immutable instances. Key methods: plus, minus, times, div, pow, mod, exp, ln, sqrt, cbrt, log/log2/log10, trig/ inverse trig, rounding and formatting toFixed/toExponential/toPrecision. clone and set allow independent Decimal constructors. random(dp) uses crypto when enabled. Errors thrown on invalid values or config.

## Normalised Extract
Table of Contents
1 Constructor
2 Configuration
3 Rounding & Modulo Modes
4 Static Methods
5 Instance Methods
6 Default Settings

1 Constructor
Signature: Decimal(value: number|string|Decimal) ⇒ Decimal
Accepts: integer, float, ±0, ±Infinity, NaN; strings in decimal, binary (0b), hex (0x), octal (0o) with e/E (decimal exponent) or p/P (binary/hex/octal exponent). Throws DecimalError on invalid.

2 Configuration
Decimal.set({ precision:1–1e9, rounding:0–8, toExpNeg:-9e15–0, toExpPos:0–9e15, minE:-9e15–0, maxE:0–9e15, modulo:0–9, crypto:true|false, defaults:true }) ⇒ constructor
Direct assign allowed but bypasses validation.

3 Rounding & Modulo Modes
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3, ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6, ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

4 Static Methods
abs, add, sub, mul, div, pow, mod, divToInt, round, floor, ceil, trunc, clamp, max, min, sum, random(dp?), log(x,base?), log2, log10, ln, exp, hypot, acos, asin, atan, acosh, asinh, atanh, clone, noConflict, isDecimal

5 Instance Methods
Arithmetic: plus, minus, times, dividedBy, mod, pow, cbrt, sqrt, exp, ln, log
Rounding/Conversion: round, floor, ceil, trunc, toString, toNumber, toFixed, toExponential, toPrecision, toDP, toSD, toBinary, toHexadecimal, toOctal, toNearest, toJSON
Comparison: cmp, eq, lt, lte, gt, gte, isFinite, isNaN, isZero, isInt, isNeg, isPos, sign
Trigonometry: sin, cos, tan, asin, acos, atan; sinh, cosh, tanh, asinh, acosh, atanh

6 Default Settings
precision=20, rounding=4, toExpNeg=-7, toExpPos=21, minE=-9e15, maxE=9e15, modulo=1, crypto=false

## Supplementary Details
Parameter Ranges
precision: 1–1e9; rounding: 0–8; toExpNeg: -9e15–0; toExpPos: 0–9e15; minE: -9e15–0; maxE: 0–9e15; modulo: 0–9; crypto: boolean
default configuration via Decimal.set({defaults:true})
Exponential notation thresholds toExpNeg and toExpPos control automatic formatting in toString; toFixed and toExponential override.
clone([config]) creates independent constructor; clone with defaults:true resets.
random(dp): dp: integer 0–1e9; uses crypto.getRandomValues or crypto.randomBytes if crypto=true, otherwise Math.random. Throws if crypto=true and crypto unavailable.
Modulo modes: 0–8 follow rounding modes; EUCLID=9 for always-positive remainder. modulo property directly sets mode.


## Reference Details
Constructor
Signature: new Decimal(value)⇒Decimal
Throws: DecimalError if value invalid.

Configuration
Decimal.set(config: {precision?:number, rounding?:number, toExpNeg?:number, toExpPos?:number, minE?:number, maxE?:number, modulo?:number, crypto?:boolean, defaults?:boolean}):DecimalConstructor
Throws: DecimalError on invalid property values.
Decimal.precision:number
Decimal.rounding:number
Decimal.minE:number
Decimal.maxE:number
Decimal.toExpNeg:number
Decimal.toExpPos:number
Decimal.modulo:number
Decimal.crypto:boolean

Static Methods
abs(x:number|string|Decimal):Decimal
add(x:number|string|Decimal,y:number|string|Decimal):Decimal
sub(x:number|string|Decimal,y:number|string|Decimal):Decimal
mul(x:number|string|Decimal,y:number|string|Decimal):Decimal
div(x:number|string|Decimal,y:number|string|Decimal):Decimal
pow(base:number|string|Decimal,exponent:number|string|Decimal):Decimal
mod(x:number|string|Decimal,y:number|string|Decimal):Decimal
divToInt(x:number|string|Decimal,y:number|string|Decimal):Decimal
round(x:number|string|Decimal):Decimal
floor(x:number|string|Decimal):Decimal
ceil(x:number|string|Decimal):Decimal
trunc(x:number|string|Decimal):Decimal
clamp(min:number|string|Decimal,max:number|string|Decimal):Decimal
max(...args:(number|string|Decimal)[]):Decimal
min(...args:(number|string|Decimal)[]):Decimal
sum(...args:(number|string|Decimal)[]):Decimal
random(dp?:number):Decimal
log(x:number|string|Decimal,base?:number|string|Decimal):Decimal
log2(x:number|string|Decimal):Decimal
log10(x:number|string|Decimal):Decimal
ln(x:number|string|Decimal):Decimal
exp(x:number|string|Decimal):Decimal
hypot(...args:(number|string|Decimal)[]):Decimal
acos(x:number|string|Decimal):Decimal
asin(x:number|string|Decimal):Decimal
atan(x:number|string|Decimal):Decimal
acosh(x:number|string|Decimal):Decimal
asinh(x:number|string|Decimal):Decimal
atanh(x:number|string|Decimal):Decimal
clone(config?:object):DecimalConstructor
noConflict():DecimalConstructor
isDecimal(obj:any):boolean

Instance Methods
plus(x:number|string|Decimal):Decimal
minus(x:number|string|Decimal):Decimal
times(x:number|string|Decimal):Decimal
dividedBy(x:number|string|Decimal):Decimal
mod(x:number|string|Decimal):Decimal
toPower(exp:number|string|Decimal):Decimal
cbrt():Decimal
sqrt():Decimal
exp():Decimal
ln():Decimal
log(base?:number|string|Decimal):Decimal
round():Decimal
floor():Decimal
ceil():Decimal
trunc():Decimal
toDecimalPlaces(dp:number,rm?:number):Decimal
toSignificantDigits(sd:number,rm?:number):Decimal
toExponential(dp?:number,rm?:number):string
toFixed(dp?:number,rm?:number):string
toPrecision(sd?:number,rm?:number):string
toNearest(x?:number|string|Decimal,rm?:number):Decimal
toBinary():string
toHexadecimal():string
toOctal():string
toNumber():number
toString():string
toJSON():string
cmp(x:number|string|Decimal):number
eq(x:number|string|Decimal):boolean
lt(x:number|string|Decimal):boolean
lte(x:number|string|Decimal):boolean
gt(x:number|string|Decimal):boolean
gte(x:number|string|Decimal):boolean
isFinite():boolean
isNaN():boolean
isZero():boolean
isInteger():boolean
isNeg():boolean
isPos():boolean
sign():number
sin():Decimal
cos():Decimal
tan():Decimal
asin():Decimal
acos():Decimal
atan():Decimal
sinh():Decimal
cosh():Decimal
tanh():Decimal
asinh():Decimal
acosh():Decimal
atanh():Decimal

Best Practices
Use independent Decimal constructors via clone for differing configurations.
Always set precision and rounding via Decimal.set to avoid invalid results.
Enable crypto=true when random using secure RNG.
Prefer toDP and toSD for formatting over toString for precision control.
Chain methods to avoid intermediate assignment overhead.

Troubleshooting
Invalid precision error: Decimal.set({precision:0}) throws [DecimalError] Invalid argument: precision: 0.
Missing crypto: with crypto=true in Node.js assign global.crypto=require('crypto') before Decimal.random().
Exponent underflow: new Decimal('1e-10000000000000000') yields '0' when e<minE. Increase minE.
Exponent overflow: new Decimal('1e10000000000000000') yields 'Infinity' when e>maxE. Increase maxE.

## Information Dense Extract
Decimal(value)⇒Decimal accept number|string|Decimal; string supports decimal,0b/0x/0o with e/E or p/P; exponent between minE,maxE; throws DecimalError on invalid. Config: Decimal.set({precision:1–1e9,rounding:0–8,toExpNeg:-9e15–0,toExpPos:0–9e15,minE:-9e15–0,maxE:0–9e15,modulo:0–9,crypto:boolean,defaults:boolean})⇒constructor. Rounding modes: ROUND_UP=0…ROUND_HALF_FLOOR=8; EUCLID=9. Default: precision20,rounding4,toExpNeg-7,toExpPos21,minE-9e15,maxE9e15,modulo1,cryptofalse. Static APIs: abs,add,sub,mul,div,pow,mod,divToInt,round,floor,ceil,trunc,clamp,max,min,sum,random(dp?),log(x,base?),log2,log10,ln,exp,hypot,acos,asin,atan,acosh,asinh,atanh,clone, noConflict,isDecimal. Instance: plus,minus,times,dividedBy,mod,toPower,cbrt,sqrt,exp,ln,log, round,floor,ceil,trunc,toDP,toSD,toExponential,toFixed,toPrecision,toNearest,toBinary,toHexadecimal,toOctal,toNumber,toString,toJSON,cmp,eq,lt,lte,gt,gte,isFinite,isNaN,isZero,isInteger,isNeg,isPos,sign,sin,cos,tan,asin,acos,atan,sinh,cosh,tanh,asinh,acosh,atanh. Clone for independent configs. Use crypto RNG by setting crypto=true and global.crypto in Node. Errors when invalid config or unavailable crypto.

## Sanitised Extract
Table of Contents
1 Constructor
2 Configuration
3 Rounding & Modulo Modes
4 Static Methods
5 Instance Methods
6 Default Settings

1 Constructor
Signature: Decimal(value: number|string|Decimal)  Decimal
Accepts: integer, float, 0, Infinity, NaN; strings in decimal, binary (0b), hex (0x), octal (0o) with e/E (decimal exponent) or p/P (binary/hex/octal exponent). Throws DecimalError on invalid.

2 Configuration
Decimal.set({ precision:11e9, rounding:08, toExpNeg:-9e150, toExpPos:09e15, minE:-9e150, maxE:09e15, modulo:09, crypto:true|false, defaults:true })  constructor
Direct assign allowed but bypasses validation.

3 Rounding & Modulo Modes
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3, ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6, ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

4 Static Methods
abs, add, sub, mul, div, pow, mod, divToInt, round, floor, ceil, trunc, clamp, max, min, sum, random(dp?), log(x,base?), log2, log10, ln, exp, hypot, acos, asin, atan, acosh, asinh, atanh, clone, noConflict, isDecimal

5 Instance Methods
Arithmetic: plus, minus, times, dividedBy, mod, pow, cbrt, sqrt, exp, ln, log
Rounding/Conversion: round, floor, ceil, trunc, toString, toNumber, toFixed, toExponential, toPrecision, toDP, toSD, toBinary, toHexadecimal, toOctal, toNearest, toJSON
Comparison: cmp, eq, lt, lte, gt, gte, isFinite, isNaN, isZero, isInt, isNeg, isPos, sign
Trigonometry: sin, cos, tan, asin, acos, atan; sinh, cosh, tanh, asinh, acosh, atanh

6 Default Settings
precision=20, rounding=4, toExpNeg=-7, toExpPos=21, minE=-9e15, maxE=9e15, modulo=1, crypto=false

## Original Source
Decimal.js Arbitrary-Precision Arithmetic
https://mikemcl.github.io/decimal.js/

## Digest of DECIMALJS_API

# Decimal.js API Reference

## 1. Constructor

**Signature**: Decimal(value: number|string|Decimal) ⇒ Decimal

- Acceptable value types: integer, float, ±0, ±Infinity, NaN; string in decimal, binary (0b/0B), hex (0x/0X), octal (0o/0O) with optional exponential notation using e/E for decimal or p/P for non-decimal.
- Range constraints: exponent between minE and maxE.
- Throws: DecimalError on invalid value.

**Examples**:
```js
new Decimal(9)                // '9'
new Decimal('4.321e+4')       // '43210'
new Decimal('-0b10110100.1')  // '-180.5'
new Decimal('0x0.0c')         // '0.046875'
``` 

## 2. Configuration Properties

### 2.1 Decimal.set(object) ⇒ Decimal constructor

- object properties:
  - precision: integer [1,1e9], default 20
  - rounding: integer [0,8], default 4
  - toExpNeg: integer [-9e15,0], default -7
  - toExpPos: integer [0,9e15], default 20
  - minE: integer [-9e15,0], default -9e15
  - maxE: integer [0,9e15], default 9e15
  - modulo: integer [0,9], default 1
  - crypto: boolean, default false
  - defaults: boolean (if true, reset unspecified to defaults)
- Returns: this constructor
- Throws: DecimalError on invalid property.

### 2.2 Direct assignment
- Can set Decimal.precision, rounding, etc., without validation.

## 3. Rounding Modes & Modulo Modes

Property names and values:
```
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3,
ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6,
ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9
```

## 4. Static Methods

| Method         | Signature                                    | Returns    | Notes                                                                       |
|----------------|----------------------------------------------|------------|-----------------------------------------------------------------------------|
| abs            | Decimal.abs(x)                               | Decimal    | alias absoluteValue                                                        |
| add            | Decimal.add(x,y)                             | Decimal    | alias plus                                                                 |
| sub            | Decimal.sub(x,y)                             | Decimal    | alias minus                                                                |
| mul            | Decimal.mul(x,y)                             | Decimal    | alias times                                                                |
| div            | Decimal.div(x,y)                             | Decimal    | alias dividedBy                                                            |
| pow            | Decimal.pow(base,exp)                        | Decimal    | alias toPower                                                              |
| mod            | Decimal.mod(x,y)                             | Decimal    | alias modulo                                                                |
| divToInt       | Decimal.divToInt(x,y)                        | Decimal    | alias dividedToIntegerBy                                                   |
| round          | Decimal.round(x)                             | Decimal    |                                                                             |
| floor          | Decimal.floor(x)                             | Decimal    |                                                                             |
| ceil           | Decimal.ceil(x)                              | Decimal    |                                                                             |
| trunc          | Decimal.trunc(x)                             | Decimal    | alias truncated                                                            |
| clamp          | Decimal.clamp(min,max)                      | Decimal    | alias clampedTo                                                            |
| max            | Decimal.max(x,...args)                       | Decimal    |                                                                             |
| min            | Decimal.min(x,...args)                       | Decimal    |                                                                             |
| sum            | Decimal.sum(x,...args)                       | Decimal    | result rounded only                                                        |
| random         | Decimal.random(dp?)                          | Decimal    | dp: integer [0,1e9], default precision, uses crypto if crypto=true        |
| log            | Decimal.log(x,base?)                        | Decimal    | default base 10                                                             |
| log2           | Decimal.log2(x)                              | Decimal    |                                                                             |
| log10          | Decimal.log10(x)                             | Decimal    |                                                                             |
| ln             | Decimal.ln(x)                                | Decimal    | alias naturalLogarithm                                                     |
| exp            | Decimal.exp(x)                               | Decimal    | alias naturalExponential                                                    |
| hypot          | Decimal.hypot(...args)                      | Decimal    | sqrt(sum of squares)                                                        |
| acos, asin, atan, acosh,...atanh | Decimal.acos(x) etc.          | Decimal    | inverse and hyperbolic trig functions                                       |
| clone          | Decimal.clone([object])                     | new constructor | shallow clone with new settings or default when object.defaults=true         |
| noConflict     | Decimal.noConflict()                         | old Decimal constructor | browser only revert                                                     |
| isDecimal      | Decimal.isDecimal(object)                   | boolean    | instance check                                                              |

## 5. Instance Methods

(Immutable, chainable)

### 5.1 Arithmetic
- plus(x), minus(x), times(x), dividedBy(x), mod(x), pow(x)
- cubeRoot(), sqrt(), exp(), ln(), log(base)
- abs(), neg(), decimalPlaces(), precision([includeZeros]), toDP(dp,rm), toSD(sd,rm)

### 5.2 Rounding & Conversion
- round(), floor(), ceil(), trunc(), toString(), toNumber(), toJSON()
- toFixed(dp,rm), toExponential(dp,rm), toPrecision(sd,rm)
- toNearest(x,rm), toBinary(), toHexadecimal(), toOctal()

### 5.3 Comparison
- cmp(x), eq(x), lt(x), lte(x), gt(x), gte(x)
- isFinite(), isNaN(), isZero(), isInteger(), isNeg(), isPos()
- sign(): returns -1,0,+1,-0 or NaN

### 5.4 Trigonometry
- sin(), cos(), tan(), asin(), acos(), atan()
- sinh(), cosh(), tanh(), asinh(), acosh(), atanh()
- Uses precision significant digits, rounding mode
- Domain/Range as per Math, correct rounding within precision limit (see Pi limit)

## 6. Configuration Defaults
```
precision=20
rounding=4
toExpNeg=-7
toExpPos=21
minE=-9e15
maxE=9e15
modulo=1
crypto=false
```

## 7. Errors
- Throws DecimalError with message '[DecimalError] Invalid argument: property: value'



## Attribution
- Source: Decimal.js Arbitrary-Precision Arithmetic
- URL: https://mikemcl.github.io/decimal.js/
- License: License: MIT
- Crawl Date: 2025-05-10T08:58:24.049Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
