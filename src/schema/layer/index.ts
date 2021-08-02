import { Mark, GraphMarkDef, ChartMarkDef } from '../mark';
import { Encoding, GraphEncoding, ChartEncoding } from '../encoding';

export interface Layer {
  mark: Mark;
  encoding: Encoding;
}

export type ChartLayer = {
  mark: ChartMarkDef;
  encoding: ChartEncoding;
};

export type GraphLayer = {
  mark: GraphMarkDef;
  encoding: GraphEncoding;
};
