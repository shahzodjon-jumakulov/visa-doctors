<script setup>
const { baseURL } = useRuntimeConfig().public;

const { data } = await useMyFetch("/results/preview/");
const images = ref([]);
data.value?.preview_results?.forEach((item) => {
  images.value.push(baseURL + item.image);
});
</script>

<template>
  <div class="bg-black-main relative overflow-hidden" v-if="data">
    <UContainer class="py-10 md:py-[4.5rem] relative z-[1]">
      <div class="flex max-lg:flex-col md:items-center gap-10">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-2">
            <h2 class="section-heading !text-white !text-left">
              {{ data.title.split(" ")[0] }}
              <span class="text-red-main">{{
                data.title.split(" ").slice(1).join(" ")
              }}</span>
            </h2>
            <p class="text-sm md:text-lg font-medium text-white-500">
              {{ data.subtitle }}
            </p>
          </div>
          <div
            class="text-base leading-140 text-white"
            v-html="data.description"
          ></div>
          <BaseButton :label="$t('read_more')" :to="$localePath('/awards')" />
        </div>
        <div
          class="relative grid grid-cols-2 grid-rows-2 max-w-[32rem] w-full shrink-0 z-0"
        >
          <div
            class="single-pic z-[-2]"
            data-aos="fade-up-left"
            data-aos-anchor-placement="top-center"
          >
            <img
              :src="images[0]"
              alt="Visa approved"
              class="size-full object-cover"
            />
          </div>
          <div
            class="single-pic relative z-0"
            data-aos="fade-up-right"
            data-aos-anchor-placement="top-center"
          >
            <img
              :src="images[1]"
              alt="Visa approved"
              class="w-[63%] absolute top-[10%] right-[20%]"
            />
          </div>
          <div
            class="single-pic relative z-0"
            data-aos="fade-down-left"
            data-aos-anchor-placement="bottom-bottom"
          >
            <img
              :src="images[2]"
              alt="Visa approved"
              class="w-[63%] absolute left-[20%] top-[10%]"
            />
          </div>
          <div
            class="single-pic relative z-[-2]"
            data-aos="fade-down-right"
            data-aos-anchor-placement="bottom-bottom"
          >
            <img
              :src="images[3]"
              alt="Visa approved"
              class="w-[60%] absolute right-[10%] top-[15%]"
            />
          </div>
          <div
            class="rounded-2xl border-4 md:border-8 border-black-main overflow-hidden absolute-center z-[-1]"
          >
            <img
              :src="images[4]"
              alt="Visa approved"
              class="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </UContainer>

    <div class="absolute top-1/2 -translate-y-1/2 right-[-10rem] max-lg:hidden">
      <img src="~/assets/icons/map-dot-light.svg" alt="map" class="w-[39rem]" />
    </div>
    <div class="absolute left-0 bottom-0 max-lg:hidden">
      <img src="~/assets/images/awards-bg.png" alt="awards" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.single-pic {
  @apply aspect-square;
  img {
    @apply rounded-2xl border-4 md:border-8 border-black-main object-cover;
  }
}
</style>
