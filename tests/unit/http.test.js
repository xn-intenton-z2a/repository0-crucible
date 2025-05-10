import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { startHttpServer } from '../../src/lib/main.js';

// Tests for HTTP API /pi endpoint error & edge cases
describe('HTTP API /pi endpoint', () => {
  let server;
  let port;

  beforeAll(async () => {
    const res = await startHttpServer({ port: 0 });
    server = res.server;
    port = server.address().port;
  });

  afterAll(() => {
    server.close();
  });

  test('Invalid digits (too low)', async () => {
    const res = await fetch(`http://localhost:${port}/pi?digits=0&algorithm=machin`);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Invalid digits' });
  });

  test('Invalid digits (non-integer)', async () => {
    const res = await fetch(`http://localhost:${port}/pi?digits=abc&algorithm=machin`);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Invalid digits' });
  });

  test('Invalid digits (too high)', async () => {
    const res = await fetch(`http://localhost:${port}/pi?digits=1000001`);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Invalid digits' });
  });

  test('Invalid algorithm', async () => {
    const res = await fetch(`http://localhost:${port}/pi?digits=3&algorithm=unknown`);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Invalid algorithm' });
  });

  test('Default digits parameter', async () => {
    const res = await fetch(`http://localhost:${port}/pi?algorithm=chudnovsky`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('pi');
    // Default: 1 integer + decimal + 100 fractional = 102 characters
    expect(body.pi.length).toBe(102);
  });

  test('Unknown route returns 404', async () => {
    const res = await fetch(`http://localhost:${port}/nonexistent`);
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toEqual({ error: 'Not Found' });
  });
});
