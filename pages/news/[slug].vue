<script setup>
const { fetchNewsBySlug } = useNews();
const { formatContent } = useContent();
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const slug = route.params.slug;

// 1. Fetch the single post
const { data: post, pending, error } = await fetchNewsBySlug(slug);

// Handle 404 Not Found error from the API
if (error.value && error.value.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

// 2. Use the recommended_posts array directly from the API response
const recommendedPosts = computed(() => {
  return post.value?.recommended_posts || [];
});
</script>

<template>
  <div class="py-12 md:py-20">
    <UContainer>
      <!-- Loading State -->
      <div v-if="pending" class="text-center py-20">
        <p class="text-lg">Loading article...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20 text-red-500">
        <p class="text-lg font-semibold">Failed to load article</p>
        <p>The requested post could not be found or an error occurred.</p>
        <NuxtLink :to="localePath('/news')" class="mt-4 inline-block underline">
          &larr; Back to all news
        </NuxtLink>
      </div>

      <!-- Content Display -->
      <div v-else-if="post">
        <NuxtLink :to="localePath('/news')" class="inline-flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors font-semibold">
          <span v-html="t('news.back_to_news')"></span>
        </NuxtLink>

        <article class="max-w-4xl mx-auto mt-8">
          <span class="text-sm font-semibold text-red-500">{{ post.category.title }}</span>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight mt-2">{{ post.title }}</h1>
          <p class="mt-4 text-lg text-gray-500">{{ new Date(post.published_at).toLocaleDateString($i18n.locale.value) }}</p>

          <div class="aspect-video overflow-hidden rounded-2xl my-8">
            <img :src="post.image.medium" :alt="post.title" class="w-full h-full object-cover">
          </div>

          <!-- Render HTML content from API -->
          <div class="prose prose-lg max-w-none" v-html="formatContent(post.content)"></div>
        </article>

        <!-- Recommended Posts -->
        <div class="max-w-5xl mx-auto mt-16 pt-12 border-t border-gray-200" v-if="recommendedPosts.length">
          <h2 class="text-3xl font-bold text-center mb-8">{{ t('news.recommended_posts') }}</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewsCard v-for="recPost in recommendedPosts" :key="recPost.slug" :post="recPost" />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
