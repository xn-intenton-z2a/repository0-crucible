# DECIMAL_JS

## Crawl Summary
Constructor new Decimal(value:number|string|Decimal)=>Decimal; precision in significant digits; default precision=20, rounding=4. Global config via Decimal.set({precision:number,rounding:number}); clone with independent config via Decimal.clone. Core methods: plus,minus,times,dividedBy,modulo,pow,sqrt,abs,neg; conversions: toString,toFixed(dp),toExponential(sd),toPrecision(sd),toBinary(p),toFraction(maxDen?); comparisons: equals=>boolean,comparedTo=>-1|0|1; aliases: add,sub,mul,div,cmp,pow=>toPower,sqrt=>squareRoot; read-only props d:number[],e:number,s:±1. Import via require or ES module. String inputs support underscores and 0x/0b prefixes. Immutable chaining. Test with npm test. Minify with uglifyjs or terser.

## Normalised Extract
Table of Contents:
1 Constructor
2 Arithmetic Methods
3 Conversion Methods
4 Comparison Methods
5 Configuration
6 Internal Representation
7 Extensions & Utilities
8 Testing & Minification

1 Constructor
   Signature: new Decimal(value:number|string|Decimal) => Decimal
   Accepts:  numeric literal, decimal string, exponential, binary/hex/octal string, Decimal instance
   Recommended: pass strings for >15 significant digits or values outside Number range

2 Arithmetic Methods
   plus(n:number|string|Decimal):Decimal       alias: add
   minus(n):Decimal                             alias: sub
   times(n):Decimal                             alias: mul
   dividedBy(n):Decimal                         alias: div
   mod(n):Decimal                               alias: modulo
   pow(n):Decimal                               alias: toPower
   sqrt():Decimal                               alias: squareRoot
   abs():Decimal
   neg():Decimal                                alias: negated

3 Conversion Methods
   toString():string
   toNumber():number
   toJSON():string
   toFixed(dp:number=0):string
   toExponential(sd:number):string
   toPrecision(sd:number):string
   toBinary(p?:number):string
   toFraction(maxDenominator?:number):[string,string]

4 Comparison Methods
   equals(n):boolean
   comparedTo(n):-1|0|1                         alias: cmp
   lt(n):boolean, lte(n):boolean, gt(n):boolean, gte(n):boolean

5 Configuration
   Decimal.set({ precision:number, rounding:number }) => typeof Decimal
   Decimal.clone({ precision:number, rounding:number }) => DecimalConstructor
   Default: precision=20, rounding=4
   Rounding modes: 0=ROUND_UP,1=ROUND_DOWN,2=ROUND_CEIL,3=ROUND_FLOOR,4=ROUND_HALF_UP,5=ROUND_HALF_DOWN,6=ROUND_HALF_EVEN,7=ROUND_HALF_CEIL,8=ROUND_HALF_FLOOR

6 Internal Representation
   x.d:Array<number>  digits in base 1e7
   x.e:number         exponent base 10
   x.s:±1             sign

7 Extensions & Utilities
   Underscore separators in string literals
   Hex/binary/octal input prefixes
   Immutable chaining: methods return new Decimal

8 Testing & Minification
   Tests: npm test, node test/modules/<module>
   Minify (uglify-js, terser) with source maps


## Supplementary Details
Installation & Import:
  npm install decimal.js
  const Decimal = require('decimal.js')
  import Decimal from 'decimal.js'
  import { Decimal } from 'decimal.js'

Input Formats:
  Decimal('1_000_000') => '1000000'
  Decimal('0xFF.A') => '255.625'
  Decimal('0b1010.11') => '10.75'
  Decimal('123e-4') => '0.0123'

Default Configuration Values:
  Decimal.precision   = 20
  Decimal.rounding    = 4 (ROUND_HALF_UP)
  Decimal.toExpNeg    = -7
  Decimal.toExpPos    = 21
  Decimal.minE        = -9e15
  Decimal.maxE        = 9e15
  Decimal.modulo      = 1
  Decimal.crypto      = false

Rounding Modes Enumeration:
  Decimal.ROUND_UP         = 0
  Decimal.ROUND_DOWN       = 1
  Decimal.ROUND_CEIL       = 2
  Decimal.ROUND_FLOOR      = 3
  Decimal.ROUND_HALF_UP    = 4
  Decimal.ROUND_HALF_DOWN  = 5
  Decimal.ROUND_HALF_EVEN  = 6
  Decimal.ROUND_HALF_CEIL  = 7
  Decimal.ROUND_HALF_FLOOR = 8

Configuration Steps:
  1. Decimal.set({ precision: <int>, rounding: <mode> })
  2. Optional create clone: const Dec2 = Decimal.clone({ precision, rounding })
  3. Use new Dec2() for independent precision contexts


## Reference Details
Constructor:
  new Decimal(value:number|string|Decimal) => Decimal

Static Methods:
  Decimal.set(config:Object) => typeof Decimal
    config.precision?:number    default:20
    config.rounding?:number     default:4
    config.toExpNeg?:number     default:-7
    config.toExpPos?:number     default:21
    config.minE?:number         default:-9e15
    config.maxE?:number         default:9e15
    config.modulo?:number       default:1
    config.crypto?:boolean      default:false

  Decimal.clone(config:Object) => DecimalConstructor
    same config options as set

Rounding Modes Constants:
  Decimal.ROUND_UP = 0
  Decimal.ROUND_DOWN = 1
  Decimal.ROUND_CEIL = 2
  Decimal.ROUND_FLOOR = 3
  Decimal.ROUND_HALF_UP = 4
  Decimal.ROUND_HALF_DOWN = 5
  Decimal.ROUND_HALF_EVEN = 6
  Decimal.ROUND_HALF_CEIL = 7
  Decimal.ROUND_HALF_FLOOR = 8

Instance Methods:
Arithmetic:
  plus(n)       => Decimal
  minus(n)      => Decimal
  times(n)      => Decimal
  dividedBy(n)  => Decimal
  mod(n)        => Decimal
  pow(n)        => Decimal
  sqrt()        => Decimal
  abs()         => Decimal
  neg()         => Decimal

Comparison:
  equals(n)             => boolean
  comparedTo(n)         => -1|0|1
  lt(n), lte(n), gt(n), gte(n) => boolean

Format & Conversion:
  toString()            => string
  toNumber()            => number
  toJSON()              => string
  toFixed(dp)           => string
  toExponential(sd)     => string
  toPrecision(sd)       => string
  toBinary(p?)          => string
  toFraction(maxDen?)   => [string,string]

Internal Properties:
  d:Array<number>       readable digits in base1e7
  e:number              exponent base10
  s:number              sign (1 or -1)

Best Practices:
  - Use string inputs for >15 significant digits
  - Avoid Number inputs for values outside JS numeric range
  - Rounding and precision via set or clone
  - Immutable: methods do not mutate instances

Troubleshooting:
  Precision loss: verify value passed as string
  Unexpected Infinity/Zero: check range of exponent
  Environment compatibility: ES3 minimum
  Test failure: run npm test, inspect test/test.html in browser

Minification:
  npm install uglify-js -g
  uglifyjs decimal.js --source-map url=decimal.min.js.map -c -m -o decimal.min.js

  npm install terser -g
  terser decimal.mjs --source-map url=decimal.min.mjs.map -c -m --toplevel -o decimal.min.mjs


## Information Dense Extract
Decimal(value:number|string|Decimal)=>Decimal; Global: Decimal.set({precision:number(20),rounding:number(4),toExpNeg:-7,toExpPos:21,minE:-9e15,maxE:9e15,modulo:1,crypto:false}); Clone: Decimal.clone(config)=>Constructor; Rounding modes 0-8; Methods: plus/minus/times/dividedBy/mod/pow/sqrt/abs/neg => Decimal; equals=>boolean; comparedTo=>-1|0|1; lt/lte/gt/gte=>boolean; toString/toNumber/toJSON => string/number; toFixed(dp)/toExponential(sd)/toPrecision(sd)/toBinary(p?)/toFraction(max?)->string or [string,string]; Props: d:Array<number>,e:number,s:number; Install: npm install decimal.js; Import: require or ES module; Inputs: supports underscores and 0x/0b prefixes; Immutable chaining; Use string inputs for >15 digits; Test: npm test; Minify: uglifyjs, terser.

## Sanitised Extract
Table of Contents:
1 Constructor
2 Arithmetic Methods
3 Conversion Methods
4 Comparison Methods
5 Configuration
6 Internal Representation
7 Extensions & Utilities
8 Testing & Minification

1 Constructor
   Signature: new Decimal(value:number|string|Decimal) => Decimal
   Accepts:  numeric literal, decimal string, exponential, binary/hex/octal string, Decimal instance
   Recommended: pass strings for >15 significant digits or values outside Number range

2 Arithmetic Methods
   plus(n:number|string|Decimal):Decimal       alias: add
   minus(n):Decimal                             alias: sub
   times(n):Decimal                             alias: mul
   dividedBy(n):Decimal                         alias: div
   mod(n):Decimal                               alias: modulo
   pow(n):Decimal                               alias: toPower
   sqrt():Decimal                               alias: squareRoot
   abs():Decimal
   neg():Decimal                                alias: negated

3 Conversion Methods
   toString():string
   toNumber():number
   toJSON():string
   toFixed(dp:number=0):string
   toExponential(sd:number):string
   toPrecision(sd:number):string
   toBinary(p?:number):string
   toFraction(maxDenominator?:number):[string,string]

4 Comparison Methods
   equals(n):boolean
   comparedTo(n):-1|0|1                         alias: cmp
   lt(n):boolean, lte(n):boolean, gt(n):boolean, gte(n):boolean

5 Configuration
   Decimal.set({ precision:number, rounding:number }) => typeof Decimal
   Decimal.clone({ precision:number, rounding:number }) => DecimalConstructor
   Default: precision=20, rounding=4
   Rounding modes: 0=ROUND_UP,1=ROUND_DOWN,2=ROUND_CEIL,3=ROUND_FLOOR,4=ROUND_HALF_UP,5=ROUND_HALF_DOWN,6=ROUND_HALF_EVEN,7=ROUND_HALF_CEIL,8=ROUND_HALF_FLOOR

6 Internal Representation
   x.d:Array<number>  digits in base 1e7
   x.e:number         exponent base 10
   x.s:1             sign

7 Extensions & Utilities
   Underscore separators in string literals
   Hex/binary/octal input prefixes
   Immutable chaining: methods return new Decimal

8 Testing & Minification
   Tests: npm test, node test/modules/<module>
   Minify (uglify-js, terser) with source maps

## Original Source
Decimal.js for Arbitrary-Precision Arithmetic
https://github.com/MikeMcl/decimal.js

## Digest of DECIMAL_JS

# DECIMAL_JS ARBITRARY-PRECISION ARITHMETIC
Retrieved: 2024-06-18
Data Size: 525774 bytes

## Load

Browser:
<script src="path/to/decimal.js"></script>

ES Module:
<script type="module">
  import Decimal from './path/to/decimal.mjs';
</script>

Node.js:
npm install decimal.js
const Decimal = require('decimal.js');
import Decimal from 'decimal.js';
import { Decimal } from 'decimal.js';

## Usage

Constructor:
x = new Decimal(123.4567)
y = new Decimal('123456.7e-3')

Precision loss examples:
new Decimal(1.0000000000000001)         // '1'
new Decimal(88259496234518.57)          // '88259496234518.56'
new Decimal(99999999999999999999)       // '100000000000000000000'

Non-decimal string formats:
x = new Decimal('2_147_483_647')
x = new Decimal('0xff.f')            // '255.9375'
y = new Decimal('0b10101100')        // '172'

Binary conversion:
z = x.plus(y)                        // '427.9375'
z.toBinary()                         // '0b110101011.1111'
z.toBinary(13)                       // '0b1.101010111111p+8'

Exponent notation input:
x = new Decimal('0b1.1111111111111111111111111111111111111111111111111111p+1023')
// '1.7976931348623157081e+308'

## Immutable Operations & Chaining

x = new Decimal(0.3)
x.minus(0.1)                  // '0.2'
x                             // '0.3'

x.dividedBy(y).plus(z).times(9).floor()
x.times('1.23456780123456789e+9').plus(9876.5432321).dividedBy('4444562598.111772').ceil()

## Aliases & Replicated Math Methods

Aliases:
x.sqrt() equals x.squareRoot()
x.div() equals x.dividedBy()
x.pow() equals x.toPower()
x.cmp() equals x.comparedTo()

Math methods:
x.toExponential(5)           // '2.55500e+2'
x.toFixed(5)                 // '255.50000'
x.toPrecision(5)             // '255.50'
Decimal.sqrt('6.98372465832e+9823') // '8.3568682281821340204e+4911'

## Fractions, NaN & Infinity

pi = new Decimal(355).dividedBy(113)  // '3.1415929204'
pi.toFraction()                       // [ '7853982301', '2500000000' ]
pi.toFraction(1000)                   // [ '355', '113' ]

x = new Decimal(NaN)                  // 'NaN'
y = new Decimal(Infinity)             // 'Infinity'
x.isNaN() && !y.isFinite()           // true

## Configuration

Global:
Decimal.set({ precision: 5, rounding: 4 })

Clone:
Dec = Decimal.clone({ precision: 9, rounding: 1 })
x = new Decimal(5)
y = new Dec(5)

## Internal Properties (Read-Only)

x = new Decimal(-12345.67)
x.d                            // [ 12345, 6700000 ]
x.e                            // 4
x.s                            // -1

## Testing

npm test
node test/modules/toFraction
open test/test.html

## Minification

uglify-js:
npm install uglify-js -g
uglifyjs decimal.js --source-map url=decimal.min.js.map -c -m -o decimal.min.js

terser:
npm install terser -g
terser decimal.mjs --source-map url=decimal.min.mjs.map -c -m --toplevel -o decimal.min.mjs

## License

MIT License


## Attribution
- Source: Decimal.js for Arbitrary-Precision Arithmetic
- URL: https://github.com/MikeMcl/decimal.js
- License: MIT
- Crawl Date: 2025-05-12T12:31:13.749Z
- Data Size: 525774 bytes
- Links Found: 4322

## Retrieved
2025-05-12
