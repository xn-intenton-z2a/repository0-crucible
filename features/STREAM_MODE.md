# Overview
Add continuous streaming capability for face expressions across CLI, HTTP, and programmatic APIs to support ongoing emotive feedback.

# CLI Behavior
• Introduce --stream, -w (boolean) to enable continuous output mode.
• Introduce --interval, -I (integer milliseconds, default: 1000) to set time between outputs.
• When stream mode is active: at each interval generate faces according to count, category, seed, and unique flags and print in text or JSON depending on json flag. Loop indefinitely until process termination.

# HTTP API
• Add GET /stream endpoint serving server-sent events (SSE) with Content-Type text/event-stream.
• Accept query parameters: count, category, seed, unique, interval.
• On connection, send an event named face every interval with data as JSON payload containing faces, category, count, seed, and timestamp.
• Clean up interval timer on client disconnect.

# Programmatic API
• Export async generator generateFacesStream(options) that yields an object { faces, category, count, seed, timestamp } every interval based on options: count, category, seed, config, unique, interval.
• Allows consumers to iterate over face events until manually stopped.

# Implementation Details
1. Extend OptionsSchema to include interval: z.coerce.number().int().min(1).default(1000).
2. Update parseOptions to capture --stream/-w and --interval/-I and include stream flag in returned options.
3. In main(), detect stream flag and set up setInterval to call generateFacesCore and output accordingly.
4. In createApp(), implement /stream handler that sets headers for SSE, parses options via OptionsSchema.pick including interval, sets up interval to write event: data: JSON.stringify(result) and send event: face. Remove timer on close.
5. Implement generateFacesStream as async function* that loops with setTimeout or for-await sleep to yield results of generateFacesCore with options including interval.

# Testing
• Unit tests for parseOptions recognizing stream and interval flags and default values.
• Tests for generateFacesStream: verify that it yields correct events and respects interval option by mocking timer.
• HTTP tests for /stream: verify response headers, first event chunk format, and clean disconnect.
• CLI integration tests: run main with --stream and --interval in a subprocess, capture initial outputs, then terminate.

# Documentation
• Update README.md and docs/USAGE.md to describe new flags --stream/-w and --interval/-I in CLI section.
• Document HTTP SSE usage under Streaming section with example curl command.
• Update API reference to document generateFacesStream usage and options.
