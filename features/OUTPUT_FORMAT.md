# Multi-format Result Export

Allow users to specify the output format for calculation results, supporting plain text, JSON, CSV, or XML. This enhances data interoperability and aligns with the mission to generate results in versatile text-based formats.

# CLI Options

--format <format>      Output format for results. Supported values:
  • text: plain numeric output (default)
  • json: JSON object or array output
  • csv: comma-separated values with header row
  • xml: simple XML representation

When combined with --output <filepath>, the tool writes the formatted output to the specified file instead of printing to standard output.

# Implementation

1. Extend minimist configuration and CLIOptionsSchema in src/lib/main.js to recognize format as a string option with default "text".
2. After computing the result or diagnostics object in main(), branch on opts.format:
   a. text: use existing behavior to output raw numbers or diagnostics object.
   b. json: serialize output using JSON.stringify(output, null, 2).
   c. csv: implement a helper that takes an object or array of objects, emits a header row of keys then each row of values joined by commas. For single-number results, emit a header "result" and the value.
   d. xml: implement a helper that wraps result fields in XML tags. For object output, wrap each key-value pair in a tag; for arrays, wrap entries in a parent tag.
3. Add helper functions formatToCSV(data) and formatToXML(data) in src/lib/main.js.
4. In main(), after formatting, route output either to console.log or fs.writeFileSync if options.output is set.

# Testing

1. In tests/unit/main.test.js, add new tests:
   • text format: invoke main(["--digits","3","--format","text"]) and expect console.log to be called with 3.142.
   • json format: invoke main(["--digits","3","--format","json"]) and expect console.log to receive a JSON string like "{\n  \"result\":3.142\n}".
   • csv format: invoke main(["--digits","3","--format","csv"]) and expect console.log to be called with "result\n3.142".
   • xml format: invoke main(["--digits","3","--format","xml"]) and expect console.log to be called with "<result>3.142</result>".
2. Test file output scenarios:
   • main(["--digits","2","--format","csv","--output","out.csv"]) should call fs.writeFileSync("out.csv", "result\n3.14").

# Documentation

1. Update docs/USAGE.md to document the --format option with examples for each supported format.
2. Update README.md under Features to describe Multi-format Result Export and provide sample CLI commands for text, JSON, CSV, and XML exports.