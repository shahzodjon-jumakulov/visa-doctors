<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

const navs = computed(() => [
  {
    id: 1,
    title: t("about_us"),
    link: "/about",
  },
  {
    id: 2,
    title: t("awards"),
    link: "/awards",
  },
  {
    id: 3,
    title: t("required_docs"),
    link: "/categories",
  },
]);

const isBurgerOpen = useState("burger");
const isHeaderFixed = ref(false);
const route = useRoute();
const isMainPage = computed(() => route.path === localePath("/"));

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
        <button class="lg:hidden h-fit" @click="isBurgerOpen = true">
          <img src="~/assets/icons/menu.svg" alt="menu" class="size-6" />
        </button>
      </div>
      <div class="max-md:hidden flex items-center">
        <AppLang />
        <NuxtLink class="flex items-center gap-3 ml-8" to="tel:+998336666633">
          <img
            src="~/assets/icons/call-calling.svg"
            alt="call"
            class="size-8"
          />
          <div class="flex flex-col max-lg:hidden">
            <p class="text-sm leading-normal text-white-400">
              {{ $t("questions_regarding_visa") }}
            </p>
            <p class="text-base leading-normal text-white font-bold">
              +998 33 66666 33
            </p>
          </div>
        </NuxtLink>
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
          <BaseButton
            :label="$t('fill_survey')"
            :to="$localePath('/survey')"
            truncate
          />
        </div>
      </div>
    </UContainer>
  </header>
</template>
