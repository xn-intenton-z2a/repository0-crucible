# Overview

Introduce a unique face selection mode that ensures no duplicate faces are returned when the requested count is less than or equal to the available pool. This adds a boolean option unique to all interfaces and enhances reproducibility when used with a seed.

# CLI Behavior

Add a new flag  --unique  alias  -u  which when enabled:
  • ensures each face in the output is unique
  • if requested count exceeds the pool size, the CLI throws an error
  • existing flags --count, --category, --seed, --json, --serve, --port and --config remain supported

# Programmatic API

Extend generateFaces and getFaces to accept unique as a boolean option. When unique is true:
  • the function shuffles the candidate pool via the seeded or default RNG
  • returns the first count elements as the result
  • throws an error if count exceeds the pool size
  • preserves category, count, seed, and config behavior

# HTTP API

Support query parameter unique=true for GET /faces. When unique is true:
  • the server applies the same unique selection logic as the core
  • responds with 400 if count exceeds pool size
  • format=text and format=json behaviors apply to unique output

# Implementation Details

1. Extend OptionsSchema to include unique as a boolean default false
2. Update parseOptions to parse --unique and -u into the unique option
3. In generateFacesCore:
   • if unique is true, clone the pool array
   • shuffle the cloned pool with seeded rng when seed is provided, or Math.random otherwise
   • select the first count elements
   • if count > pool length, throw a descriptive error
   • else use fallback item-by-item random selection when unique is false

# Testing

• Add unit tests for getFaces and generateFaces with unique true and false
• Verify reproducibility of unique selection with seed
• Test error when unique is true and count exceeds available faces in a category or all
• Extend CLI tests to include --unique and -u flags and error scenarios
• Extend HTTP endpoint tests to cover unique query parameter in both text and JSON formats

# Documentation

Update README.md and docs/USAGE.md to describe the unique flag, include examples for CLI, HTTP, and programmatic usage, and outline error behavior when count exceeds pool size