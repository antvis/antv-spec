import { version } from '../src/index';

describe('init test', () => {
  test('get version right', () => {
    expect(version).toBe('0.1.0');
  });
});
