# IMAGECHARTS_API

## Crawl Summary
GET /chart returns binary image. Required params: cht (type), chd (data). Optional sizing (chs), colors (chco), labels (chl), axes (chxt, chxr), scaling (chds), legends (chdl, chdlp), styling (chls, chbh), margins (chma), fills (chf), grids (chg), title (chtt), markers (chm), cache control (icac), quality (icq), interlacing (ici). Data encodings: text, simple, extended. Supports GET and POST. Errors: 414 for long URLs, 400 for bad format. Rate limit 1000 rpm.

## Normalised Extract
Table of Contents
1  HTTP Endpoint
2  Required Parameters
3  Optional Parameters
4  Data Encoding Modes
5  Response Handling
6  Error Codes

1  HTTP Endpoint
Base URL: https://image-charts.com/chart
Method: GET or POST (application/x-www-form-urlencoded)

2  Required Parameters
cht: string; Chart type codes: lc, ls, bhs, bvs, p, p3, t, v, r
chd: string; Data encoding prefix (t,s,e) + encoded series

3  Optional Parameters
chs: string; widthxheight px; default 300x200
chco: string; hex or named colors
chl: string; comma-separated labels
chxt: string; axes list x,y,x,y,r
chxr: string; axisIndex,start,end[,interval]
chds: string; scale ranges per series
chdl: string; legend entries
chdlp: string; t,b,l,r placement
chls: string; width,seg,space
chbh: string; barWidth[,groupWidth][,anchor]
chma: string; margins L,T,R,B
chf: string; fill definitions type,options
chg: string; grid x_step,y_step[,x_offset,y_offset]
chtt: string; title text
chm: string; marker definitions type,seriesIndex,dataIndex,color,size[,priority]
icac: boolean; auto-clear cache; default false
icq: int; JPEG quality 0-100; default 80
ici: boolean; interlaced GIF; default 0

4  Data Encoding Modes
Prefix t: text; s: simple (0–61); e: extended (0–4095)
Separator comma values, pipe between series

5  Response Handling
200 OK + image/png (or image/jpeg,image/gif)
Handle binary stream

6  Error Codes
414 URI Too Long → switch to POST
400 Bad Request → fix parameter formatting

## Supplementary Details
Caching: URL fingerprint md5; store response for identical URLs with icac=true. Use HTTP headers ETag.
URL limits: GET URLs max 2048 bytes. Use POST for larger payloads.
Encoding: apply encodeURIComponent to parameter values. For extended mode, map each 12-bit value to two chars via charset 'A-Za-z0-9-._'.
POST example: POST https://image-charts.com/chart-0 with body cht=lc&chd=s:1,2,3&chs=400x300

Client libraries: Node.js fetch or axios. Set responseType 'arraybuffer'.
Timeout: set 30000ms.

Security: TLS 1.2+, validate certs, no redirects.

## Reference Details
Node.js SDK
interface ChartOptions {
  type: 'lc'|'ls'|'bhs'|'bvs'|'p'|'p3'|'t'|'v'|'r';
  data: number[]|number[][];
  size?: { width: number; height: number };
  colors?: string[];
  labels?: string[];
  axes?: { axes: string[]; ranges?: Array<[number,number,number?]> };
  scale?: Array<[number,number]>;
  legend?: { entries: string[]; position?: 't'|'b'|'l'|'r' };
  style?: { line?: [number,number,number]; bar?: [number,string?,string?]; margins?: [number,number,number,number]; markers?: Array<{type:string;series:number;index:number;color:string;size:number;priority?:number}> };
  fill?: string[];
  grid?: [number,number,number?,number?];
  title?: string;
  cache?: boolean;
  quality?: number;
  interlace?: boolean;
  format?: 'png'|'jpg'|'gif';
}

function generateChart(options: ChartOptions): Promise<Buffer>

Implementation Pattern:
1  Serialize data: if 2D array use pipe join, else comma join; prefix with encoding mode 't'.
2  Build params object mapping to API names.
3  URLSearchParams + encode.
4  Send request via axios({ method:'GET', url:`https://image-charts.com/chart?${params}` , responseType:'arraybuffer', timeout:30000 });
5  Return Buffer.

Example:
import axios from 'axios';
async function generateChart(opts) {
  const params = new URLSearchParams();
  params.append('cht', opts.type);
  const dataStr = 't:' + opts.data.flat().join(',');
  params.append('chd', dataStr);
  params.append('chs', `${opts.size?.width||300}x${opts.size?.height||200}`);
  if (opts.title) params.append('chtt', opts.title);
  const res = await axios.get('https://image-charts.com/chart', { params, responseType:'arraybuffer', timeout:30000 });
  return Buffer.from(res.data);
}

Best Practices:
• Use POST for payloads over 2KB
• Cache identical requests if icac=true
• Sanitize labels to avoid separator collisions

Troubleshooting:
Command: curl -v "https://image-charts.com/chart?cht=lc&chd=t:1,2,3&chs=300x200"
Expected: HTTP/2 200; Content-Type: image/png; Body binary length>0
Error 414: switch to POST
Error 400: check parameter names and encoding

## Information Dense Extract
GET https://image-charts.com/chart?cht={type}&chd={encoding}:{series}[|series](&optional params)
Required type: lc,ls,bhs,bvs,p,p3,t,v,r; data: t(text),s(simple),e(ext) modes; sep comma and pipe
Optional chs(wxh default300x200),chco(colors),chl(labels),chxt(chrt axes),chxr(ranges),chds(scales),chdl(legend),chdlp(pos),chls(line style),chbh(bar),chma(margins),chf(fill),chg(grid),chtt(title),chm(markers),icac(cache false),icq(quality80),ici(interlace0)
HTTP 200 OK Content-Type image/png/jpg/gif; errors 414(URL too long→POST),400(bad format)
Node.js generateChart(opts):Promise<Buffer>; axios GET with responseType arraybuffer, timeout30s; use POST for >2KB; cache via icac; encodeURIComponent params

## Sanitised Extract
Table of Contents
1  HTTP Endpoint
2  Required Parameters
3  Optional Parameters
4  Data Encoding Modes
5  Response Handling
6  Error Codes

1  HTTP Endpoint
Base URL: https://image-charts.com/chart
Method: GET or POST (application/x-www-form-urlencoded)

2  Required Parameters
cht: string; Chart type codes: lc, ls, bhs, bvs, p, p3, t, v, r
chd: string; Data encoding prefix (t,s,e) + encoded series

3  Optional Parameters
chs: string; widthxheight px; default 300x200
chco: string; hex or named colors
chl: string; comma-separated labels
chxt: string; axes list x,y,x,y,r
chxr: string; axisIndex,start,end[,interval]
chds: string; scale ranges per series
chdl: string; legend entries
chdlp: string; t,b,l,r placement
chls: string; width,seg,space
chbh: string; barWidth[,groupWidth][,anchor]
chma: string; margins L,T,R,B
chf: string; fill definitions type,options
chg: string; grid x_step,y_step[,x_offset,y_offset]
chtt: string; title text
chm: string; marker definitions type,seriesIndex,dataIndex,color,size[,priority]
icac: boolean; auto-clear cache; default false
icq: int; JPEG quality 0-100; default 80
ici: boolean; interlaced GIF; default 0

4  Data Encoding Modes
Prefix t: text; s: simple (061); e: extended (04095)
Separator comma values, pipe between series

5  Response Handling
200 OK + image/png (or image/jpeg,image/gif)
Handle binary stream

6  Error Codes
414 URI Too Long  switch to POST
400 Bad Request  fix parameter formatting

## Original Source
Chart Rendering APIs
https://documentation.image-charts.com/en

## Digest of IMAGECHARTS_API

# Chart Rendering API

## Endpoint

`GET https://image-charts.com/chart`

Returns image/png. Supports HTTP GET and POST (application/x-www-form-urlencoded).

## Required Parameters

- `cht` (string): Chart type. One of `lc`,`ls`,`bhs`,`bvs`,`p`,`p3`,`t`,`v`,`r`. No default.
- `chd` (string): Data encoding. Format `t:`, `s:`, `e:` prefixed series. Comma-delimited values or pipe-separated series.

## Optional Parameters

- `chs` (string): Size in pixels `widthxheight`. Default `300x200`
- `chco` (string): Comma-separated hex color codes or named colors.
- `chl` (string): Comma-separated labels.
- `chxt` (string): Axes to display, e.g. `x`,`y`,`x,y`.
- `chxr` (string): Axis ranges `axisIndex,start,end[,interval]`.
- `chds` (string): Data scale `min,max` or `min1,max1,min2,max2...`.
- `chdl` (string): Legend entries, comma-separated.
- `chdlp` (string): Legend placement: `t`,`b`,`l`,`r`.
- `chls` (string): Line style `width,segmentLength,spaceLength`.
- `chbh` (string): Bar width/style `barWidth[,groupWidth][,anchor]`.
- `chma` (string): Margins `left,top,right,bottom`.
- `chf` (string): Fill types. Format `type,options|...`.
- `chg` (string): Grid lines `x_step,y_step[,x_offset,y_offset]`.
- `chtt` (string): Chart title.
- `chm` (string): Markers. Format `type,seriesIndex,dataPointIndex,color,size[,priority]`.
- `icac` (string): Auto-clear cache. `true` or `false`. Default `false`.
- `icq` (string): Quality for JPEG. `0–100`. Default `80`.
- `ici` (string): Interlacing for GIF. `1` for interlaced; `0` for no. Default `0`.

## Data Encoding Modes

- `t:` text encoding, comma-separated values.
- `s:` simple encoding (0–61).
- `e:` extended encoding (0–4095, two-character pairs).

## Response

- Status: `200 OK` or `4xx`/`5xx` on error
- Headers: `Content-Type: image/png` (or image/jpeg, image/gif)
- Body: Binary image data

## Error Codes

- `414 URI Too Long`: URL exceeds 2048 bytes. Use POST.
- `400 Bad Request`: Invalid parameter formatting.

## Rate Limits

- 1000 requests per minute per IP.

_Retrieved: 2024-07-19_


## Attribution
- Source: Chart Rendering APIs
- URL: https://documentation.image-charts.com/en
- License: CC0 1.0 Universal / Proprietary (free tier)
- Crawl Date: 2025-05-12T06:29:06.730Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-12
