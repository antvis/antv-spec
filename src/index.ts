import pkg from '../package.json';

export const { version } = pkg;

export * from './schema';
export { specToG2Plot, specToG6Plot, specToG2PlotConfig, specToG6Config, g2plotRender } from './adaptor';
