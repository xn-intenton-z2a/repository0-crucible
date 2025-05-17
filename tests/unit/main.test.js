import { describe, test, expect, vi } from 'vitest';
import { main } from '@src/lib/main.js';

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", async () => {
    // No arguments passed
    await main();
  });
});

describe("Mission Flag", () => {
  test("should print mission content", async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['--mission']);
    expect(consoleSpy).toHaveBeenCalled();
    const printed = consoleSpy.mock.calls[0][0];
    expect(printed).toContain('# xn-intenton-z2a/repository0-crucible');
    consoleSpy.mockRestore();
  });

  test("should handle shorthand -m", async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['-m']);
    expect(consoleSpy).toHaveBeenCalled();
    const printed = consoleSpy.mock.calls[0][0];
    expect(printed).toContain('# xn-intenton-z2a/repository0-crucible');
    consoleSpy.mockRestore();
  });
});
