# Overview

Provide a browser-based interactive dashboard at the `/dashboard` HTTP endpoint. The dashboard offers a user-friendly form for selecting π calculation parameters, displays results in real time, and renders an error convergence chart in the browser. This feature lowers the barrier for exploration by non-developers and serves as a live demonstration of algorithm performance.

# Implementation

1. Route and HTML Template
   • In createApp(), add a GET `/dashboard` route.
   • Serve a complete HTML page with:
     - A form for inputs: digits (number), algorithm (select), samples (number), diagnostics (checkbox).
     - A result display area.
     - A `<canvas>` element for the error chart.
     - Include Chart.js via CDN for client-side rendering.

2. Client-Side Script
   • On form submission, prevent default and build URLSearchParams from form fields.
   • Fetch `/pi?...` and display JSON result in the result area.
   • Fetch `/pi/data?...` to retrieve convergence data points.
   • Initialize or update a client-side Chart.js line chart on the canvas to plot error vs. iteration/sample index.
   • Handle errors by displaying validation messages on the page.

3. Enhance Accessibility
   • Use semantic HTML: labels for inputs, fieldsets where appropriate.
   • Ensure the chart canvas has an accessible description.

# Testing

1. HTTP Tests (tests/unit/server.test.js)
   - GET `/dashboard` should return 200 and Content-Type `text/html`.
   - Response body must include `<form`, `<canvas id="chart"`, and the Chart.js CDN URL.

2. Manual or E2E Verification
   - Open the `/dashboard` page in a browser.
   - Submit different parameter combinations and verify the numeric result and chart update correctly.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, add **GET /dashboard** with description and example:
     ```bash
     curl http://localhost:3000/dashboard
     ```

2. README.md
   • Under **Features**, add **Interactive Dashboard** with a brief description and instructions to access the dashboard in the browser.