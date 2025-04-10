#!/usr/bin/env node
import { fileURLToPath } from "url";

// Plugin Manager Implementation integrated into main.js
const plugins = [];

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
 * - The string 'NaN' is intentionally preserved as a string to serve as a special-case marker. 
 *   This is distinct from numeric conversion; all other numeric strings are converted to numbers.
 * - Boolean strings (case-insensitive) are converted to booleans.
 * - ISO 8601 formatted date strings are converted to Date objects if valid.
 * - Otherwise, the argument is returned as-is.
 *
 * @param {string} arg - The CLI argument
 * @returns {string | boolean | number | Date} - The converted argument
 */
function convertArg(arg) {
  // Explicitly handle the special case: literal "NaN" should be kept as a string.
  if (arg === "NaN") {
    return "NaN";
  }

  // Convert boolean strings (case-insensitive) to booleans
  if (arg.toLowerCase() === "true") return true;
  if (arg.toLowerCase() === "false") return false;

  // Check for ISO 8601 formatted date strings
  // This regex matches dates in the format YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS with optional milliseconds and timezone
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
 * If no plugins are registered, the arguments remain unchanged.
 *
 * @param {string[]} args - The CLI arguments
 */
export function main(args) {
  // Check if plugins should be used
  const usePlugins = args.includes("--use-plugins");
  // Remove the plugin flag from args
  const filteredArgs = args.filter(arg => arg !== "--use-plugins");

  // Convert each argument using intelligent parsing
  const convertedArgs = filteredArgs.map(convertArg);
  let finalOutput = convertedArgs;

  if (usePlugins && getPlugins().length > 0) {
    finalOutput = executePlugins(convertedArgs);
  }

  console.log(`Run with: ${JSON.stringify(finalOutput)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
