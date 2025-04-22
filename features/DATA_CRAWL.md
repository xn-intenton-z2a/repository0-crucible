# DATA_CRAWL Feature

This feature provides the functionality to simulate the crawling of public data sources. When a user invokes the CLI with the --crawl flag, the tool executes a simulated data crawl via the crawlData function. This behavior aligns with the mission of owl-builder, which includes crawling open public data sources to generate JSON files.

## Updates in Source File (src/lib/main.js)
- Recognize the --crawl flag in the main function and call the crawlData function.
- The crawlData function will log a message stating that it is crawling data from public sources. In a real-world scenario, this function can be extended to fetch data from public APIs or websites.
- Ensure that other flags like --help and --version continue to work as expected.

## Updates in Test File (tests/unit/main.test.js)
- Add a test case to simulate the invocation of the CLI with the --crawl flag.
- Capture the console output and assert that the output includes the expected message indicating the crawl behavior.

## Updates in README File (README.md)
- Update the Usage section to include the new --crawl flag and describe its purpose.
- Provide an example command:
    node src/lib/main.js --crawl
- Explain that this command simulates the process of crawling data sources and is a demonstration of how owl-builder can be extended for real-world data processing.

## Updates in Dependencies File (package.json)
- No changes to dependencies are required, as the current setup supports this functionality.

This feature is localized within modifications of the source file, tests, and documentation. It reinforces a key part of the mission by demonstrating how public data crawling can be initiated and verified by users.