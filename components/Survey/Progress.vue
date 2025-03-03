<script setup>
const props = defineProps({
  max: Number,
  current: Number,
  progress: Number,
});
</script>

<template>
  <div class="flex items-center gap-0.5 md:gap-1">
    <div
      v-for="(item, index) in max"
      :key="item"
      :class="{ grow: index !== 0, disabled: index > progress }"
      class="flex items-center gap-0.5 md:gap-1 group"
    >
      <div
        v-if="index !== 0"
        :class="[{ 'bg-red-main': index <= progress }]"
        class="rounded-full bg-black-200 h-px w-full transition-colors"
      ></div>
      <button
        :disabled="index > progress"
        @click="$emit('stepTo', index)"
        type="button"
        :class="{ '!bg-white': index === current }"
        class="border border-red-main bg-red-main hover:bg-red-hover active:bg-red-pressed group-[.disabled]:bg-white group-[.disabled]:border-black-200 rounded-full size-6 md:size-8 flex-center shrink-0 transition-colors"
      >
        <span
          :class="{ '!text-red-main': index === current }"
          class="text-[0.625rem] md:text-sm font-bold text-white group-[.disabled]:text-black-500 leading-normal transition-colors"
        >
          {{ item }}
        </span>
      </button>
    </div>
  </div>
</template>
