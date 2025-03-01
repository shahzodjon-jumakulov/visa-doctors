// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@formkit/auto-animate", "nuxt-aos"],
  compatibilityDate: "2025-02-23",
  css: ["~/assets/css/main.scss"],
  colorMode: { preference: "light" },
  build: {
    transpile: ["ohash"]
  },
});
