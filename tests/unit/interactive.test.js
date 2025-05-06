import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, unlinkSync } from 'fs';
import { builtInFaces } from '../../src/lib/main.js';

const mainPath = fileURLToPath(new URL('../../src/lib/main.js', import.meta.url));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const interactiveTempPath = path.join(__dirname, 'temp_interactive.json');

// Create a temporary custom faces file for testing
beforeAll(() => {
  const custom = {
    faces: [
      { face: 'X1', categories: ['c1'] },
      { face: 'X2', categories: [] }
    ]
  };
  writeFileSync(interactiveTempPath, JSON.stringify(custom));
});

afterAll(() => {
  try { unlinkSync(interactiveTempPath); } catch {}
});

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
    const printedFaces = builtInFaces.map((f) => f.face);
    const found = lines.some((line) => printedFaces.includes(line));
    expect(found).toBe(true);
  });

  test('list-categories command prints valid categories', async () => {
    const { code, stdout } = await runInteractive(['list-categories', 'exit']);
    expect(code).toBe(0);
    const lines = stdout.split(/\r?\n/).filter(Boolean);
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

  test('seed command sets default seed for reproducible output', async () => {
    const { code, stdout } = await runInteractive(['seed 42', 'face', 'face', 'exit'], 50);
    expect(code).toBe(0);
    const lines = stdout.split(/\r?\n/).filter(Boolean);
    expect(lines).toContain('Default seed set to 42');
    const faceLines = lines.filter(line => builtInFaces.map(f => f.face).includes(line));
    expect(faceLines.length).toBe(2);
    expect(faceLines[0]).toBe(faceLines[1]);
  });

  test('invalid seed foo prints error and continues REPL', async () => {
    const { code, stdout } = await runInteractive(['seed foo', 'exit']);
    expect(code).toBe(0);
    expect(stdout).toContain('Invalid seed value: foo');
    expect(stdout).toContain('Goodbye!');
  });

  test('category command persists default category for list-faces', async () => {
    const { code, stdout } = await runInteractive(['category happy', 'list-faces', 'exit']);
    expect(code).toBe(0);
    const lines = stdout.split(/\r?\n/).filter(Boolean);
    expect(lines).toContain('Default category set to happy');
    const happyFaces = builtInFaces.filter(f => f.categories.includes('happy')).map(f => f.face);
    happyFaces.forEach(face => {
      expect(lines).toContain(face);
    });
  });

  test('custom merge persists session defaults', async () => {
    const { code, stdout } = await runInteractive([`custom ${interactiveTempPath} --merge`, 'list-faces', 'exit']);
    expect(code).toBe(0);
    const lines = stdout.split(/\r?\n/).filter(Boolean);
    expect(lines).toContain(`Custom faces merged from ${interactiveTempPath}`);
    expect(lines).toContain('X1');
    expect(lines).toContain('X2');
  });
});
