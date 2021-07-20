import { matchersWithOptions } from 'jest-json-schema';
import antvSpec from '../../../build/antv-spec.json';

expect.extend(
  matchersWithOptions({
    schemas: [antvSpec],
  })
);

const barSpecCase = {
  data: {
    values: [
      { a: 'A', b: 28 },
      { a: 'B', b: 55 },
      { a: 'C', b: 43 },
    ],
  },
  mark: 'bar',
  encoding: {
    x: { field: 'a', type: 'nominal', axis: { label: { rotate: 0 } } },
    y: { field: 'b', type: 'quantitative' },
  },
};

describe('test', () => {
  it('valid bar', () => {
    expect(barSpecCase).toMatchSchema(antvSpec);
  });
});
