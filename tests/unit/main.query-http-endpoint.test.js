import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest';
import { main } from '../../src/lib/main.js';
import * as mainModule from '../../src/lib/main.js';
import http from 'http';
import { once } from 'events';

describe('HTTP Server GET /query', () => {
  let server;
  let port;
  let originalPort;

  beforeAll(async () => {
    originalPort = process.env.PORT;
    process.env.PORT = '0';
    vi.spyOn(mainModule, 'sparqlQuery').mockResolvedValue({ head: { vars: ['s'] }, results: { bindings: [] } });
    server = await main(['--serve']);
    await once(server, 'listening');
    port = server.address().port;
  });

  afterAll(() => {
    server.close();
    process.env.PORT = originalPort;
    vi.restoreAllMocks();
  });

  test('returns 400 on missing params', async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: '127.0.0.1', port, path: '/query', method: 'GET' }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      });
      req.on('error', reject);
      req.end();
    });
    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.body).toBe('Missing required query parameters: file and sparql');
  });

  test('returns JSON results on success', async () => {
    const file = 'artifact.json';
    const query = encodeURIComponent('SELECT ?s WHERE {}');
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: '127.0.0.1', port, path: `/query?file=${file}&sparql=${query}`, method: 'GET' }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      });
      req.on('error', reject);
      req.end();
    });
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(JSON.parse(res.body)).toEqual({ head: { vars: ['s'] }, results: { bindings: [] } });
    expect(mainModule.sparqlQuery).toHaveBeenCalledWith(file, 'SELECT ?s WHERE {}');
  });

  test('returns 500 on query error', async () => {
    vi.spyOn(mainModule, 'sparqlQuery').mockRejectedValue(new Error('err')); 
    const file = 'artifact.json';
    const query = encodeURIComponent('SELECT ?s WHERE {}');
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: '127.0.0.1', port, path: `/query?file=${file}&sparql=${query}`, method: 'GET' }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      });
      req.on('error', reject);
      req.end();
    });
    expect(res.statusCode).toBe(500);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.body).toBe('err');
  });
});
