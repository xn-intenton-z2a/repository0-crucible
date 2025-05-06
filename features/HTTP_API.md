# Summary
Add a browser-based interactive UI endpoint alongside the existing HTTP JSON API. This provides a live HTML page where users can adjust parameters and generate ASCII faces directly in a browser session without a CLI.

# Specification
- Serve an HTML page on GET / when the server is running in --serve mode.
- The HTML page includes a form or controls for count, seed, category, facesFile, and mergeFaces.
- Include client-side JavaScript that listens for form submissions or control changes and sends fetch requests to GET /face with appropriate query parameters.
- Render the JSON response { faces: [string, ...] } dynamically into a results area on the page.
- Serve the HTML page with Content-Type text/html and the client script with Content-Type application/javascript.
- Continue to support the existing GET /face endpoint for JSON responses.
- Handle invalid parameters by displaying a user-friendly error message in the page instead of raw JSON errors.

# Testing
- Start the server in --serve mode and verify GET / returns status 200 with Content-Type text/html and contains the form elements.
- Verify GET /ui.js or inline script is served with Content-Type application/javascript.
- Use JSDOM or a headless browser to load the HTML, simulate user input, trigger form submission or control change, and assert that faces are rendered in the DOM.
- Verify that client-side errors are displayed when the server returns a JSON error for invalid inputs.

# Documentation
- Update README.md under Features to document the browser UI, including how to access it (http://localhost:PORT/) and a screenshot or example of the interactive form.
- Update docs/HTTP_API.md to add a "Browser UI" section with description of the page structure, form fields, and client-side behavior.

# Implementation Details
- In src/lib/main.js under the --serve mode branch:
  • After parsing the HTTP request URL, if method is GET and path is '/', respond with a template string containing the HTML page and embedded JavaScript.
  • Reuse existing internal functions to handle AJAX requests to /face and return JSON.
  • No new source files: embed HTML and client-side JS as template literals in src/lib/main.js.
  • Set response headers appropriately for HTML and JS assets.
  • Maintain graceful shutdown on SIGINT and SIGTERM as before.