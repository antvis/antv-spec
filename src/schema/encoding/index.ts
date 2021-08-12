import { X } from './x';
import { Y } from './y';
import { Color } from './color';
import { Theta } from './theta';
import { Size } from './size';
import { Column } from './column';
import { Row } from './row';

export interface Encoding {
  x?: X;
  y?: Y;
  color?: Color;
  theta?: Theta;
  size?: Size;
}

export type NodeEncoding = {
  size?: Size;
  color?: Color;
  theta?: Theta;
};

export type LinkEncoding = {
  size?: Size;
  color?: Color;
};

export type ChartEncoding = {
  x?: X;
  y?: Y;
  color?: Color;
  theta?: Theta;
  size?: Size;
  column?: Column;
  row?: Row;
};
export * from './x';
export * from './y';
export * from './color';
export * from './theta';
export * from './size';
export * from './row';
export * from './column';
