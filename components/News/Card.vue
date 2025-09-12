<script setup>
  const { t } = useI18n();
  const localePath = useLocalePath();
  defineProps({
    post: {
      type: Object,
      required: true
    }
  });
</script>

<template>
  <NuxtLink :to="localePath(`/news/${post.slug}`)" class="group block bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200">
    <div class="aspect-video overflow-hidden">
      <img :src="post.image" :alt="t(post.title)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
    </div>
    <div class="p-6">
      <span class="text-sm font-semibold text-red-500">{{ t(post.category) }}</span>
      <h3 class="text-xl font-bold mt-2 leading-snug">{{ t(post.title) }}</h3>
      <p class="text-gray-600 mt-3 text-sm line-clamp-3">{{ t(post.excerpt) }}</p>
      <p class="text-xs text-gray-400 mt-4">{{ post.date }}</p>
    </div>
  </NuxtLink>
</template>
