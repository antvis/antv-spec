import { matchersWithOptions } from 'jest-json-schema';
import antvSpec from '../../../build/antv-spec.json';

expect.extend(
  matchersWithOptions({
    schemas: [antvSpec],
  })
);

const pieSpecCase = {
  data: {
    values: [
      { category: 1, value: 4 },
      { category: 2, value: 6 },
      { category: 3, value: 10 },
      { category: 4, value: 3 },
      { category: 5, value: 7 },
      { category: 6, value: 8 },
    ],
  },
  mark: 'pie',
  encoding: {
    theta: { field: 'value', type: 'quantitative' },
    color: { field: 'category', type: 'nominal' },
  },
};

describe('test', () => {
  it('valid pie', () => {
    expect(pieSpecCase).toMatchSchema(antvSpec);
  });
});
