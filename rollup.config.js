import { uglify } from 'rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/antv-spec.min.js',
      name: 'antv-spec',
      format: 'umd',
      sourcemap: false,
    },
    plugins: [resolve(), typescript(), uglify()],
  },
];
