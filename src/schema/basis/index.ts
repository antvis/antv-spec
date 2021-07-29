// TODO: restrict `renderer` input?
export interface Basis {
  /** indicate what kind of visualization this spec is about */
  type?: 'chart' | 'graph';
  width?: number;
  height?: number;
  padding?: number[] | number | 'auto';
}
