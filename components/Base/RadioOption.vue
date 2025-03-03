<script setup>
const props = defineProps({
  option: Object,
  selected: Number,
});
</script>

<template>
  <button
    type="button"
    :class="
      selected === option.id
        ? '!bg-black-main'
        : 'bg-black-100 hover:bg-black-200'
    "
    class="transition-colors rounded-lg p-4 flex items-center gap-3 w-full"
  >
    <div
      :class="selected === option.id ? 'ring-white' : 'ring-black-400'"
      class="ring-2 ring-inset rounded-full size-6 p-1.5 transition-colors"
    >
      <div
        :class="selected === option.id ? 'bg-white' : 'bg-transparent'"
        class="size-full rounded-full transition-colors"
      ></div>
    </div>
    <p
      :class="selected === option.id ? 'text-white' : 'text-black-main'"
      class="text-base transition-colors text-left"
    >
      {{ option.text }}
    </p>
  </button>
</template>
