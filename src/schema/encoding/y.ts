import { Axis } from './axis';
import { EType } from './type';

export interface Y {
  field: string;
  type: EType;
  axis?: Axis;
}
