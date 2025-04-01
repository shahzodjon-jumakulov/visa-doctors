<script setup>
definePageMeta({
  layout: "default"
});
</script>

<template>
  <div class="bg-black-100 grow">
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col gap-8 max-w-[50rem] mx-auto">
        <h1 class="section-heading">{{ $t("terms.title") }}</h1>

        <div class="bg-white rounded-xl px-4 py-5 md:p-8 flex flex-col gap-6">
          <div class="prose prose-sm max-w-none">
            <p class="text-black-500">{{ $t("terms.last_updated") }}</p>

            <template v-for="i in 7" :key="i">
              <h2 class="text-xl font-bold text-black-main mt-8">
                {{ $t(`terms.sections.${i}.title`) }}
              </h2>
              <div class="whitespace-pre-line">
                {{ $t(`terms.sections.${i}.content`) }}
              </div>
            </template>

            <p class="mt-8 pt-8 text-gray-600 border-t text-center">
              © {{ new Date().getFullYear() }} {{ $t('terms.copyright') }}
            </p>
          </div>
        </div>
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