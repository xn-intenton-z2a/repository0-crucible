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
      hostname: 'localhost',
      port,
      path,
      method: 'GET',
      headers: {}
    };
    if (accept) options.headers.Accept = accept;
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
        });
      });
      req.on('error', reject);
      req.end();
    });
  }

  test("GET /version returns version JSON", async () => {
    const res = await makeRequest('/version');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const obj = JSON.parse(res.body);
    expect(obj).toEqual({ version });
  });

  test("GET / returns a random emoticon in plain text", async () => {
    const res = await makeRequest('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(FACES).toContain(res.body);
  });

  test("GET /list returns all emoticons one per line", async () => {
    const res = await makeRequest('/list');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.body).toBe(FACES.join('\n'));
  });

  test("GET /json returns random JSON emoticon", async () => {
    const res = await makeRequest('/json');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const obj = JSON.parse(res.body);
    expect(FACES).toContain(obj.face);
    expect(obj.mode).toBe('random');
    expect(obj.seed).toBeNull();
  });

  test("GET /json?seed=2 returns seeded JSON emoticon", async () => {
    const res = await makeRequest('/json?seed=2');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const obj = JSON.parse(res.body);
    expect(obj.face).toBe(FACES[2 % FACES.length]);
    expect(obj.mode).toBe('seeded');
    expect(obj.seed).toBe(2);
  });

  test("GET /json/list returns JSON array of all emoticons", async () => {
    const res = await makeRequest('/json/list');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const arr = JSON.parse(res.body);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toEqual(FACES);
  });

  test("GET /json?seed=abc returns 400 and JSON error when Accept=application/json", async () => {
    const res = await makeRequest('/json?seed=abc', 'application/json');
    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const obj = JSON.parse(res.body);
    expect(obj.error).toBe('Invalid seed: abc');
  });

  test("GET /json?seed=abc returns 400 and plain text error when no Accept header", async () => {
    const res = await makeRequest('/json?seed=abc');
    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.body).toBe('Invalid seed: abc');
  });

  test("GET /unknown returns 404 and JSON error when Accept=application/json", async () => {
    const res = await makeRequest('/unknown', 'application/json');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const obj = JSON.parse(res.body);
    expect(obj.error).toBe('Not Found');
  });

  test("GET /unknown returns 404 and plain text when no Accept header", async () => {
    const res = await makeRequest('/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.body).toBe('Not Found');
  });

  test("GET /metrics returns Prometheus metrics and does not alter counters", async () => {
    server.close();
    server = main(["--serve", "--port", "0"]);

    await makeRequest('/');
    await makeRequest('/json?seed=3');
    await makeRequest('/list');
    await makeRequest('/unknown');

    const res1 = await makeRequest('/metrics');
    expect(res1.statusCode).toBe(200);
    expect(res1.headers['content-type']).toBe('text/plain; version=0.0.4');
    const lines1 = res1.body.trim().split('\n');
    const metrics1 = {};
    lines1.forEach(line => {
      if (!line.startsWith('#')) {
        const [key, val] = line.split(' ');
        metrics1[key] = Number(val);
      }
    });
    expect(metrics1).toEqual({
      emoticon_requests_total: 3,
      emoticon_requests_root_total: 1,
      emoticon_requests_json_total: 1,
      emoticon_requests_list_total: 1,
      emoticon_requests_seeded_total: 1,
      emoticon_requests_errors_total: 1
    });

    const res2 = await makeRequest('/metrics');
    const lines2 = res2.body.trim().split('\n');
    const metrics2 = {};
    lines2.forEach(line => {
      if (!line.startsWith('#')) {
        const [key, val] = line.split(' ');
        metrics2[key] = Number(val);
      }
    });
    expect(metrics2).toEqual(metrics1);
  });
});

// Tests for custom config on HTTP server
import fs from 'fs';
import yaml from 'js-yaml';

describe('HTTP Server with custom config', () => {
  let server;
  beforeAll(() => {
    // Mock custom config
    process.env.EMOTICONS_CONFIG = 'custom.json';
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(['A', 'B']));
    server = main(["--serve", "--port", "0"]);
  });
  afterAll((done) => {
    delete process.env.EMOTICONS_CONFIG;
    server.close(done);
    vi.restoreAllMocks();
  });

  function makeRequest(path, accept) {
    const port = server.address().port;
    const options = {
      hostname: 'localhost',
      port,
      path,
      method: 'GET',
      headers: {}
    };
    if (accept) options.headers.Accept = accept;
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
        });
      });
      req.on('error', reject);
      req.end();
    });
  }

  test('GET /list reflects custom list', async () => {
    const res = await makeRequest('/list');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('0: A\n1: B');
  });

  test('GET /json returns custom JSON', async () => {
    const res = await makeRequest('/json');
    const obj = JSON.parse(res.body);
    expect(obj).toHaveProperty('face');
    expect(['A', 'B']).toContain(obj.face);
  });

  test('GET /json/list returns custom array', async () => {
    const res = await makeRequest('/json/list');
    expect(JSON.parse(res.body)).toEqual(['A', 'B']);
  });
});
