import { NODE_MARK_TYPES, LINK_MARK_TYPES, CHART_MARK_TYPES } from '../src/schema';

describe('mark test', () => {
  test('chart mark type', () => {
    expect(CHART_MARK_TYPES).toEqual(['bar', 'line', 'arc', 'area', 'point', 'rect']);
  });

  test('node mark type in graph', () => {
    expect(NODE_MARK_TYPES).toEqual(['point', 'arc', 'rect']);
  });

  test('link mark tyoe in graph', () => {
    expect(LINK_MARK_TYPES).toEqual(['line']);
  });
});
