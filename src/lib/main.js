/* File: src/lib/pluginManager.js */

// Plugin Manager for registering and executing plugins
// A plugin is expected to be a function that takes input data and returns transformed data

let plugins = [];

/**
 * Registers a new plugin. The plugin must be a function.
 * @param {function} plugin - The plugin function to register
 */
export function registerPlugin(plugin) {
  if (typeof plugin !== 'function') {
    throw new Error('Plugin must be a function');
  }
  plugins.push(plugin);
}

/**
 * Retrieves the list of registered plugins.
 * @returns {function[]} - Array of plugin functions
 */
export function getPlugins() {
  return plugins;
}

/**
 * Executes all registered plugins on the provided data sequentially.
 * @param {*} data - The data to process
 * @returns {*} - The transformed data after all plugins have been applied
 */
export function executePlugins(data) {
  return plugins.reduce((result, plugin) => plugin(result), data);
}

/* End of src/lib/pluginManager.js */


/* File: src/lib/main.js */
#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import * as pluginManager from "./pluginManager.js";

/**
 * Converts a CLI argument into its appropriate type.
 *
 * Special Handling:
 * - The string 'NaN' is intentionally kept as a string to serve as a special-case marker.
 * - Boolean strings (case-insensitive) are converted to booleans.
 * - Numeric strings are converted to numbers if valid.
 * - Otherwise, the argument is returned as-is.
 *
 * @param {string} arg - The CLI argument
 * @returns {string | boolean | number} - The converted argument
 */
function convertArg(arg) {
  // Special case: if the argument is exactly 'NaN', preserve it as a string to indicate a special marker.
  if (arg === "NaN") return arg;
  
  // Convert boolean strings (case-insensitive) to booleans
  if (arg.toLowerCase() === "true") return true;
  if (arg.toLowerCase() === "false") return false;

  // Attempt to convert to a number if applicable
  const num = Number(arg);
  // If the argument is not empty and conversion does not yield NaN, return the number
  if (arg.trim() !== "" && !isNaN(num)) return num;

  // Fallback: return the original string
  return arg;
}

/**
 * Main function for the CLI.
 * If the flag --use-plugins is provided, the function will process the arguments through registered plugins.
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

  if (usePlugins) {
    // For demonstration, if no plugin has been registered, register a dummy plugin that doubles numeric values
    if (pluginManager.getPlugins().length === 0) {
      pluginManager.registerPlugin(data => data.map(item => typeof item === 'number' ? item * 2 : item));
    }
    finalOutput = pluginManager.executePlugins(convertedArgs);
  }

  console.log(`Run with: ${JSON.stringify(finalOutput)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

/* End of src/lib/main.js */
