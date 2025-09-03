<script setup>
// import Guest from "~/components/Icon/Guest.vue";
// import Study from "~/components/Icon/Study.vue";
// import Family from "~/components/Icon/Family.vue";
const { data } = await useMyFetch("/visas/");
</script>

<template>
  <section class="bg-black-100 relative overflow-hidden" v-if="data">
    <UContainer class="py-10 md:py-[4.5rem]">
      <div class="flex flex-col gap-8 md:gap-10">
        <div class="flex flex-col gap-3">
          <h2 class="section-heading">
            {{ $t("docs_requirements[0]") }}
            <span class="text-red-main">{{ $t("docs_requirements[1]") }}</span>
          </h2>
          <p class="text-sm font-medium text-black-500 text-center">
            {{ $t("docs_requirements_desc") }}
          </p>
        </div>
        <div class="grid max-lg:grid-rows-3 lg:grid-cols-3 gap-3">
          <div
            data-aos="fade-left"
            :data-aos-delay="index * 300"
            v-for="(item, index) in data"
            :key="item.slug"
          >
            <NuxtLinkLocale
              :to="`/categories?slug=${item.slug}`"
              class="bg-white hover:bg-red-main active:bg-red-pressed transition-colors rounded-xl p-4 flex items-center gap-3 group"
            >
              <div
                class="bg-red-100 group-hover:bg-white-200 group-active:bg-white-200 rounded-full size-12 md:size-16 flex-center shrink-0 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all"
              >
                <img
                  :src="item.icon"
                  :alt="item.title"
                  class="size-9 md:size-12"
                />
              </div>
              <span
                class="text-base leading-140 font-bold uppercase text-black-main grow group-hover:text-white group-active:text-white transition-colors"
              >
                {{ item.title }}
              </span>
              <div class="size-6 flex-center">
                <IconArrowRightRed />
              </div>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </UContainer>
    <div class="opacity-5 pointer-events-none z-[-1] relative">
      <div class="absolute bottom-0 left-[45%] w-[30rem] md:w-[78rem]">
        <img
          src="~/assets/images/bg-buildings.png"
          alt="buildings"
          class="w-full"
        />
      </div>
      <div class="absolute bottom-0 right-[44%] w-[30rem] md:w-[78rem]">
        <img
          src="~/assets/images/bg-buildings.png"
          alt="buildings"
          class="w-full"
        />
      </div>
    </div>
  </section>
</template>
