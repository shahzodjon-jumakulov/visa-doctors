<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Visa Doctors - Koreyada ta'lim olish uchun ishonchli hamkor"
  },
  description: {
    type: String,
    default: "Koreyada ta'lim olish uchun so'rovnoma to'ldiring va biz sizga yordam beramiz. Universitet qabuli, stipendiya va viza olishda professional yordam."
  },
  keywords: {
    type: String,
    default: "koreya universiteti, koreya stipendiya, koreya viza, koreya ta'lim, koreya grant"
  }
});

useHead({
  title: props.title,
  meta: [
    {name: 'description', content: props.description},
    {name: 'keywords', content: props.keywords},
    {property: 'og:title', content: props.title},
    {property: 'og:description', content: props.description},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://visadoctors.uz'},
    {property: 'og:image', content: '/og-image.jpg'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: props.title},
    {name: 'twitter:description', content: props.description},
    {name: 'twitter:image', content: '/og-image.jpg'},
    {'http-equiv': 'Content-Language', content: 'uz'},
    {name: 'robots', content: 'index, follow'}
  ],
  htmlAttrs: {
    lang: 'uz'
  }
});
</script>

<template>
  <div></div>
</template> 