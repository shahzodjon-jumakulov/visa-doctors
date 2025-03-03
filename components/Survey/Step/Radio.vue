<script setup>
const props = defineProps(["options"]);
const length = props.options.length;

const model = defineModel();
const selected = computed(() => model.value.selected_options[0]);

watch(selected, () => {
  model.value.text_answer = "";
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div
      v-for="(option, index) in options"
      :key="option.id"
      v-auto-animate
      :class="{
        'md:col-span-2': length % 2 === 1 && index === length - 1,
      }"
    >
      <BaseRadioOption
        v-if="
          !option.has_custom_input ||
          (option.has_custom_input && selected !== option.id)
        "
        @click="model.selected_options[0] = option.id"
        :option="option"
        :selected="selected"
      />
      <UInput
        v-else
        ref="commentRef"
        v-model="model.text_answer"
        variant="none"
        placeholder="Izoh qoldirish"
        autofocus
      />
    </div>
  </div>
</template>
