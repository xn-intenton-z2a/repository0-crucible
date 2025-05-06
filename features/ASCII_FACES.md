# Summary
Add support for categorical filtering of ASCII faces to target specific emotional feedback scenarios.

# Specification
The CLI will support a new flag --category that takes a category name argument. When used with the face output mode, only faces tagged with the specified category are considered. Recognized categories include happy, sad, angry, surprise, and playful. If the specified category is not recognized, the CLI prints an error with a list of valid categories and exits with a nonzero status. Category filtering works alongside the existing --face flag, numeric count argument, and --seed option. After filtering, the random selection logic picks faces from the filtered subset. If the requested count exceeds the number of available faces in the chosen category, the CLI returns an error and suggests reducing the count or choosing a different category.

# CLI Usage
node src/lib/main.js --face --category happy
node src/lib/main.js --face 3 --category sad --seed 42

# Testing
Update tests in tests/unit/main.test.js to:
- Verify that invoking main with ["--face", "--category", "happy"] logs only faces from the happy category.
- Verify that an invalid category returns an error listing valid categories and exits nonzero.
- Verify that combining --category, count, and --seed yields a repeatable sequence within that category.

# Documentation
Update README.md under Features to describe the --category flag and valid categories. Provide inline usage examples for category filtering alongside faces.

# Implementation Details
In src/lib/main.js: Maintain a mapping of categories to arrays of ASCII faces. Extend argument parsing to detect --category and validate it against mapping keys. Filter the face library before random selection. Implement error handling for unrecognized categories and count overflows.