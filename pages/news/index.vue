<script setup>
const { fetchNews } = useNews();
const { t } = useI18n();

// 1. Fetch news from the API
const { data: newsItems, pending, error } = await fetchNews();

// 2. Derive categories from the fetched posts
const categories = computed(() => {
  if (!newsItems.value) return [];

  // Use a Map to store unique categories and their counts
  const categoryMap = new Map();
  for (const post of newsItems.value) {
    const slug = post.category.slug;
    if (!categoryMap.has(slug)) {
      // If category is new, add it to the map with its title and slug
      categoryMap.set(slug, { ...post.category, count: 0 });
    }
    // Increment count for the category
    categoryMap.get(slug).count++;
  }

  // Create the "All" category object
  const allCategory = {
    title: t('news.categories.all'),
    slug: 'all',
    count: newsItems.value.length
  };

  // Return "All" category followed by the rest
  return [allCategory, ...Array.from(categoryMap.values())];
});

// 3. State for the selected category filter
const selectedCategorySlug = ref('all');

// 4. Filter news based on the selected category
const filteredNews = computed(() => {
  if (!newsItems.value) return [];
  if (selectedCategorySlug.value === 'all') {
    return newsItems.value;
  }
  return newsItems.value.filter(post => post.category.slug === selectedCategorySlug.value);
});
</script>

<template>
  <div class="py-12 md:py-20">
    <UContainer>
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('news.title') }}</h1>
        <p class="mt-4 text-lg text-gray-500">{{ t('news.subtitle') }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <p class="text-lg">Loading news...</p>
        <!-- You can add a spinner component here -->
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12 text-red-500">
        <p class="text-lg font-semibold">Failed to load news</p>
        <p>Please try again later.</p>
      </div>

      <!-- Content Display -->
      <div v-else-if="newsItems">
        <!-- Category Filters -->
        <div class="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
          <UButton
            v-for="category in categories"
            :key="category.slug"
            :color="selectedCategorySlug === category.slug ? 'primary' : 'red'"
            :variant="selectedCategorySlug === category.slug ? 'solid' : 'outline'"
            @click="selectedCategorySlug = category.slug"
          >
            <!-- Category title comes directly from API, no need for t() except for 'All' -->
            {{ category.title }} ({{ category.count }})
          </UButton>
        </div>

        <!-- News Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NewsCard v-for="post in filteredNews" :key="post.slug" :post="post" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
