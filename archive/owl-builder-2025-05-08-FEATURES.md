features/FACE_THEMES.md
# features/FACE_THEMES.md
# Purpose
Provide pre-defined themed sets of ASCII faces selectable via a --theme flag to quickly switch between emotional palettes without requiring custom config files.

# Implementation Details
1. Define default themes
   • In src/lib/main.js, add a constant THEMES mapping theme names (e.g. happy, sad, surprised, angry) to arrays of ASCII face strings.
2. Parse theme flag
   • Extend minimist configuration to include a string option theme (alias T).
   • Validate that the specified theme exists in THEMES. On invalid theme, print help message and exit with code 1.
3. Integrate with face generation
   • In main(), after loading built-in faces and any custom faces, if flags.theme is set, override faces list with THEMES[flags.theme].
   • Ignore custom config when theme is used; only apply theme set.
4. Help and validation
   • Update helpMessage to include --theme (-T) description and list available theme names.
   • Include valid theme names in error messages on invalid flag input.

# CLI Interface Examples
- node src/lib/main.js --face --theme happy
  Outputs a randomly selected face from the happy theme set.
- node src/lib/main.js --face -T sad --count 2
  Outputs two faces chosen from the sad theme list.
- node src/lib/main.js --face --theme invalid
  Prints help message listing available themes and exits with code 1.

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Mock console.log and run main with --face --theme happy; verify output is one of THEMES.happy.
   • Test alias -T with multiple counts.
   • Provide invalid theme name; assert help message printed once and exit code behavior.
2. Integration Tests in tests/e2e/cli.test.js
   • Execute CLI binary with --face --theme surprised; capture stdout; assert face belongs to THEMES.surprised.

# Documentation
- Update README.md under Features to document the --theme flag, its purpose, and list available themes.
- Extend docs/USAGE.md with a new Themes section showing examples for happy, sad, surprised themes and flag usage.features/PROGRAMMATIC_API.md
# features/PROGRAMMATIC_API.md
# Purpose
Provide a programmatic JavaScript API function to generate ASCII faces and integrate with other Node.js applications without invoking the CLI.

# Implementation Details
1. Export generateFaces function
   • Accept an options object with properties count (number, default 1), theme (string, optional), config (string, optional file path), seed (number, optional), and json (boolean, optional).
   • Validate each option: count must be a positive integer, theme must exist in faceThemes, config path must be readable and parseable via loadFaces, and seed must be a non-negative integer.
2. Internal workflow
   • Initialize the faces array by applying theme override or asciiFaces and config override similar to main.
   • If seed is provided, create a seeded random generator LCG and pass rand function to getRandomFace; otherwise use Math.random.
   • Loop count times, collect results of getRandomFace into an array.
   • If options.json is true and count is 1, return a JSON string of the single face; if count greater than 1 return JSON string of the array; otherwise return the raw string or array.
3. Side-effect free
   • Do not call console.log or process.exit. Return values only and throw errors on invalid options.
4. Module exports
   • Add generateFaces to exports in src/lib/main.js alongside existing functions.

# API Interface Examples
import { generateFaces } from "@xn-intenton-z2a/repository0-crucible";

// Generate one default face
const face = generateFaces();

// Generate two sad theme faces
const faces = generateFaces({ count: 2, theme: "sad" });

// Get JSON string array with seeding
const jsonArray = generateFaces({ count: 3, seed: 42, json: true });

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Import generateFaces and call with default options; assert return type is string and value in asciiFaces.
   • Call with count and custom theme; assert returned array length and values in respective faceThemes.
   • Provide invalid options (negative count, unknown theme, bad config path, invalid seed); expect generateFaces to throw meaningful Error.

# Documentation
- Update README.md under Features to include Programmatic API section with usage and examples.
- Extend docs/USAGE.md with a Programmatic API section demonstrating import, function signature, options, and expected return values.features/EMOJI_FACES.md
# features/EMOJI_FACES.md
# Purpose
Allow users to generate random emoji-based facial expressions as an alternative to ASCII art, using a new --emoji flag.

# Implementation Details
1. Define an array emojiFaces in src/lib/main.js with a set of expressive emoji strings such as 😀, 😢, 😲, 😠, 😍.
2. Extend minimist configuration to include a boolean option emoji (alias e).
3. In main(), when flags.emoji is set:
   • Validate that no conflicting flags (config, theme) are used; if conflicts exist print helpMessage and return without error.
   • Override the faces list with emojiFaces.
   • Proceed to apply count, seed, and json options as usual for batch, deterministic, or JSON output.
4. Update helpMessage to describe the --emoji (-e) flag and list its purpose.
5. Do not add any new dependencies or alter existing behavior outside face generation logic.

# CLI Interface Examples
- node src/lib/main.js --face --emoji
  Outputs a single random emoji face.
- node src/lib/main.js --face -e --count 3
  Outputs three emoji faces, one per line.
- node src/lib/main.js --face --emoji --json
  Outputs one emoji in JSON string format.
- node src/lib/main.js --face --emoji --count 2 --json
  Outputs a JSON array of two emoji faces.

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock console.log and run main(["--face","--emoji"]); assert the output is one of emojiFaces.
   • Test alias -e with --count 2 and --json; verify console.log called once with a valid JSON array of two emojiEntries.
   • Simulate invalid combinations (such as --emoji without --face or with --config); assert that helpMessage is printed once.
2. Integration tests in tests/e2e/cli.test.js
   • Execute CLI with --face --emoji and capture stdout; assert it contains a valid emoji from emojiFaces.
   • Test JSON output and count behavior for emoji mode across multiple runs.

# Documentation
- Update README.md under Features to document the --emoji (-e) flag and its purpose.
- Extend docs/USAGE.md with an "Emoji Faces" section that includes CLI usage examples and expected output.features/COLOR_OUTPUT.md
# features/COLOR_OUTPUT.md
# Purpose
Enable ANSI color customization for ASCII facial expressions in CLI mode, enhancing emotional feedback with user-specified colors.

# Implementation Details
1. Parse color flag
   • Add string option color (alias C) to minimist configuration.
   • Accept standard color names supported by chalk (red, green, blue, yellow, magenta, cyan, white, gray).
   • Validate that the provided color matches a chalk method; on invalid color, print help message and exit with code 1.
2. Add chalk dependency
   • Install chalk and add it to package.json dependencies.
   • Import chalk in src/lib/main.js.
3. Apply coloring
   • In main(), when face mode is active and flags.color is set, wrap each generated face string in chalk[flags.color](face).
   • For batch mode, apply coloring to each line individually.
   • Do not alter HTTP server behavior; ignore or return error for color in serve mode.
4. Help and validation
   • Update helpMessage to include --color (-C) description and supported color list.
   • On invalid usage of --color, display help and exit without errors.

# CLI Interface Examples
- node src/lib/main.js --face --color green
  outputs a green colored face.
- node src/lib/main.js --face -c 3 -C blue
  outputs three blue colored faces, one per line.
- node src/lib/main.js --face --color invalid
  prints help message and exits.

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock console.log and chalk methods; run CLI with --face --color red; verify output contains ANSI codes from chalk.red.
   • Verify invalid color prints help message exactly once.
2. Integration tests in tests/e2e/cli.test.js
   • Execute CLI binary with --face --color magenta; capture stdout; assert presence of magenta ANSI escape codes in output.

# Documentation
- Update README.md under Features to describe the --color (alias -C) flag and supported colors.
- Extend docs/USAGE.md to include a Color Output section with usage examples and list of supported colors.features/CLI_CONFIG.md
# features/CLI_CONFIG.md
# Purpose
Allow users to define default CLI options in a configuration file so they do not need to supply flags on each invocation.

# Implementation Details
1. Parse rc-file flag
   • Add string option rc-file (alias R) to minimist configuration. Default lookup order: a path provided by --rc-file, then a file named .facercrc in the current directory, then ~/.facercrc in the user home directory.
2. Load and parse config file
   • Read the file synchronously. Parse as YAML if extension matches .y[a]ml or as JSON otherwise. On read or parse failure, print help message and exit with code 1.
3. Validate and merge
   • Ensure loaded keys correspond to known flags and types. Discard unknown entries. Merge config values into defaults before parsing CLI args, then reapply CLI args to override config.
4. Apply to execution
   • Proceed with existing main logic using merged flags. Remove the rc-file flag from flags before further processing.

# CLI Interface Examples
- node src/lib/main.js --rc-file customrc.yaml --face
  Reads defaults from customrc.yaml and applies them before executing the face generation.
- node src/lib/main.js --face --count 5
  Uses default count from config file if rc-file is present and count not supplied on the command line.

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Create temporary config files with valid and invalid content. Verify that main merges config and CLI flags correctly, errors on invalid format, and that unknown keys are ignored.
2. Integration Tests in tests/e2e/cli.test.js
   • Invoke CLI with --rc-file and no other flags; assert that config values drive output. Test override behavior when a flag is supplied alongside rc-file.

# Documentation
- Update helpMessage to document --rc-file (alias -R), lookup order, and behavior.
- Add a Config File section in README.md and docs/USAGE.md with examples and default file discovery order.features/STREAM_MODE.md
# features/STREAM_MODE.md
# Purpose
Allow continuous automatic generation of faces at a specified interval until interrupted, enabling use as a live status indicator or entertainment stream.

# Implementation Details
1. Parse stream flags
   - Add boolean option stream (alias w) to minimist configuration.
   - Add numeric option interval (alias I) with default value 1000.
   - Validate that interval is a positive integer; on invalid value, print help message and return.

2. Continuous face output
   - In main(), when flags.stream and flags.face are true, assemble the faces list including theme, config, emoji, color, filter, and custom faces, and select random generator (seed or Math.random).
   - Use setInterval with the specified interval to generate a face each tick via getRandomFace.
   - If flags.json is true, output each face as a JSON string per line; otherwise output plain faces per line.
   - Listen for process SIGINT; on first signal clear the interval, print a termination message, and exit gracefully.

3. Integration constraints
   - Do not start HTTP server or interactive REPL when stream mode is active.
   - Ignore flags.count when streaming; continuous output is indefinite until interrupted.
features/INTERACTIVE_MODE.md
# features/INTERACTIVE_MODE.md
# Interactive Mode

# Purpose
Allow users to enter an interactive session to continuously generate ASCII faces without re-invoking the CLI, enhancing exploratory and demo workflows.

# Implementation Details
1. Parse interactive flag
   • Add boolean option interactive (alias i) to minimist configuration.
2. Initialize interactive REPL
   • If flags.interactive is true, display welcome message and instructions.
   • Use Node's readline module to create an interface reading from stdin and writing to stdout.
3. Handle user input
   • On empty input or pressing Enter, generate and print faces according to flags.count, flags.json, flags.color, flags.seed, flags.theme, and flags.config.
   • If user inputs exit, quit, or Ctrl+C, close the interface and exit gracefully.
4. Exit behavior
   • On receiving close event, print a goodbye message and exit process.
5. Integration with existing features
   • Support all existing face generation flags (count, config, theme, color, seed, json).
   • Do not start HTTP server when interactive mode is active.

# CLI Interface Examples
- Start interactive session
  node src/lib/main.js --interactive
- Generate three faces per Enter in JSON mode
  node src/lib/main.js --interactive --count 3 --json
- Use a custom theme in interactive mode
  node src/lib/main.js --interactive --theme happy

# Testing
1. Unit Tests
   • Mock readline interface to simulate user pressing Enter and typing exit; verify console.log called with correct faces and session ends.
   • Test combining interactive with count=2 and json flags to ensure JSON arrays printed on input.
2. Integration Tests
   • Spawn CLI with --interactive flag, send newline and exit commands; capture stdout and assert it contains welcome message, face output, and goodbye message.

# Documentation
- Update README.md under Features to describe the --interactive (-i) mode and options.
- Extend docs/USAGE.md with an Interactive Mode section showing usage examples and behavior.features/CUSTOM_FACES.md
# features/CUSTOM_FACES.md
# Purpose
Allow users to supply a custom JSON file of ASCII faces to override or extend the built-in list, enabling tailored emotional feedback.

# Implementation Details
1. Parse faces-file flag
   • Add string option faces-file (alias f) to minimist configuration.  
   • Default value: undefined (use built-in faces if not provided).
2. Load and validate custom file
   • If faces-file is specified, attempt to read the file synchronously using fs.readFileSync.  
   • Parse content as JSON.  
   • Ensure the parsed data is an array of non-empty strings.  
   • On parse error, non-array, or invalid entries, print an error message and exit without exception.
3. Override faces list
   • If validation passes, replace asciiFaces for the current run with the custom array.  
   • Otherwise fall back to built-in asciiFaces.
4. Integrate with existing modes
   • In ascii-face and serve modes, use the effective asciiFaces array (built-in or custom).
5. Help message update
   • Add --faces-file (-f) to the helpMessage with description and usage example.

# CLI Interface Examples
- node src/lib/main.js --ascii-face --faces-file faces.json  
  Uses faces.json to supply faces; prints one face by default.
- node src/lib/main.js --ascii-face -f /path/to/custom.json --count 3  
  Prints three faces from the custom file.

# Testing
1. Unit tests in tests/unit/main.test.js
   • Valid custom file returns only values from the file.  
   • Invalid JSON file path or malformed content triggers error message and no exception.
2. E2E tests in tests/e2e/cli.test.js
   • Simulate CLI with --faces-file and verify override behavior in ascii-face and serve modes.

# Documentation
- Update README.md under Features to describe the --faces-file flag.  
- Update docs/USAGE.md with examples for using a custom faces file.features/SEED_RANDOM.md
# features/SEED_RANDOM.md
# Purpose

Enable deterministic ASCII face generation by seeding the random number generator, allowing reproducible sequences in both CLI and HTTP modes.

# Implementation Details

1. Parse seed flag
   • Add numeric option seed (alias S) to the minimist configuration alongside existing flags. No default value (undefined if absent).
   • Validate seed as a non-negative integer. On invalid input, print help or return HTTP 400 with error message.

2. Seeded random generator
   • Implement a simple linear congruential generator (LCG) accepting the seed value.
   • Expose a rand() function that returns a pseudo-random float in [0,1).

3. Integrate with getRandomFace
   • Update getRandomFace signature to accept an optional rand function; default to Math.random.
   • In CLI and HTTP modes, pass the seeded rand if seed is provided, otherwise use default.

4. CLI behavior
   • When --seed or -S is provided with --face, --ascii-face, or --serve, the output (single or batch) is reproducible for the given seed.
   • On invalid seed value, CLI should print a JSON error or help and exit with code 1.

5. HTTP API behavior
   • Extend /face endpoint to accept seed query parameter alongside count.
   • When seed is specified, use the seeded rand so that repeated requests with the same seed and count produce the same sequence of faces.
   • On invalid seed query, respond with status 400 and JSON { error: "Invalid seed" }.

# CLI Interface Examples

- Reproducible single face:
  node src/lib/main.js --face --seed 42

- Reproducible batch of faces:
  node src/lib/main.js --ascii-face --count 3 -S 123

# Testing

1. Unit Tests
   • Mock or call main with --seed and fixed random function to verify deterministic output matches expected sequence.
   • Test getRandomFace with custom rand to ensure correct mapping.
   • Validate invalid seed values trigger help or error.

2. Integration Tests
   • Simulate CLI runs with the same seed and count flags; assert identical output across runs.
   • In HTTP mode, send GET /face?seed=10&count=2 and verify two faces are the same when repeated.

# Documentation

- Update README.md under Features to describe --seed (-S) flag, its purpose, and CLI examples.
- Extend docs/USAGE.md with a Seeded Generation section showing reproducible CLI and HTTP API usage.
features/FACE_HISTORY.md
# features/FACE_HISTORY.md
# Purpose
Allow users to persist generated ASCII faces to a history file for auditing or record-keeping.

# Implementation Details
1. Parse persist flag
   • Add string option persist (alias P) to minimist configuration.  
   • Default value: undefined (no persistence if not provided).
2. Determine history file path
   • If persist flag is provided without a value, default to "face_history.log" in the current directory.  
   • If a file path is supplied, use that path.
3. Append faces to file
   • After generating each face in ascii-face mode (including batch via count), call fs.appendFileSync(path, face + "\n").  
   • On append error, log a warning message but continue normal output.
4. Integrate with existing modes
   • Apply persistence only in CLI ascii-face mode (flags ascii-face and count).  
   • Do not alter HTTP server behavior or custom faces handling.
5. Help message update
   • Include --persist (-P) in helpMessage with description and usage example.

# CLI Interface Examples
- node src/lib/main.js --ascii-face --persist
  Appends the generated face to face_history.log and prints it to console.
- node src/lib/main.js --ascii-face -c 3 -P history.txt
  Generates three faces, prints each line, and appends them to history.txt.

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock fs.appendFileSync and stub console.log.  
   • Verify appendFileSync is called with correct file path and content for default and custom paths.
   • On append error, ensure warning is logged but face output still occurs.
2. E2E tests in tests/e2e/cli.test.js
   • Simulate CLI with --ascii-face --persist --count 2 --persist history.log.  
   • After run, read history.log and assert it contains exactly two lines matching asciiFaces.

# Documentation
- Update README.md under Features to describe the --persist flag and default behavior.  
- Update docs/USAGE.md with examples for persisting face history.features/LIST_FACES.md
# features/LIST_FACES.md
# Purpose
Provide a CLI command to list all available ASCII faces, including built-in and custom sets, so users can inspect and choose from the full palette.

# Implementation Details
1. Parse list flag
   • Add a boolean option list (alias L) to minimist configuration alongside existing flags.
   • Default value: false.
2. Load faces
   • If flags.list is true, determine the faces array: start with asciiFaces.
   • If flags.config is provided, load custom faces via loadFaces and concatenate to the built-in list.
3. JSON output support
   • If flags.json (alias j) is also true, wrap the faces array in JSON.stringify and print once.
   • Otherwise, iterate over faces and console.log each face on its own line.
4. Control flow
   • In main(), if flags.list is present, perform listing logic and return immediately without generating random faces or starting HTTP server.
5. Help message update
   • Update helpMessage to include --list (-L) description and note JSON compatibility when used with --json.

# CLI Interface Examples
- List built-in faces:
  node src/lib/main.js --list

- List built-in and custom faces (YAML or JSON file):
  node src/lib/main.js --list --config faces.yaml

- List faces in JSON format:
  node src/lib/main.js --list --json

- Alias example using -L:
  node src/lib/main.js -L

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock console.log and run main(["--list"]); assert console.log called asciiFaces.length times with each known face.
   • Run main(["--list","--config",path]); stub loadFaces; assert combined list printed.
   • Test --list --json produces one console.log with a valid JSON array equal to the faces list.
   • Alias -L works identically to --list.
2. E2E tests in tests/e2e/cli.test.js
   • Execute CLI binary with --list and capture stdout; verify all built-in faces are present in output.
   • Execute with both --list and --config; verify custom faces appear after built-in.
   • Execute with --list --json; parse stdout as JSON and assert array contents and order.

# Documentation
- Update README.md under Features to describe --list (-L) flag and JSON output option.
- Extend docs/USAGE.md in a List Faces section with usage examples for plain and JSON listing.features/ASCII_FACE.md
# features/ASCII_FACE.md
# Purpose
Enhance the existing ASCII face output feature to support batch generation of faces for richer emotional feedback in scripts or pipelines.

# Implementation Details
1. Parse count flag  
   • Add numeric option count (alias c) to minimist configuration with default value 1.  
   • Ensure flags object includes count option alongside ascii-face and help.
2. Validate count  
   • Accept only positive integers.  
   • If count is zero, negative, or not an integer, output the help message and return without error.
3. Generate faces  
   • In main(), when ascii-face mode is active, loop from 1 to count.  
   • Call getRandomFace() each iteration and print each result on its own console line.  
   • Preserve existing single-face behavior when count is 1.
4. Help message update  
   • Include --count (-c) in helpMessage with description and default value.
   • Add examples illustrating multiple face requests.

# CLI Interface Examples
- node src/lib/main.js --ascii-face --count 3  
  Outputs three random ASCII faces, one per line.
- node src/lib/main.js --ascii-face -c 5  
  Outputs five random ASCII faces.
- node src/lib/main.js --ascii-face  
  Outputs one random ASCII face (default count).

# Testing
1. Unit tests in tests/unit/main.test.js  
   • Default invocation prints exactly one face.  
   • --ascii-face --count N prints N faces and console.log called N times.  
   • Alias -c works identically to --count.  
   • Invalid count values (zero, negative, non-integer) trigger help output.
2. CLI integration in tests/e2e/cli.test.js  
   • Simulate node CLI with --ascii-face --count 4 and assert four lines of output belonging to asciiFaces.

# Documentation
- Update README.md to describe --count flag under Features and Usage.  
- Update docs/USAGE.md to include examples for multiple faces.  
- Note count parameter in the API for future programmatic calls and library usage.features/DIAGNOSTICS.md
# features/DIAGNOSTICS.md
# Purpose
Add a diagnostics mode to the CLI tool that outputs detailed runtime information as JSON. This assists debugging, monitoring, and integration by exposing environment details, configuration settings, and face data metrics.

# Implementation Details
1. Parse diagnostics flag
   • Add a boolean option diagnostics (alias d) to the minimist configuration alongside existing flags.
2. Collect runtime data
   • Import version from package.json using an import statement.
   • Capture Node.js version via process.versions.node and platform via process.platform.
   • Retrieve memory usage metrics from process.memoryUsage.
   • Compute builtInFaceCount using the length of asciiFaces.
   • If a config path is provided, include configPath and compute customFacesCount by calling loadFaces with the provided path.
   • Record a timestamp using new Date().toISOString().
3. Output JSON
   • Create a diagnostics object containing all collected fields.
   • Print the object as a JSON string to standard output using console.log.
4. Control flow
   • In main(), if the diagnostics flag is present, perform diagnostics output and return immediately without generating a face or starting the HTTP server.

# CLI Interface Examples
- Run diagnostics in default mode:
  node src/lib/main.js --diagnostics

- Run diagnostics with a custom faces config file:
  node src/lib/main.js --diagnostics --config path/to/faces.yaml

# Testing
1. Unit Tests
   • Mock console.log and run main with diagnostics flag; parse logged output as JSON and assert presence and types of version, nodeVersion, platform, memoryUsage, builtInFaceCount, timestamp.
   • Mock loadFaces to return a known array and run diagnostics with config flag; assert customFacesCount matches mock length and configPath matches input.
2. Integration Tests
   • Execute the CLI binary with diagnostics flag via tests/e2e/cli.test.js; parse stdout JSON and verify memoryUsage fields are numeric and timestamp is valid ISO string.

# Documentation
- Update README.md under Features to describe the diagnostics flag and its purpose.
- Extend docs/USAGE.md with a new Diagnostics section showing examples and sample JSON output.features/HTTP_SERVER.md
# features/HTTP_SERVER.md
# Purpose
Serve ASCII faces over HTTP with support for theme-based face generation and a dedicated /themes endpoint for discovering available themes.

# Implementation Details
1. HTTP Flags and Startup
   • Parse boolean option serve (alias s) and numeric port (alias p) via minimist, default port 3000.
   • Validate port is a positive integer; on invalid value print help and return.
   • Load custom faces via config if flags.config is present.
   • Start http.createServer listening on the specified port and log a startup message with the port number.

2. GET /face Endpoint
   • Query parameters: count (default 1), seed (optional), theme (optional), includeCustom (optional, default true).
   • Validate count as integer ≥1; on invalid count respond 400 JSON error.
   • Validate seed as non-negative integer; on invalid seed respond 400 JSON error.
   • If theme is provided, ensure faceThemes[theme] exists; else respond 400 JSON error.
   • Build baseFaces:
     – Start from faceThemes[theme] if theme provided, else asciiFaces.
     – If includeCustom is true, append customFaces loaded from flags.config.
   • Use seeded LCG random if seed given, else Math.random. Generate count faces via getRandomFace(baseFaces, rand).
   • If Accept header includes text/plain, respond with plain text (one face or newline-separated list); otherwise respond with JSON (string or array).

3. GET /faces Endpoint
   • Query parameter includeCustom (true|false), default true.
   • Validate includeCustom; on invalid value respond 400 JSON error.
   • Build facesList by concatenating asciiFaces and customFaces if includeCustom.
   • Respect Accept header for text/plain vs application/json as above.

4. GET /themes Endpoint
   • No query parameters.
   • Build an object mapping each theme name to its full array of faces from faceThemes.
   • If Accept header includes text/plain, respond with lines: themeName: face1,face2,...
   • Otherwise respond with application/json and JSON.stringify of the theme map.

5. Error Handling and Logging
   • For unknown paths, respond 404 with JSON { error: "Not Found" }.
   • For each request, log method, path, query object, and response status.

# Testing
1. Unit Tests
   • Expose request handler for HTTP to allow direct invocation.
   • Test GET /face with theme query returns only faces from that theme.
   • Test invalid theme returns 400 and JSON error.
   • Test GET /themes returns correct JSON object and plain text for Accept: text/plain.
   • Validate seed and count behavior in /face.

2. End-to-End Tests
   • Start server with --serve and --port 0; issue HTTP requests via http client or curl.
   • Test themed face generation: /face?theme=sad&count=2; expect two sad faces.
   • Test GET /themes and verify response formats.
features/JSON_OUTPUT.md
# features/JSON_OUTPUT.md
# Purpose
Enable CLI users to receive random ASCII face output in JSON format for easier machine parsing and integration into scripts or tools.

# Implementation Details
1. Parse JSON flag
   • Add a boolean option json (alias j) to minimist configuration alongside existing options.  
   • Default value: false.
   
2. Adjust CLI output behavior
   • If flags.json is true and flags.face is set:
     - When count is 1, wrap the single face string with JSON.stringify and print it.
     - When count is greater than 1, collect all generated faces into an array and print JSON.stringify(array).
   • Ensure no additional logging or formatting is applied in JSON mode (pure JSON output).
   • If flags.json is provided without --face, print the help message and exit.

3. Help and validation
   • Update helpMessage in main() to include --json (-j) description and JSON output semantics.
   • On invalid flag combinations (e.g., --json without --face), display the help message and exit with code 1.

# CLI Interface Examples
- Single face as JSON string:
  node src/lib/main.js --face --json
  Outputs: "(^_^)"

- Multiple faces as JSON array:
  node src/lib/main.js --face --count 3 --json
  Outputs: ["(>_<)","(^.^)","(o_O)"]

- Invalid usage without --face:
  node src/lib/main.js --json
  Prints help message and exits with code 1.

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Mock console.log; run main(["--face", "--json"]); verify console.log called once with a valid JSON string matching one of asciiFaces.
   • Run main(["--face", "--count", "2", "--json"]); verify console.log called once with a JSON array of length 2 and each element in asciiFaces.
   • Test running with --json only; assert help message printed and process exits or returns without error.

# Documentation
- Update README.md under Features section to document --json (-j) flag, purpose, and examples.
- Update docs/USAGE.md to include a "JSON Output" subsection under CLI usage with examples for single and batch JSON outputs.features/FACE_STATISTICS.md
# features/FACE_STATISTICS.md
# Purpose

Provide aggregated statistics for persisted ASCII face history files, allowing users to audit and analyze usage patterns by reporting counts and percentages for each face.

# Implementation Details

1. Parse stats flag
   • Extend minimist configuration to include a boolean option stats (no alias).
2. Determine history file path
   • If flags.persist is present with a value, use that as the history file path.  
   • If flags.persist is present without a value or not provided, default to face_history.log in the current directory.
3. Load and parse history
   • Read the history file synchronously using fs.readFileSync. On read error, print helpMessage and exit with code 1.  
   • Split content by newline, filter out empty lines, and accumulate an array of recorded faces.
4. Compute statistics
   • Count occurrences of each unique face string.  
   • Calculate total number of entries and percentage share for each face.
5. Output formatting
   • If flags.json is true, return a JSON string representing an object with keys face and values an object with count and percentage.  
   • Otherwise, console.log each face on its own line in descending order of count, formatted as face: count (percentage%).
6. Control flow in main()
   • At the start of CLI mode, if flags.stats is true, perform the statistics routine and return immediately without generating new faces or starting the HTTP server.

# CLI Interface Examples

- node src/lib/main.js --stats
  Displays a sorted list of faces with counts and percentages from face_history.log.
- node src/lib/main.js --stats --persist history.txt
  Reads history.txt, computes statistics, and prints plain text report.
- node src/lib/main.js --stats --persist history.log --json
  Outputs a JSON string of the statistics object for machine parsing.

# Testing

1. Unit Tests in tests/unit/main.test.js  
   • Mock fs.readFileSync and console.log.  
   • Simulate history content with multiple face entries; verify counts and percentages computed correctly and printed or returned as JSON.  
   • Simulate missing history file; expect helpMessage printed once and exit code behavior.
2. E2E Tests in tests/e2e/cli.test.js  
   • Create a temporary history file with known entries.  
   • Spawn CLI with --stats and path, capture stdout; assert plain text report contains correct values.  
   • Spawn CLI with --stats --json; parse JSON output and assert object shape and values.

# Documentation

- Update README.md under Features to describe the --stats flag and its purpose.  
- Extend docs/USAGE.md with a new "History Statistics" section showing usage examples and sample output.features/VERSION_OUTPUT.md
# features/VERSION_OUTPUT.md
# Purpose

Add a --version (-V) flag to the CLI tool to display the current application version from package.json, enabling users to quickly identify the installed version.

# Implementation Details

1. Import Version
   • At the top of src/lib/main.js, import version from package.json:
     import { version } from '../../package.json';

2. Parse Version Flag
   • Extend minimist configuration:
     - Add boolean option version with alias V.
     - Include "version" and "V" in the alias mapping and default values.
     - Update knownFlags to include "--version" and "-V".

3. Handle Version Flag Early
   • Immediately after parsing flags and checking for unknownFlags and help:
     - If flags.version is true:
       console.log(version);
       return;

4. Help Message Update
   • Update helpMessage to include:
     "  --version, -V       Show application version"
   • Position it alongside other options in the Options section.

# CLI Interface Examples

- node src/lib/main.js --version
  Prints the installed version (e.g., 1.2.0-0) and exits.

- node src/lib/main.js -V
  Equivalent shorthand for printing the version.

# Testing

1. Unit Tests in tests/unit/main.test.js
   • Spy on console.log and call main(["--version"]); expect console.log called once with imported version value.
   • Verify that no other output or errors occur.

2. CLI Integration Test
   • In tests/e2e/cli.test.js, spawn the CLI binary with --version; capture stdout; assert that stdout matches the package.json version string and process exits immediately.

# Documentation

- Update README.md under Features to list "--version, -V" with description "Show application version".
- Extend docs/USAGE.md in Additional Options to describe the version flag and provide examples for both long and short forms.features/FILTER_FACES.md
# features/FILTER_FACES.md
# Purpose
Allow users to narrow the pool of ASCII or emoji faces using a regular expression filter to target specific patterns and integrate with both CLI and HTTP modes.

# Implementation Details
1. Parse filter flag
   • Add string option filter (alias F) to minimist configuration alongside existing options
   • Attempt to construct new RegExp(flags.filter); on SyntaxError, print help message and exit with code 1
2. Apply filter in CLI mode
   • After assembling the faces array (from asciiFaces, theme override, customFaces, or emojiFaces), apply faces = faces.filter(face => regex.test(face))
   • If faces is empty after filtering, print help message indicating no faces match the pattern and exit with code 1
3. Apply filter in HTTP mode
   • Extend GET /face and GET /faces endpoints to accept filter query parameter
   • Validate filter param by constructing new RegExp; on invalid regex respond 400 JSON { error: "Invalid filter" }
   • After building baseFaces or facesList, apply the regex filter
   • If the filtered list is empty, respond 400 JSON { error: "No faces match filter" }

# CLI Interface Examples
- node src/lib/main.js --face --filter "^.*_.*$"
- node src/lib/main.js --face -F "\\(T_T\\)" --count 3

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Call main with valid filter and verify console.log outputs only matching faces
   • Test invalid regex input triggers help message and exit without exception
2. Integration Tests in tests/e2e/cli.test.js
   • Spawn CLI with --face --filter, newline, and exit; verify output only includes matching faces
   • Verify invalid filter yields help message
3. HTTP Tests in tests/unit/http.test.js and tests/e2e/cli.test.js
   • GET /face?filter=... and /faces?filter=...; assert status codes and filtered results

# Documentation
- Update README.md under Features to document the --filter (-F) flag with description and examples
- Extend docs/USAGE.md with a Filter Faces section covering CLI and HTTP usagefeatures/LIST_THEMES.md
# features/LIST_THEMES.md
# Purpose
Provide a CLI option to list all predefined face themes and sample faces, enabling users to discover emotional palettes without manual inspection.

# Implementation Details
1. Parse list-themes flag
   • Add a boolean option list-themes to minimist configuration alongside existing flags.
   • No alias by default to avoid conflicts with other flags.
2. Collect theme data
   • Retrieve available theme names via Object.keys(faceThemes).
   • For each theme, select a representative sample face (e.g., the first face in the theme array).
3. Output formatting
   • If flags.json is true, build an object mapping theme names to their full face arrays and print JSON.stringify of that object.
   • Otherwise, iterate themes and console.log a line in the format: themeName: sampleFace (count faces)
4. Control flow in main()
   • In main(), before any generation or server startup, if flags.listThemes (list-themes) is present, perform the listing logic and return immediately.
   • Do not require --face for this operation.
5. Help and validation
   • Update helpMessage to include --list-themes description and JSON compatibility note.

# CLI Interface Examples
- List themes in plain text:
  node src/lib/main.js --list-themes
  Outputs:
  happy: (^_^) (2 faces)
  sad: (T_T) (2 faces)
  surprised: (*_*) (2 faces)

- List themes and full face arrays in JSON:
  node src/lib/main.js --list-themes --json
  Outputs: {"happy":["(^_^)","(^3^)"],"sad":["(T_T)","(o_O)"],"surprised":["(*_*)",">_<"]}

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Mock console.log and run main(["--list-themes"]); assert console.log called for each theme with correct sample and count.
   • Run main(["--list-themes","--json"]); assert console.log called once with valid JSON mapping all themes to their arrays.
2. Integration Tests in tests/e2e/cli.test.js
   • Execute CLI binary with --list-themes; capture stdout and verify lines for each theme.
   • Execute CLI with --list-themes --json; parse stdout as JSON and assert object keys and array values match faceThemes.

# Documentation
- Update README.md under Features to describe the --list-themes flag and its purpose.
- Extend docs/USAGE.md with a List Themes section, usage examples, and JSON output notes.