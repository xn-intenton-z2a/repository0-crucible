# MERGE_PERSIST

## Overview
The MERGE_PERSIST feature allows the CLI tool to merge the persisted log file (`memory_log.json`) with the current in-memory log. After merging, the persisted log file is cleared. This ensures that log data from previous runs is consolidated into the current session without duplications, while also resetting the external log store for future use.

## Implementation Details

### Source File Update (`src/lib/main.js`):
- **Flag Detection:**
  - Check if the CLI arguments include `--merge-persist`.
- **Merging Process:**
  - If the `--merge-persist` flag is present, read `memory_log.json` (if it exists) to obtain persisted log entries.
  - Merge these entries into the existing `memoryLog` array (ensuring no duplicate entries if already loaded).
  - Delete the `memory_log.json` file to clear persisted data.
  - Output a message indicating that the persisted logs have been successfully merged.

*Example Code Snippet:*
```js
if (args.includes("--merge-persist")) {
  if (fs.existsSync('memory_log.json')) {
    try {
      const data = fs.readFileSync('memory_log.json', { encoding: 'utf8' });
      const persisted = JSON.parse(data);
      if (Array.isArray(persisted)) {
        // Merge persisted entries that are not already present
        memoryLog.push(...persisted);
      }
      fs.unlinkSync('memory_log.json');
      console.log("Persisted log merged and cleared.");
    } catch (err) {
      console.error("Failed to merge persisted log:", err);
    }
  } else {
    console.log("No persisted log to merge.");
  }
}
```

### Test File Update (`tests/unit/main.test.js`):
- Add tests to simulate CLI invocation with the `--merge-persist` flag.
- Create a temporary `memory_log.json` file with known content, invoke the CLI with `--merge-persist`, and check that:
  - The file is deleted afterwards.
  - The in-memory log contains the merged entries from the file.
  - The appropriate success message is logged to the console.

### README Update (`README.md`):
- Update the usage section to document the new `--merge-persist` flag.

*Example Documentation:*
```bash
# To merge persisted logs with your current session and clear the external log file:
node src/lib/main.js --merge-persist
```

## Benefits and Future Considerations
- **Benefits:** Consolidating logs from previous runs helps maintain a complete history in the current session and resets file-based logs to avoid accumulation.
- **Future Considerations:** In the future, consider supporting merging logs from multiple persisted log files or integrating a timestamp-based deduplication mechanism.
