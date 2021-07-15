import { matchersWithOptions } from 'jest-json-schema';
import antvSpec from '../build/antv-spec.json';

expect.extend(
  matchersWithOptions({
    schemas: [antvSpec],
  })
);

describe('schema test', () => {
  test('schema itself should be valid', () => {
    expect(antvSpec).toBeValidSchema();
  });
});
