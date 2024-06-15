import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import requireTransform from 'vite-plugin-require-transform';
// import eslintPlugin from 'vite-plugin-eslint';

import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({

  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/var.less";`,
        javascriptEnabled: true,
      }
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag === "iconpark-icon",
        },
      },
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    // eslintPlugin(),
    requireTransform({
      fileRegex: /.ts$|.vue$/,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      '@components': path.resolve(__dirname, 'src/components'),
      '#': path.resolve(__dirname, './'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     }
    //   }
    // },
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,

  }
});
