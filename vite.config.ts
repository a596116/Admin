import { fileURLToPath, URL } from 'node:url'

import type { ConfigEnv } from 'vite'
import { setupPlugins } from './vite/plugins'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): any => {
  const isBuild = command === 'build'

  return {
    plugins: [...setupPlugins()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
          // manualChunks(id: string) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   }
          // },
        },
      },
      cssCodeSplit: true,
      chunkSizeWarningLimit: 2000,
      sourcemap: false,
      minify: false,
      assetsInLineLimit: 5000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "#/scss/base.scss";',
        },
      },
    },
    terserOptions: {
      compress: {
        // drop_console: true,
        // drop_debugger: true,
      },
    },
    server: {
      port: 3069,
      // base: "./ ", //生产环境路径
      proxy: {
        '/api': {
          target: process.env.VITE_BASEURL,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
        '/upload': {
          target: process.env.VITE_BASEURL,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/upload/, ''),
        },
      },
      cors: true,
    },
  }
}
