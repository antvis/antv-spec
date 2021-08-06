import { AntVSpec } from '../../../../src';
import { GraphData } from '../../../../src/schema/data/graphData';

const colors = [
  '#BDD2FD',
  '#BDEFDB',
  '#C2C8D5',
  '#FBE5A2',
  '#F6C3B7',
  '#B6E3F5',
  '#D3C6EA',
  '#FFD8B8',
  '#AAD8D8',
  '#FFD6E7',
];
const strokes = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
];
export function specToG6(spec: AntVSpec) {
  const config: Record<string, any> = {};
  const g6Cfg = {
    cfg: config,
    data: {},
  };

  if (spec.basis) {
    if (spec.basis?.height) {
      g6Cfg.cfg.height = spec.basis?.height;
    }
    if (spec.basis?.width) {
      g6Cfg.cfg.width = spec.basis?.width;
    }
  }

  if ('layout' in spec) {
    const layoutCfg: Record<string, any> = {};
    if (spec.layout?.type) {
      layoutCfg.type = spec.layout.type;
    }
    g6Cfg.cfg.layout = layoutCfg;
  }

  // convert data to { "nodes": [{...}, ], "links": [{...}, ]}
  const dataVals = spec.data.values;
  // nodes
  const nodesField = 'layout' in spec ? spec.layout?.nodes : null;
  const linksField = 'layout' in spec ? spec.layout?.links : null;
  if (
    !nodesField ||
    !linksField ||
    !Object.prototype.hasOwnProperty.call(dataVals, nodesField) ||
    !Object.prototype.hasOwnProperty.call(dataVals, linksField)
  ) {
    return g6Cfg;
  }
  const g6Data: Record<string, any> = {};
  if (nodesField && (dataVals as GraphData)[nodesField]) {
    g6Data.nodes = (dataVals as GraphData)[nodesField];
  }
  if (linksField && (dataVals as GraphData)[linksField]) {
    g6Data.edges = (dataVals as GraphData)[linksField];
  }

  // mapping size/color encoding of edges and nodes in data
  const { nodes } = g6Data;
  nodes.forEach((node: any) => {
    const updateNode = node;
    updateNode.oriSize = updateNode.size;
    updateNode.oriLabel = updateNode.label;
    return updateNode;
  });
  const nodesEnc = 'nodes' in spec.layer[0] ? spec.layer[0].nodes : null;
  if (nodesEnc) {
    if (nodesEnc.encoding.color) {
      // have color encoding for nodes
      const colorField = nodesEnc.encoding.color.field;
      const clusterMap = new Map();
      let clusterId = 0;
      nodes.forEach((node: any) => {
        const updateNode = node;
        // cluster
        if (node[colorField] && clusterMap.get(node[colorField]) === undefined) {
          clusterMap.set(node[colorField], clusterId);
          clusterId += 1;
        }
        const cid = clusterMap.get(node[colorField]);
        if (!updateNode.style) updateNode.style = {};
        updateNode.style.fill = colors[cid % colors.length];
        updateNode.style.stroke = strokes[cid % strokes.length];
        return updateNode;
      });
    }
    if (nodesEnc.encoding.size) {
      // have size encoding for nodes
      if (nodesEnc.encoding.size.field !== 'size') {
        // if size field not 'size', should add 'size' in data.nodes
        const sizeField = nodesEnc.encoding.size.field;
        nodes.forEach((node: any) => {
          const updateNode = node;
          updateNode.size = updateNode[sizeField];
          return updateNode;
        });
      }
    }
  }

  const { edges } = g6Data;
  const edgesEnc = 'links' in spec.layer[0] ? spec.layer[0].links : null;
  if (edgesEnc) {
    if (edgesEnc.encoding.color) {
      // have color encoding for edges
      const colorField = edgesEnc.encoding.color.field;
      const clusterMap = new Map();
      let clusterId = 0;
      edges.forEach((edge: any) => {
        const updateEdge = edge;
        // cluster
        if (edge[colorField] && clusterMap.get(edge[colorField]) === undefined) {
          clusterMap.set(edge[colorField], clusterId);
          clusterId += 1;
        }
        const cid = clusterMap.get(edge[colorField]);
        if (!updateEdge.style) updateEdge.style = {};
        updateEdge.style.stroke = strokes[cid % strokes.length];
        return updateEdge;
      });
    }
    if (edgesEnc.encoding.size) {
      // have size encoding for edges
      const sizeField = edgesEnc.encoding.size.field;
      edges.forEach((edge: any) => {
        const updateEdge = edge;
        if (!updateEdge.style) updateEdge.style = {};
        updateEdge.style.lineWidth = updateEdge[sizeField];
        return updateEdge;
      });
    }
  }

  g6Cfg.data = g6Data;
  g6Cfg.cfg.modes = {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
  };
  return g6Cfg;
}
