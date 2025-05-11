# Overview

Add an interactive web interface to the HTTP server mode, allowing users to use a browser to compute π, view digit frequency analysis, and display charts without using the CLI or raw API.

# HTTP UI Endpoints

- GET /ui
  Display an HTML form where users can enter the number of digits and select an action: calculate pi, frequency analysis, or chart.
- POST /ui/calculate
  Accept form fields: digits (integer) and action (calculate|frequency|chart).
  - If action is calculate, render a page showing the π value up to the requested digits.
  - If action is frequency, show a table of digit counts and percentages.
  - If action is chart, embed a PNG bar chart (base64 data URI) of digit frequency.

# Implementation Details

• In src/lib/main.js, import ejs and express.urlencoded middleware.
• Define inline EJS templates as strings for the form and result pages.
• On GET /ui, respond with ejs.render(formTemplate, {}).
• On POST /ui/calculate, parse form data, validate digits, call calculatePi or analyzePi from existing logic, generate chart buffer via quickchart-js for chart action, convert to base64, and use ejs.render(resultTemplate, { digits, pi, counts, percentages, chartData }).
• Use express.urlencoded({ extended: true }) to support form submissions.
• Handle invalid input by rendering an error message in the HTML page with status 400.

# Testing

• In tests/unit/main.test.js, add supertest cases:
  - GET /ui returns status 200 and HTML containing a form element and input named digits.
  - POST /ui/calculate with digits=5 and action=calculate returns HTML containing the correct π string.
  - POST /ui/calculate with action=frequency returns a table with ten rows and correct counts.
  - POST /ui/calculate with action=chart returns HTML with an img tag whose src starts with data:image/png.
  - Invalid digits or missing action render a 400 status and HTML error message.

# Documentation

• Update README.md:
  - Add a Web UI section under HTTP API describing how to access the web interface.
  - Provide example:
      Open http://localhost:3000/ui in a browser to use the interactive form.
  - Show screenshots or sample markup of the form and results page.
