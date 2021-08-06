import { GraphDataDef, ChartDataDef } from './data';
import { ChartBasis, GraphBasis } from './basis';
import { Component } from './component';
import { Interaction } from './interaction';
import { Layout } from './layout';
import { GraphLayer, ChartLayer } from './layer';

export type AntVSpec = CommonAntVSpec & (ChartAntVSpecDef | GraphAntVSpecDef);
export type ChartAntVSpec = CommonAntVSpec & ChartAntVSpecDef;
export type GraphAntVSpec = CommonAntVSpec & GraphAntVSpecDef;

type CommonAntVSpec = {
  /**
   * URL of the schema
   */
  $schema?: string;
  /**
   * Components definition such as Annotation
   */
  component?: Component;
  interactions?: Interaction[];
};
type ChartAntVSpecDef = {
  basis: ChartBasis;
  data: ChartDataDef;
  layer: ChartLayer[];
};

type GraphAntVSpecDef = {
  basis: GraphBasis;
  data: GraphDataDef;
  layout: Layout;
  layer: GraphLayer[];
};

export * from './basis';
export * from './data';
export * from './mark';
export * from './encoding';
export * from './component';
