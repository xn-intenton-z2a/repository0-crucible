# Overview
Combine streaming convergence data and alternative chart generation into a unified output modes feature. Users can emit convergence data points in real time via CLI JSON lines or HTTP Server-Sent Events, and can choose between local Chart.js rendering or offloading PNG chart creation to the Image-Charts API.

# Implementation

1. Dependencies
   • axios: npm install axios@^1.0.0

2. CLI Options
   • --stream (boolean): when set, emit each convergence data point as a separate JSON line to stdout.
   • --external-chart-service (boolean): when set, fetch the PNG chart from Image-Charts API instead of local Chart.js rendering.

3. Code Changes in src/lib/main.js
   a. Import axios:
      import axios from 'axios';

   b. Extend CLIOptionsSchema to include:
      - stream: z.boolean().optional().default(false)
      - externalChartService: z.boolean().optional().default(false)

   c. In main():
      i. If opts.stream is true and convergence-data or chart is not specified:
         - Compute dataPoints incrementally according to the selected algorithm.
         - For each point, console.log(JSON.stringify(point)).
         - Exit after streaming.

      ii. When chartPath is set:
         - If opts.externalChartService is true:
           • Build Image-Charts URL with type=lc, encoded error series, &icac=false, &apiKey=process.env.IMAGE_CHARTS_KEY.
           • Use axios.get or axios.post with responseType 'arraybuffer' to fetch PNG buffer.
           • Write buffer to chartPath via fs.writeFileSync.
         - Else:
           • Use existing Chart.js and canvas logic to render PNG and write to file.

4. HTTP Endpoint Changes in createApp()
   a. Extend ApiParamsSchema to include:
      - stream: z.preprocess(val=>val==='true', z.boolean()).optional().default(false)
      - externalChart: z.preprocess(val=>val==='true', z.boolean()).optional().default(false)

   b. Add GET /pi/stream:
      - Parse query params including stream true.
      - Set headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive.
      - Loop through generation of dataPoints and write SSE data events:
         res.write(`data: ${JSON.stringify(point)}\n\n`);
      - End response.

   c. Modify GET /pi/chart handler:
      - If params.externalChart is true:
         • Use axios to fetch PNG from Image-Charts API and send buffer as image/png.
      - Else:
         • Fallback to existing Chart.js + canvas logic.

# Testing

1. Unit Tests
   • Mock axios.get/post to return a Buffer starting with PNG header.
   • CLI tests:
     - main(['--digits','3','--stream']) should call console.log multiple times with JSON-stringifiable points.
     - main(['--digits','3','--chart','out.png','--external-chart-service']) should invoke axios and write buffer via fs.writeFileSync.

2. HTTP Tests
   • Supertest for GET /pi/stream?digits=2&algorithm=leibniz should return status 200, content-type text/event-stream, and valid SSE events.
   • GET /pi/chart?digits=2&algorithm=montecarlo&externalChart=true should respond with PNG content fetched via axios.

# Documentation

1. Update docs/USAGE.md:
   - Document CLI --stream and --external-chart-service options with examples.
   - Document HTTP /pi/stream SSE endpoint and externalChart query param for /pi/chart.

2. Update README.md Features list:
   - Add **Output Modes** section describing streaming JSON lines, SSE, local vs external chart service with examples.