# CLI_PROGRESS

## Crawl Summary
Provides SingleBar and MultiBar classes with configurable options: format (string), barCompleteChar (string), barIncompleteChar (string), hideCursor (boolean), fps (number), barsize (number), stream (WritableStream), synchronousUpdate (boolean), stopOnComplete (boolean). Includes Presets.shades_classic, legacy, etc. Constructors: new SingleBar(options, preset?, autopadding?) and new MultiBar(options, preset?, autopadding?). Methods: start(total:number, startValue?:number, payload?:object):void; update(current:number, payload?:object):void; increment(step?:number, payload?:object):void; stop():void; logging: multibar.log(message:string):void. Default options and usage examples enable immediate integration.

## Normalised Extract
Table of Contents:
1. Installation
2. SingleBar Class
3. MultiBar Class
4. Options & Presets
5. Methods
6. Integration & Logging

1. Installation
npm install cli-progress

2. SingleBar Class
Constructor: SingleBar(options: SingleBarOptions, preset?: Preset, autopadding?: boolean)
Creates single progress bar instance.

3. MultiBar Class
Constructor: MultiBar(options: MultiBarOptions, preset?: Preset, autopadding?: boolean)
create(total: number, startValue?: number, payload?: object): BarInstance

4. Options & Presets
SingleBarOptions:
  format: string             # output template, tokens: bar, percentage, eta, eta_formatted, value, total
  barCompleteChar: string    # default '█'
  barIncompleteChar: string  # default '░'
  hideCursor: boolean        # default true
  fps: number                # default 10
  barsize: number            # default process.stdout.columns - 30
  stream: WritableStream     # default process.stderr
  synchronousUpdate: boolean # default false
  stopOnComplete: boolean    # default true
Presets:
  shades_classic: {format, barCompleteChar, barIncompleteChar}
  legacy: {format, barCompleteChar, barIncompleteChar}

5. Methods
start(total, startValue?, payload?): void
update(current, payload?): void
increment(step?, payload?): void
stop(): void

6. Integration & Logging
multibar.log(message: string): void # write lines above bars

## Supplementary Details
Default Option Values:
  format          = '{bar} | {percentage}% | ETA: {eta_formatted}'
  barCompleteChar = '\u2588'
  barIncompleteChar = '\u2591'
  hideCursor      = true
  fps             = 10
  barsize         = process.stdout.columns - 30
  stream          = process.stderr
  synchronousUpdate = false
  stopOnComplete  = true

Presets Object Structure:
  shades_classic: { format: string, barCompleteChar: string, barIncompleteChar: string }
  legacy:         { format: string, barCompleteChar: string, barIncompleteChar: string }

Implementation Steps:
1. Import classes: const { SingleBar, MultiBar, Presets } = require('cli-progress')
2. Instantiate bar or multibar with options and optional Presets
3. Call start(total, initial)
4. Regularly call update or increment
5. On completion call stop() or multibar.stop()

## Reference Details
Module: require('cli-progress')

Types:
interface SingleBarOptions {
  format: string;
  barCompleteChar: string;
  barIncompleteChar: string;
  hideCursor: boolean;
  fps: number;
  barsize: number;
  stream: NodeJS.WritableStream;
  synchronousUpdate: boolean;
  stopOnComplete: boolean;
}

type Preset = { format: string; barCompleteChar: string; barIncompleteChar: string; };

Class SingleBar {
  constructor(options: SingleBarOptions, preset?: Preset, autopadding?: boolean);
  start(total: number, startValue?: number, payload?: object): void;
  update(current: number, payload?: object): void;
  increment(step?: number, payload?: object): void;
  stop(): void;
}

Class MultiBar {
  constructor(options: SingleBarOptions, preset?: Preset, autopadding?: boolean);
  create(total: number, startValue?: number, payload?: object): SingleBar;
  stop(): void;
  log(message: string): void;
}

Code Example:
const { SingleBar, MultiBar, Presets } = require('cli-progress');

Best Practices:
- Use Presets.shades_classic for consistent visuals.
- Avoid synchronousUpdate on streams with high output.
- Ensure process.stdout.isTTY is true for proper rendering.

Troubleshooting:
Command: node script.js
If no output appears, verify:
  console.error(process.stderr.isTTY) // should be true
  hideCursor not interfering
Expected: progress bar updates in place without new lines

## Information Dense Extract
SingleBar(options: {format:string,barCompleteChar:string,barIncompleteChar:string,hideCursor:boolean,fps:number,barsize:number,stream:Writable,synchronousUpdate:boolean,stopOnComplete:boolean}, preset?:Preset, autopadding?:boolean)→bar with methods start(total:number,startValue?:number,payload?:object), update(current:number,payload?:object), increment(step?:number,payload?:object), stop():void MultiBar(options, preset?, autopadding?)→multibar creating bars via create(total, startValue?, payload?)→SingleBar; multibar.log(msg:string). Defaults: format='{bar}|{percentage}%|ETA:{eta_formatted}', barChars=█/░, hideCursor=true, fps=10, barsize=cols-30, stream=stderr. Presets: shades_classic, legacy.

## Sanitised Extract
Table of Contents:
1. Installation
2. SingleBar Class
3. MultiBar Class
4. Options & Presets
5. Methods
6. Integration & Logging

1. Installation
npm install cli-progress

2. SingleBar Class
Constructor: SingleBar(options: SingleBarOptions, preset?: Preset, autopadding?: boolean)
Creates single progress bar instance.

3. MultiBar Class
Constructor: MultiBar(options: MultiBarOptions, preset?: Preset, autopadding?: boolean)
create(total: number, startValue?: number, payload?: object): BarInstance

4. Options & Presets
SingleBarOptions:
  format: string             # output template, tokens: bar, percentage, eta, eta_formatted, value, total
  barCompleteChar: string    # default ''
  barIncompleteChar: string  # default ''
  hideCursor: boolean        # default true
  fps: number                # default 10
  barsize: number            # default process.stdout.columns - 30
  stream: WritableStream     # default process.stderr
  synchronousUpdate: boolean # default false
  stopOnComplete: boolean    # default true
Presets:
  shades_classic: {format, barCompleteChar, barIncompleteChar}
  legacy: {format, barCompleteChar, barIncompleteChar}

5. Methods
start(total, startValue?, payload?): void
update(current, payload?): void
increment(step?, payload?): void
stop(): void

6. Integration & Logging
multibar.log(message: string): void # write lines above bars

## Original Source
cli-progress Library
https://github.com/cli-progress/cli-progress#readme

## Digest of CLI_PROGRESS

# CLI-PROGRESS TECHNICAL DIGEST
Retrieved on 2024-06-10
Source: https://github.com/cli-progress/cli-progress#readme

# Installation

Install via npm:

```
npm install cli-progress
```

# Classes and Usage

## SingleBar

```js
const { SingleBar, Presets } = require('cli-progress');
const bar = new SingleBar({
  format: 'Progress |{bar}| {percentage}% || {value}/{total} Chunks',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
}, Presets.shades_classic);
bar.start(200, 0);
let value = 0;
const timer = setInterval(() => {
  value++;
  bar.update(value);
  if (value >= 200) {
    clearInterval(timer);
    bar.stop();
  }
}, 100);
```

## MultiBar

```js
const { MultiBar, Presets } = require('cli-progress');
const multibar = new MultiBar({
  format: '{name} |{bar}| {percentage}% | ETA: {eta_formatted}',
  hideCursor: true
}, Presets.shades_classic);
const bar1 = multibar.create(100, 0, { name: 'bar1' });
const bar2 = multibar.create(200, 0, { name: 'bar2' });
// update bars independently
bar1.increment();
bar2.update(50);
// stop all
multibar.stop();
```

# Options

- format (string): template for output; tokens: {bar},{percentage}%,{eta},{eta_formatted},{value},{total}
- barCompleteChar (string): default '█'
- barIncompleteChar (string): default '░'
- hideCursor (boolean): default true
- fps (number): max frames per second, default 10
- barsize (number): width, default `process.stdout.columns - 30`
- stream (WritableStream): default `process.stderr`
- synchronousUpdate (boolean): default false
- stopOnComplete (boolean): default true

# Methods

### start(total: number, startValue?: number, payload?: object): void
Begins rendering with total and initial value.

### update(current: number, payload?: object): void
Sets progress to current.

### increment(step?: number, payload?: object): void
Adds step (default 1) to current value.

### stop(): void
Stops rendering and clears interval.

### multibar.log(message: string): void
Writes a line above active bars.


## Attribution
- Source: cli-progress Library
- URL: https://github.com/cli-progress/cli-progress#readme
- License: License: MIT
- Crawl Date: 2025-05-10T03:31:16.382Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
