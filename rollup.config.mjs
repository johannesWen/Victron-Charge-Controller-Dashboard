import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/victron-charge-controller-card.js',
  output: {
    file: 'dist/victron-charge-controller-card.js',
    format: 'es',
    sourcemap: dev ? true : false,
  },
  plugins: [
    resolve(),
    !dev && terser({ output: { comments: false } }),
  ],
};
