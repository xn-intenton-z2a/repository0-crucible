#!/usr/bin/env node
import { fileURLToPath, URL as URLClass } from "url";
import minimist from "minimist";
import fs from "fs";
import yaml from "js-yaml";
import http from "http";

/**
 * Predefined list of ASCII art facial expressions for emotional feedback.
 */
export const asciiFaces = [
  "(^_^)",
  ">_<",
  "(^o^)",
  "(-_-)",
  "(o_O)",
  "(T_T)",
  "(^3^)",
  "(^_~)",
  "(*_*)",
  "(^.^)"
];

/**
 * Predefined themed sets of ASCII faces.
 */
export const faceThemes = {
  happy: ["(^_^)", "(^3^)"] ,
  sad: ["(T_T)", "(o_O)"],
  surprised: ["(*_*)", ">_<"]
};

/**
 * Loads custom faces from a YAML or JSON configuration file.
 * @param {string} configPath - Path to the config file.
 * @returns {string[]} Array of face strings.
 */
export function loadFaces(configPath) {
  let content;
  try {
    content = fs.readFileSync(configPath, "utf-8");
  } catch (err) {
    throw new Error(`Failed to read config file: ${err.message}`);
  }
  let data;
  try {
    if (/\.(ya?ml)$/i.test(configPath)) {
      data = yaml.load(content);
    } else {
      data = JSON.parse(content);
    }
  } catch (err) {
    throw new Error(`Failed to parse config file: ${err.message}`);
  }
  if (!Array.isArray(data)) {
    throw new Error(`Invalid config format: expected an array of strings`);
  }
  if (data.length === 0) {
    throw new Error(`Invalid config: array is empty`);
  }
  for (const item of data) {
    if (typeof item !== "string" || item.trim() === "") {
      throw new Error(`Invalid config: all items must be non-empty strings`);
    }
  }
  return data;
}

/**
 * Selects and returns a random ASCII face from the provided faces array.
 * @param {string[]} [faces=asciiFaces] - Array of face strings.
 * @returns {string} Randomly selected face.
 */
export function getRandomFace(faces = asciiFaces) {
  const index = Math.floor(Math.random() * faces.length);
  return faces[index];
}

/**
 * Main CLI entry point and HTTP server mode.
 * @param {string[]} args - Command-line arguments.
 */
export function main(args = process.argv.slice(2)) {
  const themeNames = Object.keys(faceThemes).join(", ");
  const helpMessage =
    "Usage: node src/lib/main.js [--face] [--count <n>] [--config <path>] [--theme <theme>] [--serve] [--port <n>] [--help]\n" +
    "Options:\n" +
    "  --face              Display random ASCII face(s)\n" +
    "  --count, -c <n>     Number of faces to output (default: 1)\n" +
    "  --config <path>     Load additional faces from config file (YAML or JSON)\n" +
    "  --theme, -t <theme> Predefined face theme (" + themeNames + ")\n" +
    "  --serve, -s         Start HTTP server mode\n" +
    "  --port, -p <n>      Server port (default: 3000)\n" +
    "  --help, -h          Show this help message";

  const flags = minimist(args, {
    boolean: ["face", "help", "serve"],
    string: ["config", "theme", "port"],
    alias: { h: "help", c: "count", t: "theme", s: "serve", p: "port" },
    default: { count: 1, port: 3000 }
  });

  const knownFlags = [
    "--face","--count","--config","--theme","--serve","--port","--help",
    "-h","-c","-t","-s","-p"
  ];
  const unknownFlags = args.filter(
    (arg) => (arg.startsWith("--") || arg.startsWith("-")) && !knownFlags.includes(arg)
  );
  if (unknownFlags.length) {
    console.log(helpMessage);
    return;
  }

  if (flags.help) {
    console.log(helpMessage);
    return;
  }

  // HTTP server mode
  if (flags.serve) {
    let portNum = Number(flags.port);
    if (!Number.isInteger(portNum) || portNum < 0) {
      console.log(helpMessage);
      return;
    }
    // Load custom faces if provided
    let customFaces = [];
    if (flags.config) {
      try {
        customFaces = loadFaces(flags.config);
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    }
    const builtInFaces = [...asciiFaces];
    const baseFaces = builtInFaces.concat(customFaces);

    const server = http.createServer((req, res) => {
      const reqUrl = new URLClass(req.url, `http://${req.headers.host}`);
      const pathname = reqUrl.pathname;
      const query = Object.fromEntries(reqUrl.searchParams.entries());
      let statusCode = 200;
      let responseBody = "";
      let contentType = "application/json";

      if (pathname === "/face") {
        const countParam = reqUrl.searchParams.get("count") || "1";
        const countNum = parseInt(countParam, 10);
        if (!Number.isInteger(countNum) || countNum < 1) {
          statusCode = 400;
          responseBody = JSON.stringify({ error: "Invalid count" });
        } else {
          const facesOut = [];
          for (let i = 0; i < countNum; i++) {
            facesOut.push(getRandomFace(baseFaces));
          }
          if (req.headers.accept && req.headers.accept.includes("text/plain")) {
            contentType = "text/plain";
            responseBody = countNum === 1 ? facesOut[0] : facesOut.join("\n");
          } else {
            contentType = "application/json";
            responseBody = countNum === 1 ? JSON.stringify(facesOut[0]) : JSON.stringify(facesOut);
          }
        }
      } else if (pathname === "/faces") {
        const includeParam = reqUrl.searchParams.get("includeCustom");
        let includeCustom = true;
        if (includeParam !== null) {
          if (includeParam === "true") includeCustom = true;
          else if (includeParam === "false") includeCustom = false;
          else {
            statusCode = 400;
            responseBody = JSON.stringify({ error: "Invalid includeCustom flag" });
          }
        }
        if (statusCode !== 400) {
          const facesList = builtInFaces.concat(includeCustom ? customFaces : []);
          if (req.headers.accept && req.headers.accept.includes("text/plain")) {
            contentType = "text/plain";
            responseBody = facesList.join("\n");
          } else {
            contentType = "application/json";
            responseBody = JSON.stringify(facesList);
          }
        }
      } else {
        statusCode = 404;
        responseBody = JSON.stringify({ error: "Not Found" });
      }

      res.writeHead(statusCode, { "Content-Type": contentType });
      res.end(responseBody);
      console.log(`${req.method} ${pathname} ${JSON.stringify(query)} ${statusCode}`);
    });

    server.listen(portNum, () => {
      const addr = server.address();
      const listenPort = typeof addr === "object" && addr !== null ? addr.port : portNum;
      console.log(`Server listening on port ${listenPort}`);
    });
    return server;
  }

  // CLI mode
  if (!flags.face) {
    console.log(helpMessage);
    return;
  }

  const count = flags.count;
  if (typeof count !== "number" || !Number.isInteger(count) || count < 1) {
    console.log(helpMessage);
    return;
  }

  // Theme validation
  if (flags.theme && !faceThemes[flags.theme]) {
    console.log(helpMessage);
    return;
  }

  // Prepare faces list
  let faces = flags.theme ? [...faceThemes[flags.theme]] : [...asciiFaces];
  if (flags.config) {
    try {
      const custom = loadFaces(flags.config);
      faces = faces.concat(custom);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }

  for (let i = 0; i < count; i++) {
    console.log(getRandomFace(faces));
  }
}

// Execute main if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
