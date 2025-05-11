# CLI_PROGRESS

## Crawl Summary
SingleBar and MultiBar classes with constructor options and presets; key methods: start(total, initial?, payload?, override?), update(value, payload?), increment(step?), stop(). Options interface fields with defaults: format string, barCompleteChar '=', barIncompleteChar ' ', hideCursor true, fps 30, stopOnComplete true; MultiBar adds clearOnComplete false. Presets: shades_classic, rect, shades_grey, legacy. Usage patterns and troubleshooting tips.

## Normalised Extract
Table of Contents
1 Installation
2 SingleBar Class
3 MultiBar Class
4 Options Interface
5 Presets

1 Installation
npm install cli-progress

2 SingleBar Class
Constructor: SingleBar(options:Options, preset?:Preset)
Methods:
 start(total:number, initialValue?:number, payload?:object, optionsOverride?:Options):void
 increment(step?:number):void
 update(value:number, payload?:object):void
 stop():void

3 MultiBar Class
Constructor: MultiBar(options:MultiBarOptions, preset?:Preset)
Methods:
 create(total:number, initialValue?:number, payload?:object, optionsOverride?:Options):SingleBar
 remove(bar:SingleBar):void
 stop():void

4 Options Interface
format:string default '{bar} | {percentage}% | ETA: {eta_formatted} | {value}/{total}'
barCompleteChar:string default '='
barIncompleteChar:string default ' '
hideCursor:boolean default true
fps:number default 30
stopOnComplete:boolean default true
MultiBar clearOnComplete:boolean default false

5 Presets
Presets.shades_classic, Presets.rect, Presets.shades_grey, Presets.legacy

## Supplementary Details
Default option values:
 format='{bar} | {percentage}% | ETA: {eta_formatted} | {value}/{total}'
 barCompleteChar='='
 barIncompleteChar=' '
 hideCursor=true
 fps=30
 stopOnComplete=true
 clearOnComplete=false (MultiBar only)

Implementation Steps:
1 Import SingleBar or MultiBar from 'cli-progress'
2 Instantiate with desired options and preset
3 Call start(total, initialValue)
4 Use update(value, payload) or increment(step)
5 Call stop() after completion

Payload object fields can be referenced in format string; example payload={speed:'5MB/s'} with format '{bar} | {speed}'

## Reference Details
API Specifications

SingleBar(options:Options, preset?:Preset)
 Options interface:
  format: string
  barCompleteChar?: string
  barIncompleteChar?: string
  hideCursor?: boolean
  fps?: number
  stopOnComplete?: boolean

Methods:
 start(total: number, initialValue?: number, payload?: object, optionsOverride?: Options): void
 update(value: number, payload?: object): void
 increment(step?: number): void
 stop(): void

MultiBar(options:MultiBarOptions, preset?:Preset)
 MultiBarOptions extends Options:
  clearOnComplete?: boolean

Methods:
 create(total: number, initialValue?: number, payload?: object, optionsOverride?: Options): SingleBar
 remove(bar: SingleBar): void
 stop(): void

Example:
const { SingleBar, Presets } = require('cli-progress')
const bar = new SingleBar({ format:'{bar} {percentage}%' }, Presets.shades_classic)
bar.start(100,0)
setInterval(()=>{ bar.increment(); if(bar.value>=100) bar.stop() },100)

Best Practices:
 Use stopOnComplete:false to attach custom completion handlers before clearing
 Use clearOnComplete:true to free console space when finished
 Batch updates to reduce FPS overhead

Troubleshooting:
 Problem: Progress bar flickers
 Solution: Set fps to 15-20
 Command: new SingleBar({ fps:20 },Presets.shades_classic)

 Problem: Cursor remains after process
 Solution: Ensure hideCursor:true and stop() is called
 Command: new SingleBar({ hideCursor:true },Presets.shades_classic)

Expected Console Output:
 Progressive single-line updates of bar with percentage and ETA

## Information Dense Extract
SingleBar(options:Options,preset?:Preset):start(total,initial?,payload?,override?)|update(value,payload?)|increment(step?)|stop();Options=format:string('{bar}|{percentage}%|ETA:{eta_formatted}|{value}/{total}'),barCompleteChar:string='=',barIncompleteChar:string=' ',hideCursor:boolean=true,fps:number=30,stopOnComplete:boolean=true;MultiBar(options:MultiBarOptions,preset?:Preset):create(total,initial?,payload?,override?):SingleBar|remove(bar)|stop();MultiBarOptions.clearOnComplete:boolean=false;Presets:shades_classic,rect,shades_grey,legacy;Usage:npm install cli-progress;import {SingleBar,Presets} require('cli-progress');const b=new SingleBar(opts,Presets.shades_classic);b.start(100);b.increment();b.stop();Troubleshoot:adjust fps for flickering, ensure hideCursor and stop() for cursor cleanup.

## Sanitised Extract
Table of Contents
1 Installation
2 SingleBar Class
3 MultiBar Class
4 Options Interface
5 Presets

1 Installation
npm install cli-progress

2 SingleBar Class
Constructor: SingleBar(options:Options, preset?:Preset)
Methods:
 start(total:number, initialValue?:number, payload?:object, optionsOverride?:Options):void
 increment(step?:number):void
 update(value:number, payload?:object):void
 stop():void

3 MultiBar Class
Constructor: MultiBar(options:MultiBarOptions, preset?:Preset)
Methods:
 create(total:number, initialValue?:number, payload?:object, optionsOverride?:Options):SingleBar
 remove(bar:SingleBar):void
 stop():void

4 Options Interface
format:string default '{bar} | {percentage}% | ETA: {eta_formatted} | {value}/{total}'
barCompleteChar:string default '='
barIncompleteChar:string default ' '
hideCursor:boolean default true
fps:number default 30
stopOnComplete:boolean default true
MultiBar clearOnComplete:boolean default false

5 Presets
Presets.shades_classic, Presets.rect, Presets.shades_grey, Presets.legacy

## Original Source
cli-progress
https://github.com/streamich/cli-progress#readme

## Digest of CLI_PROGRESS

# Installation

Install via npm:

    npm install cli-progress

# Usage

Import and initialize:

    const { SingleBar, Presets, MultiBar } = require('cli-progress');

Single progress bar:

    const bar = new SingleBar({
      format: '{bar} | {percentage}% | ETA: {eta_formatted} | {value}/{total}',
      barCompleteChar: '=',
      barIncompleteChar: ' ',
      hideCursor: true,
      fps: 30,
      stopOnComplete: true
    }, Presets.shades_classic);
    bar.start(100, 0);
    bar.increment();
    bar.update(50);
    bar.stop();

Multiple bars:

    const multibar = new MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      fps: 20
    }, Presets.shades_grey);
    const task1 = multibar.create(200, 0);
    const task2 = multibar.create(50, 0);
    task1.increment(5);
    task2.update(10);
    multibar.stop();

# API Reference

## SingleBar Class

Constructor signature:

    new SingleBar(options: Options, preset?: Preset)

Methods:

    start(total: number, initialValue?: number, payload?: object, optionsOverride?: Options): void
    increment(step?: number): void
    update(value: number, payload?: object): void
    stop(): void

## MultiBar Class

Constructor signature:

    new MultiBar(options: MultiBarOptions, preset?: Preset)

Methods:

    create(total: number, initialValue?: number, payload?: object, optionsOverride?: Options): SingleBar
    remove(bar: SingleBar): void
    stop(): void

# Configuration Options

Interface Options and default values:

    format: string                                    '{bar} | {percentage}% | ETA: {eta_formatted} | {value}/{total}'
    barCompleteChar: string                           '='
    barIncompleteChar: string                         ' '
    hideCursor: boolean                               true
    fps: number                                       30
    stopOnComplete: boolean                           true

MultiBar additional options:

    clearOnComplete: boolean                          false

# Presets

Available presets and effects:

    Presets.shades_classic    legacy ASCII blocks
    Presets.rect             solid rectangle blocks
    Presets.shades_grey      grayscale blocks
    Presets.legacy           original fallback style

# Troubleshooting

If bars flicker: reduce fps below 30. Example: fps: 20
If cursor remains visible after completion: ensure hideCursor: true and call stop().
If bar exceeds total: guard calls to update and increment to not exceed total.

_Retrieved from GitHub CLI-Progress README on 2024-06-05_


## Attribution
- Source: cli-progress
- URL: https://github.com/streamich/cli-progress#readme
- License: MIT License
- Crawl Date: 2025-05-11T06:28:49.290Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-11
