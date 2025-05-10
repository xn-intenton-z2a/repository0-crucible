import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { calculatePi, calculatePiParallel, startHttpServer } from '../../src/lib/main.js';
import { spawnSync } from 'child_process';
import path from 'path';

// Unit tests for calculatePi function
describe('calculatePi', () => {
  test('machin algorithm 5 digits', () => {
    const pi5 = calculatePi(5, 'machin').toFixed(5);
    expect(pi5).toBe('3.14159');
  });

  test('both algorithms 10 digits match', () => {
    const m = calculatePi(10, 'machin').toFixed(10);
    const g = calculatePi(10, 'gauss-legendre').toFixed(10);
    expect(m).toBe('3.1415926535');
    expect(g).toBe('3.1415926535');
  });

  test('chudnovsky algorithm 5 digits', () => {
    const pi5 = calculatePi(5, 'chudnovsky').toFixed(5);
    expect(pi5).toBe('3.14159');
  });

  test('chudnovsky algorithm 10 digits', () => {
    const pi10 = calculatePi(10, 'chudnovsky').toFixed(10);
    expect(pi10).toBe('3.1415926535');
  });

  test('invalid digits throws', () => {
    expect(() => calculatePi(0, 'machin')).toThrow(/Invalid digits/);
  });

  test('invalid algorithm throws', () => {
    expect(() => calculatePi(10, 'unknown')).toThrow(/Invalid algorithm/);
  });
});

// Unit tests for calculatePiParallel function
describe('calculatePiParallel', () => {
  test('threads=1 matches single-threaded', async () => {
    const single = calculatePi(10, 'machin').toFixed(10);
    const parallel = (await calculatePiParallel(10, 'machin', 1)).toFixed(10);
    expect(parallel).toBe(single);
  });

  test('threads=2 returns correct pi', async () => {
    const single = calculatePi(10, 'gauss-legendre').toFixed(10);
    const parallel = (await calculatePiParallel(10, 'gauss-legendre', 2)).toFixed(10);
    expect(parallel).toBe(single);
  });

  test('invalid threads throws', async () => {
    await expect(calculatePiParallel(10, 'machin', 0)).rejects.toThrow(/Invalid threads/);
  });
});

// CLI integration tests
describe('CLI', () => {
  const cliPath = path.resolve(__dirname, '../../src/lib/main.js');

  test('CLI machin 10 digits', () => {
    const result = spawnSync('node', [cliPath, '--digits', '10', '--algorithm', 'machin']);
    expect(result.status).toBe(0);
    expect(result.stdout.toString().trim()).toBe('3.1415926535');
  });

  test('CLI default prints 100-digit pi', () => {
    const result = spawnSync('node', [cliPath]);
    expect(result.status).toBe(0);
    const out = result.stdout.toString().trim();
    expect(out.startsWith('3.')).toBe(true);
    expect(out.replace('.', '').length).toBe(101);
  });

  test('CLI invalid digits exits with error', () => {
    const result = spawnSync('node', [cliPath, '--digits', '0']);
    expect(result.status).not.toBe(0);
    expect(result.stderr.toString()).toMatch(/Invalid digits/);
  });

  test('CLI threads=2 uses parallel and prints pi', () => {
    const result = spawnSync('node', [cliPath, '--digits', '10', '--algorithm', 'machin', '--threads', '2']);
    expect(result.status).toBe(0);
    expect(result.stdout.toString().trim()).toBe('3.1415926535');
  });

  test('CLI chudnovsky 10 digits', () => {
    const result = spawnSync('node', [cliPath, '--digits', '10', '--algorithm', 'chudnovsky']);
    expect(result.status).toBe(0);
    expect(result.stdout.toString().trim()).toBe('3.1415926535');
  });
});

// HTTP API Unit tests
describe('HTTP API', () => {
  let server;
  let port;

  beforeAll(async () => {
    const res = await startHttpServer({ port: 0 });
    server = res.server;
    port = server.address().port;
  });
  afterAll(() => server.close());

  test('GET /pi returns pi JSON', async () => {
    const res = await fetch(`http://localhost:${port}/pi?digits=3&algorithm=machin`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ pi: '3.14' });
  });

  test('GET /benchmark returns JSON array', async () => {
    const res = await fetch(`http://localhost:${port}/benchmark?minDigits=1&maxDigits=2&step=1&algorithm=machin`);
    expect(res.status).toBe(200);
    const arr = await res.json();
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(2);
    expect(arr[0]).toHaveProperty('digits', 1);
    expect(arr[0]).toHaveProperty('timeMs');
  });

  test('GET /convergence returns PNG', async () => {
    const res = await fetch(`http://localhost:${port}/convergence?digits=10&algorithm=machin&iterations=2`);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('image/png');
    const buf = new Uint8Array(await res.arrayBuffer());
    expect(buf.slice(0, 8)).toEqual(new Uint8Array([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]));
  });

  test('GET /distribution returns PNG', async () => {
    const res = await fetch(`http://localhost:${port}/distribution?digits=5&algorithm=machin`);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('image/png');
    const buf = new Uint8Array(await res.arrayBuffer());
    expect(buf.slice(0, 8)).toEqual(new Uint8Array([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]));
  });

  test('GET /search returns first position', async () => {
    const res = await fetch(`http://localhost:${port}/search?pattern=141&digits=5`);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual({ position: 2 });
  });

  test('GET /search?all=true returns all positions', async () => {
    const res = await fetch(`http://localhost:${port}/search?pattern=1&digits=5&all=true`);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(json.positions)).toBe(true);
    expect(json.positions.length).toBeGreaterThan(1);
  });

  test('GET /decimal returns substring', async () => {
    const res = await fetch(`http://localhost:${port}/decimal?position=0&count=3`);
    expect(res.status).toBe(200);
    const txt = await res.text();
    expect(txt).toBe('314');
  });

  test('GET /export txt returns pi text', async () => {
    const res = await fetch(`http://localhost:${port}/export?digits=5&format=txt`);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('3.1415');
  });

  test('GET /export json returns pi JSON', async () => {
    const res = await fetch(`http://localhost:${port}/export?digits=5&format=json`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ pi: '3.1415' });
  });

  test('GET /pi/stream returns SSE', async () => {
    const res = await fetch(`http://localhost:${port}/pi/stream?digits=5`);
    expect(res.status).toBe(200);
    const txt = await res.text();
    expect(txt).toContain('data:');
    expect(txt).toContain('event: end');
  });

  test('GET unknown returns 404 JSON', async () => {
    const res = await fetch(`http://localhost:${port}/nonexistent`);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: 'Not Found' });
  });
});
