#!/usr/bin/env node

// NOTE: This file is maintained in part by an automated LLM-driven regeneration pipeline for repository0-crucible.
// The automated system updates this file based on defined CI/CD triggers and the contributing guidelines. Avoid manual changes that conflict with these protocols.

import { fileURLToPath } from "url";
import fs from "fs";

// Plugin Manager Implementation integrated into main.js for repository0-crucible
const plugins = [];

// Global variable for custom NaN handler
let customNaNHandler = null;

// Global configuration flags for handling 'NaN'
let useNativeNanConfig = false;
let useStrictNan = false;

// Configuration file watcher
let configWatcher = null;

/**
 * Normalize a string by trimming and applying Unicode Normalization Form KC (NFKC).
 * @param {string} value
 * @returns {string}
 */
function normalizeValue(value) {
  return value.trim().normalize("NFKC");
}

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
 * The handler can be synchronous or asynchronous. If asynchronous, it should return a Promise.
 * @param {Function|null} handler
 */
export function registerNaNHandler(handler) {
  customNaNHandler = handler;
}

/**
 * Determines if the provided string represents a variant of 'NaN'.
 * It standardizes the input by using normalizeValue and comparing in a case-insensitive manner.
 * Supports extended Unicode variants such as 'ＮａＮ'.
 *
 * @param {string} str
 * @returns {boolean}
 */
function isNaNInput(str) {
  return normalizeValue(str).toLowerCase() === "nan";
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
 * Uses normalized input via normalizeValue for decisions.
 *
 * Updated Logic:
 * - Verifies if the normalized input equals 'nan'.
 * - If a custom handler is registered, it uses the handler and, in strict mode, logs diagnostic info.
 *   Supports both synchronous and asynchronous custom handlers.
 * - In strict mode without a custom handler, throws an error with actionable guidance.
 * - If native mode is active, returns numeric NaN.
 * - Otherwise, returns the original input string.
 *
 * @param {string} originalStr - The original input string
 * @returns {Promise<{converted: any, conversionMethod: string}>}
 */
async function processNaNConversion(originalStr) {
  const normalizedInput = normalizeValue(originalStr);
  if (normalizedInput.toLowerCase() !== "nan") {
    return { converted: originalStr, conversionMethod: "default" };
  }

  if (customNaNHandler && typeof customNaNHandler === "function") {
    if (useStrictNan) {
      console.info("Strict NaN mode active: using custom NaN handler.");
    }
    try {
      let handledValue = customNaNHandler(normalizedInput);
      if (handledValue && typeof handledValue.then === "function") {
        handledValue = await handledValue;
      }
      return { converted: handledValue, conversionMethod: "custom" };
    } catch (e) {
      throw new Error(`Error in custom NaN handler: ${e.message}`);
    }
  } else if (useStrictNan) {
    throw new Error(`Strict NaN mode error: encountered 'NaN' input without a registered custom handler. To resolve this, please register a custom NaN handler using the '--custom-nan <value>' flag, update your .repositoryConfig.json with a valid "customNan" value, or set the CUSTOM_NAN environment variable. Input was: '${originalStr}'`);
  } else if (useNativeNanConfig) {
    return { converted: NaN, conversionMethod: "native" };
  } else {
    return { converted: originalStr, conversionMethod: "default" };
  }
}

/**
 * Resolves the effective NaN handling configuration based on a defined precedence:
 * 1. CLI flags
 * 2. Repository configuration file (.repositoryConfig.json)
 * 3. Environment variables
 * 4. Default behavior
 *
 * @param {string[]} args - The CLI arguments
 * @returns {object} - The resolved configuration
 */
function resolveNaNConfig(args) {
  let effectiveNativeNan = false,
    effectiveStrictNan = false,
    effectiveCustomNan = null;

  // CLI flags take highest precedence
  if (args.includes("--native-nan")) {
    effectiveNativeNan = true;
  }
  if (args.includes("--strict-nan")) {
    effectiveStrictNan = true;
  }
  const customIndex = args.indexOf("--custom-nan");
  if (customIndex !== -1) {
    if (
      args.length > customIndex + 1 &&
      normalizeValue(args[customIndex + 1]).toLowerCase() !== "nan"
    ) {
      effectiveCustomNan = args[customIndex + 1];
    } else {
      throw new Error("The --custom-nan flag requires a non-'NaN' replacement value immediately following the flag.");
    }
  }

  // Repository configuration file
  let repoConfig = {};
  if (fs.existsSync(".repositoryConfig.json")) {
    try {
      repoConfig = JSON.parse(fs.readFileSync(".repositoryConfig.json", { encoding: "utf-8" }));
    } catch (error) {
      repoConfig = {};
    }
  }
  if (!effectiveNativeNan && repoConfig.nativeNan === true) {
    effectiveNativeNan = true;
  }
  if (!effectiveStrictNan && repoConfig.strictNan === true) {
    effectiveStrictNan = true;
  }
  if (
    effectiveCustomNan === null &&
    typeof repoConfig.customNan === "string" &&
    normalizeValue(repoConfig.customNan).toLowerCase() !== "nan"
  ) {
    effectiveCustomNan = repoConfig.customNan;
  }

  // Environment variables
  if (!effectiveNativeNan && process.env.NATIVE_NAN === "true") {
    effectiveNativeNan = true;
  }
  if (!effectiveStrictNan && process.env.STRICT_NAN === "true") {
    effectiveStrictNan = true;
  }
  if (
    effectiveCustomNan === null &&
    process.env.CUSTOM_NAN &&
    normalizeValue(process.env.CUSTOM_NAN).toLowerCase() !== "nan"
  ) {
    effectiveCustomNan = process.env.CUSTOM_NAN;
  }

  return { effectiveNativeNan, effectiveStrictNan, effectiveCustomNan };
}

/**
 * Dynamically updates the global NaN configuration from repository config and environment variables.
 * This enables the tool to refresh its configuration at runtime without a restart.
 */
function updateGlobalNaNConfig() {
  const { effectiveNativeNan, effectiveStrictNan, effectiveCustomNan } = resolveNaNConfig([]);
  useNativeNanConfig = effectiveNativeNan;
  useStrictNan = effectiveStrictNan;
  if (effectiveCustomNan !== null && effectiveCustomNan !== undefined) {
    registerNaNHandler(() => effectiveCustomNan);
  } else {
    registerNaNHandler(null);
  }
  console.info("Dynamic configuration refresh applied", { effectiveNativeNan, effectiveStrictNan, effectiveCustomNan });
}

/**
 * Starts a watcher on .repositoryConfig.json to dynamically refresh NaN configuration when changes occur.
 */
function startConfigWatcher() {
  // Ensure the configuration file exists. Even if existsSync is stubbed to return true, verify actual access.
  try {
    fs.accessSync(".repositoryConfig.json", fs.constants.F_OK);
  } catch (err) {
    fs.writeFileSync(".repositoryConfig.json", "{}");
  }
  try {
    configWatcher = fs.watch(".repositoryConfig.json", (eventType) => {
      if (eventType === "change") {
        updateGlobalNaNConfig();
      }
    });
    console.info("Started configuration file watcher for dynamic configuration refresh.");
  } catch (err) {
    console.info("Config watcher could not be started: " + err.message);
  }
}

/**
 * Main function for the CLI.
 * Processes CLI arguments using conversion logic and plugin integration.
 * Handles NaN conversion with prioritized configuration from CLI, configuration file, environment variables, and supports dynamic refresh.
 *
 * @param {string[]} args - CLI arguments
 */
export async function main(args = []) {
  // Reset configuration flags for each run.
  useNativeNanConfig = false;
  useStrictNan = false;
  const preservedCustomHandler = customNaNHandler;

  const { effectiveNativeNan, effectiveStrictNan, effectiveCustomNan } = resolveNaNConfig(args || []);
  useNativeNanConfig = effectiveNativeNan;
  useStrictNan = effectiveStrictNan;

  if (args.includes("--custom-nan")) {
    const customIndex = args.indexOf("--custom-nan");
    if (args.length > customIndex + 1 && normalizeValue(args[customIndex + 1]).toLowerCase() !== "nan") {
      registerNaNHandler(() => args[customIndex + 1]);
    } else {
      throw new Error("The --custom-nan flag requires a non-'NaN' replacement value immediately following the flag.");
    }
  } else if (preservedCustomHandler && typeof preservedCustomHandler === "function") {
    registerNaNHandler(preservedCustomHandler);
  } else if (effectiveCustomNan !== null && effectiveCustomNan !== undefined) {
    registerNaNHandler(() => effectiveCustomNan);
  } else {
    registerNaNHandler(null);
  }

  // If refresh-config flag is provided, update configuration dynamically
  if (args.includes("--refresh-config")) {
    updateGlobalNaNConfig();
  }

  // Dump configuration if requested
  if (args.includes("--dump-config")) {
    const configDump = {
      nativeNan: useNativeNanConfig,
      strictNan: useStrictNan,
      customNan: customNaNHandler ? customNaNHandler() : null,
      plugins: getPlugins().map(fn => fn.name || "anonymous"),
    };
    console.log(JSON.stringify(configDump));
    return;
  }

  // If serving mode is enabled, start configuration watcher for dynamic updates
  if (args.includes("--serve")) {
    if (!configWatcher) {
      startConfigWatcher();
    }
  }

  // Remove configuration flags from arguments before processing
  const processedArgs = [];
  for (let i = 0; i < args.length; i++) {
    if (["--use-plugins", "--native-nan", "--strict-nan", "--debug-nan", "--trace-plugins", "--dump-config", "--serve", "--refresh-config"].includes(args[i])) continue;
    if (args[i] === "--custom-nan") { i++; continue; }
    processedArgs.push(args[i]);
  }

  const convertedArgs = [];
  const debugDetails = [];
  const debugNanFlag = args.includes("--debug-nan");
  for (let i = 0; i < processedArgs.length; i++) {
    const arg = processedArgs[i];
    const normalizedArg = normalizeValue(arg);
    if (normalizedArg.toLowerCase() === "nan") {
      const { converted, conversionMethod } = await processNaNConversion(arg);
      convertedArgs.push(converted);
      if (debugNanFlag) {
        debugDetails.push({
          raw: arg,
          normalized: normalizedArg,
          converted,
          conversionMethod,
        });
      }
    } else {
      convertedArgs.push(convertArg(arg));
    }
  }

  let finalData = convertedArgs;
  let pluginTrace;
  if (args.includes("--use-plugins") && getPlugins().length > 0) {
    if (args.includes("--trace-plugins")) {
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
  if (pluginTrace) {
    finalLog.pluginTrace = pluginTrace;
  }

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
  main(args).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
