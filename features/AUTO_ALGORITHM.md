# Overview

Introduce automatic algorithm selection so that the CLI chooses the fastest π calculation algorithm based on the requested digit count. Users no longer need to manually pick machin, ramanujan, or chudnovsky; instead, the tool selects an optimal algorithm threshold, improving performance out of the box.

# CLI Interface

Extend the existing --algorithm flag to accept a new value:

--algorithm <auto|machin|ramanujan|chudnovsky>   Choose π computation algorithm. If set to auto (default), the tool selects the algorithm based on digit count thresholds.

# Implementation Details

• In src/lib/main.js, update the flag parser to allow algorithm="auto". If algorithm is auto, skip error on invalid algorithm.
• Define default thresholds in code (e.g., digits ≤ 50 use machin; 51–500 use ramanujan; >500 use chudnovsky). Make thresholds configurable via environment variables or optional config file keys autoThresholdMachin, autoThresholdRamanujan.
• In calculatePi, detect algorithm=="auto" and dispatch:
  – If digits ≤ autoThresholdMachin, call calculatePiMachin
  – Else if digits ≤ autoThresholdRamanujan, call calculatePiRamanujan
  – Else call calculatePiChudnovsky with workers option
• Respect existing workers flag: only used for chudnovsky branch when auto picks chudnovsky.
• Update help output to describe auto behavior and threshold defaults.

# Testing

Add unit tests in tests/unit/main.test.js:
• Test main with --digits 10 --algorithm auto logs the same output as --algorithm machin
• Test main with --digits 100 --algorithm auto uses calculatePiRamanujan; spy on calculatePiRamanujan to verify it is called
• Test main with --digits 800 --algorithm auto and --workers 2 calls calculatePiChudnovsky with workers=2
• Test invalid thresholds (e.g., set env AUTO_THRESHOLD_MACHIN to non-integer) fall back to code defaults without error

# Documentation

Update README.md under Features and CLI Usage:
  – Document the new auto option for --algorithm and show examples:
      node src/lib/main.js --digits 100 --algorithm auto
      node src/lib/main.js --digits 600 --algorithm auto --workers 4
  – Explain default thresholds and how to override them via environment variables or config file.
