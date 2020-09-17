import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import pkg from './package.json';

const input = 'src/index.ts';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'child_process',
  'fs',
  'path',
  'os',
  'https',
  'readline',
  'zlib',
  'events',
  'stream',
  'util',
  'buffer',
];

const plugins = [
  commonjs(),
  globals(),
  resolve({
    mainFields: ['module', 'main'],
    extensions,
  }),
];

const createConfig = (inpt, outpt, format) => {
  return {
    input: inpt,
    output: {
      file: outpt,
      format,
      sourcemap: true,
    },
    plugins,
    external,
  };
};

export default [
  createConfig(input, pkg.main, 'cjs'),
  createConfig(input, pkg.module, 'esm'),
];
