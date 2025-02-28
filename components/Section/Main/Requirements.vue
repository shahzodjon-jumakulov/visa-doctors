<script setup>
import Guest from "~/components/Icon/Guest.vue";
import Study from "~/components/Icon/Study.vue";
import Family from "~/components/Icon/Family.vue";

const reqs = [
  {
    id: 1,
    title: "C-3-1 Mehmon viza",
    icon: Guest,
    link: "/categories?id=1",
  },
  {
    id: 2,
    title: "O‘quvchi vizasi",
    icon: Study,
    link: "/categories?id=2",
  },
  {
    id: 3,
    title: "F-1 va F-3 Oila vizasi",
    icon: Family,
    link: "/categories?id=3",
  },
];
</script>

<template>
  <section class="bg-black-100 relative overflow-hidden">
    <UContainer class="py-10 md:py-[4.5rem]">
      <div class="flex flex-col gap-8 md:gap-10">
        <div class="flex flex-col gap-3">
          <h2 class="section-heading">
            Viza uchun <span class="text-red-main">kerakli hujjatlar</span>
          </h2>
          <p class="text-sm font-medium text-black-500 text-center">
            Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.
          </p>
        </div>
        <div class="grid max-lg:grid-rows-3 lg:grid-cols-3 gap-3">
          <NuxtLink
            v-for="item in reqs"
            :key="item.id"
            :to="item.link"
            class="bg-white hover:bg-red-main active:bg-red-pressed transition-colors rounded-xl p-4 flex items-center gap-3 group"
          >
            <div
              class="bg-red-100 group-hover:bg-white-200 group-active:bg-white-200 transition-colors rounded-full size-12 md:size-16 flex-center shrink-0"
            >
              <component :is="item.icon" class="size-9 md:size-12" />
            </div>
            <span
              class="text-base leading-140 font-bold uppercase text-black-main grow group-hover:text-white group-active:text-white transition-colors"
            >
              {{ item.title }}
            </span>
            <div class="size-6 flex-center">
              <IconArrowRightRed />
            </div>
          </NuxtLink>
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
