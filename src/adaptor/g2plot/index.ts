import { ChartAntVSpec } from '../../schema';
import { specToG2PlotConfig } from './toConfig';
import { g2plotRender } from './render';

export const specToG2Plot = (spec: ChartAntVSpec, container: HTMLElement) => {
  const g2plotConfig = specToG2PlotConfig(spec);

  // remove existing chart in the container
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';

  if (g2plotConfig) {
    const plot = g2plotRender(g2plotConfig, container);
    return plot;
  }

  return null;
};

export { g2plotRender };
