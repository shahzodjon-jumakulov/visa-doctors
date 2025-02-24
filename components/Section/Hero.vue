<script setup>
import Team from "@/assets/icons/team.svg";
import Results from "@/assets/icons/results.svg";
import Visa from "@/assets/icons/visa.svg";

const nav = [
  {
    id: 1,
    title: "Biz haqimizda",
    description: "Ishonchli va samarali hamkor",
    icon: Team,
    link: "/",
  },
  {
    id: 2,
    title: "Bizning natijalarimiz",
    description:
      "Biz bilan 90% dan oshiq mijozlar ijobiy natijaga erishishlari mumkin",
    icon: Results,
    link: "/",
  },
  {
    id: 3,
    title: "Viza uchun kerakli hujjatlar",
    description: "Barcha viza yo’nalishlari bo’yicha to’liq ma’lumot oling",
    icon: Visa,
    link: "/",
  },
];
</script>

<template>
  <div class="relative pt-[5.5rem] min-h-[100svh] h-full overflow-hidden flex flex-col">
    <UContainer class="relative pt-[3.5rem] pb-5 lg:pb-12 grow flex flex-col">
      <div
        class="flex flex-col max-lg:items-center justify-between gap-20 md:gap-10 lg:gap-[5.5rem] grow"
      >
        <div
          class="flex flex-col gap-5 lg:gap-10 max-lg:max-w-3xl w-full lg:max-w-[45rem]"
        >
          <h1
            class="text-4xl md:text-[4rem] lg:text-[5rem] leading-normal font-semibold tracking-[-0.0625rem] text-white md:max-lg:text-center"
          >
            Koreyada ta’lim uchun so‘rovnoma to‘ldiring
          </h1>
          <UButton
            label="So‘rovnoma to‘ldirish"
            class="w-fit md:max-lg:self-center"
          >
            <template #trailing>
              <img src="~/assets/icons/arrow-right.svg" alt="arrow" />
            </template>
          </UButton>
        </div>
        <div
          class="bg-black-400 backdrop-blur-[10px] rounded-xl overflow-hidden grid max-lg:grid-rows-3 lg:grid-cols-3 max-lg:max-w-3xl w-full"
        >
          <NuxtLink
            v-for="(item, index) in nav"
            :key="item.id"
            :to="item.link"
            class="relative p-5 flex items-start gap-10 border-white-200 hover:bg-white-100 active:bg-white-300 transition-colors group"
            :class="index !== 0 ? 'max-lg:border-t lg:border-l' : ''"
          >
            <div class="size-12 shrink-0">
              <img :src="item.icon" :alt="item.title" class="size-full" />
            </div>
            <div class="flex flex-col gap-2">
              <h6 class="text-lg leading-normal font-semibold text-white">
                {{ item.title }}
              </h6>
              <p class="text-sm leading-140 text-white-500">
                {{ item.description }}
              </p>
            </div>
            <div
              class="size-[1.375rem] lg:size-6 flex-center absolute right-3 bottom-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"
            >
              <img src="~/assets/icons/arrow-down.svg" alt="arrow-down" />
            </div>
          </NuxtLink>
        </div>
      </div>

      <div
        class="absolute right-0 top-1/2 -translate-y-1/2 z-[-1] max-lg:hidden"
      >
        <div class="bg-red-main rounded-full size-[35rem] relative">
          <img
            src="~/assets/images/hero-flag.png"
            alt="Korean flag"
            class="absolute h-[31rem] rotate-[-28deg] -top-16 -left-8"
          />
          <img
            src="~/assets/images/hero-woman.png"
            alt="Student girl"
            class="absolute top-[11rem] left-0"
          />
          <img
            src="~/assets/images/hero-man.png"
            alt="Student boy"
            class="absolute top-20 right-0"
          />
        </div>
      </div>
    </UContainer>
    <div class="pointer-events-none absolute inset-0 z-[-2]">
      <img
        src="~/assets/images/hero-bg.png"
        alt="hero"
        class="size-full object-cover"
      />
      <div
        class="bg-black-500 mix-blend-multiply size-full absolute inset-0"
      ></div>
      <div class="header-gradient absolute top-0 left-0 w-full h-[19rem]"></div>
    </div>
  </div>
</template>

<style scoped>
.header-gradient {
  background: linear-gradient(
    0deg,
    rgba(22, 23, 26, 0) 7%,
    rgba(22, 23, 26, 0.08) 12%,
    rgba(22, 23, 26, 0.16) 17%,
    rgba(22, 23, 26, 0.22) 21%,
    rgba(22, 23, 26, 0.32) 26%,
    rgba(22, 23, 26, 0.42) 32%,
    rgba(22, 23, 26, 0.52) 38%,
    rgba(22, 23, 26, 0.62) 47%,
    rgba(22, 23, 26, 0.72) 57%,
    #16171a 100%
  );
}
</style>
