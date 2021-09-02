import { matchersWithOptions } from 'jest-json-schema';
import antvSpec from '../../build/antv-spec.json';
import lineSpec from '../../examples/line.json';
import barSpec from '../../examples/bar.json';
import pieSpec from '../../examples/pie.json';
import graphSpec from '../../examples/graph.json';
import groupedStackColumnSpec from '../../examples/group_stack_column.json';
import histrogramSpec from '../../examples/histogram.json';
import pieColor from '../../examples/pie_color.json';

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
    expect(groupedStackColumnSpec).toMatchSchema(antvSpec);
  });

  test('histogram spec should be valid', () => {
    expect(histrogramSpec).toMatchSchema(antvSpec);
  });

  test('pie spec with color scale should be valid', () => {
    expect(pieColor).toMatchSchema(antvSpec);
  });
});
