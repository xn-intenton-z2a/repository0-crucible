# Overview
Add end to end tests for CLI chart generation using the existing test:e2e script to verify correct PNG output from the chart flag.
# Implementation
1. Create tests/e2e/cli.test.js
2. Import a process execution helper such as execa or child process spawn to run node src/lib/main.js with arguments --digits 3 and --chart out.png
3. After the CLI process completes read the file out.png via fs and assert its first bytes match the PNG signature (89 50 4E 47)
4. Remove the temporary file at the end of the test to clean up
# Testing
Use npm run test:e2e to execute the new end to end tests. Ensure the test suite confirms the CLI exits with code zero, the chart file is created, and the buffer begins with the PNG header bytes.
# Documentation
Update docs/USAGE.md to include the end to end test command example. Update README.md under the Testing section to describe running the CLI e2e tests.