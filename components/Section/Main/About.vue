<script setup>
const { data: about } = await useMyFetch("/about/preview/");

const features = about.value.highlights || [];
</script>

<template>
  <section class="relative" v-if="about">
    <UContainer class="py-10 md:py-[4.5rem]">
      <div class="flex max-lg:flex-col gap-10 md:max-lg:items-center">
        <div class="relative shrink-0 w-fit ml-10" data-aos="fade-right">
          <div>
            <img
              src="~/assets/images/main-about.png"
              alt="main-about"
              class="w-[32.5rem]"
            />
            <div
              class="bg-red-main rounded-[16.5625rem] w-full rounded-br-lg absolute inset-0 left-[-1rem] z-[-1]"
            ></div>
          </div>
          <div class="absolute bottom-20 -left-10 exp">
            <p class="text-[2.5rem] leading-normal font-semibold text-red-main">
              {{ about.experience_years?.years || 1 }}
            </p>
            <p class="text-sm text-black-500">
              {{ about.experience_years.title }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-2">
            <h2 class="section-heading !text-left">
              <span class="text-red-main">
                {{ about.title.split(" ")[0] }}
              </span>
              {{ about.title.split(" ").slice(1).join(" ") }}
            </h2>
            <p class="text-lg text-black-500 font-medium">
              {{ about.subtitle }}
            </p>
          </div>
          <div class="flex flex-wrap gap-10" v-if="features.length">
            <div
              data-aos="fade-right"
              class="flex items-center gap-4"
              v-for="item in features"
              :key="item.id"
            >
              <div class="bg-red-100 rounded-full size-11 flex-center shrink-0">
                <img src="~/assets/icons/tick.svg" alt="tick" />
              </div>
              <p class="text-lg font-semibold text-black-main">
                {{ item.title }}
              </p>
            </div>
          </div>
          <div
            class="text-base leading-140 text-black-main"
            v-html="about.preview_description"
          ></div>
          <BaseButton :label="$t('read_more')" :to="$localePath('/about')" />
        </div>
      </div>
    </UContainer>
    <div class="absolute left-0 top-1/2 -translate-y-1/2 h-[39rem] z-[-10]">
      <img src="~/assets/icons/map-dot.svg" alt="map" class="h-full" />
    </div>
  </section>
</template>

<style scoped>
.exp {
  border-radius: 0.5rem 0.5rem 0.5rem 2.5rem;
  border-left: 8px solid var(--red-main, #e20935);
  background: var(--white-main, #fff);
  box-shadow: 14.982px 29.403px 87px 0px rgba(0, 0, 0, 0.07);
  padding: 1.25rem 1.25rem 2rem 2.5rem;
}
</style>
