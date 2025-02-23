<script setup>
//
</script>

<template>
  <UButton v-bind="$props">
    <template #trailing>
      <span class="size-6 flex-center group-hover/button:translate-x-1 transition-all">
        <img src="~/assets/icons/arrow-right.svg" alt="arrow" />
      </span>
    </template>
  </UButton>
</template>
