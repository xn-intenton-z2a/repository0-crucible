# Overview

Implement the core ASCII face generation functionality. Replace the stub in generateFacesCore so that it produces a list of face objects based on the provided options. Support reproducible outputs via a seeded random generator, category filtering, and optional uniqueness constraints.

# Implementation

In src/lib/main.js
  Define pools of ASCII face strings for categories happy sad angry and all
  Add a seeded pseudo random function that takes an integer seed and returns a uniform generator
  In generateFacesCore:
    Validate that count is a positive integer
    Validate that category is one of the allowed values
    If unique is true ensure count does not exceed the pool size for the selected category
    Generate faces by drawing random elements from the selected pool and tracking duplicates when unique is true
    Build and return an array of objects each with id and face fields

# Tests

In tests/unit/main.test.js
  Test that generateFacesCore returns an array of the requested length
  Test reproducibility by comparing outputs from two calls with the same seed and options
  Test that specifying a valid category filters to that pool
  Test that unique true yields no duplicate faces and that requesting more unique faces than available triggers an error

# Documentation

In docs/USAGE.md and README.md
  Document the behavior of generateFacesCore and its parameters
  Provide examples of calling the function in code and via CLI or HTTP mode
  Show sample output listing id and face fields