# CLI_PROGRESS

## Crawl Summary
Installation via npm install cli-progress. SingleBar and MultiBar classes provide progress bars. Options interface keys: format (string, default '{bar} {percentage}% | ETA: {eta}s'), barCompleteChar ('█'), barIncompleteChar ('░'), barGlue ('█'), barsize (40), fps (12), stream (process.stdout), autopadding (true), linewrap (true), hideCursor (true). SingleBar methods: start(total:number, startValue?:number, payload?:any), increment(step?:number, payload?:any), update(current:number, payload?:any), stop(). MultiBar methods: create(total:number, startValue?:number, payload?:any, options?:Options, preset?:Preset): SingleBar, stop():Promise<void>. Presets: shades_classic, shades_grey, legacy. Placeholders: bar, percentage, total, value, eta, duration, barsize, payload. Supports payload injection.

## Normalised Extract
Table of Contents
1 Installation Command
2 Options Interface and Defaults
3 SingleBar Class Methods
4 MultiBar Class Methods
5 Presets Definitions
6 Format String Placeholders

1 Installation Command
npm install cli-progress

2 Options Interface and Defaults
format: string Default '{bar} {percentage}% | ETA: {eta}s'
barCompleteChar: string Default '█'
barIncompleteChar: string Default '░'
barGlue: string Default '█'
barsize: number Default 40
fps: number Default 12
stream: WritableStream Default process.stdout
autopadding: boolean Default true
linewrap: boolean Default true
hideCursor: boolean Default true

3 SingleBar Class Methods
Constructor(options?: Options, preset?: Preset)
start(total: number, startValue?: number, payload?: any): void
increment(step?: number, payload?: any): void
update(current: number, payload?: any): void
stop(): void

4 MultiBar Class Methods
Constructor(options?: Options, preset?: Preset)
create(total: number, startValue?: number, payload?: any, options?: Options, preset?: Preset): SingleBar
stop(): Promise<void>

5 Presets Definitions
shades_classic
shades_grey
legacy

6 Format String Placeholders
bar: renders bar chart
percentage: completion percentage
total: total value
value: current value
eta: estimated time to completion in seconds
duration: elapsed time in seconds
barsize: size of bar in characters
payload.<key>: user-defined data insertion

## Supplementary Details
Supports CommonJS and ESM. Node.js >=8. ESM import: import { SingleBar, MultiBar, Presets } from 'cli-progress'. Payload object merged into formatting context. MultiBar maintains aligned display across multiple bars. Use stop() or promise resolution to ensure cursor resets. Autopadding aligns numbers dynamically. hideCursor toggles terminal cursor visibility via process.stdout.write('\u001B[?25l') and '\u001B[?25h'.

## Reference Details
Class SingleBar
Signature:
new SingleBar(options?: Options, preset?: Preset)
Parameters:
options: Options interface (see below)
preset: Preset object from Presets

Methods:
start(total: number, startValue?: number, payload?: any): void
- total: target number
- startValue: initial progress (default 0)
- payload: object merged into placeholders

increment(step?: number, payload?: any): void
- step: increment amount (default 1)
- payload: updated payload

update(current: number, payload?: any): void
- current: set progress value
- payload: updated payload

stop(): void
- stops timer and renders 100%

Class MultiBar
Signature:
new MultiBar(options?: Options, preset?: Preset)
Methods:
create(total: number, startValue?: number, payload?: any, options?: Options, preset?: Preset): SingleBar
- creates new SingleBar under multi-control
stop(): Promise<void>
- stops all bars, returns when done

Options Interface
format: string Default '{bar} {percentage}% | ETA: {eta}s'
barCompleteChar: string Default '█'
barIncompleteChar: string Default '░'
barGlue: string Default '█'
barsize: number Default 40
fps: number Default 12
stream: WritableStream Default process.stdout
autopadding: boolean Default true
linewrap: boolean Default true
hideCursor: boolean Default true

Presets
Presets.shades_classic:
{ barCompleteChar: '█', barIncompleteChar: '░', barGlue: '█', barsize: 40, autopadding: true }
Presets.shades_grey:
{ barCompleteChar: '#', barIncompleteChar: '-', barGlue: '#', barsize: 40, autopadding: true }
Presets.legacy:
{ barCompleteChar: '=', barIncompleteChar: ' ', barGlue: '=', barsize: 20, autopadding: false }

Examples
```js
import { SingleBar, Presets } from 'cli-progress';
const bar = new SingleBar({ format: 'Progress |{bar}| {percentage}% ' }, Presets.shades_classic);
bar.start(100, 0);
for(let i=0;i<=100;i++){ bar.update(i); }
bar.stop();
```

Best Practices
Always call stop() or await multi.stop() to reset cursor. Use payload for custom placeholders. For parallel tasks, use MultiBar.create().

Troubleshooting
Symptoms: bar not rendering or stuck
Command: console.log(process.stdout.isTTY) // must be true
Fix: ensure stream is TTY or set options.stream explicitly

If cursor remains hidden:
Command: process.stdout.write('\u001B[?25h')

## Information Dense Extract
npm install cli-progress; import { SingleBar, MultiBar, Presets } from 'cli-progress'; Options{format:string='%7{bar}% {percentage}% | ETA:{eta}s',barCompleteChar:string='█',barIncompleteChar:string='░',barGlue:string='█',barsize:number=40,fps:number=12,stream:WritableStream=process.stdout,autopadding:boolean=true,linewrap:boolean=true,hideCursor:boolean=true}; class SingleBar{start(total:number,startValue?:number=0,payload?:any):void;increment(step?:number=1,payload?:any):void;update(current:number,payload?:any):void;stop():void}; class MultiBar{create(total:number,startValue?:number=0,payload?:any,options?:Options,preset?:Preset):SingleBar;stop():Promise<void>}; Presets:shades_classic,shades_grey,legacy; Placeholders:{bar,percentage,total,value,eta,duration,barsize,payload.<key>}. CommonJS require('cli-progress'). Troubleshooting: ensure TTY, reset cursor with '\u001B[?25h'.

## Sanitised Extract
Table of Contents
1 Installation Command
2 Options Interface and Defaults
3 SingleBar Class Methods
4 MultiBar Class Methods
5 Presets Definitions
6 Format String Placeholders

1 Installation Command
npm install cli-progress

2 Options Interface and Defaults
format: string Default '{bar} {percentage}% | ETA: {eta}s'
barCompleteChar: string Default ''
barIncompleteChar: string Default ''
barGlue: string Default ''
barsize: number Default 40
fps: number Default 12
stream: WritableStream Default process.stdout
autopadding: boolean Default true
linewrap: boolean Default true
hideCursor: boolean Default true

3 SingleBar Class Methods
Constructor(options?: Options, preset?: Preset)
start(total: number, startValue?: number, payload?: any): void
increment(step?: number, payload?: any): void
update(current: number, payload?: any): void
stop(): void

4 MultiBar Class Methods
Constructor(options?: Options, preset?: Preset)
create(total: number, startValue?: number, payload?: any, options?: Options, preset?: Preset): SingleBar
stop(): Promise<void>

5 Presets Definitions
shades_classic
shades_grey
legacy

6 Format String Placeholders
bar: renders bar chart
percentage: completion percentage
total: total value
value: current value
eta: estimated time to completion in seconds
duration: elapsed time in seconds
barsize: size of bar in characters
payload.<key>: user-defined data insertion

## Original Source
cli-progress Library
https://github.com/cli-progress/cli-progress#readme

## Digest of CLI_PROGRESS

# CLI Progress

## Installation
```bash
npm install cli-progress
```

## SingleBar Class
```ts
new SingleBar(options?: Options, preset?: Preset)
```

### Methods
```ts
start(total: number, startValue?: number, payload?: any): void
increment(step?: number, payload?: any): void
update(current: number, payload?: any): void
stop(): void
```  

## MultiBar Class
```ts
new MultiBar(options?: Options, preset?: Preset)
```  

### Methods
```ts
create(total: number, startValue?: number, payload?: any, options?: Options, preset?: Preset): SingleBar
stop(): Promise<void>
```  

## Options Interface
```ts
interface Options {
  format?: string        // Default: '{bar} {percentage}% | ETA: {eta}s'
  barCompleteChar?: string  // Default: '█'
  barIncompleteChar?: string // Default: '░'
  barGlue?: string         // Default: '█'
  barsize?: number         // Default: 40
  fps?: number             // Default: 12
  stream?: NodeJS.WritableStream // Default: process.stdout
  autopadding?: boolean    // Default: true
  linewrap?: boolean       // Default: true
  hideCursor?: boolean     // Default: true
}
```  

## Presets
- shades_classic
- shades_grey
- legacy

Use:
```js
const preset = cliProgress.Presets.shades_classic;
```  

## Placeholders
- {bar}
- {percentage}
- {total}
- {value}
- {eta}
- {duration}
- {barsize}
- {payload.<key>}


## Attribution
- Source: cli-progress Library
- URL: https://github.com/cli-progress/cli-progress#readme
- License: License: MIT
- Crawl Date: 2025-05-10T07:29:52.916Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
