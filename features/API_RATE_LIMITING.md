# Overview

Introduce express-rate-limit middleware to protect the HTTP API and CLI‐serve endpoints from abuse and accidental denial of service. Users can configure rate limits via environment variables or command-line options, ensuring fair usage and improved service stability under load.

# Implementation

1. Dependencies
   • Add express-rate-limit (version ^6.7.0) to package.json dependencies.

2. Rate Limiter Configuration
   • New environment variables: RATE_LIMIT_WINDOW_MS (default 60000), RATE_LIMIT_MAX (default 100).  
   • In createApp(), import rateLimit from express-rate-limit.  
   • Create a limiter middleware:  
     limiter = rateLimit({
       windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
       max: Number(process.env.RATE_LIMIT_MAX) || 100,
       standardHeaders: true,
       legacyHeaders: false
     });
   • Apply limiter globally or per route: use app.use(limiter) before all /pi, /pi/data, /pi/chart, /dashboard endpoints.

3. Configuration Overrides
   • Support CLI option `--rate-limit-window <ms>` and `--rate-limit-max <count>` in main().  
   • Merge CLI values with environment variables: CLI options take precedence.

4. Error Handling and Responses
   • Default 429 responses include JSON body: { error: "Too many requests, please try again later." }.  
   • Ensure RateLimit headers (RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset) are exposed.

# Testing

1. HTTP API Tests (tests/unit/server.test.js)
   • Configure in-memory store and override max to 2 for test.  
   • Issue three rapid GET /pi requests and assert the third returns status 429 and JSON error message.
   • Verify RateLimit headers are present on 2xx and 429 responses.

2. CLI Serve Mode Tests (tests/unit/main.test.js)
   • Simulate main(["--serve","3000","--rate-limit-max","1","--rate-limit-window","1000"]) and send two HTTP requests to the running server, asserting the second is 429.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, document rate limiting behavior and environment variables RATE_LIMIT_WINDOW_MS and RATE_LIMIT_MAX.

2. README.md
   • Under **Features**, add **API Rate Limiting** with description and examples to customize via env or CLI.
