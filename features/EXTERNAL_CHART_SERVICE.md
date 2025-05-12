# EXTERNAL_CHART_SERVICE

Enable offloading of convergence chart generation to the external Image-Charts API as an alternative to local Chart.js and canvas rendering. This reduces binary dependencies and can improve performance or reliability in constrained environments.

# CLI Options

--external-chart-service    Use image-charts.com API for chart generation instead of local rendering.  Requires environment variable IMAGE_CHARTS_KEY for private use or will use free public API.

# HTTP API Parameter

externalChart=true         When provided on /pi/chart endpoint, generate the PNG via Image-Charts API instead of local canvas.

# Implementation

1. Add new dependency:
   • axios: npm install axios@^1.0.0
2. In src/lib/main.js:
   a. Import axios:
      import axios from 'axios';
   b. Extend CLIOptionsSchema and ApiParamsSchema to include externalChart as a boolean flag or query parameter with default false.
3. Modify chart generation logic in both CLI and HTTP:
   a. If opts.externalChart is true:
      • Build an Image-Charts URL with type=lc, chart size, axis labels, and encoded error data series from dataPoints.
      • Include &icac=false and &chco parameters, and append &apiKey=${process.env.IMAGE_CHARTS_KEY} when set.
      • Use axios.get or axios.post (for long URLs) with responseType arraybuffer to fetch the PNG buffer.
      • For CLI --chart <path>, write the fetched buffer to the file with fs.writeFileSync.
      • For HTTP GET /pi/chart, send the buffer as image/png response.
   b. Otherwise, fall back to existing Chart.js + canvas logic.
4. Update tests in tests/unit/main.test.js and server.test.js:
   • Mock axios.get/post to return a Buffer of PNG header bytes.
   • Verify that when --external-chart-service or externalChart=true is set, fs.writeFileSync or res.send is called with the buffer and Chart.register or createCanvas is not invoked.
5. Documentation:
   • Update docs/USAGE.md under **Chart Generation** to document --external-chart-service option and example including setting IMAGE_CHARTS_KEY.
   • Update README.md under Features to describe External Chart Service capability with usage examples for both CLI and HTTP modes.