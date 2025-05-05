# CHALK

## Crawl Summary
Installation: npm install chalk
Import: import chalk from 'chalk'
Usage: console.log(chalk.blue('Hello world!'))
API: chalk.styles(...)(string,...):string; chalk.level:number; new Chalk({level}):Chalk; supportsColor,supportsColorStderr:{level,hasBasic,has256,has16m}; chalkStderr:Chalk; modifierNames,foregroundColorNames,backgroundColorNames,colorNames: string[]
Styles: modifiers, foreground, background color lists
Color models: rgb, hex, ansi256 with bg prefixes
Environment: FORCE_COLOR env and --color flags override detection
Template literals and string substitution support

## Normalised Extract
Table of Contents:
1 Installation
2 Import and Basic Usage
3 Style Chaining and Nesting
4 Template Literals
5 Custom Themes
6 String Substitution
7 Color Support Levels
8 Color Detection Overrides
9 stderr Stream Styling
10 Available Styles
11 Color Models

1 Installation
  npm install chalk

2 Import and Basic Usage
  import chalk from 'chalk'
  console.log(chalk.blue('Hello world!'))

3 Style Chaining and Nesting
  chalk.red.bgBlue.bold('text') → styled string
  chalk.green('outer', chalk.blue('inner'))

4 Template Literals
  console.log(`CPU: ${chalk.red('90%')}`)

5 Custom Themes
  const error=chalk.bold.red
  console.log(error('Error!'))

6 String Substitution
  console.log(chalk.green('Hello %s'), name)

7 Color Support Levels
  chalk.level = 0|1|2|3
  new Chalk({level})

8 Color Detection Overrides
  Environment: FORCE_COLOR=0|1|2|3
  Flags: --color, --no-color, --color=256, --color=16m

9 stderr Stream Styling
  console.error(chalkStderr.red('Error message'))

10 Available Styles
  Modifiers: reset,bold,dim,italic,underline,overline,inverse,hidden,strikethrough,visible
  Foreground: black,red,green,yellow,blue,magenta,cyan,white,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright
  Background: bgBlack,...,bgWhiteBright

11 Color Models
  rgb(r,g,b), hex('#RRGGBB'), ansi256(code)
  bgRgb, bgHex, bgAnsi256

## Supplementary Details
Global configuration: chalk.level defaults to auto-detected level from supportsColor.
SupportsColor detection reads env vars FORCE_COLOR and CLI flags, returns object {level:0-3,hasBasic,has256,has16m}.
To isolate modules: use new Chalk({level:0-3}).
Force enable colors in CI: FORCE_COLOR=1 or CLI flag --color=1.
Force disable in logs: FORCE_COLOR=0 or --no-color.
Chalk instances are immutable; chaining returns new styled string.
Templates can be nested; ensure closing tags auto-reset.
For stderr, import {chalkStderr} or custom instance: new Chalk({level:2}).

## Reference Details
API Specifications:
function chalk.<style>[.<style>...](string text, string... extra): string
Parameters: text:string, extra: string[].
Return: string with ANSI codes.

Property chalk.level: number (0 to 3). Default from supportsColor.level.
Assignment overrides global.

Constructor: new Chalk(options: {level?: number})
Options.level: 0–3. Returns Chalk instance with isolated level and no global side effects.

Property supportsColor: {level:number,hasBasic:boolean,has256:boolean,has16m:boolean}
Property supportsColorStderr: same shape.
Property chalkStderr: Chalk instance using supportsColorStderr.

Constants:
modifierNames: ["reset","bold","dim","italic","underline","overline","inverse","hidden","strikethrough","visible"]
foregroundColorNames: ["black","red","green","yellow","blue","magenta","cyan","white","blackBright","redBright","greenBright","yellowBright","blueBright","magentaBright","cyanBright","whiteBright"]
backgroundColorNames: similar with bg prefix
colorNames: combination of above.

Color Models:
- chalk.rgb(r:number,g:number,b:number)
- chalk.hex(hexString:string)
- chalk.ansi256(code:number)
- bgcolor: bgRgb(r,g,b), bgHex(hexString), bgAnsi256(code)
Return type: Chalk

Examples:
// Basic
import chalk from 'chalk'
console.log(chalk.blue('Info message'))

// Chaining
console.log(chalk.red.bgBlack.bold.underline('Alert'))

// Nesting
console.log(chalk.green('Start', chalk.yellow('mid'), 'end'))

// Template Literal
console.log(`Status: ${chalk.green('OK')}`)

// Custom Instance
import {Chalk} from 'chalk'
const custom= new Chalk({level:2})
console.log(custom.rgb(200,100,50)('Colored text'))

// Force color env
// Linux shell:
// FORCE_COLOR=3 node app.js

// CLI flags:
// node app.js --color=256

Best Practices:
• Use new Chalk in libraries to avoid overriding global chalk.level.
• Always check supportsColor before heavy styling loops.
• Use colorNames arrays to validate dynamic styles.

Troubleshooting:
Command: node script.js
Expected: styled output
If no color, run:
  echo $FORCE_COLOR  # expect 1|2|3
  node script.js --color
If still plain, check supportsColor.level via:
  console.log(chalk.supportsColor)



## Information Dense Extract
chalk.styles(...)(string,...):string  chalk.level:number(0-3)  new Chalk({level}):Chalk  supportsColor/sColorStderr:{level,hasBasic,has256,has16m}  chalkStderr:Chalk  modifierNames,foregroundColorNames,backgroundColorNames,colorNames arrays  rgb(r,g,b),hex('#RRGGBB'),ansi256(code),bgRgb,bgHex,bgAnsi256  FORCE_COLOR env0-3 and flags --color[=level],--no-color override  custom themes via const t=chalk.bold.blue; t('msg')  string substitution chalk.green('Hello %s',name)  template literals embed chalk in backticks  use new Chalk in modules  validate dynamic style names via colorNames  troubleshoot via console.log(supportsColor) and env/flags

## Sanitised Extract
Table of Contents:
1 Installation
2 Import and Basic Usage
3 Style Chaining and Nesting
4 Template Literals
5 Custom Themes
6 String Substitution
7 Color Support Levels
8 Color Detection Overrides
9 stderr Stream Styling
10 Available Styles
11 Color Models

1 Installation
  npm install chalk

2 Import and Basic Usage
  import chalk from 'chalk'
  console.log(chalk.blue('Hello world!'))

3 Style Chaining and Nesting
  chalk.red.bgBlue.bold('text')  styled string
  chalk.green('outer', chalk.blue('inner'))

4 Template Literals
  console.log('CPU: ${chalk.red('90%')}')

5 Custom Themes
  const error=chalk.bold.red
  console.log(error('Error!'))

6 String Substitution
  console.log(chalk.green('Hello %s'), name)

7 Color Support Levels
  chalk.level = 0|1|2|3
  new Chalk({level})

8 Color Detection Overrides
  Environment: FORCE_COLOR=0|1|2|3
  Flags: --color, --no-color, --color=256, --color=16m

9 stderr Stream Styling
  console.error(chalkStderr.red('Error message'))

10 Available Styles
  Modifiers: reset,bold,dim,italic,underline,overline,inverse,hidden,strikethrough,visible
  Foreground: black,red,green,yellow,blue,magenta,cyan,white,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright
  Background: bgBlack,...,bgWhiteBright

11 Color Models
  rgb(r,g,b), hex('#RRGGBB'), ansi256(code)
  bgRgb, bgHex, bgAnsi256

## Original Source
Chalk
https://github.com/chalk/chalk#readme

## Digest of CHALK

# Chalk

## Install

npm install chalk

## Usage

import chalk from 'chalk';
console.log(chalk.blue('Hello world!'));

## API

### chalk.<style>[.<style>...](string, [string...]) → string
Chain styles and call as method with string arguments. Multiple args are space-separated. Later styles override earlier on conflict.

### chalk.level: number
Global color support level (0 – no color, 1 – basic, 2 – 256, 3 – truecolor).

### new Chalk(options: {level?:number}) → Chalk
Create isolated instance. Options.level: 0–3.

### supportsColor: object
Properties: level:number, hasBasic:boolean, has256:boolean, has16m:boolean.

### chalkStderr: Chalk
Instance for stderr with supportsColorStderr.

### supportsColorStderr: object
Same shape as supportsColor for stderr stream.

### modifierNames: string[]
List of modifier identifiers.

### foregroundColorNames: string[]
List of foreground color identifiers.

### backgroundColorNames: string[]
List of background color identifiers.

### colorNames: string[]
Union of foreground and background names.

## Styles

Modifiers: reset, bold, dim, italic, underline, overline, inverse, hidden, strikethrough, visible

Foreground colors: black, red, green, yellow, blue, magenta, cyan, white, blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright

Background colors: bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgBlackBright, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright

## Color Models

rgb(r:number,g:number,b:number), hex(color:string), ansi256(code:number)
Background prefix: bgRgb, bgHex, bgAnsi256

## Environment Overrides

FORCE_COLOR=0|1|2|3 to disable/enable levels. Flags: --color, --no-color, --color=256, --color=16m

## Template Literals

Use inside backticks: `Value: ${chalk.yellow('text')}`

## Custom Themes

const error=chalk.bold.red; console.log(error('Error!'));

## String Substitution

console.log(chalk.green('Hello %s'), name);


## Attribution
- Source: Chalk
- URL: https://github.com/chalk/chalk#readme
- License: MIT License
- Crawl Date: 2025-05-05T20:46:55.361Z
- Data Size: 644569 bytes
- Links Found: 5226

## Retrieved
2025-05-05
