import { Axis } from './axis';
import { EType } from './type';
import { Aggregate } from './aggregate';
import { Bin } from './bin';
import { Stack } from './stack';

export interface X {
  /**
   * field can be optional once the aggregation type is `count`
   */
  field?: string;
  type: EType;
  axis?: Axis;
  aggregate?: Aggregate;
  bin?: Bin;
  stack?: Stack;
}

export * from './axis';
