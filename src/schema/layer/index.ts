import { ChartMarkDef, NodeMarkDef, LinkMarkDef } from '../mark';
import { ChartEncoding, NodeEncoding, LinkEncoding } from '../encoding';

export type ChartLayer = {
  mark: ChartMarkDef;
  encoding: ChartEncoding;
};

export type GraphLayer = {
  nodes: NodeDef;
  links: LinkDef;
};

type NodeDef = {
  mark: NodeMarkDef;
  encoding: NodeEncoding;
};

type LinkDef = {
  mark: LinkMarkDef;
  encoding: LinkEncoding;
};
