<script setup>
import SeoJsonLd from "~/components/SeoJsonLd.vue";

const {t} = useI18n();
const colorMode = useColorMode();

onMounted(() => {
  colorMode.value = "light";
});

useHead({
  link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
  htmlAttrs: {lang: "uz"},
  meta: [{name: "darkreader-lock"}],
  script: [
    {
      children: `!function(f,b,e,v,n,t,s){
  if(f.fbq)return;n=f.fbq=function(){
    n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
  };
  if(!f._fbq)f._fbq=n;
  n.push=n;
  n.loaded=!0;
  n.version='2.0';
  n.queue=[];
  t=b.createElement(e);t.async=!0;
  t.src=v;
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)
}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '9550349828389145');
fbq('track', 'PageView');`,
      type: "text/javascript",
    },
  ],
});

useSeoMeta({
  title: t("og_title"),
  description: t("og_description"),
  ogTitle: t("og_title"),
  ogDescription: t("og_description"),
  twitterTitle: t("og_title"),
  twitterDescription: t("og_description"),
  twitterCard: "summary_large_image",
  ogImage: "/og-image.png",
  twitterImage: "/og-image.png",
  ogImageWidth: "1200", // Increased image dimensions for better sharing
  ogImageHeight: "630",
  ogUrl: "https://visadoctors.uz",
  // Add additional meta tags for better SEO with Uzbek keywords
  keywords: "Korea education, study in Korea, Korean university, Korean visa, student visa Korea, Korean language courses, Seoul university, Busan university, Korean education visa, Korean visa application, Koreyada o'qish, Koreya universitetlari, Koreya vizasi, Koreyaga o'qishga kirish, Seul universiteti, Busan universiteti, Koreya talabalik vizasi, viza olish",
  robots: "index, follow",
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>

    <UNotifications/>
    <SeoJsonLd />
  </div>
</template>

<style>
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

</style>
