import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { pruneShapes, stripNonCommercial } from './scripts/commercial-data.ts';
import { SNAPSHOTS } from './src/shared/data/territories.ts';

/** Writes the offline service worker (src/client/sw.js) to <outDir>/sw.js once the build is on disk, with the list of
 * every output file to precache (lazy model packs and worker chunks included) and a version hashed from their contents. */
function serviceWorker(): Plugin {
  let outDir = 'dist';
  return {
    name: 'ages-service-worker',
    apply: 'build',
    configResolved(c) { outDir = resolve(c.root, c.build.outDir); },
    closeBundle() {
      const files = readdirSync(outDir, { recursive: true, withFileTypes: true })
        .filter(d => d.isFile())
        .map(d => relative(outDir, join(d.parentPath, d.name)).split(sep).join('/'))
        .filter(f => f !== 'sw.js' && f !== 'index.html' && f !== 'CNAME' && f !== '.nojekyll' && !f.endsWith('.map'))
        .sort();
      const hash = createHash('sha256');
      for (const f of files) hash.update(f).update(readFileSync(join(outDir, f)));
      hash.update(readFileSync(join(outDir, 'index.html')));
      const worker = readFileSync(new URL('./src/client/sw.js', import.meta.url), 'utf8');
      hash.update(worker);
      const source = worker
        .replace('__VERSION__', hash.digest('hex').slice(0, 12))
        .replace('[/* __PRECACHE__ */]', JSON.stringify(files));
      writeFileSync(join(outDir, 'sw.js'), source);
    },
  };
}

/** A commercial build (VITE_COMMERCIAL=1) ships the shape store without its non-commercial geometry (NOTICE.md). Runs
 * before the service worker hashes the output. */
function commercialData(): Plugin {
  let outDir = 'dist';
  return {
    name: 'ages-commercial-data',
    apply: 'build',
    configResolved(c) { outDir = resolve(c.root, c.build.outDir); },
    closeBundle() {
      const file = join(outDir, 'data/atlas/shapes.json');
      // imported phases replaced by our own maps (and their admin layers) are not shipped
      const keep = new Set(SNAPSHOTS.filter(s => s.shapes && !s.own).map(s => s.shapes!));
      let store = pruneShapes(JSON.parse(readFileSync(file, 'utf8')), keep);
      if (process.env.VITE_COMMERCIAL === '1') store = stripNonCommercial(store);
      writeFileSync(file, JSON.stringify(store));
    },
  };
}

// BASE_PATH: URL prefix when hosted below the domain root (e.g. "/ages/" on GitHub Pages).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [commercialData(), serviceWorker()],
  server: { port: 5174, hmr: process.env.NOHMR ? false : undefined },
  preview: { port: 4173 },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1350,
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('/node_modules/three/')) return 'three';
          if (id.includes('/src/shared/data/lessons')) return 'atlas-lessons';
          if (id.includes('/src/shared/data/jiangshan')) return 'atlas-chronicle';
          if (id.includes('/src/shared/data/')) return 'atlas-data';
          return undefined;
        },
      },
    },
  },
  // module workers: the model builder runs in a Web Worker (see ADR-004)
  worker: { format: 'es' },
});
