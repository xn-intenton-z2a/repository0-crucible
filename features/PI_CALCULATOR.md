# Overview
The PI_CALCULATOR feature adds core support for computing π to a user-specified number of decimal places using high-precision arithmetic. It integrates an arbitrary-precision library and exposes a simple CLI interface for choosing calculation algorithms and output formats.

# CLI Interface
This feature extends the main executable to accept the following command line flags:

--digits: Number of decimal places for π calculation
--algorithm: Choice of algorithm (leibniz, spigot, or gauss-legendre)
--format: Output format (text or png)

If no flags are provided, it defaults to 10 digits, leibniz algorithm, and text output.

# Implementation Details
The feature imports a lightweight arbitrary-precision library (decimal.js) and implements each algorithm in src/lib/main.js. The PNG output uses a minimal canvas or SVG approach to visualize the series convergence.

Flag parsing follows existing argument handling patterns. Calculation functions are modular and documented in code. The package.json file is updated with the decimal.js dependency.

# Testing
Unit tests cover:

Validation of flag parsing behavior
Accuracy of π estimates within acceptable error bounds for each algorithm
Proper text output formatting
Generation of a valid PNG buffer when format is png