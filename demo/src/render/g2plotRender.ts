import * as G2Plot from '@antv/g2plot';
import { G2PlotType } from '../adaptor/spec-g2plot';

export function g2plotRender(container: HTMLElement, g2plotCfg: any) {
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
