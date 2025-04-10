#!/usr/bin/env node

// NOTE: This file is maintained in part by an automated LLM-driven regeneration pipeline for repository0-crucible.
// The LLM is capable of processing over 100,000 tokens. It automatically updates this file based on defined CI/CD triggers.
// Contributors should avoid making manual changes that conflict with the automated regeneration guidelines provided in the README and CONTRIBUTING documents.

import { fileURLToPath } from "url";
import fs from "fs"; // Added to read configuration file

// Plugin Manager Implementation integrated into main.js for repository0-crucible
const plugins = [];

// Global variable for custom NaN handler
let customNaNHandler = null;

// Configurable flags for handling 'NaN'
let useNativeNanConfig = false;
let useStrictNan = false;

/**
 * Register a new plugin
 * @param {Function} plugin - A plugin function to register
 */
export function registerPlugin(plugin) {
  plugins.push(plugin);
}

/**
 * Retrieve the list of registered plugins
 * @returns {Function[]} - Array of plugin functions
 */
export function getPlugins() {
  return plugins;
}

/**
 * Execute all registered plugins sequentially
 * @param {Array} data - The data to process
 * @returns {Array} - The processed data
 */
export function executePlugins(data) {
  return plugins.reduce((currentData, plugin) => plugin(currentData), data);
}

/**
 * Register a custom handler to override default conversion of 'NaN'.
 * The handler should be a function that accepts the original string and returns the desired value.
 * @param {Function|null} handler
 */
export function registerNaNHandler(handler) {
  customNaNHandler = handler;
}

/**
 * Converts a CLI argument into its appropriate type.
 *
 * Special Handling:
 * - JSON Conversion: If the argument starts with '{' or '[', it will be parsed as JSON if valid.
 * - Boolean strings (case-insensitive) are converted to booleans.
 * - ISO 8601 formatted date strings are converted to Date objects if valid.
 * - Numeric strings are converted to numbers when applicable.
 * - Fallback: returns a trimmed string if no other conversion applies.
 *
 * Note: 'NaN' handling is now managed separately in the main function to provide enhanced debug details.
 *
 * @param {string} arg - The CLI argument
 * @returns {string | boolean | number | Date | Object | Array} - The converted argument
 */
function convertArg(arg) {
  const trimmed = arg.trim();

  // Attempt JSON conversion if input looks like JSON object or array
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const jsonParsed = JSON.parse(trimmed);
      return jsonParsed;
    } catch (e) {
      // If JSON.parse fails, fallback to other conversion methods
    }
  }

  // Convert boolean strings (case-insensitive) to booleans
  const lower = trimmed.toLowerCase();
  if (lower === "true") return true;
  if (lower === "false") return false;

  // Check for ISO 8601 formatted date strings
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2}))?$/;
  if (iso8601Regex.test(trimmed)) {
    const date = new Date(trimmed);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // Attempt to convert to a number if applicable
  const num = Number(trimmed);
  if (trimmed !== "" && !isNaN(num)) return num;

  // Fallback: return the trimmed string
  return trimmed;
}

/**
 * Main function for the CLI.
 * If the flag --use-plugins is provided, the function will process the arguments
 * through registered plugins if any exist.
 * Additionally, if the flag --native-nan is provided, the configuration file (.repositoryConfig.json)
 * sets nativeNan to true, or process.env.NATIVE_NAN is "true",
 * any variation of 'NaN' is converted to numeric NaN by default unless overridden by a custom handler.
 * 
 * The experimental --strict-nan flag (or environment variable STRICT_NAN=true or strictNan:true in config) enforces strict validation for NaN inputs.
 * In strict mode, if a NaN input is encountered without a custom handler, an error is thrown.
 * If a custom handler is registered, it is used and logs an informational message.
 * 
 * A new debug flag --debug-nan has been added to output additional details about the NaN conversion process when enabled.
 * In debug mode, for each occurrence of a NaN conversion, the original input, its converted value, and the conversion method
 * (native, custom, or default) are logged under a debugNan property.
 * 
 * A new flag --custom-nan <value> has been added to allow specifying a replacement value for any variant of 'NaN'.
 * When provided, this inline custom NaN handler will override default behavior.
 *
 * @param {string[]} args - The CLI arguments
 */
export function main(args = []) {
  // Read configuration from .repositoryConfig.json if it exists
  let configNativeNan = false;
  let configStrictNan = false;
  try {
    if (fs.existsSync(".repositoryConfig.json")) {
      const configContent = fs.readFileSync(".repositoryConfig.json", { encoding: "utf-8" });
      const config = JSON.parse(configContent);
      configNativeNan = config.nativeNan === true;
      configStrictNan = config.strictNan === true;
    }
  } catch (error) {
    // If reading/parsing fails, default to false
    configNativeNan = false;
    configStrictNan = false;
  }

  // Determine native NaN conversion based on CLI flag, configuration file, or environment variable
  const nativeNanFlag = args.includes("--native-nan");
  useNativeNanConfig = nativeNanFlag || configNativeNan || process.env.NATIVE_NAN === "true";

  // Determine strict NaN mode based on CLI flag, configuration file or environment variable
  const strictNanFlag = args.includes("--strict-nan");
  useStrictNan = strictNanFlag || process.env.STRICT_NAN === "true" || configStrictNan;

  // Determine if debug-nan mode is active
  const debugNanFlag = args.includes("--debug-nan");

  // Handle --custom-nan flag to register inline custom NaN handler
  let customNanValue = null;
  const customNanIndex = args.indexOf("--custom-nan");
  if (customNanIndex !== -1) {
    if (args.length > customNanIndex + 1 && args[customNanIndex + 1].trim().toLowerCase() !== "nan") {
      customNanValue = args[customNanIndex + 1];
      registerNaNHandler(() => customNanValue);
    } else {
      throw new Error("--custom-nan flag provided without a replacement value.");
    }
  }

  // Process the arguments by filtering out known flags and their associated values
  const processedArgs = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--use-plugins" || args[i] === "--native-nan" || args[i] === "--strict-nan" || args[i] === "--debug-nan") {
      continue;
    }
    if (args[i] === "--custom-nan") {
      i++; // Skip the next element as it is the value for --custom-nan
      continue;
    }
    processedArgs.push(args[i]);
  }

  // Convert each argument using intelligent parsing, with special handling for 'NaN' to capture debug info
  let convertedArgs = [];
  let debugDetails = [];
  for (let i = 0; i < processedArgs.length; i++) {
    const arg = processedArgs[i];
    const trimmed = arg.trim();
    if (trimmed.toLowerCase() === "nan") {
      let convMethod;
      let converted;
      if (customNaNHandler && typeof customNaNHandler === "function") {
        convMethod = "custom";
        converted = customNaNHandler(trimmed);
        if (useStrictNan) {
          console.info("Strict NaN mode active: using custom NaN handler.");
        }
      } else if (useStrictNan) {
        throw new Error("Strict NaN mode error: encountered 'NaN' input without a custom handler.");
      } else if (useNativeNanConfig) {
        convMethod = "native";
        converted = NaN;
      } else {
        convMethod = "default";
        converted = trimmed;
      }
      convertedArgs.push(converted);
      if (debugNanFlag) {
        debugDetails.push({ raw: arg, converted, conversionMethod: convMethod });
      }
    } else {
      const converted = convertArg(arg);
      convertedArgs.push(converted);
    }
  }

  if (args.includes("--use-plugins") && getPlugins().length > 0) {
    convertedArgs = executePlugins(convertedArgs);
  }

  // Prepare final log object
  let finalLog = { message: "Run with", data: convertedArgs };
  if (debugNanFlag) {
    finalLog.debugNan = debugDetails;
  }

  // Output structured JSON log for improved integration with monitoring systems
  // Use a custom replacer to properly serialize special numeric values such as NaN, Infinity and -Infinity.
  console.log(JSON.stringify(finalLog, (key, value) => {
    if (typeof value === "number") {
      if (isNaN(value)) return "___native_NaN___";
      if (value === Infinity) return "___Infinity___";
      if (value === -Infinity) return "___-Infinity___";
    }
    return value;
  }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
