// plugins/vue-recaptcha-v3.client.ts
import { defineNuxtPlugin } from "#app";
import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha as any, {
    siteKey: "6LdD5eYqAAAAAKDva7Yf5V7kjzWtpEHJftZPloWc",
    loaderOptions: {
      autoHideBadge: true,
    },
  });
});
