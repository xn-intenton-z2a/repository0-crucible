# EMOTICON_OUTPUT Feature

# Overview
Enhance emoticon output to support loading custom emoticon sets from a YAML or JSON configuration file specified via a CLI option or environment variable. Default to built-in list remains available.

# Extended Configuration

Support specifying custom emoticon sets:
 - CLI option --config <path> to load a YAML or JSON file containing an array of emoticon strings.
 - Environment variable EMOTICONS_CONFIG pointing to a YAML or JSON file path.
CLI option takes precedence over environment variable.

# Behavior

Loading:
 When a configuration path is provided, validate that the file exists and contains a top-level array of strings. On invalid path or content, print an error message and exit with a nonzero status code.

Output modes (apply to configured or built-in list):
 - random: select a random emoticon from the configured list.
 - seeded: deterministic selection using --seed n modulo list length.
 - list: list all configured emoticons with zero-based indices.
 - json: output results in JSON format consistent with existing modes.

# CLI Options

--config <path>    Load custom emoticon list from YAML or JSON file.
--list             List all available emoticons with indices.
--seed <n>         Use a non-negative integer seed for deterministic selection.
--json             Output results in JSON format.
--interactive, -i  Start interactive REPL session.
--help, -h         Show help message and exit.
--version, -v      Print application version and exit.

# Implementation Details

In src/lib/main.js:
 - At the start of main, detect --config <path> or EMOTICONS_CONFIG in process.env.
 - Use js-yaml to parse YAML files or JSON.parse for JSON content.
 - On successful load, override the built-in EMOTICONS array with loaded list.
 - Refactor selection utilities (listFaces, randomFace, seededFace, emoticonJson) to operate on the dynamic list.
 - Ensure all existing behavior remains when no config is provided.
 - Add error handling for missing files or invalid formats.

# Tests

In tests/unit/main.test.js:
 - Mock file system and js-yaml to simulate loading a valid YAML config and verify that listFaces, randomFace, and seededFace use the custom list.
 - Test invalid file path or non-array content triggers error message and exit code 1.
 - Test environment variable EMOTICONS_CONFIG is respected when CLI option is absent.

# Documentation

Update README.md and docs/EMOTICON_OUTPUT.md:
 - Document the new --config option and EMOTICONS_CONFIG environment variable.
 - Provide examples loading YAML and JSON files, and resulting output in plain text and JSON modes.