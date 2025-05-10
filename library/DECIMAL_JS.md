# DECIMAL_JS

## Crawl Summary
Decimal.js provides an arbitrary-precision Decimal type for JavaScript. Core features include a single Decimal constructor accepting number, string (with decimal, binary, octal, hex, with exponent notation), and Decimal. Global settings are controlled via Decimal.set({precision:1–1e9,rounding:0–8,minE:-9e15,maxE:9e15,toExpNeg:-9e15,toExpPos:9e15,modulo:0–9,crypto:true/false}). Static methods: add,sub,mul,div,pow,random,clone,noConflict,max,min,sum,hypot. Instance methods cover full arithmetic, trig, exponential, logarithmic, rounding, conversion, comparison, and inspection. Rounding modes 0–8 align with Java BigDecimal; EUCLID=9. Errors include invalid config, underflow→0, overflow→Infinity, missing crypto. Best practices: clone for custom precision, use set for config, chain immutably. Troubleshooting covers invalid args and crypto setup.

## Normalised Extract
Table of Contents
1. Constructor
2. Configuration
3. Static Methods
4. Instance Methods
5. Rounding & Modulo Modes
6. Errors & Edge Cases
7. Best Practices
8. Troubleshooting

1. Constructor
Signature: Decimal(value:number|string|Decimal)⇒Decimal
Supports ±0,±Infinity,NaN; string prefixes: 0b,0o,0x with e/E for base-10 exponent, p/P for base-2 exponent.

2. Configuration
Method: Decimal.set(config:Object)⇒Decimal constructor
Properties:
 precision:int[1,1e9]=20
 rounding:int[0,8]=4
 minE:int[-9e15,0]=-9e15
 maxE:int[0,9e15]=9e15
 toExpNeg:int[-9e15,0]=-7
 toExpPos:int[0,9e15]=21
 modulo:int[0,9]=1
 crypto:bool=false
Use {defaults:true} to reset.

3. Static Methods
add(x,y)⇒Decimal ; sub(x,y)⇒Decimal ; mul(x,y)⇒Decimal ; div(x,y)⇒Decimal ; pow(b,e)⇒Decimal ; max(...args)⇒Decimal ; min(...args)⇒Decimal ; random(dp?:int)⇒Decimal ; clone(cfg?:Object)⇒DecimalConstructor ; noConflict()⇒DecimalConstructor ; sum(...args)⇒Decimal ; hypot(...args)⇒Decimal

4. Instance Methods
plus(x)⇒Decimal ; minus(x)⇒Decimal ; times(x)⇒Decimal ; dividedBy(x)⇒Decimal ; divToInt(x)⇒Decimal ; mod(x)⇒Decimal ; pow(x)⇒Decimal ; abs()⇒Decimal ; neg()⇒Decimal ; floor()⇒Decimal ; ceil()⇒Decimal ; round()⇒Decimal ; trunc()⇒Decimal ; toDP(dp,rm?)⇒Decimal ; toFixed(dp,rm?)⇒string ; toExponential(dp?)⇒string ; toPrecision(sd?)⇒string ; toSD(sd,rm?)⇒Decimal ; cmp(x)⇒-1|0|1|NaN ; eq(x)⇒boolean ; lt(x)/lte(x)/gt(x)/gte(x)⇒boolean ; isZero()/isPos()/isNeg()/isInt()/isNaN()/isFinite()⇒boolean

5. Rounding & Modulo Modes
Constants: ROUND_UP0,ROUND_DOWN1,ROUND_CEIL2,ROUND_FLOOR3,ROUND_HALF_UP4,ROUND_HALF_DOWN5,ROUND_HALF_EVEN6,ROUND_HALF_CEIL7,ROUND_HALF_FLOOR8,EUCLID9

6. Errors & Edge Cases
Throws DecimalError for invalid value or config. Underflow when exponent<minE yields zero; overflow when exponent>maxE yields Infinity. crypto=true without available global.crypto ⇒ throws.

7. Best Practices
- Use Decimal.clone for separate precision contexts.
- Configure via Decimal.set not direct assignment.
- Chain methods immutably.

8. Troubleshooting
Invalid precision throws; crypto setup in Node.js requires global.crypto=require('crypto'); adjust minE/maxE to control under/overflow.

## Supplementary Details
Constructor accepts number|string|Decimal; string may include underscores (_) as digit separators. Exponential notation: e/E for base-10, p/P for base-2. Non-decimal string parsing respects prefix and exponent. Decimal.set validates each property: throws on out-of-range. clone(cfg) deep-copies settings; multiple clones share prototype functions. random(dp) uses crypto.getRandomValues or crypto.randomBytes if crypto=true; dp 0–1e9. toDP and toSD accept optional rounding mode override. Comparison methods use cmp internally. toFixed, toExponential, toPrecision always return string.

Configuration steps:
1. Decimal.set({defaults:true});
2. Decimal.set({precision:50,rounding:Decimal.ROUND_HALF_EVEN});
3. const HighPrec = Decimal.clone({precision:100});
4. Use HighPrec.random(30) for secure random with 30 decimal places.


## Reference Details
### Constructor
Signature: `Decimal(value: number|string|Decimal) ⇒ Decimal`
Throws: DecimalError on invalid value.

### Global Methods
- `Decimal.set(config: {precision?:number,rounding?:number,minE?:number,maxE?:number,toExpNeg?:number,toExpPos?:number,modulo?:number,crypto?:boolean,defaults?:boolean}) ⇒ DecimalConstructor`
- `Decimal.clone(config?: sameAs set) ⇒ DecimalConstructor`
- `Decimal.noConflict() ⇒ DecimalConstructor`

### Static Methods
Function signatures:
```
add(x:number|string|Decimal, y:number|string|Decimal): Decimal
sub(x,y): Decimal
mul(x,y): Decimal
div(x,y): Decimal
pow(base, exponent): Decimal
max(...args: (number|string|Decimal)[]): Decimal
min(...args: (number|string|Decimal)[]): Decimal
sum(...args: (number|string|Decimal)[]): Decimal
hypot(...args: (number|string|Decimal)[]): Decimal
random(dp?: number): Decimal
```
Example:
```
Decimal.set({precision:10});
const r = Decimal.random(20);
```  

### Instance Methods
```
plus(x:number|string|Decimal): Decimal
minus(x): Decimal
times(x): Decimal
dividedBy(x): Decimal
divToInt(x): Decimal
mod(x): Decimal
pow(x): Decimal
abs(): Decimal
neg(): Decimal
floor(): Decimal
ceil(): Decimal
round(): Decimal
trunc(): Decimal
toDecimalPlaces(dp:number, rm?:number): Decimal
toFixed(dp:number, rm?:number): string
toExponential(dp?:number): string
toPrecision(sd?:number): string
toSignificantDigits(sd:number, rm?:number): Decimal
cmp(x: number|string|Decimal): number  // -1, 0, 1, NaN
eq(x): boolean
lt(x)/lte(x)/gt(x)/gte(x): boolean
isZero()/isNeg()/isPos()/isInt()/isNaN()/isFinite(): boolean
```

### Properties
```
Decimal.precision: number
Decimal.rounding: number
Decimal.minE: number
Decimal.maxE: number
Decimal.toExpNeg: number
Decimal.toExpPos: number
Decimal.modulo: number
Decimal.crypto: boolean
```

### Rounding Modes
Enumerated: `ROUND_UP=0`, `ROUND_DOWN=1`, `ROUND_CEIL=2`, `ROUND_FLOOR=3`, `ROUND_HALF_UP=4`, `ROUND_HALF_DOWN=5`, `ROUND_HALF_EVEN=6`, `ROUND_HALF_CEIL=7`, `ROUND_HALF_FLOOR=8`, `EUCLID=9`.

### Best Practices Code
```js
// Multiple precision contexts
const Default = Decimal.clone({defaults:true});
const High = Decimal.clone({precision:50});
console.log(High.div(1,3).toString());  // 0.333...

// Secure random in Node.js
global.crypto = require('crypto');
Decimal.set({crypto:true});
console.log(Decimal.random(16)); // cryptographically secure
```

### Troubleshooting
1. Invalid config:
   - `Decimal.set({precision:0})` ⇒ throws `[DecimalError] Invalid argument: precision: 0`.
2. Crypto error:
   - Set `crypto:true` without global.crypto ⇒ throws `Error: crypto.getRandomValues not available`.
3. Overflow/Underflow:
   - Exponent > maxE ⇒ `Infinity`; < minE ⇒ `0`.
   - Adjust `Decimal.set({maxE:500,minE:-500})`.

Commands to reproduce:
```
node -e "const Decimal=require('decimal.js'); Decimal.set({precision:5}); console.log(new Decimal(1).div(3).toString());"
```

## Information Dense Extract
Decimal(value:number|string|Decimal)⇒Decimal supports ±0/∞/NaN, string prefixes 0b/0o/0x, e/E base-10 exponent, p/P base-2 exponent. Decimal.set({precision:int1–1e9=20,rounding:0–8=4,minE:-9e15,maxE:9e15,toExpNeg:-9e15= -7,toExpPos:9e15=21,modulo:0–9=1,crypto:bool=false,defaults:boolean})⇒DecimalConstructor. clone(config?)⇒DecimalConstructor, noConflict()⇒DecimalConstructor. Static: add,sub,mul,div,pow,max,min,sum,hypot,random(dp?), clone, noConflict. Instance: plus,minus,times,dividedBy,divToInt,mod,pow,abs,neg,floor,ceil,round,trunc,toDecimalPlaces,toFixed,toExponential,toPrecision,toSignificantDigits,cmp,eq,lt,lte,gt,gte,isZero,isPos,isNeg,isInt,isNaN,isFinite. Rounding modes constants: ROUND_UP=0,…,ROUND_HALF_FLOOR=8,EUCLID=9. Errors: invalid config ⇒ DecimalError; underflow exponent<minE⇒0; overflow exponent>maxE⇒Infinity; crypto=true without global.crypto ⇒ Error. Best practices: clone for precision contexts, configure via set, chain immutably. Troubleshoot: adjust precision, import crypto in Node.js.

## Sanitised Extract
Table of Contents
1. Constructor
2. Configuration
3. Static Methods
4. Instance Methods
5. Rounding & Modulo Modes
6. Errors & Edge Cases
7. Best Practices
8. Troubleshooting

1. Constructor
Signature: Decimal(value:number|string|Decimal)Decimal
Supports 0,Infinity,NaN; string prefixes: 0b,0o,0x with e/E for base-10 exponent, p/P for base-2 exponent.

2. Configuration
Method: Decimal.set(config:Object)Decimal constructor
Properties:
 precision:int[1,1e9]=20
 rounding:int[0,8]=4
 minE:int[-9e15,0]=-9e15
 maxE:int[0,9e15]=9e15
 toExpNeg:int[-9e15,0]=-7
 toExpPos:int[0,9e15]=21
 modulo:int[0,9]=1
 crypto:bool=false
Use {defaults:true} to reset.

3. Static Methods
add(x,y)Decimal ; sub(x,y)Decimal ; mul(x,y)Decimal ; div(x,y)Decimal ; pow(b,e)Decimal ; max(...args)Decimal ; min(...args)Decimal ; random(dp?:int)Decimal ; clone(cfg?:Object)DecimalConstructor ; noConflict()DecimalConstructor ; sum(...args)Decimal ; hypot(...args)Decimal

4. Instance Methods
plus(x)Decimal ; minus(x)Decimal ; times(x)Decimal ; dividedBy(x)Decimal ; divToInt(x)Decimal ; mod(x)Decimal ; pow(x)Decimal ; abs()Decimal ; neg()Decimal ; floor()Decimal ; ceil()Decimal ; round()Decimal ; trunc()Decimal ; toDP(dp,rm?)Decimal ; toFixed(dp,rm?)string ; toExponential(dp?)string ; toPrecision(sd?)string ; toSD(sd,rm?)Decimal ; cmp(x)-1|0|1|NaN ; eq(x)boolean ; lt(x)/lte(x)/gt(x)/gte(x)boolean ; isZero()/isPos()/isNeg()/isInt()/isNaN()/isFinite()boolean

5. Rounding & Modulo Modes
Constants: ROUND_UP0,ROUND_DOWN1,ROUND_CEIL2,ROUND_FLOOR3,ROUND_HALF_UP4,ROUND_HALF_DOWN5,ROUND_HALF_EVEN6,ROUND_HALF_CEIL7,ROUND_HALF_FLOOR8,EUCLID9

6. Errors & Edge Cases
Throws DecimalError for invalid value or config. Underflow when exponent<minE yields zero; overflow when exponent>maxE yields Infinity. crypto=true without available global.crypto  throws.

7. Best Practices
- Use Decimal.clone for separate precision contexts.
- Configure via Decimal.set not direct assignment.
- Chain methods immutably.

8. Troubleshooting
Invalid precision throws; crypto setup in Node.js requires global.crypto=require('crypto'); adjust minE/maxE to control under/overflow.

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMAL_JS

# DECIMAL.JS ARBITRARY-PRECISION JAVASCRIPT LIBRARY

## 1. Constructor

### Signature
```
Decimal(value: number|string|Decimal) ⇒ Decimal
```

### Description
Creates a new immutable Decimal instance from numeric, string, or another Decimal. Supports ±0, ±Infinity, NaN, binary (0b), octal (0o), hexadecimal (0x) with optional power-of-two exponent (`p`/`P`) or power-of-ten exponent (`e`/`E`).

### Examples
```
new Decimal(9)                       // '9'
new Decimal('4.321e+4')             // '43210'
new Decimal('-0b10110100.1')        // '-180.5'
new Decimal('0x1.8p-5')             // '0.046875'
```  

## 2. Global Configuration

### Decimal.set(config: Object) ⇒ Decimal constructor
Validates and applies settings (`precision`, `rounding`, `minE`, `maxE`, `toExpNeg`, `toExpPos`, `modulo`, `crypto`).  

#### Properties and Defaults
```
precision: 20         // 1 to 1e9 significant digits
rounding: 4          // 0–8 (0=ROUND_UP,4=ROUND_HALF_UP)
minE: -9e15          // underflow limit exponent
maxE: 9e15           // overflow limit exponent
toExpNeg: -7         // exponent ≤ uses exponential notation
toExpPos: 21         // exponent ≥ uses exponential notation
modulo: 1            // modulo mode (0–9)
crypto: false        // secure random when true
```

#### Examples
```
Decimal.set({ precision: 50, rounding: Decimal.ROUND_FLOOR })
Decimal.set({ defaults: true })                   // reset to defaults
Decimal.precision = 40                            // bypasses validation
```  

## 3. Static Methods

| Method   | Signature                        | Returns | Description            |
|----------|----------------------------------|---------|------------------------|
| add      | Decimal.add(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal | Decimal | Sum, aliased plus     |
| sub      | Decimal.sub(x, y)               ⇒ Decimal | Decimal | Difference, aliased minus |
| mul      | Decimal.mul(x, y)               ⇒ Decimal | Decimal | Product, aliased times |
| div      | Decimal.div(x, y)               ⇒ Decimal | Decimal | Quotient, aliased dividedBy |
| max      | Decimal.max(...args)            ⇒ Decimal | Decimal | Maximum of arguments  |
| min      | Decimal.min(...args)            ⇒ Decimal | Decimal | Minimum of arguments  |
| pow      | Decimal.pow(base, exponent)     ⇒ Decimal | Decimal | Power                 |
| random   | Decimal.random(dp?: number)     ⇒ Decimal | Decimal | Pseudo- or crypto-secure random in [0,1) |
| clone    | Decimal.clone(config?: Object)  ⇒ Decimal constructor | constructor | New Decimal type with independent settings |
| noConflict | Decimal.noConflict()           ⇒ Decimal constructor | constructor | Restore previous global and return Decimal |

## 4. Instance Methods

| Method           | Signature                           | Returns      | Rounds? |
|------------------|-------------------------------------|--------------|---------|
| plus/add         | .plus(x) ⇒ Decimal                  | Decimal      | yes     |
| minus/sub        | .minus(x) ⇒ Decimal                 | Decimal      | yes     |
| times/mul        | .times(x) ⇒ Decimal                 | Decimal      | yes     |
| dividedBy/div    | .dividedBy(x) ⇒ Decimal             | Decimal      | yes     |
| divToInt         | .divToInt(x) ⇒ Decimal              | Decimal      | yes     |
| mod/modulo       | .mod(x) ⇒ Decimal                   | Decimal      | yes     |
| pow/toPower      | .pow(x) ⇒ Decimal                   | Decimal      | yes     |
| abs              | .abs() ⇒ Decimal                    | Decimal      | no      |
| neg              | .neg() ⇒ Decimal                    | Decimal      | no      |
| floor            | .floor() ⇒ Decimal                  | Decimal      | no      |
| ceil             | .ceil() ⇒ Decimal                   | Decimal      | no      |
| round            | .round() ⇒ Decimal                  | Decimal      | yes     |
| trunc            | .trunc() ⇒ Decimal                  | Decimal      | no      |
| toDP             | .toDecimalPlaces(dp: number, rm?: number) ⇒ Decimal | Decimal | yes     |
| toFixed          | .toFixed(dp: number, rm?: number) ⇒ string | string | yes |
| toExponential    | .toExponential(dp?: number) ⇒ string | string     | yes     |
| toPrecision      | .toPrecision(sd?: number) ⇒ string  | string       | yes     |
| toSD             | .toSignificantDigits(sd: number, rm?: number) ⇒ Decimal | Decimal | yes     |
| cmp              | .cmp(x) ⇒ number                    | -1,0,1,NaN  | n/a     |
| eq/equals        | .eq(x) ⇒ boolean                    | boolean     | n/a     |
| lt, lte, gt, gte| .lt(x)/.lte()/.gt()/.gte() ⇒ boolean| boolean     | n/a     |
| isZero, isPos, isNeg, isInt, isNaN, isFinite | .isZero() ⇒ boolean, etc. | boolean | n/a |
| sum              | .sum(...args) ⇒ Decimal             | Decimal      | yes     |
| hypot            | .hypot(...args) ⇒ Decimal           | Decimal      | yes     |

## 5. Rounding and Modulo Modes

| Constant                | Value | Description                           |
|-------------------------|-------|---------------------------------------|
| ROUND_UP                | 0     | Round away from zero                  |
| ROUND_DOWN              | 1     | Round towards zero                    |
| ROUND_CEIL              | 2     | Round towards +Infinity               |
| ROUND_FLOOR             | 3     | Round towards -Infinity               |
| ROUND_HALF_UP           | 4     | Nearest, tie away from zero           |
| ROUND_HALF_DOWN         | 5     | Nearest, tie towards zero             |
| ROUND_HALF_EVEN         | 6     | Nearest, tie to even                  |
| ROUND_HALF_CEIL         | 7     | Nearest, tie towards Infinity         |
| ROUND_HALF_FLOOR        | 8     | Nearest, tie towards -Infinity        |
| EUCLID                  | 9     | Euclidean modulo (always positive)    |

## 6. Errors and Edge Cases

- Throws DecimalError on invalid constructor value or config.
- Direct assignment of config props bypasses validation.
- Underflow: result exponent < minE ⇒ zero.
- Overflow: result exponent > maxE ⇒ Infinity.
- Crypto random: crypto=true without global.crypto methods ⇒ throws.

## 7. Best Practices

- Use multiple Decimal types for differing precision: `const D9 = Decimal.clone({ precision:9 });`.
- Reset to defaults: `Decimal.set({ defaults:true });`.
- Avoid direct assignment: use `.set()` to maintain validity.
- Chain immutable operations: `new Decimal(2).times(3).plus(1)`.

## 8. Troubleshooting

### Invalid Precision Error
```
Decimal.set({ precision: 0 })
// Throws [DecimalError] Invalid argument: precision: 0
```  
Solution: Ensure `precision` ∈ [1,1e9].

### Crypto Pseudo-Random Unavailable
```
Decimal.set({ crypto: true })
// Throws Error: crypto.getRandomValues or crypto.randomBytes not available
```  
Solution: In Node.js: `global.crypto = require('crypto')`.

### Underflow to Zero
```
Decimal.set({ minE: -3 });
new Decimal('0.0001')  // '0'
```  
Solution: Adjust `minE` or use higher precision.


## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-10T18:40:15.119Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
