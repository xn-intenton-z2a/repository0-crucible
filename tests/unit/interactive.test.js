import { describe, test, expect } from 'vitest';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { builtInFaces } from '../../src/lib/main.js';

const mainPath = fileURLToPath(new URL('../../src/lib/main.js', import.meta.url));

function runInteractive(commands, timeout = 100) {
  return new Promise((resolve) => {
    const proc = spawn(process.execPath, [mainPath, '--interactive'], { stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '';
    proc.stdout.on('data', (data) => { stdout += data.toString(); });
    let idx = 0;
    function sendNext() {
      if (idx < commands.length) {
        proc.stdin.write(commands[idx] + '\n');
        idx++;
        setTimeout(sendNext, timeout);
      } else {
        proc.stdin.end();
      }
    }
    sendNext();
    proc.on('close', (code) => {
      resolve({ code, stdout });
    });
  });
}

describe('Interactive Mode', () => {
  test('exit command ends session', async () => {
    const { code, stdout } = await runInteractive(['exit']);
    expect(code).toBe(0);
    expect(stdout).toContain('Available commands');
    expect(stdout).toContain('Goodbye!');
  });

  test('face command prints one face', async () => {
    const { code, stdout } = await runInteractive(['face', 'exit']);
    expect(code).toBe(0);
    const lines = stdout.split(/\r?\n/).filter(Boolean);
    // one of the built-in faces should appear
    const printedFaces = builtInFaces.map((f) => f.face);
    const found = lines.some((line) => printedFaces.includes(line));
    expect(found).toBe(true);
  });

  test('list-categories command prints valid categories', async () => {
    const { code, stdout } = await runInteractive(['list-categories', 'exit']);
    expect(code).toBe(0);
    const lines = stdout.split(/\r?\n/).filter(Boolean);
    // valid categories from builtInFaces
    const cats = Array.from(new Set(builtInFaces.flatMap(f => f.categories)));
    cats.forEach(cat => {
      expect(lines).toContain(cat);
    });
  });

  test('list-faces --category sad prints sad faces', async () => {
    const { code, stdout } = await runInteractive(['list-faces --category sad', 'exit']);
    expect(code).toBe(0);
    const lines = stdout.split(/\r?\n/).filter(Boolean);
    const sadFaces = builtInFaces.filter(f => f.categories.includes('sad')).map(f => f.face);
    const printed = lines.filter(line => sadFaces.includes(line));
    expect(printed.length).toBeGreaterThan(0);
  });
});