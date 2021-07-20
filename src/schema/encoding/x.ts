import { Axis } from './axis';
import { EType } from './type';

export interface X {
  field: string;
  type: EType;
  axis?: Axis;
}
