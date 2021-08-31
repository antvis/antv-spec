import * as G2Plot from '@antv/g2plot';
import { G2PlotType } from './toConfig';

export function g2plotRender(g2plotCfg: any, container: HTMLElement) {
  const { chartType } = g2plotCfg;
  if (g2plotCfg && chartType) {
    const plot = new G2Plot[chartType as G2PlotType](
      container,
      // @ts-ignore
      g2plotCfg.config
    );
    plot.render();
    return plot;
  }

  return null;
}
