import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    // 显示启用响应式语法糖 支持对 defineProps 结果结构
    reactivityTransform: true
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#0960bd'
        },
        javasciptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ihrm.itheima.net',
        changeOrigin: true
      }
    }
  }
})
