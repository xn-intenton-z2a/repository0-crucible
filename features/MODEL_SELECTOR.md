# Model Selector

This feature introduces an interactive mode and CLI flag to allow users to select from a range of ontology models. The tool aggregates all the available ontology builder functions (e.g., basic, advanced, minimal, complex, scientific, educational, philosophical, economic, and hybrid) into a unified interface. With a simple command-line argument (e.g. `--select-model`), users can specify the desired ontology model type. 

## Overview

- **Unified Model Selection:** Provides a CLI interface to list and choose the ontology model to build. Users can pass parameters such as model type (basic, advanced, etc.) to dynamically build the desired ontology model.
- **Interactive Experience:** If no model type is provided, the feature can list all available options and prompt the user or fall back to a default. 
- **Consistent Integration:** The implementation leverages the existing ontology builder functions within the repository and supplements them with a clear selection mechanism, ensuring that the unified interface remains consistent with the mission of enabling live, dynamic ontology creation.
- **Configuration and Fallbacks:** Supports environment variable and CLI flag overrides, allowing custom defaults or fallback to a specific model if the input is invalid.

## Implementation Details

- **Single Source File Integration:** The feature will be implemented as an extension within the existing CLI tool (`src/lib/main.js`) to stay cohesive with the repository’s design.
- **CLI Flag:** Introduce a new flag (e.g. `--select-model`) that accepts a model name. The flag will validate the user input against the list of available model types and invoke the corresponding builder function (such as `buildBasicOWLModel`, `buildAdvancedOWLModel`, `buildMinimalOWLModel`, etc.).
- **Interactive Prompt (Optional):** In the absence of a direct model name input, the system can list the valid options and allow the user to select one interactively or default to a preconfigured model.
- **Documentation and Testing:** Update the README and CONTRIBUTING documents to cover usage examples, including command-line examples and expected outputs. Add unit tests (using vitest) to verify that the correct model is built when a valid type is provided and proper error handling occurs when an invalid type is passed.

## Benefits

- **Enhanced Usability:** Simplifies the process for users to choose and build the exact ontology model needed for their specific scenario.
- **Consistency:** Aligns with the mission of building dynamic ontologies from live data by allowing easy switching between model variations.
- **Reduced Complexity:** Consolidates multiple model builder functions under a single interface without bloating the repository, ensuring maintainability.
