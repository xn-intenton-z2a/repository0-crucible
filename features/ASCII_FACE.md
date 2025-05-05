# ASCII_FACE

## Description
Extend the CLI application to support returning multiple faces in one invocation. Users can specify a count of faces to print at once, using the existing random and seeded modes to generate a sequence of faces in a single run.

## CLI Options

--count <number>, -c <number>  Specify how many faces to print (must be a positive integer). Combined with --seed for deterministic sequences.
--face                         Print a single random ASCII face (default when --count is omitted).
--list-faces                   Display all available ASCII faces as a numbered list.
--list, --list-names, -l       List all face identifiers sorted alphabetically.
--seed <value>, -s <value>     Use the provided numeric seed for deterministic selection of faces or sequence when used with --count.
--name <face>, -n <face>       Print the specified ASCII face by its name (case-insensitive).
--help, -h                     Show help message and exit.
--diagnostics, -d              Show diagnostics information and exit.

## Implementation Details

1. In src/lib/main.js extend argument parsing to recognize --count or -c. Validate that the following value is a nonzero finite integer greater than zero. If invalid or missing, throw an Error with message "Error: --count requires a positive integer."
2. After determining seedValue and rng (seedrandom or Math.random), if count flag is present:
   a. Initialize an empty array.
   b. Loop count times and for each iteration select a face index by Math.floor(rng() * ASCII_FACES.length).
   c. Push ASCII_FACES[idx] into the array.
   d. Return the array of faces instead of a single face.
3. In CLI invocation block, detect array result and iterate console.log for each face line. Exit code remains 0.
4. Ensure that count combines with seed deterministically: same seed and count produce same sequence.

## Testing

1. Add tests in tests/unit/main.test.js to cover:
   - --count with valid integer prints an array of that length, each element is a valid face.
   - Combining --count and --seed yields deterministic sequence for repeated calls.
   - Invalid count values (zero, negative, non-numeric, missing value) throw appropriate error messages.
   - Extra flags after --count throw unknown flag errors.
2. Mock console.log to capture output for count mode in CLI invocation tests.

## Documentation

1. Update README.md under Features and Usage to include the --count flag with examples:
   repository0-crucible --count 3
   (face1)
   (face2)
   (face3)
2. Update docs/ascii_face.md to document count mode under CLI Options and Usage sections, including error conditions.