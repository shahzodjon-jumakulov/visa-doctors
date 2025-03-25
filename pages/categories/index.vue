<script setup>
const { data } = await useMyFetch("/visas/");

const getDetail = async (slug) => {
  const { data } = await useMyFetch(`/visas/${slug}/`);
  return data.value;
};

const route = useRoute();
const selected = ref(route.query.slug || data.value[0].slug);
const detail = ref(null);
detail.value = await getDetail(selected.value);
watch(
  () => route.fullPath,
  async () => {
    selected.value = route.query.slug || data.value[0].slug;
    detail.value = await getDetail(selected.value);
  },
  { deep: true }
);
</script>

<template>
  <UContainer class="py-10 md:pb-[4.5rem]">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="flex flex-col gap-5 col-span-1">
        <p class="text-xl font-bold text-black-main">
          {{ $t("types_of_visas") }}
        </p>
        <NuxtLinkLocale
          v-for="(cat, index) in data"
          :key="cat.slug"
          :to="`/categories?slug=${cat.slug}`"
          class="bg-black-100 hover:bg-red-main active:bg-red-pressed transition-colors rounded-xl py-4 px-6 flex items-center gap-4 group"
          :class="{ '!bg-red-main active': selected == cat.slug }"
        >
          <div
            class="bg-red-100 group-hover:bg-white-200 group-active:bg-white-200 group-[.active]:bg-white-200 rounded-full size-12 md:size-16 flex-center shrink-0 group-hover:filter group-hover:brightness-0 group-hover:invert  group-[.active]:filter group-[.active]:brightness-0 group-[.active]:invert transition-all"
          >
            <img :src="cat.icon" :alt="cat.title" class="size-9 md:size-12" />
          </div>
          <span
            class="text-lg leading-140 font-bold uppercase text-black-main grow group-hover:text-white group-active:text-white group-[.active]:text-white transition-colors"
          >
            {{ cat.title }}
          </span>
        </NuxtLinkLocale>
      </div>
      <div class="col-span-1 lg:col-span-2 flex flex-col gap-5">
        <h1 class="text-[2.5rem] text-black-main font-bold uppercase">
          {{ detail.title }}
        </h1>
        <!-- <div
          class="content text-base leading-140 font-medium text-black-main"
          v-html="content"
        ></div> -->
        <div class="flex flex-col gap-4">
          <div
            class="flex items-center gap-3"
            v-for="(item, index) in detail.documents"
            :key="index"
          >
            <div
              class="size-8 flex-center rounded-full bg-red-100 text-sm font-bold text-red-main shrink-0"
            >
              {{ index + 1 }}
            </div>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<style scoped lang="scss">
.content:deep(ol) {
  counter-reset: list;
  @apply flex flex-col gap-4;

  li {
    @apply flex items-start gap-3;

    &:before {
      content: counter(list);
      counter-increment: list;
      line-height: inherit; 
      @apply text-red-main text-sm  font-bold bg-red-100 bg-opacity-10 rounded-full size-8 flex items-center justify-center shrink-0;
    }
  }
}
</style>
