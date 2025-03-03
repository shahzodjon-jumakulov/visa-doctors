<script setup>
import Team from "@/assets/icons/team.svg";
import Results from "@/assets/icons/results.svg";
import Visa from "@/assets/icons/visa.svg";

const { t } = useI18n();

const nav = computed(() => [
  {
    id: 1,
    title: t("about_us"),
    description: t("about_us_desc"),
    icon: Team,
    link: "/about",
  },
  {
    id: 2,
    title: t("awards"),
    description: t("awards_desc"),
    icon: Results,
    link: "/awards",
  },
  {
    id: 3,
    title: t("required_docs"),
    description: t("required_docs_desc"),
    icon: Visa,
    link: "/categories",
  },
]);
</script>

<template>
  <div
    class="relative pt-[5.5rem] min-h-[100svh] h-full overflow-hidden flex flex-col"
  >
    <UContainer class="relative pt-[3.5rem] pb-5 lg:pb-12 grow flex flex-col">
      <div
        class="flex flex-col max-lg:items-center justify-between gap-20 md:gap-10 lg:gap-[5.5rem] grow"
      >
        <div
          data-aos="fade-up"
          class="flex flex-col gap-5 lg:gap-10 max-lg:max-w-3xl w-full lg:max-w-[45rem]"
        >
          <h1
            class="text-4xl md:text-[4rem] lg:text-[5rem] leading-normal font-semibold tracking-[-0.0625rem] text-white md:max-lg:text-center"
          >
            {{ $t("hero.title") }}
          </h1>
          <BaseButton :label="$t('fill_survey')" :to="$localePath('/survey')" />
        </div>
        <div
          class="bg-black-400 backdrop-blur-[10px] rounded-xl overflow-hidden grid max-lg:grid-rows-3 lg:grid-cols-3 max-lg:max-w-3xl w-full"
        >
          <NuxtLinkLocale
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
          </NuxtLinkLocale>
        </div>
      </div>

      <div
        class="absolute right-0 top-1/2 -translate-y-1/2 z-[-1] max-lg:hidden"
      >
        <div class="bg-red-main rounded-full size-[35rem] relative">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            class="absolute h-[31rem] -top-16 -left-8"
          >
            <NuxtImg
              src="/images/hero-flag.png"
              alt="Korean flag"
              format="webp"
              preload
              class="rotate-[-28deg] h-full"
            />
          </div>
          <NuxtImg
            data-aos="fade-right"
            data-aos-delay="300"
            data-aos-anchor-placement="top-bottom"
            src="/images/hero-woman.png"
            alt="Student girl"
            format="webp"
            width="321"
            height="543"
            preload
            class="absolute top-[11rem] left-0"
          />
          <NuxtImg
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-anchor-placement="top-bottom"
            src="/images/hero-man.png"
            alt="Student boy"
            format="webp"
            width="445"
            height="663"
            preload
            class="absolute top-20 right-0"
          />
        </div>
      </div>
    </UContainer>
    <div class="pointer-events-none absolute inset-0 z-[-2]">
      <NuxtImg
        src="/images/hero-bg.png"
        alt="hero"
        format="webp"
        placeholder
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
