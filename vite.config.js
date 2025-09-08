import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    cors: {
      origin: [
        'http://localhost:*',
        'https://*.webflow.io',
        'https://*.webflow.com'
      ],
      credentials: true,
      methods: ['GET', 'POST'],
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        router: './src/router.js',
        // Add your scripts here as they grow
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        format: 'iife'
      }
    },
    minify: true,
    sourcemap: false
  },
  base: './'
});