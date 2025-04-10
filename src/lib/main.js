#!/usr/bin/env node

// NOTE: This file is maintained in part by an automated LLM-driven regeneration pipeline for repository0-crucible.
// The automated system updates this file based on defined CI/CD triggers and the contributing guidelines. Avoid manual changes that conflict with these protocols.

import { fileURLToPath } from "url";
import fs from "fs"; // Used for reading configuration file

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
 * Register a custom handler for converting 'NaN'.
 * The handler should be a function that accepts the original string and returns the desired conversion.
 * @param {Function|null} handler
 */
export function registerNaNHandler(handler) {
  customNaNHandler = handler;
}

/**
 * Determines if the provided string represents a variant of 'NaN'.
 * It normalizes Unicode variants and compares in a case-insensitive manner.
 * @param {string} str
 * @returns {boolean}
 */
function isNaNInput(str) {
  return str.trim().normalize("NFKC").toLowerCase() === "nan";
}

/**
 * Converts a CLI argument to its appropriate type.
 *
 * Special Handling includes:
 * - JSON Conversion: Strings that start with '{' or '[' are parsed as JSON when valid.
 * - Boolean values (case-insensitive) are converted to booleans.
 * - ISO 8601 date strings are converted to Date objects if valid.
 * - Numeric strings are converted to numbers when applicable.
 * - If none apply, the trimmed string is returned.
 *
 * @param {string} arg - The CLI argument
 * @returns {string|boolean|number|Date|Object|Array}
 */
function convertArg(arg) {
  const trimmed = arg.trim();

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      // Fall through to other conversion methods if JSON parsing fails
    }
  }

  const lower = trimmed.toLowerCase();
  if (lower === "true") return true;
  if (lower === "false") return false;

  const iso8601Regex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2}))?$/;
  if (iso8601Regex.test(trimmed)) {
    const date = new Date(trimmed);
    if (!isNaN(date.getTime())) return date;
  }

  const num = Number(trimmed);
  if (trimmed !== "" && !isNaN(num)) return num;

  return trimmed;
}

/**
 * Helper function to process 'NaN' conversion based on the current configuration and flags.
 * @param {string} str - The input string (assumed trimmed and validated as a NaN representation)
 * @returns {{converted: any, conversionMethod: string}}
 */
function processNaNConversion(str) {
  if (customNaNHandler && typeof customNaNHandler === "function") {
    if (useStrictNan) {
      console.info("Strict NaN mode active: using custom NaN handler.");
    }
    return { converted: customNaNHandler(str), conversionMethod: "custom" };
  } else if (useStrictNan) {
    throw new Error("Strict NaN mode error: encountered 'NaN' input without a custom handler.");
  } else if (useNativeNanConfig) {
    return { converted: NaN, conversionMethod: "native" };
  } else {
    return { converted: str, conversionMethod: "default" };
  }
}

/**
 * Main function for the CLI.
 * Processes CLI arguments using conversion logic and plugin integration.
 * Handles NaN conversion based on these rules:
 *   - Default: preserves NaN as a string.
 *   - --native-nan flag (or config/environment): converts variant of 'NaN' to numeric NaN.
 *   - --strict-nan flag (or config/environment): throws an error if a 'NaN' input is encountered without a custom handler.
 *   - --custom-nan flag: registers an inline custom handler to replace 'NaN' with the provided value.
 *   - --debug-nan flag: outputs detailed debug info for each NaN conversion instance, including the normalized input.
 *   - --trace-plugins flag: outputs detailed trace logs for each plugin transformation step when using plugins.
 *
 * Additionally, supports custom configuration via .repositoryConfig.json for setting customNan.
 *
 * @param {string[]} args - CLI arguments
 */
export function main(args = []) {
  // Load configuration from .repositoryConfig.json if available
  let configNativeNan = false;
  let configStrictNan = false;
  try {
    if (fs.existsSync(".repositoryConfig.json")) {
      const configContent = fs.readFileSync(".repositoryConfig.json", { encoding: "utf-8" });
      const config = JSON.parse(configContent);
      configNativeNan = config.nativeNan === true;
      configStrictNan = config.strictNan === true;
      if (config.customNan && typeof config.customNan === "string" && config.customNan.trim() !== "") {
        registerNaNHandler(() => config.customNan);
      }
    }
  } catch (error) {
    configNativeNan = false;
    configStrictNan = false;
  }

  // Determine whether to use native NaN handling
  const nativeNanFlag = args.includes("--native-nan");
  useNativeNanConfig = nativeNanFlag || configNativeNan || process.env.NATIVE_NAN === "true";

  // Determine strict NaN mode
  const strictNanFlag = args.includes("--strict-nan");
  useStrictNan = strictNanFlag || configStrictNan || process.env.STRICT_NAN === "true";

  // Check for debug flag
  const debugNanFlag = args.includes("--debug-nan");

  // Check for plugin trace flag
  const tracePluginsFlag = args.includes("--trace-plugins");

  // Handle inline custom NaN replacement via --custom-nan flag (overrides configuration if provided)
  const customNanIndex = args.indexOf("--custom-nan");
  if (customNanIndex !== -1) {
    if (args.length > customNanIndex + 1 && args[customNanIndex + 1].trim().normalize("NFKC").toLowerCase() !== "nan") {
      const customNanValue = args[customNanIndex + 1];
      registerNaNHandler(() => customNanValue);
    } else {
      throw new Error("--custom-nan flag provided without a replacement value.");
    }
  }

  // Filter out flags and their associated values
  const processedArgs = [];
  for (let i = 0; i < args.length; i++) {
    if (["--use-plugins", "--native-nan", "--strict-nan", "--debug-nan", "--trace-plugins"].includes(args[i])) continue;
    if (args[i] === "--custom-nan") { i++; continue; }
    processedArgs.push(args[i]);
  }

  // Convert each argument with intelligent parsing and special handling for variants of 'NaN'
  const convertedArgs = [];
  const debugDetails = [];
  for (let i = 0; i < processedArgs.length; i++) {
    const arg = processedArgs[i];
    const trimmed = arg.trim();
    if (isNaNInput(trimmed)) {
      const normalized = trimmed.normalize("NFKC");
      const { converted, conversionMethod } = processNaNConversion(trimmed);
      convertedArgs.push(converted);
      if (debugNanFlag) {
        debugDetails.push({ raw: arg, normalized, converted, conversionMethod });
      }
    } else {
      convertedArgs.push(convertArg(arg));
    }
  }

  // Process through plugins if requested
  let finalData = convertedArgs;
  let pluginTrace;
  if (args.includes("--use-plugins") && getPlugins().length > 0) {
    if (tracePluginsFlag) {
      pluginTrace = [];
      let intermediate = convertedArgs;
      getPlugins().forEach((plugin, index) => {
        intermediate = plugin(intermediate);
        pluginTrace.push({ pluginIndex: index, result: intermediate });
      });
      finalData = intermediate;
    } else {
      finalData = executePlugins(convertedArgs);
    }
  }

  const finalLog = { message: "Run with", data: finalData };
  if (debugNanFlag) {
    finalLog.debugNan = debugDetails;
  }
  if (tracePluginsFlag && pluginTrace) {
    finalLog.pluginTrace = pluginTrace;
  }

  // Output structured JSON with custom serialization for special numeric values
  console.log(JSON.stringify(finalLog, (key, value) => {
    if (typeof value === "number") {
      if (Number.isNaN(value)) return "___native_NaN___";
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
