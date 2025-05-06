# Feature Overview
The CLI main function will support generating and displaying a random ASCII art facial expression from a built-in collection of emotive faces. This provides immediate emotional feedback through the command line.

# Usage
Support the following flags
• --random : output a random face
• --seed <number> : seed the generator for deterministic selection
• --list : display all available faces with their index and short labels
By default running the CLI with no flags outputs one random face.

# Implementation Details
Add or extend code in main.js to include an array of face definitions. Use Node built-in crypto or a simple random function with optional seed. Parse CLI arguments using minimist or custom logic. Select and print the ASCII art to standard output.

# Testing
Add unit tests to verify that each face is included in the output range. Test that seeding with the same value produces identical results. Validate that list mode returns metadata without emitting a random face.