import { X } from './x';
import { Y } from './y';
import { Color } from './color';
import { Theta } from './theta';
import { Size } from './size';

export interface Encoding {
  x?: X;
  y?: Y;
  color?: Color;
  theta?: Theta;
  size?: Size;
}

export type GraphEncoding = {
  size?: Size;
  color?: Color;
};

export type ChartEncoding = {
  x?: X;
  y?: Y;
  color?: Color;
  theta?: Theta;
  size?: Size;
};

export * from './x';
export * from './y';
export * from './color';
export * from './theta';
export * from './size';
