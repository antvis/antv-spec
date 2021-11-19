import { GraphAntVSpec } from '../../schema';
import { specToG6Config } from './toConfig';
import { g6Render } from './render';

export const specToG6Plot = (spec: GraphAntVSpec, container: HTMLElement) => {
  const g6Config = specToG6Config(spec);
  // remove existing chart in the container
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';

  if (g6Config) {
    const graph = g6Render(g6Config, container);
    return graph;
  }

  return null;
};

export { g6Render };
