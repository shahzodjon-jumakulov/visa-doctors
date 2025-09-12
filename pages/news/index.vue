<script setup>
const { newsItems } = useNews();
const { t } = useI18n();

const categoryCounts = computed(() => {
  const counts = {};
  for (const post of newsItems.value) {
    counts[post.category] = (counts[post.category] || 0) + 1;
  }
  return counts;
});

const categories = computed(() => {
  const uniqueCategories = [...new Set(newsItems.value.map(post => post.category))];
  const allCategory = {
    key: 'news.categories.all',
    count: newsItems.value.length
  };
  const otherCategories = uniqueCategories.map(catKey => ({
    key: catKey,
    count: categoryCounts.value[catKey]
  }));
  return [allCategory, ...otherCategories];
});

const selectedCategory = ref('news.categories.all');

const filteredNews = computed(() => {
  if (selectedCategory.value === 'news.categories.all') {
    return newsItems.value;
  }
  return newsItems.value.filter(post => post.category === selectedCategory.value);
});
</script>

<template>
  <div class="py-12 md:py-20">
    <UContainer>
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('news.title') }}</h1>
        <p class="mt-4 text-lg text-gray-500">{{ t('news.subtitle') }}</p>
      </div>

      <!-- Category Filters -->
      <div class="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
        <UButton
          v-for="category in categories"
          :key="category.key"
          :color="selectedCategory === category.key ? 'primary' : 'red'"
          :variant="selectedCategory === category.key ? 'solid' : 'outline'"
          @click="selectedCategory = category.key"
        >
          {{ t(category.key) }} ({{ category.count }})
        </UButton>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NewsCard v-for="post in filteredNews" :key="post.slug" :post="post" />
      </div>
    </UContainer>
  </div>
</template>
