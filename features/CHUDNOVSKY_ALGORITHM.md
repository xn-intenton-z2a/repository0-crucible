# CHUDNOVSKY ALGORITHM

## Purpose
Implement a true high-performance Chudnovsky series for π approximation, replacing the current placeholder and delivering rapid convergence for large digit requests.

## CLI Integration
Extend the existing `--algorithm` option to support `chudnovsky` with the same semantics as other algorithms:
- `--algorithm chudnovsky` selects the Chudnovsky implementation.
- Default algorithm remains `leibniz` when not specified.

## Implementation Details
1. Add `decimal.js` to dependencies in `package.json` to enable arbitrary-precision decimal arithmetic.
2. In `src/lib/main.js`, import Decimal:
   import Decimal from 'decimal.js';
3. Implement a new function `calculatePiChudnovsky(digits)`:
   1. Set Decimal precision to `digits + 10` guard digits.
   2. Initialize constants:
      - `C = new Decimal(426880).times(Decimal.sqrt(new Decimal(10005)))`
      - iterate `k` from 0 upwards, computing each term:
         term = ( (factorial(6k) / (factorial(3k) * factorial(k)^3))
                  * (545140134 * k + 13591409) )
                 / Decimal(640320).pow(3*k + 0.5)
      - accumulate `sum` as alternating series sum.
      - break when `term.abs().lt(Decimal(10).pow(-digits))`.
   3. Compute pi = C.div(sum) and format with `toFixed(digits - 1)`.
4. In the `calculatePi` dispatcher, add a `case 'chudnovsky'` branch that calls `calculatePiChudnovsky(digits)`.

## Tests
Add unit and integration tests in `tests/unit/main.test.js`:
1. Unit tests for `calculatePi`:
   - expect `calculatePi(1, 'chudnovsky')` toBe `'3'`.
   - expect `calculatePi(5, 'chudnovsky')` toBe `'3.1415'`.
2. CLI integration test:
   - invoke `main(["--digits","10","--algorithm","chudnovsky"])` and spy on `console.log` to match a string of 10 significant digits (`/^\d\.\d{9}$/`).
3. Test error handling when `digits` is invalid or an unsupported algorithm is requested.

## Documentation Updates
1. Update `docs/USAGE.md` under the `--algorithm, -a` option to include `chudnovsky` with a usage example.
2. Update `README.md` Features section to mention high-performance Chudnovsky algorithm.

## Dependencies
- Add `decimal.js` to the `dependencies` section of `package.json`.