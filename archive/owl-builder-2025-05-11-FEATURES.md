features/PI_SSE_SERVER.md
# features/PI_SSE_SERVER.md
# π SSE Streaming Server

# Usage

Add a new CLI flag --stream-pi-sse or -s followed by a port number to start an HTTP server streaming the digits of π to connected clients using Server-Sent Events (SSE).

Example:

  node src/lib/main.js --stream-pi-sse 3000

Client Subscription:

  const es = new EventSource('http://localhost:3000/events');
  es.onmessage = e => console.log(e.data);

# Implementation Details

1. Extend argument parsing in main to detect --stream-pi-sse or -s and validate the following argument as an integer port between 1024 and 65535. On invalid input, display an error message and exit with status 1.
2. Use Node's built-in http module to create a server listening on the specified port.
3. When a client issues a GET request to the /events endpoint:
    - Respond with status 200 and headers:
        Content-Type: text/event-stream
        Cache-Control: no-cache
        Connection: keep-alive
    - Send an initial SSE comment to establish the connection.
    - Stream the digits of π in small batches (for example, 10 digits per event) by writing frames of the form:
        id:<incremental id>\n
event:digits\n
data:<batch of π digits>\n\n
    - Send a keep-alive comment (":keep-alive\n\n") every 30 seconds for idle connections.
4. Use the existing π calculation implementation (or integrate the π algorithm module) to generate digits on demand.
5. Cleanly handle client disconnects by closing the response.

# Testing

Add tests in tests/unit/main.test.js to cover:

- Invocation without arguments and with invalid port to exit with an error status.
- Invocation with a valid port returns an HTTP server instance.
- Perform an HTTP GET request to /events and verify the response headers include text/event-stream and that at least one SSE frame is received.features/PI_CALCULATOR.md
# features/PI_CALCULATOR.md
# π Calculation Command

Add a new CLI flag to compute π to a specified number of decimal places using an efficient algorithm and output the result as plain text.

# Usage

When invoked with the --calculate-pi or -c flag followed by a positive integer, the tool calculates π to that many decimal places and prints it to stdout.

Example:

  node src/lib/main.js --calculate-pi 50

Expected output:

  3.14159265358979323846264338327950288419716939937510

# Implementation Details

1. Parse CLI arguments in main to detect --calculate-pi or -c and a following integer argument representing the number of digits (n).
2. Validate that n is an integer between 1 and 10000. On invalid input, display an error message and exit with nonzero status.
3. Use a reliable high-precision algorithm (e.g. Gauss–Legendre or Machin-like formula) with a big-number library (add dependency on big.js) to compute π to n decimal places.
4. Format the result with exactly n digits after the decimal point and print to stdout.
5. Add automated tests in tests/unit/main.test.js to:
   - Verify that --calculate-pi 1 prints 3.1
   - Verify that --calculate-pi 5 prints 3.14159
   - Confirm invalid inputs (non-integer, negative, or too large) cause the process to exit with an error.

# Documentation

- Update README.md to document the new flag, its purpose, and usage examples.
- Mention big.js dependency in package.json under dependencies.

# Dependencies

Add "big.js" to package.json dependencies to support arbitrary-precision arithmetic.
features/PI_HISTOGRAM.md
# features/PI_HISTOGRAM.md
# π Digit Histogram

Generate and visualize the distribution of the first N decimal digits of π as a PNG bar chart.

# Usage

Invoke the CLI with the --pi-histogram flag followed by the number of digits and the output file path.

Example:

  node src/lib/main.js --pi-histogram 10000 histogram.png

# Implementation Details

1. Extend argument parsing in main to detect --pi-histogram (or -g) and capture two arguments: the digit count N and the output file path.
2. Validate that N is a positive integer between 1 and 100000. On invalid input, display an error message and exit with nonzero status.
3. Use the existing π calculation implementation to compute the first N decimal digits of π.
4. Tally the frequency of each digit 0 through 9 into an array of counts.
5. Use node-canvas to create a Canvas instance, set a fixed width and height, draw axes and bars where each bar’s height is proportional to the digit count frequency.
6. Convert the canvas to a PNG buffer and write the buffer to the specified output file path. Handle file system errors gracefully.
7. Ensure resources are released after writing the file.

# Testing

Add tests in tests/unit/main.test.js:

- Unit test for a helper function generateHistogramBuffer(N) that returns a PNG Buffer of non-zero length when N is valid.
- Verify invalid N values cause the process to exit with an error status.
- Mock the file system to test that CLI invocation with valid parameters writes a file to the given path without throwing.

# Documentation

Update README.md to include:

- Description of the --pi-histogram flag, its purpose, and usage example.
- Note on output file creation and dependencies.

# Dependencies

Add "canvas" to package.json dependencies to support drawing the bar chart.