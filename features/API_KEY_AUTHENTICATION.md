# Overview
Add API key authentication middleware to secure HTTP endpoints. Users must provide a valid API key in the X-API-KEY header or via the api_key query parameter. Unauthorized requests receive a 401 response with a WWW-Authenticate header.

# Implementation
1. Configuration
   • Define an environment variable API_KEYS as a comma separated list of valid API keys.
   • Optionally support loading keys from a JSON config file.

2. Middleware
   • Create an Express middleware function that extracts the key from X-API-KEY header or api_key query parameter.
   • If the key is missing or not in the configured list, respond with status 401, set header WWW-Authenticate: API key realm="api", and JSON body { error: "Unauthorized" }.
   • On valid key, attach the key value to req.apiKey for downstream use and call next().

3. Integration
   • In createApp, apply this middleware to all protected routes: /pi, /pi/data, /pi/chart, /pi/stream, /dashboard, /metrics, /benchmark, /healthz, and /ready.
   • Allow bypass of authentication when NODE_ENV is "development" or when DISABLE_API_KEY_AUTH is set to "true".

4. Logging
   • Use the Pino logger to record unauthorized access attempts at warn level, including route and client IP.

# Testing
1. Add unit tests in tests/unit/server.test.js:
   • A valid API key yields status 200 for each protected endpoint.
   • Missing API key yields status 401, JSON error, and WWW-Authenticate header.
   • Invalid API key yields status 401 and the appropriate header.
   • Bypass environment variable disables authentication enforcement in development mode.

# Documentation
1. docs/USAGE.md:
   • Under **REST Endpoints**, document the API key requirement and provide examples:
     curl -H "X-API-KEY: yourkey" http://localhost:3000/pi
2. README.md:
   • Add **API Key Authentication** to the features list describing secure access and configuration via the API_KEYS environment variable.