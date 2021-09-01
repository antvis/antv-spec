import { EType } from './type';
import { Aggregate } from './aggregate';
import { Scale } from './scale';

export interface Color {
  field: string;
  type: EType;
  aggregate?: Aggregate;
  scale?: Scale;
}
