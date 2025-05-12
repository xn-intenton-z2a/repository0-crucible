# Template Report Generation

Provide customizable report output by rendering calculation results through an EJS template, enabling users to generate HTML, Markdown, or other textual reports tailored to their needs.

# CLI Options

--template <filepath>           Path to an EJS template file that defines the report layout. The template context will include the calculation result or diagnostics object under the key `result` and all CLI options under the key `options`.
--template-data <filepath>      Path to a JSON file containing additional context data to supply to the template under the key `data`.
--template-output <filepath>    Path to a file where the rendered report will be written. If omitted, the rendered report is printed to stdout.

# Implementation

1. Extend the minimist configuration and CLIOptionsSchema in src/lib/main.js to recognize `template`, `template-data`, and `template-output` as string options.
2. After the tool computes the value or diagnostics object:
   a. Check if `opts.template` is set. If not, preserve existing behavior.
   b. Read the template file via `fs.readFileSync(opts.template, 'utf-8')` or use `ejs.renderFile` directly.
   c. Load additional context from `opts['template-data']` if provided:
      - Read and parse JSON into an object `extraData`.
   d. Build the rendering context:
      ```js
      const context = {
        result: diagnosticsObjectOrValue,
        options: opts,
        data: extraData || {}
      };
      ```
   e. Render the template using `ejs.renderFile(opts.template, context, (err, str) => { ... })`.
   f. On render success, if `opts['template-output']` is set, write with `fs.writeFileSync(opts['template-output'], str)`; otherwise, `console.log(str)`.
   g. On render error, log to stderr and exit with non-zero code.
3. Update tests in tests/unit/main.test.js to mock `ejs.renderFile`, `fs.readFileSync`, and verify that rendering and file writing or console output occur as expected.

# Testing

1. Add tests that invoke main with:
   - `--template report.ejs`: spy on `console.log` and `ejs.renderFile` to confirm the rendered string is output.
   - `--template report.ejs --template-data context.json`: mock `fs.readFileSync('context.json')` to return JSON and verify that the template context includes `data` field.
   - `--template report.ejs --template-output out.txt`: spy on `fs.writeFileSync` to ensure rendered content is written to the specified file.
2. Ensure failure cases where template path is invalid result in a non-zero exit and error logging.

# Documentation

1. Update docs/USAGE.md to document the new `--template`, `--template-data`, and `--template-output` options with examples showing rendering a custom report.
2. Update README.md under **Features** to add a **Template Report Generation** section with sample CLI commands and a brief description of using EJS templates for custom reports.