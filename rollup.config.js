import babel from 'rollup-plugin-babel';
import importJson from '@rollup/plugin-json';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

export default [{
  input: 'src/index.js',
  output: [{
    file: 'dist/index.js',
    format: 'cjs',
  }, {
    file: 'dist/index.ejs',
    format: 'es',
  }], // you can remove one of these two output configs if you like
  external: [], // external node modules
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
    importJson(),
    babel({
      exclude: 'node_modules/**',
    }),
    terser({
      keep_fnames: true,
    }),
  ],
}, {
  input: 'src/cli.js',
  output: [{
    file: 'dist/cli.js',
    format: 'cjs',
  }],
  plugins: [
    preserveShebangs(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
    importJson(),
    babel({
      exclude: 'node_modules/**',
    }),
    terser({
      keep_fnames: true,
    }),
  ],
}];
