# Description
Implement random ascii face output for emotional feedback. The CLI prints a random face from a curated set each time it is run to fulfill the mission of providing emotional feedback.

# Usage
Run the CLI tool with no options to display a random ascii face
    node src/lib/main.js
Or use the repository script
    npm run start

# Implementation
Update src/lib/main.js to include an array of ascii face strings. Create a helper function getRandomFace that selects a random element from this array. Modify main to call getRandomFace and log the result. No additional files are required.

# Testing
In tests/unit/main.test.js add tests that stub console.log and verify main logs a value that is one of the faces in the array. Add tests for getRandomFace to ensure it returns a string from the set. Ensure all tests pass with npm test.

# Documentation
Update README.md to include a Features section describing the ascii faces feature. Add example output lines showing sample faces and usage instructions in the readme.