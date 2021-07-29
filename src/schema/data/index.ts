import { DataRow } from './dataRow';
import { dataGraph } from './dataGraph';

export interface Data {
  type?: 'json-array' | 'json' | 'url'; // inline array or external url
  values: DataRow[] | string | dataGraph; // array or url
  format?: 'csv' | 'json'; // csv / json for parsing
  config?: DataConfig; // config for parsing
}

type DataConfig = {
  delimiter?: string;
};

export { DataRow };
