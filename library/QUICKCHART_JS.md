# QUICKCHART_JS

## Crawl Summary
QuickChartJS exports QuickChart class with constructor(options?:{width:number;height:number;format:string;version:string;devicePixelRatio:number;backgroundColor:string}), methods setConfig(config:Object):QuickChart, getUrl(opts?):string, getShortUrl(opts?):Promise<string>, toBinary():Promise<Buffer>, toFile(path:string):Promise<void>. Default host quickchart.io. Supports API key for getShortUrl. Timeout default 15000ms. Chart config uses Chart.js v2 schema.

## Normalised Extract
Table of Contents:
1 Installation
2 QuickChart Class
3 Configuration Method
4 URL Generation
5 Short URL Generation
6 Binary and File Output
7 Authentication
8 Troubleshooting

1 Installation
  npm install quickchart-js@latest

2 QuickChart Class
  Constructor signature: QuickChart(options?:{
    width?:number, height?:number, format?:string, version?:string,
    devicePixelRatio?:number, backgroundColor?:string
  })
  Default options: width=500, height=300, format='png', version='2', devicePixelRatio=1, backgroundColor='transparent'

3 Configuration Method
  setConfig(config:Object):QuickChart
    Accepts Chart.js v2 config object

4 URL Generation
  getUrl(opts?:{
    width?:number, height?:number, format?:string,
    devicePixelRatio?:number, backgroundColor?:string, version?:string
  }):string
    Returns full URL to rendered chart. No network call.

5 Short URL Generation
  getShortUrl(opts?:{
    apiKey?:string, timeout?:number
  }):Promise<string>
    Default timeout:15000ms. Returns a Promise resolving to a shortened URL string.

6 Binary and File Output
  toBinary():Promise<Buffer>
    Fetches image data as Buffer
  toFile(path:string):Promise<void>
    Writes image to filesystem at specified path

7 Authentication
  Provide apiKey in getShortUrl opts. No auth needed for getUrl or toBinary/toFile.

8 Troubleshooting
  Increase timeout via getShortUrl({timeout:30000}) to avoid ETIMEDOUT errors


## Supplementary Details
Default Host and Protocol
  host: 'quickchart.io'
  protocol: 'https:'
  path: '/chart'
  port: 443

Default Chart Options
  width: 500
  height: 300
  format: 'png'
  version: '2'
  devicePixelRatio: 1
  backgroundColor: 'transparent'

Configuration Steps
  1 Import library or require
  2 Instantiate QuickChart with options
  3 setConfig with Chart.js schema object
  4 call getUrl/getShortUrl/toBinary/toFile

Error Handling
  - getShortUrl rejects with Error if status >=400
  - toBinary rejects on network or parsing errors
  - toFile rejects on FS write errors

Timeouts
  Default 15000ms, configurable per request


## Reference Details
QuickChart(options?:{
  width?:number,
  height?:number,
  format?:string,
  version?:string,
  devicePixelRatio?:number,
  backgroundColor?:string
}):QuickChart

Methods:
setConfig(config:Object):QuickChart
  config: Chart.js v2 configuration object

getUrl(opts?:{
  width?:number,
  height?:number,
  format?:string,
  devicePixelRatio?:number,
  backgroundColor?:string,
  version?:string
}):string
  Returns URL. No network call.

getShortUrl(opts?:{
  apiKey?:string,
  timeout?:number
}):Promise<string>
  apiKey: QuickChart API key string
  timeout: Request timeout in ms (default 15000)

toBinary():Promise<Buffer>
  Returns Promise resolving to image Buffer

toFile(path:string):Promise<void>
  path: Absolute or relative file path

Code Example:
const QuickChart = require('quickchart-js');
(async () => {
  const chart = new QuickChart({ width:600, height:400 });
  chart.setConfig({ type:'pie', data:{ labels:['A','B'], datasets:[{ data:[30,70] }] } });
  const url = chart.getUrl();
  const shortUrl = await chart.getShortUrl({ apiKey:'KEY123', timeout:20000 });
  const buffer = await chart.toBinary();
  await chart.toFile('./chart.png');
})();

Best Practices:
- Batch short URL requests to reduce latency
- Use toBinary for embedding images in buffers
- Set backgroundColor for transparent or white backgrounds
- Cache getUrl result to avoid repeated config parsing

Troubleshooting:
Error: ETIMEDOUT in getShortUrl
  Command: Increase timeout: getShortUrl({timeout:30000})

Error: HTTP 400 Bad Request
  Check Chart.js config validity against schema

Error: ENOENT writing file
  Ensure directory exists before calling toFile


## Information Dense Extract
QuickChartJS: constructor(opts{width?,height?,format?,version?,devicePixelRatio?,backgroundColor?}) defaults{500,300,'png','2',1,'transparent'}. setConfig(config:ChartjsV2Config):QuickChart. getUrl(opts{width?,height?,format?,devicePixelRatio?,backgroundColor?,version?}):string. getShortUrl(opts{apiKey?,timeout?=15000}):Promise<string>. toBinary():Promise<Buffer>. toFile(path:string):Promise<void>. host=https://quickchart.io/chart port=443. Auth only for shortUrl. Error handling via promise rejection. Troubleshoot ETIMEDOUT by raising timeout; HTTP 400 by validating config; ENOENT by ensuring path exists.

## Sanitised Extract
Table of Contents:
1 Installation
2 QuickChart Class
3 Configuration Method
4 URL Generation
5 Short URL Generation
6 Binary and File Output
7 Authentication
8 Troubleshooting

1 Installation
  npm install quickchart-js@latest

2 QuickChart Class
  Constructor signature: QuickChart(options?:{
    width?:number, height?:number, format?:string, version?:string,
    devicePixelRatio?:number, backgroundColor?:string
  })
  Default options: width=500, height=300, format='png', version='2', devicePixelRatio=1, backgroundColor='transparent'

3 Configuration Method
  setConfig(config:Object):QuickChart
    Accepts Chart.js v2 config object

4 URL Generation
  getUrl(opts?:{
    width?:number, height?:number, format?:string,
    devicePixelRatio?:number, backgroundColor?:string, version?:string
  }):string
    Returns full URL to rendered chart. No network call.

5 Short URL Generation
  getShortUrl(opts?:{
    apiKey?:string, timeout?:number
  }):Promise<string>
    Default timeout:15000ms. Returns a Promise resolving to a shortened URL string.

6 Binary and File Output
  toBinary():Promise<Buffer>
    Fetches image data as Buffer
  toFile(path:string):Promise<void>
    Writes image to filesystem at specified path

7 Authentication
  Provide apiKey in getShortUrl opts. No auth needed for getUrl or toBinary/toFile.

8 Troubleshooting
  Increase timeout via getShortUrl({timeout:30000}) to avoid ETIMEDOUT errors

## Original Source
quickchart-js Client Library
https://github.com/quickchart/quickchart-js

## Digest of QUICKCHART_JS

# QuickChart JS Client Library

## 1. Installation

  npm install quickchart-js@latest

## 2. Initialization

  const QuickChart = require('quickchart-js');
  const chart = new QuickChart({
    width: 500,
    height: 300,
    format: 'png',
    version: '2',
  });

## 3. Configuration

### 3.1 setConfig(config: Object): QuickChart

  chart.setConfig({
    type: 'bar',
    data: { labels: ['Q1','Q2'], datasets: [{ label: 'Sales', data: [50,75] }] },
    options: { scales: { y: { beginAtZero: true } } }
  });

## 4. Chart URL Generation

### 4.1 getUrl(opts?: { width?: number; height?: number; format?: string; devicePixelRatio?: number; backgroundColor?: string; version?: string; }): string

  const url = chart.getUrl({ width: 600, height: 400 });

## 5. Short URL Generation

### 5.1 getShortUrl(opts?: { apiKey?: string; timeout?: number; }): Promise<string>

  const shortUrl = await chart.getShortUrl({ apiKey: 'YOUR_KEY', timeout: 15000 });

## 6. Binary and File Output

### 6.1 toBinary(): Promise<Buffer>

  const imageBuffer = await chart.toBinary();

### 6.2 toFile(path: string): Promise<void>

  await chart.toFile('/tmp/chart.png');

## 7. Authentication & API Key

  chart.setConfig({ ... });
  chart.getShortUrl({ apiKey: 'ABC123' });

## 8. Troubleshooting

  // Increase timeout if getShortUrl times out
  chart.getShortUrl({ timeout: 30000 });

---

Retrieved: 2024-06-15
Source: quickchart/quickchart-js GitHub README
Data Size: 12 KB

## Attribution
- Source: quickchart-js Client Library
- URL: https://github.com/quickchart/quickchart-js
- License: MIT License
- Crawl Date: 2025-05-11T09:58:17.576Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-11
