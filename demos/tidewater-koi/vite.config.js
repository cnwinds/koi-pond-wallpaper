import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const demoRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: demoRoot,
  base: './',
  publicDir: false,
  server: {
    host: '127.0.0.1',
    port: 5190,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 5190,
    strictPort: true,
  },
  build: {
    outDir: resolve(demoRoot, 'dist'),
    emptyOutDir: true,
    target: 'esnext',
  },
});
