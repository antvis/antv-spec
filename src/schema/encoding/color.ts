import { EType } from './type';
import { Aggregate } from './aggregate';

export interface Color {
  field: string;
  type: EType;
  aggregate?: Aggregate;
}
