<script setup>
const navs = [
  {
    id: 1,
    title: "Biz haqimizda",
    link: "/about",
  },
  {
    id: 2,
    title: "Natijalarimiz",
    link: "/awards",
  },
  {
    id: 3,
    title: "Kerakli hujjatlar",
    link: "/categories",
  },
];

const isHeaderFixed = ref(false);
const route = useRoute();
const isMainPage = computed(() => route.path === "/");

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (!isMainPage.value) {
      isHeaderFixed.value = false;
      return;
    }
    if (window.scrollY > 99) {
      isHeaderFixed.value = true;
    } else {
      isHeaderFixed.value = false;
    }
  });
});
</script>

<template>
  <header
    :class="[
      isHeaderFixed ? 'backdrop-blur-lg bg-black-400' : '',
      isMainPage ? 'z-10 fixed top-0 left-0' : 'bg-black-main',
    ]"
    class="w-full border-b border-white-100 transition-all duration-300"
  >
    <UContainer class="py-5 md:py-6 lg:py-5 flex justify-between">
      <div
        class="flex items-center max-md:justify-between max-md:grow md:max-lg:flex-row-reverse md:gap-8"
      >
        <div class="flex items-stretch gap-10">
          <NuxtLink to="/" class="h-10 lg:h-12">
            <img
              src="~/assets/icons/logo.svg"
              alt="Visa Doctors"
              class="h-full"
            />
          </NuxtLink>
          <div class="flex gap-8 group max-lg:hidden">
            <NuxtLink
              v-for="(item, index) in navs"
              :key="item.id"
              :to="item.link"
              :class="
                !isMainPage
                  ? 'translate-y-0 opacity-100'
                  : isHeaderFixed
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-4 opacity-0'
              "
              :style="{ transitionDelay: `${index * 50}ms` }"
              class="text-base font-medium text-white group-hover:text-white-500 hover:!text-white transition-all duration-300 content-center"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
        <button class="lg:hidden h-fit">
          <img src="~/assets/icons/menu.svg" alt="menu" class="size-6" />
        </button>
      </div>
      <div class="max-md:hidden flex items-center">
        <div class="flex items-center gap-3">
          <img
            src="~/assets/icons/call-calling.svg"
            alt="call"
            class="size-8"
          />
          <div class="flex flex-col">
            <p class="text-sm leading-normal text-white-400">
              Viza bo‘yicha savollar
            </p>
            <NuxtLink
              to="tel:+998336666633"
              class="text-base leading-normal text-white font-bold"
            >
              +998 33 66666 33
            </NuxtLink>
          </div>
        </div>
        <div
          class="overflow-hidden transition-all duration-300 max-md:hidden"
          :class="
            !isMainPage
              ? 'ml-8'
              : isHeaderFixed
              ? 'max-w-[16rem] ml-8'
              : 'max-w-0 ml-0'
          "
        >
          <UButton label="So‘rovnoma to‘ldirish" truncate>
            <template #trailing>
              <img src="~/assets/icons/arrow-right.svg" alt="arrow" />
            </template>
          </UButton>
        </div>
      </div>
    </UContainer>
  </header>
</template>
