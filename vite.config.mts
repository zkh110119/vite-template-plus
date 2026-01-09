import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 10683,
      strictPort: true,
      open: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 10683,
      strictPort: true,
      open: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/element/index.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`,
      },
    },
    build: {
      /**
       * Harmony OS 4.0 及以前 - M99
       * Harmony OS 5.0       - M114
       * Harmony OS 6.0       - M132(推荐)、M114(兼容旧版本)
       */
      // target: ['chrome114'],
    },
    plugins: [
      vue(),
      AutoImport({
        eslintrc: {
          enabled: true,
        },
        // Options for scanning directories for auto import
        dirsScanOptions: {
          filePatterns: ['*.ts'], // Glob patterns for matching files
          fileFilter: (file) => file.endsWith('.ts'), // Filter files
          types: true, // Enable auto import the types under the directories
        },
        dirs: ['src/composables', 'src/composables/**', 'src/stores'],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: './types/auto-imports.d.ts',
        dtsMode: 'overwrite',
        imports: ['vue', 'pinia', VueRouterAutoImports],
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        globs: ['src/components/*.vue'],
        deep: true,
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: 'types/components.d.ts',
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
        syncMode: 'overwrite',
      }),
      Icons({
        autoInstall: true,
      }),
      VueRouter({
        // how and what folders to scan for files
        routesFolder: [
          {
            src: 'src/pages',
            path: '',
            // override globals
            exclude: (excluded) => excluded,
            filePatterns: (filePatterns) => filePatterns,
            extensions: (extensions) => extensions,
          },
        ],
        // what files should be considered as a pages
        extensions: ['.vue'],
        // what files to include
        filePatterns: ['**/*'],
        // files to exclude from the scan
        exclude: [],
        dts: 'types/typed-router.d.ts',
      }),
    ],
  }
})
