import G6 from '@antv/g6';

export function g6Render(g6Cfg: any, container: HTMLElement) {
  if (g6Cfg?.data && g6Cfg?.cfg) {
    const plot = new G6.Graph({
      container,
      ...g6Cfg.cfg,
    });
    plot.data(g6Cfg.data);
    plot.render();
    return plot;
  }

  return null;
}
