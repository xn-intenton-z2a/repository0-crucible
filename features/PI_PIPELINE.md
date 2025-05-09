# Overview
Implement a unified π computation pipeline that leverages GPU acceleration (WebGL/WebGPU) and WebAssembly (with threads where available) across both browser and server environments. Provide interfaces for CLI, HTTP, and SSE, with flexible output formats and integrated performance benchmarking.

# CLI Interface
- Add commands to compute π to a specified number of digits or iterations.
- Allow selection of execution mode: gpu, wasm, or wasm-threaded.
- Support options for output format: json or png.
- Include benchmark subcommand to measure execution time and memory usage for each mode.

# HTTP and SSE Server
- Expose an HTTP endpoint `/compute` accepting query parameters: `precision`, `mode`, and `format`.
- Stream progress and partial results as Server-Sent Events to clients.
- Provide a status endpoint `/benchmark` that runs predefined performance tests and returns metrics as JSON.

# Output Formats
- JSON: return an object containing the computed digits, elapsed time, and resource metrics.
- PNG: generate an image visualizing the computed digits in a spiraling or histogram layout, served directly or saved via CLI.

# Performance Benchmarking
- Integrate a benchmarking suite to compare GPU acceleration vs WebAssembly in single-threaded and multi-threaded modes.
- Report metrics including throughput (digits/ms), CPU/GPU utilization, and memory consumption.
- Output benchmark results in JSON format and display summary charts in CLI.

# Implementation Details
- Develop core computation in a WebAssembly module compiled from C or Rust, with bindings for GPU and threading.
- Use Node.js ESM for CLI and HTTP server logic in src/lib/main.js.
- Add Vitest unit tests for core functionality and integration tests for CLI and HTTP endpoints.
- Update README with usage examples for CLI commands, HTTP requests, and expected outputs.