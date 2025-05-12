# Result Export

Provide the ability to export calculation outputs to a file specified by the user, enabling persistent storage of results for further analysis. This feature aligns with the mission in MISSION.md to generate results as text-based formats and visualizations.

# CLI Options

--output <filepath>  Path to write the calculation result. When provided, the tool writes the output of the current mode (single-run, diagnostics, batch, benchmark, error tolerance) to the file instead of printing to standard output.

# Implementation

1. Extend minimist configuration in src/lib/main.js to recognize output as a string option.
2. After computing the result or preparing the JSON payload:
   a. Convert numeric outputs to string.
   b. Serialize JSON objects or arrays with JSON.stringify(payload, null, 2).
3. Before final console.log or return:
   a. If options.output is set, call fs.writeFileSync(options.output, payloadString).
   b. Bypass any console.log of the payload when --output is provided.
4. Ensure process exits or returns gracefully after file write.

# Testing

1. In tests/unit/main.test.js, mock fs.writeFileSync and spy on console.log:
   - Test single-run export: main(["--digits","3","--output","out.txt"])
     • Expect fs.writeFileSync("out.txt", "3.142").
     • Expect console.log not to be called.
   - Test diagnostics export: main(["--digits","3","--diagnostics","--output","diag.json"])
     • Expect fs.writeFileSync("diag.json", JSON payload string).
   - Test batch mode export: main(["--batch","tasks.json","--output","batch.json"]).
   - Test benchmark export: main(["--benchmark","--samples","100","--output","bench.json"]).

# Documentation

1. Update docs/USAGE.md to document the --output option with examples:
   node src/lib/main.js --digits 5 --output result.txt
   node src/lib/main.js --digits 5 --diagnostics --output diag.json
2. Update README.md under Features to describe result export and provide sample commands.