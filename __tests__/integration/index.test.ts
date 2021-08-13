import { matchersWithOptions } from 'jest-json-schema';
import antvSpec from '../../build/antv-spec.json';
import lineSpec from '../../examples/line.json';
import barSpec from '../../examples/bar.json';
import pieSpec from '../../examples/pie.json';
import graphSpec from '../../examples/graph.json';
import groupedStackBarSpec from '../../examples/grouped_stack_bar.json';
import histrogramSpec from '../../examples/histogram.json';

expect.extend(
  matchersWithOptions({
    schemas: [antvSpec],
  })
);

describe('spec test', () => {
  test('line spec should be valid', () => {
    expect(lineSpec).toMatchSchema(antvSpec);
  });

  test('bar spec should be valid', () => {
    expect(barSpec).toMatchSchema(antvSpec);
  });

  test('pie spec should be valid', () => {
    expect(pieSpec).toMatchSchema(antvSpec);
  });

  test('graph spec should be valid', () => {
    expect(graphSpec).toMatchSchema(antvSpec);
  });

  test('grouped stack bar chart sepc should be valid', () => {
    expect(groupedStackBarSpec).toMatchSchema(antvSpec);
  });

  test('histogram spec should be valid', () => {
    expect(histrogramSpec).toMatchSchema(antvSpec);
  });
});
