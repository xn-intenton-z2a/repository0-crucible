# VERSION_DETAILS Feature

This feature adds an enhanced version output command accessible via the --version-details flag. Unlike the standard --version flag which outputs only the version number, --version-details returns a detailed JSON object that includes the version, package name, description, and repository information (if available).

## Updates in Source File (src/lib/main.js)
- Add a handler called handleVersionDetails that imports the package.json file dynamically and constructs a JSON object with properties: version, name, description, and repository (if the field exists).
- Enhance the main function to detect the --version-details flag and call handleVersionDetails. This flag should take precedence over other flags when specified.

## Updates in Test File (tests/unit/main.test.js)
- Add tests to simulate the CLI invocation with the --version-details flag.
- Capture the console output and verify that it is valid JSON containing at least the keys: version, name, and description. Ensure that the version matches the one specified in package.json.

## Updates in README File (README.md)
- Update the Usage section to document the --version-details flag.
- Provide an example command:

  node src/lib/main.js --version-details

- Explain that this flag outputs detailed version metadata in JSON format, helping users obtain richer version information.

## Updates in Dependencies File (package.json)
- No changes are needed in the dependencies file as the current modules support this functionality.

This feature improves user experience by offering detailed version information which can be useful for debugging, ensuring compatibility, and validating deployments. It aligns with the mission to provide clear and accessible diagnostic commands within the CLI tool.