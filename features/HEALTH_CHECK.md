# Overview

Introduce a dedicated health check endpoint that returns basic service status information to support liveness and readiness probes in deployment environments.

# Implementation

1. Health Endpoint
   • In createApp(), register a new GET /health route.
   • Respond with HTTP 200 and a JSON body containing:
     - status: 'ok'
     - uptime: process.uptime() (in seconds)
     - timestamp: new Date().toISOString()

2. CLI Integration
   • Add a new boolean flag --health-only (default false) to the CLI schema and minimist configuration.
   • When --health-only is provided, bypass π calculations and output the same health JSON to console, then exit with code 0.

3. Minimal Overhead
   • Avoid additional dependencies; use built-in process and Date APIs.

# Testing

1. HTTP Tests (tests/unit/server.test.js)
   - GET /health returns status 200 and Content-Type application/json.
   - Response body contains status 'ok', uptime as a number, and timestamp as an ISO string.

2. CLI Tests (tests/unit/main.test.js)
   - Running main(['--health-only']) logs a JSON object with status, uptime, timestamp and exits without error.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, document **GET /health** with example:
     curl http://localhost:3000/health

2. README.md
   • Under **Features**, add **Health Check Endpoint** with description and example usage.