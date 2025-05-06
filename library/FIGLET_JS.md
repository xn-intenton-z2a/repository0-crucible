# FIGLET_JS

## Crawl Summary
Installation via npm; import figlet; asynchronous method figlet(text, options, callback) returns Promise<string>; synchronous method figlet.textSync(text, options); global defaults() for fontPath; preloadFonts() for browser sync; parseFont(name,data) to add fonts; metadata(name) returns Promise<[options,header]>; fonts() and fontsSync() list fonts; FigletOptions: font:string('Standard'), horizontalLayout:string('default'|'full'|'fitted'|'controlled smushing'|'universal smushing'), verticalLayout:same, width:number, whitespaceBreak:boolean; kerning modes explained; browser usage requires fetch shim; CLI via figlet-cli.

## Normalised Extract
Table of Contents
1 Installation
2 API Methods
3 Options Interface
4 Kerning Modes
5 Browser Integration
6 Command Line Usage
7 Release History

1 Installation
npm install figlet

2 API Methods
2.1 figlet(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
2.2 figlet.text(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
2.3 figlet.textSync(text: string, options?: string|FigletOptions): string
2.4 figlet.defaults(settings: {fontPath?: string}): void
2.5 figlet.preloadFonts(fonts: string[], callback: () => void): void
2.6 figlet.parseFont(name: string, data: string): void
2.7 figlet.metadata(name: string, callback: (err: Error|null, options: FigletOptions, headerComment: string) => void): Promise<[FigletOptions, string]>
2.8 figlet.fonts(callback: (err: Error|null, fonts: string[]) => void): void
2.9 figlet.fontsSync(): string[]

3 Options Interface
font: String, default 'Standard'
horizontalLayout: 'default'|'full'|'fitted'|'controlled smushing'|'universal smushing', default 'default'
verticalLayout: same as horizontalLayout, default 'default'
width: Number, default unlimited
whitespaceBreak: Boolean, default false

4 Kerning Modes
default, full, fitted, controlled smushing, universal smushing

5 Browser Integration
Requires fetch API
Use figlet.defaults({fontPath}) and figlet.preloadFonts([...], callback)
Call figlet or figlet.textSync

6 Command Line Usage
Install figlet-cli globally
Usage: figlet -f <font> <text>

7 Release History
List of versions and dates

## Supplementary Details
Require and import patterns:
- Node.js: var figlet=require('figlet')
- ES Modules: import figlet from 'figlet'
- Webpack/React: import standard from 'figlet/importable-fonts/Standard.js'; figlet.parseFont('Standard',standard)

Implementation Steps:
1 Install npm package
2 Import figlet
3 Call figlet methods with appropriate options
4 For custom fonts, read .flf file and pass content to parseFont
5 In browser, set fontPath and preload fonts before sync calls

Error Handling:
- All async methods accept callback(err,data). err is instance of Error
- Promise rejections return Error

Loading Custom Font:
const data=fs.readFileSync(path,'utf8');
figlet.parseFont('myfont', data)

Metadata Retrieval:
await figlet.metadata('Standard') returns [options,headerComment]

Fonts List:
figlet.fonts(callback) -> fonts:string[]
figlet.fontsSync() -> string[]

## Reference Details
figlet(text: string, options?: string|FigletOptions, callback?: (err:Error|null, data:string)=>void): Promise<string>
- text: input string
- options: string|FigletOptions
- callback: optional

figlet.text(text: string, options?: string|FigletOptions, callback?: (err:Error|null, data:string)=>void): Promise<string>
- identical to above

figlet.textSync(text: string, options?: string|FigletOptions): string

figlet.defaults(settings: { fontPath?: string }): void
- fontPath: directory for font files in browser

figlet.preloadFonts(fonts: string[], callback: () => void): void
- fonts: list of font names
- callback: invoked when loaded

figlet.parseFont(name: string, data: string): void
- name: font identifier
- data: FLF font file content as string

figlet.metadata(name: string, callback: (err:Error|null, options:FigletOptions, headerComment:string)=>void): Promise<[FigletOptions,string]>

figlet.fonts(callback: (err:Error|null, fonts:string[])=>void): void
figlet.fontsSync(): string[]

Options:
{
 font: 'Standard',
 horizontalLayout: 'default',
 verticalLayout: 'default',
 width: undefined,
 whitespaceBreak: false
}

Best Practices:
Use Promise API for async calls; handle rejections. Preload fonts in browser for synchronous rendering. Use parseFont to bundle custom fonts.

Troubleshooting:
Command: npm ls figlet
Expected: figlet@>=1.0.0
Error: ENOENT means missing installation

Browser: missing fetch polyfill triggers ReferenceError: fetch is not defined
Solution: include fetch.min.js before figlet.js

## Information Dense Extract
install:npm install figlet; import:require('figlet')|import figlet; API:figlet(text,options?,cb?):Promise<string>;figlet.text(text,options?,cb?):Promise<string>;figlet.textSync(text,options?):string;figlet.defaults({fontPath});figlet.preloadFonts(fonts[],cb);figlet.parseFont(name,data);figlet.metadata(name,cb):Promise<[options,header]>;figlet.fonts(cb):string[];figlet.fontsSync():string[];Options:{font:'Standard';horizontalLayout:'default'|'full'|'fitted'|'controlled smushing'|'universal smushing';verticalLayout:same;width?:number;whitespaceBreak?:boolean};Kerning:modes;Browser:requires fetch; use defaults+preloadFonts;CLI:npm install -g figlet-cli;figlet -f <font> <text>;Errors:async methods reject Error; sync methods throw;custom fonts:parseFont;metadata returns [options,header]

## Sanitised Extract
Table of Contents
1 Installation
2 API Methods
3 Options Interface
4 Kerning Modes
5 Browser Integration
6 Command Line Usage
7 Release History

1 Installation
npm install figlet

2 API Methods
2.1 figlet(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
2.2 figlet.text(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
2.3 figlet.textSync(text: string, options?: string|FigletOptions): string
2.4 figlet.defaults(settings: {fontPath?: string}): void
2.5 figlet.preloadFonts(fonts: string[], callback: () => void): void
2.6 figlet.parseFont(name: string, data: string): void
2.7 figlet.metadata(name: string, callback: (err: Error|null, options: FigletOptions, headerComment: string) => void): Promise<[FigletOptions, string]>
2.8 figlet.fonts(callback: (err: Error|null, fonts: string[]) => void): void
2.9 figlet.fontsSync(): string[]

3 Options Interface
font: String, default 'Standard'
horizontalLayout: 'default'|'full'|'fitted'|'controlled smushing'|'universal smushing', default 'default'
verticalLayout: same as horizontalLayout, default 'default'
width: Number, default unlimited
whitespaceBreak: Boolean, default false

4 Kerning Modes
default, full, fitted, controlled smushing, universal smushing

5 Browser Integration
Requires fetch API
Use figlet.defaults({fontPath}) and figlet.preloadFonts([...], callback)
Call figlet or figlet.textSync

6 Command Line Usage
Install figlet-cli globally
Usage: figlet -f <font> <text>

7 Release History
List of versions and dates

## Original Source
figlet.js
https://github.com/patorjk/figlet.js

## Digest of FIGLET_JS

# FIGLET.JS

## Quick Start - Node.js

### Installation
```bash
npm install figlet
```

### Simple Usage
```js
var figlet = require("figlet");
figlet("Hello World!!", function(err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
```

## Core API Methods

### figlet(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
Shorthand for figlet.text.

### figlet.text(text: string, options?: string|FigletOptions, callback?: (err: Error|null, data: string) => void): Promise<string>
Generate ASCII art from text.

### figlet.textSync(text: string, options?: string|FigletOptions): string
Synchronous version.

### figlet.defaults(settings: {
  fontPath?: string;
}): void
Set global default fontPath.

### figlet.preloadFonts(fonts: string[], callback: () => void): void
Preload fonts in browser for synchronous textSync.

### figlet.parseFont(name: string, data: string): void
Load custom FLF font data under given name.

### figlet.metadata(name: string, callback: (err: Error|null, options: FigletOptions, headerComment: string) => void): Promise<[FigletOptions, string]>
Retrieve font default options and header comment.

### figlet.fonts(callback: (err: Error|null, fonts: string[]) => void): void
List available fonts (Node.js only).

### figlet.fontsSync(): string[]
Synchronous version of fonts.

## Options Interface
```ts
interface FigletOptions {
  font?: string // default: 'Standard'
  horizontalLayout?: 'default'|'full'|'fitted'|'controlled smushing'|'universal smushing' // default: 'default'
  verticalLayout?: 'default'|'full'|'fitted'|'controlled smushing'|'universal smushing' // default: 'default'
  width?: number // default: no limit
  whitespaceBreak?: boolean // default: false
}
```

## Understanding Kerning
Five layout modes:
- "default": font designer kerning
- "full": full spacing
- "fitted": letters nearly touch
- "controlled smushing": common smushing
- "universal smushing": aggressive smushing

## Browser Usage
Include fetch shim and figlet.js, then: 
```html
<script src="fetch.min.js"></script>
<script src="figlet.js"></script>
<script>
  figlet("text","Standard",function(err,text){ ... });
</script>
```
Preload & defaults for sync:
```js
figlet.defaults({ fontPath: "assets/fonts" });
figlet.preloadFonts(["Standard","Ghost"], ready);
```

## Command Line
Install globally:
```bash
npm install -g figlet-cli
```
Usage:
```bash
figlet -f "Dancing Font" "Hi"
```

## Release History
- v1.8.1 (2025.04.11): Added miniwi font
- v1.8.0 (2024.10.08): Promises support for loadFont, preloadedFonts, metadata; added 5 fonts
- v1.7.0 (2023.10.01): Promises support for text
- ...

## Attribution
- Source: figlet.js
- URL: https://github.com/patorjk/figlet.js
- License: MIT License
- Crawl Date: 2025-05-06T06:32:17.918Z
- Data Size: 561695 bytes
- Links Found: 4536

## Retrieved
2025-05-06
