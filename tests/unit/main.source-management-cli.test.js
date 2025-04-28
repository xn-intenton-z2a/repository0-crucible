import { describe, test, expect, vi, afterEach } from "vitest";
import fs from "fs";
import * as mainModule from "../../src/lib/main.js";
import { main, updateSource } from "../../src/lib/main.js";

describe("CLI --update-source flag", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("logs error when parameters missing", async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await main(['--update-source']);
    expect(errorSpy).toHaveBeenCalledWith('Missing required parameters: identifier, newName, and newUrl');
  });

  test("successful update logs merged sources", async () => {
    const merged = [{ name: 'DBpedia SPARQL', url: 'https://dbpedia.org/sparql' }, { name: 'A-new', url: 'u1-new' }];
    const spyUpdate = vi.spyOn(mainModule, 'updateSource').mockReturnValue(merged);
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['--update-source', 'A', 'A-new', 'u1-new']);
    expect(spyUpdate).toHaveBeenCalledWith({ identifier: 'A', name: 'A-new', url: 'u1-new' }, 'data-sources.json');
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(merged, null, 2));
  });

  test("propagates error from updateSource", async () => {
    const error = new Error('fail');
    vi.spyOn(mainModule, 'updateSource').mockImplementation(() => { throw error; });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await main(['--update-source', 'A', 'B', 'u2']);
    expect(errorSpy).toHaveBeenCalledWith('fail');
  });
});
