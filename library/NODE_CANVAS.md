# NODE_CANVAS

## Crawl Summary
Installation: npm install canvas (Node >=18.12.0); prebuilt binaries for macOS x86_64, macOS aarch64, Linux x86_64 (glibc), Windows x86_64. Build from source: npm install --build-from-source; requires Cairo >=1.10.0, Pango, pkg-config. OS-specific commands for dependencies. Quick Example: createCanvas, getContext, font, rotate, fillText, measureText, stroke. Utility Methods: createCanvas(width,height,type?), createImageData(width,height) or data array variants, loadImage(src):Promise<Image>, registerFont(path,{family,weight,style}), deregisterAllFonts(). Non-standard APIs: Canvas#toBuffer(callback?,mimeType?,config?), Canvas#createPNGStream(config?), Canvas#createJPEGStream(config?), Canvas#createPDFStream(config?), Canvas#toDataURL(mimeType?,quality|opts,callback?). Context Properties: patternQuality, quality, textDrawingMode, globalCompositeOperation='saturate', antialias. PDF: createCanvas(w,h,'pdf'), ctx.addPage(size?), beginTag/endTag for hyperlinks and structure, metadata support. SVG: createCanvas(w,h,'svg'), toBuffer output. Pixel formats: RGBA32 default, RGB24, A8, RGB16_565, A1, RGB30 with experimental caveats. Testing: npm run test-server, npm run test.

## Normalised Extract
Table of Contents
1 Installation and Build Dependencies
2 Canvas Creation and Context Retrieval
3 Image Loading and Drawing
4 Font Registration and Management
5 Buffer and Stream Output
6 CanvasRenderingContext2D Extensions
7 PDF and SVG Output Workflows
8 Pixel Format Configuration
9 Testing Commands

1 Installation and Build Dependencies
- npm install canvas
- Node>=18.12.0
- Prebuilt binaries: macOS x86_64, macOS aarch64, Linux x86_64 (glibc), Windows x86_64
- Build from source: npm install --build-from-source
- Cairo>=1.10.0, Pango, pkg-config
- macOS (Homebrew): brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman python-setuptools
- Ubuntu: sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
- Fedora: sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
- Solaris: pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
- OpenBSD: doas pkg_add cairo pango png jpeg giflib
- macOS v10.11+: xcode-select --install; npm>=6.4.1 for Xcode>=10

2 Canvas Creation and Context Retrieval
- createCanvas(width:number, height:number, type?:'pdf'|'svg'): Canvas
- canvas.getContext('2d'[, { pixelFormat }]): CanvasRenderingContext2D

3 Image Loading and Drawing
- loadImage(src:string|Buffer): Promise<Image>
- ctx.drawImage(image:Image, dx:number, dy:number[, dw?:number, dh?:number])

4 Font Registration and Management
- registerFont(path:string, options:{ family:string, weight?:string, style?:string })
- deregisterAllFonts(): void

5 Buffer and Stream Output
- canvas.toBuffer([mimeType?:string, config?:object]): Buffer
- canvas.toBuffer(callback:(err:Error|null, buf:Buffer)=>void, [mimeType?:string], [config?:object]): void
- canvas.createPNGStream(config?:{ compressionLevel?:0-9, filters?:number, palette?:Uint8ClampedArray, backgroundIndex?:number, resolution?:number }): ReadableStream
- canvas.createJPEGStream(config?:{ quality?:0-1, progressive?:boolean, chromaSubsampling?:boolean }): ReadableStream
- canvas.createPDFStream(config?:{ title?:string, author?:string, subject?:string, keywords?:string, creator?:string, creationDate?:Date, modDate?:Date }): ReadableStream
- canvas.toDataURL([mimeType?:string], [quality?:number], [callback?]): string|void

6 CanvasRenderingContext2D Extensions
- context.patternQuality: 'fast'|'good'|'best'|'nearest'|'bilinear' (default 'good')
- context.quality: same as patternQuality
- context.textDrawingMode: 'path'|'glyph' (default 'path')
- context.globalCompositeOperation: standard + 'saturate'
- context.antialias: 'default'|'none'|'gray'|'subpixel'

7 PDF and SVG Output Workflows
- PDF: createCanvas(w,h,'pdf'); ctx.addPage([width, height]); ctx.beginTag('Link', "uri='...' [rect=[x y w h]]"); ctx.endTag('Link'); toBuffer('application/pdf', metadata)
- SVG: createCanvas(w,h,'svg'); fs.writeFileSync('out.svg', canvas.toBuffer())

8 Pixel Format Configuration
- canvas.getContext('2d', { pixelFormat: 'A8'|'RGB24'|'RGB16_565'|'A1'|'RGB30' })
- RGBA32 default; experimental formats affect getImageData/putImageData

9 Testing Commands
- npm install --build-from-source
- npm run test-server   # Browser at localhost:4000
- npm run test          # Unit tests

## Supplementary Details
Dependencies and Versions
- Node.js >=18.12.0
- Cairo >=1.10.0 for binary build, >=1.16.0 for PDF metadata
- Pango >=1.0
- pkg-config
- Optional: libgif/giflib for GIF, librsvg for SVG, libjpeg for JPEG

OS Dependency Commands
- macOS: brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman python-setuptools
- Ubuntu: sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
- Fedora: sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
- Solaris: pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
- OpenBSD: doas pkg_add cairo pango png jpeg giflib

Configuration Objects
- JPEG config: { quality:0-1, progressive:boolean, chromaSubsampling:boolean }
- PNG config: { compressionLevel:0-9, filters:canvas.PNG_ALL_FILTERS|canvas.PNG_FILTER_NONE, palette:Uint8ClampedArray, backgroundIndex:number, resolution:number }
- PDF metadata: { title:string, author:string, subject:string, keywords:string(delimited by space), creator:string, creationDate:Date, modDate:Date }

Implementation Steps
1 npm install canvas
2 require methods: createCanvas, loadImage, registerFont
3 Build fonts: registerFont('file.ttf',{family:'Name',weight:'normal',style:'normal'})
4 Create canvas and context
5 Perform drawing operations
6 Output via toBuffer or streams
7 On CI: deregisterAllFonts() in cleanup

Caveats
- img.src assignment may be synchronous; always use img.onload/img.onerror
- Experimental pixel formats may lack full getImageData/putImageData support
- A1, RGB30 incomplete; avoid for production

## Reference Details
createCanvas(width: number, height: number, type?: 'pdf'|'svg') => Canvas
- width, height: canvas dimensions in CSS pixels
- type: 'pdf' for PDF canvas, 'svg' for SVG canvas; default image canvas

createImageData(width: number, height: number) => ImageData
createImageData(data: Uint8ClampedArray|Uint16Array, width: number, height?: number) => ImageData
- data length = width*height*bytesPerPixel

loadImage(src: string|Buffer) => Promise<Image>
- rejects on error; use async/await or .then/.catch

registerFont(path: string, options: { family: string; weight?: string; style?: string }) => void
- at least options.family required; weight, style default to 'normal'

deregisterAllFonts() => void
- clears registered fonts

Image#src: set string URL, data URI or local path, or Buffer; triggers img.onload or img.onerror events

Image#dataMode: number bitmask; options Image.MODE_MIME=1, Image.MODE_IMAGE=2; combine for JPEG embedding in PDFs

canvas.toBuffer(callback?: (err:Error|null, buf:Buffer)=>void, mimeType?:string, config?:object) => Buffer|void
- mimeType: 'image/png'(default), 'image/jpeg', 'raw', 'application/pdf', 'image/svg+xml'
- config per mimeType: see supplementaryDetails
- returns Buffer if callback omitted; callback invoked asynchronously except raw/PDF/SVG

canvas.createPNGStream(config?:object) => ReadableStream
canvas.createJPEGStream(config?:object) => ReadableStream
canvas.createPDFStream(config?: object) => ReadableStream
- config same as toBuffer

canvas.toDataURL(mimeType?:string, qualityOrOpts?:number|object, callback?:function) => string|void
- synchronous for PNG, asynchronous for JPEG with callback required

CanvasRenderingContext2D properties:
- patternQuality: set before fill/stroke patterns
- quality: applies to transformations
- textDrawingMode: 'glyph' faster; in PDF embeds text glyphs; in SVG creates <symbol>/<use>
- globalCompositeOperation: use 'saturate' for additional blending
- antialias: control anti-aliasing level

PDF Output Example:
const canvas = createCanvas(600,800,'pdf');
const ctx = canvas.getContext('2d');
ctx.font='22px Helvetica';ctx.fillText('Hello',50,80);
ctx.addPage();ctx.fillText('Page 2',50,80);
ctx.beginTag('Link',"uri='https://example.com' rect=[50 80 100 20]");ctx.endTag('Link');
const pdfBuffer=canvas.toBuffer('application/pdf',{title:'Title',keywords:'node canvas',creationDate:new Date()});

Troubleshooting
- Mac compiling error Xcode: run xcode-select --install; ensure NPM>=6.4.1
- Missing Cairo: verify pkg-config can locate cairo with pkg-config --modversion cairo
- Runtime image load hangs: always set img.onload and img.onerror
- GetImageData wrong pixel order: check os.endianness() and pixelFormat

Best Practices
- Use registerFont() in setup and deregisterAllFonts() in test teardown
- For server rendering PDFs, enable Image.MODE_MIME|MODE_IMAGE on Image.dataMode before setting src
- For large canvases, use createPDFStream() to reduce memory
- Use specific PNG filters and compressionLevel for performance vs size tradeoffs

## Information Dense Extract
npm install canvas; Node>=18.12.0; prebuilt macOS x86_64,aarch64; Linux x86_64; Windows x86_64; source build: npm install --build-from-source; Cairo>=1.10.0, Pango,pkg-config; OS deps via brew/apt-get/yum/pkgin/pkg_add. API: createCanvas(w,h, type?), createImageData(w,h)|createImageData(data, w,h), loadImage(src):Promise<Image>, registerFont(path,{family,weight,style}), deregisterAllFonts(), Image.src=string|Buffer, Image.dataMode=MODE_MIME|MODE_IMAGE, canvas.toBuffer([mimeType,config]|callback,mimeType,config), createPNGStream({compressionLevel,filters,palette,backgroundIndex,resolution}), createJPEGStream({quality,progressive,chromaSubsampling}), createPDFStream({title,author,subject,keywords,creator,creationDate,modDate}), canvas.toDataURL([mimeType],[quality|opts],[callback]). Context props: patternQuality,quality,textDrawingMode,globalCompositeOperation='saturate',antialias. PDF: ctx.addPage([w,h]), ctx.beginTag/endTag for links and structure. SVG: createCanvas(w,h,'svg'). Experimental pixelFormat: A8,RGB24,RGB16_565,A1,RGB30. Test: npm run test-server, npm run test.

## Sanitised Extract
Table of Contents
1 Installation and Build Dependencies
2 Canvas Creation and Context Retrieval
3 Image Loading and Drawing
4 Font Registration and Management
5 Buffer and Stream Output
6 CanvasRenderingContext2D Extensions
7 PDF and SVG Output Workflows
8 Pixel Format Configuration
9 Testing Commands

1 Installation and Build Dependencies
- npm install canvas
- Node>=18.12.0
- Prebuilt binaries: macOS x86_64, macOS aarch64, Linux x86_64 (glibc), Windows x86_64
- Build from source: npm install --build-from-source
- Cairo>=1.10.0, Pango, pkg-config
- macOS (Homebrew): brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman python-setuptools
- Ubuntu: sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
- Fedora: sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
- Solaris: pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
- OpenBSD: doas pkg_add cairo pango png jpeg giflib
- macOS v10.11+: xcode-select --install; npm>=6.4.1 for Xcode>=10

2 Canvas Creation and Context Retrieval
- createCanvas(width:number, height:number, type?:'pdf'|'svg'): Canvas
- canvas.getContext('2d'[, { pixelFormat }]): CanvasRenderingContext2D

3 Image Loading and Drawing
- loadImage(src:string|Buffer): Promise<Image>
- ctx.drawImage(image:Image, dx:number, dy:number[, dw?:number, dh?:number])

4 Font Registration and Management
- registerFont(path:string, options:{ family:string, weight?:string, style?:string })
- deregisterAllFonts(): void

5 Buffer and Stream Output
- canvas.toBuffer([mimeType?:string, config?:object]): Buffer
- canvas.toBuffer(callback:(err:Error|null, buf:Buffer)=>void, [mimeType?:string], [config?:object]): void
- canvas.createPNGStream(config?:{ compressionLevel?:0-9, filters?:number, palette?:Uint8ClampedArray, backgroundIndex?:number, resolution?:number }): ReadableStream
- canvas.createJPEGStream(config?:{ quality?:0-1, progressive?:boolean, chromaSubsampling?:boolean }): ReadableStream
- canvas.createPDFStream(config?:{ title?:string, author?:string, subject?:string, keywords?:string, creator?:string, creationDate?:Date, modDate?:Date }): ReadableStream
- canvas.toDataURL([mimeType?:string], [quality?:number], [callback?]): string|void

6 CanvasRenderingContext2D Extensions
- context.patternQuality: 'fast'|'good'|'best'|'nearest'|'bilinear' (default 'good')
- context.quality: same as patternQuality
- context.textDrawingMode: 'path'|'glyph' (default 'path')
- context.globalCompositeOperation: standard + 'saturate'
- context.antialias: 'default'|'none'|'gray'|'subpixel'

7 PDF and SVG Output Workflows
- PDF: createCanvas(w,h,'pdf'); ctx.addPage([width, height]); ctx.beginTag('Link', 'uri='...' [rect=[x y w h]]'); ctx.endTag('Link'); toBuffer('application/pdf', metadata)
- SVG: createCanvas(w,h,'svg'); fs.writeFileSync('out.svg', canvas.toBuffer())

8 Pixel Format Configuration
- canvas.getContext('2d', { pixelFormat: 'A8'|'RGB24'|'RGB16_565'|'A1'|'RGB30' })
- RGBA32 default; experimental formats affect getImageData/putImageData

9 Testing Commands
- npm install --build-from-source
- npm run test-server   # Browser at localhost:4000
- npm run test          # Unit tests

## Original Source
node-canvas
https://github.com/Automattic/node-canvas

## Digest of NODE_CANVAS

# node-canvas Technical Digest (retrieved: 2024-06-24)

## Crawled Content Metadata
- URL: https://github.com/Automattic/node-canvas
- Data Size: 613113 bytes
- Links Found: 4691

## Installation

Run:
```
npm install canvas
```
Supported platforms download prebuilt binaries: macOS x86/64, macOS aarch64, Linux x86/64 (glibc), Windows x86/64. Minimum Node.js v18.12.0.

To build from source:
```
npm install --build-from-source
```
Requires Cairo v1.10.0+, Pango, pkg-config and optional libs for GIF, SVG, JPEG support.

## Compiling Dependencies

macOS (Homebrew):
```
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman python-setuptools
```
Ubuntu:
```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```
Fedora:
```
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
```
Solaris:
```
pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
```
OpenBSD:
```
doas pkg_add cairo pango png jpeg giflib
```
Mac OS X v10.11+ compilation fixes:
```
xcode-select --install
```
Ensure NPM ≥6.4.1 if Xcode ≥10.

## Quick Example

```js
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');
ctx.font = '30px Impact';
ctx.rotate(0.1);
ctx.fillText('Awesome!', 50, 100);
const textMetrics = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.moveTo(50, 102);
ctx.lineTo(50 + textMetrics.width, 102);
ctx.stroke();
loadImage('examples/images/lime-cat.jpg').then(image => {
  ctx.drawImage(image, 50, 0, 70, 70);
  console.log(canvas.toDataURL());
});
```

## Utility Methods

### createCanvas(width: number, height: number, type?: 'pdf'|'svg') => Canvas

### createImageData(width: number, height: number) => ImageData
### createImageData(data: Uint8ClampedArray|Uint16Array, width: number, height?: number) => ImageData

### loadImage(src: string|Buffer) => Promise<Image>

### registerFont(path: string, options: { family: string, weight?: string, style?: string }) => void

### deregisterAllFonts() => void

## Non-standard Canvas APIs

### Canvas#toBuffer(mimeType?: string, config?: any) => Buffer
### Canvas#toBuffer(callback: (err: Error|null, buf: Buffer) => void, mimeType?: string, config?: any) => void
### Canvas#createPNGStream(config?: { compressionLevel?: number, filters?: number, palette?: Uint8ClampedArray, backgroundIndex?: number, resolution?: number }) => ReadableStream
### Canvas#createJPEGStream(config?: { quality?: number, progressive?: boolean, chromaSubsampling?: boolean }) => ReadableStream
### Canvas#createPDFStream(config?: { title?: string, author?: string, subject?: string, keywords?: string, creator?: string, creationDate?: Date, modDate?: Date }) => ReadableStream
### Canvas#toDataURL(mimeType?: string, qualityOrOpts?: number|object, callback?: (err: Error|null, data: string) => void) => string|void

## Context Properties

- context.patternQuality: 'fast'|'good'|'best'|'nearest'|'bilinear'
- context.quality: 'fast'|'good'|'best'|'nearest'|'bilinear'
- context.textDrawingMode: 'path'|'glyph'
- context.globalCompositeOperation: standard operations + 'saturate'
- context.antialias: 'default'|'none'|'gray'|'subpixel'

## PDF Output

canvas = createCanvas(w, h, 'pdf');
ctx.addPage([width: number, height: number]);
ctx.beginTag('Link', "uri='...' rect=[x y width height]");
ctx.endTag('Link');
canvas.toBuffer('application/pdf', metadata);

## SVG Output

canvas = createCanvas(w, h, 'svg');
fs.writeFileSync('out.svg', canvas.toBuffer());

## Experimental Pixel Formats

canvas.getContext('2d', { pixelFormat: 'A8'|'RGB24'|'RGB16_565'|'A1'|'RGB30' });

## Testing

```
npm install --build-from-source
npm run test-server         # visual tests on localhost:4000
npm run test                # unit tests
```

## Attribution
- Source: node-canvas
- URL: https://github.com/Automattic/node-canvas
- License: MIT
- Crawl Date: 2025-05-19T18:29:05.502Z
- Data Size: 613113 bytes
- Links Found: 4691

## Retrieved
2025-05-19
