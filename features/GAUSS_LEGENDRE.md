# Gauss-Legendre Algorithm

Provide a high-precision π calculation using the Gauss-Legendre iterative method, which converges quadratically and can compute thousands of digits efficiently.

# CLI Integration

--algorithm gauss-legendre    Use the Gauss-Legendre method for π calculation
--digits <number>            Number of decimal places to compute (as with other algorithms)

In both CLI and HTTP API modes, when algorithm is set to "gauss-legendre", invoke the new method.

# Implementation

1. Add dependency:
   • decimal.js: install npm install decimal.js@^10.4.3
2. In src/lib/main.js:
   a. Import Decimal from decimal.js
   b. Implement function calculatePiGaussLegendre(digits):
      - Configure Decimal precision to digits plus guard digits
      - Initialize:
        a0 = Decimal(1)
        b0 = Decimal(1).dividedBy(Decimal(2).sqrt())
        t0 = Decimal(1).dividedBy(4)
        p0 = Decimal(1)
      - Repeat until |a_n - b_n| < 10^(−(digits+1)):
        • a_{n+1} = (a_n + b_n).dividedBy(2)
        • b_{n+1} = (a_n.times(b_n)).sqrt()
        • t_{n+1} = t_n.minus(p_n.times(a_n.minus(a_{n+1}).pow(2)))
        • p_{n+1} = p_n.times(2)
      - Compute π = (a_{n+1}.plus(b_{n+1})).pow(2).dividedBy(t_{n+1].times(4))
      - Return π rounded to the specified digits as a JavaScript number or string
   c. Extend main(): when options.algorithm is "gauss-legendre" use calculatePiGaussLegendre
   d. Extend createApp(): support gauss-legendre in HTTP handlers for /pi, /pi/data, /pi/chart

# Testing

1. In tests/unit/main.test.js:
   • Add unit tests for calculatePiGaussLegendre with small digits: expect approximate values match known constants at 2 or 3 decimals
   • Mock Decimal precision and algorithm internals for predictable results
2. CLI tests:
   • main(["--algorithm","gauss-legendre","--digits","3"]); spy on console.log; expect output 3.142
3. HTTP API tests:
   • request(app).get("/pi?algorithm=gauss-legendre&digits=2"); expect 200 JSON { result: 3.14 }
   • request(...)/pi/data and /pi/chart include correct behavior as with other algorithms

# Documentation

1. Update docs/USAGE.md:
   • Document new algorithm option gauss-legendre
   • Provide CLI example
2. Update README.md under Features:
   • Describe Gauss-Legendre method, usage, and performance characteristics