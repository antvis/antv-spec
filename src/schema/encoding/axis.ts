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
  // whether draw the axis on the top of the layer
  top?: boolean;
  // direction of the axis, top | bottom | left | right
  position?: string;
  // title of the axis
  title?: AxisTitleConfig;
  // label of the axis
  label?: AxisLabelConfig;
  // TODO: grid
}
