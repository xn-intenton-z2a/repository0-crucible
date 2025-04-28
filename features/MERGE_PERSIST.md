# Description
Implement a utility that reads all JSON files in a project data directory merges their content into a single persisted JSON artifact and exposes this behavior via a programmatic API CLI command and HTTP endpoint

# Programmatic API
Export a function mergePersist accepting optional parameters dataDir default data and outFile default data/persisted.json
Ensure dataDir exists or create it. If missing log console.error error data directory not found and return object count zero file null without throwing
Read all files ending with .json in dataDir. For each file parse JSON. If top level value is array concatenate elements into a combined array. If it is object merge keys and array properties. On parse or structural errors log console.error skipping filename reason and continue
Write merged result to outFile creating parent directories with fs.mkdirSync recursive and using fs.writeFileSync with JSON stringify and two space indent
Log console.log written outFile then console.log Merged count files into outFile
Return object with count of files merged and file path

# CLI Support
Detect flag --merge-persist alias -m in main args
When invoked call mergePersist with default or provided dataDir and outFile print each log line via console.log and return without throwing errors

# HTTP Server Endpoints
Under serve mode handle GET /merge-persist respond with status 200 and header Content-Type text/plain
Override console.log to stream each message from mergePersist to HTTP response with newline. After completion restore original console.log and end response
Errors during merging still stream via console.log and yield HTTP 200 termination

# Testing
Unit tests for mergePersist should mock fs.existsSync fs.readdirSync fs.readFileSync fs.mkdirSync fs.writeFileSync and spies on console.log console.error
Test missing directory yields count zero and no throw
Test merging of array inputs object inputs and skipping invalid files
Verify write calls arguments and returned summary object
CLI tests spy on mergePersist verify invocation for --merge-persist and -m flags and ensure main returns without throwing
HTTP integration tests start server in serve mode on ephemeral port issue GET /merge-persist and verify status code 200 header content-type text/plain and response body contains streamed log lines and summary

# Documentation Updates
Update docs/FEATURES.md to describe merge-persist feature under source management or new section
Include CLI syntax HTTP endpoint programmatic signature example invocation and sample output
Update docs/USAGE.md and README.md to add section for merge-persist flag and HTTP GET /merge-persist with examples and expected output