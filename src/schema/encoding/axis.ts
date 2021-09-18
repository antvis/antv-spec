export interface AxisTitleConfig {
  text?: string;
  position?: string;
  // TODO: fill what AVA contains
}

export interface AxisLabelConfig {
  offset?: number;

  angle?: number;
  autoRotate?: boolean;
  autoHide?: boolean;
  autoEllipsis?: boolean;

  // TODO: function
  formatter?: any;
  // TODO: style
}
export interface Axis {
  /**
   * whether draw the axis on the top of the layer
   */
  top?: boolean;
  /**
   * direction of the axis, top | bottom | left | right
   */
  position?: string;
  /**
   * title of the axis
   */
  title?: AxisTitleConfig;
  /**
   * label of the axis
   */
  label?: AxisLabelConfig;
  /**
   * min of the axis
   */
  min?: number;
  /**
   * max of the axis
   */
  max?: number;
  /**
   * interval of the ticks in the axis
   */
  tickInterval?: number;
  /**
   * whether to show ticks in the axis
   */
  ticks?: boolean;
  /**
   * whether to draw the domain line of the axis
   */
  domain?: boolean;
}

export const AxisProps = ['top', 'position', 'title', 'label', 'min', 'max', 'tickInterval'] as const;
export const AxisTitleProps = ['text', 'position'] as const;
export const AxisLabelProps = ['offset', 'angle', 'autoRotate', 'autoHide', 'autoEllipsis', 'formatter'] as const;

/**
 * @public
 */
// export type AxisProps = typeof AXIS_PROPS[number];

// /**
//  * @public
//  */
// export type AxisTitleProps = typeof AXIS_TITLE_PROPS[number];

//  /**
//  * @public
//  */
// export type AxisLabelProps = typeof AXIS_LABEL_PROPS[number];
