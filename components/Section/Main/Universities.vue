<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FreeMode, Autoplay } from "swiper/modules";

const { data: universities } = await useMyFetch("/universities/logos/");
</script>

<template>
  <section class="py-[4.5rem] overflow-hidden">
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-3 text-center px-5" data-aos="fade-up">
        <div
          class="section-heading"
          v-html="$t('universities_section.title')"
        ></div>
        <p class="text-sm md:text-lg font-medium text-black-500">
          {{ $t("universities_section.desc") }}
        </p>
      </div>

      <!-- Swiper Carousel -->
      <Swiper
        :slides-per-view="'auto'"
        :space-between="20"
        :free-mode="true"
        :loop="true"
        :autoplay="{ delay: 0, disableOnInteraction: false }"
        :speed="4000"
        :modules="[FreeMode, Autoplay]"
        class="w-full"
      >
        <SwiperSlide
          v-for="(item, index) in universities"
          :key="index"
          class="!w-[12rem] md:!w-[16.875rem] aspect-[2] rounded-lg border border-black-200 shrink-0 hover:bg-black-100 transition-colors bg-white"
        >
          <NuxtLink :to="item.url.trim()" target="_blank" class="flex-center size-full">
            <img
              :src="item.logo"
              :alt="item.name"
              class="max-md:scale-[0.75] max-h-[80%] max-w-[80%] mix-blend-multiply"
            />
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
