export type Mark =
  | MarkType
  | {
      type: MarkType;
      style?: MarkStyleConfig;
    };

export type MarkType = 'bar' | 'line' | 'arc' | 'area' | 'point' | 'node' | 'link';

interface MarkStyleConfig {
  type: MarkType;
  size?: number;
  lineWidth?: number;
  strokeWidth?: number;
  color?: ColorCfg;
  fillColor?: ColorCfg;
  strokeColor?: ColorCfg;
  opacity?: number;
  fillOpacity?: number;
  strokeOpacity?: number;
  shape?: string; // specific shape, e.g. triangle
  innerRadius?: number;
}

export type ColorCfg =
  | {
      type: 'rgb' | 'RGB';
      value: RGBColor;
    }
  | {
      type: 'hsl' | 'HSL';
      value: HSLColor;
    };

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}
