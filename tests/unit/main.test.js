import { describe, test, expect, vi } from 'vitest';
import * as mainModule from '@src/lib/main.js';
import { main } from '@src/lib/main.js';

describe('Main Module Import', () => {
  test('should be non-null', () => {
    expect(mainModule).not.toBeNull();
  });
});

describe('Main Output', () => {
  test('should terminate without error', () => {
    process.argv = ['node', 'src/lib/main.js'];
    main();
  });
});

describe('Mission Flag', () => {
  test('prints mission content', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main(['--mission']);
    expect(logSpy).toHaveBeenCalled();
    const calledArg = logSpy.mock.calls[0][0];
    expect(calledArg).toMatch(/^# xn-intenton-z2a\/repository0-crucible/);
    logSpy.mockRestore();
  });
});

describe('Features Flag', () => {
  test('prints feature filenames', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main(['--features']);
    expect(logSpy).toHaveBeenCalled();
    const logged = logSpy.mock.calls.map(call => call[0]);
    expect(logged).toContain('PI_CALCULATION.md');
    logSpy.mockRestore();
  });
});
