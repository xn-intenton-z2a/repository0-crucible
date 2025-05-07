import { describe, test, expect, afterAll } from 'vitest';
import { spawn } from 'child_process';
import http from 'http';
import { fileURLToPath } from 'url';

const mainPath = fileURLToPath(new URL('../../src/lib/main.js', import.meta.url));

describe('HTTP API Server Mode', () => {
  let server;
  let port;

  // helper to start server
  function startServer() {
    return new Promise((resolve) => {
      const proc = spawn(process.execPath, [mainPath, '--serve', '--port', '0'], {
        stdio: ['ignore', 'pipe', 'pipe']
      });
      proc.stdout.setEncoding('utf8');
      let buf = '';
      proc.stdout.on('data', (data) => {
        buf += data;
        const match = buf.match(/Listening on http:\/\/localhost:(\d+)/);
        if (match) {
          const p = Number(match[1]);
          resolve({ proc, p });
        }
      });
    });
  }

  function httpGetJson(pathname, port) {
    return new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port,
        path: pathname,
        method: 'GET'
      };
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(data);
          } catch {}
          resolve({ status: res.statusCode, json });
        });
      });
      req.on('error', () => resolve({ status: 500, json: null }));
      req.end();
    });
  }

  afterAll(() => {
    if (server && server.proc) {
      server.proc.kill();
    }
  });

  test('GET /face with valid params', async () => {
    server = await startServer();
    port = server.p;
    const { status, json } = await httpGetJson('/face?count=2&seed=42', port);
    expect(status).toBe(200);
    expect(Array.isArray(json.faces)).toBe(true);
    expect(json.faces.length).toBe(2);
  });

  test('GET /face with invalid count', async () => {
    const { status, json } = await httpGetJson('/face?count=0', port);
    expect(status).toBe(400);
    expect(json.error).toMatch(/Invalid count/);
  });

  test('GET /foo returns 404', async () => {
    const { status, json } = await httpGetJson('/foo', port);
    expect(status).toBe(404);
    expect(json.error).toBe('Not Found');
  });

  test('GET /list-faces returns array', async () => {
    const { status, json } = await httpGetJson('/list-faces', port);
    expect(status).toBe(200);
    expect(Array.isArray(json.faces)).toBe(true);
  });

  test('GET /list-categories returns array', async () => {
    const { status, json } = await httpGetJson('/list-categories', port);
    expect(status).toBe(200);
    expect(Array.isArray(json.categories)).toBe(true);
  });

  test('GET /diagnostics returns fields', async () => {
    const { status, json } = await httpGetJson('/diagnostics', port);
    expect(status).toBe(200);
    expect(json.nodeVersion).toBeDefined();
    expect(json.cliVersion).toBeDefined();
    expect(typeof json.builtInFacesCount).toBe('number');
    expect(Array.isArray(json.categories)).toBe(true);
    expect(typeof json.timestamp).toBe('string');
  });

  test('GET /openapi.json returns OpenAPI spec', async () => {
    const { status, json } = await httpGetJson('/openapi.json', port);
    expect(status).toBe(200);
    expect(json.openapi).toBe('3.0.3');
    expect(json.paths).toBeDefined();
    const keys = Object.keys(json.paths);
    [' /face','/list-faces','/list-categories','/diagnostics','/openapi.json'].forEach((p) => {
      expect(keys).toContain(p);
    });
  });
});