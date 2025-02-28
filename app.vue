<script setup>
const colorMode = useColorMode();

onMounted(() => {
  colorMode.value = "light";
});

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  htmlAttrs: { lang: "uz" },
});

const title = "Koreyada Ta’lim – Oson va Ishonchli Yo‘l";
const description =
  "Koreyada o‘qishni xohlaysizmi? Universitetga kirish, stipendiyalar, viza va boshqa muhim jarayonlarda sizga yordam beramiz. Orzuyingizni biz bilan ro‘yobga chiqaring!";
useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: "summary",
  ogImage: "/og-image.png",
  twitterImage: "/og-image.png",
  ogImageWidth: "250",
  ogImageHeight: "250",
  // ogUrl: "",
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
