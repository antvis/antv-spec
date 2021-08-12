import { EType } from './type';
import { Aggregate } from './aggregate';

export interface Theta {
  field: string;
  type: EType;
  aggregate?: Aggregate;
}
