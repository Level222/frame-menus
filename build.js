#!/usr/bin/env node

// @ts-check

import process from 'node:process';
import fs from 'node:fs/promises';
import esbuild from 'esbuild';
import copyPlugin from 'esbuild-plugin-copy-watch';

/**
 * @satisfies {import('esbuild').BuildOptions}
 */
const buildOptions = {
  entryPoints: {
    background: 'src/background/index.ts',
  },
  outdir: 'dist',
  bundle: true,
  minify: true,
  plugins: [
    copyPlugin({
      paths: [
        {
          from: 'src/manifest.json',
          to: '.',
        },
        {
          from: 'src/icons/*',
          to: 'icons',
        },
      ],
    }),
  ],
  logLevel: 'info',
};

try {
  await fs.rm(buildOptions.outdir, { recursive: true });
} catch {}

if (process.argv[2] === '--watch') {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
} else {
  await esbuild.build(buildOptions);
}
