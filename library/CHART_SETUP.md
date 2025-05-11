# CHART_SETUP

## Crawl Summary
Chart.js core initialization: Chart constructor accepts Canvas or context and a config object `{type, data, options}`. Data structure: `labels` array and `datasets` array of objects `{label, data, borderWidth,...}`. Default options: responsive:true, maintainAspectRatio:true, animations `{delay:0,duration:1000,easing:'easeOutQuart',loop:false}`. Scales defined in `options.scales` by ID with types (category, linear, time). For tree-shaking in ESM, import and `Chart.register()` necessary controllers and elements.

## Normalised Extract
Table of Contents:
1. Installation
2. Initializing a Chart
3. Configuration Object
4. Defining Data
5. Configuring Options
6. Scales Setup

1. Installation
- npm: `npm install chart.js`
- CDN: `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`

2. Initializing a Chart
Context retrieval:
  const ctx = document.getElementById('chartId');
Constructor call:
  new Chart(ctx, config);

3. Configuration Object
Fields:
  type  ChartType (e.g. 'bar','line','pie')
  data  ChartData
  options  ChartOptions (optional)

4. Defining Data
ChartData fields:
  labels?  string[] | number[] | Date[]
  datasets  Array of objects with:
    label: string
    data: number[] or data point objects
    optional styling fields: backgroundColor, borderColor, borderWidth

5. Configuring Options
General options:
  responsive: boolean default true
  maintainAspectRatio: boolean default true
Animation options:
  animations: {
    [property: string]: { delay: number(0), duration: number(1000), easing: EasingFunction('easeOutQuart'), loop: boolean(false) }
  }
Tooltip, legend, title under `options.plugins`.
Interaction under `options.interaction`.

6. Scales Setup
Define scale entries under `options.scales` keyed by scale ID:
  x: { type: 'category' | 'linear' | 'time', display: boolean, title: { display: boolean, text: string }, beginAtZero?: boolean }
  y: similar configuration


## Supplementary Details
Default animation parameters: delay:0, duration:1000ms, easing:'easeOutQuart', loop:false. Default responsive:true, maintainAspectRatio:true. ChartType options: 'bar','line','pie','doughnut','radar','polarArea','scatter','bubble','area'. Data ingestion uses internal format to skip parsing. Decimation plugin default algorithm:'lttb', samples per 100 points. Tree-shaking: import only needed controllers, elements, scales, plugins and register with Chart.register(...).


## Reference Details
Chart constructor:
```ts
new Chart(context: ChartItem, config: ChartConfiguration): Chart;
```
ChartItem = HTMLCanvasElement | CanvasRenderingContext2D | {canvas: HTMLCanvasElement} | ArrayLike<CanvasRenderingContext2D|HTMLCanvasElement>

ChartConfiguration<TType extends ChartType, TData>:
- type: TType
- data: ChartData<TType,TData>
- options?: ChartOptions<TType>

ChartData<TType,TData>:
- labels?: string[]|number[]|Date[]
- datasets: ChartDataset<TType,TData>[]

ChartDataset<TType,TData>:
- label?: string
- data: TData[]
- backgroundColor?: Scriptable<Color,TContext>|Color[]
- borderColor?: Scriptable<Color,TContext>|Color[]
- borderWidth?: Scriptable<number,TContext>|number[]
- type?: ChartType override chart type per dataset
- order?: number
- parsing?: boolean | ParsingOptions

Configuration patterns:
1. Installation via npm or CDN
2. `import { Chart, ScaleType, ControllerType, ElementType } from 'chart.js'` 3. Register: `Chart.register(ScaleType, ControllerType, ElementType)`
4. Instantiate: `new Chart(ctx, config)`
5. Decimation: under `options.plugins.decimation`:{algorithm:'lttb',enabled:true, samples:100}

Troubleshooting:
- Error 'Cannot read property default of undefined': forgot to import and register necessary components. 
- ESM import errors: add "type":"module" in package.json or use `.mjs` extension.

Commands:
- npm install chart.js@^4.0.0
- node --version >=14
- Add to package.json: "type":"module"


## Information Dense Extract
Chart constructor signature: new Chart(context:ChartItem,config:ChartConfiguration<TType,TData>):Chart. ChartConfiguration: {type:ChartType,data:ChartData<TType,TData>,options?:ChartOptions<TType>}. Default options: responsive:true,maintainAspectRatio:true; animations:delay0,duration1000,easingeaseOutQuart,loopfalse. Data: labels?:string[]|number[]|Date[]; datasets: ChartDataset[]. Charts types: bar,line,pie,doughnut,radar,polarArea,scatter,bubble. Scales: options.scales:{[id]:{type:'category'|'linear'|'time',display:boolean,title:{display:boolean,text:string},beginAtZero?:boolean}}. ESM tree-shaking: import controllers/elements/scales/plugins and register via Chart.register(...). Decimation plugin config: {enabled:true,algorithm:'lttb',samples:100}. Troubleshoot: add "type":"module" to package.json; register missing components errors; node version >=14.

## Sanitised Extract
Table of Contents:
1. Installation
2. Initializing a Chart
3. Configuration Object
4. Defining Data
5. Configuring Options
6. Scales Setup

1. Installation
- npm: 'npm install chart.js'
- CDN: '<script src='https://cdn.jsdelivr.net/npm/chart.js'></script>'

2. Initializing a Chart
Context retrieval:
  const ctx = document.getElementById('chartId');
Constructor call:
  new Chart(ctx, config);

3. Configuration Object
Fields:
  type  ChartType (e.g. 'bar','line','pie')
  data  ChartData
  options  ChartOptions (optional)

4. Defining Data
ChartData fields:
  labels?  string[] | number[] | Date[]
  datasets  Array of objects with:
    label: string
    data: number[] or data point objects
    optional styling fields: backgroundColor, borderColor, borderWidth

5. Configuring Options
General options:
  responsive: boolean default true
  maintainAspectRatio: boolean default true
Animation options:
  animations: {
    [property: string]: { delay: number(0), duration: number(1000), easing: EasingFunction('easeOutQuart'), loop: boolean(false) }
  }
Tooltip, legend, title under 'options.plugins'.
Interaction under 'options.interaction'.

6. Scales Setup
Define scale entries under 'options.scales' keyed by scale ID:
  x: { type: 'category' | 'linear' | 'time', display: boolean, title: { display: boolean, text: string }, beginAtZero?: boolean }
  y: similar configuration

## Original Source
Chart.js Documentation
https://www.chartjs.org/docs/latest/

## Digest of CHART_SETUP

# Chart Initialization

## Chart Constructor
**Signature**: new Chart(context: ChartItem, config: ChartConfiguration): Chart

**Parameters**:
- `context` (ChartItem): HTMLCanvasElement, CanvasRenderingContext2D, or array of these.
- `config` (ChartConfiguration): Object with keys `type`, `data`, `options`.

**Returns**: Chart instance

## ChartConfiguration Interface
```typescript
interface ChartConfiguration<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>> {
  type: TType;
  data: ChartData<TType, TData>;
  options?: ChartOptions<TType>;
}
```

## ChartData Interface
```typescript
interface ChartData<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>> {
  labels?: string[] | number[] | Date[];
  datasets: ChartDataset<TType, TData>[];
}
```

## ChartOptions Highlights
- `responsive` (boolean): Default `true`  
- `maintainAspectRatio` (boolean): Default `true`  
- Animation defaults:
  - `delay`: 0  
  - `duration`: 1000  
  - `easing`: 'easeOutQuart'  
  - `loop`: false

## Scales Configuration
- Defined under `options.scales` as key-value pairs by scale ID.
- Example:
```js
options: {
  scales: {
    x: { type: 'category', display: true, title: { display: true, text: 'X Axis' } },
    y: { type: 'linear', beginAtZero: true }
  }
}
```

## Usage Example
```html
<canvas id="myChart"></canvas>
<script type="module">
  import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
  Chart.register(CategoryScale, LinearScale, BarController, BarElement);
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red','Blue','Green'],
      datasets: [{ label: 'Votes', data: [12,19,3], borderWidth:1 }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
</script>
```


## Attribution
- Source: Chart.js Documentation
- URL: https://www.chartjs.org/docs/latest/
- License: MIT License
- Crawl Date: 2025-05-11T18:28:33.438Z
- Data Size: 476475 bytes
- Links Found: 13844

## Retrieved
2025-05-11
