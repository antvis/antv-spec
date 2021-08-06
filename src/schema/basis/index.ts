export type Basis = ChartBasis | GraphBasis;

export type ChartBasis = GenericBasis & {
  /** indicate what kind of visualization this spec is about */
  type: 'chart';
};

export type GraphBasis = GenericBasis & {
  /** indicate what kind of visualization this spec is about */
  type: 'graph';
};

interface GenericBasis {
  /**
   * vis's width
   * @minimum 0
   */
  width?: number;
  /**
   * vis's height
   * @minimum 0
   */
  height?: number;
  /**
   * vis's padding
   */
  padding?: number[] | number | 'auto';
}
