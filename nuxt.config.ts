// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  nitro: {
    routeRules:{
      '/backend/**' : {
        proxy: 'http://localhost:8000/**'
      }, 
    }
  },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@invictus.codes/nuxt-vuetify',
    '@vueuse/nuxt',
    "@nuxt/image"
  ],
  pinia: {
    storesDirs: ['./stores/**'] 
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
          myCustomLightTheme: {
            colors: {
              background: '#fff',
              surface: '#FFFFFF',
              primary: '#05668D',
              primaryVariant: '#028090',
              secondary: '#00A896',
              'secondary-variant': '#02C39A',
              error: '#B00020',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FB8C00',
            },
          }
          
        }
      }
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
    },
  },
})