# Interactive Web UI Dashboard

Allow users to perform π calculations through a browser-based dashboard with form controls and live visualization of results and convergence.

# Implementation

1. Extend createApp() in src/lib/main.js:
   a. Add route GET /dashboard:
      - Return inline HTML page string with form elements for selecting algorithm, digits or samples, action buttons for Compute, Convergence Data, Chart, a canvas for client-side Chart.js, and a result display area.
      - Load Chart.js from CDN in the page header.
      - Include inline <script> that handles form events, performs fetch requests to /pi (for result), /pi/data (for raw data), and /pi/chart (for image), and updates the DOM accordingly.
   b. No external template files; embed HTML in the response handler.

# Testing

1. In tests/unit/server.test.js:
   - Simulate GET /dashboard using supertest and assert status 200 and Content-Type text/html.
   - Verify the response body contains key elements: <form>, <select name="algorithm">, <canvas id="errorChart">.

# Documentation

1. Update docs/USAGE.md:
   - Add **Web UI Dashboard** section: instructions to start server with --serve and navigate to /dashboard.
2. Update README.md Features list:
   - Document Web UI Dashboard with a brief description.