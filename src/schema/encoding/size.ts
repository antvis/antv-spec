import { EType } from './type';
import { Aggregate } from './aggregate';

export interface Size {
  field: string;
  type: EType;
  aggregate?: Aggregate;
}
