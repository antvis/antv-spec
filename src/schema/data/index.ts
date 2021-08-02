import { DataRow } from './dataRow';
import { GraphData } from './graphData';

export type Data = GraphInlineData | GraphOnlineData | ChartInlineData | ChartOnlineData;

export type ChartDataDef = ChartInlineData | ChartOnlineData;
export type GraphDataDef = GraphInlineData | GraphOnlineData;

type DataConfig = {
  delimiter?: string;
};

export type GraphInlineData = {
  /**
   * type of `values`
   */
  type?: 'json';
  values: GraphData;
};

export type GraphOnlineData = {
  type?: 'url';
  /**
   * URL of the data source.
   */
  values: string;
  /**
   * type of the data, for correctly parsing
   */
  format?: 'json';
};

export type ChartInlineData = {
  type?: 'json-array';
  values: DataRow[];
};

export type ChartOnlineData = {
  type?: 'url';
  /**
   * URL of the data source.
   */
  values: string;
  /**
   * type of the data, for correctly parsing
   */
  format?: 'csv' | 'json';
  /**
   * config for parsing data
   */
  config?: DataConfig;
};

export { DataRow };
