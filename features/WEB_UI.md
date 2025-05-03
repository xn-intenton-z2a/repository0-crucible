# WEB UI Feature

# Overview
Provide a browser-based interactive interface for the emoticon service. Introduce a new HTTP endpoint that renders an HTML page allowing users to view random emoticons, seed-based emoticons, full emoticon list, and multiple emoticon outputs via a simple form and controls.

# HTTP Endpoint
- Add GET /ui route to Express router.
- Use EJS to render an inline HTML template.
- Support query parameters seed and count for deterministic and batch emoticon selection.
- Display controls:
  - Button to refresh a random emoticon.
  - Input field for seed and button to select seeded emoticon.
  - Input field for count and button to display multiple emoticons.
  - Link to view the full list of emoticons on the same page.
- Serve a responsive HTML page with minimal styling.

# Implementation Details
- Embed an EJS template string in the source file; use render function from ejs.
- Update createEmoticonRouter to mount the /ui handler before existing routes.
- Ensure Access-Control-Allow-Origin header is not required for UI, as it is same origin.

# Testing
- Add unit tests in tests/unit for GET /ui:
  - Verify status 200 and content-type text/html.
  - Confirm rendered HTML contains a form, input names seed and count, and a container for emoticon output.
  - Simulate queries /ui?seed=2&count=3 and check the page displays expected emoticons.

# Documentation
- Update README and docs/HTTP_API.md to document the /ui endpoint, its parameters, and usage example in a browser and curl.