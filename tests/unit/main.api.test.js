import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, unlinkSync } from 'fs';
import {
  generateFaces,
  listFaces,
  listCategories,
  builtInFaces
} from '@src/lib/main.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempApiPath = path.join(__dirname, 'temp_api_faces.json');

beforeAll(() => {
  const custom = {
    faces: [
      { face: '(^_^)', categories: ['excited'] },
      { face: '(>_<)', categories: ['angry', 'excited'] }
    ]
  };
  writeFileSync(tempApiPath, JSON.stringify(custom));
});

afterAll(() => {
  try { unlinkSync(tempApiPath); } catch {};
});

describe('Library API', () => {
  test('listCategories returns built-in categories', () => {
    const cats = listCategories();
    const expected = Array.from(new Set(builtInFaces.flatMap(f => f.categories)));
    expect(new Set(cats)).toEqual(new Set(expected));
  });

  test('listFaces returns all built-in faces', () => {
    const faces = listFaces();
    const expected = builtInFaces.map(f => f.face);
    expect(faces).toEqual(expected);
  });

  test('listFaces with category filter', () => {
    const happyFaces = builtInFaces
      .filter(f => f.categories.includes('happy'))
      .map(f => f.face);
    expect(listFaces({ category: 'happy' })).toEqual(happyFaces);
  });

  test('listFaces invalid category throws error', () => {
    expect(() => listFaces({ category: 'foo' }))
      .toThrow(/Invalid category 'foo'/);
  });

  test('listFaces with custom file replaces built-in faces', () => {
    const faces = listFaces({ facesFile: tempApiPath });
    expect(faces).toEqual(['(^_^)', '(>_<)']);
  });

  test('listCategories with custom file includes custom category', () => {
    const cats = listCategories({ facesFile: tempApiPath });
    expect(cats).toContain('excited');
    expect(cats).toContain('angry');
  });
});

describe('generateFaces', () => {
  test('generateFaces returns correct count', () => {
    const faces = generateFaces({ count: 3, seed: 1 });
    expect(faces).toHaveLength(3);
  });

  test('generateFaces reproducible with same seed', () => {
    const a = generateFaces({ count: 4, seed: 42 });
    const b = generateFaces({ count: 4, seed: 42 });
    expect(a).toEqual(b);
  });

  test('generateFaces invalid count throws error', () => {
    expect(() => generateFaces({ count: 0 }))
      .toThrow(/Invalid count/);
  });

  test('generateFaces count exceeds available throws error', () => {
    expect(() => generateFaces({ count: builtInFaces.length + 1 }))
      .toThrow(/Requested .* faces but only .* available/);
  });
});