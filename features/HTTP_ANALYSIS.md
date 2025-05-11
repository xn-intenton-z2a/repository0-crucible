# Overview

Add HTTP endpoints to expose π digit frequency analysis and chart generation over HTTP, complementing existing CLI analysis mode. Clients can request statistical summaries or visual charts of π digits directly via the HTTP API.

# HTTP Endpoints

Define new routes on the existing Express server:

GET /pi/analysis
  Query parameters:
    digits: integer number of decimal places (default 10)
    type: string one of frequency or chart (default frequency)
  Behavior:
    If type is frequency, respond with JSON containing counts and percentages of each digit 0 through 9 for the first requested digits.
    If type is chart, generate a PNG bar chart of digit frequency and respond with image data and content type image/png.

# Implementation Details

• In main.js server setup, extend the Express app under serving mode to handle /pi/analysis.  
• Use zod schemas to validate and coerce query parameters digits and type.  
• For frequency mode, call analyzePi(digits) logic from CLI code to compute counts and percentages. Respond with JSON { digits, counts, percentages }.  
• For chart mode, add quickchart-js to dependencies. Create a QuickChart instance configured as a bar chart with labels 0 through 9 and data equal to percentages. Call chart.toBinary() to obtain image buffer, set response type image/png, and send the buffer.  
• Handle validation errors by responding status 400 with JSON error message.  
• Ensure the server continues normal /pi and /benchmark routes alongside analysis.

# Testing

Add unit tests in tests/unit/main.test.js using supertest and vitest:
  • Start server with main(["--serve","0"]) and capture instance.  
  • Test GET /pi/analysis?digits=5&type=frequency returns status 200 and JSON body with counts summing to digits and correct percentages.  
  • Test GET /pi/analysis?digits=5&type=chart returns status 200, content type image/png, and non empty body.  
  • Test invalid query values produce status 400 and error JSON.  

Add e2e tests in tests/e2e/cli.test.js:
  • Use curl or supertest to GET analysis endpoints against a running server and assert correct behavior for both modes.

# Documentation

Update README.md:
  • Document the new /pi/analysis endpoint under HTTP API section.  
  • Provide examples:
    curl http://localhost:3000/pi/analysis?digits=50&type=frequency
    curl http://localhost:3000/pi/analysis?digits=50&type=chart > freq.png
  
Update package.json dependencies to include quickchart-js for chart mode.