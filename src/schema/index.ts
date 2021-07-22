import { Data } from './data';
import { Mark } from './mark';
import { Encoding } from './encoding';
import { Basis } from './basis';
import { Component } from './component';
import { Interaction } from './interaction';

export interface AntVSpec {
  $schema?: any;
  basis?: Basis;
  data: Data;
  mark: Mark;
  encoding: Encoding;
  component?: Component;
  interactions?: Interaction[];
}

export * from './basis';
export * from './data';
export * from './mark';
export * from './encoding';
export * from './component';
