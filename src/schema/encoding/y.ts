import { Aggregate } from './aggregate';
import { Axis } from './axis';
import { EType } from './type';
import { Bin } from './bin';
import { Stack } from './stack';

export interface Y {
  /**
   * field can be optional once the aggregation type is `count`
   */
  field?: string;
  type: EType;
  axis?: Axis;
  /**
   * aggregate and bin cannot be declared together
   */
  aggregate?: Aggregate;
  bin?: Bin;
  stack?: Stack;
}
