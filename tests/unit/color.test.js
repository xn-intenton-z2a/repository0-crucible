import { describe, test, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const mainPath = fileURLToPath(new URL('../../src/lib/main.js', import.meta.url));

describe('Color Output', () => {
  test('default color behavior wraps face in green ANSI codes', () => {
    const res = spawnSync(process.execPath, [mainPath, '--face', '--color'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    const line = res.stdout.trim();
    expect(line).toMatch(/^\x1b\[32m.*\x1b\[0m$/);
  });

  test('named color support wraps faces in specified ANSI codes', () => {
    const res = spawnSync(process.execPath, [mainPath, '--face', '3', '--color', 'red'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    const lines = res.stdout.trim().split(/\r?\n/);
    expect(lines).toHaveLength(3);
    lines.forEach((ln) => {
      expect(ln).toMatch(/^\x1b\[31m.*\x1b\[0m$/);
    });
  });

  test('invalid color handling exits with error and descriptive message', () => {
    const res = spawnSync(process.execPath, [mainPath, '--face', '--color', 'invalid'], { encoding: 'utf8' });
    expect(res.status).not.toBe(0);
    expect(res.stderr.trim()).toBe(
      "Unsupported color 'invalid'. Supported colors: black, red, green, yellow, blue, magenta, cyan, white."
    );
  });
});
