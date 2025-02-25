<script setup>
const options = [
  {
    id: 1,
    name: "9-sinf",
  },
  {
    id: 2,
    name: "11-sinf",
  },
  {
    id: 3,
    name: "Kollej",
  },
  {
    id: 4,
    name: "Bakalavr",
  },
  {
    id: 5,
    name: "Magistratura",
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
      Oxirgi bitirgan joyingizni belgilang
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <BaseRadioOption
        v-for="option in options"
        :key="option.id"
        @click="selected = option.id"
        :option="option"
        :selected="selected"
        :class="{ 'md:col-span-2': option.id === 5 }"
      />
    </div>
    <BaseButton label="Keyingisi" @click="next" :disabled="!selected" />
  </div>
</template>
