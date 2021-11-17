import G6 from '@antv/g6';

export function g6Render(g6Cfg: any, container: HTMLElement) {
  if (g6Cfg?.data && g6Cfg?.cfg && container) {
    const graph = new G6.Graph({
      container,
      ...g6Cfg.cfg,
    });
    graph.data(g6Cfg.data);
    graph.render();

    // auto resize the graph to fit the container viewport
    const resizeGraphToFit = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width && height) {
        const maxX = Math.max(...graph.getNodes().map((node) => node.getModel().x));
        const maxY = Math.max(...graph.getNodes().map((node) => node.getModel().y));
        const { x: clientMaxX, y: clientMaxY } = graph.getClientByPoint(maxX, maxY);
        graph.zoomTo(Math.min(width / clientMaxX, height / clientMaxY));
        graph.changeSize(width, height);
      }
    };
    resizeGraphToFit();
    window.onresize = () => {
      resizeGraphToFit();
    };
    return graph;
  }

  return null;
}
