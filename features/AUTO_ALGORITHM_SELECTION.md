# Auto Algorithm Selection

Enable the tool to automatically choose the optimal π calculation algorithm based on user-specified parameters, abstracting algorithm selection and improving performance without manual tuning.

# CLI Options

--auto   Enable automatic algorithm selection. When set, ignore --algorithm and let the tool pick the best method based on digits or samples.

# HTTP API Changes

Accept algorithm value "auto" in query parameters for /pi, /pi/data, and /pi/chart endpoints. When algorithm is auto, server selects the appropriate algorithm before computing.

# Implementation

1. In CLIOptionsSchema and ApiParamsSchema, extend allowed algorithm enum to include "auto".
2. Implement a selection helper selectAlgorithm(opts) that:
   a. If opts.auto or opts.algorithm is auto, and opts.digits is defined:
      • For digits <=10 choose leibniz.
      • For digits <=1000 choose chudnovsky.
      • Otherwise choose gauss-legendre.
   b. If opts.auto or opts.algorithm is auto, and opts.samples is defined:
      • For samples <10000 choose montecarlo.
      • Otherwise choose montecarlo with parallel workers fallback.
3. In main() and createApp handlers before mode detection, call selectAlgorithm and override opts.algorithm.
4. Preserve all existing logic for selection and subsequent calculation.

# Testing

- CLI tests: with --auto and --digits values verify spy on calculate functions to ensure correct algorithm chosen.
- HTTP tests: simulate GET /pi?algorithm=auto&digits=5 and expect output matching leibniz result.
- Edge cases: provide both digits and samples; auto uses digits priority.

# Documentation

- Update docs/USAGE.md under Algorithms section to document --auto option and auto selection rules.
- Update README.md Features list to describe Auto Algorithm Selection capability.