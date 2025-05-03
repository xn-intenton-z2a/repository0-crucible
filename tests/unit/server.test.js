import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { main, version } from "@src/lib/main.js";
import http from "http";

const FACES = [
  ":)",
  ":-([",
  ":D",
  "(¬_¬)",
  "(＾◡＾)",
  "(ʘ‿ʘ)",
  "(¬‿¬)",
  "ಠ_ಠ",
  "^_^"];

describe("HTTP Server", () => {
  let server;
  let logSpy;
  beforeAll(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    server = main(["--serve", "--port", "0"]);
  });

  afterAll((done) => {
    logSpy.mockRestore();
    server.close(done);
  });

  test("Server startup logs listening port", () => {
    expect(logSpy).toHaveBeenCalledTimes(1);
    const msg = logSpy.mock.calls[0][0];
    expect(msg).toMatch(/Listening on port \d+/);
    const port = server.address().port;
    expect(msg).toBe(`Listening on port ${port}`);
  });

  function makeRequest(path, accept) {
    const port = server.address().port;
    const options = {
      hostname: "localhost",
      port,
      path,
      method: "GET",
      headers: {}
    };
    if (accept) {
      options.headers["Accept"] = accept;
    }
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
        });
      });
      req.on("error", reject);
      req.end();
    });
  }

  test("GET /version returns version JSON and CORS header", async () => {
    const res = await makeRequest('/version');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    const obj = JSON.parse(res.body);
    expect(obj).toEqual({ version });
  });

  test("GET / returns a random emoticon in plain text with CORS header", async () => {
    const res = await makeRequest('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(FACES).toContain(res.body);
  });

  test("GET /list returns all emoticons one per line with CORS header", async () => {
    const res = await makeRequest('/list');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.body).toBe(FACES.join('\n'));
  });

  test("GET /json returns random JSON emoticon with CORS header", async () => {
    const res = await makeRequest('/json');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    const obj = JSON.parse(res.body);
    expect(FACES).toContain(obj.face);
    expect(obj.mode).toBe('random');
    expect(obj.seed).toBeNull();
  });

  test("GET /json?seed=2 returns seeded JSON emoticon with CORS header", async () => {
    const res = await makeRequest('/json?seed=2');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    const obj = JSON.parse(res.body);
    expect(obj.face).toBe(FACES[2 % FACES.length]);
    expect(obj.mode).toBe('seeded');
    expect(obj.seed).toBe(2);
  });

  test("GET /json/list returns JSON array of all emoticons with CORS header", async () => {
    const res = await makeRequest('/json/list');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    const arr = JSON.parse(res.body);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toEqual(FACES);
  });

  test("GET /json?seed=abc returns 400 and JSON error with CORS header when Accept=application/json", async () => {
    const res = await makeRequest('/json?seed=abc', 'application/json');
    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    const obj = JSON.parse(res.body);
    expect(obj.error).toBe('Invalid seed: abc');
  });

  test("GET /json?seed=abc returns 400 and plain text error with CORS header when no Accept header", async () => {
    const res = await makeRequest('/json?seed=abc');
    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.body).toBe('Invalid seed: abc');
  });

  test("GET /unknown returns 404 and JSON error with CORS header when Accept=application/json", async () => {
    const res = await makeRequest('/unknown', 'application/json');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    const obj = JSON.parse(res.body);
    expect(obj.error).toBe('Not Found');
  });

  test("GET /unknown returns 404 and plain text when no Accept header with CORS header", async () => {
    const res = await makeRequest('/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.body).toBe('Not Found');
  });

  test("GET /health returns status 200 with content-type text/plain, body OK, and CORS header", async () => {
    const res = await makeRequest('/health');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.body).toBe('OK');
  });
});