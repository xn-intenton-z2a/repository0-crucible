# Overview
Extend the tool with real-time streaming of convergence data and the ability to offload chart rendering to an external service. Users can stream convergence data from CLI or HTTP and choose between local Chart.js rendering or fetching a PNG from Image-Charts API.

# Implementation

1. Dependencies
   • Add axios: npm install axios@^1.0.0

2. CLI Enhancements
   a. Extend CLIOptionsSchema in src/lib/main.js:
      - stream: z.boolean().optional().default(false)
      - externalChartService: z.boolean().optional().default(false)
   b. Add flags in minimist defaults: --stream, --external-chart-service
   c. In main():
      i. If opts.stream is true:
         • Generate convergence data points for selected algorithm as in convergence-data mode
         • For each point, console.log(JSON.stringify(point))
         • Exit after streaming
      ii. When opts.chart is set and opts.externalChartService is true:
         • Build Image-Charts URL with type=lc, chd=s:<comma-separated error series>, icac=false, apiKey from process.env.IMAGE_CHARTS_KEY
         • Use axios.get with responseType 'arraybuffer' (POST if URL >2KB)
         • Write buffer to chart path
      iii. Else fallback to existing local Chart.js + canvas logic

3. HTTP API Enhancements in createApp():
   a. Extend ApiParamsSchema:
      - stream: z.preprocess(val=>val==='true', z.boolean()).optional().default(false)
      - externalChart: z.preprocess(val=>val==='true', z.boolean()).optional().default(false)
   b. Add GET /pi/stream:
      - Parse params including stream flag
      - Set headers: Content-Type: text/event-stream; Cache-Control: no-cache; Connection: keep-alive
      - Loop through generation of data points, write SSE events: res.write(`data: ${JSON.stringify(point)}\n\n`)
      - End response
   c. Modify GET /pi/chart:
      - If params.externalChart is true:
         • Build & send Image-Charts request via axios, return PNG buffer
      - Else local Chart.js logic as before

4. Testing
   • Mock axios.get/post to return a Buffer starting with PNG header
   • CLI Tests:
     - main(['--digits','3','--stream']) calls console.log for JSON points
     - main(['--digits','3','--chart','out.png','--external-chart-service']) invokes axios and fs.writeFileSync
   • HTTP Tests:
     - GET /pi/stream?digits=2&algorithm=leibniz returns SSE events (Content-Type text/event-stream)
     - GET /pi/chart?digits=2&externalChart=true returns PNG via axios

5. Documentation
   a. Update docs/USAGE.md:
      - Document --stream and --external-chart-service CLI options with examples
      - Document HTTP /pi/stream SSE endpoint and externalChart query param for /pi/chart
   b. Update README.md Features:
      - Describe streaming JSON lines, SSE endpoint, external chart service vs local rendering with examples
