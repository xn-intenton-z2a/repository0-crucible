# Public API Exports

## Overview
Expose all core library functions directly from the main module, enabling programmatic use of pi operations without CLI or HTTP server boundaries. This change turns the package into a fully featured API library for integration in custom scripts and applications.

## Functional Requirements
- In `src/lib/main.js`, after existing exports, add named exports for each utility function:
  - `calculatePi`
  - `calculatePiParallel`
  - `startHttpServer`
  - `countPiNgrams`
  - `visualizePiDigits`
  - `visualizePiDigitsText`
  - `visualizePiConvergence`
  - `visualizePiConvergenceText`
  - `exportPi`
  - `searchPi`
  - `extractPiHex`
  - `extractPiDecimal`
  - `benchmarkPi`
  - `compareAlgorithms`
  - `estimatePiMonteCarlo`
  - `computePiContinuedFraction`
  - `countPiDigitsJson`
  - `generateHtmlReport`
- Ensure each function is imported or defined in the module and then re-exported by name.

## Documentation Updates
- In `README.md`, under "Features", add a section titled "Programmatic API" listing each exported function with a one-line description.
- Provide example usage demonstrating named imports and basic calls:
  import { calculatePi, searchPi, exportPi } from '@xn-intenton-z2a/repository0-crucible';

## Testing
- Add unit tests in `tests/unit/main.test.js` that import each function:
  - Call `searchPi` on a known input and verify output structure.
  - Call `countPiNgrams` with stubbed `calculatePi` to confirm correct mapping.
  - Import `exportPi` and mock `fs/promises` to verify file writing behavior.
- Ensure tests cover both success and error scenarios for each exported function.