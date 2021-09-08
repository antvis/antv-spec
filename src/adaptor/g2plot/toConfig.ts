import { ChartAntVSpec, AxisLabelProps, AxisProps, AxisTitleProps } from '../..';

export type G2PlotType = 'Line' | 'Area' | 'Column' | 'Bar' | 'Pie' | 'Rose' | 'Scatter' | 'Histogram' | 'Heatmap';

const CHART_TYPES_WITH_STACK = ['Area', 'Column', 'Bar'];

/**
 * get chart type (Line / Bar / ...) from spec's mark (bar / line / ...)
 * @param spec input spec
 * @returns chart type
 */
export function markToChart(spec: ChartAntVSpec) {
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
        // pie and donut are all Pie(), with/without innerRadius
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
      case 'rect':
        chartType = 'Heatmap';
        break;
      default:
        chartType = '';
        break;
    }
    return chartType;
  }
  // TODO: other chart types (dual axea, etc)
  return '';
}

/**
 * translate antv-spec to g2plot configuration
 * @param spec
 * @returns configuration to plot g2plot
 */
export function toG2PlotConfg(spec: ChartAntVSpec) {
  // g2plot configuration
  const config: Record<string, any> = {};

  // chart type and g2plot config (to return)
  const configs = {
    chartType: '',
    config,
  };

  // step 1: convert chart type
  const chartType = markToChart(spec);
  configs.chartType = chartType;
  // if not valid g2plot type or not supported yet
  if (!chartType) {
    return {
      chartType: '',
      config,
    };
  }

  // step 2: convert basis
  if (spec.basis) {
    const { basis } = spec;
    // to remove `type` in basis because G2Plot config has property with same name
    const { type, ...basisWithoutType } = basis;
    if (type !== 'chart') {
      return {
        chartType: '',
        config,
      };
    }
    configs.config = basisWithoutType;
  }

  // step 3: convert mark style
  if (spec.layer.length === 1 && 'mark' in spec.layer[0]) {
    if (typeof spec.layer[0].mark !== 'string') {
      // object style to describe 'mark'
      if (spec.layer[0].mark.style) {
        const styles = spec.layer[0].mark.style;
        // for donut chart
        if (styles.innerRadius) {
          // TODO actual innerRadius
          // user input innerRadius may be `px`, but G2Plot treat it as the ratio to the drawing area
          configs.config.innerRadius = styles.innerRadius >= 0 && styles.innerRadius < 1 ? styles.innerRadius : 0.6;
        }

        // for single color declaration of mark
        if (styles.color) {
          configs.config.color = styles.color;
        }
      }

      // line chart && area chart
      if (spec.layer[0].mark.interpolate) {
        if (spec.layer[0].mark.interpolate === 'step') {
          // TODO allow user input hv | vh | hvh | vhv
          configs.config.stepType = 'vh';
        } else if (['hv', 'vh', 'vhv', 'hvh'].includes(spec.layer[0].mark.interpolate)) {
          configs.config.stepType = spec.layer[0].mark.interpolate;
        }
      }
    }
  }

  // step 4: convert data
  if (spec.data.type === 'json-array') {
    configs.config.data = spec.data.values;
  }

  // step 5: convert encoding
  if (spec.layer.length === 1 && 'encoding' in spec.layer[0]) {
    const layer = spec.layer[0];
    Object.keys(layer.encoding).forEach((key) => {
      if (key === 'column' && chartType === 'Column') {
        configs.config.xField = layer.encoding[key]?.field;
      }
      if (key === 'row' && chartType === 'Bar') {
        configs.config.yField = layer.encoding[key]?.field;
      }
      if (key === 'x' || key === 'y') {
        if (chartType === 'Column' && 'column' in layer.encoding && key === 'x') {
          configs.config.seriesField = layer.encoding[key]?.field;
          configs.config.isGroup = true;
        } else if (chartType === 'Bar' && 'row' in layer.encoding && key === 'y') {
          configs.config.seriesField = layer.encoding[key]?.field;
          configs.config.isGroup = true;
        } else {
          configs.config[`${key}Field`] = layer.encoding[key]?.field;
        }
        // check if percentage stacking
        if (layer.encoding[key]?.stack) {
          if (layer.encoding[key]?.stack === 'normalize') {
            configs.config.isPercent = true;
          }
        }
        // axis config
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
      } else if (key === 'size') {
        configs.config.sizeField = layer.encoding[key]?.field;
        // TODO: size scale need to be determined by input
        configs.config.size = [10, 30];
      } else if (key === 'theta') {
        configs.config.angleField = layer.encoding[key]?.field;
      } else if (key === 'color') {
        if (CHART_TYPES_WITH_STACK.includes(chartType)) {
          // stacking
          configs.config.seriesField = layer.encoding[key]?.field;
          configs.config.isStack = true;
        } else {
          configs.config.colorField = layer.encoding[key]?.field;
        }
        if (layer.encoding[key]?.scale && layer.encoding[key]?.scale.range) {
          // define color
          configs.config.color = layer.encoding[key]?.scale.range;
        }
      }
    });
  }

  return configs;
}
