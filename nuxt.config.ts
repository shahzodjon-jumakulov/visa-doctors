// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@formkit/auto-animate",
    "nuxt-aos",
    "@nuxtjs/i18n",
  ],
  compatibilityDate: "2025-02-23",
  css: ["~/assets/css/main.scss"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://api.visadoctors.uz",
    },
  },
  colorMode: { preference: "light" },
  build: {
    transpile: ["ohash"],
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    strategy: "prefix_and_default",
    locales: ["uz", "en"],
    defaultLocale: "uz",
  },
  aos: {
    anchorPlacement: "top-bottom",
    once: true,
  },
});
