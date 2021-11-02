import { uglify } from 'rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.min.js',
      name: 'antv-spec',
      format: 'umd',
      sourcemap: false,
    },
    plugins: [resolve(), typescript(), uglify()],
    external: ['@antv/g2-plot', '@antv/g6']
  },
];
