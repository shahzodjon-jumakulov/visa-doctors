<script setup>
const options = [
  {
    id: 1,
    name: "Kasbiy ta’lim",
  },
  {
    id: 2,
    name: "Bakalavr",
  },
  {
    id: 3,
    name: "Magistratura",
  },
  {
    id: 4,
    name: "Til kursi",
  },
];

const emits = defineEmits(["next"]);
const selected = ref(null);

const next = () => {
  if (selected.value) emits("next");
};
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-bold text-black-main">
      Koreyada qaysi yo‘nalishda o‘qimoqchisiz?
    </p>
    <div class="flex flex-col gap-3">
      <BaseRadioOption
        v-for="option in options"
        :key="option.id"
        @click="selected = option.id"
        :option="option"
        :selected="selected"
      />
    </div>
    <BaseButton label="Keyingisi" @click="next" :disabled="!selected" />
  </div>
</template>
