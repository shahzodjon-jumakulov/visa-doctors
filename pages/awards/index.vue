<script setup>
const {data} = await useMyFetch("/results/detail/");

const imageLoaded = ref({});
const handleImageLoad = (idx) => {
  imageLoaded.value[idx] = true;
};
</script>

<template>
  <section>
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col gap-10 items-center">
        <div class="flex flex-col gap-3 text-center">
          <h1 class="section-heading">
            {{ data.title }}
          </h1>
          <p class="text-lg font-medium text-black-500">
            {{ data.subtitle }}
          </p>
        </div>

        <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-10"
        >
          <div
              class="relative aspect-square"
              v-for="(image, idx) in data.results"
              :key="idx"
          >
            <div class="relative w-full h-full">
              <div v-if="!imageLoaded[idx]" class="absolute inset-0 bg-black-100 rounded-2xl animate-pulse"></div>
              <img
                  :src="image.image"
                  :alt="`Award ${idx + 1}`"
                  class="size-full object-cover rounded-2xl"
                  loading="lazy"
                  @load="handleImageLoad(idx)"
                  :class="{'opacity-0': !imageLoaded[idx]}"
              />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <SectionSurvey/>
  </section>
</template>
