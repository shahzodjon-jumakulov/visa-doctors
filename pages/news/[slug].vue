<script setup>
const { newsItems } = useNews();
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const post = computed(() => {
  return newsItems.value.find(item => item.slug === route.params.slug);
});

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const recommendedPosts = computed(() => {
  return newsItems.value.filter(item => item.slug !== route.params.slug).slice(0, 3);
});
</script>

<template>
  <div class="py-12 md:py-20">
    <UContainer v-if="post">
      <NuxtLink :to="localePath('/news')" class="inline-flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors font-semibold">
        <span v-html="t('news.back_to_news')"></span>
      </NuxtLink>

      <article class="max-w-4xl mx-auto mt-8">
        <span class="text-sm font-semibold text-red-500">{{ t(post.category) }}</span>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight mt-2">{{ t(post.title) }}</h1>
        <p class="mt-4 text-lg text-gray-500">{{ post.date }}</p>

        <div class="aspect-video overflow-hidden rounded-2xl my-8">
          <img :src="post.image" :alt="t(post.title)" class="w-full h-full object-cover">
        </div>

        <div class="prose prose-lg max-w-none">
          <p>{{ t(post.content) }}</p>
        </div>
      </article>

      <!-- Recommended Posts -->
      <div class="max-w-5xl mx-auto mt-16 pt-12 border-t border-gray-200" v-if="recommendedPosts.length">
        <h2 class="text-3xl font-bold text-center mb-8">{{ t('news.recommended_posts') }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NewsCard v-for="recPost in recommendedPosts" :key="recPost.slug" :post="recPost" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
