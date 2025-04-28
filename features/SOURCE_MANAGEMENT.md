# Description
Consolidate full lifecycle management of public and custom data sources including listing, adding, removing, updating, and refreshing. Ensure consistent behavior and output across the programmatic API, the command line interface, and the HTTP server.

# Implementation
- listSources reads or initializes the data-sources configuration and returns a merged list of default and custom entries
- addSource validates name and URL, prevents duplicates, writes updated custom list to configuration, and returns merged sources
- removeSource filters out entries by name or URL, writes updated list on change, and returns merged sources
- updateSource locates an existing entry by name or URL, validates updates, writes back the updated list, and returns merged sources
- refreshSources ensures the data directory exists, loads the merged sources, fetches JSON from each source URL, handles errors by logging, writes each fetched document to data/<slug>.json with pretty formatting, logs each write, and returns summary of count and files

# CLI Support
- Option --list-sources invokes listSources and prints the merged array as pretty JSON
- Option --add-source name url invokes addSource and prints the merged array as pretty JSON or prints an error message for invalid input
- Option --remove-source identifier invokes removeSource and prints the merged array as pretty JSON
- Option --update-source identifier newName newUrl invokes updateSource and prints the merged array as pretty JSON or prints an error message for invalid input
- Option --refresh invokes refreshSources, logs each written file line by line to console, and prints a summary line "Fetched X sources into data/"

# HTTP Endpoints
- GET /sources responds with status 200 and application JSON body of merged default and custom sources
- POST /sources expects a JSON body with fields name and url, invokes addSource, responds with status 201 and updated list or 400 with a plain text error
- DELETE /sources/:identifier invokes removeSource and responds with status 200 and updated list as JSON
- PUT /sources/:identifier expects a JSON body with fields name and url, invokes updateSource, responds with status 200 and updated list or 400 with a plain text error
- GET /refresh responds with status 200 and text plain, overrides console log to stream each line emitted by refreshSources, restores the logger, and ends the response when complete

# Testing
- Unit tests for each API function listSources, addSource, removeSource, updateSource, and refreshSources with fs and fetch mocks, verifying directory creation, file writes, error handling, return summaries, and console logs
- CLI tests for each flag including missing or invalid parameters and success scenarios, verifying invocation of underlying functions and console output
- HTTP integration tests for GET endpoints /sources and /refresh and methods POST, DELETE, PUT on /sources, verifying status codes, content types, response bodies, error cases, and that configuration file is created or updated

# Documentation Updates
Update docs/FEATURES.md under Sources Management to include the refresh flag and HTTP endpoint, update docs/USAGE.md and README.md to provide example CLI invocation for refresh, sample output, and example HTTP request to GET /refresh