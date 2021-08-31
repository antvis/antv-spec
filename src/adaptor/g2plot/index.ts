import { ChartAntVSpec } from '@src/schema';
import { toG2PlotConfg } from './toConfig';
import { g2plotRender } from './render';

export const specToG2Plot = (spec: ChartAntVSpec, container: HTMLElement) => {
  const g2plotConfig = toG2PlotConfg(spec);

  // remove existing chart in the container
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';

  if (g2plotConfig) {
    const plot = g2plotRender(g2plotConfig, container);
    return plot;
  }

  return null;
};
