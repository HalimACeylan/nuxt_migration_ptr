// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      pinataApiKey: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-icon'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
