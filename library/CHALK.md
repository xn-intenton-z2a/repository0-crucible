# CHALK

## Crawl Summary
npm install chalk; import chalk from 'chalk'; chalk.<style>[.<style>...](string,...string[]):string; chalk.level:0-3; per-instance new Chalk({level}); supportsColor object with level and flags; use FORCE_COLOR env or --color flags to override; separate stderr instance: chalkStderr and supportsColorStderr; exposed arrays: modifierNames, foregroundColorNames, backgroundColorNames, colorNames; style names lists; color models: rgb, hex, ansi256 with bg variants; downsampling levels: 16,256,truecolor; theme definitions via function assignments; string substitution via %s; no dependencies; nestable; high adoption.

## Normalised Extract
Table of Contents:
1 Installation
2 Importing
3 Basic Usage
4 Composable API
5 Theme Definition
6 String Substitution
7 Color Level Configuration
8 Color Detection & Forcing
9 stderr Instance
10 Style Name Arrays
11 Styles List
12 Color Models & Levels

1 Installation
npm install chalk

2 Importing
import chalk from 'chalk'
import {Chalk} from 'chalk'

3 Basic Usage
console.log(chalk.blue('Hello world!'))

4 Composable API
Signature: chalk.<style>[.<style>...](input:string, ...inputs:string[]):string
Chain order irrelevant; last style overrides
Multi-arg: separated by spaces

5 Theme Definition
const error=chalk.bold.red
const warning=chalk.hex('#FFA500')
error('Error!')
warning('Warning!')

6 String Substitution
console.log(chalk.green('Hello %s'), name)

7 Color Level Configuration
chalk.level = 0|1|2|3
const custom=new Chalk({level:0})

8 Color Detection & Forcing
supportsColor: {level, hasBasic, has256, has16m}
FORCE_COLOR=0|1|2|3
Flags: --color, --no-color, --color=256, --color=16m

9 stderr Instance
chalkStderr: Chalk instance configured per stderr support detection
supportsColorStderr: supportsColor for stderr

10 Style Name Arrays
modifierNames: [reset,bold,dim,italic,underline,overline,inverse,hidden,strikethrough,visible]
foregroundColorNames: [black,red,green,yellow,blue,magenta,cyan,white,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright]
backgroundColorNames: [bgBlack,bgRed,bgGreen,bgYellow,bgBlue,bgMagenta,bgCyan,bgWhite,bgBlackBright,bgRedBright,bgGreenBright,bgYellowBright,bgBlueBright,bgMagentaBright,bgCyanBright,bgWhiteBright]
colorNames: combination of both

11 Styles List
Modifiers and color names as above

12 Color Models & Levels
rgb(r,g,b), hex('#rrggbb'), ansi256(n)
bgRgb, bgHex, bgAnsi256
Level1: 16 colors; Level2: 256; Level3: truecolor


## Supplementary Details
Function Signatures and Types:
- chalk.<style>[.<style>...](input:string, ...inputs:string[]):string
- chalk.rgb(r:number,g:number,b:number):Chalk
- chalk.hex(hex:string):Chalk
- chalk.ansi256(code:number):Chalk
- chalk.bgRgb(r:number,g:number,b:number):Chalk
- chalk.bgHex(hex:string):Chalk
- chalk.bgAnsi256(code:number):Chalk
- Chalk constructor: new Chalk(options:{level:number})

Properties:
- chalk.level: number default auto-detected (0-3)
- supportsColor: {level:number,hasBasic:boolean,has256:boolean,has16m:boolean}
- supportsColorStderr: same structure for stderr
- chalkStderr: Chalk
- modifierNames: string[]
- foregroundColorNames: string[]
- backgroundColorNames: string[]
- colorNames: string[]

Environment Variables and CLI Flags:
- FORCE_COLOR: 0 (disable),1 (basic),2 (256),3 (truecolor)
- --color, --no-color (boolean mode)
- --color=256, --color=16m (explicit modes)

Implementation Steps:
1 install via npm
2 import module
3 apply styles via chainable API
4 override global level or create custom Chalk instance
5 use supportsColor to branch logic
6 define theme constants via style combinations



## Reference Details
API Specifications:
function chalk.<style>[.<style>...](input:string, ...inputs:string[]):string
- Applies ANSI escape codes for each style in chain; returns concatenated styled string

property chalk.level:number
- 0: disable all color
- 1: basic (16 colors)
- 2: 256 colors
- 3: truecolor (16 million)

class Chalk
constructor(options:{level:number})
methods returning Chalk instance for further chaining:
- rgb(r:number,g:number,b:number)
- hex(hex:string)
- ansi256(code:number)
- bgRgb(r:number,g:number,b:number)
- bgHex(hex:string)
- bgAnsi256(code:number)
- reset(), bold(), dim(), italic(), underline(), overline(), inverse(), hidden(), strikethrough(), visible()

properties:
- level:number

object supportsColor and supportsColorStderr
type: {level:number,hasBasic:boolean,has256:boolean,has16m:boolean}

utility arrays:
- modifierNames:string[] length 11
- foregroundColorNames:string[] length 16
- backgroundColorNames:string[] length 16
- colorNames:string[] length 32

Exact Code Examples:
import chalk from 'chalk'
console.log(chalk.blue('Hello','World!')) // yields ESC[34mHello World!ESC[39m
console.log(chalk.red.bgWhite.bold('Alert'))
const custom=new Chalk({level:2})
console.log(custom.rgb(0,255,0)('OK'))

Implementation Patterns:
- Create theme constants: const info=chalk.blue; info('Info message')
- Nest styles: chalk.green('green', chalk.red('red'), 'green again')
- Template literals: console.log(`Status: ${chalk.yellow('pending')}`)

Configuration Options:
- Global override: chalk.level=0|1|2|3
- Env override: FORCE_COLOR=...
- CLI flags as described

Best Practices:
- Use new Chalk for reusable modules to avoid global side effects
- Check supportsColor before printing color-specific output
- Define and reuse theme constants for consistency

Troubleshooting Procedures:
- No colors: verify supportsColor.level; run node with --color or set FORCE_COLOR
- stderr color missing: use chalkStderr in console.error
- Windows no color: switch to Windows Terminal or use external ANSI support
- To strip ANSI codes: pipe output through strip-ansi
Commands:
$ FORCE_COLOR=1 node app.js
$ node --color=256 app.js
$ env | grep FORCE_COLOR


## Information Dense Extract
npm install chalk; import chalk from 'chalk'; chalk.<style>[.<style>...](input:string,...inputs:string[]):string; styles: reset,bold,dim,italic,underline,overline,inverse,hidden,strikethrough,visible; colors: black,red,green,yellow,blue,magenta,cyan,white,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright; backgrounds: bgBlack,...,bgWhiteBright; color models: rgb(r,g,b), hex('#rrggbb'), ansi256(n) with bg variants; chalk.level:0-3; new Chalk({level}); supportsColor/supportsColorStderr: {level,hasBasic,has256,has16m}; FORCE_COLOR=0-3; --color flags; theme constants; template literal usage; nesting; new Chalk for libraries; check supportsColor before styling; troubleshooting via env flags and Windows Terminal.

## Sanitised Extract
Table of Contents:
1 Installation
2 Importing
3 Basic Usage
4 Composable API
5 Theme Definition
6 String Substitution
7 Color Level Configuration
8 Color Detection & Forcing
9 stderr Instance
10 Style Name Arrays
11 Styles List
12 Color Models & Levels

1 Installation
npm install chalk

2 Importing
import chalk from 'chalk'
import {Chalk} from 'chalk'

3 Basic Usage
console.log(chalk.blue('Hello world!'))

4 Composable API
Signature: chalk.<style>[.<style>...](input:string, ...inputs:string[]):string
Chain order irrelevant; last style overrides
Multi-arg: separated by spaces

5 Theme Definition
const error=chalk.bold.red
const warning=chalk.hex('#FFA500')
error('Error!')
warning('Warning!')

6 String Substitution
console.log(chalk.green('Hello %s'), name)

7 Color Level Configuration
chalk.level = 0|1|2|3
const custom=new Chalk({level:0})

8 Color Detection & Forcing
supportsColor: {level, hasBasic, has256, has16m}
FORCE_COLOR=0|1|2|3
Flags: --color, --no-color, --color=256, --color=16m

9 stderr Instance
chalkStderr: Chalk instance configured per stderr support detection
supportsColorStderr: supportsColor for stderr

10 Style Name Arrays
modifierNames: [reset,bold,dim,italic,underline,overline,inverse,hidden,strikethrough,visible]
foregroundColorNames: [black,red,green,yellow,blue,magenta,cyan,white,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright]
backgroundColorNames: [bgBlack,bgRed,bgGreen,bgYellow,bgBlue,bgMagenta,bgCyan,bgWhite,bgBlackBright,bgRedBright,bgGreenBright,bgYellowBright,bgBlueBright,bgMagentaBright,bgCyanBright,bgWhiteBright]
colorNames: combination of both

11 Styles List
Modifiers and color names as above

12 Color Models & Levels
rgb(r,g,b), hex('#rrggbb'), ansi256(n)
bgRgb, bgHex, bgAnsi256
Level1: 16 colors; Level2: 256; Level3: truecolor

## Original Source
Chalk
https://github.com/chalk/chalk#readme

## Digest of CHALK

# Chalk Technical Digest (Retrieved 2024-07-05)

# Installation

npm install chalk

# Importing

import chalk from 'chalk';
import {Chalk} from 'chalk';

# Basic Usage

console.log(chalk.blue('Hello world!'));

# Composable API

**Signature**

chalk.<style>[.<style>...](input:string, ...inputs:string[]): string

**Behavior**

- Chain any number of style properties; last one wins on conflict
- Multiple arguments are joined by spaces

# Theme Definition

const error = chalk.bold.red
const warning = chalk.hex('#FFA500')
console.log(error('Error!'))
console.log(warning('Warning!'))

# String Substitution

console.log(chalk.green('Hello %s'), name)

# Color Level Configuration

chalk.level: number (0-3)
new Chalk({level:number}) // per-instance override

# Color Detection & Forcing

- supportsColor: {level, hasBasic, has256, has16m}
- FORCE_COLOR=0|1|2|3 overrides all
- CLI flags: --color, --no-color, --color=256, --color=16m

# stderr Instance

chalkStderr: Chalk // color support based on stderr
supportsColorStderr: supportsColor object

# Exposed Style Name Arrays

modifierNames: string[]
foregroundColorNames: string[]
backgroundColorNames: string[]
colorNames: string[]

# Styles

Modifiers: reset, bold, dim, italic, underline, overline, inverse, hidden, strikethrough, visible
Colors: black, red, green, yellow, blue, magenta, cyan, white, blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright
Backgrounds: bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgBlackBright, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright

# Color Models & Downsampling

- rgb(r:number,g:number,b:number)
- hex(hex:string)
- ansi256(code:number)
- bgRgb, bgHex, bgAnsi256 variants
- Level1 downsampling: 16 colors; Level2: 256; Level3: truecolor

# Performance & Adoption

- No dependencies
- High performance
- Used by ~115,000 packages


## Attribution
- Source: Chalk
- URL: https://github.com/chalk/chalk#readme
- License: MIT License
- Crawl Date: 2025-05-03T08:50:11.740Z
- Data Size: 703582 bytes
- Links Found: 5476

## Retrieved
2025-05-03
