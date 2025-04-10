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

// Configurable flag for handling 'NaN'
let useNativeNanConfig = false;

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
 * @param {Function} handler
 */
export function registerNaNHandler(handler) {
  customNaNHandler = handler;
}

/**
 * Converts a CLI argument into its appropriate type.
 *
 * Special Handling:
 * - JSON Conversion: If the argument starts with '{' or '[', it will be parsed as JSON if valid.
 * - Any case variation of the string 'NaN' is detected after trimming. If a custom NaN handler is registered, it will be used; otherwise,
 *   numeric NaN is returned when enabled; else the string is preserved for clarity.
 * - Boolean strings (case-insensitive) are converted to booleans.
 * - ISO 8601 formatted date strings are converted to Date objects if valid.
 * - Additionally, the input is trimmed to ensure robust conversion.
 * - Numeric strings are converted to numbers when applicable.
 *
 * @param {string} arg - The CLI argument
 * @returns {string | boolean | number | Date | Object | Array} - The converted argument
 */
function convertArg(arg) {
  const trimmed = arg.trim();

  // Attempt JSON conversion if input looks like JSON object or array
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const jsonParsed = JSON.parse(trimmed);
      return jsonParsed;
    } catch (e) {
      // If JSON.parse fails, fallback to other conversion methods
    }
  }

  // Special case for any case variation of "NaN":
  if (trimmed.toLowerCase() === "nan") {
    if (customNaNHandler && typeof customNaNHandler === 'function') {
      return customNaNHandler(trimmed);
    }
    return useNativeNanConfig ? NaN : trimmed;
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
 * @param {string[]} args - The CLI arguments
 */
export function main(args = []) {
  // Read configuration from .repositoryConfig.json if it exists
  let configNativeNan = false;
  try {
    if (fs.existsSync('.repositoryConfig.json')) {
      const configContent = fs.readFileSync('.repositoryConfig.json', { encoding: 'utf-8' });
      const config = JSON.parse(configContent);
      configNativeNan = config.nativeNan === true;
    }
  } catch (error) {
    // If reading/parsing fails, default to false
    configNativeNan = false;
  }

  // Determine native NaN conversion based on CLI flag, configuration file, or environment variable
  const nativeNanFlag = args.includes("--native-nan");
  useNativeNanConfig = nativeNanFlag || configNativeNan || process.env.NATIVE_NAN === "true";

  // Check if plugins should be used
  const usePlugins = args.includes("--use-plugins");
  
  // Remove the plugin and native-nan flags from args
  const filteredArgs = args.filter(arg => arg !== "--use-plugins" && arg !== "--native-nan");

  // Convert each argument using intelligent parsing
  const convertedArgs = filteredArgs.map(convertArg);
  let finalOutput = convertedArgs;

  if (usePlugins && getPlugins().length > 0) {
    finalOutput = executePlugins(convertedArgs);
  }

  // Output using multiple arguments to preserve non-JSON values like NaN
  console.log("Run with:", finalOutput);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
