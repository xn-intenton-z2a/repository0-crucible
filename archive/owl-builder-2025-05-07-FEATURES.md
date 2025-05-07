features/CONFIG_FILE.md
# features/CONFIG_FILE.md
# Summary

Enable loading default CLI options from a configuration file and environment variables. Support JSON and YAML formats with schema validation using zod, and .env overrides via dotenv. Merge values in the order: environment variables, configuration file, then explicit CLI flags, with flags taking highest precedence.

# Specification

- Configuration file discovery:
  • Supported names in current directory or user home: .cruciblerc, cruconfig.json, cruconfig.yaml
  • Override file path via CRUCIBLE_CONFIG_PATH environment variable
- Supported formats: JSON and YAML representing an object that matches CLI option schema
- Recognized keys:
  • count (number)
  • seed (number)
  • category (string)
  • facesFile (string)
  • mergeFaces (boolean)
  • theme (string)
  • mergeTheme (boolean)
  • aiFace (string)
  • temperature (number)
  • json (boolean)
  • serve (boolean)
  • port (number)
  • diagnostics (boolean)
  • interactive (boolean)
- Validation:
  • Define a zod schema for all supported keys with correct types and optional defaults
  • On schema validation failure, call errorExit with descriptive message and exit nonzero
- Precedence:
  1. Load environment variables via dotenv.config()
  2. Load and validate configuration file
  3. Parse CLI arguments, overriding any configuration values
- Error handling:
  • If config file path is invalid or unreadable, call errorExit
  • If parsing or validation fails, produce descriptive error and exit nonzero

# Testing

- Write tests in tests/unit/config_file.test.js to:
  • Create temporary config files in JSON and YAML and verify config values apply when flags are omitted
  • Verify explicit CLI flags override config values
  • Test CRUCIBLE_CONFIG_PATH overrides default discovery
  • Test improper config format or validation failure triggers errorExit with clear message
  • Test missing config file is ignored without error

# Documentation

- Update README.md under Features to describe configuration file support, environment variable override, and precedence rules
- Add docs/CONFIG_FILE.md with example config file formats, discovery order, environment variable override, and error handling

# Implementation Details

- In src/lib/main.js, import dotenv and call dotenv.config() before argument parsing
- Import zod and define a schema matching CLI option definitions
- Implement a loadConfig function to:
  1. Determine config file path using CRUCIBLE_CONFIG_PATH or standard names
  2. Read file via fs.readFileSync
  3. Parse content with JSON.parse or yaml.load
  4. Validate parsed object against zod schema
  5. Return validated partial options
- Merge returned config options into CLI parsing logic before applying explicit flags
- Ensure errorExit is used consistently for any failuresfeatures/AI_GENERATION.md
# features/AI_GENERATION.md
# Summary

Enable generation of custom ASCII faces using the OpenAI API. Users supply a brief prompt describing the style or emotion, and the tool returns AI-crafted ASCII faces matching the request.

# Specification

- CLI Flags
  • --ai-face <prompt>       text prompt describing the desired face style or emotion
  • --count <n>              number of faces to generate (integer between 1 and 5, default 1)
  • --temperature <float>    sampling temperature between 0.0 and 1.0 (default 0.7)

- API Key Loading
  • Load OPENAI_API_KEY from environment or a .env file via dotenv
  • If key is missing, print descriptive error via errorExit and exit nonzero

- Behavior
  1. Detect --ai-face flag before built-in face logic; ignore --face, --list-faces, --list-categories when AI mode is used
  2. Validate count is an integer in [1,5], temperature is a number in [0,1]
  3. Create OpenAI client and send a ChatCompletion request with:
     - model: gpt-4 or fallback
     - messages:
       • system: instruct to output plain ASCII faces, one per line, matching the prompt
       • user: supply the prompt and count
     - temperature: as specified
  4. On successful response, split the returned text into lines, trim, and print each face line to stdout
  5. On API errors or parsing failures, print descriptive error to stderr via errorExit and exit nonzero

# Testing

- Mock OpenAI client to simulate successful responses and errors
- Test CLI invocation:
  • node src/lib/main.js --ai-face "angry cat" --count 3
  • Validate it prints 3 lines matching the mock response
- Test validation:
  • count outside [1,5] or invalid temperature causes descriptive errorExit
  • Missing or invalid API key triggers errorExit
- Add unit tests in tests/unit/ai_generation.test.js

# Documentation

- Update README.md under Features to document --ai-face and --temperature with examples
- Add docs/AI_FACE.md describing prompt guidelines, flag semantics, and error cases

# Implementation Details

- In src/lib/main.js:
  • Import and configure dotenv at top
  • Detect --ai-face flag and parse its value and optional --count and --temperature
  • After validation, call an async function aiGenerateFaces({prompt,count,temperature}) that:
    – Instantiates OpenAI client
    – Sends ChatCompletion
    – Returns an array of face strings
  • Print each face string with console.log and exit
  • Ensure errors call errorExit consistently
features/THEMED_FACE_SETS.md
# features/THEMED_FACE_SETS.md
# Summary

Introduce themed ASCII face sets covering animal and emoji expressions. Users can select or merge these themes into the face generator, enabling richer and more engaging output beyond the built-in lenny faces.

# Specification

- New flag `--theme <themeName>` to select a built-in theme. Valid theme names are:
  • `animals` (e.g., (=^.^=), (•ᴥ•), ʕ•ᴥ•ʔ, (◕ᴥ◕))
  • `emoji` (e.g., 😊, 😂, 😍, 🤖)
- New flag `--merge-theme` when used with `--theme` appends the themed faces to the standard built-in faces instead of replacing them.
- New flag `--list-themes` prints each available theme name on its own line and exits. Ignores other flags.
- When `--theme` is provided without `--merge-theme`, the themed faces replace the built-in face set; other flags (`--faces-file`, `--merge-faces`) are ignored in that mode.
- The theme face set is used by all modes (`--face`, `--list-faces`, `--list-categories`). Category filtering is disabled for themes; only theme faces are listed or sampled.
- Error handling:
  • Unknown theme names produce a descriptive error listing valid themes and exit with nonzero status.
  • Using `--merge-theme` without `--theme` produces an error.

# Testing

- In `tests/unit/main.test.js` or a new `tests/unit/theme.test.js`, verify:
  • `main(["--list-themes"])` prints `animals` and `emoji` lines and exits without error.
  • `main(["--face","--theme","animals"])` outputs one of the animal faces.
  • `main(["--face","3","--seed","42","--theme","emoji"])` outputs three emoji characters, reproducible by seed.
  • `main(["--face","--theme","animals","--merge-theme"])` includes both lenny faces and animal faces.
  • Invalid theme name `--theme unknown` throws an error listing valid themes.
  • Using `--merge-theme` without `--theme` throws an error.

# Documentation

- Update `README.md` under Features to include:
  ```
  --theme <themeName>       select a built-in themed face set (animals, emoji)
  --merge-theme             append theme faces to built-in faces
  --list-themes             list available themes and exit
  ```
- Add `docs/THEMED_FACE_SETS.md` describing themes, face examples, and flag behavior.
- Include usage examples:
  ```
  node src/lib/main.js --face --theme animals
  node src/lib/main.js --list-faces --theme emoji --merge-theme
  node src/lib/main.js --list-themes
  ```

# Implementation Details

- In `src/lib/main.js`, define a new constant `builtInThemes`:
  ```js
  const builtInThemes = {
    animals: ['(=^.^=)','(•ᴥ•)','ʕ•ᴥ•ʔ','(◕ᴥ◕)'],
    emoji: ['😊','😂','😍','🤖']
  };
  ```
- Extend argument parsing in `main` to detect `--list-themes`, `--theme`, and `--merge-theme` before other flags.
- If `--list-themes`, print theme names and exit.
- If `--theme` is set, validate theme name against `builtInThemes` keys. If invalid, call `errorExit`.
- When generating or listing faces:
  • If `theme` is set:
    – Build face array from `builtInThemes[theme]`.
    – If `mergeTheme` is true, load `builtInFaces` and append theme faces.
    – Ignore `loadFaceSet` and related custom file logic.
  • Delegate to existing `generateFaces`, `listFaces`, or inline sampling by combining the theme face array with the seeded RNG and `shuffleArray`.
- Ensure tests, interactive mode, and HTTP API also honor theme flags where appropriate.
features/COLOR_OUTPUT.md
# features/COLOR_OUTPUT.md
# Summary

Introduce ANSI color support for face output to enhance visual feedback. When the color flag is provided, generated faces are wrapped in ANSI escape sequences corresponding to the specified color.

# Specification

- Recognize a new flag `--color` in addition to existing CLI options.  
- Optional positional argument after `--color` specifies a color name; if omitted, default to green.  
- Supported colors and ANSI codes:
  • black   (30)
  • red     (31)
  • green   (32)
  • yellow  (33)
  • blue    (34)
  • magenta (35)
  • cyan    (36)
  • white   (37)
- Behavior when `--color` is present with `--face`:
  1. Generate faces as usual.
  2. For each face string, wrap with `\x1b[{code}m` before and `\x1b[0m` after, where `{code}` is the ANSI code for the chosen color.
- `--color` has no effect on list commands (`--list-faces`, `--list-categories`) or other modes (`--interactive`, `--serve`, `--json`, `--diagnostics`).
- Error handling:
  • If an unsupported color name is provided, call `errorExit` with a message listing valid colors and exit with nonzero status.

# Testing

- Add tests in `tests/unit/color.test.js` to verify:
  • Default behavior (`--face --color`) wraps output in green codes.  
  • Named color (`--face --color red`) wraps output in red codes for each line.  
  • Invalid color name (`--color invalid`) triggers `errorExit` with descriptive error and nonzero exit.

# Documentation

- Update `README.md` under Features to document the `--color` flag, supported colors, default behavior, and examples:

  node src/lib/main.js --face --color
  node src/lib/main.js --face 3 --color yellow

- Add a section in `docs/CLI_COLOR_OUTPUT.md` describing flag syntax, supported colors, examples, and error cases.

# Implementation Details

- In `src/lib/main.js`, extend the CLI parsing loop:
  1. Detect `--color` and optional next argument as `colorName`.  
  2. Validate `colorName` against the `supportedColors` map. If missing, set to "green".  
  3. When outputting each face in the `--face` block, if `colorFlag` is true, look up the ANSI code and wrap printed face accordingly.
  4. Use `console.log(`\x1b[${code}m${face}\x1b[0m`)` for colored output.  
  5. On invalid color, call `errorExit` with message: `Unsupported color '<name>'. Supported colors: ${list}.`features/STRUCTURED_OUTPUT.md
# features/STRUCTURED_OUTPUT.md
# Summary

Enable structured JSON output modes for the CLI, combining standard JSON output and diagnostics reporting into a unified feature for programmatic consumption and debugging.

# Specification

- Recognize two flags processed before other commands
  • --json enables JSON_OUTPUT mode
  • --diagnostics enables diagnostics mode
- JSON_OUTPUT behavior
  1. For face generation, output one compact JSON object: {faces: [face1, face2, ...]}
  2. For list-faces, output {faces: [...]} with all face strings
  3. For list-categories, output {categories: [...]} with all category names
  4. Errors remain printed to stderr via errorExit and exit nonzero
- Diagnostics behavior
  1. Suppress normal output and collect fields
     nodeVersion cliVersion builtInFacesCount categories customLoaded customFacesCount mergeMode seed timestamp
  2. On success print a pretty JSON object to stdout and exit zero
  3. On file or parse errors include an error field in the JSON and exit nonzero

# Testing

- Add tests in tests/unit for main invoked with --json in combination with --face, --list-faces, and --list-categories, verifying valid compact JSON
- Add tests for main invoked with --diagnostics verifying presence and types of all required keys, and error field on failure
- Ensure errorExit behavior remains consistent for invalid arguments outside JSON mode

# Documentation

- Update README.md Features section to document --json and --diagnostics flags with examples
- Create or merge docs/JSON_OUTPUT.md and docs/DIAGNOSTICS.md into docs/STRUCTURED_OUTPUT.md describing both modes and sample outputs

# Implementation Details

- In src/lib/main.js extend argument parsing to detect --json and --diagnostics early
- Consolidate JSON output and diagnostics blocks into a single output handler
- Use console.log(JSON.stringify(obj)) for JSON_OUTPUT and console.log(JSON.stringify(obj, null, 2)) for diagnostics
- Ensure errorExit prints to stderr and does not produce JSON output except in diagnostics mode where error field is includedfeatures/INTERACTIVE_MODE.md
# features/INTERACTIVE_MODE.md
# Summary

Introduce an interactive REPL mode that lets users generate and explore ASCII faces without restarting the CLI for each command. In interactive mode users can run commands such as `face`, `list-faces`, `list-categories`, `category`, `custom`, `merge-custom`, and `exit` in a live session.

# Specification

- New flag `--interactive` starts an interactive prompt using Node’s readline module.
- Prompt on each line for commands. Supported commands:
  - `face [count] [--seed <seed>]` to generate 1 or more faces with optional seed.
  - `list-faces [--category <category>]` to list available faces or filter by category.
  - `list-categories` to show valid categories.
  - `category <name>` to set a default category filter for subsequent commands.
  - `custom <path> [--merge]` to load or merge a custom faces file for the current session.
  - `help` to display available commands and usage.
  - `exit` or `quit` to leave interactive mode.
- Session state retains defaults: last category, custom file path and merge setting, and seed if set.
- Each command runs the same logic as the corresponding CLI flags but prints results inline.
- Invalid commands or parameters print a descriptive error but remain in the session.

# CLI Usage

node src/lib/main.js --interactive

At prompt:
> face 3 --seed 42
( outputs three faces )
> list-categories
happy
sad
angry
playful
surprise
> category playful
Default category set to playful
> face
( outputs one playful face )
> exit

# Testing

- Add tests in tests/unit/main.test.js to simulate interactive sessions by mocking stdin and stdout.
- Verify that entering `face`, `list-faces`, and `list-categories` prints valid output and continues the session.
- Test `category` command sets the default filter and affects subsequent `face` and `list-faces` commands.
- Test invalid commands produce errors but do not exit the REPL.
- Test `custom <path>` and `custom <path> --merge` load and merge custom faces correctly in session.
- Test `exit` or `quit` terminates the session cleanly.

# Documentation

- Update README.md under Features to document `--interactive`, describe commands, and show example sessions.
- Add section in docs/INTERACTIVE_MODE.md explaining REPL usage, command syntax, and session state behavior.

# Implementation Details

- In src/lib/main.js detect `--interactive` before other flags. If present:
  - Use Node’s `readline.createInterface` on process.stdin and process.stdout.
  - Maintain a session object for default options (count, seed, category, custom settings).
  - On each line, parse the command string into arguments and invoke the existing `main` logic or refactored functions without exiting process. Capture output and errors.
  - Handle `help` and `exit` commands specially. On `exit` or `quit`, close the readline interface and return.
  - Ensure errors from parsing or command execution are caught and printed but do not exit the session.
- Refactor `main` to expose lower-level face generation and listing functions to reuse in REPL mode.
- Maintain consistent exit codes and error messages in non-interactive mode.features/CUSTOM_FACES.md
# features/CUSTOM_FACES.md
# Summary

Allow users to supply external JSON or YAML files defining custom ASCII faces with optional categories and choose to merge or replace built-in faces.

# Specification

- Introduce a --faces-file <path> flag to load custom face definitions from a JSON or YAML file.
- Introduce a --merge-faces flag that when present appends custom faces to the built-in set instead of replacing them.
- Custom file format must be an object with a top-level faces array. Each entry requires a non empty face string and may include a categories array of strings.
- When loading, read file with fs readFileSync, parse as JSON or YAML based on extension, and validate structure. On missing file path or parse error print descriptive error and exit nonzero.
- If merge flag is absent replace the built-in face list with custom faces. If merge flag is present append custom entries to the built-in faces in their original order.
- Recognise categories from custom faces in list categories and face filtering. If a category filter is applied and not found in the merged set produce an error listing valid categories.

# CLI Usage

node src/lib/main.js --face --faces-file path/to/custom.json
node src/lib/main.js --list-faces --faces-file path/to/file.yaml --merge-faces
node src/lib/main.js --face 5 --category excited --faces-file custom.json

# Testing

- Add unit tests to cover custom file loading replacing built in faces and merging behavior.
- Test that list categories includes categories from custom definitions.
- Test filtering by custom category yields expected faces or errors when invalid.
- Test error handling on unreadable file path, invalid JSON or YAML syntax, or malformed face entries.

# Documentation

Update README features section to describe use of --faces-file and --merge-faces flags with examples. Add or update docs/CUSTOM_FACES.md explaining file format, loading order, merge semantics, and error cases.

# Implementation Details

In src/lib/main.js extend or use the existing loadFaceSet function to handle custom files. Use readFileSync and js yaml or JSON parse to load content. Validate entries and construct uniform face objects. Merge or replace based on merge flag. Throw errors with descriptive messages via errorExit for any invalid conditions.features/HTTP_API.md
# features/HTTP_API.md
# Summary

Provide a unified HTTP server mode that exposes a JSON API for face generation, listing faces, listing categories, and diagnostics, and also serves a simple web UI at the root path for interactive face generation and exploration.

# Specification

## HTTP Endpoints

- GET /
  - Returns a self-contained HTML page with form controls and buttons to generate faces, list faces, list categories, and view diagnostics.
  - The page uses fetch calls to the JSON API endpoints and displays results inline.

- GET /openapi.json
  - Returns an OpenAPI 3.0.3 specification in JSON describing all endpoints.

- GET /face
  - Query parameters: count (integer ≥1), seed (integer), category (string), facesFile (string), mergeFaces (boolean)
  - Response 200: { faces: string[] }
  - Response 400: { error: string }

- GET /list-faces
  - Query parameters: category, facesFile, mergeFaces
  - Response 200: { faces: string[] }
  - Response 400: { error: string }

- GET /list-categories
  - Query parameters: facesFile, mergeFaces
  - Response 200: { categories: string[] }
  - Response 400: { error: string }

- GET /diagnostics
  - Query parameters: facesFile, mergeFaces, seed
  - Response 200: diagnostics JSON object matching CLI diagnostics
  - Response 400: diagnostics object including error field

All JSON responses include headers:
  - Content-Type: application/json
  - Access-Control-Allow-Origin: *

## Error Handling

- Invalid routes return 404 with { error: 'Not Found' }.
- Parameter validation mirrors CLI validation rules.

# Testing

- Unit tests should start the server on an ephemeral port and verify:
  - GET / returns status 200 and HTML including <!DOCTYPE html> and references fetch endpoints: /face, /list-faces, /list-categories, /diagnostics.
  - GET /openapi.json returns a valid OpenAPI object with correct paths and schemas.
  - GET /face, /list-faces, /list-categories, /diagnostics with valid parameters return correct JSON and status codes.
  - Invalid parameters on /face and others return 400 with descriptive error messages.
  - CORS header is present on all JSON responses.

# Implementation Details

- In src/lib/main.js serveMode function:
  1. Detect pathname "/" and serve an HTML template string with inline CSS/JS for the web UI.
  2. Serve /openapi.json by returning a constructed OpenAPI 3.0.3 spec object.
  3. For other routes (/face, /list-faces, /list-categories, /diagnostics), parse query parameters, invoke existing library functions (generateFaces, listFaces, listCategories), or build diagnostics object as in CLI.
  4. Set response headers and JSON.stringify the body.
  5. On errors, catch exceptions and respond with appropriate HTTP status and JSON error or diagnostics including error field.

- No external HTTP frameworks; use Node core http and url modules.
- Include CORS header in all responses.