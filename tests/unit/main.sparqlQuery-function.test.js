import { describe, test, expect, vi, afterEach } from 'vitest';
import fs from 'fs';
import { QueryEngine } from '@comunica/query-sparql';
import { sparqlQuery } from '../../src/lib/main.js';

describe('sparqlQuery function', () => {
  const filePath = 'file.json';
  const queryString = 'SELECT ?s WHERE { ?s ?p ?o }';

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('throws error if file read fails', async () => {
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('fail');
    });
    await expect(sparqlQuery(filePath, queryString)).rejects.toThrow('Failed to read file: fail');
  });

  test('throws error if JSON parse fails', async () => {
    vi.spyOn(fs, 'readFileSync').mockReturnValue('not json');
    await expect(sparqlQuery(filePath, queryString)).rejects.toThrow('Invalid JSON in file:');
  });

  test('returns SELECT results correctly', async () => {
    // Mock QueryEngine.query to return a bindings stream
    const binding = {
      has: (v) => v === 's',
      get: (v) => ({ termType: 'literal', value: 'val', language: 'en', datatype: { value: 'dt' } })
    };
    const fakeStream = {
      [Symbol.asyncIterator]: async function* () {
        yield binding;
      }
    };
    vi.spyOn(QueryEngine.prototype, 'query').mockResolvedValue({
      type: 'bindings',
      bindingsStream: fakeStream,
      variables: ['s'],
      link: ['http://meta']
    });
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({}));

    const result = await sparqlQuery(filePath, queryString);
    expect(result).toEqual({
      head: { vars: ['s'], link: ['http://meta'] },
      results: { bindings: [ { s: { type: 'literal', value: 'val', 'xml:lang': 'en', datatype: 'dt' } } ] }
    });
  });

  test('returns ASK results correctly', async () => {
    vi.spyOn(QueryEngine.prototype, 'query').mockResolvedValue({
      type: 'boolean',
      booleanResult: Promise.resolve(true),
      link: ['http://meta2']
    });
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({}));

    const result = await sparqlQuery(filePath, queryString);
    expect(result).toEqual({ head: { link: ['http://meta2'] }, boolean: true });
  });
});
