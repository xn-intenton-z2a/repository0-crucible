# Web UI Endpoint

Provide a simple interactive web user interface for π calculations, enabling users to enter parameters, view numeric results, and visualize convergence charts directly in their browser.

# UI Endpoint

GET /
• Serves an HTML page with a form allowing input fields for algorithm, digits, samples, diagnostics, and buttons to calculate π and display a chart.
• Uses client-side JavaScript to fetch from /pi and /pi/chart endpoints and render results and images dynamically.

# Implementation

1. In src/lib/main.js within createApp():
   a. Define a new GET handler at path '/'.
   b. Return a single HTML string containing:
      • A form with inputs: algorithm (select), digits (number), samples (number), diagnostics (checkbox).
      • A Calculate button that triggers client-side fetch to /pi with query parameters.
      • An <pre> or <div> element to display JSON or numeric result.
      • An <img> element whose src is set to /pi/chart?… to display the convergence chart.
      • Minimal inline script to handle form submission, fetch /pi and /pi/chart, and update the page.
   c. No external files to add; embed all HTML and script in the route handler.

# Testing

1. In tests/unit/server.test.js add tests using supertest:
   • GET / should return status 200 and Content-Type text/html.
   • Response body should contain '<form' and '<script'.

# Documentation

1. Update docs/USAGE.md:
   • Document the root URL for the web UI.
   • Provide a screenshot or HTML snippet of how to open and use the interface.
2. Update README.md under Features:
   • Describe "Web UI Endpoint" with instructions:
     node src/lib/main.js --serve 3000
     Open http://localhost:3000/ in a browser to access the interactive UI.
