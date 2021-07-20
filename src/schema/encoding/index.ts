import { X } from './x';
import { Y } from './y';
import { Color } from './color';
import { Theta } from './theta';

export interface Encoding {
  x?: X;
  y?: Y;
  color?: Color;
  theta?: Theta;
}

export * from './x';
export * from './y';
export * from './color';
export * from './theta';
