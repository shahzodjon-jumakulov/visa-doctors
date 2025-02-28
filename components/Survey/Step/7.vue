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
];
const comment = ref("");
const commentRef = ref(null);

const emits = defineEmits(["next"]);
const selected = ref(null);

watch(selected, (newVal) => {
  if (newVal === 3) {
    nextTick(() => commentRef.value.$el.querySelector("input").focus());
  }
});

const next = () => {
  if (selected.value) emits("next");
};
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-bold text-black-main">
      Avval Koreyaga hujjat topshirib rad javobi olganmisiz?
    </p>
    <div class="flex flex-col gap-3" v-auto-animate>
      <BaseRadioOption
        v-for="option in options"
        :key="option.id"
        @click="selected = option.id"
        :option="option"
        :selected="selected"
      />
      <UInput
        v-if="selected === 3"
        ref="commentRef"
        v-model="comment"
        variant="none"
        placeholder="Izoh qoldirish"
      />
      <BaseRadioOption
        v-else
        @click="selected = 3"
        :option="{ id: 3, name: 'Izoh qoldirish' }"
        :selected="selected"
      />
    </div>
    <BaseButton
      label="Keyingisi"
      @click="next"
      :disabled="!selected || (selected === 3 && !comment)"
    />
  </div>
</template>
