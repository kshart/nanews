// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
    '@artmizu/yandex-metrika-nuxt',
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png', sizes: '192x192' },
        { rel: 'icon', type: 'image/png', href: '/android-chrome-512x512.png', sizes: '512x512' },
      ],
    }
  },
  runtimeConfig: {
    public: {
      yandexMetrika: {
        initParams: {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true
        }
      },
    },
  },
  build: {
    analyze: true,
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
      },
    },
  },
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 1_000_000,
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },
})
