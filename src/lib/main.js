#!/usr/bin/env node
import { fileURLToPath } from "url";

// Plugin Manager Implementation integrated into main.js
const plugins = [];

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
 * Converts a CLI argument into its appropriate type.
 *
 * Special Handling:
 * - The literal string 'NaN' is preserved as a string by default, but can be converted to numeric NaN
 *   if the --native-nan flag is provided or the environment variable NATIVE_NAN is set to "true".
 * - Boolean strings (case-insensitive) are converted to booleans.
 * - ISO 8601 formatted date strings are converted to Date objects if valid.
 * - Otherwise, numeric strings are converted to numbers and non-numeric strings remain unchanged.
 *
 * @param {string} arg - The CLI argument
 * @returns {string | boolean | number | Date} - The converted argument
 */
function convertArg(arg) {
  // Handle the special case for "NaN"
  if (arg === "NaN") {
    if (useNativeNanConfig) {
      return NaN;
    }
    return "NaN";
  }

  // Convert boolean strings (case-insensitive) to booleans
  if (arg.toLowerCase() === "true") return true;
  if (arg.toLowerCase() === "false") return false;

  // Check for ISO 8601 formatted date strings
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/;
  if (iso8601Regex.test(arg)) {
    const date = new Date(arg);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // Attempt to convert to a number if applicable
  const num = Number(arg);
  if (arg.trim() !== "" && !isNaN(num)) return num;

  // Fallback: return the original string
  return arg;
}

/**
 * Main function for the CLI.
 * If the flag --use-plugins is provided, the function will process the arguments through registered plugins if any exist.
 * Additionally, if the flag --native-nan is provided or process.env.NATIVE_NAN is true, 'NaN' is converted to numeric NaN.
 *
 * @param {string[]} args - The CLI arguments
 */
export function main(args) {
  // Check if plugins should be used
  const usePlugins = args.includes("--use-plugins");
  // Check if native NaN conversion is requested via flag or environment variable
  const nativeNanFlag = args.includes("--native-nan");
  useNativeNanConfig = nativeNanFlag || process.env.NATIVE_NAN === "true";
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
