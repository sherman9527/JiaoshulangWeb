import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// GitHub Pages 无 SPA 路由回退：未知路径会走 404.html。
// 构建后把 index.html 复制为 404.html，任意深链/刷新都能加载 SPA，
// 再由 React Router 的 catch-all 路由渲染 NotFoundPage。
function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const dist = resolve(__dirname, 'dist');
      const index = resolve(dist, 'index.html');
      if (existsSync(index)) {
        copyFileSync(index, resolve(dist, '404.html'));
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  // GitHub Pages: base 设为仓库名，生产构建时生效
  // 部署后访问: https://<username>.github.io/JiaoshulangWeb/
  base: mode === 'production' ? '/JiaoshulangWeb/' : '/',

  plugins: [
    react(),
    // 生产构建时启用 JavaScript 混淆
    mode === 'production' &&
      obfuscatorPlugin({
        options: {
          // 混淆强度：medium 平衡性能和安全性
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.4,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.2,
          debugProtection: false,
          disableConsoleOutput: true,
          identifierNamesGenerator: 'hexadecimal',
          log: false,
          numbersToExpressions: true,
          renameGlobals: false,
          selfDefending: false,
          simplify: true,
          splitStrings: true,
          splitStringsChunkLength: 10,
          stringArray: true,
          stringArrayCallsTransform: true,
          stringArrayEncoding: ['rc4'],
          stringArrayIndexShift: true,
          stringArrayRotate: true,
          stringArrayShuffle: true,
          stringArrayWrappersCount: 2,
          stringArrayWrappersType: 'function',
          stringArrayThreshold: 0.75,
          transformObjectKeys: true,
          unicodeEscapeSequence: false,
        },
      }),
    spaFallback404(),
  ].filter(Boolean),

  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },

  build: {
    // 混淆后文件会变大，设置合理的 chunk 大小警告阈值
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // 手动分包，混淆后各包独立
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
}));
