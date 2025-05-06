library/ASCII_ART.md
# library/ASCII_ART.md
# ASCII_ART

## Crawl Summary
Installation: npm install --save ascii-art | CLI: npm install -g ascii-art | Web: install ascii-art-webcomponents. API: art.style(text,style,reset)=>String; art.font(text,font,[sync|cb],cb?)=>Promise<String> or callback; art.image({src,rows,cols,alphabet,lineart,stipple,posterize,blended,threshold},cb); art.table(data,cb); art.graph(data,cb); art.artwork(options,cb) with request module. Chain: .lines(width), .overlay(buf), .border(opts), .strip(), .join(). Color: default 8bit; set is256 or isTrueColor; distance algs listed; merge algs. Testing: npm run test, browser-test, chalk-test. Dev: clone, dev_setup scripts, fonts path, module-auto-link. Deprecations: .toPromise->.completed, .artwork() pending.

## Normalised Extract
Table of Contents
1 Installation
2 API Call Styles
3 Styling Text (art.style)
4 Figlet Fonts (art.font)
5 Image Rendering (art.image)
6 Color Modes & Algorithms
7 Tables & Graphs (art.table, art.graph)
8 Artwork Fetching (art.artwork)
9 Compositing Chains
10 CLI Usage
11 Testing & Development
12 Troubleshooting

1 Installation
In Code: npm install --save ascii-art
CLI global: npm install -g ascii-art or ascii-art-cl
Web components: npm install --save ascii-art-webcomponents

2 API Call Styles
Callback: art.font('Some Text','doom',cb)
Promise: art.font('Some Text','doom').then(text).catch(err)
Await: await art.font('Some Text','doom').completed()

3 Styling Text
Signature: art.style(text,style,resetAll)
Styles: italic, bold, underline, framed, encircled, overline, blink, inverse
Colors: ANSI names
resetAll: true appends reset at end

4 Figlet Fonts
Signature: art.font(text,font,syncOrCb,cb?)
Default font dir: /Fonts
Batch: art.font.strings([texts],font,cb)
Web: <ascii-art-font font='doom'>Text</ascii-art-font>

5 Image Rendering
Signature: art.image(options,cb)
Required: src
Optional: rows, cols, alphabet, lineart, stipple, posterize, blended, threshold
alphabet default: block characters

6 Color Modes & Algorithms
bit-depths: 4,8,32
set via: Color.is256, Color.isTrueColor
Algorithms: list above; combine with '+'

7 Tables & Graphs
art.table(data,cb) returns aligned ANSI table
art.graph({ series,labels},cb) returns ASCII graph

8 Artwork Fetching
art.artwork(options,cb)
Requires request module via ENV or art.setRequest(module)

9 Compositing Chains
.lines(width) splits buffer into lines
.overlay(buffer) compositing overlay
.border({color,style}) wraps border
.strip() remove ANSI
.join() combine into string

10 CLI Usage
text: ascii-art text -s <style> 'Text'
font: ascii-art font -F <font> 'Text'
image: ascii-art image -B <bit> -C <alg> -a <alphabet> --rows --cols <file>

11 Testing & Development
npm run test
npm run browser-test
npm run chalk-test
 clone & setup scripts as above

12 Troubleshooting
Font load: check node_modules/ascii-art/Fonts
Image errors: install canvas shim
CLI missing: verify global install and PATH

## Supplementary Details
Default figlet font path: node_modules/ascii-art/Fonts. ANSI style codes managed by ascii-art-ansi/colors. Canvas shim for Node: install 'canvas'. Webpack & AMD support via UMD wrapper. Recommended distance functions per image type: use 'closestByIntensity' for grayscale, 'CIE76Difference' for color. Environment var ASCII_ART_REQUEST_MODULE=url module name. Use art.setRequest(requestModule) to inject custom HTTP client. Chain execution is asynchronous; call .completed() to await final output. UMD packaging ensures compatibility across CommonJS, AMD, globals. CLI global bin installed to /usr/local/bin/ascii-art. CI: include ./test/dev_setup.sh step. Use npx module-auto-link to fix symlinks after lockfile changes.

## Reference Details
Function Signatures:
 art.style(text: string, style: string|string[], resetAll: boolean): string
 art.font(text: string, font: string, sync?: boolean, cb?: (err: Error, rendered: string)=>void): Promise<string>
 art.font.strings(texts: string[], font: string, cb: (err: Error, rendered: string[])=>void): Promise<string[]>
 art.image(options: {
   src: string;
   rows?: number;
   cols?: number;
   alphabet?: string;
   lineart?: boolean;
   stipple?: boolean|string;
   posterize?: boolean;
   blended?: boolean;
   threshold?: number;
 }, cb: (err: Error, rendered: string)=>void): Promise<string>
 art.table(data: any[], cb: (err: Error, rendered: string)=>void): Promise<string>
 art.graph(data: { series: number[]; labels?: string[] }, cb: (err: Error, rendered: string)=>void): Promise<string>
 art.artwork(options: { url: string; width?: number; height?: number }, cb: (err: Error, rendered: string)=>void): Promise<string>
 Chain Methods:
   .lines(width?: number): AsciiArtChain
   .overlay(buffer: string[]): AsciiArtChain
   .border(options: { color?: string; style?: string }): AsciiArtChain
   .strip(): AsciiArtChain
   .join(): string

Configuration Options:
 Color.is256: boolean = false(default)
 Color.isTrueColor: boolean = false(default)
 Default rows, cols for image: derived from terminal size
 Default alphabet: 'block'
 Default threshold: 128

CLI Syntax:
 ascii-art text -s <style> [-r] <text>
 ascii-art font -F <font> [--sync] <text>
 ascii-art image [-B <bit-depth>] [-C <distance>] [-a <alphabet>] [--rows=<n>] [--cols=<n>] [--stipple=<hex>] [--threshold=<n>] [--posterize] [--lineart] [--blended] <file>
 ascii-art table <jsonData>
 ascii-art graph <jsonData>
 ascii-art artwork --url <url>

Best Practices:
 Use await art.font(...).completed() for sequential compositions
 Preload heavy figlet fonts to reduce I/O latency
 Tune Color distance per image type: append '+algorithm2' to combine
 Use chain methods to overlay dynamic data on static ASCII backdrops

Troubleshooting Procedures:
 1. Error: Cannot find font: doom.flf
    Command: ls node_modules/ascii-art/Fonts/doom.flf; Expected: file exists
 2. Error: Canvas not found
    Command: npm install canvas; verify require('canvas') succeeds
 3. CLI: command not found: ascii-art
    Command: npm install -g ascii-art; then which ascii-art => /usr/local/bin/ascii-art


## Information Dense Extract
install: npm install ascii-art; global: -g ascii-art; web: ascii-art-webcomponents
art.style(text,style[],reset)->string
art.font(text,font,[sync],cb?)->Promise<string>; batch: font.strings()
art.image({src,rows,cols,alphabet,lineart,stipple,posterize,blended,threshold},cb)->Promise<string>
art.table(data,cb); art.graph(data,cb); art.artwork({url},cb) with request module
chain: .lines(), .overlay(), .border(), .strip(), .join()
Color.is256/isTrueColor toggles bit-depth; algorithms: euclideanDistance,classic,ratioDistance,CIE76Difference,closestByIntensity,rankedChannel,simple,minDeviation,luminosity,saturation,hue,original; merge '+'
CLI: text -s style text; font -F font; image -B bit -C alg -a alphabet file
defaults: fonts/path node_modules/ascii-art/Fonts; alphabet 'block'; threshold=128
use .completed() not .toPromise(); .artwork() pending plugin
test: npm run test/browser-test/chalk-test
dev: git clone; ./dev_setup.sh; npx module-auto-link

## Sanitised Extract
Table of Contents
1 Installation
2 API Call Styles
3 Styling Text (art.style)
4 Figlet Fonts (art.font)
5 Image Rendering (art.image)
6 Color Modes & Algorithms
7 Tables & Graphs (art.table, art.graph)
8 Artwork Fetching (art.artwork)
9 Compositing Chains
10 CLI Usage
11 Testing & Development
12 Troubleshooting

1 Installation
In Code: npm install --save ascii-art
CLI global: npm install -g ascii-art or ascii-art-cl
Web components: npm install --save ascii-art-webcomponents

2 API Call Styles
Callback: art.font('Some Text','doom',cb)
Promise: art.font('Some Text','doom').then(text).catch(err)
Await: await art.font('Some Text','doom').completed()

3 Styling Text
Signature: art.style(text,style,resetAll)
Styles: italic, bold, underline, framed, encircled, overline, blink, inverse
Colors: ANSI names
resetAll: true appends reset at end

4 Figlet Fonts
Signature: art.font(text,font,syncOrCb,cb?)
Default font dir: /Fonts
Batch: art.font.strings([texts],font,cb)
Web: <ascii-art-font font='doom'>Text</ascii-art-font>

5 Image Rendering
Signature: art.image(options,cb)
Required: src
Optional: rows, cols, alphabet, lineart, stipple, posterize, blended, threshold
alphabet default: block characters

6 Color Modes & Algorithms
bit-depths: 4,8,32
set via: Color.is256, Color.isTrueColor
Algorithms: list above; combine with '+'

7 Tables & Graphs
art.table(data,cb) returns aligned ANSI table
art.graph({ series,labels},cb) returns ASCII graph

8 Artwork Fetching
art.artwork(options,cb)
Requires request module via ENV or art.setRequest(module)

9 Compositing Chains
.lines(width) splits buffer into lines
.overlay(buffer) compositing overlay
.border({color,style}) wraps border
.strip() remove ANSI
.join() combine into string

10 CLI Usage
text: ascii-art text -s <style> 'Text'
font: ascii-art font -F <font> 'Text'
image: ascii-art image -B <bit> -C <alg> -a <alphabet> --rows --cols <file>

11 Testing & Development
npm run test
npm run browser-test
npm run chalk-test
 clone & setup scripts as above

12 Troubleshooting
Font load: check node_modules/ascii-art/Fonts
Image errors: install canvas shim
CLI missing: verify global install and PATH

## Original Source
ASCII-art Library
https://github.com/khrome/ascii-art#readme

## Digest of ASCII_ART

# ASCII Art JS Library (retrieved 2024-06-10)

## Installation

In Code:
  npm install --save ascii-art

CLI:
  npm install -g ascii-art
  npm install -g ascii-art-cl    (beta)

Web:
  npm install --save ascii-art-webcomponents

## API Call Styles

Callback:
  art.font('Some Text','doom',cb)

Promise:
  art.font('Some Text','doom').then(rendered).catch(err)

Await:
  let rendered = await art.font('Some Text','doom').completed()

## Methods

### art.style
Signature: art.style(text,style,resetAll) -> String
Purpose: add ANSI styles to a string
Parameters:
  text (String)
  style (String or Array of Strings)
  resetAll (Boolean) — append reset code at end
Returns: styled string

### art.font
Signature: art.font(text,font,syncOrCb,cb?) -> Promise<String> or calls cb
Parameters:
  text (String)
  font (String) — figlet font name
  syncOrCb (Boolean or Function) — true for sync, or callback
  cb (Function) — optional callback(err,rendered)
Returns: Promise resolving to rendered ASCII
default font path: /Fonts

### art.image
Signature: art.image(options,cb) -> Promise<String> or calls cb
Options Object:
  src (String) — image file path or URL
  rows (Number) — number of text rows
  cols (Number) — number of text columns
  alphabet (String) — character set, e.g. 'blocks','solid'
  lineart (Boolean)
  stipple (Boolean or String) — true for braille, or color hex
  posterize (Boolean)
  blended (Boolean)
  threshold (Number 0–255)
Callback: cb(err,rendered)

### art.table
Signature: art.table(data,cb) -> Promise<String> or calls cb
Parameters:
  data (Array of Objects)
  cb (Function)
Returns: Promise<String> or calls cb(err,rendered)

### art.graph
Signature: art.graph(data,cb) -> Promise<String> or calls cb
Parameters:
  data (Object with series,labels,options)

### art.artwork
Signature: art.artwork(options,cb)
Requirements: set ENV ASCII_ART_REQUEST_MODULE or call art.setRequest(module)

### Chain Methods
.lines(width)
.overlay(buffer)
.border(options)
.strip()
.join() -> String

## Color Options

Default: 8-bit output. To change:
  require('ascii-art-ansi/colors').is256 = true
  require('ascii-art-ansi/colors').isTrueColor = true

Supported distance algorithms:
  euclideanDistance
  classic
  ratioDistance
  classicByValue
  CIE76Difference
  closestByIntensity
  rankedChannel
  simple
  minDeviation
  luminosity
  saturation
  hue
  original
Merge: 'alg1+alg2'

## CLI Examples

ascii-art text -s green 'Some Text'
ascii-art font -F doom 'Some Text'
ascii-art image -B 8 -C closestByIntensity -a solid --rows=80 --cols=80 myImage.jpg

## Testing

npm run test
npm run browser-test
npm run chalk-test

## Development

git clone git@github.com:<USER>/ascii-art.git
./test/dev_setup.sh
default fonts path: node_modules/ascii-art/Fonts
npx module-auto-link -c 'npm-auto-link'

## Deprecations

.artwork() non-functional until plugin standard arrives
.toPromise() deprecated; use .completed()

## Troubleshooting

Font load error:
  ls node_modules/ascii-art/Fonts/doom.flf

Image processing error:
  npm install canvas
  verify src path


## Attribution
- Source: ASCII-art Library
- URL: https://github.com/khrome/ascii-art#readme
- License: MIT License
- Crawl Date: 2025-05-05T16:50:37.543Z
- Data Size: 902395 bytes
- Links Found: 5062

## Retrieved
2025-05-05
library/CHALK.md
# library/CHALK.md
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
