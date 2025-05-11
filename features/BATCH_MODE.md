# Batch Calculation

_See the project mission in [MISSION.md](../MISSION.md) to understand the scope and context of this feature._

Provide the ability to perform multiple π calculation tasks in a single invocation by reading a JSON file containing an array of task definitions. This feature enables batch processing of different algorithms, parameters, and diagnostics settings in one go, returning consolidated JSON output.

# CLI Options

--batch <filepath>  Path to a JSON file defining an array of task objects. Each task object may include:
  - algorithm: one of "leibniz", "montecarlo", or "chudnovsky"
  - digits: number of decimal places (for leibniz and chudnovsky)
  - samples: number of samples (for montecarlo)
  - diagnostics: boolean (optional)
  - any other supported options such as error tolerance, max-iterations, batch-size

When --batch is provided, the tool bypasses the single-run, benchmark, and server modes to process tasks sequentially. Each task produces a result object or diagnostics object. The CLI outputs a JSON array of all results.

# Implementation

1. Extend minimist configuration in src/lib/main.js to recognize --batch as a string option.
2. In main(), detect options.batch. If set:
   a. Read the file at options.batch using fs.readFileSync.
   b. Parse the content into an array of task definitions.
   c. For each task in the array:
      - Create a scoped options object by merging default CLI options, global flags, and the task fields.
      - Invoke the internal calculation logic (leibniz, montecarlo, chudnovsky, or error tolerance) based on task parameters.
      - Capture returned result or diagnostics output into a result object.
   d. After processing all tasks, console.log(JSON.stringify(resultsArray, null, 2)).
   e. Return without further side effects.

# Testing

1. In tests/unit/main.test.js, add tests for batch mode:
   - Mock fs.readFileSync to return a JSON string representing a minimal tasks array, e.g., [{"algorithm":"leibniz","digits":2}].
   - Spy on console.log and call main(["--batch","tasks.json"]).
   - Assert console.log is called once with a stringifiable JSON array.
   - Parse output and verify each entry contains expected fields: algorithm, result (number), and any diagnostics when requested.

# Documentation

1. Update docs/USAGE.md to include the --batch option:
   - Show an example tasks.json file.
   - Demonstrate running node src/lib/main.js --batch tasks.json.
   - Show sample output JSON array.
2. Update README.md under Features to describe batch mode and provide usage examples.
