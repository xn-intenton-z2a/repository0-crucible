# Overview

Add an automatic selection mode that chooses the most appropriate π calculation algorithm based on user parameters. Users can specify algorithm=auto to delegate algorithm choice to the system using heuristics, improving ease of use for varied precision and performance requirements.

# Implementation

1. Extend Schemas and Flags
   • In CLIOptionsSchema and ApiParamsSchema, include "auto" in the allowed algorithm enum.  
   • Accept algorithm=auto in minimist flags, Zod preprocessing, and default to "auto" when specified.

2. Dispatcher Logic
   • Extract shared dispatch logic into a helper function dispatchAlgo(params) that returns an object with fields: requested, resolved, result, and any meta (iterations, samplesUsed).  
   • When algorithm === "auto", apply heuristics:
     – If digits >= 50: choose "chudnovsky"  
     – Else if digits >= 10: choose "gauss-legendre"  
     – Else if samples provided and samples > 10000: choose "montecarlo"  
     – Else: choose "leibniz"
   • Pass the resolved algorithm into existing calculation functions and capture metadata.

3. Diagnostics Output
   • When diagnostics=true, include both algorithm: "auto" and resolved algorithm in output.  
   • Expose resolvedAlgorithm field alongside other diagnostic fields in CLI.log and HTTP JSON response.

4. Code Changes
   • Update src/lib/main.js: modify enum definitions, introduce dispatchAlgo, adjust /pi handler and main() branches to call dispatchAlgo.  
   • Ensure type definitions and imports align with dispatch helper.

5. Backward Compatibility
   • Retain existing behavior when algorithm is explicitly set to a known method.  
   • Fail-fast on invalid string values via Zod.

# Testing

1. Unit Tests (tests/unit/main.test.js)
   • Test dispatchAlgo with auto and various input thresholds to confirm resolution of chudnovsky, gauss-legendre, montecarlo, leibniz.  
   • Validate diagnostics output includes both requested and resolved values.

2. HTTP Tests (tests/unit/server.test.js)
   • GET /pi?algorithm=auto&digits=2 returns result matching leibniz stub.  
   • GET /pi?algorithm=auto&digits=20 returns chudnovsky-like output.  
   • With diagnostics, response body contains resolvedAlgorithm field.

# Documentation

1. docs/USAGE.md
   • Under **Algorithms**, add entry for `auto`: automatic algorithm selection with heuristics.  
   • Provide example: curl "http://localhost:3000/pi?algorithm=auto&digits=3"

2. README.md
   • Under **Features**, add **Automatic Algorithm Selection** describing `auto` mode, heuristics, and usage.  
   • Include CLI and HTTP examples for auto mode.