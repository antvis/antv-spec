import { AntVSpec, AxisLabelProps, AxisProps, AxisTitleProps } from '../../../../src';

export type G2PlotType = 'Line' | 'Area' | 'Column' | 'Bar' | 'Pie' | 'Rose' | 'Scatter' | 'Histogram' | 'Heatmap';

export function markToChart(spec: any) {
  if (spec.layer.length === 1) {
    const layer = spec.layer[0];
    const mark = typeof layer.mark === 'string' ? layer.mark : layer.mark.type;
    let chartType;
    switch (mark) {
      case 'line':
        chartType = 'Line';
        break;
      case 'area':
        chartType = 'Area';
        break;
      case 'point':
        chartType = 'Scatter';
        break;
      case 'arc':
        // TODO
        chartType = 'Pie';
        break;
      case 'bar': {
        const hasX = layer.encoding.x;
        const xType = hasX ? hasX.type : '';
        if (xType === 'quantitative') {
          chartType = 'Bar';
        } else {
          chartType = 'Column';
        }
        break;
      }
      default:
        chartType = '';
    }
    return chartType;
  }
  // TODO: dual axes and default
  return '';
}

export function specToG2Plot(spec: AntVSpec) {
  const config: Record<string, any> = {};
  const configs = {
    chartType: '',
    config,
  };
  // convert chart type
  const chartType = markToChart(spec);
  configs.chartType = chartType;
  // if not valid g2plot type
  if (!chartType) {
    return configs;
  }

  // convert basis
  if (spec.basis) {
    const { basis } = spec;
    configs.config = basis;
  }

  // convert data
  if (spec.data.type === 'json-array') {
    configs.config.data = spec.data.values;
  }

  // convert encoding
  if (spec.layer.length === 1) {
    const layer = spec.layer[0];
    Object.keys(layer.encoding).forEach((key) => {
      if (key === 'x' || key === 'y') {
        configs.config[`${key}Field`] = layer.encoding[key]?.field;
        const tmpAxis = layer.encoding[key]?.axis;
        const tmpAxisCfg: any = {};
        AxisProps.forEach((prop) => {
          if (prop === 'title') {
            const tmpTitle = layer.encoding[key]?.axis?.title;
            if (tmpTitle) {
              const tmpTitleCfg: any = {};
              AxisTitleProps.forEach((prop) => {
                if (tmpTitle && Object.prototype.hasOwnProperty.call(tmpTitle, prop)) {
                  tmpTitleCfg[prop] = tmpTitle[prop];
                }
              });
              tmpAxisCfg.title = tmpTitleCfg;
            }
          } else if (prop === 'label') {
            const tmpLabel = layer.encoding[key]?.axis?.label;
            if (tmpLabel) {
              const tmpLabelCfg: any = {};
              AxisLabelProps.forEach((prop) => {
                if (tmpLabel && Object.prototype.hasOwnProperty.call(tmpLabel, prop)) {
                  tmpLabelCfg[prop === 'angle' ? 'rotate' : prop] = tmpLabel[prop];
                }
              });
              tmpAxisCfg.label = tmpLabelCfg;
            }
          } else if (tmpAxis && Object.prototype.hasOwnProperty.call(tmpAxis, prop)) {
            tmpAxisCfg[prop] = tmpAxis[prop];
          }
        });
        if (tmpAxis) {
          configs.config[`${key}Axis`] = tmpAxisCfg;
        }
      } else if (key === 'theta') {
        configs.config.angleField = layer.encoding[key]?.field;
      } else if (key === 'color') {
        configs.config.colorField = layer.encoding[key]?.field;
      }
    });
  }

  return configs;
}
