// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@formkit/auto-animate",
    "nuxt-aos",
    "@nuxtjs/i18n",
    "nuxt-gtag",
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
  // Performance optimizations
  experimental: {
    payloadExtraction: true,
    // inlineSSRStyles было удалено в новых версиях Nuxt
    viewTransition: true,
    componentIslands: true,
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/ https://connect.facebook.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://api.visadoctors.uz http://localhost:8000 https://www.google.com https://www.facebook.com; connect-src 'self' ws: wss: https://api.visadoctors.uz http://localhost:8000 https://www.facebook.com https://www.google.com https://www.recaptcha.net https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com; font-src 'self' data:; object-src 'none'; frame-src 'self' https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/; frame-ancestors 'self' https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/;"
        }
      }
    }
  },
  image: {
    format: ['webp'],
    quality: 80,
    screens: {
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
    },
  },
  gtag: {
    id: 'G-39WFQLEL2M',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'uz'
      },
      link: [
        { rel: 'preconnect', href: process.env.BASE_URL || "https://api.visadoctors.uz" }
      ]
    }
  }
});
