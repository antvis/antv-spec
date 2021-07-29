import { Data } from './data';
import { Basis } from './basis';
import { Component } from './component';
import { Interaction } from './interaction';
import { Layout } from './layout';
import { Layer } from './layer';

export interface AntVSpec {
  $schema?: any;
  basis?: Basis;
  data: Data;
  layout?: Layout;
  layer: Layer[];
  component?: Component;
  interactions?: Interaction[];
}

export * from './basis';
export * from './data';
export * from './mark';
export * from './encoding';
export * from './component';
