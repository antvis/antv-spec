export type Mark =
  | MarkType
  | {
      type: MarkType;
      style?: MarkStyleConfig;
    };

/**
 * Mark definition for `Chart` type visualization
 */
export type ChartMarkDef =
  | ChartMarkType
  | {
      type: ChartMarkType;
      style?: MarkStyleConfig;
    };

/**
 * Mark definition for `Graph` type visualization
 */
export type GraphMarkDef =
  | GraphMarkType
  | {
      type: GraphMarkType;
      style?: MarkStyleConfig;
    };

/**
 * Mark type supported by antv-spec
 */
export type MarkType = ChartMarkType | GraphMarkType;
export type ChartMarkType = 'bar' | 'line' | 'arc' | 'area' | 'point';
export type GraphMarkType = 'node' | 'link';

/**
 * Mark style configuration
 */
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
  /**
   * @minimum 0
   * @maximum 255
   */
  r: number;
  /**
   * @minimum 0
   * @maximum 255
   */
  g: number;
  /**
   * @minimum 0
   * @maximum 255
   */
  b: number;
}

export interface HSLColor {
  /**
   * @minimum 0
   * @maximum 360
   */
  h: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  s: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  l: number;
}
