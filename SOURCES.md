# Chudnovsky Algorithm – Wikipedia
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
The Chudnovsky algorithm is a fast-converging infinite series for calculating π to millions of digits. It details the mathematical derivation, convergence rate, and implementation considerations that are essential for high-precision computation using arbitrary-precision arithmetic. Last revised June 2024 and maintained under a community peer-review model, this source is highly authoritative for core algorithm design.
## License: CC BY-SA 3.0

# Node.js BigInt Documentation
## https://nodejs.org/api/bigint.html
Official Node.js reference for the built-in BigInt type, explaining syntax, operations, and performance characteristics. This documentation provides essential information on how to manipulate large integers efficiently in JavaScript, including pitfalls and best practices for high-precision algorithms like the Chudnovsky formula.
## License: CC BY-4.0

# Canvas (node-canvas)
## https://github.com/Automattic/node-canvas
The primary library for server-side Canvas drawing in Node.js. Covers installation, API for creating and manipulating Canvas elements, pixel manipulation, and image exporting (PNG, JPEG). Crucial for implementing the `renderPiImage` function with performance tips and detailed examples.
## License: MIT

# D3-Scale-Chromatic
## https://github.com/d3/d3-scale-chromatic
Provides a rich set of perceptually uniform color schemes (grayscale, heatmap, rainbow, etc.) via D3’s scale API. Documentation includes usage examples, API reference, and guidance on selecting palettes for data visualization—directly applicable for mapping π digit values to color gradients.
## License: BSD-3-Clause

# Commander.js CLI Framework
## https://github.com/tj/commander.js
A widely adopted Node.js library for parsing command-line arguments. The docs cover option definitions, default values, validation hooks, help generation, and custom output formatting—critical for building a robust `--digits`, `--visualize`, and `--benchmark` CLI interface.
## License: MIT

# Vitest Testing Framework
## https://vitest.dev/
Modern, fast testing framework for Vite and Node.js. Documentation describes unit and E2E testing patterns, coverage reporting, mocking, and performance testing—ensuring reliable validation of `calculatePi`, `renderPiImage`, and CLI behaviors.
## License: MIT

# Node.js Performance Hooks API
## https://nodejs.org/api/perf_hooks.html
Describes Node’s built-in performance measurement APIs (PerformanceObserver, performance.now), which are essential for implementing the `--benchmark` feature and accurately reporting execution time and memory usage.
## License: CC BY-4.0

# PNG (Portable Network Graphics) Specification
## https://www.w3.org/TR/PNG/
The official W3C spec for the PNG file format, covering chunk structure, compression methods, color types, and metadata. Vital for understanding how the Canvas library encodes image data and for troubleshooting export issues.
## License: W3C Software Notice and License

# Python Decimal Library Documentation
## https://docs.python.org/3/library/decimal.html
While in Python, this covers arbitrary-precision decimal arithmetic implementation details, rounding modes, and performance considerations. It serves as a reference for comparison with JavaScript’s BigInt approach and insights on error handling and precision limits.
## License: PSF License

# Matplotlib Colormap Reference
## https://matplotlib.org/stable/tutorials/colors/colormaps.html
Documentation of Matplotlib’s colormaps, including perceptual uniformity ratings, palette selection guidance, and implementation snippets. Useful for understanding the theory behind effective color schemes, which can inform custom schemes in Node.js.
## License: PSF

# pi-visualizer (Python)
## https://pypi.org/project/pi-visualizer/
A standalone Python package demonstrating digit-to-pixel visualization of π using the Pillow imaging library. Provides implementation examples for mapping numeric values to color matrices and exporting high-resolution PNGs, offering practical patterns transferable to the Node.js ecosystem.
## License: MIT