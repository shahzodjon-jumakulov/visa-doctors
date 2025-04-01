<script setup>
definePageMeta({
  layout: "default"
});
</script>

<template>
  <div class="bg-gray-50">
    <UContainer class="py-10">
      <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 class="section-heading mb-8 text-center">{{ $t('terms.title') }}</h1>
        <p class="text-gray-600 mb-8 text-center">{{ $t('terms.last_updated') }}</p>

        <div class="space-y-8">
          <template v-for="i in 7" :key="i">
            <div class="prose max-w-none">
              <h2 class="text-xl font-semibold mb-4">{{ $t(`terms.sections.${i}.title`) }}</h2>
              <div class="whitespace-pre-line text-gray-700 leading-relaxed">{{ $t(`terms.sections.${i}.content`) }}</div>
            </div>
          </template>
        </div>

        <p class="mt-8 pt-8 text-gray-600 border-t text-center">© {{ new Date().getFullYear() }} {{ $t('terms.copyright') }}</p>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.section-heading {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1A1A1A;
  text-align: center;
}

.section-heading :deep(span) {
  color: #E20935;
}
</style> 