# Overview

Introduce request throttling to protect the HTTP API from abuse and denial-of-service attacks by limiting the number of requests a client can make in a given time window. This feature improves the stability and reliability of the server under heavy load.

# Implementation

1. Dependency
   • Add `express-rate-limit` to package.json dependencies.

2. Middleware Setup
   a. In `src/lib/main.js`, import rateLimit:
      • `import rateLimit from 'express-rate-limit';`
   b. Define a rate limiter configuration before any routes:
      ```js
      const apiLimiter = rateLimit({
        windowMs: 60_000,        // 1 minute window
        max: 100,                // limit each IP to 100 requests per window
        standardHeaders: true,   // return rate limit info in RateLimit-* headers
        legacyHeaders: false,    // disable the X-RateLimit-* headers
        handler: (req, res) => {
          res.status(429).json({
            error: 'Too many requests, please try again later.'
          });
        }
      });
      ```
   c. Apply the limiter to all API endpoints:
      ```js
      app.use('/pi', apiLimiter);
      app.use('/pi/data', apiLimiter);
      app.use('/pi/chart', apiLimiter);
      app.use('/dashboard', apiLimiter);
      ```

3. Configuration via Environment
   • Allow `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX` environment variables to override defaults.
   • In the rateLimit options, replace `windowMs` with `Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000` and `max` with `Number(process.env.RATE_LIMIT_MAX) || 100`.

# Testing

1. Unit Tests in `tests/unit/server.test.js`:
   - Mock express requests to simulate excessive calls by the same IP.  
   - Verify that the 101st request within the window returns HTTP 429.  
   - Confirm the JSON error message matches.

2. Integration Tests with Supertest:
   - Use `supertest` to send more than `max` requests to `/pi`.  
   - Assert that after the limit is reached, further calls receive status 429.
   - Test custom limits by setting environment variables in the test process.

# Documentation

1. docs/USAGE.md:
   • Add a **Rate Limiting** section describing the new endpoints protection, default limits, and how to configure via `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX`.

2. README.md:
   • Under **Features**, add **Rate Limiting**: brief description and example:
     ```bash
     RATE_LIMIT_MAX=50 RATE_LIMIT_WINDOW_MS=60000 node src/lib/main.js --serve 3000
     ```
   • Explain that clients exceeding the limit receive HTTP 429 with an error JSON.
