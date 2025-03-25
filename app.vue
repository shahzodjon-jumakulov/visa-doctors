<script setup>
const { t } = useI18n();
const colorMode = useColorMode();

onMounted(() => {
  colorMode.value = "light";
});

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  htmlAttrs: { lang: "uz" },
  meta: [{ name: "darkreader-lock" }],
});

useSeoMeta({
  title: t("og_title"),
  description: t("og_description"),
  ogTitle: t("og_title"),
  ogDescription: t("og_description"),
  twitterTitle: t("og_title"),
  twitterDescription: t("og_description"),
  twitterCard: "summary",
  ogImage: "/og-image.png",
  twitterImage: "/og-image.png",
  ogImageWidth: "250",
  ogImageHeight: "250",
  ogUrl: "https://visadoctors.uz",
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>

<style>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>
