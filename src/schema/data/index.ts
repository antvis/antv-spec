// import { DataRow } from './dataRow';

export interface Data {
  type?: 'array' | 'url'; // inline array or external url
  values: any; // array or url
  format?: any; // csv / json for parsing
  config?: any; // config for parsing
}

// export { DataRow };
