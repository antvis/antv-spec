import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.min.js',
      name: 'AntVSpec',
      format: 'umd',
      sourcemap: 'inline',
      globals: {
        '@antv/g2plot': 'G2Plot',
        '@antv/g6': 'G6',
      },
    },
    plugins: [resolve(), commonjs(), typescript({ module: 'ESNext' }), terser(), json()],
    external: ['@antv/g2plot', '@antv/g6'],
  },
];
