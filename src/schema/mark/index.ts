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
      /**
       * for `line` and `area` only
       * TODO: 'step' is used in AVA but more interpolate type can be defined
       */
      interpolate?: 'step';
      style?: MarkStyleConfig;
    };

/**
 * Mark definition for node of `Graph` type visualization
 */
export type NodeMarkDef =
  | NodeMarkType
  | {
      type: NodeMarkType;
      style?: MarkStyleConfig;
    };

/**
 * Mark definition for link of `Graph` type visualization
 */
export type LinkMarkDef =
  | LinkMarkType
  | {
      type: LinkMarkType;
      style?: MarkStyleConfig;
    };

/**
 * Mark type supported by antv-spec
 */
export type MarkType = ChartMarkType | GraphMarkType;
export const CHART_MARK_TYPES = ['bar', 'line', 'arc', 'area', 'point', 'rect'] as const;
export type ChartMarkType = typeof CHART_MARK_TYPES[number];
export type GraphMarkType = NodeMarkType & LinkMarkType;
export const NODE_MARK_TYPES = ['point', 'arc', 'rect'];
export type NodeMarkType = typeof NODE_MARK_TYPES[number];
export const LINK_MARK_TYPES = ['line'];
export type LinkMarkType = typeof LINK_MARK_TYPES[number];

/**
 * Mark style configuration
 */
interface MarkStyleConfig {
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
