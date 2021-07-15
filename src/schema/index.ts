import { Data } from './data';
import { Mark } from './mark';
import { Encoding } from './encoding';

export interface AntVSpec {
  data: Data;
  mark: Mark;
  encoding: Encoding;
}

export * from './data';
export * from './mark';
export * from './encoding';
