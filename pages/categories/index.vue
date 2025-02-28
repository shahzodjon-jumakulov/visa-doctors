<script setup>
import Family from "~/components/Icon/Family.vue";
import Guest from "~/components/Icon/Guest.vue";
import Study from "~/components/Icon/Study.vue";

const content = `<ol>
<li>Qarimdoshlikni tasdiqlovchi xujjat (guvohnoma(метрка), (nikox qog’ozi).</li>
<li>Pasport (zagran)</li>
<li>Id karta va zagran pasport nusxasi (chaqiruvchiniki)</li>
<li>Ish joyi guvoxnomasi, soliq to’laganlik xaqida xujjat, daromadni tasdiqlovchi xujjatlar Chaqiruvchiniki). Chaqiruvchi talaba bólsa universitetdan xujjatlar (óqish xaqida, baxolar, kontrakt tólovi xaqida va boshqalar)</li>
<li>Ijara shartnomasi (uyning umumiy maydoni yashash uchun yetarli bólishi kerak)</li>
<li>Bank shoʻt (Koreyadan chaqiruvchini nomiga)</li>
<li>Taklifnoma va kafolat xati (Koreyadan. Aniq maqsad yoritib berilsin).</li>
<li>Oʻzbekistondan 1 kunlik bank malumotnomasi, yoki elektron daromad malumotnomasi my.gov saytidan.</li>
<li>3,5x4,5 rasm</li></ol>`;

const cats = [
  {
    id: 1,
    title: "C - 3 - 1 Mehmon viza",
    content: content,
    icon: Guest,
  },
  {
    id: 2,
    title: "o'quvchi vizasi",
    content: content,
    icon: Study,
  },
  {
    id: 3,
    title: "F-1 va F-3  Oila vizasi",
    content: content,
    icon: Family,
  },
];

const route = useRoute();
const selected = ref(route.query.id || cats[0].id);
watch(
  () => route.fullPath,
  () => {
    selected.value = route.query.id || cats[0].id;
  },
  { deep: true }
);
</script>

<template>
  <UContainer class="py-10 md:pb-[4.5rem]">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="flex flex-col gap-5 col-span-1">
        <p class="text-xl font-bold text-black-main">Visa turlari</p>
        <NuxtLink
          v-for="(cat, index) in cats"
          :key="cat.id"
          :to="`/categories?id=${cat.id}`"
          class="bg-black-100 hover:bg-red-main active:bg-red-pressed transition-colors rounded-xl py-4 px-6 flex items-center gap-4 group"
          :class="{ '!bg-red-main active': selected == cat.id }"
        >
          <div
            class="bg-red-100 group-hover:bg-white-200 group-active:bg-white-200 group-[.active]:bg-white-200 transition-colors rounded-full size-12 md:size-16 flex-center shrink-0"
          >
            <component :is="cat.icon" class="size-9 md:size-12" />
          </div>
          <span
            class="text-lg leading-140 font-bold uppercase text-black-main grow group-hover:text-white group-active:text-white group-[.active]:text-white transition-colors"
          >
            {{ cat.title }}
          </span>
        </NuxtLink>
      </div>
      <div class="col-span-1 lg:col-span-2 flex flex-col gap-5">
        <h1 class="text-[2.5rem] text-black-main font-bold uppercase">
          Mehmon viza
        </h1>
        <div
          class="content text-base leading-140 font-medium text-black-main"
          v-html="content"
        ></div>
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
