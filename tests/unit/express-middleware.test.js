import { describe, test, expect, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import {
  createEmoticonRouter,
  listFaces,
  randomFace,
  seededFace,
  emoticonJson,
  version,
} from '@src/lib/main.js';

describe('Express Middleware', () => {
  let app;
  const FACES = listFaces();

  beforeEach(() => {
    app = express();
    app.use(createEmoticonRouter());
  });

  test('GET / returns random emoticon and CORS header', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(FACES).toContain(res.text);
  });

  test('GET /list returns emoticons list and CORS', async () => {
    const res = await request(app).get('/list');
    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.text).toBe(FACES.join('\n'));
  });

  test('GET /json returns random JSON emoticon and CORS', async () => {
    const res = await request(app).get('/json');
    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const obj = res.body;
    expect(FACES).toContain(obj.face);
    expect(obj.mode).toBe('random');
    expect(obj.seed).toBeNull();
  });

  test('GET /json?seed=2 returns seeded JSON', async () => {
    const res = await request(app).get('/json').query({ seed: '2' });
    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.body.face).toBe(FACES[2 % FACES.length]);
    expect(res.body.mode).toBe('seeded');
    expect(res.body.seed).toBe(2);
  });

  test('GET /json?count=3 returns JSON array of length 3', async () => {
    const res = await request(app).get('/json').query({ count: '3' });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);
  });

  test('GET /json?seed=1&count=4 returns deterministic array', async () => {
    const res = await request(app)
      .get('/json')
      .query({ seed: '1', count: '4' });
    expect(res.status).toBe(200);
    const expected = [0, 1, 2, 3].map(i => FACES[(1 + i) % FACES.length]);
    expect(res.body).toEqual(expected);
  });

  test('GET /json?list returns all faces', async () => {
    const res = await request(app).get('/json').query({ list: '' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(FACES);
  });

  test('GET /json/list returns all faces', async () => {
    const res = await request(app).get('/json/list');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(FACES);
  });

  test('GET /version returns version JSON', async () => {
    const res = await request(app).get('/version');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ version });
  });

  test('GET /health returns OK text', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });

  test('GET /metrics returns Prometheus metrics', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/# HELP emoticon_requests_total emoticon_requests_total counter/);
  });

  test('unknown path returns 404 and correct format', async () => {
    const res1 = await request(app).get('/unknown');
    expect(res1.status).toBe(404);
    expect(res1.headers['access-control-allow-origin']).toBe('*');
    expect(res1.text).toBe('Not Found');

    const res2 = await request(app)
      .get('/unknown')
      .set('Accept', 'application/json');
    expect(res2.status).toBe(404);
    expect(res2.body).toEqual({ error: 'Not Found' });
  });

  test('non-GET method returns 404', async () => {
    const res = await request(app).post('/');
    expect(res.status).toBe(404);
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });
});
