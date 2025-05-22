# xn-intenton-z2a/repository0-crucible
Explore novel algorithms for calculating π to varying digit lengths using different techniques, benchmark their performance, and generate results as PNG visualizations or text-based formats.
## Maintain Feature at 2025-05-21T23:55:39.036Z

Maintained feature PI_CALCULATION.

Feature spec:

# Overview

The CLI tool supports computing π to a specified number of decimal digits using the Leibniz series algorithm. Users specify precision via CLI flags and receive the result as a decimal string.

# CLI Interface

Accepts --digits or -d followed by a positive integer (default 10) to determine output precision. Validates input and reports errors for invalid or out-of-range values.

# Implementation

Add a function calculatePiLeibniz(digits) in src/lib/main.js that iteratively computes π to the given precision. Update main to parse CLI arguments, invoke calculatePiLeibniz, and output the result. Ensure compatibility with Node.js 20 and ESM.

# Testing

Write unit tests in tests/unit/main.test.js to verify calculatePiLeibniz produces correct values for digits=0, 1, and 5, and handles invalid inputs. Ensure tests pass with vitest.

# Documentation

Update README.md to document usage examples, API reference for calculatePiLeibniz, and instructions for running the feature via CLI flags.


Git diff:

```diff
\n\n// New [features/PI_CALCULATION.md]:\n# Overview

The CLI tool supports computing π to a specified number of decimal digits using the Leibniz series algorithm. Users specify precision via CLI flags and receive the result as a decimal string.

# CLI Interface

Accepts --digits or -d followed by a positive integer (default 10) to determine output precision. Validates input and reports errors for invalid or out-of-range values.

# Implementation

Add a function calculatePiLeibniz(digits) in src/lib/main.js that iteratively computes π to the given precision. Update main to parse CLI arguments, invoke calculatePiLeibniz, and output the result. Ensure compatibility with Node.js 20 and ESM.

# Testing

Write unit tests in tests/unit/main.test.js to verify calculatePiLeibniz produces correct values for digits=0, 1, and 5, and handles invalid inputs. Ensure tests pass with vitest.

# Documentation

Update README.md to document usage examples, API reference for calculatePiLeibniz, and instructions for running the feature via CLI flags.
```

LLM API Usage:

```json
{"prompt_tokens":4230,"completion_tokens":2383,"total_tokens":6613,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":2112,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Feature to Issue at 2025-05-21T23:57:13.633Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-crucible/issues/2714 with title:



And description:



LLM API Usage:

```json

```
---

## Issue to enhanced Issue at 2025-05-21T23:58:01.909Z

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-crucible/issues/ with enhanced description:

Please resolve the issue.

LLM API Usage:

```json
{"prompt_tokens":4378,"completion_tokens":326,"total_tokens":4704,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":256,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to Code at 2025-05-22T00:48:34.926Z

fixApplied: true

Implement calculation via Leibniz series extend CLI add tests and documentation

Git Diff:

```
diff --git a/package-lock.json b/package-lock.json
index 10e85a2b..b7fcb0e4 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -9,20 +9,19 @@
       "version": "1.2.0-0",
       "license": "Apache-2.0",
       "dependencies": {
-        "decimal.js": "^10.4.3",
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
         "minimatch": "^9.0.5",
         "openai": "^4.96.2",
-        "zod": "^3.24.4"
+        "zod": "^3.24.3"
       },
       "devDependencies": {
         "@microsoft/eslint-formatter-sarif": "^3.1.0",
-        "@vitest/coverage-v8": "^3.1.4",
+        "@vitest/coverage-v8": "^3.1.2",
         "eslint": "^9.24.0",
         "eslint-config-google": "^0.14.0",
-        "eslint-config-prettier": "^10.1.5",
+        "eslint-config-prettier": "^10.1.2",
         "eslint-plugin-import": "^2.31.0",
         "eslint-plugin-prettier": "^5.2.6",
         "eslint-plugin-promise": "^7.2.1",
@@ -33,7 +32,7 @@
         "markdown-it-github": "^0.5.0",
         "npm-check-updates": "^17.1.18",
         "prettier": "^3.5.3",
-        "vitest": "^3.1.4"
+        "vitest": "^3.1.2"
       },
       "engines": {
         "node": ">=20.0.0"
@@ -2245,12 +2244,6 @@
         }
       }
     },
-    "node_modules/decimal.js": {
-      "version": "10.5.0",
-      "resolved": "https://registry.npmjs.org/decimal.js/-/decimal.js-10.5.0.tgz",
-      "integrity": "sha512-8vDa8Qxvr/+d94hSh5P3IJwI5t8/c0KsMp+g8bNw9cY2icONa5aPfvKeieW1WlG0WQYwwhJ7mjui2xtiePQSXw==",
-      "license": "MIT"
-    },
     "node_modules/deep-eql": {
       "version": "5.0.2",
       "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
diff --git a/src/lib/main.js b/src/lib/main.js
index 3cdd4e2a..fb48f2a5 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -3,8 +3,59 @@
 
 import { fileURLToPath } from "url";
 
-export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+/**
+ * Calculate π using the Leibniz series to the specified number of decimal digits.
+ * @param {number} digits - Number of decimal digits (>=0).
+ * @returns {string} π approximation as a decimal string.
+ */
+export function calculatePiLeibniz(digits) {
+  if (typeof digits !== "number" || !Number.isInteger(digits)) {
+    throw new TypeError("digits must be an integer.");
+  }
+  if (digits < 0) {
+    throw new RangeError("digits must be non-negative.");
+  }
+  // Determine number of iterations: more iterations for higher precision.
+  const iterations = Math.pow(10, digits + 1);
+  let sum = 0;
+  for (let k = 0; k < iterations; k++) {
+    sum += ((k % 2 === 0) ? 1 : -1) / (2 * k + 1);
+  }
+  const pi = 4 * sum;
+  return pi.toFixed(digits);
+}
+
+/**
+ * Parse CLI arguments and execute π calculation.
+ * @param {string[]} [args] - CLI arguments array.
+ * @returns {string|undefined} π string or undefined if help invoked.
+ */
+export function main(args = []) {
+  let digits = 10;
+  for (let i = 0; i < args.length; i++) {
+    const arg = args[i];
+    if (arg === "--digits" || arg === "-d") {
+      const val = args[i + 1];
+      if (!val) {
+        console.error("Error: Missing value for --digits option.");
+        process.exit(1);
+      }
+      const parsed = Number(val);
+      if (!Number.isInteger(parsed) || parsed < 0) {
+        console.error("Error: digits must be a non-negative integer.");
+        process.exit(1);
+      }
+      digits = parsed;
+      i++;
+    } else if (arg === "--help" || arg === "-h") {
+      console.log("Usage: node main.js [--digits N] [-d N]");
+      console.log("Calculate π to N decimal digits (default 10).");
+      return;
+    }
+  }
+  const result = calculatePiLeibniz(digits);
+  console.log(result);
+  return result;
 }
 
 if (process.argv[1] === fileURLToPath(import.meta.url)) {
diff --git a/tests/unit/main.test.js b/tests/unit/main.test.js
index 6ea3d264..2666cd4e 100644
--- a/tests/unit/main.test.js
+++ b/tests/unit/main.test.js
@@ -1,16 +1,47 @@
 import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
-import { main } from "@src/lib/main.js";
+import { calculatePiLeibniz, main } from "@src/lib/main.js";
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
-    expect(mainModule).not.toBeNull();
+describe("calculatePiLeibniz", () => {
+  test("digits=0 returns '3'", () => {
+    expect(calculatePiLeibniz(0)).toBe("3");
+  });
+
+  test("digits=1 returns '3.1'", () => {
+    expect(calculatePiLeibniz(1)).toBe("3.1");
+  });
+
+  test("digits=5 returns '3.14159'", () => {
+    expect(calculatePiLeibniz(5)).toBe("3.14159");
+  });
+
+  test("non-integer digits throws TypeError", () => {
+    expect(() => calculatePiLeibniz(1.5)).toThrow(TypeError);
+  });
+
+  test("negative digits throws RangeError", () => {
+    expect(() => calculatePiLeibniz(-1)).toThrow(RangeError);
   });
 });
 
-describe("Main Output", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
-    main();
+describe("main", () => {
+  test("default digits outputs 10 digits", () => {
+    const logs = [];
+    const origLog = console.log;
+    console.log = (msg) => logs.push(msg);
+    const result = main([]);
+    console.log = origLog;
+    // Expect result string length: '3.' + 10 digits = 12
+    expect(result).toHaveLength(12);
+    expect(logs[0]).toMatch(/^3\.\d{10}$/);
+  });
+
+  test("help outputs usage and returns undefined", () => {
+    const logs = [];
+    const origLog = console.log;
+    console.log = (msg) => logs.push(msg);
+    const result = main(["--help"]);
+    console.log = origLog;
+    expect(logs).toContain("Usage: node main.js [--digits N] [-d N]");
+    expect(result).toBeUndefined();
   });
 });\n\n// New [docs/PI_CALCULATION.md]:\n# PI Calculation

This CLI tool supports computing π to a specified number of decimal digits using the Leibniz series. Users can specify the precision via CLI flags or call the `calculatePiLeibniz` API directly.

## CLI Usage

```bash
node src/lib/main.js --digits N
node src/lib/main.js -d N
```

Example:

```bash
$ node src/lib/main.js -d 5
3.14159
```

To view help:

```bash
$ node src/lib/main.js --help
Usage: node main.js [--digits N] [-d N]
Calculate π to N decimal digits (default 10).
```

## API Reference

### calculatePiLeibniz(digits)

- `digits` <number>: number of decimal digits to compute (integer ≥ 0).
- Returns: `<string>` π approximation.

### main(args)

- `args` <string[]>: CLI arguments.
- Returns: π string if run without help, or `undefined` if help invoked.
```
mainOutput:
```

> @xn-intenton-z2a/repository0-crucible@1.2.0-0 start
> node src/lib/main.js

```
[for issue https://github.com/xn-intenton-z2a/repository0-crucible/issues/2714 with title: ""]

LLM API Usage:

```json
{"prompt_tokens":7564,"completion_tokens":4839,"total_tokens":12403,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":3200,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

