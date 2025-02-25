<script setup>
const options = [
  {
    id: 1,
    name: "Xa avval rad javobi olganman",
  },
  {
    id: 2,
    name: "Yo‘q 1-marta topshirishim",
  },
  {
    id: 3,
    name: "Izoh qoldirish",
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
      Avval Koreyaga hujjat topshirib rad javobi olganmisiz?
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
