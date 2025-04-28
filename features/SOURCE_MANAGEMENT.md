# Description
Unified management of public and custom data sources and raw JSON captures including refreshing sources and merging persisted data.

# Implementation
1 listSources addSource removeSource and updateSource remain unchanged
2 refreshSources({ dataDir } = {})
   - Determine dataDir default data and ensure directory exists or create
   - Load all sources via listSources
   - For each source perform HTTP get to source url
     - On success parse JSON and write to dataDir slash slug json with two space indent
     - On error log console error with source name and message and continue
   - Return object with count number of files written and files list
3 mergePersist({ dataDir, outFile } = {})
   - Use dataDir default data and outFile default data slash persisted json
   - Ensure dataDir exists or log console error and return count zero and file null
   - Read all json files in dataDir parse content
     - If content is array concatenate all elements
     - If object merge top level keys and array properties
     - On parse or structure error log console error skipping filename and reason
   - Write merged result to outFile creating parent directories as needed with two space indent
   - Return object with count number of files merged and file path

# CLI Support
- Option --refresh invoke refreshSources and print summary object as JSON
- Option --merge-persist or -m invoke mergePersist log each console log line and summary without throwing errors

# HTTP Server Endpoints
- GET /refresh stream console log output from refreshSources line by line end response with status 200 and content type text slash plain
- GET /merge-persist stream console log output from mergePersist line by line end response with status 200 and content type text slash plain

# Testing
- Unit tests for refreshSources mocking fs mkdirSync and fetch writeFileSync verifying file writes error logs and returned summary
- Unit tests for mergePersist mocking fs existsSync readdirSync readFileSync writeFileSync and console spies verifying merge logic skip invalid files and summary object
- CLI tests for --refresh and --merge-persist flags spy on refreshSources and mergePersist verifying invocation and return behavior
- HTTP integration tests start server issue GET /refresh and GET /merge-persist verify status 200 content type text slash plain and response body includes streamed lines and summary

# Documentation Updates
- Update docs slash FEATURES dot md under Source Management to include refresh and merge-persist flags and HTTP endpoints
- Update docs slash USAGE dot md and README dot md to add examples and expected output for refresh and merge-persist commands and endpoints