import typescript from '@rollup/plugin-typescript';
import define from 'rollup-plugin-define';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');
const ENV_PROD = process.env.BUILD === 'production';

export default {
  input: 'src/index.ts',
  output: {
    file: `dist/index.js`,
    format: 'umd',
    banner: `/**
* @license
* Package: ${pkg.name}
* Version: ${pkg.version}
* https://easepick.com/
* Copyright ${(new Date()).getFullYear()} Rinat G.
* 
* Licensed under the terms of GNU General Public License Version 2 or later. (http://www.gnu.org/licenses/gpl.html)
*/`,
    globals(id) {
      if (/^@easepick\//.test(id)) {
        return 'easepick';
      }

      return id;
    }
  },
  plugins: [
    define({
      replacements: {
        __VERSION__: JSON.stringify(pkg.version),
      }
    }),
    nodeResolve(),
    typescript({
      tsconfig: 'tsconfig.json',
      outputToFilesystem: false,
    }),
    postcss({
      extract: 'index.css',
      plugins: [autoprefixer],
      minimize: true,
    }),
    ENV_PROD && terser(),
  ],
  external(id) {
    return /^@easepick\//.test(id);
  }
};