import { CHART_CHANNELS, GRAPH_CHANNELS } from '../src/schema/encoding';

describe('channel test', () => {
  test('chart channels', () => {
    expect(CHART_CHANNELS).toEqual(['x', 'y', 'color', 'theta', 'size', 'column', 'row']);
  });

  test('graph channels', () => {
    expect(GRAPH_CHANNELS).toEqual(['size', 'color', 'theta']);
  });
});
