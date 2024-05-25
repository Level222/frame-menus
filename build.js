#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import esbuild from 'esbuild';
import cleanPlugin from 'esbuild-plugin-clean';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import htmlMinifierPlugin from 'esbuild-plugin-html-minifier-terser';

const offscreenIn = 'src/offscreen/index.ts';
const outdir = 'dist';

/**
 * @type {import('esbuild').BuildOptions}
 */
const buildOptions = {
  entryPoints: [
    { in: 'src/background/index.ts', out: 'background' },
    { in: offscreenIn, out: 'offscreen' },
    { in: 'src/manifest.json', out: 'manifest' },
    ...(await fs.readdir('src/icons')).map((fileName) => (
      { in: `src/icons/${fileName}`, out: `icons/${path.parse(fileName).name}` }
    )),
  ],
  loader: {
    '.json': 'copy',
    '.png': 'copy',
  },
  outdir,
  bundle: true,
  minify: true,
  metafile: true,
  logLevel: 'info',
  plugins: [
    cleanPlugin({
      patterns: outdir,
    }),
    htmlPlugin({
      files: [{
        entryPoints: [offscreenIn],
        filename: 'offscreen.html',
      }],
    }),
    htmlMinifierPlugin(),
  ],
};

const { values: { watch } } = parseArgs({
  options: {
    watch: {
      type: 'boolean',
    },
  },
});

if (watch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
} else {
  await esbuild.build(buildOptions);
}
