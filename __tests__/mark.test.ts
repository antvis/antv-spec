import { NODE_MARK_TYPE, LINK_MARK_TYPE, CHART_MARK_TYPE } from '../src/schema';

describe('mark test', () => {
  test('chart mark type', () => {
    expect(CHART_MARK_TYPE).toEqual(['bar', 'line', 'arc', 'area', 'point']);
  });

  test('node mark type in graph', () => {
    expect(NODE_MARK_TYPE).toEqual(['point', 'arc', 'rect']);
  });

  test('link mark tyoe in graph', () => {
    expect(LINK_MARK_TYPE).toEqual(['line']);
  });
});
