import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), Components({ resolvers: [AntDesignVueResolver()] })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // https: true,
    proxy: {
      '/api/v1': {
        target: 'https://my.website.com/',
        ws: true,
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      }
    }
  },
  build: {
    sourcemap: false
  }
})
