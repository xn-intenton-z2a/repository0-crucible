# CLI_PROGRESS

## Crawl Summary
SingleBar(options: {...})
options: format:string, barCompleteChar:'#', barIncompleteChar:'-', hideCursor:false, noTTYOutput:false, clearOnComplete:false, fps:10, barsize:auto, stream:process.stdout
Methods: start(total, startValue?, payload?), stop(), increment(step?, payload?), update(current, payload?), setTotal(total)
MultiBar(options, preset)
Methods: create(total, startValue?, payload?):SingleBar, stop()
Presets: shades_classic, shades_grey, legacy
Placeholders: {bar}, {percentage}, {value}, {total}, {eta}, {eta_formatted}, {duration}, {duration_formatted}
Install: npm install cli-progress
Import: require('cli-progress')

## Normalised Extract
Table of Contents:
1 Installation
2 Import
3 Presets
4 SingleBar API
5 MultiBar API
6 Options
7 Placeholders
8 Example

1 Installation
Run npm install cli-progress

2 Import
Load module: const cliProgress = require('cli-progress');

3 Presets
Available presets: shades_classic, shades_grey, legacy

4 SingleBar API
Constructor signature: new SingleBar(options, preset)
Methods:
 start(total:number, startValue?:number, payload?:object):void
 update(current:number, payload?:object):void
 increment(step?:number, payload?:object):void
 setTotal(total:number):void
 stop():void

5 MultiBar API
Constructor: new MultiBar(options, preset)
Methods:
 create(total:number, startValue?:number, payload?:object):SingleBar
 stop():void

6 Options
format: string template containing placeholders
barCompleteChar: string default "#"
barIncompleteChar: string default "-"
hideCursor: boolean default false
noTTYOutput: boolean default false
clearOnComplete: boolean default false
fps: number default 10
barsize: number default terminal width
stream: WritableStream default process.stdout

7 Placeholders
List: {bar}, {percentage}, {value}, {total}, {eta}, {eta_formatted}, {duration}, {duration_formatted}
Additional placeholders passed via payload integrate into format template

8 Example
Instantiate SingleBar with custom options and preset
bar.start(200, 0)
Use setInterval to call bar.increment until bar.value reaches bar.total then bar.stop()

## Supplementary Details
Parameter Details:
barsize: set explicit integer width (e.g., 50)
fps: controls update frequency (lower reduces CPU overhead)
clearOnComplete: true removes bar after finish
noTTYOutput: true outputs plain text instead of ANSI
stream: any WritableStream (e.g., process.stderr or file stream)

Implementation Steps:
1 require the cli-progress module
2 create SingleBar or MultiBar instance with options and preset
3 call start(total, startValue, payload)
4 update progress via update() or increment()
5 on completion, call stop() or multibar.stop()

Handling Non-TTY Environments:
Check process.stdout.isTTY; if false set noTTYOutput:true

Custom Output Streams:
Provide stream option when instantiating for routing to custom Writable

Cursor Management:
Set hideCursor:true to disable cursor during bar animation

## Reference Details
API Specifications:

interface SingleBarOptions {
 format: string;
 barCompleteChar: string;
 barIncompleteChar: string;
 hideCursor: boolean;
 noTTYOutput: boolean;
 clearOnComplete: boolean;
 fps: number;
 barsize?: number;
 stream?: NodeJS.WritableStream;
}

class SingleBar {
 constructor(options: SingleBarOptions, preset: string)
 start(total: number, startValue?: number, payload?: object): void
 update(current: number, payload?: object): void
 increment(step?: number, payload?: object): void
 setTotal(total: number): void
 stop(): void
}

class MultiBar {
 constructor(options: SingleBarOptions, preset: string)
 create(total: number, startValue?: number, payload?: object): SingleBar
 stop(): void
}

Presets: shades_classic, shades_grey, legacy

Usage Example with Comments:
const cliProgress = require('cli-progress');
// instantiate with custom format and preset
const bar = new cliProgress.SingleBar({
 format: 'Progress |{bar}| {percentage}% | ETA: {eta_formatted}',
 barCompleteChar: '#',
 barIncompleteChar: '-',
 hideCursor: true
}, cliProgress.Presets.shades_classic);

bar.start(100, 0, { speed: 0 }); // total, initial value, payload for placeholders
bar.update(20, { speed: 1.5 }); // update current and payload
bar.increment(5); // increment by 5
bar.setTotal(120); // adjust total dynamically
bar.stop(); // stop and clear if configured

Configuration Options Defaults:
barsize auto to terminal width
fps 10
clearOnComplete false
noTTYOutput false

Best Practices:
hideCursor:true prevents cursor flicker
clearOnComplete:true cleans up bar after finish
batch updates reduce CPU overhead

Troubleshooting:
If no bar appears: verify process.stdout.isTTY or set noTTYOutput:false
For CI logs: set noTTYOutput:true to emit plain text entries
To avoid flicker in slow terminals: lower fps or disable hideCursor

Exact Commands & Expected Output:
npm install cli-progress
node example.js
Expected console output:
Progress |##########--------| 50% | ETA: 00:00:30


## Information Dense Extract
SingleBar(options:SingleBarOptions,preset:String): start(total, startValue?,payload), update(current,payload), increment(step?,payload), setTotal(total), stop(); MultiBar(options,preset): create(total,startValue?,payload):SingleBar, stop(). Options: format:string, barCompleteChar:'#', barIncompleteChar:'-', hideCursor:false, noTTYOutput:false, clearOnComplete:false, fps:10, barsize:auto, stream:process.stdout. Presets: shades_classic, shades_grey, legacy. Placeholders: {bar},{percentage},{value},{total},{eta},{eta_formatted},{duration},{duration_formatted}. Install: npm install cli-progress. Import: require('cli-progress').

## Sanitised Extract
Table of Contents:
1 Installation
2 Import
3 Presets
4 SingleBar API
5 MultiBar API
6 Options
7 Placeholders
8 Example

1 Installation
Run npm install cli-progress

2 Import
Load module: const cliProgress = require('cli-progress');

3 Presets
Available presets: shades_classic, shades_grey, legacy

4 SingleBar API
Constructor signature: new SingleBar(options, preset)
Methods:
 start(total:number, startValue?:number, payload?:object):void
 update(current:number, payload?:object):void
 increment(step?:number, payload?:object):void
 setTotal(total:number):void
 stop():void

5 MultiBar API
Constructor: new MultiBar(options, preset)
Methods:
 create(total:number, startValue?:number, payload?:object):SingleBar
 stop():void

6 Options
format: string template containing placeholders
barCompleteChar: string default '#'
barIncompleteChar: string default '-'
hideCursor: boolean default false
noTTYOutput: boolean default false
clearOnComplete: boolean default false
fps: number default 10
barsize: number default terminal width
stream: WritableStream default process.stdout

7 Placeholders
List: {bar}, {percentage}, {value}, {total}, {eta}, {eta_formatted}, {duration}, {duration_formatted}
Additional placeholders passed via payload integrate into format template

8 Example
Instantiate SingleBar with custom options and preset
bar.start(200, 0)
Use setInterval to call bar.increment until bar.value reaches bar.total then bar.stop()

## Original Source
cli-progress Library
https://github.com/cli-progress/cli-progress#readme

## Digest of CLI_PROGRESS

# CLI-PROGRESS

*Retrieved: 2024-06-10 from https://github.com/cli-progress/cli-progress#readme*
*Data Size: 0 bytes*

# Installation

```bash
npm install cli-progress
```

# Import

```js
const cliProgress = require('cli-progress');
```

# Presets

- shades_classic
- shades_grey
- legacy

# SingleBar API

## Constructor

new SingleBar(options: SingleBarOptions, preset: string)

### Options

- format: string
- barCompleteChar: string (default "#")
- barIncompleteChar: string (default "-")
- hideCursor: boolean (default false)
- noTTYOutput: boolean (default false)
- clearOnComplete: boolean (default false)
- fps: number (default 10)
- barsize: number (default auto width)
- stream: WritableStream (default process.stdout)

## Methods

- start(total: number, startValue?: number, payload?: object): void
- stop(): void
- increment(step?: number, payload?: object): void
- update(current: number, payload?: object): void
- setTotal(total: number): void

# MultiBar API

## Constructor

new MultiBar(options: MultiBarOptions, preset: string)

## Methods

- create(total: number, startValue?: number, payload?: object): SingleBar
- stop(): void

# Placeholders

- {bar}
- {percentage}
- {value}
- {total}
- {eta}
- {eta_formatted}
- {duration}
- {duration_formatted}

# Examples

```js
const cliProgress = require('cli-progress');
const bar = new cliProgress.SingleBar({
  format: 'Progress |{bar}| {percentage}% | ETA: {eta_formatted}',
  barCompleteChar: '#',
  barIncompleteChar: '-',
  hideCursor: true
}, cliProgress.Presets.shades_classic);

bar.start(200, 0);

const timer = setInterval(() => {
  bar.increment();
  if (bar.value >= bar.total) {
    clearInterval(timer);
    bar.stop();
  }
}, 100);
```

## Attribution
- Source: cli-progress Library
- URL: https://github.com/cli-progress/cli-progress#readme
- License: License: MIT
- Crawl Date: 2025-05-10T03:18:05.478Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
