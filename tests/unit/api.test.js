import { describe, test, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createHttpServer, ASCII_FACES, FACE_MAP } from "@src/lib/main.js";
import pkg from "../../package.json" assert { type: "json" };

describe("HTTP API server mode", () => {
  let server;
  beforeAll(() => {
    server = createHttpServer();
  });
  afterAll(() => {
    server.close();
  });

  test("GET /face returns a random face as text/plain", async () => {
    const res = await request(server).get("/face");
    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toMatch(/text\/plain/);
    expect(ASCII_FACES).toContain(res.text);
  });

  test("GET /faces returns JSON array of indexed faces", async () => {
    const res = await request(server).get("/faces");
    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toMatch(/application\/json/);
    const expected = ASCII_FACES.map((face, i) => `${i}: ${face}`);
    expect(res.body).toEqual(expected);
  });

  test("GET /names returns sorted face identifiers", async () => {
    const res = await request(server).get("/names");
    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toMatch(/application\/json/);
    const expected = Object.keys(FACE_MAP).sort();
    expect(res.body).toEqual(expected);
  });

  test("GET /seed/:value returns deterministic face for valid seed", async () => {
    const res1 = await request(server).get("/seed/1");
    const res2 = await request(server).get("/seed/1");
    expect(res1.status).toBe(200);
    expect(res1.header["content-type"]).toMatch(/text\/plain/);
    expect(res1.text).toBe(res2.text);
    expect(ASCII_FACES).toContain(res1.text);
  });

  test("GET /seed/:value returns 400 for invalid seed", async () => {
    const res = await request(server).get("/seed/foo");
    expect(res.status).toBe(400);
    expect(res.header["content-type"]).toMatch(/application\/json/);
    expect(res.body).toEqual({ error: "Invalid seed value" });
  });

  test("GET /name/:face returns a face for valid name (case-insensitive)", async () => {
    const key = Object.keys(FACE_MAP)[0];
    const res = await request(server).get(`/name/${key.toUpperCase()}`);
    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toMatch(/text\/plain/);
    expect(res.text).toBe(FACE_MAP[key]);
  });

  test("GET /name/:face returns 404 for unknown name", async () => {
    const res = await request(server).get("/name/unknownface");
    expect(res.status).toBe(404);
    expect(res.header["content-type"]).toMatch(/application\/json/);
    expect(res.body).toEqual({ error: "Face not found" });
  });

  test("GET /diagnostics returns JSON diagnostics object", async () => {
    const res = await request(server).get("/diagnostics");
    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("nodeVersion");
    expect(res.body).toHaveProperty("appVersion", pkg.version);
    expect(res.body).toHaveProperty("faceCount", ASCII_FACES.length);
    expect(res.body).toHaveProperty("faceNames");
    expect(res.body).toHaveProperty("dependencies");
  });

  test("GET unknown route returns 404 Not Found", async () => {
    const res = await request(server).get("/unknown");
    expect(res.status).toBe(404);
    expect(res.header["content-type"]).toMatch(/application\/json/);
    expect(res.body).toEqual({ error: "Not Found" });
  });
});