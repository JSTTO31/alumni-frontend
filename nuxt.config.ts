// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@invictus.codes/nuxt-vuetify',
  ],
  pinia: {
    storesDirs: ['./stores/**'] 
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },
    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true ,
      useIconCDN: true ,
      /* vite-plugin-vuetify options */
      styles: true ,
      autoImport: true ,
      useVuetifyLabs: true , 
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'logo',
          href: './public/chief.png',
          type: 'image/x-icon'
        }
      ]
    }
  },
  routeRules: {
    '/' : {ssr: false},
    '/auth/login' : {ssr: false},
    '/auth/register' : {ssr: false},
  }
})
