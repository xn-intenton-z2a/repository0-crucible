# CHARTJS_SETUP

## Crawl Summary
Installation via npm or CDN; instantiate new Chart(canvas,config); config: type,data,datasets,options.scales; default animations enabled; methods: update,destroy,toBase64Image; built-in TypeScript typings available.

## Normalised Extract
Table of Contents
1. Installation
2. Chart Instantiation
3. Configuration Object
4. Scales Configuration
5. Plugin Options

1. Installation
– npm install chart.js --save  
– CDN: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

2. Chart Instantiation
Signature: new Chart(item: ChartItem, config: ChartConfiguration<TType,TData,TLabel>)
Parameters:
  • item: HTMLCanvasElement | CanvasRenderingContext2D | string id  
  • config.type: ChartType  
  • config.data.labels: string[]  
  • config.data.datasets: Array<{ label: string; data: TData[]; backgroundColor?: Color|Color[]; borderColor?: Color|Color[]; borderWidth?: number }>  
  • config.options: ChartOptions

3. Configuration Object
• type: 'bar' | 'line' | …  
• data: { labels: string[]; datasets: Dataset[] }  
• options:
    scales: { [scaleId: string]: ScaleOptions }  
    plugins: { legend: LegendOptions; title: TitleOptions; tooltip: TooltipOptions }  
    animations: AnimationOptions  

4. Scales Configuration
ScaleOptions fields:
  type: 'linear'|'category'|'time'|'logarithmic'  
  beginAtZero: boolean  
  suggestedMin?: number  
  suggestedMax?: number  
  ticks: { stepSize?: number; maxTicksLimit?: number; callback?(value,index,ticks): string }

5. Plugin Options
LegendOptions: { display: boolean; position: 'top'|'bottom'|'left'|'right'; labels: { color: Color; font: FontSpec } }
TitleOptions: { display: boolean; text: string|string[]; color: Color; font: FontSpec }
TooltipOptions: { enabled: boolean; mode: 'nearest'|'index'|'point'; intersect: boolean; callbacks: TooltipCallbacks }


## Supplementary Details
Bundler Integration:
• ES Module import: import { Chart, registerables } from 'chart.js'; Chart.register(...registerables);
• ESM-only: set "type":"module" in package.json

Node.js Usage:
• Use chartjs-node-canvas package
• const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
• const canvasRenderService = new ChartJSNodeCanvas({ width:800, height:600 });
• const image = await canvasRenderService.renderToBuffer(config);

Responsive Container:
• Wrap canvas in a container with CSS:
  .chart-container { position: relative; width:100%; height:400px; }

Data Decimation:
• options.plugins.decimation: { enabled: true; algorithm: 'lttb'|'min-max'; samples: number }


## Reference Details
Chart Constructor:
new Chart(item: ChartItem, config: ChartConfiguration<TType,TData,TLabel>)
• ChartItem: HTMLCanvasElement | CanvasRenderingContext2D | string id  
• ChartConfiguration<TType,TData,TLabel>:
    type: TType  
    data: ChartData<TType,TData>  
    options?: ChartOptions<TType>

Methods:
update(mode?: UpdateMode): void
• mode: 'resize'|'reset'|'none'|undefined

destroy(): void

toBase64Image(type?: string, quality?: number): string
• type: 'image/png'|'image/jpeg' etc. Default 'image/png'  
• quality: number 0–1, if type 'image/jpeg' or 'image/webp'

Static API:
Chart.register(...components: ChartComponentLike[]): void
Chart.defaults: Defaults
Chart.overrides: Record<ChartType, ChartOptions>
Chart.helpers: any

Configuration Patterns:
1. Import only needed components to enable tree-shaking:
   import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
   Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
2. Plugin Registration:
   import { Decimation } from 'chart.js';
   Chart.register(Decimation);
3. Platform override:
   new Chart(ctx, { type:'line', data:..., options:..., plugins:[], platform: DOMPlatform });

Troubleshooting:
Error: "Canvas has already been initialized"
• Occurs when reusing same canvas element. Fix: ctx = canvas.getContext('2d'), use fresh element or call chart.destroy().

Error: "Uncaught TypeError: Chart is not a constructor"
• Occurs in CommonJS with ESM-only package. Fix: use import syntax or import Chart from 'chart.js/auto'.

Inspecting Chart object:
console.log(Object.keys(Chart));
Expected keys: ['register','update','destroy','defaults','overrides','helpers']


## Information Dense Extract
npm install chart.js
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
new Chart(canvasId,{type:'bar',data:{labels:string[],datasets:[{label:string,data:number[],borderWidth:number}]},options:{scales:{y:{beginAtZero:true}}}})
Chart methods: update(mode),destroy(),toBase64Image(type,quality)
Import ESM: import {Chart,registerables} from 'chart.js';Chart.register(...registerables)
ScaleOptions: type,beginAtZero,suggestedMin,stepSize
Plugin opt: decimation:{enabled,algorithm:'lttb'|'min-max',samples}
Troubleshoot reuse canvas -> destroy(), CJS import -> use 'chart.js/auto' or ESM
Documentation: ChartConfiguration,ChartData,ChartOptions generic types

## Sanitised Extract
Table of Contents
1. Installation
2. Chart Instantiation
3. Configuration Object
4. Scales Configuration
5. Plugin Options

1. Installation
 npm install chart.js --save  
 CDN: <script src='https://cdn.jsdelivr.net/npm/chart.js'></script>

2. Chart Instantiation
Signature: new Chart(item: ChartItem, config: ChartConfiguration<TType,TData,TLabel>)
Parameters:
   item: HTMLCanvasElement | CanvasRenderingContext2D | string id  
   config.type: ChartType  
   config.data.labels: string[]  
   config.data.datasets: Array<{ label: string; data: TData[]; backgroundColor?: Color|Color[]; borderColor?: Color|Color[]; borderWidth?: number }>  
   config.options: ChartOptions

3. Configuration Object
 type: 'bar' | 'line' |   
 data: { labels: string[]; datasets: Dataset[] }  
 options:
    scales: { [scaleId: string]: ScaleOptions }  
    plugins: { legend: LegendOptions; title: TitleOptions; tooltip: TooltipOptions }  
    animations: AnimationOptions  

4. Scales Configuration
ScaleOptions fields:
  type: 'linear'|'category'|'time'|'logarithmic'  
  beginAtZero: boolean  
  suggestedMin?: number  
  suggestedMax?: number  
  ticks: { stepSize?: number; maxTicksLimit?: number; callback?(value,index,ticks): string }

5. Plugin Options
LegendOptions: { display: boolean; position: 'top'|'bottom'|'left'|'right'; labels: { color: Color; font: FontSpec } }
TitleOptions: { display: boolean; text: string|string[]; color: Color; font: FontSpec }
TooltipOptions: { enabled: boolean; mode: 'nearest'|'index'|'point'; intersect: boolean; callbacks: TooltipCallbacks }

## Original Source
Chart.js Documentation
https://www.chartjs.org/docs/latest/

## Digest of CHARTJS_SETUP

# Installation

Install Chart.js via npm or CDN:

```bash
# Using npm
yarn add chart.js
npm install chart.js --save
```      

Include from CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

# Create a Chart

Instantiate a chart on an HTML5 canvas element:

```html
<div><canvas id="myChart"></canvas></div>
<script>
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red','Blue','Yellow','Green','Purple','Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12,19,3,5,2,3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
</script>
```

# Configuration Options

- type: ChartType ('bar','line','pie',...)
- data.labels: string[]
- data.datasets[]: { label: string; data: number[]|DefaultDataPoint[]; backgroundColor?: Color|Color[]; borderColor?: Color|Color[]; borderWidth?: number }
- options.scales: { [scaleId: string]: ScaleOptions }  
  - beginAtZero: boolean (default false)
- options.plugins: { legend: LegendOptions; title: TitleOptions; tooltip: TooltipOptions }

# API Methods

- update(mode?: UpdateMode): void
- destroy(): void
- toBase64Image(type?: string, quality?: number): string

# TypeScript Support

All types available under 'chart.js' package:  
Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, ScaleOptions, DefaultDataPoint

## Attribution
- Source: Chart.js Documentation
- URL: https://www.chartjs.org/docs/latest/
- License: MIT License
- Crawl Date: 2025-05-12T00:42:06.801Z
- Data Size: 417172 bytes
- Links Found: 12288

## Retrieved
2025-05-12
