import { describe, test, expect, beforeAll } from "vitest";
import request from 'supertest';
import { main } from '@src/lib/main.js';

describe('SSE endpoint', () => {
  let app;

  beforeAll(async () => {
    app = await main(['--serve', '0', '--sse']);
  });

  test('streams data for valid request', async () => {
    const res = await request(app).get('/pi/sse?digits=20&chunkSize=5');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/event-stream/);
    expect(res.text).toMatch(/^data: .+\n\n/);
    expect(res.text).toMatch(/event: done/);
  });

  test('uses default chunk size when none provided', async () => {
    const res = await request(app).get('/pi/sse?digits=5');
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/data: 3\.14159/);
    expect(res.text).toMatch(/event: done/);
  });

  test('returns 400 for invalid digits param', async () => {
    const res = await request(app).get('/pi/sse?digits=foo');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid 'digits' parameter" });
  });

  test('returns 400 for invalid chunkSize param', async () => {
    const res = await request(app).get('/pi/sse?digits=5&chunkSize=-1');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid 'chunkSize' parameter" });
  });
});