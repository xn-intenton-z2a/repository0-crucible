# Overview

Introduce an automatic algorithm selection mode that chooses the optimal π calculation method based on user-provided parameters such as digits or samples. Users can specify algorithm "auto" and rely on built-in heuristics rather than manually picking among leibniz, montecarlo, chudnovsky, ramanujan-sato, or gauss-legendre.

# Implementation

1. Accept new algorithm value
   • Extend CLIOptionsSchema and ApiParamsSchema enum to include "auto" alongside existing entries.
   • Normalize input to lowercase and default to "auto" only when explicitly requested.

2. Selection heuristics in single dispatch point
   • In both main() and `/pi` handler, detect when algorithm === "auto".
   • Apply thresholds:
     – If digits >= 50, choose "chudnovsky" for rapid convergence.
     – Else if digits >= 10, choose "gauss-legendre" for efficient medium-precision.
     – Else if samples flag provided and algorithm selection implied sampling, choose "montecarlo" when samples > 10000.
     – Otherwise default to "leibniz" for very low precision.
   • Log or include diagnostics original algorithm and selected algorithm.

3. Minimal code changes
   • Single source file `src/lib/main.js`: add branching for "auto" in dispatcher before existing conditionals.
   • Update Zod schemas definitions.

# Testing

1. Unit tests in `tests/unit/main.test.js`:
   • Test calculatePi flow when main(["--algorithm","auto","--digits","2"]) produces same output as algorithm leibniz.
   • Test main with auto and digits 15 yields result matching gauss-legendre for 15 digits.
   • Test main with auto, digits 60 yields result matching chudnovsky for 60 digits.

2. HTTP tests in `tests/unit/server.test.js`:
   • GET `/pi?algorithm=auto&digits=3` returns JSON `{ result: <approx> }` matching existing leibniz output.
   • GET `/pi?algorithm=auto&digits=20&diagnostics=true` returns diagnostics object with selected algorithm property set to gauss-legendre.

# Documentation

1. docs/USAGE.md:
   • Under **Algorithms**, add value `auto` with description: "Automatically select algorithm based on digits or samples." and examples.

2. README.md:
   • Under **Features**, list **Automatic Algorithm Selection** describing how to use `--algorithm auto` and heuristics.
   • Provide CLI and HTTP examples demonstrating automatic selection.