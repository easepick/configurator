import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { obfuscator } from 'rollup-obfuscator';

const ENV_PROD = process.env.BUILD === 'production';

export default {
  input: 'src/index.ts',
  output: {
    file: `dist/index.js`,
    format: 'umd',
    globals(id) {
      if (/^@easepick\//.test(id)) {
        return 'easepick';
      }

      return id;
    }
  },
  plugins: [
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
    ENV_PROD && obfuscator({
      domainLock: ['127.0.0.1', 'localhost', 'easepick.com'],
      domainLockRedirectUrl: 'https://easepick.com',
      deadCodeInjection: true,
    }),
    // copy({
    //   targets: [
    //     { src: 'dist/**/*', dest: '../easepick-docs/assets/configurator' },
    //   ],
    //   hook: 'writeBundle',
    // }),
  ],
  external(id) {
    return /^@easepick\//.test(id);
  }
};