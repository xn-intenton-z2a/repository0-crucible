# HTML Report Generation

Provide users with a ready-to-distribute HTML report combining convergence data, performance diagnostics, and an embedded convergence chart for any supported algorithm. The report is rendered via an EJS template and saved to disk or returned by the HTTP API.

# Implementation

1. Add or ensure dependency:
   • ejs: already present via package.json
2. CLI Enhancements in src/lib/main.js:
   a. Extend CLIOptionsSchema to include:
      - report: z.string().nullable().optional()
   b. Add default flag in minimist for --report <filepath>
   c. After computing piValue and dataPoints, if opts.report is provided:
      i. Generate chart PNG buffer via existing Chart.js + canvas logic
      ii. Convert buffer to base64 string: buffer.toString('base64')
      iii. Inline an EJS template string with HTML structure, placeholders for algorithm, parameters, result, durationMs, and embedded image `data:image/png;base64,${base64}`
      iv. Call ejs.render(templateString, { algorithm, parameters, dataPoints, chartImage, summary })
      v. Write rendered HTML to opts.report via fs.writeFileSync
3. HTTP API Enhancements in createApp():
   a. Extend ApiParamsSchema to accept report flag if needed (optional)
   b. Add GET /pi/report endpoint:
      i. Parse query parameters as in /pi and /pi/chart
      ii. Compute piValue, dataPoints, and chartImage as in CLI
      iii. Call ejs.render to produce HTML
      iv. Send Content-Type text/html and HTML body

# Testing

1. Unit tests in tests/unit/main.test.js:
   • Mock ejs.render and fs.writeFileSync to verify HTML string generation when --report is used
   • Spy on createCanvas and Chart to confirm embedded image generation
2. HTTP tests in tests/unit/server.test.js:
   • Supertest GET /pi/report?digits=2&algorithm=leibniz returns 200 with Content-Type text/html
   • Body begins with `<!DOCTYPE html>` or `<html>` and contains algorithm and result

# Documentation

1. docs/USAGE.md:
   • Document CLI option --report <filepath>
   • Provide example command and snippet of generated HTML
   • Document HTTP endpoint GET /pi/report
2. README.md:
   • Add **HTML Report Generation** under Features
   • Show example usage and expected behavior