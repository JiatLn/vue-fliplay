import * as path from 'path'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default () => {
  // 加载 .env.[mode]
  return defineConfig({
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        '~/': `${path.resolve(__dirname, 'src')}/`,
        'Flipper': path.resolve(__dirname, '../src/index.ts'),
      },
    },
    plugins: [
      Vue(),
      VueJsx(),
      Unocss(),
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
        ],
        dts: 'src/auto-import.d.ts',
        dirs: [
          'src/composables',
        ],
        vueTemplate: true,
        resolvers: [],
      }),
      Components({
        dts: 'src/components.d.ts',
        resolvers: [],
      }),
    ],
    server: {
      host: '0.0.0.0',
    },
    // to solve warning: "@charset" must be the first rule in the file
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
    },
    build: {
      // 浏览器兼容性
      target: 'es2015',
      assetsDir: 'assets',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  })
}
