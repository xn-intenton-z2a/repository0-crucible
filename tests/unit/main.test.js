import { describe, test, expect, vi, afterEach, beforeAll, afterAll } from "vitest";
import { main, asciiFaces, faceThemes } from "@src/lib/main.js";
import http from "http";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Random Face Generator", () => {
  test("getRandomFace returns one of the known faces", () => {
    const face = asciiFaces[Math.floor(Math.random() * asciiFaces.length)];
    expect(asciiFaces).toContain(face);
  });
});

describe("Theme Selection", () => {
  let logSpy;
  afterEach(() => {
    if (logSpy) logSpy.mockRestore();
  });

  test("valid theme prints a face from theme", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "--theme", "happy"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    expect(faceThemes.happy).toContain(output);
  });

  test("alias -t works and count 2 prints two faces", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "-t", "surprised", "-c", "2"]);
    expect(logSpy).toHaveBeenCalledTimes(2);
    for (let i = 0; i < 2; i++) {
      expect(faceThemes.surprised).toContain(logSpy.mock.calls[i][0]);
    }
  });

  test("invalid theme prints help once", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "--theme", "unknown"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/^Usage:/);
  });
});

// Existing count tests

describe("Main Output", () => {
  let logSpy;
  afterEach(() => {
    if (logSpy) logSpy.mockRestore();
  });

  test("default invocation prints help message", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/^Usage:/);
  });

  test("explicit --face flag prints a random ASCII face", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(asciiFaces.concat(...Object.values(faceThemes))).toContain(logSpy.mock.calls[0][0]);
  });

  test("--face --count 3 prints three faces", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "--count", "3"]);
    expect(logSpy).toHaveBeenCalledTimes(3);
    for (let i = 0; i < 3; i++) {
      expect(asciiFaces).toContain(logSpy.mock.calls[i][0]);
    }
  });

  test("invalid count zero prints help", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "--count", "0"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/^Usage:/);
  });
});

// HTTP Server Mode tests

describe("HTTP Server Mode", () => {
  let server;
  let port;

  beforeAll(() => {
    server = main(["--serve", "--port", "0"]);
    return new Promise((resolve) => {
      server.on("listening", () => {
        const addr = server.address();
        port = addr.port;
        resolve();
      });
    });
  });

  afterAll(() => {
    server.close();
  });

  function httpRequest(path, headers = {}) {
    return new Promise((resolve, reject) => {
      const options = { hostname: "localhost", port, path, headers };
      const req = http.get(options, (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => { resolve({ res, body: data }); });
      });
      req.on("error", reject);
    });
  }

  test("GET /face default returns JSON string", async () => {
    const { res, body } = await httpRequest("/face");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const parsed = JSON.parse(body);
    expect(asciiFaces).toContain(parsed);
  });

  test("GET /face?count=2 returns JSON array", async () => {
    const { res, body } = await httpRequest("/face?count=2");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const arr = JSON.parse(body);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toHaveLength(2);
    arr.forEach(face => expect(asciiFaces).toContain(face));
  });

  test("GET /face?count=0 returns 400", async () => {
    const { res, body } = await httpRequest("/face?count=0");
    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const err = JSON.parse(body);
    expect(err).toEqual({ error: "Invalid count" });
  });

  test("GET /face with Accept: text/plain returns plain text", async () => {
    const { res, body } = await httpRequest("/face", { Accept: "text/plain" });
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
    expect(body.split("\n")).toHaveLength(1);
    expect(asciiFaces).toContain(body);
  });

  test("GET /faces default returns JSON array of all faces", async () => {
    const { res, body } = await httpRequest("/faces");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const arr = JSON.parse(body);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toEqual(asciiFaces);
  });

  test("GET /faces?includeCustom=foo returns 400", async () => {
    const { res, body } = await httpRequest("/faces?includeCustom=foo");
    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const err = JSON.parse(body);
    expect(err).toEqual({ error: "Invalid includeCustom flag" });
  });

  test("GET /faces with Accept: text/plain returns plain text list", async () => {
    const { res, body } = await httpRequest("/faces", { Accept: "text/plain" });
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
    const lines = body.split("\n");
    expect(lines).toHaveLength(asciiFaces.length);
    lines.forEach(line => expect(asciiFaces).toContain(line));
  });
});
