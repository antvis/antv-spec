export interface Layout {
  /** layout type */
  type:
    | 'random'
    | 'radial'
    | 'mds'
    | 'circular'
    | 'fruchterman'
    | 'force'
    | 'gForce'
    | 'dagre'
    | 'concentric'
    | 'grid'
    | 'forceAtlas2';
  /** the field name used to map nodes in the `json` type data */
  nodes: string;
  /** the field name used to map links in the `json` type data */
  links: string;
}
