# CLI_PROGRESS

## Crawl Summary
CLI-PROGRESS v3.9.1 exports SingleBar and MultiBar classes with Presets. SingleBar constructed via new SingleBar(options, preset) accepts SingleBarOptions (format, barCompleteChar, barIncompleteChar, hideCursor, stopOnComplete, fps, barsize, stream). Methods: start(total, startValue, payload), update(value, payload), increment(step, payload), stop(), lastDraw(), render(). MultiBar via new MultiBar(options, preset) plus create(total, startValue, payload, options), stop(), stopAll(). Default options: format '{bar} {percentage}%', completeChar '=', incompleteChar '-', hideCursor true, stopOnComplete true, fps 10, barsize 40, stream stderr. Templates in Presets.shades_classic and shades_grey.

## Normalised Extract
Table of Contents
1 Installation
2 Import and Presets
3 SingleBar Class
4 MultiBar Class
5 Configuration Options
6 Methods
7 Examples

1 Installation
npm install cli-progress@3.9.1

2 Import and Presets
const { SingleBar, MultiBar, Presets } = require('cli-progress');
Presets.shades_classic, Presets.shades_grey

3 SingleBar Class
Constructor: new SingleBar(options?: SingleBarOptions, preset?: Preset)

4 MultiBar Class
Constructor: new MultiBar(options?: SingleBarOptions, preset?: Preset)

5 Configuration Options (SingleBarOptions)
format: string                // e.g. 'progress | {bar} | {percentage}% | ETA: {eta}s'
barCompleteChar: string        // default '='
barIncompleteChar: string      // default '-'
hideCursor: boolean            // default true
stopOnComplete: boolean        // default true
fps: number                    // default 10
barsize: number                // default 40
stream: NodeJS.WritableStream  // default process.stderr
clearOnComplete: boolean       // MultiBar default false

6 Methods
SingleBar:start(total: number, startValue?: number, payload?: Object): void
SingleBar:update(value: number, payload?: Object): void
SingleBar:increment(step?: number, payload?: Object): void
SingleBar:stop(): void
SingleBar:lastDraw(): Record<string, any>
SingleBar:render(): void
MultiBar:create(total: number, startValue?: number, payload?: Object, options?: SingleBarOptions): SingleBar
MultiBar:stop(): void
MultiBar:stopAll(): void

7 Examples
SingleBar usage: instantiate with options and preset, call start, update/increment in loop, stop when done.
MultiBar usage: instantiate Multibar, create individual bars with create, control each bar independently, stop all at end.

## Supplementary Details
Default Option Values
format: '{bar} {percentage}%'
barCompleteChar: '='
barIncompleteChar: '-'
hideCursor: true
stopOnComplete: true
fps: 10
barsize: 40
stream: process.stderr
clearOnComplete (MultiBar): false

Implementation Steps
1 Install module
2 Import SingleBar, MultiBar, Presets
3 Instantiate bar(s) with desired options and preset
4 Call start(total, startValue)
5 In work loop call update(value) or increment(step)
6 On completion call stop() or multibar.stopAll()

Core Functionality
- Payload parameter merges into format tokens
- lastDraw() returns object {value, total, eta, ...}
- render() forces immediate draw

Error Handling
- Ensure hideCursor false if bar not stopped to restore cursor
- Use clearOnComplete false to preserve final bar on screen

## Reference Details
Module Exports:
- function new SingleBar(options?: SingleBarOptions, preset?: Preset): SingleBar
- function new MultiBar(options?: SingleBarOptions, preset?: Preset): MultiBar
- object Presets { shades_classic, shades_grey }

SingleBarOptions Interface:
interface SingleBarOptions {
  format?: string;
  barCompleteChar?: string;
  barIncompleteChar?: string;
  hideCursor?: boolean;
  stopOnComplete?: boolean;
  fps?: number;
  barsize?: number;
  stream?: NodeJS.WritableStream;
  clearOnComplete?: boolean;
}

SingleBar Methods:
start(total: number, startValue?: number, payload?: Record<string, any>): void
update(value: number, payload?: Record<string, any>): void
increment(step?: number, payload?: Record<string, any>): void
stop(): void
lastDraw(): { value: number; total: number; eta: number; percentage: number; [key: string]: any }
render(): void

MultiBar Methods:
create(total: number, startValue?: number, payload?: Record<string, any>, options?: SingleBarOptions): SingleBar
stop(): void
stopAll(): void

Best Practices:
- Use stopOnComplete: false to chain animations
- Set hideCursor: false during debug to avoid lost cursor position
- Use process.stderr for logging parallel to stdout output
- Encapsulate bar logic in try/finally to ensure stop()

Troubleshooting:
Issue: bar hangs in CI
  Command: export CI=true && node script.js
  Solution: set clearOnComplete: true or disable hideCursor

Issue: malformed format
  Symptom: format tokens not replaced
  Fix: ensure payload keys match tokens

Issue: performance drop
  Check fps and barsize, reduce fps or barsize to optimize

Commands:
node --version
npm list cli-progress


## Information Dense Extract
SingleBar(options, preset) options:format:string,barCompleteChar:string='=',barIncompleteChar:string='-',hideCursor:boolean=true,stopOnComplete:boolean=true,fps:number=10,barsize:number=40,stream:WritableStream=stderr,clearOnComplete:boolean=false. Methods:start(total:number,startValue?:number,payload?:object):void;update(value:number,payload?:object):void;increment(step?:number,payload?:object):void;stop():void;lastDraw():{value, total, eta, percentage, ...};render():void. MultiBar(options,preset).create(total, startValue?, payload?, options?):SingleBar;stop():void;stopAll():void. Presets:shades_classic,shades_grey. Example: const bar=new SingleBar({format:'{bar} {percentage}%',hideCursor:false},Presets.shades_classic);bar.start(100,0);bar.increment();bar.stop().

## Sanitised Extract
Table of Contents
1 Installation
2 Import and Presets
3 SingleBar Class
4 MultiBar Class
5 Configuration Options
6 Methods
7 Examples

1 Installation
npm install cli-progress@3.9.1

2 Import and Presets
const { SingleBar, MultiBar, Presets } = require('cli-progress');
Presets.shades_classic, Presets.shades_grey

3 SingleBar Class
Constructor: new SingleBar(options?: SingleBarOptions, preset?: Preset)

4 MultiBar Class
Constructor: new MultiBar(options?: SingleBarOptions, preset?: Preset)

5 Configuration Options (SingleBarOptions)
format: string                // e.g. 'progress | {bar} | {percentage}% | ETA: {eta}s'
barCompleteChar: string        // default '='
barIncompleteChar: string      // default '-'
hideCursor: boolean            // default true
stopOnComplete: boolean        // default true
fps: number                    // default 10
barsize: number                // default 40
stream: NodeJS.WritableStream  // default process.stderr
clearOnComplete: boolean       // MultiBar default false

6 Methods
SingleBar:start(total: number, startValue?: number, payload?: Object): void
SingleBar:update(value: number, payload?: Object): void
SingleBar:increment(step?: number, payload?: Object): void
SingleBar:stop(): void
SingleBar:lastDraw(): Record<string, any>
SingleBar:render(): void
MultiBar:create(total: number, startValue?: number, payload?: Object, options?: SingleBarOptions): SingleBar
MultiBar:stop(): void
MultiBar:stopAll(): void

7 Examples
SingleBar usage: instantiate with options and preset, call start, update/increment in loop, stop when done.
MultiBar usage: instantiate Multibar, create individual bars with create, control each bar independently, stop all at end.

## Original Source
cli-progress
https://github.com/streamich/cli-progress#readme

## Digest of CLI_PROGRESS

# CLI-PROGRESS README (Retrieved: 2024-06-05)

# Installation

npm install cli-progress@3.9.1

# Import and Presets

```js
const { SingleBar, MultiBar, Presets } = require('cli-progress');
``` 
- Presets.shades_classic
- Presets.shades_grey

# SingleBar Class

## Constructor

```ts
new SingleBar(options?: SingleBarOptions, preset?: Preset);
```

### SingleBarOptions

- format: string                          // e.g. 'progress | {bar} | {percentage}% | ETA: {eta}s'
- barCompleteChar: string                // default '='
- barIncompleteChar: string              // default '-'
- hideCursor: boolean                    // default true
- stopOnComplete: boolean                // default true
- fps: number                            // default 10
- barsize: number                        // default 40
- stream: NodeJS.WritableStream          // default process.stderr

## Methods

```ts
start(total: number, startValue?: number, payload?: Object): void
update(value: number, payload?: Object): void
increment(step?: number, payload?: Object): void
stop(): void
lastDraw(): Record<string, any>
render(): void
``` 

# MultiBar Class

## Constructor

```ts
new MultiBar(options?: SingleBarOptions, preset?: Preset);
``` 

## Methods

```ts
create(total: number, startValue?: number, payload?: Object, options?: SingleBarOptions): SingleBar
stop(): void
stopAll(): void
``` 

# Examples

### Single Progress
```js
const bar = new SingleBar({ format: ' {bar} {percentage}% | ETA: {eta}s', hideCursor: false }, Presets.shades_classic);
bar.start(200, 0);
let value = 0;
const timer = setInterval(() => {
  value++;
  bar.update(value);
  if (value >= 200) {
    clearInterval(timer);
    bar.stop();
  }
}, 20);
```

### Multi Progress
```js
const multibar = new MultiBar({ clearOnComplete: false, hideCursor: true }, Presets.shades_grey);
const task1 = multibar.create(100, 0, { task: 'Download' });
const task2 = multibar.create(200, 0, { task: 'Upload' });

task1.start(100, 0);
task2.start(200, 0);

// increment tasks independently
multibar.on('stop', () => multibar.stop());
```

## Attribution
- Source: cli-progress
- URL: https://github.com/streamich/cli-progress#readme
- License: MIT License
- Crawl Date: 2025-05-11T08:35:14.819Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-11
